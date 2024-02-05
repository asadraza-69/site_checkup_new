$(".cv_add_analytics_button").on("click", function () {
  $(".cv_add_analytics_button  .google_spinner").css("opacity", "1");
});

$("#overlay_new").show();
var todayDate = new Date();
var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
var minDate = new Date(new Date().setDate(new Date().getDate() - 30));
$('input[name="daterange_behav"]').daterangepicker(
  {
    opens: "right",
    locale: {
      format: "MMM DD,YYYY",
      separator: " to ",
    },

    startDate: minDate,
    endDate: maxDate,
  },
  function (start, end, label) {}
);

var setInt = setInterval(behavFnc, 1000);
// behavour main content function
function behavFnc() {
  var project_id = $("option:selected").attr("data-id");
  if (project_id != undefined && project_id != "") {
    clearInterval(setInt);
    var chartwidth = $("#pageViewsChart").width();
    var WebPerfomanceArray = new Array();
    var WebsitePerfomanceArray = new Array();
    var EventCategoryArray = new Array();
    var pageViewsArray = new Array();
    var bounceRateArray = new Array();
    var bounceRateSLArray = new Array();
    var ExitPercSLArray = new Array();
    var pageViewsSparkLineArray = new Array();
    var AvgTimeOnPageArray = new Array();
    var UniquepageViewsSparkLineArray = new Array();
    var UserSearchArray = new Array();
    var PgsPerSessionArray = new Array();
    var PopularPagesArray = new Array();
    var PopularPageTitleBreakdownArray = new Array();
    var PopularPageTitleBreakdownViewsArray = new Array();
    var ContentGroupArray = new Array();
    var pageViews = [];
    var bounceRate = [];
    var AvgTimeOnPage = [];
    var PgsPerSession = [];
    var UserSearch = [];
    var EventCategory = [];
    var WebsitePerfomance = [];
    var WebPerfomance = [];
    var PopularPages = [];
    var PopuplarPageTitleBreakdown = [];
    var PopularPageTitleBreakdownViews = [];
    var total_LastAvgDuration = 0;
    var total_pageViews = 0;
    var total_UniquePageviews = 0;
    var total_SPBounceRate = 0;
    var total_SPExitPerc = 0;
    var total_SPPgsPerSession = 0;
    var startDate = $("#daterange").data("daterangepicker").startDate._d;
    var endDate = $("#daterange").data("daterangepicker").endDate._d;
    var fromdate = moment(startDate).format("YYYY-MM-DD");
    var todate = moment(endDate).format("YYYY-MM-DD");
    //   first ajax start
    $.ajax({
      method: "GET",
      url:
        "/site_audit/behaviour_overview/?project_id=" +
        project_id +
        "&fromdate=" +
        fromdate +
        "&todate=" +
        todate +
        "&continent=&deviceCategory=&channelGrouping=",
      success: function (res) {
        if (res && res.status === false) {
          $("#btn-toggle").on("click", function () {
            $("#add_analytics_button").toggle();
          });
          $("#main-tag").hide();
          $("#alternative_img").fadeIn("slow");
          $("#add_analytics_button").show();
          $("#overlay_new").hide();
          // ShowNoty(res.error,"error");
        } else {
          $("#alternative_img").fadeOut("slow");
          $("#main-tag").show();
          $("#add_analytics_button").hide();
          $("#overlay_new").hide();
          var table3 = res.table3;
          var table6 = res.table6;
          $.each(table3, function (i, val) {
            total_LastAvgDuration = val.avgTimeOnPage;
            total_pageViews = val.pageviews;
            total_UniquePageviews = val.uniquePageviews;
          });

          $("#Pageviews").html("");
          $("#Pageviews").html(total_pageViews);
          $("#UniquePageviews").html("");
          $("#UniquePageviews").html(total_UniquePageviews);
          $("#AvgPageTime").html("");
          $("#AvgPageTime").html(toHHMMSS(total_LastAvgDuration));

          // table6
          $.each(table6, function (i, val) {
            total_SPBounceRate = val.bounceRate;
            total_SPExitPerc = val.exitRate;
            total_SPPgsPerSession = val.pageviewsPerSession;
          });
          $("#BounceRate").html("");
          $("#BounceRate").html(
            Number(total_SPBounceRate * 100).toFixed(2) + "%"
          );
          $("#ExitPercentage").html("");
          $("#ExitPercentage").html(
            Number(total_SPExitPerc * 100).toFixed(2) + "%"
          );
          $("#PagesPerSession").html("");
          $("#PagesPerSession").html(Number(total_SPPgsPerSession).toFixed(2));
          // hide here
          $("#main-tag").fadeIn("slow");
          $("#overlay_new").hide();
          pageViews = res.userbehaviour_pageview_mainchart;
          AvgTimeOnPage = res.userbehaviour_pageview_mainchart_avgtime;
          bounceRate = res.userbehaviour_bouncerate_mainchart;
          PgsPerSession = res.userbehaviour_bouncerate_mainchart_pagepersession;
          PopularPages = res.userbehaviour_popularpage_mainchart;
          // var test = res.userbehaviour_popularpage_mainchart_pageviews;
          PopuplarPageTitleBreakdown =
            res.userbehaviour_popularpagewithtitle_mainchart;
          ContentGroup = res.userbehaviour_popularcontent_mainchart;
          UserSearch = res.userbehaviour_searchterm_mainchart;
          EventCategory = res.userbehaviour_eventcategory_mainchart;
          WebsitePerfomance = res.userbehaviour_loadtime_mainchart;
          WebPerfomance = res.userbehaviour_loadtime_mainchart_subchart;

          PopularPageTitleBreakdownViews =
            res.userbehaviour_popularpagewithtitle_mainchart_pagetitle;
          console.log(
            PopularPageTitleBreakdownViews,
            "PopularPageTitleBreakdownViews"
          );
          // dropdown start
          continentJson = res.dropdown_data;
          if (res.ac_type == "GA4") {
            $("#continentListlabel").text("Country");
          } else {
            $("#continentListlabel").text("Continent");
          }

          function returnRegionObj(obj) {
            let holder = {};
            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.region)) {
                holder[d.region] = holder[d.region] + d.Session;
              } else {
                holder[d.region] = d.Session;
              }
            });
            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ region: prop, Session: holder[prop] });
            }
            return obj2;
          }
          function returnContinentObj(obj) {
            let holder = {};
            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Continent)) {
                holder[d.Continent] = holder[d.Continent] + d.Session;
              } else {
                holder[d.Continent] = d.Session;
              }
            });
            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Continent: prop, Session: holder[prop] });
            }
            return obj2;
          }

          function returnDeviceObj(obj) {
            let holder = {};
            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Device)) {
                holder[d.Device] = holder[d.Device] + d.Session;
              } else {
                holder[d.Device] = d.Session;
              }
            });

            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Device: prop, Session: holder[prop] });
            }
            return obj2;
          }
          // channekl func
          function returnChannelObj(obj) {
            let holder = {};
            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Channel)) {
                holder[d.Channel] = holder[d.Channel] + d.Session;
              } else {
                holder[d.Channel] = d.Session;
              }
            });
            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Channel: prop, Session: holder[prop] });
            }

            return obj2;
          }
          // var datesArray= Object.keys(continentJson);
          var dates = [];
          $.each(continentJson, function (index, value) {
            dates.push(new Date(index));
          });
          function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
            let sum = [];
            [].concat(...arrayOfArrays).map(function (o) {
              let existing = sum.filter(function (i) {
                return i[propToCheck] === o[propToCheck];
              })[0];
              if (!existing) {
                sum.push(o);
              } else {
                existing[propToSum] += o[propToSum];
                let copyProps = Object.keys(o)
                  .filter((obj) => {
                    return existing[obj] !== o[obj];
                  })
                  .map((val) =>
                    val !== propToSum ? (existing[val] = o[val]) : null
                  );
              }
            });

            return sum;
          }
          var startDate;
          var endDate;
          var continentJsonFiltered = [];
          var continent = mergeArrays(
            Object.values(continentJson),
            "region",
            "Session"
          );
          var todayDate = new Date();
          var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
          var minDate = new Date(new Date().setDate(new Date().getDate() - 30));
          function getContinentCheckedCheckboxValues() {
            continentCheckboxArr = [];
            $.each(
              $('#continentList input[name="dropdown-group"]:checked'),
              function () {
                continentCheckboxArr.push($(this).val().trim());
              }
            );
            return continentCheckboxArr;
          }
          function getRegionCheckedCheckboxValues() {
            regionCheckboxArr = [];
            $.each(
              $('#RegionList input[name="dropdown-group"]:checked'),
              function () {
                regionCheckboxArr.push($(this).val().trim());
              }
            );
            return regionCheckboxArr;
          }

          function getChannelCheckedCheckboxValues() {
            channelCheckboxArr = [];
            $.each(
              $('#channelList input[name="dropdown-group"]:checked'),
              function () {
                channelCheckboxArr.push($(this).val().trim());
              }
            );
            return channelCheckboxArr;
          }
          function getDeviceCheckedCheckboxValues() {
            deviceCheckboxArr = [];
            $.each(
              $('#deviceList input[name="dropdown-group"]:checked'),
              function () {
                deviceCheckboxArr.push($(this).val().trim());
              }
            );
            return deviceCheckboxArr;
          }
          // checkbox

          InitDropdown(continent);
          $.each($('input[name="dropdown-group"]'), function () {
            $(this).prop("checked", true);
          });
          $(document).on(
            "click",
            "#continentList .btn-continentList",
            function () {
              $.each(
                $('#continentList input[name="dropdown-group"]'),
                function () {
                  $(this)
                    .parent()
                    .parent()
                    .find('input[name="dropdown-group"]')
                    .prop("checked", false);
                }
              );
            }
          );
          $(document).on("click", "#deviceList .btn-deviceList", function () {
            $.each($('#deviceList input[name="dropdown-group"]'), function () {
              $(this)
                .parent()
                .parent()
                .find('input[name="dropdown-group"]')
                .prop("checked", false);
            });
          });
          $(document).on("click", "#channelList .btn-channelList", function () {
            $.each($('#channelList input[name="dropdown-group"]'), function () {
              $(this)
                .parent()
                .parent()
                .find('input[name="dropdown-group"]')
                .prop("checked", false);
            });
          });
          $(document).on("click", ".btn-RegionList", function () {
            $.each($('#RegionList input[name="dropdown-group"]'), function () {
              $(this)
                .parent()
                .parent()
                .find('input[name="dropdown-group"]')
                .prop("checked", false);
            });
          });
          const filterByContinent = (arr1, arr2) => {
            let res = [];
            res = arr1.filter((el) => {
              return arr2.find((element) => {
                return element == el.Continent;
              });
            });
            return res;
          };
          const filterByRegion = (arr1, arr2) => {
            let res = [];
            res = arr1.filter((el) => {
              return arr2.find((element) => {
                return element == el.region;
              });
            });
            return res;
          };
          const filterByChannel = (arr1, arr2) => {
            let res = [];
            res = arr1.filter((el) => {
              return arr2.find((element) => {
                return element == el.Channel;
              });
            });
            return res;
          };
          const filterByDevice = (arr1, arr2) => {
            let res = [];
            res = arr1.filter((el) => {
              return arr2.find((element) => {
                return element == el.Device;
              });
            });
            return res;
          };
          //  var arr = []
          function InitDropdown(continent) {
            let nayaVariableContinent = returnContinentObj(continent);
            let nayaVariableRegion = returnRegionObj(continent);
            let nayaVariableDevice = returnDeviceObj(continent);
            let nayaVariableChannel = returnChannelObj(continent);
            $("#continentList").html("");
            $.each(nayaVariableContinent, function (index, value) {
              $(
                "#continentList"
              ).append(`<label class="dropdown-option continent">
   <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
  ${value.Continent} 
 </label>
 `);
              //   <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
            // device dropdown
            $("#deviceList").html("");
            $.each(nayaVariableDevice, function (index, value) {
              $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
              //   <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
            });
            // channal dropdoen
            $("#channelList").html("");
            $.each(nayaVariableChannel, function (index, value) {
              $("#channelList").append(`<label class="dropdown-option channell">
  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
  ${value.Channel}
</label>
`);
            });
            //    <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            $("#RegionList").html("");
            $.each(nayaVariableRegion, function (index, value) {
              $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region}
 </label>
 `);
            });
            //    <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          }

          function InitDropDownOnDeviceChange(continent5) {
            let nayaVariableContinent = returnContinentObj(continent5);
            let nayaVariableChannel = returnChannelObj(continent5);
            let nayaVariableRegion = returnRegionObj(continent5);

            // device dropdown
            $("#continentList,#channelList,#RegionList").html("");
            $.each(nayaVariableContinent, function (index, value) {
              $(
                "#continentList"
              ).append(`<label class="dropdown-option continent">
                  <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                  ${value.Continent} 
                  </label>
                  `);
              // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
            // channal dropdoen

            $.each(nayaVariableChannel, function (index, value) {
              $("#channelList").append(`<label class="dropdown-option channell">
                  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                  ${value.Channel}
                </label>
                `);
              //  <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            });
            $.each(nayaVariableRegion, function (index, value) {
              $("#RegionList").append(`<label class="dropdown-option region">
                <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                ${value.region} 
              </label>
              `);
              // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
          }
          function InitDropDownOnContinentChange(continent2) {
            let nayaVariableDevice = returnDeviceObj(continent2);
            let nayaVariableChannel = returnChannelObj(continent2);
            let nayaVariableRegion = returnRegionObj(continent2);

            // device dropdown
            $("#deviceList,#channelList,#RegionList").html("");
            $.each(nayaVariableDevice, function (index, value) {
              $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
              // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
            });
            // channal dropdoen

            $.each(nayaVariableChannel, function (index, value) {
              $("#channelList").append(`<label class="dropdown-option channell">
  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
  ${value.Channel} 
</label>
`);
              // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            });
            $.each(nayaVariableRegion, function (index, value) {
              $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region} 
 </label>
 `);
              // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
          }
          function InitDropDownOnChannelChange(continent4) {
            let nayaVariableDevice = returnDeviceObj(continent4);
            let nayaVariableContinent = returnContinentObj(continent4);
            let nayaVariableRegion = returnRegionObj(continent4);
            $("#deviceList,#continentList,#RegionList").html("");
            $.each(nayaVariableDevice, function (index, value) {
              $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
              // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
            });

            $.each(nayaVariableContinent, function (index, value) {
              $(
                "#continentList"
              ).append(`<label class="dropdown-option continent">
  <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
  ${value.Continent} 
  </label>
  `);
              // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });

            $.each(nayaVariableRegion, function (index, value) {
              $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region} 
 </label>
 `);
              // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
          }
          function InitDropDownOnRegionChange(continent3) {
            let nayaVariableContinent = returnContinentObj(continent3);
            let nayaVariableDevice = returnDeviceObj(continent3);
            let nayaVariableChannel = returnChannelObj(continent3);
            $("#deviceList,#channelList,#continentList").html("");

            $.each(nayaVariableContinent, function (index, value) {
              $(
                "#continentList"
              ).append(`<label class="dropdown-option continent">
<input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
${value.Continent} 
</label>
`);
              // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
            $.each(nayaVariableDevice, function (index, value) {
              $("#deviceList").append(`
   <label class="dropdown-option device">
 <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
 ${value.Device}
</label>

   `);
              // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
            });
            // channal dropdoen

            $.each(nayaVariableChannel, function (index, value) {
              $("#channelList").append(`<label class="dropdown-option channell">
 <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
 ${value.Channel} 
</label>
`);
              //  <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            });
          }

          // dropdown end
          // ------------
          $.each(pageViews, function (key, value) {
            pageViewsArray.push([
              new Date(value.Date),
              value["Pageviews"],
              value["Unique Pageviews"],
            ]);
            pageViewsSparkLineArray.push([
              new Date(value.Date),
              value["Pageviews"],
            ]);
            UniquepageViewsSparkLineArray.push([
              new Date(value.Date),
              value["Unique Pageviews"],
            ]);
          });
          $.each(AvgTimeOnPage, function (i, val) {
            AvgTimeOnPageArray.push([new Date(val.Date), val.avg_time_on_page]);
          });

          // ============
          $.each(bounceRate, function (i, val) {
            bounceRateArray.push([
              new Date(val.Date),
              val["Bounce Rate"] * 100,
              val["% Exit"] * 100,
            ]);
            bounceRateSLArray.push([
              new Date(val.Date),
              val["Bounce Rate"] * 100,
            ]);
            ExitPercSLArray.push([new Date(val.Date), val["% Exit"] * 100]);
          });
          $.each(PgsPerSession, function (i, val) {
            PgsPerSessionArray.push([
              new Date(val.Date),
              val["Pages / Session"],
            ]);
          });
          // ==========
          // ===========
          // $.each(PopuplarPageTitleBreakdown, function (i, val) {
          //   PopularPageTitleBreakdownArray.push([(val['Page Title']), (val['Users']), (val['New Users'])])
          // });
          $.each(PopularPageTitleBreakdownViews, function (i, val) {
            PopularPageTitleBreakdownArray.push([
              val["Page Title"],
              val["Pageviews"],
            ]);
          });
          // =============
          $.each(ContentGroup, function (i, val) {
            ContentGroupArray.push([
              val["Brands (Content Group)"],
              parseFloat(val["Pageviews"]),
            ]);
          });
          $.each(UserSearch, function (i, val) {
            UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
          });
          $.each(EventCategory, function (i, val) {
            EventCategoryArray.push([val["Event Category"], val["Pageviews"]]);
          });
          $.each(WebsitePerfomance, function (i, val) {
            WebsitePerfomanceArray.push([
              new Date(val.Date),
              val["Avg. Page Load Time (sec)"],
            ]);
          });
          $.each(WebPerfomance, function (i, val) {
            WebPerfomanceArray.push([
              val["Page Title"],
              val["Avg. Page Load Time (sec)"],
            ]);
          });

          $.each(PopularPageTitleBreakdownViews, function (i, val) {
            PopularPageTitleBreakdownViewsArray.push([
              val["Page Title"],
              val["Pageviews"],
            ]);
          });
          // ==========
          $(".pageViewsChart_spinner").hide();
          var data = new google.visualization.DataTable();
          data.addColumn("date", "Date");
          data.addColumn("number", "Pageviews");
          data.addColumn("number", "Unique Pageviews");
          data.addRows(pageViewsArray);
          var options = {
            title: "",
            lineWidth: 3,
            legend: { position: "top", alignment: "start" },
            hAxis: {
              textPosition: "out",
              slantedText: false,
              format: "MMM d",
              ticks: "true",
              showTextEvery: 3,
              min: 0,
              max: 10,
              gridlines: {
                count: 10,
                interval: 1,
              },
            },

            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidth,
            chartArea: {
              width: chartwidth,
              left: 40,
              top: 50,
              right: 20,
              bottom: 50,
              height: 150,
            },
          };

          var chart = new google.visualization.LineChart(
            document.getElementById("pageViewsChart")
          );

          chart.draw(data, options);

          google.charts.load("current", { packages: ["corechart", "table"] });
          google.charts.setOnLoadCallback(drawChart);
          function timeString(seconds) {
            var date = new Date(seconds * 1000).getTime(); // multiply by 1000 because Date() requires miliseconds
            var timeStr = date.toTimeString().split(" ")[0];
            return timeStr;
          }

          function toHHMMSS(val) {
            var sec_num = parseInt(val, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - hours * 3600) / 60);
            var seconds = sec_num - hours * 3600 - minutes * 60;

            if (hours < 10) {
              hours = "0" + hours;
            }
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            return hours + ":" + minutes + ":" + seconds;
          }
          function drawChart() {
            $(window).resize(function () {
              drawChart();
              drawChart1();
              drawChart2();
            });
            $.each(UserSearch, function (i, val) {
              UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
            });
            $(".bounceExit_spinner").hide();
            var BRdata = new google.visualization.DataTable();
            BRdata.addColumn("date", "Date");
            BRdata.addColumn("number", "Bounce Rate");
            BRdata.addColumn("number", "% Exit");
            BRdata.addRows(bounceRateArray);
            var BRoptions = {
              lineWidth: 3,
              hAxis: {
                textPosition: "out",
                slantedText: false,
                format: "MMM d",
                ticks: "true",
                showTextEvery: 3,

                gridlines: {
                  count: 10,
                  interval: 1,
                },
              },
              legend: {
                position: "top",
              },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidth,
              chartArea: {
                width: chartwidth,
                left: 40,
                top: 50,
                right: 20,
                bottom: 50,
                height: 150,
              },
            };

            $(".pageViewsChart_spinner").hide();
            var chart = new google.visualization.LineChart(
              document.getElementById("bounceExit")
            );
            chart.draw(BRdata, BRoptions);

            var websitePerformancechartwidth = $(
              "#WebsitePerformanceChart"
            ).width();
            var websitePerformanceData = new google.visualization.DataTable();
            websitePerformanceData.addColumn("date", "Date");
            websitePerformanceData.addColumn(
              "number",
              "Avg. Page Load Time (sec)"
            );
            websitePerformanceData.addRows(WebsitePerfomanceArray);

            var websitePerformanceOptions = {
              lineWidth: 1,
              hAxis: {
                title: "",
                format: "MMM d",
              },
              legend: {
                position: "top",
              },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: websitePerformancechartwidth,
              chartArea: {
                width: websitePerformancechartwidth,
                left: 40,
                top: 20,
                right: 20,
                height: 150,
              },
            };
            var websitePerformanceChart = new google.visualization.LineChart(
              document.getElementById("WebsitePerformanceChart")
            );
            websitePerformanceChart.draw(
              websitePerformanceData,
              websitePerformanceOptions
            );
            var websitePerformanceTbl = new google.visualization.DataTable();
            websitePerformanceTbl.addColumn("string", "Page Title");
            websitePerformanceTbl.addColumn(
              "number",
              "Avg. Page Load Time (sec)"
            );
            websitePerformanceTbl.addRows(WebPerfomanceArray);
            if (WebPerfomanceArray.length > 0) {
              $(".pageViewsChart_spinner").hide();
              var tableWebsitePerformance = new google.visualization.Table(
                document.getElementById("WebsitePerformanceTable")
              );
              let websitePerformanceTblformatter =
                new google.visualization.ColorFormat();
              websitePerformanceTblformatter.addGradientRange(
                WebPerfomanceArray[WebPerfomanceArray.length - 1][1],
                WebPerfomanceArray[0][1] + 1,
                "#000",
                "#93b136",
                "#ffa800"
              );
              websitePerformanceTblformatter.format(websitePerformanceTbl, 1); // Apply formatter to second column
              tableWebsitePerformance.draw(websitePerformanceTbl, {
                allowHtml: true,
                showRowNumber: true,
                width: "100%",
                height: "100%",
                pageSize: 100,
                page: "enable",
              });
            }
            // second page
            var usersCountchartwidth = $(".grid-item").width() / 1.5;
            var optionsSparkLine = {
              tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
              title: "",
              lineWidth: 1,
              legend: { position: "top", alignment: "start" },
              hAxis: {
                format: "MMM d",
                gridlines: { color: "transparent" },
                baselineColor: "none",
                textPosition: "none",
              },
              vAxis: {
                gridlines: { color: "transparent" },
                baselineColor: "none",
                minValue: 0,
                format: "short",
                textPosition: "none",
              },
              series: {
                0: { color: "#ffa800" },
              },

              width: usersCountchartwidth,
              height: 40,
              chartArea: {
                width: usersCountchartwidth,
                right: 0,
                left: 0,
                top: 0,
                height: 100,
              },
            };
            var optionsSparkLineTime = {
              tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
              title: "",
              lineWidth: 1,
              legend: { position: "top", alignment: "start" },
              hAxis: {
                format: "hh:mm:ss",
                gridlines: { color: "transparent" },
                baselineColor: "none",
                textPosition: "none",
              },
              vAxis: {
                gridlines: { color: "transparent" },
                baselineColor: "none",
                minValue: 0,
                format: "short",
                textPosition: "none",
              },
              series: {
                0: { color: "#ffa800" },
              },

              width: usersCountchartwidth,
              height: 40,
              chartArea: {
                width: usersCountchartwidth,
                right: 0,
                left: 0,
                top: 0,
                height: 100,
              },
            };

            var SPlinePageviews = new google.visualization.DataTable();
            SPlinePageviews.addColumn("date", "Date");
            SPlinePageviews.addColumn("number", "Pageviews");
            SPlinePageviews.addRows(pageViewsSparkLineArray);
            var SLUser = new google.visualization.LineChart(
              document.getElementById("PageviewsGraph")
            );
            SLUser.draw(SPlinePageviews, optionsSparkLine);

            var SPlineUniqiePageviews = new google.visualization.DataTable();
            SPlineUniqiePageviews.addColumn("date", "Date");
            SPlineUniqiePageviews.addColumn("number", "Unique Pageviews");
            SPlineUniqiePageviews.addRows(UniquepageViewsSparkLineArray);
            var SLUser = new google.visualization.LineChart(
              document.getElementById("UniquePageviewsGraph")
            );
            SLUser.draw(SPlineUniqiePageviews, optionsSparkLine);

            if (bounceRate.length > 0) {
              var SPlineBounceRate = new google.visualization.DataTable();
              SPlineBounceRate.addColumn("date", "Date");
              SPlineBounceRate.addColumn("number", "Bounce Rate");
              SPlineBounceRate.addRows(bounceRateSLArray);
              var SLUser = new google.visualization.LineChart(
                document.getElementById("BounceRateChart")
              );
              SLUser.draw(SPlineBounceRate, optionsSparkLine);
              let BounceRateObj = bounceRate[bounceRate.length - 1];
              let SPBounceRate = BounceRateObj["Bounce Rate"];

              var SPlineExitPerc = new google.visualization.DataTable();
              SPlineExitPerc.addColumn("date", "Date");
              SPlineExitPerc.addColumn("number", "% Exit");
              SPlineExitPerc.addRows(ExitPercSLArray);
              var SLUserEP = new google.visualization.LineChart(
                document.getElementById("ExitPercentageChart")
              );
              SLUserEP.draw(SPlineExitPerc, optionsSparkLine);
              let ExitPercObj = bounceRate[bounceRate.length - 1];
              let SPExitPerc = ExitPercObj["% Exit"];
            }

            if (PgsPerSession.length > 0) {
              var SPlinePgsPerSession = new google.visualization.DataTable();
              SPlinePgsPerSession.addColumn("date", "Date");
              SPlinePgsPerSession.addColumn("number", "Pages / Session");
              SPlinePgsPerSession.addRows(PgsPerSessionArray);
              var SLPgsPerSession = new google.visualization.LineChart(
                document.getElementById("PagesPerSessionChart")
              );
              SLPgsPerSession.draw(SPlinePgsPerSession, optionsSparkLine);
              let PgsPerSessionObj = PgsPerSession[PgsPerSession.length - 1];
              let SPPgsPerSession = PgsPerSessionObj["Pages / Session"];
            }
            if (AvgTimeOnPage.length > 0) {
              let LastObjAvgDuration = AvgTimeOnPage[AvgTimeOnPage.length - 1];
              let LastAvgDuration = LastObjAvgDuration.avg_time_on_page;

              var SPlineAvgTimeOnPage = new google.visualization.DataTable();
              SPlineAvgTimeOnPage.addColumn("date", "Date");
              SPlineAvgTimeOnPage.addColumn("number", "avg_time_on_page");
              SPlineAvgTimeOnPage.addRows(AvgTimeOnPageArray);
              var SLAvgTimeOnPage = new google.visualization.LineChart(
                document.getElementById("AvgPageTimeGraph")
              );
              SLAvgTimeOnPage.draw(SPlineAvgTimeOnPage, optionsSparkLineTime);
            }
            // doughnuts chart
            $.each(PopularPages, function (i, val) {
              PopularPagesArray.push([val["Page"], val["Pageviews"]]);
            });

            $(".pageViewsChart_spinner").hide();
            var popularPageData = google.visualization.arrayToDataTable([
              ["Page", "Pageviews"],
              ...PopularPagesArray,
            ]);

            var PopularPagesoptions = {
              title: "",
              pieHole: 0.4,
              legend: {
                position: "right",
                alignment: "middle",
                fullWidth: true,
                reverse: false,
                labeledValueText: true,
                labels: {
                  usePointStyle: true,
                  boxWidth: 6,

                  fontSize: 12,
                  fontStyle: "bold",
                  fontColor: "#666",
                },
              },
              colors: [
                "#0072f0",
                "#f10096",
                "#00b6cb",
                "#03a9f4",
                "#737373",
                "#5e35b1",
                "#f15a60",
                "#ec407a",
                "#7ac36a",
                "#ffa800",
                "#0072f0",
                "#f10096",
                "#00b6cb",
                "#03a9f4",
                "#737373",
                "#5e35b1",
                "#f15a60",
                "#ec407a",
                "#7ac36a",
                "#ffa800",
              ],

              sliceVisibilityThreshold: 0.024,
              chartArea: {
                right: 0,
                left: 0,
                top: 20,
                width: "100%",
                height: "100%",
              },
            };
            var PopularPagesoptionschart = new google.visualization.PieChart(
              document.getElementById("myChart")
            );
            PopularPagesoptionschart.draw(popularPageData, PopularPagesoptions);

            $(".pageViewsChart_spinner").hide();
            var PopularPagesTable = new google.visualization.DataTable();
            PopularPagesTable.addColumn("string", "Page");
            PopularPagesTable.addColumn("number", "Page Views");
            PopularPagesTable.addRows(PopularPagesArray);
            var table = new google.visualization.Table(
              document.getElementById("PageViewsTable")
            );
            let formatter = new google.visualization.ColorFormat();
            formatter.addGradientRange(
              PopularPagesArray[PopularPagesArray.length - 1][1],
              PopularPagesArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            formatter.format(PopularPagesTable, 1); // Apply formatter to second column
            table.draw(PopularPagesTable, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
            $(".pageViewsChart_spinner").hide();
            google.load("visualization", "1", { packages: ["corechart"] });
            var DataSearchArray = [["Search Term", "Pageviews"]];
            DataSearchArray = [...DataSearchArray, ...UserSearchArray];
            var DataSearchArrayChart =
              google.visualization.arrayToDataTable(DataSearchArray);
            var UserSearchOptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
                ticks: true,
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              isStacked: "true",
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthTitleBreakDown,
              chartArea: {
                width: chartwidthTitleBreakDown,
                right: 20,
                left: "40%",
                top: 20,
                bottom: 20,
                height: 150,
              },

              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "80%" },
            };
            var chartUserSearch = new google.visualization.BarChart(
              document.getElementById("UserSearchChart")
            );
            chartUserSearch.draw(DataSearchArrayChart, UserSearchOptions);
            var dataUserSearch = new google.visualization.DataTable();
            dataUserSearch.addColumn("string", "Search Term");
            dataUserSearch.addColumn("number", "Pageviews");
            dataUserSearch.addRows(UserSearchArray);
            $(".pageViewsChart_spinner").hide();
            var tableUserSearch = new google.visualization.Table(
              document.getElementById("UserSearchTable")
            );
            tableUserSearch.draw(dataUserSearch, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
            // eventchrt start
            $(".pageViewsChart_spinner").hide();
            var chartwidthEventCategory = $("#EventCategoryChart").width();
            var DataCEventCategory = [["Event Category", "Pageviews"]];
            DataCEventCategory = [...DataCEventCategory, ...EventCategoryArray];
            // The first chart
            var chartEventCategory =
              google.visualization.arrayToDataTable(DataCEventCategory);
            var EventCategoryoptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              // isStacked: 'true',
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthEventCategory,
              chartArea: {
                width: chartwidthEventCategory,
                right: 20,
                left: "20%",
                top: 20,
                bottom: 20,
                height: 150,
              },

              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "90%" },
            };

            var chartEventCategoryVar = new google.visualization.BarChart(
              document.getElementById("EventCategoryChart")
            );
            chartEventCategoryVar.draw(
              chartEventCategory,
              EventCategoryoptions
            );
            $(".pageViewsChart_spinner").hide();
            var dataEventCategorytbl = new google.visualization.DataTable();
            dataEventCategorytbl.addColumn("string", "Event Category");
            dataEventCategorytbl.addColumn("number", "Pageviews");
            dataEventCategorytbl.addRows(EventCategoryArray);
            var tableEventCategory = new google.visualization.Table(
              document.getElementById("EventCategoryTable")
            );
            tableEventCategory.draw(dataEventCategorytbl, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
            $(".pageViewsChart_spinner").hide();
            var chartwidthTitleBreakDown = $("#PageTitleBreakDown").width();
            // var dataPageTitleBreakdown = [
            //   ['Page Title', 'Users', 'New Users']

            // ];
            var dataPageTitleBreakdown = [["Page Title", "page Views"]];
            dataPageTitleBreakdown = [
              ...dataPageTitleBreakdown,
              ...PopularPageTitleBreakdownArray,
            ];
            console.log(
              PopularPageTitleBreakdownArray,
              "dataPageTitleBreakdown"
            );
            google.setOnLoadCallback(drawChart1);
            function drawChart1() {
              var datachartPageTitleBreakdown =
                google.visualization.arrayToDataTable(dataPageTitleBreakdown);
              var TitleBreakdownoptions = {
                title: "",
                hAxis: {
                  title: "",
                  format: "short",
                  showTextEvery: 1,
                  ticks: true,
                }, // sets
                vAxis: {
                  textPosition: "out",
                  slantedText: false,
                  showTextEvery: 1,
                },
                backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
                isStacked: "true",
                legend: { position: "top", alignment: "left" },
                series: {
                  0: { color: "#f66d00" },
                  1: { color: "#ffa800" },
                },
                width: chartwidthTitleBreakDown,
                chartArea: {
                  width: chartwidthTitleBreakDown,
                  right: 20,
                  left: "40%",
                  top: 20,
                  bottom: 20,
                  height: 150,
                },

                pagingButtonsConfiguration: "auto",
                bars: "horizontal",
                bar: { groupWidth: "80%" },
              };

              var chartPageTitleBreakdown = new google.visualization.BarChart(
                document.getElementById("PageTitleBreakDown")
              );
              chartPageTitleBreakdown.draw(
                datachartPageTitleBreakdown,
                TitleBreakdownoptions
              );
            }
            var dataPopularPages = new google.visualization.DataTable();
            dataPopularPages.addColumn("string", "Page Title");
            dataPopularPages.addColumn("number", "Page Views");
            dataPopularPages.addRows(PopularPageTitleBreakdownViewsArray);
            var table = new google.visualization.Table(
              document.getElementById("PageViewsTitleTable")
            );
            let dataPopularPagesformatter =
              new google.visualization.ColorFormat();
            dataPopularPagesformatter.addGradientRange(
              PopularPageTitleBreakdownViewsArray[
                PopularPageTitleBreakdownViewsArray.length - 1
              ][1],
              PopularPageTitleBreakdownViewsArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            dataPopularPagesformatter.format(dataPopularPages, 1); // Apply formatter to second column
            table.draw(dataPopularPages, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
            $(".pageViewsChart_spinner").hide();
            var chartwidthContentGroup = $("#ContentGroupChart").width();
            var DataContentGroup = [["Brands (Content Group)", "Pageviews"]];
            DataContentGroup = [...DataContentGroup, ...ContentGroupArray];
            google.setOnLoadCallback(drawChart2);
            function drawChart2() {
              var chartDataContentGroup =
                google.visualization.arrayToDataTable(DataContentGroup);
              var ContentGroupoptions = {
                title: "",
                hAxis: {
                  title: "",
                  format: "short",
                  showTextEvery: 1,
                }, // sets
                vAxis: {
                  textPosition: "out",
                  slantedText: false,
                  showTextEvery: 1,
                },
                backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
                // isStacked: 'true',
                legend: { position: "top", alignment: "left" },
                series: {
                  0: { color: "#f66d00" },
                  1: { color: "#ffa800" },
                },
                width: chartwidthContentGroup,
                chartArea: {
                  width: chartwidthContentGroup,
                  right: 20,
                  left: "40%",
                  top: 20,
                  bottom: 20,
                  height: 150,
                },
                pagingButtonsConfiguration: "auto",
                bars: "horizontal",
                bar: { groupWidth: "90%" },
              };
              var chartContentGroup = new google.visualization.BarChart(
                document.getElementById("ContentGroupChart")
              );
              chartContentGroup.draw(
                chartDataContentGroup,
                ContentGroupoptions
              );
              $(".pageViewsChart_spinner").hide();
              var dataContentGrouptbl = new google.visualization.DataTable();
              dataContentGrouptbl.addColumn("string", "Brands (Content Group)");
              dataContentGrouptbl.addColumn("number", "Pageviews");
              dataContentGrouptbl.addRows(ContentGroupArray);
              var tableContentGroup = new google.visualization.Table(
                document.getElementById("ContentGroupTable")
              );
              let dataContentGrouptblformatter =
                new google.visualization.ColorFormat();
              dataContentGrouptblformatter.addGradientRange(
                ContentGroupArray[ContentGroupArray.length - 1][1],
                ContentGroupArray[0][1] + 1,
                "#000",
                "#93b136",
                "#ffa800"
              );
              dataContentGrouptblformatter.format(dataContentGrouptbl, 1); // Apply formatter to second column
              tableContentGroup.draw(dataContentGrouptbl, {
                allowHtml: true,
                showRowNumber: true,
                width: "100%",
                height: "100%",
                pageSize: 10,
                page: "enable",
              });
            }
            var continentJson;
            var continentCheckboxArr = [];
            var regionCheckboxArr = [];
            var channelCheckboxArr = [];
            var deviceCheckboxArr = [];
          }
        }
      },
    });

    // first ajax end
  }
}
// apply date time to filter data
$(".applyBtn").on("click", function () {
  // show here
  $("#main-tag").fadeOut("slow");
  $("#overlay_new").show();
  behavFnc();
});

$(document).on("change", 'input[name="dropdown-group"]', function () {
  // show here
  $("#main-tag").fadeOut("slow");
  $("#overlay_new").show();

  var chartwidth = $("#pageViewsChart").width();
  var WebPerfomanceArray = new Array();
  var WebsitePerfomanceArray = new Array();
  var EventCategoryArray = new Array();
  var pageViewsArray = new Array();
  var bounceRateArray = new Array();
  var bounceRateSLArray = new Array();
  var ExitPercSLArray = new Array();
  var pageViewsSparkLineArray = new Array();
  var AvgTimeOnPageArray = new Array();
  var UniquepageViewsSparkLineArray = new Array();
  var UserSearchArray = new Array();
  var PgsPerSessionArray = new Array();
  var PopularPagesArray = new Array();
  var PopularPageTitleBreakdownArray = new Array();
  var PopularPageTitleBreakdownViewsArray = new Array();
  var ContentGroupArray = new Array();
  var pageViews = [];
  var bounceRate = [];
  var AvgTimeOnPage = [];
  var PgsPerSession = [];
  var UserSearch = [];
  var EventCategory = [];
  var WebsitePerfomance = [];
  var WebPerfomance = [];
  var PopularPages = [];
  var PopuplarPageTitleBreakdown = [];
  var PopularPageTitleBreakdownViews = [];
  var continentArray = [];
  var regionArray = [];
  var channelArray = [];
  var deviceArray = [];
  var continentJson;
  var total_LastAvgDuration = 0;
  var total_pageViews = 0;
  var total_UniquePageviews = 0;
  var total_SPBounceRate = 0;
  var total_SPExitPerc = 0;
  var total_SPPgsPerSession = 0;
  var continentCheckboxArr = [];
  var regionCheckboxArr = [];
  var channelCheckboxArr = [];
  var deviceCheckboxArr = [];

  var testArray1 = [];
  // $("#continentList input[name='dropdown-group']:checked").val();
  $('#continentList input[name="dropdown-group"]:checked').each(function (
    i,
    val
  ) {
    continentArray.push(this.value);

    testArray1.push({ value: this.value });
  });

  var continentToString = continentArray.toString().trim();
  $('#RegionList input[name="dropdown-group"]:checked').each(function () {
    regionArray.push(this.value);
  });
  var regionToString = regionArray.toString().trim();
  $('#channelList input[name="dropdown-group"]:checked').each(function () {
    channelArray.push(this.value);
  });
  var channelToString = channelArray.toString().trim();
  $('#deviceList input[name="dropdown-group"]:checked').each(function () {
    deviceArray.push(this.value);
  });
  var deviceToString = deviceArray.toString().trim();

  var startDate = $("#daterange").data("daterangepicker").startDate._d;
  var endDate = $("#daterange").data("daterangepicker").endDate._d;
  var fromdate = moment(startDate).format("YYYY-MM-DD");
  var todate = moment(endDate).format("YYYY-MM-DD");
  var project_id = $("option:selected").attr("data-id");
  //   first ajax start

  $.ajax({
    method: "GET",
    url:
      "/site_audit/behaviour_overview/?project_id=" +
      project_id +
      "&fromdate=" +
      fromdate +
      "&todate=" +
      todate +
      "&continent=" +
      continentToString +
      "&region=" +
      regionToString +
      "&deviceCategory=" +
      deviceToString +
      "&channelGrouping=" +
      channelToString,
    success: function (res) {
      if (res && res.status === false) {
        $("#btn-toggle").on("click", function () {
          $("#add_analytics_button").toggle();
        });
        $("#main-tag").hide();
        $("#alternative_img").fadeIn("slow");
        $("#add_analytics_button").show();
        // ShowNoty(res.error,"error");
      } else {
        $("#alternative_img").fadeOut("slow");
        $("#main-tag").show();
        $("#add_analytics_button").hide();
        var table3 = res.table3;
        var table6 = res.table6;
        $.each(table3, function (i, val) {
          total_LastAvgDuration = val.avgTimeOnPage;
          total_pageViews = val.pageviews;
          total_UniquePageviews = val.uniquePageviews;
        });

        $("#Pageviews").html("");
        $("#Pageviews").html(total_pageViews);
        $("#UniquePageviews").html("");
        $("#UniquePageviews").html(total_UniquePageviews);
        $("#AvgPageTime").html("");
        $("#AvgPageTime").html(toHHMMSS(total_LastAvgDuration));

        // table6
        $.each(table6, function (i, val) {
          total_SPBounceRate = val.bounceRate;
          total_SPExitPerc = val.exitRate;
          total_SPPgsPerSession = val.pageviewsPerSession;
        });
        $("#BounceRate").html("");
        $("#BounceRate").html(
          Number(total_SPBounceRate * 100).toFixed(2) + "%"
        );
        $("#ExitPercentage").html("");
        $("#ExitPercentage").html(
          Number(total_SPExitPerc * 100).toFixed(2) + "%"
        );
        $("#PagesPerSession").html("");
        $("#PagesPerSession").html(Number(total_SPPgsPerSession).toFixed(2));
        // hide here
        $("#main-tag").fadeIn("slow");
        $("#overlay_new").hide();
        pageViews = res.userbehaviour_pageview_mainchart;
        AvgTimeOnPage = res.userbehaviour_pageview_mainchart_avgtime;
        bounceRate = res.userbehaviour_bouncerate_mainchart;
        PgsPerSession = res.userbehaviour_bouncerate_mainchart_pagepersession;
        PopularPages = res.userbehaviour_popularpage_mainchart;
        // var test = res.userbehaviour_popularpage_mainchart_pageviews;
        PopuplarPageTitleBreakdown =
          res.userbehaviour_popularpagewithtitle_mainchart;
        ContentGroup = res.userbehaviour_popularcontent_mainchart;
        UserSearch = res.userbehaviour_searchterm_mainchart;
        EventCategory = res.userbehaviour_eventcategory_mainchart;
        WebsitePerfomance = res.userbehaviour_loadtime_mainchart;
        WebPerfomance = res.userbehaviour_loadtime_mainchart_subchart;
        PopularPageTitleBreakdownViews =
          res.userbehaviour_popularpagewithtitle_mainchart_pagetitle;

        //  pageViews = [{ "Date": "8-Aug-22", "Pageviews": 12398, "Unique Pageviews": 18789 }, { "Date": "9-Aug-22", "Pageviews": 12928, "Unique Pageviews": 91230 }, { "Date": "10-Aug-22", "Pageviews": 19051, "Unique Pageviews": 903 }, { "Date": "11-Aug-22", "Pageviews": 6989, "Unique Pageviews": 4803 }, { "Date": "12-Aug-22", "Pageviews": 17200, "Unique Pageviews": 41766 }, { "Date": "15-Aug-22", "Pageviews": 1580, "Unique Pageviews": 9767 }, { "Date": "16-Aug-22", "Pageviews": 14991, "Unique Pageviews": 9797 }, { "Date": "17-Aug-22", "Pageviews": 15418, "Unique Pageviews": 10003 }, { "Date": "18-Aug-22", "Pageviews": 15954, "Unique Pageviews": 10602 }, { "Date": "19-Aug-22", "Pageviews": 14216, "Unique Pageviews": 8933 }, { "Date": "20-Aug-22", "Pageviews": 6637, "Unique Pageviews": 4349 }, { "Date": "21-Aug-22", "Pageviews": 7391, "Unique Pageviews": 4908 }, { "Date": "22-Aug-22", "Pageviews": 15487, "Unique Pageviews": 10160 }, { "Date": "23-Aug-22", "Pageviews": 16880, "Unique Pageviews": 11378 }, { "Date": "24-Aug-22", "Pageviews": 15696, "Unique Pageviews": 10227 }, { "Date": "25-Aug-22", "Pageviews": 16460, "Unique Pageviews": 10917 }, { "Date": "26-Aug-22", "Pageviews": 16598, "Unique Pageviews": 10827 }, { "Date": "27-Aug-22", "Pageviews": 6410, "Unique Pageviews": 4450 }, { "Date": "28-Aug-22", "Pageviews": 7653, "Unique Pageviews": 5088 }, { "Date": "29-Aug-22", "Pageviews": 14873, "Unique Pageviews": 9871 }, { "Date": "30-Aug-22", "Pageviews": 13146, "Unique Pageviews": 9081 }, { "Date": "31-Aug-22", "Pageviews": 14105, "Unique Pageviews": 9505 }, { "Date": "1-Sep-22", "Pageviews": 13936, "Unique Pageviews": 9194 }, { "Date": "2-Sep-22", "Pageviews": 11848, "Unique Pageviews": 7881 }, { "Date": "3-Sep-22", "Pageviews": 6404, "Unique Pageviews": 4189 }, { "Date": "4-Sep-22", "Pageviews": 5239, "Unique Pageviews": 3755 }, { "Date": "5-Sep-22", "Pageviews": 7744, "Unique Pageviews": 5442 }, { "Date": "6-Sep-22", "Pageviews": 14679, "Unique Pageviews": 9890 }, { "Date": "7-Sep-22", "Pageviews": 13882, "Unique Pageviews": 9292 }, { "Date": "8-Sep-22", "Pageviews": 14228, "Unique Pageviews": 9661 }]
        continentJson = res.dropdown_data;
        if (res.ac_type == "GA4") {
          $("#continentListlabel").text("Country");
        } else {
          $("#continentListlabel").text("Continent");
        }

        // ------------
        $.each(pageViews, function (key, value) {
          pageViewsArray.push([
            new Date(value.Date),
            value["Pageviews"],
            value["Unique Pageviews"],
          ]);
          pageViewsSparkLineArray.push([
            new Date(value.Date),
            value["Pageviews"],
          ]);
          UniquepageViewsSparkLineArray.push([
            new Date(value.Date),
            value["Unique Pageviews"],
          ]);
        });
        $.each(AvgTimeOnPage, function (i, val) {
          AvgTimeOnPageArray.push([new Date(val.Date), val.avg_time_on_page]);
        });

        // ============
        $.each(bounceRate, function (i, val) {
          bounceRateArray.push([
            new Date(val.Date),
            val["Bounce Rate"] * 100,
            val["% Exit"] * 100,
          ]);
          bounceRateSLArray.push([
            new Date(val.Date),
            val["Bounce Rate"] * 100,
          ]);
          ExitPercSLArray.push([new Date(val.Date), val["% Exit"] * 100]);
        });
        $.each(PgsPerSession, function (i, val) {
          PgsPerSessionArray.push([new Date(val.Date), val["Pages / Session"]]);
        });
        // ==========
        // ===========
        $.each(PopuplarPageTitleBreakdown, function (i, val) {
          PopularPageTitleBreakdownArray.push([
            val["Page Title"],
            val["Users"],
            val["New Users"],
          ]);
        });
        // =============
        $.each(ContentGroup, function (i, val) {
          ContentGroupArray.push([
            val["Brands (Content Group)"],
            parseFloat(val["Pageviews"]),
          ]);
        });
        $.each(UserSearch, function (i, val) {
          UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
        });
        $.each(EventCategory, function (i, val) {
          EventCategoryArray.push([val["Event Category"], val["Pageviews"]]);
        });
        $.each(WebsitePerfomance, function (i, val) {
          WebsitePerfomanceArray.push([
            new Date(val.Date),
            val["Avg. Page Load Time (sec)"],
          ]);
        });
        $.each(WebPerfomance, function (i, val) {
          WebPerfomanceArray.push([
            val["Page Title"],
            val["Avg. Page Load Time (sec)"],
          ]);
        });

        $.each(PopularPageTitleBreakdownViews, function (i, val) {
          PopularPageTitleBreakdownViewsArray.push([
            val["Page Title"],
            val["Pageviews"],
          ]);
        });

        // ==========
        $(".pageViewsChart_spinner").hide();

        var data = new google.visualization.DataTable();
        data.addColumn("date", "Date");
        data.addColumn("number", "Pageviews");
        data.addColumn("number", "Unique Pageviews");
        data.addRows(pageViewsArray);

        // let tickMarks = [];
        // for (let i = 0; i < data.getNumberOfRows(); i++) {
        //   tickMarks.push(data.getValue(i, 0));
        // }

        var options = {
          title: "",
          lineWidth: 3,
          legend: { position: "top", alignment: "start" },
          // vAxis: {
          //   minValue: 0,
          //   title: '',
          //   format: 'short',
          //   showTextEvery: 1,
          //   "ticks": [0, 5000, 10000, 15000, 20000],

          // },  // sets
          hAxis: {
            textPosition: "out",
            slantedText: false,
            format: "MMM d",
            ticks: "true",
            showTextEvery: 3,

            gridlines: {
              count: 10,
              interval: 1,
            },
          },

          series: {
            0: { color: "#f66d00" },
            1: { color: "#ffa800" },
          },
          width: chartwidth,
          chartArea: {
            width: chartwidth,
            left: 40,
            top: 50,
            right: 20,
            bottom: 50,
            height: 150,
          },
        };

        var chart = new google.visualization.LineChart(
          document.getElementById("pageViewsChart")
        );

        chart.draw(data, options);

        google.charts.load("current", { packages: ["corechart", "table"] });
        google.charts.setOnLoadCallback(drawChart);
        function timeString(seconds) {
          var date = new Date(seconds * 1000).getTime(); // multiply by 1000 because Date() requires miliseconds
          var timeStr = date.toTimeString().split(" ")[0];
          return timeStr;
        }

        function toHHMMSS(val) {
          var sec_num = parseInt(val, 10); // don't forget the second param
          var hours = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - hours * 3600) / 60);
          var seconds = sec_num - hours * 3600 - minutes * 60;

          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return hours + ":" + minutes + ":" + seconds;
        }

        function drawChart() {
          $(window).resize(function () {
            drawChart();
            drawChart1();
            drawChart2();
          });

          $.each(UserSearch, function (i, val) {
            UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
          });

          $(".bounceExit_spinner").hide();
          var BRdata = new google.visualization.DataTable();
          BRdata.addColumn("date", "Date");
          BRdata.addColumn("number", "Bounce Rate");
          BRdata.addColumn("number", "% Exit");

          BRdata.addRows(bounceRateArray);
          // let BRtickMarks = [];
          // for (let j = 0; j < BRdata.getNumberOfRows(); j++) {
          //   BRtickMarks.push(BRdata.getValue(j, 0));
          // }

          var BRoptions = {
            lineWidth: 3,
            hAxis: {
              textPosition: "out",
              slantedText: false,
              format: "MMM d",
              ticks: "true",
              showTextEvery: 3,

              gridlines: {
                count: 10,
                interval: 1,
              },
            },
            // vAxis: {
            //     showTextEvery: 1,
            //   format: '#\'%\'',
            //     "ticks": [0, 25, 50, 75, 100],
            // },
            legend: {
              position: "top",
            },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidth,
            chartArea: {
              width: chartwidth,
              left: 40,
              top: 50,
              right: 20,
              bottom: 50,
              height: 150,
            },
          };

          $(".pageViewsChart_spinner").hide();
          var chart = new google.visualization.LineChart(
            document.getElementById("bounceExit")
          );
          chart.draw(BRdata, BRoptions);

          var websitePerformancechartwidth = $(
            "#WebsitePerformanceChart"
          ).width();
          var websitePerformanceData = new google.visualization.DataTable();
          websitePerformanceData.addColumn("date", "Date");
          websitePerformanceData.addColumn(
            "number",
            "Avg. Page Load Time (sec)"
          );
          websitePerformanceData.addRows(WebsitePerfomanceArray);

          var websitePerformanceOptions = {
            lineWidth: 1,
            hAxis: {
              title: "",
              format: "MMM d",
            },
            // vAxis: {
            //     showTextEvery: 1,

            //     "ticks": [0, 2, 4, 6, 8],
            // },
            legend: {
              position: "top",
            },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: websitePerformancechartwidth,
            chartArea: {
              width: websitePerformancechartwidth,
              left: 40,
              top: 20,
              right: 20,
              height: 150,
            },
          };

          var websitePerformanceChart = new google.visualization.LineChart(
            document.getElementById("WebsitePerformanceChart")
          );
          websitePerformanceChart.draw(
            websitePerformanceData,
            websitePerformanceOptions
          );

          var websitePerformanceTbl = new google.visualization.DataTable();
          websitePerformanceTbl.addColumn("string", "Page Title");
          websitePerformanceTbl.addColumn(
            "number",
            "Avg. Page Load Time (sec)"
          );

          websitePerformanceTbl.addRows(WebPerfomanceArray);

          if (WebPerfomanceArray.length > 0) {
            $(".pageViewsChart_spinner").hide();
            var tableWebsitePerformance = new google.visualization.Table(
              document.getElementById("WebsitePerformanceTable")
            );
            let websitePerformanceTblformatter =
              new google.visualization.ColorFormat();
            websitePerformanceTblformatter.addGradientRange(
              WebPerfomanceArray[WebPerfomanceArray.length - 1][1],
              WebPerfomanceArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            websitePerformanceTblformatter.format(websitePerformanceTbl, 1); // Apply formatter to second column

            tableWebsitePerformance.draw(websitePerformanceTbl, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 100,
              page: "enable",
            });
          }

          // second page

          var usersCountchartwidth = $(".grid-item").width() / 1.5;
          var optionsSparkLine = {
            tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
            title: "",
            lineWidth: 1,
            legend: { position: "top", alignment: "start" },
            hAxis: {
              format: "MMM d",
              gridlines: { color: "transparent" },
              baselineColor: "none",
              textPosition: "none",
            },
            vAxis: {
              gridlines: { color: "transparent" },
              baselineColor: "none",
              minValue: 0,
              format: "short",
              textPosition: "none",
            },
            series: {
              0: { color: "#ffa800" },
            },

            width: usersCountchartwidth,
            height: 40,
            chartArea: {
              width: usersCountchartwidth,
              right: 0,
              left: 0,
              top: 0,
              height: 100,
            },
          };

          var optionsSparkLineTime = {
            tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
            title: "",
            lineWidth: 1,
            legend: { position: "top", alignment: "start" },
            hAxis: {
              format: "hh:mm:ss",
              gridlines: { color: "transparent" },
              baselineColor: "none",
              textPosition: "none",
            },
            vAxis: {
              gridlines: { color: "transparent" },
              baselineColor: "none",
              minValue: 0,
              format: "short",
              textPosition: "none",
            },
            series: {
              0: { color: "#ffa800" },
            },

            width: usersCountchartwidth,
            height: 40,
            chartArea: {
              width: usersCountchartwidth,
              right: 0,
              left: 0,
              top: 0,
              height: 100,
            },
          };

          var SPlinePageviews = new google.visualization.DataTable();
          SPlinePageviews.addColumn("date", "Date");
          SPlinePageviews.addColumn("number", "Pageviews");
          SPlinePageviews.addRows(pageViewsSparkLineArray);
          var SLUser = new google.visualization.LineChart(
            document.getElementById("PageviewsGraph")
          );
          SLUser.draw(SPlinePageviews, optionsSparkLine);

          $("#Pageviews").html(
            pageViews.reduce((accumulator, object) => {
              return accumulator + object["Pageviews"];
            }, 0)
          );

          var SPlineUniqiePageviews = new google.visualization.DataTable();
          SPlineUniqiePageviews.addColumn("date", "Date");
          SPlineUniqiePageviews.addColumn("number", "Unique Pageviews");
          SPlineUniqiePageviews.addRows(UniquepageViewsSparkLineArray);
          var SLUser = new google.visualization.LineChart(
            document.getElementById("UniquePageviewsGraph")
          );
          SLUser.draw(SPlineUniqiePageviews, optionsSparkLine);

          $("#UniquePageviews").html(
            pageViews.reduce((accumulator, object) => {
              return accumulator + object["Unique Pageviews"];
            }, 0)
          );

          if (bounceRate.length > 0) {
            var SPlineBounceRate = new google.visualization.DataTable();
            SPlineBounceRate.addColumn("date", "Date");
            SPlineBounceRate.addColumn("number", "Bounce Rate");
            SPlineBounceRate.addRows(bounceRateSLArray);
            var SLUser = new google.visualization.LineChart(
              document.getElementById("BounceRateChart")
            );
            SLUser.draw(SPlineBounceRate, optionsSparkLine);

            let BounceRateObj = bounceRate[bounceRate.length - 1];

            let SPBounceRate = BounceRateObj["Bounce Rate"];
            $("#BounceRate").html((SPBounceRate * 100).toFixed(2) + "%");

            var SPlineExitPerc = new google.visualization.DataTable();
            SPlineExitPerc.addColumn("date", "Date");
            SPlineExitPerc.addColumn("number", "% Exit");
            SPlineExitPerc.addRows(ExitPercSLArray);
            var SLUserEP = new google.visualization.LineChart(
              document.getElementById("ExitPercentageChart")
            );
            SLUserEP.draw(SPlineExitPerc, optionsSparkLine);

            let ExitPercObj = bounceRate[bounceRate.length - 1];

            let SPExitPerc = ExitPercObj["% Exit"];
            $("#ExitPercentage").html((SPExitPerc * 100).toFixed(2) + "%");
          }

          if (PgsPerSession.length > 0) {
            var SPlinePgsPerSession = new google.visualization.DataTable();
            SPlinePgsPerSession.addColumn("date", "Date");
            SPlinePgsPerSession.addColumn("number", "Pages / Session");
            SPlinePgsPerSession.addRows(PgsPerSessionArray);
            var SLPgsPerSession = new google.visualization.LineChart(
              document.getElementById("PagesPerSessionChart")
            );
            SLPgsPerSession.draw(SPlinePgsPerSession, optionsSparkLine);

            let PgsPerSessionObj = PgsPerSession[PgsPerSession.length - 1];

            let SPPgsPerSession = PgsPerSessionObj["Pages / Session"];
            $("#PagesPerSession").html(SPPgsPerSession.toFixed(2));
          }

          if (AvgTimeOnPage.length > 0) {
            let LastObjAvgDuration = AvgTimeOnPage[AvgTimeOnPage.length - 1];

            let LastAvgDuration = LastObjAvgDuration.avg_time_on_page;
            $("#AvgPageTime").html(toHHMMSS(LastAvgDuration));
            var SPlineAvgTimeOnPage = new google.visualization.DataTable();
            SPlineAvgTimeOnPage.addColumn("date", "Date");
            SPlineAvgTimeOnPage.addColumn("number", "avg_time_on_page");
            SPlineAvgTimeOnPage.addRows(AvgTimeOnPageArray);
            var SLAvgTimeOnPage = new google.visualization.LineChart(
              document.getElementById("AvgPageTimeGraph")
            );
            SLAvgTimeOnPage.draw(SPlineAvgTimeOnPage, optionsSparkLineTime);
          }

          // doughnuts chart

          $.each(PopularPages, function (i, val) {
            PopularPagesArray.push([val["Page"], val["Pageviews"]]);
          });

          $(".pageViewsChart_spinner").hide();
          var popularPageData = google.visualization.arrayToDataTable([
            ["Page", "Pageviews"],
            ...PopularPagesArray,
          ]);

          var PopularPagesoptions = {
            title: "",
            pieHole: 0.4,
            legend: {
              position: "right",
              alignment: "middle",
              fullWidth: true,
              reverse: false,
              labeledValueText: true,
              labels: {
                usePointStyle: true,
                boxWidth: 6,

                fontSize: 12,
                fontStyle: "bold",
                fontColor: "#666",
              },
            },

            colors: [
              "#0072f0",
              "#f10096",
              "#00b6cb",
              "#03a9f4",
              "#737373",
              "#5e35b1",
              "#f15a60",
              "#ec407a",
              "#7ac36a",
              "#ffa800",
              "#0072f0",
              "#f10096",
              "#00b6cb",
              "#03a9f4",
              "#737373",
              "#5e35b1",
              "#f15a60",
              "#ec407a",
              "#7ac36a",
              "#ffa800",
            ],

            sliceVisibilityThreshold: 0.024,
            chartArea: {
              right: 0,
              left: 0,
              top: 20,
              width: "100%",
              height: "100%",
            },
          };
          var PopularPagesoptionschart = new google.visualization.PieChart(
            document.getElementById("myChart")
          );
          PopularPagesoptionschart.draw(popularPageData, PopularPagesoptions);

          $(".pageViewsChart_spinner").hide();
          var PopularPagesTable = new google.visualization.DataTable();
          PopularPagesTable.addColumn("string", "Page");
          PopularPagesTable.addColumn("number", "Page Views");

          PopularPagesTable.addRows(PopularPagesArray);

          var table = new google.visualization.Table(
            document.getElementById("PageViewsTable")
          );
          let formatter = new google.visualization.ColorFormat();
          formatter.addGradientRange(
            PopularPagesArray[PopularPagesArray.length - 1][1],
            PopularPagesArray[0][1] + 1,
            "#000",
            "#93b136",
            "#ffa800"
          );
          formatter.format(PopularPagesTable, 1); // Apply formatter to second column
          table.draw(PopularPagesTable, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });

          // event category breakdown

          // event chart end
          // var ContentGroup = [{"Brands (Content Group)":"(not set)","Pageviews":349096},{"Brands (Content Group)":"Google","Pageviews":11068},{"Brands (Content Group)":"YouTube","Pageviews":1817},{"Brands (Content Group)":"Android","Pageviews":389}];

          $(".pageViewsChart_spinner").hide();
          google.load("visualization", "1", { packages: ["corechart"] });
          var DataSearchArray = [["Search Term", "Pageviews"]];

          DataSearchArray = [...DataSearchArray, ...UserSearchArray];
          var DataSearchArrayChart =
            google.visualization.arrayToDataTable(DataSearchArray);

          var UserSearchOptions = {
            title: "",
            hAxis: {
              title: "",
              format: "short",
              showTextEvery: 1,
            }, // sets
            vAxis: {
              textPosition: "out",
              slantedText: false,
              showTextEvery: 1,
            },
            backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
            isStacked: "true",
            legend: { position: "top", alignment: "left" },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidthTitleBreakDown,
            chartArea: {
              width: chartwidthTitleBreakDown,
              right: 20,
              left: "40%",
              top: 20,
              bottom: 20,
              height: 150,
            },

            pagingButtonsConfiguration: "auto",
            bars: "horizontal",
            bar: { groupWidth: "80%" },
          };

          var chartUserSearch = new google.visualization.BarChart(
            document.getElementById("UserSearchChart")
          );
          chartUserSearch.draw(DataSearchArrayChart, UserSearchOptions);
          var dataUserSearch = new google.visualization.DataTable();
          dataUserSearch.addColumn("string", "Search Term");
          dataUserSearch.addColumn("number", "Pageviews");

          dataUserSearch.addRows(UserSearchArray);

          $(".pageViewsChart_spinner").hide();
          var tableUserSearch = new google.visualization.Table(
            document.getElementById("UserSearchTable")
          );

          tableUserSearch.draw(dataUserSearch, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });

          // eventchrt start
          $(".pageViewsChart_spinner").hide();
          var chartwidthEventCategory = $("#EventCategoryChart").width();
          var DataCEventCategory = [["Event Category", "Pageviews"]];
          DataCEventCategory = [...DataCEventCategory, ...EventCategoryArray];
          // The first chart
          var chartEventCategory =
            google.visualization.arrayToDataTable(DataCEventCategory);

          var EventCategoryoptions = {
            title: "",
            hAxis: {
              title: "",
              format: "short",
              showTextEvery: 1,
              //  "ticks": [0,50000,100000,150000,200000,250000],
            }, // sets
            vAxis: {
              textPosition: "out",
              slantedText: false,
            },
            backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
            // isStacked: 'true',
            legend: { position: "top", alignment: "left" },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidthEventCategory,
            chartArea: {
              width: chartwidthEventCategory,
              right: 20,
              left: "20%",
              top: 20,
              bottom: 20,
              height: 150,
            },

            pagingButtonsConfiguration: "auto",
            bars: "horizontal",
            bar: { groupWidth: "90%" },
          };

          var chartEventCategoryVar = new google.visualization.BarChart(
            document.getElementById("EventCategoryChart")
          );
          chartEventCategoryVar.draw(chartEventCategory, EventCategoryoptions);

          $(".pageViewsChart_spinner").hide();
          var dataEventCategorytbl = new google.visualization.DataTable();
          dataEventCategorytbl.addColumn("string", "Event Category");
          dataEventCategorytbl.addColumn("number", "Pageviews");

          dataEventCategorytbl.addRows(EventCategoryArray);

          var tableEventCategory = new google.visualization.Table(
            document.getElementById("EventCategoryTable")
          );

          tableEventCategory.draw(dataEventCategorytbl, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });

          // event chart end

          $(".pageViewsChart_spinner").hide();
          var chartwidthTitleBreakDown = $("#PageTitleBreakDown").width();

          var dataPageTitleBreakdown = [["Page Title", "Users", "New Users"]];
          dataPageTitleBreakdown = [
            ...dataPageTitleBreakdown,
            ...PopularPageTitleBreakdownArray,
          ];
          // The first chart

          google.setOnLoadCallback(drawChart1);
          function drawChart1() {
            var datachartPageTitleBreakdown =
              google.visualization.arrayToDataTable(dataPageTitleBreakdown);

            var TitleBreakdownoptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
                //  "ticks":
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              isStacked: "true",
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthTitleBreakDown,
              chartArea: {
                width: chartwidthTitleBreakDown,
                right: 20,
                left: "40%",
                top: 20,
                bottom: 20,
                height: 150,
              },

              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "80%" },
            };

            var chartPageTitleBreakdown = new google.visualization.BarChart(
              document.getElementById("PageTitleBreakDown")
            );
            chartPageTitleBreakdown.draw(
              datachartPageTitleBreakdown,
              TitleBreakdownoptions
            );
          }

          var dataPopularPages = new google.visualization.DataTable();
          dataPopularPages.addColumn("string", "Page Title");
          dataPopularPages.addColumn("number", "Page Views");

          dataPopularPages.addRows(PopularPageTitleBreakdownViewsArray);

          var table = new google.visualization.Table(
            document.getElementById("PageViewsTitleTable")
          );
          let dataPopularPagesformatter =
            new google.visualization.ColorFormat();
          dataPopularPagesformatter.addGradientRange(
            PopularPageTitleBreakdownViewsArray[
              PopularPageTitleBreakdownViewsArray.length - 1
            ][1],
            PopularPageTitleBreakdownViewsArray[0][1] + 1,
            "#000",
            "#93b136",
            "#ffa800"
          );
          dataPopularPagesformatter.format(dataPopularPages, 1); // Apply formatter to second column

          table.draw(dataPopularPages, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });

          $(".pageViewsChart_spinner").hide();
          var chartwidthContentGroup = $("#ContentGroupChart").width();
          var DataContentGroup = [["Brands (Content Group)", "Pageviews"]];
          DataContentGroup = [...DataContentGroup, ...ContentGroupArray];
          // The first chart

          google.setOnLoadCallback(drawChart2);
          function drawChart2() {
            var chartDataContentGroup =
              google.visualization.arrayToDataTable(DataContentGroup);

            var ContentGroupoptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
                //  "ticks": [0,100000,200000,300000,400000],
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              // isStacked: 'true',
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthContentGroup,
              chartArea: {
                width: chartwidthContentGroup,
                right: 20,
                left: "40%",
                top: 20,
                bottom: 20,
                height: 150,
              },

              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "90%" },
            };

            var chartContentGroup = new google.visualization.BarChart(
              document.getElementById("ContentGroupChart")
            );
            chartContentGroup.draw(chartDataContentGroup, ContentGroupoptions);

            $(".pageViewsChart_spinner").hide();
            var dataContentGrouptbl = new google.visualization.DataTable();
            dataContentGrouptbl.addColumn("string", "Brands (Content Group)");
            dataContentGrouptbl.addColumn("number", "Pageviews");

            dataContentGrouptbl.addRows(ContentGroupArray);

            var tableContentGroup = new google.visualization.Table(
              document.getElementById("ContentGroupTable")
            );
            let dataContentGrouptblformatter =
              new google.visualization.ColorFormat();
            dataContentGrouptblformatter.addGradientRange(
              ContentGroupArray[ContentGroupArray.length - 1][1],
              ContentGroupArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            dataContentGrouptblformatter.format(dataContentGrouptbl, 1); // Apply formatter to second column
            tableContentGroup.draw(dataContentGrouptbl, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
          }

          function returnRegionObj(obj) {
            let holder = {};

            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.region)) {
                holder[d.region] = holder[d.region] + d.Session;
              } else {
                holder[d.region] = d.Session;
              }
            });

            let obj2 = [];

            for (var prop in holder) {
              obj2.push({ region: prop, Session: holder[prop] });
            }

            return obj2;
          }

          function returnContinentObj(obj) {
            let holder = {};

            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Continent)) {
                holder[d.Continent] = holder[d.Continent] + d.Session;
              } else {
                holder[d.Continent] = d.Session;
              }
            });

            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Continent: prop, Session: holder[prop] });
            }
            return obj2;
          }
          // device func
          function returnDeviceObj(obj) {
            let holder = {};

            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Device)) {
                holder[d.Device] = holder[d.Device] + d.Session;
              } else {
                holder[d.Device] = d.Session;
              }
            });

            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Device: prop, Session: holder[prop] });
            }

            return obj2;
          }
          // channekl func
          function returnChannelObj(obj) {
            let holder = {};

            obj.forEach(function (d) {
              if (holder.hasOwnProperty(d.Channel)) {
                holder[d.Channel] = holder[d.Channel] + d.Session;
              } else {
                holder[d.Channel] = d.Session;
              }
            });

            let obj2 = [];
            for (var prop in holder) {
              obj2.push({ Channel: prop, Session: holder[prop] });
            }

            return obj2;
          }
          //

          // var datesArray= Object.keys(continentJson);
          var dates = [];
          $.each(continentJson, function (index, value) {
            dates.push(new Date(index));
          });
          function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
            let sum = [];
            [].concat(...arrayOfArrays).map(function (o) {
              let existing = sum.filter(function (i) {
                return i[propToCheck] === o[propToCheck];
              })[0];

              if (!existing) {
                sum.push(o);
              } else {
                existing[propToSum] += o[propToSum];

                let copyProps = Object.keys(o)
                  .filter((obj) => {
                    return existing[obj] !== o[obj];
                  })
                  .map((val) =>
                    val !== propToSum ? (existing[val] = o[val]) : null
                  );
              }
            });

            return sum;
          }
          var startDate;
          var endDate;

          var continentJsonFiltered = [];

          var continent = mergeArrays(
            Object.values(continentJson),
            "region",
            "Session"
          );
          function getContinentCheckedCheckboxValues() {
            continentCheckboxArr = [];
            $.each(
              $('#continentList input[name="dropdown-group"]:checked'),
              function () {
                continentCheckboxArr.push($(this).val().trim());
              }
            );
            return continentCheckboxArr;
          }
          function getRegionCheckedCheckboxValues() {
            regionCheckboxArr = [];
            $.each(
              $('#RegionList input[name="dropdown-group"]:checked'),
              function () {
                regionCheckboxArr.push($(this).val().trim());
              }
            );
            return regionCheckboxArr;
          }

          function getChannelCheckedCheckboxValues() {
            channelCheckboxArr = [];
            $.each(
              $('#channelList input[name="dropdown-group"]:checked'),
              function () {
                channelCheckboxArr.push($(this).val().trim());
              }
            );
            return channelCheckboxArr;
          }
          function getDeviceCheckedCheckboxValues() {
            deviceCheckboxArr = [];
            $.each(
              $('#deviceList input[name="dropdown-group"]:checked'),
              function () {
                deviceCheckboxArr.push($(this).val().trim());
              }
            );
            return deviceCheckboxArr;
          }

    
        }
      }
    },
  });

  function drawChart() {
    $(window).resize(function () {
      drawChart();
      drawChart1();
      drawChart2();
    });
  }
});

// pagepagevie
var CheckboxDropdown = function (el) {
  var _this = this;

  this.isOpen = false;

  this.$el = $(el);
  this.$label = this.$el.find(".dropdown-label");

  this.$text_label = this.$el.find(".dropdown-label").text();

  this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
  this.$inputs = this.$el.find('[type="checkbox"]');

  this.onCheckBox();

  this.$label.on("click", function (e) {
    e.preventDefault();
    _this.toggleOpen();
  });

  this.$inputs.on("change", function (e) {
    _this.onCheckBox();
  });
};

CheckboxDropdown.prototype.onCheckBox = function () {
  this.updateStatus();
};

CheckboxDropdown.prototype.updateStatus = function () {
  var checked = this.$el.find(":checked");

  this.areAllChecked = false;
  this.$checkAll.html("Check All");

  if (checked.length <= 0) {
    this.$label.html(this.$text_label);
  } else if (checked.length === this.$inputs.length) {
    // this.$label.html('All Selected');
    this.areAllChecked = true;
    this.$checkAll.html("Uncheck All");
  } else {
    // this.$label.html(checked.length + ' Selected');
  }
};
CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
  var _this = this;
  $(".dropdown_custom").removeClass("on");

  if (!this.isOpen || forceOpen) {
    this.isOpen = true;
    this.$el.addClass("on");
    $(document).on("click", function (e) {
      if (!$(e.target).closest("[data-control]").length) {
        _this.toggleOpen();
      }
    });
  } else {
    this.isOpen = false;
    this.$el.removeClass("on");
    $(document).off("click");
  }
};

var checkboxesDropdowns = document.querySelectorAll(
  '[data-control="checkbox-dropdown"]'
);
for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
  new CheckboxDropdown(checkboxesDropdowns[i]);
}

$("#continent").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".continent").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});
//   channel
$("#channel").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".channell").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});
//   region
$("#region").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".region").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});
//  device
$("#device").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".device").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});
//on click check all checkboxes
$(document).on("change", "#checkAllContinent", function () {
  $('#continentList input[name="dropdown-group"]')
    .not(this)
    .prop("checked", this.checked);
});
$(document).on("change", "#checkAllRegion", function () {
  $('#RegionList input[name="dropdown-group"]')
    .not(this)
    .prop("checked", this.checked);
});
$(document).on("change", "#checkAllChannel", function () {
  $('#channelList input[name="dropdown-group"]')
    .not(this)
    .prop("checked", this.checked);
});
$(document).on("change", "#checkAllDevice", function () {
  $('#deviceList input[name="dropdown-group"]')
    .not(this)
    .prop("checked", this.checked);
});

$("#basic-addon1").on("click", function () {
  $('input[name="daterange_behav"]').focus();
});

// end here
$(document).on("change", ".radio", function () {
  $("#add_analytics_button").hide();
  $("#alternative_img").hide();
  $("#overlay_new").show();
  var project_id = $("option:selected", this).attr("data-id");
  var chartwidth = $("#pageViewsChart").width();
  var WebPerfomanceArray = new Array();
  var WebsitePerfomanceArray = new Array();
  var EventCategoryArray = new Array();
  var pageViewsArray = new Array();
  var bounceRateArray = new Array();
  var bounceRateSLArray = new Array();
  var ExitPercSLArray = new Array();
  var pageViewsSparkLineArray = new Array();
  var AvgTimeOnPageArray = new Array();
  var UniquepageViewsSparkLineArray = new Array();
  var UserSearchArray = new Array();
  var PgsPerSessionArray = new Array();
  var PopularPagesArray = new Array();
  var PopularPageTitleBreakdownArray = new Array();
  var PopularPageTitleBreakdownViewsArray = new Array();
  var ContentGroupArray = new Array();
  var pageViews = [];
  var bounceRate = [];
  var AvgTimeOnPage = [];
  var PgsPerSession = [];
  var UserSearch = [];
  var EventCategory = [];
  var WebsitePerfomance = [];
  var WebPerfomance = [];
  var PopularPages = [];
  var PopuplarPageTitleBreakdown = [];
  var PopularPageTitleBreakdownViews = [];
  var total_LastAvgDuration = 0;
  var total_pageViews = 0;
  var total_UniquePageviews = 0;
  var total_SPBounceRate = 0;
  var total_SPExitPerc = 0;
  var total_SPPgsPerSession = 0;
  var startDate = $("#daterange").data("daterangepicker").startDate._d;
  var endDate = $("#daterange").data("daterangepicker").endDate._d;
  var fromdate = moment(startDate).format("YYYY-MM-DD");
  var todate = moment(endDate).format("YYYY-MM-DD");
  //   first ajax start
  $.ajax({
    method: "GET",
    // url:'/site_audit/behaviour_overview/?project_id='+project_id,
    url:
      "/site_audit/behaviour_overview/?project_id=" +
      project_id +
      "&fromdate=" +
      fromdate +
      "&todate=" +
      todate +
      "&continent=&deviceCategory=&channelGrouping=",
    success: function (res) {
      $("#overlay_new").hide();
      if (res && res.status === false) {
        $("#btn-toggle").on("click", function () {
          $("#add_analytics_button").toggle();
        });
        $("#main-tag").hide();
        $("#alternative_img").fadeIn("slow");
        $("#add_analytics_button").show();
        // ShowNoty(res.error,"error");
      } else {
        $("#alternative_img").fadeOut("slow");
        $("#main-tag").show();
        $("#add_analytics_button").hide();
        var table3 = res.table3;
        var table6 = res.table6;
        $.each(table3, function (i, val) {
          total_LastAvgDuration = val.avgTimeOnPage;
          total_pageViews = val.pageviews;
          total_UniquePageviews = val.uniquePageviews;
        });

        $("#Pageviews").html("");
        $("#Pageviews").html(total_pageViews);
        $("#UniquePageviews").html("");
        $("#UniquePageviews").html(total_UniquePageviews);
        $("#AvgPageTime").html("");
        $("#AvgPageTime").html(toHHMMSS(total_LastAvgDuration));

        // table6
        $.each(table6, function (i, val) {
          total_SPBounceRate = val.bounceRate;
          total_SPExitPerc = val.exitRate;
          total_SPPgsPerSession = val.pageviewsPerSession;
        });
        $("#BounceRate").html("");
        $("#BounceRate").html(
          Number(total_SPBounceRate * 100).toFixed(2) + "%"
        );
        $("#ExitPercentage").html("");
        $("#ExitPercentage").html(
          Number(total_SPExitPerc * 100).toFixed(2) + "%"
        );
        $("#PagesPerSession").html("");
        $("#PagesPerSession").html(Number(total_SPPgsPerSession).toFixed(2));
        // hide here
        $("#main-tag").fadeIn("slow");
        $("#overlay_new").hide();
        pageViews = res.userbehaviour_pageview_mainchart;
        AvgTimeOnPage = res.userbehaviour_pageview_mainchart_avgtime;
        bounceRate = res.userbehaviour_bouncerate_mainchart;
        PgsPerSession = res.userbehaviour_bouncerate_mainchart_pagepersession;
        PopularPages = res.userbehaviour_popularpage_mainchart;
        // var test = res.userbehaviour_popularpage_mainchart_pageviews;
        PopuplarPageTitleBreakdown =
          res.userbehaviour_popularpagewithtitle_mainchart;
        ContentGroup = res.userbehaviour_popularcontent_mainchart;
        UserSearch = res.userbehaviour_searchterm_mainchart;
        EventCategory = res.userbehaviour_eventcategory_mainchart;
        WebsitePerfomance = res.userbehaviour_loadtime_mainchart;
        WebPerfomance = res.userbehaviour_loadtime_mainchart_subchart;

        PopularPageTitleBreakdownViews =
          res.userbehaviour_popularpagewithtitle_mainchart_pagetitle;
        console.log(
          PopularPageTitleBreakdownViews,
          "PopularPageTitleBreakdownViews"
        );
        // dropdown start
        continentJson = res.dropdown_data;
        if (res.ac_type == "GA4") {
          $("#continentListlabel").text("Country");
        } else {
          $("#continentListlabel").text("Continent");
        }

        function returnRegionObj(obj) {
          let holder = {};
          obj.forEach(function (d) {
            if (holder.hasOwnProperty(d.region)) {
              holder[d.region] = holder[d.region] + d.Session;
            } else {
              holder[d.region] = d.Session;
            }
          });
          let obj2 = [];
          for (var prop in holder) {
            obj2.push({ region: prop, Session: holder[prop] });
          }
          return obj2;
        }
        function returnContinentObj(obj) {
          let holder = {};
          obj.forEach(function (d) {
            if (holder.hasOwnProperty(d.Continent)) {
              holder[d.Continent] = holder[d.Continent] + d.Session;
            } else {
              holder[d.Continent] = d.Session;
            }
          });
          let obj2 = [];
          for (var prop in holder) {
            obj2.push({ Continent: prop, Session: holder[prop] });
          }
          return obj2;
        }

        function returnDeviceObj(obj) {
          let holder = {};
          obj.forEach(function (d) {
            if (holder.hasOwnProperty(d.Device)) {
              holder[d.Device] = holder[d.Device] + d.Session;
            } else {
              holder[d.Device] = d.Session;
            }
          });

          let obj2 = [];
          for (var prop in holder) {
            obj2.push({ Device: prop, Session: holder[prop] });
          }
          return obj2;
        }
        // channekl func
        function returnChannelObj(obj) {
          let holder = {};
          obj.forEach(function (d) {
            if (holder.hasOwnProperty(d.Channel)) {
              holder[d.Channel] = holder[d.Channel] + d.Session;
            } else {
              holder[d.Channel] = d.Session;
            }
          });
          let obj2 = [];
          for (var prop in holder) {
            obj2.push({ Channel: prop, Session: holder[prop] });
          }

          return obj2;
        }
        // var datesArray= Object.keys(continentJson);
        var dates = [];
        $.each(continentJson, function (index, value) {
          dates.push(new Date(index));
        });
        function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
          let sum = [];
          [].concat(...arrayOfArrays).map(function (o) {
            let existing = sum.filter(function (i) {
              return i[propToCheck] === o[propToCheck];
            })[0];
            if (!existing) {
              sum.push(o);
            } else {
              existing[propToSum] += o[propToSum];
              let copyProps = Object.keys(o)
                .filter((obj) => {
                  return existing[obj] !== o[obj];
                })
                .map((val) =>
                  val !== propToSum ? (existing[val] = o[val]) : null
                );
            }
          });

          return sum;
        }
        var startDate;
        var endDate;
        var continentJsonFiltered = [];
        var continent = mergeArrays(
          Object.values(continentJson),
          "region",
          "Session"
        );
        var todayDate = new Date();
        var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
        var minDate = new Date(new Date().setDate(new Date().getDate() - 30));
        function getContinentCheckedCheckboxValues() {
          continentCheckboxArr = [];
          $.each(
            $('#continentList input[name="dropdown-group"]:checked'),
            function () {
              continentCheckboxArr.push($(this).val().trim());
            }
          );
          return continentCheckboxArr;
        }
        function getRegionCheckedCheckboxValues() {
          regionCheckboxArr = [];
          $.each(
            $('#RegionList input[name="dropdown-group"]:checked'),
            function () {
              regionCheckboxArr.push($(this).val().trim());
            }
          );
          return regionCheckboxArr;
        }

        function getChannelCheckedCheckboxValues() {
          channelCheckboxArr = [];
          $.each(
            $('#channelList input[name="dropdown-group"]:checked'),
            function () {
              channelCheckboxArr.push($(this).val().trim());
            }
          );
          return channelCheckboxArr;
        }
        function getDeviceCheckedCheckboxValues() {
          deviceCheckboxArr = [];
          $.each(
            $('#deviceList input[name="dropdown-group"]:checked'),
            function () {
              deviceCheckboxArr.push($(this).val().trim());
            }
          );
          return deviceCheckboxArr;
        }
        // checkbox

        InitDropdown(continent);
        $.each($('input[name="dropdown-group"]'), function () {
          $(this).prop("checked", true);
        });
        $(document).on(
          "click",
          "#continentList .btn-continentList",
          function () {
            $.each(
              $('#continentList input[name="dropdown-group"]'),
              function () {
                $(this)
                  .parent()
                  .parent()
                  .find('input[name="dropdown-group"]')
                  .prop("checked", false);
              }
            );
          }
        );
        $(document).on("click", "#deviceList .btn-deviceList", function () {
          $.each($('#deviceList input[name="dropdown-group"]'), function () {
            $(this)
              .parent()
              .parent()
              .find('input[name="dropdown-group"]')
              .prop("checked", false);
          });
        });
        $(document).on("click", "#channelList .btn-channelList", function () {
          $.each($('#channelList input[name="dropdown-group"]'), function () {
            $(this)
              .parent()
              .parent()
              .find('input[name="dropdown-group"]')
              .prop("checked", false);
          });
        });
        $(document).on("click", ".btn-RegionList", function () {
          $.each($('#RegionList input[name="dropdown-group"]'), function () {
            $(this)
              .parent()
              .parent()
              .find('input[name="dropdown-group"]')
              .prop("checked", false);
          });
        });
        const filterByContinent = (arr1, arr2) => {
          let res = [];
          res = arr1.filter((el) => {
            return arr2.find((element) => {
              return element == el.Continent;
            });
          });
          return res;
        };
        const filterByRegion = (arr1, arr2) => {
          let res = [];
          res = arr1.filter((el) => {
            return arr2.find((element) => {
              return element == el.region;
            });
          });
          return res;
        };
        const filterByChannel = (arr1, arr2) => {
          let res = [];
          res = arr1.filter((el) => {
            return arr2.find((element) => {
              return element == el.Channel;
            });
          });
          return res;
        };
        const filterByDevice = (arr1, arr2) => {
          let res = [];
          res = arr1.filter((el) => {
            return arr2.find((element) => {
              return element == el.Device;
            });
          });
          return res;
        };
        //  var arr = []
        function InitDropdown(continent) {
          let nayaVariableContinent = returnContinentObj(continent);
          let nayaVariableRegion = returnRegionObj(continent);
          let nayaVariableDevice = returnDeviceObj(continent);
          let nayaVariableChannel = returnChannelObj(continent);
          $("#continentList").html("");
          $.each(nayaVariableContinent, function (index, value) {
            $(
              "#continentList"
            ).append(`<label class="dropdown-option continent">
   <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
  ${value.Continent} 
 </label>
 `);
            //   <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
          // device dropdown
          $("#deviceList").html("");
          $.each(nayaVariableDevice, function (index, value) {
            $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
            //   <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
          });
          // channal dropdoen
          $("#channelList").html("");
          $.each(nayaVariableChannel, function (index, value) {
            $("#channelList").append(`<label class="dropdown-option channell">
  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
  ${value.Channel}
</label>
`);
          });
          //    <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
          $("#RegionList").html("");
          $.each(nayaVariableRegion, function (index, value) {
            $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region}
 </label>
 `);
          });
          //    <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
        }

        function InitDropDownOnDeviceChange(continent5) {
          let nayaVariableContinent = returnContinentObj(continent5);
          let nayaVariableChannel = returnChannelObj(continent5);
          let nayaVariableRegion = returnRegionObj(continent5);

          // device dropdown
          $("#continentList,#channelList,#RegionList").html("");
          $.each(nayaVariableContinent, function (index, value) {
            $(
              "#continentList"
            ).append(`<label class="dropdown-option continent">
    <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
    ${value.Continent} 
    </label>
    `);
            // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
          // channal dropdoen

          $.each(nayaVariableChannel, function (index, value) {
            $("#channelList").append(`<label class="dropdown-option channell">
  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
  ${value.Channel}
</label>
`);
            //  <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
          });
          $.each(nayaVariableRegion, function (index, value) {
            $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region} 
 </label>
 `);
            // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
        }
        function InitDropDownOnContinentChange(continent2) {
          let nayaVariableDevice = returnDeviceObj(continent2);
          let nayaVariableChannel = returnChannelObj(continent2);
          let nayaVariableRegion = returnRegionObj(continent2);

          // device dropdown
          $("#deviceList,#channelList,#RegionList").html("");
          $.each(nayaVariableDevice, function (index, value) {
            $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
          });
          // channal dropdoen

          $.each(nayaVariableChannel, function (index, value) {
            $("#channelList").append(`<label class="dropdown-option channell">
  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
  ${value.Channel} 
</label>
`);
            // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
          });
          $.each(nayaVariableRegion, function (index, value) {
            $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region} 
 </label>
 `);
            // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
        }
        function InitDropDownOnChannelChange(continent4) {
          let nayaVariableDevice = returnDeviceObj(continent4);
          let nayaVariableContinent = returnContinentObj(continent4);
          let nayaVariableRegion = returnRegionObj(continent4);
          $("#deviceList,#continentList,#RegionList").html("");
          $.each(nayaVariableDevice, function (index, value) {
            $("#deviceList").append(`
    <label class="dropdown-option device">
  <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
  ${value.Device} 
</label>

    `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
          });

          $.each(nayaVariableContinent, function (index, value) {
            $(
              "#continentList"
            ).append(`<label class="dropdown-option continent">
  <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
  ${value.Continent} 
  </label>
  `);
            // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });

          $.each(nayaVariableRegion, function (index, value) {
            $("#RegionList").append(`<label class="dropdown-option region">
   <input type="checkbox" value="${value.region}" name="dropdown-group"  />
  ${value.region} 
 </label>
 `);
            // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
        }
        function InitDropDownOnRegionChange(continent3) {
          let nayaVariableContinent = returnContinentObj(continent3);
          let nayaVariableDevice = returnDeviceObj(continent3);
          let nayaVariableChannel = returnChannelObj(continent3);
          $("#deviceList,#channelList,#continentList").html("");

          $.each(nayaVariableContinent, function (index, value) {
            $(
              "#continentList"
            ).append(`<label class="dropdown-option continent">
<input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
${value.Continent} 
</label>
`);
            // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
          $.each(nayaVariableDevice, function (index, value) {
            $("#deviceList").append(`
   <label class="dropdown-option device">
 <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
 ${value.Device}
</label>

   `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
          });
          // channal dropdoen

          $.each(nayaVariableChannel, function (index, value) {
            $("#channelList").append(`<label class="dropdown-option channell">
 <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
 ${value.Channel} 
</label>
`);
            //  <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
          });
        }

        // dropdown end
        // ------------
        $.each(pageViews, function (key, value) {
          pageViewsArray.push([
            new Date(value.Date),
            value["Pageviews"],
            value["Unique Pageviews"],
          ]);
          pageViewsSparkLineArray.push([
            new Date(value.Date),
            value["Pageviews"],
          ]);
          UniquepageViewsSparkLineArray.push([
            new Date(value.Date),
            value["Unique Pageviews"],
          ]);
        });
        $.each(AvgTimeOnPage, function (i, val) {
          AvgTimeOnPageArray.push([new Date(val.Date), val.avg_time_on_page]);
        });

        // ============
        $.each(bounceRate, function (i, val) {
          bounceRateArray.push([
            new Date(val.Date),
            val["Bounce Rate"] * 100,
            val["% Exit"] * 100,
          ]);
          bounceRateSLArray.push([
            new Date(val.Date),
            val["Bounce Rate"] * 100,
          ]);
          ExitPercSLArray.push([new Date(val.Date), val["% Exit"] * 100]);
        });
        $.each(PgsPerSession, function (i, val) {
          PgsPerSessionArray.push([new Date(val.Date), val["Pages / Session"]]);
        });
        // ==========
        // ===========
        // $.each(PopuplarPageTitleBreakdown, function (i, val) {
        //   PopularPageTitleBreakdownArray.push([(val['Page Title']), (val['Users']), (val['New Users'])])
        // });
        $.each(PopularPageTitleBreakdownViews, function (i, val) {
          PopularPageTitleBreakdownArray.push([
            val["Page Title"],
            val["Pageviews"],
          ]);
        });
        // =============
        $.each(ContentGroup, function (i, val) {
          ContentGroupArray.push([
            val["Brands (Content Group)"],
            parseFloat(val["Pageviews"]),
          ]);
        });
        $.each(UserSearch, function (i, val) {
          UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
        });
        $.each(EventCategory, function (i, val) {
          EventCategoryArray.push([val["Event Category"], val["Pageviews"]]);
        });
        $.each(WebsitePerfomance, function (i, val) {
          WebsitePerfomanceArray.push([
            new Date(val.Date),
            val["Avg. Page Load Time (sec)"],
          ]);
        });
        $.each(WebPerfomance, function (i, val) {
          WebPerfomanceArray.push([
            val["Page Title"],
            val["Avg. Page Load Time (sec)"],
          ]);
        });

        $.each(PopularPageTitleBreakdownViews, function (i, val) {
          PopularPageTitleBreakdownViewsArray.push([
            val["Page Title"],
            val["Pageviews"],
          ]);
        });
        // ==========
        $(".pageViewsChart_spinner").hide();
        var data = new google.visualization.DataTable();
        data.addColumn("date", "Date");
        data.addColumn("number", "Pageviews");
        data.addColumn("number", "Unique Pageviews");
        data.addRows(pageViewsArray);
        var options = {
          title: "",
          lineWidth: 3,
          legend: { position: "top", alignment: "start" },
          hAxis: {
            textPosition: "out",
            slantedText: false,
            format: "MMM d",
            ticks: "true",
            showTextEvery: 3,
            min: 0,
            max: 10,
            gridlines: {
              count: 10,
              interval: 1,
            },
          },

          series: {
            0: { color: "#f66d00" },
            1: { color: "#ffa800" },
          },
          width: chartwidth,
          chartArea: {
            width: chartwidth,
            left: 40,
            top: 50,
            right: 20,
            bottom: 50,
            height: 150,
          },
        };

        var chart = new google.visualization.LineChart(
          document.getElementById("pageViewsChart")
        );

        chart.draw(data, options);

        google.charts.load("current", { packages: ["corechart", "table"] });
        google.charts.setOnLoadCallback(drawChart);
        function timeString(seconds) {
          var date = new Date(seconds * 1000).getTime(); // multiply by 1000 because Date() requires miliseconds
          var timeStr = date.toTimeString().split(" ")[0];
          return timeStr;
        }

        function toHHMMSS(val) {
          var sec_num = parseInt(val, 10); // don't forget the second param
          var hours = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - hours * 3600) / 60);
          var seconds = sec_num - hours * 3600 - minutes * 60;

          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return hours + ":" + minutes + ":" + seconds;
        }
        function drawChart() {
          $(window).resize(function () {
            drawChart();
            drawChart1();
            drawChart2();
          });
          $.each(UserSearch, function (i, val) {
            UserSearchArray.push([val["Search Term"], val["Pageviews"]]);
          });
          $(".bounceExit_spinner").hide();
          var BRdata = new google.visualization.DataTable();
          BRdata.addColumn("date", "Date");
          BRdata.addColumn("number", "Bounce Rate");
          BRdata.addColumn("number", "% Exit");
          BRdata.addRows(bounceRateArray);
          var BRoptions = {
            lineWidth: 3,
            hAxis: {
              textPosition: "out",
              slantedText: false,
              format: "MMM d",
              ticks: "true",
              showTextEvery: 3,

              gridlines: {
                count: 10,
                interval: 1,
              },
            },
            legend: {
              position: "top",
            },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidth,
            chartArea: {
              width: chartwidth,
              left: 40,
              top: 50,
              right: 20,
              bottom: 50,
              height: 150,
            },
          };

          $(".pageViewsChart_spinner").hide();
          var chart = new google.visualization.LineChart(
            document.getElementById("bounceExit")
          );
          chart.draw(BRdata, BRoptions);

          var websitePerformancechartwidth = $(
            "#WebsitePerformanceChart"
          ).width();
          var websitePerformanceData = new google.visualization.DataTable();
          websitePerformanceData.addColumn("date", "Date");
          websitePerformanceData.addColumn(
            "number",
            "Avg. Page Load Time (sec)"
          );
          websitePerformanceData.addRows(WebsitePerfomanceArray);

          var websitePerformanceOptions = {
            lineWidth: 1,
            hAxis: {
              title: "",
              format: "MMM d",
            },
            legend: {
              position: "top",
            },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: websitePerformancechartwidth,
            chartArea: {
              width: websitePerformancechartwidth,
              left: 40,
              top: 20,
              right: 20,
              height: 150,
            },
          };
          var websitePerformanceChart = new google.visualization.LineChart(
            document.getElementById("WebsitePerformanceChart")
          );
          websitePerformanceChart.draw(
            websitePerformanceData,
            websitePerformanceOptions
          );
          var websitePerformanceTbl = new google.visualization.DataTable();
          websitePerformanceTbl.addColumn("string", "Page Title");
          websitePerformanceTbl.addColumn(
            "number",
            "Avg. Page Load Time (sec)"
          );
          websitePerformanceTbl.addRows(WebPerfomanceArray);
          if (WebPerfomanceArray.length > 0) {
            $(".pageViewsChart_spinner").hide();
            var tableWebsitePerformance = new google.visualization.Table(
              document.getElementById("WebsitePerformanceTable")
            );
            let websitePerformanceTblformatter =
              new google.visualization.ColorFormat();
            websitePerformanceTblformatter.addGradientRange(
              WebPerfomanceArray[WebPerfomanceArray.length - 1][1],
              WebPerfomanceArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            websitePerformanceTblformatter.format(websitePerformanceTbl, 1); // Apply formatter to second column
            tableWebsitePerformance.draw(websitePerformanceTbl, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 100,
              page: "enable",
            });
          }
          // second page
          var usersCountchartwidth = $(".grid-item").width() / 1.5;
          var optionsSparkLine = {
            tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
            title: "",
            lineWidth: 1,
            legend: { position: "top", alignment: "start" },
            hAxis: {
              format: "MMM d",
              gridlines: { color: "transparent" },
              baselineColor: "none",
              textPosition: "none",
            },
            vAxis: {
              gridlines: { color: "transparent" },
              baselineColor: "none",
              minValue: 0,
              format: "short",
              textPosition: "none",
            },
            series: {
              0: { color: "#ffa800" },
            },

            width: usersCountchartwidth,
            height: 40,
            chartArea: {
              width: usersCountchartwidth,
              right: 0,
              left: 0,
              top: 0,
              height: 100,
            },
          };
          var optionsSparkLineTime = {
            tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
            title: "",
            lineWidth: 1,
            legend: { position: "top", alignment: "start" },
            hAxis: {
              format: "hh:mm:ss",
              gridlines: { color: "transparent" },
              baselineColor: "none",
              textPosition: "none",
            },
            vAxis: {
              gridlines: { color: "transparent" },
              baselineColor: "none",
              minValue: 0,
              format: "short",
              textPosition: "none",
            },
            series: {
              0: { color: "#ffa800" },
            },

            width: usersCountchartwidth,
            height: 40,
            chartArea: {
              width: usersCountchartwidth,
              right: 0,
              left: 0,
              top: 0,
              height: 100,
            },
          };

          var SPlinePageviews = new google.visualization.DataTable();
          SPlinePageviews.addColumn("date", "Date");
          SPlinePageviews.addColumn("number", "Pageviews");
          SPlinePageviews.addRows(pageViewsSparkLineArray);
          var SLUser = new google.visualization.LineChart(
            document.getElementById("PageviewsGraph")
          );
          SLUser.draw(SPlinePageviews, optionsSparkLine);

          var SPlineUniqiePageviews = new google.visualization.DataTable();
          SPlineUniqiePageviews.addColumn("date", "Date");
          SPlineUniqiePageviews.addColumn("number", "Unique Pageviews");
          SPlineUniqiePageviews.addRows(UniquepageViewsSparkLineArray);
          var SLUser = new google.visualization.LineChart(
            document.getElementById("UniquePageviewsGraph")
          );
          SLUser.draw(SPlineUniqiePageviews, optionsSparkLine);

          if (bounceRate.length > 0) {
            var SPlineBounceRate = new google.visualization.DataTable();
            SPlineBounceRate.addColumn("date", "Date");
            SPlineBounceRate.addColumn("number", "Bounce Rate");
            SPlineBounceRate.addRows(bounceRateSLArray);
            var SLUser = new google.visualization.LineChart(
              document.getElementById("BounceRateChart")
            );
            SLUser.draw(SPlineBounceRate, optionsSparkLine);
            let BounceRateObj = bounceRate[bounceRate.length - 1];
            let SPBounceRate = BounceRateObj["Bounce Rate"];

            var SPlineExitPerc = new google.visualization.DataTable();
            SPlineExitPerc.addColumn("date", "Date");
            SPlineExitPerc.addColumn("number", "% Exit");
            SPlineExitPerc.addRows(ExitPercSLArray);
            var SLUserEP = new google.visualization.LineChart(
              document.getElementById("ExitPercentageChart")
            );
            SLUserEP.draw(SPlineExitPerc, optionsSparkLine);
            let ExitPercObj = bounceRate[bounceRate.length - 1];
            let SPExitPerc = ExitPercObj["% Exit"];
          }

          if (PgsPerSession.length > 0) {
            var SPlinePgsPerSession = new google.visualization.DataTable();
            SPlinePgsPerSession.addColumn("date", "Date");
            SPlinePgsPerSession.addColumn("number", "Pages / Session");
            SPlinePgsPerSession.addRows(PgsPerSessionArray);
            var SLPgsPerSession = new google.visualization.LineChart(
              document.getElementById("PagesPerSessionChart")
            );
            SLPgsPerSession.draw(SPlinePgsPerSession, optionsSparkLine);
            let PgsPerSessionObj = PgsPerSession[PgsPerSession.length - 1];
            let SPPgsPerSession = PgsPerSessionObj["Pages / Session"];
          }
          if (AvgTimeOnPage.length > 0) {
            let LastObjAvgDuration = AvgTimeOnPage[AvgTimeOnPage.length - 1];
            let LastAvgDuration = LastObjAvgDuration.avg_time_on_page;

            var SPlineAvgTimeOnPage = new google.visualization.DataTable();
            SPlineAvgTimeOnPage.addColumn("date", "Date");
            SPlineAvgTimeOnPage.addColumn("number", "avg_time_on_page");
            SPlineAvgTimeOnPage.addRows(AvgTimeOnPageArray);
            var SLAvgTimeOnPage = new google.visualization.LineChart(
              document.getElementById("AvgPageTimeGraph")
            );
            SLAvgTimeOnPage.draw(SPlineAvgTimeOnPage, optionsSparkLineTime);
          }
          // doughnuts chart
          $.each(PopularPages, function (i, val) {
            PopularPagesArray.push([val["Page"], val["Pageviews"]]);
          });

          $(".pageViewsChart_spinner").hide();
          var popularPageData = google.visualization.arrayToDataTable([
            ["Page", "Pageviews"],
            ...PopularPagesArray,
          ]);

          var PopularPagesoptions = {
            title: "",
            pieHole: 0.4,
            legend: {
              position: "right",
              alignment: "middle",
              fullWidth: true,
              reverse: false,
              labeledValueText: true,
              labels: {
                usePointStyle: true,
                boxWidth: 6,

                fontSize: 12,
                fontStyle: "bold",
                fontColor: "#666",
              },
            },
            colors: [
              "#0072f0",
              "#f10096",
              "#00b6cb",
              "#03a9f4",
              "#737373",
              "#5e35b1",
              "#f15a60",
              "#ec407a",
              "#7ac36a",
              "#ffa800",
              "#0072f0",
              "#f10096",
              "#00b6cb",
              "#03a9f4",
              "#737373",
              "#5e35b1",
              "#f15a60",
              "#ec407a",
              "#7ac36a",
              "#ffa800",
            ],

            sliceVisibilityThreshold: 0.024,
            chartArea: {
              right: 0,
              left: 0,
              top: 20,
              width: "100%",
              height: "100%",
            },
          };
          var PopularPagesoptionschart = new google.visualization.PieChart(
            document.getElementById("myChart")
          );
          PopularPagesoptionschart.draw(popularPageData, PopularPagesoptions);

          $(".pageViewsChart_spinner").hide();
          var PopularPagesTable = new google.visualization.DataTable();
          PopularPagesTable.addColumn("string", "Page");
          PopularPagesTable.addColumn("number", "Page Views");
          PopularPagesTable.addRows(PopularPagesArray);
          var table = new google.visualization.Table(
            document.getElementById("PageViewsTable")
          );
          let formatter = new google.visualization.ColorFormat();
          formatter.addGradientRange(
            PopularPagesArray[PopularPagesArray.length - 1][1],
            PopularPagesArray[0][1] + 1,
            "#000",
            "#93b136",
            "#ffa800"
          );
          formatter.format(PopularPagesTable, 1); // Apply formatter to second column
          table.draw(PopularPagesTable, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });
          $(".pageViewsChart_spinner").hide();
          google.load("visualization", "1", { packages: ["corechart"] });
          var DataSearchArray = [["Search Term", "Pageviews"]];
          DataSearchArray = [...DataSearchArray, ...UserSearchArray];
          var DataSearchArrayChart =
            google.visualization.arrayToDataTable(DataSearchArray);
          var UserSearchOptions = {
            title: "",
            hAxis: {
              title: "",
              format: "short",
              showTextEvery: 1,
              ticks: true,
            }, // sets
            vAxis: {
              textPosition: "out",
              slantedText: false,
              showTextEvery: 1,
            },
            backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
            isStacked: "true",
            legend: { position: "top", alignment: "left" },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidthTitleBreakDown,
            chartArea: {
              width: chartwidthTitleBreakDown,
              right: 20,
              left: "40%",
              top: 20,
              bottom: 20,
              height: 150,
            },

            pagingButtonsConfiguration: "auto",
            bars: "horizontal",
            bar: { groupWidth: "80%" },
          };
          var chartUserSearch = new google.visualization.BarChart(
            document.getElementById("UserSearchChart")
          );
          chartUserSearch.draw(DataSearchArrayChart, UserSearchOptions);
          var dataUserSearch = new google.visualization.DataTable();
          dataUserSearch.addColumn("string", "Search Term");
          dataUserSearch.addColumn("number", "Pageviews");
          dataUserSearch.addRows(UserSearchArray);
          $(".pageViewsChart_spinner").hide();
          var tableUserSearch = new google.visualization.Table(
            document.getElementById("UserSearchTable")
          );
          tableUserSearch.draw(dataUserSearch, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });
          // eventchrt start
          $(".pageViewsChart_spinner").hide();
          var chartwidthEventCategory = $("#EventCategoryChart").width();
          var DataCEventCategory = [["Event Category", "Pageviews"]];
          DataCEventCategory = [...DataCEventCategory, ...EventCategoryArray];
          // The first chart
          var chartEventCategory =
            google.visualization.arrayToDataTable(DataCEventCategory);
          var EventCategoryoptions = {
            title: "",
            hAxis: {
              title: "",
              format: "short",
              showTextEvery: 1,
            }, // sets
            vAxis: {
              textPosition: "out",
              slantedText: false,
            },
            backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
            // isStacked: 'true',
            legend: { position: "top", alignment: "left" },
            series: {
              0: { color: "#f66d00" },
              1: { color: "#ffa800" },
            },
            width: chartwidthEventCategory,
            chartArea: {
              width: chartwidthEventCategory,
              right: 20,
              left: "20%",
              top: 20,
              bottom: 20,
              height: 150,
            },

            pagingButtonsConfiguration: "auto",
            bars: "horizontal",
            bar: { groupWidth: "90%" },
          };

          var chartEventCategoryVar = new google.visualization.BarChart(
            document.getElementById("EventCategoryChart")
          );
          chartEventCategoryVar.draw(chartEventCategory, EventCategoryoptions);
          $(".pageViewsChart_spinner").hide();
          var dataEventCategorytbl = new google.visualization.DataTable();
          dataEventCategorytbl.addColumn("string", "Event Category");
          dataEventCategorytbl.addColumn("number", "Pageviews");
          dataEventCategorytbl.addRows(EventCategoryArray);
          var tableEventCategory = new google.visualization.Table(
            document.getElementById("EventCategoryTable")
          );
          tableEventCategory.draw(dataEventCategorytbl, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });
          $(".pageViewsChart_spinner").hide();
          var chartwidthTitleBreakDown = $("#PageTitleBreakDown").width();
          // var dataPageTitleBreakdown = [
          //   ['Page Title', 'Users', 'New Users']

          // ];
          var dataPageTitleBreakdown = [["Page Title", "page Views"]];
          dataPageTitleBreakdown = [
            ...dataPageTitleBreakdown,
            ...PopularPageTitleBreakdownArray,
          ];
          console.log(PopularPageTitleBreakdownArray, "dataPageTitleBreakdown");
          google.setOnLoadCallback(drawChart1);
          function drawChart1() {
            var datachartPageTitleBreakdown =
              google.visualization.arrayToDataTable(dataPageTitleBreakdown);
            var TitleBreakdownoptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
                ticks: true,
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              isStacked: "true",
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthTitleBreakDown,
              chartArea: {
                width: chartwidthTitleBreakDown,
                right: 20,
                left: "40%",
                top: 20,
                bottom: 20,
                height: 150,
              },

              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "80%" },
            };

            var chartPageTitleBreakdown = new google.visualization.BarChart(
              document.getElementById("PageTitleBreakDown")
            );
            chartPageTitleBreakdown.draw(
              datachartPageTitleBreakdown,
              TitleBreakdownoptions
            );
          }
          var dataPopularPages = new google.visualization.DataTable();
          dataPopularPages.addColumn("string", "Page Title");
          dataPopularPages.addColumn("number", "Page Views");
          dataPopularPages.addRows(PopularPageTitleBreakdownViewsArray);
          var table = new google.visualization.Table(
            document.getElementById("PageViewsTitleTable")
          );
          let dataPopularPagesformatter =
            new google.visualization.ColorFormat();
          dataPopularPagesformatter.addGradientRange(
            PopularPageTitleBreakdownViewsArray[
              PopularPageTitleBreakdownViewsArray.length - 1
            ][1],
            PopularPageTitleBreakdownViewsArray[0][1] + 1,
            "#000",
            "#93b136",
            "#ffa800"
          );
          dataPopularPagesformatter.format(dataPopularPages, 1); // Apply formatter to second column
          table.draw(dataPopularPages, {
            allowHtml: true,
            showRowNumber: true,
            width: "100%",
            height: "100%",
            pageSize: 10,
            page: "enable",
          });
          $(".pageViewsChart_spinner").hide();
          var chartwidthContentGroup = $("#ContentGroupChart").width();
          var DataContentGroup = [["Brands (Content Group)", "Pageviews"]];
          DataContentGroup = [...DataContentGroup, ...ContentGroupArray];
          google.setOnLoadCallback(drawChart2);
          function drawChart2() {
            var chartDataContentGroup =
              google.visualization.arrayToDataTable(DataContentGroup);
            var ContentGroupoptions = {
              title: "",
              hAxis: {
                title: "",
                format: "short",
                showTextEvery: 1,
              }, // sets
              vAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
              },
              backgroundColor: { strokeWidth: 0 }, // to draw a nice box all around the chart
              // isStacked: 'true',
              legend: { position: "top", alignment: "left" },
              series: {
                0: { color: "#f66d00" },
                1: { color: "#ffa800" },
              },
              width: chartwidthContentGroup,
              chartArea: {
                width: chartwidthContentGroup,
                right: 20,
                left: "40%",
                top: 20,
                bottom: 20,
                height: 150,
              },
              pagingButtonsConfiguration: "auto",
              bars: "horizontal",
              bar: { groupWidth: "90%" },
            };
            var chartContentGroup = new google.visualization.BarChart(
              document.getElementById("ContentGroupChart")
            );
            chartContentGroup.draw(chartDataContentGroup, ContentGroupoptions);
            $(".pageViewsChart_spinner").hide();
            var dataContentGrouptbl = new google.visualization.DataTable();
            dataContentGrouptbl.addColumn("string", "Brands (Content Group)");
            dataContentGrouptbl.addColumn("number", "Pageviews");
            dataContentGrouptbl.addRows(ContentGroupArray);
            var tableContentGroup = new google.visualization.Table(
              document.getElementById("ContentGroupTable")
            );
            let dataContentGrouptblformatter =
              new google.visualization.ColorFormat();
            dataContentGrouptblformatter.addGradientRange(
              ContentGroupArray[ContentGroupArray.length - 1][1],
              ContentGroupArray[0][1] + 1,
              "#000",
              "#93b136",
              "#ffa800"
            );
            dataContentGrouptblformatter.format(dataContentGrouptbl, 1); // Apply formatter to second column
            tableContentGroup.draw(dataContentGrouptbl, {
              allowHtml: true,
              showRowNumber: true,
              width: "100%",
              height: "100%",
              pageSize: 10,
              page: "enable",
            });
          }
        }
      }
    },
  });
});
