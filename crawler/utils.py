import requests
import nltk
# import xmltodict
from crawler.stopword_utils import stpwrd_cus1,special_char,new_stopwords,Meta_tag_missing_error
from bs4 import BeautifulSoup
from user_management.models import GlobalConfiguration
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk.data
from datetime import datetime
from urllib.parse import urlparse
from site_audit.views import *
import urllib.request
from io import BytesIO
from PIL import Image
import cairosvg
import re
from crawler.typelist_utils import type_lis as list_of_types
from usp.tree import sitemap_tree_for_homepage
from py_w3c.validators.html.validator import HTMLValidator
import asyncio
import aiohttp,json
import mimetypes
from django.http import JsonResponse
from site_audit.models import Website
from crawler.models import SiteScrapyData ,SiteProcessData
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from crawler.models import WebsitePages
from collections import OrderedDict
from subscription_module.models import Subscriptions,PlanModuleDetail
import copy

# from crawler.views import is_valid_url
nltk.download('stopwords')
nltk.download('punkt')
def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url)  # check if url format is valid
    except ValidationError:
        return False

    return True
    
def get_site_scrapy_data(website_url,args,user = None) :
    if not website_url:
        return {'status': False, 'error': 'website url is empty','data':{}}
    else:
        pass
    if not is_valid_url(website_url):
        return {'status': False, 'error': 'website_url is invalid','data':{}}
    else:
        pass
    try:
        website_obj = Website.objects.get(website_url=website_url)
    except Website.DoesNotExist:
        return {'status': False, 'error': 'website_url not found','data':{}}
    if website_obj.error_occured == True:
        return {'status': False, 'error': website_obj.error_description,'data':{}}
    else:
        process_data = ''
        try:
            site_scrapy_data_qs = SiteScrapyData.objects.filter(i_website=website_obj,status = "processed")
            website = site_scrapy_data_qs.latest('created_on')
            latest_website = website.i_website
            print('latest: ',latest_website)
            site_scrapy_data = site_scrapy_data_qs.latest('created_on')
            process_data = site_scrapy_data.process_data
            auto_create_url_projects = GlobalConfiguration.objects.get(name='auto_create_url_projects').value.lower()
            print("auto_create_url_projects: %s" % auto_create_url_projects)
            if auto_create_url_projects == "true":
                print("auto_create_url_projects")
                raw_data = site_scrapy_data.raw_data
                raw_data = json.load(raw_data)
                create_url_projects(website_obj,raw_data.keys(),user)
        except SiteScrapyData.DoesNotExist:
            return {'status': False, 'error': 'Processed data not found', 'crawl_request_inprocess' : website_obj.crawl_request_inprocess}
        try:
            sap_obj = SiteAuditProject.objects.get(i_website = website_obj,created_by = user)
            webpage_qs = SiteProcessData.objects.filter(project = sap_obj)
            webpage_obj = webpage_qs.latest('created_on')
            process_data= webpage_obj.process_data
            process_data = json.load(process_data)
            if args == 'crawl':
                data = {"Links": process_data["Links"], "Other": process_data["Other"], "Images": process_data["Images"],
                        "Social": process_data["Social"], "Content": process_data["Content"],
                        "Redirects": process_data["Redirects"], "Performance": process_data["Performance"],
                        "Indexability": process_data["Indexability"], "internal_pages": process_data["internal_pages"],
                        "crawl_request_inprocess" : website_obj.crawl_request_inprocess,
                        }
                response = {'status': True, 'error':'' ,'data': data}
            elif args == 'content':
                data = {"Page Titles": process_data["Page Titles"],
                        "Page Description": process_data["Page Description"], "Content Ratio": process_data["Content Ratio"],
                        "Word Count": process_data["Word Count"],
                        "H1": process_data["H1"],
                        "crawl_request_inprocess" : website_obj.crawl_request_inprocess}
                response = {'status': True, 'data': data}
            elif args == 'images_type':
                sub_obj = Subscriptions.objects.get(
                profile_id = user.profile,
                is_active = True,
                )
                PlanModule_obj = PlanModuleDetail.objects.get(
                plan_id = sub_obj.plan_id,
                module_id__name = "Crawl Page Limit"
                )
                allowed_pages = PlanModule_obj.units_allowed
                images_type = process_data['images_type']
                crawl_pages = process_data['crawl_pages']
                dashboard_data = process_data['dashboard_data']
                total_webpages_count = process_data['total_webpages_count']
                total_crawl_pages_count = process_data['total_crawlpages_count']
                total_webpages = process_data['total_webpages']
                try:
                    crawl_pages_detail = process_data['crawl_pages_detail']
                except KeyError:
                    crawl_pages_detail = {}
                response = {'status': True, 'data': images_type, 'crawl_pages': crawl_pages,
                            'dashboard_data': dashboard_data, 'total_webpages_count': total_webpages_count,
                            'total_crawl_pages_count': total_crawl_pages_count, 'total_webpages' : total_webpages, 'allowed_pages' : allowed_pages, 
                            'crawl_pages_detail' : crawl_pages_detail, 'crawl_request_inprocess' : website_obj.crawl_request_inprocess}
        except SiteProcessData.DoesNotExist:
            return {'status': False, 'error': 'Processed data not found', 'crawl_request_inprocess' : website_obj.crawl_request_inprocess}

        return response

def main_page_urls(websites_url):
    
    if websites_url.endswith('/'):
        websites_url = websites_url[:-1]
    website_domain = urlparse(websites_url).netloc
    try:
        req = requests.get(websites_url, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
    except requests.exceptions.SSLError as e:
        req = requests.get(websites_url,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
    print("response: ",req.status_code)
    url_list = []
    url_text_dict = {}
    soup = BeautifulSoup(req.text,'lxml')
    status_code = req.status_code
    title_tags = soup.find('title')
    title_tag = ''
    if title_tags:
        title_tag = title_tags.get_text().strip()
    content_type = ''
    try:
        content_type = req.headers['Content-Type']
    except KeyError:
        content_type = '--'

    table_dict = {
        "source_page_title": title_tag, "website_url": websites_url, "status_code": status_code,
        "content_type": content_type,
        "date": datetime.now().strftime("%d-%m-%Y"),
        "last_modified": datetime.now().strftime("%d-%m-%Y"),
        "server": "apache"}

    for link in soup.find_all('a'):
        url = link.get('href')
        if url and not '#'  in url:
            text = link.text
            # Formation of urls and urls of same domain 
            if url.startswith('http') or url.startswith('www'):
                url_domain = urlparse(url).netloc
                if website_domain != url_domain:
                    continue
            elif url.startswith('/'):
                # if starts with a slash then remove slash then matching if the domain is same or not
                url = url.strip('/')
                if url.startswith('http') or url.startswith('www'):
                    url_domain = urlparse(url).netloc
                    if website_domain != url_domain:
                        continue
                    else:
                        url = websites_url+'/'+url
                else:
                    url = websites_url+'/'+url
            elif url.startswith('../'):
                new_url = ''
                for index in url.split("/"):
                    if not index.startswith('..'):
                        new_url += "/" + index
                url = websites_url+new_url
            else:
                url = websites_url+'/'+url
            #End Formation of urls and urls of same domain 

            # Filtering out images and other links
            if  re.search(r"javascript:", url)  or "javascript:" in url or "tel:" in url or "email:" in url or "mailto:" in url  or ".webp" in url :
                continue
            else:
                mimestart = mimetypes.guess_type(url)[0]
                if mimestart is None :
                    if url.endswith("/"):
                        url = url[:-1]
                    # print('URL: ',url)
                    url_list.append(url)
                    url_text_dict.update({url: text})
                elif mimestart == 'text/html':
                    # print('URL: ',url)
                    if url.endswith("/"):
                        url = url[:-1]
                    url_list.append(url)
                    url_text_dict.update({url: text})
                else:
                    pass
            #End Filtering out images and other links
        #Remove Duplicating urls from list
    url_list = list(set(url_list))
    data = []
    data.append({'label': 'Home','url': websites_url})
    for url in url_list:
        if url != websites_url:
            text = url_text_dict[url]
            data.append({
                'label': text,
                'url': url
            })
    return (data) ,table_dict
    
def main_page_urls2(websites):
    
    if not websites.endswith('/'):
        websites = websites +"/"
    domain = urlparse(websites).netloc
    if 'www' in domain:
        domain = re.sub(r'www.', '', domain)
    try:
        req = requests.get(websites, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
    except requests.exceptions.SSLError as e:
        req = requests.get(websites,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
    soup = BeautifulSoup(req.text,'lxml')
    status_code = req.status_code
    title_tags = soup.find('title')
    title_tag = ''
    if title_tags:
        title_tag = title_tags.get_text().strip()
    content_type = ''
    try:
        content_type = req.headers['Content-Type']
    except KeyError:
        content_type = '--'

    table_dict = {
        "source_page_title": title_tag, "website_url": websites, "status_code": status_code,
        "content_type": content_type,
        "date": datetime.now().strftime("%d-%m-%Y"),
        "last_modified": datetime.now().strftime("%d-%m-%Y"),
        "server": "apache"}
    links = []
    domain = urlparse(websites).netloc
    scheme = urlparse(websites).scheme
    websites =  scheme+"://"+domain
    mimetypes.init()
    for link in soup.find_all('a'):
        url = link.get('href')
        url_scheme = urlparse(url).scheme
        form_url = ""
        if url:
            if not url.startswith('http'):
                if url.startswith('/'):
                    if url.endswith('/'):
                        formatting = f"{websites[:-1]}{url[:-1]}"
                        form_url = formatting
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites[:-1]}{url}"
                        form_url = formatting
                elif url.startswith("../"):
                    new_url = ''
                    for index in url.split("/"):
                        if not index.startswith('..'):
                            new_url += "/" + index
                    # print("new: ",new_url)
                    url = new_url
                    if url.endswith('/'):
                        formatting = f"{websites[:-1]}{url[:-1]}"
                        form_url = formatting
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites[:-1]}{url}"
                        form_url = formatting
                elif url.endswith('.html'):
                    if url.endswith('/'):
                        formatting = f"{websites}{url[:-1]}"
                        form_url = formatting
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites}{url}"
                        form_url = formatting
                else:
                    form_url = url
                    # pass
                    # print("Invalid-url: ",url)
            else:
                url_domain = urlparse(url).netloc
                # if "www" in url_domain:
                #     url_domain = re.sub(r'www.', '', url_domain)
                
                if domain in url_domain and '#' not in url:
                    if url.endswith('/'):
                        form_url = url[:-1]
                        # print(form_url)
                    else:
                        form_url = url
                
                # if url_domain in domain and '#' not in url:
                #     if url.endswith('/'):
                #         form_url = url[:-1]
                #         # print(form_url)
                #     else:
                #         form_url = url
                

                if domain == url_domain and '#' not in url:
                # if url_domain in domain and '#' not in url:
                    if url.endswith('/'):
                        form_url = url[:-1]
                    else:
                        form_url = url
            # print(form_url)
            if "www" in form_url:
                form_url = re.sub(r'www.', '', form_url)
            mimestart = mimetypes.guess_type(form_url)[0]
            if mimestart != None:
                if mimestart.split('/')[1] in list_of_types:
                    continue
                else:
                    links.append(form_url)
            else:
                if form_url.endswith('.webp'):
                    continue
                else:
                    links.append(form_url)

    links = list(set(links))
    # remove_duplicates(links)
    new_list = []
    for item in links:
        match = re.search("(?P<url>https?://[^\s]+)", item)
        if match is not None:
            new_list.append((match.group("url")))

    new_list = list(set(new_list))
    # for link in new_list:
    #     print('link- ',link)
    # print(list(set(new_list)))
    return len(list(set(new_list))),table_dict


def website_total_urls(websites_url):

    if websites_url.endswith('/'):
        websites_url = websites_url[:-1]
    website_domain = urlparse(websites_url).netloc
    try:
        req = requests.get(websites_url, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
    except requests.exceptions.SSLError as e:
        req = requests.get(websites_url,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
    print("response: ",req.status_code)
    url_list = []
    url_text_dict = {}
    soup = BeautifulSoup(req.text,'lxml')

    for link in soup.find_all('a'):
        url = link.get('href')
        if url and not '#'  in url:
            text = link.text
            # Formation of urls and urls of same domain 
            if url.startswith('http') or url.startswith('www'):
                url_domain = urlparse(url).netloc
                if website_domain != url_domain:
                    continue
            elif url.startswith('/'):
                # if starts with a slash then remove slash then matching if the domain is same or not
                url = url.strip('/')
                if url.startswith('http') or url.startswith('www'):
                    url_domain = urlparse(url).netloc
                    if website_domain != url_domain:
                        continue
                    else:
                        url = websites_url+'/'+url
                else:
                    url = websites_url+'/'+url
            elif url.startswith('../'):
                new_url = ''
                for index in url.split("/"):
                    if not index.startswith('..'):
                        new_url += "/" + index
                url = websites_url+new_url
            else:
                url = websites_url+'/'+url
            #End Formation of urls and urls of same domain 

            # Filtering out images and other links
            if  re.search(r"javascript:", url)  or "javascript:" in url or "tel:" in url or "email:" in url or "mailto:" in url  or ".webp" in url :
                continue
            else:
                mimestart = mimetypes.guess_type(url)[0]
                if mimestart is None :
                    if url.endswith("/"):
                        url = url[:-1]
                    # print('URL: ',url)
                    url_list.append(url)
                    url_text_dict.update({url: text})
                elif mimestart == 'text/html':
                    # print('URL: ',url)
                    if url.endswith("/"):
                        url = url[:-1]
                    url_list.append(url)
                    url_text_dict.update({url: text})
                else:
                    pass
            #End Filtering out images and other links
        #Remove Duplicating urls from list
    url_list = list(set(url_list))
    data = []
    data.append({'label': 'Home','url': websites_url})
    for url in url_list:
        if url != websites_url:
            text = url_text_dict[url]
            data.append({
                'label': text,
                'url': url
            })
    return data


def website_total_urls2(websites):
    # print("==================> websites : ", websites)
    if not websites.endswith('/'):
        websites = websites +"/"
    domain = urlparse(websites).netloc
    if 'www' in domain:
        domain = re.sub(r'www.', '', domain)
    try:
        req = requests.get(websites, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
    except requests.exceptions.SSLError as e:
        req = requests.get(websites,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
    soup = BeautifulSoup(req.text,'lxml')
    status_code = req.status_code
    title_tags = soup.find('title')
    title_tag = ''
    if title_tags:
        title_tag = title_tags.get_text().strip()
    content_type = ''
    try:
        content_type = req.headers['Content-Type']
    except KeyError:
        content_type = '--'

    table_dict = {
        "source_page_title": title_tag, "website_url": websites, "status_code": status_code,
        "content_type": content_type,
        "date": datetime.now().strftime("%d-%m-%Y"),
        "last_modified": datetime.now().strftime("%d-%m-%Y"),
        "server": "apache"}
    links = []
    labels = []
    domain = urlparse(websites).netloc
    scheme = urlparse(websites).scheme
    websites =  scheme+"://"+domain
    mimetypes.init()
        
    for link in soup.find_all('a'):
        url = link.get('href')
        text = link.text
        url_scheme = urlparse(url).scheme
        form_url = ""
        label = ""
        if url:
            if not url.startswith('http'):
                if url.startswith('/'):
                    if url.endswith('/'):
                        formatting = f"{websites}{url[:-1]}"
                        # print(formatting, link.get_text().strip())
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites[:-1]}{url}"
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                elif url.startswith("../"):
                    new_url = ''
                    for index in url.split("/"):
                        if not index.startswith('..'):
                            new_url += "/" + index
                    # print("new: ",new_url)
                    url = new_url
                    if url.endswith('/'):
                        formatting = f"{websites}{url[:-1]}"
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites[:-1]}{url}"
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                elif url.endswith('.html'):
                    if url.endswith('/'):
                        formatting = f"{websites}{url[:-1]}"
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                    elif "www" in url:
                        # print("WWW :",url)
                        continue
                    else:
                        formatting = f"{websites}{url}"
                        form_url = formatting
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                else:
                    form_url = url
                    label = {
                        'label': text.strip(),

                        'url' : str(form_url)
                    }
                    # print("===========>form_url : ", label)
                    # pass
                    # print("Invalid-url: ",url)
            else:
                url_domain = urlparse(url).netloc
                # if "www" in url_domain:
                #     url_domain = re.sub(r'www.', '', url_domain)
                
                if domain in url_domain and '#' not in url:
                    if url.endswith('/'):
                        form_url = url[:-1]
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                        # print("===========>form_url : ", label)
                        # print(form_url)
                    else:
                        form_url = url
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                
                # if url_domain in domain and '#' not in url:
                #     if url.endswith('/'):
                #         form_url = url[:-1]
                #         # print(form_url)
                #     else:
                #         form_url = url
                

                if domain == url_domain and '#' not in url:
                # if url_domain in domain and '#' not in url:
                    if url.endswith('/'):
                        form_url = url[:-1]
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }
                    else:
                        form_url = url
                        label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }

            # print(form_url)
            if "www" in form_url:
                form_url = re.sub(r'www.', '', form_url)
                label = {
                            'label': text.strip(),

                            'url' : str(form_url)
                        }

            mimestart = mimetypes.guess_type(form_url)[0]
            if mimestart != None:
                if mimestart.split('/')[1] in list_of_types:
                    continue
                else:
                    links.append(form_url)
                    
                    labels.append(label)
            else:
                if form_url.endswith('.webp'):
                    continue
                else:
                    links.append(form_url)
                    
                    labels.append(label)

    unique_links = list(OrderedDict.fromkeys(links))
    new_list = []
    unique_urls = set()
    for link, label in zip(links, labels):
        match = re.search("(?P<url>https?://[^\s]+)", link)
        if match is not None:
            url = match.group("url")
            if url.lower() not in [u.lower() for u in unique_urls] and link[0].lower() not in [i[0].lower() for i in new_list]:
                new_list.append((label['label'], url))
                unique_urls.add(url)

    # print("=========================>LIST : ", new_list)
    # print(f"Total number of links found: {len(new_list)}")
    
    unique_first_elems = []
    for label, url in new_list:
        if not label and url == websites:
            label = 'Home'
        unique_first_elems.append({'label': label, 'url': url})
        
    # print("=========================>LIST : ", unique_first_elems)
    # print(f"Total number of links found: {len(unique_first_elems)}")


    return unique_first_elems


# def website_total_urls(websites):
    
#     unique_first_elems = []

#     obj = WebsitePages.objects.filter(i_website__website_url = websites, is_crawled = False)
#     if obj:
#         for page in obj:
#             unique_first_elems.append(
#                 {
#                     'label': page.label,
#                     'url': page.webpage
#                 }
#                 )
#     else:

#         if not websites.endswith('/'):
#             websites = websites +"/"
#         domain = urlparse(websites).netloc
#         if 'www' in domain:
#             domain = re.sub(r'www.', '', domain)
#         try:
#             req = requests.get(websites, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
#         except requests.exceptions.SSLError as e:
#             req = requests.get(websites,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
#         soup = BeautifulSoup(req.text,'lxml')
#         status_code = req.status_code
#         title_tags = soup.find('title')
#         title_tag = ''
#         if title_tags:
#             title_tag = title_tags.get_text().strip()
#         content_type = ''
#         try:
#             content_type = req.headers['Content-Type']
#         except KeyError:
#             content_type = '--'

#         table_dict = {
#             "source_page_title": title_tag, "website_url": websites, "status_code": status_code,
#             "content_type": content_type,
#             "date": datetime.now().strftime("%d-%m-%Y"),
#             "last_modified": datetime.now().strftime("%d-%m-%Y"),
#             "server": "apache"}
#         links = []
#         labels = []
#         domain = urlparse(websites).netloc
#         scheme = urlparse(websites).scheme
#         websites =  scheme+"://"+domain
#         mimetypes.init()
#         for link in soup.find_all('a'):
#             url = link.get('href')
#             url_scheme = urlparse(url).scheme
#             form_url = ""
#             label = ""
#             if url:
#                 if not url.startswith('http'):
#                     if url.startswith('/'):
#                         if url.endswith('/'):
#                             formatting = f"{websites}{url[:-1]}"
#                             # print(formatting, link.get_text().strip())
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                         elif "www" in url:
#                             # print("WWW :",url)
#                             continue
#                         else:
#                             formatting = f"{websites[:-1]}{url}"
                            
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                     elif url.startswith("../"):
#                         new_url = ''
#                         for index in url.split("/"):
#                             if not index.startswith('..'):
#                                 new_url += "/" + index
#                         # print("new: ",new_url)
#                         url = new_url
#                         if url.endswith('/'):
#                             formatting = f"{websites[:-1]}{url[:-1]}"
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                         elif "www" in url:
#                             # print("WWW :",url)
#                             continue
#                         else:
#                             formatting = f"{websites[:-1]}{url}"
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                     elif url.endswith('.html'):
#                         if url.endswith('/'):
#                             formatting = f"{websites}{url[:-1]}"
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                         elif "www" in url:
#                             # print("WWW :",url)
#                             continue
#                         else:
#                             formatting = f"{websites}{url}"
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(formatting)
#                             }
#                     else:
#                         form_url = url
#                         label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }
#                         # pass
#                         # print("Invalid-url: ",url)
#                 else:
#                     url_domain = urlparse(url).netloc
#                     # if "www" in url_domain:
#                     #     url_domain = re.sub(r'www.', '', url_domain)
                    
#                     if domain in url_domain and '#' not in url:
#                         if url.endswith('/'):
#                             form_url = url[:-1]
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }
#                             # print(form_url)
#                         else:
#                             form_url = url
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }
                    
#                     # if url_domain in domain and '#' not in url:
#                     #     if url.endswith('/'):
#                     #         form_url = url[:-1]
#                     #         # print(form_url)
#                     #     else:
#                     #         form_url = url
                    

#                     if domain == url_domain and '#' not in url:
#                     # if url_domain in domain and '#' not in url:
#                         if url.endswith('/'):
#                             form_url = url[:-1]
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }
#                         else:
#                             form_url = url
#                             label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }

#                 # print(form_url)
#                 if "www" in form_url:
#                     form_url = re.sub(r'www.', '', form_url)
#                     label = {
#                                 'label': link.get_text().strip(),

#                                 'url' : str(form_url)
#                             }

#                 mimestart = mimetypes.guess_type(form_url)[0]
#                 if mimestart != None:
#                     if mimestart.split('/')[1] in list_of_types:
#                         continue
#                     else:
#                         links.append(form_url)
                        
#                         labels.append(label)
#                 else:
#                     if form_url.endswith('.webp'):
#                         continue
#                     else:
#                         links.append(form_url)
#                         labels.append(label)
#         links = list(set(links))
#         res = []
#         [res.append(x) for x in links if x not in res]
        
#         # remove_duplicates(links)
#         new_list = []
#         for item in links:
#             match = re.search("(?P<url>https?://[^\s]+)", item)
#             if match is not None:
#                 new_list.append((match.group("url")))

    
#         unique_lst = []
        

#         labels = [i for i in labels if i]
#         for d in labels:
#             i = d['url']
#             if i.startswith(websites):
#                 print(d)
#                 unique_first_elems.append(d)
    



#         new_list = list(set(new_list))
        


#         # for label in soup.find_all('a'):
#         #     url = label.get('href')
#         #     # print('url: ', url)
#         #     for link in new_list:
#         #         link = link + '/'
#         #         # print(link)
#         #         if link == url:
#         #             print('url: ', link)
#         #         print('url: ', url)
#         # for title in new_list:
#         #     try:
#         #         req = requests.get(title, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
#         #     except requests.exceptions.SSLError as e:
#         #         req = requests.get(title,verify=False, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})       
#         #     soup = BeautifulSoup(req.text,'lxml')
#         #     head_tag = soup.find_all('head')
            
#         #     for head in head_tag:
#         #         title_tags_list.append(head.find('title').get_text().strip())
#         # print(labels)
#         # for link in new_list:
#         #     print('link- ',link)
#         # print(list(set(new_list)))

#         website_obj = Website.objects.get(website_url = websites)
        

#         for page in unique_first_elems:
#             webpage_obj = WebsitePages.objects.create(i_website = website_obj, webpage = page['url'], label = page['label'])
#             webpage_obj.save()

#     return unique_first_elems


def image_extensions(soup, table_dict):
    image_tags = soup.find_all('img')
    png_images, svg_images, jpeg_images, gif_images, webp_images, other_images = 0, 0, 0, 0, 0, 0
    png_images_list, svg_images_list, jpeg_images_list, gif_images_list, webp_images_list, other_images_list = [], [], [], [], [], []
    image_src = []

    for image in image_tags:
        try:
            src = image['src']
            image_src.append(src)
        except KeyError:
            pass

    for image_path in image_src:
        if image_path.endswith(".png"):
            png_images += 1
            png_images_list.append(image_path)
        elif image_path.endswith(".svg"):
            svg_images += 1
            svg_images_list.append(image_path)
        elif image_path.endswith(".jpeg"):
            jpeg_images += 1
            jpeg_images_list.append(image_path)
        elif image_path.endswith(".gif"):
            gif_images += 1
            gif_images_list.append(image_path)
        elif image_path.endswith(".webp"):
            webp_images += 1
            webp_images_list.append(image_path)
        else:
            other_images += 1
            other_images_list.append(image_path)
    total_images = len(image_tags)
    details_dict = {
        'png_images_list': png_images_list,
        'svg_images_list': svg_images_list,
        'jpeg_images_list': jpeg_images_list,
        'gif_images_list': gif_images_list,
        'webp_images_list': webp_images_list,
        'other_images_list': other_images_list,
    }
    data = {'total_images': total_images,
            'png_images': png_images, 'svg_images': svg_images,
            'jpeg_images': jpeg_images, 'gif_images': gif_images,
            'webp_images': webp_images, 'other_images': other_images,
            'image_extensions_table_dict': table_dict,
            'image_details': details_dict
            }
    return data


def h1_empty(soup, table_dict):
    h1_tags = soup.find_all('h1')
    empty_h1_count = 0
    empty_h1 = ''
    if not h1_tags:
        empty_h1_count += 1
        empty_h1 = table_dict['website_url']

    else:
        for tag in h1_tags:
            if tag.get_text().strip() == "":
                empty_h1_count += 1
                empty_h1 = table_dict['website_url']
   
    data = {
        'empty_h1_count': empty_h1_count,
        'empty_h1_detail': empty_h1,
        'empty_h1_table': table_dict
    }
    return data


def title_tag_process(soup, content_table_dict):
    table_dict = {
    "source_page_title": content_table_dict["source_page_title"],
    "website_url": content_table_dict["website_url"], "status_code": content_table_dict["status_code"],
    "content_type": content_table_dict['content_type'],"description":content_table_dict["description"],
    "date": content_table_dict['date'],"last_modified": 0 ,"server": ""
    }
    titletag_max_length = 65
    titletag_min_length = 35
    short_title_list = []
    long_title_list = []
    good_title_list = []
    short_title_count = 0
    long_title_count = 0
    good_title_count = 0
    titletag_max_length = int(GlobalConfiguration.objects.get(name='titletag_max_length').value)
    titletag_min_length = int(GlobalConfiguration.objects.get(name='titletag_min_length').value)
    table_dict['server'] = f"{titletag_min_length} - {titletag_max_length}"
    title_tags = ""
    short_data = {
        'short_title_table': {},
        'short_title_count': 0,
        'short_title_details': [],
    }
    good_data = {
        'good_title_count': 0,
        'good_title_table': {},
        'good_title_detail': []
    }
    long_data = {
        'long_title_table': {},
        'long_title_count': 0,
        'long_title_detail': []
    }
    multi_data = {
        'multiple_title_tags': False,
        'multiple_title_tags_count': 0,
        'multiple_title_tags_table': {}
    }
    missing_data = {
        "title_tag_missing": False,
        "missing_title_table": {},
    }
    head_tag = soup.find_all('head')
    for head in head_tag:
        title_tags = head.find_all('title')
    if title_tags:
        content = title_tags[0].get_text().strip()
        content_length_character = len(content)
        table_dict['last_modified'] = len(content)
        if content_length_character < 1:
            title_tags_missing = True
            missing_data = {
                "title_tag_missing": title_tags_missing,
                "missing_title_table": table_dict,
            }
        if len(title_tags) > 1:
            multi_titles = True
            mutliple_title_table = table_dict.copy()
            mutliple_title_table['last_modified'] = len(title_tags)
            mutliple_title_table['server'] = '1'
            multi_data = {
                'multiple_title_tags': multi_titles,
                'multiple_title_tags_count': len(title_tags),
                'multiple_title_tags_table': mutliple_title_table
            }
        if content_length_character > 0 and content_length_character < titletag_min_length:
            short_title_count += 1
            short_title_list.append(content)
            # table_dict['server'] = f"Greater than {titletag_min_length} and less than {titletag_max_length}"
            short_data = {
            'short_title_table': table_dict,
            'short_title_count': short_title_count,
            'short_title_details': short_title_list,
            }
        elif content_length_character > titletag_max_length:
            long_title_count += 1
            long_title_list.append(content)
            long_data = {
            'long_title_table': table_dict,
            'long_title_count': long_title_count,
            'long_title_detail': long_title_list
            }
        elif titletag_min_length <= content_length_character <= titletag_max_length:
                good_title_count += 1
                good_title_list.append(content)
                good_data = {
                    'good_title_count': good_title_count,
                    'good_title_table': table_dict,
                    'good_title_detail': good_title_list
                }
    else:
        title_tags_missing = True
        missing_data = {
            "title_tag_missing": title_tags_missing,
            "missing_title_table": table_dict,
        }
    return missing_data,multi_data,short_data,good_data,long_data


def low_content_ratio(soup, table_dict):
    low_content_ratio_value = int(GlobalConfiguration.objects.get(name='low_content_ratio').value)
    low_word_count = int(GlobalConfiguration.objects.get(name='low_word_count').value)
    words = soup.text.lower()
    total_words = len(words.split())
    # print('total_words:', total_words)
    data = {'low_content_ratio': False,
            'low_word_count': False}
    low_content_table_dict = table_dict.copy()
    low_content_table_dict['last_modified']= total_words
    word_count_table_dict = low_content_table_dict.copy()
    word_count_table_dict['server']= low_word_count
    low_content_table_dict['server']= low_content_ratio_value
    if total_words < low_content_ratio_value:
        data['low_content_ratio'] = True
        data['low_content_ratio_table'] = low_content_table_dict
    if total_words < low_word_count:
        data['low_word_count'] = True
        data['low_word_count_table'] = word_count_table_dict
    return data


def meta_tag(soup, content_table_dict):
    table_dict = {
    "source_page_title": content_table_dict["source_page_title"],
    "website_url": content_table_dict["website_url"], "status_code": content_table_dict["status_code"],
    "content_type": content_table_dict['content_type'],"description":content_table_dict["description"],
    "date": content_table_dict['date'],"last_modified": "","server": ""
    }
    metatag_description_short = int(GlobalConfiguration.objects.get(name='short_meta_desc').value)
    metatag_description_long = int(GlobalConfiguration.objects.get(name='long_meta_desc').value)
    table_dict['server'] = f"words > {metatag_description_short} \n Char < {metatag_description_long}"
    meta_tag = soup.find('meta', attrs={'name': 'description'})
    meta_content = ''
    meta_tag_content = None
    short_desc_list = []
    long_meta_desc = []
    good_meta_list = []
    missing_data = {"meta_tag_missing": False,
                    'meta_missing_empty_table_dict': {},
                    'meta_missing_empty_details': ''
                    }

    short_data = {  'meta_tag_short': False,
                    'meta_tag_short_list': [],
                    'meta_tag_short_table': {}}
    
    long_data = {   'meta_tag_long': False,
                    'meta_tag_long_list': [],
                    'meta_tag_long_table': {},}
    
    good_data = {   'meta_tag_good': False,
                    'meta_tag_good_list': [],
                    'meta_tag_good_table': {},}
    if meta_tag:
        try:
            meta_content = meta_tag['content']
        except KeyError:
            meta_content = ''
        meta_content = meta_tag['content']
        meta_tag_content = meta_content
        meta_content_wordlength = len(meta_content.split())
        meta_content_charlength = len(meta_content)
        table_dict['last_modified'] = f"Words-{meta_content_wordlength} Char-{meta_content_charlength}"
        if meta_content_charlength == 0:
            meta_tag_missing = True
            meta_tag_missing_table_dic = table_dict.copy()
            meta_tag_missing_table_dic['server'] = '1'
            missing_data = {
                "meta_tag_missing": meta_tag_missing,
                'meta_missing_empty_table_dict': meta_tag_missing_table_dic,
                'meta_missing_empty_details':Meta_tag_missing_error
            }
        elif meta_content_wordlength < metatag_description_short:
            short_data['meta_tag_short'] = True
            short_desc_list.append(meta_content)
            short_data['meta_tag_short_table'] = table_dict
            short_data['meta_tag_short_list'] = short_desc_list
        elif meta_content_charlength > metatag_description_long:
            long_data['meta_tag_long'] = True
            long_meta_desc.append(meta_content)
            long_data['meta_tag_long_table'] = table_dict
            long_data['meta_tag_long_list'] = long_meta_desc
        elif metatag_description_short <= meta_content_wordlength and meta_content_charlength <= metatag_description_long:
            good_data['meta_tag_good'] = True
            good_meta_list.append(meta_content)
            good_data['meta_tag_good_table'] = table_dict
            good_data['meta_tag_good_list'] = good_meta_list
    else:
        meta_tag_missing = True
        meta_tag_missing_table_dic = table_dict.copy()
        meta_tag_missing_table_dic['server'] = '1'
        missing_data = {
            "meta_tag_missing": meta_tag_missing,
            'meta_missing_empty_table_dict': meta_tag_missing_table_dic,
            'meta_missing_empty_details':Meta_tag_missing_error
        }
    return meta_tag_content,missing_data,short_data,good_data,long_data


def duplicate_title(soup, table_dict):
    head_tag = soup.find_all('head')
    title_tags_list = []
    for head in head_tag:
        title_tags_list = head.find_all('title')

    title_tags_list_length = len(title_tags_list)
    title_tag_multi = False
    title_multi_dic = table_dict.copy()
    newlist = []
    duplicate_title_tags_list = []
    if title_tags_list_length > 1:
        title_tag_multi = True
        title_tags_text = []
        for tag in title_tags_list:
            title_tags_text.append(tag.get_text().strip())
        for tag in title_tags_text:
            if tag not in newlist:
                newlist.append(tag)
            else:
                duplicate_title_tags_list.append(tag)
    title_multi_dic['last_modified'] = len(duplicate_title_tags_list)
    title_multi_dic['server'] = '1'

    data = {
        "duplicate_title_tags_list": duplicate_title_tags_list,
        "duplicate_title_tags_count": len(duplicate_title_tags_list),
        "duplicate_title_table": title_multi_dic,
        "title_tag_multi": title_tag_multi,
        "unique_title_tags_list": newlist
    }
    return data


def h1_process(soup, table_dict):
    table_dic = table_dict.copy()
    long_h1_tag = int(GlobalConfiguration.objects.get(name='long_h1_tag').value)
    short_h1_tag = int(GlobalConfiguration.objects.get(name='short_h1_tag').value)
    table_dic["server"] =  f"{short_h1_tag} - {long_h1_tag}"
    duplicate_table_dic = table_dic.copy()
    multi_table_dic = table_dic.copy()
    duplicate_table_dict = table_dic.copy()
    h1_tags = soup.find_all('h1')
    length_h1_tags = len(h1_tags)
    multi_h1_tag = False
    newlist = []
    h1_tags_text = []
    duplicate_h1_tags_list = []
    if length_h1_tags > 1:
        multi_h1_tag = True
        table_dic["last_modified"] =  len(h1_tags[0].get_text().strip())
        multi_table_dic['last_modified']=length_h1_tags
        multi_table_dic['server'] = 1
        for tag in h1_tags:
            h1_tags_text.append(tag.get_text().strip())
        multi_table_dic['detail'] = h1_tags_text
        for tag in h1_tags_text:
            if tag not in newlist and len(tag) > 1:
                newlist.append(tag)
            elif len(tag) > 1:
                duplicate_h1_tags_list.append(tag)
        duplicate_h1_tags_list = list(set(duplicate_h1_tags_list))
        duplicate_table_dict['last_modified'] = len(duplicate_h1_tags_list)
        duplicate_table_dict['server'] = '1'
    data = {
        "duplicate_h1_tags_list": duplicate_h1_tags_list,
        "duplicate_h1_tags_length": len(duplicate_h1_tags_list),
        "multi_h1_tag_list": h1_tags_text,
        "multi_h1_tag_table": multi_table_dic,
        "multi_h1_tag": multi_h1_tag,
        "unique_h1_tags_list": newlist,
        "duplicate_h1_table": duplicate_table_dict
    }
    return data


def image_processing(soup, url, table_dict ,api_resp):
    status_code = [200]
    protocol = url.split('/')[0]
    missing_alt_images = []
    redirect_image = []
    broken_image = []
    big_images = []
    slow_images = []
    http_image_list = []
    Network_details = ''
    mimetypes.init()
    #completed
    http_image_dict = {
        'http_image_count': 0,
        'http_image_list': http_image_list,
        'http_image_table_dict': table_dict,
    }
    #completed
    missing_alt_dict = {
        'missing_alt_text_count': 0,
        'missing_alt_text_list': missing_alt_images,
        'missing_alt_table_dict': table_dict,
    }
    # integrated
    redirect_images_dict = {
        'redirect_image_count': 0,
        'redirect_image_list': redirect_image,
        'redirect_image_table_dict': table_dict,
    }
    # completed
    broken_images_dict = {
        'broken_image_count': 0,
        'broken_image_list': broken_image,
        'broken_images_table_dict': table_dict,
    }
   #completed
    big_images_dict = {
        'big_image_count': 0,
        'big_image_list': big_images,
        'big_images_table_dict': table_dict,
    }
    slow_images_dict = {
        'slow_image_count': 0,
        'slow_image_list': slow_images,
        'slow_images_table_dict': table_dict,
    }
    # print("url : ", url)
    images = soup.find_all('img')
    if images:
        for image in images:
            # print(f"th is image : ", image)
            img_url = ''
            img_src = str(image.get('src'))
            if img_src and img_src is not None and img_src != '' and img_src != ' ':
                # if img_src and img_src is not None:
                if protocol == 'http':
                    if img_src.startswith('http://'):
                        http_image_list.append(f"{img_src}")
                if img_src.startswith(' '):
                    continue
                if img_src.startswith('/'):
                    img_url = f"{url}{img_src}"
                if img_src.startswith('http'):
                    img_url = f"{img_src}"
            # print(f"")
            # print(f"formatted image-url ->{img_url}")
            if image.get('alt'):
                if image.get('alt') == '':
                    missing_alt_images.append(img_url)
                    # print(f"missing-alt-image-url ->{img_url}")
            else:
                pass# print(f"missing-alt-image-url ->{img_url}")
       
        try:
            Network_details = api_resp['response_desktop']['all_data']['lighthouseResult']['audits']['network-requests']['details']['items']
        except KeyError as e:
            print("Exception : ",e)
            Network_details = None
        if Network_details:
            # print('Network details: %s' % Network_details)
            for item in Network_details:
                mimetype = ''
                url = ''
                statuscode = ''
                try:
                    mimetype = item['mimeType']
                    # print('mimetype', mimetype)
                    url = item['url']
                    # print('url', url)
                    statuscode = item['statusCode']
                    # print('statuscode', statuscode)
                except KeyError as e:
                    # print(f"Exception: {e} @ {url}")
                    continue
                file_type = mimetype.split('/')[0]
                if file_type in ['video', 'image']:
                    # print('file_type', file_type)
                    if statuscode not in status_code:
                        if statuscode == 302:
                            redirect_image.append(url)
                        elif str(status_code).startswith('4') or str(status_code).startswith('5'):
                            broken_image.append(url)

    missing_alt_dict['missing_alt_text_count'] = len(missing_alt_images)
    redirect_images_dict['redirect_image_count'] = len(redirect_image)
    broken_images_dict['broken_image_count'] = len(broken_image)
    big_images_dict['big_image_count'] = len(big_images)
    slow_images_dict['slow_image_count'] = len(slow_images)
    http_image_dict['http_image_count'] = len(http_image_list)

    return missing_alt_dict, redirect_images_dict, broken_images_dict, big_images_dict, slow_images_dict, http_image_dict


def page_with_thin_content(soup, table_dict):
    thin_content = int(GlobalConfiguration.objects.get(name='thin_content').value)
    words = soup.get_text(separator = ' ').lower()
    words = re.sub(r"[^a-zA-Z0-9 ]", "", words)
    total_words_length = len(words.split())
    thin_table_dict = table_dict.copy()
    thin_table_dict['last_modified'] = total_words_length
    thin_table_dict['server'] = thin_content
    
    data = {
        'thin_content': False,
        'thin_content_table': {}
    }
    if total_words_length < thin_content:
        data['thin_content'] = True
        data['thin_content_table'] = thin_table_dict
    return data


def sentence_keyword(sentence):
    key_dic = {}
    stpwrd = nltk.corpus.stopwords.words('english')
    cus_stpword = new_stopwords + stpwrd_cus1 + special_char
    stpwrd.extend(cus_stpword)
    text_tokens = word_tokenize(sentence)
    keywords = [words for words in text_tokens if not words in stpwrd]
    keywords_frequency_dictionary = nltk.FreqDist(keywords)
    bigrams_list = [" ".join(item) for item in nltk.bigrams(keywords)]
    trigrams_list = [" ".join(item) for item in nltk.trigrams(keywords)]
    bigrams_frequency_dictionary = nltk.FreqDist(bigrams_list)
    trigrams_frequency_dictionary = nltk.FreqDist(trigrams_list)
    key_dic.update(keywords_frequency_dictionary)
    key_dic.update(bigrams_frequency_dictionary)
    key_dic.update(trigrams_frequency_dictionary)
    data = dict(key_dic)
    return data
    
def keywords_frequency_new(soup, table_dict):
    stuffing_value = int(GlobalConfiguration.objects.get(name='keyword_stuffing').value)
    stuffing_lst = []
    unigram_lst = []
    bigram_lst = []
    trigram_lst = []
    key_sentence = {}
    reasons_lst = []
    sentence_keywords_list = {}
    page_title = table_dict['source_page_title']
    page_url = table_dict['website_url']
    words = soup.text.lower()
    word = words.split()
    word = " ".join(map(str, word))
    page_word_count = len(word.split())
    stpwrd = nltk.corpus.stopwords.words('english')
    cus_stpword = new_stopwords + stpwrd_cus1 + special_char
    stpwrd.extend(cus_stpword)
    text_tokens = word_tokenize(word)
    sentence_list = nltk.sent_tokenize(word) # this gives us a list of sentences
    # now loop over each sentence and tokenize it separately
    for sentence in sentence_list:
        tokenized_sentence = nltk.word_tokenize(sentence)
        sentence_bigrams_list = [" ".join(item) for item in nltk.bigrams(tokenized_sentence)]
        sentence_trigrams_list = [" ".join(item) for item in nltk.trigrams(tokenized_sentence)]
        sentence_keywords_list[sentence] = tokenized_sentence + sentence_bigrams_list + sentence_trigrams_list
    for sentence,keyword_list in sentence_keywords_list.items():
        for keyword in keyword_list:
            if keyword in key_sentence.keys():
                if sentence not in key_sentence[keyword]:
                    key_sentence[keyword].append(sentence)
            else:
                key_sentence[keyword] = [sentence]
    
    keywords = [words for words in text_tokens if not words in stpwrd and (bool(re.match('^[a-zA-Z0-9]*$',words))==True) and not words.isdigit()]
    keywords_frequency_dictionary = nltk.FreqDist(keywords)
    keywords_frequency_list = keywords_frequency_dictionary.keys()
    bigrams_list = [" ".join(item) for item in nltk.bigrams(keywords)]
    bigrams_frequency_dictionary = nltk.FreqDist(bigrams_list)
    bigrams_frequency_list = bigrams_frequency_dictionary.keys()
    trigrams_list = [" ".join(item) for item in nltk.trigrams(keywords)]
    trigrams_frequency_dictionary = nltk.FreqDist(trigrams_list)
    trigrams_frequency_list = trigrams_frequency_dictionary.keys()
    for key, value in keywords_frequency_dictionary.items():
        # if not key in cus_stpword and (bool(re.match('^[a-zA-Z0-9]*$',key))==True) and value >= stuffing_value:
        unigram_lst.append({'keyword': key,'stuffing_value': value}) 
    for key, value in bigrams_frequency_dictionary.items():
        # key_list = key.split()
        # if (bool(re.match('^[a-zA-Z0-9]*$',key_list[0]))==True) and (bool(re.match('^[a-zA-Z0-9]*$',key[1]))==True) and value >= stuffing_value:
        bigram_lst.append({'keyword': key,'bigram_value': value})
    for key, value in trigrams_frequency_dictionary.items():
        # key_list = key.split()
        # if (bool(re.match('^[a-zA-Z0-9]*$',key_list[0]))==True) and (bool(re.match('^[a-zA-Z0-9]*$',key[1]))==True) and (bool(re.match('^[a-zA-Z0-9]*$',key[2]))==True) and  value >= stuffing_value:
        trigram_lst.append({'keyword': key,'trigram_value': value})
    sentence_keywords = {}
    for sentence ,word_token_list in sentence_keywords_list.items():
        for word_token in word_token_list:
            if word_token in keywords_frequency_list or word_token in bigrams_frequency_list or word_token in trigrams_frequency_list:
                if sentence in sentence_keywords.keys():
                    if word_token in sentence_keywords[sentence].keys():
                        sentence_keywords[sentence][word_token] += 1
                    else:
                        sentence_keywords[sentence][word_token] = 1
                else:
                    sentence_keywords[sentence] = {word_token : 1}
            else:
                continue
    keyword_frequency_new = {}
    for sentence ,keywords_dict in sentence_keywords.items():
        for keyword, value in keywords_dict.items():
            if keyword in keyword_frequency_new.keys():
                keyword_frequency_new[keyword] += value
            else:
                keyword_frequency_new[keyword] = value
    stuffing_value_key_sentence = {}
    for key,value  in keyword_frequency_new.items():
        if value >= stuffing_value:
            stuffing_lst.append({'keyword': key,'stuffing_value': value})
    for key,value  in keyword_frequency_new.items():
        if value >= stuffing_value:
            stuffing_value_key_sentence[key] = key_sentence[key]
    keywords_dict = {
        'keyword_stuffing': keyword_frequency_new,
        'unirgram_frequency': unigram_lst,
        'Birgram_frequency': bigram_lst,
        'Trigram_frequency': trigram_lst,
        'key_sentence': key_sentence
    }
    # print(keywords_dict['keyword_stuffing'])
    for i  in stuffing_lst:
        for key, val in i.items():
            if key == 'keyword':
                reasons_lst.append(val)
    reasons = ','.join(reasons_lst)
    
    table_data = {
        "source_page_title": page_title,
        "website_url": page_url,
        'Reasons_for_spam_penalization': reasons,
        'Page_Words_Count': page_word_count,
        'keyword_stuffing': stuffing_lst,
        'key_sentence': key_sentence,
    }
    data = {'keyword_stuffing_table_data': table_data, 'Page_Words_Count': page_word_count,
            'keyword_stuffing_detail': keywords_dict ,"list_count" : len(table_data['keyword_stuffing']) }

    return data

def keywords_frequency(soup, table_dict):
    stuffing_value = int(GlobalConfiguration.objects.get(name='keyword_stuffing').value)
    stuffing_lst = []
    bigram_lst = []
    trigram_lst = []
    key_sentence = {}
    reasons_lst = []
    page_title = table_dict['source_page_title']
    page_url = table_dict['website_url']
    words = soup.text.lower()
    # words = "this is us he is us she is us they are us"
    # making list with no spacing
    list = words.split()
    process_data = ""
    # loop through list of words and taking each word into string to make sentence like structure
    for l in list:
        process_data += f'{l} '

    # print("process_data-> ",process_data)
    page_word_count = len(words.split())
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    data = process_data
    data = ','.join(tokenizer.tokenize(data))
    # print("tokenizer-> ",data)

    sentence_list = data.split(',')
    # print("sentence_list-> ",sentence_list)

    sentence_keyword_dict = {}
    for ls in sentence_list:
        res = sentence_keyword(ls)
        sentence_keyword_dict[ls] = res
    
    for sentence,keyword_dict in sentence_keyword_dict.items():
        keyword_list = keyword_dict.keys()
        for keyword in keyword_list:
            if keyword in key_sentence.keys():
                key_sentence[keyword].append(sentence)
            else:
                key_sentence[keyword] = [sentence]
    

    stpwrd = nltk.corpus.stopwords.words('english')
    cus_stpword = new_stopwords + stpwrd_cus1 + special_char
    stpwrd.extend(cus_stpword)

    text_tokens = word_tokenize(process_data)
    # print("text_tokens-> ",text_tokens)
    keywords = [words for words in text_tokens if not words in stpwrd]
    # print("keywords-> ",keywords)

    bigrams_list = [" ".join(item) for item in nltk.bigrams(keywords)]
    trigrams_list = [" ".join(item) for item in nltk.trigrams(keywords)]
    keywords_frequency_dictionary = nltk.FreqDist(keywords)
    bigrams_frequency_dictionary = nltk.FreqDist(bigrams_list)
    trigrams_frequency_dictionary = nltk.FreqDist(trigrams_list)
    keyword = {
        'keywords_frequency_dictionary': keywords_frequency_dictionary,
        'bigrams_frequency_dictionary': bigrams_frequency_dictionary,
        'trigrams_frequency_dictionary': trigrams_frequency_dictionary,
        'sentence_keyword_dict': sentence_keyword_dict,
    }

    sample_data = {'keywords': keyword['keywords_frequency_dictionary'],
                   'bigrams': keyword['bigrams_frequency_dictionary'],
                   'trigrams': keyword['trigrams_frequency_dictionary'],
                   }

    # print("All keyword",sample_data)
    # return  
    for key, value in dict(sample_data['keywords']).items():
        if value >= stuffing_value:
            # print(key, value)
            stuffing_dict = {'keyword': key,
                             'stuffing_value': value,}
            stuffing_lst.append(stuffing_dict)
    cus_stpword = new_stopwords + special_char
    temp_list = []
    for link in stuffing_lst:
        if not link['keyword'] in cus_stpword:
            if(bool(re.match('^[a-zA-Z0-9]*$',link['keyword']))==True):
                # print("valid")
                temp_list.append(link)
    stuffing_lst =temp_list 
    for key, value in dict(sample_data['bigrams']).items():
        if value >= stuffing_value:
            # print(key, value)
            bigram_dict = {'keyword': key,
                           'bigram_value': value,}
            bigram_lst.append(bigram_dict)

    for key, value in dict(sample_data['trigrams']).items():
        if value >= stuffing_value:
            # print(key, value)
            trigram_dict = {'keyword': key,
                            'trigram_value': value,}
            trigram_lst.append(trigram_dict)
   
    # print("Keyword-freq",stuffing_lst)
    # print("Bigram-freq",bigram_lst)
    # print("trigram-freq",trigram_lst)
    
    keywords_dict = {
        'keyword_stuffing': stuffing_lst+bigram_lst+trigram_lst,
        'unirgram_frequency': stuffing_lst,
        'Birgram_frequency': bigram_lst,
        'Trigram_frequency': trigram_lst

    }

    for i  in keywords_dict['keyword_stuffing']:
        for key, val in i.items():
            # print(" KEYWORDS STUFFING!!!")
            if key == 'keyword':
                reasons_lst.append(val)
                # print(key, val)
    reasons = ','.join(reasons_lst)
    
    table_data = {
        "source_page_title": page_title,
        "website_url": page_url,
        'Reasons_for_spam_penalization': reasons,
        'Page_Words_Count': page_word_count,
        'keyword_stuffing': stuffing_lst+bigram_lst+trigram_lst,
        'key_sentence': key_sentence,
    }
    data = {'keyword_stuffing_table_data': table_data, 'Page_Words_Count': page_word_count,
            'keyword_stuffing_detail': keywords_dict ,"list_count" : len(table_data['keyword_stuffing']) }

    return data


def a_tag(soup, website_url, table_dict):
    urls_dict = []
    formatted_links = []
    for link in soup.find_all('a', href=True):
        a = link['href']
        if a.startswith("http"):
            pass
        elif "javascript:" in a or "tel:" in a or "email:" in a or "mailto:" in a:
        # elif "javascript:" in a or "tel:" in a or "email:" in a:
            continue
        else:
            if a.startswith("/"):
                if len(a) > 2:
                    a = f'{website_url}{a}'
                else:
                    continue
            else:
                a = f'{website_url}/{a}'
        formatted_links.append(a)
    for data in formatted_links:
        try:
            response = requests.get(data)
            url_dict = {
                'url': data,
                'status_code': int(response.status_code),
            }
            urls_dict.append(url_dict)
        except Exception as e:
            # print(f"Error server unreachable{e}")
            url_dict = {
                'url': data,
                'status_code': 404,
            }
            urls_dict.append(url_dict)
    data = {
        'a_tag_table_list': urls_dict,
        'a_tag_table_dict': table_dict,
    }
    return data


def good_h1_tags(soup, table_dict):
    table_dic = table_dict.copy()
    long_h1_tag = int(GlobalConfiguration.objects.get(name='long_h1_tag').value)
    short_h1_tag = int(GlobalConfiguration.objects.get(name='short_h1_tag').value)
    tag = soup.find('h1')
    good_tag = []
    # h1_tags_text.append()

    data = {
        "h1_good_count": 0,
        "h1_good_count_list": [],
        "h1_good_count_table": {},
    }
    if tag:
        tag_content = tag.get_text().strip()
        tag_content_length = len(tag_content)
        table_dic["last_modified"] =  tag_content_length
        table_dic["server"] =  f"{short_h1_tag} - {long_h1_tag}"
        if short_h1_tag < tag_content_length < long_h1_tag +1:
            good_tag.append(tag_content)
    data = {
        "h1_good_count": len(good_tag),
        "h1_good_count_list": good_tag,
        "h1_good_count_table": table_dic
    }

    return data


def duplicate_pages(url, soup, raw_data, table_dict):
    soup_k = soup
    data = {
        'duplicate_page': False,
        'duplicate_page_link': "",
        'duplicate_page_table_dict': {}}
    for key, value in raw_data.items():
        if url != key:
            soup_key = BeautifulSoup(value, 'lxml')
            words_k = soup_k.text.lower()
            words_key = soup_key.text.lower()
            if words_key == words_k:
                data = {
                    'duplicate_page': True,
                    'duplicate_page_link': key,
                    'duplicate_page_table_dict': table_dict
                }
    return data


def multiple_meta_tags(soup, table_dict):
    meta_tag_list = soup.find_all('meta', attrs={'name': 'description'})
    # print("duplicate_meta_description meta_tag:", meta_tag_list)
    meta_list = []
    data = {
        'multiple_meta_tags': False,
        'multiple_meta_tags_table_list': [],
        'multiple_meta_tags_table_dict': {}
    }
    if len(meta_tag_list) > 1:
        for meta in meta_tag_list:
            meta_content = meta['content']
            meta_list.append(meta_content)

        data = {
            'multiple_meta_tags': True,
            'multiple_meta_tags_table_list': meta_list,
            'multiple_meta_tags_table_dict': table_dict
        }
    return data


def http_in_https(url, soup, table_dict):
    a_tag = soup.find_all('a', href=True)
    url_parse = urlparse(url)
    url_parse = url_parse.scheme
    # print("URL SCHEME: ", url_parse)
    http_to_https = []
    https_to_http = []
    if url_parse == 'https':
        for link in a_tag:
            href = link["href"]
            if href.startswith("http://"):
                # print("href", href)
                https_to_http.append(href)
                # print (f"this is link ==> {href}")
    elif url_parse == 'http':
        for link in a_tag:
            href = link["href"]
            if href.startswith("https://"):
                http_to_https.append(href)
    # print(https_to_http)

    data = {
        "http_to_https_link_count": len(http_to_https),
        "http_to_https_link_detail": http_to_https,
        "http_to_https_link_table": table_dict,
        "https_to_http_link_count": len(https_to_http),
        "https_to_http_link_detail": https_to_http,
        "https_to_http_link_table": table_dict,
    }
    return data


# def https_in_http(soup, table_dict):
#     a_tag = soup.find_all('a', href=True)
#     http_link_list = []

#     for link in a_tag:
#         href = link["href"]
#         if href.startswith("https://"):
#             http_link_list.append(href)
#             # print (f"this is link ==> {href}")
#     data = {
#         "https_link_count": len(http_link_list),
#         "https_link_detail": http_link_list,
#         "https_link_table": table_dict,
#         "http_link_count": 0,
#         "http_link_detail": [],
#         "http_link_table": {}
#     }
#     print(f"this is https:// {data}")
#     return data


# remove
def duplicate_pages_func(raw_data, recommended_words):
    raw_data_list = []
    duplicate_page_dict = {'duplicate_page_count': 0, 'duplicate_page_table_list': []}
    for url, page_text in raw_data.items():
        if page_text not in raw_data_list:
            raw_data_list.append(page_text)
        else:
            soup = BeautifulSoup(page_text, 'lxml')
            title_tags = soup.find('title')
            title_tag = ''
            if title_tags:
                title_tag = title_tags.get_text().strip()
            duplicate_page_dict['duplicate_page_count'] += 1
            data_dict = {"source_page_title": title_tag, "website_url": url, "title": title_tag,
                         "content_type": "Text/Html; Charset=UTF-8",
                         "date": datetime.now().strftime("%d-%m-%Y"),
                         "Length": len(title_tag), "Recommended Words": recommended_words}
            duplicate_page_dict['duplicate_page_table_list'].append(data_dict)

    return duplicate_page_dict

def process_broken_link(dictionary_link,list_of_table_dict):
    ok_status_list = [200]
    broken_status_list = [400,401,402,403,404,405]
    links_list = dictionary_link.keys()
    links_list = set(links_list)  # making set and removing repeating value
    links_list = list(links_list)
    website_dic = {}
    url_dic = {}
    re_request_list = []
    broken_dict_link={}
    async def get(url, session):
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
        try:
            async with session.get(url=url, headers=headers) as response:
                # print('url {} with resp code {}.'.format(url, response.status))
                resp = await response.read()
                # url_dic[url] = response.status
                if response.status != 200:
                    if str(response.status).startswith('5'):
                        re_request_list.append(url)
                    else:
                        if response.status == 429:
                            async with session.head(headers = headers,url=url, timeout = 5) as response:
                                resp = await response.read()
                        url_dic[url] = response.status
                    
                # print("Successfully got url {} with resp code {}.".format(url, response.status))
                # print(f'URL: {url}\nStatusCode: {response.status}')
        except aiohttp.ClientResponseError as e:
            url_dic[url] = 400
            # print(f"Failed with ClientResponseError {e.status} on {e.request_info.url}")
            print(f"Failed with ClientResponseError on {url} \n Error: {repr(e)}")
        except aiohttp.ClientConnectionError as e:
            try:
                resp = requests.head(url=url, headers=headers)
                content_type = resp.headers["content-type"]
                if content_type.split("/")[0] in ["audio","video","image"]:
                    print(content_type) 
                else:
                    url_dic[url] = resp.status_code
            except Exception as e:
                print(f"Failed with ClientConnectionError on {url} \n Error: {repr(e)}")
                url_dic[url] = 502
            # print(f"Failed with ClientConnectionError: {e}")
        except asyncio.TimeoutError as e:
            # print(f"Failed with TimeoutError on {url} \n Error: {repr(e)}")
            try:
                resp = requests.head(url=url, headers=headers , timeout= 30)
                content_type = resp.headers["content-type"]
                if content_type.split("/")[0] in ["audio","video","image"]:
                    print(content_type) 
                else:
                    url_dic[url] = resp.status_code
            except Exception as e:
                url_dic[url] = 504
                # print(f"Failed with TimeoutError on {url} \n Request.Head Error: {repr(e)}")
        except Exception as e:
            print(f'Web-URl=>{url} Exception=> {e}')
        
    async def main(urls):
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=15)) as session:
            ret = await asyncio.gather(*[get(url, session) for url in urls])
        # print("Finalized all. Return is a list of len {} outputs.".format(len(ret)))

    asyncio.run(main(links_list))
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
    import time
    start_time = time.time()
    for url in re_request_list:
        try:
            resp = requests.get(url, headers=headers)
            # print('url {} with resp code {}.'.format(url, resp.status_code))
            url_dic[url] = resp.status_code
        except:
            continue
    print("{} @ {} seconds ---" .format("var" , (time.time() - start_time)))
    link_status_code ={}
    # each page status code dic and links in it 
    for url,response in url_dic.items():
        webpage_link = dictionary_link[url]
        for link in webpage_link:
            if not link in link_status_code.keys():
                link_status_code[link] = {}
            if not response in link_status_code[link].keys():
                link_status_code[link][response] = []
            if not url in link_status_code[link][response]:
                link_status_code[link][response].append(url)
    # --------------------end each page status code dic and links in it 
    for url,response in url_dic.items():
        webpage_link = dictionary_link[url]
        for link in webpage_link:
            if link in website_dic.keys():
                pass
            else:
                website_dic[link]={
                    'status_code' :{},
                    'link_code' :{},
                    'table_dict': {}
                }
            if response in  website_dic[link]['status_code'].keys():
                website_dic[link]['status_code'][response].append(url)
            else:
                website_dic[link]['status_code'][response] = [url]
            website_dic[link]['link_code'][url]=response 
            website_dic[link]['table_dict']=list_of_table_dict[link] 
    status_code_dic = {}
    for a,response in url_dic.items():
        if response in status_code_dic.keys():
            status_code_dic[response].append(a)
        else:
            status_code_dic[response]= [a]
        if response in broken_status_list or str(response).startswith("4")or str(response).startswith("5"):
            webpage_link = dictionary_link[a]
            for link in webpage_link:
                table_dic_webpage = list_of_table_dict[link]
                if link in broken_dict_link.keys():
                    broken_dict_link[link]['links_to_broken_page_count'] +=1
                    broken_dict_link[link]['links_to_broken_page_detail'].append(a)
                else:
                    broken_dict_link[link]={
                    'page_count' : 1,
                    'links_to_broken_page_count' :1,
                    'links_to_broken_page_detail' :[a],
                    'links_to_broken_page_table_dict': table_dic_webpage,
                    'status_code': {},
                    'link_code' :{}
                    }
        

    for k,v in broken_dict_link.items():
        broken_dict_link[k]['status_code'].update(status_code_dic)
        broken_dict_link[k]['link_code'].update(website_dic[k]['link_code'])
    
    return broken_dict_link, link_status_code


def links_to_broken_page(soup, website_url, table_dict):
    domain = urlparse(website_url).netloc
    scheme = urlparse(website_url).scheme
    website_url =  scheme+"://"+domain
    a_links = soup.find_all('a', href=True)
    formatted_links = []
    for link in a_links:
        a = link['href']
        if a is None:
            continue
        # or a.startswith("javascript:") or a.startswith("tel:") or a.startswith("email:")
        if a.startswith("http") or a.startswith("www") :
            pass
        elif "javascript:" in a or "tel:" in a or "email:" in a or "mailto:" in a:
        # elif "javascript:" in a or "tel:" in a or "email:" in a:
            continue
        else:
            if a.startswith("/"):
                if len(a) > 2:
                    a = f'{website_url}{a}'
                else:
                    continue
            else:
                a = f'{website_url}/{a}'
        url = a
        url = url.split('/')
        if '..' in url:
            new_url = ''
            for i in url:
                if i != '..':
                    new_url += i + '/'
            a = new_url
        mimetypes.init()
        mimestart = mimetypes.guess_type(a)[0]
        if mimestart != None:
            type = mimestart.split('/')[-1]
            if type in list_of_types:
               pass
            else:
                # print(f" {a} -> {type}")
                formatted_links.append(a)
        else:
            # print(f" {a} -> {mimestart}")
            formatted_links.append(a)
    formatted_links = set(formatted_links)  # making set and removing repeating value
    formatted_links = list(formatted_links)
    return formatted_links


def nofollow_outgoing_internal_links(soup, website_url, table_dict):
    domain = urlparse(website_url).netloc
    # domain = domain.split('.')[1]

    a_links = soup.find_all('a', {'href': True, 'rel': 'nofollow'})  # .get('rel')
    internal_link_list = []
    link_list = []
    if a_links:
        for a in a_links:
            data = a.get('href')
            # print(f"Found the data: {data}")
            if data.startswith("http"):
                link_list.append(data)
            else:
                link_list.append(f'{website_url}{data}')
            # print(f"Found the Tag: {a}")
        for link in link_list:
            if not domain in link:
                internal_link_list.append(link)
            else:
                pass
            #   print("domain found in the link")
        data_dict = table_dict
        data = {
            'nofollow_outgoing_internal_links_count': len(internal_link_list),
            'nofollow_outgoing_internal_links_list': internal_link_list,
            'nofollow_outgoing_internal_link_table': data_dict
        }
    else:
        # print("No Tag found")
        data_dict = {}
        data = {
            'nofollow_outgoing_internal_links_count': 0,
            'nofollow_outgoing_internal_links_list': [],
            'nofollow_outgoing_internal_link_table': data_dict
        }
    return data


def no_out_going_link(soup, table_dict):
    a_links = soup.find_all('a', href=True)

    data_dict = table_dict

    data = {
        'no_out_going_link_count': 0,
        'no_out_going_link_table': {},
        'no_out_going_link_detail': []
    }
    if not a_links:
        data['no_out_going_link_count'] = 1
        data['no_out_going_link_table'] = data_dict

    return data


def canonical_http_to_https(url,soup, table_dict):
    canonical_lst = []
    canonical_lst_http = []
    canonical_lst_https = []
    url = urlparse(url)
    url = url.scheme
    # print(url)

    if url == 'http':
        for j in soup.select('link[rel*=canonical]'):
            canonical_lst.append(j.get('href'))
            for k in canonical_lst:
                url_parse = urlparse(k)
                https = url_parse.scheme
                # https = k.split('/')[0]
                #         # print (f"this is url ==> {urls}")
                if https == 'https':
                    # resp = http_in_https(soup)
                    canonical_lst_https.append(k)
                    # print('URL in HTTPS')
                else:
                    pass
                    # resp = https_in_http(soup)
                    # print('URL in HTTP')
    
    elif url == 'https':
        for j in soup.select('link[rel*=canonical]'):
            canonical_lst.append(j.get('href'))
            for k in canonical_lst:
                url_parse = urlparse(k)
                http = url_parse.scheme
                #         # print (f"this is url ==> {urls}")
                if http == 'http':
                    # resp = http_in_https(soup)
                    canonical_lst_http.append(k)
                    # print('URL in HTTP')
                else:
                    pass
                    # resp = https_in_http(soup)
                    # print('URL in HTTPS')
    data = {
        'canonical_points_to_https_count': len(canonical_lst_https),
        'canonical_points_to_https_table': table_dict,
        'canonical_points_to_https_detail': canonical_lst_https,
        'canonical_points_to_http_count': len(canonical_lst_http),
        'canonical_points_to_http_table': table_dict,
        'canonical_points_to_http_detail': canonical_lst_http,
    }
    return data


def get_internal_pages(status_code_dict, internal_pages_dict, link_status_code):
    code_dict = {'5XX Page': {'count': 0, 'table': [] , 'detail': []}, '500 Page': {'count': 0, 'table': [], 'detail': []},
                 '4XX Page': {'count': 0, 'table': [], 'detail': []}, '404 Page': {'count': 0, 'table': [], 'detail': []}}

    for url, data_dict in status_code_dict.items():
        if str(data_dict['status_code']).startswith('5'):
            pass
            # code_dict['5XX Page']['count'] += 1
            # data_dict['source_page_title'] = "5xx Error title not found"
            # code_dict['5XX Page']['table'].append(data_dict)
            # if data_dict['status_code'] == 500:
            #     code_dict['500 Page']['count'] += 1
            #     data_dict['source_page_title'] = "500 Error title not found"
            #     code_dict['500 Page']['table'].append(data_dict)
        elif str(data_dict['status_code']).startswith('4'):
            pass
            # code_dict['4XX Page']['count'] += 1
            # data_dict['source_page_title'] = "4xx Error title not found"
            # code_dict['4XX Page']['table'].append(data_dict)
            # if data_dict['status_code'] == 404:
            #     code_dict['404 Page']['count'] += 1
            #     data_dict['source_page_title'] = "404 Error title not found"
            #     code_dict['404 Page']['table'].append(data_dict)
        else:
            if url in link_status_code.keys():
                for status , dic in link_status_code[url].items():
                    if str(status).startswith('4'):
                        if data_dict in code_dict['4XX Page']['table']:
                            index = code_dict['4XX Page']['table'].index(data_dict)
                            if len(list(dic)) > 0:
                                code_dict['4XX Page']['detail'][index].extend(list(dic))
                            else:
                                continue
                        else:
                            code_dict['4XX Page']['count'] += 1
                            code_dict['4XX Page']['table'].append(data_dict)
                            code_dict['4XX Page']['detail'].append(list(dic))
                        if str(status) =='404':
                            if data_dict in code_dict['404 Page']['table']:
                                index = code_dict['404 Page']['table'].index(data_dict)
                                if len(list(dic)) > 0:
                                    code_dict['404 Page']['detail'][index].extend(list(dic))
                                else:
                                    continue
                            else:
                                code_dict['404 Page']['count'] += 1
                                code_dict['404 Page']['table'].append(data_dict)
                                code_dict['404 Page']['detail'].append(list(dic))
                        else:
                            continue
                    elif str(status).startswith('5'):
                        if data_dict in code_dict['5XX Page']['table']:
                            index = code_dict['5XX Page']['table'].index(data_dict)
                            if len(list(dic)) > 0:
                                code_dict['5XX Page']['detail'][index].extend(list(dic))
                            else:
                                continue
                        else:
                            code_dict['5XX Page']['count'] += 1
                            code_dict['5XX Page']['table'].append(data_dict)
                            code_dict['5XX Page']['detail'].append(list(dic))
                        if str(status) =='500':
                            if data_dict in code_dict['500 Page']['table']:
                                index = code_dict['500 Page']['table'].index(data_dict)
                                if len(list(dic)) > 0:
                                    code_dict['500 Page']['detail'][index].extend(list(dic))
                                else:
                                    continue
                            else:
                                code_dict['500 Page']['count'] += 1
                                code_dict['500 Page']['table'].append(data_dict)
                                code_dict['500 Page']['detail'].append(list(dic))
                        else:
                            continue

    internal_pages_dict["5XX Page"]['Founded'] += code_dict['5XX Page']['count']
    if code_dict['5XX Page']['count'] > 0:
        internal_pages_dict["5XX Page"]['table'] = code_dict['5XX Page']['table']
        if code_dict['5XX Page']['detail']:
            internal_pages_dict["5XX Page"]['detail'] = code_dict['5XX Page']['detail']

    internal_pages_dict["500 Page"]['Founded'] += code_dict['500 Page']['count']
    if code_dict['500 Page']['count'] > 0:
        internal_pages_dict["500 Page"]['table'] = code_dict['500 Page']['table']
        if code_dict['500 Page']['detail']:
            internal_pages_dict["500 Page"]['detail'] = code_dict['500 Page']['detail']

    internal_pages_dict["4XX Page"]['Founded'] += code_dict['4XX Page']['count']
    if code_dict['4XX Page']['count'] > 0:
        internal_pages_dict["4XX Page"]['table'] = code_dict['4XX Page']['table']
        if code_dict['4XX Page']['detail']:
            internal_pages_dict["4XX Page"]['detail'] = code_dict['4XX Page']['detail']

    internal_pages_dict["404 Page"]['Founded'] += code_dict['404 Page']['count']
    if code_dict['404 Page']['count'] > 0:
        internal_pages_dict["404 Page"]['table'] = code_dict['404 Page']['table']
        if code_dict['404 Page']['detail']:
            internal_pages_dict["404 Page"]['detail'] = code_dict['404 Page']['detail']


def canonical_http_to_redirect(url, soup, table_dict):
    canonical_lst = []
    canonical_lst_redirect = []
    canonical_lst_404 = []
    canonical_lst_5xx = []
    # print(url)

    for j in soup.select('link[rel*=canonical]'):
        canonical_lst.append(j.get('href'))
        for k in canonical_lst:
            try:
                if k == '/':
                    k = url + k
                
                # print('canonical_url ', k)
                st_code = urllib.request.urlopen(k).getcode()
                # print('canonical_st_code ', st_code)
                status_resp = st_code

                if status_resp == 302:
                    canonical_lst_redirect.append(k)
                    # print('External URL ' + str(k))
                
                elif status_resp in list(range(400, 423)):
                    # print('Error 404')
                    canonical_lst_404.append(k)
                    # print(canonical_lst_404)
                
                elif status_resp in list(range(500, 511)):
                    # print('Error 5xx')
                    canonical_lst_5xx.append(k)
                    # print(canonical_lst_5xx)
                else:
                    # resp = https_in_http(soup)
                    print('No canonical 404, 5xx, 302')

            except Exception as e:
                print('Invalid Canonical URL')

    redirect_data = {
        'canonical_points_to_redirect_count': len(canonical_lst_redirect),
        'canonical_points_to_redirect_table': table_dict,
        'canonical_points_to_redirect_detail': canonical_lst_redirect,
        'canonical_points_to_404_count': len(canonical_lst_404),
        'canonical_points_to_404_table': table_dict,
        'canonical_points_to_404_detail': canonical_lst_404,
        'canonical_points_to_5xx_count': len(canonical_lst_5xx),
        'canonical_points_to_5xx_table': table_dict,
        'canonical_points_to_5xx_detail': canonical_lst_5xx,
        }
    # print('count')
    # print(redirect_data["canonical_points_to_redirect_count"])

    return redirect_data


def canonical(url, soup, table_dict):
    data = {}
    resp = canonical_http_to_https(url, soup, table_dict)
    data.update(resp)

    resp = canonical_http_to_redirect(url, soup, table_dict)
    data.update(resp)

    print('CANONICAL TO REDIRECT, 404, 5XX')
    return data


def return_page_content(soup):
    soup_k = soup
    words_k = soup_k.text.lower()
    return words_k


def process_dict(dictionary):
    rev_dict = {}
    meta_url_status = {}
    new_dict = {}
    for k,v in dictionary.items():
        if v is not None and len(v) > 0:
            new_dict[k] = v
    dictionary = new_dict
    for k, v in dictionary.items():
        meta_url_status[k] = False

    for key, value in dictionary.items():
        rev_dict.setdefault(value, set()).add(key)

    result = filter(lambda x: len(x) > 1, rev_dict.values())
    result = list(result)
    result_list = []

    for data in result:
        for inner_data in data:
            result_list.append(inner_data)

    for k, v in meta_url_status.items():
        if k in result_list:
            meta_url_status[k] = True

    return meta_url_status


def noindex_nofollow(url, soup, table_dict):
    noindex_lst = []
    nofollow_lst = []

    tags = soup.findAll('meta', {'name': 'robots'})
    for tag in tags:
        if 'noindex' in tag['content']:
            noindex_lst.append('Url: ' + str(url) + ' Meta Tag: ' + str(tag))
            # print("No Index")

        if 'nofollow' in tag['content']:
            nofollow_lst.append('Url: ' + str(url) + ' Meta Tag: ' + str(tag))
            # print("No Follow")

    data = {
        'noindex_count': len(noindex_lst),
        'noindex_table': table_dict,
        'noindex_detail': noindex_lst,
        'nofollow_count': len(nofollow_lst),
        'nofollow_table': table_dict,
        'nofollow_detail': nofollow_lst,}
    # print(url)
    # print(tags)
    return data

def redirect_302(url_list):
    redirect_data = []
    table_list = []
    for url, table_dict in url_list.items():
        response = requests.get(url)
        status_code = response.status_code
        if status_code == 302:
            redirect_data.append(url)
            table_list.append(table_dict)

    data = {
        "redirect_302_count": len(redirect_data),
        "redirect_302_detail": redirect_data,
        "redirect_302_table": table_list
    }
    return data
def redirecting_checker(raw_data):
    
    list_3xx_detail = []
    list_3xx_table = []
    list_302_table = []
    list_302_detail = []
    list_redirecting_loop_table = []
    list_redirecting_loop_detail = []
    redirect_chain_count = []
    redirect_chain_detail = []
    redirect_chain_table = []
    long_redirect_chain_count = []
    long_redirect_chain_detail = []
    long_redirect_chain_table = []
    redirect_broken_redirect_data = []
    redirect_broken_table_list = []

    for url, table_dict in raw_data.items():
        try:
            resp = requests.get(url)
        except requests.exceptions.SSLError as e:
            resp = requests.get(url,verify=False)
        redirecting_history = []
        for response in resp.history:
            redirecting_history.append(response.status_code)
        print("redirecting_history",redirecting_history)
        if redirecting_history:
            redirecting_table = table_dict.copy()
            redirecting_table['status_code'] = redirecting_history[-1]
            redirect_chain_count.append(url)
            # redirect_chain_detail.append(f'Redirecting chain: [{",".join(map(str,redirecting_history))}]')
            redirect_chain_detail.append(redirecting_history)
            redirect_chain_table.append(redirecting_table)
            if len(redirecting_history) > 5:
                redirecting_table = table_dict.copy()
                redirecting_table['status_code'] = redirecting_history[-1]
                long_redirect_chain_count.append(url)
                # long_redirect_chain_detail.append(f'Redirecting long chain: [{",".join(map(str,redirecting_history))}]')
                long_redirect_chain_detail.append(redirecting_history)
                long_redirect_chain_table.append(redirecting_table)
            if str(redirecting_history[-1]).startswith("3"):
                list_3xx_detail.append(url)
                table_3xx_dic = table_dict.copy()
                table_3xx_dic['status_code'] = redirecting_history[-1]
                list_3xx_table.append(table_3xx_dic)
                if str(redirecting_history[-1]) == "302":
                    list_302_detail.append(url)
                    table_302_dic = table_dict.copy()
                    table_302_dic['status_code'] = redirecting_history[-1]
                    list_302_table.append(table_302_dic)
                if str(redirecting_history[-1]) == "301":
                    list_redirecting_loop_detail.append(url)
                    list_redirecting_loop_table.append(table_dict)
                if str(resp.status_code).startswith("4") or str(resp.status_code).startswith("5"):
                    redirect_broken_redirect_data.append(url)
                    redirect_broken_table_list.append(table_dict)
        else:
            if str(resp.status_code).startswith("3"):
                list_3xx_detail.append(url)
                table_3xx_dic = table_dict.copy()
                table_3xx_dic['status_code'] = resp.status_code
                list_3xx_table.append(table_3xx_dic)
                if str(resp.status_code) == "302":
                    list_302_detail.append(url)
                    table_302_dic = table_dict.copy()
                    table_302_dic['status_code'] = resp.status_code
                    list_302_table.append(table_302_dic)

    data_3xx = {
        "redirect_3XX_count": len(list_3xx_detail),
        "redirect_3XX_detail": list_3xx_detail,
        "redirect_3XX_table": list_3xx_table
    }
    data_302 = {
        "redirect_302_count": len(list_302_detail),
        "redirect_302_detail": list_302_detail,
        "redirect_302_table": list_302_table
    }
    redirecting_loop_data = {
        "redirect_loop_count": len(list_redirecting_loop_detail),
        "redirect_loop_detail": list_redirecting_loop_detail,
        "redirect_loop_table": list_redirecting_loop_table
    }
    redirect_chain_data = {
        "redirect_chaincount": len(redirect_chain_count),
        "redirect_chaindetail": redirect_chain_detail,
        "redirect_chaintable": redirect_chain_table
    }
    redirect_chain_long_data = {
        "redirect_chain_long_count": len(long_redirect_chain_count),
        "redirect_chain_long_detail": long_redirect_chain_detail,
        "redirect_chain_long_table": long_redirect_chain_table
    }
    redirect_broken_data = {
        "redirect_broken_count": len(redirect_broken_redirect_data),
        "redirect_broken_detail": redirect_broken_redirect_data,
        "redirect_broken_table": redirect_broken_table_list
    }
    return data_3xx,data_302,redirecting_loop_data,redirect_chain_data,redirect_chain_long_data,redirect_broken_data,list_3xx_detail

def redirect_3XX(url_list):
    redirect_data = []
    table_list = []
    redirect_data_302 = []
    table_list_302 = []
    
    for url, table_dict in url_list.items():
        response = requests.get(url)
        status_code = str(response.status_code)
        if status_code.startswith('3'):
            if status_code == 302:
                redirect_data_302.append(url)
                table_list_302.append(table_dict)
            else:
                redirect_data.append(url)
                table_list.append(table_dict)

    data_3xx = {
        "redirect_3XX_count": len(redirect_data),
        "redirect_3XX_detail": redirect_data,
        "redirect_3XX_table": table_list
    }
    data_302 = {
        "redirect_302_count": len(redirect_data_302),
        "redirect_302_detail": redirect_data_302,
        "redirect_302_table": table_list_302
    }
            
    return data_3xx,data_302


def www(url, table_dict):
    www_lst = []
    no_www_lst = []

    if 'www' in url:
        www_lst.append(url)
     
        data = {
        'www_count': len(www_lst),
        'www_table': table_dict,
        'www_detail': 'URL with WWW: ' + str(url),
        'no_www_count': 0,
        'no_www_table': table_dict,
        'no_www_detail': 'URL with No WWW: '
    }
    
    elif 'www' not in url:
        no_www_lst.append(url)
        data = {
        'www_count': 0,
        'www_table': table_dict,
        'www_detail': 'URL with WWW: ',
        'no_www_count': len(no_www_lst),
        'no_www_table': table_dict,
        'no_www_detail': 'URL with No WWW: ' + str(url)
    }

        # print("WWW")


    return data


# def no_www(url, table_dict):
    

#     if 'www' not in url:
#         no_www_lst.append(url)

#         # print("No WWW")
#     data = {
#         'no_www_count': len(no_www_lst),
#         'no_www_table': table_dict,
#         'no_www_detail': 'URL with No WWW: ' + str(url)
#     }

#     return data

#old robots.txt API
# def robots_not_found(website_url, table_dict):
#     no_robots = []
#     if website_url.endswith('/'):
#         pass
#     else:
#         website_url = website_url+'/'
#     full_url = website_url+'robots.txt'

#     # print(full_url)
#     try:
#         full_url_status = requests.get(full_url)
#     except requests.exceptions.SSLError as e:
#         full_url_status = requests.get(full_url,verify=False)
#     if full_url_status.status_code != 200:
#         no_robots.append(full_url)
#         print('Robots.txt Not Found')
#         data = {
#             'norobots_count': 1,
#             'norobots_table': table_dict,
#             'norobots_detail': f'({full_url}) URL in which no Robots.txt Found'
#         }
#     else:
#         data = {
#             'norobots_count': 0,
#             'norobots_table': {},
#             'norobots_detail': ''
#         }

#     return data

#New Robots.txt API
def robots_not_found(website_url, table_dict):
    
    if website_url.endswith('/'):
        pass
    else:
        website_url = website_url+'/robots.txt'
    print(website_url)
    
    api_data = {'website_base_url': website_url}
    api = 'http://23.106.56.71:5555/crawl_api/site_diagnositcs/'
    # full_url = f'https://app.websiterankingexpert.com/site_audit/get_site_live_data/?url={website_url}'

    # print(full_url)
    robots_url_status = requests.post(api, data=api_data)
    # print(robots_url_status)
    if robots_url_status.status_code != 200:
        print("robots.txt_not_found")
        
        data = {
            
            'norobots_count': 1,
            'norobots_table': table_dict,
            'norobots_detail': f'({website_url}/robots.txt) URL in which no Robots.txt Found'
            
        }
    else:
        robots_url = robots_url_status.json()
        try:
            robots_url=robots_url['response_desktop']['all_data']['lighthouseResult']['audits']['robots-txt']['score']
        except KeyError:
            robots_url = None
        print("score",robots_url)
        if robots_url is None:
            print("robots.txt_not_found")
            data = {
                'norobots_count': 1,
                'norobots_table': table_dict,
                'norobots_detail': website_url
            }
        else:
            print("robots.txt_found")
            data = {
                'norobots_count': 0,
                'norobots_table': {},
                'norobots_detail': ''
            }
            
    return data

def open_graph_tag(url, soup, table_dict):
    og_tags = soup.findAll('meta')
    tag_property = []
    detail_list = []
    
    open_graph_link = []
    data = {
        'open_graph_tag_count': 0,
        'open_graph_tag_details': [],
        'open_graph_tag_table': {}
    }
    if og_tags:
        for tag in og_tags:
            tag_property.append(tag.get('property'))
            tag_property.append(tag.get('name'))
        # if 'og:type' or 'og:title' or 'og:image' or 'og:locale' or 'og:url' or 'og:description' or 'og:site_name' or 'og:updated_time' not in tag_property:
        # if 'og:title' not in tag_property:
        if 'og:type' not in tag_property:
            detail_list.append('og:type Missing')
        if 'og:title' not in tag_property:
            detail_list.append('og:title Missing')
        if 'og:image' not in tag_property:
            detail_list.append('og:image Missing')
        if 'og:locale' not in tag_property:
            detail_list.append('og:locale Missing')
        if 'og:url' not in tag_property:
            detail_list.append('og:url Missing')
        if 'og:description' not in tag_property:
            detail_list.append('og:description Missing')
            # if 'og:site_name' not in tag_property:
            #     detail_list.append('og:site_name Missing')
            # if 'og:updated_time' not in tag_property:
            #     detail_list.append('og:updated_time Missing')

        open_graph_link.append(url)

        if len(detail_list) > 0:
            data = {
                    'open_graph_tag_count': len(open_graph_link),
                    'open_graph_tag_details': detail_list,
                    'open_graph_tag_table': table_dict
                }
            print('OG Tag incomplete') 
    
        else:
            print('OG Tag complete')
    return data


def twitter_card(soup, table_dict):
    twitter_card_description_length = int(GlobalConfiguration.objects.get(name='twitter_card_description_length').value)
    # twitter_card_description_length = 200
    twitter_card_title_length = int(GlobalConfiguration.objects.get(name='twitter_card_title_length').value)
    # twitter_card_title_length = 70
    mimetypes.init()
    detail_list = []
    data = {'twitter_card_count': 0, 'twitter_card_detail': detail_list, 'twitter_card_table': table_dict}
    twitter_card_name = soup.find("meta", attrs={'name': "twitter:card"})  # ok working
    if not twitter_card_name:
        twitter_card_name = soup.find("meta", attrs={'property': "twitter:card"})
    twitter_card_description = soup.find("meta", attrs={'name': "twitter:description"})  # ok working
    if not twitter_card_description:
        twitter_card_description = soup.find("meta", attrs={'property': "twitter:description"})  # ok working
    twitter_card_image = soup.find("meta", attrs={'name': "twitter:image"})  # ok working
    if not twitter_card_image:
        twitter_card_image = soup.find("meta", attrs={'property': "twitter:image"})
    twitter_card_image_content = ""
    twitter_card_title = soup.find("meta", attrs={'name': "twitter:title"})  # ok working
    if not twitter_card_title:
        twitter_card_title = soup.find("meta", attrs={'property': "twitter:title"})
    twitter_card_title_content = ""
    twitter_card_site = soup.find("meta", attrs={'name': "twitter:site"})  # ok working
    if not twitter_card_site:
        twitter_card_site = soup.find("meta", attrs={'property': "twitter:site"})  # ok working
    twitter_card_site_content = ""

    if twitter_card_name:
        if twitter_card_name.get("content"):
            pass
            # detail_list.append(str(twitter_card_name))
        else:
            detail_list.append("name='twitter:card' Content not found")
            data['twitter_card_count'] = 1
    else:
        detail_list.append("name='twitter:card' not found")
        data['twitter_card_count'] = 1

    if twitter_card_description and twitter_card_description.get("content") is not None:
        if twitter_card_description.get("content") is not None and len(twitter_card_description.get("content")) > twitter_card_description_length:
            # print("Twitter card title cant be longer than 200 characters")
            detail_list.append("name='twitter:description' cannot be greater than 200 characters")
            data['twitter_card_count'] = 1
        else:
            pass
            # detail_list.append(str(twitter_card_description))
    else:
        data['twitter_card_count'] = 1
        detail_list.append("name='twitter:description' not found")

    if twitter_card_image:
        mimetypes.init()
        twitter_card_image_content = twitter_card_image.get("content")
        image_type = twitter_card_image_content.split('/')[-1]
        # print("Twitter card image", image_type)
        mimestart = mimetypes.guess_type(image_type)[0]
        if mimestart != None:
            file_type = mimestart.split('/')[0]
            if file_type in ['image']:
                # detail_list.append(str(twitter_card_image))
                pass
            else:
                data['twitter_card_count'] = 1
                detail_list.append("name='twitter:image' type-image only")
        else:
            if "http" in twitter_card_image_content or  'www' in twitter_card_image_content:
                resp = requests.get(twitter_card_image_content,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'})
                print(resp.headers)
                if 'image' in resp.headers['content-type']:
                    pass
                else:
                    data['twitter_card_count'] = 1
                    detail_list.append("name='twitter:image' type-image only")
            else:
                data['twitter_card_count'] = 1
                detail_list.append("name='twitter:image' type-image only")
    else:
        data['twitter_card_count'] = 1
        detail_list.append("name='twitter:image' not found")

    if twitter_card_title:
        twitter_card_title_content = twitter_card_title.get("content")
        if twitter_card_title_content is not None  and len(twitter_card_title_content) > twitter_card_title_length:
            # print("Twitter card title cant be longer than 70 characters")
            detail_list.append("name='twitter:title' cant be longer than 70 characters")
            data['twitter_card_count'] = 1
        else:
            # detail_list.append(str(twitter_card_title))
            pass
    else:
        data['twitter_card_count'] = 1
        detail_list.append("name='twitter:title' not found")

    if twitter_card_site:
        twitter_card_site_content = twitter_card_site.get("content")
        if twitter_card_site_content is not None and twitter_card_site_content.startswith("@"):
            # print("Twitter site content contain username")
            # detail_list.append(str(twitter_card_site))
            pass
        else:
            detail_list.append(str("@username is not a valid"))
            data['twitter_card_count'] = 1
    else:
        data['twitter_card_count'] = 1
        detail_list.append("name='twitter:site' not found")
    
    return data

def xml_sitemap_not_found(website_url,main_page_table_dict):
    
    table_dict = main_page_table_dict
    response_list = []
    xml_url = sitemap_tree_for_homepage(website_url)

    for page in xml_url.all_pages():
        response_list.append(page.url)


    data = {
        'noxml_count': 0 if len(response_list) > 0 else 1,
        'noxml_table': table_dict,
        'noxml_detail': response_list if len(response_list) > 0 else []
    }

    return data    
    
    
    
    # table_dict = main_page_table_dict
    # data = {}
    # data = {'website_base_url': website_url}
    # url =  'http://23.106.56.71:5555/crawl_api/check_broken_links/'
    # try:
    #     api_resp = requests.post(url, data=data, timeout=10)
    #     if api_resp.status_code != 200:
    #         data = {
    #             'noxml_count': 1,
    #             'noxml_table': table_dict,
    #             'noxml_detail': website_url
    #         }
    #     else:
    #         api_resp = api_resp.json()
    #         print (api_resp['site_map_url'])
    #         if not api_resp['site_map_url']:
    #             data = {
    #                 'noxml_count': 1,
    #                 'noxml_table': table_dict,
    #                 'noxml_detail': website_url
    #             }
    #         elif api_resp['site_map_url'] and api_resp['site_map_url'].endswith("xml"):
    #             data = {
    #                     'noxml_count': 0,
    #                     'noxml_table': table_dict,
    #                     'noxml_detail': api_resp['site_map_url']
    #                     }
    #         else:
    #             api_resp=api_resp['site_map_url']
    #             if type(api_resp) == dict:
    #                 if 'status' in api_resp.keys():
    #                     data = {
    #                         'noxml_count': 1,
    #                         'noxml_table': table_dict,
    #                         'noxml_detail': website_url
    #                     }
    #             else:
    #                 data = {
    #                     'noxml_count': 0,
    #                     'noxml_table': table_dict,
    #                     'noxml_detail': api_resp}
    #     return data
    # except Exception as e:
    #     print("sitemap.xml not found")
    #     data = {
    #                     'noxml_count': 1,
    #                     'noxml_table': table_dict,
    #                     'noxml_detail': website_url}
    #     return data


# def xml_sitemap_not_found_older(website_url,main_page_table_dict):
#     table_dict = main_page_table_dict
#     data = {}
#     request_url = f'https://app.websiterankingexpert.com/site_audit/get_site_live_data/?url={website_url}'
#     site_map_url = requests.get(request_url)
#     if site_map_url.status_code != 200:
#         print("sitemap_url_not_found")
#         data = {
#             'noxml_count': 1,
#             'noxml_table': table_dict,
#             'noxml_detail': website_url
#         }
#         return data
#     else:
#         site_map_url = site_map_url.json()
#     if not site_map_url['page_data_dict_status']:
#         print("sitemap_url_not_found")
#         data = {
#             'noxml_count': 1,
#             'noxml_table': table_dict,
#             'noxml_detail': website_url
#         }
#         return data
#     if not site_map_url['page_data_dict']['site_map_url']:
#         print("sitemap_url_not_found")
#         data = {
#             'noxml_count': 1,
#             'noxml_table': table_dict,
#             'noxml_detail': website_url
#         }
#     else:
#         print("sitemap_url", site_map_url['page_data_dict']['site_map_url'])
#         site_map_url=site_map_url['page_data_dict']['site_map_url']
#         if type(site_map_url) == dict:
#             if 'status' in site_map_url.keys():
#                 # print("try block-sitemap_url_not_found")
#                 data = {
#                     'noxml_count': 1,
#                     'noxml_table': table_dict,
#                     'noxml_detail': website_url
#                 }
#         else:
#             data = {
#                 'noxml_count': 0,
#                 'noxml_table': table_dict,
#                 'noxml_detail': site_map_url}
#     return data




def redirect_broken(url_list):
    redirect_data = []
    table_list = []
    for url, table_dict in url_list.items():

        response = requests.get(url)
        status_code = response.status_code
        if status_code == 302 or status_code == 302:
            redirect_data.append(url)
            table_list.append(table_dict)

    data = {
        "redirect_broken_count": len(redirect_data),
        "redirect_broken_detail": redirect_data,
        "redirect_broken_table": table_list
    }
    # print (data, 'data')
    return data


def redirect_chain(url_list):
    redirect_data = []
    table_list = []
    detail_list = []
    for url, table_dict in url_list.items():
        response = requests.get(url)
        if response.history:
            status_list = []
            for status in response.history:
                status_list.append(status.status_code)
            # chain = ""
            # code = response.history[0].status_code
            # final_url = response.url
            # for resp in response.history:
            #     chain += resp.url + " | "
            #     return str(code) + '\t' + str(len(response.history)) + '\t' + chain + '\t' + final_url + '\t'
            # else:
            #     return str(response.status_code) + '\t\t\t\t'
            table_dict['status_code'] = status_list[0]
            redirect_data.append(url)
            detail_list.append({url: status_list})
            table_list.append(table_dict)

    data = {
        "redirect_chaincount": len(redirect_data),
        "redirect_chaindetail": detail_list,
        "redirect_chaintable": table_list
    }
    # print (data, 'data')
    return data


def redirect_http_to_https(url, soup, table_dict):
    redirect_http_data = []
    redirect_https_data = []
    if url.startswith('http://'):
        a_tag = soup.find_all('a', href=True)
        for link in a_tag:
            if link.find('https://'):
                redirect_http_data.append(url)
    
    elif url.startswith('https://'):
        a_tag = soup.find_all('a', href=True)
        for link in a_tag:
            if link.find('http://'):
                redirect_https_data.append(url)

    
    data = {
            "redirect_http_to_https_link_count": len(redirect_http_data),
            "redirect_http_to_https_link_detail": redirect_http_data,
            "redirect_http_to_https_link_table": table_dict,
            "redirect_https_to_http_link_count": len(redirect_https_data),
            "redirect_https_to_http_link_detail": redirect_https_data,
            "redirect_https_to_http_link_table": table_dict
        }
    
    return data


def pages_console_errors(url, response, table_dict):
    # print(response['status'])
    data = {
        'console_error_count': 0,
        'console_error_table': [],
        'console_error_detail': {},
    }
    console_error_list = []
    if 'status' in response.keys():
        try:
            api_response = list(response['response_desktop']['all_data']['lighthouseResult']['audits']['errors-in-console'][
                        'details']['items'])
            for resp in api_response:
                console_error_list.append(f"URL: {resp['sourceLocation']['url']}\n{resp['source']}: {resp['description']}")
                # URL: {resp['sourceLocation']['url']}
            data = {
                    'console_error_count': len(console_error_list),
                    'console_error_table': table_dict,
                    'console_error_detail': console_error_list
                }
        except KeyError:
            pass
        
    return data


def redirect_meta_refresh(soup, table_dict):
    result = soup.find_all("meta", attrs={"http-equiv": "Refresh"})
    if result:
        data = {
            "redirect_meta_refresh_count": len(result),
            "redirect_meta_refresh_detail": result,
            "redirect_meta_refresh_table": table_dict
        }
    else:
        data = {
            "redirect_meta_refresh_count": 0,
            "redirect_meta_refresh_detail": [],
            "redirect_meta_refresh_table": {}
        }
    # print('data', data)
    return data


def redirect_chain_long(url_list):
    redirect_data = []
    table_list = []
    detail_list = []
    for url, table_dict in url_list.items():
        response = requests.get(url)
        print('response.history:', response.history)
        if len(response.history) >= 5:
            status_list = []
            for status in response.history:
                status_list.append(status.status_code)
            redirect_data.append(url)
            detail_list.append({url: status_list})
            table_list.append(table_dict)

    data = {
        "redirect_chain_long_count": len(redirect_data),
        "redirect_chain_long_detail": detail_list,
        "redirect_chain_long_table": table_list
    }
    # print(data, 'data')
    return data


def redirect_loop(url_list):
    redirect_data = []
    table_list = []
    for url, table_dict in url_list.items():
        response = requests.get(url)
        if len(response.history) > 0:
            if response.status_code == 301:
                redirect_data.append(url)
                table_list.append(table_dict)
    data = {
        "redirect_loop_count": len(redirect_data),
        "redirect_loop_detail": redirect_data,
        "redirect_loop_table": table_list
    }
    return data


def syntax_issues(soup, table_dict):
    try:
        val = HTMLValidator()
        val.validate_fragment(str(soup))
        syntax_issues_lst = []

        for error in val.errors:
            # print("SYNTAX ISSUES")
            # print(error.get("message"))

            syntax_issues_lst.append(error.get("message"))

        data = {
            'syntax_issues_count': len(syntax_issues_lst),
            'syntax_issues_table': table_dict,
            'syntax_issues_detail': syntax_issues_lst,
        }
    except Exception as e :
        print("Exception in Syntax Issues: ", repr(e))
        data = {
            'syntax_issues_count': 0,
            'syntax_issues_table': {},
            'syntax_issues_detail': [],
        }
    return data


def crawled_pages_checker(url_list):
    healthy_page, redirect_page, broken_page, blocked_pages = [], [], [], []
    for url in url_list:
        resp = requests.get(url)
        if resp.status_code == 200:
            healthy_page.append(url)
        elif resp.status_code == 403:
            blocked_pages.append(url)
        elif resp.status_code == 301:
            redirect_page.append(url)
        else:
            broken_page.append(url)

    return broken_page, redirect_page, healthy_page, blocked_pages
