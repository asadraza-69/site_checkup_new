var selectedWebsiteId;
var selectedWebsite;
var TrackedKeywords = [];
var membership = "free";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function () {
  Get_country_languages();
  var setInt = setInterval(myKeyword, 1000);

  function myKeyword() {
    selectedWebsite = $(".radio :selected").val();
  $(".selectedWebsite_new").html(selectedWebsite);
    if (selectedWebsite !== undefined && selectedWebsite !== "") {
      clearInterval(setInt);
      selectedWebsiteId = $(".radio :selected").first().attr("data-id");
      GetTrackedKeywords().then(function (result) {
        TrackedKeywords = result;
        Get_Keywords(selectedWebsite);
    
    
      });
    }
  }
});

function Get_country_languages() {
  $.ajax({
    type: "GET",
    url: "/user_management/get_country_languages/",

    success: function (response) {
      if (response.status == true) {
        $(".CountrySelect").empty();
        $(".CountrySelect").html("<option></option>");
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
      console.log(response.error);
    },
  });
}

function sum(a, b) {
  var c = a + b;
  return c;
}

function Get_Keywords(site) {
  if (site !== undefined) {
    $.ajax({
      type: "GET",
      url: "/site_audit/get_website_json/?project_id=" + selectedWebsiteId,

      success: function (response) {
        if (response.status) {
          let json = response.keyword_json;
          let prevJson = response.previous_keyword;
          var KeywordsCount = 0;
          var TrafficCount = 0;
          var PrevKeywordsCount = 0;
          var PrevTrafficCount = 0;
          var organicTrafficDiff;
          var keywordsDiff;
          
          if( response["results"] !== ''){
             var DomainAuthority =
            response["results"][0]["target"]["domain_authority"];
            $("#website-authority").html(
            DomainAuthority + "<span class='total'>/100</span>"
          );
          }else{
              $("#website-authority").html(
            '-' + "<span class='total'>/100</span>"
          );
          }

          let overviewJson = response.overview_json;

          $(".loaderBacklinks").hide();
         

          json.forEach(function (item) {
            KeywordsCount++;
            TrafficCount = TrafficCount + Math.round(item.monthly_clicks);
          });

          var allJsonObjectsPrev;
          if (prevJson !== "") {
            allJsonObjectsPrev = prevJson;
          } else {
            allJsonObjectsPrev = json;
          }
          allJsonObjectsPrev.forEach(function (item) {
            PrevKeywordsCount++;
            PrevTrafficCount =
              PrevTrafficCount + Math.round(item.monthly_clicks);
          });

          $("#organicSearchTraffic").html(TrafficCount);
          if (TrafficCount == PrevTrafficCount) {
            $(".organicSearchTraffic.changeDesc").html(
              "no changes for previous month"
            );
            $(".organicSearchTraffic .changeIcon").html("");
          } else if (TrafficCount > PrevTrafficCount) {
            organicTrafficDiff = TrafficCount - PrevTrafficCount;
            $(".organicSearchTraffic.changeDesc").html(
              organicTrafficDiff + " more than previous month"
            );
            $(".organicSearchTraffic .changeIcon").html(
              '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
            );
          } else {
            organicTrafficDiff = PrevTrafficCount - TrafficCount;
            $(".organicSearchTraffic.changeDesc").html(
              organicTrafficDiff + " less than previous month"
            );
            $(".organicSearchTraffic .changeIcon").html(
              '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
            );
          }

          $("#totalKeywords").html(KeywordsCount);
          if (KeywordsCount == PrevKeywordsCount) {
            $(".totalKeywords.changeDesc").html(
              "no changes for previous month"
            );
            $(".totalKeywords .changeIcon").html("");
          } else if (KeywordsCount > PrevKeywordsCount) {
            keywordsDiff = KeywordsCount - PrevKeywordsCount;
            $(".totalKeywords.changeDesc").html(
              keywordsDiff + " more than previous month"
            );
            $(".totalKeywords .changeIcon").html(
              '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
            );
          } else {
            keywordsDiff = PrevKeywordsCount - KeywordsCount;
            $(".totalKeywords.changeDesc").html(
              keywordsDiff + " less than previous month"
            );
            $(".totalKeywords .changeIcon").html(
              '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
            );
          }

          $("#tracked-keywords").html(
            TrackedKeywords.length + '/<span class="total">5</span>'
          );

          // for (let [key, value] of Object.entries(overviewJson)) {
          //     console.log(`${key}: ${value}`);

          //   }

          $("#keywordsTable").show();
          $("#keywordsTable tbody").empty();
          $(".loader").hide();

          json.forEach(function (item) {
            KeywordsCount++;

            $("#keywordsTable tbody").append(
              "<tr><td><a href='javascript:void(0)' class='keywordLink'><span class='text-primary ms-2'>" +
                item.term +
                "</span></a></td><td class='text-center'><span class='grank'>" +
                (item.url_position_change !== 0
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
                "</span></td><td class='text-end'>" +
                (item.url_position_change !== 0
                  ? item.url_position_change > 0
                    ? '<span class="positionUp2"><i class="fa fa-arrow-up" aria-hidden="true"></i>' +
                      item.url_position_change +
                      "</span>"
                    : '<span class="positionDown2"><i class="fa fa-arrow-down" aria-hidden="true"></i>' +
                      item.url_position_change +
                      "</span>"
                  : 0) +
                "</td><td class='text-end'>" +
                Math.round(item.monthly_clicks) +
                "</td><td class='text-end'>" +
                item.exact_local_monthly_search_volume +
                "</td><td>" +
                (item.seo_difficulty !== "" ? item.seo_difficulty : "N/A") +
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
                "</span><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td class='text-end'>" +
                (item.exact_cost_per_click !== 0
                  ? item.exact_cost_per_click.toFixed(2)
                  : item.exact_cost_per_click) +
                "</td><td class='text-end'>" +
                item.value_per_month.toFixed(2) +
                "</td></tr>"
            );
          });
        } else {
          ShowNoty(response.error, "error");
        }

        $(".keywordsCount").text(KeywordsCount);

        $(document).trigger("function_a_complete");

        $("#keywordsTable tbody").on("click", ".keywordLink", function () {
          let KW = $(this).find("span").text();

          $("#SearchKeyWord").find(".Keyword").val(KW);
          $("#SearchKeyWord").submit();
        });
        $("#keywordsTable tbody").on(
          "click",
          ".start-tracking-btn",
          function () {
            var keywordText = $(this).data("id");
            console.log(keywordText);

            if (TrackedKeywords.length == 0 && membership == "free") {
              $("#startTrackingModal").modal("show");
              $(".trackKeywordText").html(keywordText);

              $("#startTrackingModal").on(
                "click",
                ".startTrackingBtn",
                function () {
                  TrackKeywordsFunction(keywordText);
                }
              );
            } else if (
              TrackedKeywords.length !== 0 &&
              TrackedKeywords.length < 51 &&
              membership == "pro"
            ) {
              $("#startTrackingModal").modal("show");
              $(".trackKeywordText").html(keywordText);

              $("#startTrackingModal").on(
                "click",
                ".startTrackingBtn",
                function () {
                  TrackKeywordsFunction(keywordText);
                }
              );
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
          }
        );
      },
      error: function (response) {
        ShowNoty(response.error, "error");
      },
    });
  }
}
// callback funtion if first function complete then initializeDatatables will execute
$(document).bind("function_a_complete", initializeDatatables);

function initializeDatatables() {
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
          //   exportOptions: {
          //     columns: headerDictExport,
          //   },
        },
      ],
    });
  }

  // $(".table.list_viewTable").css('table-layout','fixed')

  $(".customExportBtn")
    .off()
    .on("click", function () {
      $(".dt-button.buttons-csv").trigger("click");
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
        // This row is already open - close it.
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
            '<div class="chartDiv"><h4 class="chart-title">Google Ranking Position</h4><span role="img" svgicon="hint" data-bs-toggle="popover" data-bs-placement="top" data-bs-custom-class="custom-popover" data-bs-title="Google Rank Tracking" data-bs-content="Now you can easily review historical ranking changes for any Tracked keyword. For instance, if you made a change to a page that ranks, check back to see if your changes affected its keyword rankings!" class="mat-icon" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="hint"><i class="far fa-question-circle" aria-hidden="true"></i></span><div id="googleRankChartCanvas' +
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
                // var KW = $(this).data('id');

                StopTrackKeywordsFunction(keywordText);

                row.child.hide();
                tr.removeClass("shown");
              });
          }
        );

        $.ajax({
          type: "GET",
          url: "/site_audit/get_track_keyword/?project_id=" + selectedWebsiteId,

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
        //    var element =  tr.next('tr').find('.chartDiv').find('.googleRankChartCanvas')

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

  $("#keywordsTable").DataTable().draw();
  VisibleColumns();
}

function VisibleColumns() {
  var checkboxes = $("#chooseColumns").find(
    $(".form-check-input:not(:checked)")
  );
  var checkboxesChecked = $("#chooseColumns").find(
    $(".form-check-input:is(:checked)")
  );

  // console.log(checkboxes)
  // Get the column API object

  for (let element of checkboxesChecked) {
    let item = $(element).attr("data-column");
    let headers = $("#keywordsTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();

    var columnNo = headers.indexOf(item);
    var column = $("#keywordsTable").DataTable().column(columnNo);
    // Toggle the visibility
    column.visible(true);
    $("#chooseData").find(".btn-close").trigger("click");
    $("#keywordsTable").DataTable().draw(true);
  }
  for (let element of checkboxes) {
    let item = $(element).attr("data-column");

    let headers = $("#keywordsTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();

    var columnNo = headers.indexOf(item);
    var column = $("#keywordsTable").DataTable().column(columnNo);
    // Toggle the visibility
    column.visible(false);
    $("#chooseData").find(".btn-close").trigger("click");
    $("#keywordsTable").DataTable().draw(true);
  }

  // Toggle the visibility
}

$("#columnFunction").click(function () {
  var checkboxes = $("#chooseColumns").find(
    $(".form-check-input:not(:checked)")
  );
  var checkboxesChecked = $("#chooseColumns").find(
    $(".form-check-input:is(:checked)")
  );

  // console.log(checkboxes)
  // Get the column API object

  for (let element of checkboxesChecked) {
    let item = $(element).attr("data-column");
    let headers = $("#keywordsTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();

    var columnNo = headers.indexOf(item);
    var column = $("#keywordsTable").DataTable().column(columnNo);
    // Toggle the visibility
    column.visible(true);
    $("#chooseData").find(".btn-close").trigger("click");
    $("#keywordsTable").DataTable().draw(true);
  }
  for (let element of checkboxes) {
    let item = $(element).attr("data-column");

    let headers = $("#keywordsTable")
      .DataTable()
      .columns()
      .header()
      .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
      .toArray();

    var columnNo = headers.indexOf(item);
    var column = $("#keywordsTable").DataTable().column(columnNo);
    // Toggle the visibility
    column.visible(false);
    $("#chooseData").find(".btn-close").trigger("click");
    $("#keywordsTable").DataTable().draw(true);
  }

  // Toggle the visibility
});

$(document).on("click", ".link-monthly-volume", function () {
  $("#dictionary").modal("show");
  openTab("", "WebsiteAuthority");
});

$(document).on("click", ".link-Organic-Search-Traffic", function () {
  $("#dictionary").modal("show");
  openTab("", "OrganicSearchTraffic");
});
$(document).on("click", ".link-Total-Number-of-Keywords", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofKeywords");
});

function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
async function GetTrackedKeywords() {
  let KWResult;

  await $.ajax({
    type: "GET",
    url: "/site_audit/get_track_keyword/?project_id=" + selectedWebsiteId,

    success: function (response) {
      KWResult = response.track_keywords;
      KWResult = remove_duplicates_es6(KWResult);
    },
  });

  return Promise.resolve(KWResult);
}
function TrackKeywordsFunction(KW) {
  $(".trackKeywordText").html(KW);

  $.ajax({
    type: "POST",
    url: "/site_audit/save_track_keyword/",
    data: { project_id: selectedWebsiteId, keyword: KW, action: "start" },
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
            Get_Keywords(selectedWebsite);
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
  console.log(KW, " keywordText remove");

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
    url: "/site_audit/save_track_keyword/",
    data: { project_id: selectedWebsiteId, keyword: KW, action: "stop" },
    success: function (response) {
      if (response.status) {
        GetTrackedKeywords().then(function (result) {
          TrackedKeywords = result;
          Get_Keywords(selectedWebsite);
        });

        $("#stopTrackingConfirmedModal").modal("hide");
      } else {
        console.log(response.error);
      }
    },
  });
}

$(document).on("change", ".radio", function () {
   location.reload();
  $(".selectedWebsite_new").html(` <div class="spinner-border text-primary spinner-border-sm mr-1 " role="status" style="font-size:12px">
  <span class="visually-hidden">Loading...</span>
  </div>`);
  $("#website-authority").empty();
  $("#organicSearchTraffic").empty();
  $("#totalKeywords").empty();
  $("#tracked-keywords").empty();
  $(".audit-scroll-bar").empty();
  $("#keywordsTable_paginate").html("");

  $(".loaderBacklinks").show();
  $(".webLoaderr").show();
  $(".loader").show();

  var setInt = setInterval(myKeyword, 1000);

  function myKeyword() {
    selectedWebsite = $(".radio :selected").val();
    if (selectedWebsite !== undefined && selectedWebsite !== "") {
      clearInterval(setInt);
      selectedWebsiteId = $(".radio :selected").first().attr("data-id");
      GetTrackedKeywords().then(function (result) {
        TrackedKeywords = result;
        Get_Keywords(selectedWebsite);
        $(".selectedWebsite_new").html(selectedWebsite);
      });
    }
  }

  function Get_Keywords(site) {
    $(".selctwebloader").show();
    if (site !== undefined) {
      $.ajax({
        type: "GET",
        url: "/site_audit/get_website_json/?project_id=" + selectedWebsiteId,

        success: function (response) {
          $(".webLoaderr").show();
          $(".loaderBacklinks").hide();
          $(".loader").hide();
          if (response.status) {
            let json = response.keyword_json;
            let prevJson = response.previous_keyword;
            var KeywordsCount = 0;
            var TrafficCount = 0;
            var PrevKeywordsCount = 0;
            var PrevTrafficCount = 0;
            var organicTrafficDiff;
            var keywordsDiff;
            if( response["results"] !== ''){
             var DomainAuthority =
            response["results"][0]["target"]["domain_authority"];
            $("#website-authority").html(
            DomainAuthority + "<span class='total'>/100</span>"
          );
          }else{
              $("#website-authority").html(
            '-' + "<span class='total'>/100</span>"
          );
          }

            let overviewJson = response.overview_json;

            $(".loaderBacklinks").hide();
           
            json.forEach(function (item) {
              KeywordsCount++;
              TrafficCount = TrafficCount + Math.round(item.monthly_clicks);
            });

            var allJsonObjectsPrev;
            if (prevJson !== "") {
              allJsonObjectsPrev = prevJson;
            } else {
              allJsonObjectsPrev = json;
            }
            allJsonObjectsPrev.forEach(function (item) {
              PrevKeywordsCount++;
              PrevTrafficCount =
                PrevTrafficCount + Math.round(item.monthly_clicks);
            });

            $("#organicSearchTraffic").html(TrafficCount);
            if (TrafficCount == PrevTrafficCount) {
              $(".organicSearchTraffic.changeDesc").html(
                "no changes for previous month"
              );
              $(".organicSearchTraffic .changeIcon").html("");
            } else if (TrafficCount > PrevTrafficCount) {
              organicTrafficDiff = TrafficCount - PrevTrafficCount;
              $(".organicSearchTraffic.changeDesc").html(
                organicTrafficDiff + " more than previous month"
              );
              $(".organicSearchTraffic .changeIcon").html(
                '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
              );
            } else {
              organicTrafficDiff = PrevTrafficCount - TrafficCount;
              $(".organicSearchTraffic.changeDesc").html(
                organicTrafficDiff + " less than previous month"
              );
              $(".organicSearchTraffic .changeIcon").html(
                '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
              );
            }

            $("#totalKeywords").html(KeywordsCount);
            if (KeywordsCount == PrevKeywordsCount) {
              $(".totalKeywords.changeDesc").html(
                "no changes for previous month"
              );
              $(".totalKeywords .changeIcon").html("");
            } else if (KeywordsCount > PrevKeywordsCount) {
              keywordsDiff = KeywordsCount - PrevKeywordsCount;
              $(".totalKeywords.changeDesc").html(
                keywordsDiff + " more than previous month"
              );
              $(".totalKeywords .changeIcon").html(
                '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
              );
            } else {
              keywordsDiff = PrevKeywordsCount - KeywordsCount;
              $(".totalKeywords.changeDesc").html(
                keywordsDiff + " less than previous month"
              );
              $(".totalKeywords .changeIcon").html(
                '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
              );
            }

            $("#tracked-keywords").html(
              TrackedKeywords.length + '/<span class="total">5</span>'
            );

            $("#keywordsTable").show();
            $("#keywordsTable tbody").empty();
            $("#MyKeywords .loader").hide();

            json.forEach(function (item) {
              KeywordsCount++;

              $("#keywordsTable tbody").append(
                "<tr><td><a href='javascript:void(0)' class='keywordLink'><span class='text-primary ms-2'>" +
                  item.term +
                  "</span></a></td><td class='text-center'><span class='grank'>" +
                  (item.url_position_change !== 0
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
                  "</span></td><td class='text-end'>" +
                  (item.url_position_change !== 0
                    ? item.url_position_change > 0
                      ? '<span class="positionUp2"><i class="fa fa-arrow-up" aria-hidden="true"></i>' +
                        item.url_position_change +
                        "</span>"
                      : '<span class="positionDown2"><i class="fa fa-arrow-down" aria-hidden="true"></i>' +
                        item.url_position_change +
                        "</span>"
                    : 0) +
                  "</td><td class='text-end'>" +
                  Math.round(item.monthly_clicks) +
                  "</td><td class='text-end'>" +
                  item.exact_local_monthly_search_volume +
                  "</td><td>" +
                  (item.seo_difficulty !== "" ? item.seo_difficulty : "N/A") +
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
                  "</span><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td class='text-end'>" +
                  (item.exact_cost_per_click !== 0
                    ? item.exact_cost_per_click.toFixed(2)
                    : item.exact_cost_per_click) +
                  "</td><td class='text-end'>" +
                  item.value_per_month.toFixed(2) +
                  "</td></tr>"
              );
            });
          } else {
            ShowNoty(response.error, "error");
          }

          $(".keywordsCount").text(KeywordsCount);

          $(document).trigger("function_a_complete");

          $("#keywordsTable tbody").on("click", ".keywordLink", function () {
            let KW = $(this).find("span").text();

            $("#SearchKeyWord").find(".Keyword").val(KW);
            $("#SearchKeyWord").submit();
          });
          $("#keywordsTable tbody").on(
            "click",
            ".start-tracking-btn",
            function () {
              var keywordText = $(this).data("id");
              console.log(keywordText);

              if (TrackedKeywords.length == 0 && membership == "free") {
                $("#startTrackingModal").modal("show");
                $(".trackKeywordText").html(keywordText);

                $("#startTrackingModal").on(
                  "click",
                  ".startTrackingBtn",
                  function () {
                    TrackKeywordsFunction(keywordText);
                  }
                );
              } else if (
                TrackedKeywords.length !== 0 &&
                TrackedKeywords.length < 51 &&
                membership == "pro"
              ) {
                $("#startTrackingModal").modal("show");
                $(".trackKeywordText").html(keywordText);

                $("#startTrackingModal").on(
                  "click",
                  ".startTrackingBtn",
                  function () {
                    TrackKeywordsFunction(keywordText);
                  }
                );
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
            }
          );
        },
        error: function (response) {
          console.log(response.error);
        },
      });
    }
  }

  $(document).bind("function_a_complete", initializeDatatables);

  function initializeDatatables() {
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

    // $(".table.list_viewTable").css('table-layout','fixed')

    $(".customExportBtn")
      .off()
      .on("click", function () {
        $(".dt-button.buttons-csv").trigger("click");
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
          // This row is already open - close it.
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
              '<div class="chartDiv"><h4 class="chart-title">Google Ranking Position</h4><span role="img" svgicon="hint" data-bs-toggle="popover" data-bs-placement="top" data-bs-custom-class="custom-popover" data-bs-title="Google Rank Tracking" data-bs-content="Now you can easily review historical ranking changes for any Tracked keyword. For instance, if you made a change to a page that ranks, check back to see if your changes affected its keyword rankings!" class="mat-icon" aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="hint"><i class="far fa-question-circle" aria-hidden="true"></i></span><div id="googleRankChartCanvas' +
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
                  // var KW = $(this).data('id');

                  StopTrackKeywordsFunction(keywordText);

                  row.child.hide();
                  tr.removeClass("shown");
                });
            }
          );

          $.ajax({
            type: "GET",
            url:
              "/site_audit/get_track_keyword/?project_id=" + selectedWebsiteId,

            success: function (response) {
              $(".webLoaderr").hide();
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

    $("#keywordsTable").DataTable().draw();
    VisibleColumns();
  }

  function VisibleColumns() {
    var checkboxes = $("#chooseColumns").find(
      $(".form-check-input:not(:checked)")
    );
    var checkboxesChecked = $("#chooseColumns").find(
      $(".form-check-input:is(:checked)")
    );

    // console.log(checkboxes)
    // Get the column API object

    for (let element of checkboxesChecked) {
      let item = $(element).attr("data-column");
      let headers = $("#keywordsTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();

      var columnNo = headers.indexOf(item);
      var column = $("#keywordsTable").DataTable().column(columnNo);
      // Toggle the visibility
      column.visible(true);
      $("#chooseData").find(".btn-close").trigger("click");
      $("#keywordsTable").DataTable().draw(true);
    }
    for (let element of checkboxes) {
      let item = $(element).attr("data-column");

      let headers = $("#keywordsTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();

      var columnNo = headers.indexOf(item);
      var column = $("#keywordsTable").DataTable().column(columnNo);
      // Toggle the visibility
      column.visible(false);
      $("#chooseData").find(".btn-close").trigger("click");
      $("#keywordsTable").DataTable().draw(true);
    }

    // Toggle the visibility
  }

  $("#columnFunction").click(function () {
    var checkboxes = $("#chooseColumns").find(
      $(".form-check-input:not(:checked)")
    );
    var checkboxesChecked = $("#chooseColumns").find(
      $(".form-check-input:is(:checked)")
    );

    // console.log(checkboxes)
    // Get the column API object

    for (let element of checkboxesChecked) {
      let item = $(element).attr("data-column");
      let headers = $("#keywordsTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();

      var columnNo = headers.indexOf(item);
      var column = $("#keywordsTable").DataTable().column(columnNo);
      // Toggle the visibility
      column.visible(true);
      $("#chooseData").find(".btn-close").trigger("click");
      $("#keywordsTable").DataTable().draw(true);
    }
    for (let element of checkboxes) {
      let item = $(element).attr("data-column");

      let headers = $("#keywordsTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();

      var columnNo = headers.indexOf(item);
      var column = $("#keywordsTable").DataTable().column(columnNo);
      // Toggle the visibility
      column.visible(false);
      $("#chooseData").find(".btn-close").trigger("click");
      $("#keywordsTable").DataTable().draw(true);
    }

    // Toggle the visibility
  });

  $(document).on("click", ".link-monthly-volume", function () {
    $("#dictionary").modal("show");
    openTab("", "WebsiteAuthority");
  });

  $(document).on("click", ".link-Organic-Search-Traffic", function () {
    $("#dictionary").modal("show");
    openTab("", "OrganicSearchTraffic");
  });
  $(document).on("click", ".link-Total-Number-of-Keywords", function () {
    $("#dictionary").modal("show");
    openTab("", "TotalNumberofKeywords");
  });

  function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }
  async function GetTrackedKeywords() {
    let KWResult;

    await $.ajax({
      type: "GET",
      url: "/site_audit/get_track_keyword/?project_id=" + selectedWebsiteId,

      success: function (response) {
        KWResult = response.track_keywords;
        KWResult = remove_duplicates_es6(KWResult);
      },
    });

    return Promise.resolve(KWResult);
  }
  function TrackKeywordsFunction(KW) {
    $(".trackKeywordText").html(KW);

    $.ajax({
      type: "POST",
      url: "/site_audit/save_track_keyword/",
      data: { project_id: selectedWebsiteId, keyword: KW, action: "start" },
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
              Get_Keywords(selectedWebsite);
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
    console.log(KW, " keywordText remove");

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
      url: "/site_audit/save_track_keyword/",
      data: { project_id: selectedWebsiteId, keyword: KW, action: "stop" },
      success: function (response) {
        if (response.status) {
          GetTrackedKeywords().then(function (result) {
            TrackedKeywords = result;
            Get_Keywords(selectedWebsite);
          });

          $("#stopTrackingConfirmedModal").modal("hide");
        } else {
          ShowNoty(response.error, "error");
        }
      },
    });
  }
});
