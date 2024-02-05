import json
import os
import requests
from datetime import timedelta, datetime
from django.conf import settings
from django.core.files import File
from django.utils import timezone
from django.core.mail import EmailMessage, get_connection
from site_audit.models import WebsiteBacklink, WebsiteAnchorText, WebsiteOrganicKeywords
from user_management.models import GlobalConfiguration
from django.template import loader
from site_audit.models import SiteAuditProject,UserSelectedWebsite
from site_audit.models import SiteAuditProject,UserSelectedWebsite,Website
from crawler.models import SiteScrapyData,SiteProcessData
from crawler.crawler_utils import process_crawl_data_util
from urllib.parse import urlparse
# from transformers import AutoProcessor, AutoModelForCausalLM
# import requests
# import torch
# from tqdm import tqdm
# from PIL import Image



def crawl_user_websites(sap_obj):
    response = {'status' : False}
    try:
        website_url = []
        user_selected_websites_qs = UserSelectedWebsite.objects.filter(
            i_site_audit_project = sap_obj
        )
        # print('user_selected_websites_qs', user_selected_websites_qs.values_list('i_website__website_url'))
        selected_websites_qs = user_selected_websites_qs.values_list('i_website__pk','i_website__website_url').order_by('pk')
        website_base_url = [website[1] for website in selected_websites_qs]
        if len(website_base_url) > 0:
            main_url = website_base_url[0]
            parsed_url = urlparse(main_url)
            scheme = urlparse(main_url).scheme
            domain = parsed_url.netloc
            main_url = scheme+'://'+domain
        
        for usw_obj in user_selected_websites_qs:
            website_url.append(usw_obj.i_website.website_url)
            website_obj = usw_obj.i_website
            webpage = usw_obj.i_website.website_url
            site_scrapy_data_qs = SiteScrapyData.objects.filter(i_website=website_obj)
            crawl_data_expiry_days = GlobalConfiguration.objects.get(name='crawl_data_expiry_days').value
            crawl_data_interval_time = timezone.now() - timedelta(days=int(crawl_data_expiry_days))
            crawl_request_inprocess = website_obj.crawl_request_inprocess
            if site_scrapy_data_qs:
                site_scrapy_data_obj = site_scrapy_data_qs.latest('created_on')
                if site_scrapy_data_obj.status == "processed":
                    print("crawled")
                    print('website' , webpage)
                    website_base_url.remove(webpage)
                    
                elif crawl_data_interval_time <= site_scrapy_data_obj.created_on:
                    
                    website_base_url.remove(webpage)
                    
            else:
                if website_obj.error_occured == True:
                    website_base_url.remove(webpage)
                
                    response.update({'status': False, 'error' : website_obj.error_description})           
            print('---------------------')
        
        
        crawler_api = settings.CRAWLER_API
        if len(website_base_url) > 0:
            data = {'url_list': json.dumps(website_base_url), 
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
        elif len(website_base_url) == 0:
            # crawl_data_expiry_days = GlobalConfiguration.objects.get(name='crawl_data_expiry_days').value
            # crawl_data_interval_time = timezone.now() - timedelta(days=int(crawl_data_expiry_days))
            # try:
            #     process_data_qs = SiteProcessData.objects.filter(project = sap_obj)
            #     process_data_obj = process_data_qs.latest('created_on')
                
                    
                # if crawl_data_interval_time >= process_data_obj.created_on:
                    
            data = {
                'website_url' : main_url,
                'webpages_list' : website_url,
                'sap_id': sap_obj.pk
            }
            print('data ', data)
            response = check_existing_processed_data(sap_obj.pk)
            if response['status'] == True:
                donor_obj = SiteProcessData.objects.filter(project__pk = response['sap_id']).latest('created_on')
                    
                process_data = json.load(donor_obj.process_data)
                
                current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
                process_data_filename = f'copy_website_process_data_{current_datetime}.json'
                with open(process_data_filename, 'w') as fp:
                    json.dump(process_data, fp, indent=4)
                
                recipient_obj = SiteProcessData()
                recipient_obj.project = sap_obj
                recipient_obj.process_data = File(open(process_data_filename))
                recipient_obj.save()
                os.remove(process_data_filename)
            else:
                print('else, process_crawl_data_util')
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
        
    except Exception as e:
        print('Exception:', repr(e))
        response['error'] = repr(e)
        print("Site_audit/crawler_data")
        print("Response:", response)
    return response   

            # except SiteProcessData.DoesNotExist:
            
            #     data = {
            #         'website_url' : main_url,
            #         'webpages_list' : website_url,
            #         'sap_id': sap_obj.pk
            #     }
            #     response = check_existing_processed_data(sap_obj.pk)
            #     if response['status'] == True:
            #         donor_obj = SiteProcessData.objects.filter(project__pk = response['sap_id']).latest('created_on')
            #         recipient_obj = SiteProcessData()
            #         recipient_obj.project = sap_obj
            #         recipient_obj.process_data = donor_obj.process_data
            #         recipient_obj.save()
            #     else:
            #         process_crawl_data_util(sap_obj)
            #     website_url = ','.join(website_url)
            #     print('string: ', website_url)
            #     print('type: ', type(website_url))
                
                
            #     # if process_api_response.status_code == 200:
            #     main_website_obj = Website.objects.get(website_url = main_url) 
            #     #     main_website_obj.crawl_request_inprocess = True
            #     #     main_website_obj.error_occured = False
            #     #     main_website_obj.error_description = ""
            #     #     main_website_obj.save()
            #     response.update({'status': False,'error':'Crawl Request in progress', 'crawl_request_inprocess' : main_website_obj.crawl_request_inprocess})
        


    

def check_existing_processed_data2(sap_id):
    response = {
        'status': False,
        'message': 'No SiteAuditProjects were found'
    }
    UserSelectedWebsite_qs = UserSelectedWebsite.objects.filter()
    sap_obj = SiteAuditProject.objects.get(pk = sap_id)
    print("sap_obj.created_by: ",sap_obj.created_by)
    SelectedWebsite_qs = UserSelectedWebsite_qs.filter(
        i_site_audit_project = sap_obj
        )
    website_list = []
    # print('SelectedWebsite_qs : ',list(SelectedWebsite_qs),'len: ',len(list(SelectedWebsite_qs)))
    for obj in SelectedWebsite_qs:
        qs = UserSelectedWebsite_qs.filter(i_website = obj.i_website)
        website_list = website_list + list(qs)
    website_queryset = UserSelectedWebsite_qs.filter(pk__in=[website.pk for website in website_list])
    distinct_users = website_queryset.exclude(i_site_audit_project = sap_obj ).values_list('i_site_audit_project__created_by','i_site_audit_project__created_by__username','i_site_audit_project').distinct()
    # print('distinct_users : ',distinct_users)
    for user in distinct_users:
        duser_selected = UserSelectedWebsite_qs.filter(
            i_site_audit_project = user[2]
        )
        # print('duser_selected : ',list(duser_selected),'len: ',len(list(duser_selected)))
        # print('duser_selected : ',duser_selected)
        duser_selected_i_website = duser_selected.values_list('i_website', flat=True)
        # print('duser_selected_i_website : ',duser_selected_i_website)
        matched_websites = SelectedWebsite_qs.filter(i_website__in=duser_selected_i_website)
        # print('matched_websites : ',matched_websites)

        if set(matched_websites) == set(SelectedWebsite_qs) and len(matched_websites) == len(duser_selected) and  len(matched_websites) == len(SelectedWebsite_qs): 
            print('MATCHED')
            response['status'] = True
            response['sap_id'] = user[2]
            del response['message']
            break
        else:
            print('NOT MATCHED')

    print ('func(check_existing_processed_data) = Resp',response)
    return response

def check_existing_processed_data(sap_id):
    response = {
        'status': False,
        'message': 'No SiteAuditProjects were found'
    }
    sap_obj = SiteAuditProject.objects.get(pk = sap_id)

    user_selected = set(UserSelectedWebsite.objects.filter(
                    i_site_audit_project =sap_obj
                    ).values_list('i_website__website_url',flat= True))
    # print (user_selected,'len',len(user_selected),end='\n\n')


    donor_usw = UserSelectedWebsite.objects.filter(
                    i_site_audit_project__i_website =sap_obj.i_website
                    ).exclude(i_profile =sap_obj.created_by.profile)
    # print (donor_usw,'len',len(donor_usw),end='\n\n')


    dusers = donor_usw.values_list('i_profile',flat= True).distinct()
    # print(dusers)

    for user in dusers:
        duser_usw = set(donor_usw.filter(
            i_profile = user
        ).values_list('i_website__website_url',flat= True))
        # print (duser_usw,'len',len(duser_usw),end='\n\n')
        if duser_usw == user_selected:
            donor_sap_id = list(donor_usw.filter(i_profile = user).values_list('i_site_audit_project__pk',flat= True).distinct())
            print('donor_sap_id ',donor_sap_id[0])
            print('MATCHED')
            response['status'] = True
            response['sap_id'] = donor_sap_id[0]
            del response['message']
            break
        else:
            continue
    print ('func(check_existing_processed_data) = Resp',response)
    return response



def email_to_client(name, email, phone_number, subject, address, message):
    
    # body = f'Name: {name} Email: {email} Phone Number: {phone_number} Subject: {subject} Address: {address} Message: {message}'
    
    body = """
           Name: {name},
           Email: {email},
           Phone Number: {phone_number},
           Subject: {subject},
           Address: {address},
           Message: {message}""".format(name=name, email=email, phone_number=phone_number, subject=subject, address=address, message=message)

    print(f'body: {body}')
    email_subject = f'WebsiteRankingExpert New Lead - {email}'
    send_email(email_subject, body)
    
def send_email(email_subject, body):
    try:
        lead_email = settings.EMAIL_TO_LEAD
        print('lead_email:', lead_email)
        # email_subject = f'New lead - {email}'        
        # body = f'name: {name}, email: {email}, phone_number: {phone_number}, subject: {subject}, address: {address}, message: {message}'
        if lead_email:
            connection = get_connection(host=settings.EMAIL_HOST, port=settings.EMAIL_PORT,
                                        username=settings.EMAIL_HOST_USER,
                                        password=settings.EMAIL_HOST_PASSWORD,
                                        use_tls=settings.EMAIL_USE_TLS, timeout=settings.EMAIL_TIMEOUT)
            mail = EmailMessage(email_subject, body, settings.EMAIL_HOST_USER,
                                [lead_email], connection=connection)
            mail.content_subtype = "html"
            mail.send()
    except Exception as e:
        print('Exception: ', repr(e))
    

def save_remarks(obj, exception):
    obj.no_of_attempts += 1
    if obj.no_of_attempts >= 2:
        obj.job_status = 'rejected'
        obj.remarks = repr(exception) + '. ' + 'Job rejected after 2 attempts'
    else:
        obj.remarks = repr(exception)
    obj.save()


def get_api_details(api_name):
    access_id = GlobalConfiguration.objects.get(name='api_access_id').value
    secret_key = GlobalConfiguration.objects.get(name='api_secret_key').value
    api_url = GlobalConfiguration.objects.get(name=api_name).value
    return access_id, secret_key, api_url


def get_backlinks_api_data(api_name, website_url):
    access_id, secret_key, api_url = get_api_details(api_name)
    print('api_url:', api_url)
    auth = (access_id, secret_key)
    data = {"target": website_url, "target_scope": "root_domain",
            "filter": "external+nofollow", "sort": "source_domain_authority",
            "limit": 25, "source_scope": "root_domain"}
    # "anchor_text: "string", # "source_root_domain": "string"
    
    api_response = requests.post(api_url, data=json.dumps(data), auth=auth)
    api_response = api_response.json()
    print('api_response:', api_response)
    results = api_response.get('results')
    return results, api_response


def get_seo_api_data(response, website_base_url):
    data = {'website_base_url': website_base_url}
    print('post_data:', data)
    get_seo_site_data_api_url = "%s/" % settings.GET_SEO_SITE_DATA_API_URL
    get_site_diagnostics_data_api_url = "%s/" % settings.GET_SITE_DIAGNOSTICS_DATA_API_URL
    get_broken_link_api_url = "%s/" % settings.GET_BROKEN_LINK_API_URL
    seo_site_api_response = requests.post(get_seo_site_data_api_url, data=data).json()
    print('get_seo_site_data_api_url:', get_seo_site_data_api_url)
    if seo_site_api_response['status']:
        seo_site_api_response.pop('status')
        response['website_seo_data'] = seo_site_api_response
        response['website_seo_data_status'] = True
    else:
        seo_site_api_response.pop('status')
        response['website_seo_data'] = {}
        response['website_seo_data_status'] = False

    site_diagnostics_api_response = requests.post(get_site_diagnostics_data_api_url, data=data).json()
    print('get_site_diagnostics_data_api_url:', get_site_diagnostics_data_api_url)
    if site_diagnostics_api_response['status']:
        site_diagnostics_api_response.pop('status')
        response.update(site_diagnostics_api_response)
        response["site_diagnostics_api_status"] = True
    else:
        site_diagnostics_api_response.pop('status')
        response.update({})
        response["site_diagnostics_api_status"] = False

    broken_links_api_response = requests.post(get_broken_link_api_url, data=data).json()
    print('get_broken_link_api_url:', get_broken_link_api_url)
    if ('status', False) not in broken_links_api_response.items() or not broken_links_api_response['status'] == False:
        response['page_data_dict'] = broken_links_api_response
        response['page_data_dict_status'] = True
    else:
        response['page_data_dict'] = {}
        response['page_data_dict_status'] = False

    # if seo_site_api_response['status'] and site_diagnostics_api_response['status'] and ('status', False) not in \
    #         broken_links_api_response.items():
    #     seo_site_api_response.pop('status')
    #     response['website_seo_data'] = seo_site_api_response
    #     response['page_data_dict'] = broken_links_api_response
    #     site_diagnostics_api_response.pop('status')
    #     response.update(site_diagnostics_api_response)

    response['status'] = True
    return response


def get_backlinks_data(api_name, website_url):
    website_last_obj = WebsiteBacklink.objects.last()
    if website_last_obj:
        api_response = json.load(website_last_obj.backlinks_data)
        results = True
    else:
        results, api_response = get_backlinks_api_data(api_name, website_url)
    return results, api_response


def create_website_backlink_obj(api_response, website_obj):
    current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
    filename = f'website_backlinks_data_{current_datetime}.json'
    with open(filename, 'w') as fp:
        json.dump(api_response, fp, indent=4)
    WebsiteBacklink.objects.create(i_website=website_obj, backlinks_data=File(open(filename)))
    os.remove(filename)


def create_website_anchor_text_obj(api_response, website_obj):
    current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
    filename = f'website_anchor_text_data_{current_datetime}.json'
    with open(filename, 'w') as fp:
        json.dump(api_response, fp, indent=4)
    WebsiteAnchorText.objects.create(i_website=website_obj, anchor_text_data=File(open(filename)))
    os.remove(filename)


def get_response(sandbox_testing, api_name, website_url):
    if sandbox_testing == 'true':
        results, api_response = get_backlinks_data(api_name, website_url)
    else:
        results, api_response = get_backlinks_api_data(api_name, website_url)
    return results, api_response


def get_last_month_data(backlink_obj):
    if backlink_obj:
        backlinks_data = json.load(backlink_obj.backlinks_data)
        backlinks_data = backlinks_data.get('results')
    else:
        backlinks_data = ''
    return backlinks_data


def get_anchor_text_api_data(website_url):
    api_name = 'anchor_text_api_url'
    access_id, secret_key, api_url = get_api_details(api_name)
    print('api_url:', api_url)
    auth = (access_id, secret_key)
    data = {"target": website_url, "scope": "root_domain", "limit": 25}

    api_response = requests.post(api_url, data=json.dumps(data), auth=auth)
    api_response = api_response.json()
    print('api_response:', api_response)
    results = api_response.get('results')
    return results, api_response


def get_anchor_text(website_obj):
    response = {'status': False, 'info': ''}
    website_url = website_obj.website_url
    sandbox_testing = GlobalConfiguration.objects.get(name='sandbox_testing').value
    sandbox_testing = sandbox_testing.lower()
    anchor_text_qs = WebsiteAnchorText.objects.filter(i_website=website_obj)
    anchor_text_data_expiry = GlobalConfiguration.objects.get(name='anchor_text_data_expiry_days').value
    interval_time = timezone.now() - timedelta(days=int(anchor_text_data_expiry))

    if anchor_text_qs:
        last_anchor_text_obj = anchor_text_qs.order_by('-created_on')[0]

        if interval_time >= last_anchor_text_obj.created_on:
            results, api_response = get_anchor_text_response(sandbox_testing, website_url)

            if results:
                create_website_anchor_text_obj(api_response, website_obj)
                response = api_response
            else:
                response = json.load(last_anchor_text_obj.anchor_text_data)
                response.update({'info': f'The provided anchor_text data is older than {anchor_text_data_expiry} days'})
        else:
            response = json.load(last_anchor_text_obj.anchor_text_data)

        response.update({'status': True})
    else:
        results, api_response = get_anchor_text_response(sandbox_testing, website_url)

        if results:
            create_website_anchor_text_obj(api_response, website_obj)
            response = api_response
            response.update({'status': True})
        else:
            response.update({'error': 'Connection Error'})
            response.update(api_response)
    return response


def get_anchor_text_response(sandbox_testing, website_url):
    if sandbox_testing == 'true':
        results, api_response = get_anchor_text_data(website_url)
    else:
        results, api_response = get_anchor_text_api_data(website_url)
    return results, api_response


def get_anchor_text_data(website_url):
    website_last_obj = WebsiteAnchorText.objects.last()
    if website_last_obj:
        api_response = json.load(website_last_obj.anchor_text_data)
        results = True
    else:
        results, api_response = get_anchor_text_api_data(website_url)
    return results, api_response


def get_website_keywords_api_data(website_url):
    api_name = 'organic_keywords_api_url'
    api_key = GlobalConfiguration.objects.get(name='organic_keywords_api_key').value
    api_url = GlobalConfiguration.objects.get(name=api_name).value
    data = {
        "q": website_url,
        "r": "25",
        "api_key": api_key
    }
    request = requests.get(api_url, params=data)
    api_response = request.json()
    print('api_response:', api_response)
    return api_response


def get_website_keywords(website_obj):
    response = {'status': False, 'info': '', 'current_keyword': '', 'previous_keyword': ''}
    website_url = website_obj.website_url
    sandbox_testing = GlobalConfiguration.objects.get(name='sandbox_testing').value
    sandbox_testing = sandbox_testing.lower()
    keyword_qs = WebsiteOrganicKeywords.objects.filter(i_website=website_obj)
    organic_keywords_data_expiry = GlobalConfiguration.objects.get(name='organic_keywords_data_expiry_days').value
    interval_time = timezone.now() - timedelta(days=int(organic_keywords_data_expiry))

    if keyword_qs:
        last_keyword_obj = keyword_qs.order_by('-created_on')[0]
        if len(keyword_qs) > 1:
            second_last_keyword_obj = keyword_qs.order_by('-created_on')[1]
        else:
            second_last_keyword_obj = ''

        if interval_time >= last_keyword_obj.created_on:
            api_response = get_keyword_response(sandbox_testing, website_url)

            if api_response:
                WebsiteOrganicKeywords.objects.create(i_website=website_obj, keywords=api_response)
                response['current_keyword'] = api_response
                response['previous_keyword'] = get_last_month_keyword_data(last_keyword_obj)
            else:
                response['current_keyword'] = last_keyword_obj.keywords
                response['previous_keyword'] = get_last_month_keyword_data(second_last_keyword_obj)
        else:
            response['current_keyword'] = last_keyword_obj.keywords
            response['previous_keyword'] = get_last_month_keyword_data(second_last_keyword_obj)
    else:
        api_response = get_keyword_response(sandbox_testing, website_url)

        if api_response:
            WebsiteOrganicKeywords.objects.create(i_website=website_obj, keywords=api_response)
            response['current_keyword'] = api_response
        else:
            response.update({'error': 'Connection Error'})
            response.update(api_response)
    return response


def get_keyword_response(sandbox_testing, website_url):
    if sandbox_testing == 'true':
        api_response = get_keyword_response_data(website_url)
    else:
        api_response = get_website_keywords_api_data(website_url)
    return api_response


def get_keyword_response_data(website_url):
    website_last_obj = WebsiteOrganicKeywords.objects.last()
    if website_last_obj:
        api_response = website_last_obj.keywords
    else:
        api_response = get_website_keywords_api_data(website_url)
    return api_response


def get_website_domain(website_url):
    print('before website_url:', website_url)
    # website_url = website_url.replace('://www.', '://')
    if website_url.endswith('/'):
        website_url = website_url[:-1]
    print('after website_url:', website_url)
    return website_url


def get_last_month_keyword_data(keyword_obj):
    if keyword_obj:
        keywords_json = keyword_obj.keywords
    else:
        keywords_json = ''
    return keywords_json

def ga4_generate_chart_1(api_res):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            'Pageviews': int(data_dict['screenPageViews']),
            "Unique Pageviews":None     #nothing available
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_1a(api_res):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            'Pageviews':int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_1b(api_res):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            "Unique Pageviews":None     #nothing available
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_1c(api_res):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            "Avg. Time on Page":None    #nothing available
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_2(api_res):
    listOfDict = api_res['table4']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            'Bounce Rate':float(data_dict['bounceRate']),
            r'% Exit': None#nothing avaliable
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_2a(api_res):
    listOfDict = api_res['table4']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            'Bounce Rate':float(data_dict['bounceRate']),
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_2b(api_res):
    listOfDict = api_res['table4']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            r'% Exit': None#nothing avaliable
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_2c(api_res):
    listOfDict = api_res['table6']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
            'Date': data_dict_date,
            'Pages / Session':float(data_dict['screenPageViewsPerSession']),
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_3(api_res):
    listOfDict = api_res['table7']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page':str(data_dict['pagePath'].replace('\\','')),
            'Pageviews':int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_4(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'],
            'Users':None, #avalible =>screenPageViews,
            'New Users':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_4a(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'],
            'Pageviews':int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_5(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Brands (Content Group)':None, #avalible =>screenPageViews,
            'Pageviews':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_6(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Search Term':None, #avalible =>screenPageViews,
            'Pageviews':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_7(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Event Category':None, #deviceCategory avalible =>screenPageViews,
            'Pageviews':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_8(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Date':None, # avalible =>screenPageViews,
            'Avg. Page Load Time (sec)':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ga4_generate_chart_8a(api_res):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'], # avalible =>screenPageViews,
            'Avg. Page Load Time (sec)':None, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_1(api_res, ac_type):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data={
            'Date': data_dict_date,
            'Pageviews': int(data_dict['pageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),
            "Unique Pageviews": int(data_dict['uniquePageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_1a(api_res, ac_type):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            'Pageviews':int(data_dict['pageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_1b(api_res, ac_type):
    listOfDict = api_res['table2']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            "Unique Pageviews":int(data_dict['uniquePageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),    
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_1c(api_res, ac_type):
    listOfDict = api_res['table4']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            "avg_time_on_page":float(data_dict['avgTimeOnPage']) if ac_type!='GA4' else float(0),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_2(api_res, ac_type):
    listOfDict = api_res['table5']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            'Bounce Rate':float(data_dict['bounceRate']),
            r'% Exit': float(data_dict['exitRate']) if ac_type!='GA4' else float(0),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_2a(api_res, ac_type):
    listOfDict = api_res['table5']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            'Bounce Rate':float(data_dict['bounceRate']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_2b(api_res, ac_type):
    listOfDict = api_res['table5']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            r'% Exit': float(data_dict['exitRate']) if ac_type!='GA4' else float(0),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_2c(api_res, ac_type):
    listOfDict = api_res['table5']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            'Date': data_dict_date,
            'Pages / Session': float(data_dict['pageviewsPerSession']) if ac_type!='GA4' else float(data_dict['screenPageViewsPerSession']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_3(api_res, ac_type):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page': str(data_dict['pageTitle'].replace('\\','')) ,
            'Pageviews':int(data_dict['pageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_4(api_res, ac_type):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'],
            # for testing we replace None to 0
            'Users': 0, #avalible =>screenPageViews,
            'New Users': 0, #avalible =>screenPageViews,
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_4a(api_res, ac_type):
    listOfDict = api_res['table8']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'],
            'Pageviews':int(data_dict['pageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_5(api_res, ac_type):
    listOfDict = api_res['table9']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Brands (Content Group)': data_dict['continent'] if ac_type!='GA4' else data_dict['country'],
            'Pageviews': data_dict['pageviews'] if ac_type!='GA4' else data_dict['screenPageViews'],
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_6(api_res, ac_type):
    listOfDict = api_res['table10']
    data = {'Search Term': '(not set)',
            'Pageviews': 0}
    json_list = [data]
    #     for data_dict in listOfDict:
    #         data={
    #             'Search Term': '(not set)',
    #             'Pageviews': 0,
    #         }
    #         json_list.append(data)
    return json_list

def ua_generate_chart_7(api_res, ac_type):
    listOfDict = api_res['table11']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Event Category':data_dict['eventCategory'] if ac_type!='GA4' else data_dict['eventName'],
            'Pageviews':int(data_dict['pageviews']) if ac_type!='GA4' else int(data_dict['screenPageViews']), 
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_8(api_res, ac_type):
    listOfDict = api_res['table4']
    json_list=[]
    for data_dict in listOfDict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data={
            'Date':data_dict_date,
            'Avg. Page Load Time (sec)':float(data_dict['avgTimeOnPage']) if ac_type!='GA4' else float(0),
        }
        json_list.append(data)
    return json_list

def ua_generate_chart_8a(api_res, ac_type):
    listOfDict = api_res['table12']
    json_list=[]
    for data_dict in listOfDict:
        data={
            'Page Title':data_dict['pageTitle'],
            'Avg. Page Load Time (sec)':float(data_dict['avgPageLoadTime']) if ac_type!='GA4' else float(0),
        }
        json_list.append(data)
    return json_list
    # audience overview chart functions

def ua_generate_chart_summary3(api_res, ac_type):
    data_dict = api_res['table3'][0]
    json_list=[]
    if ac_type=='GA4':
        data = {
            'pageviews': data_dict['screenPageViews'],
            'uniquePageviews': data_dict['screenPageViews'],
            'avgTimeOnPage': 0
        }
        json_list.append(data)
    else:
        json_list = api_res['table3']

    return json_list


def ua_generate_chart_summary6(api_res, ac_type):
    data_dict = api_res['table6'][0]
    json_list=[]
    if ac_type=='GA4':
        data = {
            'bounceRate': data_dict['bounceRate'],
            'exitRate': 0,
            'pageviewsPerSession': data_dict['screenPageViewsPerSession']
        }
        json_list.append(data)
    else:
        json_list = api_res['table6']

    return json_list


def audience_overview_chart1(api_res, ac_type):
    listofdict = api_res['table2']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                'Date': data_dict_date,
                "Users" : int(data_dict['totalUsers']),
            }
            json_list.append(data)

        elif ac_type == 'UA':
            data = {
                "Date" : data_dict_date,
                "Users" : int(data_dict['users']),
            }
            json_list.append(data)
    
    print(json_list)

    
    return json_list

def audience_overview_chart2(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        if ac_type == 'GA4':
            data = {
                "User_Type" : 'New Visitor',
                "Sessions" : int(data_dict['sessions']),
            }
            json_list.append(data)

        elif ac_type == 'UA':
            data = {
                "User_Type" : 'New Visitor',
                "Sessions" : int(data_dict['sessions']),
            }
            json_list.append(data)
    
    print(json_list)

    
    return json_list

def audience_overview_chart3(api_res, ac_type):
    listofdict = api_res['table6']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date" : data_dict_date,
                "New_Users" : int(data_dict['newUsers']),
            }
            json_list.append(data)
                
        elif ac_type == 'UA':
            data = {
                "Date" : data_dict_date,
                "New_Users" : int(data_dict['newUsers']),
            }
            json_list.append(data)    
    print(json_list)

    
    return json_list

def audience_overview_chart4(api_res, ac_type):
    listofdict = api_res['table7']
    json_list = []

    for data_dict in listofdict:
        if ac_type == 'GA4':
            data = {
                "Language" : data_dict['languageCode'],
                "Users" : int(data_dict['totalUsers']),
                "New_Users" : int(data_dict['newUsers']),
            }
            json_list.append(data)
        
        elif ac_type == 'UA':
            data = {
                "Language" : data_dict['language'],
                "Users" : int(data_dict['users']),
                "New_Users" : int(data_dict['newUsers']),
            }
            json_list.append(data)
    
    print(json_list)

    return json_list


def audience_overview_chart6(api_res, ac_type):
    listofdict = api_res['table9']
    json_list = []

    for data_dict in listofdict:
        if ac_type == 'GA4':
            data = {
                "Device": data_dict['deviceCategory'],
                "Users": int(data_dict['totalUsers'])
            }
            json_list.append(data)

        elif ac_type == 'UA':
            data = {
                "Device": data_dict['deviceCategory'],
                "Users": int(data_dict['users'])
                }
            json_list.append(data)

    print(json_list)

    
    return json_list

def audience_overview_device_data(api_res, ac_type):
    listofdict = api_res['table9']
    json_list = []

    for data_dict in listofdict:
        if ac_type == 'GA4':
            data = {
                "Device": data_dict['deviceCategory'],
                "Users": int(data_dict['totalUsers']),
                "New_Users" : int(data_dict['newUsers']),
             }
            json_list.append(data)

        elif ac_type == 'UA':
            data = {
                "Device": data_dict['deviceCategory'],
                "Users": int(data_dict['users']),
                "New_Users" : int(data_dict['newUsers']),
                }
            json_list.append(data)

    print(json_list)

    
    return json_list
        

def audience_overview_page_views(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Pageviews": int(data_dict['screenPageViews'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
            "Date": data_dict_date,
            "Pageviews": int(data_dict['pageviews'])
        }
            json_list.append(data)
    
    print(json_list)

    
    return json_list


def audience_overview_seesions_per_user(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Number_of_Sessions_per_User": float(data_dict['sessionsPerUser'])
            }
            json_list.append(data)
        
        elif ac_type == 'UA':
            data = {
                "Date": data_dict_date,
                "Number_of_Sessions_per_User": float(data_dict['sessionsPerUser'])
            }

            json_list.append(data)
    print(json_list)

    
    return json_list

def audience_overview_seesions(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Sessions": int(data_dict['sessions'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
                "Date": data_dict_date,
                "Sessions": int(data_dict['sessions'])
            }
            json_list.append(data)
    
    print(json_list)

    
    return json_list

def audience_overview_pages_per_session(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Pages_per_Session": float(data_dict['screenPageViewsPerSession'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
                "Date": data_dict_date,
                "Pages_per_Session": float(data_dict['pageviewsPerSession'])
            }
            json_list.append(data)
    
    print(json_list)

    
    return json_list


def audience_overview_summary(api_res, ac_type):
    data_dict = api_res['table3'][0]
    json_list = []

    if ac_type == "GA4":
        data = {
            'users': data_dict['totalUsers'],
            'newUsers': data_dict['newUsers'],
            'sessionsPerUser': data_dict['sessionsPerUser'],
            'sessions': data_dict['sessions'],
            'pageviews': data_dict['screenPageViews'],
            'pageviewsPerSession': data_dict['screenPageViewsPerSession'],
            'avgSessionDuration': data_dict['averageSessionDuration'],
            'bounceRate': data_dict['bounceRate']
        }
        json_list.append(data)
    else:
        json_list = api_res['table3']

    return json_list


def audience_overview_avg_sess_duration(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Avg_Session_Duration": float(data_dict['averageSessionDuration'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
                "Date": data_dict_date,
                "Avg_Session_Duration": float(data_dict['avgSessionDuration'])
            }
            json_list.append(data)
        
    print(json_list)

    
    return json_list


def audience_overview_bounce_rate(api_res , ac_type):
    listofdict = api_res['table4']
    json_list = []

    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        if ac_type == 'GA4':
            data = {
                "Date": data_dict_date,
                "Bounce_Rate": float(data_dict['bounceRate'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
            "Date": data_dict_date,
            "Bounce_Rate": float(data_dict['bounceRate'])
        }
            json_list.append(data)
        
    print(json_list)

    
    return json_list

        
def audience_overview_chart5(api_res, ac_type):
    listofdict = api_res['table8']
    json_list = []
    

    for data_dict in listofdict:
        if ac_type == 'GA4':
            data = {
                "Continent_ID": 120,
                "Continent_ID__1": 120,
                "Users" : int(data_dict['totalUsers'])
            }
            json_list.append(data)
        elif ac_type == 'UA':
            data = {
                "Continent_ID": 120,
                "Continent_ID__1": 120,
                "Users" : int(data_dict['users'])
            }
            json_list.append(data)
        
    print(json_list)

    
    return json_list

def audience_overview_continent_data(api_res, ac_type):
    listofdict = api_res['table8']
    json_list = []

    for data_dict in listofdict:

        data = {
            "Continent": data_dict['continent'] if ac_type!='GA4' else data_dict['region'],
            "Users": int(data_dict['users']) if ac_type!='GA4' else int(data_dict['totalUsers']),
            "New_Users" : int(data_dict['newUsers']),

        }
        json_list.append(data)
    
    print(json_list)

    
    return json_list

def ga4_top_acquisition_chart(api_res):
    
        listofdict = api_res['table6']
        json_list = []
        for data_dict in listofdict:
            data = {
            "Default Channel Grouping": data_dict['firstUserDefaultChannelGrouping'],
            "Users": int(data_dict['totalUsers'])
            }
            json_list.append(data)
        return json_list

def ga4_users_chart(api_res):
        listofdict = api_res['table4']
        json_list = []
        for data_dict in listofdict:
            
            data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
            data_dict_date = data_dict_date.strftime('%d/%b/%y')
            data = {
            "Date": data_dict_date,
            "Users": int(data_dict['totalUsers']),
            "New Users": int(data_dict['newUsers'])
            }
            json_list.append(data)
        return json_list

def ga4_conversions_chart(api_res):
    listofdict = api_res['table5']
    json_list = []
    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%d/%b/%y')
        data = {
        "Date": data_dict_date,
        "Goal Conversion Rate": float(data_dict['conversions'])
        }
        json_list.append(data)
    return json_list

def ga4_abc_chart(api_res):
    listofdict = api_res['table6']
    json_list = []
    for data_dict in listofdict:
        data = {
        "Source / Medium": data_dict['firstUserDefaultChannelGrouping'],
        "Sessions": int(data_dict['sessions']),
        "Users": int(data_dict['totalUsers']),
        "New Users" : int(data_dict['newUsers']),
        "Bounce Rate": float(data_dict['bounceRate']),
        "Pages / Session": float(data_dict['screenPageViewsPerSession']),
        "Avg Session Duration": float(data_dict['averageSessionDuration']),
        # => dummy data
        "Goal Conversion Rate": 0.27906678795177636,
        "Goal Completions": 21782,
        "Goal Value": 0, 
        }
        json_list.append(data)
    return json_list

def ua_top_acquisition_channels(api_res, ac_type):
    listofdict = api_res['table6']
    json_list = []
    for data_dict in listofdict:
        data = {
            "Default Channel Grouping": data_dict['channelGrouping'] if ac_type!='GA4' else data_dict['firstUserDefaultChannelGrouping'],
            "Users": int(data_dict['users']) if ac_type!='GA4' else int(data_dict['totalUsers'])
        }
        json_list.append(data)
    return json_list


def ua_users_chart(api_res, ac_type):
    listofdict = api_res['table4']
    json_list = []
    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            "Date": data_dict_date,
            "Users": int(data_dict['users']) if ac_type!='GA4' else int(data_dict['totalUsers']),
            "New Users": int(data_dict['newUsers'])
        }
        json_list.append(data)
    return json_list


def ua_conversions_chart(api_res, ac_type):
    listofdict = api_res['table5']
    json_list = []
    for data_dict in listofdict:
        data_dict_date = datetime.strptime(data_dict['date'], '%Y%m%d')
        data_dict_date = data_dict_date.strftime('%m/%d/%y')
        data = {
            "Date": data_dict_date,
            "Goal Conversion Rate": float(data_dict['goalConversionRateAll']) if ac_type!='GA4' else float(data_dict['conversions'])
        }
        json_list.append(data)
    return json_list


def ua_main_chart(api_res, ac_type):
    listofdict = api_res['table6']
    json_list = []
    for data_dict in listofdict:
        data = {
            "Source / Medium": data_dict['channelGrouping'] if ac_type!='GA4' else data_dict['firstUserDefaultChannelGrouping'],
            "Sessions": int(data_dict['sessions']),
            "Users": int(data_dict['users']) if ac_type!='GA4' else int(data_dict['totalUsers']),
            "New Users": int(data_dict['newUsers']),
            "Bounce Rate": float(data_dict['bounceRate']),
            "Pages / Session": float(data_dict['pageviewsPerSession']) if ac_type!='GA4' else float(data_dict['screenPageViewsPerSession']),
            "Avg Session Duration": float(data_dict['avgSessionDuration']) if ac_type!='GA4' else float(data_dict['averageSessionDuration']),
            "Goal Conversion Rate": float(data_dict['goalConversionRateAll']) if ac_type!='GA4' else float(0),
            "Goal Completions": int(data_dict['goalCompletionsAll']) if ac_type!='GA4' else float(0),
            "Goal Value": float(data_dict['goalValueAll']) if ac_type!='GA4' else float(0)
        }
        json_list.append(data)
    return json_list


def dropdown_data(api_res, ac_type="ua"):
    listofdict = api_res['table1']
    json_list = []
    for data_dict in listofdict:
        data = {
            "Continent": data_dict['continent'] if ac_type!="GA4" else data_dict['country'],
            "region": data_dict['region'],
            "Channel": data_dict['channelGrouping'] if ac_type!="GA4" else data_dict['firstUserDefaultChannelGrouping'],
            "Device": data_dict['deviceCategory']
        }
        json_list.append(data)
    return json_list

# def generate_caption(processor, model, image):
    
#     device = "cuda" if torch.cuda.is_available() else "cpu"
#     model.to(device)
#     inputs = processor(images=image, return_tensors="pt").to(device)
#     generated_ids = model.generate(pixel_values=inputs.pixel_values, max_length=50)
#     generated_caption = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

#     return generated_caption

# def alt_text_generator(image_links):
#     git_processor = AutoProcessor.from_pretrained("microsoft/git-large-coco")
#     git_model = AutoModelForCausalLM.from_pretrained("microsoft/git-large-coco")
#     alt_text = []
#     for i in tqdm(range(len(image_links))):
#         url = image_links[i]
#         print('url:', url)
#         try:
#             image = Image.open(requests.get(url, stream=True).raw)
#             caption = generate_caption(git_processor, git_model, image)
#             alt_text.append({'image_url' : url, 'caption' : caption})
#         except:
#             alt_text.append({'image_url' : url, 'caption': "NaN"})
#     return alt_text