// replace function
function replace_fun(e) {
  return e.replace("ms", "").replace("s", "").replace(",", "");
}

// score variables start
const goodScore = "Good";
const goodColor = "#00ac45";
const improvementScore = "Needs Improvement";
const improvementColor = "rgba(251, 124, 56)";
const poorScore = "Poor";
const poorColor = "rgba(207, 19, 34)";
const goodIconColor = "#e1f3e8";
const warnIconColor = "#fff2eb";
const poorIconColor = "#f6e3e4";

// score variables end
// ranges start
//  SI
const speedIndex_lowerRange = 0;
const speedIndex_middleRange = 3.4;
const speedIndex_upperRange = 5.8;
// SI ids start
const si_status = $("#si_status");
const si_infoIconBackground = $("#si_info-icon--background");
const si_heading = $("#si_heading");
const tooltipTitle_si = $("#tooltipTitle_si");
const improvementStateSi = $("#improvement-state-si");
const speedIndexID = $("#speedIndex");
// SI ids end
// TBT
const tbt_lowerRange = 0;
const tbt_middleRange = 200;
const tbt_upperRange = 600;
// tbt ids start
const tbt_status = $("#tbt_status");
const tbt_infoIconBackground = $("#tbt_info-icon--background");
const tbt_heading = $("#tbt_heading");
const tooltipTitle_tbt = $("#tooltipTitle_tbt");
const improvementStateTbt = $("#improvement-state-tbt");
// tbt ids end
// lcp
const lcp_lowerRange = 0;
const lcp_middleRange = 2500;
const lcp_upperRange = 4000;
// lcp ids start
const lcp_status = $("#lcp_status");
const lcp_infoIconBackground = $("#lcp_info-icon--background");
const lcp_heading = $("#lcp_heading");
const tooltipTitle_lcp = $("#tooltipTitle_lcp");
const improvementStateLcp = $("#improvement-state-lcp");
// lcp ids end
// cls
const cls_lowerRange = 0;
const cls_middleRange = 0.1;
const cls_upperRange = 0.25;
// cls ids start
const cls_status = $("#cls_status");
const cls_infoIconBackground = $("#cls_info-icon--background");
const cls_heading = $("#cls_heading");
const tooltipTitle_cls = $("#tooltipTitle_cls");
const improvementStateCls = $("#improvement-state-cls");
// cls ids end
// fcp
const fcp_lowerRange = 0;
const fcp_middleRange = 1.8;
const fcp_upperRange = 3.0;
// fcpids start
const fcp_status = $("#fcp_status");
const fcp_infoIconBackground = $("#fcp_info-icon--background");
const fcp_heading = $("#fcp_heading");
const tooltipTitle_fcp = $("#tooltipTitle_fcp");
const improvementStateFcp = $("#improvement-state-fcp");
// fcp ids end
//  TTI
const tti_lowerRange = 0;
const tti_middleRange = 3.4;
const tti_upperRange = 7.3;
// tti ids start
const tti_status = $("#tti_status");
const tti_infoIconBackground = $("#tti_info-icon--background");
const tti_heading = $("#tti_heading");
const tooltipTitle_tti = $("#tooltipTitle_tti");
const improvementStateTti = $("#improvement-state-tti");
// tti ids end
// ranges end
// otherIDS
const mobile_speed_state = $("#mobile-speed-state")
const si =  $("#si");
const tbt = $("#tbt");
const lcp = $("#lcp");
const cls = $("#cls");
const fcp = $("#fcp");
const tti = $("#tti");
// corevitals ids
const  coreVitalLoader =  $("#coreVitalLoader");
const  coreVital_1 =  $(".coreVital_1");
const  coreVital_2 =   $("#coreVital_2");
// status ids
const passStatus = $("#passStatus");
const warnStatus = $("#warnStatus");
const failStatus = $("#failStatus");
// chart ids
const strongclass =  $(".strong");
const si_status_overview =  $("#si_status_overview");
const chartClass =    $(".circle");
const chartOverview =   $(".overview");
// website health card state
const   sitemapState =   $("#sitemap-state");
const   spf_spinner =   $(".spf_spinner");
const   SPFState =  $("#SPF-state");
// google analytics
const  Yesterday =  $("#Yesterday");
const  Week =   $("#Week");
const  Month = $("#Month")

// main functions get sitedata start
function getSiteData(){
    var url =  $(".radio :selected").val();

  $.ajax({
    method: "GET",
    url: "/site_audit/get_site_live_data/?url=" + url,
    //  url:'http://127.0.0.1:8000/site_audit/get_site_data/?project_id=1',

    success: function (response) {
        
      if (response.status) {
           var resposnseMobileData = "";
        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
        }
        var finalUrl = "";
        if (resposnseMobileData.lighthouseResult != undefined) {
          finalUrl = resposnseMobileData.lighthouseResult.finalUrl;
        }
        // for ssl certificate
        var ssl_certificate = '';
       
        if (resposnseMobileData.lighthouseResult != undefined) {
          ssl_certificate = resposnseMobileData.lighthouseResult.audits['is-on-https']['score'];
         
        }
       
      
        $(".loader").html("");

        // corevitals
        var resposnseMobileData = "";

        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
          $('.p_spinner_cls').show();
           $('.p_spinner').hide();
          // $(mobile_speed_state).html("");
          var speedIndex =
            response.response_mobile.all_data["lighthouseResult"]["audits"][
              "speed-index"
            ]["displayValue"];

          var totalBlockTime =
            resposnseMobileData["lighthouseResult"]["audits"][
              "total-blocking-time"
            ].displayValue;
          var largestContenFullPaint =
            resposnseMobileData["lighthouseResult"]["audits"][
              "largest-contentful-paint"
            ].displayValue;
          var cumulativeLayoutShift =
            resposnseMobileData["lighthouseResult"]["audits"][
              "cumulative-layout-shift"
            ].displayValue;
          var firstcontentfulpaint =
            resposnseMobileData["lighthouseResult"]["audits"][
              "first-contentful-paint"
            ].displayValue;
          var interactive =
            resposnseMobileData["lighthouseResult"]["audits"]["interactive"]
              .displayValue;
          var passCount = 0;
          var warnCount = 0;
          var failCount = 0;
          //
          speedIndex = replace_fun(speedIndex);
          var si_convertedValue = speedIndex * 1000;
          largestContenFullPaint = replace_fun(largestContenFullPaint);
          var lcp_convertedValue = largestContenFullPaint * 1000;
          firstcontentfulpaint = replace_fun(firstcontentfulpaint);
          var fcp_convertedValue = parseFloat(firstcontentfulpaint) * 1000;
          interactive = replace_fun(interactive);
          var tti_convertedValue = interactive * 1000;
          totalBlockTime = replace_fun(totalBlockTime);
          //


          var data = {
            TBT: {
              upperRange: 600,
              lowerRange: 200,
              name: "Total Blocking Time",
              convertedValue: Number(totalBlockTime),
            },
            LCP: {
              upperRange: 2500,
              lowerRange: 4000,
              name: "Largest Contentful Paint",
              convertedValue: lcp_convertedValue,
            },
            CLS: {
              upperRange: 100,
              lowerRange: 250,
              name: "Cumulative Layout Shift",
              convertedValue: Number(Math.round(cumulativeLayoutShift)),
            },
            FCP: {
              upperRange: 1800,
              lowerRange: 3000,
              name: "First Contentful Paint",
              convertedValue: fcp_convertedValue,
            },
            SI: {
              upperRange: 3400,
              lowerRange: 5800,
              name: "Speed Index",
              convertedValue: si_convertedValue,
            },
            TTI: {
              upperRange: 3800,
              lowerRange: 7300,
              name: "Time to Interact",
              convertedValue: tti_convertedValue,
            },
          };
        
          $.each(data, function (i, val) {
            var offSet =
              (100 * val.convertedValue) /
              (2 * val.lowerRange + (val.upperRange - val.lowerRange));
            $(".indicator_" + i).css(
              "left",
              offSet >= 100 ? "98%" : offSet <= 0 ? "1%" : `${offSet}%`
            );

            $(".percentage_" + i).html(
             
              offSet >= 100 ? "98%" : offSet.toFixed(1) <= 0 ? "1%" : `${offSet.toFixed(1)}%`
            );

          
          });
          // more details doughnuts chart
       
          var xValues = [
            "Total Blocking Time (TBT)",
            "Largest Contentful Paint (LCP) ",
            "Cumulative Layout Shift (CLS)",
            "First Contentful Paint (FCP)",
            "Speed Index (SI)",
            "Time to Interact (TTI",
          ];
          // total block = #b37feb
          // largest contentful paint = #ffd666
          // cumulative = #adc6ff
          // first content = #bae637
          // speed index = #40a9ff
          // time to interact = #5cdbd3
          var yValues = [30, 25, 15, 10, 10, 10];
          var barColors = [
            "#eb4335",
            "#ffc107",
            "#ff6843",
            "#23c723",
            "#167ee6",
            "#707070",
          ];


          new Chart("mainChart", {
            //   startAngle: -400.55,
            type: "doughnut",
            borderWidth: 20,

            data: {
              labels: xValues,
              datasets: [
                {
                  backgroundColor: barColors,
                  data: yValues,
                },
              ],
            },
            options: {
              legend: {
                display: false
              },
              responsive:true,
              aspectRatio: 1,
              rotation: 40,
            },
          });

          $(coreVitalLoader).html("");

          $(coreVital_1).css("display", "block");
          $(coreVital_2).html(` <div class="tablediv">
                            <ul class="list-group list-group-flush">
                                 <li class="list-group-item">Results :</li>
                                <li class="list-group-item c253">
                                    ${passCount} test <img class="testIcon"
                                        src="../../static/site_audit/assets/check-circle.svg" alt="">
                                    <br />

                                    <span class="good">Good</span>
                                </li>
                      
                                <li class="list-group-item c253"> ${warnCount} tests <img class="testIcon"
                                        src="../../static/site_audit/assets/uil_exclamation-circle.svg"
                                        alt="">
                                    <br />

                                    <span class="needsImp">Needs Improvement</span>
                                </li>
                                <li class="list-group-item c253"> ${failCount} tests <img class="testIcon"
                                        src="../../static/site_audit/assets/close-circle.svg" alt="">
                                    <br />
                                    <span class="poor">Poor</span>
                                </li>

                            </ul>
                        </div>`);
          $(passStatus).append(`${passCount}`);
          $(warnStatus).append(`${warnCount}`);
          $(failStatus).append(`${failCount}`);
        } else {
          setTimeout(() => {
            $(".mobile_speed_spinner").html("not found");
          }, 1000);

          console.log(response.error);
        }

        var resposnseMobileData = "";

        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
          var performance =
            response.response_mobile.all_data["lighthouseResult"]["categories"][
              "performance"
            ]["score"];
                    // website rank mobile chart start
                      $('.mobile_loader').html('')
        var mobile =  performance*100
              var mobile_grade = '';
    var mobile_color = '';
   if(mobile <= 30){
       mobile_grade = 'C-'
       mobile_color = "#d35c48"
   }else if(mobile > 30 && mobile <= 60){
      mobile_grade = 'B-'
      mobile_color = "#ebb658"

   }else if(mobile >= 60){
       mobile_grade = 'A'
       mobile_color =  "#28a745"

   }
   var mobileScore = '';
    if(mobile >= 100){
        mobileScore = 100
    }else{
       mobileScore = mobile;
    }


       $('#mobile_score_').text(mobile_grade)

//      new Chart(document.getElementsByclass('mobile'), {
//         type: 'doughnut',
//         animation: {
//             animateScale: true
//         },
//         data: {
         
//             datasets: [{
              
//                              data: [mobileScore,100-mobileScore],

//                 backgroundColor: [
//                   mobile_color

//                 ]
//             }]
//         },
//         options: {
//             cutoutPercentage: 70,
//             elements: {
//                 center: {
//                     text: mobile_grade
//                 }
//             },
//             responsive: true,
//             legend: false,
//  tooltips: {
//        enabled: false
//   },
//         },
       
//     });

        
          $('#overview_spinner').hide();
          $('#strong').show()
          var progressBarOptions = {
            startAngle: -400.55,
            size: 100,
            thickness: 15,
            value: performance,
            fill: {
              color: color,
               filter: 'drop-shadow(0 2px 7px rgba(0,172,69,.45));'
            },
          };
          $(chartClass).circleProgress(progressBarOptions).on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                if (stepValue >= 1) {
                  stepValue = 100;
                  $(this).find(".strong").text(stepValue);
                } else {
                  $(this)
                    .find(".strong")
                    .text(String(stepValue.toFixed(2)).substr(2));
                }
              }
            );
          var progressBarOptions = {
            startAngle: -400.55,
            size: 30,
            thickness: 10,
            value: performance,
            fill: {
              color: color,
             
            },
          };
          $(chartOverview)
            .circleProgress(progressBarOptions)
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                $("#strong").text(String(stepValue.toFixed(2)).substr(2));
              }
            );
          // core vital
          if (performance*100 >= 90) {
            $(mobile_speed_state).append(
              performance*100,
              `/ 100 -
              <br/>

              Good`
            );
            $(".issue").append(
              `Hooray! Only 9% of the websites we have tested score as high as you.`
            );
            $(".issue_p").append(
              `No improvements are necessary on Core Vitals.`
            );

            $("#si_info-icon--background").css("color", "#00ac45");
            $("#si_info-icon--background").css("background", "#e1f3e8");
          } else if (
            performance*100 >= 50 &&
            performance*100 <= 89
          ) {
            $(".issue").append(
              `We found some serious issues you may want to take a closer look at.`
            );
            $(".issue_p").append(
              `To put it in context, about 53% of the websites we test score as Poor.`
            );

            $(mobile_speed_state).append(
              performance*100,
              `/100 - 
              <br/>
              
              Stabl`
            );

            $("#mobile-speed").addClass("warning");

            $("#si_info-icon--background").css("color", "rgba(251, 124, 56)");
            $("#si_info-icon--background").css("background", "#fff2eb");
          } else if (
            performance*100 >= 0 &&
            performance*100 <= 49
          ) {
            $(".issue").append(
              `We found some serious issues you may want to take a closer look at.`
            );
            $(".issue_p").append(
              `To put it in context, about 53% of the websites we test score as Poor.`
            );
            $(mobile_speed_state).append(
              performance*100,
              `/100 - 
              <br/>
              Poor`
            );
            $("#mobile-speed").addClass("danger");
            $("#si_info-icon--background").css("color", "rgba(207, 19, 34)");
            $("#si_info-icon--background").css("background", "#f6e3e4");
          }
          var p_ = performance * 100;
          if (p_ >= 0 && p_ <= 49) {
            $("#domain-title").html("");
            $("#mobile").addClass("text-danger");
            $(mobile_speed_state).addClass("text-danger");
            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                   is categorized as POOR in <span id="failStatus">${failCount}</span> out of 6
                                    Core
                                    Vitals tests`);
          } else if (p_ >= 50 && p_ <= 89) {
            $("#domain-title").html("");
            $("#mobile").addClass("text-warning");
            $(mobile_speed_state).addClass("text-warning");

            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                    is categorized as NEEDS IMPROVEMENT in <span class="status-counts" id="warnStatus">${warnCount}</span> out of 6
                                    Core
                                    Vitals tests`);
          } else if (p_ >= 90) {
            $("#domain-title").html("");

            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                   passes all six of the Core Vitals tests. Congratulations! We will alert you if we detect any issues in the future.`);
          }
        }
        if (response.page_data_dict.site_map_url != undefined) {
          responseSitemap = response.page_data_dict.site_map_url;
          $(".site_map_spinner").html("");
          $(sitemapState).text("Detected");
        } else {
          $(".site_map_spinner").html("");

          $(sitemapState).text("Not Detected");
        }
        var resposnsewebsite_seo_data = "";
        if (response.website_seo_data != undefined) {
          resposnsewebsite_seo_data = response.website_seo_data;

          var spf_record = resposnsewebsite_seo_data["output"]["spf_record"];
          if (spf_record !== null || spf_record !== undefined) {
            $(spf_spinner).html("");

            $("#SPF-state").text("ok");
            $("#SPF-state").css("color", "#1166f1");
          } else {
            $("#SPF").addClass("sub-item-error");
            $("#SPF-state").text("No SPF record found");
            $("#SPF-state").css("color", "#ffd9d9");
          }
        }

        var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        var resposnseMobileData = "";
        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
        }
        var finalUrl = "";
        if (resposnseMobileData.lighthouseResult != undefined) {
          finalUrl = resposnseMobileData.lighthouseResult.finalUrl;
        }
        // for ssl certificate
        var ssl_certificate = '';
       
        if (resposnseMobileData.lighthouseResult != undefined) {
          ssl_certificate = resposnseMobileData.lighthouseResult.audits['is-on-https']['score'];
         
        }
       
        ssl_certificate = ssl_certificate*100
        if(ssl_certificate >= 50 && ssl_certificate < 90){
          $('.ssl_loader').html('')
          $('#ssl-state').html('Expiring Soon')
           $('#ssl-state').css('color','rgb(244, 154, 0)')
           $('#ssl').css('background','rgb(244, 154, 0)')

        }else if(ssl_certificate >= 0 && ssl_certificate < 49){
          $('.ssl_loader').html('')

          $('#ssl-state').html('Domain Mismatch');
           $('#ssl-state').css('color','red')
           $('#ssl').css('background','#ffd9d9')

        }else{
          $('.ssl_loader').html('')

          $('#ssl-state').html('Valid')

        }
        $(".loader").html("");
        $("#topCard").html("");
        $("#topCard").html(`
          <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="illustration">
                                <img src="../../static/site_audit/assets/seo-main.png" style="padding: 5px 15px;"
                                    alt>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <strong>Perfect! Your website already has Google Analytics so you can start using the Answer
                                Engine.</strong>
                            <div class="d-flex mt-3">
                                <button class="btn btn-primary mr-3">Import from google Analytics</button>&nbsp;&nbsp;
                                <button class="btn btn-outline-primary ">Import from google Analytics</button>

                            </div>

                            <div class="row mt-5">
                                <div _ngcontent-gls-c223 class="logo-grid">
                                    <div _ngcontent-gls-c223 class="logo-grid-item">
                                        <p _ngcontent-gls-c223>
                                            Used by over 250k companies and organizations:</p>
                                        <div _ngcontent-gls-c223 class="logos">
                                            <div _ngcontent-gls-c223 class="logo"><img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/xcart.svg"
                                                    alt="XCART" decoding="async"></div>
                                            <div _ngcontent-gls-c223 class="logo">
                                                <img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/us-merchant-systems.svg"
                                                    alt="US Merchant Systems" decoding="async">
                                            </div>
                                            <div _ngcontent-gls-c223 class="logo"><img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/datum-sure.svg"
                                                    alt="Datum Sure" decoding="async"></div>
                                            <div _ngcontent-gls-c223 class="logo"><img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/university-of-utah.svg"
                                                    alt="The University of Utah" decoding="async"></div>
                                        </div>
                                    </div>
                                    <div _ngcontent-gls-c223 class="logo-grid-item">
                                        <p _ngcontent-gls-c223>As seen on:</p>
                                        <div _ngcontent-gls-c223 class="logos">
                                            <div _ngcontent-gls-c223 class="logo">
                                                <img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/cbs-2.svg"
                                                    alt="CBS">
                                            </div>
                                            <div _ngcontent-gls-c223 class="logo">
                                                <img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/nbc.svg"
                                                    style="width: 54px" alt="NBC">
                                            </div>
                                            <div _ngcontent-gls-c223 class="logo">
                                                <img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/the-telegraph.svg"
                                                    style="width: 90px" alt="The Telegraph">
                                            </div>
                                            <div _ngcontent-gls-c223 class="logo">
                                                <img _ngcontent-gls-c223
                                                    src="../../static/site_audit/assets/pc-mag.svg"
                                                    alt="PC Mag">
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `);

        //  dashboard keyword expoloe country
        $(document).ready(function () {
          Get_country_languages();
        });

        function Get_country_languages() {
          $.ajax({
            type: "GET",
            url: "/user_management/get_country_languages/",

            success: function (response) {
              if (response.status == true) {
                $("#country").empty();
                $("#country").html("<option></option>");
                var json = response.country_languages;
                //  glob =JSON.stringify(json);
                var options = [];
                //  console.log('g',glob)
                for (var i = 0; i < json.length; i++) {
                  var obj = json[i];
                  // console.log('obj',obj)
                  let country = obj.Country;

                  let lang = obj.Language;
                  let code = obj.code;
                  options.push({
                    id: code + "_" + country + "_" + lang,
                    abbreviation: code,
                    text: country + " / " + lang,
                  });
                }
                $("#country").select2({
                  placeholder: "Select Location / Language",
                  templateResult: formatCountry,
                  data: options,
                });

                function formatCountry(country) {
                  if (!country.id) {
                    return country.text;
                  }
                  var $country = $(
                    '<span class="flag-icon flag-icon-' +
                      country.abbreviation.toLowerCase() +
                      ' flag-icon-squared"></span>' +
                      '<span style="margin-left:10px;">' +
                      country.text +
                      "</span>"
                  );
                  return $country;
                }
              } else {
              }

              $(".CountrySelect")
                .val("us_United States_English")
                .trigger("change");
            },
            error: function (response) {
              console.log(response.error);
            },
          });
        }

        // corevitals
        var resposnseMobileData = "";

        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
          $(mobile_speed_state).html("");
          // console.log(resposnseMobileData['lighthouseResult']['audits']['speed-index'].displayValue,'resposnseMobileData')
          var speedIndex =
            response.response_mobile.all_data["lighthouseResult"]["audits"][
              "speed-index"
            ]["displayValue"];

          var totalBlockTime =
            resposnseMobileData["lighthouseResult"]["audits"][
              "total-blocking-time"
            ].displayValue;
          var largestContenFullPaint =
            resposnseMobileData["lighthouseResult"]["audits"][
              "largest-contentful-paint"
            ].displayValue;
          var cumulativeLayoutShift =
            resposnseMobileData["lighthouseResult"]["audits"][
              "cumulative-layout-shift"
            ].displayValue;
          var firstcontentfulpaint =
            resposnseMobileData["lighthouseResult"]["audits"][
              "first-contentful-paint"
            ].displayValue;
          var interactive =
            resposnseMobileData["lighthouseResult"]["audits"]["interactive"]
              .displayValue;
          var passCount = 0;
          var warnCount = 0;
          var failCount = 0;
          //
          speedIndex = replace_fun(speedIndex);
          var si_convertedValue = speedIndex * 1000;
          largestContenFullPaint = replace_fun(largestContenFullPaint);
          var lcp_convertedValue = largestContenFullPaint * 1000;
          firstcontentfulpaint = replace_fun(firstcontentfulpaint);
          var fcp_convertedValue = parseFloat(firstcontentfulpaint) * 1000;
          interactive = replace_fun(interactive);
          var tti_convertedValue = interactive * 1000;
          totalBlockTime = replace_fun(totalBlockTime);
          //

          // speed index
          if (
            speedIndex >= speedIndex_lowerRange &&
            speedIndex <= speedIndex_middleRange
          ) {
            passCount++;
            $(si_status).append(`${goodScore}`);
            $(si_status).css("color", goodColor);
            $(si_infoIconBackground).css("color", goodColor);
            $(si_infoIconBackground).css("background", goodIconColor);
            $(si_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${speedIndex}s in the test “Speed Index“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_si).attr("title", `${speedIndex}s`);
            $(improvementStateSi).html("");
            $(improvementStateSi).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            speedIndex > speedIndex_middleRange &&
            speedIndex <= speedIndex_upperRange
          ) {
            warnCount++;

            $(si_status).append(`${improvementScore}`);
            $(si_status).css("color", improvementColor);

            $(si_infoIconBackground).css("color", improvementColor);
            $(si_infoIconBackground).css("background", warnIconColor);
            $(si_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${speedIndex}ms in the test “Speed Index“ that is categorized as Moderate </h1>
                        `);
            $(tooltipTitle_si).attr("title", `${speedIndex}s`);
            $(improvementStateSi).html("");
            $(improvementStateSi).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (speedIndex > speedIndex_upperRange) {
            failCount++;

            $(speedIndexID).css("background", "#ffd9d9");
            $(si_status).append(poorScore);
            $(si_status).css("color", poorColor);

            $(si_infoIconBackground).css("color", poorColor);
            $(si_infoIconBackground).css("background", poorIconColor);
            $(si_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${speedIndex}ms in the test “Speed Index“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_si).attr("title", `${speedIndex}s`);
            $(improvementStateSi).html("");
            $(improvementStateSi).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }
          // TBT

          if (
            totalBlockTime >= tbt_lowerRange &&
            totalBlockTime < tbt_middleRange
          ) {
            passCount++;
            $(tbt_status).append(goodScore);
            $(tbt_status).css("color", goodColor);
            $(tbt_infoIconBackground).css("color", goodColor);
            $(tbt_infoIconBackground).css("background", goodIconColor);
            $(tbt_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_tbt).attr("title", `${totalBlockTime}ms`);
            $(improvementStateTbt).html("");
            $(improvementStateTbt).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            totalBlockTime >= tbt_middleRange &&
            totalBlockTime <= tbt_upperRange
          ) {
            warnCount++;
            $(tbt_status).append(improvementScore);
            $(tbt_status).css("color", improvementColor);
            $(tbt_infoIconBackground).css("color", improvementColor);
            $(tbt_infoIconBackground).css("background", warnIconColor);
            $(tbt_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as Moderate </h1>
                        `);
            $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
            $(improvementStateTbt).html("");
            $(improvementStateTbt).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (totalBlockTime > tbt_upperRange) {
            failCount++;
            $(tbt_status).append(poorScore);
            $(tbt_status).css("color", poorColor);
            $(tbt_infoIconBackground).css("color", poorColor);
            $(tbt_infoIconBackground).css("background", poorIconColor);
            $(tbt_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as POOR </h1>
                        `);
            $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
            $(improvementStateTbt).html("");
            $(improvementStateTbt).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }

          // lcp

          if (
            parseFloat(lcp_convertedValue) >= lcp_lowerRange &&
            parseFloat(lcp_convertedValue) < lcp_middleRange
          ) {
            passCount++;
            $(lcp_status).append(goodScore);
            $(lcp_status).css("color", goodColor);
            $(lcp_infoIconBackground).css("color", goodColor);
            $(lcp_infoIconBackground).css("background", goodIconColor);
            $(lcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${largestContenFullPaint}s in the test “Largest Contentful Paint“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
            $(improvementStateLcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            parseFloat(lcp_convertedValue) >= lcp_middleRange &&
            parseFloat(lcp_convertedValue) <= lcp_upperRange
          ) {
            warnCount++;

            $(lcp_status).append(improvementScore);
            $(lcp_status).css("color", improvementColor);
            $(lcp_infoIconBackground).css("color", improvementColor);
            $(lcp_infoIconBackground).css("background", warnIconColor);
            $(lcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${largestContenFullPaint} in the test “Total Blocking Time“ that is categorized as Needs improvement </h1>
                        `);
            $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
            $(improvementStateLcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else {
            failCount++;

            $(lcp_status).append(poorScore);
            $(lcp_status).css("color", poorColor);
            $(lcp_infoIconBackground).css("color", poorColor);
            $(lcp_infoIconBackground).css("background", poorIconColor);
            $(lcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${largestContenFullPaint}s in the test “Total Blocking Time“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
            $(improvementStateLcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }
          // cls
          if (
            parseFloat(cumulativeLayoutShift) >= cls_lowerRange &&
            parseFloat(cumulativeLayoutShift) < cls_middleRange
          ) {
            passCount++;
            $(cls_status).append(goodScore);
            $(cls_status).css("color", goodColor);
            $(cls_infoIconBackground).css("color", goodColor);
            $(cls_infoIconBackground).css("background", goodIconColor);
            $(cls_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${cumulativeLayoutShift}s in the test “Largest Contentful Paint“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
            $(improvementStateCls).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            parseFloat(cumulativeLayoutShift) >= cls_middleRange &&
            parseFloat(cumulativeLayoutShift) <= cls_upperRange
          ) {
            warnCount++;

            $(cls_status).append(improvementScore);
            $(cls_status).css("color", improvementColor);
            $(cls_infoIconBackground).css("color", improvementColor);
            $(cls_infoIconBackground).css("background", warnIconColor);
            $(cls_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${cumulativeLayoutShift}s in the test “Total Blocking Time“ that is categorized as Moderate </h1>
                        `);
            $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
            $(improvementStateCls).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (parseFloat(cumulativeLayoutShift) > cls_upperRange) {
            failCount++;

            $(cls_status).append(poorScore);
            $(cls_status).css("color", poorColor);
            $(cls_infoIconBackground).css("color", poorColor);
            $(cls_infoIconBackground).css("background", poorIconColor);
            $(cls_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${cumulativeLayoutShift}s in the test “Total Blocking Time“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
            $(improvementStateCls).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }
          // fcp

          if (
            parseFloat(firstcontentfulpaint) >= fcp_lowerRange &&
            parseFloat(firstcontentfulpaint) < fcp_middleRange
          ) {
            passCount++;

            $(fcp_status).append(goodScore);
            $(fcp_status).css("color", goodColor);
            $(fcp_infoIconBackground).css("color", goodColor);
            $(fcp_infoIconBackground).css("background", goodIconColor);
            $(fcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint} sec`);
            $(improvementStateFcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            parseFloat(firstcontentfulpaint) >= fcp_middleRange &&
            parseFloat(firstcontentfulpaint) <= fcp_upperRange
          ) {
            warnCount++;

            $(fcp_status).append(improvementScore);
            $(fcp_status).css("color", improvementColor);
            $(fcp_infoIconBackground).css("color", improvementColor);
            $(fcp_infoIconBackground).css("background", warnIconColor);
            $(fcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Moderate </h1>
                        `);
            $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
            $(improvementStateFcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (parseFloat(firstcontentfulpaint) > fcp_upperRange) {
            failCount++;

            $(fcp_status).append(poorScore);
            $(fcp_status).css("color", poorColor);
            $(fcp_infoIconBackground).css("color", poorColor);
            $(fcp_infoIconBackground).css("background", poorIconColor);
            $(fcp_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
            $(improvementStateFcp).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }
          // TTI

          if (
            parseFloat(interactive) >= tti_lowerRange &&
            parseFloat(interactive) <= tti_middleRange
          ) {
            passCount++;
            $(tti_status).append(goodScore);
            $(tti_status).css("color", goodColor);
            $(tti_infoIconBackground).css("color", goodColor);
            $(tti_infoIconBackground).css("background", goodIconColor);
            $(tti_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${interactive}s in the test “Time to Interactive“ that is categorized as Good </h1>
                        `);
            $(tooltipTitle_tti).attr("title", `${interactive}s`);
            $(improvementStateTti).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-9">
                                            <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
                                            </p>
                                            </div>
                                           
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (
            parseFloat(interactive) > tti_middleRange &&
            parseFloat(interactive) <= tti_upperRange
          ) {
            warnCount++;
            $(tti_status).append(improvementScore);
            $(tti_status).css("color", improvementColor);
            $(tti_infoIconBackground).css("color", improvementColor);
            $(tti_infoIconBackground).css("background", warnIconColor);
            $(tti_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${interactive}s in the test “Time to Interactive“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_tti).attr("title", `${interactive}s`);
            $(improvementStateTti).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          } else if (parseFloat(interactive) >= tti_upperRange) {
            failCount++;

            $(tti_status).append(poorScore);
            $(tti_status).css("color", poorColor);
            $(tti_infoIconBackground).css("color", poorColor);
            $(tti_infoIconBackground).css("background", poorIconColor);
            $(tti_heading)
              .append(`<h1 class="domain-title ng-star-inserted"> Currently
                        <span class="domain-name">${finalUrl}</span>
                        has ${interactive}s in the test “Time to Interactive“ that is categorized as Poor </h1>
                        `);
            $(tooltipTitle_tti).attr("title", `${interactive}s`);
            $(improvementStateTti).append(`<div>
                                    <div class="container-desktop improvement-state">
                                        <div class="container-desktop__align-helper ng-star-inserted">
                                        <div class="row">
                                            <div class="col-md-3">
                                            <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
                                            </div>
                                            <div class="col-md-5">
                                            <p class="description"> We'd suggest talking to your
                                                webmaster about any Core Vitals issues or you can view our solutions here.
                                            </p>
                                            </div>
                                            <div class="col-md-4">
                                            <div class="container-desktop__button">
                                               <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
                                        <p class="description ng-star-inserted"> We'd suggest talking
                                        to your webmaster about any Core Vitals issues or you can view our solutions
                                        here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
                                        <span>View Solutions</span>
                                        </a>
                                    
                                    </div>
                                    </div>
                                    `);
          }

          var data = {
            TBT: {
              upperRange: 600,
              lowerRange: 200,
              name: "Total Blocking Time",
              convertedValue: Number(totalBlockTime),
            },
            LCP: {
              upperRange: 2500,
              lowerRange: 4000,
              name: "Largest Contentful Paint",
              convertedValue: lcp_convertedValue,
            },
            CLS: {
              upperRange: 100,
              lowerRange: 250,
              name: "Cumulative Layout Shift",
              convertedValue: Number(Math.round(cumulativeLayoutShift)),
            },
            FCP: {
              upperRange: 1800,
              lowerRange: 3000,
              name: "First Contentful Paint",
              convertedValue: fcp_convertedValue,
            },
            SI: {
              upperRange: 3400,
              lowerRange: 5800,
              name: "Speed Index",
              convertedValue: si_convertedValue,
            },
            TTI: {
              upperRange: 3800,
              lowerRange: 7300,
              name: "Time to Interact",
              convertedValue: tti_convertedValue,
            },
          };
        
          $.each(data, function (i, val) {
            var offSet =
              (100 * val.convertedValue) /
              (2 * val.lowerRange + (val.upperRange - val.lowerRange));
            $(".indicator_" + i).css(
              "left",
              offSet >= 100 ? "98%" : offSet <= 0 ? "1%" : `${offSet}%`
            );
          });
          // more details doughnuts chart
          $(si).append(`${speedIndex}s`);
          $(tbt).append(`${totalBlockTime} ms`);
          $(lcp).append(`${largestContenFullPaint}`);
          $(cls).append(`${cumulativeLayoutShift}`);
          $(fcp).append(`${firstcontentfulpaint}s`);
          $(tti).append(`${interactive}s`);

          var xValues = [
            "Total Blocking Time (TBT)",
            "Largest Contentful Paint (LCP) ",
            "Cumulative Layout Shift (CLS)",
            "First Contentful Paint (FCP)",
            "Speed Index (SI)",
            "Time to Interact (TTI",
          ];
          // total block = #b37feb
          // largest contentful paint = #ffd666
          // cumulative = #adc6ff
          // first content = #bae637
          // speed index = #40a9ff
          // time to interact = #5cdbd3
          var yValues = [30, 25, 15, 10, 10, 10];
          var barColors = [
            "#b37feb",
            "#ffd666",
            "#adc6ff",
            "#bae637",
            "#40a9ff",
            "#5cdbd3",
          ];

          new Chart("mainChart", {
            //   startAngle: -400.55,
            type: "doughnut",
            borderWidth: 20,

            data: {
              labels: xValues,
              datasets: [
                {
                  backgroundColor: barColors,
                  data: yValues,
                },
              ],
            },
            options: {
              legend: {
                display: false,
              },
              rotation: 40,
            },
          });

          $(coreVitalLoader).html("");

          $(coreVital_1).css("display", "block");
          $(coreVital_2).html(` <div class="tablediv">
                            <ul class="list-group list-group-flush">
                                 <li class="list-group-item">Results :</li>
                                <li class="list-group-item c253">
                                    ${passCount} test <img class="testIcon"
                                        src="../../static/site_audit/assets/check-circle.svg" alt="">
                                    <br />

                                    <span class="good">Good</span>
                                </li>
                      
                                <li class="list-group-item c253"> ${warnCount} tests <img class="testIcon"
                                        src="../../static/site_audit/assets/uil_exclamation-circle.svg"
                                        alt="">
                                    <br />

                                    <span class="needsImp">Needs Improvement</span>
                                </li>
                                <li class="list-group-item c253"> ${failCount} tests <img class="testIcon"
                                        src="../../static/site_audit/assets/close-circle.svg" alt="">
                                    <br />
                                    <span class="poor">Poor</span>
                                </li>

                            </ul>
                        </div>`);
          $(passStatus).append(`${passCount}`);
          $(warnStatus).append(`${warnCount}`);
          $(failStatus).append(`${failCount}`);
        } else {
          setTimeout(() => {
            $(".mobile_speed_spinner").html("not found");
          }, 1000);

          console.log(response.error);
        }

        var resposnseMobileData = "";

        if (
          response.response_mobile != undefined &&
          response.response_mobile.all_data != undefined
        ) {
          resposnseMobileData = response.response_mobile.all_data;
          // console.log(response.response_mobile.all_data['lighthouseResult']['categories']['performance']['score']*100,'response.response_mobile.all_data')
          var performance =
            response.response_mobile.all_data["lighthouseResult"]["categories"][
              "performance"
            ]["score"];
                    // website rank mobile chart start
                      $('.mobile_loader').html('')
        var mobile =  performance*100
              var mobile_grade = '';
    var mobile_color = '';
   if(mobile <= 30){
       mobile_grade = 'C-'
       mobile_color = "#d35c48"
   }else if(mobile > 30 && mobile <= 60){
      mobile_grade = 'B-'
      mobile_color = "#ebb658"

   }else if(mobile >= 60){
       mobile_grade = 'A'
       mobile_color =  "#28a745"

   }
   var mobileScore = '';
    if(mobile >= 100){
        mobileScore = 100
    }else{
       mobileScore = mobile;
    }


       $('#mobile_score_').text(mobile_grade)

     new Chart(document.getElementsByClassName('mobile'), {
        type: 'doughnut',
        animation: {
            animateScale: true
        },
        data: {
         
            datasets: [{
              
                             data: [mobileScore,100-mobileScore],

                backgroundColor: [
                  mobile_color

                ]
            }]
        },
        options: {
            cutoutPercentage: 70,
            elements: {
                center: {
                    text: mobile_grade
                }
            },
            responsive: true,
            legend: false,
 tooltips: {
       enabled: false
  },
        },
       
    });

          // website rank mobile chart end
          var color = "";

          if (
            performance*100 >= 90 &&
            performance*100 <= 100
          ) {
            color = goodColor;
            $(strongclass).css("color", goodColor);
            $(si_status_overview).append(goodScore);
            $(si_status_overview).css("color", goodColor);
          } else if (
            performance*100 >= 50 &&
            performance*100 < 90
          ) {
            color = improvementColor;
            $(strongclass).css("color",improvementColor);
            $(si_status_overview).append(improvementScore);
            $(si_status_overview).css("color", improvementColor);
          } else if (
            performance*100 >= 0 &&
            performance*100 < 50
          ) {
            color = poorColor;
            $(strongclass).css("color",poorColor);
            $(si_status_overview).append(poorScore);
            $(si_status_overview).css("color",poorColor);
          }

          var progressBarOptions = {
            startAngle: -400.55,
            size: 100,
            thickness: 15,
            value: performance,
            fill: {
              color: color,
               filter: 'drop-shadow(0 2px 7px rgba(0,172,69,.45));'
            },
          };
          $(chartClass)
            .circleProgress(progressBarOptions)
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                if (stepValue >= 1) {
                  stepValue = 100;
                  $(this).find(".strong").text(stepValue);
                } else {
                  $(this)
                    .find(".strong")
                    .text(String(stepValue.toFixed(2)).substr(2));
                }
              }
            );
          var progressBarOptions = {
            startAngle: -400.55,
            size: 30,
            thickness: 10,
            value: performance,
            fill: {
              color: color,
             
            },
          };
          $(chartOverview)
            .circleProgress(progressBarOptions)
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                $("#strong").text(String(stepValue.toFixed(2)).substr(2));
              }
            );
          // core vital
          if (performance*100 >= 90) {
            $(mobile_speed_state).append(
              performance*100,
              `/ 100 -
              <br/>

              Good`
            );
            $(".issue").append(
              `Hooray! Only 9% of the websites we have tested score as high as you.`
            );
            $(".issue_p").append(
              `No improvements are necessary on Core Vitals.`
            );

            $("#si_info-icon--background").css("color", "#00ac45");
            $("#si_info-icon--background").css("background", "#e1f3e8");
          } else if (
            performance*100 >= 50 &&
            performance*100 <= 89
          ) {
            $(".issue").append(
              `We found some serious issues you may want to take a closer look at.`
            );
            $(".issue_p").append(
              `To put it in context, about 53% of the websites we test score as Poor.`
            );

            $(mobile_speed_state).append(
              performance*100,
              `/100 - 
              <br/>
              
              Stabl`
            );

            $("#mobile-speed").addClass("warning");

            $("#si_info-icon--background").css("color", "rgba(251, 124, 56)");
            $("#si_info-icon--background").css("background", "#fff2eb");
          } else if (
            performance*100 >= 0 &&
            performance*100 <= 49
          ) {
            $(".issue").append(
              `We found some serious issues you may want to take a closer look at.`
            );
            $(".issue_p").append(
              `To put it in context, about 53% of the websites we test score as Poor.`
            );
            $(mobile_speed_state).append(
              performance*100,
              `/100 - 
              <br/>
              Poor`
            );
            $("#mobile-speed").addClass("danger");
            $("#si_info-icon--background").css("color", "rgba(207, 19, 34)");
            $("#si_info-icon--background").css("background", "#f6e3e4");
          }
          var p_ = performance * 100;
          if (p_ >= 0 && p_ <= 49) {
            $("#domain-title").html("");
            $("#mobile").addClass("text-danger");
            $(mobile_speed_state).addClass("text-danger");
            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                   is categorized as POOR in <span class="status-count" id="failStatus">${failCount}</span> out of 6
                                    Core
                                    Vitals tests`);
          } else if (p_ >= 50 && p_ <= 89) {
            $("#domain-title").html("");
            $("#mobile").addClass("text-warning");
            $(mobile_speed_state).addClass("text-warning");

            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                    is categorized as NEEDS IMPROVEMENT in <span class="status-count" id="warnStatus">${warnCount}</span> out of 6
                                    Core
                                    Vitals tests`);
          } else if (p_ >= 90) {
            $("#domain-title").html("");

            $("#domain-title")
              .append(`Currently <span class="domain-name">${finalUrl}</span>
                                   passes all six of the Core Vitals tests. Congratulations! We will alert you if we detect any issues in the future.`);
          }
        }
        if (response.page_data_dict.site_map_url != undefined) {
          responseSitemap = response.page_data_dict.site_map_url;
          $(".site_map_spinner").html("");
          $(sitemapState).text("Detected");
        } else {
          $(".site_map_spinner").html("");

          $(sitemapState).text("Not Detected");
        }
        var resposnsewebsite_seo_data = "";
        if (response.website_seo_data != undefined) {
          resposnsewebsite_seo_data = response.website_seo_data;

          var spf_record = resposnsewebsite_seo_data["output"]["spf_record"];
          if (spf_record !== null || spf_record !== undefined) {
            $(spf_spinner).html("");

            $("#SPF-state").text("ok");
            $("#SPF-state").css("color", "#1166f1");
          } else {
            $("#SPF").addClass("sub-item-error");
            $("#SPF-state").text("No SPF record found");
            $("#SPF-state").css("color", "#ffd9d9");
          }
        }

        var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      } else {
         setTimeout(()=>{
          $('.p_spinner').hide();
          ShowNoty('No data found','alert')
         },1000)
       
      }
    },
  });
}
// main functio get site data end

$(document).on("change", ".radio", function () {
 getSiteData();

//   var url = $(this).val();
//   var app_url = url.replace("https://", " ");
//   $(".url").html("");
//   $(".url").html(`${app_url}`);
//   var responseSitemap = "";
//   $(".loader").append(`<div class="lds-ellipsis">
//   <div></div>
//    <div></div>
//     <div></div>
// </div>
// `);
//   $.ajax({
//     method: "GET",
//     url: "/site_audit/get_site_live_data/?url=" + url,
//     success: function (response) {
//       if (response.status) {
//         $(".loader").html(" ");
//         var resposnseMobileData = "";
//         if (
//           response.response_mobile != undefined &&
//           response.response_mobile.all_data != undefined
//         ) {
//           resposnseMobileData = response.response_mobile.all_data;
//         }
//         var finalUrl = "";
//         if (resposnseMobileData.lighthouseResult != undefined) {
//           finalUrl = resposnseMobileData.lighthouseResult.finalUrl;
//         }
//             // for ssl certificate
//         var ssl_certificate = '';
          
//         if (resposnseMobileData.lighthouseResult != undefined) {
//           ssl_certificate = resposnseMobileData.lighthouseResult.audits['is-on-https']['score'];
//         }
      
//         ssl_certificate = ssl_certificate*100
//         if(ssl_certificate >= 50 && ssl_certificate < 90){
//           $('.ssl_loader').html('')

//           $('#ssl-state').html('Expiring Soon')
//             $('#ssl-state').css('color','rgb(244, 154, 0)')
//         }else if(ssl_certificate >= 0 && ssl_certificate < 49){
//           $('.ssl_loader').html('')

//           $('#ssl-state').html('Domain Mismatch')
//             $('#ssl-state').css('color','red')
//         }else{
//           $('.ssl_loader').html('')

//           $('#ssl-state').html('Valid')

//         }
//         $(".loader").html("");
//         //  dashboard keyword expoloe country
//         $(document).ready(function () {
//           Get_country_languages();
//         });
//         function Get_country_languages() {
//           $.ajax({
//             type: "GET",
//             url: "/user_management/get_country_languages/",
//             success: function (response) {
//               if (response.status == true) {
//                 $("#country").empty();
//                 $("#country").html("<option></option>");
//                 var json = response.country_languages;
//                 //  glob =JSON.stringify(json);
//                 var options = [];
//                 //  console.log('g',glob)
//                 for (var i = 0; i < json.length; i++) {
//                   var obj = json[i];
//                   // console.log('obj',obj)
//                   let country = obj.Country;

//                   let lang = obj.Language;
//                   let code = obj.code;
//                   options.push({
//                     id: code + "_" + country + "_" + lang,
//                     abbreviation: code,
//                     text: country + " / " + lang,
//                   });
//                 }
//                 $("#country").select2({
//                   placeholder: "Select Location / Language",
//                   templateResult: formatCountry,
//                   data: options,
//                 });

//                 function formatCountry(country) {
//                   if (!country.id) {
//                     return country.text;
//                   }
//                   var $country = $(
//                     '<span class="flag-icon flag-icon-' +
//                       country.abbreviation.toLowerCase() +
//                       ' flag-icon-squared"></span>' +
//                       '<span style="margin-left:10px;">' +
//                       country.text +
//                       "</span>"
//                   );
//                   return $country;
//                 }
//               } else {
//               }

//               $(".CountrySelect")
//                 .val("us_United States_English")
//                 .trigger("change");
//             },
//             error: function (response) {
//               console.log(response.error);
//             },
//           });
//         }
//         // corevitals
//         var resposnseMobileData = "";
//         if (
//           response.response_mobile != undefined &&
//           response.response_mobile.all_data != undefined
//         ) {
//           resposnseMobileData = response.response_mobile.all_data;
//           $(mobile_speed_state).html("");
//           var speedIndex =
//             response.response_mobile.all_data["lighthouseResult"]["categories"][
//               "performance"
//             ]["score"];
//           var totalBlockTime =
//             resposnseMobileData["lighthouseResult"]["audits"][
//               "total-blocking-time"
//             ].displayValue;
//           var largestContenFullPaint =
//             resposnseMobileData["lighthouseResult"]["audits"][
//               "largest-contentful-paint"
//             ].displayValue;
//           var cumulativeLayoutShift =
//             resposnseMobileData["lighthouseResult"]["audits"][
//               "cumulative-layout-shift"
//             ].displayValue;
//           var firstcontentfulpaint =
//             resposnseMobileData["lighthouseResult"]["audits"][
//               "first-contentful-paint"
//             ].displayValue;
//           var interactive =
//             resposnseMobileData["lighthouseResult"]["audits"]["interactive"]
//               .displayValue;
//           var passCount = 0;
//           var warnCount = 0;
//           var failCount = 0;
//           //
//           speedIndex = replace_fun(speedIndex);
//           var si_convertedValue = speedIndex * 1000;
//           largestContenFullPaint = replace_fun(largestContenFullPaint);
//           var lcp_convertedValue = largestContenFullPaint * 1000;
//           firstcontentfulpaint = replace_fun(firstcontentfulpaint);
//           var fcp_convertedValue = parseFloat(firstcontentfulpaint) * 1000;
//           interactive = replace_fun(interactive);
//           var tti_convertedValue = interactive * 1000;
//           totalBlockTime = replace_fun(totalBlockTime);
//           // speed index
//           if (
//             speedIndex >= speedIndex_lowerRange &&
//             speedIndex <= speedIndex_middleRange
//           ) {
//             passCount++;
//             $(si_status).append(`${goodScore}`);
//             $(si_status).css("color", goodColor);
//             $(si_infoIconBackground).css("color", goodColor);
//             $(si_infoIconBackground).css("background", goodIconColor);
//             $(si_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${speedIndex}s in the test “Speed Index“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_si).attr("title", `${speedIndex}s`);
//             $(improvementStateSi).html("");
//             $(improvementStateSi).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             speedIndex > speedIndex_middleRange &&
//             speedIndex <= speedIndex_upperRange
//           ) {
//             warnCount++;
//             $(si_status).append(`${improvementScore}`);
//             $(si_status).css("color", improvementColor);
//             $(si_infoIconBackground).css("color", improvementColor);
//             $(si_infoIconBackground).css("background", warnIconColor);
//             $(si_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${speedIndex}ms in the test “Speed Index“ that is categorized as Moderate </h1>
//                         `);
//             $(tooltipTitle_si).attr("title", `${speedIndex}s`);
//             $(improvementStateSi).html("");
//             $(improvementStateSi).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (speedIndex > speedIndex_upperRange) {
//             failCount++;
//             $(speedIndexID).css("background", "#ffd9d9");
//             $(si_status).append(poorScore);
//             $(si_status).css("color", poorColor);
//             $(si_infoIconBackground).css("color", poorColor);
//             $(si_infoIconBackground).css("background", poorIconColor);
//             $(si_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${speedIndex}ms in the test “Speed Index“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_si).attr("title", `${speedIndex}s`);
//             $(improvementStateSi).html("");
//             $(improvementStateSi).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }
//           // TBT
//           if (
//             totalBlockTime >= tbt_lowerRange &&
//             totalBlockTime < tbt_middleRange
//           ) {
//             passCount++;
//             $(tbt_status).append(goodScore);
//             $(tbt_status).css("color", goodColor);
//             $(tbt_infoIconBackground).css("color", goodColor);
//             $(tbt_infoIconBackground).css("background", goodIconColor);
//             $(tbt_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_tbt).attr("title", `${totalBlockTime}ms`);
//             $(improvementStateTbt).html("");
//             $(improvementStateTbt).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             totalBlockTime >= tbt_middleRange &&
//             totalBlockTime <= tbt_upperRange
//           ) {
//             warnCount++;
//             $(tbt_status).append(improvementScore);
//             $(tbt_status).css("color", improvementColor);
//             $(tbt_infoIconBackground).css("color", improvementColor);
//             $(tbt_infoIconBackground).css("background", warnIconColor);
//             $(tbt_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as Moderate </h1>
//                         `);
//             $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
//             $(improvementStateTbt).html("");
//             $(improvementStateTbt).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (totalBlockTime > tbt_upperRange) {
//             failCount++;
//             $(tbt_status).append(poorScore);
//             $(tbt_status).css("color", poorColor);
//             $(tbt_infoIconBackground).css("color", poorColor);
//             $(tbt_infoIconBackground).css("background", poorIconColor);
//             $(tbt_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${totalBlockTime}ms in the test “Total Blocking Time“ that is categorized as POOR </h1>
//                         `);
//             $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
//             $(improvementStateTbt).html("");
//             $(improvementStateTbt).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }

//           // lcp
//           if (
//             parseFloat(lcp_convertedValue) >= lcp_lowerRange &&
//             parseFloat(lcp_convertedValue) < lcp_middleRange
//           ) {
//             passCount++;
//             $(lcp_status).append(goodScore);
//             $(lcp_status).css("color", goodColor);
//             $(lcp_infoIconBackground).css("color", goodColor);
//             $(lcp_infoIconBackground).css("background", goodIconColor);
//             $(lcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${largestContenFullPaint}s in the test “Largest Contentful Paint“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
//             $(improvementStateLcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             parseFloat(lcp_convertedValue) >= lcp_middleRange &&
//             parseFloat(lcp_convertedValue) <= lcp_upperRange
//           ) {
//             warnCount++;
//             $(lcp_status).append(improvementScore);
//             $(lcp_status).css("color", improvementColor);
//             $(lcp_infoIconBackground).css("color", improvementColor);
//             $(lcp_infoIconBackground).css("background", warnIconColor);
//             $(lcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${largestContenFullPaint} in the test “Total Blocking Time“ that is categorized as Needs improvement </h1>
//                         `);
//             $(tooltipTitle_lcp).attr("title", `${convertedValue} ms`);
//             $(improvementStateLcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else {
//             failCount++;
//             $(lcp_status).append(poorScore);
//             $(lcp_status).css("color", poorColor);
//             $(lcp_infoIconBackground).css("color", poorColor);
//             $(lcp_infoIconBackground).css("background", poorIconColor);
//             $(lcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${largestContenFullPaint}s in the test “Total Blocking Time“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
//             $(improvementStateLcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }
//           // cls
//           if (
//             parseFloat(cumulativeLayoutShift) >= cls_lowerRange &&
//             parseFloat(cumulativeLayoutShift) < cls_middleRange
//           ) {
//             passCount++;
//             $(cls_status).append(goodScore);
//             $(cls_status).css("color", goodColor);
//             $(cls_infoIconBackground).css("color", goodColor);
//             $(cls_infoIconBackground).css("background", goodIconColor);
//             $(cls_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${cumulativeLayoutShift}s in the test “Largest Contentful Paint“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
//             $(improvementStateCls).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             parseFloat(cumulativeLayoutShift) >= cls_middleRange &&
//             parseFloat(cumulativeLayoutShift) <= cls_upperRange
//           ) {
//             warnCount++;
//             $(cls_status).append(improvementScore);
//             $(cls_status).css("color", improvementColor);
//             $(cls_infoIconBackground).css("color", improvementColor);
//             $(cls_infoIconBackground).css("background", warnIconColor);
//             $(cls_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${cumulativeLayoutShift}s in the test “Total Blocking Time“ that is categorized as Moderate </h1>
//                         `);
//             $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
//             $(improvementStateCls).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (parseFloat(cumulativeLayoutShift) > cls_upperRange) {
//             failCount++;
//             $(cls_status).append(poorScore);
//             $(cls_status).css("color", poorColor);
//             $(cls_infoIconBackground).css("color", poorColor);
//             $(cls_infoIconBackground).css("background", poorIconColor);
//             $(cls_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${cumulativeLayoutShift}s in the test “Total Blocking Time“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
//             $(improvementStateCls).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }
//           // fcp
//           if (
//             parseFloat(firstcontentfulpaint) >= fcp_lowerRange &&
//             parseFloat(firstcontentfulpaint) < fcp_middleRange
//           ) {
//             passCount++;
//             $(fcp_status).append(goodScore);
//             $(fcp_status).css("color", goodColor);
//             $(fcp_infoIconBackground).css("color", goodColor);
//             $(fcp_infoIconBackground).css("background", goodIconColor);
//             $(fcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint} sec`);
//             $(improvementStateFcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             parseFloat(firstcontentfulpaint) >= fcp_middleRange &&
//             parseFloat(firstcontentfulpaint) <= fcp_upperRange
//           ) {
//             warnCount++;
//             $(fcp_status).append(improvementScore);
//             $(fcp_status).css("color", improvementColor);
//             $(fcp_infoIconBackground).css("color", improvementColor);
//             $(fcp_infoIconBackground).css("background", warnIconColor);
//             $(fcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Moderate </h1>
//                         `);
//             $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
//             $(improvementStateFcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (parseFloat(firstcontentfulpaint) > fcp_upperRange) {
//             failCount++;
//             $(fcp_status).append(poorScore);
//             $(fcp_status).css("color", poorColor);
//             $(fcp_infoIconBackground).css("color", poorColor);
//             $(fcp_infoIconBackground).css("background", poorIconColor);
//             $(fcp_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${firstcontentfulpaint}s in the test “First Contentful Paint“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
//             $(improvementStateFcp).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }
//           // TTI
//           if (
//             parseFloat(interactive) >= tti_lowerRange &&
//             parseFloat(interactive) <= tti_middleRange
//           ) {
//             passCount++;
//             $(tti_status).append(goodScore);
//             $(tti_status).css("color", goodColor);
//             $(tti_infoIconBackground).css("color", goodColor);
//             $(tti_infoIconBackground).css("background", goodIconColor);
//             $(tti_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${interactive}s in the test “Time to Interactive“ that is categorized as Good </h1>
//                         `);
//             $(tooltipTitle_tti).attr("title", `${interactive}s`);
//             $(improvementStateTti).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-9">
//                                             <p class="description"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes.
//                                             </p>
//                                             </div>
                                           
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/keyword-rank-cat.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> You look good on Core Vitals and don't need to do anything! That said, we'll continue to monitor these for you and alert you if anything changes. </p>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (
//             parseFloat(interactive) > tti_middleRange &&
//             parseFloat(interactive) <= tti_upperRange
//           ) {
//             warnCount++;
//             $(tti_status).append(improvementScore);
//             $(tti_status).css("color", improvementColor);
//             $(tti_infoIconBackground).css("color", improvementColor);
//             $(tti_infoIconBackground).css("background", warnIconColor);
//             $(tti_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${interactive}s in the test “Time to Interactive“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_tti).attr("title", `${interactive}s`);
//             $(improvementStateTti).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           } else if (parseFloat(interactive) >= tti_upperRange) {
//             failCount++;
//             $(tti_status).append(poorScore);
//             $(tti_status).css("color", poorColor);
//             $(tti_infoIconBackground).css("color", poorColor);
//             $(tti_infoIconBackground).css("background", poorIconColor);
//             $(tti_heading)
//               .append(`<h1 class="domain-title ng-star-inserted"> Currently
//                         <span class="domain-name">${finalUrl}</span>
//                         has ${interactive}s in the test “Time to Interactive“ that is categorized as Poor </h1>
//                         `);
//             $(tooltipTitle_tti).attr("title", `${interactive}s`);
//             $(improvementStateTti).append(`<div>
//                                     <div class="container-desktop improvement-state">
//                                         <div class="container-desktop__align-helper ng-star-inserted">
//                                         <div class="row">
//                                             <div class="col-md-3">
//                                             <img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="container-desktop__image" />
//                                             </div>
//                                             <div class="col-md-5">
//                                             <p class="description"> We'd suggest talking to your
//                                                 webmaster about any Core Vitals issues or you can view our solutions here.
//                                             </p>
//                                             </div>
//                                             <div class="col-md-4">
//                                             <div class="container-desktop__button">
//                                                <a app-button matdialogclose href="/site_audit/pro_managed/" tabIndex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
//                                             </div>
//                                             </div>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div class="container-mobile improvement-state"><img src="../../static/site_audit/assets/message_bubbles.svg" alt="message_bubbles" decoding="async" class="ng-star-inserted" />
//                                         <p class="description ng-star-inserted"> We'd suggest talking
//                                         to your webmaster about any Core Vitals issues or you can view our solutions
//                                         here. </p><a app-button matdialogclose href="/site_audit/pro_managed/" tabindex={0} class="btn btn-primary ng-star-inserted" >
//                                         <span>View Solutions</span>
//                                         </a>
                                    
//                                     </div>
//                                     </div>
//                                     `);
//           }
//           var data = {
//             TBT: {
//               upperRange: 600,
//               lowerRange: 200,
//               name: "Total Blocking Time",
//               convertedValue: Number(totalBlockTime),
//             },
//             LCP: {
//               upperRange: 2500,
//               lowerRange: 4000,
//               name: "Largest Contentful Paint",
//               convertedValue: lcp_convertedValue,
//             },
//             CLS: {
//               upperRange: 100,
//               lowerRange: 250,
//               name: "Cumulative Layout Shift",
//               convertedValue: Number(Math.round(cumulativeLayoutShift)),
//             },
//             FCP: {
//               upperRange: 1800,
//               lowerRange: 3000,
//               name: "First Contentful Paint",
//               convertedValue: fcp_convertedValue,
//             },
//             SI: {
//               upperRange: 3400,
//               lowerRange: 5800,
//               name: "Speed Index",
//               convertedValue: si_convertedValue,
//             },
//             TTI: {
//               upperRange: 3800,
//               lowerRange: 7300,
//               name: "Time to Interact",
//               convertedValue: tti_convertedValue,
//             },
//           };
//           $.each(data, function (i, val) {
//             console.log(i, val, "i val");
//             var offSet =
//               (100 * val.convertedValue) /
//               (2 * val.lowerRange + (val.upperRange - val.lowerRange));
//             $(".indicator_" + i).css(
//               "left",
//               offSet >= 100 ? "98%" : offSet <= 0 ? "1%" : `${offSet}%`
//             );
//           });
//           // more details doughnuts chart
//           $(si).append(`${speedIndex}s`);
//           $(tbt).append(`${totalBlockTime} ms`);
//           $(lcp).append(`${largestContenFullPaint}`);
//           $(cls).append(`${cumulativeLayoutShift}`);
//           $(fcp).append(`${firstcontentfulpaint}s`);
//           $(tti).append(`${interactive}s`);

//           var xValues = [
//             "Total Blocking Time (TBT)",
//             " Largest Contentful Paint (LCP) ",
//             "Cumulative Layout Shift (CLS)",
//             "First Contentful Paint (FCP)",
//             "Speed Index (SI)",
//             "Time to Interact (TTI",
//           ];
//           // total block = #b37feb
//           // largest contentful paint = #ffd666
//           // cumulative = #adc6ff
//           // first content = #bae637
//           // speed index = #40a9ff
//           // time to interact = #5cdbd3
//           var yValues = [30, 25, 15, 10, 10, 10];
//           var barColors = [
//             "#b37feb",
//             "#ffd666",
//             "#adc6ff",
//             "#bae637",
//             "#40a9ff",
//             "#5cdbd3",
//           ];

//           new Chart("mainChart", {
//             //   startAngle: -400.55,
//             type: "doughnut",
//             borderWidth: 20,

//             data: {
//               labels: xValues,
//               datasets: [
//                 {
//                   backgroundColor: barColors,
//                   data: yValues,
//                 },
//               ],
//             },
//             options: {
//               legend: {
//                 display: false,
//               },
//               rotation: 40,
//               title: {
//                 display: false,
//               },
//             },
//           });

//           $(coreVitalLoader).html("");
//           $(coreVital_1).css("display", "block");
//           $(coreVital_2).html("");
//           $(coreVital_2).html(` <div class="tablediv">
//                             <ul class="list-group list-group-flush">
//                                 <li class="list-group-item">Result :</li>
//                                 <li class="list-group-item c253">
//                                     ${passCount} test <img class="testIcon"
//                                         src="../../static/site_audit/assets/check-circle.svg" alt="">
//                                     <br />

//                                     <span class="good">Good</span>
//                                 </li>
                      
//                                 <li class="list-group-item c253"> ${warnCount} tests <img class="testIcon"
//                                         src="../../static/site_audit/assets/uil_exclamation-circle.svg"
//                                         alt="">
//                                     <br />

//                                     <span class="needsImp">Needs Improvement</span>
//                                 </li>
//                                 <li class="list-group-item c253"> ${failCount} tests <img class="testIcon"
//                                         src="../../static/site_audit/assets/close-circle.svg" alt="">
//                                     <br />
//                                     <span class="poor">Poor</span>
//                                 </li>

//                             </ul>
//                         </div>`);
//         }

//         var resposnseMobileData = "";

//         if (
//           response.response_mobile != undefined &&
//           response.response_mobile.all_data != undefined
//         ) {
//           resposnseMobileData = response.response_mobile.all_data;
//           var performance =
//             response.response_mobile.all_data["lighthouseResult"]["categories"][
//               "performance"
//             ]["score"];
//           // website rank mobile chart start
//           $('.mobile_loader').html('')
//         var mobile =  performance*100
//               var mobile_grade = '';
//     var mobile_color = '';
//    if(mobile <= 30){
//        mobile_grade = 'C-'
//        mobile_color = "#d35c48"
//    }else if(mobile > 30 && mobile <= 60){
//       mobile_grade = 'B-'
//       mobile_color = "#ebb658"

//    }else if(mobile >= 60){
//        mobile_grade = 'A'
//        mobile_color =  "#28a745"

//    }
//    var mobileScore = '';
//     if(mobile >= 100){
//         mobileScore = 100
//     }else{
//        mobileScore = mobile;
//     }


//        $('#mobile_score_').text(mobile_grade)

//      new Chart(document.getElementsByClassName('mobile'), {
//         type: 'doughnut',
//         animation: {
//             animateScale: true
//         },
//         data: {
         
//             datasets: [{
              
//                              data: [mobileScore,100-mobileScore],

//                 backgroundColor: [
//                   mobile_color

//                 ]
//             }]
//         },
//         options: {
//             cutoutPercentage: 70,
//             elements: {
//                 center: {
//                     text: mobile_grade
//                 }
//             },
//             responsive: true,
//             legend: false,
//  tooltips: {
//        enabled: false
//   },
//         },
       
//     });

//           // website rank mobile chart end

//           var color = "";

//           if (
//             performance*100 > 90 &&
//             performance*100 < 100
//           ) {
//            color = goodColor
//             $(strongclass).css("color", goodColor);
//             $(si_status_overview).append(goodScore);
//             $(si_status_overview).css("color", goodColor);
//           } else if (
            
//             performance*100 > 50 &&
//             performance*100 < 89
//           ) {
//            color = improvementColor
//             $(strongclass).css("color", improvementColor);
//             $(si_status_overview).append(improvementScore);
//             $(si_status_overview).css("color", improvementColor);
//           } else if (
//             performance*100 >= 0 &&
//             performance*100 < 49
//           ) {
//             color = poorColor 
//             $(strongclass).css("color",poorColor);
//             $(si_status_overview).append(poorScore);
//             $(si_status_overview).css("color",poorColor);
//           }

//           var progressBarOptions = {
//             startAngle: -400.55,
//             size: 100,
//             thickness: 15,
//             value: performance,
//             fill: {
//               color: color,
//             },
//           };
//           $(chartClass)
//             .circleProgress(progressBarOptions)
//             .on(
//               "circle-animation-progress",
//               function (event, progress, stepValue) {
//                 $(this)
//                   .find(".strong")
//                   .text(String(stepValue.toFixed(2)).substr(2));
//               }
//             );
//           var progressBarOptions = {
//             startAngle: -400.55,
//             size: 30,
//             thickness: 10,
//             value: performance,
//             fill: {
//               color: color,
//             },
//           };
//           $(chartOverview)
//             .circleProgress(progressBarOptions)
//             .on(
//               "circle-animation-progress",
//               function (event, progress, stepValue) {
//                 $("#strong").text(String(stepValue.toFixed(2)).substr(2));
//               }
//             );
//         }
//         if (response.page_data_dict.site_map_url != undefined) {
//           responseSitemap = response.page_data_dict.site_map_url;
//           $(sitemapState).text("Detected");
//         } else {
//           $(sitemapState).text("Not Detected");
//         }
//         var resposnsewebsite_seo_data = "";
//         if (response.website_seo_data != undefined) {
//           resposnsewebsite_seo_data = response.website_seo_data;

//           var spf_record = resposnsewebsite_seo_data["output"]["spf_record"];
//           if (spf_record !== null || spf_record !== undefined) {
//             $(spf_spinner).html("");
//             $(SPFState).text("ok");
//             $(SPFState).css("color", goodColor);
//           } else {
//             $(spf_spinner).html("");

//             $(SPFState).text("No SPF record found");
//             $(SPFState).css("color", poorColor);
//           }
//         }

//         var tooltipTriggerList = [].slice.call(
//           document.querySelectorAll('[data-bs-toggle="tooltip"]')
//         );
//         var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//           return new bootstrap.Tooltip(tooltipTriggerEl);
//         });
//       } else {
//         $(".loader").html(" ");
//         console.log(response.error);
//       }
//     },
//   });
  // google analytics ===================
  $(Yesterday).html("");
  $(Week).html("");
  $(Month).html("");

  var p__id = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/site_audit/get_website_analytics/?project_id=" + p__id,
    success: function (response) {
      if (response.status) {
        $("#analytics_loader").html("");

        var obj_keys = Object.keys(response.analytics_data);
        var week = response.analytics_data.week;
        var month = response.analytics_data.month;
        var yesterday = response.analytics_data.yesterday;

        $.each(obj_keys, function (i, val) {
          if (val === "week") {
            $(Week).html("");
            $(Week).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.social_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${week.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${week.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          } else if (val === "month") {
            $(Month).html("");
            $(Month).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.social_visits.predicted}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${month.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${month.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          } else if (val === "yesterday") {
            $(Yesterday).html("");
            $(Yesterday).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.social_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${yesterday.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${week.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          }
        });
      } else {
        setTimeout(() => {
          console.log(response.error);
          $("#analytics_loader").html("");
        }, 20000);
      }
    },
  });
});

setTimeout(() => {
getSiteData();
  // google analytics ===================
  var p_id = $(".radio").attr("data-id");

  $.ajax({
    method: "GET",
    url: "/site_audit/get_website_analytics/?project_id=" + p_id,
    success: function (response) {
      if (response.status) {
        $("#analytics_loader").html("");
        var obj_keys = Object.keys(response.analytics_data);
        var week = response.analytics_data.week;
        var month = response.analytics_data.month;
        var yesterday = response.analytics_data.yesterday;
        $.each(obj_keys, function (i, val) {
          if (val === "week") {
            $(Week).html("");
            $(Week).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${week.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${week.social_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${week.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${week.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          } else if (val === "month") {
            $(Month).html("");
            $(Month).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${month.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${month.social_visits.predicted}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${month.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${month.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          } else if (val === "yesterday") {
            $(Yesterday).html("");
            $(Yesterday).append(`<div class="list_c266">
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Unique Visitors</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.unique_visitors.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.unique_visitors.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Returning Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.returning_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.returning_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Bounce Rate</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.bounce_rate.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.bounce_rate.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Average Visit Length</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.average_visit_length.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.average_visit_length.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.page_views.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.page_views.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Page Views Per Visitor</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.page_views_per_visitor.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.page_views_per_visitor.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Mobile Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.mobile_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.mobile_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Social Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value" >${yesterday.social_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value" >${yesterday.social_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-sm-4 mt-xs-4 mt-md-0 mt-lg-0 sm-xl-0">
      <div class="app-forecast-metric_c266 ">
        <h1 class="c264">Paid Search Visits</h1>
        <div class="carousel slide">
          
          <div class="carousel-item active">
            <div class="stats">
              <div class="actual">
                <div class="label">Actual</div>
                <div class="value">${yesterday.paid_search_visits.actual}</div>
              </div>
              <div class="predicted">
                <div class="label">Predicted</div>
                <div class="value">${week.paid_search_visits.predicted}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
          }
        });
      } else {
        setTimeout(() => {
          console.log(response.error);
          $("#analytics_loader").html("");
        }, 20000);
      }
    },
  });
}, 2000);
