var selectedWebsiteId;
var membership = "free";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}


$(document).ready(function () {
  // add code from base2 start
  var selectedWebsiteId;
  var compi = setInterval(getCompi, 1000);
  function getCompi() {
    selectedWebsiteId = $(".radio :selected").first().attr("data-id");
    if (selectedWebsiteId !== undefined && selectedWebsiteId !== "") {
      clearInterval(compi);

      //calling AJAX of get competitors to append data of competitor's website
      $.ajax({
        url: "/site_audit/get_competitors/?project_id=" + selectedWebsiteId,
        type: "GET",
        success: function (response) {
          if (response.competitors && response.competitors.length > 0) {
            $(".menu-competitors-link").attr(
              "href",
              "/site_audit/competitors_step2/"
            );
            $("#select_competitor").empty();
            if ($("#select_competitor").length > 0) {
              var json = response.competitors;

              //appending selectbox options
              for (const key of Object.keys(json)) {
                $("#select_competitor").append(
                  "<option value=" +
                    json[key].id +
                    ">" +
                    json[key].i_website__website_url +
                    "</option>"
                );
              }
            }
          } else {
            $(".menu-competitors-link").attr(
              "href",
              "/site_audit/competitors/"
            );
          }
        },
        error: function (err) {
          console.log("Request failed, error= " + err);
        },
      });
    }
  }
  // add code from base2 end


  //get_country_languages function 
  Get_country_languages();
  var setInt = setInterval(get_conFnc, 1000);
  function get_conFnc() {
    selectedWebsite = $(".radio :selected").val();
    if (selectedWebsite != undefined && selectedWebsite != "") {
      clearInterval(setInt);
      Get_competitors();
      selectedWebsiteId = $(".radio :selected").first().attr("data-id");
      $("#select_competitor").on("change", function () {
        if (this.value != undefined) {
          $("#backLinksTable").DataTable().destroy();
          $("#anchorTextTable").DataTable().destroy();
          $("#keywordsTable").DataTable().destroy();
          Get_competitors();
        }
      });
    }
  }
  $(".nav-tabs .nav-item").click(function () {
    setTimeout(() => {
      VisibleColumns();
    }, "100");
  });
});
function Get_country_languages() {
  $.ajax({
    type: "GET",
    url: "/user_management/get_country_languages/",
    success: function (response) {
      if (response.status === true) {
        $(".CountrySelect").empty();
        $(".CountrySelect").html("<option></option>");
        var json = response.country_languages;
        var options = [];
        for (var i = 0; i < json.length; i++) {
          var obj = json[i];
          let country = obj.Country;
          let lang = obj.Language;
          let code = obj.code;
          options.push({
            id: code + "_" + country + "_" + lang,
            abbreviation: code,
            text: country + " / " + lang,
          });
        }

        //appending countries on selectbox 
        $(".CountrySelect").select2({
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
      $(".CountrySelect").val("us_United States_English").trigger("change");
    },
    error: function (response) {
      ShowNoty("error", "error");
    },
  });
}
function percentage(partialValue, totalValue) {
  return Math.round((100 * partialValue) / totalValue);
}


var get_comp = setInterval(Get_competitors, 1000);

//Getting competitors and append the data in the table
function Get_competitors() {
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");
  let CompID = $("#select_competitor :selected").val();
  if (CompID !== undefined && CompID !== "") {
    clearInterval(get_comp);
    $.ajax({
      type: "GET",
      url: "/site_audit/get_competitors_data/?competitor_id=" + CompID,
      success: function (response) {
        $("#competitorsTable .loader").hide();
        $("#competitorsTable table tbody").empty();
        $("#backLinksTable tbody").empty();
        $("#anchorTextTable tbody").empty();
        if (response.status == true) {
          let json = response.api_data.results;
          let AnchorTextjson = response.anchor_text.results;
          var BacklinksCount = 0;
          var AnchortextCount = 0;
          json.forEach(function (item) {
            let SourceObject = item.source;
            let TargetObject = item.target;
            BacklinksCount++;
            $("#backLinksTable tbody").append(
              "<tr><td><a href='//" +
                SourceObject.page +
                "' class='sourceLink' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
                SourceObject.page +
                "</span></a></td><td class='text-center'>" +
                SourceObject.domain_authority +
                "</td><td>" +
                "href</td><td><span class='anchorText' title='" +
                item.anchor_text +
                "'>" +
                (item.anchor_text == ""
                  ? "Empty anchor text"
                  : item.anchor_text) +
                "</span></td><td><a href='//" +
                TargetObject.page +
                "' class='targetLink' title='" +
                TargetObject.page +
                "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
                moment(item.date_first_seen).format("MMM DD, YYYY") +
                "</td><td>" +
                moment(item.date_last_seen).format("MMM DD, YYYY") +
                "</td></tr>"
            );
            var total_pages = TargetObject["pages_to_root_domain"];
            var total_nofollow = TargetObject["nofollow_pages_to_root_domain"];
            var total = total_nofollow / total_pages;
            var noFollow_per = Math.round(total * 100);
            var follow = Math.round(100 - noFollow_per);
            $(`#competitorsTable table tbody`).html(
              "<tr data-url=" +
                TargetObject.root_domain +
                " data-id=" +
                CompID +
                '><td><span class="icon"><svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">' +
                '<path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34783 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM17.9367 9H14.31C14.2133 6.60333 13.7733 4.27333 12.9967 2.58667C14.3149 3.12148 15.4671 3.9973 16.3352 5.1243C17.2033 6.25131 17.756 7.58893 17.9367 9ZM10 18C9.23334 18 7.87334 15.3667 7.69 11H12.31C12.1267 15.3667 10.7667 18 10 18ZM7.69 9C7.87334 4.63333 9.23334 2 10 2C10.7667 2 12.1267 4.63333 12.31 9H7.69ZM7 2.58667C6.22667 4.27333 5.78667 6.60333 5.69 9H2.06334C2.24366 7.5893 2.79587 6.25192 3.66336 5.12495C4.53084 3.99798 5.6824 3.12195 7 2.58667ZM2.06334 11H5.69C5.78667 13.3967 6.23 15.7267 7.00334 17.4167C5.68467 16.8816 4.53212 16.0052 3.66399 14.8776C2.79586 13.75 2.24341 12.4117 2.06334 11ZM13 17.4167C13.7733 15.7267 14.2167 13.4 14.3133 11H17.9367C17.7569 12.4113 17.2049 13.7494 16.3374 14.877C15.4699 16.0046 14.318 16.8811 13 17.4167Z" fill="currentColor"></path>' +
                '</svg></span><span class="competitorName">' +
                TargetObject.root_domain +
                "</span></td>" +
                '<td class="competitor-column__value">' +
                SourceObject.domain_authority +
                '<span class="total">/100</span></td>' +
                '<td class="competitor-column__value" id="TotalTraffic' +
                CompID +
                '"><span class="tdVal"></span><span class="competitorChange"></span><span class="competitorChangeDesc"></span></td>' +
                '<td class="competitor-column__value" id="TotalKW' +
                CompID +
                '"><span class="tdVal keywordsCount"></span><span class="competitorChange"></span><span class="competitorChangeDesc"></span></td>' +
                '<td class="competitor-column__value" id="TotalBL' +
                CompID +
                '"><div class="overviewStats"><span class="tdVal" data-val=' +
                TargetObject.external_pages_to_root_domain +
                ">" +
                numberWithCommas(TargetObject.external_pages_to_root_domain) +
                '</span><span class="competitorChange"></span></div><span class="competitorChangeDesc"></span></td>' +
                '<td class="competitor-column__value" id="TotalRD' +
                CompID +
                '"><div class="overviewStats"><span class="tdVal" data-val=' +
                TargetObject.root_domains_to_root_domain +
                ">" +
                numberWithCommas(TargetObject.root_domains_to_root_domain) +
                '</span><span class="competitorChange"></span></div><span class="competitorChangeDesc"></span></td>' +
                '<td><p class="m-0"><span class="competitor-column__value_follow text-primary">' +
                follow +
                '% </span><small>Follow</small></p><p class="m-0 nofollow"><span class="competitor-column__value_follow  text-success">' +
                noFollow_per +
                "% </span><small>Nofollow</small></p></td>" +
                '<td><span class="deleteIcon h5" data-id=' +
                CompID +
                ' onclick="Delete_Competitor(' +
                CompID +
                ')"><svg  data-bs-toggle="tooltip" data-bs-placement="left" title="Delete Competitor" width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">' +
                '<path d="M5.7168 16.4062H14.2832L14.7559 6.40625H5.24414L5.7168 16.4062Z" fill="#FAFAFA"></path>' +
                '<path d="M16.875 5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM7.03125 3.59375H12.9688V5H7.03125V3.59375ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z" fill="#8C8C8C"></path>' +
                "</svg></span></td></tr>"
            );
          });
          AnchorTextjson.forEach(function (item) {
            AnchortextCount++;
            $("#anchorTextTable tbody").append(
              "<tr><td><span class='d-inline-block text-primary'>" +
                (item.anchor_text == ""
                  ? "Empty anchor text"
                  : item.anchor_text) +
                "</span></td><td class='text-center'>" +
                numberWithCommas(item["external_pages"]) +
                "</td><td class='text-center'>" +
                numberWithCommas(item["external_root_domains"]) +
                "</td></tr>"
            );
          });
          var jsonPrev = response.previous_results;
          var allJsonObjectsChange;
          if (jsonPrev.results != "") {
            allJsonObjectsChange = jsonPrev.results;
          } else {
            allJsonObjectsChange = json;
          }
          allJsonObjectsChange.forEach(function (item) {
            let SourceObject = item.source;
            let TargetObject = item.target;
            var total_pages = TargetObject["pages_to_root_domain"];
            var total_nofollow = TargetObject["nofollow_pages_to_root_domain"];
            var total = total_nofollow / total_pages;
            var noFollow_per = Math.round(total * 100);
            var follow = Math.round(100 - noFollow_per);
            let pervValBL = TargetObject.external_pages_to_root_domain;
            if (
              $("#TotalBL" + jsonPrev.id)
                .find(".tdVal")
                .data("val") < pervValBL
            ) {
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChange")
                .html(
                  '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
                );
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html(
                  '<span class="text-danger">' +
                    (100 -
                      percentage(
                        $("#TotalBL" + jsonPrev.id)
                          .find(".tdVal")
                          .data("val"),
                        pervValBL
                      )) +
                    "%</span> less than previous month"
                );
            } else if (
              $("#TotalBL" + jsonPrev.id)
                .find(".tdVal")
                .data("val") > pervValBL
            ) {
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChange")
                .html(
                  '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
                );
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html(
                  '<span class="text-success">' +
                    (percentage(
                      $("#TotalBL" + jsonPrev.id)
                        .find(".tdVal")
                        .data("val"),
                      pervValBL
                    ) -
                      100) +
                    "%</span> more than previous month"
                );
            } else {
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChange")
                .html("");
              $("#TotalBL" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html("no change than previous month");
            }
            let pervValRD = TargetObject.root_domains_to_root_domain;
            if (
              $("#TotalRD" + jsonPrev.id)
                .find(".tdVal")
                .data("val") < pervValRD
            ) {
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChange")
                .html(
                  '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
                );
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html(
                  '<span class="text-danger">' +
                    (100 -
                      percentage(
                        $("#TotalBL" + jsonPrev.id)
                          .find(".tdVal")
                          .data("val"),
                        pervValRD
                      )) +
                    "%</span> less than previous month"
                );
            } else if (
              $("#TotalRD" + jsonPrev.id)
                .find(".tdVal")
                .data("val") > pervValRD
            ) {
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChange")
                .html(
                  '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
                );
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html(
                  '<span class="text-success">' +
                    (percentage(
                      $("#TotalBL" + jsonPrev.id)
                        .find(".tdVal")
                        .data("val"),
                      pervValRD
                    ) -
                      100) +
                    "%</span> more than previous month"
                );
            } else {
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChange")
                .html("");
              $("#TotalRD" + jsonPrev.id)
                .find(".competitorChangeDesc")
                .html("no change than previous month");
            }
          });

          // $(".competitor-header__current").html(
          //   $("#select_competitor option").length
          // );

          $("[data-bs-toggle='tooltip']").tooltip();
        } else {
        }
        $(".backlinksCount").html("");
        $(".anchorTextCount").html("");
        $(".backlinksCount").text(BacklinksCount);
        $(".anchorTextCount").text(AnchortextCount);
        $(document).trigger("function_a_complete");
        GetTrackedKeywords().then(function (result) {
          TrackedKeywords = result;
          Get_Keywords($("#select_competitor :selected").val());
        });
      },
      error: function (response) {
        ShowNoty("error", "error");
      },
    });
  }
}
// upodate dropdown with existing compititors
function updateCompetitorsDropdown() {
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");
  $.ajax({
    url: "/site_audit/get_competitors/?project_id=" + selectedWebsiteId,
    type: "GET",
    success: function (response) {
      if (response.competitors.length > 0) {
        $("#select_competitor").empty();
        if ($("#select_competitor").length > 0) {
          var json = response.competitors;
          for (const key of Object.keys(json)) {
            $("#select_competitor").append(
              "<option data_id=" +
                json[key].id +
                " value=" +
                json[key].id +
                ">" +
                json[key].i_website__website_url +
                "</option>"
            );
          }
          $("#select_competitor").trigger("change");
        }
      }
    },
    error: function (err) {
      console.log("Request failed, error= " + err);
    },
  });
}
$("#addCompetitorForm").submit(function (event) {
  competitorsURL;
  event.preventDefault();
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");
  $("#project_id").val(selectedWebsiteId);
  var dataString = $("#addCompetitorForm").serialize();
  $.ajax({
    url: "/site_audit/add_competitor/",
    method: "POST",
    data: dataString,
    success: function (response) {
      if (response.status == true) {
        window.location.reload();
        Get_competitors();
        updateCompetitorsDropdown();
      } else {
        if (response.limits_error) {
          $("#upgradeSub").modal("show");
          $("#sidebarMenu").css("z-index", "10000");
          $("#main-navbar").css("z-index", "99999");
          $("main").css("opacity", "0.07");
          // ShowNoty(response.limits_error, "error")
        } else {
          ShowNoty(response.error, "error");
        }

        // $("#upgrade_subscription").modal('show')
      }
    },
    error: function (response) {
      ShowNoty(response.error, "error");
    },
  });
});
function Delete_Competitor(competitorID) {
  $.ajax({
    type: "POST",
    url: "/site_audit/delete_site_competitor/",
    data: { id: competitorID },
    success: function (response) {
      if (response.status == true) {
        Get_competitors();
        updateCompetitorsDropdown();
      } else {
        ShowNoty(response.error, "error");
      }
    },
    error: function (response) {
      ShowNoty("error", "error");
    },
  });
}
function sum(a, b) {
  var c = a + b;
  return c;
}
function Get_Keywords(competitorURL) {
  if (competitorURL != undefined) {
    $.ajax({
      type: "GET",
      url:
        "/site_audit/get_competitor_website_json/?competitor_id=" +
        competitorURL,
      success: function (response) {
        $("#keywordsTable").DataTable().destroy();
        $("#keywordsTable tbody").empty();
        if (response.status) {
          let json = response.keyword_json;
          let prevJson = response.previous_keyword;
          var KeywordsCount = 0;
          var TrafficCount = 0;
          var PrevKeywordsCount = 0;
          var PrevTrafficCount = 0;
          json.forEach(function (item) {
            KeywordsCount++;
            TrafficCount = TrafficCount + Math.round(item.monthly_clicks);
            $("#keywordsTable tbody").append(
              "<tr><td><a href='javascript:void(0)' class='keywordLink'><span class='KWord text-primary ms-2'>" +
                item.term +
                "</span></a></td><td class='text-center'><span class='grank'>" +
                (item.url_position_change != 0
                  ? item.url_position_change > 0
                    ? '<span class="prevPosition">' +
                      parseFloat(item.previous_position) +
                      '</span><span class="positionUp"><i class="fa fa-arrow-right" aria-hidden="true"></i>' +
                      parseFloat(item.position) +
                      "</span>"
                    : '<span class="prevPosition">' +
                      parseFloat(item.previous_position) +
                      '</span><span class="positionDown"><i class="fa fa-arrow-right" aria-hidden="true"></i>' +
                      parseFloat(item.position) +
                      "</span>"
                  : parseFloat(item.position)) +
                "</span></td><td class='text-center'>" +
                (item.url_position_change != 0
                  ? item.url_position_change > 0
                    ? '<span class="positionUp2"><i class="fa fa-arrow-up" aria-hidden="true"></i>' +
                      item.url_position_change +
                      "</span>"
                    : '<span class="positionDown2"><i class="fa fa-arrow-down" aria-hidden="true"></i>' +
                      item.url_position_change +
                      "</span>"
                  : 0) +
                "</td><td class='text-center'>" +
                Math.round(item.monthly_clicks) +
                "</td><td class='text-center'>" +
                item.exact_local_monthly_search_volume +
                "</td><td class='text-center'>" +
                (item.seo_difficulty != "" ? item.seo_difficulty : "N/A") +
                "</td><td class='details-control'>" +
                (TrackedKeywords.includes(item.term)
                  ? '<button class="btn btn-sm tracking-btn tracking-btn--expandable ng-star-inserted"  data-id="' +
                    item.term +
                    '"><span class="btnText">History</span><mat-icon role="img" svgicon="expand-more" class="mat-icon notranslate mat-icon-no-color" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="expand-more"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z" fill="#33B86A"></path></svg></mat-icon></button>'
                  : '<button data-bs-toggle="popover" data-bs-placement="top" data-bs-custom-class="custom-popover" data-bs-content="Start tracking this keyword" class="btn btn-sm start-tracking-btn tracking-btn--expandable ng-star-inserted" data-id="' +
                    item.term +
                    '"><span class="btnText">Start</span></button>') +
                "</td><td><a href=" +
                item.url +
                " class='targetLink' title=" +
                item.url +
                " target='_blank'><span style='font-size:0px;visibility:hidden;height: 0;width: 0;float:left;'>" +
                item.url +
                "</span><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td class='text-center'>" +
                (item.exact_cost_per_click != 0
                  ? item.exact_cost_per_click.toFixed(2)
                  : item.exact_cost_per_click) +
                "</td><td class='text-center'>" +
                item.value_per_month.toFixed(2) +
                "</td></tr>"
            );
          });
          var allJsonObjectsPrev;
          if (prevJson != "") {
            allJsonObjectsPrev = prevJson;
          } else {
            allJsonObjectsPrev = json;
          }
          allJsonObjectsPrev.forEach(function (item) {
            PrevKeywordsCount++;
            PrevTrafficCount = TrafficCount + Math.round(item.monthly_clicks);
          });
          if (
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".tdVal")
              .data("val") < PrevTrafficCount
          ) {
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html(
                '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
              );
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html(
                '<span class="text-danger">' +
                  (100 -
                    percentage(
                      $(
                        "#TotalTraffic" +
                          $("#select_competitor :selected").val()
                      )
                        .find(".tdVal")
                        .data("val"),
                      PrevTrafficCount
                    )) +
                  "%</span> less than previous month"
              );
          } else if (
            $("#TotalTraffic" + $("#select_competitor selected").val())
              .find(".tdVal")
              .data("val") > PrevTrafficCount
          ) {
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html(
                '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
              );
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html(
                '<span class="text-success">' +
                  (percentage(
                    $("#TotalTraffic" + $("#select_competitor :selected").val())
                      .find(".tdVal")
                      .data("val"),
                    PrevTrafficCount
                  ) -
                    100) +
                  "%</span> more than previous month"
              );
          } else {
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html("");
            $("#TotalTraffic" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html("no change than previous month");
          }

          if (
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".tdVal")
              .data("val") < PrevKeywordsCount
          ) {
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html(
                '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
              );
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html(
                '<span class="text-danger">' +
                  (100 -
                    percentage(
                      $("#TotalKW" + $("#select_competitor :selected").val())
                        .find(".tdVal")
                        .data("val"),
                      PrevKeywordsCount
                    )) +
                  "%</span> less than previous month"
              );
          } else if (
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".tdVal")
              .data("val") > PrevKeywordsCount
          ) {
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html(
                '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
              );
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html(
                '<span class="text-success">' +
                  (percentage(
                    $("#TotalKW" + $("#select_competitor :selected").val())
                      .find(".tdVal")
                      .data("val"),
                    PrevKeywordsCount
                  ) -
                    100) +
                  "%</span> more than previous month"
              );
          } else {
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChange")
              .html("");
            $("#TotalKW" + $("#select_competitor :selected").val())
              .find(".competitorChangeDesc")
              .html("no change than previous month");
          }
        } else {
        }
        $(document).trigger("function_a_complete");
        if (!$.fn.DataTable.isDataTable("#keywordsTable")) {
          var kwDt = $("#keywordsTable").DataTable({
            dom: "frtipB",
            pageLength: 10,
            aaSorting: [],
            buttons: [
              {
                extend: "csvHtml5",
                className: "btn btn-sm  btn-light",
                text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
                titleAttr: "CSV",
                title: "Keywords",
              },
            ],
          });
        }
        VisibleColumns();
        $(".keywordsCount").html("");
        $(".keywordsCount").text(KeywordsCount);
        $("#TotalTraffic" + $("#select_competitor :selected").val())
          .find(".tdVal")
          .html(TrafficCount);
        $(".keywordLink").click(function () {
          $("#openKeyword").val($(this).find(".KWord").text());
          $(".SearchKeyword").trigger("click");
        });
      },
      error: function (response) {
        ShowNoty("error", "error");
      },
    });
  }
}
$(document).bind("function_a_complete", initializeDatatables);
function initializeDatatables() {
  if (!$.fn.DataTable.isDataTable("#backLinksTable")) {
    $("#backLinksTable").DataTable({
      dom: "frtipB",
      pageLength: 10,
      aaSorting: [],
      buttons: [
        {
          extend: "csvHtml5",
          className: "btn btn-sm  btn-light",
          text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
          titleAttr: "CSV",
          title: "Backlinks",
        },
      ],
    });
  }
  if (!$.fn.DataTable.isDataTable("#anchorTextTable")) {
    $("#anchorTextTable").DataTable({
      dom: "frtipB",
      pageLength: 10,
      aaSorting: [],
      buttons: [
        {
          extend: "csvHtml5",
          className: "btn btn-sm  btn-light",
          text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
          titleAttr: "CSV",
          title: "Anchor Text",
        },
      ],
    });
  }
  $(".customExportBtn")
    .off()
    .on("click", function () {
      $(".tab-content>.active .dt-button.buttons-csv").trigger("click");
    });
  $("#keywordsTable tbody")
    .off()
    .on("click", ".tracking-btn", function () {
      if ($(this).find(".btnText").text() == "History") {
        $(this).html(
          '<span class="btnText">Close</span><mat-icon _ngcontent-wgw-c219="" role="img" svgicon="expand-less" class="mat-icon notranslate mat-icon-no-color" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="expand-less"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill="#33B86A"></path></svg></mat-icon>'
        );
      } else if ($(this).find(".btnText").text() == "Close") {
        $(this).html(
          '<span class="btnText">History</span><mat-icon role="img" svgicon="expand-more" class="mat-icon notranslate mat-icon-no-color" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="expand-more"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z" fill="#33B86A"></path></svg></mat-icon>'
        );
      }
      var keywordText = $(this).data("id");
      var tr = $(this).closest("tr");
      var row = $("#keywordsTable").DataTable().row(tr);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass("shown");
      } else {
        // Open row.
        if ($("#keywordsTable").DataTable().row(".shown").length) {
          $(
            ".tracking-btn",
            $("#keywordsTable").DataTable().row(".shown").node()
          ).click();
        }

        row
          .child(
            '<div class="chartDiv"><h4 class="chart-title">Google Ranking Position</h4><span role="img" svgicon="hint" data-bs-toggle="popover" data-bs-placement="top" data-bs-custom-class="custom-popover" data-bs-title="Google Rank Tracking" data-bs-content="Now you can easily review historical ranking changes for any Tracked keyword. For instance, if you made a change to a page that ranks, check back to see if your changes affected its keyword rankings!" class="mat-icon" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="hint"><i class="far fa-question-circle" aria-hidden="true"></i></span>  <div id="googleRankChartCanvas' +
              row[0][0] +
              '"></div></div></div><button class="btn btn-sm stop-tracking-btn" data-id="' +
              keywordText +
              '">Stop tracking</button>'
          )
          .show();
        tr.addClass("shown");
        $("#keywordsTable tbody").on(
          "click",
          ".stop-tracking-btn",
          function () {
            $("#stopTrackingConfirmedModal").modal("show");
            var keywordText = $(this).data("id");
            $(".trackKeywordText").html(keywordText);
            $(".stopTrackingBtn").attr("data-id", keywordText);
            $("#stopTrackingConfirmedModal")
              .off()
              .on("click", ".stopTrackingBtn", function () {
                StopTrackKeywordsFunction(keywordText);
                row.child.hide();

                tr.removeClass("shown");
              });
          }
        );
        let competitorID = $("#select_competitor :selected").val();
        $.ajax({
          type: "GET",
          url:
            "/site_audit/get_competitor_track_keyword/?competitor_id=" +
            competitorID,
          success: function (response) {
            var TrackedKeywordsChartData = response.track_keywords_detail;
            var ResultObject = TrackedKeywordsChartData[keywordText];
            var DatesArray = [];
            var ValuesArray = [];
            ResultObject.forEach((element, index, array) => {
              DatesArray.push(
                moment(element.tracking_date).format("MM/DD/YYYY")
              ); // 100, 200, 300
              ValuesArray.push(element.tracking_value);
            });
            DatesArray = DatesArray.reverse();
            ValuesArray = ValuesArray.reverse();
            var maxVal =
              ValuesArray.reduce((a, b) => a + b, 0) / ValuesArray.length;
            var chartHC = Highcharts.chart(
              document.getElementById("googleRankChartCanvas" + row[0][0]),
              {
                tooltip: {
                  backgroundColor: "#000000cc",
                  borderColor: "#000000cc",
                  borderRadius: 15,
                  style: {
                    color: "#fff",
                    fontWeight: "normal",
                  },
                  formatter: function () {
                    return (
                      "<span>" +
                      this.x +
                      '</span><br/><span style="color:#2f54eb;font-size:20px"> &#9632</span> ' +
                      this.y
                    );
                  },
                },
                chart: {
                  style: {
                    fontFamily: "Poppins,sans-serif",
                    fontWeight: "normal",
                  },
                  plotBackgroundColor: "#a1b2f5",
                  height: 230,
                  fontWeight: "normal",
                },
                title: {
                  text: "",
                },
                credits: {
                  enabled: false,
                },
                legend: {
                  enabled: false,
                },
                xAxis: {
                  categories: DatesArray,
                  tickmarkPlacement: "on",
                  lineColor: "#e6e6e6",
                  lineWidth: 1,
                },
                yAxis: {
                  name: "",
                  title: {
                    text: "",
                  },
                  lineWidth: 1,
                  lineColor: "#e6e6e6",
                  gridLineColor: "transparent",
                  reversed: true,
                  tickAmount: 2,
                  minTickInterval: 1,
                  tickInterval: 10,
                  min: 0,
                  softMax: Math.max(...ValuesArray) + 10,
                  labels: {
                    formatter: function () {
                      var value;
                      if (this.value == 0) {
                        value = this.value + 1;
                      } else {
                        value = this.value;
                      }

                      return value;
                    },
                  },
                },
                series: [
                  {
                    animation: false,
                    lineColor: "#2f54eb", // inherit from series
                    marker: {
                      fillColor: "#fff",
                      lineWidth: 2,
                      lineColor: "#2f54eb", // inherit from series
                    },
                    pointPlacement: "on",
                    color: "#ffffff",
                    fillOpacity: 1,
                    type: "area",
                    data: ValuesArray,
                  },
                ],
              }
            );
            chartHC.setSize(null, null, false);
            chartHC.options.chart.width = null;
            chartHC.options.chart.height = null;
          },
        });
        $('[data-bs-toggle="popover"]')
          .popover({ trigger: "manual", html: true })
          .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function () {
              $(_this).popover("hide");
            });
          })
          .on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
              if (!$(".popover:hover").length) {
                $(_this).popover("hide");
              }
            }, 300);
          });
      }
    });

  $("#keywordsTable tbody").on("click", ".start-tracking-btn", function () {
    var keywordText = $(this).data("id");
    if (TrackedKeywords.length == 0 && membership == "free") {
      $("#startTrackingModal").modal("show");
      $(".trackKeywordText").html(keywordText);
      $("#startTrackingModal").on("click", ".startTrackingBtn", function () {
        TrackKeywordsFunction(keywordText);
      });
    } else if (
      TrackedKeywords.length != 0 &&
      TrackedKeywords.length < 51 &&
      membership == "pro"
    ) {
      $("#startTrackingModal").modal("show");
      $(".trackKeywordText").html(keywordText);
      $("#startTrackingModal").on("click", ".startTrackingBtn", function () {
        TrackKeywordsFunction(keywordText);
      });
    } else if (TrackedKeywords.length == 5 && membership == "free") {
      $("#limitTrackingModal").modal("show");
      $("#limitTrackingLabel").text(
        "You've reached the limit! As a free member you can only track 5 keywords."
      );
      $("#LimitDetails").text(
        "Upgrade to any Pro membership today and you'll automatically be able to track up to 50 keywords."
      );
    } else if (TrackedKeywords.length == 50 && membership == "pro") {
      $("#limitTrackingModal").modal("show");
      $("#limitTrackingLabel").text(
        "You've reached the limit! You can only track 50 keywords."
      );
      $("#LimitDetails").text("");
    } else {
      TrackKeywordsFunction(keywordText);
    }
  });
}
function VisibleColumns() {
  var checkboxesUnchecked = $("#chooseColumnsTabs").find(
    ".form-check-input:not(:checked)"
  );
  var checkboxesChecked = $("#chooseColumnsTabs").find(
    ".form-check-input:is(:checked)"
  );

  // Get the column API object

  for (let element of checkboxesChecked) {
    let item = $(element).attr("data-column");

    let headers = $(".tab-content>.active .dataTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();
    var columnNo = headers.indexOf(item);
    if (columnNo != -1) {
      var column = $(".tab-content>.active .dataTable")
        .DataTable()
        .column(columnNo);
      // Toggle the visibility
      column.visible(true);
    }

    $("#chooseData").find(".btn-close").trigger("click");
  }
  for (let element of checkboxesUnchecked) {
    let item = $(element).attr("data-column");
    let headers = $(".tab-content>.active .dataTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();

    var columnNo = headers.indexOf(item);
    if (columnNo != -1) {
      var column = $(".tab-content>.active .dataTable")
        .DataTable()
        .column(columnNo);
      // Toggle the visibility
      column.visible(false);
    }
    $("#chooseData").find(".btn-close").trigger("click");
  }

  // Toggle the visibility
}

$(".chooseTabsData").click(function () {
  $("#chooseData").modal("show");
  let tabsName = $(".nav-tabs .nav-link.active").data("id");
  if (tabsName == "Backlinks") {
    $(".BacklinksColumns").show().addClass("active");
    $(".AnchorTextColumns").hide().removeClass("active");
    $(".KeywordsColumns").hide().removeClass("active");
  } else if (tabsName == "Anchor Text") {
    $(".BacklinksColumns").hide().removeClass("active");
    $(".AnchorTextColumns").show().addClass("active");
    $(".KeywordsColumns").hide().removeClass("active");
  } else if (tabsName == "Keywords") {
    $(".BacklinksColumns").hide().removeClass("active");
    $(".AnchorTextColumns").hide().removeClass("active");
    $(".KeywordsColumns").show().addClass("active");
  }
  $("#columnFunctionActiveTab").click(function () {
    //  console.log("columnFunctionActiveTab function ")
    var checkboxesUnchecked = $("#chooseColumnsTabs")
      .find(".active")
      .find(".form-check-input:not(:checked)");
    var checkboxesChecked = $("#chooseColumnsTabs")
      .find(".active")
      .find(".form-check-input:is(:checked)");
    // Get the column API object
    for (let element of checkboxesChecked) {
      let item = $(element).attr("data-column");

      let headers = $(".tab-content>.active .dataTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();
      var columnNo = headers.indexOf(item);
      if (columnNo != -1) {
        var column = $(".tab-content>.active .dataTable")
          .DataTable()
          .column(columnNo);
        // Toggle the visibility
        column.visible(true);
      }

      $("#chooseData").find(".btn-close").trigger("click");
    }
    for (let element of checkboxesUnchecked) {
      let item = $(element).attr("data-column");

      let headers = $(".tab-content>.active .dataTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();
      var columnNo = headers.indexOf(item);
      if (columnNo != -1) {
        var column = $(".tab-content>.active .dataTable")
          .DataTable()
          .column(columnNo);
        // Toggle the visibility
        column.visible(false);
      }

      $("#chooseData").find(".btn-close").trigger("click");
    }

    // Toggle the visibility
  });
});
$(document).on("click", ".link-website-authority", function () {
  $("#dictionary").modal("show");
  openTab("", "WebsiteAuthority");
});
$(document).on("click", ".link-traffic", function () {
  $("#dictionary").modal("show");
  openTab("", "Traffic");
});

$(document).on("click", ".link-total-keywords", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofKeywords");
});

$(document).on("click", ".link-total-backlinks", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofBacklinks");
});

$(document).on("click", ".link-Referring-domains", function () {
  $("#dictionary").modal("show");
  openTab("", "ReferringDomains");
});

$(document).on("click", ".link-followNofollow", function () {
  $("#dictionary").modal("show");
  openTab("", "FollowNoFollow");
});

$(document).on("click", ".link-Link-Type", function () {
  $("#dictionary").modal("show");
  openTab("", "LinkType");
});
$(document).on("click", ".link-Anchor-Text", function () {
  $("#dictionary").modal("show");
  openTab("", "AnchorText");
});

async function GetTrackedKeywords() {
  let KWResult;

  let competitorID = $("#select_competitor :selected").val();
  await $.ajax({
    type: "GET",
    url:
      "/site_audit/get_competitor_track_keyword/?competitor_id=" + competitorID,

    success: function (response) {
      KWResult = response.track_keywords;
      KWResult = remove_duplicates_es6(KWResult);
    },
  });

  return Promise.resolve(KWResult);
}
function TrackKeywordsFunction(KW) {
  $(".trackKeywordText").html(KW);

  let competitorID = $("#select_competitor :selected").val();
  $.ajax({
    type: "POST",
    url: "/site_audit/save_competitor_track_keyword/",
    data: { competitor_id: competitorID, keyword: KW, action: "start" },
    success: function (response) {
      $("#startTrackingModal").modal("hide");
      $("#startTrackingConfirmedModal").modal("show");

      $("#startTrackingConfirmedModal").on(
        "click",
        ".backToKeywords",
        function () {
          $("#keywordsTable").DataTable().destroy();
          // $('#keywordsTable').hide()
          $("#keywordsTable tbody").empty();
          $("#MyKeywords .loader").show();
          GetTrackedKeywords().then(function (result) {
            TrackedKeywords = result;
            Get_Keywords($("#select_competitor :selected").val());
          });
          $("#startTrackingConfirmedModal").modal("hide");
        }
      );

      if (response.status) {
      }
    },
  });
}

function StopTrackKeywordsFunction(KW) {
  //  console.log(KW, ' keywordText remove')
  let competitorID = $("#select_competitor :selected").val();
  if (
    $(".stop-tracking-btn")
      .closest("tr")
      .prev("tr.shown")
      .find(".btnText")
      .text() == "Close"
  ) {
    // console.log($('.stop-tracking-btn').closest('tr').prev('tr.shown').find('.btnText').text())
    $(".stop-tracking-btn")
      .closest("tr")
      .prev("tr.shown")
      .find(".details-control")
      .html(
        '<button data-bs-toggle="popover" data-bs-placement="top" data-bs-custom-class="custom-popover" data-bs-content="Start tracking this keyword" class="btn btn-sm start-tracking-btn tracking-btn--expandable ng-star-inserted" data-id="' +
          KW +
          '"><span class="btnText">Start</span></button>'
      );
  }
  $.ajax({
    type: "POST",
    url: "/site_audit/save_competitor_track_keyword/",
    data: { competitor_id: competitorID, keyword: KW, action: "stop" },
    success: function (response) {
      if (response.status) {
        GetTrackedKeywords().then(function (result) {
          TrackedKeywords = result;

          //  console.log(TrackedKeywords, ' TrackedKeywords after stopping')
          Get_Keywords($("#select_competitor :selected").val());
        });

        $("#stopTrackingConfirmedModal").modal("hide");
      } else {
        ShowNoty(response.error, "error");
      }
    },
  });
}

$(document).on("change", ".radio", function () {
  $("#keywordsTable").DataTable().destroy();
  selectedWebsiteId = $(".radio :selected").first().attr("data-id");

  $.ajax({
    url: "/site_audit/get_competitors/?project_id=" + selectedWebsiteId,
    type: "GET",
    success: function (response) {
      setTimeout(() => {
        var selected = $("#select_competitor :selected").val();

        Get_Keywords(selected);
      }, 100);
      if (response.competitors.length > 0) {
        $("#select_competitor").empty();
        if ($("#select_competitor").length > 0) {
          var json = response.competitors;
          for (const key of Object.keys(json)) {
            $("#select_competitor").append(
              "<option data_id=" +
                json[key].id +
                " value=" +
                json[key].id +
                ">" +
                json[key].i_website__website_url +
                "</option>"
            );
          }
          $("#select_competitor").trigger("change");
        }
      }
    },
    error: function (err) {
      ShowNoty(err, "error");
    },
  });
});
