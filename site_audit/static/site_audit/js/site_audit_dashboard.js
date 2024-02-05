$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url = urlParams.get("url");
  // console.log(url);
});
// Initializing variables for site_health_radial charts for  red, green, yellow and no data case
var site_health_radial;
var site_health_radial2;
var site_health_radial3;
var site_health_radial_nodata;
var site_health_radiall;
var site_health_radiall2;
var site_health_radiall3;
var site_health_radial_nodataa;

// Initializing variables for mobile_radial charts for  red, green, yellow and no data case
var mobile_radial;
var mobile_radial2;
var mobile_radial3;
var mobile_radial_nodata1;
var mobile_radial_nodata2;

// Initializing variables for desktop_radial charts for  red, green, yellow and no data case
var desktop_radial;
var desktop_radial2;
var desktop_radial3;
var desktop_radial4;
var desktop_radial5;
var desktop_radial6;
var desktop_radial_nodata1;
var desktop_radial_nodata2;

var URLsResponseObject = [];
$(".img_spinner1").show();
$("#pages_circle").hide();
var HomePageUrl = "";

// function for creating chart between new user and returning users
function dashboardChartTwo(new_user_count, user_count) {
  // code here
  var optionss = {
    labels: ["New Users", "Returning Users"],
    colors: ["#f66d00", "#ffa800"],
    series: [
      Math.round(new_user_count),
      Math.round(user_count - new_user_count),
    ],
    xaxis: {
      show: false,
    },
    chart: {
      color: "#f66d00",
      width: 230,
      type: "pie",
    },
    legend: {
      show: false,
    },
    fill: {
      colors: ["#f66d00", "#ffa800"],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 250,
          },
        },
      },
    ],
  };

  var chart = new ApexCharts(
    document.querySelector("#usersPieChart"),
    optionss
  );
  chart.render();
}

// website health card state
const sitemapState = $("#sitemap-state");
const spf_spinner = $(".spf_spinner");
const SPFState = $("#SPF-state");

// tables var start
var htmlTableDomain = "";
var htmlTableRequestDomain = "";
// tables var end
var generalFailedScore = 0;
var generalWarningScore = 0;
var generalPassedScore = 0;
var GeneralScoreInfoValue = 0;

var GeneralScoreFailedPercent = 0;
var GeneralScoreWarningPercent = 0;
var GeneralScorePassedPercent = 0;
var GeneralScoreInfoPercent = 0;

var commonSeoFailedScore = 0;
var commonSeoWarningScore = 0;
var commonSeoPassedScore = 0;
var commonSeoIssuesScoreInfoValue = 0;

var commonSeoIssuesScoreFailedPercent = 0;
var commonSeoIssuesScoreWarningPercent = 0;
var commonSeoIssuesScorePassedPercent = 0;
var commonSeoIssuesScoreInfoPercent = 0;

var speedOptimizationScoreFailedValue = 0;
var speedOptimizationScoreWarningValue = 0;
var speedOptimizationScorePassedValue = 0;
var speedOptimizationScoreInfoValue = 0;

var speedOptimizationScoreFailedPercent = 0;
var speedOptimizationScoreWarningPercent = 0;
var speedOptimizationScorePassedPercent = 0;
var speedOptimizationScoreInfoPercent = 0;

var serverAndSecurityScoreFailedValue = 0;
var serverAndSecurityScoreWarningValue = 0;
var serverAndSecurityScorePassedValue = 0;
var serverAndSecurityScoreInfoValue = 0;

var serverAndSecurityScoreFailedPercent = 0;
var serverAndSecurityScoreWarningPercent = 0;
var serverAndSecurityScorePassedPercent = 0;
var serverAndSecurityScoreInfoPercent = 0;

var mobileUsabilityScoreFailedValue = 0;
var mobileUsabilityScoreWarningValue = 0;
var mobileUsabilityScorePassedValue = 0;
var mobileUsabilityScoreInfoValue = 0;

var mobileUsabilityScoreFailedPercent = 0;
var mobileUsabilityScoreWarningPercent = 0;
var mobileUsabilityScorePassedPercent = 0;
var mobileUsabilityScoreInfoPercent = 0;

var advancedSeoFailedScore = 0;
var advancedSeoWarningScore = 0;
var advancedSeoPassedScore = 0;
var advancedSeoScoreInfoValue = 0;

var advancedSeoScoreFailedPercent = 0;
var advancedSeoScoreWarningPercent = 0;
var advancedSeoScorePassedPercent = 0;
var advancedSeoScoreInfoPercent = 0;

var TotalScore = "";

// function for calculating percentage
function progressBarReturn(generalPassedScore, TotalScore) {
  return Math.ceil(Number((generalPassedScore / TotalScore) * 100));
}

// function for updating site health value based on API calls
function UpdateBars() {
  TotalScore = generalFailedScore + generalWarningScore + generalPassedScore;
  GeneralScorePassedPercent = percentage(generalPassedScore, TotalScore);
  GeneralScoreWarningPercent = percentage(generalWarningScore, TotalScore);
  GeneralScoreFailedPercent = percentage(generalFailedScore, TotalScore);

  TotalcommonSeoIssuesScore =
    commonSeoFailedScore + commonSeoWarningScore + commonSeoPassedScore;
  commonSeoIssuesScorePassedPercent = percentage(
    commonSeoPassedScore,
    TotalcommonSeoIssuesScore
  );
  commonSeoIssuesScoreWarningPercent = percentage(
    commonSeoWarningScore,
    TotalcommonSeoIssuesScore
  );
  commonSeoIssuesScoreFailedPercent = percentage(
    commonSeoFailedScore,
    TotalcommonSeoIssuesScore
  );

  TotalspeedOptimizationScore =
    speedOptimizationScoreFailedValue +
    speedOptimizationScoreWarningValue +
    speedOptimizationScorePassedValue;
  speedOptimizationScorePassedPercent = percentage(
    speedOptimizationScorePassedValue,
    TotalspeedOptimizationScore
  );
  speedOptimizationScoreWarningPercent = percentage(
    speedOptimizationScoreWarningValue,
    TotalspeedOptimizationScore
  );
  speedOptimizationScoreFailedPercent = percentage(
    speedOptimizationScoreFailedValue,
    TotalspeedOptimizationScore
  );

  TotalserverAndSecurityScore =
    serverAndSecurityScoreFailedValue +
    serverAndSecurityScoreWarningValue +
    serverAndSecurityScorePassedValue;
  serverAndSecurityScorePassedPercent = percentage(
    serverAndSecurityScorePassedValue,
    TotalserverAndSecurityScore
  );
  serverAndSecurityScoreWarningPercent = percentage(
    serverAndSecurityScoreWarningValue,
    TotalserverAndSecurityScore
  );
  serverAndSecurityScoreFailedPercent = percentage(
    serverAndSecurityScoreFailedValue,
    TotalserverAndSecurityScore
  );

  TotalmobileUsabilityScore =
    mobileUsabilityScoreFailedValue +
    mobileUsabilityScoreWarningValue +
    mobileUsabilityScorePassedValue;
  mobileUsabilityScorePassedPercent = percentage(
    mobileUsabilityScorePassedValue,
    TotalmobileUsabilityScore
  );
  mobileUsabilityScoreWarningPercent = percentage(
    mobileUsabilityScoreWarningValue,
    TotalmobileUsabilityScore
  );
  mobileUsabilityScoreFailedPercent = percentage(
    mobileUsabilityScoreFailedValue,
    TotalmobileUsabilityScore
  );

  TotaladvancedSeoScore =
    advancedSeoFailedScore + advancedSeoWarningScore + advancedSeoPassedScore;
  advancedSeoScorePassedPercent = percentage(
    advancedSeoPassedScore,
    TotaladvancedSeoScore
  );
  advancedSeoScoreWarningPercent = percentage(
    advancedSeoWarningScore,
    TotaladvancedSeoScore
  );
  advancedSeoScoreFailedPercent = percentage(
    advancedSeoFailedScore,
    TotaladvancedSeoScore
  );

  $(".check_scr_spinner").hide();
  $(".p_spinner_cls").show();

  $(".failed_val").html(`${generalFailedScore}`);
  $(".warning_val").html(`${generalWarningScore}`);
  $(".passed_val").html(`${generalPassedScore}`);

  $(".gn.progress-bar.bg-fail").css("width", GeneralScoreFailedPercent + "%");
  $(".gn.progress-bar.bg-warn").css("width", GeneralScoreWarningPercent + "%");
  $(".gn.progress-bar.bg-pass").css("width", GeneralScorePassedPercent + "%");

  // $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  // $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  // $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");

  if (GeneralScoreFailedPercent <= 8) {
    $(".progress-bar.red").css("width", "8%");
  } else {
    $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  }

  if (GeneralScoreWarningPercent <= 8) {
    $(".progress-bar.yellow").css("width", "8%");
  } else {
    $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  }

  if (GeneralScorePassedPercent <= 8) {
    $(".progress-bar.green").css("width", "8%");
  } else {
    $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");
  }

  $(".progress-bar.bg-red").attr("aria-valuenow", GeneralScoreFailedPercent);
  $(".progress-bar.bg-yellow").attr(
    "aria-valuenow",
    GeneralScoreWarningPercent
  );
  $(".progress-bar.bg-green").attr("aria-valuenow", GeneralScorePassedPercent);

  $(".progress-bar.bg-red").css("width", GeneralScoreFailedPercent + "%");
  $(".progress-bar.bg-yellow").css("width", GeneralScoreWarningPercent + "%");
  $(".progress-bar.bg-green").css("width", GeneralScorePassedPercent + "%");

  var red_lower_range = 0;
  var red_upper_range = 49;
  var yellow_lower_range = 50;
  var yellow_upper_range = 89;
  var green_lower_range = 90;
  var green_upper_range = 100;

  var health =
    generalPassedScore === 0 && TotalScore === 0
      ? undefined
      : progressBarReturn(generalPassedScore, TotalScore);
  $("#web_health_text").removeClass("text-yellow");
  $("#web_health_text").removeClass("text-red");
  $("#web_health_text").removeClass("text-green");
  $(".health_spinner_web").hide();
  $("#siteHealth_radial").html("");
  $("#siteHealth_radial2").html("");

  if (health !== "") {
    $(".card-heading-show").show();
    $(".w_health").removeClass("bord_bottom_analytics");
    $(".w_health").removeClass("bord_bottom_avg");
    $(".w_health").removeClass("bord_bottom_poor");
    $(".w_health").removeClass("bord_bottom_good");
    if (health !== undefined) {
      // creating apex chart on the basis of health value
      if (health >= yellow_lower_range && health <= yellow_upper_range) {
        $(".w_health").addClass("bord_bottom_avg");
        $("#web_health_text").addClass("text-yellow");
        var options_ave = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#FF9407",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#FF9407",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#FF9407"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#f5d05f",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#f9cc43",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#fdc828",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#ffc107",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["Average"],
        };
        var options_avee = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#FF9407",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#FF9407",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#FF9407"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#f5d05f",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#f9cc43",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#fdc828",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#ffc107",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["SEO Score"],
        };
        site_health_radial = new ApexCharts(
          document.querySelector("#siteHealth_radial"),
          options_ave
        );
        site_health_radiall = new ApexCharts(
          document.querySelector("#siteHealth_radial2"),
          options_avee
        );

        site_health_radial.render();
        site_health_radiall.render();
      } else if (health >= red_lower_range && health <= red_upper_range) {
        $(".w_health").addClass("bord_bottom_poor");
        $("#web_health_text").addClass("text-red");
        var options_poor = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#ad1e40",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#ad1e40",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#ad1e40"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              // stops: [0, 100]
              colorStops: [
                {
                  offset: 0,
                  color: "#eb4335",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#d92550",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#d92550",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#ad1e40",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["Poor"],
        };
        var options_poorr = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#ad1e40",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#ad1e40",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#ad1e40"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              // stops: [0, 100]
              colorStops: [
                {
                  offset: 0,
                  color: "#eb4335",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#d92550",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#d92550",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#ad1e40",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["SEO Score"],
        };
        site_health_radial2 = new ApexCharts(
          document.querySelector("#siteHealth_radial"),
          options_poor
        );
        site_health_radiall2 = new ApexCharts(
          document.querySelector("#siteHealth_radial2"),
          options_poorr
        );

        site_health_radial2.render();
        site_health_radiall2.render();
      } else if (health >= green_lower_range && health <= green_upper_range) {
        $(".w_health").addClass("bord_bottom_good");
        $("#web_health_text").addClass("text-green");
        var options_good = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#3ac47d",
                  fontSize: "15px",
                  fontWeight: "bold",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#3ac47d",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#3ac47d"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              // stops: [0, 100]
              colorStops: [
                {
                  offset: 0,
                  color: "#8dd37a",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#80cf6a",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#6bcf4f",
                  opacity: 1,
                },
                {
                  offset: 80,
                  color: "#3bb11a",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#279109",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["Good"],
        };
        var options_goodd = {
          series: [health],
          chart: {
            height: 220,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35,
                },
              },

              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#3ac47d",
                  fontSize: "15px",
                  fontWeight: "bold",
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: "#3ac47d",
                  fontSize: "36px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#3ac47d"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              // stops: [0, 100]
              colorStops: [
                {
                  offset: 0,
                  color: "#8dd37a",

                  opacity: 1,
                },
                {
                  offset: 20,
                  color: "#80cf6a",
                  opacity: 1,
                },
                {
                  offset: 60,
                  color: "#6bcf4f",
                  opacity: 1,
                },
                {
                  offset: 80,
                  color: "#3bb11a",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#279109",
                  opacity: 1,
                },
              ],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["Good"],
        };
        site_health_radial3 = new ApexCharts(
          document.querySelector("#siteHealth_radial"),
          options_good
        );
        site_health_radiall3 = new ApexCharts(
          document.querySelector("#siteHealth_radial2"),
          options_goodd
        );

        site_health_radial3.render();
        site_health_radiall3.render();
      }
      $("#siteHealth_radial2").show();
    } else {
      $(".w_health").addClass("bord_bottom_analytics");
      var options_ave = {
        series: [0],
        chart: {
          height: 220,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: 5,
                show: true,
                color: "#808080",
                fontSize: "14px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#808080",
                fontSize: "10px",
                show: false,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#FF9407"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["No data Found"],
      };
      site_health_radial_nodata = new ApexCharts(
        document.querySelector("#siteHealth_radial"),
        options_ave
      );
      site_health_radial_nodataa = new ApexCharts(
        document.querySelector("#siteHealth_radial2"),
        options_ave
      );

      site_health_radial_nodata.render();
      site_health_radial_nodataa.render();
      $("#siteHealth_radial2").show();
    }
  }
}

var url = "";
// this function used to handle response from get_site-live data api
function HandleResponse(response) {
  var resposnseMobileData = "";
  if (
    response.response_mobile !== undefined &&
    response.response_mobile.all_data !== undefined
  ) {
    if (
      response.response_mobile !== undefined &&
      response.response_mobile.all_data !== undefined
    ) {
      resposnseMobileData = response.response_mobile.all_data;
    }
    var resposnseDesktopData = "";
    if (
      response.response_desktop !== undefined &&
      response.response_desktop.all_data !== undefined
    ) {
      resposnseDesktopData = response.response_desktop.all_data;
    }
    var resposnseDesktopPracticeData = "";
    if (
      response.response_desktop !== undefined &&
      response.response_desktop.all_data !== undefined
    ) {
      resposnseDesktopPracticeData = response.response_desktop.all_data;
    }
    var resposnseDesktopSeoData = "";
    if (
      response.response_desktop !== undefined &&
      response.response_desktop.all_data !== undefined
    ) {
      resposnseDesktopSeoData = response.response_desktop.all_data;
    }
    var resposnsewebsite_seo_data = "";
    if (response.website_seo_data !== undefined) {
      resposnsewebsite_seo_data = response.website_seo_data;
    }
  } else {
    ShowNoty(
      "Lighthouse returned error: FAILED_DOCUMENT_REQUEST. Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests. (Details: net::ERR_TIMED_OUT",
      "error"
    );
  }

  var resposnseBrokenLinks = "";
  var resposnseInlineCss = "";
  var resposnsePlainTextEmails = "";
  var resposnseFlash = "";
  var resposnseNestedTables = "";
  var resposnseFavicon = "";
  var resposnseFramsetTags = "";
  var responseDisallowList = "";
  var responseRefreshTag = "";
  var responseDeprecatedTag = "";
  var responseContentEncoding = "";
  var responseSitemap = "";
  var responseDirectoryBrowsing = "";
  var responseSafeBrowsing = "";
  var finalUrl = "";
  if (resposnseDesktopData.lighthouseResult !== undefined) {
    finalUrl = resposnseDesktopData.lighthouseResult.finalUrl;
  } else {
    finalUrl = url;
  }

  if (response.page_data_dict !== undefined) {
    if (response.page_data_dict.broken_links_dict !== undefined) {
      resposnseBrokenLinks = response.page_data_dict.broken_links_dict;
    }
    if (response.page_data_dict.style_inlinecss !== undefined) {
      resposnseInlineCss = response.page_data_dict.style_inlinecss;
    }
    if (response.page_data_dict.emails !== undefined) {
      resposnsePlainTextEmails = response.page_data_dict.emails;
    }
    if (response.page_data_dict.swf_links !== undefined) {
      resposnseFlash = response.page_data_dict.swf_links;
    }
    if (response.page_data_dict.nested_tables !== undefined) {
      resposnseNestedTables = response.page_data_dict.nested_tables;
    }
    if (response.page_data_dict.favicon !== undefined) {
      resposnseFavicon = response.page_data_dict.favicon;
    }
    if (response.page_data_dict.frameset_tags !== undefined) {
      resposnseFramsetTags = response.page_data_dict.frameset_tags;
    }
    if (response.page_data_dict.robot_disallow_list !== undefined) {
      responseDisallowList = response.page_data_dict.robot_disallow_list;
    }
    if (response.page_data_dict.refresh_tag !== undefined) {
      responseRefreshTag = response.page_data_dict.refresh_tag;
    }
    if (response.page_data_dict.deprecated_tags_count !== undefined) {
      responseDeprecatedTag = response.page_data_dict.deprecated_tags_count;
    }
    if (response.page_data_dict.content_encoding !== undefined) {
      responseContentEncoding = response.page_data_dict.content_encoding;
    }
    if (response.page_data_dict.dir_browsing_result !== undefined) {
      responseDirectoryBrowsing = response.page_data_dict.dir_browsing_result;
    }

    if (response.page_data_dict.safe_browsing_result !== undefined) {
      responseSafeBrowsing = response.page_data_dict.safe_browsing_result;
    }

    if (response.page_data_dict.site_map_url !== undefined) {
      responseSitemap = response.page_data_dict.site_map_url;
    }
  } else {
    ShowNoty(
      "We cannot access <b>" +
        url +
        "</b> in order to perform our test! Either the site is not online, or our tool is being blocked by your server.",
      "error"
    );
  }

  $("#finalUrl").html(`${finalUrl}`);
  // mobile usablity
  var mobileUseablity = [
    "Meta Viewport Test",
    "Media Query Responsive Test",
    "Mobile Snapshot Test",
  ];
  generalFailedScore = 0;
  generalWarningScore = 0;
  generalPassedScore = 0;
  GeneralScoreInfoValue = 0;

  GeneralScoreFailedPercent = 0;
  GeneralScoreWarningPercent = 0;
  GeneralScorePassedPercent = 0;
  GeneralScoreInfoPercent = 0;

  commonSeoFailedScore = 0;
  commonSeoWarningScore = 0;
  commonSeoPassedScore = 0;
  commonSeoIssuesScoreInfoValue = 0;

  commonSeoIssuesScoreFailedPercent = 0;
  commonSeoIssuesScoreWarningPercent = 0;
  commonSeoIssuesScorePassedPercent = 0;
  commonSeoIssuesScoreInfoPercent = 0;

  speedOptimizationScoreFailedValue = 0;
  speedOptimizationScoreWarningValue = 0;
  speedOptimizationScorePassedValue = 0;
  speedOptimizationScoreInfoValue = 0;

  speedOptimizationScoreFailedPercent = 0;
  speedOptimizationScoreWarningPercent = 0;
  speedOptimizationScorePassedPercent = 0;
  speedOptimizationScoreInfoPercent = 0;

  serverAndSecurityScoreFailedValue = 0;
  serverAndSecurityScoreWarningValue = 0;
  serverAndSecurityScorePassedValue = 0;
  serverAndSecurityScoreInfoValue = 0;

  serverAndSecurityScoreFailedPercent = 0;
  serverAndSecurityScoreWarningPercent = 0;
  serverAndSecurityScorePassedPercent = 0;
  serverAndSecurityScoreInfoPercent = 0;

  mobileUsabilityScoreFailedValue = 0;
  mobileUsabilityScoreWarningValue = 0;
  mobileUsabilityScorePassedValue = 0;
  mobileUsabilityScoreInfoValue = 0;

  mobileUsabilityScoreFailedPercent = 0;
  mobileUsabilityScoreWarningPercent = 0;
  mobileUsabilityScorePassedPercent = 0;
  mobileUsabilityScoreInfoPercent = 0;

  advancedSeoFailedScore = 0;
  advancedSeoWarningScore = 0;
  advancedSeoPassedScore = 0;
  advancedSeoScoreInfoValue = 0;

  advancedSeoScoreFailedPercent = 0;
  advancedSeoScoreWarningPercent = 0;
  advancedSeoScorePassedPercent = 0;
  advancedSeoScoreInfoPercent = 0;

  if (jQuery.isEmptyObject(resposnseBrokenLinks) == false) {
    var ChangedScore = "";
    let ResponseKey = "";
    var AuditTitle = "";
    var AuditId = "broken-links";
    var UpdateScoreVar = "";
    for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
      resposnseBrokenLinks
    )) {
      if (
        typeof resposnseDatavalue == "object" &&
        resposnseDatavalue !== null
      ) {
        var SubResponse = resposnseDatavalue;
        if (SubResponse.length > 0) {
          ChangedScore = "Failed";
        } else {
          ChangedScore = "Passed";
        }
      }
    }
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "advancedSeo",
        AuditDescription,
        ChangedScore,
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        advancedSeoPassedScore = advancedSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        advancedSeoFailedScore = advancedSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    var BrokenLinksHtml = "";
    let value = "Broken Links Test";
    let ResponseKey = "";

    var AuditTitle = "";
    var AuditId = "broken-links";
    ChangedScore = "Passed";
    advancedSeoPassedScore = advancedSeoPassedScore + 1;
    generalPassedScore = generalPassedScore + 1;
    UpdateScoreVar = UpdateScore(
      ResponseKey,
      "advancedSeo",
      "",
      ChangedScore,
      AuditId
    );
  }
  // framesetTags start
  if (resposnseFramsetTags !== undefined && resposnseFramsetTags !== []) {
    let value = "Frameset Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "Frameset";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Warning") {
        speedOptimizationScoreWarningValue =
          speedOptimizationScoreWarningValue + 1;
        generalWarningScore = generalWarningScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    // frame test
    let value = "Frameset Test";
    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "Frameset";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Warning") {
        speedOptimizationScoreWarningValue =
          speedOptimizationScoreWarningValue + 1;
        generalWarningScore = generalWarningScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // framesetTags end
  // disalow start
  if (HomePageUrl == url && HomePageUrl !== "") {
    if (responseDisallowList !== undefined) {
      var disAllowList = "";
      disAllowList = responseDisallowList;
      let value = "Disallow Directive Test";
      var ChangedScore = "";
      let ResponseKey = "";

      var AuditId = "disallow-tags";
      var disAllowpopUpbtn = "";
      var ScoreBracketVar = GetScoreBracket("");
      var UpdateScoreVar = "";
      if (disAllowList.length == 0) {
        ChangedScore = "Failed";
      } else {
        ChangedScore = "Passed";
      }
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          AuditDescription,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "advancedSeo",
            "",
            "Info",
            AuditId
          );
        } else if (ChangedScore == "Warning") {
          advancedSeoWarningScore = advancedSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "advancedSeo",
            AuditDescription,
            "Info",
            AuditId
          );
        } else if (ChangedScore == "Failed") {
          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "advancedSeo",
            AuditDescription,
            "Info",
            AuditId
          );
        }
      }
    }
  } else {
    $("#disallow-tags").addClass("InnerPageHidden");
    $("#List-disallow-tags").addClass("InnerPageHidden");
  }
  // disallow end
  // start refrsh tag
  if (responseRefreshTag !== undefined && responseRefreshTag !== []) {
    var ResponseKey = "";
    responseKey = responseRefreshTag;
    var resutlist = "";
    let value = "Meta Refresh Test";
    var ChangedScore = "";

    var AuditId = "refresh_tag";
    if (responseKey.length == 0) {
      ChangedScore = "Passed";
    } else {
      ChangedScore = "Failed";
    }
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "advancedSeo",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        advancedSeoPassedScore = advancedSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        advancedSeoFailedScore = advancedSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // end refresh tag
  // deprecated tags start
  if (responseDeprecatedTag !== undefined) {
    let value = "Deprecated HTML Tags Test";
    var ChangedScore = "";
    let ResponseKey = "";

    var AuditId = "deprecated_tags_count";
    var UpdateScoreVar = "";
    if (
      typeof responseDeprecatedTag == "object" &&
      Object.keys(responseDeprecatedTag).length == 0
    ) {
      ChangedScore = "Passed";
    } else {
      ChangedScore = "Failed";
    }
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var deprecatedTgasList = "";
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "commonSeoIssues",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Warning") {
        commonSeoWarningScore = commonSeoWarningScore + 1;
        generalWarningScore = generalWarningScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
        AuditDescription = "";
      } else if (ChangedScore == "Failed") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // Directory Browsing Test start
  if (responseDirectoryBrowsing !== undefined) {
    let value = "Directory Browsing Test";
    var ChangedScore = "";
    let CustomScore = "";
    let ResponseKey = "";

    var AuditId = "directory-browsing";
    var UpdateScoreVar = "";
    if (responseDirectoryBrowsing == false) {
      ChangedScore = "Passed";
      CustomScore = 100;
    } else {
      ChangedScore = "Failed";
      CustomScore = 0;
    }
    var ScoreBracketVar = GetScoreBracket(CustomScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        AuditDescription,
        ChangedScore,
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        serverAndSecurityScorePassedValue =
          serverAndSecurityScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        serverAndSecurityScoreFailedValue =
          serverAndSecurityScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // Directory browsing test end
  if (responseSafeBrowsing !== undefined) {
    let value = "Safe Browsing Test";
    var ChangedScore = "";
    let CustomScore = "";
    let ResponseKey = "";

    var AuditId = "safe-browsing";
    var UpdateScoreVar = "";
    if (
      responseSafeBrowsing && // 👈 null and undefined check
      Object.keys(responseSafeBrowsing).length === 0 &&
      Object.getPrototypeOf(responseSafeBrowsing) === Object.prototype
    ) {
      ChangedScore = "Passed";
      CustomScore = 100;
    } else {
      ChangedScore = "Failed";
      CustomScore = 0;
    }
    var ScoreBracketVar = GetScoreBracket(CustomScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        AuditDescription,
        ChangedScore,
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        serverAndSecurityScorePassedValue =
          serverAndSecurityScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        serverAndSecurityScoreFailedValue =
          serverAndSecurityScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // Sitemap Test start
  if (HomePageUrl == url && HomePageUrl !== "") {
    if (responseSitemap !== undefined) {
      let value = "Sitemap Test";
      var ChangedScore = "";
      let CustomScore = "";
      let ResponseKey = "";

      var AuditId = "sitemap";
      var UpdateScoreVar = "";
      if (responseSitemap !== false) {
        ChangedScore = "Passed";
        CustomScore = 100;
      } else {
        ChangedScore = "Failed";
        CustomScore = 0;
      }
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      var UpdateScoreVar = "";
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !== ""){
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        } else if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            AuditDescription,
            ChangedScore,
            AuditId
          );
        }
      }
    }
  } else {
    $("#sitemap").addClass("InnerPageHidden");
    $("#List-sitemap").addClass("InnerPageHidden");
  }
  // Sitemap test end
  // deprecated tags end
  if (resposnseFavicon !== undefined && resposnseFavicon.length > 0) {
    let value = "Favicon Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "favicon";
    var UpdateScoreVar = "";
    var protocol = "";
    var domainUrl_ = "";
    var FaviconLink = resposnseFavicon[0];
    var domainUrl = new URL(finalUrl);
    domainUrl_ = domainUrl.hostname;
    protocol = domainUrl.protocol;
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "commonSeoIssues",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Warning") {
        commonSeoWarningScore = commonSeoWarningScore + 1;
        generalWarningScore = generalWarningScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    let value = "Favicon Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "favicon";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "commonSeoIssues",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Warning") {
        commonSeoWarningScore = commonSeoWarningScore + 1;
        generalWarningScore = generalWarningScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }

  if (resposnseInlineCss !== undefined && resposnseInlineCss.length > 0) {
    let value = "Inline CSS Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "inline-css";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "commonSeoIssues",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    let value = "Inline CSS Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "inline-css";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "commonSeoIssues",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  if (resposnseFlash !== undefined && resposnseFlash.length > 0) {
    let value = "Flash Test";
    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "flash";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    let value = "Flash Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "flash";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  if (resposnseNestedTables !== undefined && resposnseNestedTables.length > 0) {
    let value = "Nested Tables Test";
    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "nested-tables";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    let value = "Nested Tables Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "nested-tables";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "speedOptimization",
        AuditDescription,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "speedOptimization",
          AuditDescription,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  if (
    resposnsePlainTextEmails !== undefined &&
    resposnsePlainTextEmails.length > 0
  ) {
    let value = "Plaintext Emails Test";
    var ChangedScore = "Failed";
    let ResponseKey = "";

    var AuditId = "plaintext-emails";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        SeoDataTitle,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        serverAndSecurityScorePassedValue =
          serverAndSecurityScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        serverAndSecurityScoreFailedValue =
          serverAndSecurityScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      }
    }
  } else {
    let value = "Plaintext Emails Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";

    var AuditId = "plaintext-emails";
    var UpdateScoreVar = "";
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var UpdateScoreVar = "";
    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        SeoDataTitle,
        "",
        AuditId
      );
    } else {
      if (ChangedScore == "Passed") {
        serverAndSecurityScorePassedValue =
          serverAndSecurityScorePassedValue + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          "",
          ChangedScore,
          AuditId
        );
      } else if (ChangedScore == "Failed") {
        serverAndSecurityScoreFailedValue =
          serverAndSecurityScoreFailedValue + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "serverAndSecurity",
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      }
    }
  }
  // server signature start
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnsewebsite_seo_data
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      var SubResponse = resposnseDatavalue;
      if (SubResponse["server_attrs"] == "" || SubResponse["server_attrs"]) {
        let ResponseKey = SubResponse["server_attrs"];

        var AuditTitle = "";
        var AuditId = "server_attrs";
        var ChangedScore = "";
        var UpdateScoreVar = "";
        var CustomScore = "";
        if (!SubResponse["server_attrs"]["server_signature"].includes("/")) {
          ChangedScore = "Passed";
          CustomScore = 100;
        } else {
          (ChangedScore = "Failed"), (CustomScore = 0);
        }
        var ScoreBracketVar = GetScoreBracket(CustomScore);

        if (ScoreBracketVar !== "Info" && ChangedScore == "") {
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "serverAndSecurity",
            AuditDescription,
            "",
            AuditId
          );
        } else {
          if (ChangedScore == "Passed") {
            serverAndSecurityScorePassedValue =
              serverAndSecurityScorePassedValue + 1;
            generalPassedScore = generalPassedScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              "",
              ChangedScore,
              AuditId
            );
          } else if (ChangedScore == "Warning") {
            serverAndSecurityScoreWarningValue =
              serverAndSecurityScoreWarningValue + 1;
            generalWarningScore = generalWarningScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else if (ChangedScore == "Failed") {
            serverAndSecurityScoreFailedValue =
              serverAndSecurityScoreFailedValue + 1;
            generalFailedScore = generalFailedScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          }
        }
      }
      // powerd by start
      if (SubResponse["server_attrs"] == "" || SubResponse["server_attrs"]) {
        let ResponseKey = SubResponse["server_attrs"];
        let value = "Website Powered By";

        var AuditTitle = "";
        var AuditId = "x-powered-by";
        var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
        var ChangedScore = "";
        var UpdateScoreVar = "";
        if (SubResponse["server_attrs"]["x_powered_by"] == "") {
          ChangedScore = "Passed";
        } else {
          ChangedScore = "Failed";
        }
        if (ScoreBracketVar !== "Info" && ChangedScore == "") {
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "serverAndSecurity",
            AuditDescription,
            "",
            AuditId
          );
        } else {
          if (ChangedScore == "Passed") {
            serverAndSecurityScorePassedValue =
              serverAndSecurityScorePassedValue + 1;
            generalPassedScore = generalPassedScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              "",
              ChangedScore,
              AuditId
            );
          } else if (ChangedScore == "Warning") {
            serverAndSecurityScoreWarningValue =
              serverAndSecurityScoreWarningValue + 1;
            generalWarningScore = generalWarningScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else if (ChangedScore == "Failed") {
            serverAndSecurityScoreFailedValue =
              serverAndSecurityScoreFailedValue + 1;
            generalFailedScore = generalFailedScore + 1;
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          }
        }
      }
      // x-powerd-by end
    }
  }
  // server signature end
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnseDesktopSeoData
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      if (
        resposnseDatavalue["audits"] !== undefined &&
        typeof resposnseDatavalue["audits"] == "object"
      ) {
        var SubResponse = resposnseDatavalue["audits"];
        if (HomePageUrl == url && HomePageUrl !== "") {
          if (SubResponse["robots-txt"] == "" || SubResponse["robots-txt"]) {
            let ResponseKey = SubResponse["robots-txt"];
            let value = "Robots.txt Test";

            var AuditTitle = "";
            var AuditId = "robots-txt";
            var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
            var ChangedScore = "";
            var UpdateScoreVar = "";
            var RobotsTxt =
              '<a href="' +
              finalUrl +
              'robots.txt" target="_blank">' +
              finalUrl +
              "robots.txt</a>";
            if (SubResponse["robots-txt"]["score"] == 1) {
              AuditDescription =
                "<small>Congratulations! Your site uses a 'robots.txt' file.</small></br></br>" +
                RobotsTxt;
              ChangedScore = "Passed";
            } else if (
              SubResponse["robots-txt"]["score"] == 0 &&
              ResponseKey["title"] == "robots.txt is not valid"
            ) {
              ChangedScore = "Passed";
            } else {
              ChangedScore = "Failed";
            }
            if (ScoreBracketVar !== "Info" && ChangedScore == "") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                "",
                AuditId
              );
            } else {
              if (ChangedScore == "Passed") {
                commonSeoPassedScore = commonSeoPassedScore + 1;
                generalPassedScore = generalPassedScore + 1;
                UpdateScoreVar = UpdateScore(
                  ResponseKey,
                  "commonSeoIssues",
                  "",
                  ChangedScore,
                  AuditId
                );
              } else if (ChangedScore == "Warning") {
                commonSeoWarningScore = commonSeoWarningScore + 1;
                generalWarningScore = generalWarningScore + 1;
                UpdateScoreVar = UpdateScore(
                  ResponseKey,
                  "commonSeoIssues",
                  AuditDescription,
                  ChangedScore,
                  AuditId
                );
              } else if (ChangedScore == "Failed") {
                commonSeoFailedScore = commonSeoFailedScore + 1;
                generalFailedScore = generalFailedScore + 1;
                UpdateScoreVar = UpdateScore(
                  ResponseKey,
                  "commonSeoIssues",
                  AuditDescription,
                  ChangedScore,
                  AuditId
                );
              }
            }
          }
        } else {
          $("#robots-txt").addClass("InnerPageHidden");
          $("#List-robots-txt").addClass("InnerPageHidden");
        }

        // data structure start
        if (
          SubResponse["structured-data"] == "" ||
          SubResponse["structured-data"]
        ) {
          let ResponseKey = SubResponse["structured-data"];
          let value = "Structured Data Test";

          var AuditTitle = "";
          var AuditId = "structured-data";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          var webName = finalUrl;
          webName = webName.replace("https://", "");
          webName = webName.replace("http://", "");
          webName = webName.replace("wwww", "");
          webName = webName.replace(".com", "");
          webName = webName.replace("/", "");
          if (SubResponse["structured-data"]["score"] == null) {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "advancedSeo",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              advancedSeoWarningScore = advancedSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // data strcuture end
        if (SubResponse["is-crawlable"] == "" || SubResponse["is-crawlable"]) {
          let ResponseKey = SubResponse["is-crawlable"];
          let value = "Noindex Tag Test";

          var AuditTitle = "";
          var AuditId = "is-crawlable";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (SubResponse["is-crawlable"]["score"] == 1) {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "advancedSeo",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              advancedSeoWarningScore = advancedSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // is-crawable end
        if (
          SubResponse["crawlable-anchors"] == "" ||
          SubResponse["crawlable-anchors"]
        ) {
          let ResponseKey = SubResponse["crawlable-anchors"];
          let value = "Uncrawlable Tag Tests";

          var AuditTitle = "";
          var AuditId = "nofollow-tags";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (SubResponse["crawlable-anchors"]["score"] == 1) {
            ChangedScore = "Info";
          } else {
            ChangedScore = "Failed";
          }
          var ScoreBracketVar = GetScoreBracket(ChangedScore);
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !== ""){
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "advancedSeo",
              "",
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Info") {
              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (SubResponse["canonical"] == "" || SubResponse["canonical"]) {
          let ResponseKey = SubResponse["canonical"];
          var AuditTitle = "";
          var AuditId = "canonicalTags";
          var advanceSeoDataDescription = "";
          var CanonicalLink =
            resposnsewebsite_seo_data["output"]["pages"][0]["additional_info"][
              "canonical"
            ];
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          let SeoDataTitle = "";
          var ChangedScore = "";
          if (ScoreBracketVar == "Info" && CanonicalLink == undefined) {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Info" && CanonicalLink !== undefined) {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Passed";
          }
          var UpdateScoreVar = "";
          var ScoreBracketVar = GetScoreBracket(ChangedScore);
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "advancedSeo",
              SeoDataTitle,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                SeoDataTitle,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // advance seo canonical tags test end
        if (SubResponse["canonical"] == "" || SubResponse["canonical"]) {
          var AuditTitle = "";
          var AuditId = "canonical";
          var SeoDataDescription = "";
          var CanonicalTag = "";
          if (
            resposnsewebsite_seo_data["output"]["pages"][0]["additional_info"][
              "canonical"
            ] !== undefined
          ) {
            CanonicalTag =
              resposnsewebsite_seo_data["output"]["pages"][0][
                "additional_info"
              ]["canonical"][0];
          }

          let SeoDataTitle = "";
          var ChangedScore = "";
          if (CanonicalTag !== undefined && CanonicalTag !== "") {
            CustomScore = 100;
            ChangedScore = "Passed";
          } else {
            CustomScore = 0;
            ChangedScore = "Failed";
          }
          let value = "URL Canonicalization Test";
          var UpdateScoreVar = "";
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          let ResponseKey = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              SeoDataTitle,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              serverAndSecurityScorePassedValue =
                serverAndSecurityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              serverAndSecurityScoreFailedValue =
                serverAndSecurityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                SeoDataTitle,
                ChangedScore,
                AuditId
              );
            }
          }

          // FilterServerAndSecurityIssue = serverAndSecurity.filter(item => !ExcludeServerAndSecurityValues.includes(item));

          $("#List-url-canonicalization")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-url-canonicalization").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        } else {
        }
      }
    }
  }
  // consol eror stART
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnseDesktopPracticeData
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      if (
        resposnseDatavalue["audits"] !== undefined &&
        typeof resposnseDatavalue["audits"] == "object"
      ) {
        var SubResponse = resposnseDatavalue["audits"];
        var ExcludecommonSeoIssueValues = [];
        if (
          SubResponse["image-aspect-ratio"] == "" ||
          SubResponse["image-aspect-ratio"]
        ) {
          let ResponseKey = SubResponse["image-aspect-ratio"];
          imgScorCount = ResponseKey["details"]["items"].length;
          var AuditTitle = SubResponse["image-aspect-ratio"]["title"];
          var AuditId = "image-aspect-ratio";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);

          var ChangedScore = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Info") {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning") {
            ChangedScore = "Failed";
          } else if (ScoreBracketVar == "Failed") {
            ChangedScore = "Failed";
          }

          var UpdateScoreVar = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (
          SubResponse["errors-in-console"] == "" ||
          SubResponse["errors-in-console"]
        ) {
          let ResponseKey = SubResponse["errors-in-console"];
          let value = "Console Errors Test";

          var AuditTitle = "";
          var AuditId = "errors-in-console";

          var ChangedScore = "";
          var CustomScore = "";
          var UpdateScoreVar = "";
          if (ResponseKey["details"]["items"].length == 0) {
            ChangedScore = "Passed";
            CustomScore = 100;
          } else {
            ChangedScore = "Failed";
            CustomScore = 0;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (
          SubResponse["errors-in-console"] == "" ||
          SubResponse["errors-in-console"]
        ) {
          let ResponseKey = SubResponse["errors-in-console"];

          var JsErrorsInConsole = "";
          let Exception = false;
          var jsErrorCount = 0;
          if (ResponseKey["details"]["items"].length > 0) {
            var ErrorItems = ResponseKey["details"]["items"];
            JsErrorsInConsole +=
              "<h6>Js Errors (<span id='JsErrors'></span>):</h6><ul class='consoleErrorList CDNList'>";

            for (const [key, value] of Object.entries(ErrorItems)) {
              if (value["source"] == "exception") {
                Exception = true;
                jsErrorCount = jsErrorCount + 1;
              }

              if (
                value["sourceLocation"] !== undefined &&
                value["source"] == "exception"
              ) {
                JsErrorsInConsole +=
                  "<li><a href=" +
                  value["sourceLocation"]["url"] +
                  " target='_blank' class='mb-1'>" +
                  value["sourceLocation"]["url"] +
                  "</a>";

                JsErrorsInConsole +=
                  "<code>" + value["description"] + "</code></li>";
              } else if (value["source"] == "exception") {
                JsErrorsInConsole +=
                  "<li><code>" + value["description"] + "</code></li>";
              }
            }
            JsErrorsInConsole += "</ul>";
          }

          var AuditTitle = "";
          var AuditId = "js-errors";
          var ChangedScore = "";
          var CustomScore = "";
          var UpdateScoreVar = "";
          if (Exception == false) {
            ChangedScore = "Passed";
            CustomScore = 100;
          } else {
            ChangedScore = "Failed";
            CustomScore = 0;
          }
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // js laibraries start
        if (SubResponse["js-libraries"] == "" || SubResponse["js-libraries"]) {
          var ResponseKey = "";
          var AuditTitle = "";
          var AuditId = "js-libraries";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ResponseKey.length > 0) {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // js laibraies end
        // HTTPS test start
        if (SubResponse["is-on-https"] == "" || SubResponse["is-on-https"]) {
          var ResponseKey = SubResponse["is-on-https"];
          var jsDetectedTabel = "";
          let value = "HTTPS Test";

          var AuditTitle = "";
          var AuditId = "https-encryption";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              serverAndSecurityScorePassedValue =
                serverAndSecurityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              serverAndSecurityScoreFailedValue =
                serverAndSecurityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // https mixed content start
        if (SubResponse["is-on-https"] == "" || SubResponse["is-on-https"]) {
          var ResponseKey = SubResponse["is-on-https"]["details"]["items"];
          var httpLinksList = "";
          $.each(ResponseKey, function (i, val) {
            httpLinksList += `<li>${val.url}</li>`;
          });

          var jsDetectedTabel = "";
          let value = "Mixed Content Test (HTTP over HTTPS)";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "mixed-content-type";
          var ChangedScore = "";
          var UpdateScoreVar = "";
          var checkHttpLinks =
            '<button type="button" class="btn btn-link modalBtn checkHttplinks ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixMixedContent" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          if (ResponseKey.length == 0) {
            AuditDescription =
              "<small>Congratulations! this webpage does not use mixed content - both the initial HTML and all other resources are loaded over HTTPS.</small><br>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>This webpage is using mixed content! While the initial HTML is loaded over a secure HTTPS connection, other resources (such as images, videos, stylesheets, scripts) may be loaded over an insecure HTTP connection, which may result in blocked content or unexpected page behavior.</small>";
            ChangedScore = "Failed";

            var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          }
          // FilterServerAndSecurityIssue = serverAndSecurity.filter(item => !ExcludeServerAndSecurityValues.includes(item));

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !==""){

            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#serverAndSecurityIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              serverAndSecurityScorePassedValue =
                serverAndSecurityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                "",
                ChangedScore,
                AuditId
              );
              $("#mixed-content-type").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check if all resources are loaded over a secure HTTPS connection. Mixed content occurs when initial HTML is loaded over a secure HTTPS connection, but other resources (such as images, videos, stylesheets, scripts) are loaded over an insecure HTTP connection. This is called mixed content because both HTTP and HTTPS content are being loaded to display the same page, and the initial request was secure over HTTPS. Browsers may block mixed content, so fixing this issue helps ensure your content loads as intended"></i></div></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  checkHttpLinks +
                  "<br/>" +
                  modal_btnHTF +
                  "</div>"
              );
              $("#serverAndSecurityIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              serverAndSecurityScoreFailedValue =
                serverAndSecurityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#mixed-content-type").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  "</p>" +
                  checkHttpLinks +
                  "<br/>" +
                  modal_btnHTF +
                  '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check if all resources are loaded over a secure HTTPS connection. Mixed content occurs when initial HTML is loaded over a secure HTTPS connection, but other resources (such as images, videos, stylesheets, scripts) are loaded over an insecure HTTP connection. This is called mixed content because both HTTP and HTTPS content are being loaded to display the same page, and the initial request was secure over HTTPS. Browsers may block mixed content, so fixing this issue helps ensure your content loads as intended"></i></div></div><hr />'
              );
            }
          }

          $("#List-mixed-content-type")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-mixed-content-type").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on(
            "click",
            ".modalBtn.HowToFixMixedContent",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>In order to pass this test, make sure that all resources on the page are loaded over HTTPS.</div></div>';

              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
          // see deatil modal
          $(document).on("click", ".modalBtn.checkHttplinks", function () {
            let HowToFix = `<ul class="bulleted-list">${httpLinksList}</ul>`;

            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabel").text("Full list of insecure resources");
          });
        }

        // https mixed content end
      }
    }
  }

  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnseMobileData
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      if (
        resposnseDatavalue["audits"] !== undefined &&
        typeof resposnseDatavalue["audits"] == "object"
      ) {
        var SubResponse = resposnseDatavalue["audits"];
        if (SubResponse["diagnostics"] == "" || SubResponse["diagnostics"]) {
          let ResponseKey = SubResponse["diagnostics"];

          var AuditTitle = "";
          var AuditId = "diagnostics";
          var ChangedScore = "";
          var mainDocumentTransferSize =
            ResponseKey.details.items[0].mainDocumentTransferSize;
          mainDocumentTransferSize = bytesToSize(mainDocumentTransferSize);
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          DocSize = mainDocumentTransferSize.replace(" KB", "");
          if (DocSize > 33) {
            ChangedScore = "Failed";
          } else {
            ChangedScore = "Passed";
          }
          let value = "HTML Page Size Test";
          var UpdateScoreVar = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              "",
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let ResponseKey = SubResponse["network-requests"];

          var AuditTitle = "";
          var AuditId = "Html_compression";

          var resourceSize = "";
          var transferSize = "";
          var getFinalUrl = "";
          var resourceSize = "";
          getFinalUrl = ResponseKey.details.items;
          $.each(getFinalUrl, function (i, val) {
            if (val.url === finalUrl) {
              resourceSize = val.resourceSize;
              transferSize = val.transferSize;
              return false;
            }
          });
          resourceSize = formatBytes(resourceSize);
          transferSize = formatBytes(transferSize);
          var CompressionCheck = responseContentEncoding;
          var ChangedScore = "";
          var UpdateScoreVar = "";
          var CustomScore = "";
          var percentage = "";
          if (
            CompressionCheck !== "" ||
            CompressionCheck !== null ||
            CompressionCheck !== undefined
          ) {
            ChangedScore = "Passed";
            CustomScore = 100;
          } else {
            percentage = 100 - ((RS / TS) * 100).toFixed(2);
            AuditDescription =
              "<small>Your webpage does not use any HTML compression! You should compress your HTML to reduce your page size and page loading times - this will help your site retain visitors and increase page views. If you were using compression, you could be compressing your HTML size by <b>" +
              percentage.toFixed(0) +
              "%</b> - from <b>" +
              transferSize +
              "</b> to <b>" +
              resourceSize +
              "</b> .</small>";
            ChangedScore = "Failed";
            CustomScore = 0;
          }
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          let value = "HTML Compression/GZIP Test";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (
          SubResponse["network-requests"]["details"]["items"] == "" ||
          SubResponse["network-requests"]["details"]["items"]
        ) {
          var AuditTitle = "";
          var AuditId = "Doctype";

          let ResponseKey = "";
          var SeoDataTitle = "";

          var ChangedScore = "";
          var DocType = "<code>&lt;!DOCTYPE html&gt;</code>";
          var DocTypeResponse = "";
          DocTypeResponse = SubResponse["network-requests"]["details"]["items"];
          $.each(DocTypeResponse, function (index, value) {
            if (value.url === finalUrl) {
              AuditDescription =
                "Congratulations! Your website has a doctype declaration:";
              CustomScore = 100;
              ChangedScore = "Passed";
              DocType = "<code>&lt;!DOCTYPE html&gt;</code>";
              return false;
            } else {
              AuditDescription =
                "The doctype declaration is missing from your page!";
              CustomScore = 0;
              ChangedScore = "Failed";
            }
          });

          let value = "Doctype Test";
          var UpdateScoreVar = "";
          var ScoreBracketVar = GetScoreBracket(CustomScore);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              "",
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }

        if (SubResponse["speed-index"] == "" || SubResponse["speed-index"]) {
          var LoadingSpeed = SubResponse["speed-index"]["displayValue"];
          // alert(displayValue)
          let ResponseKey = SubResponse["speed-index"];
          let value = "Site Loading Speed Test";

          var AuditTitle = "";
          var AuditId = "speed-index";
          Speed = LoadingSpeed.replace("s", "");
          Speed = Number(Speed);
          var UpdateScoreVar = "";
          var ChangedScore = "";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          if (Speed < 5) {
            ChangedScore = "Passed";
          } else if ((Speed = 5)) {
            ChangedScore = "Warning";
          } else if (Speed > 5) {
            ChangedScore = "Failed";
          }
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // /====
        if (SubResponse["redirects"] == "" || SubResponse["redirects"]) {
          let ResponseKey = SubResponse["redirects"];
          let value = "URL Redirects Test";

          var AuditTitle = "";
          var AuditId = "redirects";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (SubResponse["redirects"]["details"]["items"].length == 0) {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Warning";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // ============
        if (
          SubResponse["unminified-css"] == "" ||
          SubResponse["unminified-css"]
        ) {
          let ResponseKey = SubResponse["unminified-css"];
          let RemainingCss =
            SubResponse["network-requests"]["details"]["items"];
          let value = "CSS Minification Test";

          var AuditTitle = "";
          var AuditId = "unminified-css";
          var UpdateScoreVar = "";
          var ChangedScore = "";
          let CustomScore = "";
          var unminifiedCss = ResponseKey["details"]["items"];
          if (unminifiedCss.length > 0) {
            ChangedScore = "Failed";
            CustomScore = 0;
          } else {
            ChangedScore = "Passed";
            CustomScore = 100;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              "",
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Warning") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }
        }
        // ================
        if (
          SubResponse["unminified-javascript"] == "" ||
          SubResponse["unminified-javascript"]
        ) {
          let ResponseKey = SubResponse["unminified-javascript"];

          var AuditTitle = "";
          var AuditId = "unminified-javascript";
          var UpdateScoreVar = "";
          var ChangedScore = "";
          let CustomScore = "";
          var unminifiedJs = ResponseKey["details"]["items"];
          if (unminifiedJs.length > 0) {
            ChangedScore = "Failed";
            CustomScore = 0;
          } else {
            ChangedScore = "Passed";
            CustomScore = 100;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              "",
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Warning") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }
        }
        // ================
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          var AuditTitle = "";
          var AuditId = "uses-long-cache-ttl";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning") {
            ChangedScore = "Warning";
          } else if (ScoreBracketVar == "Failed") {
            ChangedScore = "Failed";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }

        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          var AuditTitle = "";
          var AuditId = "image-cache-ttl";
          var CustomScore = "";
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }

        // image cache end
        // js cache start
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          var AuditTitle = "";
          var AuditId = "js-cache-ttl";
          var CustomScore = "";
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // js cache end
        // css cache start
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          var AuditTitle = "";
          var AuditId = "css-cache-ttl";
          var CustomScore = "";
          let CssArray = [];
          if (CssArray.length !== 0) {
            CustomScore = 0;
          } else {
            CustomScore = 100;
          }
          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }

        if (
          SubResponse["uses-responsive-images"] == "" ||
          SubResponse["uses-responsive-images"]
        ) {
          let ResponseKey = SubResponse["uses-responsive-images"];
          var scorCount = "";
          scorCount = ResponseKey["details"]["items"].length;
          var AuditTitle = SubResponse["uses-responsive-images"]["title"];
          var AuditId = "uses-responsive-images";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);

          var ChangedScore = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Info" && scorCount == 0) {
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning" && scorCount > 0) {
            ChangedScore = "Warning";
          } else if (ScoreBracketVar == "Failed" && scorCount > 0) {
            ChangedScore = "Failed";
          }
          var UpdateScoreVar = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Warning") {
              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        // Google analytics Start
        if (
          SubResponse["third-party-summary"] == "" ||
          SubResponse["third-party-summary"]
        ) {
          let ResponseKey = "";
          let Result = "";
          if (SubResponse["third-party-summary"]["details"] !== undefined) {
            Result = SubResponse["third-party-summary"]["details"]["items"];
          }
          var GoogleAnalyticsConfirmation = false;
          var ScoreBracketVar = "";
          if (GoogleAnalyticsConfirmation == false) {
            ScoreBracketVar = "Failed";
          } else {
            ScoreBracketVar = "Passed";
          }

          var AuditTitle = SubResponse["unsized-images"]["title"];
          var CustomScore = "";
          var AuditId = "google-analytics";

          var ChangedScore = "";
          if (ScoreBracketVar == "Passed") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }

          var UpdateScoreVar = "";

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "commonSeoIssues",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
            } else if (ChangedScore == "Failed") {
              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }
        }
        if (
          SubResponse["resource-summary"] == "" ||
          SubResponse["resource-summary"]
        ) {
          var displayValue = SubResponse["resource-summary"]["displayValue"];
          displayValue = parseInt(displayValue);

          let value = "Page Objects Test";

          var AuditTitle = "";
          var AuditId = "critical-request-chains";
          var ResponseKey = SubResponse["uses-long-cache-ttl"];
          if (displayValue > 20) {
            ChangedScore = "Failed";
          } else {
            ChangedScore = "Passed";
          }
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var UpdateScoreVar = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription
            );
          } else {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore
            );

            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }
        }

        // seconds tables

        // ===================

        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let value = "CDN Usage Test";

          var AuditTitle = "";
          var AuditId = "CDN-usage-network-requests";
          let ResponseKey = SubResponse["network-requests"];

          var NetworkRequests =
            SubResponse["network-requests"]["details"]["items"];

          // var KeywordsCountTagsLi="";
          var AllCDNs = false;
          var SelfUrl = "";
          let ImagesArray = [];
          var CssArray = [];
          var JsArray = [];
          var CDNImagesArray = [];
          var CDNCssArray = [];
          var CDNJsArray = [];

          if (typeof NetworkRequests == "object") {
            SelfUrl = NetworkRequests[0]["url"];
            for (const property in NetworkRequests) {
              let mime_type = `${property}: ${NetworkRequests[property]["mimeType"]}`;

              let Resource_Type = `${NetworkRequests[property]["resourceType"]}`;
              let Network_URL = NetworkRequests[property]["url"];
              if (Resource_Type == "Image") {
                if (Network_URL.includes(SelfUrl)) {
                  ImagesArray.push(Network_URL);
                } else if (!Network_URL.includes("data:image/svg+xml")) {
                  CDNImagesArray.push(Network_URL);
                }

                // data:image/svg
              } else if (Resource_Type == "Stylesheet") {
                if (Network_URL.includes(SelfUrl)) {
                  CssArray.push(Network_URL);
                } else {
                  CDNCssArray.push(Network_URL);
                }
              } else if (Resource_Type == "Script") {
                if (Network_URL.includes(SelfUrl)) {
                  JsArray.push(Network_URL);
                } else {
                  CDNJsArray.push(Network_URL);
                }
              }
            }
          }
          if (
            ImagesArray.length == 0 &&
            CssArray.length == 0 &&
            JsArray.length == 0
          ) {
            AllCDNs = true;
          }
          var SeoDataTitle = "";
          var ChangedScore = "";
          if (AllCDNs == true) {
            SeoDataTitle =
              "Your webpage is serving all images, javascript and css resources from CDNs.";
            CustomScore = "";
            ChangedScore = "Passed";
          } else {
            SeoDataTitle =
              "Your webpage is not serving all resources (images, javascript and css) from CDNs.";
            CustomScore = "";
            ChangedScore = "Warning";
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var UpdateScoreVar = "";

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "speedOptimization",
              AuditDescription,
              ChangedScore,
              AuditId
            );

            if (ChangedScore == "Passed") {
              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Warning") {
              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }
        }
        UpdateBars();
      }
    }
  }
  // resposnseMobileData object
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnseMobileData
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      if (
        resposnseDatavalue["audits"] !== undefined &&
        typeof resposnseDatavalue["audits"] == "object"
      ) {
        var SubResponse = resposnseDatavalue["audits"];

        // mobileUseablity  start
        var ExcludeMobileUseAblityValues = [];
        var FilterMobileUseAbilityIssue = [];

        // http protocol start
        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let value = "HTTP2 Test";

          var AuditTitle = "";
          var AuditId = "protocol";
          var ChangedScore = "";
          let CustomScore = "";
          var protocolDes = "";
          let ResponseKey = SubResponse["network-requests"];

          var NetworkRequests =
            SubResponse["network-requests"]["details"]["items"];
          var itemsUrl = "";
          var itemUrlProtocol = "";

          // itemsUrl = NetworkRequests['url'];

          for (const [key, value] of Object.entries(NetworkRequests)) {
            if (finalUrl == value["url"]) {
              itemUrlProtocol = value.protocol;
            }
          }

          if (itemUrlProtocol == "http/2" || itemUrlProtocol == "h2") {
            ChangedScore = "Passed";
          } else {
            ChangedScore = "Failed";
          }
          // var KeywordsCountTagsLi="";

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var UpdateScoreVar = "";
          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              "",
              AuditId
            );
          } else {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );

            if (ChangedScore == "Passed") {
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  protocolDes +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#serverAndSecurityIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              serverAndSecurityScorePassedValue =
                serverAndSecurityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              protocolDes = "This webpage is using the HTTP/2 protocol.";

              $("#http2").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  protocolDes +
                  '</p> </div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if the webpage and all resources are served over HTTP/2. As the first major HTTP protocol update since 1997, HTTP/2 offers several key improvements such as increased speed and security." /></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  protocolDes +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#serverAndSecurityIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              serverAndSecurityScoreWarningValue =
                serverAndSecurityScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  protocolDes +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#serverAndSecurityIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              serverAndSecurityScoreFailedValue =
                serverAndSecurityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              protocolDes = "This webpage is not using the HTTP/2 protocol!";

              $("#http2").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  protocolDes +
                  '</p> </div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if the webpage and all resources are served over HTTP/2. As the first major HTTP protocol update since 1997, HTTP/2 offers several key improvements such as increased speed and security." /></div><hr />'
              );
            }
          }

          $("#List-http2").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-http2").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }
        // http protocol end
        // ===================
        if (SubResponse["viewport"] == "" || SubResponse["viewport"]) {
          var viewPort = SubResponse["viewport"]["title"];
          viewPort = viewPort.replace("Has a `", "");
          viewPort = viewPort.replace("`", "");
          viewPort = viewPort.replace("`width`", "width");
          viewPort = viewPort.replace("`initial-scale`", "initial-scale");
          viewPort = viewPort.replace("<", "");
          viewPort = viewPort.replace(">", "");

          var AuditTitle = "";

          ChangedScore = "";
          let ResponseKey = SubResponse["viewport"];
          var ScoreBracketVar = "";
          ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);

          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            AuditTitle = "This webpage is using a viewport meta tag.";

            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Failed") {
            AuditTitle = "This webpage is not using a viewport meta tag.";

            ChangedScore = "Failed";
          }

          var AuditId = "viewport";
          //    var AuditDescription = SubResponse['viewport']['description'];

          var AuditDescription = `<code>${viewPort}</code>`;

          let value = "Meta Viewport Test";
          ExcludeMobileUseAblityValues.push(value);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !==""){

            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "mobileUsability",
              AuditTitle,
              ChangedScore,
              AuditId
            );
          } else {
            if (ChangedScore == "Passed") {
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray"><label>' +
                  AuditTitle +
                  "</label>" +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              //$("#mobileUsabilityIssuesDetails_passed li ul").html("")
              $("#mobileUsabilityIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              mobileUsabilityScorePassedValue =
                mobileUsabilityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "mobileUsability",
                "",
                ChangedScore,
                AuditId
              );
              $("#viewportmobile").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><label>' +
                  AuditTitle +
                  '</label><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check if the webpage is using a viewport meta tag, which is necessary for responsive web design. Without a viewport meta tag, mobile devices render pages at typical desktop screen widths and then scale the pages down, making them difficult to read. Setting the viewport meta tag lets you control the width and scaling of the viewport so that its sized correctly on all devices."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  "</h6><label>" +
                  AuditTitle +
                  '</label><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#mobileUsabilityIssuesDetails_failed li ul").html("")
              $("#mobileUsabilityIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              mobileUsabilityScoreFailedValue =
                mobileUsabilityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "mobileUsability",
                AuditTitle,
                ChangedScore,
                AuditId
              );
              $("#viewportmobile").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><label>' +
                  AuditTitle +
                  '</label><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check if the webpage is using a viewport meta tag, which is necessary for responsive web design. Without a viewport meta tag, mobile devices render pages at typical desktop screen widths and then scale the pages down, making them difficult to read. Setting the viewport meta tag lets you control the width and scaling of the viewport so that its sized correctly on all devices."></i></div></div><hr />'
              );
            }
          }

          // FilterMobileUseAbilityIssue = mobileUseablity.filter(item => ! ExcludeMobileUseAblityValues.includes(item));

          $("#List-viewportmobile")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-viewportmobile").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }

        if (
          SubResponse["screenshot-thumbnails"] == "" ||
          SubResponse["screenshot-thumbnails"]
        ) {
          var image = new Image();
          let thumb_leng = Object.keys(
            SubResponse["screenshot-thumbnails"]["details"]["items"]
          );

          image =
            SubResponse["screenshot-thumbnails"]["details"]["items"][
              thumb_leng.length - 1
            ]["data"];
          let ResponseKey = image;
          var img = "";
          // document.body.appendChild(Image);
          var AuditTitle = "";
          var AuditId = "final-screenshot";

          let value = "Mobile Snapshot Test";
          ExcludeMobileUseAblityValues.push(value);

          if (image !== undefined || image !== null) {
            img = `<img src="${image}">`;
            CustomScore = 100;
            ChangedScore = "Passed";
          } else {
            img = "Failed to get Screen Shot";
            CustomScore = 0;
            ChangedScore = "Failed";
          }

          var UpdateScoreVar = "";

          var ScoreBracketVar = GetScoreBracket(CustomScore);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !==""){

            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "mobileUsability",
              "",
              "",
              AuditId
            );
          } else {
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "mobileUsability",
              "",
              ChangedScore,
              AuditId
            );

            if (ChangedScore == "Passed") {
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof img === "undefined" ? "" : img) +
                  "</div>"
              );
              $("#mobileUsabilityIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-green">' +
                  value +
                  '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              mobileUsabilityScorePassedValue =
                mobileUsabilityScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof img === "undefined" ? "" : img) +
                  "</div>"
              );
              $("#mobileUsabilityIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              $("#allIssuesDetails_failed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-red">' +
                  value +
                  '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              mobileUsabilityScoreFailedValue =
                mobileUsabilityScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }
          // var UpdateScoreVar = UpdateScore(ResponseKey,'mobileUsabilityScoreFailedValue','mobileUsabilityScoreWarningValue','mobileUsabilityScorePassedValue','mobileUsabilityScoreInfoValue',AuditDescription,'',AuditId)

          $("#mobile-snapshot").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check how your website renders on mobile device"></i><div class="mobile-snapshots"><div class="mobile-view"><div class="image-container">' +
              img +
              "</div></div></div></div></div><hr />"
          );

          FilterMobileUseAbilityIssue = mobileUseablity.filter(
            (item) => !ExcludeMobileUseAblityValues.includes(item)
          );
          $("#List-mobile-snapshot")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-mobile-snapshot").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }
      }
    }
  }
  var spf_record = "";
  var seoWebObj = "";
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnsewebsite_seo_data
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      seoWebObj = resposnseDatavalue["pages"][0];
      spf_record = resposnseDatavalue["spf_record"];
    }
  }
  if (seoWebObj !== undefined && typeof seoWebObj == "object") {
    var SubResponse = seoWebObj;
    var ExcludeSeoWebValues = [];
    if (SubResponse["title"] == "" || SubResponse["title"]) {
      var AuditId = "title";
      var SeoDataDescription = "";
      var SeoDataTitle = "";
      var ChangedScore = "";
      if (SubResponse["additional_info"]["title"] !== undefined) {
        SeoDataDescription = SubResponse["additional_info"]["title"][0];
      }
      if (
        SubResponse["additional_info"] !== undefined &&
        SeoDataDescription !== undefined &&
        SeoDataDescription !== ""
      ) {
        CustomScore = 100;
        ChangedScore = "Passed";
      } else {
        CustomScore = 0;
        ChangedScore = "Failed";
      }
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      let ResponseKey = SubResponse["title"];
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataDescription,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        } else if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataDescription,
            ChangedScore,
            AuditId
          );
        }
      }
    }

    if (SubResponse["description"] == "" || SubResponse["description"]) {
      let ResponseKey = "";
      var SeoDataDescription = "";
      var AuditId = "description";
      var SeoDataTitle = "";
      var ChangedScore = "";
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        } else if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
      }
    }
    if (
      SubResponse["title"] == "" ||
      SubResponse["description"] == "" ||
      SubResponse["title"] ||
      SubResponse["description"]
    ) {
      let ResponseKey = "";
      var SeoDataDescription = "";
      var AuditId = "google-preview";
      var SeoDataTitle = "";
      var ChangedScore = "";
      if (
        SubResponse["additional_info"] !== undefined &&
        SubResponse["additional_info"]["title"] !== undefined
      ) {
        SeoDataTitle = SubResponse["additional_info"]["title"][0];
        CustomScore = 100;
        ChangedScore = "Info";
      } else {
        SeoDataTitle = "";
        CustomScore = 0;
        ChangedScore = "Info";
      }
      if (
        SubResponse["additional_info"] !== undefined &&
        SubResponse["additional_info"]["meta_desc"] !== undefined
      ) {
        SeoDataDescription = SubResponse["additional_info"]["meta_desc"][0];

        CustomScore = 100;
        ChangedScore = "Info";
      } else {
        SeoDataDescription = "";

        CustomScore = 0;
        ChangedScore = "Info";
      }
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      } else {
        if (ChangedScore == "Info") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        }
      }
    }
    if (SubResponse["keywords"] == "" || SubResponse["keywords"]) {
      let ResponseKey = SubResponse["keywords"];
      var SeoDataDescription = SubResponse["keywords"];
      var KeywordsCountTagsLi = "";
      if (typeof SeoDataDescription == "object") {
        for (const [KWkey, KWvalue] of Object.entries(SeoDataDescription).slice(
          0,
          5
        )) {
          var KeywordsCount = KWvalue[0];
          var KeywordText = KWvalue[1];
          KeywordsCountTagsLi +=
            "<li><span class='KWC'>" +
            KeywordsCount +
            "</span><span class='KWT'>" +
            KeywordText +
            "</span></li>";
        }
      }
      var SeoDataTitle = "";
      var ChangedScore = "";
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          "",
          AuditId
        );
        UpdateScoreVar = "Failed";
      } else {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
        if (ChangedScore == "Info") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
      }
    }
    if (SubResponse["keywords"] == "" || SubResponse["keywords"]) {
      let ResponseKey = SubResponse["keywords"];
      var SeoDataDescription = SubResponse["keywords"];
      if (
        SubResponse["additional_info"] !== undefined &&
        SubResponse["additional_info"]["title"] !== undefined
      ) {
        titleCheck = SubResponse["additional_info"]["title"][0].toLowerCase();
      }
      if (
        SubResponse["additional_info"] !== undefined &&
        SubResponse["additional_info"]["meta_desc"] !== undefined
      ) {
        descriptionCheck =
          SubResponse["additional_info"]["meta_desc"][0].toLowerCase();
      }
      var AuditId = "keywords_usage";
      var KWtitleFound = false;
      var KWdescriptionFound = false;
      var KeywordsUsageDescriptionsT = "";
      var KeywordsUsageDescriptionsD = "";
      var SeoDataTitle = "";
      var ChangedScore = "";
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        } else if (ChangedScore == "Warning") {
          commonSeoWarningScore = commonSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        } else if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
      }
      $("#List-common-keywords-usage")
        .removeClass("Failed")
        .addClass(UpdateScoreVar);
    }
    if (SubResponse["keywords"] == "" || SubResponse["keywords"]) {
      let ResponseKey = SubResponse["keywords"];
      var AuditId = "keywords_cloud";
      var SeoDataDescription = SubResponse["keywords"];
      var SeoDataTitle = "";
      var ChangedScore = "";
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        SeoDataTitle = "";
        CustomScore = "";
        ChangedScore = "Info";
      } else {
        SeoDataTitle = "";
        CustomScore = "";
        ChangedScore = "Failed";
      }
      let value = "Keywords Cloud Test";
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){
        UpdateScoreVar = "Failed";
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          "",
          AuditId
        );
      } else {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );

        if (ChangedScore == "Info") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
        $("#List-keywords-cloud")
          .removeClass("Failed")
          .addClass(UpdateScoreVar);
      }
    }
    if (seoWebObj["headings"] == "" || seoWebObj["headings"]) {
      let ResponseKey = SubResponse["headings"];
      var AuditId = "headings";
      var SeoDataDescription = SubResponse["headings"];
      var h1sLength = 0;
      var h2sLength = 0;
      var ChangedScore = "";
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        if (h1sLength > 10 && h2sLength <= 10 && h2sLength > 0) {
          ChangedScore = "Warning";
        } else if (h1sLength > 0 && h1sLength <= 10 && h2sLength > 10) {
          ChangedScore = "Warning";
        } else if (h1sLength > 10 && h2sLength > 10) {
          ChangedScore = "Warning";
        } else if (
          h1sLength <= 10 &&
          h2sLength <= 10 &&
          h1sLength > 0 &&
          h2sLength > 0
        ) {
          ChangedScore = "Passed";
        } else if (h1sLength == 0 && h2sLength !== 0) {
          ChangedScore = "Failed";
        } else if (h1sLength !== 0 && h2sLength == 0) {
          ChangedScore = "Failed";
        }
      }
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(ChangedScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        }
        if (ChangedScore == "Warning") {
          commonSeoWarningScore = commonSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
        if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
      }
      $("#List-heading-tags").removeClass("Failed").addClass(UpdateScoreVar);
    }

    if (seoWebObj["warnings"] == "" || seoWebObj["warnings"]) {
      let ResponseKey = SubResponse["warnings"];
      var AuditId = "warnings";
      var SeoDataDescription = SubResponse["warnings"];
      var h1s = "";
      var h2s = "";
      var ImgAlt = false;
      var ChangedScore = "";
      let value = "Image Alt Test";
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        if (ImgAlt == true) {
          CustomScore = "";
          ChangedScore = "Warning";
        } else {
          CustomScore = "";
          ChangedScore = "Passed";
        }
      }
      var UpdateScoreVar = "";
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          "",
          AuditId
        );
      } else {
        if (ChangedScore == "Passed") {
          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
        }
        if (ChangedScore == "Warning") {
          commonSeoWarningScore = commonSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
        if (ChangedScore == "Failed") {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );
        }
      }
      $("#List-img-alt").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-img-alt").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
    }
    if (spf_record !== undefined) {
      let ResponseKey = "";
      var AuditTitle = "";
      var AuditId = "spf_record";
      var spf = spf_record;
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        SeoDataTitle = "";
        CustomScore = "";
        ChangedScore = "Passed";
      }
      let value = "SPF Records Test";
      var ScoreBracketVar = GetScoreBracket(ChangedScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          "",
          AuditId
        );
      } else {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          ChangedScore,
          AuditId
        );

        if (ChangedScore == "Passed") {
          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else if (ChangedScore == "Failed") {
          advancedSeoFailedScore = advancedSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
      }
    } else {
      let ResponseKey = "";
      var AuditTitle = "";
      var AuditId = "spf_record";
      var ChangedScore = "Failed";
      var ScoreBracketVar = GetScoreBracket(ChangedScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          "",
          AuditId
        );
      } else {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          ChangedScore,
          AuditId
        );
        if (ChangedScore == "Failed") {
          advancedSeoFailedScore = advancedSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
      }
    }
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  // tootip end
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();
    if ($(this).attr("href") !== "#") {
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 95,
        },
        10
      );
    }
  });
}
// this function used for new data search
function NewSearch() {
  $("#CheckSiteSEOContainer").hide();
  $("#responseFailureMsg").show();
  $("#finalUrl").html("");
  $(".failed_val").html(`${0}`);
  $(".warning_val").html(`${0}`);
  $(".passed_val").html(`${0}`);
  $(".gn.progress-bar.bg-fail").css("width", 0 + "%");
  $(".gn.progress-bar.bg-warn").css("width", 0 + "%");
  $(".gn.progress-bar.bg-pass").css("width", 0 + "%");
  // $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  // $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  // $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");

  if (GeneralScoreFailedPercent <= 8) {
    $(".progress-bar.red").css("width", "8%");
  } else {
    $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  }

  if (GeneralScoreWarningPercent <= 8) {
    $(".progress-bar.yellow").css("width", "8%");
  } else {
    $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  }

  if (GeneralScorePassedPercent <= 8) {
    $(".progress-bar.green").css("width", "8%");
  } else {
    $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function bytesToSize(bytes) {
  var sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 KB";
  var i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat(bytes / Math.pow(1000, i), 2).toFixed(2) + " " + sizes[i];
}

function GetScoreBracket(Score) {
  var ScoreBracket = "";
  if (Score !== null && Score !== undefined) {
    var AuditScore = Score * 100;
    if (AuditScore < 50) {
      ScoreBracket = "Failed";
    } else if (AuditScore >= 50 && AuditScore < 90) {
      ScoreBracket = "Warning";
    } else {
      ScoreBracket = "Passed";
    }
  } else {
    ScoreBracket = "Info";
  }
  return ScoreBracket;
}

// function for calculating percentage
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

// function for updating progress counts
function UpdateScore(
  ResponseKey,
  CategoryScore,
  AuditDescription,
  ChangedScore,
  AuditId
) {
  var ScoreBracket = "";
  if (
    ChangedScore == undefined &&
    ResponseKey["score"] !== null &&
    ResponseKey["score"] !== undefined &&
    AuditDescription !== ""
  ) {
    var AuditScore = ResponseKey["score"] * 100;
    var AuditId = AuditId;
    if (AuditScore < 50) {
      if (CategoryScore == "commonSeoIssues") {
        commonSeoFailedScore = commonSeoFailedScore + 1;
        ScoreBracket = "Failed";
      }
      if (CategoryScore == "speedOptimization") {
        speedOptimizationScoreFailedValue =
          speedOptimizationScoreFailedValue + 1;
        ScoreBracket = "Failed";
      }
      if (CategoryScore == "serverAndSecurity") {
        serverAndSecurityScoreFailedValue =
          serverAndSecurityScoreFailedValue + 1;
        ScoreBracket = "Failed";
      }
      if (CategoryScore == "mobileUsability") {
        mobileUsabilityScoreFailedValue = mobileUsabilityScoreFailedValue + 1;
        ScoreBracket = "Failed";
      }
      if (CategoryScore == "advancedSeo") {
        advancedSeoFailedScore = advancedSeoFailedScore + 1;
        ScoreBracket = "Failed";
      }
      generalFailedScore = generalFailedScore + 1;
    } else if (AuditScore >= 50 && AuditScore < 90) {
      if (CategoryScore == "commonSeoIssues") {
        commonSeoWarningScore = commonSeoWarningScore + 1;
        ScoreBracket = "Warning";
      }
      if (CategoryScore == "speedOptimization") {
        speedOptimizationScoreWarningValue =
          speedOptimizationScoreWarningValue + 1;
        ScoreBracket = "Warning";
      }
      if (CategoryScore == "serverAndSecurity") {
        serverAndSecurityScoreWarningValue =
          serverAndSecurityScoreWarningValue + 1;
        ScoreBracket = "Warning";
      }
      if (CategoryScore == "mobileUsability") {
        mobileUsabilityScoreWarningValue = mobileUsabilityScoreWarningValue + 1;
        ScoreBracket = "Warning";
      }
      if (CategoryScore == "advancedSeo") {
        advancedSeoWarningScore = advancedSeoWarningScore + 1;
        ScoreBracket = "Warning";
      }
      generalWarningScore = generalWarningScore + 1;
    } else if (AuditScore >= 90) {
      if (CategoryScore == "commonSeoIssues") {
        commonSeoPassedScore = commonSeoPassedScore + 1;
        ScoreBracket = "Passed";
      }
      if (CategoryScore == "speedOptimization") {
        speedOptimizationScorePassedValue =
          speedOptimizationScorePassedValue + 1;
        ScoreBracket = "Passed";
      }
      if (CategoryScore == "serverAndSecurity") {
        serverAndSecurityScorePassedValue =
          serverAndSecurityScorePassedValue + 1;
        ScoreBracket = "Passed";
      }
      if (CategoryScore == "mobileUsability") {
        mobileUsabilityScorePassedValue = mobileUsabilityScorePassedValue + 1;
        ScoreBracket = "Passed";
      }
      if (CategoryScore == "advancedSeo") {
        advancedSeoPassedScore = advancedSeoPassedScore + 1;
        ScoreBracket = "Passed";
      }
      generalPassedScore = generalPassedScore + 1;
    }
  } else if (ChangedScore !== undefined) {
    var AuditId = AuditId;
    if (CategoryScore == "commonSeoIssues") {
      ScoreBracket = ChangedScore;
      commonSeoIssuesScoreInfoValue = commonSeoIssuesScoreInfoValue + 1;
    }
    if (CategoryScore == "speedOptimization") {
      ScoreBracket = ChangedScore;
      speedOptimizationScoreInfoValue = speedOptimizationScoreInfoValue + 1;
    }
    if (CategoryScore == "serverAndSecurity") {
      ScoreBracket = ChangedScore;
      serverAndSecurityScoreInfoValue = serverAndSecurityScoreInfoValue + 1;
    }
    if (CategoryScore == "mobileUsability") {
      ScoreBracket = ChangedScore;
      mobileUsabilityScoreInfoValue = mobileUsabilityScoreInfoValue + 1;
    }
    if (CategoryScore == "advancedSeo") {
      ScoreBracket = ChangedScore;
      advancedSeoScoreInfoValue = advancedSeoScoreInfoValue + 1;
    }
    GeneralScoreInfoValue = GeneralScoreInfoValue + 1;
    if (ChangedScore == "Passed") {
      scoreClass = "success";
      scoreValue = "Low";
    } else if (ChangedScore == "Warning") {
      scoreClass = "warning";
      scoreValue = "Medium";
    } else if (ChangedScore == "Failed") {
      scoreClass = "danger";
      scoreValue = "High";
    }
  }
  return ScoreBracket;
}
// get site live data start
const red_lower_range = 0;
const red_upper_range = 49;
const yellow_lower_range = 50;
const yellow_upper_range = 89;
const green_lower_range = 90;
const green_upper_range = 100;
var audi_id = setInterval(bottomGraph, 1000);

// function for getting google analytics account  data
function bottomGraph(project_id) {
  var project_id = $("option:selected").attr("data-id");
  if (project_id !== undefined && project_id !== " ") {
    clearInterval(audi_id);
    var todayDate = new Date();
    var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
    var minDate = new Date(new Date().setDate(new Date().getDate() - 30));
    var startDate = minDate;
    var endDate = maxDate;
    var fromdate = moment(startDate).format("YYYY-MM-DD");
    var todate = moment(endDate).format("YYYY-MM-DD");
    var Number_of_sessions_per_user_count = 0;
    var Page_Views = 0;
    var Pages_Session = 0;
    var Avg_Session_Duration = 0;
    var Bounce_Rate = 0;
    $.ajax({
      method: "GET",
      url:
        "/site_audit/audience_overview_data/?project_id=" +
        project_id +
        "&fromdate=" +
        fromdate +
        "&todate=" +
        todate +
        "&continent=&deviceCategory=&channelGrouping=",
      success: function (res) {
        if (res && res.status === false) {
          $("#CheckSiteSEOContainer").hide();
          $("#responseFailureMsg").show();
          $("#finalUrl").html("");
          $(".failed_val").html(`${0}`);
          $(".warning_val").html(`${0}`);
          $(".passed_val").html(`${0}`);
          $(".gn.progress-bar.bg-fail").css("width", 0 + "%");
          $(".gn.progress-bar.bg-warn").css("width", 0 + "%");
          $(".gn.progress-bar.bg-pass").css("width", 0 + "%");
          // $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
          // $(".progress-bar.yellow").css(
          //   "width",
          //   GeneralScoreWarningPercent + "%"
          // );
          // $(".progress-bar.green").css(
          //   "width",
          //   GeneralScorePassedPercent + "%"
          // );
          if (GeneralScoreFailedPercent <= 8) {
            $(".progress-bar.red").css("width", "8%");
          } else {
            $(".progress-bar.red").css(
              "width",
              GeneralScoreFailedPercent + "%"
            );
          }

          if (GeneralScoreWarningPercent <= 8) {
            $(".progress-bar.yellow").css("width", "8%");
          } else {
            $(".progress-bar.yellow").css(
              "width",
              GeneralScoreWarningPercent + "%"
            );
          }

          if (GeneralScorePassedPercent <= 8) {
            $(".progress-bar.green").css("width", "8%");
          } else {
            $(".progress-bar.green").css(
              "width",
              GeneralScorePassedPercent + "%"
            );
          }
          $(".analtics-section-spinner").hide();
          $(".main-spinner").hide();
          $("#dashboard-analytics").show();
          $("#dashboard-chart").hide();
          $(".analtics-section-true").hide();
          $(".positioned-btn ").show();
          $(".analtics-section-false").show();
          $("#conect_g_analytics").removeClass("disabled");
        } else {
          $(".analtics-section-spinner").hide();
          $(".main-spinner").hide();
          $(".analtics-section-false").hide();
          $(".analtics-section-true").show();
          $("#dashboard-analytics").hide();
          $("#dashboard-chart").show();
          $("#conect_g_analytics").addClass("disabled");
          var new_user_count = res.New_Users_Count;
          var user_count = res.Users_Count;
          var session_count = res.Sessions_Count;
          var table3 = res.table3;
          $.each(table3, function (i, val) {
            user_count = Number(val.users).toFixed(1);
            new_user_count = Number(val.newUsers).toFixed(1);
            session_count = Number(val.sessions).toFixed(1);
            Bounce_Rate = Number(val.bounceRate).toFixed(1);
            Avg_Session_Duration = Number(val.avgSessionDuration).toFixed(1);
            Pages_Session = Number(val.pageviewsPerSession).toFixed(1);
            Page_Views = Number(val.pageviews).toFixed(1);
            Number_of_sessions_per_user_count = Number(
              val.sessionsPerUser
            ).toFixed(1);
          });
          // user_count = 100.0;
          // new_user_count = 40.0;
          // Charts
          dashboardChartTwo(new_user_count, user_count);
          $("#usersCount").html("");
          $("#newUsersCount").html("");
          $("#usersSessions").html("");
          $("#pageViews").html("");
          $("#sessionCount").html("");
          $("#pagePerSession").html("");
          $("#sessonDuration").html("");
          $("#bounceRate").html("");
          function kFormatter(num) {
            return Math.abs(num) > 999
              ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)
              : Math.sign(num) * Math.abs(num);
          }
          const ctx1 = document.getElementById("mychart1").getContext("2d");
          const mych1 = new Chart(ctx1, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Users",
                  data: [kFormatter(user_count)],
                  backgroundColor: ["rgb(235, 67, 53,0.5)"],
                  borderColor: ["rgb(235, 67, 53)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },

              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],

                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
          const ctx2 = document.getElementById("mychart2").getContext("2d");
          const mych2 = new Chart(ctx2, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "New Users",
                  data: [kFormatter(new_user_count)],
                  backgroundColor: ["rgb(252, 171, 16,0.5)"],
                  borderColor: ["rgb(252, 171, 16)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });

          const ctx3 = document.getElementById("mychart3").getContext("2d");
          const mych3 = new Chart(ctx3, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Bounce Rate",
                  data: [kFormatter(Bounce_Rate)],
                  backgroundColor: ["rgb(117, 183, 101,0.5)"],
                  borderColor: ["rgb(117, 183, 101)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
          const ctx4 = document.getElementById("mychart4").getContext("2d");
          const mych4 = new Chart(ctx4, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Session Count",
                  data: [kFormatter(session_count)],
                  backgroundColor: ["rgb(0, 0, 255,0.5)"],
                  borderColor: ["rgb(0, 0, 255)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
          const ctx5 = document.getElementById("mychart5").getContext("2d");
          const mych5 = new Chart(ctx5, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Page Views",
                  data: [kFormatter(Page_Views)],
                  backgroundColor: ["rgb(235, 7, 53,0.5)"],
                  borderColor: ["rgb(235, 7, 53)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
          const ctx6 = document.getElementById("mychart6").getContext("2d");
          const mych6 = new Chart(ctx6, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Page Sessions",
                  data: [kFormatter(Pages_Session)],
                  backgroundColor: ["rgb(212, 171, 16,0.5)"],
                  borderColor: ["rgb(212, 171, 16)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
          const ctx7 = document.getElementById("mychart7").getContext("2d");
          const mych7 = new Chart(ctx7, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "Avg Session Duration",
                  data: [kFormatter(Avg_Session_Duration)],
                  backgroundColor: ["rgb(1, 183, 101,0.5)"],
                  borderColor: ["rgb(1, 183, 101)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },
              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],

                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });

          const ctx8 = document.getElementById("mychart8").getContext("2d");
          const mych8 = new Chart(ctx8, {
            type: "bar",
            data: {
              datasets: [
                {
                  label: "No.Of Sessions",
                  data: [kFormatter(Number_of_sessions_per_user_count)],
                  backgroundColor: ["rgb(0, 123, 255,0.5)"],
                  borderColor: ["rgb(0, 123, 255)"],
                  borderWidth: 1,
                  borderRadius: 10,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              responsive: true,
              showTooltips: true,
              tooltips: {
                titleFontSize: 0,
                bodyFontSize: 11,
              },
              legend: {
                display: false, //This will do the task
              },

              scales: {
                xAxes: [
                  {
                    barPercentage: 0.4,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return Math.round(value) + "K";
                      },
                      maxTicksLimit: 3,
                      beginAtZero: "true",
                    },
                  },
                ],
              },
            },
          });
        }
      },
    });
  }
}

function dashboard(url) {
  $.ajax({
    type: "GET",
    url: "/crawler/images_type/?website_url=" + url,
    dataType: "json", // expect html to be returned,
    success: function (response) {
      //$('.crawl-spinner').hide()
      $("#tb_loader").hide();
      $("#pages_circle").show();
      $(".img_spinner1").hide();
      if (response.status === true) {
        var web_scores = response.crawl_pages_detail;
        if (web_scores && web_scores !== undefined) {
          $("#broken").html("");
          if (
            web_scores &&
            web_scores.broken >= 0 &&
            web_scores.broken !== undefined
          ) {
            $("#broken").html(`${web_scores.broken}`);
          } else {
            $("#broken").html("-");
          }
          $("#redirects").html("");
          if (
            web_scores &&
            web_scores.redirects >= 0 &&
            web_scores.redirects !== undefined
          ) {
            $("#redirects").html(`${web_scores.redirects}`);
          } else {
            $("#redirects").html("-");
          }
          $("#healthy").html("");
          if (
            web_scores &&
            web_scores.healthy >= 0 &&
            web_scores.healthy !== undefined
          ) {
            $("#healthy").html(`${web_scores.healthy}`);
          } else {
            $("#healthy").html("-");
          }
          $("#blocked").html("");
          if (
            web_scores &&
            web_scores.blocked >= 0 &&
            web_scores.blocked !== undefined
          ) {
            $("#blocked").html(`${web_scores.blocked}`);
          } else {
            $("#blocked").html("-");
          }
        } else {
          $("#blocked").html("-");
          $("#healthy").html("-");
          $("#redirects").html("-");
          $("#broken").html("-");
        }

        var total_crawl_pages_count = response.total_crawl_pages_count;
        var total_webpages_count = response.total_webpages_count;
        var percentage_count =
          total_webpages_count > 0
            ? Math.floor(
                (total_crawl_pages_count * 100) / response.total_webpages_count
              )
            : "0";
        // console.log("ff", total_crawl_pages_count, response.total_webpages_count)
        // console.log("pp", percentage_count)
        if (
          percentage_count !== undefined &&
          total_crawl_pages_count !== undefined &&
          total_webpages_count !== undefined
        ) {
          $("#total-crawler-pages").html(
            total_crawl_pages_count + "  " + "Pages"
          );
          $("#percentage_count").text(percentage_count + "%");
          $("#page_total").html(
            ` <span id="total-crawler-page">${total_crawl_pages_count}</span>/<span id="total-web-page">${total_webpages_count}</span>`
          );
          $(".crawl-spinner").hide();
          $("#total-crawler-pages").show();
          $("#page_total").show();
        }
        // crawler page start
        var total_crawl_pages_count = response.total_crawl_pages_count;
        var total_webpages_count = response.total_webpages_count;
        var percentage_count;
        if (total_webpages_count >= total_crawl_pages_count) {
          percentage_count =
            total_webpages_count > 0
              ? Math.floor(
                  (total_crawl_pages_count * 100) / total_webpages_count
                )
              : "0";

          $("#total-crawler-page").html(total_crawl_pages_count);
          $("#total-web-page").html(total_webpages_count);
          $("#percentage_count").text(percentage_count + "%");
          $("#spider_img").attr("data-move", percentage_count);
          $(".crawl-spinner").hide();
          $("#total-crawler-pages").show();
          $("#page_total").show();
        } else {
          $("#blocked").html("-");
          $("#healthy").html("-");
          $("#redirects").html("-");
          $("#broken").html("-");

          $("#total-crawler-page").html("-");
          $("#total-web-page").html("-");
          $("#total-crawler-pages").html("-");
          $("#percentage_count").html("-");
          $(".crawl-spinner").hide();
          $("#total-crawler-pages").show();
          $("#page_total").show();
        }
      } else if (
        response.status === false &&
        response.crawl_request_inprocess === true
      ) {
        ShowNoty(
          "Crawled data in process,you may go to Project List for further details",
          "warning"
        );
        $(".crawl-spinner").hide();

        $("#total-crawler-pages").show();
        $("#page_total").show();
        $("#total-crawler-page").html("-");
        $("#total-web-page").html("-");
        $("#total-crawler-pages").html("-");
        $("#percentage_count").html("-");
        $("#blocked").html("-");
        $("#healthy").html("-");
        $("#redirects").html("-");
        $("#imagesCount_spinner").hide();
        $("#broken").html("-");
      } else if (
        response.status === false &&
        response.crawl_request_inprocess === false
      ) {
        // ShowNoty(response.error, "error");
      } else {
        $("#total-crawler-page").html("-");
        $("#total-web-page").html("-");
        $("#total-crawler-pages").html("-");
        $("#percentage_count").html("-");
        $(".crawl-spinner").hide();
        $("#total-crawler-pages").show();
        $("#page_total").show();

        $("#noty_layout__topRight")
          .find("span:nth-child(2)")
          .attr("title", `${response.error}`);
        $("#noty_layout__topRight")
          .find("span:nth-child(2)")
          .addClass("text-elipses");
        $("#blocked").html("-");
        $("#healthy").html("-");
        $("#redirects").html("-");
        $("#imagesCount_spinner").hide();
        $("#broken").html("-");
      }
    },
  });
}

var setP_func = setInterval(performanceFnc, 1000);

// function for getting crawl data
function performanceFnc(url) {
  var url = $("#selectedDomain :selected").val();
  $(".accordionLink").empty();
  $(".accordionLink").attr("href", url);
  $(".accordionLink").attr("title", url);
  $(".accordionLink").html(url);
  if (url !== undefined && url !== "") {
    clearInterval(setP_func);
    dashboard(url);
    // $.ajax({
    //   method: "GET",
    //   url: "/site_audit/crawler_data/?url=" + url,
    //   success: function (response) {
    //     if (!response.crawl_request_inprocess) {
    //       dashboard(url);
    //     } else if (response.crawl_request_inprocess) {
    //       dashboard(url);
    //       $("#blocked").html("-");
    //       $("#healthy").html("-");
    //       $("#redirects").html("-");
    //       $("#broken").html("-");
    //       $("#total-crawler-page").html("-");
    //       $("#total-web-page").html("-");
    //       $("#total-crawler-pages").html("-");
    //       $("#percentage_count").html("-");
    //     }
    //   },
    // });
    //  crawler page end
    // lighthouse api for seo data
    $.ajax({
      type: "GET",
      url: "/site_audit/get_site_live_data/?url=" + url,
      dataType: "json", // expect html to be returned
      success: function (response) {
        if (response) {
          if (response.status) {
            $(".mobile_text").removeClass("text-green text-red text-yellow");
            $(".desktop-text").removeClass("text-green text-red text-yellow");
            UpdateBars();

            if (
              response.response_desktop.all_data.lighthouseResult !==
                undefined &&
              response.response_desktop.all_data.lighthouseResult !== ""
            ) {
              if (
                response.response_desktop.all_data.lighthouseResult !==
                undefined
              ) {
                var destop_response = response.response_desktop.all_data;
                if (
                  destop_response.lighthouseResult !== undefined &&
                  destop_response !== ""
                ) {
                  var desktop_main_response =
                    destop_response.lighthouseResult.categories;
                  if (
                    desktop_main_response !== undefined &&
                    desktop_main_response !== ""
                  ) {
                    var destop_web_performance_score =
                      desktop_main_response["performance"]["score"];
                    var destop_web_performance = Math.ceil(
                      destop_web_performance_score * 100
                    );
                    if (
                      destop_web_performance !== "" &&
                      destop_web_performance !== undefined
                    ) {
                      $("#desktop_web_result").html("");
                      $("#desktop_radial").html("");
                      $("#desktop_web_result").prepend(
                        `${destop_web_performance} %`
                      );
                      $(".card-heading-show").show();
                      $(".d_health").removeClass("bord_bottom_analytics");
                      $(".d_health").removeClass("bord_bottom_avg");
                      $(".d_health").removeClass("bord_bottom_good");
                      $(".d_health").removeClass("bord_bottom_poor");
                      if (destop_web_performance !== undefined) {
                        if (
                          destop_web_performance >= yellow_lower_range &&
                          destop_web_performance <= yellow_upper_range
                        ) {
                          $(".d_health").addClass("bord_bottom_avg");
                          $(".desktop-text").addClass("text-yellow");
                          $("#desktop_icon").html("");
                          $("#desktop_icon").html(
                            "<i class='fa fa-desktop fa-2x'></i>"
                          );
                          $(".health_Desktop_spinner").hide();
                          var options_desktop = {
                            series: [destop_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },

                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#FF9407",
                                    fontSize: "17px",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#FF9407",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#FF9407"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                // stops: [0, 100]
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#f5d05f",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#f9cc43",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#fdc828",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#ffc107",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Average"],
                          };
                          desktop_radial = new ApexCharts(
                            document.querySelector("#desktop_radial"),
                            options_desktop
                          );
                          desktop_radial.render();
                        } else if (
                          destop_web_performance >= red_lower_range &&
                          destop_web_performance <= red_upper_range
                        ) {
                          $(".d_health").addClass("bord_bottom_poor");
                          $(".desktop-text").addClass("text-red");
                          $("#desktop_icon").html("");
                          $("#desktop_icon").html(
                            "<i class='fa fa-desktop fa-2x'></i>"
                          );
                          $(".health_Desktop_spinner").hide();
                          var options_desktop = {
                            series: [destop_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },

                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#ad1e40",
                                    fontSize: "17px",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#ad1e40",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#ad1e40"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#f1776d",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#eb6459",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#e33627",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 80,
                                    color: "#e33627",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#bb1c0e",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Poor"],
                          };
                          desktop_radial2 = new ApexCharts(
                            document.querySelector("#desktop_radial"),
                            options_desktop
                          );
                          desktop_radial2.render();
                        } else if (
                          destop_web_performance >= green_lower_range &&
                          destop_web_performance <= green_upper_range
                        ) {
                          $(".d_health").addClass("bord_bottom_good");
                          $(".desktop-text").addClass("text-green");
                          $("#desktop_icon").html("");
                          $("#desktop_icon").html(
                            "<i class='fa fa-desktop fa-2x'></i>"
                          );
                          $(".health_Desktop_spinner").hide();
                          var options_desktop = {
                            series: [destop_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },
                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#3ac47d",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#3ac47d",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#3ac47d"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#8dd37a",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#80cf6a",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#6bcf4f",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 80,
                                    color: "#3bb11a",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#279109",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Good"],
                          };
                          desktop_radial6 = new ApexCharts(
                            document.querySelector("#desktop_radial"),
                            options_desktop
                          );

                          desktop_radial6.render();
                        }
                      } else {
                        var options_ave = {
                          series: [0],
                          chart: {
                            height: 220,
                            type: "radialBar",
                          },
                          plotOptions: {
                            radialBar: {
                              startAngle: -135,
                              endAngle: 225,
                              hollow: {
                                margin: 0,
                                size: "70%",
                                background: "#fff",
                                image: undefined,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                position: "front",
                                dropShadow: {
                                  enabled: true,
                                  top: 0,
                                  left: 0,
                                  blur: 4,
                                  opacity: 0.24,
                                },
                              },
                              track: {
                                background: "#fff",
                                strokeWidth: "67%",
                                margin: 0, // margin is in pixels
                                dropShadow: {
                                  enabled: true,
                                  top: -3,
                                  left: 0,
                                  blur: 4,
                                  opacity: 0.35,
                                },
                              },

                              dataLabels: {
                                show: true,
                                name: {
                                  offsetY: 5,
                                  show: true,
                                  color: "#808080",
                                  fontSize: "14px",
                                },
                                value: {
                                  formatter: function (val) {
                                    return parseInt(val);
                                  },
                                  color: "#808080",
                                  fontSize: "10px",
                                  show: false,
                                },
                              },
                            },
                          },
                          fill: {
                            type: "gradient",
                            gradient: {
                              shade: "dark",
                              type: "horizontal",
                              shadeIntensity: 0.5,
                              gradientToColors: ["#FF9407"],
                              inverseColors: true,
                              opacityFrom: 1,
                              opacityTo: 1,
                            },
                          },
                          stroke: {
                            lineCap: "round",
                          },
                          labels: ["No data Found"],
                        };
                        desktop_radial_nodata1 = new ApexCharts(
                          document.querySelector("#desktop_radial"),
                          options_ave
                        );
                        desktop_radial_nodata1.render();
                      }
                    }
                  }
                }
              } else {
                $(".health_spinner_web .spinner-border").hide();
                $(".health_mobile_spinner .spinner-border").hide();
                $(".health_mobile_spinner").html("No data found");
                $(".health_Desktop_spinner .spinner-border").hide();
                $(".health_Desktop_spinner").html("No data found");
                $(".health_spinner_web").html("No data found");
                ShowNoty("Performance data not found", "error");
              }
              if (response.response_mobile.all_data !== undefined) {
                var mobile_response = response.response_mobile.all_data;
                if (
                  mobile_response.lighthouseResult !== undefined &&
                  mobile_response.lighthouseResult !== ""
                ) {
                  var mobile_main_response =
                    mobile_response.lighthouseResult.categories;
                  if (
                    mobile_main_response.performance !== undefined &&
                    mobile_main_response !== ""
                  ) {
                    var mobile_web_performance_score =
                      mobile_main_response["performance"]["score"];

                    var mobile_web_performance = Math.ceil(
                      mobile_web_performance_score * 100
                    );
                    // mobile chart
                    if (
                      mobile_web_performance !== "" &&
                      mobile_web_performance !== undefined
                    ) {
                      $("#mobile_web_result").html(
                        `${mobile_web_performance} %`
                      );
                      $(".card-heading-show").show();
                      // $(".m_health").removeClass("bord_bottom_analytics");
                      // $(".m_health").removeClass("bord_bottom_avg");
                      // $(".m_health").removeClass("bord_bottom_poor");
                      // $(".m_health").removeClass("bord_bottom_good");
                      $(".m_health").removeClass(
                        "bord_bottom_analytics bord_bottom_avg bord_bottom_poor bord_bottom_good"
                      );
                      $("#mobile_radial").html("");
                      if (mobile_web_performance !== undefined) {
                        // creating apex chart on the basis of mobile web performance value
                        if (
                          mobile_web_performance >= yellow_lower_range &&
                          mobile_web_performance <= yellow_upper_range
                        ) {
                          $(".m_health").addClass("bord_bottom_avg");
                          $(".mobile_text").addClass("text-yellow");
                          $("#mobile_icon").html("");
                          $("#mobile_icon").html(
                            "<i class='lni lni-mobile iconsize'></i>"
                          );
                          $(".health_mobile_spinner").hide();
                          $(".health_spinner_web .spinner-border").hide();
                          var options_mobile = {
                            series: [mobile_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },

                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#FF9407",
                                    fontSize: "17px",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#FF9407",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#FF9407"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#f5d05f",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#f9cc43",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#fdc828",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#ffc107",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Average"],
                          };
                          mobile_radial = new ApexCharts(
                            document.querySelector("#mobile_radial"),
                            options_mobile
                          );
                          mobile_radial.render();
                          $(".mobile_loader").hide();
                          $("#mobile_score_").append(
                            `${mobile_web_performance}`
                          );
                          new Chart(document.getElementsByClassName("mobile"), {
                            type: "doughnut",
                            animation: {
                              animateScale: true,
                            },
                            data: {
                              datasets: [
                                {
                                  data: [100, mobile_web_performance],
                                  backgroundColor: ["lightgrey", "#ffc107"],
                                },
                              ],
                            },
                            options: {
                              cutoutPercentage: 70,
                              elements: {
                                center: {
                                  text: "dsd",
                                },
                              },
                              responsive: true,
                              legend: false,
                              tooltips: {
                                enabled: false,
                              },
                            },
                          });
                        } else if (
                          mobile_web_performance >= red_lower_range &&
                          mobile_web_performance <= red_upper_range
                        ) {
                          $(".m_health").addClass("bord_bottom_poor");
                          $(".mobile_text").addClass("text-red");
                          $("#mobile_icon").html("");
                          $("#mobile_icon").html(
                            "<i class='lni lni-mobile iconsize'></i>"
                          );
                          $(".health_mobile_spinner").hide();
                          $(".health_spinner_web .spinner-border").hide();
                          var options = {
                            series: [mobile_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },
                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#ad1e40",
                                    fontSize: "17px",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#ad1e40",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#ad1e40"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#f1776d",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#eb6459",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#e33627",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 80,
                                    color: "#e33627",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#bb1c0e",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Poor"],
                          };
                          mobile_radial2 = new ApexCharts(
                            document.querySelector("#mobile_radial"),
                            options
                          );
                          mobile_radial2.render();
                          $(".mobile_loader").hide();
                          $("#mobile_score_").append(
                            `${mobile_web_performance}`
                          );
                          new Chart(document.getElementsByClassName("mobile"), {
                            type: "doughnut",
                            animation: {
                              animateScale: true,
                            },
                            data: {
                              datasets: [
                                {
                                  data: [100, mobile_web_performance],
                                  backgroundColor: ["lightgrey", "#eb4335"],
                                },
                              ],
                            },
                            options: {
                              cutoutPercentage: 70,
                              elements: {
                                center: {
                                  text: "dsd",
                                },
                              },
                              responsive: true,
                              legend: false,
                              tooltips: {
                                enabled: false,
                              },
                            },
                          });
                        } else if (
                          mobile_web_performance >= green_lower_range &&
                          mobile_web_performance <= green_upper_range
                        ) {
                          $(".m_health").addClass("bord_bottom_good");
                          $(".mobile_text").addClass("text-green");
                          $("#mobile_icon").html("");

                          $("#mobile_icon").html(
                            "<i class='lni lni-mobile iconsize'></i>"
                          );
                          $(".health_mobile_spinner").hide();
                          var options_mobile = {
                            series: [mobile_web_performance],
                            chart: {
                              height: 220,
                              type: "radialBar",
                            },
                            plotOptions: {
                              radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                  margin: 0,
                                  size: "70%",
                                  background: "#fff",
                                  image: undefined,
                                  imageOffsetX: 0,
                                  imageOffsetY: 0,
                                  position: "front",
                                  dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                  },
                                },
                                track: {
                                  background: "#fff",
                                  strokeWidth: "67%",
                                  margin: 0, // margin is in pixels
                                  dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35,
                                  },
                                },
                                dataLabels: {
                                  show: true,
                                  name: {
                                    offsetY: -10,
                                    show: true,
                                    color: "#3ac47d",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                  },
                                  value: {
                                    formatter: function (val) {
                                      return parseInt(val);
                                    },
                                    color: "#3ac47d",
                                    fontSize: "36px",
                                    show: true,
                                  },
                                },
                              },
                            },
                            fill: {
                              type: "gradient",
                              gradient: {
                                shade: "dark",
                                type: "horizontal",
                                shadeIntensity: 0.5,
                                gradientToColors: ["#3ac47d"],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "#8dd37a",

                                    opacity: 1,
                                  },
                                  {
                                    offset: 20,
                                    color: "#80cf6a",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 60,
                                    color: "#6bcf4f",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 80,
                                    color: "#3bb11a",
                                    opacity: 1,
                                  },
                                  {
                                    offset: 100,
                                    color: "#279109",
                                    opacity: 1,
                                  },
                                ],
                              },
                            },
                            stroke: {
                              lineCap: "round",
                            },
                            labels: ["Good"],
                          };
                          mobile_radial3 = new ApexCharts(
                            document.querySelector("#mobile_radial"),
                            options_mobile
                          );
                          mobile_radial3.render();
                          $(".mobile_loader").hide();
                          $("#mobile_score_").append(
                            `${mobile_web_performance}`
                          );
                          new Chart(document.getElementsByClassName("mobile"), {
                            type: "doughnut",
                            animation: {
                              animateScale: true,
                            },
                            data: {
                              datasets: [
                                {
                                  data: [100, mobile_web_performance],
                                  backgroundColor: ["lightgrey", "#ff1e41"],
                                },
                              ],
                            },
                            options: {
                              cutoutPercentage: 70,
                              elements: {
                                center: {
                                  text: "dsd",
                                },
                              },
                              responsive: true,
                              legend: false,
                              tooltips: {
                                enabled: false,
                              },
                            },
                          });
                        }
                      } else {
                        $(".health_mobile_spinner").hide();
                        var options_ave = {
                          series: [0],
                          chart: {
                            height: 220,
                            type: "radialBar",
                          },
                          plotOptions: {
                            radialBar: {
                              startAngle: -135,
                              endAngle: 225,
                              hollow: {
                                margin: 0,
                                size: "70%",
                                background: "#fff",
                                image: undefined,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                position: "front",
                                dropShadow: {
                                  enabled: true,
                                  top: 0,
                                  left: 0,
                                  blur: 4,
                                  opacity: 0.24,
                                },
                              },
                              track: {
                                background: "#fff",
                                strokeWidth: "67%",
                                margin: 0, // margin is in pixels
                                dropShadow: {
                                  enabled: true,
                                  top: -3,
                                  left: 0,
                                  blur: 4,
                                  opacity: 0.35,
                                },
                              },

                              dataLabels: {
                                show: true,
                                name: {
                                  offsetY: 5,
                                  show: true,
                                  color: "#808080",
                                  fontSize: "14px",
                                },
                                value: {
                                  formatter: function (val) {
                                    return parseInt(val);
                                  },
                                  color: "#808080",
                                  fontSize: "10px",
                                  show: false,
                                },
                              },
                            },
                          },
                          fill: {
                            type: "gradient",
                            gradient: {
                              shade: "dark",
                              type: "horizontal",
                              shadeIntensity: 0.5,
                              gradientToColors: ["#FF9407"],
                              inverseColors: true,
                              opacityFrom: 1,
                              opacityTo: 1,
                            },
                          },
                          stroke: {
                            lineCap: "round",
                          },
                          labels: ["No data Found"],
                        };
                        mobile_radial_nodata1 = new ApexCharts(
                          document.querySelector("#mobile_radial"),
                          options_ave
                        );
                        mobile_radial_nodata1.render();
                      }
                    }
                  }
                }
              } else {
                $(".health_spinner_web .spinner-border").hide();
                $(".health_mobile_spinner .spinner-border").hide();
                $(".health_mobile_spinner").html("No data found");
                $(".health_Desktop_spinner .spinner-border").hide();
                $(".health_Desktop_spinner").html("No data found");
                $(".health_spinner_web").html("No data found");
                ShowNoty("Performance data not found", "error");
              }
              var options = { url: url, response: response };
              let index = URLsResponseObject.findIndex(
                (e) => e.url === options.url
              );
              if (index === -1) {
                URLsResponseObject.push(options);
              } else {
                URLsResponseObject[index] = options;
              }
              HandleResponse(response);
            } else {
              $(".mobile_text").removeClass("text-green text-red text-yellow");
              $(".desktop-text").removeClass("text-green text-red text-yellow");
              $("i.lni-mobile").removeAttr("style");
              $("#desktop_icon i").removeAttr("style");
              desktop_icon;
              $(".health_mobile_spinner").hide();
              $(".health_Desktop_spinner").hide();
              $(".m_health").removeClass(
                "bord_bottom_avg  bord_bottom_poor  bord_bottom_good "
              );
              $(".m_health").addClass("bord_bottom_analytics");
              $(".d_health").removeClass(
                "bord_bottom_avg  bord_bottom_poor  bord_bottom_good "
              );
              $(".d_health").addClass("bord_bottom_analytics");

              var options_ave = {
                series: [0],
                chart: {
                  height: 220,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                      margin: 0,
                      size: "70%",
                      background: "#fff",
                      image: undefined,
                      imageOffsetX: 0,
                      imageOffsetY: 0,
                      position: "front",
                      dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 4,
                        opacity: 0.24,
                      },
                    },
                    track: {
                      background: "#fff",
                      strokeWidth: "67%",
                      margin: 0, // margin is in pixels
                      dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35,
                      },
                    },

                    dataLabels: {
                      show: true,
                      name: {
                        offsetY: 5,
                        show: true,
                        color: "#808080",
                        fontSize: "14px",
                      },
                      value: {
                        formatter: function (val) {
                          return parseInt(val);
                        },
                        color: "#808080",
                        fontSize: "10px",
                        show: false,
                      },
                    },
                  },
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#FF9407"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                  },
                },
                stroke: {
                  lineCap: "round",
                },
                labels: ["No data Found"],
              };
              mobile_radial_nodata1 = new ApexCharts(
                document.querySelector("#mobile_radial"),
                options_ave
              );
              mobile_radial_nodata1.render();

              var options_avee = {
                series: [0],
                chart: {
                  height: 220,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                      margin: 0,
                      size: "70%",
                      background: "#fff",
                      image: undefined,
                      imageOffsetX: 0,
                      imageOffsetY: 0,
                      position: "front",
                      dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 4,
                        opacity: 0.24,
                      },
                    },
                    track: {
                      background: "#fff",
                      strokeWidth: "67%",
                      margin: 0, // margin is in pixels
                      dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35,
                      },
                    },

                    dataLabels: {
                      show: true,
                      name: {
                        offsetY: 5,
                        show: true,
                        color: "#808080",
                        fontSize: "14px",
                      },
                      value: {
                        formatter: function (val) {
                          return parseInt(val);
                        },
                        color: "#808080",
                        fontSize: "10px",
                        show: false,
                      },
                    },
                  },
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#FF9407"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                  },
                },
                stroke: {
                  lineCap: "round",
                },
                labels: ["No data Found"],
              };
              desktop_radial_nodata1 = new ApexCharts(
                document.querySelector("#desktop_radial"),
                options_avee
              );
              desktop_radial_nodata1.render();
              $(".health_spinner_web").hide();
              $(".health_mobile_spinner .spinner-border").hide();
              $(".health_mobile_spinner").html("No data found");
              $(".health_Desktop_spinner .spinner-border").hide();
              $(".health_Desktop_spinner").html("No data found");
              $(".health_spinner_web").html("No data found");
              ShowNoty("Performance data not found", "error");
            }
            // script.js code start
            if (response.status) {
              var resposnseMobileData = "";
              if (
                response.response_mobile !== undefined &&
                response.response_mobile.all_data !== undefined
              ) {
                resposnseMobileData = response.response_mobile.all_data;
              }
              // for ssl certificate
              var ssl_certificate = "";
              if (resposnseMobileData.lighthouseResult !== undefined) {
                ssl_certificate =
                  resposnseMobileData.lighthouseResult.audits["is-on-https"][
                    "score"
                  ];
              }
              if (response.page_data_dict.site_map_url !== undefined) {
                var sitemapTest = response.page_data_dict.site_map_url;
                $(".p_spinner").hide();
                if (sitemapTest == false) {
                  $(".site_map_spinner").html("");
                  $(".detectedd").text("Undetected");
                  $(".sitemap_colorr").css("color", "red");
                  $("#site_map").removeClass("btn-outline-success");
                  $("#site_map").addClass("btn-outline-danger");
                } else {
                  $(".detectedd").text("Detected");
                  $(".sitemap_colorr").css("color", "rgb(0, 172, 69)");
                  $("#site_map").removeClass("btn-outline-danger");
                  $("#site_map").addClass("btn-outline-success");
                }
                $(".site_map_spinner").html("");
                $(sitemapState).text("Detected");
              } else {
                $(".site_map_spinner").html("");

                $(sitemapState).text("Not Detected");
              }
              $(".p_spinner").hide();
              if (
                response?.response_desktop?.all_data?.lighthouseResult?.audits[
                  "is-on-https"
                ]?.score == 0
              ) {
                $(".ssl-certificate").css({ color: "red" });
                $(".ssl_valid").text("Invalid");
                $("#ssl--cer").removeClass("btn-outline-success");
                $("#ssl--cer").addClass("btn-outline-danger");
              } else {
                $(".ssl-certificate").css({ color: "rgb(0, 172, 69)" });
                $(".ssl_valid").text("Valid");
                $("#ssl--cer").removeClass("btn-outline-danger");
                $("#ssl--cer").addClass("btn-outline-success");
              }
              var resposnsewebsite_seo_data = "";
              if (response.website_seo_data !== undefined) {
                resposnsewebsite_seo_data = response.website_seo_data;
                var spf_record =
                  resposnsewebsite_seo_data["output"]["spf_record"];
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
              var resposnseMobileData = "";
              if (
                response.response_mobile !== undefined &&
                response.response_mobile.all_data !== undefined
              ) {
                resposnseMobileData = response.response_mobile.all_data;
              }
              // for ssl certificate
              var ssl_certificate = "";
              if (resposnseMobileData.lighthouseResult !== undefined) {
                ssl_certificate =
                  resposnseMobileData.lighthouseResult.audits["is-on-https"][
                    "score"
                  ];
              }
              ssl_certificate = ssl_certificate * 100;
              if (ssl_certificate >= 50 && ssl_certificate < 90) {
                $(".ssl_loader").html("");
                $("#ssl-state").html("Expiring Soon");
                $("#ssl-state").css("color", "rgb(244, 154, 0)");
                $("#ssl").css("background", "rgb(244, 154, 0)");
              } else if (ssl_certificate >= 0 && ssl_certificate < 49) {
                $(".ssl_loader").html("");

                $("#ssl-state").html("Domain Mismatch");
                $("#ssl-state").css("color", "red");
                $("#ssl").css("background", "#ffd9d9");
              } else {
                $(".ssl_loader").html("");

                $("#ssl-state").html("Valid");
              }
              // corevitals
              if (response.page_data_dict.site_map_url !== undefined) {
                responseSitemap = response.page_data_dict.site_map_url;
                $(".site_map_spinner").html("");
                $(sitemapState).text("Detected");
              } else {
                $(".site_map_spinner").html("");

                $(sitemapState).text("Not Detected");
              }
              var resposnsewebsite_seo_data = "";
              if (response.website_seo_data !== undefined) {
                resposnsewebsite_seo_data = response.website_seo_data;
                var spf_record =
                  resposnsewebsite_seo_data["output"]["spf_record"];
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
              var tooltipList = tooltipTriggerList.map(function (
                tooltipTriggerEl
              ) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
              });
            } else {
              setTimeout(() => {
                $(".p_spinner").hide();
                ShowNoty("No data found", "alert");
              }, 1000);
            }
            // script.js code end
          } else {
            $(".health_spinner_web").hide();
            $(".health_spinner").hide();
            NewSearch();
            ShowNoty(
              "We cannot access " +
                url +
                " in order to perform our test! Either the site is not online, or our tool is being blocked by your server.",
              "error"
            );
          }
        } else {
          $(".health_spinner_web").hide();
          $(".health_mobile_spinner").hide();
          $(".health_Desktop_spinner").hide();
          $(".check_scr_spinner").hide();
          $(".dash-show").show();
          $(".p-spinner-new").hide();
          var options = {
            series: [0],
            chart: {
              height: 220,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#fff",
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: "front",
                  dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.24,
                  },
                },
                track: {
                  background: "#fff",
                  strokeWidth: "67%",
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35,
                  },
                },

                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 5,
                    show: true,
                    color: "#808080",
                    fontSize: "14px",
                  },
                  value: {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                    color: "#808080",
                    fontSize: "10px",
                    show: false,
                  },
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#FF9407"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
              },
            },
            stroke: {
              lineCap: "round",
            },
            labels: ["No data Found"],
          };
          mobile_radial_nodata2 = new ApexCharts(
            document.querySelector("#mobile_radial"),
            options
          );
          mobile_radial_nodata2.render();
          var options_1 = {
            series: [0],
            chart: {
              height: 220,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#fff",
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: "front",
                  dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.24,
                  },
                },
                track: {
                  background: "#fff",
                  strokeWidth: "67%",
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35,
                  },
                },

                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 5,
                    show: true,
                    color: "#808080",
                    fontSize: "14px",
                  },
                  value: {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                    color: "#808080",
                    fontSize: "10px",
                    show: false,
                  },
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#FF9407"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
              },
            },
            stroke: {
              lineCap: "round",
            },
            labels: ["No data Found"],
          };
          desktop_radial_nodata2 = new ApexCharts(
            document.querySelector("#desktop_radial"),
            options_1
          );
          desktop_radial_nodata2.render();
          var options_ave = {
            series: [0],
            chart: {
              height: 220,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#fff",
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: "front",
                  dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.24,
                  },
                },
                track: {
                  background: "#fff",
                  strokeWidth: "67%",
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35,
                  },
                },

                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 5,
                    show: true,
                    color: "#808080",
                    fontSize: "14px",
                  },
                  value: {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                    color: "#808080",
                    fontSize: "10px",
                    show: false,
                  },
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#FF9407"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                // stops: [0, 100]
              },
            },
            stroke: {
              lineCap: "round",
            },
            labels: ["No data Found"],
          };
          site_health_radial_nodata = new ApexCharts(
            document.querySelector("#siteHealth_radial"),
            options_ave
          );
          site_health_radial_nodataa = new ApexCharts(
            document.querySelector("#siteHealth_radial2"),
            options_ave
          );
          site_health_radial_nodata.render();
          site_health_radial_nodataa.render();
          $("#siteHealth_radial2").show();
          $(".card-heading-show").show();
          $(".health_spinner").hide();
          $("#big_images_count").text("-");
          ShowNoty("504 Gateway Time-out", "error");
        }
      },
    });
  }
}
// get site live data end

// change website event
$(document).on("change", ".radio", function () {
  // empty previous html element and append again on the basis of change website searching url
  $(".dash-show").hide();
  $(".card-heading-show").hide();
  $("#siteHealth_radial2").hide();
  $(".health_spinner_web").show();
  $(".health_spinner_web .spinner-border").show();
  site_health_radial?.destroy();
  site_health_radial2?.destroy();
  site_health_radial3?.destroy();
  site_health_radial_nodata?.destroy();

  mobile_radial?.destroy();
  mobile_radial2?.destroy();
  mobile_radial3?.destroy();
  mobile_radial_nodata1?.destroy();
  mobile_radial_nodata2?.destroy();

  desktop_radial?.destroy();
  desktop_radial2?.destroy();
  desktop_radial3?.destroy();
  desktop_radial4?.destroy();
  desktop_radial5?.destroy();
  desktop_radial6?.destroy();
  desktop_radial_nodata1?.destroy();
  desktop_radial_nodata2?.destroy();

  $("#finalUrl").html("");

  $(".failed_val").html(`${0}`);
  $(".warning_val").html(`${0}`);
  $(".passed_val").html(`${0}`);
  $(".gn.progress-bar.bg-fail").css("width", 0 + "%");
  $(".gn.progress-bar.bg-warn").css("width", 0 + "%");
  $(".gn.progress-bar.bg-pass").css("width", 0 + "%");
  $(".analtics-section-spinner").show();
  $(".main-spinner").show();
  $(".analtics-section-false").hide();
  $(".analtics-section-true").hide();
  $("#dashboard-analytics").hide();
  $("#dashboard-chart").hide();
  $("#pages_circle").hide();
  $(".p_spinner_cls").hide();
  $(".crawl-spinner").show();
  $("#broken").html("-");
  $("#redirects").html(" -");
  $("#healthy").html("- ");
  $("#blocked").html(" -");
  $("#page_total").hide();
  $("#total-web-page").html("-");
  $("#total-crawler-pages").html("-");
  $("#total-crawler-page").html("-");
  $("#percentage_count").html("-");
  $(".img_spinner1").show();
  var url = $(this).val();
  var project_id = $("option:selected", this).attr("data-id");
  $(".health-score_web").hide();
  $(".health-score").hide();
  $(".desktop_Health_circle").hide();
  $(".health_mobile_spinner").show();
  $(".health_Desktop_spinner").show();
  $(".p_spinner").show();
  $(".failed_val").html("");
  $(".passed_val").html("");
  $(".warning_val").html("");
  $(".count-main").hide();
  $(".detectedd").html("");
  $(".ssl_valid").html("");
  $(".sitemap_colorr").css("color", "black");
  $(".ssl-certificate").css({ color: "black" });
  bottomGraph(project_id);
  performanceFnc(url);
});

$.ajax({
  type: "GET",
  url: "/payment/view_subscription/",
  success: function (response) {
    //console.log(response,'ress');
    if (response.status) {
      // console.log("my subs", response)
      response.data.map((val, id) => {
        if (val.plan_id_id == "Free Plan" || val.plan_id_id == "Pro Plan") {
          $("#unlock-btn").attr(
            "href",
            "/subscription/upgrade_subscription/?unlock"
          );
          $("#unlock-btn").css("background-color", "#eb4335");
          $("#success_lock").attr(
            "src",
            "/static/site_audit/assets/img/lock.png"
          );
        } else {
          $("#unlock-btn")
            .css("background-color", "#8bc34a")
            .prop("disabled", true);
          $("#success_lock").attr(
            "src",
            "/static/site_audit/assets/success_unlock.png"
          );
          $(".lock-txt").html(`you have already a ${val.plan_id_id}`);
        }
        //  console.log("hhh", val.plan_id_id)
        if (val.plan_id_id == "Free Plan" || val.plan_id_id == "Pro Plan") {
          $("#Free_Pro_Section").show();
        } else {
          $("#Free_Pro_Section").hide();
        }
      });
    }
  },
});
