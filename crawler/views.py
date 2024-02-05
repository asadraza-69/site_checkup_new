import json
from crawler.crawler_utils import utils_crawl_data, get_process_data
from django.contrib.auth.decorators import login_required
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from crawler.utils import *
from subscription_module.models import Subscriptions,PlanModuleDetail
import copy

def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url)  # check if url format is valid
    except ValidationError:
        return False

    return True


@login_required
def crawl(request):
    if request.method == 'GET':
        print("request.user",request.user)
        try:
            website_url = request.GET.get('website_url', None)
            args = 'crawl'
            response = get_site_scrapy_data(website_url,args,request.user)
        except Exception as e:
            print('Exception:', repr(e))
            response = {'status': False, 'error': repr(e),'data':{}}
        return JsonResponse(response)


@csrf_exempt
@require_http_methods(['POST'])
def crawl_data(request):
    if request.method == 'POST':
        print("Request-Arrived")
        body_data = json.loads(request.body)
        response = utils_crawl_data(body_data)
        if response['status']:
            print("Response-True")
            sap_obj= SiteAuditProject.objects.get(pk=response['sap_id'])
            print("sap_obj: ",sap_obj)
            webpages_qs = UserSelectedWebsite.objects.filter(
                i_profile = sap_obj.created_by.profile,
                i_site_audit_project = sap_obj
                )
            print("webpages_qs: ",webpages_qs)
            website_url = sap_obj.i_website.website_url
            error_urls=[]
            website_attempt_days =  int(GlobalConfiguration.objects.get(name='website_attempt_days').value)
            attempt_interval_time = timezone.now() - timedelta(days=website_attempt_days)
            website_attempt_count = int(GlobalConfiguration.objects.get(name='website_attempt_count').value)
            webpages_qs_2= copy.deepcopy(webpages_qs)
            for webpage in webpages_qs:
                webpage_obj = SiteScrapyData.objects.filter(i_website__website_url=webpage.i_website).latest('created_on')
                # attempt_interval_time <= webpage_obj.i_website.created_on
                print('raw_webpage_obj: ', webpage_obj)
                if os.path.exists(webpage_obj.raw_data.path):
                    data = json.load(webpage_obj.raw_data)
                    if data and bool(data):
                        url = data.keys()
                        url_dic = list(data.values())
                        if url:
                            if 'HTML_text' in url_dic[0].keys() and 'status' in url_dic[0].keys():
                                continue
                            else:
                                if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                                    error_urls.append(webpage_obj.i_website.website_url)
                                    with transaction.atomic():
                                        webpage_obj.i_website.crawling_count +=1
                                        webpage_obj.i_website.attempt_date = timezone.now()
                                        webpage_obj.i_website.save()
                                else:
                                    webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk) 
                        else:
                            if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                                error_urls.append(webpage_obj.i_website.website_url)
                                with transaction.atomic():
                                    webpage_obj.i_website.crawling_count +=1
                                    webpage_obj.i_website.attempt_date = timezone.now()
                                    webpage_obj.i_website.save()
                            else:
                                webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)    
                    else:
                        if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                            error_urls.append(webpage_obj.i_website.website_url)
                            with transaction.atomic():
                                webpage_obj.i_website.crawling_count +=1
                                webpage_obj.i_website.attempt_date = timezone.now()
                                webpage_obj.i_website.save()
                        else:
                            webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)   

                else:
                    if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                        error_urls.append(webpage_obj.i_website.website_url)
                        with transaction.atomic():
                            webpage_obj.i_website.crawling_count +=1
                            webpage_obj.i_website.attempt_date = timezone.now()
                            webpage_obj.i_website.save()
                    else:
                        webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)

            if len(error_urls) <= 0:
                response = get_process_data(website_url, webpages_qs_2,sap_obj)
            else:
                crawler_data = {
                        'url_list': error_urls, 
                        'callback_url': settings.CRAWLER_CALLBACK_URL,
                        'website_url' : website_url, 
                        'crawl_request_inprocess': True,
                        'sap_id': sap_obj.pk
                        }
                print(crawler_data)
                crawl_api_response = requests.post(settings.CRAWLER_API, data=crawler_data)
                print('crawl_api_response:', crawl_api_response)
                response = {'status': False}
    return JsonResponse(response)

# @csrf_exempt
# def process_crawl_data(request):
#     if request.method == 'POST':
        
#         sap_id = request.POST.get('sap_id')

#         response = process_crawl_data_util(sap_id)
        
    # return JsonResponse(response)


@csrf_exempt
def total_crawled_pages(request):
    if request.method == 'GET':
        try:
            website_url = request.GET.get('website_url', None)
            total_pages = website_total_urls(website_url)
            sub_obj = Subscriptions.objects.get(
                profile_id = request.user.profile,
                is_active = True,
                )
            PlanModule_obj = PlanModuleDetail.objects.get(
                plan_id = sub_obj.plan_id,
                module_id__name = "Crawl Page Limit"
                )
            allowed_pages = PlanModule_obj.units_allowed
            response = {'total_pages' : total_pages, 'allowed_pages' : allowed_pages}
            response['status'] = True

        except Exception as e:
            print('Exception:', repr(e))
            response = {'status': False, 'error': repr(e)}
 
        return JsonResponse(response)


@login_required
def content(request):
    if request.method == 'GET':
        try:
            website_url = request.GET.get('website_url', None)
            args = "content"
            response = get_site_scrapy_data(website_url,args,request.user)
        
        
            # if not website_url:
            #     return JsonResponse({'status': False, 'error': 'website_url is empty'})

            # if not is_valid_url(website_url):
            #     return JsonResponse({'status': False, 'error': 'website_url is invalid'})

            # try:
            #     website_obj = Website.objects.get(website_url=website_url)
            # except Website.DoesNotExist:
            #     return JsonResponse({'status': False, 'error': 'website_url not found'})
            # try:
            #     # obj = SiteScrapyData.objects.get(i_website=website_obj)
            #     obj = SiteScrapyData.objects.filter(i_website=website_obj)
            #     print(obj)
            #     website = obj.latest('created_on')
            #     latest_website = website.i_website
            #     print('latest: ',latest_website)
            #     process_data = obj.latest('process_data')
            #     process_data = process_data.process_data
                
            # except SiteScrapyData.DoesNotExist:
            #     return JsonResponse({'status': False, 'error': 'data not found', 'crawl_request_inprocess' : website_obj.crawl_request_inprocess})
            
            # process_data = json.load(process_data)
            # data = {"Page Titles": process_data["Page Titles"],
            #         "Page Description": process_data["Page Description"], "Content Ratio": process_data["Content Ratio"],
            #         "Word Count": process_data["Word Count"],
            #         "H1": process_data["H1"],
            #         "crawl_request_inprocess" : website_obj.crawl_request_inprocess}
            # response = {'status': True, 'data': data}

        except Exception as e:
            print('Exception:', repr(e))
            response = {'status': False, 'error': repr(e)}
 
        return JsonResponse(response)


@login_required
def images_type(request):
    if request.method == 'GET':
        print("request.user",request.user)
        try:
            website_url = request.GET.get('website_url', None)
            args = "images_type"
            response = get_site_scrapy_data(website_url,args,request.user)
            # if not website_url:
            #     return JsonResponse({'status': False, 'error': 'website_url is empty'})

            # if not is_valid_url(website_url):
            #     return JsonResponse({'status': False, 'error': 'website_url is invalid'})

            # try:
            #     website_obj = Website.objects.get(website_url=website_url)
            #     print(website_obj)
            # except Website.DoesNotExist:
            #     return JsonResponse({'status': False, 'error': 'website_url not found'})
            # if website_obj.error_occured == True:
            #     return JsonResponse({'status': False, 'error': website_obj.error_description})
            # try:
            #     # obj = SiteScrapyData.objects.get(i_website=website_obj)
            #     obj = SiteScrapyData.objects.filter(i_website=website_obj)
            #     print(obj)
            #     website = obj.latest('created_on')
            #     latest_website = website.i_website
            #     print('latest: ',latest_website)
            #     process_data = obj.latest('process_data')
            #     process_data = process_data.process_data
                
                
            # except SiteScrapyData.DoesNotExist:
            #     return JsonResponse({'status': False, 'error': 'data not found', 'crawl_request_inprocess' : website_obj.crawl_request_inprocess})
            
            # process_data = json.load(process_data)
            # images_type = process_data['images_type']
            # crawl_pages = process_data['crawl_pages']
            # dashboard_data = process_data['dashboard_data']
            # total_webpages_count = process_data['total_webpages_count']
            # total_crawl_pages_count = process_data['total_crawlpages_count']
            # try:
            #     crawl_pages_detail = process_data['crawl_pages_detail']
            # except KeyError:
            #     crawl_pages_detail = {}
                

            # response = {'status': True, 'data': images_type, 'crawl_pages': crawl_pages,
            #             'dashboard_data': dashboard_data, 'total_webpages_count': total_webpages_count,
            #             'total_crawl_pages_count': total_crawl_pages_count, 'crawl_pages_detail' : crawl_pages_detail, 'crawl_request_inprocess' : website_obj.crawl_request_inprocess}

        except Exception as e:
            print('Exception:', repr(e))
            response = {'status': False, 'error': repr(e)}

        return JsonResponse(response)
