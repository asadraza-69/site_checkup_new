// backlinks api
var setInt = setInterval(getData, 1000);
var selectedWebsiteId;
function getData() {
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");
  if (selectedWebsiteId != undefined && selectedWebsiteId != "") {
    clearInterval(setInt);
    var selectedURL;
    selectedURL = $(".radio :selected").first().val();
    if (selectedWebsiteId != undefined && selectedURL != undefined) {
      // ajax for rank keywords
      $.ajax({
        method: "GET",
        url: "/site_audit/get_website_json/?project_id=" + selectedWebsiteId,
        success: function (response) {
          var top_keywords = response.keyword_json;
          if (
            response.keyword_json.length === 0 ||
            response.keyword_json.length === ""
          ) {
            $("#keywords-state-link").html(`Learn More`);
          } else {
            $("#keywords-state-link").html(
              `${response.keyword_json.length} total (0 lost)`
            );
          }
          if (response.status) {
            $(".keywords_spinner").html("");
            if (top_keywords !== undefined && top_keywords !== "") {
              var keyword_count = 0;
              $.each(top_keywords, function (i, val) {
                if (val.position > 0 && val.position < 4) {
                  keyword_count++;
                }
              });
              setTimeout(() => {
                $("#keyword_count").html("");
                $("#keyword_count").html(`${keyword_count}`);
              }, 100);
            }
          } else {
            setTimeout(() => {
              $(".keywords_spinner").html("");
              console.log(response.status);
            }, 10000);
          }
        },
      });
      // get backlinjks ajax
      $.ajax({
        method: "GET",
        url:
          "/site_audit/get_backlinks/?website_url=" +
          selectedURL +
          "&project_id=" +
          selectedWebsiteId,

        success: function (response) {
          if (response.status) {
            var crawled_date = response["results"][0]["target"]["last_crawled"];
            var converted_date = new Date(crawled_date).toLocaleString(
              "en-us",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            $(".trigerd").append(`${converted_date}`);
            // alert(converted_date)
            // businussid alert
            $("#sync_google")
              .append(`<div class=" app-alert-list-item  ng-star-inserted">
              <div class="app-icon-box">
              <div class="left">
                <div class="icon alert"><img src="../../static/site_audit/assets/uil_exclamation-circle.svg" alt="uil_exclamation-circle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Sync your Google Business Profile account with Answer
                  Engine for more insights on your local traffic, if you don’t have one let’s get you
                  started.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                                      <div class="value">${converted_date}</div>

                  </div>
                  <div class="revenue1">
                  </div>
                </div>
              </div>
            </div>
          </div>
          `);

            // businussid
            $("#google_business")
              .append(`<div class="card card_list" style={{maxWidth: 540}}>
              <div class="row g-0">
                <div class="col-md-2 arrow-icon">
                  <div class="arrow-bg">
                    <img src="../../static/site_audit/assets/uil_exclamation-circle.svg" class="img-fluid rounded-start" alt="..." />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="card-body">
                    <a class="card-title" href="javascript:void();">Sync your Google Business Profile account with Answer Engine
                      for more insights on your local traffic, if you don’t have one let’s get you
                      started.</a>
                  </div>
                </div>
              </div>
            </div>
            `);
            // youmay alert
            $("#you_may").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
              <div class="left">
                <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javascript:void();">You may have one or more bad backlinks linking to your
                  site. Let’s scan it now.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                     <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  </div>
                </div>
              </div>
            </div>
          </div>

            `);
            // missing backlinks

            $("#missing_back_links")
              .append(`<div class="card card_list" style={{maxWidth: 540}}>
                <div class="row g-0">
                  <div class="col-md-2 arrow-icon">
                    <div class="arrow-bg">
                      <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                    </div>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <a class="card-title" href="javascript:void();">You may have one or more bad backlinks linking to your site.
                        Let’s scan it now.</a>
                    </div>
                  </div>
                </div>
              </div>
              `);
            // bad backlinks
            $("#bad_back_links")
              .append(`<div class="card card_list" style={{maxWidth: 540}}>
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <a class="card-title" href="javascript:void();">You may have some missing backlinks going to incorrect pages.
          Fixing this can increase your Domain Authority.</a>
      </div>
    </div>
  </div>
</div>
`);

            // backlinks percentage start
            if (
              response["results"][0]["target"]["pages_to_root_domain"] !==
                undefined &&
              response["results"][0]["target"]["pages_to_root_domain"] !== "" &&
              response["results"][0]["target"][
                "nofollow_pages_to_root_domain"
              ] !== undefined &&
              response["results"][0]["target"][
                "nofollow_pages_to_root_domain"
              ] !== ""
            ) {
              var total_pages =
                response["results"][0]["target"]["pages_to_root_domain"];
              var total_nofollow =
                response["results"][0]["target"][
                  "nofollow_pages_to_root_domain"
                ];
              var total = total_nofollow / total_pages;
              var noFollow_per = Math.round(total * 100);
              var follow = Math.round(100 - noFollow_per);
              if (noFollow_per < 25) {
                $("#follow_unfollow").html("");
                $("#follow_unfollow").append(`
                <div class=" app-alert-list-item  ng-star-inserted">
                  <div class="app-icon-box">
                    <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
                    <div class="content_alrt"><a class="label" href="javascript:void();">${follow}% of your backlinks are follow and only ${noFollow_per}% are no-follow. Understand why this ratio matters for SEO.</a>
                      <div class="app-alert-summary  c263">
                        <div class="triggered">
                          <div class="label">Triggered</div>
                          <div class="value">${converted_date}</div>
                        </div>
                        <div class="revenue1">
                        
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
                `);
                // for dashboard
                $("#follow_unfollow_dashboard").html("");
                $("#follow_unfollow_dashboard").append(`
                 <div class="card card_list" style={{maxWidth: 540}}>
                  <div class="row g-0">
                    <div class="col-md-2 arrow-icon">
                      <div class="arrow-bg">
                        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div class="card-body">
                        <a class="card-title" >
                                  ${follow}% of your backlinks are follow and only ${noFollow_per}% are no-follow. Understand why this ratio matters for SEO.
                        
                        </a>
                      </div>
                    </div>
                  </div>
                </div>


                `);
              } else {
                $("#follow_unfollow").html("");
              }
            }

            if (noFollow_per < 50) {
              if (
                response["results"][0]["target"]["pages_to_root_domain"] !==
                  undefined &&
                response["results"][0]["target"]["pages_to_root_domain"] !== ""
              ) {
                var total_backlinks =
                  response["results"][0]["target"][
                    "external_pages_to_root_domain"
                  ];
                var other_backinks =
                  response["results"][0]["target"][
                    "nofollow_pages_to_root_domain"
                  ];
                var newPages =
                  response["results"][0]["target"][
                    "external_redirect_pages_to_page"
                  ];

                $(".loader").hide();
                $("#total_back_links").html("");
                $("#total_back_links").append(`
       <div class="app-alert-list-item  ng-star-inserted">
       <div class="app-icon-box">
               <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Out of ${total_backlinks} total backlinks, you only have ${other_backinks} different referring IPs (domains/websites) linking to your website. This can negatively affect your Google rankings.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
                //  total backlinks
                $(".backlinks_spinner").html("");

                $("#backlinks-state-link").append(
                  total_backlinks + "( Total " + newPages + " new)"
                );
                $("#total_back_links_dashboard").html("");
                $("#total_back_links_dashboard").append(`
          <div class="card card_list" style={{maxWidth: 540}}>
            <div class="row g-0">
              <div class="col-md-2 arrow-icon">
                <div class="arrow-bg">
                  <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                </div>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <a class="card-title" >  of ${total_backlinks} total backlinks, you only have ${other_backinks} different referring IPs (domains/websites) linking to your website. This can negatively affect your Google rankings.</a>
                </div>
              </div>
            </div>
          </div>

          
         `);
              } else {
                $("#domain_authority").html("");
                $("#total_back_links_dashboard").html("");
              }
            }
            // backlinks percentage end
            if (
              response["results"][0]["target"]["domain_authority"] !==
                undefined &&
              response["results"][0]["target"]["domain_authority"] !== ""
            ) {
              var domain_authority =
                response["results"][0]["target"]["domain_authority"];

              $(".domain-authority-spinner").html("");
              if (domain_authority <= 15) {
                $("#domain-authority-state").html(
                  `${domain_authority}/100 - Good`
                );
                // $("#domain-authority-state").addClass("text-success");
                // $("#d_a").addClass("text-success");
              } else if (domain_authority >= 16 && domain_authority <= 50) {
                $("#domain-authority-state").html(
                  `${domain_authority}/100 - Stable`
                );
                $("#domain-authority").addClass("warning");
                $("#domain-authority-state").addClass("text-warning");
                $("#d_a").addClass("text-warning");
              } else {
                $("#domain-authority-state").html(
                  `${domain_authority}/100 - Poor`
                );
                $("#domain-authority").addClass("danger");
                $("#domain-authority-state").addClass("text-danger");
                $("#d_a").addClass("text-danger");
              }
              $(".loader").hide();
              $("#domain_authority").html("");
              $("#domain_authority").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
              <div class="left">
                <div class="icon alert"><img src="../../static/site_audit/assets/uil_exclamation-circle.svg" alt="uil_exclamation-circle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Your Moz Domain Authority is ${domain_authority}. This is a key factor in
                  organic rankings.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
              //  domain authority dashboard
              $("#doamin_authority_dashboard").html("");
              $("#doamin_authority_dashboard").append(`
      <div class="card card_list" style={{maxWidth: 540}}>
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <a class="card-title"> Your Moz Domain Authority is ${domain_authority}. This is a key factor in
                  organic rankings.</a>
      </div>
    </div>
  </div>
</div>

      
      
    `);
            } else {
              setTimeout(() => {
                $(".domain-authority-spinner").html("Not found");
              }, 10000);

              $("#domain_authority").html("");
              $("#doamin_authority_dashboard").html("");
            }
            // keywords percentage end
            if (
              response["results"][0]["target"]["domain_authority"] !==
                undefined &&
              response["results"][0]["target"]["domain_authority"] !== ""
            ) {
              var domain_authority =
                response["results"][0]["target"]["domain_authority"];

              $(".loader").hide();
              $("#keywords_rank").html("");
              $("#keywords_rank").append(`
       <div class="app-alert-list-item  ng-star-inserted">
       <div class="app-icon-box">
               <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt" >
                <a class="label" href="javaScript:void();">You have <span id="keyword_count">0</span> keyword(s) that you are almost ranking in the top 3 for. Here is how to get to number 1.</a>

                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
              //  keyword dashboard
              $("#keywords_rank_dashboard").html("");
              $("#keywords_rank_dashboard").append(`
          <div class="card card_list" style={{maxWidth: 540}}>
            <div class="row g-0">
              <div class="col-md-2 arrow-icon">
                <div class="arrow-bg">
                  <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                </div>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <a class="card-title" > You have 13 keyword(s) that you are almost ranking in the top 3 for. Here is how to get to number 1.</a>
                </div>
              </div>
            </div>
          </div>

          
          
         `);
            } else {
              setTimeout(() => {
                $(".domain-authority-spinner").html("Not found");
              }, 10000);

              $("#domain_authority").html("");
              $("#keywords_rank_dashboard").html("");
            }
            // total backli ks
            // keywords percentage end
            // total weblinks start
            if (
              response.previous_results !== undefined &&
              response.previous_results !== ""
            ) {
              var previous_backinks =
                response["previous_results"][0]["target"][
                  "nofollow_pages_to_root_domain"
                ];
              var total_backlinks =
                response["results"][0]["target"][
                  "external_pages_to_root_domain"
                ];

              var new_backlinks = total_backlinks - previous_backinks;

              if (new_backlinks > 0) {
                $("#new_links").html("");
                $("#new_links").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
               <div class="left">
                      <div class="icon success"><img src="../../static/site_audit/assets/check-circle-32.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">This month we found ${new_backlinks} new websites that are linking to your website.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
                //  dashboard
                //   $('#new_links_dashboard').html("");
                //       $('#new_links_dashboard').append(`
                //          <div class="card card_list" style={{maxWidth: 540}}>
                //       <div class="row g-0">
                //         <div class="col-md-2 arrow-icon">
                //           <div class="arrow-bg">
                //             <div class="icon success"><img src="../../static/site_audit/assets/check-circle-32.svg" alt="uil_exclamation-triangle icon" /></div>

                //           </div>
                //         </div>
                //         <div class="col-md-10">
                //           <div class="card-body">
                //             <a class="card-title" > This month we found ${new_backlinks} new websites that are linking to your website.</a>
                //           </div>
                //         </div>
                //       </div>
                //     </div>

                //  `);
                // total weblinks end
              } else {
                var test = $(".alert_card .counter").text();
              }
            }

            var alert_length = 0;
            alert_length = $(".alert_card .card-body a.card-title").length;
            $(".alert_card .counter").html(`${alert_length}`);
          } else {
            setTimeout(() => {
              $(".backlinks_spinner").html("Not found");
            }, 10000);

            $(".loader").hide();
            console.log(response.error);
          }
          // <====================================================> objectives
        },
      });
    }
  }
}

$(".radio").on("change", function () {
  $(".loader").show();
  $("#sync_google").html("");
  $("#you_may").html("");
  $("#keywords_rank").html("");
  $("#total_back_links").html("");
  $("#follow_unfollow").html("");
  $("#domain_authority").html("");
  $("#new_links").html("");

  selectedWebsiteId = $(".radio :selected").first().attr("data-id");

  $.ajax({
    method: "GET",
    url: "/site_audit/get_website_json/?project_id=" + selectedWebsiteId,
    success: function (response) {
      var top_keywords = response.keyword_json;
      if (
        response.keyword_json.length === 0 ||
        response.keyword_json.length === ""
      ) {
        $("#keywords-state-link").html(`Learn More`);
      } else {
        $("#keywords-state-link").html(
          `${response.keyword_json.length} total (0 lost)`
        );
      }
      if (response.status) {
        $(".keywords_spinner").html("");
        if (top_keywords !== undefined && top_keywords !== "") {
          var keyword_count = 0;
          $.each(top_keywords, function (i, val) {
            if (val.position > 0 && val.position < 4) {
              keyword_count++;
            }
          });
          setTimeout(() => {
            $("#keyword_count").html("");
            $("#keyword_count").html(`${keyword_count}`);
          }, 100);
        }
      } else {
        setTimeout(() => {
          $(".keywords_spinner").html("");
          console.log(response.status);
        }, 10000);
      }
    },
  });
  selectedURL = $(this).first().val();
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");

  $.ajax({
    method: "GET",
    url:
      "/site_audit/get_backlinks/?website_url=" +
      selectedURL +
      "&project_id=" +
      selectedWebsiteId,

    success: function (response) {
      // $(".loader").hide();
      $("#sync_google").html("");
      if (response.status) {
        var crawled_date = response["results"][0]["target"]["last_crawled"];
        var converted_date = new Date(crawled_date).toLocaleString("en-us", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        $(".trigerd").append(`${converted_date}`);
        // alert(converted_date)
        // businussid alert
        $("#sync_google").html("");
        $("#sync_google")
          .append(`<div class=" app-alert-list-item  ng-star-inserted">
              <div class="app-icon-box">
              <div class="left">
                <div class="icon alert"><img src="../../static/site_audit/assets/uil_exclamation-circle.svg" alt="uil_exclamation-circle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Sync your Google Business Profile account with Answer
                  Engine for more insights on your local traffic, if you don’t have one let’s get you
                  started.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                                      <div class="value">${converted_date}</div>

                  </div>
                  <div class="revenue1">
                  </div>
                </div>
              </div>
            </div>
          </div>
          `);

        // businussid
        $("#google_business")
          .append(`<div class="card card_list" style={{maxWidth: 540}}>
              <div class="row g-0">
                <div class="col-md-2 arrow-icon">
                  <div class="arrow-bg">
                    <img src="../../static/site_audit/assets/uil_exclamation-circle.svg" class="img-fluid rounded-start" alt="..." />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="card-body">
                    <a class="card-title" href="javascript:void();">Sync your Google Business Profile account with Answer Engine
                      for more insights on your local traffic, if you don’t have one let’s get you
                      started.</a>
                  </div>
                </div>
              </div>
            </div>
            `);
        // youmay alert
        $("#you_may").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
              <div class="left">
                <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javascript:void();">You may have one or more bad backlinks linking to your
                  site. Let’s scan it now.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                     <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  </div>
                </div>
              </div>
            </div>
          </div>

            `);
        // missing backlinks

        $("#missing_back_links")
          .append(`<div class="card card_list" style={{maxWidth: 540}}>
                <div class="row g-0">
                  <div class="col-md-2 arrow-icon">
                    <div class="arrow-bg">
                      <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                    </div>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <a class="card-title" href="javascript:void();">You may have one or more bad backlinks linking to your site.
                        Let’s scan it now.</a>
                    </div>
                  </div>
                </div>
              </div>
              `);
        // bad backlinks
        $("#bad_back_links")
          .append(`<div class="card card_list" style={{maxWidth: 540}}>
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <a class="card-title" href="javascript:void();">You may have some missing backlinks going to incorrect pages.
          Fixing this can increase your Domain Authority.</a>
      </div>
    </div>
  </div>
</div>
`);

        // backlinks percentage start
        if (
          response["results"][0]["target"]["pages_to_root_domain"] !==
            undefined &&
          response["results"][0]["target"]["pages_to_root_domain"] !== "" &&
          response["results"][0]["target"]["nofollow_pages_to_root_domain"] !==
            undefined &&
          response["results"][0]["target"]["nofollow_pages_to_root_domain"] !==
            ""
        ) {
          var total_pages =
            response["results"][0]["target"]["pages_to_root_domain"];
          var total_nofollow =
            response["results"][0]["target"]["nofollow_pages_to_root_domain"];
          var total = total_nofollow / total_pages;
          var noFollow_per = Math.round(total * 100);
          var follow = Math.round(100 - noFollow_per);
          if (noFollow_per < 25) {
            $("#follow_unfollow").html("");
            $("#follow_unfollow").append(`
                <div class=" app-alert-list-item  ng-star-inserted">
                  <div class="app-icon-box">
                    <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
                    <div class="content_alrt"><a class="label" href="javascript:void();">${follow}% of your backlinks are follow and only ${noFollow_per}% are no-follow. Understand why this ratio matters for SEO.</a>
                      <div class="app-alert-summary  c263">
                        <div class="triggered">
                          <div class="label">Triggered</div>
                          <div class="value">${converted_date}</div>
                        </div>
                        <div class="revenue1">
                        
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
                `);
            // for dashboard
            $("#follow_unfollow_dashboard").html("");
            $("#follow_unfollow_dashboard").append(`
                 <div class="card card_list" style={{maxWidth: 540}}>
                  <div class="row g-0">
                    <div class="col-md-2 arrow-icon">
                      <div class="arrow-bg">
                        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div class="card-body">
                        <a class="card-title" >
                                  ${follow}% of your backlinks are follow and only ${noFollow_per}% are no-follow. Understand why this ratio matters for SEO.
                        
                        </a>
                      </div>
                    </div>
                  </div>
                </div>


                `);
          } else {
            $("#follow_unfollow").html("");
          }
        }

        if (noFollow_per < 50) {
          if (
            response["results"][0]["target"]["pages_to_root_domain"] !==
              undefined &&
            response["results"][0]["target"]["pages_to_root_domain"] !== ""
          ) {
            var total_backlinks =
              response["results"][0]["target"]["external_pages_to_root_domain"];
            var other_backinks =
              response["results"][0]["target"]["nofollow_pages_to_root_domain"];
            var newPages =
              response["results"][0]["target"][
                "external_redirect_pages_to_page"
              ];

            $(".loader").hide();
            $("#total_back_links").html("");
            $("#total_back_links").append(`
       <div class="app-alert-list-item  ng-star-inserted">
       <div class="app-icon-box">
               <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Out of ${total_backlinks} total backlinks, you only have ${other_backinks} different referring IPs (domains/websites) linking to your website. This can negatively affect your Google rankings.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
            //  total backlinks
            $(".backlinks_spinner").html("");

            $("#backlinks-state-link").append(
              total_backlinks + "( Total " + newPages + " new)"
            );
            $("#total_back_links_dashboard").html("");
            $("#total_back_links_dashboard").append(`
          <div class="card card_list" style={{maxWidth: 540}}>
            <div class="row g-0">
              <div class="col-md-2 arrow-icon">
                <div class="arrow-bg">
                  <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                </div>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <a class="card-title" >  of ${total_backlinks} total backlinks, you only have ${other_backinks} different referring IPs (domains/websites) linking to your website. This can negatively affect your Google rankings.</a>
                </div>
              </div>
            </div>
          </div>

          
         `);
          } else {
            $("#domain_authority").html("");
            $("#total_back_links_dashboard").html("");
          }
        }
        // backlinks percentage end
        if (
          response["results"][0]["target"]["domain_authority"] !== undefined &&
          response["results"][0]["target"]["domain_authority"] !== ""
        ) {
          var domain_authority =
            response["results"][0]["target"]["domain_authority"];

          $(".domain-authority-spinner").html("");
          if (domain_authority <= 15) {
            $("#domain-authority-state").html(`${domain_authority}/100 - Good`);
            // $("#domain-authority-state").addClass("text-success");
            // $("#d_a").addClass("text-success");
          } else if (domain_authority >= 16 && domain_authority <= 50) {
            $("#domain-authority-state").html(
              `${domain_authority}/100 - Stable`
            );
            $("#domain-authority").addClass("warning");
            $("#domain-authority-state").addClass("text-warning");
            $("#d_a").addClass("text-warning");
          } else {
            $("#domain-authority-state").html(`${domain_authority}/100 - Poor`);
            $("#domain-authority").addClass("danger");
            $("#domain-authority-state").addClass("text-danger");
            $("#d_a").addClass("text-danger");
          }
          $(".loader").hide();
          $("#domain_authority").html("");
          $("#domain_authority").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
              <div class="left">
                <div class="icon alert"><img src="../../static/site_audit/assets/uil_exclamation-circle.svg" alt="uil_exclamation-circle icon" /></div>
              </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">Your Moz Domain Authority is ${domain_authority}. This is a key factor in
                  organic rankings.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
          //  domain authority dashboard
          $("#doamin_authority_dashboard").html("");
          $("#doamin_authority_dashboard").append(`
      <div class="card card_list" style={{maxWidth: 540}}>
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <a class="card-title"> Your Moz Domain Authority is ${domain_authority}. This is a key factor in
                  organic rankings.</a>
      </div>
    </div>
  </div>
</div>

      
      
    `);
        } else {
          setTimeout(() => {
            $(".domain-authority-spinner").html("Not found");
          }, 10000);

          $("#domain_authority").html("");
          $("#doamin_authority_dashboard").html("");
        }
        // keywords percentage end
        if (
          response["results"][0]["target"]["domain_authority"] !== undefined &&
          response["results"][0]["target"]["domain_authority"] !== ""
        ) {
          var domain_authority =
            response["results"][0]["target"]["domain_authority"];

          $(".loader").hide();
          $("#keywords_rank").html("");
          $("#keywords_rank").append(`
       <div class="app-alert-list-item  ng-star-inserted">
       <div class="app-icon-box">
               <div class="left">
                      <div class="icon warning"><img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt" >
                <a class="label" href="javaScript:void();">You have <span id="keyword_count">0</span> keyword(s) that you are almost ranking in the top 3 for. Here is how to get to number 1.</a>

                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
          //  keyword dashboard
          $("#keywords_rank_dashboard").html("");
          $("#keywords_rank_dashboard").append(`
          <div class="card card_list" style={{maxWidth: 540}}>
            <div class="row g-0">
              <div class="col-md-2 arrow-icon">
                <div class="arrow-bg">
                  <img src="../../static/site_audit/assets/uil_exclamation-triangle.svg" class="img-fluid rounded-start" alt="..." />
                </div>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <a class="card-title" > You have 13 keyword(s) that you are almost ranking in the top 3 for. Here is how to get to number 1.</a>
                </div>
              </div>
            </div>
          </div>

          
          
         `);
        } else {
          setTimeout(() => {
            $(".domain-authority-spinner").html("Not found");
          }, 10000);

          $("#domain_authority").html("");
          $("#keywords_rank_dashboard").html("");
        }
        // total backli ks
        // keywords percentage end
        // total weblinks start
        if (
          response.previous_results !== undefined &&
          response.previous_results !== ""
        ) {
          var previous_backinks =
            response["previous_results"][0]["target"][
              "nofollow_pages_to_root_domain"
            ];
          var total_backlinks =
            response["results"][0]["target"]["external_pages_to_root_domain"];

          var new_backlinks = total_backlinks - previous_backinks;

          if (new_backlinks > 0) {
            $("#new_links").html("");
            $("#new_links").append(`
            <div class="app-alert-list-item  ng-star-inserted">
            <div class="app-icon-box">
               <div class="left">
                      <div class="icon success"><img src="../../static/site_audit/assets/check-circle-32.svg" alt="uil_exclamation-triangle icon" /></div>
                    
                    </div>
              <div class="content_alrt"><a class="label" href="javacript:void();">This month we found ${new_backlinks} new websites that are linking to your website.</a>
                <div class="app-alert-summary  c263">
                  <div class="triggered">
                    <div class="label">Triggered</div>
                    <div class="value">${converted_date}</div>
                  </div>
                  <div class="revenue1">
                  
                  </div>
                </div>
              
              </div>
            </div>
            </div>
       `);
            //  dashboard
            //   $('#new_links_dashboard').html("");
            //       $('#new_links_dashboard').append(`
            //          <div class="card card_list" style={{maxWidth: 540}}>
            //       <div class="row g-0">
            //         <div class="col-md-2 arrow-icon">
            //           <div class="arrow-bg">
            //             <div class="icon success"><img src="../../static/site_audit/assets/check-circle-32.svg" alt="uil_exclamation-triangle icon" /></div>

            //           </div>
            //         </div>
            //         <div class="col-md-10">
            //           <div class="card-body">
            //             <a class="card-title" > This month we found ${new_backlinks} new websites that are linking to your website.</a>
            //           </div>
            //         </div>
            //       </div>
            //     </div>

            //  `);
            // total weblinks end
          } else {
            var test = $(".alert_card .counter").text();
          }
        }

        var alert_length = 0;
        alert_length = $(".alert_card .card-body a.card-title").length;
        $(".alert_card .counter").html(`${alert_length}`);
      } else {
        setTimeout(() => {
          $(".backlinks_spinner").html("Not found");
        }, 10000);

        $(".loader").hide();
        console.log(response.error);
      }
      // <====================================================> objectives
    },
  });
});

// add analytics btn
$(".gogle-btnn").on("click", function () {
  $(".google_spinnerr").css("opacity", "1");
  var project_id = $(".radio :selected").first().attr("data-id");
  const perm_url =
    window.location.origin +
    "/site_audit/get_auth_url/?project_id=" +
    project_id;
  $.ajax({
    method: "GET",
    url: perm_url,
    success: function (response) {
      if (response.status) {
        $(".google_spinnerr").hide();

        let auth_url = response.auth_url;
        window.location.href = auth_url;
      } else {
        ShowNoty("Somthing went wrong", "error");

        $(".google_spinnerr").hide();
      }
    },
  });
});
