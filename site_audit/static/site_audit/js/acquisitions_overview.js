$(".cv_add_analytics_button").on("click", function () {
  $(".cv_add_analytics_button  .google_spinner").css("opacity", "1");
});

$("#overlay_new").show();
var todayDate = new Date();
var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
var minDate = new Date(new Date().setDate(new Date().getDate() - 30));
$('input[name="daterange"]').daterangepicker(
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
// create table of all analytics data
function drawTable() {
  var table_dataArray = new Array();
  var SessionsArray = new Array();
  var UsersArray = new Array();
  var NewUsersArray = new Array();
  var BounceRateArray = new Array();
  var PagesSessionArray = new Array();
  var AvgSessionDurationArray = new Array();
  var GoalConversionRateArray = new Array();
  var GoalCompletions = new Array();
  var GoalValueArray = new Array();
  $.each(table_data, function (i, value) {
    table_dataArray.push([
      value["Source / Medium"],
      Number(value["Sessions"]),
      Number(value["Users"]),
      Number(value["New Users"]),
      Number(value["Bounce Rate"]),
      Number(value["Pages / Session"]),
      Number(value["Avg Session Duration"]),
      Number(value["Goal Conversion Rate"]),
      Number(value["Goal Completions"]),
      Number(value["Goal Value"]),
    ]);
    SessionsArray.push(Number(value["Sessions"]));
    UsersArray.push(Number(value["Users"]));
    NewUsersArray.push(Number(value["New Users"]));
    BounceRateArray.push(Number(value["Bounce Rate"]));
    PagesSessionArray.push(Number(value["Pages / Session"]));
    AvgSessionDurationArray.push(Number(value["Avg Session Duration"]));
    GoalConversionRateArray.push(Number(value["Goal Conversion Rate"]));
    GoalCompletions.push(Number(value["Goal Completions"]));
    GoalValueArray.push(Number(value["Goal Value"]));
  });

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

  var elementsData = {
    Sessions: kFormatter(SessionsArray.reduce((a, b) => a + b, 0)),
    Users: kFormatter(UsersArray.reduce((a, b) => a + b, 0)),
    NewUsers: kFormatter(NewUsersArray.reduce((a, b) => a + b, 0)),
    BounceRate:
      kFormatter(
        BounceRateArray.reduce((a, b) => a + b, 0) / BounceRateArray.length
      ).toFixed(1) + "%",
    Pages_Session: kFormatter(
      PagesSessionArray.reduce((a, b) => a + b, 0) / PagesSessionArray.length
    ).toFixed(1),
    AvgSessionDuration: toHHMMSS(
      AvgSessionDurationArray.reduce((a, b) => a + b, 0)
    ),
    GoalConversionRate:
      (
        GoalConversionRateArray.reduce((a, b) => a + b, 0) /
        GoalConversionRateArray.length
      ).toFixed(1) + "%",
    GoalCompletions: kFormatter(
      GoalCompletions.reduce((a, b) => a + b, 0).toFixed(1)
    ),
    Goal_Value: kFormatter(GoalValueArray.reduce((a, b) => a + b, 0)),
  };
  //  topcards start
  $(".wrapper").empty();
  $(".wrapper").append(`
 <div><span>Users</span><strong>${elementsData.Sessions}</strong></div>
            <div><span>Sessions</span><strong>${elementsData.Users}</strong></div>
            <div><span>Bounce Rate</span><strong>${elementsData.BounceRate}</strong></div>
            <div><span>Goal Completion</span><strong>${elementsData.GoalCompletions}</strong></div>
            <div><span>Avg. Time on page</span><strong>${elementsData.AvgSessionDuration}</strong></div>
`);
  // topcards end
  google.charts.load("current", { packages: ["table"] });
  google.charts.setOnLoadCallback(drawTable);
  function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Source");
    data.addColumn("number", "Sessions");
    data.addColumn("number", "Users");
    data.addColumn("number", "New Users");
    data.addColumn("number", "Bounce Rate");
    data.addColumn("number", "Pages / Session");
    data.addColumn("number", "Avg. Session Duration");
    data.addColumn("number", "Goal Conversion");
    data.addColumn("number", "Goal Completion");
    data.addColumn("number", "Goal Value");

    data.addRows([...table_dataArray]);

    $(".table_spinner").hide();
    if ($("#table_div").length > 0) {
      var table = new google.visualization.Table(
        document.getElementById("table_div")
      );
      let dataformatter1 = new google.visualization.ColorFormat();
      dataformatter1.addGradientRange(
        Number(Math.min(...SessionsArray)),
        Number(Math.max(...SessionsArray)) + 1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter1.format(data, 1);
      let dataformatter2 = new google.visualization.ColorFormat();
      dataformatter2.addGradientRange(
        Number(Math.min(...UsersArray)),
        Number(Math.max(...UsersArray)) + 1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter2.format(data, 2);
      let dataformatter3 = new google.visualization.ColorFormat();
      dataformatter3.addGradientRange(
        Number(Math.min(...NewUsersArray)),
        Number(Math.max(...NewUsersArray)) + 1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter3.format(data, 3);
      let dataformatter4 = new google.visualization.ColorFormat();
      dataformatter4.addGradientRange(
        Number(Math.min(...BounceRateArray)),
        Number(Math.max(...BounceRateArray)) + 0.1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter4.format(data, 4);
      let dataformatter5 = new google.visualization.ColorFormat();
      dataformatter5.addGradientRange(
        Number(Math.min(...PagesSessionArray)),
        Number(Math.max(...PagesSessionArray)) + 0.1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter5.format(data, 5);
      let dataformatter6 = new google.visualization.ColorFormat();
      dataformatter6.addGradientRange(
        Number(Math.min(...AvgSessionDurationArray)),
        Number(Math.max(...AvgSessionDurationArray)) + 0.1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter6.format(data, 6);
      let dataformatter7 = new google.visualization.ColorFormat();
      dataformatter7.addGradientRange(
        Number(Math.min(...GoalConversionRateArray)),
        Number(Math.max(...GoalConversionRateArray)) + 0.1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter7.format(data, 7);
      let dataformatter8 = new google.visualization.ColorFormat();
      dataformatter8.addGradientRange(
        Number(Math.min(...GoalCompletions)),
        Number(Math.max(...GoalCompletions)) + 1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter8.format(data, 8);
      let dataformatter9 = new google.visualization.ColorFormat();
      dataformatter9.addGradientRange(
        Number(Math.min(...GoalValueArray)),
        Number(Math.max(...GoalValueArray)) + 1,
        "#000",
        "#f6f0ec",
        "#f66d00"
      );
      dataformatter9.format(data, 9);
      // Apply formatter to second column
      table.draw(data, { allowHtml: true, width: "100%", height: "100%" });

      $("#table_div table").prepend(
        "<thead id='topThead'><tr><th></th><th colspan='3'>&nbsp;&nbsp;Acquisition</th><th colspan='3'>Behavior</th><th colspan='3'>Conversions</th></tr>" +
          "<tr><th></th><th>Sessions</th><th>Users</th><th>New Users</th><th>Bounce Rate</th><th>Pages / Session</th><th>Avg. Session Duration</th><th>Goal Conversion Rate</th><th>Goal Completions</th><th>Goal Value</th></tr>" +
          "<tr><td></td><td id='sessionTotal'>" +
          elementsData.Sessions +
          "</td><td id='usersTotal'>" +
          elementsData.Users +
          "</td><td id='newUsersTotal'>" +
          elementsData.NewUsers +
          "</td><td id='bounceRateTotal'>" +
          elementsData.BounceRate +
          "</td><td id='PagesSessionsTotal'>" +
          elementsData.Pages_Session +
          "</td><td id='AvgSessionDurationTotal'>" +
          elementsData.AvgSessionDuration +
          "</td><td id='GoalConversionRateTotal'>" +
          elementsData.GoalConversionRate +
          "</td><td id='GoalCompletionsTotal'>" +
          elementsData.GoalCompletions +
          "</td><td id='GoalValueTotal'>" +
          elementsData.Goal_Value +
          "</td></tr>" +
          "<thead>"
      );
    }
  }
  // last table end
}
// create content data function o n accqusation page
var setInt = setInterval(accquFunc, 1000);
function accquFunc() {
  var project_id = $("option:selected").attr("data-id");
  if (project_id != undefined && project_id != "") {
    clearInterval(setInt);
    var startDate = $("#daterange").data("daterangepicker").startDate._d;
    var endDate = $("#daterange").data("daterangepicker").endDate._d;
    var fromdate = moment(startDate).format("YYYY-MM-DD");
    var todate = moment(endDate).format("YYYY-MM-DD");
    var continentJson;

    var continentCheckboxArr = [];
    var regionCheckboxArr = [];
    var channelCheckboxArr = [];
    var deviceCheckboxArr = [];
    $.ajax({
      method: "GET",
      url:
        "/site_audit/acquisition_overview/?project_id=" +
        project_id +
        "&fromdate=" +
        fromdate +
        "&todate=" +
        todate +
        "&continent=&deviceCategory=&channelGrouping=&region=",
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
          // hide here
          $("#main-tag").fadeIn("slow");
          $("#overlay_new").hide();
          doughnut_arry = res.top_acquisition_channels;
          user_new_users = res.users_chart;
          UsersArray = res.users_chart;
          conversion = res.conversions_chart;
          table_data = res.main_chart;
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
          // filtetfuncion
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

          // $(document).on('change', '#deviceList input[name="dropdown-group"]', function () {
          //   let devicesFunc = getDeviceCheckedCheckboxValues();
          //   $('#continentList,#channelList,#RegionList').multiselect('destroy');
          //   let onchangeDevice = filterByDevice(continent, devicesFunc)
          //   InitDropDownOnDeviceChange(onchangeDevice);
          //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#continentList input[name="dropdown-group"]'), function () {
          //     $(this).prop("checked", true);
          //   });
          // })
          // $(document).on('change', '#continentList input[name="dropdown-group"]', function () {
          //   let continetsFunc = getContinentCheckedCheckboxValues();
          //   $('#deviceList,#channelList,#RegionList').multiselect('destroy');
          //   let onchangeContinent = filterByContinent(continent, continetsFunc)
          //   InitDropDownOnContinentChange(onchangeContinent);
          //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
          //     $(this).prop("checked", true);
          //     // actions
          //     $('.btn-continentList').on('click', function () {
          //       $.each($('#continentList input[name="dropdown-group"]'), function () {
          //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //       });

          //     });
          //     $('.btn-deviceList').on('click', function () {
          //       $.each($('#deviceList input[name="dropdown-group"]'), function () {
          //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //       });

          //     });
          //     $('.btn-channelList').on('click', function () {
          //       $.each($('#channelList input[name="dropdown-group"]'), function () {
          //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //       });

          //     });
          //     $('.btn-RegionList').on('click', function () {

          //       $.each($('#RegionList input[name="dropdown-group"]'), function () {
          //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //       });

          //     });
          //   });
          //   // actions
          //   $('.btn-continentList').on('click', function () {
          //     $.each($('#continentList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-deviceList').on('click', function () {
          //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-channelList').on('click', function () {
          //     $.each($('#channelList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-RegionList').on('click', function () {

          //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          // })

          // $(document).on('change', '#channelList input[name="dropdown-group"]', function () {
          //   let channelsFunc = getChannelCheckedCheckboxValues();
          //   $('#deviceList,#continentList,#RegionList').multiselect('destroy');
          //   let onchangeChannel = filterByChannel(continent, channelsFunc)
          //   InitDropDownOnChannelChange(onchangeChannel);
          //   $.each($('#RegionList input[name="dropdown-group"],#continentList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
          //     $(this).prop("checked", true);
          //   });
          //   // actions
          //   $('.btn-continentList').on('click', function () {
          //     $.each($('#continentList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-deviceList').on('click', function () {
          //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-channelList').on('click', function () {
          //     $.each($('#channelList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-RegionList').on('click', function () {

          //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          // })
          // $(document).on('change', '#RegionList input[name="dropdown-group"]', function () {
          //   let regionsFunc = getRegionCheckedCheckboxValues();
          //   $('#deviceList,#channelList,#continentList').multiselect('destroy');
          //   let onchangeRegion = filterByRegion(continent, regionsFunc)
          //   InitDropDownOnRegionChange(onchangeRegion);
          //   $.each($('#continentList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
          //     $(this).prop("checked", true);

          //   });
          //   // actions
          //   $('.btn-continentList').on('click', function () {
          //     $.each($('#continentList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-deviceList').on('click', function () {
          //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-channelList').on('click', function () {
          //     $.each($('#channelList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          //   $('.btn-RegionList').on('click', function () {

          //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
          //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
          //     });

          //   });
          // })

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
              //  <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
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
              //  <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
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
            // device dropdown
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
              //  <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
            });
            $.each(nayaVariableDevice, function (index, value) {
              $("#deviceList").append(`
   <label class="dropdown-option device">
 <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
 ${value.Device} 
</label>

   `);
              //  <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
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
          }

          // dropdown end

          drawTable();
          // table end

          // conversion

          // conversion

          var labelsArray = [];
          var datasetArray = [];
          $.each(conversion, function (i, val) {
            labelsArray.push(val.Date);
            datasetArray.push(val["Goal Conversion Rate"]);
          });

          var chart = {
            type: "line",

            data: {
              labels: labelsArray,
              datasets: [
                {
                  label: "Goal Conversion Rate",
                  backgroundColor: "#f66d00",
                  borderColor: "#f66d00",
                  fill: false,
                  data: datasetArray,
                },
              ],
            },
            options: {
              responsive: true,
              legend: { display: false },
              title: {
                display: true,
                text: "Conversions",
                lagend: false,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    type: "time",
                    time: {
                      unit: "day",
                      unitStepSize: 6,
                      displayFormats: {
                        day: "MMM DD",
                      },
                    },
                    scaleLabel: {
                      display: true,
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                    },
                  },
                ],
              },
            },
          };
          $(".conver_spinner").hide();
          if ($("#conver").length > 0) {
            var ctx = document.getElementById("conver").getContext("2d");
            window.myLine = new Chart(ctx, chart);
          }

          // charts vars start

          var labelsd_array = [];
          var dataD_array = new Array();
          $.each(doughnut_arry, function (i, val) {
            labelsd_array.push(val["Default Channel Grouping"]);
            dataD_array.push([val["Default Channel Grouping"], val["Users"]]);
          });
          // pie chart

          $(".donutChart_spinner").hide();

          var chartwidth = $("#donutchart").width();
          var chartheight = $("#donutchart").closest(".box").height();
          var daraPieArray = [
            ["Default_Channel_Grouping", "Users"],
            ...dataD_array,
          ];
          google.charts.load("current", { packages: ["corechart"] });
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable(daraPieArray);

            var options = {
              title: "Top Acquisition Channels",
              pieHole: 0.5,
              legend: {
                position: "right",
                alignment: "center",
                fullWidth: true,
                reverse: false,
                labeledValueText: true,
                labels: {
                  usePointStyle: true,
                  boxWidth: 3,
                  fontSize: 12,
                  fontStyle: "bold",
                  fontColor: "#666",
                },
              },
              width: chartwidth,
              chartArea: {
                width: chartwidth,
                right: 10,
                left: 10,
                top: 20,
                bottom: 0,
                height: chartheight,
              },
              colors: [
                "rgb(0, 182, 203)",
                "rgb(3, 169, 244)",
                "rgb(94, 53, 177)",
                "rgb(255, 168, 0)",
                "rgb(124, 179, 66)",
              ],
            };
            if ($("#donutchart").length > 0) {
              var chart = new google.visualization.PieChart(
                document.getElementById("donutchart")
              );
              chart.draw(data, options);
            }
          }

          // new users

          //   new users

          var labels_array = [];
          var data_set_user = [];
          var data_set_new_user = [];

          $.each(user_new_users, function (i, val) {
            labels_array.push(val.Date);
            data_set_user.push(val.Users);
            data_set_new_user.push(val.New_Users);
          });
          $(".myChart_spinner").hide();
          new Chart("myChart", {
            type: "line",
            title: "Users (vs New Users)",
            data: {
              labels: labels_array,
              datasets: [
                {
                  label: "Users",
                  backgroundColor: "#f66d00",
                  borderColor: "#f66d00",
                  fill: false,
                  data: data_set_user,
                },
                {
                  label: "New Users",
                  backgroundColor: "#ffa800",
                  borderColor: "#ffa800",
                  fill: false,
                  data: data_set_new_user,
                },
              ],
            },
            options: {
              lineWidth: 3,
              responsive: true,
              elements: {
                point: {
                  radius: 0,
                },
              },

              legend: { display: false },
              title: {
                display: true,
                text: "New Users",
                lagend: false,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    type: "time",
                    time: {
                      unit: "day",
                      unitStepSize: 5,
                      displayFormats: {
                        day: "MMM DD",
                      },
                    },
                    scaleLabel: {
                      display: true,
                      // labelString: 'Date'
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    //type: 'logarithmic',
                    scaleLabel: {
                      display: true,
                      // labelString: 'Index Returns'
                    },
                    // ticks: {
                    //     min: 0,
                    //     max: 3000,

                    //     // forces step size to be 5 units
                    //     stepSize: 1000
                    // }
                  },
                ],
              },
            },
          });

          // acqu charts end
          // dropdowns
        }
      },
    });
  }
}

$(".applyBtn").on("click", function () {
  // show here
  $("#main-tag").fadeOut("slow");
  $("#overlay_new").show();
  accquFunc();
});
$(document).on("change", 'input[name="dropdown-group"]', function () {
  $("#main-tag").fadeOut("slow");
  $("#overlay_new").show();
  var continentArray = [];
  var regionArray = [];
  var channelArray = [];
  var deviceArray = [];
  // $("#continentList input[name='dropdown-group']:checked").val();
  $('#continentList input[name="dropdown-group"]:checked').each(function () {
    continentArray.push(this.value);
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
  // ajax
  var acType = "ua";
  var UsersData = [];
  var NewUsersData = [];
  var UsersPerSessionData = [];
  var UserPerSessionArray = new Array();
  var SessionArray = new Array();
  var PageViewsArray = new Array();
  var PagePerSessionArray = new Array();
  var AvgSessionDurationArray = new Array();
  var BounceRateArray = new Array();
  var LanguageBreakDownArray = new Array();
  var ContinentsArray = new Array();
  var DevicesArray = new Array();
  var Devices2Array = new Array();
  var ContinentsUserArray = new Array();
  var UsersArray = new Array();
  var NewUsersArray = new Array();
  var NewUsers = [];
  var Users = [];
  var ReturningUsers = [];
  var UsersPerSession = [];
  var Sessions = [];
  var PageViews = [];
  var pagesPerSession = [];
  var AvgSessionDuration = [];
  var BounceRate = [];
  var LanguageBreakDown = [];
  var Continents = [];
  var Devices = [];
  var Devices2 = [];
  var startDate = $("#daterange").data("daterangepicker").startDate._d;
  var endDate = $("#daterange").data("daterangepicker").endDate._d;
  var fromdate = moment(startDate).format("YYYY-MM-DD");
  var todate = moment(endDate).format("YYYY-MM-DD");
  var continentJson;
  var project_id = $("option:selected").attr("data-id");

  var continentCheckboxArr = [];
  var regionCheckboxArr = [];
  var channelCheckboxArr = [];
  var deviceCheckboxArr = [];
  $.ajax({
    method: "GET",
    url:
      "/site_audit/acquisition_overview/?project_id=" +
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
        // hide here
        $("#main-tag").fadeIn("slow");
        $("#overlay_new").hide();

        doughnut_arry = res.top_acquisition_channels;
        user_new_users = res.users_chart;
        UsersArray = res.users_chart;
        conversion = res.conversions_chart;
        table_data = res.main_chart;
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
        // InitDropdown(continent);
        // $.each($('input[name="dropdown-group"]'), function () {
        //   $(this).prop("checked", true);

        // });
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
        // filtetfuncion
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

        // $(document).on('change', '#deviceList input[name="dropdown-group"]', function () {
        //   let devicesFunc = getDeviceCheckedCheckboxValues();
        //   $('#continentList,#channelList,#RegionList').multiselect('destroy');
        //   let onchangeDevice = filterByDevice(continent, devicesFunc)
        //   InitDropDownOnDeviceChange(onchangeDevice);
        //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#continentList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //   });
        // })
        // $(document).on('change', '#continentList input[name="dropdown-group"]', function () {
        //   let continetsFunc = getContinentCheckedCheckboxValues();
        //   $('#deviceList,#channelList,#RegionList').multiselect('destroy');
        //   let onchangeContinent = filterByContinent(continent, continetsFunc)
        //   InitDropDownOnContinentChange(onchangeContinent);
        //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //     // actions
        //     $('.btn-continentList').on('click', function () {
        //       $.each($('#continentList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-deviceList').on('click', function () {
        //       $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-channelList').on('click', function () {
        //       $.each($('#channelList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-RegionList').on('click', function () {

        //       $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })

        // $(document).on('change', '#channelList input[name="dropdown-group"]', function () {
        //   let channelsFunc = getChannelCheckedCheckboxValues();
        //   $('#deviceList,#continentList,#RegionList').multiselect('destroy');
        //   let onchangeChannel = filterByChannel(continent, channelsFunc)
        //   InitDropDownOnChannelChange(onchangeChannel);
        //   $.each($('#RegionList input[name="dropdown-group"],#continentList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })
        // $(document).on('change', '#RegionList input[name="dropdown-group"]', function () {
        //   let regionsFunc = getRegionCheckedCheckboxValues();
        //   $('#deviceList,#channelList,#continentList').multiselect('destroy');
        //   let onchangeRegion = filterByRegion(continent, regionsFunc)
        //   InitDropDownOnRegionChange(onchangeRegion);
        //   $.each($('#continentList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);

        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })

        //  var arr = []

        // dropdown end

        drawTable();
        // table end

        // conversion

        // conversion

        var labelsArray = [];
        var datasetArray = [];
        $.each(conversion, function (i, val) {
          labelsArray.push(val.Date);
          datasetArray.push(val["Goal Conversion Rate"]);
        });

        var chart = {
          type: "line",

          data: {
            labels: labelsArray,
            datasets: [
              {
                label: "Goal Conversion Rate",
                backgroundColor: "#f66d00",
                borderColor: "#f66d00",
                fill: false,
                data: datasetArray,
              },
            ],
          },
          options: {
            responsive: true,
            legend: { display: false },
            title: {
              display: true,
              text: "Conversions",
              lagend: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  type: "time",
                  time: {
                    unit: "day",
                    unitStepSize: 6,
                    displayFormats: {
                      day: "MMM DD",
                    },
                  },
                  scaleLabel: {
                    display: true,
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                  },
                },
              ],
            },
          },
        };
        $(".conver_spinner").hide();
        if ($("#conver").length > 0) {
          var ctx = document.getElementById("conver").getContext("2d");
          window.myLine = new Chart(ctx, chart);
        }

        // charts vars start

        var labelsd_array = [];
        var dataD_array = new Array();
        $.each(doughnut_arry, function (i, val) {
          labelsd_array.push(val["Default Channel Grouping"]);
          dataD_array.push([val["Default Channel Grouping"], val["Users"]]);
        });
        // pie chart

        $(".donutChart_spinner").hide();

        var chartwidth = $("#donutchart").width();
        var chartheight = $("#donutchart").closest(".box").height();
        var daraPieArray = [
          ["Default_Channel_Grouping", "Users"],
          ...dataD_array,
        ];
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable(daraPieArray);

          var options = {
            title: "Top Acquisition Channels",
            pieHole: 0.5,
            legend: {
              position: "right",
              alignment: "center",
              fullWidth: true,
              reverse: false,
              labeledValueText: true,
              labels: {
                usePointStyle: true,
                boxWidth: 3,
                fontSize: 12,
                fontStyle: "bold",
                fontColor: "#666",
              },
            },
            width: chartwidth,
            chartArea: {
              width: chartwidth,
              right: 10,
              left: 10,
              top: 20,
              bottom: 0,
              height: chartheight,
            },
            colors: [
              "rgb(0, 182, 203)",
              "rgb(3, 169, 244)",
              "rgb(94, 53, 177)",
              "rgb(255, 168, 0)",
              "rgb(124, 179, 66)",
            ],
          };
          if ($("#donutchart").length > 0) {
            var chart = new google.visualization.PieChart(
              document.getElementById("donutchart")
            );
            chart.draw(data, options);
          }
        }

        // new users

        //   new users

        var labels_array = [];
        var data_set_user = [];
        var data_set_new_user = [];

        $.each(user_new_users, function (i, val) {
          labels_array.push(val.Date);
          data_set_user.push(val.Users);
          data_set_new_user.push(val.New_Users);
        });
        $(".myChart_spinner").hide();
        new Chart("myChart", {
          type: "line",
          title: "Users (vs New Users)",
          data: {
            labels: labels_array,
            datasets: [
              {
                label: "Users",
                backgroundColor: "#f66d00",
                borderColor: "#f66d00",
                fill: false,
                data: data_set_user,
              },
              {
                label: "New Users",
                backgroundColor: "#ffa800",
                borderColor: "#ffa800",
                fill: false,
                data: data_set_new_user,
              },
            ],
          },
          options: {
            lineWidth: 3,
            responsive: true,
            elements: {
              point: {
                radius: 0,
              },
            },

            legend: { display: false },
            title: {
              display: true,
              text: "New Users",
              lagend: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  type: "time",
                  time: {
                    unit: "day",
                    unitStepSize: 5,
                    displayFormats: {
                      day: "MMM DD",
                    },
                  },
                  scaleLabel: {
                    display: true,
                    // labelString: 'Date'
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  //type: 'logarithmic',
                  scaleLabel: {
                    display: true,
                    // labelString: 'Index Returns'
                  },
                  // ticks: {
                  //     min: 0,
                  //     max: 3000,

                  //     // forces step size to be 5 units
                  //     stepSize: 1000
                  // }
                },
              ],
            },
          },
        });

        // acqu charts end
        // dropdowns
      }
    },
  });
});

// dropdowns
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
//

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
// radio change
$(document).on("change", ".radio", function () {
  $("#add_analytics_button").hide();
  $("#alternative_img").hide();
  $("#overlay_new").show();
  var project_id = $("option:selected", this).attr("data-id");
  var startDate = $("#daterange").data("daterangepicker").startDate._d;
  var endDate = $("#daterange").data("daterangepicker").endDate._d;
  var fromdate = moment(startDate).format("YYYY-MM-DD");
  var todate = moment(endDate).format("YYYY-MM-DD");
  var continentJson;

  var continentCheckboxArr = [];
  var regionCheckboxArr = [];
  var channelCheckboxArr = [];
  var deviceCheckboxArr = [];
  $.ajax({
    method: "GET",
    url:
      "/site_audit/acquisition_overview/?project_id=" +
      project_id +
      "&fromdate=" +
      fromdate +
      "&todate=" +
      todate +
      "&continent=&deviceCategory=&channelGrouping=&region=",
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
        // hide here
        $("#main-tag").fadeIn("slow");
        $("#overlay_new").hide();
        doughnut_arry = res.top_acquisition_channels;
        user_new_users = res.users_chart;
        UsersArray = res.users_chart;
        conversion = res.conversions_chart;
        table_data = res.main_chart;
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
        // filtetfuncion
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

        // $(document).on('change', '#deviceList input[name="dropdown-group"]', function () {
        //   let devicesFunc = getDeviceCheckedCheckboxValues();
        //   $('#continentList,#channelList,#RegionList').multiselect('destroy');
        //   let onchangeDevice = filterByDevice(continent, devicesFunc)
        //   InitDropDownOnDeviceChange(onchangeDevice);
        //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#continentList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //   });
        // })
        // $(document).on('change', '#continentList input[name="dropdown-group"]', function () {
        //   let continetsFunc = getContinentCheckedCheckboxValues();
        //   $('#deviceList,#channelList,#RegionList').multiselect('destroy');
        //   let onchangeContinent = filterByContinent(continent, continetsFunc)
        //   InitDropDownOnContinentChange(onchangeContinent);
        //   $.each($('#RegionList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //     // actions
        //     $('.btn-continentList').on('click', function () {
        //       $.each($('#continentList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-deviceList').on('click', function () {
        //       $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-channelList').on('click', function () {
        //       $.each($('#channelList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //     $('.btn-RegionList').on('click', function () {

        //       $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //         $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //       });

        //     });
        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })

        // $(document).on('change', '#channelList input[name="dropdown-group"]', function () {
        //   let channelsFunc = getChannelCheckedCheckboxValues();
        //   $('#deviceList,#continentList,#RegionList').multiselect('destroy');
        //   let onchangeChannel = filterByChannel(continent, channelsFunc)
        //   InitDropDownOnChannelChange(onchangeChannel);
        //   $.each($('#RegionList input[name="dropdown-group"],#continentList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);
        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })
        // $(document).on('change', '#RegionList input[name="dropdown-group"]', function () {
        //   let regionsFunc = getRegionCheckedCheckboxValues();
        //   $('#deviceList,#channelList,#continentList').multiselect('destroy');
        //   let onchangeRegion = filterByRegion(continent, regionsFunc)
        //   InitDropDownOnRegionChange(onchangeRegion);
        //   $.each($('#continentList input[name="dropdown-group"],#channelList input[name="dropdown-group"],#deviceList input[name="dropdown-group"]'), function () {
        //     $(this).prop("checked", true);

        //   });
        //   // actions
        //   $('.btn-continentList').on('click', function () {
        //     $.each($('#continentList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-deviceList').on('click', function () {
        //     $.each($('#deviceList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-channelList').on('click', function () {
        //     $.each($('#channelList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        //   $('.btn-RegionList').on('click', function () {

        //     $.each($('#RegionList input[name="dropdown-group"]'), function () {
        //       $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
        //     });

        //   });
        // })

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
            //  <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
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
            //  <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
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
          // device dropdown
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
            //  <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          });
          $.each(nayaVariableDevice, function (index, value) {
            $("#deviceList").append(`
   <label class="dropdown-option device">
 <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
 ${value.Device} 
</label>

   `);
            //  <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>
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
        }

        // dropdown end

        drawTable();
        // table end

        // conversion

        // conversion

        var labelsArray = [];
        var datasetArray = [];
        $.each(conversion, function (i, val) {
          labelsArray.push(val.Date);
          datasetArray.push(val["Goal Conversion Rate"]);
        });

        var chart = {
          type: "line",

          data: {
            labels: labelsArray,
            datasets: [
              {
                label: "Goal Conversion Rate",
                backgroundColor: "#f66d00",
                borderColor: "#f66d00",
                fill: false,
                data: datasetArray,
              },
            ],
          },
          options: {
            responsive: true,
            legend: { display: false },
            title: {
              display: true,
              text: "Conversions",
              lagend: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  type: "time",
                  time: {
                    unit: "day",
                    unitStepSize: 6,
                    displayFormats: {
                      day: "MMM DD",
                    },
                  },
                  scaleLabel: {
                    display: true,
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                  },
                },
              ],
            },
          },
        };
        $(".conver_spinner").hide();
        if ($("#conver").length > 0) {
          var ctx = document.getElementById("conver").getContext("2d");
          window.myLine = new Chart(ctx, chart);
        }

        // charts vars start

        var labelsd_array = [];
        var dataD_array = new Array();
        $.each(doughnut_arry, function (i, val) {
          labelsd_array.push(val["Default Channel Grouping"]);
          dataD_array.push([val["Default Channel Grouping"], val["Users"]]);
        });
        // pie chart

        $(".donutChart_spinner").hide();

        var chartwidth = $("#donutchart").width();
        var chartheight = $("#donutchart").closest(".box").height();
        var daraPieArray = [
          ["Default_Channel_Grouping", "Users"],
          ...dataD_array,
        ];
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable(daraPieArray);

          var options = {
            title: "Top Acquisition Channels",
            pieHole: 0.5,
            legend: {
              position: "right",
              alignment: "center",
              fullWidth: true,
              reverse: false,
              labeledValueText: true,
              labels: {
                usePointStyle: true,
                boxWidth: 3,
                fontSize: 12,
                fontStyle: "bold",
                fontColor: "#666",
              },
            },
            width: chartwidth,
            chartArea: {
              width: chartwidth,
              right: 10,
              left: 10,
              top: 20,
              bottom: 0,
              height: chartheight,
            },
            colors: [
              "rgb(0, 182, 203)",
              "rgb(3, 169, 244)",
              "rgb(94, 53, 177)",
              "rgb(255, 168, 0)",
              "rgb(124, 179, 66)",
            ],
          };
          if ($("#donutchart").length > 0) {
            var chart = new google.visualization.PieChart(
              document.getElementById("donutchart")
            );
            chart.draw(data, options);
          }
        }

        // new users

        //   new users

        var labels_array = [];
        var data_set_user = [];
        var data_set_new_user = [];

        $.each(user_new_users, function (i, val) {
          labels_array.push(val.Date);
          data_set_user.push(val.Users);
          data_set_new_user.push(val.New_Users);
        });
        $(".myChart_spinner").hide();
        new Chart("myChart", {
          type: "line",
          title: "Users (vs New Users)",
          data: {
            labels: labels_array,
            datasets: [
              {
                label: "Users",
                backgroundColor: "#f66d00",
                borderColor: "#f66d00",
                fill: false,
                data: data_set_user,
              },
              {
                label: "New Users",
                backgroundColor: "#ffa800",
                borderColor: "#ffa800",
                fill: false,
                data: data_set_new_user,
              },
            ],
          },
          options: {
            lineWidth: 3,
            responsive: true,
            elements: {
              point: {
                radius: 0,
              },
            },

            legend: { display: false },
            title: {
              display: true,
              text: "New Users",
              lagend: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  type: "time",
                  time: {
                    unit: "day",
                    unitStepSize: 5,
                    displayFormats: {
                      day: "MMM DD",
                    },
                  },
                  scaleLabel: {
                    display: true,
                    // labelString: 'Date'
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  //type: 'logarithmic',
                  scaleLabel: {
                    display: true,
                    // labelString: 'Index Returns'
                  },
                  // ticks: {
                  //     min: 0,
                  //     max: 3000,

                  //     // forces step size to be 5 units
                  //     stepSize: 1000
                  // }
                },
              ],
            },
          },
        });

        // acqu charts end
        // dropdowns
      }
    },
  });
});
