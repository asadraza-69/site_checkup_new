import json
import os
from crawler.stopword_utils import Error_message
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.files import File
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.db import transaction
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from crawler.json_format import create_json_data_dict
from crawler.models import SiteScrapyData, SiteProcessData
from crawler.utils import *
from site_audit.models import Website
from user_management.models import GlobalConfiguration
# from site_audit.views import create_url_projects
from http.client import IncompleteRead
import http.client
from subscription_module.models import * 

def site_diagnositcs_each_page(url_list):
    data = {}
    async def get(url, session):
        api_data = {'website_base_url': url}
        api = 'http://23.106.56.71:5555/crawl_api/site_diagnositcs/'
        try:
            async with session.post(api, data=api_data) as response:
                resp = await response.json()
                data[url] = resp
                # print("Successfully got url {} with resp_code {}.".format(url, response.status))
        except Exception as e:
            print("Unable to get url {} due to {}.".format(url, e))
            print("Trying with request")
            try:
                api_data = {'website_base_url': url}
                api = 'http://23.106.56.71:5555/crawl_api/site_diagnositcs/'
                resp = requests.post(api, data=api_data)
                data[url] = resp.json()
            except Exception as e:
                data[url] = {}
        
    async def main(url_list):
        async with aiohttp.ClientSession() as session:
            ret = await asyncio.gather(*[get(url, session) for url in url_list])
        print("Finalized all. Return is a list of len {} outputs.".format(len(ret)))


    asyncio.run(main(url_list))
    
    return  data
    
def utils_crawl_data(body_data):
    response = {'status': False}
    main_data = body_data.get('data')
    website_crawler_status = main_data['crawler_status']
    website_empty_list = main_data['empty_list']
    sap_id = main_data['sap_id']
    website_url = main_data['main_url']
    print('main_url: ', website_url)
    raw_data = main_data['urls']
    website_obj = Website.objects.get(website_url=website_url)
    if not website_crawler_status and not website_empty_list:
        print('Exception: CrawlingError')
        response['error'] = Error_message
        response['sap_id'] = sap_id
        website_obj.crawl_request_inprocess = False
        website_obj.error_occured = True
        website_obj.error_description = Error_message
        website_obj.save()
        return response
    for k, v in raw_data.items():
        if k.endswith('/'):
            k = k[:-1]
        with transaction.atomic():
            current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
            website_obj = Website.objects.get(website_url=k)
            website_obj.crawl_request_inprocess = False
            website_obj.crawl_request_inprocess = False
            website_obj.save()
            raw_data_filename = f'website_raw_data_{current_datetime}.json'
            with open(raw_data_filename, 'w') as fp:
                json.dump({k:v}, fp, indent=4)
            obj = SiteScrapyData()
            obj.i_website = website_obj
            obj.raw_data = File(open(raw_data_filename))
            obj.status = 'crawled'
            obj.save()
            os.remove(raw_data_filename)
            response['status'] = True
            response['sap_id'] = sap_id
    # response['status'] = True
    # response['sap_id'] = sap_id

    return response

def get_process_data(website_url, webpages_qs,sap_obj):
    response = {'status': False}
    raw_data = {}
    # webpages_qs = list(webpages_qs.split(','))
    sap_obj.i_website.crawl_request_inprocess = True
    sap_obj.i_website.save()   
    # website_obj = Website.objects.get(website_url = sap_obj.i_website.website_url)
    # website_obj.crawl_request_inprocess = True
    # website_obj.save()
    print('process_webpage_qs: ', webpages_qs)
    for webpage in webpages_qs:
        webpage_obj = SiteScrapyData.objects.filter(i_website__website_url=webpage.i_website).latest('created_on')
        # website_obj = Website.objects.get(website_url = webpage.i_website)
        # website_obj.crawl_request_inprocess = True
        # website_obj.save()

        
        print('raw_webpage_obj: ', webpage_obj)
        data = json.load(webpage_obj.raw_data)
        url = data.keys()
        # url_dic = list(data.values())
        # if url:
        #     if 'HTML_text' in url_dic[0].keys() and 'status' in url_dic[0].keys():
        raw_data.update(data)
        #     else:
        #         continue
        # else:
        #     continue     
    
    healthy_pages_urls,redirect_pages_urls,broken_pages_urls,block_pages_urls =[],[], [], []
    rdata = {}   
    for url ,url_dictionary in raw_data.items():
        print('raw_data_url: ', url)
        rdata[url] = url_dictionary['HTML_text']
    try:
        if not website_url.endswith('/'):
            website_main_url = website_url + '/'
        else:
            website_main_url = website_url
        processed_data = {}
        url_list = {}
        list_of_table_dict = {}
        dictionary_link = {}
        crawled_url = []
        recommended_length = GlobalConfiguration.objects.get(name='recommended_length').value
        recommended_words = GlobalConfiguration.objects.get(name='recommended_words').value
        status_code_dict = {}
        dictionary = {}
        page_content_dict = {}
        total_webpages_count,main_page_table_dict = main_page_urls(website_url)
        total_webpages_count = UserSelectedWebsite.objects.filter(i_site_audit_project = sap_obj).count()
        total_crawlpages_count = len(list(raw_data.keys()))
        json_data_dict = create_json_data_dict()
        print('Total web pages: ',json_data_dict['total_webpages_count'])
        json_data_dict['total_webpages_count'] = total_webpages_count
        print('Total web pages: ',json_data_dict['total_webpages_count'])
        json_data_dict['total_crawlpages_count'] = total_crawlpages_count
        iteration_count = 1
        site_diagnositcs_resp = site_diagnositcs_each_page(raw_data.keys())
        for url, url_dictionary in raw_data.items():
            v = url_dictionary["HTML_text"]
            try:
                contentType = "--" if url_dictionary['contentType'] == "N/A" else url_dictionary['contentType']
            except  KeyError:
                contentType = '--'
            status = url_dictionary['status']
            try:
                server = "--" if url_dictionary['server'] == "N/A" else url_dictionary['server']
            except  KeyError:
                server = '--'
            str_status = str(url_dictionary['status'])
            if url_dictionary['status'] == 200:
                healthy_pages_urls.append(url)
                page_dic =  {
                "website_url": url, "status_code": status,
                "content_type": contentType,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": datetime.now().strftime("%d-%m-%Y"),
                "server": server}
                status_code_dict[url] = page_dic
            elif str_status.startswith("3"):
                redirect_pages_urls.append(url)
                page_dic =  {
                "website_url": url, "status_code": status,
                "content_type": contentType,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": datetime.now().strftime("%d-%m-%Y"),
                "server": server}
                status_code_dict[url] = page_dic
                continue
            elif str_status.startswith("4"):
                broken_pages_urls.append(url)
                page_dic =  {
                "website_url": url, "status_code": status,
                "content_type": contentType,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": datetime.now().strftime("%d-%m-%Y"),
                "server": server}
                status_code_dict[url] = page_dic
                continue
            elif str_status.startswith("5"):
                block_pages_urls.append(url)
                page_dic =  {
                "website_url": url, "status_code": status,
                "content_type": contentType,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": datetime.now().strftime("%d-%m-%Y"),
                "server": server}
                status_code_dict[url] = page_dic
                continue
            else:
                block_pages_urls.append(url)
                continue
            # api_data = {'website_base_url': url}
            # api = 'http://23.106.56.71:5555/crawl_api/site_diagnositcs/'
            # api_resp = requests.post(api, data=api_data).json()
            api_resp = site_diagnositcs_resp[url]
            crawled_url.append(url)
            processed_data[url] = {}
            soup = BeautifulSoup(v, 'lxml')
            status_code = status
            title_tags = soup.find('title')
            meta_tags = soup.find('meta', attrs={'name': 'description'})
            meta_content = ''
            try:
                if meta_tags:
                    meta_content = meta_tags['content']
            except KeyError:
                meta_content = ''
            title_tag = ''
            urls = url.split('/')[0]
            if title_tags:
                title_tag = title_tags.get_text().strip()
            content_type = ''
            try:
                content_type = contentType
            except KeyError:
                content_type = '--'
            table_dict = {
                "source_page_title": title_tag, "website_url": url, "status_code": status_code,
                "content_type": content_type,"description":meta_content,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": datetime.now().strftime("%d-%m-%Y"),
                "server": server}
            status_code_dict[url]['source_page_title'] = title_tag
            content_table_dict = {
                "source_page_title": title_tag, "website_url": url, "status_code": status_code,
                "content_type": content_type,"description":meta_content,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": len(title_tag),
                "server": recommended_length}
            page_with_thin_content_table_dict = {
                "source_page_title": title_tag, "website_url": url, "status_code": title_tag,
                "content_type": content_type,"description":meta_content,
                "date": datetime.now().strftime("%d-%m-%Y"),
                "last_modified": len(title_tag),
                "server": recommended_words}
            url_list[url] = table_dict
            found_date = datetime.now().strftime("%d-%b-%Y")
            main_url = website_main_url[:-1]
            if main_url == url:
                json_data_dict['crawl_pages']['main_page'] = website_url
                json_data_dict['crawl_pages']['page_title'] = title_tag
                json_data_dict['crawl_pages']['found'] = found_date
            else:
                inner_page_dict = {'url': url, 'page_title': title_tag, 'found': found_date}
                json_data_dict['crawl_pages']['inner_pages'].append(inner_page_dict)
            # continue
            
            resp = syntax_issues(v, table_dict)
            processed_data[url].update(resp)
            print('syntax_issues')

            resp = redirect_meta_refresh(soup, table_dict)
            processed_data[url].update(resp)
            print('redirect_meta_refresh')

            missing_image_resp, redirect_images_resp, broken_images_resp, big_images_resp, slow_images_resp, http_image_resp = image_processing(
                soup, website_url, table_dict,api_resp)
            processed_data[url].update(missing_image_resp)
            processed_data[url].update(redirect_images_resp)
            processed_data[url].update(broken_images_resp)
            processed_data[url].update(big_images_resp)
            processed_data[url].update(http_image_resp)
            # not integrated with json
            processed_data[url].update(slow_images_resp)
            print('image_processing')

            resp = pages_console_errors(url, api_resp, table_dict)
            processed_data[url].update(resp)
            print('Page with Console Errors')

            resp = redirect_http_to_https(url, soup, table_dict)
            processed_data[url].update(resp)
            print('redirect_http_to_https')

            # resp = redirect_https_to_http(url, soup, table_dict)
            # processed_data[url].update(resp)
            # print('redirect_https_to_http')

            resp = www(url, table_dict)
            processed_data[url].update(resp)
            print('www')


            # resp = no_www(url, table_dict)
            # processed_data[url].update(resp)

            # resp = robots_not_found(url, website_url, table_dict)
            # processed_data[url].update(resp)

            resp = canonical(url, soup, table_dict)
            processed_data[url].update(resp)
            print('canonical')

            # print('canonical ' + str(resp))

            resp = noindex_nofollow(url, soup, table_dict)
            processed_data[url].update(resp)
            print('noindex_nofollow')

            # print('No index, No Follow' + str(resp))

            # resp = nofollow(url, soup, table_dict)
            # processed_data[url].update(resp)
            # print('No follow ' + str(resp))

            # resp = missing_alt_text(soup,table_dict)
            # processed_data[url].update(resp)
            # print('missing_alt_text')

            resp = duplicate_pages(url, soup, rdata, table_dict)
            processed_data[url].update(resp)
            print('duplicate_pages')

            # resp = duplicate_meta_tag(url, v, raw_data)
            # res, count = get_duplicate_description_dict(resp)
            # duplicate_meta_description_count += count
            # processed_data[url].update(res)
            # if website_url == 'https://
            # -----------------------------------------------------------
            resp = no_out_going_link(soup, table_dict)
            processed_data[url].update(resp)
            print('no_out_going_link')

            resp = nofollow_outgoing_internal_links(soup, website_url, table_dict)
            processed_data[url].update(resp)
            print('nofollow_outgoing_internal_links')

            # resp = broken_img(soup,website_url,table_dict)
            # processed_data[url].update(resp)
            # print('broken_img')

            # resp = big_images(soup,website_url,table_dict)
            # processed_data[url].update(resp)
            # print('big_images')
            resp = links_to_broken_page(soup, website_url, table_dict)
            print('links_to_broken_page is running')
            list_of_table_dict[url] = table_dict
            for link in resp:
                if link in dictionary_link.keys():
                    dictionary_link[link].add(url)
                else:
                    dictionary_link[link]= {url}
            # resp = links_to_broken_page(soup, website_url, table_dict)
            # processed_data[url].update(resp)
            # print('links_to_broken_page')

            resp = twitter_card(soup, table_dict)
            processed_data[url].update(resp)
            print('twitter_card')

            resp = open_graph_tag(url, soup, table_dict)
            processed_data[url].update(resp)
            print('open_graph_tag')

            # data_link_dict = {
            #     "https_link_count": 0, "https_table_list": [],
            #     "http_link_count": 0, "http_table_list": []
            # }
            # if urls == 'https:':

            resp = http_in_https(url, soup, table_dict)
            processed_data[url].update(resp)
            print('http_in_https')
            
            # else:
            #     resp = https_in_http(soup, table_dict)
            #     processed_data[url].update(resp)
            #     print('http_in_https')
            resp = h1_empty(soup, table_dict)
            processed_data[url].update(resp)
            print('h1_empty')

            missing_title,multi_data,short_title,good_title,long_title = title_tag_process(soup, content_table_dict)
            processed_data[url].update(missing_title)
            processed_data[url].update(multi_data)
            processed_data[url].update(short_title)
            processed_data[url].update(good_title)
            processed_data[url].update(long_title)
            print('title_tag_process')

            resp = low_content_ratio(soup, table_dict)
            processed_data[url].update(resp)
            print('low_content_ratio')

            resp = h1_process(soup, table_dict)
            processed_data[url].update(resp)
            print('h1_process')

            resp = duplicate_title(soup, content_table_dict)
            processed_data[url].update(resp)
            print('duplicate_title')

            resp = return_page_content(soup)
            page_content_dict[url] = resp

            resp = multiple_meta_tags(soup, table_dict)
            processed_data[url].update(resp)
            print('multiple_meta_tags')

            resp = good_h1_tags(soup, table_dict)
            processed_data[url].update(resp)
            print('good_h1_tags')

            resp = image_extensions(soup, table_dict)
            processed_data[url].update(resp)
            print('image_extensions')
            # print('image_extensions resp:', resp)

            meta_tag_content,missing_data,short_data,good_data,long_data = meta_tag(soup, content_table_dict)
            processed_data[url].update(missing_data)
            processed_data[url].update(short_data)
            processed_data[url].update(good_data)
            processed_data[url].update(long_data)
            dictionary[url] = meta_tag_content
            print('meta_tag')

            
            resp = page_with_thin_content(soup, page_with_thin_content_table_dict)
            processed_data[url].update(resp)
            print('page_with_thin_content')

            # resp = a_tag(soup, website_url,table_dict)
            # processed_data[url].update(resp)
            # print('a_tag')
            #
            resp = keywords_frequency_new(soup, table_dict)
            processed_data[url].update(resp)
            print('keywords_frequency')
            
            print('iteration_count',iteration_count, 'url:', url)
            iteration_count +=1
        resp_robot_txt = robots_not_found(website_main_url, main_page_table_dict)
        print('robots_not_found')
        if resp_robot_txt['norobots_count'] != 0:
                json_data_dict["Other"]["Robots.txt not found"]['Founded'] += 1
                json_data_dict["Other"]["Robots.txt not found"]['table'].append(resp_robot_txt['norobots_table'])
                json_data_dict["Other"]["Robots.txt not found"]['detail'].append(resp_robot_txt['norobots_detail'])
        xml_resp = xml_sitemap_not_found(website_main_url, main_page_table_dict)
        print('xml_sitemap_not_found')
        if xml_resp['noxml_count'] > 0:
            json_data_dict['Other']['XML sitemap not found']['Founded'] = xml_resp['noxml_count']
            json_data_dict['Other']['XML sitemap not found']['table'].append(xml_resp['noxml_table'])
            json_data_dict['Other']['XML sitemap not found']['detail'].append(xml_resp['noxml_detail'])
        # print(resp)
        # return JsonResponse({})
        # processed_data[url].update(resp)

        broken_link_resp , link_status_code = process_broken_link(dictionary_link,list_of_table_dict)
        print("process_broken_link")
        for k ,v in broken_link_resp.items():
            links_to_broken_page_count = v['links_to_broken_page_count']
            page_count = v['page_count'] 
            if links_to_broken_page_count > 0:
                json_data_dict['Links']["Page has links to broken page"]["Founded"] += page_count
                json_data_dict['Links']["Page has links to broken page"]["table"].append(v['links_to_broken_page_table_dict'])
                json_data_dict['Links']["Page has links to broken page"]["detail"].append(v['links_to_broken_page_detail'])
                json_data_dict['Links']["Page has links to broken page"]["status_code"].update(v['status_code'])
                json_data_dict['Links']["Page has links to broken page"]["link_code"].update(v['link_code'])
        # broken_page, redirect_page, healthy_page, blocked_pages = crawled_pages_checker(crawled_url)
        get_internal_pages(status_code_dict, json_data_dict["internal_pages"],link_status_code)
        # redirecting_checker(url_list)
        redirect_3XX_resp,redirect_302_resp,redirect_loop_resp,redirect_chain_resp,redirect_chain_long_resp,redirect_broken_resp,list_3xx_detail = redirecting_checker(url_list)
        # redirect_3XX_resp, redirect_302_resp = redirect_3XX(url_list)
        print('redirect_3XX,302')

        # redirect_broken_resp = redirect_broken(url_list)
        print('redirect_broken')

        # redirect_chain_resp = redirect_chain(url_list)
        print('redirect_chain')

        # redirect_chain_long_resp = redirect_chain_long(url_list)
        print('redirect_chain_long')

        # redirect_loop_resp = redirect_loop(url_list)
        print('redirect_loop')

        # list_of_table_dict

        broken_page, blocked_pages,redirect_page = len(broken_pages_urls),len(block_pages_urls),len(list_3xx_detail)
        healthy_page = total_crawlpages_count-len(list_3xx_detail)-len(broken_pages_urls)-len(block_pages_urls)
        print('crawled_pages_initiating')

        # broken_page, redirect_page, healthy_page, blocked_pages = crawled_pages_checker(crawled_url)

        if broken_page:
            json_data_dict['crawl_pages_detail']['broken'] = broken_page
        if redirect_page:
            json_data_dict['crawl_pages_detail']['redirects'] = redirect_page
        if healthy_page:
            json_data_dict['crawl_pages_detail']['healthy'] = healthy_page
        if blocked_pages:
            json_data_dict['crawl_pages_detail']['blocked'] = blocked_pages
        print('crawled_pages_checker')

        process_meta_resp = process_dict(dictionary)
        # response returns the list of urls agains boolen if the url has duplicate meta
        for k,v in process_meta_resp.items():
            if v:
                table_dic = list_of_table_dict[k]
                details = table_dict['description']
                json_data_dict["Page Description"]["Duplicated Description"]['Founded'] += 1
                json_data_dict["Page Description"]["Duplicated Description"]['table'].append(table_dic)
                json_data_dict["Page Description"]["Duplicated Description"]['detail'].append(details)


        process_pages_resp = process_dict(page_content_dict)
        # response returns the list of urls agains boolen if the url has duplicate pages
        for k,v in process_pages_resp.items():
            if v:
                table_dic = list_of_table_dict[k]
                details = table_dict['description']
                json_data_dict["Content Ratio"][r"100% duplicate pages"]['Founded'] += 1
                json_data_dict["Content Ratio"][r"100% duplicate pages"]['table'].append(table_dic)
                json_data_dict["Content Ratio"][r"100% duplicate pages"]['detail'].append(details)


        
        
        # website_obj.crawl_request_inprocess = False
        # website_obj.save()
        # print('Crawler Ended')
        
        # duplicate_page_dict = duplicate_pages_func(raw_data, recommended_words)
        # processed_data['all_pages'] = duplicate_page_dict
        
                
        for key, val in processed_data.items():
            # print("Value: ")
            # print(val)
            print('loop-Started')
            if val['canonical_points_to_https_count'] > 0:
                json_data_dict["Indexability"]["Canonical from HTTP to HTTPS"]['Founded'] += 1
                json_data_dict["Indexability"]["Canonical from HTTP to HTTPS"]['table'].append(
                    val['canonical_points_to_https_table'])
                json_data_dict["Indexability"]["Canonical from HTTP to HTTPS"]['detail'].append(
                    val['canonical_points_to_https_detail'])
            print('canonical_points_to_https_count')

            if val['canonical_points_to_http_count'] > 0:
                json_data_dict["Indexability"]["Canonical from HTTPS to HTTP"]['Founded'] += 1
                json_data_dict["Indexability"]["Canonical from HTTPS to HTTP"]['table'].append(
                    val['canonical_points_to_http_table'])
                json_data_dict["Indexability"]["Canonical from HTTPS to HTTP"]['detail'].append(
                    val['canonical_points_to_http_detail'])
            print('canonical_points_to_http_count')

            if val["canonical_points_to_redirect_count"] > 0:
                json_data_dict["Indexability"]["Canonical points to redirect"]['Founded'] += 1
                json_data_dict["Indexability"]["Canonical points to redirect"]['table'].append(
                    val['canonical_points_to_redirect_table'])
                json_data_dict["Indexability"]["Canonical points to redirect"]['detail'].append(
                    val['canonical_points_to_redirect_detail'])
            print('canonical_points_to_redirect_count')

            if val['canonical_points_to_5xx_count'] > 0:
                json_data_dict["Indexability"]["Canonical points to 5XX"]['Founded'] += 1
                json_data_dict["Indexability"]["Canonical points to 5XX"]['table'].append(
                    val['canonical_points_to_5xx_table'])
                json_data_dict["Indexability"]["Canonical points to 5XX"]['detail'].append(
                    val['canonical_points_to_5xx_detail'])
            print('canonical_points_to_5xx_count')

            if val['canonical_points_to_404_count'] > 0:
                json_data_dict["Indexability"]["Canonical points to 4XX"]['Founded'] += 1
                json_data_dict["Indexability"]["Canonical points to 4XX"]['table'].append(
                    val['canonical_points_to_404_table'])
                json_data_dict["Indexability"]["Canonical points to 4XX"]['detail'].append(
                    val['canonical_points_to_404_detail'])
            print('canonical_points_to_404_count')

            if val['console_error_count'] > 0:
                json_data_dict['Other']['Pages with Console errors']['Founded'] += 1
                json_data_dict['Other']['Pages with Console errors']['table'].append(val['console_error_table'])
                json_data_dict['Other']['Pages with Console errors']['detail'].append(val['console_error_detail'])
            print('console_error_count')

            if val['syntax_issues_count'] > 0:
                json_data_dict['Other']['Pages with Syntax issues']['Founded'] += 1
                json_data_dict['Other']['Pages with Syntax issues']['table'].append(val['syntax_issues_table'])
                json_data_dict['Other']['Pages with Syntax issues']['detail'].append(val['syntax_issues_detail'])
            print('syntax_issues_count')

            json_data_dict['images_type']['gif'] += val['gif_images']
            json_data_dict['images_type']['png'] += val['png_images']
            json_data_dict['images_type']['svg'] += val['svg_images']
            json_data_dict['images_type']['jpeg'] += val['jpeg_images']
            json_data_dict['images_type']['webp'] += val['webp_images']
            json_data_dict['images_type']['other'] += val['other_images']
            json_data_dict['images_type_details'].append(val['image_details'])
            json_data_dict['dashboard_data']['big_images'] += val['big_image_count']

            if val['title_tag_missing']:
                json_data_dict['dashboard_data']['missing_title'] += 1
            json_data_dict['dashboard_data']['slow_image'] += val['slow_image_count']
            json_data_dict['dashboard_data']['missing_alt'] += val['missing_alt_text_count']
            json_data_dict['dashboard_data']['broken_links'] += val['broken_image_count']
            json_data_dict['dashboard_data']['redirect'] += val['redirect_image_count']

            content_dict = json_data_dict["Content"]
            page_titles_dict = json_data_dict["Page Titles"]
            page_desc_dict = json_data_dict["Page Description"]
            content_ratio_dict = json_data_dict["Content Ratio"]
            word_count_dict = json_data_dict["Word Count"]
            h1_dict = json_data_dict["H1"]

            if val['low_content_ratio']:
                content_dict["Low content ratio"]['Founded'] += 1
                content_dict["Low content ratio"]['table'].append(val['low_content_ratio_table'])

            if val['multi_h1_tag']:
                content_dict["Multiple H1 Tags"]['Founded'] += 1
                content_dict["Multiple H1 Tags"]['table'].append(val['multi_h1_tag_table'])
                content_dict["Multiple H1 Tags"]['detail'].append(val['multi_h1_tag_list'])

            if val['duplicate_h1_tags_length'] > 0:
                content_dict["Duplicated H1"]['Founded'] += 1
                content_dict["Duplicated H1"]['table'].append(val['duplicate_h1_table'])
                content_dict["Duplicated H1"]['detail'].append(val['duplicate_h1_tags_list'])

            if val['title_tag_missing']:
                content_dict["Title is missing"]['Founded'] += 1
                content_dict["Title is missing"]['table'].append(val['missing_title_table'])

            if val['meta_tag_short']:
                content_dict["Meta description too short"]['Founded'] += 1
                content_dict["Meta description too short"]['table'].append(val['meta_tag_short_table'])

            if val['low_word_count']:
                content_dict["Low Word Count"]['Founded'] += 1
                content_dict["Low Word Count"]['table'].append(val['low_word_count_table'])

            if val['short_title_count'] > 0:
                content_dict["Title too short"]['Founded'] += 1
                content_dict["Title too short"]['table'].append(val['short_title_table'])
                content_dict["Title too short"]['detail'].append(val['short_title_details'])

            if val['empty_h1_count'] > 0:
                content_dict["H1 tag missing or empty"]['Founded'] += 1
                content_dict["H1 tag missing or empty"]['table'].append(val['empty_h1_table'])

            if val['meta_tag_missing']:
                content_dict["Meta description tag missing or empty"]['Founded'] += 1
                content_dict["Meta description tag missing or empty"]['table'].append(
                    val['meta_missing_empty_table_dict'])
                content_dict["Meta description tag missing or empty"]['detail'].append(
                    val['meta_missing_empty_details'])
            if val['multiple_meta_tags']:
                content_dict["Multiple meta description tags"]['Founded'] += 1
                content_dict["Multiple meta description tags"]['table'].append(val['multiple_meta_tags_table_dict'])
                content_dict["Multiple meta description tags"]['detail'].append(val['multiple_meta_tags_table_list'])

            if val['long_title_count'] > 0:
                content_dict["Title too long"]['Founded'] += 1
                content_dict["Title too long"]['table'].append(val['long_title_table'])
                content_dict["Title too long"]['detail'].append(val['long_title_detail'])

            if val['multiple_title_tags']:
                content_dict["Multiple title tags"]['Founded'] += 1
                content_dict["Multiple title tags"]['table'].append(val['multiple_title_tags_table'])
                content_dict["Multiple title tags"]['detail'].append(val['multiple_title_tags_count'])

            if val['title_tag_missing']:
                page_titles_dict["Missing Titles"]['Founded'] += 1
                page_titles_dict["Missing Titles"]['table'].append(val['missing_title_table'])

            # if val['title_tag_isEmpty']:
            #     page_titles_dict["Empty Titles"]['Founded'] += 1
            #     page_titles_dict["Empty Titles"]['table'].append(val['title_tag_isEmpty_table'])

            if val['duplicate_title_tags_count'] > 0:
                page_titles_dict["Duplicated Title"]['Founded'] += 1
                page_titles_dict["Duplicated Title"]['table'].append(val['duplicate_title_table'])
                page_titles_dict["Duplicated Title"]['detail'].append(val['duplicate_title_tags_list'])

            if val['long_title_count'] > 0:
                page_titles_dict["Long Titles"]['Founded'] += 1
                page_titles_dict["Long Titles"]['table'].append(val['long_title_table'])
                page_titles_dict["Long Titles"]['detail'].append(val['long_title_detail'])

            if val['short_title_count'] > 0:
                page_titles_dict["Short Titles"]['Founded'] += 1
                page_titles_dict["Short Titles"]['table'].append(val['short_title_table'])
                page_titles_dict["Short Titles"]['detail'].append(val['short_title_details'])

            if val['good_title_count'] > 0:
                page_titles_dict["Good Titles"]['Founded'] += 1
                page_titles_dict["Good Titles"]['table'].append(val['good_title_table'])
                page_titles_dict["Good Titles"]['detail'].append(val['good_title_detail'])

            if val['title_tag_missing']:
                word_count_dict["Missing Titles"]['Founded'] += 1
                word_count_dict["Missing Titles"]['table'].append(val['missing_title_table'])

            if val['duplicate_title_tags_count'] > 0:
                word_count_dict["Duplicated Title"]['Founded'] += 1
                word_count_dict["Duplicated Title"]['table'].append(val['duplicate_title_table'])
                word_count_dict["Duplicated Title"]['detail'].append(val['duplicate_title_tags_list'])

            if val['long_title_count'] > 0:
                word_count_dict["Long Titles"]['Founded'] += 1
                word_count_dict["Long Titles"]['table'].append(val['long_title_table'])
                word_count_dict["Long Titles"]['detail'].append(val['long_title_detail'])

            if val['short_title_count'] > 0:
                word_count_dict["Short Titles"]['Founded'] += 1
                word_count_dict["Short Titles"]['table'].append(val['short_title_table'])
                word_count_dict["Short Titles"]['detail'].append(val['short_title_details'])

            if val['good_title_count'] > 0:
                word_count_dict["Good Titles"]['Founded'] += 1
                word_count_dict["Good Titles"]['table'].append(val['good_title_table'])
                word_count_dict["Good Titles"]['detail'].append(val['good_title_detail'])

            if val['duplicate_h1_tags_length'] > 0:
                h1_dict["Duplicated H1"]['Founded'] += 1
                h1_dict["Duplicated H1"]['table'].append(val['duplicate_h1_table'])
                h1_dict["Duplicated H1"]['detail'].append(val['duplicate_h1_tags_list'])

            if val['empty_h1_count'] > 0:
                h1_dict["Missing H1"]['Founded'] += 1
                h1_dict["Missing H1"]['table'].append(val['empty_h1_table'])

            if val['h1_good_count'] > 0:
                h1_dict["Good H1"]['Founded'] += 1
                h1_dict["Good H1"]['table'].append(val['h1_good_count_table'])
                h1_dict["Good H1"]['detail'].append(val['h1_good_count_list'])

            # 'Page Description'
            # if val['duplicate_description_list_length'] > 0:
            #     page_desc_dict["Duplicated Description"]['Founded'] += 1
            #     page_desc_dict["Duplicated Description"]['table'].append(val['duplicate_description_table'])
            #     page_desc_dict["Duplicated Description"]['detail'].append(val['duplicate_description_list'])

            if val['meta_tag_missing']:
                page_desc_dict["Missing Description"]['Founded'] += 1
                page_desc_dict["Missing Description"]['table'].append(val['meta_missing_empty_table_dict'])

            if val['meta_tag_long']:
                page_desc_dict["Long Description"]['Founded'] += 1
                page_desc_dict["Long Description"]['table'].append(val['meta_tag_long_table'])
                page_desc_dict["Long Description"]['detail'].append(val['meta_tag_long_list'])

            if val['meta_tag_short']:
                page_desc_dict["Short Description"]['Founded'] += 1
                page_desc_dict["Short Description"]['table'].append(val['meta_tag_short_table'])
                page_desc_dict["Short Description"]['detail'].append(val['meta_tag_short_list'])

            if val['meta_tag_good']:
                page_desc_dict["Good Description"]['Founded'] += 1
                page_desc_dict["Good Description"]['table'].append(val['meta_tag_good_table'])
                page_desc_dict["Good Description"]['detail'].append(val['meta_tag_good_list'])

            # "Content Ratio"
            if val['thin_content']:
                content_ratio_dict["Pages with thin content"]['Founded'] += 1
                content_ratio_dict["Pages with thin content"]['table'].append(val['thin_content_table'])

            # if val['duplicate_page']:
            #     content_ratio_dict["Pages with thin content"]['Founded'] += 1
            #     content_ratio_dict["Pages with thin content"]['table'].append(val['duplicate_page_table_dict'])
            #     content_ratio_dict["Pages with thin content"]['detail'].append(val['duplicate_page_link'])

            if val['list_count'] > 0:
                content_ratio_dict["Pages with keyword stuffing"]['Founded'] += 1
                content_ratio_dict["Pages with keyword stuffing"]['table'].append(
                    val['keyword_stuffing_table_data'])
                content_ratio_dict["Pages with keyword stuffing"]['detail'].append(
                    val['keyword_stuffing_detail'])

            if val['noindex_count'] > 0:
                json_data_dict["Indexability"]["Noindex page"]['Founded'] += 1
                json_data_dict["Indexability"]["Noindex page"]['table'].append(val['noindex_table'])
                json_data_dict["Indexability"]["Noindex page"]['detail'].append(val['noindex_detail'])

            if val['nofollow_count'] > 0:
                json_data_dict["Indexability"]["Nofollow page"]['Founded'] += 1
                json_data_dict["Indexability"]["Nofollow page"]['table'].append(val['nofollow_table'])
                json_data_dict["Indexability"]["Nofollow page"]['detail'].append(val['nofollow_detail'])

            if val['broken_image_count'] > 0:
                json_data_dict['Images']["Page has broken image"]["Founded"] += 1
                json_data_dict['Images']["Page has broken image"]["table"].append(val['broken_images_table_dict'])
                json_data_dict['Images']["Page has broken image"]["detail"].append(val['broken_image_list'])

            if val['missing_alt_text_count'] > 0:
                json_data_dict['Images']["Missing alt text"]["Founded"] += 1
                json_data_dict['Images']["Missing alt text"]["table"].append(val['big_images_table_dict'])
                json_data_dict['Images']["Missing alt text"]["detail"].append(val['missing_alt_text_list'])

            if val['big_image_count'] > 0:
                json_data_dict['Images']["Image file size too large"]["Founded"] += 1
                json_data_dict['Images']["Image file size too large"]["table"].append(val['big_images_table_dict'])
                json_data_dict['Images']["Image file size too large"]["detail"].append(val['big_image_list'])

            if val['redirect_image_count'] > 0:
                json_data_dict['Images']["Image redirects"]["Founded"] += 1
                json_data_dict['Images']["Image redirects"]["table"].append(val['redirect_image_table_dict'])
                json_data_dict['Images']["Image redirects"]["detail"].append(val['redirect_image_list'])

            if val['http_image_count'] > 0:
                json_data_dict['Images']["HTTPS page links to HTTP image"]["Founded"] += 1
                json_data_dict['Images']["HTTPS page links to HTTP image"]["table"].append(
                    val['http_image_table_dict'])
                json_data_dict['Images']["HTTPS page links to HTTP image"]["detail"].append(val['http_image_list'])
            
            if val['nofollow_outgoing_internal_links_count'] > 0:
                json_data_dict['Links']["Page has nofollow outgoing internal links"]["Founded"] += 1
                json_data_dict['Links']["Page has nofollow outgoing internal links"]["table"].append(
                    val['nofollow_outgoing_internal_link_table'])
                json_data_dict['Links']["Page has nofollow outgoing internal links"]["detail"].append(
                    val['nofollow_outgoing_internal_links_list'])

            if val['no_out_going_link_count'] > 0:
                json_data_dict['Links']["Page has no outgoing links"]["Founded"] += 1
                json_data_dict['Links']["Page has no outgoing links"]["table"].append(
                    val['no_out_going_link_table'])
                json_data_dict['Links']["Page has no outgoing links"]["detail"].append(
                    val['no_out_going_link_detail'])

            if val['http_to_https_link_count'] > 0:
                json_data_dict['Links']["HTTP page has internal links to HTTPS"]["Founded"] += 1
                json_data_dict['Links']["HTTP page has internal links to HTTPS"]["table"].append(
                    val['http_to_https_link_table'])
                json_data_dict['Links']["HTTP page has internal links to HTTPS"]["detail"].append(
                    val['http_to_https_link_detail'])

            if val['https_to_http_link_count'] > 0:
                json_data_dict['Links']["HTTPS page has internal links to HTTP"]["Founded"] += 1
                json_data_dict['Links']["HTTPS page has internal links to HTTP"]["table"].append(
                    val['https_to_http_link_table'])
                json_data_dict['Links']["HTTPS page has internal links to HTTP"]["detail"].append(
                    val['https_to_http_link_detail'])
            # Social
            if val['twitter_card_count'] > 0:
                json_data_dict['Social']["Twitter card incomplete"]["Founded"] += 1
                json_data_dict['Social']["Twitter card incomplete"]["table"].append(val['twitter_card_table'])
                json_data_dict['Social']["Twitter card incomplete"]["detail"].append(val['twitter_card_detail'])

            if val['open_graph_tag_count'] > 0:
                json_data_dict['Social']["Open graph tags incomplete"]["Founded"] += 1
                json_data_dict['Social']["Open graph tags incomplete"]["table"].append(val['open_graph_tag_table'])
                json_data_dict['Social']["Open graph tags incomplete"]["detail"].append(
                    val['open_graph_tag_details'])

            if val['www_count'] > 0:
                json_data_dict['Other']['www']['Founded'] += 1
                json_data_dict['Other']['www']['table'].append(val['www_table'])
                json_data_dict['Other']['www']['detail'].append(val['www_detail'])

            if val['no_www_count'] > 0:
                json_data_dict['Other']['non-www']['Founded'] += 1
                json_data_dict['Other']['non-www']['table'].append(val['no_www_table'])
                json_data_dict['Other']['non-www']['detail'].append(val['no_www_detail'])

            if val['redirect_http_to_https_link_count'] > 0:
                json_data_dict['Redirects']['HTTP to HTTPS redirect']['Founded'] += 1
                json_data_dict['Redirects']['HTTP to HTTPS redirect']['table'].append(
                    val['redirect_http_to_https_link_table'])
                json_data_dict['Redirects']['HTTP to HTTPS redirect']['detail'].append(
                    val['redirect_http_to_https_link_detail'])

            if val['redirect_https_to_http_link_count'] > 0:
                json_data_dict['Redirects']['HTTPS to HTTP redirect']['Founded'] += 1
                json_data_dict['Redirects']['HTTPS to HTTP redirect']['table'].append(
                    val['redirect_https_to_http_link_table'])
                json_data_dict['Redirects']['HTTPS to HTTP redirect']['detail'].append(
                    val['redirect_https_to_http_link_detail'])

            if val['redirect_meta_refresh_count'] > 0:
                json_data_dict['Redirects']['Meta refresh redirect']['Founded'] += 1
                json_data_dict['Redirects']['Meta refresh redirect']['table'].append(
                    val['redirect_meta_refresh_table'])
                json_data_dict['Redirects']['Meta refresh redirect']['detail'].append(
                    val['redirect_meta_refresh_detail'])

        if redirect_302_resp['redirect_302_count'] > 0:
            json_data_dict['Redirects']['302 redirect']['Founded'] += redirect_302_resp['redirect_302_count']
            json_data_dict['Redirects']['302 redirect']['table'] = redirect_302_resp['redirect_302_table']
            json_data_dict['Redirects']['302 redirect']['detail'] = redirect_302_resp['redirect_302_detail']

        if redirect_3XX_resp['redirect_3XX_count'] > 0:
            json_data_dict['Redirects']['3XX redirect']['Founded'] += redirect_3XX_resp['redirect_3XX_count']
            json_data_dict['Redirects']['3XX redirect']['table'] = redirect_3XX_resp['redirect_3XX_table']
            json_data_dict['Redirects']['3XX redirect']['detail'] = redirect_3XX_resp['redirect_3XX_detail']

        if redirect_broken_resp['redirect_broken_count'] > 0:
            json_data_dict['Redirects']['Broken redirect']['Founded'] += redirect_broken_resp['redirect_broken_count']
            json_data_dict['Redirects']['Broken redirect']['table'] = redirect_broken_resp['redirect_broken_table']
            json_data_dict['Redirects']['Broken redirect']['detail'] = redirect_broken_resp['redirect_broken_detail']

        if redirect_chain_resp['redirect_chaincount'] > 0:
            json_data_dict['Redirects']['Redirect chain']['Founded'] += redirect_chain_resp['redirect_chaincount']
            json_data_dict['Redirects']['Redirect chain']['table'] = redirect_chain_resp['redirect_chaintable']
            json_data_dict['Redirects']['Redirect chain']['detail'] = redirect_chain_resp['redirect_chaindetail']

        if redirect_chain_long_resp['redirect_chain_long_count'] > 0:
            json_data_dict['Redirects']['Redirect chain too long']['Founded'] += redirect_chain_long_resp['redirect_chain_long_count']
            json_data_dict['Redirects']['Redirect chain too long']['table'] = redirect_chain_long_resp['redirect_chain_long_table']
            json_data_dict['Redirects']['Redirect chain too long']['detail'] = redirect_chain_long_resp['redirect_chain_long_detail']

        if redirect_loop_resp['redirect_loop_count'] > 0:
            json_data_dict['Redirects']['Redirect loop']['Founded'] += redirect_loop_resp['redirect_loop_count']
            json_data_dict['Redirects']['Redirect loop']['table'] = redirect_loop_resp['redirect_loop_table']
            json_data_dict['Redirects']['Redirect loop']['detail'] = redirect_loop_resp['redirect_loop_detail']

        for url ,url_dictionary in raw_data.items():
            user_obj = sap_obj.created_by.profile
            subscription = Subscriptions.objects.get(profile_id = user_obj, is_active = True)
            module = Module.objects.get(name = 'Crawl Page Limit')
            units = UserModuleUnits.objects.get(subscription_id = subscription , module_id = module)
            # subscription_id = subscription,
            units.consumed_units += 1
            units.save()
        

        with transaction.atomic():
            # auto_create_url_projects = GlobalConfiguration.objects.get(name='auto_create_url_projects').value
            # if auto_create_url_projects == "True":
            #     print("auto_create_url_projects")
            #     create_url_projects(website_obj,raw_data.keys())

            current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
            process_data_filename = f'website_process_data_{current_datetime}.json'
            with open(process_data_filename, 'w') as fp:
                json.dump(json_data_dict, fp, indent=4)
            # obj = SiteScrapyData.objects.filter(i_website = website_obj).latest("created_on")
            # obj.process_data = File(open(process_data_filename))
            # obj.status = 'processed'
            # obj.save()
            # os.remove(process_data_filename)

            # project_obj = SiteAuditProject.objects.get(i_website = website_obj)
            # print('project_obj: ',project_obj)
            # try:
            #     obj = SiteProcessData.objects.filter(i_project = project_obj).latest("created_on")
            #     obj.process_data = File(open(process_data_filename))
            #     obj.save()
            #     os.remove(process_data_filename)
                
            
            # except SiteProcessData.DoesNotExist:
            # process_obj = SiteProcessData()
            # process_obj.project = project_obj
            # process_obj.process_data = File(open(process_data_filename))
            # process_obj.save()
            # os.remove(process_data_filename)


            # webpage_obj = WebsitePages.objects.filter(webpage = website_url)
            # for page in webpage_obj:
            #     page.is_crawled =  True
            #     page.save()
                
                # process_obj.i_website = website_url
               
            print('project_obj: ',sap_obj)
            process_obj = SiteProcessData()
            process_obj.project = sap_obj
            process_obj.process_data = File(open(process_data_filename))
            process_obj.save()
            for webpage in webpages_qs:
                webpage_obj = SiteScrapyData.objects.filter(i_website__website_url=webpage.i_website).latest('created_on')
                website_obj = Website.objects.get(website_url = webpage.i_website)
                website_obj.crawl_request_inprocess = False
                website_obj.save()
                # for webpage in webpage_obj:
                # print('loop_webpage: ', type(webpage))
                    # page = SiteScrapyData.objects.get(id = webpage)
                    
                webpage_obj.status = 'processed'
                webpage_obj.save()
            os.remove(process_data_filename)

        response['status'] = True

    except Exception as e:
        import sys
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print("==========ERROR DETAILS=============")
        print(exc_type, fname, exc_tb.tb_lineno)
        # with transaction.atomic():
        #     obj = SiteScrapyData.objects.get(i_website = website_obj, status = 'queued')
        #     obj.status = 'rejected'
        #     obj.save()
        #     # os.remove(raw_data_filename)
        #     website_obj.crawl_request_inprocess = False
        #     website_obj.error_occured = True
        #     print('Exception:', repr(e))
        response['status'] = False
        response['error'] = repr(e)
            # website_obj.error_description = e
            # website_obj.save()
    return response



def process_crawl_data_util(sap_id):
    print('process_crawl_data_util')
    sap_obj = SiteAuditProject.objects.get(pk = sap_id.pk)
    webpages_qs = UserSelectedWebsite.objects.filter(
            i_profile = sap_obj.created_by.profile,
            i_site_audit_project = sap_obj
            )
    print('process_crawl_webpages_qs: ', webpages_qs)
    # subscription_obj = Subscriptions.objects.get(profile_id = sap_obj.created_by.profile, is_active = True)
    # plan_obj = Plan.objects.get(pk = subscription_obj.plan_id.pk)
    # allowed_units = PlanModuleDetail.objects.get(module_id = 'Crawl Page Limit', plan_id = plan_obj).units_allowed
    # consumed_links = UserModuleUnits.objects.get(subscription_id = subscription_obj, module_id = 'Crawl Page Limit').consumed_units
    website_url = sap_obj.i_website.website_url
    website_obj = Website.objects.get(website_url = website_url)
    website_obj.crawl_request_inprocess = True
    website_obj.save()
    error_urls=[]
    website_attempt_days =  int(GlobalConfiguration.objects.get(name='website_attempt_days').value)
    attempt_interval_time = timezone.now() - timedelta(days=website_attempt_days)
    website_attempt_count = int(GlobalConfiguration.objects.get(name='website_attempt_count').value)
    webpages_qs_2= copy.deepcopy(webpages_qs)
    for webpage in webpages_qs:
        webpage_obj = SiteScrapyData.objects.filter(i_website__website_url=webpage.i_website).latest('created_on')
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
                                # webpage_obj.i_website.crawling_count +=1
                                webpage_obj.i_website.attempt_date = timezone.now()
                                webpage_obj.i_website.save()
                        else:
                            webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)
                else:
                    if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                        error_urls.append(webpage_obj.i_website.website_url)
                        with transaction.atomic():
                            # webpage_obj.i_website.crawling_count +=1
                            webpage_obj.i_website.attempt_date = timezone.now()
                            webpage_obj.i_website.save()
                    else:
                        webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk) 
            else:
                if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                    error_urls.append(webpage_obj.i_website.website_url)
                    with transaction.atomic():
                        # webpage_obj.i_website.crawling_count +=1
                        webpage_obj.i_website.attempt_date = timezone.now()
                        webpage_obj.i_website.save()
                else:
                    webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)   
        else:   
            if attempt_interval_time <= webpage_obj.i_website.attempt_date and website_attempt_count >= webpage_obj.i_website.crawling_count:
                error_urls.append(webpage_obj.i_website.website_url)
                with transaction.atomic():
                    # webpage_obj.i_website.crawling_count +=1
                    webpage_obj.i_website.attempt_date = timezone.now()
                    webpage_obj.i_website.save()
            else:
                webpages_qs_2 = webpages_qs_2.exclude(pk =webpage.pk)

    if len(error_urls) <= 0:
        # if consumed_links < allowed_units:
        response = get_process_data(website_url, webpages_qs_2,sap_obj)
        # else:?
            # response = {'status' : False,  'limits_error' : "You've reached your limits for the plan. You can see more by upgrading to the higher plan."}

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
    
    return response