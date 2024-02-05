from django.urls import path
from .views import *

urlpatterns = [
    path('seo_checkup/', seo_checkup, name='seo_checkup'),
    path('get_site_live_data/', get_site_live_data, name='get_site_live_data'),
    path('crawler_data/', crawler_data, name='crawler_data'),
    path('keyword_ideas/', keyword_ideas, name='keyword_ideas'),
    path('schema_generator/', schema_generator, name='schema_generator'),
    path('keyword_data_listview/', keyword_data_listview, name='keyword_data_listview'),
    path('get_site_data/', get_site_data, name='get_site_data'),
    path('website_overview/', website_overview, name='website_overview'),
    path('website_data_listview/', website_data_listview, name='website_data_listview'),
    path('site_audit_project_list/', site_audit_project_list, name='site_audit_project_list'),
    path('site_audit_project_listview/', site_audit_project_listview, name='site_audit_project_listview'),
    # path('site_audit_jobs_list/', site_audit_jobs_list, name='site_audit_jobs_list'),
    # path('site_audit_jobs_listview/', site_audit_jobs_listview, name='site_audit_jobs_listview'),
    path('site_audit_view/', site_audit_view, name='site_audit_view'),
    path('run_management_command/', run_management_command, name='run_management_command'),
    path('objectives/', objectives, name='objectives'),
    path('keyword_explorer/', keyword_explorer, name='keyword_explorer'),
    path('delete_site_audit_project/', delete_site_audit_project, name='delete_site_audit_project'),
    path('get_websites/', get_websites, name='get_websites'),
    path('add_website/', add_website, name='add_website'),
    path('add_multiple_website/', add_multiple_website, name='add_multiple_website'),
    path('add_competitor/', add_competitor, name='add_competitor'),
    path('competitors/', competitors, name='competitors'),
    path('competitors_step2/', competitors_step2, name='competitors_step2'),
    path('get_competitors_data/', get_competitors_data, name='get_competitors_data'),
    path('get_backlinks/', get_backlinks, name='get_backlinks'),
    path('alerts/', alerts, name='alerts'),
    path('backlinks/', backlinks, name='backlinks'),
    path('all_website/', all_website, name='all_website'),
    path('my_keywords/', my_keywords, name='my_keywords'),
    path('social_analytics/', social_analytics, name='social_analytics'),
    path('rank_guard/', rank_guard, name='rank_guard'),
    path('get_project_location/', get_project_location, name='get_project_location'),
    path('save_project_location/', save_project_location, name='save_project_location'),
    path('services/', services, name='services'),
    path('support/', support, name='support'),
    path('get_competitors/', get_competitors, name='get_competitors'),
    path('delete_site_competitor/', delete_site_competitor, name='delete_site_competitor'),
    path('objective/', objective, name='objective'),
    path('get_objectives/', get_objectives, name='get_objectives'),
    path('update_objective_status/', update_objective_status, name='update_objective_status'),
    path('keyword_introduction/', keyword_introduction, name='keyword_introduction'),
    path('save_track_keyword/', save_track_keyword, name='save_track_keyword'),
    path('get_track_keyword/', get_track_keyword, name='get_track_keyword'),
    path('get_analytics_data/', get_analytics_data, name='get_analytics_data'),
    path('get_website_json/', get_website_json, name='get_website_json'),
    path('get_website_analytics/', get_website_analytics, name='get_website_analytics'),
    path('get_competitor_website_json/', get_competitor_website_json, name='get_competitor_website_json'),
    path('save_competitor_track_keyword/', save_competitor_track_keyword, name='save_competitor_track_keyword'),
    path('get_competitor_track_keyword/', get_competitor_track_keyword, name='get_competitor_track_keyword'),
    path('pro_managed/', pro_managed, name='pro_managed'),
    path('seo_services/', seo_services, name='seo_services'),
    path('pricing/', pricing, name='pricing'),
    path('save_contact_details/', save_contact_details, name='save_contact_details'),
    path('acquisitions_overview/', acquisitions_overview, name='acquisitions_overview'),
    path('behavior_overview/', behavior_overview, name='behavior_overview'),
    path('audience_overview/', audience_overview, name='audience_overview'),
    path('dashboard/', dashboard, name='dashboard'),
    path('technical_site_audit/', technical_site_audit, name='technical_site_audit'),
    path('dashboard-2/crawler/', dashboard2, name='dashboard2'),
    path('content/', content, name='content'),
    path('get_auth_url/', get_auth_url, name='get_auth_url'),
    path('url_analysis/', url_analysis, name='url_analysis'),
    path('user_accounts/', user_accounts, name='user_accounts'),
    path('get_account_list_data/', get_account_list_data, name='get_account_list_data'),
    path('add_account_data/', add_account_data, name='add_account_data'),
    path('behaviour_overview/', behaviour_overview, name='behaviour_overview'),
    path('audience_overview_data/', audience_overview_data, name='audience_overview_data'),
    path('get_google_analytics_status/', get_google_analytics_status, name='get_google_analytics_status'),
    path('acquisition_overview/', acquisition_overview, name='acquisition_overview'),
    path('user_accounts_callback/', user_accounts_callback, name='user_accounts_callback'),
    path('get_analytics_state_auth/', get_analytics_state_auth, name='get_analytics_state_auth'),
    path('core_vitals/', core_vitals, name='core_vitals'),
    path('core_vitals_advance/', core_vitals_advance, name='core_vitals_advance'),
    path('seo_website_issues/', seo_website_issues, name='seo_website_issues'),
    path('preferences/', preferences, name='preferences'),
    path('charts/', charts, name='charts'),
    path('plan_subscription/', plan_subscription, name='plan_subscription'),
    path('manage_payment_details/', manage_payment_details, name='manage_payment_details'),
    path('seo_ai/', seo_ai, name='seo_ai'),
    path('geo_location/', geo_location, name= 'geo_location'),
    path('project_listview/', project_listview, name='project_listview'),
    path('allowed_crawl_pages/', allowed_crawl_pages, name='allowed_crawl_pages'),
    path('edit_webpages/', edit_webpages, name='edit_webpages'),
    path('edit_selected_links/', edit_selected_links, name='edit_selected_links'),
    path('discover_keywords/', discover_keywords_view, name='discover_keywords_view'),
    path('tools/', tools_view, name='tools_view'),
    path('settings/', settings_view, name='settings_view'),
    path('crawler/', crawler_view, name='crawler_view'),
    path('url_keyword_explorer/', url_keyword_explorer_view, name='url_keyword_explorer_view'),
    path('get_url_keyword_explorer_data/', get_url_keyword_explorer_data, name='get_url_keyword_explorer_data'),
    path('seo_ai_data/', seo_ai_data, name='seo_ai_data'),
    path('plan_details_page/', plan_details_page, name='plan_details_page'),
    path('content_ai/', content_ai, name='content_ai'),
    path('description_ai/', description_ai, name='description_ai'),
    path('ganalytics_page/', ganalytics_page, name='ganalytics_page'),
    # path('alt_text/', alt_text, name='alt_text'),
    path('image_alt_text/', image_alt_text, name='image_alt_text'),
    path('get_text_dict_api/', get_text_dict_api, name='get_text_dict_api')
]
