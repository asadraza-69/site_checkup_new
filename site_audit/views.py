import json
import re
import redis
import uuid
from datetime import date, timedelta, datetime
from loggings.utils import save_system_logs
import phonenumbers
from django.utils import timezone
import requests
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.management import call_command
from django.db import IntegrityError, transaction
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from crawler.models import SiteScrapyData
from loggings.utils import save_system_logs
from site_audit.account_list_json import account_json
from site_audit.decorators import project_required
from site_audit.keyword_json import google_analytics_json
from site_audit.models import *
from site_audit.utils import *
from user_management.models import GlobalConfiguration, Profile
from django.core.files import File
from crawler.models import *
import google.oauth2.credentials
import google_auth_oauthlib.flow
# from subscription_module.decorators import subscription_plan
from subscription_module.models import *
# from user_management.models import GlobalConfiguration, Profile
from subscription_module.utils import *
from subscription_module.utils import plan_details
import copy
from crawler.utils import website_total_urls
from crawler.crawler_utils import process_crawl_data_util


@login_required
@project_required()
def seo_checkup(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/seo_checkup.html', context)

def auto_create_proj(user_obj, urls):
    for url in urls:
        if url.endswith("/"):
            url = url[:-1]
        website_obj = Website.objects.get_or_create(website_url=url)
        website_project_obj = SiteAuditProject.objects.filter(i_website=website_obj[0], created_by=user_obj)
        if not website_project_obj:
            website_project_obj = SiteAuditProject.objects.create(i_website=website_obj[0], created_by=user_obj)


def create_url_projects(website_obj,urls, user_obj=None):
    urls = list(urls)
    website_url = website_obj.website_url
    website_url_ws = None
    print(urls)
    if not website_url.endswith("/"):
        website_url_ws = website_url+'/'
    else:
        website_url_ws = website_url
    if website_url in urls:
        urls.remove(website_url)
    if website_url_ws in urls:
        urls.remove(website_url_ws)
    print(urls)
    if user_obj == None:
        website_audit_projects = SiteAuditProject.objects.all().filter(i_website =website_obj)
        print("website_audit_projects",website_audit_projects)
        for proj in website_audit_projects:
            print("user",proj.created_by)
            user_obj = proj.created_by
            auto_create_proj(user_obj, urls)
    else:
        auto_create_proj(user_obj, urls)

def get_site_live_data(request):
    website_base_url = request.GET.get('url')
    response = {'status': False}
    try:
        with transaction.atomic():
            if website_base_url:
                website_base_url = get_website_domain(website_base_url)
                website_obj, is_created = Website.objects.get_or_create(website_url=website_base_url)
            else:
                response['error'] = 'Website URL is empty'
                return JsonResponse(response)

            # if request.user.is_anonymous:
            #     user_obj = User.objects.filter(is_superuser=True).first()
            # else:
            #     user_obj = request.user

            # project_obj, is_created = SiteAuditProject.objects.get_or_create(
            #     i_website=website_obj, created_by=user_obj)

            website_url = website_obj.website_url
            seo_data_qs = WebsiteSeoData.objects.filter(i_website=website_obj)
            seo_data_expiry_hrs = GlobalConfiguration.objects.get(name='website_seo_data_expiry_hrs').value
            interval_time = timezone.now() - timedelta(hours=int(seo_data_expiry_hrs))

            if seo_data_qs:
                seo_data_obj = seo_data_qs.latest('created_on')
                if interval_time >= seo_data_obj.created_on:
                    func_response = get_seo_api_data(response, website_url)

                    if func_response['status']:
                        current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
                        filename = f'website_seo_data_{current_datetime}.json'
                        # filename = 'website_seo_data.json'
                        with open(filename, 'w') as fp:
                            json.dump(func_response, fp, indent=4)
                        WebsiteSeoData.objects.create(i_website=website_obj, website_seo_data=File(open(filename)))
                        response = func_response
                        os.remove(filename)
                    else:
                        response = json.load(seo_data_obj.website_seo_data)
                        response.update({'info': f'The provided data is older than {seo_data_expiry_hrs} hours'})
                else:
                    response = json.load(seo_data_obj.website_seo_data)
                response.update({'status': True})
            else:
                func_response = get_seo_api_data(response, website_url)

                if func_response['status']:
                    current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
                    filename = f'website_seo_data_{current_datetime}.json'
                    # filename = 'website_seo_data.json'
                    with open(filename, 'w') as fp:
                        json.dump(func_response, fp, indent=4)
                    WebsiteSeoData.objects.create(i_website=website_obj, website_seo_data=File(open(filename)))
                    response = func_response
                    response.update({'status': True})
                    os.remove(filename)
                else:
                    response.update({'error': 'Connection Error'})
                    response.update(func_response)


            
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@csrf_exempt
def crawler_data(request):
    project_id = request.GET.get('project_id')
    website_url = []    
    website_base_url = SiteAuditProject.objects.get(pk = project_id).i_website.website_url
    # website_base_url = list(website_base_url.split(","))
    # project_obj = SiteAuditProject.objects.get(i_website__website_url = website_base_url, created_by = request.user)
    user_selected_links_qs = UserSelectedWebsite.objects.filter(i_site_audit_project__pk = project_id)

    for links in user_selected_links_qs:
        
        website_url.append(links.i_website.website_url)

    print('website_base_url: ', type(website_base_url))
    print('website_url: ', website_url)
    main_url = None
    response = {'status': False}
    crawler_api = settings.CRAWLER_API
    # process_api = settings.PROCESS_DATA_API
    try:
        with transaction.atomic():
            if website_base_url:
                main_url = website_base_url
                parsed_url = urlparse(main_url)
                scheme = urlparse(main_url).scheme
                domain = parsed_url.netloc
                main_url = scheme+'://'+domain
            website_url_copy = []
            website_url_copy = copy.deepcopy(website_url)
            
            for webpage in website_url_copy:
                if webpage:
                    website = get_website_domain(webpage)
                    website_obj, is_created = Website.objects.get_or_create(website_url=webpage)
                else:
                    response['error'] = 'Website URL is empty'
                    return JsonResponse(response)
                url = website_obj.website_url


                
                crawl_pages_limit = GlobalConfiguration.objects.get(name='crawl_pages_limit').value

                
                site_scrapy_data_qs = SiteScrapyData.objects.filter(i_website=website_obj)
                crawl_data_expiry_days = GlobalConfiguration.objects.get(name='crawl_data_expiry_days').value
                crawl_data_interval_time = timezone.now() - timedelta(days=int(crawl_data_expiry_days))
                crawl_request_inprocess = website_obj.crawl_request_inprocess
                
                if site_scrapy_data_qs:
                    site_scrapy_data_obj = site_scrapy_data_qs.latest('created_on')
                    if site_scrapy_data_obj.status == "processed":
                        print("crawled")
                        print('website' , webpage)
                        website_url.remove(webpage)
                        
                    elif crawl_data_interval_time <= site_scrapy_data_obj.created_on:
                        
                        website_url.remove(webpage)
                        
                else:
                    if website_obj.error_occured == True:
                        website_url.remove(webpage)
                    
                        response.update({'status': False, 'error' : website_obj.error_description})           
                print('---------------------')
            
            website_url = ','.join(website_url)
            print('string: ', website_url)
            print('type: ', type(website_url))
            
            sap_obj = SiteAuditProject.objects.get(
                i_website__website_url = main_url,
                created_by = request.user
                )
            if len(website_url) > 0:
                data = {'url_list': json.dumps(website_url), 
                        'callback_url': settings.CRAWLER_CALLBACK_URL,
                        'website_url' : main_url, 
                        'crawl_request_inprocess': crawl_request_inprocess,
                        'sap_id': sap_obj.pk
                        }
                print(data)

                crawl_api_response = requests.post(crawler_api, data=data)
                print('crawl_api_response:', crawl_api_response)
                if crawl_api_response.status_code == 200:
                    main_website_obj = Website.objects.get(website_url = main_url) 
                    main_website_obj.crawl_request_inprocess = True
                    main_website_obj.error_occured = False
                    main_website_obj.error_description = ""
                    main_website_obj.save()
                response.update({'status': False,'error':'Crawl Request in progress', 'crawl_request_inprocess' : main_website_obj.crawl_request_inprocess})
            elif len(website_url) == 0:
                crawl_data_expiry_days = GlobalConfiguration.objects.get(name='crawl_data_expiry_days').value
                crawl_data_interval_time = timezone.now() - timedelta(days=int(crawl_data_expiry_days))
                try:
                    process_data_qs = SiteProcessData.objects.filter(project = sap_obj)
                    process_data_obj = process_data_qs.latest('created_on')
                   
                        
                    if crawl_data_interval_time >= process_data_obj.created_on:
                        
                        data = {
                            'website_url' : main_url,
                            'webpages_list' : website_url_copy,
                            'sap_id': sap_obj.pk
                        }
                        response = check_existing_processed_data(sap_obj.pk)
                        if response['status'] == True:
                            donor_obj = SiteProcessData.objects.filter(project__pk = response['sap_id']).latest('created_on')
                            recipient_obj = SiteProcessData()
                            recipient_obj.project = sap_obj
                            recipient_obj.process_data = donor_obj.process_data
                            recipient_obj.save()
                        else:
                            process_crawl_data_util(sap_obj)
                        
                        # process_api_response = requests.post(process_api, data = data)
                        website_url = ','.join(website_url)
                        print('string: ', website_url)
                        print('type: ', type(website_url))
                       
                        # if process_api_response.status_code == 200:
                        main_website_obj = Website.objects.get(website_url = main_url) 
                        #     main_website_obj.crawl_request_inprocess = True
                        #     main_website_obj.error_occured = False
                        #     main_website_obj.error_description = ""
                        #     main_website_obj.save()
                        response.update({'status': False,'error':'Crawl Request in progress', 'crawl_request_inprocess' : main_website_obj.crawl_request_inprocess})
                except SiteProcessData.DoesNotExist:
                    
                    data = {
                        'website_url' : main_url,
                        'webpages_list' : website_url_copy,
                        'sap_id': sap_obj.pk
                    }
                    response = check_existing_processed_data(sap_obj.pk)
                    if response['status'] == True:
                        donor_obj = SiteProcessData.objects.filter(project__pk = response['sap_id']).latest('created_on')
                        recipient_obj = SiteProcessData()
                        recipient_obj.project = sap_obj
                        recipient_obj.process_data = donor_obj.process_data
                        recipient_obj.save()
                    else:
                        process_crawl_data_util(sap_obj)
                    website_url = ','.join(website_url)
                    print('string: ', website_url)
                    print('type: ', type(website_url))
                   
                    
                    # if process_api_response.status_code == 200:
                    main_website_obj = Website.objects.get(website_url = main_url) 
                    #     main_website_obj.crawl_request_inprocess = True
                    #     main_website_obj.error_occured = False
                    #     main_website_obj.error_description = ""
                    #     main_website_obj.save()
                    response.update({'status': False,'error':'Crawl Request in progress', 'crawl_request_inprocess' : main_website_obj.crawl_request_inprocess})
            


            # if not crawl_request_inprocess:
            #                 crawl_api_response = requests.post(crawler_api, data=data)
            #                 print('crawl_api_response:', crawl_api_response)
            #                 if crawl_api_response.status_code == 200:
            #                     website_obj.crawl_request_inprocess = True
            #                     website_obj.save()
            # if not crawl_request_inprocess:
            #                 crawl_api_response = requests.post(crawler_api, data=data)
            #                 print('crawl_api_response:', crawl_api_response)
            #                 if crawl_api_response.status_code == 200:
            #                     website_obj.crawl_request_inprocess = True
            #                     website_obj.save()
            #             response.update({'status': False, 'crawl_request_inprocess' : website_obj.crawl_request_inprocess})
                
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
    print("Site_audit/crawler_data")
    print("Response:", response)
    return JsonResponse(response)


@login_required
def keyword_data_listview(request):
    response = {'status': False}
    con_units = plan_details(request, 'Keyword Explorer')
    if con_units:
        try:
            if request.method == 'GET':
                keyword = request.GET.get('keyword')
                country = request.GET.get('country')
                keyword = keyword.lower()
                header_regex = re.findall(r'\b[a-zA-Z0-9]\w*', keyword)
                keyword = ' '.join(header_regex)
                print('Keyword:', keyword)
                print('country:', country)
                response['headers'] = ['Keyword', 'Monthly Volume', 'Ranking Difficulty', 'CPC($)']
                data = []

                api_url = "%s/%s/" % (settings.GET_KEYWORDS_FROM_KEYWORD_API_URL, keyword)
                print('api_url:', api_url)
                api_response = requests.get(api_url)
                keywords_data = api_response.json()

                for key, val in keywords_data.items():
                    if val['keyword'] == keyword:
                        response['keyword_data'] = {'monthly_volume': val['avg_monthly_searches'],
                                                    'ranking_difficulty': val['competition_value'],
                                                    'cost_per_click': round(float(val['high_bid']), 3),
                                                    'keyword': keyword}
                    data_list = [[val['keyword'], ''],
                                [val['avg_monthly_searches'], ''],
                                [str(val['competition_value']), ''],
                                [round(float(val['high_bid']), 3), '']]
                    data.append(data_list)

                # log_msg = "%s Visited Keyword Explorer For Keyword %s" % (request.user.first_name, keyword)
                # save_system_logs(log_msg, request.user.email)
                response['status'] = True
                response['data'] = data
                response['keyword'] = keyword
                response['page_title'] = "Keyword Explorer"

                user_obj = Profile.objects.get(user_id=request.user)
                subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
                module = Module.objects.get(name = 'Keyword Explorer')
                units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
                units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
                # subscription_id = subscription,
                units.consumed_units += 1
                units.save()
                print(units.consumed_units)
                consumed_unit_percent = (units.consumed_units / units_allowed) * 100
                print('Percentage is ',consumed_unit_percent, '%')
                response['consumed_units_percentage'] = consumed_unit_percent
                response['allowed_units'] = units_allowed
                response['consumed_units'] = units.consumed_units

        except Exception as e:
            print('Exception: ', repr(e))
            response['error'] = repr(e)
    else:
        print("Kewords Explorer Limit Exceeded")
        response.update({"limits_error":"You've reached your limits for the plan. You can see more by upgrading to the higher plan."})
    return JsonResponse(response)


@login_required
def keyword_ideas(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/keyword_ideas.html', context)

@login_required
def schema_generator(request):
    context = {}
    return render(request, 'site_audit/schema_generator.html', context)


@login_required
def site_audit_project_list(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/site_audit_project_list.html', context)


@login_required
def site_audit_project_listview(request):
    response = {'status': False}
    try:
        days = request.GET.get('days')
        columns = ['pk', 'i_website__website_url', 'created_on']
        response['headers'] = ['Website', 'Action', "Today's Health Score", 'Visits', 'Previous Period', 'Change']
        if days:
            days_before = date.today() - timedelta(days=days)
            projects_list = SiteAuditProject.objects.filter(
                created_on__gte=days_before, created_by=request.user).values_list(*columns).order_by('-pk')
        else:
            projects_list = SiteAuditProject.objects.filter(
                created_by=request.user).values_list(*columns).order_by('-pk')
        data = []
        for pk, website_url, created_on in projects_list:
            btn_list = []
            profile_btn = ['%s' % pk, "Complete Profile", ""]
            btn_list.append(profile_btn)
            delete_btn = ['%s' % pk, "Delete", ""]
            btn_list.append(delete_btn)
            actions = [btn_list, "action"]

            data_list = [[website_url, ''], actions,
                         ['0%', ''],
                         ['0', ''],
                         ['0', ''],
                         ['-', '']
                         ]
            data.append(data_list)
        response['status'] = True
        response['data'] = data
        response['page_title'] = "Active websites"
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def site_audit_jobs_list(request):
    return render(request, 'site_audit/site_audit_jobs_list.html')


@login_required
def site_audit_jobs_listview(request):
    response = {'status': False}
    try:
        project_id = request.GET.get('project_id')
        columns = ['pk', 'i_site_audit_project__website_url', 'created_on', 'job_status']
        response['headers'] = ['Job ID', 'Url', 'Created On', 'Status']
        projects_list = SiteAuditJob.objects.filter(i_site_audit_project_id=project_id)\
            .values_list(*columns).order_by('-pk')
        data = []
        for pk, url, created_on, job_status in projects_list:
            data_list = [[pk, ''], [url, ''], [created_on.strftime('%Y-%m-%d %H:%M:%S'), ''], [job_status, '']]
            data.append(data_list)
        response['status'] = True
        response['data'] = data
        response['page_title'] = "Site Audit Jobs"
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def site_audit_view(request):
    url = request.GET.get('url')
    project_id = request.GET.get('project_id')
    return render(request, 'site_audit/site_audit_view.html', {'url': url, 'project_id': project_id})


@login_required
def get_site_data(request):
    project_id = request.GET.get('project_id')
    response = {'status': False}
    try:
        site_audit_qs = SiteAuditData.objects.filter(i_site_audit_job__i_site_audit_project_id=project_id,
                                                     processed_on__isnull=False).order_by('-processed_on')
        if site_audit_qs:
            site_audit_obj = site_audit_qs[0]
            website_seo_data = json.load(site_audit_obj.website_seo_data)
            response['page_data_dict'] = website_seo_data['page_data_dict']
            response['response_desktop'] = website_seo_data['response_desktop']
            response['response_mobile'] = website_seo_data['response_mobile']
            response['website_seo_data'] = {'output': website_seo_data['output']}
            response['status'] = True
        else:
            response['error'] = 'data not found'
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def website_overview(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/website_overview.html', context)


@login_required
def website_data_listview(request):
    response = {'status': False, 'top_keyword': ''}
    try:
        if request.method == 'GET':
            website = request.GET.get('website')
            country = request.GET.get('country')
            website = website.lower()
            print('website:', website)
            print('country:', country)
            response['headers'] = ['Keyword', 'Monthly Volume', 'Ranking Difficulty', 'CPC($)']
            data = []
            api_url = "%s/%s/" % (settings.GET_KEYWORD_FROM_WEBSITE_API_URL, website)
            print('api_url:', api_url)
            api_response = requests.get(api_url)
            keywords_data = api_response.json()
            if keywords_data:
                for key, val in keywords_data.items():
                    data_list = [
                        [val['keyword'], ''],
                        [val['avg_monthly_searches'], ''],
                        [str(val['competition_value']), ''],
                        [round(float(val['high_bid']), 3), '']
                    ]
                    data.append(data_list)
                response['data'] = sorted(data, key=lambda x: x[2], reverse=True)
                val = response['data'][0]
                response['keyword_data'] = {
                    'website_authority': val[2][0], 'organic_search_traffic': val[1][0],
                    'total_no_of_keywords': round(float(keywords_data[response['data'][0][0][0]]["low_bid"]), 3),
                    'tracked_keywords': round(float(val[3][0]), 3)}
                response['top_keyword'] = val[0][0]
            response['page_title'] = "List of Keywords"
            response['status'] = True
            # log_msg = "%s Search Website Keywords For Website %s" % (
            #  request.user.first_name, website)
            # save_system_logs(log_msg, request.user.email)
    except Exception as e:
        print('Exception: ', repr(e))
        response['errors'] = repr(e)
    return JsonResponse(response)


@login_required
def run_management_command(request):
    call_command('seo_site_analyzer')
    call_command('site_diagnostics')
    call_command('fetch_broken_links')
    # call_command('site_audit_job_creation')
    return HttpResponse("<p style='color:green;'>All commands runs successfully</p>")


@login_required
@project_required()
def objectives(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/objectives.html', context)


@login_required
@csrf_exempt
@project_required()
def keyword_explorer(request):
    if request.method == 'GET':
        project_id = request.GET.get('id')
        context = {'project_id': project_id}
        return render(request, 'site_audit/keyword_explorer.html', context)
    else:
        keyword = request.POST.get('keyword')
        country = request.POST.get('country')
        print('post_data:', keyword, country)
        context = {'keyword': keyword, 'country': country}
        return render(request, 'site_audit/keyword_explorer_step2.html', context)


@login_required
@csrf_exempt
def delete_site_audit_project(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            project_id = request.POST.get('project_id')
            SiteAuditProject.objects.get(pk=project_id).delete()
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_websites(request):
    response = {'status': False, 'websites': []}
    websites_list = []
    try:
        cols = ['i_website__website_url']
        websites_qs = SiteAuditProject.objects.filter(
            created_by=request.user).order_by('-pk')
        subscription_obj = Subscriptions.objects.get(profile_id = request.user.profile, is_active = True)
        plan_obj = Plan.objects.get(pk = subscription_obj.plan_id.pk)
        for website in websites_qs:
            data = list(UserSelectedWebsite.objects.filter(i_site_audit_project = website ,i_profile = request.user.profile).values(*cols).order_by('-pk'))
            allowed_links = PlanModuleDetail.objects.get(plan_id = plan_obj, module_id__name = 'Crawl Page Limit').units_allowed
            consumed_links = UserModuleUnits.objects.get(module_id__name = 'Crawl Page Limit', subscription_id = subscription_obj).consumed_units
            urls = [d['i_website__website_url'] for d in data]
            websites_list.append({
                "id": website.pk , 
                "i_website__website_url": website.i_website.website_url, 
                "urls_list": urls ,
                "links_count": len(urls),
                "allowed_links" : allowed_links,
                "creation_date": datetime.strftime(website.created_on,'%d-%b-%Y'),
                "consumed_links" : consumed_links
                })

        response['status'] = True
        response['websites'] = list(websites_list)
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def add_website(request):
    response = {'status': False}
    if request.method == 'POST':
        con_units = plan_details(request, 'Add Website')
        website_url = request.POST.get('website_url')
        # website_url = list(website_url.split(","))
        print('website_url:', website_url)
        # for website in website_url:
        try:
            if website_url:
                if con_units:
                    website_url = get_website_domain(website_url)
                    website_obj, is_created = Website.objects.get_or_create(website_url=website_url)
                    project_obj = SiteAuditProject.objects.create(
                        i_website=website_obj, created_by=request.user)
                    response['status'] = True
                    user_obj = Profile.objects.get(user_id=request.user)
                    subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
                    module = Module.objects.get(name = 'Add Website')
                    units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
                    units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
                    # subscription_id = subscription,
                    units.consumed_units += 1
                    units.save()
                    print(units.consumed_units)
                    consumed_unit_percent = (units.consumed_units / units_allowed) * 100
                    print('Percentage is ',consumed_unit_percent, '%')
                    response['consumed_units_percentage'] = consumed_unit_percent
                    response['allowed_units'] = units_allowed
                    response['consumed_units'] = units.consumed_units
                    log_msg = "%s Added a new SiteAuditProject %s in system" %(request.user.email,website_obj.website_url)
                    save_system_logs(log_msg, request.user.email)
                else:
                    log_msg = "%s trying to Add a new SiteAuditProject %s but Website Limit Exceeded! " %(request.user.email,website_url)
                    save_system_logs(log_msg, request.user.email)
                    print("Websites Limit Exceeded!")
                    response.update({"limits_error":"You've reached your limits for the plan. You can see more by upgrading to the higher plan."})
            else:
                log_msg = "%s trying Website URL which is empty " %(request.user.email)
                save_system_logs(log_msg, request.user.email)
                response['error'] = 'Website URL is empty'
        except Exception as e:
            print('Exception: ', repr(e))
            log_msg = "Error Occurred While adding website: %s by %s" %(repr(e),request.user.email)
            save_system_logs(log_msg, request.user.email)
            response['error'] = f'{website_url} already exists in your dashboard.'
    else:
        return render(request, 'site_audit/add_website.html')
    return JsonResponse(response)

# @login_required
@csrf_exempt
def add_multiple_website(request):
    response = {'status': False}
    if request.method == 'POST':
        project_id = request.POST.get('project_id', None)
        main_url = request.POST.get('main_url', None)
        website_url = request.POST.get('website_url')
        website_url = str(website_url)
        website_url = website_url.strip(']["')
        website_url = website_url.strip('","')
        website_url = website_url.strip('","')
        website_url = list(website_url.split('","'))
        user = request.user
        if main_url:
            print('main_url: ',main_url)
            
            project_obj = SiteAuditProject.objects.get(i_website__website_url = main_url, created_by = user)
            website_url.append(main_url)
        elif project_id:
            project_obj = SiteAuditProject.objects.get(pk = project_id, created_by = user)
            website_url.append(project_obj.i_website.website_url)
        website_url = list(set(website_url))
        print('website_url ', website_url,end='\n\n')
        
        user = request.user
        
        
        user = project_obj.created_by
        print('project_obj ', project_obj)
        print('website_url :', website_url)
        try:
            # get all the users selected websites corresponding to given SAP
            user_selected_qs =  UserSelectedWebsite.objects.filter(
                        i_site_audit_project=project_obj,
                        i_profile=user.profile
                        )
            user_selected_list =  user_selected_qs.values_list('i_website__website_url',flat= True)
            if set(user_selected_list) != set(website_url):
                user_selected_qs.delete()
                with transaction.atomic():
                    for website in website_url:
                        website_obj, created = Website.objects.get_or_create(website_url = website)
                        user_selected_webpage = UserSelectedWebsite.objects.create(
                            i_site_audit_project = project_obj, 
                            i_website = website_obj,i_profile=user.profile)
                    crawl_user_websites(project_obj)
                response['status'] = True
                log_msg = "%s Added/Edited a new UserSelectedWebsite in system" %(request.user.email)
                save_system_logs(log_msg, request.user.email)
            else:
                with transaction.atomic():
                    user_selected_qs =  UserSelectedWebsite.objects.filter(
                        i_site_audit_project=project_obj,
                        i_profile=user.profile
                        )
                    for selected_website in user_selected_qs:
                         site_scrapy_data_qs = SiteScrapyData.objects.filter(i_website__website_url = selected_website.i_website.website_url)
                         if site_scrapy_data_qs:
                            website_url.remove(selected_website.i_website.website_url)
                    if len(website_url) > 0:
                        crawl_user_websites(project_obj)
                log_msg = "%s Selected already added UserSelectedWebsite in system" %(request.user.email)
                save_system_logs(log_msg, request.user.email)
                response['status'] = True
        except Exception as e:
            print('Exception: ',repr(e))
            log_msg = "Error Occurred While adding Multiple website: %s by %s" %(repr(e),request.user.email)
            save_system_logs(log_msg, request.user.email)
            response['error'] = repr(e)
        
    else:
        return render(request, 'site_audit/add_website.html')
    return JsonResponse(response)            
    #         # user_selected_mainpage, created = UserSelectedWebsite.objects.get_or_create(
    #         #                 i_profile = profile_obj, 
    #         #                 i_site_audit_project = project_obj, 
    #         #                 i_website = main_website
    #         #     )
    #         # print('user_selected_mainpage ', user_selected_mainpage)
            
    #         with transaction.atomic():
    #             for website in website_url:
    #                     website_obj, created = Website.objects.get_or_create(website_url = website)
    #                     user_selected_webpage, created = UserSelectedWebsite.objects.get_or_create(
    #                         i_profile = profile_obj, i_site_audit_project = project_obj, i_website = website_obj)
    #                     print(website_obj.website_url," is getting add under ",project_obj)
    #         response['status'] = True

    #         if changed:

    #             process_data = crawl_user_websites(project_obj)
            
    #         else:


    #         response['process_crawl_data'] = process_data

    #     except Exception as e:
    #         print(repr(e))
    #         response['error'] = repr(e)
    # else:
    #     return render(request, 'site_audit/add_website.html')
    # return JsonResponse(response)


@login_required
@csrf_exempt
def add_competitor(request):
    response = {'status': False}
    if request.method == 'POST':
        con_units = plan_details(request, 'My Competitors')
        user_obj = Profile.objects.get(user_id=request.user)
        subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
        module = Module.objects.get(name = 'My Competitors')
        units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
        units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
        if con_units:   
            project_id = request.POST.get('project_id')
            website_url = request.POST.get('website_url')
            try:
                if website_url:
                    website_url = get_website_domain(website_url)
                    website_obj, is_created = Website.objects.get_or_create(website_url=website_url)
                else:
                    response['error'] = 'Website URL is empty'
                    return JsonResponse(response)

                SiteCompetitor.objects.create(
                    i_site_audit_project_id=project_id, i_website=website_obj)
                response['status'] = True

                
                # subscription_id = subscription,
                units.consumed_units += 1
                units.save()
                print(units.consumed_units)
                consumed_unit_percent = (units.consumed_units / units_allowed) * 100
                print('Percentage is ',consumed_unit_percent, '%')
                response['consumed_units_percentage'] = consumed_unit_percent
                response['allowed_units'] = units_allowed
                response['consumed_units'] = units.consumed_units

            except IntegrityError as e:
                print('IntegrityError: ', repr(e))
                response['error'] = 'Competitors cannot be duplicated'
            except Exception as e:
                print('Exception: ', repr(e))
                response['error'] = repr(e)
        else:
            print("Competitors Limit Exceeded")
            response['limits_error'] = "You've reached your limits for the plan. You can see more by upgrading to the higher plan."
            response['allowed_units'] = units_allowed
    return JsonResponse(response)


@login_required
@project_required()
def competitors(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/competitors.html', context)


@login_required
def competitors_step2(request):
    project_id = request.GET.get('id')
    user_obj = Profile.objects.get(user_id=request.user)
    subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
    module = Module.objects.get(name = 'My Competitors')
    units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
    units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module).consumed_units
    context = {'project_id': project_id, 'allowed_units' : units_allowed, 'consumed_units' : units}
    return render(request, 'site_audit/competitors_step2.html', context)



@login_required
def get_competitors_data(request):
    response = {'status': False}
    try:
        sandbox_testing = GlobalConfiguration.objects.get(name='sandbox_testing').value
        sandbox_testing = sandbox_testing.lower()

        # project_id = request.GET.get('project_id')
        competitor_id = request.GET.get('competitor_id')

        site_competitor_obj = SiteCompetitor.objects.get(pk=competitor_id)

        backlinks_data_expiry = GlobalConfiguration.objects.get(name='backlink_data_expiry_days').value
        interval_time = timezone.now() - timedelta(days=int(backlinks_data_expiry))
        api_name = 'backlinks_api_url'

        resp = {}
        previous_resp = {}
        website_obj = site_competitor_obj.i_website
        website_url = website_obj.website_url
        backlink_qs = WebsiteBacklink.objects.filter(i_website=website_obj)

        if backlink_qs:
            last_backlink_obj = backlink_qs.order_by('-created_on')[0]
            if len(backlink_qs) > 1:
                second_last_backlink_obj = backlink_qs.order_by('-created_on')[1]
            else:
                second_last_backlink_obj = ''

            if interval_time >= last_backlink_obj.created_on:
                results, api_response = get_response(sandbox_testing, api_name, website_url)

                if results:
                    create_website_backlink_obj(api_response, website_obj)
                    resp = api_response
                    previous_results = get_last_month_data(last_backlink_obj)
                else:
                    resp = json.load(last_backlink_obj.backlinks_data)
                    resp.update({'info': f'The provided data is older than {backlinks_data_expiry} days'})
                    previous_results = get_last_month_data(second_last_backlink_obj)
            else:
                resp = json.load(last_backlink_obj.backlinks_data)
                previous_results = get_last_month_data(second_last_backlink_obj)

            resp.update({'status': True})
        else:
            results, api_response = get_response(sandbox_testing, api_name, website_url)

            if results:
                create_website_backlink_obj(api_response, website_obj)
                resp = api_response
                resp.update({'status': True})
            else:
                resp.update({'error': 'Connection Error'})
                resp.update(api_response)
            previous_results = ''

        resp.update({'id': competitor_id})
        previous_resp.update({'id': competitor_id, 'results': previous_results})

        response['api_data'] = resp
        response['previous_results'] = previous_resp
        anchor_text_api_response = get_anchor_text(website_obj)
        response['anchor_text'] = anchor_text_api_response
        response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


# @login_required
def get_backlinks(request):
    
    response = {'status': False, 'info': ''}
    if request.method == 'GET':
    
        con_units = plan_details(request, 'My Backlinks')
 
        if con_units:    
            try:
                sandbox_testing = GlobalConfiguration.objects.get(name='sandbox_testing').value
                sandbox_testing = sandbox_testing.lower()
                website_url = request.GET.get('website_url')
                project_id = request.GET.get('project_id')
                print('project_id:', project_id)
                print('website_url:', website_url)
                try:
                    project_obj = SiteAuditProject.objects.get(pk=project_id, i_website__website_url=website_url)
                except ObjectDoesNotExist:
                    response['error'] = 'project_id or website_url is invalid'
                    return JsonResponse(response)

                website_obj = project_obj.i_website
                website_url = website_obj.website_url
                backlink_qs = WebsiteBacklink.objects.filter(i_website=website_obj)
                backlinks_data_expiry = GlobalConfiguration.objects.get(name='backlink_data_expiry_days').value
                interval_time = timezone.now() - timedelta(days=int(backlinks_data_expiry))
                api_name = 'backlinks_api_url'

                if backlink_qs:
                    last_backlink_obj = backlink_qs.order_by('-created_on')[0]
                    if len(backlink_qs) > 1:
                        second_last_backlink_obj = backlink_qs.order_by('-created_on')[1]
                    else:
                        second_last_backlink_obj = ''

                    if interval_time >= last_backlink_obj.created_on:
                        results, api_response = get_response(sandbox_testing, api_name, website_url)

                        if results:
                            create_website_backlink_obj(api_response, website_obj)
                            response = api_response
                            previous_results = get_last_month_data(last_backlink_obj)
                        else:
                            response = json.load(last_backlink_obj.backlinks_data)
                            response.update({'info': f'The provided data is older than {backlinks_data_expiry} days'})
                            previous_results = get_last_month_data(second_last_backlink_obj)
                    else:
                        response = json.load(last_backlink_obj.backlinks_data)
                        previous_results = get_last_month_data(second_last_backlink_obj)

                    response.update({'status': True})
                else:
                    results, api_response = get_response(sandbox_testing, api_name, website_url)

                    if results:
                        create_website_backlink_obj(api_response, website_obj)
                        response = api_response
                        response.update({'status': True})
                    else:
                        response.update({'error': 'Connection Error'})
                        response.update(api_response)
                    previous_results = ''

                response.update({'previous_results': previous_results})

                anchor_text_api_response = get_anchor_text(website_obj)
                response.update({'anchor_text': anchor_text_api_response})

                user_obj = Profile.objects.get(user_id=request.user)
                subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
                module = Module.objects.get(name = 'My Backlinks')
                units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
                units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
                # subscription_id = subscription,
                units.consumed_units += 1
                units.save()
                print(units.consumed_units)
                consumed_unit_percent = (units.consumed_units / units_allowed) * 100
                print('Percentage is ',consumed_unit_percent, '%')
                response['consumed_units_percentage'] = consumed_unit_percent
                response['allowed_units'] = units_allowed
                response['consumed_units'] = units.consumed_units

            except Exception as e:
                print('Exception: ', repr(e))
                response['error'] = repr(e)

        else:
            print("BACKLINKS LIMIT EXCEEDED")
            response.update({"limits_error":"You've reached your limits for the plan. You can see more by upgrading to the higher plan."})

    return JsonResponse(response)

@login_required
@project_required()
def alerts(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/alerts.html', context)


@login_required
@project_required()
def backlinks(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/backlinks.html', context)


@login_required
@project_required()
def all_website(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/all_website.html', context)


@login_required
@csrf_exempt
@project_required()
def my_keywords(request):
    response = {'status': False, 'info': ''}

    con_units = plan_details(request, 'My Keywords')
    if con_units:
        user_obj = Profile.objects.get(user_id=request.user)
        module = Module.objects.get(name = 'My Keywords')
        subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
        units_allowed = PlanModuleDetail.objects.get(plan_id = subscription.plan_id, module_id = module).units_allowed
        units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
        # subscription_id = subscription,

        if request.method == 'GET':
            project_id = request.GET.get('id')
            context = {'project_id': project_id}
            units.consumed_units += 1
            units.save()
            print(units.consumed_units)
            consumed_unit_percent = (units.consumed_units / units_allowed) * 100
            print('Percentage is ',consumed_unit_percent, '%')
            context['consumed_units_percentage'] = consumed_unit_percent
            context['allowed_units'] = units_allowed
            context['consumed_units'] = units.consumed_units

            return render(request, 'site_audit/my_keywords.html', context)
            
        else:
            keyword = request.POST.get('keyword')
            country = request.POST.get('country')
            print('post_data:', keyword, country)
            context = {'keyword': keyword, 'country': country}
            user_obj = Profile.objects.get(user_id=request.user)
            subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
            module = Module.objects.get(name = 'My Keywords')
            units = UserModuleUnits.objects.get(subscription_id__profile_id = user_obj , module_id = module)
            # subscription_id = subscription,
            units.consumed_units += 1
            units.save()
            print(units.consumed_units)
            consumed_unit_percent = (units.consumed_units / units_allowed) * 100
            print('Percentage is ',consumed_unit_percent, '%')
            context['consumed_units_percentage'] = consumed_unit_percent
            context['allowed_units'] = units_allowed
            context['consumed_units'] = units.consumed_units
            # units = UserModuleUnits.objects.get(module_id = 2)
            # units.consumed_units += 1
            # units.save()
            return render(request, 'site_audit/keyword_explorer_step2.html', context)
            

    else:
        print("KEYWORDS LIMIT EXCEEDED")
        context = {"error" : "You have reached your limits for the plan. You can see more by upgrading to the higher plan."}
        return render(request, 'site_audit/my_keywords.html', context)


@login_required
@project_required()
def social_analytics(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/social_analytics.html', context)


@login_required
@project_required()
def rank_guard(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/rank_guard.html', context)


@login_required
def get_project_location(request):
    response = {'status': False, 'location': ''}
    try:
        project_id = request.GET.get('project_id')
        location = SiteAuditProject.objects.get(pk=project_id).location
        response['location'] = location if location else ''
        response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def save_project_location(request):
    response = {'status': False}
    if request.method == 'POST':
        try:
            project_id = request.POST.get('project_id')
            location = request.POST.get('location')
            project_obj = SiteAuditProject.objects.get(pk=project_id)
            project_obj.location = location
            project_obj.save()
            response['status'] = True
        except Exception as e:
            print('Exception: ', repr(e))
            response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@project_required()
def services(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/services.html', context)


@login_required
@project_required()
def support(request):
    project_id = request.GET.get('id')
    try:
        recaptcha_site_key = GlobalConfiguration.objects.get(name='google_recaptcha_site_key').value
    except GlobalConfiguration.DoesNotExist:
        print('google_recaptcha_site_key not found in GlobalConfiguration model')
        recaptcha_site_key = ''
    context = {'project_id': project_id, 'recaptcha_site_key': recaptcha_site_key}
    return render(request, 'site_audit/support.html', context)


@login_required
def get_competitors(request):
    response = {'status': False}
    if request.method == 'GET':
        try:
            project_id = request.GET.get('project_id')
            competitors_list = SiteCompetitor.objects.filter(
                i_site_audit_project_id=project_id).values('id', 'i_website__website_url').order_by('-pk')
            response['competitors'] = list(competitors_list)
            response['status'] = True
        except Exception as e:
            print('Exception: ', repr(e))
            response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def delete_site_competitor(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            pk = request.POST.get('id')
            SiteCompetitor.objects.get(pk=pk).delete()
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def objective(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/objective.html', context)


@login_required
def get_objectives(request):
    response = {'status': False}
    try:
        project_id = request.GET.get('project_id')
        objective_id = request.GET.get('id')
        cols = ['id', 'i_objective_type_id', 'i_objective_type__name', 'objective_name', 'objective_desc',
                'objective_sub_desc', 'level', 'duration']
        if objective_id:
            objectives_list = Objective.objects.filter(pk=objective_id).values(*cols).order_by('-pk')
        else:
            objectives_list = Objective.objects.values(*cols).order_by('-pk')

        for objective_dict in objectives_list:
            project_objective_obj = ProjectObjective.objects.filter(
                i_site_audit_project_id=project_id, i_objective_id=objective_dict['id']).first()
            if project_objective_obj:
                objective_dict['objective_status'] = project_objective_obj.objective_status
                objective_dict['completion_score'] = project_objective_obj.completion_score
            else:
                objective_dict['objective_status'] = 'begin'
                objective_dict['completion_score'] = '0'

        response['objectives'] = list(objectives_list)
        response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def update_objective_status(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            project_id = request.POST.get('project_id')
            objective_id = request.POST.get('objective_id')
            objective_status = request.POST.get('objective_status')
            print('project_id:', project_id)
            print('objective_id:', objective_id)
            print('objective_status:', objective_status)
            completion_score = 0
            object_status = 'begin'
            if objective_status == 'begin':
                object_status = 'resume'
            elif objective_status == 'skip':
                object_status = 'begin'

            project_objective_obj = ProjectObjective.objects.filter(
                i_site_audit_project_id=project_id, i_objective_id=objective_id).first()
            if project_objective_obj:
                project_objective_obj.objective_status = object_status
                project_objective_obj.save()
            else:
                ProjectObjective.objects.create(i_site_audit_project_id=project_id, i_objective_id=objective_id,
                                                objective_status=object_status, completion_score=completion_score)

            response['objective_status'] = True
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def keyword_introduction(request):
    project_id = request.GET.get('id')
    context = {'project_id': project_id}
    return render(request, 'site_audit/keyword_introduction.html', context)


@login_required
@csrf_exempt
def save_track_keyword(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            project_id = request.POST.get('project_id')
            keyword = request.POST.get('keyword')
            action = request.POST.get('action')
            print('project_id:', project_id)
            print('keyword:', keyword)
            print('action:', action)

            if action == 'start':
                track_keyword_qs = TrackKeyword.objects.filter(i_site_audit_project_id=project_id, keyword=keyword)
                if track_keyword_qs:
                    track_keyword_qs.update(tracking_status=action)
                else:
                    track_keyword_obj = TrackKeyword.objects.create(
                        i_site_audit_project_id=project_id, keyword=keyword, tracking_status=action)

                    website_obj = track_keyword_obj.i_site_audit_project.i_website

                    keyword_qs = WebsiteOrganicKeywords.objects.filter(i_website=website_obj)
                    tracking_value = ''
                    old_tracking_value = ''
                    tracking_change = ''
                    if keyword_qs:
                        keyword_obj = keyword_qs.latest('created_on')
                        keywords_list = keyword_obj.keywords
                        for data in keywords_list:
                            if data['term'] == keyword:
                                tracking_value = data['position']
                                tracking_change = data['url_position_change']
                                previous_position = data['previous_position']
                                old_tracking_value = tracking_value if previous_position == 0 else previous_position

                    old_month = date.today().month - 1
                    old_tracking_date = date.today().replace(month=old_month)

                    TrackKeywordDetail.objects.create(i_track_keyword=track_keyword_obj,
                                                      tracking_date=old_tracking_date,
                                                      tracking_value=old_tracking_value)

                    TrackKeywordDetail.objects.create(i_track_keyword=track_keyword_obj,
                                                      tracking_date=date.today(),
                                                      tracking_value=tracking_value,
                                                      tracking_change=tracking_change)

            elif action == 'stop':
                TrackKeyword.objects.filter(
                    i_site_audit_project_id=project_id, keyword=keyword).update(tracking_status=action)

            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_track_keyword(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            project_id = request.GET.get('project_id')
            print('project_id:', project_id)

            track_keyword_qs = TrackKeyword.objects.filter(
                i_site_audit_project_id=project_id, tracking_status='start').order_by('-pk')
            track_keyword_list = track_keyword_qs.values_list('keyword', flat=True)

            data_dict = {}
            for keyword_obj in track_keyword_qs:
                keyword_detail = TrackKeywordDetail.objects.filter(
                    i_track_keyword=keyword_obj).values().order_by('-tracking_date')
                data_dict[keyword_obj.keyword] = list(keyword_detail)

            response['track_keywords'] = list(track_keyword_list)
            response['track_keywords_detail'] = data_dict
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_analytics_data(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            project_id = request.GET.get('project_id')
            print('project_id:', project_id)

            data = {'daily_health_score': 116, 'website_rank': {'traffic': 30, 'social': 50,
                                                                'mobile': 80, 'visitor_experience': 90}}

            response['data'] = data
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


# @login_required
def get_website_json(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            project_id = request.GET.get('project_id')
            country = request.GET.get('country')
            print('project_id:', project_id)
            overview_json = {}
            response['overview_json'] = overview_json
            site_audit_project = SiteAuditProject.objects.get(id=project_id)
            website_obj = site_audit_project.i_website
            website = website_obj.website_url
            backlink_qs = WebsiteBacklink.objects.filter(i_website=website_obj)
            if backlink_qs:
                backlink_obj = backlink_qs.latest('created_on')
                backlinks_data = json.load(backlink_obj.backlinks_data)
                response.update(backlinks_data)
            else:
                backlinks_data = ''
                response['results'] = ''
            website = website.lower()
            print('website:', website)
            print('country:', country)
            keyword_json_resp = get_website_keywords(website_obj)
            response['keyword_json'] = keyword_json_resp['current_keyword']
            response['previous_keyword'] = keyword_json_resp['previous_keyword']
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_website_analytics(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            project_id = request.GET.get('project_id')
            print('project_id:', project_id)
            # google_analytics_qs = GoogleAnalytics.objects.filter(i_site_audit_project_id=project_id)
            # if google_analytics_qs:
            #     analytics_data = google_analytics_qs.latest('pk').analytics_data
            #     response['analytics_data'] = analytics_data
            #     response['status'] = True
            # else:
            #     response['error'] = 'Google Analytics data not found'
            response['analytics_data'] = google_analytics_json
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_competitor_website_json(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            # website_url = request.GET.get('website_url')
            country = request.GET.get('country')
            competitor_id = request.GET.get('competitor_id')
            print('competitor_id:', competitor_id)
            competitor_obj = SiteCompetitor.objects.get(pk=competitor_id)
            website_obj = competitor_obj.i_website
            keyword_json_resp = get_website_keywords(website_obj)
            response['keyword_json'] = keyword_json_resp['current_keyword']
            response['previous_keyword'] = keyword_json_resp['previous_keyword']
            response['overview_json'] = {}
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def save_competitor_track_keyword(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            competitor_id = request.POST.get('competitor_id')
            keyword = request.POST.get('keyword')
            action = request.POST.get('action')
            print('competitor_id:', competitor_id)
            print('keyword:', keyword)
            print('action:', action)

            if action == 'start':
                track_keyword_qs = CompetitorTrackKeyword.objects.filter(
                    i_site_competitor_id=competitor_id, keyword=keyword)
                if track_keyword_qs:
                    track_keyword_qs.update(tracking_status=action)
                else:
                    track_keyword_obj = CompetitorTrackKeyword.objects.create(
                        i_site_competitor_id=competitor_id, keyword=keyword, tracking_status=action)

                    website_obj = track_keyword_obj.i_site_competitor.i_website

                    keyword_qs = WebsiteOrganicKeywords.objects.filter(i_website=website_obj)
                    tracking_value = ''
                    old_tracking_value = ''
                    tracking_change = ''
                    if keyword_qs:
                        keyword_obj = keyword_qs.latest('created_on')
                        keywords_list = keyword_obj.keywords
                        for data in keywords_list:
                            if data['term'] == keyword:
                                tracking_value = data['position']
                                tracking_change = data['url_position_change']
                                previous_position = data['previous_position']
                                old_tracking_value = tracking_value if previous_position == 0 else previous_position

                    # old_month = date.today().month - 1
                    current_date = date.today()
                    for_previous_month = relativedelta(months=1)
                    old_month = current_date - for_previous_month
                    print(old_month)
                    
                    # old_tracking_date = date.today().replace(month=old_month)
                    

                    CompetitorTrackKeywordDetail.objects.create(
                        i_competitor_track_keyword=track_keyword_obj,
                        tracking_date=old_month,
                        tracking_value=old_tracking_value)

                    CompetitorTrackKeywordDetail.objects.create(i_competitor_track_keyword=track_keyword_obj,
                                                                tracking_date=date.today(),
                                                                tracking_value=tracking_value,
                                                                tracking_change=tracking_change)

            elif action == 'stop':
                CompetitorTrackKeyword.objects.filter(
                    i_site_competitor_id=competitor_id, keyword=keyword).update(tracking_status=action)

            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def get_competitor_track_keyword(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            competitor_id = request.GET.get('competitor_id')
            print('competitor_id:', competitor_id)

            track_keyword_qs = CompetitorTrackKeyword.objects.filter(
                i_site_competitor_id=competitor_id, tracking_status='start').order_by('-pk')
            track_keyword_list = track_keyword_qs.values_list('keyword', flat=True)

            data_dict = {}
            for keyword_obj in track_keyword_qs:
                keyword_detail = CompetitorTrackKeywordDetail.objects.filter(
                    i_competitor_track_keyword=keyword_obj).values().order_by('-tracking_date')
                data_dict[keyword_obj.keyword] = list(keyword_detail)

            response['track_keywords'] = list(track_keyword_list)
            response['track_keywords_detail'] = data_dict
            response['status'] = True
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
def pro_managed(request):
    return render(request, 'site_audit/pro_managed.html')


@login_required
def seo_services(request):
    try:
        recaptcha_site_key = GlobalConfiguration.objects.get(name='google_recaptcha_site_key').value
    except GlobalConfiguration.DoesNotExist:
        print('google_recaptcha_site_key not found in GlobalConfiguration model')
        recaptcha_site_key = ''
    context = {'recaptcha_site_key': recaptcha_site_key}
    return render(request, 'site_audit/seo_services.html', context)


# @login_required
def pricing(request):
    return render(request, 'site_audit/pricing.html')


@csrf_exempt
def save_contact_details(request):
    response = {"status": False}
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            phone_number = request.POST.get('phone_number')
            subject = request.POST.get('subject')
            address = request.POST.get('address')
            message = request.POST.get('message')
            print('phone_number:', phone_number)
            ph_number = phonenumbers.parse(phone_number)
            # is_valid = phonenumbers.is_possible_number(ph_number)
            is_valid = phonenumbers.is_valid_number(ph_number)
            print('phone_number is_valid:', is_valid)
            if is_valid:
                ContactUs.objects.create(name=name, email=email, phone_number=phone_number,
                                         subject=subject, address=address, message=message)
                
                # send_email_to_lead(name, email, phone_number, subject, address, message)
                
                email_to_client(name, email, phone_number, subject, address, message)
                
                try:
                    contact_form_success_message = GlobalConfiguration.objects.get(name='contact_form_success_message').value
                except GlobalConfiguration.DoesNotExist:
                    print('contact_form_success_message not found in GlobalConfiguration model')
                    contact_form_success_message = 'Save Successfully'

                response = {"status": True, "message": contact_form_success_message}
            else:
                response = {"status": False, "error": "Please enter valid phone number"}

        except Exception as e:
            print("Exception:", repr(e))
            number_parse_exp = 'NumberParseException'
            number_field_exp = 'LookupError'
            if number_parse_exp in repr(e) or number_field_exp in repr(e):
                response = {"status": False, "error": "Please enter valid phone number"}
            else:
                response = {"status": False, "error": "Something went wrong, please try again",
                            "exception": repr(e)}
    return JsonResponse(response)


@login_required
def acquisitions_overview(request):
    ga_charged = GlobalConfiguration.objects.get(name='is_google_analytics_charged').value
    context = {
                'is_google_analytics_charged'  : ga_charged
                }
    return render(request, 'site_audit/acquisitions_overview.html', context)


@login_required
def behavior_overview(request):
    ga_charged = GlobalConfiguration.objects.get(name='is_google_analytics_charged').value
    context = {
                'is_google_analytics_charged'  : ga_charged
                }
    return render(request, 'site_audit/behavior_overview.html', context)


@login_required
def audience_overview(request):
    ga_charged = GlobalConfiguration.objects.get(name='is_google_analytics_charged').value
    context = {
                'is_google_analytics_charged'  : ga_charged
                }
    return render(request, 'site_audit/audience_overview.html', context)


@login_required
def dashboard(request):
    ga_charged = GlobalConfiguration.objects.get(name='is_google_analytics_charged').value
    context = {
                'is_google_analytics_charged'  : ga_charged
                }
    return render(request, 'site_audit/dashboard.html', context)


@login_required
def technical_site_audit(request):
    return render(request, 'site_audit/technical_site_audit.html')


@login_required
def dashboard2(request):
    return render(request, 'site_audit/crawler.html')


@login_required
def content(request):
    return render(request, 'site_audit/content.html')

@login_required
def core_vitals(request):
    return render(request, 'site_audit/core_vitals.html')

@login_required
def core_vitals_advance(request):
    return render(request, 'site_audit/core_vitals_advance.html')

@login_required
def preferences(request):
    return render(request, 'site_audit/preferences.html')


@login_required
def seo_website_issues(request):
    return render(request, 'site_audit/seo_website_issues.html')


@login_required
def charts(request):
    return render(request, 'site_audit/charts.html')

# @login_required
def plan_subscription(request):
    plan_id = request.GET.get('plan_id')
    website_url = request.GET.get('website_url')
    try:
        recaptcha_site_key = GlobalConfiguration.objects.get(name='google_recaptcha_site_key').value
    except GlobalConfiguration.DoesNotExist:
        print('google_recaptcha_site_key not found in GlobalConfiguration model')
        recaptcha_site_key = ''
    ga_charged = GlobalConfiguration.objects.get(name='is_google_analytics_charged').value
    context = { 'plan_id': plan_id, 
                'website_url': website_url,
                'recaptcha_site_key': recaptcha_site_key,
                'is_google_analytics_charged'  : ga_charged
                }
    return render(request, 'site_audit/plan_subscription.html', context)

@login_required
def manage_payment_details(request):
    return render(request, 'site_audit/manage_payment_details.html')


def get_auth_url(request):
    project_id = request.GET.get('project_id')
    Scopes=['https://www.googleapis.com/auth/analytics.readonly']

    CLIENT_SECRETS_FILE = '/var/www/cgi-bin/client_secret_wre.json'
    #redirect_uri = 'https://app.websiterankingexpert.com/cgi-bin/oauth2callback'
    redirect_uri = 'https://app.websiterankingexpert.com/site_audit/user_accounts_callback/'

    try:
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=Scopes)

        flow.redirect_uri = redirect_uri
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            approval_prompt='force',
            include_granted_scopes='true')
        print("Project id and STATE", project_id, ' ', state)
        analytics_obj, created = GoogleAnalyticsAccount.objects.get_or_create(
                                                 i_site_audit_project_id=int(project_id))
        analytics_obj.analytics_state = state
        print(analytics_obj)
        analytics_obj.save()
        response = {"status": True, "auth_url": authorization_url}

        # print("Status: 303 See other\r\n")
        print("Location: " + authorization_url + "\r\n\r\n")
    except Exception as e:
        print(e)
        response = {"status": False, "auth_url": ""}

    return JsonResponse(response)


@login_required
def url_analysis(request):
    return render(request, 'site_audit/url_analysis.html')


@login_required
def user_accounts(request):
    return render(request, 'site_audit/user_accounts.html')

def user_accounts_callback(request):
    return render(request, 'site_audit/user_accounts.html')

def get_account_list_data(request):
    response = {'status': False}
    try:
        if request.method == 'GET':
            project_id = request.GET.get('project_id')
            print("project_id is : ", project_id)
            if project_id:
                analytics_obj = GoogleAnalyticsAccount.objects.get(i_site_audit_project_id = int(project_id))
                print(analytics_obj)
                account_data_all = analytics_obj.account_data_all
                if account_data_all:
                    #account_info = json.loads(account_data_all)
                    #print('account_info', account_info)
                    #account_list = account_info['account_list']
                    account_list = account_data_all['account_list']
                    print(type(account_list), "  account_list ",account_list) 
                    response = account_list
                else:
                    response['error'] = "Account Data Not Found"
                #response = account_json
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


@login_required
@csrf_exempt
def add_account_data(request):
    response = {'status': False}
    try:
        if request.method == 'POST':
            account_data = request.POST.get('account_data')
            project_id = request.POST.get('project_id')
            if account_data and project_id:
                account_data = json.loads(account_data)
                print('account_data:', account_data)
                #GoogleAnalyticsAccount.objects.create(account_data=account_data,
                analytics_obj = GoogleAnalyticsAccount.objects.get(
                                                      i_site_audit_project_id=project_id)
                analytics_obj.account_data = account_data
                analytics_obj.save()
                response['status'] = True
            else:
                response['error'] = 'account_data or project_id is empty'
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)



def set_redis_keys(obj, api_url):
    uuid_key = uuid.uuid4().hex
    print("uuid_key : ", uuid_key)

    url_key = uuid_key + '_url'
    credentials_key = uuid_key + '_credentials'
    account_key = uuid_key + '_account'

    print(url_key, credentials_key, account_key)
    print(obj)
    print(obj.account_data_all)
    print(type(obj.account_data_all))

    #account_data_json = json.loads(obj.account_data_all)
    credentials = obj.account_data_all["credentials"]
    #credentials = account_data_json["credentials"]
    print("CREDENTIALS ARE : ", credentials)
    credentials = json.dumps(credentials)
    print(credentials)
    account = obj.account_data
    print("account obj is : ", account)
    account = json.dumps(account)
    print("account", account)

    r = connect_redis()
    r.set(url_key, api_url, 3600)
    r.set(credentials_key, credentials, 3600)
    r.set(account_key, account, 3600)
    print("REDIS KEYS SET")

    return uuid_key 



@login_required
def behaviour_overview(request):
    response = {'status': False}
    try:
        project_id = request.GET.get('project_id')
        from_date = request.GET.get('fromdate')
        to_date = request.GET.get('todate')
        continent = request.GET.get('continent')
        region = request.GET.get('region')
        channel = request.GET.get('channel')
        device = request.GET.get('device')
        if not continent:
            continent = ''
        if not region:
            region = ''
        if not channel:
            channel = ''
        if not device:
            device = ''
        obj = GoogleAnalyticsAccount.objects.filter(i_site_audit_project_id=project_id).last()
        user_account_type = ''
        if obj:
            account_data = obj.account_data
            if account_data:
                user_account_type = list(account_data.keys())[0]
        else:
            print('GoogleAnalyticsAccount NotFound ')
            response['error'] = 'GoogleAnalyticsAccount NotFound'
            return JsonResponse(response)
        data={}
        extra_query_params = f"fromdate={from_date}&todate={to_date}&continent={continent}&deviceCategory={device}&channelGrouping={channel}&region={region}"

        if user_account_type == 'GA4x':
            api_url = f'{settings.BEHAVIOR_OVERVIEW_API}?type=ga4&{extra_query_params}'
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}' 
            
            resp = requests.get(api_url)
            # resp = ga4_api
            if resp:
                resp = resp.json()
                table1_data = ga4_generate_chart_1(resp)
                data['userbehaviour_pageview_mainchart']=table1_data

                table1a_data = ga4_generate_chart_1a(resp)
                data['userbehaviour_pageview_mainchart_pageview']=table1a_data

                table1b_data = ga4_generate_chart_1b(resp)
                data['userbehaviour_pageview_mainchart_uniquepageview']=table1b_data

                table1c_data = ga4_generate_chart_1c(resp)
                data['userbehaviour_pageview_mainchart_avgtime']=table1c_data

                table2_data = ga4_generate_chart_2(resp)
                data['userbehaviour_bouncerate_mainchart']=table2_data

                table2a_data = ga4_generate_chart_2a(resp)
                data['userbehaviour_bouncerate_mainchart_bouncerate']=table2a_data

                table2b_data = ga4_generate_chart_2b(resp)
                data['userbehaviour_bouncerate_mainchart_exit']=table2b_data

                table2c_data = ga4_generate_chart_2c(resp)
                data['userbehaviour_bouncerate_mainchart_pagepersession']=table2c_data

                table3_data = ga4_generate_chart_3(resp)
                data['userbehaviour_popularpage_mainchart']=table3_data

                table3a_data = ga4_generate_chart_3(resp)
                data['userbehaviour_popularpage_mainchart_pageviews']=table3a_data

                table4_data = ga4_generate_chart_4(resp)
                data['userbehaviour_popularpagewithtitle_mainchart']=table4_data

                table4a_data = ga4_generate_chart_4a(resp)
                data['userbehaviour_popularpagewithtitle_mainchart_pagetitle']=table4a_data

                table5_data = ga4_generate_chart_5(resp)
                data['userbehaviour_popularcontent_mainchart']=table5_data

                table5a_data = ga4_generate_chart_5(resp)
                data['userbehaviour_popularcontent_mainchart_subchart']=table5a_data

                table6_data = ga4_generate_chart_6(resp)
                data['userbehaviour_searchterm_mainchart']=table6_data

                table6a_data = ga4_generate_chart_6(resp)
                data['userbehaviour_searchterm_mainchart_subchart']=table6a_data

                table7_data = ga4_generate_chart_7(resp)
                data['userbehaviour_eventcategory_mainchart']=table7_data
                table7a_data = ga4_generate_chart_7(resp)
                data['userbehaviour_eventcategory_mainchart_subchart']=table7a_data

                table8_data = ga4_generate_chart_8(resp)
                data['userbehaviour_loadtime_mainchart']=table8_data

                table8a_data = ga4_generate_chart_8a(resp)
                data['userbehaviour_loadtime_mainchart_subchart']=table8a_data
                data['status']= True

            else:
                print('API Connection error '+str(resp.status_code))
                response['error'] = 'API Connection error '+str(resp.status_code)
                return JsonResponse(response)
        else:
            if user_account_type == 'GA4':
                api_url = f"{settings.BEHAVIOR_OVERVIEW_API}?type=ga4&{extra_query_params}"
            else:
                api_url = f"{settings.BEHAVIOR_OVERVIEW_API}?type=ua&{extra_query_params}"

            print('api_url:', api_url)
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}'
            resp = requests.get(api_url)
            if resp:
                resp = resp.json()
                table1_data = ua_generate_chart_1(resp, user_account_type)
                data['userbehaviour_pageview_mainchart']=table1_data

                table1a_data = ua_generate_chart_1a(resp, user_account_type)
                data['userbehaviour_pageview_mainchart_pageview']=table1a_data

                table1b_data = ua_generate_chart_1b(resp, user_account_type)
                data['userbehaviour_pageview_mainchart_uniquepageview']=table1b_data

                table1c_data = ua_generate_chart_1c(resp, user_account_type)
                data['userbehaviour_pageview_mainchart_avgtime']=table1c_data

                table2_data = ua_generate_chart_2(resp, user_account_type)
                data['userbehaviour_bouncerate_mainchart']=table2_data

                table2a_data = ua_generate_chart_2a(resp, user_account_type)
                data['userbehaviour_bouncerate_mainchart_bouncerate']=table2a_data

                table2b_data = ua_generate_chart_2b(resp, user_account_type)
                data['userbehaviour_bouncerate_mainchart_exit']=table2b_data

                table2c_data = ua_generate_chart_2c(resp, user_account_type)
                data['userbehaviour_bouncerate_mainchart_pagepersession']=table2c_data

                table3_data = ua_generate_chart_3(resp, user_account_type)
                data['userbehaviour_popularpage_mainchart']=table3_data

                table3a_data = ua_generate_chart_3(resp, user_account_type)
                data['userbehaviour_popularpage_mainchart_pageviews']=table3a_data

                table4_data = ua_generate_chart_4(resp, user_account_type)
                data['userbehaviour_popularpagewithtitle_mainchart']=table4_data

                table4a_data = ua_generate_chart_4a(resp, user_account_type)
                data['userbehaviour_popularpagewithtitle_mainchart_pagetitle']=table4a_data

                table5_data = ua_generate_chart_5(resp, user_account_type)
                data['userbehaviour_popularcontent_mainchart']=table5_data

                table5a_data = ua_generate_chart_5(resp, user_account_type)
                data['userbehaviour_popularcontent_mainchart_subchart']=table5a_data

                table6_data = ua_generate_chart_6(resp, user_account_type)
                data['userbehaviour_searchterm_mainchart']=table6_data

                table6a_data = ua_generate_chart_6(resp, user_account_type)
                data['userbehaviour_searchterm_mainchart_subchart']=table6a_data

                table7_data = ua_generate_chart_7(resp, user_account_type)
                data['userbehaviour_eventcategory_mainchart']=table7_data
                table7a_data = ua_generate_chart_7(resp, user_account_type)
                data['userbehaviour_eventcategory_mainchart_subchart']=table7a_data

                table8_data = ua_generate_chart_8(resp, user_account_type)
                data['userbehaviour_loadtime_mainchart']=table8_data

                table8a_data = ua_generate_chart_8a(resp, user_account_type)
                data['userbehaviour_loadtime_mainchart_subchart'] = table8a_data
                
                data['table3'] = ua_generate_chart_summary3(resp, user_account_type)
                data['table6'] = ua_generate_chart_summary6(resp, user_account_type)

                data['dropdown_data'] = dropdown_data(resp, user_account_type)
                data['ac_type'] = user_account_type
                data['status']= True

            else:
                print('API Connection error '+str(resp.status_code))
                response['error'] = 'API Connection error '+str(resp.status_code)
                return JsonResponse(response)

        return JsonResponse(data)

    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)


def get_google_analytics_status(request):
    project_id = request.GET.get('project_id')
    response = {'status': False}
    obj = GoogleAnalyticsAccount.objects.filter(i_site_audit_project_id=project_id).last()
    if obj:
        account_data = obj.account_data
        if account_data:
            response['status'] = True
        else:
            response['error'] = 'GoogleAnalyticsAccount data NotFound'
    else:
        print('GoogleAnalyticsAccount NotFound ')
        response['error'] = 'GoogleAnalyticsAccount NotFound'
    return JsonResponse(response)

@login_required
def audience_overview_data(request):
    response = {'status': False}
    try:
        project_id = request.GET.get('project_id')
        from_date = request.GET.get('fromdate')
        to_date = request.GET.get('todate')
        continent = request.GET.get('continent')
        region = request.GET.get('region')
        channel = request.GET.get('channel')
        device = request.GET.get('device')
        if not continent:
            continent = ''
        if not region:
            region = ''
        if not channel:
            channel = ''
        if not device:
            device = ''
        obj = GoogleAnalyticsAccount.objects.filter(i_site_audit_project_id=project_id).last()
        user_account_type = ''
        if obj:
            account_data = obj.account_data
            if account_data:
                user_account_type = list(account_data.keys())[0]
            
        else:
            print('GoogleAnalyticsAccount NotFound ')
            response['error'] = 'GoogleAnalyticsAccount NotFound'
            return JsonResponse(response)

        extra_query_params = f"fromdate={from_date}&todate={to_date}&continent={continent}&deviceCategory={device}&channelGrouping={channel}&region={region}"
        print('extra_query_params', extra_query_params)
        if user_account_type == 'GA4x':
            api_url = f'{settings.AUDIENCE_OVERVIEW_API}?type=ga4&{extra_query_params}'
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}'
            ga4_resp = requests.get(api_url)
            # ga4_resp = ga4_api_data
            if ga4_resp:
                ga4_resp = ga4_resp.json()
                table1_data = audience_overview_chart1(ga4_resp, user_account_type)
                table3_data = audience_overview_chart3(ga4_resp, user_account_type)
                table4_data = audience_overview_chart4(ga4_resp, user_account_type)
                table6_data = audience_overview_chart6(ga4_resp, user_account_type)
                device_data = audience_overview_device_data(ga4_resp, user_account_type)
                page_views_data = audience_overview_page_views(ga4_resp, user_account_type)
                users_data = audience_overview_chart1(ga4_resp, user_account_type)
                sessions_per_user = audience_overview_seesions_per_user(ga4_resp, user_account_type)
                sessions_data = audience_overview_seesions(ga4_resp, user_account_type)
                pages_per_session_data = audience_overview_pages_per_session(ga4_resp, user_account_type)
                avg_sess_duration = audience_overview_avg_sess_duration(ga4_resp, user_account_type)
                bounce_rate_data = audience_overview_bounce_rate(ga4_resp , user_account_type)
            else:
                print('API Connection error '+str(ga4_resp.status_code))
                response['error'] = 'API Connection error '+str(ga4_resp.status_code)
                return JsonResponse(response)

            return JsonResponse({'Users_Graph' : table1_data,
                                # 'Visitor Graph' : table2_data,
                                'New_Users_Graph' : table3_data,
                                'LanguageBreakDown_Graph' : table4_data,
                                'LanguageBreakDown_DataTable'  : table4_data ,
                                'Devices_Graph' : table6_data,
                                'Users_Count' : users_data,
                                'Page_Views_Count' : page_views_data,
                                'No_of_Sessions_Per_User' : sessions_per_user,
                                'Sessions_Count' : sessions_data,
                                'Pages_per_Session_Count' : pages_per_session_data,
                                'Avg_Session_Duration' : avg_sess_duration,
                                'Bounce_Rate' : bounce_rate_data,
                                'Device_Data_Table' : device_data})

        else:
            if user_account_type == 'GA4':
                api_url = f'{settings.AUDIENCE_OVERVIEW_API}?type=ga4&{extra_query_params}'
            else:
                api_url = f'{settings.AUDIENCE_OVERVIEW_API}?type=ua&{extra_query_params}'

            print('api_url:', api_url)
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}'
            ua_resp = requests.get(api_url)
            # ua_resp = ua_api_data
            if ua_resp:
                ua_resp = ua_resp.json()
                table1_data = audience_overview_chart1(ua_resp, user_account_type)
                table2_data = audience_overview_chart2(ua_resp, user_account_type)
                table3_data = audience_overview_chart3(ua_resp, user_account_type)
                table4_data = audience_overview_chart4(ua_resp, user_account_type)
                table5_data = audience_overview_chart5(ua_resp, user_account_type)
                continent_data = audience_overview_continent_data(ua_resp, user_account_type)
                table6_data = audience_overview_chart6(ua_resp, user_account_type)
                device_data = audience_overview_device_data(ua_resp, user_account_type)
                users_data = audience_overview_chart1(ua_resp, user_account_type)
                sessions_per_user = audience_overview_seesions_per_user(ua_resp, user_account_type)
                sessions_data = audience_overview_seesions(ua_resp, user_account_type)
                page_views_data = audience_overview_page_views(ua_resp, user_account_type)
                pages_per_session_data = audience_overview_pages_per_session(ua_resp, user_account_type)
                avg_sess_duration = audience_overview_avg_sess_duration(ua_resp, user_account_type)
                bounce_rate_data = audience_overview_bounce_rate(ua_resp, user_account_type)
                table3_summary = audience_overview_summary(ua_resp, user_account_type)
                dropdown_data_resp = dropdown_data(ua_resp, user_account_type)
            else:
                print('API Connection error '+str(ua_resp.status_code))
                response['error'] = 'API Connection error '+str(ua_resp.status_code)
                return JsonResponse(response)

            print("USERSS")
            print(ua_resp['table3'])

            return JsonResponse({'Users_Graph'  : table1_data,
                                'Visitor_Graph' : table2_data,
                                'New_Users_Graph'  : table3_data,
                                'LanguageBreakDown_Graph'  : table4_data ,
                                'LanguageBreakDown_DataTable'  : table4_data ,
                                'Continents_Graph'  : table5_data,
                                'Continent_DataTable': continent_data,
                                'Devices_Graph': table6_data,
                                'Device_DataTable' : device_data,
                                'Users_Count' : users_data,
                                'table3' : table3_summary,
                                'New_Users_Count' : table3_data,
                                'No_of_Sessions_Per_User' : sessions_per_user,
                                'Sessions_Count' : sessions_data,
                                'Page_Views_Count' : page_views_data,
                                'Pages_per_Session_Count' : pages_per_session_data,
                                'Avg_Session_Duration' : avg_sess_duration,
                                'Bounce_Rate' : bounce_rate_data,
                                'ac_type': user_account_type,
                                'dropdown_data': dropdown_data_resp})
    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)

    return JsonResponse(response)

@login_required
def acquisition_overview(request):
    response = {'status': False}
    try:
        project_id = request.GET.get('project_id')
        from_date = request.GET.get('fromdate')
        to_date = request.GET.get('todate')
        continent = request.GET.get('continent')
        region = request.GET.get('region')
        channel = request.GET.get('channel')
        device = request.GET.get('device')
        if not continent:
            continent = ''
        if not region:
            region = ''
        if not channel:
            channel = ''
        if not device:
            device = ''
        obj = GoogleAnalyticsAccount.objects.filter(i_site_audit_project_id=project_id).last()
        user_account_type = ''
        if obj:
            account_data = obj.account_data
            if account_data:
                user_account_type = list(account_data.keys())[0]
        else:
            print('GoogleAnalyticsAccount NotFound ')
            response['error'] = 'GoogleAnalyticsAccount NotFound'
            return JsonResponse(response)
        data = {}
        extra_query_params = f"fromdate={from_date}&todate={to_date}&continent={continent}&deviceCategory={device}&channelGrouping={channel}&region={region}"

        if user_account_type == 'GA4x':
            api_url = f'{settings.ACQUISITION_OVERVIEW_API}?type=ga4&{extra_query_params}'
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}'
            resp = requests.get(api_url)

            if resp:
                resp = resp.json()
            
                table1_data = ga4_top_acquisition_chart(resp)
                data['ga4_top_acquisition_chart']=table1_data
                
                table2_data = ga4_users_chart(resp)
                data['ga4_users_chart']=table2_data
                
                table3_data = ga4_conversions_chart(resp)
                data['ga4_conversions_chart']=table3_data
                
                table4_data = ga4_abc_chart(resp)
                data['ga4_abc_chart']=table4_data
                data['status']= True

            
            else:
                response['error'] = 'API Connection Error'
                return JsonResponse(response)

        else:
            if user_account_type == 'GA4':
                api_url = f"{settings.ACQUISITION_OVERVIEW_API}?type=ga4&{extra_query_params}"
            else:
                api_url = f"{settings.ACQUISITION_OVERVIEW_API}?type=ua&{extra_query_params}"

            print('api_url:', api_url)
            api_uuid = set_redis_keys(obj, api_url)
            api_url = f'{api_url}&uuid={api_uuid}'
            print('api_url:', api_url)
            resp = requests.get(api_url)

            print("RESPONSE IS : ",resp)
            #print("RESPONSE IS================= : ",resp.json())
            if resp:

                resp = resp.json()

                table1_data = ua_top_acquisition_channels(resp, user_account_type)
                data['top_acquisition_channels'] = table1_data

                table2_data = ua_users_chart(resp, user_account_type)
                data['users_chart'] = table2_data

                table3_data = ua_conversions_chart(resp, user_account_type)
                data['conversions_chart'] = table3_data

                table4_data = ua_main_chart(resp, user_account_type)
                data['main_chart'] = table4_data

                data['dropdown_data'] = dropdown_data(resp, user_account_type)
                data['table2'] = resp['table2']

                data['ac_type'] = user_account_type
                data['status']= True

            else:
                response['error'] = 'API Connection Error'  
                return JsonResponse(response)

        return JsonResponse(data)

    except Exception as e:
        print('Exception: ', repr(e))
        response['error'] = repr(e)
    return JsonResponse(response)



def connect_redis():
    r = redis.Redis(host='localhost', port=8746)
    return r


def get_analytics_state_auth(request):
    response = {'status': False}
    state = request.GET.get('state')
    print('state is: ', state)
    if state:
        r = connect_redis() 
        value = r.get(state)
        print("Value is ", value)
        print("Value type is ", type(value))
        if value:
            state = request.GET.get('state')
            analytics_obj = GoogleAnalyticsAccount.objects.get(analytics_state = state)
            value = json.loads(value)
            print("Value is ", value)
            print("TYPE OF JSON DATA IS : ",type(value))
            #json_val = json.dumps(value) 
            #analytics_obj.account_data_all = json_val 
            analytics_obj.account_data_all = value 
            analytics_obj.save()
            response = {'status': True}
    return redirect(user_accounts) 
    #return JsonResponse(response)

@login_required
def seo_ai(request):
    context = {}

    return render(request, 'site_audit/seo_ai.html', context)

@login_required
def seo_ai_data(request):
    response = {'status' : False}
    if request.method == 'GET':
        card_id = request.GET.get('card_id')
        keywords = request.GET.get('keywords')
        seo_ai_data_api_response = requests.get('http://85.237.203.42:8521/site_audit/get_text_content/?', params={'card_id' : card_id,'keywords' : keywords}).json()
        try:
            response['data'] = seo_ai_data_api_response['data']
            response['status'] = seo_ai_data_api_response['status']
        except:
            response['data'] = None
            response['status'] = False
    return JsonResponse(response)

@login_required
def geo_location(request):
    context = {}
    
    return render(request, 'site_audit/geo_location.html', context)

@login_required
def project_listview(request):
    context = {}

    return render(request, 'site_audit/project_listview.html', context)


def allowed_crawl_pages(request):
    response = {'status' : False}

    try:
        allowed_units = GlobalConfiguration.objects.get(name='crawl_pages_limit').value # it will change (crawl pages limit to be changes according to plan)
        consumed_units = GlobalConfiguration.objects.get(name='crawl_pages_limit').value # it will change (crawl pages limit to be changes according to plan)

        data = {
            'allowed_units' : allowed_units,
            'consumed_units' : consumed_units
        }

        response['data'] = data
        response['status'] = True

        return JsonResponse(response)
    except Exception as e:
        print(repr(e))

        response['error'] = str(repr(e))

        return JsonResponse(response)

@csrf_exempt
def edit_webpages(request):
    response = {'status' : False}
    user_selected_links_lst = []
    if request.method == 'GET':

        site_audit_project_id = request.GET.get('project_id')
        # website_url = request.GET.get('website_url', None)

        try:
            site_audit_project_obj = SiteAuditProject.objects.get(pk = site_audit_project_id) 
            website_url = site_audit_project_obj.i_website.website_url
            user_selected_links_qs = UserSelectedWebsite.objects.filter(i_site_audit_project = site_audit_project_obj, i_profile = request.user.profile)
            subscription_obj = Subscriptions.objects.get(profile_id = request.user.profile, is_active = True)

            for user_selected_links in user_selected_links_qs:
                user_selected_links_lst.append(user_selected_links.i_website.website_url)
            response['selected_links'] = user_selected_links_lst

            
            total_pages = website_total_urls(website_url)
            sub_obj = Subscriptions.objects.get(
                profile_id = request.user.profile,
                is_active = True,
                )
            PlanModule_obj = PlanModuleDetail.objects.get(
                plan_id = sub_obj.plan_id,
                module_id__name = "Crawl Page Limit"
                )
            consumed_links = UserModuleUnits.objects.get(module_id__name = 'Crawl Page Limit', subscription_id = subscription_obj).consumed_units
            allowed_pages = PlanModule_obj.units_allowed
            response['allowed_pages'] = allowed_pages
            response['total_pages'] = total_pages
            response['consumed_links'] = consumed_links
            response['status'] = True
        
        except Exception as e:
            print(repr(e))
            response['error'] = e
        
    return JsonResponse(response)

@login_required
def edit_selected_links(request):
    context = {}
    return render(request, 'site_audit/edit_selected_links.html', context)

@login_required
def discover_keywords_view(request):
    context = {}
    return render(request, 'site_audit/discover_keywords.html', context)

@login_required
def tools_view(request):
    context = {}
    return render(request, 'site_audit/tools.html', context)

@login_required
def settings_view(request):
    context = {}
    return render(request, 'site_audit/settings.html', context)

@login_required
def crawler_view(request):
    context = {}
    return render(request, 'site_audit/crawler_page.html', context)

@login_required
def url_keyword_explorer_view(request):
    context = {}
    return render(request, 'site_audit/url_keyword_explorer.html', context)

@login_required
def get_url_keyword_explorer_data(request):

    website = request.GET.get('website')
    full_website = request.GET.get('full_website')
    country = request.GET.get('country')

    data = {
        'website' : full_website,
        'website'  : website,
        'country' : country
    }

    api_response = requests.get('http://23.106.56.71:8081/research_keyword/website_data_listview/?', params=data).json()

    return JsonResponse(api_response)

@login_required
def plan_details_page(request):
    context = {}
    return render(request, 'site_audit/plan_details_page.html', context)

@login_required
def content_ai(request):
    context = {}
    return render(request, 'site_audit/content_ai_tool.html', context)

@login_required
def description_ai(request):
    context = {}
    return render(request, 'site_audit/description_ai_tool.html', context)

@login_required
def ganalytics_page(request):
    context = {}
    return render(request, 'site_audit/ganalytics_page.html', context)

@login_required
def get_text_dict_api(request):
    url = requests.get('http://85.237.203.42:8521/site_audit/get_text_dict/').json()
    return JsonResponse(url)




# def alt_text(request):
#     url = request.GET.get('keywords')
#     url_list = list(url.split(','))

    

#     # image_links = ['https://w0.peakpx.com/wallpaper/123/54/HD-wallpaper-scenery-lake-nature-sky-tree-water.jpg', 'https://thumbs.dreamstime.com/b/plateau-scenery-landscape-reflection-tibet-beautiful-water-34858251.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS43xpfmfJEpmBe1w7OO5KOjJv2DcDk58EPg&usqp=CAU', 'https://drive.google.com/file/d/1LqW6eLsJXBUJ4c1IbEdEaDlwDGDIOOWt/view?usp=share_link' ]

#     response = {'status' : False}

#     response['data'] = alt_text_generator(url_list)

#     if response['data']:
#         response['status'] = True

#     return JsonResponse(response)

@login_required
def image_alt_text(request):
    context = {}
    return render(request, 'site_audit/image_alt_text.html', context)
