var URLsResponseObject = [];
$("#tb_loader").show();

$("#pages_circle").hide();
var HomePageUrl = "";
$(document).ready(function () {
  setTimeout(() => {
    $("#inptvalue").val($("#selectedDomain").val());

    GetDataAjax($("#inptvalue").val(), "");
  }, "2000");
});
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
const mobile_speed_state = $("#mobile-speed-state");
const si = $("#si");
const tbt = $("#tbt");
const lcp = $("#lcp");
const cls = $("#cls");
const fcp = $("#fcp");
const tti = $("#tti");
// corevitals ids
const coreVitalLoader = $("#coreVitalLoader");
const coreVital_1 = $(".coreVital_1");
const coreVital_2 = $("#coreVital_2");
// status ids
const passStatus = $("#passStatus");
const warnStatus = $("#warnStatus");
const failStatus = $("#failStatus");
// chart ids
const strongclass = $(".strong");
const si_status_overview = $("#si_status_overview");
const chartClass = $(".circle");
const chartOverview = $(".overview");
// website health card state
const sitemapState = $("#sitemap-state");
const spf_spinner = $(".spf_spinner");
const SPFState = $("#SPF-state");
// google analytics
const Yesterday = $("#Yesterday");
const Week = $("#Week");
const Month = $("#Month");
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
var CommonSeoIssuesObject = {
  "title-tag": "Meta Title Test",
  "description-tag": "Meta Description Test",
  "google-preview": "Google Search Results Preview Test",
  "common-keywords": "Most Common Keywords Test",
  "common-keywords-usage": "Keywords Usage Test",
  "keywords-cloud": "Keywords Cloud Test",
  // "related-keywords": "Related Keywords Test",
  // "competitor-domains": "Competitor Domains Test",
  "heading-tags": "Heading Tags Test",
  "robots-txt": "Robots.txt Test",
  sitemap: "Sitemap Test",
  // "url-seo-friendly": "SEO Friendly URL Test",
  "img-alt": "Image Alt Test",
  "image-size": "Responsive Image Test",
  "image-aspect-ratio": "Image Aspect Ratio Test",
  "inline-css": "Inline CSS Test",
  "deprecated-tags": "Deprecated HTML Tags Test",
  "google-analytics": "Google Analytics Test",
  favicon: "Favicon Test",
  // "backlinks": "Backlinks Test",
  "js-errors": "JS Error Test",
  "js-libraries": "Js Libraries Test",
  "console-errors": "Console Errors Test",
  // "social-media": "Social Media Test",
};
var SpeedOptimizationObject = {
  "html-size": "HTML Page Size Test",
  "html-compression": "HTML Compression/GZIP Test",
  "loading-speed": "Site Loading Speed Test",
  "page-objects": "Page Objects Test",
  "page-cache": "Page Cache Test (Server Side Caching)",
  flash: "Flash Test",
  "cdn-usage": "CDN Usage Test",
  "image-caching": "Meta Title Test",
  "js-caching": "Meta Title Test",
  "css-caching": "Meta Title Test",
  "js-minification": "JavaScript Minification Test",
  "css-minification": "CSS Minification Test",
  "nested-tables": "Nested Tables Test",
  frameset: "Frameset Test",
  doctype: "Doctype Test",
  "http-redirects": "URL Redirects Test",
};
var ServerAndSecurityObject = {
  "url-canonicalization": "URL Canonicalization Test",
  "https-encryption": "HTTPS Test",
  "mixed-content-type": "Mixed Content Test (HTTP over HTTPS)",
  http2: "HTTP2 Test",
  "safe-browsing": "Safe Browsing Test",
  "server-signature": "Server Signature Test",
  "x-powered-by": "Website Powered By",
  "directory-browsing": "Directory Browsing Test",
  "plaintext-emails": "Plaintext Emails Test",
};
var MobileUsabilityObject = {
  viewportmobile: "Meta Viewport Test",
  // "media-queries": "Media Query Responsive Test",
  "mobile-snapshot": "Mobile Snapshot Test",
};
var AdvancedSeoObject = {
  "structured-data": "Structured Data Test",
  "broken-links": "Broken Links Test",
  // "custom-404": "Custom 404 Error Page Test",
  "noindex-tags": "Noindex Tag Test",
  "canonical-tags": "Canonical Tag Test",
  "nofollow-tags": "Uncrawlable Tag Tests",
  "disallow-tags": "Disallow Directive Test",
  "meta-refresh": "Meta Refresh Test",
  "spf-record": "SPF Records Test",
};
function progressBar(generalPassedScore, TotalScore) {
  var strokeVal = (4.64 * 100) / TotalScore;

  var x = document.querySelector(".progress-circle-prog-success");
  if (x !== null) {
    x.style.strokeDasharray = generalPassedScore * strokeVal + " 999";
  }
  var el = document.querySelector(".progress-val");
  var from = $(".progress-val").data("progress");
  $(".progress-val").data("progress", generalPassedScore);
  var start = new Date().getTime();
  setTimeout(function () {
    var now = new Date().getTime() - start;
    var progress = now / 700;
    el.innerHTML = ((generalPassedScore / TotalScore) * 100).toFixed(1) + "%";
    if (progress < 1) setTimeout(arguments.callee, 10);
  }, 10);
}
function progressBarReturn(generalPassedScore, TotalScore) {
  var start = new Date().getTime();
  var now = new Date().getTime() - start;
  var progress = now / 700;
  return Math.ceil(Number((generalPassedScore / TotalScore) * 100));
}

// $("#statusPreviewTop").html("Summary Of Issues")

$(document).on("click", ".General2", function () {
  $(".failed .ScoreValueFailed").text(generalFailedScore);
  $(".warning .ScoreValueWarning").text(generalWarningScore);
  $(".passed .ScoreValuePassed").text(generalPassedScore);
});

$(document).on("click", ".commonSeoIssuesList2", function () {
  $(".failed .ScoreValueFailed").text(commonSeoFailedScore);
  $(".warning .ScoreValueWarning").text(commonSeoWarningScore);
  $(".passed .ScoreValuePassed").text(commonSeoPassedScore);
});

$(document).on("click", ".speedOptimizationlist2", function () {
  $(".failed .ScoreValueFailed").text(speedOptimizationScoreFailedValue);
  $(".warning .ScoreValueWarning").text(speedOptimizationScoreWarningValue);
  $(".passed .ScoreValuePassed").text(speedOptimizationScorePassedValue);
});

$(document).on("click", ".serverAndSecurity2", function () {
  $(".failed .ScoreValueFailed").text(serverAndSecurityScoreFailedValue);
  $(".warningScore .ScoreValueWarning").text(
    serverAndSecurityScoreWarningValue
  );
  $(".passedScore .ScoreValuePassed").text(serverAndSecurityScorePassedValue);
});

$(document).on("click", ".mobileUsability2", function () {
  $(".failed .ScoreValueFailed").text(mobileUsabilityScoreFailedValue);
  $(".warning .ScoreValueWarning").text(mobileUsabilityScoreWarningValue);
  $(".passed .ScoreValuePassed").text(mobileUsabilityScorePassedValue);
});

$(document).on("click", ".advancedSeo2", function () {
  $(".failed .ScoreValueFailed").text(advancedSeoFailedScore);
  $(".warning .ScoreValueWarning").text(advancedSeoWarningScore);
  $(".passed .ScoreValuePassed").text(advancedSeoPassedScore);
});

$(document).on("click", "#General", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);
  $(".failed_val").html(generalFailedScore);
  $(".warning_val").html(generalWarningScore);
  $(".passed_val").html(generalPassedScore);

  $(".progress-bar.bg-red").css("width", GeneralScoreFailedPercent + "%");
  $(".progress-bar.bg-yellow").css("width", GeneralScoreWarningPercent + "%");
  $(".progress-bar.bg-green").css("width", GeneralScorePassedPercent + "%");
});

$(document).on("click", "#commonSeoIssuesList", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);

  $(".failed_val").html(commonSeoFailedScore);
  $(".warning_val").html(commonSeoWarningScore);
  $(".passed_val").html(commonSeoPassedScore);

  $(".progress-bar.bg-red").css(
    "width",
    commonSeoIssuesScoreFailedPercent + "%"
  );
  $(".progress-bar.bg-yellow").css(
    "width",
    commonSeoIssuesScoreWarningPercent + "%"
  );
  $(".progress-bar.bg-green").css(
    "width",
    commonSeoIssuesScorePassedPercent + "%"
  );
});

$(document).on("click", "#speedOptimizationlist", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);

  $(".failed_val").html(speedOptimizationScoreFailedValue);
  $(".warning_val").html(speedOptimizationScoreWarningValue);
  $(".passed_val").html(speedOptimizationScorePassedValue);

  $(".progress-bar.bg-red").css(
    "width",
    speedOptimizationScoreFailedPercent + "%"
  );
  $(".progress-bar.bg-yellow").css(
    "width",
    speedOptimizationScoreWarningPercent + "%"
  );
  $(".progress-bar.bg-green").css(
    "width",
    speedOptimizationScorePassedPercent + "%"
  );
});

$(document).on("click", "#serverAndSecurity", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);

  $(".failed_val").html(serverAndSecurityScoreFailedValue);
  $(".warning_val").html(serverAndSecurityScoreWarningValue);
  $(".passed_val").html(serverAndSecurityScorePassedValue);

  $(".progress-bar.bg-red").css(
    "width",
    serverAndSecurityScoreFailedPercent + "%"
  );
  $(".progress-bar.bg-yellow").css(
    "width",
    serverAndSecurityScoreWarningPercent + "%"
  );
  $(".progress-bar.bg-green").css(
    "width",
    serverAndSecurityScorePassedPercent + "%"
  );
});

$(document).on("click", "#mobileUsability", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);

  $(".failed_val").html(mobileUsabilityScoreFailedValue);
  $(".warning_val").html(mobileUsabilityScoreWarningValue);
  $(".passed_val").html(mobileUsabilityScorePassedValue);

  $(".progress-bar.bg-red").css(
    "width",
    mobileUsabilityScoreFailedPercent + "%"
  );
  $(".progress-bar.bg-yellow").css(
    "width",
    mobileUsabilityScoreWarningPercent + "%"
  );
  $(".progress-bar.bg-green").css(
    "width",
    mobileUsabilityScorePassedPercent + "%"
  );
});

$(document).on("click", "#advancedSeo", function () {
  var textt = $(this).find(".activeTabText").text();
  $("#statusPreviewTop").html(textt);

  $(".failed_val").html(advancedSeoFailedScore);
  $(".warning_val").html(advancedSeoWarningScore);
  $(".passed_val").html(advancedSeoPassedScore);

  $(".progress-bar.bg-red").css("width", advancedSeoScoreFailedPercent + "%");
  $(".progress-bar.bg-yellow").css(
    "width",
    advancedSeoScoreWarningPercent + "%"
  );
  $(".progress-bar.bg-green").css("width", advancedSeoScorePassedPercent + "%");

  // $(".failed_val").html(`${generalFailedScore}`);
  // $(".warning_val").html(`${generalWarningScore}`);
  // $(".passed_val").html(`${generalPassedScore}`);
});

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

  $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");

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
  var health = progressBarReturn(generalPassedScore, TotalScore);
  $(".website_health .box").removeClass("yellow");
  $(".website_health .status-btn").removeClass("bg-yellow");
  $(".website_health .status-btn").text(" ");
  $(".web_health_text").removeClass("text-yellow");

  $(".website_health .box").removeClass("red");
  $(".website_health .status-btn").removeClass("bg-red");
  $(".website_health .status-btn").text(" ");
  $(".web_health_text").removeClass("text-red");

  $(".website_health .box").removeClass("green");
  $(".website_health .status-btn").removeClass("bg-green");
  $(".website_health .status-btn").text(" ");
  $(".web_health_text").removeClass("text-green");
  $(".health_spinner_web").hide();
  $(".health-score_web").show();
  $(".site_health_val").html(`${health} %`);
  if (health !== "" && health !== undefined) {
    if (health >= yellow_lower_range && health <= yellow_upper_range) {
      $(".website_health .box").addClass("yellow");
      $(".website_health .status-btn").addClass("bg-yellow");
      $(".website_health .status-btn").text("Average");
      $(".web_health_text").addClass("text-yellow");
      $(".Site_Health_circle").circleProgress({
        value: health / 100,
        size: 130,
        fill: "#ffc107",
      });
    } else if (health >= red_lower_range && health <= red_upper_range) {
      $(".website_health .box").addClass("red");
      $(".website_health .status-btn").addClass("bg-red");
      $(".website_health .status-btn").text("Poor");
      $(".web_health_text").addClass("text-red");
      $(".Site_Health_circle").circleProgress({
        value: health / 100,
        size: 130,
        fill: "#eb4335",
      });
    } else if (health >= green_lower_range && health <= green_upper_range) {
      $(".website_health .box").addClass("green");
      $(".website_health .status-btn").addClass("bg-green");
      $(".website_health .status-btn").text("Good");
      $(".web_health_text").addClass("text-green");

      $(".Site_Health_circle").circleProgress({
        value: health / 100,
        size: 130,
        fill: "#75b765",
      });
    }
  }
  $(".cm.progress-bar.bg-danger").css(
    "width",
    commonSeoIssuesScoreFailedPercent + "%"
  );
  $("#comonSeoWarning_val").html(`${commonSeoWarningScore} Warnings`);
  $(".cm.progress-bar.bg-warning").css(
    "width",
    commonSeoIssuesScoreWarningPercent + "%"
  );
  $("#comonSeoPassed_val").html(`${commonSeoPassedScore} Passed`);
  $(".cm.progress-bar.bg-success").css(
    "width",
    commonSeoIssuesScorePassedPercent + "%"
  );
  $("#comonSeofailed_val").html(`${commonSeoFailedScore} Failed`);
  // =======
  $("#speedOptifailed_val").html(`${speedOptimizationScoreFailedValue} Failed`);
  $(".so.progress-bar.bg-danger").css(
    "width",
    speedOptimizationScoreFailedPercent + "%"
  );
  $("#speedOptiWarning_val").html(
    `${speedOptimizationScoreWarningValue} Warnings`
  );
  $(".so.progress-bar.bg-warning").css(
    "width",
    speedOptimizationScoreWarningPercent + "%"
  );
  $("#speedOptiPassed_val").html(`${speedOptimizationScorePassedValue} Passed`);
  $(".so.progress-bar.bg-success").css(
    "width",
    speedOptimizationScorePassedPercent + "%"
  );
  // =====
  $("#serverAndSecurityfailed_val").html(
    `${serverAndSecurityScoreFailedValue} Failed`
  );
  $(".sas.progress-bar.bg-danger").css(
    "width",
    serverAndSecurityScoreFailedPercent + "%"
  );
  $("#serverAndSecurityWarning_val").html(
    `${serverAndSecurityScoreWarningValue} Warnings`
  );
  $(".sas.progress-bar.bg-warning").css(
    "width",
    serverAndSecurityScoreWarningPercent + "%"
  );
  $("#serverAndSecurityPassed_val").html(
    `${serverAndSecurityScorePassedValue} Passed`
  );
  $(".sas.progress-bar.bg-success").css(
    "width",
    serverAndSecurityScorePassedPercent + "%"
  );
  // =============

  $("#mobileUsabilityfailed_val").html(
    `${mobileUsabilityScoreFailedValue} Failed`
  );
  $(".mu.progress-bar.bg-danger").css(
    "width",
    mobileUsabilityScoreFailedPercent + "%"
  );
  $("#mobileUsabilityWarning_val").html(
    `${mobileUsabilityScoreWarningValue} Warnings`
  );
  $(".mu.progress-bar.bg-warning").css(
    "width",
    mobileUsabilityScoreWarningPercent + "%"
  );
  $("#mobileUsabilityPassed_val").html(
    `${mobileUsabilityScorePassedValue} Passed`
  );
  $(".mu.progress-bar.bg-success").css(
    "width",
    mobileUsabilityScorePassedPercent + "%"
  );
  // =============
  $("#advancedSeofailed_val").html(`${advancedSeoFailedScore} Failed`);
  $(".as.progress-bar.bg-danger").css(
    "width",
    advancedSeoScoreFailedPercent + "%"
  );
  $("#advancedSeoWarning_val").html(`${advancedSeoWarningScore} Warnings`);
  $(".as.progress-bar.bg-warning").css(
    "width",
    advancedSeoScoreWarningPercent + "%"
  );
  $("#advancedSeoPassed_val").html(`${advancedSeoPassedScore} Passed`);
  $(".as.progress-bar.bg-success").css(
    "width",
    advancedSeoScorePassedPercent + "%"
  );
  $("#General .failed .ScoreValue").text(generalFailedScore);
  $("#General .warning .ScoreValue").text(generalWarningScore);
  $("#General .passed .ScoreValue").text(generalPassedScore);

  $(".accordionSummary .failed .ScoreValue").text(generalFailedScore);
  $(".accordionSummary .warning .ScoreValue").text(generalWarningScore);
  $(".accordionSummary .passed .ScoreValue").text(generalPassedScore);

  $("#commonSeoIssuesList .failed .ScoreValue").text(commonSeoFailedScore);
  $("#commonSeoIssuesList .warning .ScoreValue").text(commonSeoWarningScore);
  $("#commonSeoIssuesList .passed .ScoreValue").text(commonSeoPassedScore);
  $("#speedOptimizationlist .failed .ScoreValue").text(
    speedOptimizationScoreFailedValue
  );
  $("#speedOptimizationlist .warning .ScoreValue").text(
    speedOptimizationScoreWarningValue
  );
  $("#speedOptimizationlist .passed .ScoreValue").text(
    speedOptimizationScorePassedValue
  );
  $("#serverAndSecurity .failed .ScoreValue").text(
    serverAndSecurityScoreFailedValue
  );
  $("#serverAndSecurity .warning .ScoreValue").text(
    serverAndSecurityScoreWarningValue
  );
  $("#serverAndSecurity .passed .ScoreValue").text(
    serverAndSecurityScorePassedValue
  );
  $("#mobileUsability .failed .ScoreValue").text(
    mobileUsabilityScoreFailedValue
  );
  $("#mobileUsability .warning .ScoreValue").text(
    mobileUsabilityScoreWarningValue
  );
  $("#mobileUsability .passed .ScoreValue").text(
    mobileUsabilityScorePassedValue
  );
  $("#advancedSeo .failed .ScoreValue").text(advancedSeoFailedScore);
  $("#advancedSeo .warning .ScoreValue").text(advancedSeoWarningScore);
  $("#advancedSeo .passed .ScoreValue").text(advancedSeoPassedScore);
}
var pickHighest = (obj, num = 1) => {
  const requiredObj = {};
  if (num > Object.keys(obj).length) {
    return false;
  }
  Object.keys(obj)
    .sort((a, b) => obj[b] - obj[a])
    .forEach((key, ind) => {
      if (ind < num) {
        requiredObj[key] = obj[key];
      }
    });
  return requiredObj;
};
if ($("#domainurl").val() !== undefined) {
  $("#domainurl").val("");
  var domain = document.getElementById("domainurl");
  domain.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      $(".SearchDomain").click();
    }
  });
}
// searchbar code end
var httpVal = "https://";
var tagsVal = "";
var url = "";
$(document).on("change", ".httpClass", function () {
  httpVal = $("#httpUrl").children("option").filter(":selected").text();
  $("#inptvalue").val(httpVal + tagsVal);
});
$("#domainurl").on("input change paste", function () {
  var re = new RegExp(
    "^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  tagsVal = $("#domainurl").val();
  tagsVal = tagsVal.replace("https://", "");
  tagsVal = tagsVal.replace("http://", "");
  $("#domainurl").val(tagsVal);
  $("#myurl_tags_inc").hide();
  $("#myurl_tags").hide();
  $("#myTagsurl").css("border-bottom-color", "#d4a640");
  if (tagsVal == "") {
    $("#myurl_tags").hide();
    $(".SearchDomain").addClass("disabled");
    $("#myTagsurl").css("border-bottom-color", "#d4a640");
  } else if (re.test(tagsVal)) {
    $("#myurl_tags_c").hide();
    $("#myTagscreat_p").css("border-bottom-color", "#d4a640");
    $(".SearchDomain").removeClass("disabled");
  } else {
    $(".SearchDomain").addClass("disabled");
    $("#myurl_tags").show();
    $("#myTagsurl").css("border-bottom-color", "red");
  }
  $("#inptvalue").val(httpVal + tagsVal);
  HomePageUrl = $("#inptvalue").val();
});
function isValidImageURL(str) {
  if (typeof str !== "string") return false;
  return !!str.match(/\w+\.(svg|jpg|jpeg|gif|png|tiff|bmp)$/gi);
}
function getFileExtension(filename) {
  const extension = filename.split(".").pop();
  return extension;
}
$(document).on("click", ".slick-slide", function () {
  $(this).removeClass("active");
  $(this).siblings(".slick-slide").removeClass("active");
  url = $(this).children(".ProjectURLs").text();
  HomePageUrl = $(".mainUrl .ProjectURLs").text();
  $(this).addClass("active");
  var p_id = window.location.search.split("?project_id=");
  GetDataAjax(url, p_id[1]);
});
$(".SearchDomain").click(function () {
  url = $("#inptvalue").val();
  GetDataAjax(url, "");
});
function GetDataAjax(url, p_id) {
  let apiUrl = "";
  $("#responseFailureMsg").hide();
  if (url !== "" || url !== undefined) {
    let indexURL = URLsResponseObject.findIndex((e) => e.url === url);
    if (indexURL === -1) {
      if (p_id !== "") {
        apiUrl = "/site_audit/get_url_data/?url=" + url + "&project_id=" + p_id;
      } else {
        apiUrl = "/site_audit/get_site_live_data/?url=" + url;
      }
    } else {
      var item = URLsResponseObject.find((item) => item.url === url);
      HandleResponse(item.response);
    }
  }
}
function HandleResponse(response) {
  $(
    "#commonSeoIssuesDetails_passed li ul,#commonSeoIssuesDetails_warning ul,#commonSeoIssuesDetails_failed li ul"
  ).empty();

  $("#commonSeoIssuesDetails").empty();
  $("#commonSeoIssues").empty();
  Object.keys(CommonSeoIssuesObject).forEach((key) => {
    $("#commonSeoIssuesDetails").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        CommonSeoIssuesObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#commonSeoIssues").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        CommonSeoIssuesObject[key] +
        "</a></li>"
    );
  });

  $("#speedOptimization_").empty();
  $("#speedOptimization").empty();
  Object.keys(SpeedOptimizationObject).forEach((key) => {
    $("#speedOptimization_").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        SpeedOptimizationObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#speedOptimization").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        SpeedOptimizationObject[key] +
        "</a></li>"
    );
  });
  //   $("#serverAndSecurity").empty();
  //   $("#serverAndSecurity_").empty();
  //   Object.keys(ServerAndSecurityObject).forEach((key) => {
  //     $("#serverAndSecurity").append(
  //       "<li id=" +
  //         key +
  //         "><div class='media Failed' id='issue-" +
  //         key +
  //         "'><label class='mr-3' >" +
  //         ServerAndSecurityObject[key] +
  //         "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
  //     );
  //     $("#serverAndSecurity_").append(
  //       "<li id='List-" +
  //         key +
  //         "' class='list-item Failed'><a href='#issue-" +
  //         key +
  //         "'>" +
  //         ServerAndSecurityObject[key] +
  //         "</a></li>"
  //     );
  //   });
  $("#mobileUseablity").empty();
  $("#mobileUseablity_").empty();
  Object.keys(MobileUsabilityObject).forEach((key) => {
    $("#mobileUseablity").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        MobileUsabilityObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#mobileUseablity_").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        MobileUsabilityObject[key] +
        "</a></li>"
    );
  });
  $("#advanceSeo").empty();
  $("#advanceSeo_").empty();
  Object.keys(AdvancedSeoObject).forEach((key) => {
    $("#advanceSeo").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        AdvancedSeoObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#advanceSeo_").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        AdvancedSeoObject[key] +
        "</a></li>"
    );
  });
  $(".overlay").remove();
  $("#CheckSiteSEOContainer").show();
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

  // by nasir start
  var commonSeoIssue = [
    "Meta Title Test",
    "Meta Description Test",
    "Most Common Keywords Test",
    "Keywords Usage Test",
    "Keywords Cloud Test",
    "Heading Tags Test",
    "Robots.txt Test",
    "Sitemap Test",
    "SEO Friendly URL Test",
    "Image Alt Test",
    "Image Aspect Ratio Test",
    "Inline CSS Test",
    "Deprecated HTML Tags Test",
    "Google Analytics Test",
    "Favicon Test",
    "Social Media Test",
    "Responsive Image Test",
    "Google Search Results Preview Test",
    "Related Keywords Test",
    "Competitor Domains Test",
    "Backlinks Test",
    "JS Error Test",
    "Console Errors Test",
  ];
  // $.each(commonSeoIssue,function(index,value){
  // $('#commonSeoIssues').append(`<li class="list-item">${value}</li>`)
  // })

  var speedOptimization = [
    "HTML Page Size Test",
    "HTML Compression",
    "Site Loading Speed Test",
    "Page Objects Test",
    "Page Cache Test (Server Side Caching",
    "Flash Test",
    "CDN Usage Test",
    "Image Caching Test",
    "JavaScript Caching Test",
    "CSS Caching Test",
    "JavaScript Minification Test",
    "CSS Minification Test",
    "Nested Tables Test",
    "Frameset Test",
    "Doctype Test",
    "URL Redirects Test",
  ];
  // $.each(speedOptimization,function(index,value){
  // $('#speedOptimization').append(`<li class="list-item"><a href="#">${value}</a></li>`)
  // })

  var serverAndSecurity = [
    "URL Canonicalization Test",
    "HTTPS Test",
    "Mixed Content Test (HTTP over HTTPS)",
    "HTTP2 Test",
    "Safe Browsing Test",
    "Server Signature Test",
    "Directory Browsing Test",
    "Plaintext Emails Test",
  ];

  // mobile usablity
  var mobileUseablity = [
    "Meta Viewport Test",
    "Media Query Responsive Test",
    "Mobile Snapshot Test",
  ];

  // advance SEO
  var advanceSeo = [
    "Structured Data Test",
    "Custom 404 Error Page Test",
    "Noindex Tag Test",
    "Canonical Tag Test",
    "Uncrawlable Tag Test",
    "Disallow Directive Test",
    "Meta Refresh Test",
    "SPF Records Test",
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
  if (resposnseMobileData.lighthouseResult) {
    var d = resposnseMobileData.lighthouseResult.fetchTime;

    var n = new Date(d);
    var timDat = moment(n).format("MM DD YYYY , hh:mm a");
    $("#dateTim").html(`${timDat}`);
  }

  $("#issuesToFixHigh").empty();
  $("#issuesToFixMedium").empty();
  $("#issuesToFixLow").empty();
  $("#advancedSeoIssuesDetails_passed li ul").empty();
  $("#allIssuesDetails_failed li ul").empty();
  $("#speedOptimizaionIssuesDetails_passed li ul").empty();
  $("#Categories_Passed,#Categories_Failed,#Categories_Warning").empty();
  $("#speedOptimizaionIssuesDetails_warning li ul").empty();
  $("#allIssuesDetails_warning li ul").empty();
  $("#allIssuesDetails_passed li ul").empty();
  $("#speedOptimizaionIssuesDetails_failed li ul").empty();
  $("#serverAndSecurityIssuesDetails_passed li ul").empty();
  $("#mobileUsabilityIssuesDetails_failed li ul").empty();
  $("#serverAndSecurityIssuesDetails_failed li ul").empty();
  $("#serverAndSecurityIssuesDetails_warning li ul").empty();
  $("#mobileUsabilityIssuesDetails_passed li ul").empty();
  $("#Categories_Passed,#Categories_Failed,#Categories_Warning").empty();
  $("#advancedSeoIssuesDetails_failed li ul").empty();

  if (jQuery.isEmptyObject(resposnseBrokenLinks) == false) {
    var BrokenLinksHtml = "";
    let value = "Broken Links Test";
    let modal_btnBrokenLinks =
      '<button type="button" class="btn btn-link modalBtn BrokenLinksBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
    var ChangedScore = "";
    let ResponseKey = "";
    var AuditDescription = "";
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
          AuditDescription = "<small>This webpage have broken links.</small>";
          ChangedScore = "Failed";

          BrokenLinksHtml +=
            "<h6>Error " +
            resposnseDatakey +
            "</h6><ul class='BrokenLinks CDNList'>";
          $.each(SubResponse, function (index, val) {
            BrokenLinksHtml +=
              "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
              val +
              " target='_blank'>" +
              val +
              "</a></li> <div class='border_bottom_modal mb-2'> </div>";
          });

          BrokenLinksHtml += "</ul>";
        } else {
          AuditDescription =
            "<small>This webpage doesn't have any broken links!</small>";
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
        // $("#advancedSeoIssuesDetails_passed li ul").html("")
        $("#advancedSeoIssuesDetails_passed li ul").append(
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
      // else if(ChangedScore == 'Warning'){
      //    advancedSeoWarningScore = advancedSeoWarningScore+1;
      //    generalWarningScore = generalWarningScore+1;
      //    UpdateScoreVar = UpdateScore(ResponseKey,'advancedSeoFailedScore','advancedSeoWarningScore','advancedSeoPassedScore','advancedSeoScoreInfoValue',AuditDescription,ChangedScore,AuditId);
      //    $("#broken-links").html('<div class="media '+UpdateScoreVar+'" id="issue-'+AuditId+'"><label class="mr-3" >'+value+'</label><div class="media-body"><p class="Description">'+AuditDescription+'</p></br>'+modal_btnBrokenLinks+'</div></div><hr />')

      // }
      else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );
        $("#advancedSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        advancedSeoFailedScore = advancedSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          AuditDescription,
          ChangedScore,
          AuditId
        );
        $("#broken-links").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            "</p></br>" +
            modal_btnBrokenLinks +
            '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This SEO test will check if your website has any broken links, and potentially track the source of broken links in your site."></i></div><hr />'
        );
      }
    }
    $("#List-broken-links").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-broken-links").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );

    $(document).on("click", ".modalBtn.BrokenLinksBtn", function () {
      $("#ModalData").html(BrokenLinksHtml);

      // $("#ImgTable").append("<tr></tr>")
      $("#seo_CheckupModalLabel").text("Broken Links Test");
    });
  } else {
    var BrokenLinksHtml = "";
    let value = "Broken Links Test";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditTitle = "";
    var AuditId = "broken-links";
    AuditDescription =
      "<small>This webpage doesn't have any broken links!</small>";
    ChangedScore = "Passed";

    // $("#advancedSeoIssuesDetails_passed li ul").html("")
    $("#advancedSeoIssuesDetails_passed li ul").append(
      '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
        AuditId +
        '"><span class="text-green">' +
        value +
        '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
    );
    $("#allIssuesDetails_passed li ul").html("");
    $("#allIssuesDetails_passed li ul").append(
      '<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_' +
        AuditId +
        '"><span class="text-green">' +
        value +
        '</span><span class="text-green font-14"><i class="fa-solid fa-circle"></i></span></li>'
    );

    advancedSeoPassedScore = advancedSeoPassedScore + 1;
    generalPassedScore = generalPassedScore + 1;
    UpdateScoreVar = UpdateScore(
      ResponseKey,
      "advancedSeo",
      "",
      ChangedScore,
      AuditId
    );
    $("#broken-links").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        "</p></br>" +
        BrokenLinksHtml +
        '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This SEO test will check if your website has any broken links, and potentially track the source of broken links in your site."></i></div><hr />'
    );

    $("#List-broken-links").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-broken-links").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }

  // framesetTags start
  if (resposnseFramsetTags !== undefined && resposnseFramsetTags !== []) {
    let value = "Frameset Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "Frameset";
    var UpdateScoreVar = "";
    AuditDescription =
      "<small>Congratulations! Your webpage does not use frames.</small>";

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

        // $("#speedOptimizaionIssuesDetails_passed li ul").html("")
        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Warning").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_warning li ul").html("")
        $("#speedOptimizaionIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_warning li ul").html("")
        $("#allIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#frameset").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page is using frames, which divide your browser window into multiple sections where each section can load separate HTML documents. Frames create problems for both users (e.g., by creating unexepected behavior with printing functions or use of the back-button) and search engine robots (by complicating the crawling process). Avoid use of frames when possible."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixInlineCss", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>It is a good practice to move all the inline CSS rules into an external file in order to make your page "lighter" in weight and decrease the code to text ratio.</p><ul><li>check the HTML code of your page and identify all style attributes</li><li>for each style attribute found you must properly move all declarations in the external CSS file and remove the style attribute</li></ul><p><strong>For example:</strong></p><pre style="margin: 10px 0px;">&lt;!--this HTML code with inline CSS rule:--&gt;&lt;p style="color:red; font-size: 12px"&gt;some text here&lt;/p&gt;&lt;!--would became:--&gt;&lt;p&gt;some text here&lt;/p&gt;&lt;!--and the rule added into your CSS file:--&gt;p{color:red; font-size: 12px}</pre></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-frameset").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-frameset").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
  } else {
    let value = "Frameset Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "Frameset";
    var UpdateScoreVar = "";
    // var FaviconLink = resposnseFavicon[0];
    AuditDescription =
      "<small>Your website is using framesets. HTML Frames Are Obsolete In HTML5.</small>";

    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixFavicon" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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
        $("#Categories_Passed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_passed li ul").html("")
        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Warning").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_warning li ul").html("")
        $("#speedOptimizaionIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_warning li ul").html("")
        $("#allIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#frameset").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page is using frames, which divide your browser window into multiple sections where each section can load separate HTML documents. Frames create problems for both users (e.g., by creating unexepected behavior with printing functions or use of the back-button) and search engine robots (by complicating the crawling process). Avoid use of frames when possible."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixFavicon", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>To add a favicon to your site, you need to have your logo created in a 16x16 PNG, GIF or ICO image and uploaded to your web server. Then it is simply a matter of adding the following code into the header of your HTML code for your web pages:</p><pre><code>&lt;head&gt;&lt;link rel="icon" type="image/x-icon" href="url_to_my_favicon" /&gt;&lt;title&gt;My Title&lt;/title&gt;&lt;/head&gt;</code></pre><p>In the example above the "url_to_my_favicon" refers to the actual location of your favicon file.</p></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-frameset").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-frameset").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
  }
  // framesetTags end
  // disalow start

  if (HomePageUrl == url && HomePageUrl !== "") {
    if (responseDisallowList !== undefined) {
      var disAllowList = "";
      disAllowList = responseDisallowList;

      var resutlist = "";

      let value = "Disallow Directive Test";

      var ChangedScore = "";
      let ResponseKey = "";
      var AuditDescription = "";
      var AuditId = "disallow-tags";
      var disAllowpopUpbtn = "";

      var disAllowpopUpbtn =
        '<button type="button" class="btn btn-link modalBtn seeDisallowList ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

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
          $("#Categories_Passed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              AuditDescription +
              "</p>" +
              (typeof disAllowpopUpbtn === "undefined"
                ? ""
                : disAllowpopUpbtn) +
              "</div>"
          );

          // $("#advancedSeoIssuesDetails_passed li ul").html("")
          $("#advancedSeoIssuesDetails_passed li ul").append(
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

          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "advancedSeo",
            "",
            "Info",
            AuditId
          );
          AuditDescription =
            "<small>Your robots.txt file disallow the search engines access to some parts of your website. You are advised to check carefully if the access to these resources or pages must be blocked.</small>";

          $("#disallow-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              "</p>" +
              disAllowpopUpbtn +
              '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your robots.txt file is instructing search engine crawlers to avoid parts of your website. The disallow directive is used in robots.txt to tell search engines not to crawl and index a file, page, or directory."></i></div></div><hr />'
          );
        } else if (ChangedScore == "Warning") {
          $("#Categories_Warning").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              AuditDescription +
              "</p>" +
              (typeof disAllowpopUpbtn === "undefined"
                ? ""
                : disAllowpopUpbtn) +
              "</div>"
          );
          $("#advancedSeoIssuesDetails_warning li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
              AuditId +
              '"><span class="text-yellow">' +
              value +
              '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
          );

          // $("#allIssuesDetails_warning li ul").html("")
          $("#allIssuesDetails_warning li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
              AuditId +
              '"><span class="text-yellow">' +
              value +
              '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
          );

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
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              AuditDescription +
              "</p>" +
              (typeof disAllowpopUpbtn === "undefined"
                ? ""
                : disAllowpopUpbtn) +
              "</div>"
          );
          $("#advancedSeoIssuesDetails_passed li ul").append(
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

          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "advancedSeo",
            AuditDescription,
            "Info",
            AuditId
          );
          AuditDescription =
            "<small>Your robots.txt file does not use the disallow directive. This means that the whole website can be crawled by search engines.</small>";

          $("#disallow-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your robots.txt file is instructing search engine crawlers to avoid parts of your website. The disallow directive is used in robots.txt to tell search engines not to crawl and index a file, page, or directory."></i></div></div><hr />'
          );
        }
      }

      $(document).on("click", ".modalBtn.seeDisallowList", function () {
        resutlist = "";
        $.each(disAllowList, function (i, val) {
          resutlist += `<li>${val}</li>`;
        });

        $("#ModalDataMD").html(`<ul class="bulleted-list">${resutlist}</ul>`);
        $("#seo_CheckupModalLabelMD").text("Full list of disallow directives");
      });

      // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

      $("#List-disallow-tags").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-disallow-tags").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
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
    var AuditDescription = "";
    var AuditId = "refresh_tag";
    if (responseKey.length == 0) {
      ChangedScore = "Passed";
      AuditDescription =
        "<small>Congratulations! this webpage is not using a meta refresh tag.</small>";
    } else {
      ChangedScore = "Failed";
      AuditDescription = "<small> your website using meta refrsh tag</small>";
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
        $("#Categories_Passed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof disAllowpopUpbtn === "undefined" ? "" : disAllowpopUpbtn) +
            "</div>"
        );
        $("#advancedSeoIssuesDetails_passed li ul").append(
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

        advancedSeoPassedScore = advancedSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          "",
          ChangedScore,
          AuditId
        );
        $("#meta-refresh").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if your webpage is using a refresh meta tag. This tag causes a web page to refresh automatically after a specified amount of time. Users generally dont expect automatic refreshes, so they can be disorienting. Refreshing also moves focus to the top of the page, which may frustrate or confuse users, particularly those who rely on screen readers or other assistive technologies."></i></div></div><hr />'
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
            (typeof disAllowpopUpbtn === "undefined" ? "" : disAllowpopUpbtn) +
            "</div>"
        );
        $("#advancedSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        advancedSeoFailedScore = advancedSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "advancedSeo",
          AuditDescription,
          ChangedScore,
          AuditId
        );
        $("#meta-refresh").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            "</p>" +
            disAllowpopUpbtn +
            '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if your webpage is using a refresh meta tag. This tag causes a web page to refresh automatically after a specified amount of time. Users generally dont expect automatic refreshes, so they can be disorienting. Refreshing also moves focus to the top of the page, which may frustrate or confuse users, particularly those who rely on screen readers or other assistive technologies."></i></div></div><hr />'
        );
      }
    }

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-meta-refresh").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-meta-refresh").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }
  // end refresh tag
  // deprecated tags start
  if (responseDeprecatedTag !== undefined) {
    let value = "Deprecated HTML Tags Test";

    var ChangedScore = "";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "deprecated_tags_count";
    var UpdateScoreVar = "";
    if (
      typeof responseDeprecatedTag == "object" &&
      Object.keys(responseDeprecatedTag).length == 0
    ) {
      ChangedScore = "Passed";
      AuditDescription =
        "Congratulations! Your page does not use HTML deprecated tags.";
    } else {
      ChangedScore = "Failed";
      AuditDescription =
        "We found some HTML deprecated tags. You are advised to change these old tags with equivalent tags or proper CSS rules.";
    }
    var ScoreBracketVar = GetScoreBracket(ChangedScore);
    var deprecatedTgasList = "";
    $.each(responseDeprecatedTag, function (i, val) {
      deprecatedTgasList +=
        '<li><span class="KWC">' +
        val +
        '</span><span class="KWT">' +
        i +
        "</span></li>";
    });

    var UpdateScoreVar = "";
    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToDeprecatedTags" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"> How to Fix </button>';

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

        $("#commonSeoIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

        commonSeoPassedScore = commonSeoPassedScore + 1;
        generalPassedScore = generalPassedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );
        $("#deprecated-tags").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using old, deprecated HTML tags. These tags will eventually lose browser support and your web pages may render incorrectly as browsers drop support for these tags"></i></div></div><hr />'
        );
      } else if (ChangedScore == "Warning") {
        $("#Categories_Warning").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_warning li ul").html("")
        $("#allIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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
        $("#deprecated-tags").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using old, deprecated HTML tags. These tags will eventually lose browser support and your web pages may render incorrectly as browsers drop support for these tags"></i></div></div><hr />'
        );
      } else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        commonSeoFailedScore = commonSeoFailedScore + 1;
        generalFailedScore = generalFailedScore + 1;
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          AuditDescription,
          ChangedScore,
          AuditId
        );
        $("#deprecated-tags").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            modal_btnHTF +
            '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using old, deprecated HTML tags. These tags will eventually lose browser support and your web pages may render incorrectly as browsers drop support for these tags"></i></div></div><hr />'
        );
      }

      $(document).on("click", ".modalBtn.HowToDeprecatedTags", function () {
        let HowToFix =
          '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must identify into your code all deprecated HTML tags listed above and replace them with proper tags or CSS rules. Some examples are given below:</p><ul style={{marginTop: 10}}><li>for <code>&lt;applet&gt;</code> tag, the equivalent tag is <code>&lt;object&gt;</code></li><li>for <code>&lt;center&gt;</code> tag, the alt=""ernative CSS property is <code>text-align</code></li><li>for <code>&lt;font&gt;</code> tag, the alt=""ernative CSS properties are <code>font-family</code> and <code>font-size</code></li><li>for <code>&lt;s&gt;</code>, <code>&lt;strike&gt;</code> and <code>&lt;u&gt;</code> tags, the alt=""ernative CSS property is <code>text-decoration</code></li></ul></div></div>';

        $("#ModalData").html(HowToFix);
        $("#seo_CheckupModalLabel").text(value);
      });

      // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

      $("#List-deprecated-tags").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-deprecated-tags").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }
  }

  // Directory Browsing Test start

  if (responseDirectoryBrowsing !== undefined) {
    let value = "Directory Browsing Test";

    var ChangedScore = "";
    let CustomScore = "";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "directory-browsing";
    var UpdateScoreVar = "";
    if (responseDirectoryBrowsing == false) {
      ChangedScore = "Passed";
      AuditDescription =
        "Congratulations! Your server has disabled directory browsing.";
      CustomScore = 100;
    } else {
      ChangedScore = "Failed";
      AuditDescription =
        "Your server appears to allow directory browsing. Read more on how to disable directory browsing and improve your website's security.";
      CustomScore = 0;
    }
    var ScoreBracketVar = GetScoreBracket(CustomScore);

    var UpdateScoreVar = "";
    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixDirectoryBrowsing" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      // if(ScoreBracketVar == '' && ChangedScore !== ""){

      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        AuditDescription,
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
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#serverAndSecurityIssuesDetails_passed li ul").html("")
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
        $("#directory-browsing").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
        );
      } else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#serverAndSecurityIssuesDetails_failed li ul").html("")
        $("#serverAndSecurityIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
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
        $("#directory-browsing").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            modal_btnHTF +
            '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
        );
      }
    }

    $(document).on("click", ".modalBtn.HowToFixDirectoryBrowsing", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>Apache web server allow directory browsing by default. In order to disable directory browsing in apache web server you need to edit the .htaccess or httpd.conf file from your server.</p><ol><li><strong>Disable directory browsing using .htaccess file:</strong><ul><li>If "Options Indexes" exists, modify it to "Options -Indexes" (add a "-" sign before "Indexes") or else add "Options -Indexes" as a new line</li></ul></li><li><strong>Disable directory browsing using httpd.conf file:</strong><ul><li>Go to your own Virtual Host settings and look for "Options Indexes"</li><li>If "Options Indexes" exists, modify it to "Options -Indexes" (add a "-" sign before "Indexes") or else add "Options -Indexes" as a new line</li><li>Restart your apache web server</li></ul></li></ol></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-directory-browsing")
      .removeClass("Failed")
      .addClass(UpdateScoreVar);
    $("#List-directory-browsing").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }
  // Directory browsing test end

  if (responseSafeBrowsing !== undefined) {
    let value = "Safe Browsing Test";

    var ChangedScore = "";
    let CustomScore = "";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "safe-browsing";
    var UpdateScoreVar = "";

    // console.log(responseSafeBrowsing + "   responseSafeBrowsing")

    if (
      responseSafeBrowsing && // 👈 null and undefined check
      Object.keys(responseSafeBrowsing).length === 0 &&
      Object.getPrototypeOf(responseSafeBrowsing) === Object.prototype
    ) {
      ChangedScore = "Passed";
      AuditDescription =
        "This site is not currently listed as suspicious (no malware or phishing activity found).";
      CustomScore = 100;
    } else {
      ChangedScore = "Failed";
      AuditDescription =
        "This site is suspicious (malware or phishing activity found).";
      CustomScore = 0;
    }
    var ScoreBracketVar = GetScoreBracket(CustomScore);

    var UpdateScoreVar = "";
    // var modal_btnHTF = '<button type="button" class="btn btn-danger modalBtn HowToFixDirectoryBrowsing" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      // if(ScoreBracketVar == '' && ChangedScore !== ""){

      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        AuditDescription,
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
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
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
        $("#safe-browsing").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
        );
      } else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            "</ul><br>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#serverAndSecurityIssuesDetails_failed li ul").html("")
        $("#serverAndSecurityIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
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
        $("#safe-browsing").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><p class="Description">' +
            AuditDescription +
            '</p><ul class="KW_ul p-0">' +
            deprecatedTgasList +
            '</ul><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
        );
      }
    }

    $(document).on("click", ".modalBtn.HowToFixDirectoryBrowsing", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>Apache web server allow directory browsing by default. In order to disable directory browsing in apache web server you need to edit the .htaccess or httpd.conf file from your server.</p><ol><li><strong>Disable directory browsing using .htaccess file:</strong><ul><li>If "Options Indexes" exists, modify it to "Options -Indexes" (add a "-" sign before "Indexes") or else add "Options -Indexes" as a new line</li></ul></li><li><strong>Disable directory browsing using httpd.conf file:</strong><ul><li>Go to your own Virtual Host settings and look for "Options Indexes"</li><li>If "Options Indexes" exists, modify it to "Options -Indexes" (add a "-" sign before "Indexes") or else add "Options -Indexes" as a new line</li><li>Restart your apache web server</li></ul></li></ol></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-safe-browsing").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-safe-browsing").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }

  // Sitemap Test start
  if (HomePageUrl == url && HomePageUrl !== "") {
    if (responseSitemap !== undefined) {
      let value = "Sitemap Test";
      var ChangedScore = "";
      let CustomScore = "";
      let ResponseKey = "";
      var AuditDescription = "";
      var AuditId = "sitemap";
      var UpdateScoreVar = "";
      if (responseSitemap !== false) {
        ChangedScore = "Passed";
        AuditDescription =
          'Congratulations! Your website has a sitemap file </br></br> <a href="' +
          responseSitemap +
          '" target="_blank">"' +
          responseSitemap +
          '"</a>';
        CustomScore = 100;
      } else {
        ChangedScore = "Failed";
        AuditDescription =
          "Your website lacks a sitemap file. Sitemaps can help robots index your content more thoroughly and quickly. Read more on Google's guidelines for implementing the sitemap protocol.";
        CustomScore = 0;
      }
      var ScoreBracketVar = GetScoreBracket(CustomScore);
      var UpdateScoreVar = "";
      let modal_btnHTF =
        '<button type="button" class="btn btn-danger modalBtn HowToFixSitemap" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );
          $("#sitemap").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
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
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
              AuditId +
              '"><span class="text-red">' +
              value +
              '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
          );
          // $("#allIssuesDetails_failed li ul").html("")
          $("#allIssuesDetails_failed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
              AuditId +
              '"><span class="text-red">' +
              value +
              '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
          );

          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            AuditDescription,
            ChangedScore,
            AuditId
          );
          $("#sitemap").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><ul class="KW_ul p-0">' +
              deprecatedTgasList +
              "</ul><br>" +
              modal_btnHTF +
              '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your server allows directory browsing. If directory browsing is disabled, visitors will not be able to browse your directory by accessing the directory directly (if there is no index.html file). This will protect your files from being exposed to the public. Apache web server allows directory browsing by default. Disabling directory browsing is generally a good idea from a security standpoint."></i></div></div><hr />'
          );
        }
      }
      $(document).on("click", ".modalBtn.HowToFixSitemap", function () {
        let HowToFix =
          '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must create a sitemap.xml file for your website. Some of the best practices are listed below:</p><ul style="margin-top: 10px"><li>It is strongly recommended that you place your sitemap at the root directory of your website: <strong>http://yourwebsite.com/sitemap.xml</strong> But in some situations, you may want to produce different sitemaps for different paths on your site (e.g., security permission issues)</li><li>Sitemaps should be no larger than 10MB (10,485,760 bytes) and can contain a maximum of 50,000 URLs. This means that if your site contains more than 50,000 URLs or your sitemap is bigger than 10MB, you must create multiple sitemap files and use a <strong>Sitemap index file</strong></li><li>All URLs listed in the sitemap must reside on the same host as the sitemap. For instance, if the sitemap is located at <strong>http://www.yourwebsite.com/sitemap.xml</strong>, it can\'t include URLs from <strong>http://subdomain.yourwebsite.com</strong></li><li>Once you have created your sitemap, let search engines know about it by submitting directly to them, pinging them, or adding the sitemap location to your <strong>robots.txt</strong> file</li><li>Sitemaps can be compressed using gzip, reducing bandwidth consumption</li></ul><p><strong>sitemap.xml example:</strong></p><pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt; &lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt; &lt;url&gt; &lt;loc&gt;http://www.yourwebsite.com&lt;/loc&gt; &lt;lastmod&gt;2013-01-01&lt;/lastmod&gt; &lt;changefreq&gt;weekly&lt;/changefreq&gt; &lt;priority&gt;0.9&lt;/priority&gt; &lt;/url&gt; &lt;url&gt; &lt;loc&gt;http://www.yourwebsite.com/articles/100&lt;/loc&gt; &lt;changefreq&gt;weekly&lt;/changefreq&gt; &lt;/url&gt; &lt;url&gt; &lt;loc&gt;http://www.yourwebsite.com/articles/101&lt;/loc&gt; &lt;lastmod&gt;2013-01-02&lt;/lastmod&gt; &lt;changefreq&gt;weekly&lt;/changefreq&gt; &lt;/url&gt; &lt;url&gt; &lt;loc&gt;http://www.yourwebsite.com/articles/102&lt;/loc&gt; &lt;lastmod&gt;2013-01-02T13:00:12+00:00&lt;/lastmod&gt; &lt;priority&gt;0.5&lt;/priority&gt; &lt;/url&gt; &lt;/urlset&gt; </pre></div></div>';
        $("#ModalDataMD").html(HowToFix);
        $("#seo_CheckupModalLabelMD").text(value);
      });
      // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));
      $("#List-sitemap").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-sitemap").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
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
    var AuditDescription = "";
    var AuditId = "favicon";
    var UpdateScoreVar = "";
    var protocol = "";
    var domainUrl_ = "";
    var FaviconLink = resposnseFavicon[0];
    var domainUrl = new URL(finalUrl);
    domainUrl_ = domainUrl.hostname;
    protocol = domainUrl.protocol;

    if (FaviconLink.includes("http")) {
      AuditDescription =
        "<small><img src=" +
        FaviconLink +
        " class='favicon mr-3'>Congratulations! Your website appears to have a favicon.</small>";

      // alert(FaviconLink);
    } else {
      AuditDescription =
        "<small><img src=" +
        protocol +
        "//" +
        domainUrl_ +
        FaviconLink +
        " class='favicon mr-3'>Congratulations! Your website appears to have a favicon.</small>";
      // alert(finalUrl+FaviconLink);
    }
    // AuditDescription = "<small><img src=" + FaviconLink + " class='favicon mr-3' title="+FaviconLink+">Congratulations! Your website appears to have a favicon.</small>"

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

        $("#commonSeoIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Warning").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_warning li ul").html("")
        $("#allIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

      $("#favicon").html(
        '<div class="media ' +
          UpdateScoreVar +
          '" id="issue-' +
          AuditId +
          '"><label class="mr-3" >' +
          value +
          '</label><div class="media-body"><p class="Description">' +
          AuditDescription +
          '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your site is using and correctly implementing a favicon. Favicons are small icons that appear in your browser URL navigation bar. They are also saved next to your URLs title when your page is bookmarked. This helps brand your site and make it easy for users to navigate to your site among a list of bookmarks."></i></div></div><hr />'
      );

      $(document).on("click", ".modalBtn.HowToFixInlineCss", function () {
        let HowToFix =
          '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>It is a good practice to move all the inline CSS rules into an external file in order to make your page "lighter" in weight and decrease the code to text ratio.</p><ul><li>check the HTML code of your page and identify all style attributes</li><li>for each style attribute found you must properly move all declarations in the external CSS file and remove the style attribute</li></ul><p><strong>For example:</strong></p><pre style="margin: 10px 0px;">&lt;!--this HTML code with inline CSS rule:--&gt;&lt;p style="color:red; font-size: 12px"&gt;some text here&lt;/p&gt;&lt;!--would became:--&gt;&lt;p&gt;some text here&lt;/p&gt;&lt;!--and the rule added into your CSS file:--&gt;p{color:red; font-size: 12px}</pre></div></div>';

        $("#ModalDataMD").html(HowToFix);
        $("#seo_CheckupModalLabelMD").text(value);
      });

      // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

      $("#List-favicon").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-favicon").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
    }
  } else {
    let value = "Favicon Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "favicon";
    var UpdateScoreVar = "";
    // var FaviconLink = resposnseFavicon[0];
    AuditDescription =
      "<small>Your site either doesn't have a favicon or this has not been referenced correctly.</small>";

    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixFavicon" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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

        $("#commonSeoIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Warning").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_warning li ul").html("")
        $("#allIssuesDetails_warning li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-yellow">' +
            value +
            '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );
        $("#commonSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#favicon").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your site is using and correctly implementing a favicon. Favicons are small icons that appear in your browser URL navigation bar. They are also saved next to your URLs title when your page is bookmarked. This helps brand your site and make it easy for users to navigate to your site among a list of bookmarks."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixFavicon", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>To add a favicon to your site, you need to have your logo created in a 16x16 PNG, GIF or ICO image and uploaded to your web server. Then it is simply a matter of adding the following code into the header of your HTML code for your web pages:</p><pre><code>&lt;head&gt;&lt;link rel="icon" type="image/x-icon" href="url_to_my_favicon" /&gt;&lt;title&gt;My Title&lt;/title&gt;&lt;/head&gt;</code></pre><p>In the example above the "url_to_my_favicon" refers to the actual location of your favicon file.</p></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

    $("#List-favicon").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-favicon").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
  }

  if (resposnseInlineCss !== undefined && resposnseInlineCss.length > 0) {
    let value = "Inline CSS Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "inline-css";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>Your webpage is using inline CSS styles!</small>";
    var InlineCssModalBtn =
      '<button type="button" class="btn btn-link modalBtn InlineCssModalBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixInlineCss" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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
        $("#Categories_Passed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><div class="Details">' +
            InlineCssModalBtn +
            '</div><div class="mt-3">' +
            modal_btnHTF +
            "</div>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            '</p><div class="Details">' +
            InlineCssModalBtn +
            '</div><div class="mt-3">' +
            modal_btnHTF +
            "</div>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#inline-css").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="Details">' +
        InlineCssModalBtn +
        '</div><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your webpage HTML tags for inline CSS properties. Inline CSS property are added by using the style attribute within specific HTML tags. Inline CSS properties unnecessarily increase page size, and can be moved to an external CSS stylesheet. Removing inline CSS properties can improve page loading time and make site maintenance easier."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixInlineCss", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>It is a good practice to move all the inline CSS rules into an external file in order to make your page "lighter" in weight and decrease the code to text ratio.</p><ul><li>check the HTML code of your page and identify all style attributes</li><li>for each style attribute found you must properly move all declarations in the external CSS file and remove the style attribute</li></ul><p><strong>For example:</strong></p><pre style="margin: 10px 0px;">&lt;!--this HTML code with inline CSS rule:--&gt;&lt;p style="color:red; font-size: 12px"&gt;some text here&lt;/p&gt;&lt;!--would became:--&gt;&lt;p&gt;some text here&lt;/p&gt;&lt;!--and the rule added into your CSS file:--&gt;p{color:red; font-size: 12px}</pre></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    $("#List-inline-css").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-inline-css").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
    var inlineCssHtmlModal = "";
    inlineCssHtmlModal += '<div class="accordion " id="accordionInlineCss">';
    var getFirsttag = "";
    $(document).on("click", ".modalBtn.InlineCssModalBtn", function () {
      // var inlineCssHtml = "<ul class='CDNList'>";

      Object.keys(resposnseInlineCss).forEach(function (key) {
        getFirsttag = resposnseInlineCss[key].split("\n");

        ResponseCss = resposnseInlineCss[key]
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        // inlineCssHtml += "<li><code><xmp>" + resposnseInlineCss[key] + "</xmp></code></li>"
        // $('.accordion-button').html(getFirsttag)
        inlineCssHtmlModal +=
          '<div class="accordion-item "><h2 class="accordion-header bg-custom-gray" id="heading' +
          key +
          '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' +
          key +
          '" aria-expanded="false" aria-controls="collapse' +
          key +
          '"><xmp>' +
          getFirsttag +
          '</xmp></button> </h2> <div id="collapse' +
          key +
          '" class="accordion-collapse collapse" aria-labelledby="heading' +
          key +
          '" data-bs-parent="#accordionInlineCss"><div class="accordion-body"><?prettify lang=html><pre class="prettyprint">' +
          ResponseCss +
          "</pre></div></div></div> <div class='border_bottom_modal'> </div>";
      });
      // inlineCssHtml += "</ul>"
      inlineCssHtmlModal += "</div>";

      $("#ModalData").html(inlineCssHtmlModal);

      // $("#ImgTable").append("<tr></tr>")
      $("#seo_CheckupModalLabel").text(
        "Full list of tags with inline css style"
      );
      PR.prettyPrint();
    });
  } else {
    let value = "Inline CSS Test";

    var ChangedScore = "Passed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "inline-css";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>Your webpage is using inline CSS styles!</small>";

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

        $("#commonSeoIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        $("#commonSeoIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#inline-css").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your webpage HTML tags for inline CSS properties. Inline CSS property are added by using the style attribute within specific HTML tags. Inline CSS properties unnecessarily increase page size, and can be moved to an external CSS stylesheet. Removing inline CSS properties can improve page loading time and make site maintenance easier."></i></div></div><hr />'
    );

    $("#List-inline-css").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-inline-css").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
  }

  if (resposnseFlash !== undefined && resposnseFlash.length > 0) {
    let value = "Flash Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "flash";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>Your webpage is using flash objects (an outdated technology that was sometimes used to deliver rich multimedia content). Flash content does not work well on mobile devices, and is difficult for crawlers to interpret.</small>";
    var FlashFilesModalBtn =
      '<button type="button" class="btn btn-link modalBtn InlineCssModalBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFlashFiles" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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

        // $("#speedOptimizaionIssuesDetails_passed li ul").html("")
        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#flash").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="Details">' +
        FlashFilesModalBtn +
        '</div><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page uses Flash, an outdated technology that was typically used to deliver rich multimedia content. The web has evolved to replace Flash with open-standard technologies that additionally offered better performance and security. Flash content also does not work well on mobile devices, and is difficult to index by search engines."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFlashFiles", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>building a site entirely in Flash isn’t best practice. To create the right balance when it comes to using Flash and implementing SEO for Flash, consider these tips:</p>Don’t use Flash as the navigation.Embed Flash files into HTML pages.Use descriptive page titles and meta descriptions.Don’t include an entire site in one Flash file. Instead, break the content into multiple Flash files with different HTML pages.Use Flash for design elements and less-important content, and use HTML for the most important page elements.</div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    $("#List-flash").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-flash").html(`<a href="#issue-` + AuditId + `">${value}</a>`);

    $(document).on("click", ".modalBtn.FlashFilesModalBtn", function () {
      var FlashFilesHtml = "<ul class='FlashFileList CDNList'>";

      Object.keys(resposnseFlash).forEach(function (key) {
        FlashFilesHtml += "<li><xmp>" + resposnseFlash[key] + "</xmp></li>";
      });
      FlashFilesHtml += "</ul>";
      $("#ModalData").html(FlashFilesHtml);

      $("#seo_CheckupModalLabel").text("Full list of Flash Links");
    });
  } else {
    let value = "Flash Test";

    var ChangedScore = "Passed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "flash";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>Congratulations! Your website does not include flash objects (an outdated technology that was sometimes used to deliver rich multimedia content). Flash content does not work well on mobile devices, and is difficult for crawlers to interpret.</small>";

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

        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#flash").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page uses Flash, an outdated technology that was typically used to deliver rich multimedia content. The web has evolved to replace Flash with open-standard technologies that additionally offered better performance and security. Flash content also does not work well on mobile devices, and is difficult to index by search engines."></i></div></div><hr />'
    );

    $("#List-flash").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-flash").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
  }

  if (resposnseNestedTables !== undefined && resposnseNestedTables.length > 0) {
    let value = "Nested Tables Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "nested-tables";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>It appears that your site contains nested tables. Nested tables can be slow to render in some browsers. Consider using a CSS layout to reduce both HTML size and page loading time.</small>";
    var NestedTablesModalBtn =
      '<button type="button" class="btn btn-link modalBtn NestedTablesModalBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixNestedTables" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

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
        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );
        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

        // $("#allIssuesDetails_failed li ul").html("")
        $("#allIssuesDetails_failed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
            AuditId +
            '"><span class="text-red">' +
            value +
            '</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>'
        );

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

    $("#nested-tables").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="Details">' +
        NestedTablesModalBtn +
        '</div><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if this site contains nested tables. A nested table is an HTML table containing another table inside it. Use of nested tables can slow down page rendering in the users browser."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixNestedTables", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>In order to pass this test you must use a CSS layout for your page. You will have many advantages if you will use CSS instead of HTML tables for formating your content: accessibility, bandwidth savings, maintainability.</div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    $("#List-nested-tables").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-nested-tables").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );

    $(document).on("click", ".modalBtn.NestedTablesModalBtn", function () {
      var TableTag1 = "";
      var SplitTableTag = "";
      TableTag1 += '<div class="accordion" id="nestedTables">';
      Object.keys(resposnseNestedTables).forEach(function (key) {
        // SplitTableTag = resposnseNestedTables[key].split('\n');

        // TableTag1 += '<div class="accordion-item mt-1 mb-1"><h2 class="accordion-header bg-custom-gray" id="heading'+key+'"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+key+'" aria-expanded="false" aria-controls="collapse'+key+'"><xmp>'+SplitTableTag[0]+'</xmp></button></h2><div id="collapse'+key+'" class="accordion-collapse collapse" aria-labelledby="heading'+key+'" data-bs-parent="#nestedTables"><div class="accordion-body">'
        // SplitTableTag.shift();
        // SplitTableTag.forEach(element => {

        SplitTableTagHeader = resposnseNestedTables[key].split("\n");
        SplitTableTag = resposnseNestedTables[key];
        SplitTableTag = SplitTableTag.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        TableTag1 +=
          '<div class="accordion-item mt-1 mb-1"><h2 class="accordion-header bg-custom-gray" id="heading' +
          key +
          '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' +
          key +
          '" aria-expanded="false" aria-controls="collapse' +
          key +
          '"><xmp>' +
          SplitTableTagHeader[0] +
          '</xmp></button></h2><div id="collapse' +
          key +
          '" class="accordion-collapse collapse" aria-labelledby="heading' +
          key +
          '" data-bs-parent="#nestedTables"><div class="accordion-body">';
        // SplitTableTag.shift();
        // SplitTableTag.forEach(element => {
        SplitTableTag = SplitTableTag;

        TableTag1 +=
          '<?prettify lang=html><pre class="prettyprint">' +
          SplitTableTag +
          "</pre>";

        // });
        TableTag1 += "</div></div></div>";
      });
      TableTag1 += "</div>";

      $("#ModalData").html(TableTag1);

      // $("#ImgTable").append("<tr></tr>")
      $("#seo_CheckupModalLabel").text("Full list of Nested Tables");

      PR.prettyPrint();
    });
  } else {
    let value = "Nested Tables Test";

    var ChangedScore = "Passed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "nested-tables";
    var UpdateScoreVar = "";

    AuditDescription =
      "<small>Congratulations! your page does not use nested tables. This speeds up page loading time and optimizes the user experience.</small>";

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
        $("#speedOptimizaionIssuesDetails_passed li ul").append(
          '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
        $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

    $("#nested-tables").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if this site contains nested tables. A nested table is an HTML table containing another table inside it. Use of nested tables can slow down page rendering in the users browser."></i></div></div><hr />'
    );

    $("#List-nested-tables").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-nested-tables").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }

  if (
    resposnsePlainTextEmails !== undefined &&
    resposnsePlainTextEmails.length > 0
  ) {
    let value = "Plaintext Emails Test";

    var ChangedScore = "Failed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "plaintext-emails";

    let noOfEmails = resposnsePlainTextEmails.length;
    AuditDescription =
      "<small>We've found " +
      noOfEmails +
      " email addresses in your page code. We advise you to protect email links in a way that hides them from the spam harvesters.</small>";
    let modal_btnPlainTextEmails =
      '<button type="button" class="btn btn-link modalBtn plainTextEmailsBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
    let modal_btnHTF =
      '<button type="button" class="btn btn-danger modalBtn HowToFixPlainTextEmails" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

    var ScoreBracketVar = GetScoreBracket(ChangedScore);

    var UpdateScoreVar = "";

    if (ScoreBracketVar !== "Info" && ChangedScore == "") {
      // if(ScoreBracketVar == '' && ChangedScore !== ""){

      UpdateScoreVar = UpdateScore(
        ResponseKey,
        "serverAndSecurity",
        SeoDataTitle,
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
      } else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
            "</div>"
        );

        // $("#serverAndSecurityIssuesDetails_failed li ul").html("")
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
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      }
    }

    // <div class="Details">'+modal_btnPlainTextEmails+'</div>
    $("#plaintext-emails").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><div class="mt-3">' +
        modal_btnHTF +
        '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your webpage for plaintext email addresses. Any e-mail address posted in public is likely to be automatically collected by computer software used by bulk emailers (a process known as e-mail address harvesting). A spam harvester can read through the pages in your site and extract plaintext email addresses which are then added to bulk marketing databases (resulting in more inbox spam). There are several methods for email obfuscation."></i></div></div><hr />'
    );

    $(document).on("click", ".modalBtn.HowToFixPlainTextEmails", function () {
      let HowToFix =
        '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must make your email addresses invisible to email spiders. Note that the best option is to replace your entire contact mechanism with a contact form and using the POST method while submitting the form.</p><p>Other solutions are listed below:</p><ul style="margin-top: 10px;"><li>replace the at (@) and dot (.) characters</li><li>replace text with images</li><li>use email obfuscators</li><li>hide email addresses using JavaScript or CSS trick</li></ul></div></div>';

      $("#ModalDataMD").html(HowToFix);
      $("#seo_CheckupModalLabelMD").text(value);
    });

    // FilterServerAndSecurityIssue = serverAndSecurity.filter(item => ! ExcludeServerAndSecurityValues.includes(item));

    $("#List-plaintext-emails").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-plaintext-emails").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );

    $(document).on("click", ".modalBtn.plainTextEmailsBtn", function () {
      var plainTextEmailsHtml = "<ul class='plainTextEmailsList CDNList'>";

      Object.keys(resposnsePlainTextEmails).forEach(function (key) {
        plainTextEmailsHtml += "<li>" + resposnsePlainTextEmails[key] + "</li>";
      });
      plainTextEmailsHtml += "</ul>";
      $("#ModalData").html(plainTextEmailsHtml);

      // $("#ImgTable").append("<tr></tr>")
      $("#seo_CheckupModalLabel").text("Full list of Plaintext Emails");
    });
  } else {
    let value = "Plaintext Emails Test";
    var ChangedScore = "Passed";
    let ResponseKey = "";
    var AuditDescription = "";
    var AuditId = "plaintext-emails";
    var UpdateScoreVar = "";
    AuditDescription =
      "<small>Congratulations! Your webpage does not include email addresses in plaintext.</small>";

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
      } else if (ChangedScore == "Failed") {
        $("#Categories_Failed").append(
          '<div id="audit_' +
            AuditId +
            '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
            value +
            '</h6><p class="text-light-gray">' +
            AuditDescription +
            "</p>" +
            (typeof modal_btnBrokenLinks === "undefined"
              ? ""
              : modal_btnBrokenLinks) +
            "</div>"
        );

        // $("#serverAndSecurityIssuesDetails_failed li ul").html("")
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
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      }
    }

    $("#plaintext-emails").html(
      '<div class="media ' +
        UpdateScoreVar +
        '" id="issue-' +
        AuditId +
        '"><label class="mr-3" >' +
        value +
        '</label><div class="media-body"><p class="Description">' +
        AuditDescription +
        '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your webpage HTML tags for inline CSS properties. Inline CSS property are added by using the style attribute within specific HTML tags. Inline CSS properties unnecessarily increase page size, and can be moved to an external CSS stylesheet. Removing inline CSS properties can improve page loading time and make site maintenance easier."></i></div></div><hr />'
    );

    $("#List-plaintext-emails").removeClass("Failed").addClass(UpdateScoreVar);
    $("#List-plaintext-emails").html(
      `<a href="#issue-` + AuditId + `">${value}</a>`
    );
  }
  // server signature start
  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnsewebsite_seo_data
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      var SubResponse = resposnseDatavalue;

      if (SubResponse["server_attrs"] == "" || SubResponse["server_attrs"]) {
        let ResponseKey = SubResponse["server_attrs"];
        let value = "Server Signature Test";
        var AuditDescription = "";
        var AuditTitle = "";
        var AuditId = "server_attrs";

        var ChangedScore = "";
        var UpdateScoreVar = "";
        var serverSignatureValue = "";
        var CustomScore = "";

        let modal_btnServerSign =
          '<button type="button" class="btn btn-danger modalBtn serverSignature" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

        if (!SubResponse["server_attrs"]["server_signature"].includes("/")) {
          AuditDescription =
            "<small>Congratulations! your server signature is off.</small>";
          ChangedScore = "Passed";
          CustomScore = 100;
        } else {
          AuditDescription =
            "<small>Your server signature is on. Turning off your server signature is generally a good idea from a security standpoint. Read more on how to turn off server signature and improve your website's security.</small>";
          (ChangedScore = "Failed"),
            (serverSignatureValue =
              SubResponse["server_attrs"]["server_signature"]);
          CustomScore = 0;
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
            $("#Categories_Passed").append(
              '<div id="audit_' +
                AuditId +
                '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                value +
                '</h6><p class="text-light-gray">' +
                AuditDescription +
                "</p>" +
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
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
            $("#server-signature").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                '</p><div class="Details"></div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your servers signature is ON. A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Turning your server signature OFF is considered a good security practice to avoid disclosure of what software versions you are running."></i></div><hr />'
            );
          } else if (ChangedScore == "Warning") {
            $("#Categories_Warning").append(
              '<div id="audit_' +
                AuditId +
                '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                value +
                '</h6><p class="text-light-gray">' +
                AuditDescription +
                "</p>" +
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
                "</div>"
            );

            // $("#serverAndSecurityIssuesDetails_warning li ul").html("")
            $("#serverAndSecurityIssuesDetails_warning li ul").append(
              '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                AuditId +
                '"><span class="text-yellow">' +
                value +
                '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
            );

            // $("#allIssuesDetails_warning li ul").html("")
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
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
            $("#server-signature").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                '</p><div class="Details"></div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your servers signature is ON. A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Turning your server signature OFF is considered a good security practice to avoid disclosure of what software versions you are running."></i></div><hr />'
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
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
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
            $("#server-signature").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                '</p><div class="Details"><code>' +
                serverSignatureValue +
                "</code><br><br><br>" +
                modal_btnServerSign +
                '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your servers signature is ON. A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Turning your server signature OFF is considered a good security practice to avoid disclosure of what software versions you are running."></i></div><hr />'
            );
          }
        }

        $("#List-server-signature")
          .removeClass("Failed")
          .addClass(UpdateScoreVar);
        $("#List-server-signature").html(
          `<a href="#issue-` + AuditId + `">${value}</a>`
        );

        $(document).on("click", ".modalBtn.serverSignature", function () {
          let HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>By default, the Apache webserver sends HTTP headers with some information about your server version, operating system, modules installed, etc. This information can be used by hackers in order to exploit vulnerabilities (specially if you are running an older version). These information can be hidden or changed with very basic configurations.</p><p>Open Apaches configuration file (<strong>httpd.conf</strong> or <strong>apache.conf</strong>) and search for <strong>ServerSignature</strong>. If you find it, edit it to:</p><code style= {{margin: "10px 0px"}}>ServerSignature Off<br/>ServerTokens Prod<br/></code><p>If you dont find it, just add these two lines at the end of the file.</p><p>Note that, after you modify the configuration file, you must restart the Apache server.</p></div></div>';

          $("#ModalDataMD").html(HowToFix);
          $("#seo_CheckupModalLabelMD").text(value);
        });
      }
      // powerd by start
      if (SubResponse["server_attrs"] == "" || SubResponse["server_attrs"]) {
        let ResponseKey = SubResponse["server_attrs"];
        let value = "Website Powered By";
        var AuditDescription = "";
        var AuditTitle = "";
        var AuditId = "x-powered-by";
        var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
        var ChangedScore = "";
        var UpdateScoreVar = "";
        var xPowerdBy = "";

        let modal_btnServerSign =
          '<button type="button" class="btn btn-danger modalBtn serverSignature" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

        if (SubResponse["server_attrs"]["x_powered_by"] == "") {
          xPowerdBy = SubResponse["server_attrs"]["x_powered_by"];

          AuditDescription =
            "<small>Congratulations! your website technology is hidden. Hiding your website technology is generally a good idea from a security standpoint.</small>";
          ChangedScore = "Passed";
        } else {
          AuditDescription =
            "<small>Your website technology is not hidden. Hiding your website technology is generally a good idea from a security standpoint.</small>";
          ChangedScore = "Failed";
          xPowerdBy = SubResponse["server_attrs"]["x_powered_by"];
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
            $("#Categories_Passed").append(
              '<div id="audit_' +
                AuditId +
                '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                value +
                '</h6><p class="text-light-gray">' +
                AuditDescription +
                "</p><code>" +
                xPowerdBy +
                "</code>" +
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
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
            $("#x-powered-by").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                "</p>" +
                '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your servers technology . A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Hiding details about server technology is considered a good security practice to avoid disclosure of what technology & versions you are running."></i></div><hr />'
            );
          } else if (ChangedScore == "Warning") {
            $("#Categories_Warning").append(
              '<div id="audit_' +
                AuditId +
                '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                value +
                '</h6><p class="text-light-gray">' +
                AuditDescription +
                "</p><code>" +
                xPowerdBy +
                "</code>" +
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
                "</div>"
            );
            $("#serverAndSecurityIssuesDetails_warning li ul").append(
              '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                AuditId +
                '"><span class="text-yellow">' +
                value +
                '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
            );

            // $("#allIssuesDetails_warning li ul").html("")
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
            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              AuditDescription,
              ChangedScore,
              AuditId
            );
            $("#x-powered-by").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                "</p>" +
                '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your servers technology . A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Hiding details about server technology is considered a good security practice to avoid disclosure of what technology & versions you are running."></i></div><hr />'
            );
          } else if (ChangedScore == "Failed") {
            $("#Categories_Failed").append(
              '<div id="audit_' +
                AuditId +
                '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                value +
                '</h6><p class="text-light-gray">' +
                AuditDescription +
                "</p><code>" +
                xPowerdBy +
                "</code>" +
                (typeof modal_btnServerSign === "undefined"
                  ? ""
                  : modal_btnServerSign) +
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
            $("#x-powered-by").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                "</p><code>" +
                xPowerdBy +
                '</code></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your servers technology . A server signature is the public identity of your web server and contains sensitive information that could be used to exploit any known vulnerability. Hiding details about server technology is considered a good security practice to avoid disclosure of what technology & versions you are running."></i></div><hr />'
            );
          }
        }

        $("#List-x-powered-by").removeClass("Failed").addClass(UpdateScoreVar);
        $("#List-x-powered-by").html(
          `<a href="#issue-` + AuditId + `">${value}</a>`
        );

        $(document).on("click", ".modalBtn.serverSignature", function () {
          let HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>By default, the Apache webserver sends HTTP headers with some information about your server version, operating system, modules installed, etc. This information can be used by hackers in order to exploit vulnerabilities (specially if you are running an older version). These information can be hidden or changed with very basic configurations.</p><p>Open Apaches configuration file (<strong>httpd.conf</strong> or <strong>apache.conf</strong>) and search for <strong>ServerSignature</strong>. If you find it, edit it to:</p><code style= {{margin: "10px 0px"}}>ServerSignature Off<br/><br/>ServerTokens Prod<br/></code><p>If you dont find it, just add these two lines at the end of the file.</p><p>Note that, after you modify the configuration file, you must restart the Apache server.</p></div></div>';

          $("#ModalDataMD").html(HowToFix);
          $("#seo_CheckupModalLabelMD").text(value);
        });
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
            var AuditDescription = "";
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

            let modal_btnHTF =
              '<button type="button" class="btn btn-danger modalBtn HowToFixRobotsTxt" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

            if (SubResponse["robots-txt"]["score"] == 1) {
              AuditDescription =
                "<small>Congratulations! Your site uses a 'robots.txt' file.</small></br></br>" +
                RobotsTxt;
              ChangedScore = "Passed";
            } else if (
              SubResponse["robots-txt"]["score"] == 0 &&
              ResponseKey["title"] == "robots.txt is not valid"
            ) {
              AuditDescription =
                "<small>Congratulations! Your site uses a 'robots.txt' file.</small></br></br>" +
                RobotsTxt;
              ChangedScore = "Passed";
            } else {
              AuditDescription =
                "<small>Your site lacks a 'robots.txt' file. This file can protect private content from appearing online, save bandwidth, and lower load time on your server. A missing 'robots.txt' file also generates additional errors in your apache log whenever robots request one. Read more about the robots.txt file, and how to create one for your site.</small>";
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
                $("#commonSeoIssuesDetails_passed li ul").append(
                  '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
                $("#Categories_Warning").append(
                  '<div id="audit_' +
                    AuditId +
                    '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                    value +
                    '</h6><p class="text-light-gray">' +
                    AuditDescription +
                    "</p>" +
                    (typeof modal_btnBrokenLinks === "undefined"
                      ? ""
                      : modal_btnBrokenLinks) +
                    "</div>"
                );

                $("#commonSeoIssuesDetails_warning li ul").append(
                  '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                    AuditId +
                    '"><span class="text-yellow">' +
                    value +
                    '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
                );

                // $("#allIssuesDetails_warning li ul").html("")
                $("#allIssuesDetails_warning li ul").append(
                  '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                    AuditId +
                    '"><span class="text-yellow">' +
                    value +
                    '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
                );

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
                $("#Categories_Failed").append(
                  '<div id="audit_' +
                    AuditId +
                    '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                    value +
                    '</h6><p class="text-light-gray">' +
                    AuditDescription +
                    "</p>" +
                    (typeof modal_btnBrokenLinks === "undefined"
                      ? ""
                      : modal_btnBrokenLinks) +
                    "</div>"
                );

                $("#commonSeoIssuesDetails_failed li ul").append(
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

            $("#robots-txt").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is using a robots.txt file. When search engine robots crawl a website, they typically first access a sites robots.txt file. Robots.txt tells Googlebot and other crawlers what is and is not allowed to be crawled on your site."></i></div><hr />'
            );

            // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

            $("#List-robots-txt")
              .removeClass("Failed")
              .addClass(UpdateScoreVar);
            $("#List-robots-txt").html(
              `<a href="#issue-` + AuditId + `">${value}</a>`
            );

            $(document).on("click", ".modalBtn.HowToFixRobotsTxt", function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must create and properly install a <strong>robots.txt</strong> file.</p><p>For this, you can use any program that produces a text file or you can use an online tool (Google Webmaster Tools has this feature).</p><p>Remember to use all lower case for the filename: <strong>robots.txt</strong>, not <strong>ROBOTS.TXT</strong>.</p><p>A simple <strong>robots.txt</strong> file looks like this:</p><pre style="margin: 10px 0px;">User-agent: *Disallow: /cgi-bin/Disallow: /images/Disallow: /pages/thankyou.html</pre><p>This would block all search engine robots from visiting "cgi-bin" and "images" directories and the page "http://www.yoursite.com/pages/thankyou.html"</p><p><strong>TIPS:</strong></p><ul><li>You need a separate <strong>Disallow</strong> line for every URL prefix you want to exclude</li><li>You may not have blank lines in a record because they are used to delimit multiple records</li><li>Notice that before the <strong>Disallow</strong> command, you have the command: <strong>User-agent: *</strong>. The <strong>User-agent:</strong> part specifies which robot you want to block. Major known crawlers are: Googlebot (Google), Googlebot-Image (Google Image Search), Baiduspider (Baidu), Bingbot (Bing)</li><li>One important thing to know if you are creating your own <strong>robots.txt</strong> file is that although the wildcard (*) is used in the <strong>User-agent</strong> line (meaning "any robot"), it is not allowed in the <strong>Disallow</strong> line.</li><li>Regular expressions are not supported in either the <strong>User-agent</strong> or <strong>Disallow</strong> lines</li></ul><p>Once you have your <strong>robots.txt</strong> file, you can upload it in the top-level directory of your web server. After that, make sure you set the permissions on the file so that visitors (like search engines) can read it.</p></div></div>';

              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            });
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
          var AuditDescription = "";
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

          var microDatabtn =
            '<button type="button" class="btn btn-link modalBtn microDatabtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"><i class="fa fa-caret-right" aria-hidden="true"></i> See all microdata objects</button>';

          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixDataStructure" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          if (SubResponse["structured-data"]["score"] == null) {
            AuditDescription =
              "<small>Congratulations! Your website is using HTML Microdata specifications in order to markup structured data.</small><br>" +
              microDatabtn;
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your webpage doesn't take the advantages of HTML Microdata specifications in order to markup structured data. View Google's guide for getting started with microdata.</small><br>" +
              modal_btnHTF +
              "";
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
              $("#advancedSeoIssuesDetails_passed li ul").append(
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
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_failed li ul").append(
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

          $("#structured-data").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website uses HTML Microdata specifications (or structured data markup). Search engines use microdata to better understand the content of your site and create rich snippets in search results (which helps increase click-through rate to your site)"></i></div><hr />'
          );

          // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

          $("#List-structured-data")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-structured-data").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on("click", ".modalBtn.microDatabtn", function () {
            let seeMicroObject =
              '<ul class="bulleted-list"><li><strong>type: </strong>WebSite</li><li><strong>properties: </strong></li><li style="margin-Left:40px"><strong>name: </strong>' +
              webName +
              '</li><li style="margin-left:40px"><strong>url: </strong>' +
              finalUrl +
              '</li><li style="margin-Left:40px"><strong>potentialAction: </strong>[Type: SearchAction]</li></ul>';
            $("#ModalDataMD").html(seeMicroObject);
            $("#seo_CheckupModalLabelMD").text(
              "Full list of structured data objects"
            );
          });

          $(document).on(
            "click",
            ".modalBtn.HowToFixDataStructure",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>HTML5 Microdata is an easy way to add semantic markup to your web pages. Search engines rely on this markup to improve the display of search results, making it easier for people to find the right web pages.</p><p>Here is a simple example of how to use HTML5 microdata in your contact web page:</p><pre style= {{margin: "10px 0px"}}>&lt;div itemscope itemtype="http://schema.org/Person"&gt;<br>{"   "}&lt;span itemprop="name"&gt;Joe Doe&lt;/span&gt;<br>{"   "}&lt;span itemprop="company"&gt;The Example Company&lt;/span&gt;<br>{"   "}&lt;span itemprop="tel"&gt;604-555-1234&lt;/span&gt;<br>{"   "}&lt;a itemprop="email" href="mailto:joe.doe@example.com"&gt;<br>{"      "}joe.doe@example.com<br>{"   "}&lt;/a&gt;<br>&lt;/div&gt;<br></pre></div></div>';

              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
        }
        // data strcuture end

        // is-crwablw start

        if (SubResponse["is-crawlable"] == "" || SubResponse["is-crawlable"]) {
          let ResponseKey = SubResponse["is-crawlable"];
          let value = "Noindex Tag Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "is-crawlable";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixDataStructure" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          if (SubResponse["is-crawlable"]["score"] == 1) {
            AuditDescription =
              "<small>Your webpage does not use the noindex meta tag. This means that your webpage will be read and indexed by search engines.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your webpage is using index meta tag.</small>";
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
              $("#advancedSeoIssuesDetails_passed li ul").append(
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

              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
              $("#noindex-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to show your site in search results pages"></i></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              advancedSeoWarningScore = advancedSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#noindex-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to show your site in search results pages"></i></div><hr />'
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
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_failed li ul").append(
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

              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#noindex-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  "</p><br>" +
                  modal_btnHTF +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to show your site in search results pages"></i></div><hr />'
              );
            }
          }

          $("#noindex-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to show your site in search results pages"></i></div><hr />'
          );
          $("#List-noindex-tags")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-noindex-tags").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          $(document).on(
            "click",
            ".modalBtn.HowToFixDataStructure",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>HTML5 Microdata is an easy way to add semantic markup to your web pages. Search engines rely on this markup to improve the display of search results, making it easier for people to find the right web pages.</p><p>Here is a simple example of how to use HTML5 microdata in your contact web page:</p><pre style= {{margin: "10px 0px"}}>&lt;div itemscope itemtype="http://schema.org/Person"&gt;<br>{"   "}&lt;span itemprop="name"&gt;Joe Doe&lt;/span&gt;<br>{"   "}&lt;span itemprop="company"&gt;The Example Company&lt;/span&gt;<br>{"   "}&lt;span itemprop="tel"&gt;604-555-1234&lt;/span&gt;<br>{"   "}&lt;a itemprop="email" href="mailto:joe.doe@example.com"&gt;<br>{"      "}joe.doe@example.com<br>{"   "}&lt;/a&gt;<br>&lt;/div&gt;<br></pre></div></div>';
              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
        }
        // is-crawable end
        if (
          SubResponse["crawlable-anchors"] == "" ||
          SubResponse["crawlable-anchors"]
        ) {
          let ResponseKey = SubResponse["crawlable-anchors"];
          let value = "Uncrawlable Tag Tests";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "nofollow-tags";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";

          let modal_btnUncrawlable =
            '<button type="button" class="btn btn-link modalBtn UncrawlableTagsBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixUncrawlableTag" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          var UncrawlableLinksHtml = "";
          if (SubResponse["crawlable-anchors"]["score"] == 1) {
            AuditDescription =
              "Your webpage does not use the uncrawlable tag. This means that search engines will crawl all links from your webpage.</small>";
            ChangedScore = "Info";
          } else {
            AuditDescription =
              "<small>Your webpage is using uncrawlable tags. You are advised to use them carefully since search engines will not crawl all links from your webpage.</small>";
            ChangedScore = "Failed";

            if (ResponseKey["details"]["items"].length > 0) {
              let UncrawledTags = ResponseKey["details"]["items"];
              UncrawlableLinksHtml += "<ul class='UncrawledTagsList CDNList'>";
              for (let [key, value] of Object.entries(UncrawledTags)) {
                let nofollowTag = value["node"]["snippet"];
                UncrawlableLinksHtml +=
                  "<li><xmp>" + nofollowTag + "</xmp></li>";
              }
              UncrawlableLinksHtml += "</ul>";
            }
          }

          $(document).on("click", ".modalBtn.UncrawlableTagsBtn", function () {
            $("#ModalData").html(UncrawlableLinksHtml);

            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text("Full list of uncrawlable tags");
          });

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
              $("#advancedSeoIssuesDetails_passed li ul").append(
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

              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );
              $("#nofollow-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to follow the links on your page. Outgoing links marked with this tag will tell search engines not to follow or crawl that particular link. Google recommends that nofollow tags are used for paid advertisements on your site and links to pages that have not been vetted as trusted sites (e.g., links posted by users of your site)."></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btnUncrawlable +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_failed li ul").append(
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

              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#nofollow-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btnUncrawlable +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the robots meta tag or the X-Robots-Tag HTTP header to instruct search engines not to follow the links on your page. Outgoing links marked with this tag will tell search engines not to follow or crawl that particular link. Google recommends that nofollow tags are used for paid advertisements on your site and links to pages that have not been vetted as trusted sites (e.g., links posted by users of your site)."></i></div><hr />'
              );
            }
          }

          // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

          $("#List-nofollow-tags")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-nofollow-tags").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          $(document).on(
            "click",
            ".modalBtn.HowToFixUncrawlableTag",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>If you want search engines to crawl all the outgoing links on your webpage you must remove the nofollow meta tag and ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered</div></div>';
              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
        }

        if (SubResponse["canonical"] == "" || SubResponse["canonical"]) {
          // advance seo canonical tags test start
          let ResponseKey = SubResponse["canonical"];

          var AuditTitle = "";
          var AuditId = "canonicalTags";
          var advanceSeoDataDescription = "";
          var link = "";

          var CanonicalLink =
            resposnsewebsite_seo_data["output"]["pages"][0]["additional_info"][
              "canonical"
            ];

          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          let SeoDataTitle = "";

          var ChangedScore = "";
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixCanonicalTagTest" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          if (ScoreBracketVar == "Info" && CanonicalLink == undefined) {
            ChangedScore = "Passed";
            link = '<xmp><link href="' + finalUrl + '" rel="canonical"></xmp>';
            SeoDataTitle =
              "<small>Your webpage does not use the canonical link tag.</small>";
          } else if (ScoreBracketVar == "Info" && CanonicalLink !== undefined) {
            ChangedScore = "Passed";
            link = '<xmp><link href="' + finalUrl + '" rel="canonical"></xmp>';
            SeoDataTitle =
              "<small>Your webpage is using the canonical link tag. This tag specifies that the URL: <b>" +
              finalUrl +
              "</b> should be the preferred version of this page. The canonical tag can be useful when there are similar versions of the same content on several URLs (e.g., such as e-commerce sites where URL modifiers like sort parameters are appended to a product pages URL). Please ensure that this specification is correct, as canonical tags are often hard-coded and may not always reflect the latest changes in a sites URL structure.</small><code>" +
              link +
              "</code>";
          } else {
            ChangedScore = "Passed";
            link = '<xmp><link href="' + finalUrl + '" rel="canonical"></xmp>';

            SeoDataTitle =
              "<small>Your webpage is using the canonical link tag. This tag specifies that the URL: <b>" +
              finalUrl +
              "</b> is preferred to be used in search results. Please ensure that this specification is correct, as canonical tags are often hard-coded and may not always reflect the latest changes in a sites URL structure.</small>";
          }

          let value = "Canonical Tag Test";

          var UpdateScoreVar = "";

          var ScoreBracketVar = GetScoreBracket(ChangedScore);

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !== ""){

            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "advancedSeo",
              SeoDataTitle,
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
                  SeoDataTitle +
                  "</p></br><code>" +
                  link +
                  "</code>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_passed li ul").append(
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

              advancedSeoPassedScore = advancedSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                "",
                ChangedScore,
                AuditId
              );

              $("#canonical-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  SeoDataTitle +
                  "</p></br><code>" +
                  link +
                  '</code></div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the canonical link tag. The canonical link tag is used to nominate a primary page when you have several pages with duplicate or very similar content."></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  SeoDataTitle +
                  "</p>" +
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );
              $("#advancedSeoIssuesDetails_failed li ul").append(
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

              advancedSeoFailedScore = advancedSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "advancedSeo",
                SeoDataTitle,
                ChangedScore,
                AuditId
              );
              $("#canonical-tags").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  SeoDataTitle +
                  "</p></br></br>" +
                  modal_btnHTF +
                  '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using the canonical link tag. The canonical link tag is used to nominate a primary page when you have several pages with duplicate or very similar content."></i></div><hr />'
              );
            }
          }

          // FilterAdvanceSeo = advanceSeo.filter(item => !ExcludeAdvanceSeoValues.includes(item));

          $("#List-canonical-tags")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-canonical-tags").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on(
            "click",
            ".modalBtn.HowToFixCanonicalTagTest",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>The Canonical Link Tag can be used when there are several pages with similar content and you want to tell the search engines which page you prefer to use in the search results. If your webpage does not have duplicate content and it has the preferred URL you must remove the canonical link tag.</div></div>';

              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
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
            if (CanonicalTag.includes("www") == false) {
              // includes() method determines whether a string contains specified string.
              URLFix = CanonicalTag.replace("://", "://www.");

              SeoDataTitle =
                "<b>" +
                CanonicalTag +
                "</b> and <br><b>" +
                URLFix +
                "</b> resolve to the same URL.";
            } else {
              SeoDataTitle =
                "Your webpage is using the canonical link tag. This tag specifies that the URL: " +
                CanonicalTag +
                " is preferred to be used in search results. Please ensure that this specification is correct, as canonical tags are often hard-coded and may not always reflect the latest changes in a site's URL structure.";
            }
            CustomScore = 100;
            ChangedScore = "Passed";
          } else {
            if (finalUrl.includes("www") == false) {
              // includes() method determines whether a string contains specified string.
              URLFix = finalUrl.replace("://", "://www.");

              SeoDataTitle =
                "<b>" +
                finalUrl +
                "</b> and <br><b>" +
                URLFix +
                "</b> should resolve to the same URL, but currently do not.";
            } else {
              URLFix = finalUrl.replace("://www.", "://");

              SeoDataTitle =
                "<b>" +
                finalUrl +
                "</b> and <br><b>" +
                URLFix +
                "</b> should resolve to the same URL, but currently do not.";
            }

            CustomScore = 0;
            ChangedScore = "Failed";
            // SeoDataTitle ='<b>'+CanonicalTag+'</b> and <b>'+URLFix+'</b> should resolve to the same URL, but currently do not.';
            // CustomScore = 0;
            // ChangedScore = "Failed"
          }

          let value = "URL Canonicalization Test";

          var UpdateScoreVar = "";

          var ScoreBracketVar = GetScoreBracket(CustomScore);

          let ResponseKey = "";

          if (ScoreBracketVar !== "Info" && ChangedScore == "") {
            // if(ScoreBracketVar == '' && ChangedScore !== ""){

            UpdateScoreVar = UpdateScore(
              ResponseKey,
              "serverAndSecurity",
              SeoDataTitle,
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
                  SeoDataTitle +
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
              $("#url-canonicalization").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  SeoDataTitle +
                  '</p></div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Test your site for potential URL canonicalization issues. Canonicalization describes how a site can use slightly different URLs for the same page (e.g., if http://www.example.com and http://example.com displays the same page but do not resolve to the same URL). If this happens, search engines may be unsure about which URL is the correct one to index. Learn more about canonicalization issues."></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  SeoDataTitle +
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
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                SeoDataTitle,
                ChangedScore,
                AuditId
              );
              $("#url-canonicalization").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  SeoDataTitle +
                  '</p></div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Test your site for potential URL canonicalization issues. Canonicalization describes how a site can use slightly different URLs for the same page (e.g., if http://www.example.com and http://example.com displays the same page but do not resolve to the same URL). If this happens, search engines may be unsure about which URL is the correct one to index. Learn more about canonicalization issues."></i></div><hr />'
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
        var FiltercommonSeoIssue = [];
        var jslaibrariesTable = "";
        if (
          SubResponse["image-aspect-ratio"] == "" ||
          SubResponse["image-aspect-ratio"]
        ) {
          let ResponseKey = SubResponse["image-aspect-ratio"];
          var imgScorCount = "";
          imgScorCount = ResponseKey["details"]["items"].length;

          let value = "Image Aspect Ratio Test";
          var AuditTitle = SubResponse["image-aspect-ratio"]["title"];
          let AuditImages = SubResponse["image-aspect-ratio"]["details"];

          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn RatioImages ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixRatioImages" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          var AuditId = "image-aspect-ratio";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var AuditDescription = "";
          var ChangedScore = "";

          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>All image display dimensions match the natural aspect ratio.</small>";
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Info") {
            AuditDescription =
              "<small>All image display dimensions match the natural aspect ratio.</small>";
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning") {
            AuditDescription =
              "<small>Not all image display dimensions match the natural aspect ratio.</small>";
            ChangedScore = "Failed";
          } else if (ScoreBracketVar == "Failed") {
            AuditDescription =
              "<small>Not all image display dimensions match the natural aspect ratio.</small>";
            ChangedScore = "Failed";
          }

          $("#seoHdg_URL").html("");

          $("#seoHdg_spinner").hide();
          var finalUrll = $("#selectedDomain :selected")
            .text()
            .replace("https://", "")
            .replace("http://", "");
          var finalTxt = finalUrll.charAt(0).toUpperCase() + finalUrll.slice(1);
          $("#seoHdg_URL").html(finalTxt);

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

              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );

              $("#image-aspect-ratio").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all images are displayed with a correct aspect ratio. If a rendered image has an aspect ratio thats significantly different from the aspect ratio in its source file (the natural aspect ratio), the rendered image may look distorted, possibly creating an unpleasant user experience."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#commonSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              $("#image-aspect-ratio").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all images are displayed with a correct aspect ratio. If a rendered image has an aspect ratio thats significantly different from the aspect ratio in its source file (the natural aspect ratio), the rendered image may look distorted, possibly creating an unpleasant user experience."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              $("#image-aspect-ratio").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all images are displayed with a correct aspect ratio. If a rendered image has an aspect ratio thats significantly different from the aspect ratio in its source file (the natural aspect ratio), the rendered image may look distorted, possibly creating an unpleasant user experience."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          var ImgtableItems = "";
          Object.keys(AuditImages).forEach(function (key) {
            tableHeaders = AuditImages["headings"];
            ImgtableItems = AuditImages["items"];
            // console.log(tableItems +  " tableItems  tableHeaders  "+ tableHeaders);
          });
          $("#List-image-aspect-ratio")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-image-aspect-ratio").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)

          // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

          $(document).on("click", ".modalBtn.RatioImages", function () {
            var ImgTable =
              "<table class='table' id='Img_Table'><thead><th>Image</th><th>URL</th><th>Displayed aspect ratio</th><th>Natural aspect ratio</th></thead><tbody></tbody></table>";

            $("#ModalData").html(ImgTable);

            for (const [key, value] of Object.entries(ImgtableItems)) {
              let URL = ImgtableItems[key]["url"];
              let ImgTag =
                '<img src="' +
                URL +
                '" class="thumbnail_img" style="max-width: 50px;max-height: 50px;"/>';
              let displayedAspectRatio =
                ImgtableItems[key]["displayedAspectRatio"];
              let actualSize = ImgtableItems[key]["actualAspectRatio"];
              $("#Img_Table tbody").append(
                "<tr><td class='image-table-cell'>" +
                  ImgTag +
                  "</td><td url-table-cell><a href=" +
                  URL +
                  " target='_blank'>" +
                  URL +
                  "</a></td><td>" +
                  displayedAspectRatio +
                  "</td><td>" +
                  actualSize +
                  "</td></tr>"
              );
            }

            $("#seo_CheckupModalLabel").text(
              "Full list of images with incorrect aspect ratio"
            );
          });

          let HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>There are two common causes for an incorrect image aspect ratio:</p><ul><li>An image is set to explicit width and height values that differ from the source image dimensions.</li><li>An image is set to a width and height as a percentage of a variably-sized container.</li></ul><p>To help avoid these issues, consider using an image CDN, to help automate the process of creating different size versions of your image.</p><p>Also check any CSS that can affects the image aspect ratio - if you are having trouble finding the CSS that is causing the incorrect aspect ratio, Chrome DevTools can show you the CSS declarations that affect a given image.</p><p>Finally, check the images width and height attributes in the HTML. When possible, it is good practice to specify each images width and height attributes in your HTML so that the browser can allocate space for the image. This approach helps to ensure that content below the image does not shift once the image is loaded.</p></div></div>';
          $(document).on("click", ".modalBtn.HowToFixRatioImages", function () {
            $("#ModalDataMD").html(HowToFix);

            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabelMD").text("Image Aspect Ratio Test");
          });
        }
        if (
          SubResponse["errors-in-console"] == "" ||
          SubResponse["errors-in-console"]
        ) {
          let ResponseKey = SubResponse["errors-in-console"];
          let value = "Console Errors Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "errors-in-console";

          var ChangedScore = "";
          var CustomScore = "";
          var UpdateScoreVar = "";
          var consolErrorBtn =
            '<button type="button" class="btn btn-link modalBtn consolErrorBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixConsoleErrors" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          if (ResponseKey["details"]["items"].length == 0) {
            AuditDescription =
              "<small>This webpage doesn't have any warnings or errors caught by the Chrome DevTools Console.</small>";
            ChangedScore = "Passed";
            CustomScore = 100;
          } else {
            AuditDescription =
              "<small>This webpage has some errors caught by the Chrome DevTools Console!</small>";
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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p></div>"
              );

              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
              $("#console-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  consolErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#console-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  consolErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  consolErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#console-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  consolErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            }
          }
          $("#List-console-errors")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-console-errors").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on("click", ".modalBtn.consolErrorBtn", function () {
            var ErrorsInConsole = "";
            if (ResponseKey["details"]["items"].length > 0) {
              var ErrorItems = ResponseKey["details"]["items"];
              ErrorsInConsole +=
                "<h6>Errors (" +
                ErrorItems.length +
                "):</h6><ul class='consoleErrorList CDNList'>";
              for (const [key, value] of Object.entries(ErrorItems)) {
                if (value["sourceLocation"] !== undefined) {
                  ErrorsInConsole +=
                    "<li class='px-2'><a href=" +
                    value["sourceLocation"]["url"] +
                    " target='_blank' class='mb-1'>" +
                    value["sourceLocation"]["url"] +
                    "</a>";
                  ErrorsInConsole +=
                    "<code>" +
                    value["description"] +
                    "</code></li> <div class='border_bottom_modal mb-3'> </div>";
                } else {
                  ErrorsInConsole +=
                    "<li class='px-2><code>" +
                    value["description"] +
                    "</code></li> <div class='border_bottom_modal mb-3'> </div>";
                }
              }
              ErrorsInConsole += "</ul> ";
            }
            $("#ModalData").html(ErrorsInConsole);
            $("#seo_CheckupModalLabel").text("Full list of console messages");
          });
          $(document).on(
            "click",
            ".modalBtn.HowToFixConsoleErrors",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test, you have to fix all the warnings and errors reported in Chrome DevTools console. You can also visit Google documentation for further troubleshooting support: <a href="https://developer.chrome.com/docs/devtools/issues/">https://developer.chrome.com/docs/devtools/issues/</a></p></div></div>';
              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
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

          let value = "JS Error Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "js-errors";

          var ChangedScore = "";
          var CustomScore = "";
          var UpdateScoreVar = "";
          // var RobotsTxt = '<a href="'+finalUrl+'robots.txt" target="_blank">'+finalUrl+'robots.txt</a>'
          var jsErrorBtn =
            '<button type="button" class="btn btn-link modalBtn jsErrorBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixConsoleErrors" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          if (Exception == false) {
            AuditDescription =
              "<small>Congratulations! There are no severe JavaScript errors on your webpage.</small>";
            ChangedScore = "Passed";
            CustomScore = 100;
          } else {
            AuditDescription =
              "<small>We've found JavaScript errors on your webpage!</small>";
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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p></div>"
              );
              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
              $("#js-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  jsErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#js-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  jsErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  jsErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#js-errors").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  jsErrorBtn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  '</div></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check the Chrome DevTools Console for warnings and errors. These errors may prevent users from properly viewing your pages and impact their user experience. Sites with poor user experience tend to rank worse in search engine results"></i></div><hr />'
              );
            }
          }
          // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));
          $("#List-js-errors").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-js-errors").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on("click", ".modalBtn.jsErrorBtn", function () {
            $("#ModalData").html(JsErrorsInConsole);

            $("#seo_CheckupModalLabel").text("Full list of javascript errors");
            $("#JsErrors").text(jsErrorCount);
          });

          $(document).on(
            "click",
            ".modalBtn.HowToFixConsoleErrors",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>If your site has JavaScript errors it might not work properly, which can lead to improper or incomplete loading of content. It is hard to advise how to fix JavaScript errors since there are many different types, but here are some tips:</p><p> - First of all, you have to locate the source of errors;</p><p> - If you are using JS plugins or other third party code, you must carefully read the documentation;</p><p> - Syntax errors (a typo or missing character) are easy to fix;</p></div></div>';
              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text(value);
            }
          );
        }
        // js laibraries start
        if (SubResponse["js-libraries"] == "" || SubResponse["js-libraries"]) {
          var ResponseKey = "";
          var jsDetectedTabel = "";
          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn detectedJslibraries ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          if (SubResponse["js-libraries"]["details"] !== undefined) {
            // modal
            ResponseKey = SubResponse["js-libraries"]["details"]["items"];

            $.each(ResponseKey, function (i, value) {
              jslaibrariesTable +=
                "<tr><td>" +
                value.name +
                "</td><td>" +
                value.version +
                "</td></tr>";
            });
            $(document).on(
              "click",
              ".modalBtn.detectedJslibraries",
              function () {
                jsDetectedTabel =
                  '<table class="table" id="versions"><thead><tr><th>Name</th><th>Version</th></thead><tbody>' +
                  jslaibrariesTable +
                  "</tbody></table>";

                $("#ModalDataMD").html(jsDetectedTabel);
                // $("#ImgTable").append("<tr></tr>")
                $("#seo_CheckupModalLabelMD").text("JavaScript libraries");
              }
            );
          }
          let value = "Detected JavaScript libraries";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "js-libraries";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixConsoleErrors" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          if (ResponseKey.length > 0) {
            AuditDescription =
              "<small>Javascript libraries detected on this page.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>No Javascript libraries detected on this page.</small><br/>";
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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btn === "undefined" ? "" : modal_btn) +
                  "</div>"
              );
              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );
              $("#js-libraries").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  "</p>" +
                  modal_btn +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This audit simply lists all the front-end JavaScript libraries your page uses.Make sure to update any insecure libraries."></i></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p></div>"
              );

              $("#commonSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#js-libraries").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This audit simply lists all the front-end JavaScript libraries your page uses.Make sure to update any insecure libraries."></i></div><hr />'
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p></div>"
              );

              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#js-libraries").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p></div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This audit simply lists all the front-end JavaScript libraries your page uses.Make sure to update any insecure libraries."></i></div><hr />'
              );
            }
          }
          $("#List-js-libraries")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-js-libraries").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          var ErrorsInConsole = "";
        }
        // js laibraies end
        // HTTPS test start

        if (SubResponse["is-on-https"] == "" || SubResponse["is-on-https"]) {
          var ResponseKey = SubResponse["is-on-https"];
          var jsDetectedTabel = "";

          let value = "HTTPS Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "https-encryption";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";

          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Your website is successfully using HTTPS, a secure communication protocol over the Internet.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your website is not using HTTPS, a secure communication protocol over the Internet.</small><br/>";
            ChangedScore = "Failed";
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
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
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
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "serverAndSecurity",
                AuditDescription,
                ChangedScore,
                AuditId
              );
            }
          }

          $("#https-encryption").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is using HTTPS, a secure protocol for sending/receiving data over the Internet. Using HTTPS indicates that an additional encryption/authentication layer was added between client and server. HTTPS should be used by any site that collects sensitive customer data such as credit card information. Even for sites that do not collect such data, switching to https helps users by improving privacy and overall security. Google is increasingly using https as a positive ranking factor."></i></div></div><hr />'
          );

          $("#List-https-encryption")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-https-encryption").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }
        // HTTPS test  end
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

          if (ResponseKey == 0) {
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
  // consol error eND

  var ExcludecommonSeoIssueValues = [];
  var FiltercommonSeoIssue = [];

  for (var [resposnseDatakey, resposnseDatavalue] of Object.entries(
    resposnseMobileData
  )) {
    if (typeof resposnseDatavalue == "object" && resposnseDatavalue !== null) {
      if (
        resposnseDatavalue["audits"] !== undefined &&
        typeof resposnseDatavalue["audits"] == "object"
      ) {
        var SubResponse = resposnseDatavalue["audits"];

        //        $.each(FiltercommonSeoIssue,function(index,value){
        //           $("#commonSeoIssuesDetails").append('<li class="media" id=""><label class="mr-3" >'+value+'</label><div class="media-body"><label></label><p class="Description"></p></div></li><hr />')
        //           $('#commonSeoIssues').append(`<li class="list-item"><a href="#">${value}</a></li>`)
        // })

        if (SubResponse["diagnostics"] == "" || SubResponse["diagnostics"]) {
          let ResponseKey = SubResponse["diagnostics"];
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "diagnostics";
          var ChangedScore = "";
          var mainDocumentTransferSize =
            ResponseKey.details.items[0].mainDocumentTransferSize;
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixHtmlSize" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          mainDocumentTransferSize = bytesToSize(mainDocumentTransferSize);
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);

          DocSize = mainDocumentTransferSize.replace(" KB", "");

          if (DocSize > 33) {
            ChangedScore = "Failed";
            AuditDescription =
              "<small>The size of your webpage's HTML is <b>" +
              mainDocumentTransferSize +
              "</b>, and is greater than the average size of <b>33 Kb</b>. This can lead to slower loading times, lost visitors, and decreased revenue. Good steps to reduce HTML size include: using HTML compression, CSS layouts, external style sheets, and moving javascript to external files.</small>";
          } else {
            AuditDescription =
              "<small>Congratulations! The size of your webpage's HTML is <b>" +
              mainDocumentTransferSize +
              "</b>, and is under the average webpage's HTML size of <b> 33 Kb</b>. Faster loading websites result in a better user experience, higher conversion rates, and generally better search engine rankings.</small>";

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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#html-size").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your pages HTML size. HTML size is the size of all the HTML code on your web page - this size does not include images, external javascripts or external CSS files."></i></div></div><hr />'
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
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
              $("#html-size").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  "</p></br>" +
                  modal_btnHTF +
                  '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your pages HTML size. HTML size is the size of all the HTML code on your web page - this size does not include images, external javascripts or external CSS files."></i></div></div><hr />'
              );
            }
          }

          $(document).on("click", ".modalBtn.HowToFixHtmlSize", function () {
            let HowToFix =
              '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to resolve this problem you are advised to:</p><ul><li>use gzip compression</li><li>move all CSS style rules into a single, external and minified CSS file</li><li>minify all JS files and, if possible, try combining them into a single external JS file</li><li>use CSS layouts</li></ul></div></div>';

            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabelMD").text("HTML Page Size Test");
          });

          $("#List-html-size").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-html-size").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }
        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let ResponseKey = SubResponse["network-requests"];

          var AuditTitle = "";
          var AuditId = "Html_compression";
          var AuditDescription = "";
          var resourceSize = "";
          var transferSize = "";
          var getFinalUrl = "";
          var resourceSize = "";
          // console.log('finalUrl',finalUrl)
          getFinalUrl = ResponseKey.details.items;
          $.each(getFinalUrl, function (i, val) {
            if (val.url === finalUrl) {
              resourceSize = val.resourceSize;
              transferSize = val.transferSize;
              return false;
            }
          });

          //    if(proto.includes('h2')){
          //      resourceSize = ResponseKey.details.items[0].resourceSize;
          //      transferSize = ResponseKey.details.items[0].transferSize;
          //    }else{
          //      resourceSize = ResponseKey.details.items[1].resourceSize;
          //      transferSize = ResponseKey.details.items[1].transferSize;
          //    }

          resourceSize = formatBytes(resourceSize);
          transferSize = formatBytes(transferSize);
          var CompressionCheck = responseContentEncoding;

          let RS = resourceSize.replace(" KB", "").replace("Bytes", "");
          let TS = transferSize.replace(" KB", "").replace("Bytes", "");
          var ChangedScore = "";
          var UpdateScoreVar = "";
          var CustomScore = "";
          var percentage = "";

          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixHtmlCompression" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          if (
            CompressionCheck !== "" ||
            CompressionCheck !== null ||
            CompressionCheck !== undefined
          ) {
            percentage = 100 - ((TS / RS) * 100).toFixed(2);
            AuditDescription =
              "<small>Congratulations! Your webpage is successfully compressed using <b>" +
              CompressionCheck +
              " compression</b> on your code. Your HTML is compressed from <b>" +
              resourceSize +
              "</b> to <b>" +
              transferSize +
              "</b> (<b>" +
              percentage.toFixed(0) +
              "%</b> size savings). This helps ensure a faster loading webpage and improved user experience.</small>";
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
          // if (percentage > 89) {
          //     AuditDescription = '<small>Congratulations! Your webpage is successfully compressed using gzip compression on your code. Your HTML is compressed from <b>' + resourceSize + '</b> to <b>' + transferSize + '</b> (<b>' + percentage + '%</b> size savings). This helps ensure a faster loading webpage and improved user experience.</small>';
          //     ChangedScore = 'Passed'
          //     CustomScore = 100;
          // } else if (percentage <= 89 && percentage > 49) {
          //     AuditDescription = '<small>Your webpage is compressed using gzip compression on your code. Your HTML is compressed from <b>' + resourceSize + '</b> to <b>' + transferSize + '</b> (<b>' + percentage + '%</b> size savings). This helps ensure a faster loading webpage and improved user experience.</small>';
          //     ChangedScore = 'Warning'
          //     CustomScore = 50;
          // } else if (percentage <= 49) {
          //     AuditDescription = '<small>Your webpage does not use any HTML compression! You should compress your HTML to reduce your page size and page loading times - this will help your site retain visitors and increase page views. If you were using compression, you could be compressing your HTML size by ' + percentage + '% - from ' + resourceSize + ' to ' + transferSize + ' .</small>';
          //     ChangedScore = 'Failed'
          //     CustomScore = 0;
          // }
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_warning li ul").html("")
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
            // else if (UpdateScoreVar === '') {
            //     UpdateScoreVar = 'Failed'
            //     AuditDescription = 'Your webpage doesnt use any HTML compression! You should compress your HTML to reduce your page size and page loading times - this will help your site retain visitors and increase page views. If you were using compression, you could be compressing your HTML size by 10% - from 0.06 Kb to 0.05 Kb .<br/><br/>' + modal_btnHTF + ''
            //     $("#html-compression").html('<div class="media ' + UpdateScoreVar + '" id="issue-' + AuditId + '"><label class="mr-3" >' + value + '</label><div class="media-body"><p class="Description">' + AuditDescription + '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is using HTML compression. HTML compression plays an important role in improving website speed by finding similar strings within a text file and replacing them temporarily to reduce overall file size."></i></div></div><hr />')

            // }

            $("#html-compression").html(
              '<div class="media ' +
                UpdateScoreVar +
                '" id="issue-' +
                AuditId +
                '"><label class="mr-3" >' +
                value +
                '</label><div class="media-body"><p class="Description">' +
                AuditDescription +
                '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is using HTML compression. HTML compression plays an important role in improving website speed by finding similar strings within a text file and replacing them temporarily to reduce overall file size."></i></div></div><hr />'
            );

            $("#List-html-compression")
              .removeClass("Failed")
              .addClass(UpdateScoreVar);
            $("#List-html-compression").html(
              `<a href="#issue-` + AuditId + `">${value}</a>`
            );
          }

          $(document).on(
            "click",
            ".modalBtn.HowToFixHtmlCompression",
            function () {
              let HowToFix =
                '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>Your two options for file compression are <strong>Deflate</strong> and <strong>GZIP</strong>.</p><ul><li>Deflate is an option which comes automatically with the Apache server and which is simple to set up.</li><li>GZIP on the other hand needs to be installed and requires a bit more work to install. However, GZIP does achieve a higher compression rate and therefore might be a better choice if your website uses pages which have a lot of images or large file sizes.</li></ul><p>Setting up file compression for your website will depend on which type of server youre using for your website. Most likely, youll be using Apache, which means you can enable compression by adding a few deflate codes to your <strong>.htaccess</strong> file.</p><code style= {{margin: "10px 0px"}}># compress text, html, javascript, css, xml:<br/>AddOutputFilterByType DEFLATE text/plain<br/>AddOutputFilterByType DEFLATE text/html<br/>AddOutputFilterByType DEFLATE text/xml<br/>AddOutputFilterByType DEFLATE text/css<br/>AddOutputFilterByType DEFLATE application/xml<br/>AddOutputFilterByType DEFLATE application/xhtml+xml<br/>AddOutputFilterByType DEFLATE application/rss+xml<br/>AddOutputFilterByType DEFLATE application/javascript<br/>AddOutputFilterByType DEFLATE application/x-javascript<br/></code><p>For more advanced information regarding deflate you can check this Apache <a href="http://httpd.apache.org/docs/current/mod/mod_deflate.html" target="_blank">documentation</a>.</p></div></div>';

              $("#ModalDataMD").html(HowToFix);
              $("#seo_CheckupModalLabelMD").text("HTML Compression/GZIP Test");
            }
          );
        }

        if (
          SubResponse["network-requests"]["details"]["items"] == "" ||
          SubResponse["network-requests"]["details"]["items"]
        ) {
          //   let DocTypeResponse =
          //     SubResponse["network-requests"]["details"]["items"][0]["mimeType"];
          var AuditTitle = "";
          var AuditId = "Doctype";
          var AuditDescription = "";
          let ResponseKey = "";
          var SeoDataTitle = "";

          var ChangedScore = "";
          var DocType = "<code>&lt;!DOCTYPE html&gt;</code>";
          var DocTypeResponse = "";
          DocTypeResponse = SubResponse["network-requests"]["details"]["items"];
          $.each(DocTypeResponse, function (index, value) {
            // console.log('DocTypeResponse',value.url)
            // if (SubResponse["network-requests"]['details']['items'][0]['resourceType'] == 'Document' && SubResponse["network-requests"]['details']['items'][0]['mimeType'] == "text/html")
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
          //   if (
          //     SubResponse["network-requests"]["details"]["items"][0][
          //       "resourceType"
          //     ] == "Document" &&
          //     SubResponse["network-requests"]["details"]["items"][0][
          //       "mimeType"
          //     ] == "text/html"
          //   ) {
          //     AuditDescription =
          //       "Congratulations! Your website has a doctype declaration:";
          //     CustomScore = 100;
          //     ChangedScore = "Passed";
          //     DocType = "<code>&lt;!DOCTYPE html&gt;</code>";
          //   } else {
          //     AuditDescription =
          //       "The doctype declaration is missing from your page!";
          //     CustomScore = 0;
          //     ChangedScore = "Failed";
          //   }

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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof DocType === "undefined" ? "" : DocType) +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof DocType === "undefined" ? "" : DocType) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_warning li ul").html("")
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof DocType === "undefined" ? "" : DocType) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

          $("#doctype").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              "</p>" +
              DocType +
              '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check for doctype declaration. A document type declaration, or DOCTYPE, defines which version of (X)HTML your webpage is using. Proper doctype declaration assists with proper page rendering and functioning of web documents in compliant browsers."></i></div></div><hr />'
          );

          $("#List-doctype").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-doctype").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }

        if (SubResponse["speed-index"] == "" || SubResponse["speed-index"]) {
          var LoadingSpeed = SubResponse["speed-index"]["displayValue"];
          // alert(displayValue)
          let ResponseKey = SubResponse["speed-index"];
          let value = "Site Loading Speed Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "speed-index";
          Speed = LoadingSpeed.replace("s", "");
          Speed = Number(Speed);
          var UpdateScoreVar = "";
          var ChangedScore = "";

          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          if (Speed < 5) {
            AuditDescription = `<small>Your website loading time is around <b>${LoadingSpeed}</b> seconds and this is under the average loading speed which is <b> 5 seconds</b>.</small>`;
            ChangedScore = "Passed";
          } else if ((Speed = 5)) {
            AuditDescription = `<small>Your website loading time is around <b>${LoadingSpeed}</b> seconds and this is the average loading speed which is <b> 5 seconds</b>.</small>`;
            ChangedScore = "Warning";
          } else if (Speed > 5) {
            AuditDescription = `<small>Your website loading time is around <b>${LoadingSpeed}</b> seconds and this is above the average loading speed which is <b> 5 seconds</b>.</small>`;
            ChangedScore = "Failed";
          }

          // var ScoreBracketVar = GetScoreBracket(ResponseKey['score']);

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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_warning li ul").html("")
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

          $("#loading-speed").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check your websites loading speed. Page speed is an important factors in search engine rankings and overall site success. Pages that take longer than 5 seconds to load can lose up to 50% of users. Faster webpages result in higher traffic, better conversions and increased sales over slower loading pages."></i></div></div><hr />'
          );

          $("#List-loading-speed")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-loading-speed").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }
        // /====
        if (SubResponse["redirects"] == "" || SubResponse["redirects"]) {
          let ResponseKey = SubResponse["redirects"];
          let value = "URL Redirects Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "redirects";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (SubResponse["redirects"]["details"]["items"].length == 0) {
            AuditDescription =
              "<small>Congratulations! Your URL doesn't have any redirects (which could potentially cause site indexation issues and site loading delays).</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your URL have some redirects (which could potentially cause site indexation issues and site loading delays).</small>";
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnBrokenLinks === "undefined"
                    ? ""
                    : modal_btnBrokenLinks) +
                  "</div>"
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

          $("#http-redirects").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check how many redirects your URL will perform to resolve to the final destination URL. Redirects often cause search engine indexing issues and can also lead to some minor loading delays. Google recommends removing or keeping redirects to a minimum."></i></div></div><hr />'
          );

          $("#List-http-redirects")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-http-redirects").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
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
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "unminified-css";
          var UpdateScoreVar = "";
          var ChangedScore = "";
          let CustomScore = "";
          var UnminifiedCssModalBtn =
            '<button type="button" class="btn btn-link modalBtn UnminifiedCssModal ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

          var unminifiedCss = ResponseKey["details"]["items"];
          if (unminifiedCss.length > 0) {
            AuditDescription =
              "<small>Your webpage's CSS resources are not minified.</small>";
            ChangedScore = "Failed";
            CustomScore = 0;
          } else {
            AuditDescription =
              "<small>Congratulations! Your webpage's CSS resources are minified.</small>";
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
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );

              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              $("#css-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any CSS files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof UnminifiedCssModalBtn === "undefined"
                    ? ""
                    : UnminifiedCssModalBtn) +
                  "</div>"
              );
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              //$("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              $("#css-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  UnminifiedCssModalBtn +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any CSS files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
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
                  (typeof UnminifiedCssModalBtn === "undefined"
                    ? ""
                    : UnminifiedCssModalBtn) +
                  "</div>"
              );
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              // $("#speedOptimizaionIssuesDetails_failed li ul").html("")
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              $("#css-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  UnminifiedCssModalBtn +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any CSS files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
              );
            }
          }

          //    var UpdateScoreVar = UpdateScore(ResponseKey,'speedOptimizationScoreFailedValue','speedOptimizationScoreWarningValue','speedOptimizationScorePassedValue','speedOptimizationScoreInfoValue',AuditDescription,'',AuditId)

          $("#List-css-minification")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-css-minification").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          // Minified CSS files from same domain:
          var UnminifiedCssList = "<ul class='UnminifiedCssList CDNList'></ul>";
          var UnminifiedCssListThirdParty =
            "<ul class='UnminifiedCssListThirdParty CDNList' ></ul>";
          var MinifiedCssList = "<ul class='MinifiedCssList CDNList'></ul>";
          var MinifiedCssListThirdParty =
            "<ul class='MinifiedCssListThirdParty CDNList'></ul>";
          $(document).on("click", ".modalBtn.UnminifiedCssModal", function () {
            $("#ModalData").html("");

            $("#ModalData").append(
              UnminifiedCssList +
                UnminifiedCssListThirdParty +
                MinifiedCssList +
                MinifiedCssListThirdParty
            );

            let domain = new URL(finalUrl);
            domain = domain.hostname.replace("www.", "");
            $("#ModalData").append();
            var AddedURLs = [];
            Object.keys(unminifiedCss).forEach((key) => {
              let URL = unminifiedCss[key]["url"];

              // console.log(domain + "   domaindomaindomaindomain")
              if (URL.includes(domain)) {
                $(".UnminifiedCssList").append(
                  "<li class='mb-2 px-1 pt-1'><a href='" +
                    URL +
                    "' class='link-primary' target='_blank'>" +
                    URL +
                    "</a></li> <div class='border_bottom_modal mb-2'> </div> "
                );
                if (AddedURLs.indexOf(URL) === -1) AddedURLs.push(URL);
              } else if (!URL.includes(domain)) {
                if (AddedURLs.indexOf(URL) === -1) AddedURLs.push(URL);
                $(".UnminifiedCssListThirdParty").append(
                  "<li class='mb-2 px-1 pt-1'><a href='" +
                    URL +
                    "' class='link-primary' target='_blank'>" +
                    URL +
                    "</a></li> <div class='border_bottom_modal mb-2'> </div> "
                );
              }
            });
            Object.keys(RemainingCss).forEach((key) => {
              // console.log(domain + "   domaindomaindomaindomain")
              if (RemainingCss[key]["url"].includes(".css")) {
                let URL = RemainingCss[key]["url"];
                if (URL.includes(domain) && AddedURLs.indexOf(URL) === -1) {
                  $(".MinifiedCssList").append(
                    "<li class='mb-2 px-1 pt-1'><a href='" +
                      URL +
                      "' class='link-primary' target='_blank'>" +
                      URL +
                      "</a></li>  <div class='border_bottom_modal mb-2'> </div>"
                  );
                } else if (
                  !URL.includes(domain) &&
                  AddedURLs.indexOf(URL) === -1
                ) {
                  $(".MinifiedCssListThirdParty").append(
                    "<li class='mb-2 px-1 pt-1'><a href='" +
                      URL +
                      "' class='link-primary' target='_blank'>" +
                      URL +
                      "</a></li> <div class='border_bottom_modal mb-2'> </div> "
                  );
                }
              }
            });
            //   && ((CssItems[key]['url'].includes(".css")) || (CssItems[key]['url'].includes("=css")))
            // console.log($('.UnminifiedCssList').children('li').length + "   UnminifiedCssList");
            if ($(".UnminifiedCssList").length > 0) {
              $("#ModalData > .UnminifiedCssList").before(
                "<h5>UnminifiedCssList</h5>"
              );
            }

            //    console.log($('.UnminifiedCssListThirdParty').children('li').length + " UnminifiedCssListThirdParty ");
            if ($(".UnminifiedCssListThirdParty li").length > 0) {
              $("#ModalData > .UnminifiedCssListThirdParty").before(
                "<h5>UnminifiedCssListThirdParty</h5>"
              );
            }

            //   console.log($('.MinifiedCssList').children('li').length + "  MinifiedCssList ");
            if ($(".MinifiedCssList li").length > 0) {
              $("#ModalData > .MinifiedCssList").before(
                "<h5>MinifiedCssList</h5>"
              );
            }

            //    console.log($('.MinifiedCssListThirdParty').children('li').length + "   MinifiedCssListThirdParty");
            if ($(".MinifiedCssListThirdParty li").length > 0) {
              $("#ModalData > .MinifiedCssListThirdParty").before(
                "<h5>MinifiedCssListThirdParty</h5>"
              );
            }
            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text(
              "Full list of Unminified CSS files"
            );
          });
        }
        // ================
        if (
          SubResponse["unminified-javascript"] == "" ||
          SubResponse["unminified-javascript"]
        ) {
          let ResponseKey = SubResponse["unminified-javascript"];
          let value = "JavaScript Minification Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "unminified-javascript";
          var UpdateScoreVar = "";
          var ChangedScore = "";

          let CustomScore = "";
          var UnminifiedJsModalBtn =
            '<button type="button" class="btn btn-link modalBtn UnminifiedJsModal ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';

          var unminifiedJs = ResponseKey["details"]["items"];
          if (unminifiedJs.length > 0) {
            AuditDescription =
              "<small>Your website's JavaScript files are not minified!</small>";
            ChangedScore = "Failed";
            CustomScore = 0;
          } else {
            AuditDescription =
              "<small>Congratulations! Your website's JavaScript files are minified!</small>";
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
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );

              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              $("#js-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any external javascript files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof UnminifiedJsModalBtn === "undefined"
                    ? ""
                    : UnminifiedJsModalBtn) +
                  "</div>"
              );
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                "",
                ChangedScore,
                AuditId
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              //$("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              $("#js-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  UnminifiedJsModalBtn +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any external javascript files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
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
                  (typeof UnminifiedJsModalBtn === "undefined"
                    ? ""
                    : UnminifiedJsModalBtn) +
                  "</div>"
              );
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "speedOptimization",
                AuditDescription,
                ChangedScore,
                AuditId
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              $("#js-minification").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  UnminifiedJsModalBtn +
                  '</div><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if any external javascript files used in your page is minified. Minified files reduce page size and overall load time."></i></div></div><hr />'
              );
            }
          }

          $("#List-js-minification")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-js-minification").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          var UnminifiedjsList = "<ul class='UnminifiedjsList CDNList'></ul>";
          $(document).on("click", ".modalBtn.UnminifiedJsModal", function () {
            $("#ModalData").html(UnminifiedjsList);

            Object.keys(unminifiedJs).forEach((key) => {
              var URL = unminifiedJs[key]["url"];

              $(".UnminifiedjsList").append(
                "<li><a href='" +
                  URL +
                  "' class='link-primary' target='_blank'>" +
                  URL +
                  "</a></li>"
              );
            });

            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text(
              "Full list of Unminified Javascript files"
            );
          });
        }
        // ===================
        // ================
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          let value = "Page Cache Test (Server Side Caching)";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "uses-long-cache-ttl";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var ChangedScore = "";
          var UpdateScoreVar = "";

          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixPageCache" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Congratulations! you have a caching mechanism on your website. Caching helps speed page loading times as well as reduces server load.</small>";
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning") {
            AuditDescription =
              "<small>You have a caching mechanism on your website. Caching helps speed page loading times as well as reduces server load.</small>";
            ChangedScore = "Warning";
          } else if (ScoreBracketVar == "Failed") {
            AuditDescription =
              "<small>It does not appear that you are caching your pages. Cached pages serve up static html and avoid potentially time consuming queries to your database. It also helps lower server load by up to 80%. Caching most visibly benefits high traffic pages that access a database, but whose content does not change on every page view. Common caching methods include Alternative PHP Cache, Quickcache, and WP Super Cache (for Wordpress sites). Caching mechanisms also typically compress HTML, further reducing page size and load time.</small>";
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#page-cache").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page is serving cached pages. A page cache saves dynamically generated pages and serves the pre-generated (cached) page to reduce server load and site loading time (by avoiding the re-loading and execution of PHP scripts). Common caching methods are ZenCache and WP Rocket."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#page-cache").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page is serving cached pages. A page cache saves dynamically generated pages and serves the pre-generated (cached) page to reduce server load and site loading time (by avoiding the re-loading and execution of PHP scripts). Common caching methods are ZenCache and WP Rocket."></i><div class="Details">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
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
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
              $("#page-cache").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your page is serving cached pages. A page cache saves dynamically generated pages and serves the pre-generated (cached) page to reduce server load and site loading time (by avoiding the re-loading and execution of PHP scripts). Common caching methods are ZenCache and WP Rocket."></i><div class="Details">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          $("#List-page-cache").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-page-cache").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          $(document).on("click", ".modalBtn.HowToFixPageCache", function () {
            let HowToFix =
              '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you are advised to use a caching mechanism for your pages. There are three methods which can be used to caching your web pages:</p><ol style="margin-top: 10px;"><li><strong>Alternative PHP caching</strong><p>- <a href="http://us.php.net/apc" target="_blank">Alternative PHP Cache</a> (APC) is an open source framework which caches data using intermediate PHP code. Most web programmers who are familiar with the PHP programming language can easily set up Alternative PHP Cache for your site.</p></li><li><strong>Quickcache</strong><p>- <a href="http://sourceforge.net/projects/quickcache/" target="_blank">Quickcache</a> is a lightweight page caching solution which was formerly known as <a href="http://www.polarlava.com/projects/jpcache/" target="_blank">jpcache</a>. Quickcache caches the page output rather than compiling the PHP page, making it a superior version of page caching to the Alternative PHP caching. Quickcache can be quickly downloaded from their website and can reduce your page load time up to 80%.</p></li><li><strong>WP Super Cache</strong><p>- If you have a Wordpress website, <a href="http://wordpress.org/plugins/wp-super-cache/" target="_blank">WP Super Cache</a> can be installed within seconds and without no programming knowledge.</p></li></ol></div></div>';
            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabelMD").text(value);
          });
        }

        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          let value = "Image Caching Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "image-cache-ttl";
          var CustomScore = "";
          var ImageItems = ResponseKey["details"]["items"];
          let ImagesArray = [];

          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn ImageCacheModal ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixImageCache" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          let domain = new URL(finalUrl);
          domain = domain.hostname.replace("www.", "");
          // console.log(domain + "   domain");

          Object.keys(ImageItems).forEach(function (key) {
            // if (ImageItems[key]['cacheLifetimeMs'] == 0 && isValidImageURL(ImageItems[key]['url']) ){
            if (isValidImageURL(ImageItems[key]["url"])) {
              if (
                ImageItems[key]["cacheLifetimeMs"] == 0 &&
                isValidImageURL(ImageItems[key]["url"]) &&
                ImageItems[key]["url"].includes(domain)
              ) {
                let img = ImageItems[key]["url"];

                if (!ImagesArray.includes(img)) {
                  ImagesArray.push(img);
                }
              }
            } else {
              if (
                ImageItems[key]["cacheLifetimeMs"] == 0 &&
                ImageItems[key]["url"].includes(domain)
              ) {
                if (
                  ImageItems[key]["url"].includes(
                    ".svg" |
                      ".jpg" |
                      ".jpeg" |
                      ".gif" |
                      ".png" |
                      ".tiff" |
                      ".bmp"
                  )
                ) {
                  ImagesArray.push(ImageItems[key]["url"]);
                }
              }
            }
          });

          if (ImagesArray.length !== 0) {
            CustomScore = 0;
          } else {
            CustomScore = 100;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Congratulations! Your website is using cache headers for your images and the browsers will display these images from the cache.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your website is not using cache headers for your images. Setting cache headers can help speed up the serving of your webpages for users that regularly visit your site and see the same images.</small>";
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#image-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using an image expires tag, which specifies a future expiration date for your images. Users browsers will see this tag and cache the image in their browser until the specified date (so that it does not keep re-fetching the unchanged image from your server). This speeds up your site the next time returning visitors arrive at your site and require the same image."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  "</p>" +
                  modal_btn +
                  '<div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#image-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using an image expires tag, which specifies a future expiration date for your images. Users browsers will see this tag and cache the image in their browser until the specified date (so that it does not keep re-fetching the unchanged image from your server). This speeds up your site the next time returning visitors arrive at your site and require the same image."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
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
                  modal_btn +
                  '<div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
              $("#image-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using an image expires tag, which specifies a future expiration date for your images. Users browsers will see this tag and cache the image in their browser until the specified date (so that it does not keep re-fetching the unchanged image from your server). This speeds up your site the next time returning visitors arrive at your site and require the same image."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          $("#List-image-caching")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-image-caching").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          var UnchachedImageList =
            "<ul class='UnchachedImageList CDNList'></ul>";
          $(document).on("click", ".modalBtn.ImageCacheModal", function () {
            $("#ModalData").html(UnchachedImageList);
            for (var i = 0; i < ImagesArray.length; i++) {
              var URL = ImagesArray[i];

              $(".UnchachedImageList").append(
                "<li><a href='" +
                  URL +
                  "' class='link-primary' target='_blank'>" +
                  URL +
                  "</a></li>"
              );
            }
            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text("Full list of uncached images");
          });
          $(document).on("click", ".modalBtn.HowToFixImageCache", function () {
            let HowToFix =
              '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>In order to reduce the number of HTTP requests, you can use the HTTP Expires header to set an expiration time for your images or any other content type.You can add the following lines into your <strong>.htaccess</strong> file:<pre style="margin: 10px 0px;">&lt;If Module mod_expires.c&gt;Expires Active on ExpiresByType image/jpg "access plus 1 month" ExpiresByType image/jpeg "access plus 1 month" ExpiresByType image/gif "access plus 1 month" ExpiresByType image/png "access plus 1 month" &lt;/IfModule&gt; </pre></div></div>';
            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabelMD").text(value);
          });
        }

        // image cache end
        // js cache start
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          let value = "JavaScript Caching Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "js-cache-ttl";
          var CustomScore = "";
          var JsItems = ResponseKey["details"]["items"];
          let JsArray = [];

          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn JsCacheModal ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixJsCache" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          let domain = new URL(finalUrl);
          domain = domain.hostname.replace("www.", "");
          // console.log(domain + "   domain");
          Object.keys(JsItems).forEach(function (key) {
            if (
              JsItems[key]["cacheLifetimeMs"] == 0 &&
              JsItems[key]["url"].includes(".js") &&
              JsItems[key]["url"].includes(domain)
            ) {
              // if (getFileExtension(JsItems[key]['url']) == 'js' || JsItems[key]['url'].includes(".js?")){
              // if(JsItems[key]['url'].includes(".js?")){
              //     console.log(JsItems[key]['url'] + "   Js file")
              // }
              let js = JsItems[key]["url"];

              if (!JsArray.includes(js)) {
                JsArray.push(js);
              }
            } else {
            }
          });

          if (JsArray.length !== 0) {
            CustomScore = 0;
          } else {
            CustomScore = 100;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Congratulations! Your website is using cache headers for all JavaScript resources.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your website is not using cache headers for your JavaScript resources. Setting cache headers can help speed up the serving of your webpages for users that regularly visit your site.</small>";
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#js-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all JavaScript resources. Users browsers will check for these headers and, if any, will cache the JavaScript resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same JavaScript resource."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );
              //  $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#js-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all JavaScript resources. Users browsers will check for these headers and, if any, will cache the JavaScript resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same JavaScript resource."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
              $("#js-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all JavaScript resources. Users browsers will check for these headers and, if any, will cache the JavaScript resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same JavaScript resource."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          $("#List-js-caching").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-js-caching").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          var UnchachedJsList = "<ul class='UnchachedJsList CDNList'></ul>";
          $(document).on("click", ".modalBtn.JsCacheModal", function () {
            $("#ModalData").html(UnchachedJsList);
            for (var i = 0; i < JsArray.length; i++) {
              var URL = JsArray[i];

              $(".UnchachedJsList").append(
                "<li><a href='" +
                  URL +
                  "' class='link-primary' target='_blank'>" +
                  URL +
                  "</a></li>"
              );
            }
            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text(
              "Full list of uncached JavaScript resources"
            );
          });
          $(document).on("click", ".modalBtn.HowToFixJsCache", function () {
            let HowToFix =
              '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>In order to reduce the number of HTTP requests, you can use the HTTP Expires header to set an expiration time for your JavaScript resources or any other content type.You can add the following lines into your <strong>.htaccess</strong> file: <pre style="margin: 10px 0px;">&lt;IfModule mod_expires.c&gt; ExpiresActive on ExpiresByType text/javascript "access plus 1 month" ExpiresByType application/javascript "access plus 1 month" &lt;/IfModule&gt; </pre></div></div>';
            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabelMD").text(value);
          });
        }

        // js cache end
        // css cache start
        if (
          SubResponse["uses-long-cache-ttl"] == "" ||
          SubResponse["uses-long-cache-ttl"]
        ) {
          let ResponseKey = SubResponse["uses-long-cache-ttl"];

          let value = "CSS Caching Test";
          var AuditDescription = "";
          var AuditTitle = "";
          var AuditId = "css-cache-ttl";
          var CustomScore = "";
          var CssItems = ResponseKey["details"]["items"];
          let CssArray = [];

          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn CssCacheModal ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixCssCache" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
          let domain = new URL(finalUrl);
          domain = domain.hostname.replace("www.", "");

          Object.keys(CssItems).forEach(function (key) {
            // if (CssItems[key]['cacheLifetimeMs'] == 0 && getFileExtension(CssItems[key]['url']) == 'css' ){
            if (
              CssItems[key]["cacheLifetimeMs"] == 0 &&
              CssItems[key]["url"].includes(domain) &&
              (CssItems[key]["url"].includes(".css") ||
                CssItems[key]["url"].includes("=css"))
            ) {
              let css = CssItems[key]["url"];

              if (!CssArray.includes(css)) {
                CssArray.push(css);
              }
            }
          });

          if (CssArray.length !== 0) {
            CustomScore = 0;
          } else {
            CustomScore = 100;
          }

          var ScoreBracketVar = GetScoreBracket(CustomScore);
          var ChangedScore = "";
          var UpdateScoreVar = "";
          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Congratulations! Your website is using cache headers for all Css resources.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>Your website is not using cache headers for your Css resources. Setting cache headers can help speed up the serving of your webpages for users that regularly visit your site.</small>";
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
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
              $("#css-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all JavaScript resources. Users browsers will check for these headers and, if any, will cache the Css resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same Css resource."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              //  $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

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
              $("#css-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all CSS resources. Users browsers will check for these headers and, if any, will cache the CSS resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same CSS resource."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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
              $("#css-caching").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Checks if your page is using caching headers for all CSS resources. Users browsers will check for these headers and, if any, will cache the CSS resources until the specified date (so that it does not keep re-fetching the unchanged file from your server). This speeds up your site the next time returning visitors arrive at your site and require the same CSS resource."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          $("#List-css-caching").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-css-caching").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          var UnchachedCssList = "<ul class='UnchachedCssList CDNList'></ul>";
          $(document).on("click", ".modalBtn.CssCacheModal", function () {
            $("#ModalData").html(UnchachedCssList);
            for (var i = 0; i < CssArray.length; i++) {
              var URL = CssArray[i];

              $(".UnchachedCssList").append(
                "<li><a href='" +
                  URL +
                  "' class='link-primary' target='_blank'>" +
                  URL +
                  "</a></li>"
              );
            }
            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text(
              "Full list of uncached Css resources"
            );
          });
          $(document).on("click", ".modalBtn.HowToFixCssCache", function () {
            let HowToFix =
              '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div>In order to reduce the number of HTTP requests, you can use the HTTP Expires header to set an expiration time for your CSS resources or any other content type.You can add the following lines into your <strong>.htaccess</strong> file:<pre style="margin: 10px 0px;">&lt;IfModule mod_expires.c&gt;ExpiresActive on ExpiresByType text/css "access plus 1 month" &lt;/IfModule&gt; </pre></div></div>';
            $("#ModalDataMD").html(HowToFix);
            $("#seo_CheckupModalLabelMD").text(value);
          });
        }

        if (
          SubResponse["uses-responsive-images"] == "" ||
          SubResponse["uses-responsive-images"]
        ) {
          let ResponseKey = SubResponse["uses-responsive-images"];
          var scorCount = "";
          scorCount = ResponseKey["details"]["items"].length;

          let value = "Responsive Image Test";
          var AuditTitle = SubResponse["uses-responsive-images"]["title"];
          let AuditImages = SubResponse["uses-responsive-images"]["details"];

          let modal_btn =
            '<button type="button" class="btn btn-link modalBtn ResponsiveImages ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixResponsiveImages" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          var AuditId = "uses-responsive-images";
          var ScoreBracketVar = GetScoreBracket(ResponseKey["score"]);
          var AuditDescription = "";
          var ChangedScore = "";

          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>All images in this page are properly sized for different users' viewports.</small>";
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Info" && scorCount == 0) {
            AuditDescription =
              "<small>All images in this page are properly sized for different users' viewports</small>";
            ChangedScore = "Passed";
          } else if (ScoreBracketVar == "Warning" && scorCount > 0) {
            AuditDescription =
              "<small>Not all images in this page are properly sized! You are serving images that are larger than needed for the size of the user's viewport.</small>";
            ChangedScore = "Warning";
          } else if (ScoreBracketVar == "Failed" && scorCount > 0) {
            AuditDescription =
              "<small>Not all images in this page are properly sized! You are serving images that are larger than needed for the size of the user's viewport.</small>";
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

              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );

              $("#image-size").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all of your pages images are appropriately sized for your users viewport. Ideally, your page should not serve images that are larger than the version thats rendered on the users screen. Serving an image larger than the users viewport results in scaling down the image, use of unnecessary bandwidth, and slower page load time."></i></div></div><hr />'
              );
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              // $("#allIssuesDetails_warning li ul").html("")
              $("#allIssuesDetails_warning li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-yellow" data-category-type="error" data-category-name="error" rel="audit_' +
                  AuditId +
                  '"><span class="text-yellow">' +
                  value +
                  '</span><span class="text-yellow font-14"><i class="fa-solid fa-circle"></i></span></li>'
              );

              commonSeoWarningScore = commonSeoWarningScore + 1;
              generalWarningScore = generalWarningScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              $("#image-size").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all of your pages images are appropriately sized for your users viewport. Ideally, your page should not serve images that are larger than the version thats rendered on the users screen. Serving an image larger than the users viewport results in scaling down the image, use of unnecessary bandwidth, and slower page load time."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div>"
              );

              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              $("#image-size").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This test will check if all of your pages images are appropriately sized for your users viewport. Ideally, your page should not serve images that are larger than the version thats rendered on the users screen. Serving an image larger than the users viewport results in scaling down the image, use of unnecessary bandwidth, and slower page load time."></i><div class="Details">' +
                  modal_btn +
                  '</div><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          var ImgTable =
            "<table class='table' id='Img_Table'><tbody></tbody></table>";
          var tableItems = "";

          Object.keys(AuditImages).forEach(function (key) {
            tableItems = AuditImages["items"];
          });
          $("#List-image-size").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-image-size").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
          // $('#List-image-size').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)

          // FiltercommonSeoIssue = commonSeoIssue.filter(item => !ExcludecommonSeoIssueValues.includes(item));

          $(document).on("click", ".modalBtn.ResponsiveImages", function () {
            // console.log('ImgTable',ImgTable)

            $("#ModalData").html(ImgTable);
            Object.keys(tableItems).forEach(function (key) {
              // console.log('tableItems',tableItems)
              var URL = tableItems[key]["url"];
              var ImgTag =
                '<img src="' +
                URL +
                '" class="thumbnail_img" style="max-width: 100px;max-height: 100px;"/>';

              //    var ImgTag2 = '<img src="'+URL+'" class="thumbnail_img" style="max-width: 100px;max-height: 100px;"/>'

              var snippet = tableItems[key]["node"]["snippet"];
              var selector = tableItems[key]["node"]["selector"];
              var nodeLabel = tableItems[key]["node"]["nodeLabel"];

              $("#Img_Table tbody").append(
                "<tr><td>" +
                  ImgTag +
                  "</td><td><pre class='p-0 m-0'>" +
                  nodeLabel +
                  "</pre><xmp>" +
                  snippet +
                  "</xmp></td><td><a href=" +
                  URL +
                  " target='_blank'>" +
                  URL +
                  "</a></td></tr>"
              );
            });
            // $("#ImgTable").append("<tr></tr>")
            $("#seo_CheckupModalLabel").text("Full list of oversized images");
          });

          $(document).on(
            "click",
            ".modalBtn.HowToFixResponsiveImages",
            function () {
              let HowToFix =
                "<div class='card-body'><h5>How to pass this test?</h5><div><p>This issue can be fixed by using responsive images, which relies on creating multiple versions of each image, that are served via CSS media queries depending on the user's viewport dimensions.</p><p>Another solution can be to use vector-based image formats like SVG. SVG images scale appropriately to any size, without wasting unnecessary bandwidth. Also consider image CDNs that can help serve responsive images.</p></div></div>";

              $("#ModalDataMD").html(HowToFix);

              // $("#ImgTable").append("<tr></tr>")
              $("#seo_CheckupModalLabelMD").text("Responsive Image Test");
            }
          );
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
          if (Result !== "") {
            for (const [key, value] of Object.entries(Result)) {
              if (typeof value["entity"] == "object" && value["entity"]) {
                for (const [key1, value1] of Object.entries(value["entity"])) {
                  if (
                    key1 == "url" &&
                    value1 == "https://www.google-analytics.com/analytics.js"
                  ) {
                    GoogleAnalyticsConfirmation = true;
                  }
                }
              }
              if (
                typeof value["subItems"]["items"] == "object" &&
                value["subItems"]["items"]
              ) {
                for (const [key1, value1] of Object.entries(
                  value["subItems"]["items"]
                )) {
                  for (const [key2, value2] of Object.entries(value1)) {
                    if (
                      key2 == "url" &&
                      value2 == "https://www.google-analytics.com/analytics.js"
                    ) {
                      GoogleAnalyticsConfirmation = true;
                    }
                  }
                }
              }
            }
          }

          var ScoreBracketVar = "";
          if (GoogleAnalyticsConfirmation == false) {
            ScoreBracketVar = "Failed";
          } else {
            ScoreBracketVar = "Passed";
          }

          let value = "Google Analytics Test";
          var AuditTitle = SubResponse["unsized-images"]["title"];
          let AuditImages = SubResponse["unsized-images"]["details"];
          var CustomScore = "";
          //let modal_btn = '<button type="button" class="btn btn-link modalBtn GoogleAnalyticsBtn ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
          let modal_btnHTF =
            '<button type="button" class="btn btn-danger modalBtn HowToFixGoogleAnalytics" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

          var AuditId = "google-analytics";

          var AuditDescription = "";
          var ChangedScore = "";
          if (ScoreBracketVar == "Passed") {
            AuditDescription =
              "<small>Congratulations! Your webpage is using Google Analytics.</small>";
            ChangedScore = "Passed";
          } else {
            AuditDescription =
              "<small>A Google Analytics script is not detected on this page. While there are several tools available to monitor your site's visitors and traffic sources, Google Analytics is a free, commonly recommended program to help diagnose potential SEO issues.</small>";
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

              $("#commonSeoIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              commonSeoPassedScore = commonSeoPassedScore + 1;
              generalPassedScore = generalPassedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                "",
                ChangedScore,
                AuditId
              );

              $("#google-analytics").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is connected with Google Analytics. Google Analytics is a popular, free website analysis tool that helps provide insights about your site traffic and demographics."></i></div></div><hr />'
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
                  (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
                  "</div>"
              );

              $("#commonSeoIssuesDetails_failed li ul").append(
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

              commonSeoFailedScore = commonSeoFailedScore + 1;
              generalFailedScore = generalFailedScore + 1;
              UpdateScoreVar = UpdateScore(
                ResponseKey,
                "commonSeoIssues",
                AuditDescription,
                ChangedScore,
                AuditId
              );

              $("#google-analytics").html(
                '<div class="media ' +
                  UpdateScoreVar +
                  '" id="issue-' +
                  AuditId +
                  '"><label class="mr-3" >' +
                  value +
                  '</label><div class="media-body"><p class="Description">' +
                  AuditDescription +
                  '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your website is connected with Google Analytics. Google Analytics is a popular, free website analysis tool that helps provide insights about your site traffic and demographics."></i><div class="mt-3">' +
                  modal_btnHTF +
                  "</div></div></div><hr />"
              );
            }
          }

          $("#List-google-analytics")
            .removeClass("Failed")
            .addClass("list-item " + UpdateScoreVar);
          $("#List-google-analytics").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );

          let HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must create an account on <a href="http://www.google.com/analytics/" target="_blank">Google Analytics site</a> and insert into your page a small javascript tracking code.</p><p><strong>Example:</strong></p><pre style="margin: 10px 0px;">&lt;!-- Google Analytics --&gt;&lt;script&gt;(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
            "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
            "ga('create', 'UA-XXXX-Y', 'auto');" +
            "ga('send', 'pageview');" +
            "&lt;/script&gt;" +
            "&lt;!-- End Google Analytics --&gt;" +
            "</pre><p>Note that you have to change the 'UA-XXXX-Y' with the proper id which you'll find in your analytics account.</p></div></div>";
          $(document).on(
            "click",
            ".modalBtn.HowToFixGoogleAnalytics",
            function () {
              $("#ModalDataMD").html(HowToFix);

              //   $("#ImgTable").append("<tr></tr>")
              $("#seo_CheckupModalLabelMD").text("Image Aspect Ratio Test");
            }
          );
        }
        // google Analytics end

        // second tables start
        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          var obj = SubResponse["network-requests"]["details"]["items"];
          var trHTML = "";
          var trHTMLR = "";
          var percentage = 0;
          var htmlTableDomain = "";
          var htmlTableRequestDomain = "";
          var trHTMLDomain = "";
          var trHTMLRequestByDomain = "";
          var resourceTypeListReq = [];
          var domainArr = [];
          var domainCounts = [];
          var domain = 0;
          const contentResouceTypeList = [
            "Document",
            "Image",
            "Other",
            "Stylesheet",
            "Font",
            "Media",
            "Script",
            "Ping",
          ];
          const resouceTypeList = [
            "Document",
            "Image",
            "Other",
            "Stylesheet",
            "Font",
            "Media",
            "Script",
          ];
          var resourceTypeCount = {};
          var resourceTypeUrl = {};
          var resourceTypeSize = {};
          var resourceTypeSize = {};
          var domainsSizeDict = {};
          var domainsCountDict = {};
          var resTypeDict = {};

          $.each(resouceTypeList, function (i, val) {
            resourceTypeCount[val] = 0;
            resourceTypeSize[val] = 0;
            resourceTypeUrl[val] = [];
          });
          var totalTransferSize = 0;
          var totalRequestCount = 0;
          $.each(obj, function (index, value) {
            var resType = value.resourceType;

            // if (resouceTypeList.includes(value['resourceType'])) {
            if (contentResouceTypeList.includes(resType)) {
              var dmainSize = value;
              var domainUrl = new URL(value.url);
              domain = domainUrl.hostname;
              if (domain !== "") {
                // Override the ResourceType name if its something which present in contentResourceTypeList(like ping)
                // and is not in the resourceTypeList. It will be termed as Other
                if (!resouceTypeList.includes(resType)) {
                  resType = "Other";
                }
                resourceTypeListReq.push(resType);
                domainArr.push(domain);
                domainCounts.push(dmainSize);
                resourceTypeCount[resType] += 1;
                resourceTypeSize[resType] += value["transferSize"];
                resourceTypeUrl[resType].push(value["url"]);
                totalTransferSize += value["transferSize"];
                totalRequestCount += 1;
                if (domainsCountDict.hasOwnProperty(domain)) {
                  domainsCountDict[domain] += 1;
                } else {
                  domainsCountDict[domain] = 1;
                }

                if (domainsSizeDict.hasOwnProperty(domain)) {
                  domainsSizeDict[domain] += value["transferSize"];
                } else {
                  domainsSizeDict[domain] = value["transferSize"];
                }
                if (resTypeDict.hasOwnProperty(resType)) {
                  resTypeDict[resType] += value["transferSize"];
                } else {
                  resTypeDict[resType] = value["transferSize"];
                }
              }
            }
          });
          // second tables start
          var countsObj = {};
          jQuery.each(domainArr, function (key, value) {
            if (!countsObj.hasOwnProperty(value)) {
              countsObj[value] = 1;
            } else {
              countsObj[value]++;
            }
          });

          var percentageArray = [];
          var DomainPercentage = 0;
          var sortDomainSizeArray = [];
          for (var sortDoaminSize in domainsSizeDict) {
            sortDomainSizeArray.push([
              sortDoaminSize,
              domainsSizeDict[sortDoaminSize],
            ]);
          }
          sortDomainSizeArray.sort(function (paramA, paramB) {
            return paramB[1] - paramA[1];
          });
          $.each(sortDomainSizeArray, function (key, value) {
            DomainPercentage = (100 * value[1]) / totalTransferSize;
            percentageArray.push(DomainPercentage);
            trHTMLDomain +=
              "<tr><td>" +
              value[0] +
              "</td><td>" +
              DomainPercentage.toFixed(2) +
              "%</td><td>" +
              bytesToSize(value[1]) +
              "</td></tr>";
          });
          var domainPerSum = 0;
          for (i = 0; i < percentageArray.length; i++) {
            domainPerSum = domainPerSum + percentageArray[i];
          }
          countsArr = [];
          var DomainPercentageReq = 0;
          var ReqPercentageArray = [];
          var countsValues = [];
          var sortDomainReqArray = [];
          for (var sortDoaminReq in countsObj) {
            sortDomainReqArray.push([sortDoaminReq, countsObj[sortDoaminReq]]);
          }
          sortDomainReqArray.sort(function (paramA, paramB) {
            return paramB[1] - paramA[1];
          });
          $.each(sortDomainReqArray, function (key, value) {
            countsValues = countsValues + value;
            countsArr.push(countsValues);
            DomainPercentageReq = (100 * value[1]) / totalRequestCount;
            ReqPercentageArray.push(DomainPercentageReq);
            trHTMLRequestByDomain +=
              "<tr><td>" +
              value[0] +
              "</td><td>" +
              DomainPercentageReq.toFixed(1) +
              "%</td><td>" +
              value[1] +
              "</td></tr>";
          });

          var domainPercTotal = 0;
          for (let i = 0; i < ReqPercentageArray.length; i++) {
            domainPercTotal += ReqPercentageArray[i];
          }
          var sortableSizeArray = [];
          for (var resorceTypes in resTypeDict) {
            sortableSizeArray.push([resorceTypes, resTypeDict[resorceTypes]]);
          }

          sortableSizeArray.sort(function (paramA, paramB) {
            return paramB[1] - paramA[1];
          });
          var domainpercentageTotal = [];
          $.each(sortableSizeArray, function (index, value) {
            var DomainPercentage = (100 * value[1]) / totalTransferSize;
            domainpercentageTotal.push(DomainPercentage);
            trHTML +=
              "<tr><td>" +
              value[0] +
              "</td><td>" +
              DomainPercentage.toFixed(1) +
              "%</td><td>" +
              bytesToSize(value[1]) +
              "</td></tr>";
          });

          var domainPercentageSum = 0;
          for (i = 0; i < domainpercentageTotal.length; i++) {
            domainPercentageSum += domainpercentageTotal[i];
          }
          // first table end
          // second table start

          var countsObject = {};
          jQuery.each(resourceTypeListReq, function (key, value) {
            if (!countsObject.hasOwnProperty(value)) {
              countsObject[value] = 1;
            } else {
              countsObject[value]++;
            }
          });
          sortableReq = [];
          for (var requests in countsObject) {
            sortableReq.push([requests, countsObject[requests]]);
          }
          sortableReq.sort(function (paramA, paramB) {
            return paramB[1] - paramA[1];
          });

          var countsArr = [];
          var ReqPercentageArray = [];
          $.each(sortableReq, function (i, val) {
            var DomainPercentageReq = parseFloat(
              (val[1] / totalRequestCount) * 100
            );
            ReqPercentageArray.push(DomainPercentageReq);
            trHTMLR +=
              "<tr><td>" +
              val[0] +
              "</td><td>" +
              DomainPercentageReq.toFixed(1) +
              "%</td><td>" +
              val[1] +
              "</td></tr>";
          });

          var domainReqPercentageSum = 0;
          for (i = 0; i < ReqPercentageArray.length; i++) {
            domainReqPercentageSum += ReqPercentageArray[i];
          }

          var htmlTable = `<table class="table" ><thead><tr><th>Content Type</th><th>Percent</th><th>Transfer Size</th></tr></thead><tbody>${trHTML}</tbody><tfoot><tr><td>Total</td><td>${domainPercentageSum.toFixed(
            0
          )}%</td><td>${bytesToSize(
            totalTransferSize.toFixed(2)
          )}</td></tr></tfoot></table>`;
          var htmlTabler = `<table class="table" ><thead><tr><th>Content Type</th><th>Percent</th><th>Requests</th></tr></thead><tbody>${trHTMLR}</tbody><tfoot><tr><td>Total</td><td>${domainReqPercentageSum.toFixed(
            0
          )}%</td><td>${totalRequestCount}</td></tr></tfoot></table>`;

          htmlTableDomain = `<table class="table" ><thead><tr><th>Content Type</th><th>Percent</th><th>Transfer Size</th></tr></thead><tbody>${trHTMLDomain}</tbody><tfoot><tr><td>Total</td><td>${domainPercTotal.toFixed(
            0
          )}%</td><td>${bytesToSize(
            totalTransferSize
          )}</td></tr></tfoot></table>`;
          htmlTableRequestDomain = `<table class="table" ><thead><tr><th>Content Type</th><th>Percent</th><th>Requests</th></tr></thead><tbody>${trHTMLRequestByDomain}</tbody><tfoot><td>Total</td><td>${domainPercTotal.toFixed(
            0
          )}%</td><td>${totalRequestCount}</td></tfoot></table>`;
        }
        // second tables end
        if (
          SubResponse["resource-summary"] == "" ||
          SubResponse["resource-summary"]
        ) {
          var displayValue = SubResponse["resource-summary"]["displayValue"];
          displayValue = parseInt(displayValue);

          let value = "Page Objects Test";
          var AuditDescription = "";
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
          // if (ScoreBracketVar == 'Passed') {
          // } else if (ScoreBracketVar == 'Warning') {
          // } else if (ScoreBracketVar == 'Failed') {
          // }

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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="row"><div class="col-md-6"><div class="tableHeight">' +
                  htmlTable +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableDomain +
                  '</div></div><div class="col-md-6"><div class="tableHeight">' +
                  htmlTabler +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableRequestDomain +
                  "</div></div></div></div>"
              );
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
              AuditDescription = `<small>Congratulations, your page has fewer than <b>20 http requests</b>. A higher number of http requests results in a user's browser needing to request a large number of objects from your server, which will ultimately slow down the loading of your web page.</small>`;
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="row"><div class="col-md-6"><div class="tableHeight">' +
                  htmlTable +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableDomain +
                  '</div></div><div class="col-md-6"><div class="tableHeight">' +
                  htmlTabler +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableRequestDomain +
                  "</div></div></div></div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
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

              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
              AuditDescription = `<small>You have a caching mechanism on your website. Caching helps speed page loading times as well as reduces server load.</small>`;
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  AuditDescription +
                  '</p><div class="row"><div class="col-md-6"><div class="tableHeight">' +
                  htmlTable +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableDomain +
                  '</div></div><div class="col-md-6"><div class="tableHeight">' +
                  htmlTabler +
                  '</div><br/><div class="tableHeight">' +
                  htmlTableRequestDomain +
                  "</div></div></div></div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
              AuditDescription = `<small>Your page uses more than <b>20 http requests </b>, which can slow down page loading and negatively impact user experience.</small>`;
            }
          }
          $("#page-objects").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              AuditDescription +
              '</p><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if all the objects requested by this webpage can be retrieved. If they are not retrievable, your page may display incorrectly, leading to a bad user experience and lower search engine rankings."></i><div class="row"><div class="col-md-6"><div class="tableHeight">' +
              htmlTable +
              '</div><br/><div class="tableHeight">' +
              htmlTableDomain +
              '</div></div><div class="col-md-6"><div class="tableHeight">' +
              htmlTabler +
              '</div><br/><div class="tableHeight">' +
              htmlTableRequestDomain +
              "</div></div></div></div></div><hr />"
          );

          $("#List-page-objects")
            .removeClass("Failed")
            .addClass(UpdateScoreVar);
          $("#List-page-objects").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }

        // seconds tables

        // ===================

        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let value = "CDN Usage Test";
          var AuditDescription = "";
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

          var ImagesModalContent = "";
          var JsModalContent = "";
          var CssModalContent = "";

          let modal_btnImages =
            '<button type="button" class="btn btn-link modalBtn CDNImages ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> Images</button>';
          let modal_btnCss =
            '<button type="button" class="btn btn-link modalBtn CDNCss ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> Css</button>';
          let modal_btnJs =
            '<button type="button" class="btn btn-link modalBtn CDNJs ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> JavaScript</button>';

          // var KeywordsCountTagsUl = '<ul class="KW_ul p-0">'+KeywordsCountTagsLi+'</ul>';

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
              $("#Categories_Passed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  SeoDataTitle +
                  "</p>" +
                  modal_btnImages +
                  "</br>" +
                  modal_btnJs +
                  " </br> " +
                  modal_btnCss +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_passed li ul").append(
                '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

              speedOptimizationScorePassedValue =
                speedOptimizationScorePassedValue + 1;
              generalPassedScore = generalPassedScore + 1;
            } else if (ChangedScore == "Warning") {
              $("#Categories_Warning").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  SeoDataTitle +
                  "</p>" +
                  modal_btnImages +
                  "</br>" +
                  modal_btnJs +
                  " </br> " +
                  modal_btnCss +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_warning li ul").append(
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

              speedOptimizationScoreWarningValue =
                speedOptimizationScoreWarningValue + 1;
              generalWarningScore = generalWarningScore + 1;
            } else if (ChangedScore == "Failed") {
              $("#Categories_Failed").append(
                '<div id="audit_' +
                  AuditId +
                  '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
                  value +
                  '</h6><p class="text-light-gray">' +
                  SeoDataTitle +
                  "</p>" +
                  modal_btnImages +
                  "</br>" +
                  modal_btnJs +
                  " </br> " +
                  modal_btnCss +
                  "</div>"
              );
              $("#speedOptimizaionIssuesDetails_failed li ul").append(
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

              speedOptimizationScoreFailedValue =
                speedOptimizationScoreFailedValue + 1;
              generalFailedScore = generalFailedScore + 1;
            }
          }

          $("#cdn-usage").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><p class="Description">' +
              SeoDataTitle +
              "</p>" +
              modal_btnImages +
              "</br>" +
              modal_btnJs +
              " </br> " +
              modal_btnCss +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpages resources (images, javascript and css files) are served via CDNs." /></div><hr />'
          );

          $(document).on("click", ".modalBtn.CDNImages", function () {
            ImagesModalContent = "";
            var ImagesList = "<ul class='ImagesList CDNList'>";
            for (let index = 0; index < ImagesArray.length; ++index) {
              var element = ImagesArray[index];
              ImagesList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div> ";
            }

            ImagesList += "</ul>";

            if (ImagesArray.length > 0) {
              ImagesModalContent +=
                "<h6>Images not served from CDNs:</h6>" + ImagesList;
            }

            var CDNImagesList = "<ul class='ImagesList CDNList'>";
            for (let index = 0; index < CDNImagesArray.length; ++index) {
              let element = CDNImagesArray[index];
              CDNImagesList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div>";
            }
            CDNImagesList += "</ul>";
            if (CDNImagesArray.length > 0) {
              ImagesModalContent +=
                "<h6>Images served from CDNs:</h6>" + CDNImagesList;
            }
            if (CDNImagesArray.length == 0 && ImagesArray.length == 0) {
              ImagesModalContent = "<h6>No images are served from CDNs</h6>";
            }

            $("#ModalData").html(ImagesModalContent);
            $("#seo_CheckupModalLabel").text("CDN usage for image resources");
          });

          $(document).on("click", ".modalBtn.CDNJs", function () {
            JsModalContent = "";
            var JsList = "<ul class='JsList CDNList'>";

            for (let index = 0; index < JsArray.length; ++index) {
              let element = JsArray[index];
              JsList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div>";
            }

            JsList += "</ul>";
            if (JsArray.length > 0) {
              JsModalContent +=
                "<h6>Js resources not served from CDNs:</h6>" + JsList;
            }
            var CDNJsList = "<ul class='JsList CDNList'>";

            for (let index = 0; index < CDNJsArray.length; ++index) {
              let element = CDNJsArray[index];
              CDNJsList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div>";
            }
            CDNJsList += "</ul>";
            if (CDNJsArray.length > 0) {
              JsModalContent +=
                "<h6>Js resources served from CDNs:</h6>" + CDNJsList;
            }
            if (CDNJsArray.length == 0 && JsArray.length == 0) {
              JsModalContent += "<h6>No JS resources are served from CDNs</h6>";
            }

            $("#ModalData").html(JsModalContent);
            $("#seo_CheckupModalLabel").text(
              "CDN usage for JavaScript resources"
            );
          });
          $(document).on("click", ".modalBtn.CDNCss", function () {
            CssModalContent = "";

            var CssList = "<ul class='CssList CDNList'>";
            for (let index = 0; index < CssArray.length; ++index) {
              let element = CssArray[index];
              CssList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div>";
            }

            CssList += "</ul>";

            if (CssArray.length > 0) {
              CssModalContent +=
                "<h6>Css resources not served from CDNs:</h6>" + CssList;
            }

            var CDNCssList = "<ul class='CssList CDNList'>";
            for (let index = 0; index < CDNCssArray.length; ++index) {
              let element = CDNCssArray[index];
              CDNCssList +=
                "<li class='mb-2 px-1 py-1' style='background: #dde2e3ad'><a href=" +
                element +
                " target='_blank'> " +
                element +
                "</a></li> <div class='border_bottom_modal mb-2'> </div>";
            }
            CDNCssList += "</ul>";
            if (CDNCssArray.length > 0) {
              CssModalContent +=
                "<h6>CSS resources served from CDNs:</h6>" + CDNCssList;
            }

            if (CDNCssArray.length == 0 && CssArray.length == 0) {
              CssModalContent +=
                "<h6>No CSS resources are served from CDNs</h6>";
            }

            $("#ModalData").html(CssModalContent);
            $("#seo_CheckupModalLabel").text("CDN usage for css resources");
          });

          $("#List-cdn-usage").removeClass("Failed").addClass(UpdateScoreVar);
          $("#List-cdn-usage").html(
            `<a href="#issue-` + AuditId + `">${value}</a>`
          );
        }

      }
    }

    UpdateBars();
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

        // mobileUseablity  start
        var ExcludeMobileUseAblityValues = [];
        var FilterMobileUseAbilityIssue = [];

        // http protocol start
        if (
          SubResponse["network-requests"] == "" ||
          SubResponse["network-requests"]
        ) {
          let value = "HTTP2 Test";
          var AuditDescription = "";
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

          let thumb_leng = Object.keys(SubResponse["screenshot-thumbnails"]["details"]["items"])
        
          image = 
            SubResponse["screenshot-thumbnails"]["details"]["items"][thumb_leng.length-1]["data"];
          let ResponseKey = image;
          var img = "";
          // document.body.appendChild(Image);
          var AuditTitle = "";
          var AuditId = "final-screenshot";
          var AuditDescription = "";

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
    UpdateBars();
  }
  var spf_record = "";
  var seoWebObj = "";
  // website seo
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

    // mobileUseablity  start
    var ExcludeSeoWebValues = [];
    var FilterSeoWebIssue = [];

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
        SeoDataTitle = "Congratulations! Your webpage is using a title tag!";
        CustomScore = 100;
        ChangedScore = "Passed";
      } else {
        SeoDataTitle = "Your webpage is not using a title tag!";
        CustomScore = 0;
        ChangedScore = "Failed";
      }

      let value = "Meta Title Test";

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(CustomScore);
      let ResponseKey = SubResponse["title"];

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){
        // $("#commonSeoIssuesDetails_passed li ul").append('<li class="auditSummary bg-white py-2 px-3 font-12 text-green" data-category-type="error" data-category-name="error" rel="audit_'+AuditId+'"><span class="text-red">'+value+'</span><span class="text-red font-14"><i class="fa-solid fa-circle"></i></span></li>');
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataDescription,
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
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );
          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
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
      $("#title-tag").html(
        '<div class="media ' +
          UpdateScoreVar +
          '" id="issue-' +
          AuditId +
          '"><label class="mr-3" >' +
          value +
          '</label><div class="media-body"><label>' +
          SeoDataTitle +
          "</label><p>" +
          SeoDataDescription +
          '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Your webpages meta title is an HTML tag that defines the title of your page. This tag displays your page title in search engine results, at the top of a users browser, and also when your page is bookmarked in a list of favorites. A concise, descriptive title tag that accurately reflects your pages topic is important for ranking well in search engines."></i></div></div><hr />'
      );
      $(".titleTag").html(SeoDataDescription);
      // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
      //    $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
      $("#List-title-tag").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-title-tag").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }

    if (SubResponse["description"] == "" || SubResponse["description"]) {
      let ResponseKey = "";
      var SeoDataDescription = "";
      var AuditId = "description";
      let modal_btnHTF =
        '<button type="button" class="btn btn-danger modalBtn HowToFixDescription" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

      if (
        SubResponse["additional_info"] !== undefined &&
        SubResponse["additional_info"]["meta_desc"] !== undefined
      ) {
        SeoDataDescription = SubResponse["additional_info"]["meta_desc"][0];
      } else {
        SeoDataDescription = "";
      }

      var SeoDataTitle = "";

      var ChangedScore = "";
      let HowToFix = "";

      if (SeoDataDescription !== "") {
        SeoDataTitle =
          "Congratulations! Your webpage is using a meta description tag!";
        CustomScore = 100;
        ChangedScore = "Passed";
      } else {
        SeoDataTitle =
          "The meta description tag is missing from your page. You should include this tag in order to provide a brief description of your page which can be used by search engines. Well-written and inviting meta descriptions may also help click-through rates to your site in search engine results.";
        CustomScore = 0;
        ChangedScore = "Failed";

        HowToFix =
          '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must include a meta-description tag in your page header (<strong>&lt;head&gt;</strong> section):</p><pre style="margin: 10px 0px;">&lt;head&gt;&lt;meta name="description" content="type_your_description_here"&gt;&lt;/head&gt;</pre><p>Note that in HTML the <strong>&lt;meta&gt;</strong> tag has no end tag but in XHTML this tag must be properly closed.</p><p>Meta description can have any length but a good practice is to keep this under 160 characters (search engines generally truncate snippets longer than this value).</p></div></div>';
      }

      let value = "Meta Description Test";

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(CustomScore);

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
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
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );

          $("#description-tag").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              "</label><p>" +
              SeoDataDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Your webpages meta description is an HTML tag that is intended to provide a short and accurate summary of your page. Search engines use meta descriptions to help identify the a pages topic - they may also use meta descriptions by displaying them directly in search engine results. Accurate and inviting meta descriptions can help boost both your search engine rankings and a users likelihood of clicking through to your page."></i></div></div><hr />'
          );
        } else if (ChangedScore == "Failed") {
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
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

          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );

          $("#description-tag").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              "</label><p>" +
              SeoDataDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Your webpages meta description is an HTML tag that is intended to provide a short and accurate summary of your page. Search engines use meta descriptions to help identify the a pages topic - they may also use meta descriptions by displaying them directly in search engine results. Accurate and inviting meta descriptions can help boost both your search engine rankings and a users likelihood of clicking through to your page."></i><div class="Details mt-3">' +
              modal_btnHTF +
              "</div></div></div><hr />"
          );
        }
      }

      $(document).on("click", ".modalBtn.HowToFixDescription", function () {
        $("#ModalDataMD").html(HowToFix);

        // $("#ImgTable").append("<tr></tr>")
        $("#seo_CheckupModalLabelMD").text(value);
      });

      // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
      // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
      $("#List-description-tag").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-description-tag").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }
    // google search result priew test satrt
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
      let modal_btnHTF =
        '<button type="button" class="btn btn-danger modalBtn HowToFixDescription" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
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
      let value = "Google Search Results Preview Test";

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(CustomScore);

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
          ChangedScore,
          AuditId
        );
      } else {
        if (ChangedScore == "Info") {
          $("#Categories_Passed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><label><span class="title-format">' +
              SeoDataTitle +
              '</span><br><span class="text-success">' +
              finalUrl +
              '</span></label><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );

          $("#google-preview").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body" id="mediaBody"  style="max-width:500px"><label><span class="title-format">' +
              SeoDataTitle +
              '</span><br><span class="text-success">' +
              finalUrl +
              "</span></label><p>" +
              SeoDataDescription +
              '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check how your page might appear in Google search results. Google search results typically uses your webpage title, url and meta-description in order to display relevant summarized information about your site. If these elements are too long, Google will truncate their content. Webpage title up to 70 characters in length, and webpage descriptions up to 160 characters in length are recommended in order to optimize readability."></i></div></div><hr />'
          );
        }
        // else if (ChangedScore == 'Info') {
        //     commonSeoIssuesScoreInfoValue = commonSeoIssuesScoreInfoValue + 1;
        //     GeneralScoreInfoValue = GeneralScoreInfoValue + 1;
        //     UpdateScoreVar = UpdateScore(ResponseKey, 'commonSeoIssues', SeoDataTitle, ChangedScore, AuditId);

        //     $("#google-preview").html('<div class="media ' + UpdateScoreVar + '" id="issue-' + AuditId + '"><label class="mr-3" >' + value + '</label><div class="media-body"><label>'+SeoDataTitle+'</label></p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check how your page might appear in Google search results. Google search results typically uses your webpage title, url and meta-description in order to display relevant summarized information about your site. If these elements are too long, Google will truncate their content. Webpage title up to 70 characters in length, and webpage descriptions up to 160 characters in length are recommended in order to optimize readability."></i><div class="Details mt-3">' + modal_btnHTF + '</div></div></div><hr />')

        // }
      }

      $(document).on("click", ".modalBtn.HowToFixDescription", function () {
        $("#ModalDataMD").html(HowToFix);

        // $("#ImgTable").append("<tr></tr>")
        $("#seo_CheckupModalLabelMD").text(value);
      });

      // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
      // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
      $("#List-google-preview").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-google-preview").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
      // $('#google-preview').addClass('InnerPageHidden');
      // $('#List-google-preview').addClass('InnerPageHidden');
    }
    // google search result priew test end

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

      var KeywordsCountTagsUl =
        '<ul class="KW_ul p-0">' + KeywordsCountTagsLi + "</ul>";

      var SeoDataTitle = "";

      var ChangedScore = "";
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        SeoDataTitle =
          "There is likely no optimal keyword density (search engine algorithms have evolved beyond keyword density metrics as a significant ranking factor). It can be useful, however, to note which keywords appear most often on your page and if they reflect the intended topic of your page. More importantly, the keywords on your page should appear within natural sounding and grammatically correct copy.";
        CustomScore = "";
        ChangedScore = "Info";
      } else {
        SeoDataTitle =
          "There is likely no optimal keyword density (search engine algorithms have evolved beyond keyword density metrics as a significant ranking factor). It can be useful, however, to note which keywords appear most often on your page and if they reflect the intended topic of your page. More importantly, the keywords on your page should appear within natural sounding and grammatically correct copy.";
        CustomScore = "";
        ChangedScore = "Failed";
      }
      var AuditId = "Common_keywords";
      let value = "Most Common Keywords Test";

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
        // if score is null start
        SeoDataitle =
          "There is likely no optimal keyword density (search engine algorithms have evolved beyond keyword density metrics as a significant ranking factor). It can be useful, however, to note which keywords appear most often on your page and if they reflect the intended topic of your page. More importantly, the keywords on your page should appear within natural sounding and grammatically correct copy";
        UpdateScoreVar = "Failed";
        $("#common-keywords").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><label>' +
            SeoDataitle +
            "</label><p>" +
            KeywordsCountTagsUl +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check the most common keywords in your page and their usage (number of times used). This can help give a quick overview of the keywords and topics that crawlers may associate with your web page."></i></div></div><hr />'
        );
        // if score is end start
      } else {
        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          "",
          ChangedScore,
          AuditId
        );

        if (ChangedScore == "Info") {
          $("#Categories_Passed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><label><span class="title-format">' +
              SeoDataTitle +
              '</span><br><span class="text-success">' +
              finalUrl +
              '</span></label><p class="text-light-gray">' +
              KeywordsCountTagsUl +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
        $("#common-keywords").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><label>' +
            SeoDataTitle +
            "</label><p>" +
            KeywordsCountTagsUl +
            '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check the most common keywords in your page and their usage (number of times used). This can help give a quick overview of the keywords and topics that crawlers may associate with your web page."></i></div></div><hr />'
        );

        // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
        // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
        $("#List-common-keywords")
          .removeClass("Failed")
          .addClass(UpdateScoreVar);
        $("#List-common-keywords").html(
          `<a href="#issue-` + AuditId + `">${value}</a>`
        );
      }
    }

    if (SubResponse["keywords"] == "" || SubResponse["keywords"]) {
      let ResponseKey = SubResponse["keywords"];
      var SeoDataDescription = SubResponse["keywords"];
      var titleCheck = "";
      var descriptionCheck = "";
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
      if (typeof SeoDataDescription == "object") {
        var MostCommonKWs = pickHighest(SeoDataDescription, 5);
        for (const [KWkey, KWvalue] of Object.entries(MostCommonKWs)) {
          var KeywordsCount = KWvalue[0];
          var KeywordText = KWvalue[1].toLowerCase();

          if (
            titleCheck !== "" &&
            titleCheck.includes(KeywordText) == true &&
            KWtitleFound == false
          ) {
            KWtitleFound = true;
            KeywordsUsageDescriptionsT =
              "<p>Keyword(s) included in Title tag</p>";
          } else if (
            titleCheck.includes(KeywordText) == false &&
            KWtitleFound == false
          ) {
            // KWtitleFound = false;
            KeywordsUsageDescriptionsT =
              "<p>Keyword(s) not included in Title tag</p>";
          }
          if (
            descriptionCheck !== "" &&
            descriptionCheck.includes(KeywordText) == true &&
            KWdescriptionFound == false
          ) {
            KWdescriptionFound = true;
            KeywordsUsageDescriptionsD =
              "<p>Keyword(s) included in Meta-Description tag</p>";
          } else if (
            descriptionCheck.includes(KeywordText) == false &&
            KWdescriptionFound == false
          ) {
            // KWdescriptionFound = false;
            KeywordsUsageDescriptionsD =
              "<p>Keyword(s) not included in Meta-Description tag</p>";
          }
        }
      }

      var SeoDataTitle = "";
      var ChangedScore = "";

      if (KWtitleFound == true && KWdescriptionFound == true) {
        SeoDataTitle =
          "Congratulations! You are using your keywords in your meta-tags, which help search engines to properly identify the topic of your page.";
        CustomScore = "";
        ChangedScore = "Passed";
      } else if (KWtitleFound == true || KWdescriptionFound == true) {
        SeoDataTitle =
          "You are not using your keywords in any of your meta-tags, which help search engines to properly identify the topic of your page.";
        CustomScore = "";
        ChangedScore = "Warning";
      } else {
        SeoDataTitle =
          "Your most common keywords are not appearing in one or more of the meta-tags above. Your primary keywords should appear in your meta-tags to help identify the topic of your webpage to search engines.";
        CustomScore = "";
        ChangedScore = "Failed";
      }

      let value = "Keywords Usage Test";

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(CustomScore);

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
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
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              KeywordsUsageDescriptionsT +
              '</p><p class="text-light-gray">' +
              KeywordsUsageDescriptionsD +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
          $("#Categories_Warning").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              KeywordsUsageDescriptionsT +
              '</p><p class="text-light-gray">' +
              KeywordsUsageDescriptionsD +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_warning li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              KeywordsUsageDescriptionsT +
              '</p><p class="text-light-gray">' +
              KeywordsUsageDescriptionsD +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
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
      $("#common-keywords-usage").html(
        '<div class="media ' +
          UpdateScoreVar +
          '" id="issue-' +
          AuditId +
          '"><label class="mr-3" >' +
          value +
          '</label><div class="media-body"><label>' +
          SeoDataTitle +
          "</label><p>" +
          KeywordsUsageDescriptionsT +
          "</p><p>" +
          KeywordsUsageDescriptionsD +
          '</p><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="This will check if your most common keywords are used in the webpages title and description"></i></div></div><hr />'
      );

      // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
      // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
      $("#List-common-keywords-usage")
        .removeClass("Failed")
        .addClass(UpdateScoreVar);
      $("#List-common-keywords-usage").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }

    if (SubResponse["keywords"] == "" || SubResponse["keywords"]) {
      let ResponseKey = SubResponse["keywords"];
      var AuditId = "keywords_cloud";
      var SeoDataDescription = SubResponse["keywords"];
      var KeywordsCountCloud =
        "<div id='KeywordsCountCloud' style='height:500px'></div>";
      var KeywordsCountCloudArray = [];
      if (typeof SeoDataDescription == "object") {
        for (const [KWkey, KWvalue] of Object.entries(SeoDataDescription)) {
          var KeywordsCount = KWvalue[0];
          var KeywordText = KWvalue[1];
          KeywordsCountCloudArray.push({
            x: KeywordText,
            value: KeywordsCount,
          });
        }
      }

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
        SeoDataTitle =
          "There is likely no optimal keyword density (search engine algorithms have evolved beyond keyword density metrics as a significant ranking factor). It can be useful, however, to note which keywords appear most often on your page and if they reflect the intended topic of your page. More importantly, the keywords on your page should appear within natural sounding and grammatically correct copy";
        $("#keywords-cloud").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><label>' +
            SeoDataTitle +
            '</label><div class="KeywordsCountCloudCard card p-2">' +
            KeywordsCountCloud +
            '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="The Keyword Cloud is a visual representation of keywords used on your website. This will show you which words are frequently used in the content of your webpage. Keywords having higher density are presented in larger fonts and displayed in alphabetic order." ></i></div></div><hr />'
        );

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
          $("#Categories_Passed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><p class="text-light-gray">' +
              KeywordsCountCloud +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else {
          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
        $("#keywords-cloud").html(
          '<div class="media ' +
            UpdateScoreVar +
            '" id="issue-' +
            AuditId +
            '"><label class="mr-3" >' +
            value +
            '</label><div class="media-body"><label>' +
            SeoDataTitle +
            '</label><div class="KeywordsCountCloudCard card p-2">' +
            KeywordsCountCloud +
            '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="The Keyword Cloud is a visual representation of keywords used on your website. This will show you which words are frequently used in the content of your webpage. Keywords having higher density are presented in larger fonts and displayed in alphabetic order." ></i></div></div><hr />'
        );

        // FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
        // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
        $("#List-keywords-cloud")
          .removeClass("Failed")
          .addClass(UpdateScoreVar);
        $("#List-keywords-cloud").html(
          `<a href="#issue-` + AuditId + `">${value}</a>`
        );
      }

      if ($("#KeywordsCountCloud").length > 0) {
        // create tag cloud
        var chart = anychart.tagCloud(KeywordsCountCloudArray);

        // set chart title
        chart;
        chart.angles([0]);
        chart.colorRange().enabled(true);
        chart.colorRange().length("90%");
        // create and configure a color scale.
        var customColorScale = anychart.scales.linearColor();
        customColorScale.colors(["#28a745", "#ffc107", "#dc3545"]);

        // set the color scale as the color scale of the chart
        chart.colorScale(customColorScale);

        var background = chart.background();
        background.fill({
          // set colors position
          keys: ["#FFF"],
          angle: 0,
        });
        // set container id for the chart
        chart.container("KeywordsCountCloud");
        // initiate chart drawing
        chart.draw();
      }
    }

    if (seoWebObj["headings"] == "" || seoWebObj["headings"]) {
      let ResponseKey = SubResponse["headings"];
      var AuditId = "headings";
      var SeoDataDescription = SubResponse["headings"];

      var h1s = "";
      var h2s = "";
      var h1sLength = 0;
      var h2sLength = 0;

      if (typeof SeoDataDescription == "object") {
        h1sLength = 0;
        h2sLength = 0;
        for (const [KWkey, KWvalue] of Object.entries(SeoDataDescription).slice(
          0,
          2
        )) {
          if (KWkey == "h1") {
            var val = Object.values(KWvalue);
            h1sLength = KWvalue.length;
            Object.keys(val).forEach(function (key) {
              if (val[key] !== "") {
                h1s += "<li>" + val[key] + "</li>";
              }
            });
          }

          if (KWkey == "h2") {
            var val = Object.values(KWvalue);
            h2sLength = KWvalue.length;
            Object.keys(val).forEach(function (key) {
              if (val[key] !== "") {
                h2s += "<li>" + val[key] + "</li>";
              }
            });
          }
          // var KeywordsCount = KWvalue[0];
          // var KeywordText = KWvalue[1];
          // KeywordsCountTagsLi += "<li><span class='KWC'>"+KeywordsCount+"</span><span class='KWT'>"+KeywordText+"</span></li>"
        }
      }

      let modal_btnHTF =
        '<button type="button" class="btn btn-danger modalBtn HowToFixHeadings" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';

      var KeywordsH1Ul = "";
      var KeywordsH2Ul = "";
      if (h1s) {
        KeywordsH1Ul =
          '<ul class="KWH1_ul p-0 col-6"><li><b>H1 Tags</b></li>' +
          h1s +
          "</ul>";
      }
      if (h2s) {
        KeywordsH2Ul =
          '<ul class="KWH2_ul p-0 col-6"><li><b>H2 Tags</b></li>' +
          h2s +
          "</ul>";
      }

      var SeoDataTitle = "";

      var ChangedScore = "";
      let HowToFix = "";

      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        if (h1sLength > 10 && h2sLength <= 10 && h2sLength > 0) {
          SeoDataTitle =
            "Your page contains too many H1 tags. H1 tags should re-inforce the related content of your page to search engines - too many tags may make the topic less clear, or look like spam tactics. Consider using less than 10 H1 tags.";

          ChangedScore = "Warning";

          HowToFix = "";
        } else if (h1sLength > 0 && h1sLength <= 10 && h2sLength > 10) {
          SeoDataTitle =
            "Your page contains too many H2 tags. H2 tags should re-inforce the related content of your page to search engines - too many tags may make the topic less clear, or look like spam tactics. Consider using less than 10 H2 tags.";

          ChangedScore = "Warning";
        } else if (h1sLength > 10 && h2sLength > 10) {
          SeoDataTitle =
            "Your page contains too many H1 & H2 tags. H1 & H2 tags should re-inforce the related content of your page to search engines - too many tags may make the topic less clear, or look like spam tactics. Consider using less than 10 H1 & H2 tags.";

          ChangedScore = "Warning";
        } else if (
          h1sLength <= 10 &&
          h2sLength <= 10 &&
          h1sLength > 0 &&
          h2sLength > 0
        ) {
          SeoDataTitle =
            "Congratulations! Your webpage contains headings tags.";

          ChangedScore = "Passed";
        } else if (h1sLength == 0 && h2sLength !== 0) {
          SeoDataTitle =
            "Your webpage does not contain any H1 headings. H1 headings help indicate the important topics of your page to search engines. While less important than good meta-titles and descriptions, H1 headings may still help define the topic of your page to search engines.";

          ChangedScore = "Failed";
          HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must identify the most important topics from your page and insert those topics between <code>&lt;h1&gt;...&lt;/h1&gt;</code> tags.</p><p><strong>Example:</strong></p><pre style="margin: 10px 0px;">&lt;h1&gt;Important topic goes here&lt;/h1&gt;...&lt;h1&gt;Another topic&lt;/h1&gt;</pre></div></div>';
        } else if (h1sLength !== 0 && h2sLength == 0) {
          SeoDataTitle =
            "Your webpage does not contain any H2 headings. H2 headings help indicate the important topics of your page to search engines. While less important than good meta-titles and descriptions, H2 headings may still help define the topic of your page to search engines.";

          ChangedScore = "Failed";

          HowToFix =
            '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must identify the most important topics from your page and insert those topics between <code>&lt;h2&gt;...&lt;/h2&gt;</code> tags.</p><p><strong>Example:</strong></p><pre style="margin: 10px 0px;">&lt;h2&gt;Important topic goes here&lt;/h2&gt;...&lt;h2&gt;Another topic&lt;/h2&gt;</pre></div></div>';
        }
      }

      let value = "Heading Tags Test";

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(ChangedScore);

      $(document).on("click", ".modalBtn.HowToFixHeadings", function () {
        $("#ModalDataMD").html(HowToFix);

        // $("#ImgTable").append("<tr></tr>")
        $("#seo_CheckupModalLabelMD").text("Heading Tags Test");
      });

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
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
              "</h6><label>" +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              "</div>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );

          $("#heading-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using any H1 and H2 HTML header tags. Header tags are not visible to users, but help clarify and support the overall theme or purpose of your page to search engines. The H1 tag represents the most important heading, e.g., the title of the page or blog post. The H2 tag represents the second most important headings on the webpages, e.g., the subheadings."></i></div></div><hr />'
          );
        }
        if (ChangedScore == "Warning") {
          $("#Categories_Warning").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              "</div>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_warning li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoWarningScore = commonSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );

          $("#heading-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using any H1 and H2 HTML header tags. Header tags are not visible to users, but help clarify and support the overall theme or purpose of your page to search engines. The H1 tag represents the most important heading, e.g., the title of the page or blog post. The H2 tag represents the second most important headings on the webpages, e.g., the subheadings."></i></div></div><hr />'
          );
        }
        if (ChangedScore == "Failed") {
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              "</div>" +
              (typeof modal_btnHTF === "undefined" ? "" : modal_btnHTF) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
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

          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );

          $("#heading-tags").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label><div class="row m-0">' +
              KeywordsH1Ul +
              KeywordsH2Ul +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your webpage is using any H1 and H2 HTML header tags. Header tags are not visible to users, but help clarify and support the overall theme or purpose of your page to search engines. The H1 tag represents the most important heading, e.g., the title of the page or blog post. The H2 tag represents the second most important headings on the webpages, e.g., the subheadings."></i><div class="Details mt-3">' +
              modal_btnHTF +
              "</div></div></div><hr />"
          );
        }
      }
      //  FilterSeoWebIssue = commonSeoIssue.filter(item => ! ExcludeSeoWebValues.includes(item));
      // $('#commonSeoIssues').append(`<li class="list-item `+UpdateScoreVar+`"><a href="#issue-`+AuditId+`">${value}</a></li>`)
      $("#List-heading-tags").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-heading-tags").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }

    if (seoWebObj["warnings"] == "" || seoWebObj["warnings"]) {
      let ResponseKey = SubResponse["warnings"];
      var AuditId = "warnings";
      var SeoDataDescription = SubResponse["warnings"];

      var h1s = "";
      var h2s = "";

      var ImgAlt = false;

      if (typeof SeoDataDescription == "object") {
        for (const [KWkey, KWvalue] of Object.entries(SeoDataDescription)) {
          if (KWvalue.includes("Image missing alt tag:") && ImgAlt == false) {
            var imgSrc = KWvalue.split("tag:");

            imgSrc = imgSrc[1];

            ImgAlt = true;
          }
        }
      }

      var SeoDataTitle = "";

      var ChangedScore = "";

      let modal_btn =
        '<button type="button" class="btn btn-link modalBtn Warnings ps-0" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal_lg"><i class="fa fa-caret-right" aria-hidden="true"></i> See results list</button>';
      let modal_btnHTF =
        '<button type="button" class="btn btn-danger modalBtn HowToFixImageAlt" data-bs-toggle="modal" data-bs-target="#seo_CheckupModal"> How to Fix </button>';
      let value = "Image Alt Test";
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        if (ImgAlt == true) {
          SeoDataTitle =
            'Your webpage is using "img" tags with empty or missing "alt" attribute.';
          CustomScore = "";
          ChangedScore = "Warning";
        } else {
          SeoDataTitle =
            'Congratulations! Your webpage is not using "img" tags with empty or missing "alt" attribute.';
          CustomScore = "";
          ChangedScore = "Passed";
        }
      }

      var UpdateScoreVar = "";

      var ScoreBracketVar = GetScoreBracket(CustomScore);

      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

        UpdateScoreVar = UpdateScore(
          ResponseKey,
          "commonSeoIssues",
          SeoDataTitle,
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

          $("#commonSeoIssuesDetails_passed li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoPassedScore = commonSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            "",
            ChangedScore,
            AuditId
          );

          $("#img-alt").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label></div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if images on your webpage are using alt attributes. If an image cannot be displayed (e.g., due to broken image source, slow internet connection, etc), the alt attribute provides alternative information. Using relevant keywords and text in the alt attribute can help both users and search engines better interpret the subject of an image."></i></div><hr />'
          );
        }
        if (ChangedScore == "Warning") {
          $("#Categories_Warning").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-yellow me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><div class="Details">' +
              modal_btn +
              '</div><div class="mt-3">' +
              modal_btnHTF +
              "</div>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_warning li ul").append(
            '<li class="auditSummary bg-white py-2 px-3 font-12 text-red" data-category-type="error" data-category-name="error" rel="audit_' +
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

          commonSeoWarningScore = commonSeoWarningScore + 1;
          generalWarningScore = generalWarningScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );

          $("#img-alt").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label><div class="Details">' +
              modal_btn +
              '</div><div class="mt-3">' +
              modal_btnHTF +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if images on your webpage are using alt attributes. If an image cannot be displayed (e.g., due to broken image source, slow internet connection, etc), the alt attribute provides alternative information. Using relevant keywords and text in the alt attribute can help both users and search engines better interpret the subject of an image."></i></div></div><hr />'
          );
        }
        if (ChangedScore == "Failed") {
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              "</h6><label>" +
              SeoDataTitle +
              '</label><div class="Details">' +
              modal_btn +
              '</div><div class="mt-3">' +
              modal_btnHTF +
              "</div>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );

          $("#commonSeoIssuesDetails_failed li ul").append(
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

          commonSeoFailedScore = commonSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
          UpdateScoreVar = UpdateScore(
            ResponseKey,
            "commonSeoIssues",
            SeoDataTitle,
            ChangedScore,
            AuditId
          );

          $("#img-alt").html(
            '<div class="media ' +
              UpdateScoreVar +
              '" id="issue-' +
              AuditId +
              '"><label class="mr-3" >' +
              value +
              '</label><div class="media-body"><label>' +
              SeoDataTitle +
              '</label><div class="Details">' +
              modal_btn +
              '</div><div class="mt-3">' +
              modal_btnHTF +
              '</div><i class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if images on your webpage are using alt attributes. If an image cannot be displayed (e.g., due to broken image source, slow internet connection, etc), the alt attribute provides alternative information. Using relevant keywords and text in the alt attribute can help both users and search engines better interpret the subject of an image."></i></div></div><hr />'
          );
        }
      }

      $(document).on("click", ".modalBtn.Warnings", function () {
        var ImgTable = "<ul class='CDNList AltImgList' id='Img_List'></ul>";
        $("#ModalData").html(ImgTable);
        $("#Img_List").empty();
        if (typeof SubResponse["warnings"] == "object") {
          for (const [KWkey, KWvalue] of Object.entries(
            SubResponse["warnings"]
          )) {
            if (KWvalue.includes("Image missing alt tag:")) {
              var imgSrc = KWvalue.split("tag: ");
              imgSrc = imgSrc[1];

              var ImageSrcLink = imgSrc.split('nitro-lazy-src="');
              ImageSrcLink = ImageSrcLink.pop();

              ImageSrcLink = ImageSrcLink.split('"')[0];
              ImageSrcLink = ImageSrcLink[0];

              var imag = "<img src=" + ImageSrcLink + ">";
              $("#Img_List").append("<li><xmp>" + imgSrc + "</xmp></li>");
              //    $("#Img_List").append('<li class="list-group-item">'+imgSrc+'<xmp>'+imgSrc+'</xmp></li>')
            }
          }
        }
        $("#seo_CheckupModalLabel").text(
          'Full list of "img" tags with empty or missing "alt" attribute'
        );
      });
      $(document).on("click", ".modalBtn.HowToFixImageAlt", function () {
        let HowToFix =
          '<div class="default-padding how-to-fix-content"><h3>How to pass this test?</h3><div><p>In order to pass this test you must add an <strong>alt</strong> attribute to every <strong>&lt;img&gt;</strong> tag used into your webpage.</p><p>An image with an alternate text specified is inserted using the following HTML line:</p><pre style="margin: 10px 0px;">&lt;img src="image.png" alt="text_to_describe_your_image"&gt;</pre><p>Remember that the point of alt text is to provide the same functional information that a visual user would see. Search engines, users who disabled images in their browsers and other agents who are unable to see the images on your webpage can read the alt attributes assigned to the image since they cannot view it.</p></div></div>';
        $("#ModalDataMD").html(HowToFix);
        $("#seo_CheckupModalLabelMD").text("Image Alt Test");
      });
      $("#List-img-alt").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-img-alt").html(`<a href="#issue-` + AuditId + `">${value}</a>`);
    }
    if (spf_record !== undefined) {
      let ResponseKey = "";
      var AuditTitle = "";
      var AuditId = "spf_record";
      var spf = spf_record;
      var SeoDataDescription = `<small>Congratulations! Your DNS server is using an SPF record.</small>`;
      if (SeoDataDescription !== undefined && SeoDataDescription !== "") {
        SeoDataTitle = "";
        CustomScore = "";
        ChangedScore = "Passed";
      }
      let value = "SPF Records Test";

      var ScoreBracketVar = GetScoreBracket(ChangedScore);
      if (ScoreBracketVar !== "Info" && ChangedScore == "") {
        // if(ScoreBracketVar == '' && ChangedScore !==""){

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
          $("#Categories_Passed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-green me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              SeoDataDescription +
              "</p><code>" +
              spf +
              "</code>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );
          $("#advancedSeoIssuesDetails_passed li ul").append(
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

          advancedSeoPassedScore = advancedSeoPassedScore + 1;
          generalPassedScore = generalPassedScore + 1;
        } else if (ChangedScore == "Failed") {
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              SeoDataDescription +
              "</p><code>" +
              spf +
              "</code>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );
          $("#advancedSeoIssuesDetails_failed li ul").append(
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

          advancedSeoFailedScore = advancedSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
      }
      $("#spf-record").html(
        '<div class="media ' +
          UpdateScoreVar +
          '" id="issue-' +
          AuditId +
          '"><label class="mr-3" >' +
          value +
          '</label><div class="media-body"><p class="Description">' +
          SeoDataDescription +
          "</p><code>" +
          spf +
          '</code><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your DNS records contains an SPF record. SPF (Sender Policy Framework) records allow email systems to verify if a given mail server has been authorized to send mail on behalf of your domain. Creating an SPF record increases email delivery rates by reducing the likelihood of your email being marked as spam."></i></div></div><hr />'
      );
      $("#List-spf-record").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-spf-record").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    } else {
      let ResponseKey = "";
      var AuditTitle = "";
      var AuditId = "spf_record";
      var spf = "";
      var SeoDataDescription = `<small>Your DNS server is not using an SPF record. SPF (Sender Policy Framework) allows administrators to specify which hosts are allowed to send mail from a given domain by creating a specific SPF record or TXT record in the Domain Name System (DNS).</small>`;
      var ChangedScore = "Failed";
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

        if (ChangedScore == "Failed") {
          $("#Categories_Failed").append(
            '<div id="audit_' +
              AuditId +
              '" class="auditSummaryDesc"><h6 class="text-gray mb-2 font-18 fw-400 d-block align-left "><span class="font-12 text-red me-1 d-inline-block align-middle"><i class="fa-solid fa-circle"></i></span>' +
              value +
              '</h6><p class="text-light-gray">' +
              SeoDataDescription +
              "</p>" +
              (typeof modal_btnBrokenLinks === "undefined"
                ? ""
                : modal_btnBrokenLinks) +
              "</div>"
          );
          $("#advancedSeoIssuesDetails_failed li ul").append(
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

          advancedSeoFailedScore = advancedSeoFailedScore + 1;
          generalFailedScore = generalFailedScore + 1;
        }
      }
      $("#spf-record").html(
        '<div class="media ' +
          UpdateScoreVar +
          '" id="issue-' +
          AuditId +
          '"><label class="mr-3" >' +
          value +
          '</label><div class="media-body"><p class="Description">' +
          SeoDataDescription +
          '</p><i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Check if your DNS records contains an SPF record. SPF (Sender Policy Framework) records allow email systems to verify if a given mail server has been authorized to send mail on behalf of your domain. Creating an SPF record increases email delivery rates by reducing the likelihood of your email being marked as spam."></i></div></div><hr />'
      );

      // FilterAdvanceSeo = advanceSeo.filter(item => !ExcludeAdvanceSeoValues.includes(item));
      $("#List-spf-record").removeClass("Failed").addClass(UpdateScoreVar);
      $("#List-spf-record").html(
        `<a href="#issue-` + AuditId + `">${value}</a>`
      );
    }

    UpdateBars();
    // tooltip start
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

  $(".auditSummary").on("click", function () {
    $(".status-preview-main").show();
    var target = $(this).attr("rel");
    $("#" + target)
      .show()
      .siblings("div")
      .hide();
    $("#" + target)
      .show()
      .parent(".status-preview")
      .siblings(".status-preview")
      .children("div")
      .hide();
  });

  if (HomePageUrl !== url && HomePageUrl !== "") {
    // console.log(HomePageUrl + "  HomePageUrl !==url  " + url);

    $(".InnerPageHidden").hide();
  } else {
    // console.log(HomePageUrl + "  HomePageUrl == url  " + url);
    $(".InnerPageHidden").show();
  }
}

function NewSearch() {
  $("#CheckSiteSEOContainer").hide();
  $("#responseFailureMsg").show();
  $("#finalUrl").html("");
  $("#dateTim").html("");
  //   progressBar(0, 0);
  $(".failed_val").html(`${0}`);
  $(".warning_val").html(`${0}`);
  $(".passed_val").html(`${0}`);
  $(".gn.progress-bar.bg-fail").css("width", 0 + "%");
  $(".gn.progress-bar.bg-warn").css("width", 0 + "%");
  $(".gn.progress-bar.bg-pass").css("width", 0 + "%");

  $(".progress-bar.red").css("width", GeneralScoreFailedPercent + "%");
  $(".progress-bar.yellow").css("width", GeneralScoreWarningPercent + "%");
  $(".progress-bar.green").css("width", GeneralScorePassedPercent + "%");

  $("#General .failed .ScoreValue").text(0);
  $("#General .warning .ScoreValue").text(0);
  $("#General .passed .ScoreValue").text(0);

  $("#commonSeoIssuesList .failed .ScoreValue").text(0);
  $("#commonSeoIssuesList .warning .ScoreValue").text(0);
  $("#commonSeoIssuesList .passed .ScoreValue").text(0);

  $("#speedOptimizationlist .failed .ScoreValue").text(0);
  $("#speedOptimizationlist .warning .ScoreValue").text(0);
  $("#speedOptimizationlist .passed .ScoreValue").text(0);

  $("#serverAndSecurity .failed .ScoreValue").text(0);
  $("#serverAndSecurity .warning .ScoreValue").text(0);
  $("#serverAndSecurity .passed .ScoreValue").text(0);

  $("#mobileUsability .failed .ScoreValue").text(0);
  $("#mobileUsability .warning .ScoreValue").text(0);
  $("#mobileUsability .passed .ScoreValue").text(0);

  $("#advancedSeo .failed .ScoreValue").text(0);
  $("#advancedSeo .warning .ScoreValue").text(0);
  $("#advancedSeo .passed .ScoreValue").text(0);

  $("#commonSeoIssuesDetails").empty();
  $("#commonSeoIssues").empty();
  Object.keys(CommonSeoIssuesObject).forEach((key) => {
    $("#commonSeoIssuesDetails").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        CommonSeoIssuesObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#commonSeoIssues").append(
      "<li id='List'" +
        key +
        " class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        CommonSeoIssuesObject[key] +
        "</a></li>"
    );
  });

  $("#speedOptimization_").empty();
  $("#speedOptimization").empty();
  Object.keys(SpeedOptimizationObject).forEach((key) => {
    $("#commonSeoIssuesDetails").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        SpeedOptimizationObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );
    $("#speedOptimization").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        SpeedOptimizationObject[key] +
        "</a></li>"
    );
  });


  $("#mobileUseablity").empty();
  $("#mobileUseablity_").empty();
  Object.keys(MobileUsabilityObject).forEach((key) => {
    $("#mobileUseablity").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        MobileUsabilityObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );

    $("#mobileUseablity_").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        MobileUsabilityObject[key] +
        "</a></li>"
    );
  });

  $("#advanceSeo").empty();
  $("#advanceSeo_").empty();
  Object.keys(AdvancedSeoObject).forEach((key) => {
    $("#advanceSeo").append(
      "<li id=" +
        key +
        "><div class='media Failed' id='issue-" +
        key +
        "'><label class='mr-3' >" +
        AdvancedSeoObject[key] +
        "</label><div class='media-body'><p class='Description'>Data not found!</p></div></div><hr /></li>"
    );

    $("#advanceSeo_").append(
      "<li id='List-" +
        key +
        "' class='list-item Failed'><a href='#issue-" +
        key +
        "'>" +
        AdvancedSeoObject[key] +
        "</a></li>"
    );
  });
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
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}
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

    // var AuditDescription = ResponseKey['description'];
    var AuditTitle = ResponseKey["title"];

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
      $("#issuesToFixHigh").append(
        '<div class="media"><span class="badge bg-danger min-80">High</span>&nbsp;<a href="#issue-' +
          AuditId +
          '"><i class="fa fa-link"></i></a><div class="media-body">' +
          AuditDescription +
          '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Hooray!"></i></div></div>'
      );
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
      $("#issuesToFixHigh").append(
        '<div class="media"><span class="badge bg-warning min-80">Medium</span>&nbsp;<a href="#issue-' +
          AuditId +
          '"><i class="fa fa-link"></i></a><div class="media-body">' +
          AuditDescription +
          '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Hooray!"></i></div></div>'
      );
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
      $("#issuesToFixHigh").append(
        '<div class="media"><span class="badge bg-success min-80">Low</span>&nbsp;<a href="#issue-' +
          AuditId +
          '"><i class="fa fa-link"></i></a><div class="media-body">' +
          AuditDescription +
          '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Hooray!"></i></div></div>'
      );
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
    var scoreClass = "";
    var scoreValue = "";
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
    if (AuditDescription !== undefined && AuditDescription !== "") {
      $("#issuesToFixHigh").append(
        '<div class="media"><span class="badge bg-' +
          scoreClass +
          ' min-80">' +
          scoreValue +
          '</span>&nbsp;<a href="#issue-' +
          AuditId +
          '"><i class="fa fa-link"></i></a><div class="media-body">' +
          AuditDescription +
          '<i  class="tooltipIcon fa fa-info-circle" data-bs-placement="left" data-bs-toggle="tooltip" title="Hooray!"></i></div></div>'
      );
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
// main live data api function start
function main_live_data(url) {
  $("#donut_spinner").show();
  $.ajax({
    type: "GET",
    //    url: "/site_audit/get_site_data/?project_id=1",
    url: "/site_audit/get_site_live_data/?url=" + url,
    dataType: "json", // expect html to be returned
    success: function (response) {
      $("#tb_loader").hide();
      // $(".tb_loader").hide();
      $("#pages_circle").show();
      if (response) {
        if (response.status) {
          $(".searchSpinner").hide();
          $(".clock").hide();
          $(".corevitalTabContent").show();
          $("#donut_spinner").hide();
          $("#big_images_count_loader").hide();
          $("#tb_loader").hide();
          $("#pages_circle").show();
          $(".seoHdg_spinner").hide();
          $(".health_spinner_web").hide();
          $("#big_images_count_loader").hide();
          $("#mainChart").show();
          //  $('.health_spinner_mobile').hide();
          $(".health-score").show();
          $(".health-score_web").show();
          $(".desktop_Health_circle").show();
          // $('.health_spinner').hide();
          $(".health_mobile_spinner").hide();
          $(".health_Desktop_spinner").hide();
          $(".p_spinner").hide();
          $(".loaderr").hide();
          // $('.imagesCount_spinner').hide();
          $(".count-main").show();
          $("#donut_spinner").hide();
          $(".rangeSliderMain").show();
          if (
            response.response_desktop.all_data.lighthouseResult !== undefined &&
            response.response_desktop.all_data.lighthouseResult !== ""
          ) {
            var userResponsive_Images_Count =
              response.response_desktop.all_data.lighthouseResult.audits[
                "uses-responsive-images"
              ].details.items.length;

            var unsized_images_count =
              response.response_desktop.all_data.lighthouseResult.audits[
                "unsized-images"
              ].details.items.length;

            var big_images_count =
              userResponsive_Images_Count + unsized_images_count;

            $("#big_images_count").html("");

            if (big_images_count > 0) {
              $("#big_images_count").html(`${big_images_count}`);
            } else {
              $("#big_images_count").html("ok");
            }
            // start new dashboard data
            $(".health_Desktop_spinner").hide();
            $(".health-score").show();

            if (
              response.response_desktop.all_data.lighthouseResult !== undefined
            ) {
              var destop_response = response.response_desktop.all_data;
              $("#donut_spinner_desktop").hide();
              $(".desktop .box").removeClass("yellow");
              $(".desktop .status-btn").removeClass("bg-yellow");
              $(".desktop .box").removeClass("green");
              $(".desktop .status-btn").removeClass("bg-green");
              $(".desktop .box").removeClass("red");
              $(".desktop .status-btn").removeClass("bg-red");
              $(".desktop-text").removeClass("text-red");
              $(".desktop-text").removeClass("text-yellow");
              $(".desktop-text").removeClass("text-green");

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
                    $("#desktop_web_result").prepend(
                      `${destop_web_performance} %`
                    );
                    if (
                      destop_web_performance >= yellow_lower_range &&
                      destop_web_performance <= yellow_upper_range
                    ) {
                      $(".desktop .box").addClass("yellow");
                      $(".desktop .status-btn").addClass("bg-yellow");
                      $(".desktop .status-btn").text("Average");
                      $(".desktop-text").addClass("text-yellow");
                      $("#desktop_icon").html("");
                      $("#desktop_icon").html(
                        "<i class='fa fa-desktop fa-2x'></i>"
                      );
                      $(".health_Desktop_spinner").hide();
                      $(".desktop_Health_circle").circleProgress({
                        value: destop_web_performance / 100,
                        size: 130,
                        fill: "#ffc107",
                      });
                    } else if (
                      destop_web_performance >= red_lower_range &&
                      destop_web_performance <= red_upper_range
                    ) {
                      $(".desktop .box").addClass("red");
                      $(".desktop .status-btn").addClass("bg-red");
                      $(".desktop .status-btn").text("Poor");
                      $(".desktop-text").addClass("text-red");
                      $("#desktop_icon").html("");
                      $("#desktop_icon").html(
                        "<i class='fa fa-desktop fa-2x'></i>"
                      );
                      $(".health_Desktop_spinner").hide();
                      $(".desktop_Health_circle").circleProgress({
                        value: destop_web_performance / 100,
                        size: 130,
                        fill: "#eb4335",
                      });
                    } else if (
                      destop_web_performance >= green_lower_range &&
                      destop_web_performance <= green_upper_range
                    ) {
                      $(".desktop .box").addClass("green");
                      $(".desktop .status-btn").addClass("bg-green");
                      $(".desktop .status-btn").text("Good");
                      $(".desktop-text").addClass("text-green");
                      $("#desktop_icon").html("");
                      $("#desktop_icon").html(
                        "<i class='fa fa-desktop fa-2x'></i>"
                      );
                      $(".health_Desktop_spinner").hide();
                      $(".desktop_Health_circle").circleProgress({
                        value: destop_web_performance / 100,
                        size: 130,
                        fill: "#75b765",
                      });
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
            $(".health_spinner_web .spinner-border").hide();
            $(".health_mobile_spinner .spinner-border").hide();
            $(".health_mobile_spinner").html("No data found");
            $(".health_Desktop_spinner .spinner-border").hide();
            $(".health_Desktop_spinner").html("No data found");

            $(".health_spinner_web").html("No data found");

            ShowNoty("Performance data not found", "error");
          }
          // chnages mobile to desktop start
          var resposnseDesktopData = "";

          if (
            response &&
            response.response_desktop &&
            response.response_desktop.all_data &&
            response.response_desktop.all_data.lighthouseResult !== undefined
          ) {
            resposnseDesktopData =
              response &&
              response.response_desktop &&
              response.response_desktop.all_data;
            $(".p_spinner_cls_desktop").show();
            $(".p_spinner_desktop").hide();
            $(".percent_spinner").hide();
            // $(mobile_speed_state).html("");
            var speedIndex =
              response &&
              response.response_desktop &&
              response.response_desktop.all_data &&
              response.response_desktop.all_data.lighthouseResult &&
              response.response_desktop.all_data.lighthouseResult.audits[
                "speed-index"
              ]["displayValue"];

            var totalBlockTime =
              resposnseDesktopData &&
              resposnseDesktopData["lighthouseResult"]["audits"][
                "total-blocking-time"
              ].displayValue;
            var largestContenFullPaint =
              resposnseDesktopData &&
              resposnseDesktopData["lighthouseResult"]["audits"][
                "largest-contentful-paint"
              ].displayValue;
            var cumulativeLayoutShift =
              resposnseDesktopData &&
              resposnseDesktopData["lighthouseResult"]["audits"][
                "cumulative-layout-shift"
              ].displayValue;
            var firstcontentfulpaint =
              resposnseDesktopData &&
              resposnseDesktopData["lighthouseResult"]["audits"][
                "first-contentful-paint"
              ].displayValue;
            var interactive =
              resposnseDesktopData &&
              resposnseDesktopData["lighthouseResult"]["audits"]["interactive"]
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
            $(".speed_ind_bar").removeClass("bg-light-red");
            $(".speed_ind_bar").removeClass("bg-light-green");
            $(".speed_ind_bar").removeClass("bg-light-yellow");
            // speed index
            $(tooltipTitle_si).removeClass("bg-dark-red,bg-green,bg-yellow");
            if (
              speedIndex >= speedIndex_lowerRange &&
              speedIndex <= speedIndex_middleRange
            ) {
              passCount++;
              $("#si_status_desktop").append(`${goodScore}`);
              $("#si_status_desktop").css("color", goodColor);
              $("#si_desktop").css("color", goodColor);
              $(si_infoIconBackground).css("color", goodColor);
              $(si_infoIconBackground).css("background", goodIconColor);
              $(".speed_ind_bar").addClass("bg-light-green");
              $("#tooltipTitle_si_desktop").attr("title", `${speedIndex}s`);
              $("#tooltipTitle_si_desktop").addClass("bg-green");
            } else if (
              speedIndex > speedIndex_middleRange &&
              speedIndex <= speedIndex_upperRange
            ) {
              warnCount++;
              $("#si_status_desktop").append(`${improvementScore}`);
              $("#si_status_desktop").css("color", improvementColor);
              $("#si_desktop").css("color", improvementColor);
              $(si_infoIconBackground).css("color", improvementColor);
              $(si_infoIconBackground).css("background", warnIconColor);
              $(".speed_ind_bar").addClass("bg-light-yellow");
              $("#tooltipTitle_si_desktop").attr("title", `${speedIndex}s`);
              $("#tooltipTitle_si_desktop").addClass("bg-yellow");
            } else if (speedIndex > speedIndex_upperRange) {
              failCount++;
              $(speedIndexID).css("background", "#ffd9d9");
              $("#si_status_desktop").append(poorScore);
              $("#si_status_desktop").css("color", poorColor);
              $("#si_desktop").css("color", poorColor);
              $(si_infoIconBackground).css("color", poorColor);
              $(si_infoIconBackground).css("background", poorIconColor);
              $(".speed_ind_bar").addClass("bg-light-red");
              $("#tooltipTitle_si_desktop").attr("title", `${speedIndex}s`);
              $("#tooltipTitle_si_desktop").addClass("bg-dark-red");
            }
            // TBT
            $(".tbt_bar").removeClass("bg-light-red");
            $(".tbt_bar").removeClass("bg-light-green");
            $(".tbt_bar").removeClass("bg-light-yellow");
            if (
              totalBlockTime >= tbt_lowerRange &&
              totalBlockTime < tbt_middleRange
            ) {
              passCount++;
              $("#tbt_status_desktop").append(goodScore);
              $("#tbt_status_desktop").css("color", goodColor);
              $(tbt_infoIconBackground).css("color", goodColor);
              $("#tbt_desktop").css("color", goodColor);
              $(tbt_infoIconBackground).css("background", goodIconColor);
              $(".tbt_bar").addClass("bg-light-green");
              $("#tooltipTitle_tbt_desktop").attr(
                "title",
                `${totalBlockTime}ms`
              );
              $("#tooltipTitle_tbt_desktop").addClass("bg-green");
            } else if (
              totalBlockTime >= tbt_middleRange &&
              totalBlockTime < tbt_upperRange
            ) {
              warnCount++;
              $("#tbt_status_desktop").append(improvementScore);
              $("#tbt_status_desktop").css("color", improvementColor);
              $(tbt_infoIconBackground).css("color", improvementColor);
              $(tbt_infoIconBackground).css("background", warnIconColor);
              $("#tbt_desktop").css("color", improvementColor);

              $(".tbt_bar").addClass("bg-light-yellow");
              $("#tooltipTitle_tbt_desktop").attr(
                "title",
                `${totalBlockTime} ms`
              );
              $("#tooltipTitle_tbt_desktop").addClass("bg-light-orange");
            } else if (totalBlockTime > tbt_upperRange) {
              failCount++;
              $("#tooltipTitle_tbt_desktop").addClass("bg-dark-red");
              $("#tbt_status_desktop").append(poorScore);
              $("#tbt_status_desktop").css("color", poorColor);
              $(tbt_infoIconBackground).css("color", poorColor);
              $(tbt_infoIconBackground).css("background", poorIconColor);
              $("#tbt_desktop").css("color", poorColor);

              $(".tbt_bar").addClass("bg-light-red");
              $("#tooltipTitle_tbt_desktop").attr(
                "title",
                `${totalBlockTime} ms`
              );
            }

            // lcp

            $(".lcp_bar").removeClass("bg-light-red");
            $(".lcp_bar").removeClass("bg-light-green");
            $(".lcp_bar").removeClass("bg-light-yellow");
            if (
              parseFloat(lcp_convertedValue) >= lcp_lowerRange &&
              parseFloat(lcp_convertedValue) < lcp_middleRange
            ) {
              passCount++;
              $("#lcp_status_desktop").append(goodScore);
              $("#lcp_status_desktop").css("color", goodColor);
              $("#lcp_desktop").css("color", goodColor);
              $(lcp_infoIconBackground).css("color", goodColor);
              $(lcp_infoIconBackground).css("background", goodIconColor);
              $(".lcp_bar").addClass("bg-light-green");
              $("#tooltipTitle_lcp_desktop").attr(
                "title",
                `${lcp_convertedValue} ms`
              );
              $("#tooltipTitle_lcp_desktop").addClass("bg-green");
            } else if (
              parseFloat(lcp_convertedValue) >= lcp_middleRange &&
              parseFloat(lcp_convertedValue) <= lcp_upperRange
            ) {
              warnCount++;

              $("#lcp_status_desktop").append(improvementScore);
              $("#lcp_status_desktop").css("color", improvementColor);
              $("#lcp_desktop").css("color", improvementColor);
              $(lcp_infoIconBackground).css("color", improvementColor);
              $(lcp_infoIconBackground).css("background", warnIconColor);
              $(".lcp_bar").addClass("bg-light-yellow");

              $("#tooltipTitle_lcp_desktop").attr(
                "title",
                `${lcp_convertedValue} ms`
              );
              $("#tooltipTitle_lcp_desktop").addClass("bg-yellow");
            } else {
              failCount++;

              $("#lcp_status_desktop").append(poorScore);
              $("#lcp_status_desktop").css("color", poorColor);
              $("#lcp_desktop").css("color", poorColor);
              $(lcp_infoIconBackground).css("color", poorColor);
              $(lcp_infoIconBackground).css("background", poorIconColor);
              $(".lcp_bar").addClass("bg-light-red");

              $("#tooltipTitle_lcp_desktop").attr(
                "title",
                `${lcp_convertedValue} ms`
              );
              $("#tooltipTitle_lcp_desktop").addClass("bg-dark-red");
            }
            // cls
            $(".cls_bar").removeClass("bg-light-red");
            $(".cls_bar").removeClass("bg-light-green");
            $(".cls_bar").removeClass("bg-light-yellow");
            if (
              parseFloat(cumulativeLayoutShift) >= cls_lowerRange &&
              parseFloat(cumulativeLayoutShift) < cls_middleRange
            ) {
              passCount++;
              $("#cls_status_desktop").append(goodScore);
              $("#cls_status_desktop").css("color", goodColor);
              $("#cls_desktop").css("color", goodColor);
              $(cls_infoIconBackground).css("color", goodColor);
              $(cls_infoIconBackground).css("background", goodIconColor);
              $(".cls_bar").addClass("bg-light-green");
              $("#tooltipTitle_cls_desktop").attr(
                "title",
                `${cumulativeLayoutShift}`
              );
              $("#tooltipTitle_cls_desktop").addClass("bg-green");
            } else if (
              parseFloat(cumulativeLayoutShift) >= cls_middleRange &&
              parseFloat(cumulativeLayoutShift) <= cls_upperRange
            ) {
              warnCount++;
              $("#cls_status_desktop").append(improvementScore);
              $("#cls_status_desktop").css("color", improvementColor);
              $("#cls_desktop").css("color", improvementColor);
              $(cls_infoIconBackground).css("color", improvementColor);
              $(cls_infoIconBackground).css("background", warnIconColor);
              $(".cls_bar").addClass("bg-light-yellow");
              $("#tooltipTitle_cls_desktop").attr(
                "title",
                `${cumulativeLayoutShift}`
              );
              $("#tooltipTitle_cls_desktop").addClass("bg-yellow");
            } else if (parseFloat(cumulativeLayoutShift) > cls_upperRange) {
              failCount++;
              $("#cls_status_desktop").append(poorScore);
              $("#cls_status_desktop").css("color", poorColor);
              $("#cls_desktop").css("color", poorColor);
              $(cls_infoIconBackground).css("color", poorColor);
              $(cls_infoIconBackground).css("background", poorIconColor);
              $(".cls_bar").addClass("bg-light-red");
              $("#tooltipTitle_cls_desktop").attr(
                "title",
                `${cumulativeLayoutShift}`
              );
              $("#tooltipTitle_cls_desktop").addClass("bg-dark-red");
            }
            // fcp
            $(".fcp_bar").removeClass("bg-light-red");
            $(".fcp_bar").removeClass("bg-light-green");
            $(".fcp_bar").removeClass("bg-light-yellow");
            if (
              parseFloat(firstcontentfulpaint) >= fcp_lowerRange &&
              parseFloat(firstcontentfulpaint) < fcp_middleRange
            ) {
              passCount++;

              $("#fcp_status_desktop").append(goodScore);
              $("#fcp_status_desktop").css("color", goodColor);
              $("#fcp_desktop").css("color", goodColor);

              $(fcp_infoIconBackground).css("color", goodColor);
              $(fcp_infoIconBackground).css("background", goodIconColor);
              $(".fcp_bar").addClass("bg-light-green");
              $("#tooltipTitle_fcp_desktop").attr(
                "title",
                `${firstcontentfulpaint} sec`
              );
              $("#tooltipTitle_fcp_desktop").addClass("bg-green");
            } else if (
              parseFloat(firstcontentfulpaint) >= fcp_middleRange &&
              parseFloat(firstcontentfulpaint) <= fcp_upperRange
            ) {
              warnCount++;

              $("#fcp_status_desktop").append(improvementScore);
              $("#fcp_status_desktop").css("color", improvementColor);
              $("#fcp_desktop").css("color", improvementColor);

              $(fcp_infoIconBackground).css("color", improvementColor);
              $(fcp_infoIconBackground).css("background", warnIconColor);
              $(".fcp_bar").addClass("bg-light-yellow");

              $("#tooltipTitle_fcp_desktop").attr(
                "title",
                `${firstcontentfulpaint}sec`
              );
              $("#tooltipTitle_fcp_desktop").addClass("bg-yellow");
            } else if (parseFloat(firstcontentfulpaint) > fcp_upperRange) {
              failCount++;
              $("#fcp_status_desktop").append(poorScore);
              $("#fcp_status_desktop").css("color", poorColor);
              $("#fcp_desktop").css("color", poorColor);
              $(fcp_infoIconBackground).css("color", poorColor);
              $(fcp_infoIconBackground).css("background", poorIconColor);
              $(".fcp_bar").addClass("bg-light-red");
              $("#tooltipTitle_fcp_desktop").attr(
                "title",
                `${firstcontentfulpaint}sec`
              );
              $("#tooltipTitle_fcp_desktop").addClass("bg-dark-red");
            }
            // TTI
            $(".tti_bar").removeClass("bg-light-red");
            $(".tti_bar").removeClass("bg-light-green");
            $(".tti_bar").removeClass("bg-light-yellow");
            if (
              parseFloat(interactive) >= tti_lowerRange &&
              parseFloat(interactive) <= tti_middleRange
            ) {
              passCount++;
              $("#tti_status_desktop").append(goodScore);
              $("#tti_status_desktop").css("color", goodColor);
              $("#tti_desktop").css("color", goodColor);
              $(tti_infoIconBackground).css("color", goodColor);
              $(tti_infoIconBackground).css("background", goodIconColor);
              $(".tti_bar").addClass("bg-light-green");
              $("#tooltipTitle_tti_desktop").attr("title", `${interactive}s`);
              $("#tooltipTitle_tti_desktop").addClass("bg-green");
            } else if (
              parseFloat(interactive) > tti_middleRange &&
              parseFloat(interactive) <= tti_upperRange
            ) {
              warnCount++;
              $("#tti_status_desktop").append(improvementScore);
              $("#tti_status_desktop").css("color", improvementColor);
              $("#tti_desktop").css("color", improvementColor);
              $(tti_infoIconBackground).css("color", improvementColor);
              $(tti_infoIconBackground).css("background", warnIconColor);
              $(".tti_bar").addClass("bg-light-yellow");
              $("#tooltipTitle_tti_desktop").attr("title", `${interactive}s`);
              $("#tooltipTitle_tti_desktop").addClass("bg-yellow");
            } else if (parseFloat(interactive) >= tti_upperRange) {
              failCount++;

              $("#tti_status_desktop").append(poorScore);
              $("#tti_status_desktop").css("color", poorColor);
              $("#tti_desktop").css("color", poorColor);
              $(tti_infoIconBackground).css("color", poorColor);
              $(tti_infoIconBackground).css("background", poorIconColor);
              $(".tti_bar").addClass("bg-light-red");
              $("#tooltipTitle_tti_desktop").attr("title", `${interactive}s`);
              $("#tooltipTitle_tti_desktop").addClass("bg-dark-red");
            }

            // more details doughnuts chart
            $("#si_desktop").append(`${speedIndex}s`);
            $("#tbt_desktop").append(`${totalBlockTime} ms`);
            $("#lcp_desktop").append(`${largestContenFullPaint}`);
            $("#cls_desktop").append(`${cumulativeLayoutShift}`);
            $("#fcp_desktop").append(`${firstcontentfulpaint}s`);
            $("#tti_desktop").append(`${interactive}s`);

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
                convertedValue: Number(cumulativeLayoutShift * 1000),
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
              $(".indicator_desktop_" + i).css(
                "left",
                offSet >= 100 ? "98%" : offSet <= 0 ? "1%" : `${offSet}%`
              );

              $(".percentage_desktop_" + i).html(
                offSet >= 100
                  ? "98%"
                  : offSet.toFixed(1) <= 0
                  ? "1%"
                  : `${offSet.toFixed(1)}%`
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
            var yValues = [30, 25, 15, 10, 10, 10];
            var barColors = [
              "#eb4335",
              "#ffc107",
              "#FF6843",
              "#75b765",
              "#167ee6",
              "#707070",
            ];

            new Chart("mainChartDesktop", {
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
                responsive: true,
                aspectRatio: 1,
                maintainAspectRatio: false,
                rotation: 40,
              },
            });

            $("#scoreDonutChartDesktop").html("");
            $("#scoreDonutChartDesktop").append(`${destop_web_performance}%`);

            $(passStatus).append(`${passCount}`);
            $(warnStatus).append(`${warnCount}`);
            $(failStatus).append(`${failCount}`);
          } else {
            setTimeout(() => {
              $(".health_spinner").html("not found");
            }, 1000);

            console.log(response.error);
          }
          var resposnseDesktopData = "";

          if (
            response &&
            response.response_desktop &&
            response.response_desktop.all_data !== undefined
          ) {
            resposnseDesktopData =
              response &&
              response.response_desktop &&
              response.response_desktop.all_data;
            // console.log(response.response_mobile.all_data['lighthouseResult']['categories']['performance']['score']*100,'response.response_mobile.all_data')
            var performanceDesktop =
              response &&
              response.response_desktop &&
              response.response_desktop.all_data &&
              response.response_desktop.all_data.lighthouseResult &&
              response.response_desktop.all_data.lighthouseResult.categories &&
              response.response_desktop.all_data.lighthouseResult.categories
                .performance &&
              response.response_desktop.all_data.lighthouseResult.categories
                .performance.score;
            // website rank mobile chart start

            // website rank mobile chart end
            var color = "";

            if (
              performanceDesktop * 100 >= 90 &&
              performanceDesktop * 100 <= 100
            ) {
              color = goodColor;
              $("#desktop_strong").css("color", goodColor);
              $("#si_status_overview_desktop").append(goodScore);
              $("#si_status_overview_desktop").css("color", goodColor);
            } else if (
              performanceDesktop * 100 >= 50 &&
              performanceDesktop * 100 < 90
            ) {
              color = improvementColor;
              $("#desktop_strong").css("color", improvementColor);
              $("#si_status_overview_desktop").append(improvementScore);
              $("#si_status_overview_desktop").css("color", improvementColor);
            } else if (
              performanceDesktop * 100 >= 0 &&
              performanceDesktop * 100 < 50
            ) {
              color = poorColor;
              $("#desktop_strong").css("color", poorColor);
              $("#si_status_overview_desktop").append(poorScore);
              $("#si_status_overview_desktop").css("color", poorColor);
            }
            $("#overview_spinner_desktop").hide();
            $("#desktop_strong").show();
            var progressBarOptions = {
              startAngle: -400.55,
              size: 100,
              thickness: 15,
              value: performanceDesktop,
              fill: {
                color: color,
                filter: "drop-shadow(0 2px 7px rgba(0,172,69,.45));",
              },
            };
            $(".desktop_strong").html("");
            $(".desktop_overview")
              .circleProgress(progressBarOptions)
              .on(
                "circle-animation-progress",
                function (event, progress, stepValue) {
                  if (stepValue >= 1) {
                    stepValue = 100;
                    $(this).find(".desktop_strong").text(stepValue);
                  } else {
                    $(this)
                      .find(".desktop_strong")
                      .text(String(stepValue.toFixed(2)).substr(2));
                  }
                }
              );
            var progressBarOptions = {
              startAngle: -400.55,
              size: 40,
              thickness: 6,
              value: performanceDesktop,
              fill: {
                color: color,
              },
            };
            $(".desktop_overview")
              .circleProgress(progressBarOptions)
              .on(
                "circle-animation-progress",
                function (event, progress, stepValue) {
                  $("#desktop_strong").text(
                    String(stepValue.toFixed(2)).substr(2)
                  );
                }
              );
          }
          if (response.page_data_dict.site_map_url !== undefined) {
            responseSitemap = response.page_data_dict.site_map_url;
            $(".site_map_spinner").html("");
            $(sitemapState).text("Detected");
          } else {
            $(".site_map_spinner").html("");

            $(sitemapState).text("Not Detected");
          }
          // changes for mobile to desktop end
          // script.js code start for mobile
          if (
            response &&
            response.response_mobile &&
            response.response_mobile.all_data !== undefined
          ) {
            var mobile_response =
              response &&
              response.response_mobile &&
              response.response_mobile.all_data;
            if (
              mobile_response &&
              mobile_response.lighthouseResult !== undefined &&
              mobile_response &&
              mobile_response.lighthouseResult !== ""
            ) {
              $(".mobile_text").removeClass("text-red");
              $(".mobile_text").removeClass("text-yellow");
              $(".mobile_text").removeClass("text-green");

              var mobile_main_response =
                mobile_response &&
                mobile_response.lighthouseResult &&
                mobile_response.lighthouseResult.categories;
              if (
                mobile_main_response.performance !== undefined &&
                mobile_main_response !== ""
              ) {
                var mobile_web_performance_score =
                  mobile_main_response &&
                  mobile_main_response["performance"]["score"];

                var mobile_web_performance = Math.ceil(
                  mobile_web_performance_score * 100
                );
                // mobile chart
                if (
                  mobile_web_performance !== "" &&
                  mobile_web_performance !== undefined
                ) {
                  $("#mobile_web_result").html(`${mobile_web_performance} %`);
                  if (
                    mobile_web_performance >= yellow_lower_range &&
                    mobile_web_performance <= yellow_upper_range
                  ) {
                    $(".mobile_chart .box").addClass("yellow");
                    $(".mobile_chart .status-btn").addClass("bg-yellow");
                    $(".mobile_chart .status-btn").text("Average");
                    $(".mobile_text").addClass("text-yellow");
                    $("#mobile_icon").html("");

                    $("#mobile_icon").html(
                      "<i class='lni lni-mobile iconsize'></i>"
                    );
                    $(".health_mobile_spinner").hide();
                    $(".mobile_Health_circle").circleProgress({
                      value: mobile_web_performance / 100,
                      size: 130,
                      fill: "#ffc107",
                    });
                    $(".mobile_loader").hide();
                    $("#mobile_score_").append(`${mobile_web_performance}`);
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
                    $(".mobile_chart .box").addClass("red");
                    $(".mobile_chart .status-btn").addClass("bg-red");
                    $(".mobile_chart .status-btn").text("Poor");
                    $(".mobile_text").addClass("text-red");
                    $("#mobile_icon").html("");

                    $("#mobile_icon").html(
                      "<i class='lni lni-mobile iconsize'></i>"
                    );
                    $(".health_mobile_spinner").hide();
                    $(".mobile_Health_circle").circleProgress({
                      value: mobile_web_performance / 100,
                      size: 130,
                      fill: "#eb4335",
                    });
                    $(".mobile_loader").hide();

                    $("#mobile_score_").append(`${mobile_web_performance}`);
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
                    $(".mobile_chart .box").addClass("green");
                    $(".mobile_chart .status-btn").addClass("bg-green");
                    $(".mobile_chart .status-btn").text("Good");
                    $(".mobile_text").addClass("text-green");
                    $("#mobile_icon").html("");

                    $("#mobile_icon").html(
                      "<i class='lni lni-mobile iconsize'></i>"
                    );
                    $(".health_mobile_spinner").hide();
                    $(".mobile_Health_circle").circleProgress({
                      value: mobile_web_performance / 100,
                      size: 130,
                      fill: "#75b765",
                    });
                    $(".mobile_loader").hide();
                    $("#mobile_score_").append(`${mobile_web_performance}`);
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
          if (response.status) {
            var resposnseMobileData = "";
            if (
              response.response_mobile !== undefined &&
              response.response_mobile.all_data !== undefined
            ) {
              resposnseMobileData =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data;
            }
            var finalUrl = "";
            if (resposnseMobileData.lighthouseResult !== undefined) {
              finalUrl =
                resposnseMobileData &&
                resposnseMobileData.lighthouseResult &&
                resposnseMobileData.lighthouseResult.finalUrl;
            }
            // for ssl certificate
            var ssl_certificate = "";

            if (resposnseMobileData.lighthouseResult !== undefined) {
              ssl_certificate =
                resposnseMobileData.lighthouseResult.audits["is-on-https"][
                  "score"
                ];
            }

            $(".loader").html("");

            // corevitals
            var resposnseMobileData = "";

            if (
              response.response_mobile.all_data !== undefined &&
              response.response_mobile.all_data.lighthouseResult !== undefined
            ) {
              resposnseMobileData =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data;
              $(".p_spinner_cls").show();
              $(".p_spinner").hide();
              $(".percent_spinner").hide();
              // $(mobile_speed_state).html("");
              var speedIndex =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data &&
                response.response_mobile.all_data.lighthouseResult &&
                response.response_mobile.all_data.lighthouseResult.audits[
                  "speed-index"
                ]["displayValue"];

              var totalBlockTime =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "total-blocking-time"
                ].displayValue;
              var largestContenFullPaint =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "largest-contentful-paint"
                ].displayValue;
              var cumulativeLayoutShift =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "cumulative-layout-shift"
                ].displayValue;
              var firstcontentfulpaint =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "first-contentful-paint"
                ].displayValue;
              var interactive =
                resposnseMobileData &&
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
                  convertedValue: Number(cumulativeLayoutShift * 1000),
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
                  offSet >= 100
                    ? "98%"
                    : offSet.toFixed(1) <= 0
                    ? "1%"
                    : `${offSet.toFixed(1)}%`
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
              var yValues = [30, 25, 15, 10, 10, 10];
              var barColors = [
                "#eb4335",
                "#ffc107",
                "#FF6843",
                "#75b765",
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
                    display: false,
                  },
                  responsive: true,
                  aspectRatio: 1,
                  maintainAspectRatio: false,
                  rotation: 40,
                },
              });

              $("#scoreDonutChart").html("");
              $("#scoreDonutChart").append(`${mobile_web_performance}%`);
              $(passStatus).append(`${passCount}`);
              $(warnStatus).append(`${warnCount}`);
              $(failStatus).append(`${failCount}`);
            } else {
              setTimeout(() => {
                $(".health_spinner").html("not found");
              }, 1000);

              console.log(response.error);
            }
            var resposnseMobileData = "";

            if (
              response.response_mobile !== undefined &&
              response.response_mobile.all_data !== undefined
            ) {
              resposnseMobileData = response.response_mobile.all_data;
              var performance =
                response.response_mobile.all_data.lighthouseResult.categories
                  .performance.score;

              $("#overview_spinner").hide();
              $("#mobile_strong").show();
              var progressBarOptions = {
                startAngle: -400.55,
                size: 100,
                thickness: 15,
                value: performance,
                fill: {
                  color: color,
                  filter: "drop-shadow(0 2px 7px rgba(0,172,69,.45));",
                },
              };
              $(".strong").html("");
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
                size: 40,
                thickness: 6,
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
                    $("#mobile_strong").text(
                      String(stepValue.toFixed(2)).substr(2)
                    );
                  }
                );
           
            }
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
                resposnsewebsite_seo_data &&
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
            var tooltipList =
              tooltipTriggerList &&
              tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
              });
            var resposnseMobileData = "";
            if (
              response.response_mobile !== undefined &&
              response.response_mobile.all_data !== undefined
            ) {
              resposnseMobileData = response.response_mobile.all_data;
            }
            var finalUrl = "";
            if (resposnseMobileData.lighthouseResult !== undefined) {
              finalUrl = resposnseMobileData.lighthouseResult.finalUrl;
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
            $(".loader").html("");
            // corevitals
            var resposnseMobileData = "";

            if (
              response.response_mobile !== undefined &&
              response.response_mobile.all_data !== undefined
            ) {
              resposnseMobileData =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data;
              $(mobile_speed_state).html("");
              // console.log(resposnseMobileData['lighthouseResult']['audits']['speed-index'].displayValue,'resposnseMobileData')
              var speedIndex =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data.lighthouseResult.audits[
                  "speed-index"
                ]["displayValue"];

              var totalBlockTime =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "total-blocking-time"
                ].displayValue;
              var largestContenFullPaint =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "largest-contentful-paint"
                ].displayValue;
              var cumulativeLayoutShift =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "cumulative-layout-shift"
                ].displayValue;
              var firstcontentfulpaint =
                resposnseMobileData &&
                resposnseMobileData["lighthouseResult"]["audits"][
                  "first-contentful-paint"
                ].displayValue;
              var interactive =
                resposnseMobileData &&
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
              $(".speed_ind_bar").removeClass("bg-light-red");
              $(".speed_ind_bar").removeClass("bg-light-green");
              $(".speed_ind_bar").removeClass("bg-light-yellow");
              // speed index
              $(tooltipTitle_si).removeClass("bg-dark-red,bg-green,bg-yellow");
              if (
                speedIndex >= speedIndex_lowerRange &&
                speedIndex <= speedIndex_middleRange
              ) {
                passCount++;
                $(si_status).append(`${goodScore}`);
                $(si_status).css("color", goodColor);
                $("#si").css("color", goodColor);
                $(si_infoIconBackground).css("color", goodColor);
                $(si_infoIconBackground).css("background", goodIconColor);
                $(".speed_ind_bar").addClass("bg-light-green");
                $(tooltipTitle_si).attr("title", `${speedIndex}s`);
                $(tooltipTitle_si).addClass("bg-green");
              } else if (
                speedIndex > speedIndex_middleRange &&
                speedIndex <= speedIndex_upperRange
              ) {
                warnCount++;
                $(si_status).append(`${improvementScore}`);
                $(si_status).css("color", improvementColor);
                $("#si").css("color", improvementColor);
                $(si_infoIconBackground).css("color", improvementColor);
                $(si_infoIconBackground).css("background", warnIconColor);
                $(".speed_ind_bar").addClass("bg-light-yellow");
                $(tooltipTitle_si).attr("title", `${speedIndex}s`);
                $(tooltipTitle_si).addClass("bg-yellow");
              } else if (speedIndex > speedIndex_upperRange) {
                failCount++;
                $(speedIndexID).css("background", "#ffd9d9");
                $(si_status).append(poorScore);
                $(si_status).css("color", poorColor);
                $("#si").css("color", poorColor);
                $(si_infoIconBackground).css("color", poorColor);
                $(si_infoIconBackground).css("background", poorIconColor);
                $(".speed_ind_bar").addClass("bg-light-red");
                $(tooltipTitle_si).attr("title", `${speedIndex}s`);
                $(tooltipTitle_si).addClass("bg-dark-red");
              }
              // TBT
              $(".tbt_bar").removeClass("bg-light-red");
              $(".tbt_bar").removeClass("bg-light-green");
              $(".tbt_bar").removeClass("bg-light-yellow");
              if (
                totalBlockTime >= tbt_lowerRange &&
                totalBlockTime < tbt_middleRange
              ) {
                passCount++;
                $(tbt_status).append(goodScore);
                $(tbt_status).css("color", goodColor);
                $(tbt_infoIconBackground).css("color", goodColor);
                $("#tbt").css("color", goodColor);
                $(tbt_infoIconBackground).css("background", goodIconColor);
                $(".tbt_bar").addClass("bg-light-green");
                $(tooltipTitle_tbt).attr("title", `${totalBlockTime}ms`);
                $(tooltipTitle_tbt).addClass("bg-green");
              } else if (
                totalBlockTime >= tbt_middleRange &&
                totalBlockTime < tbt_upperRange
              ) {
                warnCount++;
                $(tbt_status).append(improvementScore);
                $(tbt_status).css("color", improvementColor);
                $(tbt_infoIconBackground).css("color", improvementColor);
                $(tbt_infoIconBackground).css("background", warnIconColor);
                $("#tbt").css("color", improvementColor);

                $(".tbt_bar").addClass("bg-light-yellow");
                $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
                $(tooltipTitle_tbt).addClass("bg-light-orange");
              } else if (totalBlockTime > tbt_upperRange) {
                failCount++;
                $(tooltipTitle_tbt).addClass("bg-dark-red");
                $(tbt_status).append(poorScore);
                $(tbt_status).css("color", poorColor);
                $(tbt_infoIconBackground).css("color", poorColor);
                $(tbt_infoIconBackground).css("background", poorIconColor);
                $("#tbt").css("color", poorColor);

                $(".tbt_bar").addClass("bg-light-red");
                $(tooltipTitle_tbt).attr("title", `${totalBlockTime} ms`);
              }

              // lcp

              $(".lcp_bar").removeClass("bg-light-red");
              $(".lcp_bar").removeClass("bg-light-green");
              $(".lcp_bar").removeClass("bg-light-yellow");
              if (
                parseFloat(lcp_convertedValue) >= lcp_lowerRange &&
                parseFloat(lcp_convertedValue) < lcp_middleRange
              ) {
                passCount++;
                $(lcp_status).append(goodScore);
                $(lcp_status).css("color", goodColor);
                $("#lcp").css("color", goodColor);
                $(lcp_infoIconBackground).css("color", goodColor);
                $(lcp_infoIconBackground).css("background", goodIconColor);
                $(".lcp_bar").addClass("bg-light-green");
                $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
                $(tooltipTitle_lcp).addClass("bg-green");
              } else if (
                parseFloat(lcp_convertedValue) >= lcp_middleRange &&
                parseFloat(lcp_convertedValue) <= lcp_upperRange
              ) {
                warnCount++;

                $(lcp_status).append(improvementScore);
                $(lcp_status).css("color", improvementColor);
                $("#lcp").css("color", improvementColor);
                $(lcp_infoIconBackground).css("color", improvementColor);
                $(lcp_infoIconBackground).css("background", warnIconColor);
                $(".lcp_bar").addClass("bg-light-yellow");

                $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
                $(tooltipTitle_lcp).addClass("bg-yellow");
              } else {
                failCount++;

                $(lcp_status).append(poorScore);
                $(lcp_status).css("color", poorColor);
                $("#lcp").css("color", poorColor);
                $(lcp_infoIconBackground).css("color", poorColor);
                $(lcp_infoIconBackground).css("background", poorIconColor);
                $(".lcp_bar").addClass("bg-light-red");

                $(tooltipTitle_lcp).attr("title", `${lcp_convertedValue} ms`);
                $(tooltipTitle_lcp).addClass("bg-dark-red");
              }
              // cls
              $(".cls_bar").removeClass("bg-light-red");
              $(".cls_bar").removeClass("bg-light-green");
              $(".cls_bar").removeClass("bg-light-yellow");
              if (
                parseFloat(cumulativeLayoutShift) >= cls_lowerRange &&
                parseFloat(cumulativeLayoutShift) < cls_middleRange
              ) {
                passCount++;
                $(cls_status).append(goodScore);
                $(cls_status).css("color", goodColor);
                $("#cls").css("color", goodColor);
                $(cls_infoIconBackground).css("color", goodColor);
                $(cls_infoIconBackground).css("background", goodIconColor);
                $(".cls_bar").addClass("bg-light-green");
                $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
                $(tooltipTitle_cls).addClass("bg-green");
              } else if (
                parseFloat(cumulativeLayoutShift) >= cls_middleRange &&
                parseFloat(cumulativeLayoutShift) <= cls_upperRange
              ) {
                warnCount++;
                $(cls_status).append(improvementScore);
                $(cls_status).css("color", improvementColor);
                $("#cls").css("color", improvementColor);
                $(cls_infoIconBackground).css("color", improvementColor);
                $(cls_infoIconBackground).css("background", warnIconColor);
                $(".cls_bar").addClass("bg-light-yellow");
                $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
                $(tooltipTitle_cls).addClass("bg-yellow");
              } else if (parseFloat(cumulativeLayoutShift) > cls_upperRange) {
                failCount++;
                $(cls_status).append(poorScore);
                $(cls_status).css("color", poorColor);
                $("#cls").css("color", poorColor);
                $(cls_infoIconBackground).css("color", poorColor);
                $(cls_infoIconBackground).css("background", poorIconColor);
                $(".cls_bar").addClass("bg-light-red");
                $(tooltipTitle_cls).attr("title", `${cumulativeLayoutShift}`);
                $(tooltipTitle_cls).addClass("bg-dark-red");
              }
              // fcp
              $(".fcp_bar").removeClass("bg-light-red");
              $(".fcp_bar").removeClass("bg-light-green");
              $(".fcp_bar").removeClass("bg-light-yellow");
              if (
                parseFloat(firstcontentfulpaint) >= fcp_lowerRange &&
                parseFloat(firstcontentfulpaint) < fcp_middleRange
              ) {
                passCount++;

                $(fcp_status).append(goodScore);
                $(fcp_status).css("color", goodColor);
                $("#fcp").css("color", goodColor);

                $(fcp_infoIconBackground).css("color", goodColor);
                $(fcp_infoIconBackground).css("background", goodIconColor);
                $(".fcp_bar").addClass("bg-light-green");
                $(tooltipTitle_fcp).attr(
                  "title",
                  `${firstcontentfulpaint} sec`
                );
                $(tooltipTitle_fcp).addClass("bg-green");
              } else if (
                parseFloat(firstcontentfulpaint) >= fcp_middleRange &&
                parseFloat(firstcontentfulpaint) <= fcp_upperRange
              ) {
                warnCount++;

                $(fcp_status).append(improvementScore);
                $(fcp_status).css("color", improvementColor);
                $("#fcp").css("color", improvementColor);

                $(fcp_infoIconBackground).css("color", improvementColor);
                $(fcp_infoIconBackground).css("background", warnIconColor);
                $(".fcp_bar").addClass("bg-light-yellow");

                $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
                $(tooltipTitle_fcp).addClass("bg-yellow");
              } else if (parseFloat(firstcontentfulpaint) > fcp_upperRange) {
                failCount++;
                $(fcp_status).append(poorScore);
                $(fcp_status).css("color", poorColor);
                $("#fcp").css("color", poorColor);
                $(fcp_infoIconBackground).css("color", poorColor);
                $(fcp_infoIconBackground).css("background", poorIconColor);
                $(".fcp_bar").addClass("bg-light-red");
                $(tooltipTitle_fcp).attr("title", `${firstcontentfulpaint}sec`);
                $(tooltipTitle_fcp).addClass("bg-dark-red");
              }
              // TTI
              $(".tti_bar").removeClass("bg-light-red");
              $(".tti_bar").removeClass("bg-light-green");
              $(".tti_bar").removeClass("bg-light-yellow");
              if (
                parseFloat(interactive) >= tti_lowerRange &&
                parseFloat(interactive) <= tti_middleRange
              ) {
                passCount++;
                $(tti_status).append(goodScore);
                $(tti_status).css("color", goodColor);
                $("#tti").css("color", goodColor);
                $(tti_infoIconBackground).css("color", goodColor);
                $(tti_infoIconBackground).css("background", goodIconColor);
                $(".tti_bar").addClass("bg-light-green");
                $(tooltipTitle_tti).attr("title", `${interactive}s`);
                $(tooltipTitle_tti).addClass("bg-green");
              } else if (
                parseFloat(interactive) > tti_middleRange &&
                parseFloat(interactive) <= tti_upperRange
              ) {
                warnCount++;
                $(tti_status).append(improvementScore);
                $(tti_status).css("color", improvementColor);
                $("#tti").css("color", improvementColor);
                $(tti_infoIconBackground).css("color", improvementColor);
                $(tti_infoIconBackground).css("background", warnIconColor);
                $(".tti_bar").addClass("bg-light-yellow");
                $(tooltipTitle_tti).attr("title", `${interactive}s`);
                $(tooltipTitle_tti).addClass("bg-yellow");
              } else if (parseFloat(interactive) >= tti_upperRange) {
                failCount++;

                $(tti_status).append(poorScore);
                $(tti_status).css("color", poorColor);
                $("#tti").css("color", poorColor);
                $(tti_infoIconBackground).css("color", poorColor);
                $(tti_infoIconBackground).css("background", poorIconColor);
                $(".tti_bar").addClass("bg-light-red");
                $(tooltipTitle_tti).attr("title", `${interactive}s`);
                $(tooltipTitle_tti).addClass("bg-dark-red");
              }

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
                    display: false,
                  },
                  rotation: 40,
                  aspectRatio: 1,
                  maintainAspectRatio: false,
                },
              });
              $("#scoreDonutChart").html("");
              $("#scoreDonutChart").append(`${mobile_web_performance}%`);

              $(passStatus).append(`${passCount}`);
              $(warnStatus).append(`${warnCount}`);
              $(failStatus).append(`${failCount}`);
            } else {
              setTimeout(() => {
                $(".health_spinner").html("not found");
              }, 1000);

              console.log(response.error);
            }

            var resposnseMobileData = "";

            if (
              response.response_mobile !== undefined &&
              response.response_mobile.all_data !== undefined
            ) {
              resposnseMobileData =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data;
              // console.log(response.response_mobile.all_data['lighthouseResult']['categories']['performance']['score']*100,'response.response_mobile.all_data')
              var performance =
                response &&
                response.response_mobile &&
                response.response_mobile.all_data.lighthouseResult.categories
                  .performance.score;
              // website rank mobile chart start

              // website rank mobile chart end
              var color = "";

              if (performance * 100 >= 90 && performance * 100 <= 100) {
                color = goodColor;
                $(strongclass).css("color", goodColor);
                $(si_status_overview).append(goodScore);
                $(si_status_overview).css("color", goodColor);
              } else if (performance * 100 >= 50 && performance * 100 < 90) {
                color = improvementColor;
                $(strongclass).css("color", improvementColor);
                $(si_status_overview).append(improvementScore);
                $(si_status_overview).css("color", improvementColor);
              } else if (performance * 100 >= 0 && performance * 100 < 50) {
                color = poorColor;
                $(strongclass).css("color", poorColor);
                $(si_status_overview).append(poorScore);
                $(si_status_overview).css("color", poorColor);
              }

              var progressBarOptions = {
                startAngle: -400.55,
                size: 100,
                thickness: 15,
                value: performance,
                fill: {
                  color: color,
                  filter: "drop-shadow(0 2px 7px rgba(0,172,69,.45));",
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
                size: 40,
                thickness: 6,
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
                    $("#mobile_strong").text(
                      String(stepValue.toFixed(2)).substr(2)
                    );
                  }
                );
              // core vital
              if (performance * 100 >= 90) {
                $(mobile_speed_state).append(
                  performance * 100,
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
              } else if (performance * 100 >= 50 && performance * 100 <= 89) {
                $(".issue").append(
                  `We found some serious issues you may want to take a closer look at.`
                );
                $(".issue_p").append(
                  `To put it in context, about 53% of the websites we test score as Poor.`
                );

                $(mobile_speed_state).append(
                  performance * 100,
                  `/100 - 
              <br/>
              
              Stabl`
                );

                $("#mobile-speed").addClass("warning");

                $("#si_info-icon--background").css(
                  "color",
                  "rgba(251, 124, 56)"
                );
                $("#si_info-icon--background").css("background", "#fff2eb");
              } else if (performance * 100 >= 0 && performance * 100 <= 49) {
                $(".issue").append(
                  `We found some serious issues you may want to take a closer look at.`
                );
                $(".issue_p").append(
                  `To put it in context, about 53% of the websites we test score as Poor.`
                );
                $(mobile_speed_state).append(
                  performance * 100,
                  `/100 - 
              <br/>
              Poor`
                );
                $("#mobile-speed").addClass("danger");
                $("#si_info-icon--background").css(
                  "color",
                  "rgba(207, 19, 34)"
                );
                $("#si_info-icon--background").css("background", "#f6e3e4");
              }
              var p_ = performance * 100;
              if (p_ >= 0 && p_ <= 49) {
                $(".domain-title").html("");
                $("#mobile").addClass("text-danger");
                $(mobile_speed_state).addClass("text-danger");
                $(".domain-title")
                  .append(`Currently <span class="domain-name" style="margin-right: 3px ">&nbsp;${finalUrl}</span>
                                   <span>is categorized </span> as POOR in <span class="status-count" id="failStatus" style="margin: 0px 3px">&nbsp;${failCount}</span> out of 6
                                    Core
                                    Core
                                    Vitals tests`);
              } else if (p_ >= 50 && p_ <= 89) {
                $(".domain-title").html("");
                $("#mobile").addClass("text-warning");
                $(mobile_speed_state).addClass("text-warning");

                $(".domain-title")
                  .append(`Currently <span class="domain-name">&nbsp;${finalUrl}</span>
                                    is categorized as NEEDS IMPROVEMENT in <span class="status-count" id="warnStatus">&nbsp;${warnCount}</span> out of 6
                                    Core
                                    Vitals tests`);
              } else if (p_ >= 90) {
                $(".domain-title").html("");

                $(".domain-title")
                  .append(`Currently <span class="domain-name">&nbsp;${finalUrl}</span>
                                   passes all six of the Core Vitals tests. Congratulations! We will alert you if we detect any issues in the future.`);
              }
            }
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
                resposnsewebsite_seo_data &&
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
        $(".health_spinner_web").append("-");
        $(".health_spinner").append("-");
        $("#big_images_count").text("-");
        ShowNoty("504 Gateway Time-out", "error");
      }
    },
  });
}
$(document).on("click", "#searchUrlBtn", function () {
  $(".searchSpinner").show();
  var url = $("#Urlsearch").val();
  main_live_data(url);
});
