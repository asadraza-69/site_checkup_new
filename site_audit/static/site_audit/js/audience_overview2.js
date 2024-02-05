$(".cv_add_analytics_button").on('click', function(){
  $(".cv_add_analytics_button  .google_spinner").css("opacity", "1")
})

$("#overlay_new").show()
  var todayDate = new Date();
  var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
  var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
  $('input[name="daterange_audi"]').daterangepicker({
    opens: 'right',
    locale: {
      format: 'MMM DD,YYYY',
      separator: " to "
    },

    "startDate": minDate,
    "endDate": maxDate

  }, function (start, end, label) {
  });
  // convert hourse and seconds functions
  function toHHMMSS(val) {
    var sec_num = parseInt(val, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  }
  function timeString(seconds) {
    var date = new Date(seconds * 1000); // multiply by 1000 because Date() requires miliseconds
    var timeStr = date.toTimeString().split(' ')[0];
    return timeStr;
  }
  var setInt = setInterval(audiFnc, 1000);
  function audiFnc() {

    var project_id =   $('option:selected').attr('data-id')
    if (project_id != undefined && project_id != '') {
      clearInterval(setInt)
      var acType = "ua";
      var UsersData = []
      var NewUsersData = []
      var UsersPerSessionData = []
      var UserPerSessionArray = new Array()
      var SessionArray = new Array()
      var PageViewsArray = new Array()
      var PagePerSessionArray = new Array()
      var AvgSessionDurationArray = new Array()
      var BounceRateArray = new Array()
      var LanguageBreakDownArray = new Array()
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
      var startDate = $('#daterange_audi').data('daterangepicker').startDate._d;
      var endDate = $('#daterange_audi').data('daterangepicker').endDate._d;
      var fromdate = moment(startDate).format("YYYY-MM-DD");
      var todate = moment(endDate).format("YYYY-MM-DD");
      var continentJson;
      var continentCheckboxArr = [];
      var regionCheckboxArr = [];
      var channelCheckboxArr = [];
      var deviceCheckboxArr = [];
      var new_user_count = 0;
          var user_count = 0;
          var session_count = 0;
          var Number_of_sessions_per_user_count = 0;
          var Page_Views = 0;
          var Pages_Session = 0;
          var Avg_Session_Duration = 0;
          var Bounce_Rate = 0;
    // audience overview js
      $.ajax({
        method: 'GET',
        url: '/site_audit/audience_overview_data/?project_id=' + project_id + '&fromdate=' + fromdate + '&todate=' + todate + '&continent=&deviceCategory=&channelGrouping=',
        success: function (res) {
           if(res && res.status === false)
          {
            $('#btn-toggle').on('click', function(){
              $("#add_analytics_button").toggle()
            })
            $("#main-tag").hide()
            $("#alternative_img").fadeIn("slow")
            $("#add_analytics_button").show()
            $("#overlay_new").hide()
            // ShowNoty(res.error,"error");
          } else {
            $("#alternative_img").fadeOut("slow")
            $("#main-tag").show()
            $("#add_analytics_button").hide()
            $("#overlay_new").hide()
          // counts start
          var table3 = res.table3
          $.each(table3,function(i,val){
            user_count = val.users;
            new_user_count = val.newUsers;
            session_count = val.sessions;
            Bounce_Rate = val.bounceRate;
            Avg_Session_Duration = val.avgSessionDuration;
            Pages_Session = val.pageviewsPerSession;
            Page_Views=  val.pageviews;
            Number_of_sessions_per_user_count = val.sessionsPerUser
          });
          
          $("#usersCount").html('')
          $("#usersCount").html(user_count);
          $("#newUsersCount").html('')
          $("#newUsersCount").html(new_user_count)
          $("#usersSessions").html('')
          $("#usersSessions").html(Number(Pages_Session).toFixed(2));
          $("#pageViews").html('')
          $("#pageViews").html(Page_Views)
          $("#sessionCount").html('')
          $("#sessionCount").html(session_count);
          $("#pagePerSession").html('')
          $("#pagePerSession").html(Number(Pages_Session).toFixed(2));
          $("#sessonDuration").html('')
          $("#sessonDuration").html(toHHMMSS(Number(Avg_Session_Duration)));
          $("#bounceRate").html('')
          $("#bounceRate").html((Bounce_Rate * 100).toFixed(2) + '%')
            
          // counts end
          $('#main-tag').fadeIn("slow")
          $("#overlay_new").hide()
          Users = res.Users_Graph;
          NewUsers = res.New_Users_Graph;
          LanguageBreakDown = res.LanguageBreakDown_Graph
          Continents = res.Continent_DataTable;
          Devices = res.Devices_Graph;
          Devices2 = res.Device_DataTable
          AvgSessionDuration = res.Avg_Session_Duration;
          UsersPerSession = res.No_of_Sessions_Per_User
          BounceRate = res.Bounce_Rate
          pagesPerSession = res.Pages_per_Session_Count
          PageViews = res.Page_Views_Count
          Sessions = res.Sessions_Count
          ReturningUsers = res.Visitor_Graph
          acType = res.ac_type;
          if(acType == "GA4") {
              $('#continentListlabel').text('Country');
              $('#countryBreakdownlabel').text('Country Breakdown');
          } else {
              $('#continentListlabel').text('Continent');
              $('#countryBreakdownlabel').text('Continent Breakdown');
          } 
          // dropdown start
            // dropdown start
          continentJson = res.dropdown_data;
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
            dates.push(new Date(index))
          });
          function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
            let sum = [];
            [].concat(...arrayOfArrays).map(function (o) {
              let existing = sum.filter(function (i) { return i[propToCheck] === o[propToCheck] })[0];
              if (!existing) {
                sum.push(o);
              } else {
                existing[propToSum] += o[propToSum];
                let copyProps = Object.keys(o).filter(obj => {
                  return existing[obj] !== o[obj]
                }).map(val => (val !== propToSum) ? existing[val] = o[val] : null)
              }
            });

            return sum;
          }
          var startDate;
          var endDate;
          var continentJsonFiltered = []
          var continent = (mergeArrays(Object.values(continentJson), 'region', 'Session'))
          var todayDate = new Date();
          var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
          var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
          function getContinentCheckedCheckboxValues() {
            continentCheckboxArr = []
            $.each($('#continentList input[name="dropdown-group"]:checked'), function () {
              continentCheckboxArr.push($(this).val().trim())
            });
            return continentCheckboxArr;
          }
          function getRegionCheckedCheckboxValues() {
            regionCheckboxArr = []
            $.each($('#RegionList input[name="dropdown-group"]:checked'), function () {
              regionCheckboxArr.push($(this).val().trim())
            });
            return regionCheckboxArr;
          }
          function getChannelCheckedCheckboxValues() {
            channelCheckboxArr = []
            $.each($('#channelList input[name="dropdown-group"]:checked'), function () {
              channelCheckboxArr.push($(this).val().trim())
            });
            return channelCheckboxArr;
          }
          function getDeviceCheckedCheckboxValues() {
            deviceCheckboxArr = []
            $.each($('#deviceList input[name="dropdown-group"]:checked'), function () {
              deviceCheckboxArr.push($(this).val().trim())
            });
            return deviceCheckboxArr;
          }
          // checkbox
          InitDropdown(continent);
          $.each($('input[name="dropdown-group"]'), function () {
            $(this).prop("checked", true);

          });
          $(document).on('click', '#continentList .btn-continentList', function () {
            $.each($('#continentList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '#deviceList .btn-deviceList', function () {
            $.each($('#deviceList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '#channelList .btn-channelList', function () {
            $.each($('#channelList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '.btn-RegionList', function () {

            $.each($('#RegionList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          // filtetfuncion
          const filterByContinent = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Continent;
              });
            });
            return res;
          }
          const filterByRegion = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.region;
              });
            });
            return res;
          }
          const filterByChannel = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Channel;
              });
            });
            return res;
          }
          const filterByDevice = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Device;
              });
            });
            return res;
          }
         
          function InitDropdown(continent) {
            let nayaVariableContinent = returnContinentObj(continent)
            let nayaVariableRegion = returnRegionObj(continent)
            let nayaVariableDevice = returnDeviceObj(continent)
            let nayaVariableChannel = returnChannelObj(continent)
            $('#continentList').html('')
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                ${value.Continent} 
              </label>
              `)
              //   <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            // device dropdown
            $('#deviceList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>

              `);
              //   <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $('#channelList').html('')
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel}
              </label>
              `)
            })
            //    <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            $('#RegionList').html('')
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region}
                </label>
                `)
            })
            //    <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          }
          function InitDropDownOnDeviceChange(continent5) {
            let nayaVariableContinent = returnContinentObj(continent5)
            let nayaVariableChannel = returnChannelObj(continent5)
            let nayaVariableRegion = returnRegionObj(continent5)
            // device dropdown
            $('#continentList,#channelList,#RegionList').html('');
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                  <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                  ${value.Continent} 
                  </label>
                  `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel} 
              </label>
              `)
                // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region} 
                </label>
                `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnContinentChange(continent2) {
            let nayaVariableDevice = returnDeviceObj(continent2)
            let nayaVariableChannel = returnChannelObj(continent2)
            let nayaVariableRegion = returnRegionObj(continent2)
            // device dropdown
            $('#deviceList,#channelList,#RegionList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>

              `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>


            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
                $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel} 
              </label>
              `)
                // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
              <input type="checkbox" value="${value.region}" name="dropdown-group"  />
              ${value.region} 
            </label>
            `)
              // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnChannelChange(continent4) {
            let nayaVariableDevice = returnDeviceObj(continent4)
            let nayaVariableContinent = returnContinentObj(continent4)
            let nayaVariableRegion = returnRegionObj(continent4)
            // device dropdown
            $('#deviceList,#continentList,#RegionList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>
              `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                ${value.Continent} 
                </label>
                `)
                // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region} 
                </label>
                `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnRegionChange(continent3) {
            let nayaVariableContinent = returnContinentObj(continent3)
            let nayaVariableDevice = returnDeviceObj(continent3)
            let nayaVariableChannel = returnChannelObj(continent3)
            $('#deviceList,#channelList,#continentList').html('')
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
              <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
              ${value.Continent} 
              </label>
              `)
              // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
                <label class="dropdown-option device">
              <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
              ${value.Device} 
              </label>
                `);
              // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                  ${value.Channel} 
                  </label>
                  `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
          }
        
          // dropdown end
          google.charts.load('current', { 'packages': ['corechart', 'table'] });
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            $.each(Users, function (key, value) {
              UsersData.push([new Date(value.Date), value.Users])
            });
            $.each(Devices, function (key, value) {
              DevicesArray.push([value.Device, value.Users])
            });
            $.each(Devices2, function (key, value) {
              Devices2Array.push([value.Device, value['Users'], value["New_Users"]])
            });
            $.each(NewUsers, function (key, value) {
              NewUsersData.push([new Date(value.Date), value['New_Users']])
            });
            $.each(UsersPerSession, function (key, value) {
              UserPerSessionArray.push([new Date(value.Date), Number(value.Number_of_Sessions_per_User.toFixed(2))])
            });
            $.each(Sessions, function (key, value) {
              SessionArray.push([new Date(value.Date), value['Sessions']])
            });
            $.each(PageViews, function (key, value) {
              PageViewsArray.push([new Date(value.Date), value['Pageviews']])
            });
            $.each(pagesPerSession, function (key, value) {
              PagePerSessionArray.push([new Date(value.Date), Number(value.Pages_per_Session.toFixed(2))])
            });
            $.each(AvgSessionDuration, function (key, value) {
              AvgSessionDurationArray.push([new Date(value.Date), (value.Avg_Session_Duration)])
            });
            $.each(BounceRate, function (key, value) {
              BounceRateArray.push([new Date(value.Date), value.Bounce_Rate * 100])
            });
            $.each(LanguageBreakDown, function (key, value) {
              // ['Language', 'users', 'new users'],
              LanguageBreakDownArray.push([value['Language'], value['Users'], value['New_Users']])
            });
            $.each(Continents, function (key, value) {
              ContinentsArray.push([value['Continent'], value['Users'], value['New_Users']])
              var ContinentAbrv = ''
              if (value['Continent'] == 'Americas') {
                ContinentsUserArray.push(['na', value['Users']])
                ContinentsUserArray.push(['sa', value['Users']])

              } else if (value['Continent'] == 'Asia') {
                ContinentAbrv = 'as';
              } else if (value['Continent'] == 'Europe') {
                ContinentAbrv = 'eu';
              } else if (value['Continent'] == 'Oceania') {
                ContinentAbrv = 'oc';
              } else if (value['Continent'] == 'Africa') {
                ContinentAbrv = 'af';
              }
              ContinentsUserArray.push([ContinentAbrv, value['Users']])
            });
            (async () => {
              $('.countryBreakdownChart_spinner').hide();
              const topology = await fetch(
                'https://code.highcharts.com/mapdata/custom/world-continents.topo.json'
              ).then(response => response.json());
              Highcharts.mapChart('countryBreakdownChart', {
                chart: {
                  map: topology
                },

                title: {
                  text: ''
                },

                subtitle: {
                  text: ''
                },

                mapNavigation: {
                  enabled: true,
                  buttonOptions: {
                    verticalAlign: 'bottom'
                  }
                },
                credits: {
                  enabled: false
                },
                colorAxis: {
                  min: 0,

                  minColor: '#ffa800',
                  maxColor: '#93b136'
                },

                series: [{
                  data: ContinentsUserArray,
                  name: 'Users',
                  states: {
                    hover: {
                      color: '#eaff8f'
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                  }
                }]
              });

            })();
            $('.users_chart_spinner').hide();
            var chartwidth = $('#users_chart_div').width();
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Date');
            data.addColumn('number', 'Users');
            data.addRows(UsersData);
            UsersArray = Users.map(function (element) {
              return `${element.Users}`;
            })
            var options = {
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',

              },
              vAxis: {
                minValue: 0,
                format: 'short'
              },
              series: {
                0: { color: '#f66d00' },
              },
              width: chartwidth,
              chartArea: { width: chartwidth, left: 40, top: 20, right: 20, height: 150 }
            };
            var chart = new google.visualization.LineChart(document.getElementById('users_chart_div'));
            chart.draw(data, options);
            $('.newUsersChart_spinner').hide();
            var chartwidthPie = $('#newUsersPieChart').width();
            var dataNewUsers = new google.visualization.DataTable();
            dataNewUsers.addColumn('date', 'Date');
            dataNewUsers.addColumn('number', 'New_Users');
            dataNewUsers.addRows(NewUsersData);
            NewUsersArray = NewUsers.map(function (element) {
              return `${element['New_Users']}`;
            })
            var optionsNewUsers = {
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',
                gridlines: { color: 'transparent' }
              },
              vAxis: {
                gridlines: { color: 'transparent' },
                minValue: 0,
                format: 'short',
                ticks: 'true'
              },
              series: {
                0: { color: '#f66d00' },

              },
              width: chartwidthPie,
              chartArea: { width: chartwidthPie, right: 20, left: 20, top: 20, bottom: 20, height: 150 }
            };
            $('.newUsersLineChart_spinner').hide();
            var chartNewUsers = new google.visualization.LineChart(document.getElementById('newUsersLineChart'));
            chartNewUsers.draw(dataNewUsers, optionsNewUsers);
          
            const new_visitor = Number(user_count);
            var rturnigVisitors = Number(user_count -  new_user_count);
            const returning_visitors = rturnigVisitors
             
            var data = google.visualization.arrayToDataTable([
              ['New Visitor', 'Returning Visitors'],
              ['New Visitor', new_visitor],
              ['Returning Visitors', returning_visitors],

            ]);
            var optionsPieChart = {
              legend: { position: 'top', alignment: 'center' },
              title: '',
              pieHole: 0.4,
              colors: ['#f66d00', '#ffa800'],
              width: chartwidthPie,
              chartArea: { left: 2, top: 40, height: 305, width: chartwidthPie }
            };
            var chartPie = new google.visualization.PieChart(document.getElementById('newUsersPieChart'));
            chartPie.draw(data, optionsPieChart);
            $('.languageBreakdownChart_spinner').hide();
            google.load("visualization", "1", { packages: ["corechart"] });
            var chartwidthLanguage = $('#languageBreakdownChart').width();
            // var dataSetLanguage = LanguageBreakDownArray;
            var dataSetLanguage = [
              ['Language', 'users', 'new_users']
            ];
            dataSetLanguage = [...dataSetLanguage, ...LanguageBreakDownArray]
            // The first chart
            google.setOnLoadCallback(drawChart1);
            function drawChart1() {
              var dataLanguage = google.visualization.arrayToDataTable(dataSetLanguage);
              var options = {
                title: '',
                vAxis: {
                  title: '',
                  format: 'short',
                  showTextEvery: 1,

                },  // sets 
                hAxis: {
                  textPosition: "out",
                  slantedText: false,
                  showTextEvery: 1,
                  "viewWindowMode": "maximized",
                  "viewWindow": {
                  }
                },
                backgroundColor: { strokeWidth: 0 },  // to draw a nice box all around the chart
                isStacked: 'true',
                legend: { position: 'top', alignment: 'left' },
                series: {
                  0: { color: '#f66d00' },
                  1: { color: '#ffa800' },
                },
                width: chartwidthLanguage,
                chartArea: { width: chartwidthLanguage, right: 20, left: 40, top: 20, height: 150 },

                pagingButtonsConfiguration: 'auto'             //  = rowstacked in gnuplot
              };

              var chartLanguage = new google.visualization.ColumnChart(document.getElementById('languageBreakdownChart'));

              chartLanguage.draw(dataLanguage, options);
            }
            var dataLanguageTable = new google.visualization.DataTable();
            dataLanguageTable.addColumn('string', 'Language');
            dataLanguageTable.addColumn('number', 'Users');
            dataLanguageTable.addColumn('number', 'New_Users');
            dataLanguageTable.addRows(LanguageBreakDownArray);
            $('.languageBreakdownTable_spinner').hide();
            var table = new google.visualization.Table(document.getElementById('languageBreakdownTable'));
            let LanguageBreakDownformatter = new google.visualization.ColorFormat();
            LanguageBreakDownformatter.addGradientRange(1,LanguageBreakDownArray &&  LanguageBreakDownArray[0][1] + 1, '#000', '#ffa800', '#93b136');
            LanguageBreakDownformatter.format(dataLanguageTable, 1); // Apply formatter to second column
            table.draw(dataLanguageTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.countryBreakdownTable_spinner').hide();
            var countryTable = new google.visualization.DataTable();
            countryTable.addColumn('string', 'Continent');
            countryTable.addColumn('number', 'Users');
            countryTable.addColumn('number', 'New_Users');
            countryTable.addRows(ContinentsArray);
            var tableCountryBreakdown = new google.visualization.Table(document.getElementById('countryBreakdownTable'));
            let CountryBreakdownformatter = new google.visualization.ColorFormat();
            CountryBreakdownformatter.addGradientRange(ContinentsArray[(ContinentsArray.length) - 1][1], ContinentsArray[0][1] + 1, '#000', '#ffa800', '#93b136');
            CountryBreakdownformatter.format(countryTable, 1); // Apply formatter to second column
            tableCountryBreakdown.draw(countryTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.deviceTable_spinner').hide();
            var devicesTable = new google.visualization.DataTable();
            devicesTable.addColumn('string', 'Devices');
            devicesTable.addColumn('number', 'Users');
            devicesTable.addColumn('number', 'New_Users');
            devicesTable.addRows(Devices2Array);
            var tableDevices = new google.visualization.Table(document.getElementById('deviceTable'));
            tableDevices.draw(devicesTable, { showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.deviceChart_spinner').hide();
            var deviceChartWidth = $('#deviceChart').width();
            var dataDevicesUsers = google.visualization.arrayToDataTable([
              ['Devices', 'Users'], ...DevicesArray
            ]);
            var optionsDevicesPieChart = {
              legend: { position: 'bottom', alignment: 'center' },
              title: '',
              pieHole: 0.4,
              colors: ['#7cb342', '#f66d00', '#ffa800'],
              width: deviceChartWidth,
              chartArea: { left: 2, bottom: 40, height: 550, width: deviceChartWidth }
            };
            var chartPieDevices = new google.visualization.PieChart(document.getElementById('deviceChart'));
            chartPieDevices.draw(dataDevicesUsers, optionsDevicesPieChart);
            var usersCountchartwidth = $('.grid-item').width() / 1.5;
            var optionsSparkLine = {
              tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',
                gridlines: { color: 'transparent' },
                baselineColor: 'none',
                textPosition: 'none'
              },
              vAxis: {
                gridlines: { color: 'transparent' },
                baselineColor: 'none',
                minValue: 0,
                format: 'short',
                textPosition: 'none'
              },
              series: {
                0: { color: '#ffa800' },

              },

              width: usersCountchartwidth,
              height: 40,
              chartArea: { width: usersCountchartwidth, right: 0, left: 0, top: 0, height: 100 }
            };
            var SPlineUsers = new google.visualization.DataTable();
            SPlineUsers.addColumn('date', 'Date');
            SPlineUsers.addColumn('number', 'Users');
            SPlineUsers.addRows(UsersData);
            var SLUser = new google.visualization.LineChart(document.getElementById('usersCountChart'));
            SLUser.draw(SPlineUsers, optionsSparkLine);
            $('.pageViews_spinner').hide();
            
            var SPlineNewUsers = new google.visualization.DataTable();
            SPlineNewUsers.addColumn('date', 'Date');
            SPlineNewUsers.addColumn('number', 'New_Users');
            SPlineNewUsers.addRows(NewUsersData);
            var SLNewUser = new google.visualization.LineChart(document.getElementById('newUsersCountChart'));
            SLNewUser.draw(SPlineNewUsers, optionsSparkLine);
            
            var SPlineSessionPerUser = new google.visualization.DataTable();
            SPlineSessionPerUser.addColumn('date', 'Date');
            SPlineSessionPerUser.addColumn('number', 'Sessions Per User');
            SPlineSessionPerUser.addRows(UserPerSessionArray);
            var SLSessionPerUser = new google.visualization.LineChart(document.getElementById('usersSessionsChart'));
            SLSessionPerUser.draw(SPlineSessionPerUser, optionsSparkLine);
            let LastObj = (UsersPerSession[UsersPerSession.length - 1])
            let LastSessionPerUser = LastObj.Number_of_Sessions_per_User
            $('.pageViews_spinner').hide();
          
            var SPlineSessionCount = new google.visualization.DataTable();
            SPlineSessionCount.addColumn('date', 'Date');
            SPlineSessionCount.addColumn('number', 'Sessions');
            SPlineSessionCount.addRows(SessionArray);
            var SLSessionCount = new google.visualization.LineChart(document.getElementById('sessionCountChart'));
            SLSessionCount.draw(SPlineSessionCount, optionsSparkLine);
            let LastSessionObj = (Sessions[Sessions.length - 1])
            // $("#sessionCount").html(Sessions.reduce((accumulator, object) => {
            // return accumulator + object['Sessions'];
            // }, 0))
            //     $("#pageViews").html(PageViews.reduce((accumulator, object) => {
            // return accumulator + object['Pageviews'];        
            // }, 0))session_count
            $('.pageViews_spinner').hide();
          
            $('.pageViews_spinner').hide();
             
            var SPlinePageViews = new google.visualization.DataTable();
            SPlinePageViews.addColumn('date', 'Date');
            SPlinePageViews.addColumn('number', 'Page Views');
            SPlinePageViews.addRows(PageViewsArray);
            var SLPageViews = new google.visualization.LineChart(document.getElementById('pageViewsChart'));
            SLPageViews.draw(SPlinePageViews, optionsSparkLine);
            let LastObjPPS = (pagesPerSession[pagesPerSession.length - 1])
            let LastpagesPerSession = LastObjPPS.Pages_per_Session
            $('.pageViews_spinner').hide();
          
            var SPlinepagePerSession = new google.visualization.DataTable();
            SPlinepagePerSession.addColumn('date', 'Date');
            SPlinepagePerSession.addColumn('number', 'Pages / Session');
            SPlinepagePerSession.addRows(PagePerSessionArray);
            var SLpagePerSession = new google.visualization.LineChart(document.getElementById('pagePerSessionChart'));
            SLpagePerSession.draw(SPlinepagePerSession, optionsSparkLine);
            // toHHMMSS(value.Avg_Session_Duration)]
            let LastObjAvgDuration = (AvgSessionDuration[AvgSessionDuration.length - 1])
            let LastAvgDuration = LastObjAvgDuration.Avg_Session_Duration
            $('.pageViews_spinner').hide();
          
            var SPlineAvgSessionDuration = new google.visualization.DataTable();
            SPlineAvgSessionDuration.addColumn('date', 'Date');
            SPlineAvgSessionDuration.addColumn('number', 'Avg. Session Duration');
            SPlineAvgSessionDuration.addRows(AvgSessionDurationArray);
            var SLAvgSessionDuration = new google.visualization.LineChart(document.getElementById('sessonDurationChart'));
            SLAvgSessionDuration.draw(SPlineAvgSessionDuration, optionsSparkLine);
        //  var bounce_sum = 0;
        //  $.each(BounceRate,function(i,val){
        //    bounce_sum+=val.Bounce_Rate
        //  })
        //  console.log(bounce_sum/100,'BounceRate')
        
       
            $('.pageViews_spinner').hide();
           
            var SPlineBounceRate = new google.visualization.DataTable();
            SPlineBounceRate.addColumn('date', 'Date');
            SPlineBounceRate.addColumn('number', 'Bounce Rate');
            SPlineBounceRate.addRows(BounceRateArray);
            var SLBounceRate = new google.visualization.LineChart(document.getElementById('bounceRateChart'));
            SLBounceRate.draw(SPlineBounceRate, optionsSparkLine);
          }
        }
        }
      
      })
    }
  }
  // func end
  // date on change
  $('.applyBtn').on('click', function () {
    // show here
    $('#main-tag').fadeOut("slow")
    $("#overlay_new").show()
    audiFnc();

  })

  // $('#daterange_audi').val('');
  var uncheckArray = []
  $(document).on('change', 'input[name="dropdown-group"]', function () {
    // uncheckArray.push($(this).val())
    
    if(!this.checked){
        uncheckArray.push(this.value);
    }
    else {
      var index = uncheckArray.indexOf(this.value);
      if (index !== -1) {
        uncheckArray.splice(index, 1);
      }
    }

    $('#main-tag').fadeOut("slow")
    $("#overlay_new").show()
    var continentArray = [];
    var regionArray = [];
    var channelArray = [];
    var deviceArray = [];
    // $("#continentList input[name='dropdown-group']:checked").val();
    $('#continentList input[name="dropdown-group"]:checked').each(function () {
      continentArray.push(this.value)
    })

    var continentToString = continentArray.toString().trim()
    $('#RegionList input[name="dropdown-group"]:checked').each(function () {
      regionArray.push(this.value)
    })
    var regionToString = regionArray.toString().trim()
    $('#channelList input[name="dropdown-group"]:checked').each(function () {
      channelArray.push(this.value)
    })
    var channelToString = channelArray.toString().trim();
    $('#deviceList input[name="dropdown-group"]:checked').each(function () {
      deviceArray.push(this.value)
    })
    var deviceToString = deviceArray.toString().trim();
    // ajax
    var UsersData = []
    var NewUsersData = []
    var UsersPerSessionData = []
    var UserPerSessionArray = new Array()
    var SessionArray = new Array()
    var PageViewsArray = new Array()
    var PagePerSessionArray = new Array()
    var AvgSessionDurationArray = new Array()
    var BounceRateArray = new Array()
    var LanguageBreakDownArray = new Array()
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
    var new_user_count = 0;
    var user_count = 0;
    var session_count = 0;
    var Number_of_sessions_per_user_count = 0;
    var Page_Views = 0;
    var Pages_Session = 0;
    var Avg_Session_Duration = 0;
    var Bounce_Rate = 0;
    var startDate = $('#daterange_audi').data('daterangepicker').startDate._d;
    var endDate = $('#daterange_audi').data('daterangepicker').endDate._d;
    var fromdate = moment(startDate).format("YYYY-MM-DD");
    var todate = moment(endDate).format("YYYY-MM-DD");
    var continentJson;
    var project_id =  $('option:selected').attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/site_audit/audience_overview_data/?project_id=' + project_id + '&fromdate=' + fromdate + '&todate=' + todate + '&continent=' + continentToString + '&region=' + regionToString + '&deviceCategory=' + deviceToString + '&channelGrouping=' + channelToString,
      success: function (res) {
        if(res && res.status === false)
          {
            $('#btn-toggle').on('click', function(){
    $("#add_analytics_button").toggle()
  })
            $("#main-tag").hide()
            $("#alternative_img").fadeIn("slow")
            $("#add_analytics_button").show()
            // ShowNoty(res.error,"error");
          } else{
            $("#alternative_img").fadeOut("slow")
            $("#main-tag").show()
            $("#add_analytics_button").hide()
         var table3 = res.table3
          $.each(table3,function(i,val){
            user_count = val.users;
            new_user_count = val.newUsers;
            session_count = val.sessions;
            Bounce_Rate = val.bounceRate;
            Avg_Session_Duration = val.avgSessionDuration;
            Pages_Session = val.pageviewsPerSession;
            Page_Views=  val.pageviews;
            Number_of_sessions_per_user_count = val.sessionsPerUser
          });
          $("#usersCount").html('')
          $("#usersCount").html(user_count);
          $("#newUsersCount").html('')
          $("#newUsersCount").html(new_user_count)
          $("#usersSessions").html('')
          $("#usersSessions").html(Number(Pages_Session).toFixed(2));
          $("#pageViews").html('')
          $("#pageViews").html(Page_Views)
          $("#sessionCount").html('')
          $("#sessionCount").html(session_count);
          $("#pagePerSession").html('')
          $("#pagePerSession").html(Number(Pages_Session).toFixed(2));
          $("#sessonDuration").html('')
          $("#sessonDuration").html(toHHMMSS(Number(Avg_Session_Duration)));
          $("#bounceRate").html('')
          $("#bounceRate").html((Bounce_Rate * 100).toFixed(2) + '%')
        // hide here
        $('#main-tag').fadeIn("slow")
        $("#overlay_new").hide()
        Users = res.Users_Graph;
        NewUsers = res.New_Users_Graph;
        LanguageBreakDown = res.LanguageBreakDown_Graph
        Continents = res.Continent_DataTable;
        Devices = res.Devices_Graph;
        Devices2 = res.Device_DataTable
        AvgSessionDuration = res.Avg_Session_Duration;
        UsersPerSession = res.No_of_Sessions_Per_User
        BounceRate = res.Bounce_Rate
        pagesPerSession = res.Pages_per_Session_Count
        PageViews = res.Page_Views_Count
        Sessions = res.Sessions_Count
        ReturningUsers = res.Visitor_Graph
        acType = res.ac_type;
        if(acType == "GA4") {
            $('#continentListlabel').text('Country');
            $('#countryBreakdownlabel').text('Country Breakdown');
        } else {
            $('#continentListlabel').text('Continent');
            $('#countryBreakdownlabel').text('Continent Breakdown');
        }
 
        // ajax end
        continentJson = res.dropdown_data;

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
          dates.push(new Date(index))
        });
        function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
          let sum = [];
          [].concat(...arrayOfArrays).map(function (o) {
            let existing = sum.filter(function (i) { return i[propToCheck] === o[propToCheck] })[0];
            if (!existing) {
              sum.push(o);
            } else {
              existing[propToSum] += o[propToSum];
              let copyProps = Object.keys(o).filter(obj => {
                return existing[obj] !== o[obj]
              }).map(val => (val !== propToSum) ? existing[val] = o[val] : null)
            }

          });

          return sum;
        }
        var startDate;
        var endDate;
        var continentJsonFiltered = []
        var continent = (mergeArrays(Object.values(continentJson), 'region', 'Session'))
        var todayDate = new Date();
        var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
        function getContinentCheckedCheckboxValues() {
          continentCheckboxArr = []
          $.each($('#continentList input[name="dropdown-group"]:checked'), function () {
            continentCheckboxArr.push($(this).val().trim())
          });
          return continentCheckboxArr;
        }
        function getRegionCheckedCheckboxValues() {
          regionCheckboxArr = []
          $.each($('#RegionList input[name="dropdown-group"]:checked'), function () {
            regionCheckboxArr.push($(this).val().trim())
          });
          return regionCheckboxArr;
        }
        function getChannelCheckedCheckboxValues() {
          channelCheckboxArr = []
          $.each($('#channelList input[name="dropdown-group"]:checked'), function () {
            channelCheckboxArr.push($(this).val().trim())
          });
          return channelCheckboxArr;
        }
        function getDeviceCheckedCheckboxValues() {
          deviceCheckboxArr = []
          $.each($('#deviceList input[name="dropdown-group"]:checked'), function () {
            deviceCheckboxArr.push($(this).val().trim())
          });
          return deviceCheckboxArr;
        }
     

        google.charts.load('current', { 'packages': ['corechart', 'table'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          $.each(Users, function (key, value) {

            UsersData.push([new Date(value.Date), value.Users])
          });

          $.each(Devices, function (key, value) {

            DevicesArray.push([value.Device, value.Users])
          });
          $.each(Devices2, function (key, value) {

            Devices2Array.push([value.Device, value['Users'], value["New_Users"]])
          });



          $.each(NewUsers, function (key, value) {

            NewUsersData.push([new Date(value.Date), value['New_Users']])
          });
          $.each(UsersPerSession, function (key, value) {
            UserPerSessionArray.push([new Date(value.Date), Number(value.Number_of_Sessions_per_User.toFixed(2))])

          });


          $.each(Sessions, function (key, value) {
            SessionArray.push([new Date(value.Date), value['Sessions']])
          });
          $.each(PageViews, function (key, value) {
            PageViewsArray.push([new Date(value.Date), value['Pageviews']])

          });
          $.each(pagesPerSession, function (key, value) {
            PagePerSessionArray.push([new Date(value.Date), Number(value.Pages_per_Session.toFixed(2))])

          });

          $.each(AvgSessionDuration, function (key, value) {
            AvgSessionDurationArray.push([new Date(value.Date), (value.Avg_Session_Duration)])

          });

          $.each(BounceRate, function (key, value) {
            BounceRateArray.push([new Date(value.Date), value.Bounce_Rate * 100])

          });

          $.each(LanguageBreakDown, function (key, value) {
            // ['Language', 'users', 'new users'],
            LanguageBreakDownArray.push([value['Language'], value['Users'], value['New_Users']])

          });

          $.each(Continents, function (key, value) {
            ContinentsArray.push([value['Continent'], value['Users'], value['New_Users']])
            var ContinentAbrv = ''


            if (value['Continent'] == 'Americas') {


              ContinentsUserArray.push(['na', value['Users']])
              ContinentsUserArray.push(['sa', value['Users']])

            } else if (value['Continent'] == 'Asia') {
              ContinentAbrv = 'as';

            } else if (value['Continent'] == 'Europe') {
              ContinentAbrv = 'eu';
            } else if (value['Continent'] == 'Oceania') {
              ContinentAbrv = 'oc';
            } else if (value['Continent'] == 'Africa') {
              ContinentAbrv = 'af';
            }
            // else if(value['Continent'] == '(not set)'){
            //     ContinentAbrv = '(not set)';
            // }
            ContinentsUserArray.push([ContinentAbrv, value['Users']])
          });



          (async () => {

            $('.countryBreakdownChart_spinner').hide();
            const topology = await fetch(
              'https://code.highcharts.com/mapdata/custom/world-continents.topo.json'
            ).then(response => response.json());

            // Prepare demo data. The data is joined to map using value of 'hc-key'
            // property by default. See API docs for 'joinBy' for more info on linking
            // data and map.

            // '#ffa800' ,'#93b136' 
            // Create the chart
            Highcharts.mapChart('countryBreakdownChart', {
              chart: {
                map: topology
              },

              title: {
                text: ''
              },

              subtitle: {
                text: ''
              },

              mapNavigation: {
                enabled: true,
                buttonOptions: {
                  verticalAlign: 'bottom'
                }
              },
              credits: {
                enabled: false
              },
              colorAxis: {
                min: 0,

                minColor: '#ffa800',
                maxColor: '#93b136'
              },

              series: [{
                data: ContinentsUserArray,
                name: 'Users',
                states: {
                  hover: {
                    color: '#eaff8f'
                  }
                },
                dataLabels: {
                  enabled: true,
                  format: '{point.name}'
                }
              }]
            });

          })();

          $('.users_chart_spinner').hide();
          var chartwidth = $('#users_chart_div').width();
          var data = new google.visualization.DataTable();
          data.addColumn('date', 'Date');
          data.addColumn('number', 'Users');
          data.addRows(UsersData);
          UsersArray = Users.map(function (element) {
            return `${element.Users}`;
          })

          var options = {
            lineWidth: 3,
            title: '',
            legend: { position: 'top', alignment: 'start' },
            hAxis: {
              format: 'MMM d',

            },
            vAxis: {
              minValue: 0,
              format: 'short'
            },
            series: {
              0: { color: '#f66d00' },
            },
            width: chartwidth,
            chartArea: { width: chartwidth, left: 40, top: 20, right: 20, height: 150 }
          };

          var chart = new google.visualization.LineChart(document.getElementById('users_chart_div'));

          chart.draw(data, options);


          $('.newUsersChart_spinner').hide();
          var chartwidthPie = $('#newUsersPieChart').width();
          var dataNewUsers = new google.visualization.DataTable();
          dataNewUsers.addColumn('date', 'Date');
          dataNewUsers.addColumn('number', 'New_Users');

          dataNewUsers.addRows(NewUsersData);
          NewUsersArray = NewUsers.map(function (element) {
            return `${element['New_Users']}`;
          })
          var optionsNewUsers = {
            lineWidth: 3,
            title: '',
            legend: { position: 'top', alignment: 'start' },
            hAxis: {
              format: 'MMM d',
              gridlines: { color: 'transparent' }
            },
            vAxis: {
              gridlines: { color: 'transparent' },
              minValue: 0,
              format: 'short',
              ticks: 'true'
            },
            series: {
              0: { color: '#f66d00' },

            },
            width: chartwidthPie,
            chartArea: { width: chartwidthPie, right: 20, left: 20, top: 20, bottom: 20, height: 150 }
          };
          $('.newUsersLineChart_spinner').hide();
          var chartNewUsers = new google.visualization.LineChart(document.getElementById('newUsersLineChart'));

          chartNewUsers.draw(dataNewUsers, optionsNewUsers);

          // var NV, RV;
          // ReturningUsers.map((item) => {
          //   if (item.User_Type === 'New Visitor') {
          //     NV = item.Sessions;
          //   }
          //   else {
          //     RV = item.Sessions;
          //   }
          // });
          
      
          
               const new_visitor = Number(user_count);
            var rturnigVisitors = Number(user_count -  new_user_count);
            const returning_visitors = rturnigVisitors
        
          var data = google.visualization.arrayToDataTable([
            ['New Visitor', 'Returning Visitors'],
            ['New Visitor', new_visitor],
            ['Returning Visitors', returning_visitors],

          ]);

          var optionsPieChart = {
            legend: { position: 'top', alignment: 'center' },
            title: '',
            pieHole: 0.4,
            colors: ['#f66d00', '#ffa800'],
            width: chartwidthPie,
            chartArea: { left: 2, top: 40, height: 305, width: chartwidthPie }
          };

          var chartPie = new google.visualization.PieChart(document.getElementById('newUsersPieChart'));
          chartPie.draw(data, optionsPieChart);




          $('.languageBreakdownChart_spinner').hide();
          google.load("visualization", "1", { packages: ["corechart"] });
          var chartwidthLanguage = $('#languageBreakdownChart').width();
          // var dataSetLanguage = LanguageBreakDownArray;
          var dataSetLanguage = [
            ['Language', 'users', 'new_users']

          ];
          dataSetLanguage = [...dataSetLanguage, ...LanguageBreakDownArray]
          // The first chart

          google.setOnLoadCallback(drawChart1);
          function drawChart1() {
            var dataLanguage = google.visualization.arrayToDataTable(dataSetLanguage);

            var options = {
              title: '',
              vAxis: {
                title: '',
                format: 'short',
                showTextEvery: 1,
                "ticks": [0, 20000, 40000, 60000, 80000],

              },  // sets 
              hAxis: {
                textPosition: "out",
                slantedText: false,
                showTextEvery: 1,
                "viewWindowMode": "maximized",
                "viewWindow": {
                  //The minimum horizontal data value to render
                  "min": 0,
                  //The maximum horizontal data value to render
                  "max": 11
                }
              },
              backgroundColor: { strokeWidth: 0 },  // to draw a nice box all around the chart
              isStacked: 'true',
              legend: { position: 'top', alignment: 'left' },
              series: {
                0: { color: '#f66d00' },
                1: { color: '#ffa800' },
              },
              width: chartwidthLanguage,
              chartArea: { width: chartwidthLanguage, right: 20, left: 40, top: 20, height: 150 },

              pagingButtonsConfiguration: 'auto'             //  = rowstacked in gnuplot
            };

            var chartLanguage = new google.visualization.ColumnChart(document.getElementById('languageBreakdownChart'));

            chartLanguage.draw(dataLanguage, options);
          }


          var dataLanguageTable = new google.visualization.DataTable();
          dataLanguageTable.addColumn('string', 'Language');
          dataLanguageTable.addColumn('number', 'Users');
          dataLanguageTable.addColumn('number', 'New_Users');
          dataLanguageTable.addRows(LanguageBreakDownArray);
          $('.languageBreakdownTable_spinner').hide();
          var table = new google.visualization.Table(document.getElementById('languageBreakdownTable'));
          let LanguageBreakDownformatter = new google.visualization.ColorFormat();
          LanguageBreakDownformatter.addGradientRange(1, LanguageBreakDownArray && LanguageBreakDownArray[0][1] + 1, '#000', '#ffa800', '#93b136');
          LanguageBreakDownformatter.format(dataLanguageTable, 1); // Apply formatter to second column
          table.draw(dataLanguageTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });

          $('.countryBreakdownTable_spinner').hide();
          var countryTable = new google.visualization.DataTable();
          countryTable.addColumn('string', 'Continent');
          countryTable.addColumn('number', 'Users');
          countryTable.addColumn('number', 'New_Users');
          countryTable.addRows(ContinentsArray);
          var tableCountryBreakdown = new google.visualization.Table(document.getElementById('countryBreakdownTable'));
          let CountryBreakdownformatter = new google.visualization.ColorFormat();
          CountryBreakdownformatter.addGradientRange(ContinentsArray[(ContinentsArray.length) - 1][1], ContinentsArray[0][1] + 1, '#000', '#ffa800', '#93b136');
          CountryBreakdownformatter.format(countryTable, 1); // Apply formatter to second column
          tableCountryBreakdown.draw(countryTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });

          $('.deviceTable_spinner').hide();
          var devicesTable = new google.visualization.DataTable();
          devicesTable.addColumn('string', 'Devices');
          devicesTable.addColumn('number', 'Users');
          devicesTable.addColumn('number', 'New_Users');
          devicesTable.addRows(Devices2Array);
          var tableDevices = new google.visualization.Table(document.getElementById('deviceTable'));
          tableDevices.draw(devicesTable, { showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });

          $('.deviceChart_spinner').hide();
          var deviceChartWidth = $('#deviceChart').width();
          var dataDevicesUsers = google.visualization.arrayToDataTable([
            ['Devices', 'Users'], ...DevicesArray
          ]);
          var optionsDevicesPieChart = {
            legend: { position: 'bottom', alignment: 'center' },
            title: '',
            pieHole: 0.4,
            colors: ['#7cb342', '#f66d00', '#ffa800'],
            width: deviceChartWidth,
            chartArea: { left: 2, bottom: 40, height: 550, width: deviceChartWidth }
          };

          var chartPieDevices = new google.visualization.PieChart(document.getElementById('deviceChart'));
          chartPieDevices.draw(dataDevicesUsers, optionsDevicesPieChart);

          var usersCountchartwidth = $('.grid-item').width() / 1.5;
          var optionsSparkLine = {
            tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
            lineWidth: 3,
            title: '',
            legend: { position: 'top', alignment: 'start' },
            hAxis: {
              format: 'MMM d',
              gridlines: { color: 'transparent' },
              baselineColor: 'none',
              textPosition: 'none'
            },
            vAxis: {
              gridlines: { color: 'transparent' },
              baselineColor: 'none',
              minValue: 0,
              format: 'short',
              textPosition: 'none'
            },
            series: {
              0: { color: '#ffa800' },

            },

            width: usersCountchartwidth,
            height: 40,
            chartArea: { width: usersCountchartwidth, right: 0, left: 0, top: 0, height: 100 }
          };
          var SPlineUsers = new google.visualization.DataTable();
          SPlineUsers.addColumn('date', 'Date');
          SPlineUsers.addColumn('number', 'Users');
          SPlineUsers.addRows(UsersData);
          var SLUser = new google.visualization.LineChart(document.getElementById('usersCountChart'));
          SLUser.draw(SPlineUsers, optionsSparkLine);
          var SPlineNewUsers = new google.visualization.DataTable();
          SPlineNewUsers.addColumn('date', 'Date');
          SPlineNewUsers.addColumn('number', 'New_Users');
          SPlineNewUsers.addRows(NewUsersData);
          var SLNewUser = new google.visualization.LineChart(document.getElementById('newUsersCountChart'));
          SLNewUser.draw(SPlineNewUsers, optionsSparkLine);
          $('.pageViews_spinner').hide();
          var SPlineSessionPerUser = new google.visualization.DataTable();
          SPlineSessionPerUser.addColumn('date', 'Date');
          SPlineSessionPerUser.addColumn('number', 'Sessions Per User');
          SPlineSessionPerUser.addRows(UserPerSessionArray);
          var SLSessionPerUser = new google.visualization.LineChart(document.getElementById('usersSessionsChart'));
          SLSessionPerUser.draw(SPlineSessionPerUser, optionsSparkLine);
          let LastObj = (UsersPerSession[UsersPerSession.length - 1])
          let LastSessionPerUser = LastObj.Number_of_Sessions_per_User
          var SPlineSessionCount = new google.visualization.DataTable();
          SPlineSessionCount.addColumn('date', 'Date');
          SPlineSessionCount.addColumn('number', 'Sessions');
          SPlineSessionCount.addRows(SessionArray);
          var SLSessionCount = new google.visualization.LineChart(document.getElementById('sessionCountChart'));
          SLSessionCount.draw(SPlineSessionCount, optionsSparkLine);
          let LastSessionObj = (Sessions[Sessions.length - 1])
          // $("#sessionCount").html(Sessions.reduce((accumulator, object) => {
          // return accumulator + object['Sessions'];
          // }, 0))
          //     $("#pageViews").html(PageViews.reduce((accumulator, object) => {
          // return accumulator + object['Pageviews'];        
          // }, 0))session_count
          $("#pageViews").html(PageViews.length)
          var SPlinePageViews = new google.visualization.DataTable();
          SPlinePageViews.addColumn('date', 'Date');
          SPlinePageViews.addColumn('number', 'Page Views');
          SPlinePageViews.addRows(PageViewsArray);
          var SLPageViews = new google.visualization.LineChart(document.getElementById('pageViewsChart'));
          SLPageViews.draw(SPlinePageViews, optionsSparkLine);
          let LastObjPPS = (pagesPerSession[pagesPerSession.length - 1])
          let LastpagesPerSession = LastObjPPS.Pages_per_Session
          var SPlinepagePerSession = new google.visualization.DataTable();
          SPlinepagePerSession.addColumn('date', 'Date');
          SPlinepagePerSession.addColumn('number', 'Pages / Session');
          SPlinepagePerSession.addRows(PagePerSessionArray);
          var SLpagePerSession = new google.visualization.LineChart(document.getElementById('pagePerSessionChart'));
          SLpagePerSession.draw(SPlinepagePerSession, optionsSparkLine);
          // toHHMMSS(value.Avg_Session_Duration)]
          let LastObjAvgDuration = (AvgSessionDuration[AvgSessionDuration.length - 1])
          let LastAvgDuration = LastObjAvgDuration.Avg_Session_Duration
          var SPlineAvgSessionDuration = new google.visualization.DataTable();
          SPlineAvgSessionDuration.addColumn('date', 'Date');
          SPlineAvgSessionDuration.addColumn('number', 'Avg. Session Duration');
          SPlineAvgSessionDuration.addRows(AvgSessionDurationArray);
          var SLAvgSessionDuration = new google.visualization.LineChart(document.getElementById('sessonDurationChart'));
          SLAvgSessionDuration.draw(SPlineAvgSessionDuration, optionsSparkLine);
        
       
          var SPlineBounceRate = new google.visualization.DataTable();
          SPlineBounceRate.addColumn('date', 'Date');
          SPlineBounceRate.addColumn('number', 'Bounce Rate');
          SPlineBounceRate.addRows(BounceRateArray);
          var SLBounceRate = new google.visualization.LineChart(document.getElementById('bounceRateChart'));
          SLBounceRate.draw(SPlineBounceRate, optionsSparkLine);
        }

      }
      }
    
    })
  
  })

  var CheckboxDropdown = function (el) {
    var _this = this;

    this.isOpen = false;

    this.$el = $(el);
    this.$label = this.$el.find('.dropdown-label');

    this.$text_label = this.$el.find('.dropdown-label').text();

    this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
    this.$inputs = this.$el.find('[type="checkbox"]');

    this.onCheckBox();

    this.$label.on('click', function (e) {
      e.preventDefault();
      _this.toggleOpen();
    });



    this.$inputs.on('change', function (e) {
      _this.onCheckBox();
    });
  };

  CheckboxDropdown.prototype.onCheckBox = function () {
    this.updateStatus();
  };

  CheckboxDropdown.prototype.updateStatus = function () {
    var checked = this.$el.find(':checked');

    this.areAllChecked = false;
    this.$checkAll.html('Check All');

    if (checked.length <= 0) {
      this.$label.html(this.$text_label);
    }

    else if (checked.length === this.$inputs.length) {
      // this.$label.html('All Selected');
      this.areAllChecked = true;
      this.$checkAll.html('Uncheck All');
    }
    else {
      // this.$label.html(checked.length + ' Selected');
    }
  };



  CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
    var _this = this;
    $('.dropdown_custom').removeClass('on');

    if (!this.isOpen || forceOpen) {
      this.isOpen = true;
      this.$el.addClass('on');
      $(document).on('click', function (e) {
        if (!$(e.target).closest('[data-control]').length) {

          _this.toggleOpen();
        }
      });
    }
    else {
      this.isOpen = false;
      this.$el.removeClass('on');
      $(document).off('click');
    }
  };

  var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
  for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
    new CheckboxDropdown(checkboxesDropdowns[i]);
  }

  ;


  $("#continent").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".continent").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  //   channel
  $("#channel").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".channell").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  //   region
  $("#region").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".region").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  //  device
  $("#device").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".device").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  // 

  $(document).on('change', "#checkAllContinent", function () {
    $('#continentList input[name="dropdown-group"]').not(this).prop('checked', this.checked);
  });
  $(document).on('change', "#checkAllRegion", function () {
    $('#RegionList input[name="dropdown-group"]').not(this).prop('checked', this.checked);
  });
  $(document).on('change', "#checkAllChannel", function () {
    $('#channelList input[name="dropdown-group"]').not(this).prop('checked', this.checked);
  });
  $(document).on('change', "#checkAllDevice", function () {

    $('#deviceList input[name="dropdown-group"]').not(this).prop('checked', this.checked);
  });

  $('#basic-addon1').on('click', function () {

    $('input[name="daterange_audi"]').focus();

  });

  $(document).on('change','.radio',function(){
    $("#add_analytics_button").hide()
    $("#alternative_img").hide()
    $("#overlay_new").show()
    var project_id =  $('option:selected', this).attr('data-id')
    var UsersData = []
      var NewUsersData = []
      var UsersPerSessionData = []
      var UserPerSessionArray = new Array()
      var SessionArray = new Array()
      var PageViewsArray = new Array()
      var PagePerSessionArray = new Array()
      var AvgSessionDurationArray = new Array()
      var BounceRateArray = new Array()
      var LanguageBreakDownArray = new Array()
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
      var startDate = $('#daterange_audi').data('daterangepicker').startDate._d;
      var endDate = $('#daterange_audi').data('daterangepicker').endDate._d;
      var fromdate = moment(startDate).format("YYYY-MM-DD");
      var todate = moment(endDate).format("YYYY-MM-DD");
      var continentJson;
      var continentCheckboxArr = [];
      var regionCheckboxArr = [];
      var channelCheckboxArr = [];
      var deviceCheckboxArr = [];
      var new_user_count = 0;
          var user_count = 0;
          var session_count = 0;
          var Number_of_sessions_per_user_count = 0;
          var Page_Views = 0;
          var Pages_Session = 0;
          var Avg_Session_Duration = 0;
          var Bounce_Rate = 0;
      //   first ajax start
      $.ajax({
        method: 'GET',
        url: '/site_audit/audience_overview_data/?project_id=' + project_id + '&fromdate=' + fromdate + '&todate=' + todate + '&continent=&deviceCategory=&channelGrouping=',
        success: function (res) {
            $("#overlay_new").hide()
           if(res && res.status === false)
          {
            $('#btn-toggle').on('click', function(){
              $("#add_analytics_button").toggle()
            })
            $("#main-tag").hide()
            $("#alternative_img").fadeIn("slow")
            $("#add_analytics_button").show()
            // ShowNoty(res.error,"error");
          } else{
            $("#alternative_img").fadeOut("slow")
            $("#main-tag").show()
            $("#add_analytics_button").hide()
          // counts start
          var table3 = res.table3
          $.each(table3,function(i,val){
            user_count = val.users;
            new_user_count = val.newUsers;
            session_count = val.sessions;
            Bounce_Rate = val.bounceRate;
            Avg_Session_Duration = val.avgSessionDuration;
            Pages_Session = val.pageviewsPerSession;
            Page_Views=  val.pageviews;
            Number_of_sessions_per_user_count = val.sessionsPerUser


          });
          $("#usersCount").html('')
          $("#usersCount").html(user_count);
          $("#newUsersCount").html('')
          $("#newUsersCount").html(new_user_count)
          $("#usersSessions").html('')
          $("#usersSessions").html(Number(Pages_Session).toFixed(2));
          $("#pageViews").html('')
          $("#pageViews").html(Page_Views)
          $("#sessionCount").html('')
          $("#sessionCount").html(session_count);
          $("#pagePerSession").html('')
          $("#pagePerSession").html(Number(Pages_Session).toFixed(2));
          $("#sessonDuration").html('')
          $("#sessonDuration").html(toHHMMSS(Number(Avg_Session_Duration)));
          $("#bounceRate").html('')
          $("#bounceRate").html((Bounce_Rate * 100).toFixed(2) + '%')
            
          // counts end
          $('#main-tag').fadeIn("slow")
          $("#overlay_new").hide()
          Users = res.Users_Graph;
          NewUsers = res.New_Users_Graph;
          LanguageBreakDown = res.LanguageBreakDown_Graph
          Continents = res.Continent_DataTable;
          Devices = res.Devices_Graph;
          Devices2 = res.Device_DataTable
          AvgSessionDuration = res.Avg_Session_Duration;
          UsersPerSession = res.No_of_Sessions_Per_User
          BounceRate = res.Bounce_Rate
          pagesPerSession = res.Pages_per_Session_Count
          PageViews = res.Page_Views_Count
          Sessions = res.Sessions_Count
          ReturningUsers = res.Visitor_Graph
          acType = res.ac_type;
          if(acType == "GA4") {
              $('#continentListlabel').text('Country');
              $('#countryBreakdownlabel').text('Country Breakdown');
          } else {
              $('#continentListlabel').text('Continent');
              $('#countryBreakdownlabel').text('Continent Breakdown');
          }
 
          // dropdown start
            // dropdown start
          continentJson = res.dropdown_data;
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
            dates.push(new Date(index))
          });
          function mergeArrays(arrayOfArrays, propToCheck, propToSum) {
            let sum = [];
            [].concat(...arrayOfArrays).map(function (o) {
              let existing = sum.filter(function (i) { return i[propToCheck] === o[propToCheck] })[0];
              if (!existing) {
                sum.push(o);
              } else {
                existing[propToSum] += o[propToSum];
                let copyProps = Object.keys(o).filter(obj => {
                  return existing[obj] !== o[obj]
                }).map(val => (val !== propToSum) ? existing[val] = o[val] : null)
              }
            });

            return sum;
          }
          var startDate;
          var endDate;
          var continentJsonFiltered = []
          var continent = (mergeArrays(Object.values(continentJson), 'region', 'Session'))
          var todayDate = new Date();
          var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
          var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
          function getContinentCheckedCheckboxValues() {
            continentCheckboxArr = []
            $.each($('#continentList input[name="dropdown-group"]:checked'), function () {
              continentCheckboxArr.push($(this).val().trim())
            });
            return continentCheckboxArr;
          }
          function getRegionCheckedCheckboxValues() {
            regionCheckboxArr = []
            $.each($('#RegionList input[name="dropdown-group"]:checked'), function () {
              regionCheckboxArr.push($(this).val().trim())
            });
            return regionCheckboxArr;
          }
          function getChannelCheckedCheckboxValues() {
            channelCheckboxArr = []
            $.each($('#channelList input[name="dropdown-group"]:checked'), function () {
              channelCheckboxArr.push($(this).val().trim())
            });
            return channelCheckboxArr;
          }
          function getDeviceCheckedCheckboxValues() {
            deviceCheckboxArr = []
            $.each($('#deviceList input[name="dropdown-group"]:checked'), function () {
              deviceCheckboxArr.push($(this).val().trim())
            });
            return deviceCheckboxArr;
          }
          // checkbox
          InitDropdown(continent);
          $.each($('input[name="dropdown-group"]'), function () {
            $(this).prop("checked", true);

          });
          $(document).on('click', '#continentList .btn-continentList', function () {
            $.each($('#continentList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '#deviceList .btn-deviceList', function () {
            $.each($('#deviceList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '#channelList .btn-channelList', function () {
            $.each($('#channelList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          $(document).on('click', '.btn-RegionList', function () {

            $.each($('#RegionList input[name="dropdown-group"]'), function () {
              $(this).parent().parent().find('input[name="dropdown-group"]').prop("checked", false)
            });

          });
          // filtetfuncion
          const filterByContinent = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Continent;
              });
            });
            return res;
          }
          const filterByRegion = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.region;
              });
            });
            return res;
          }
          const filterByChannel = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Channel;
              });
            });
            return res;
          }
          const filterByDevice = (arr1, arr2) => {
            let res = [];
            res = arr1.filter(el => {
              return arr2.find(element => {
                return element == el.Device;
              });
            });
            return res;
          }
          
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
          //   console.log(onchangeContinent,'onchangeContinent')
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
          // //  var arr = []
         
         
          function InitDropdown(continent) {
            let nayaVariableContinent = returnContinentObj(continent)
            let nayaVariableRegion = returnRegionObj(continent)
            let nayaVariableDevice = returnDeviceObj(continent)
            let nayaVariableChannel = returnChannelObj(continent)
            $('#continentList').html('')
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                ${value.Continent} 
              </label>
              `)
              //   <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            // device dropdown
            $('#deviceList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>

              `);
              //   <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $('#channelList').html('')
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel}
              </label>
              `)
            })
            //    <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>
            $('#RegionList').html('')
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region}
                </label>
                `)
            })
            //    <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>
          }
          function InitDropDownOnDeviceChange(continent5) {
            let nayaVariableContinent = returnContinentObj(continent5)
            let nayaVariableChannel = returnChannelObj(continent5)
            let nayaVariableRegion = returnRegionObj(continent5)
            // device dropdown
            $('#continentList,#channelList,#RegionList').html('');
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                  <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                  ${value.Continent} 
                  </label>
                  `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel} 
              </label>
              `)
                // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region} 
                </label>
                `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnContinentChange(continent2) {
            let nayaVariableDevice = returnDeviceObj(continent2)
            let nayaVariableChannel = returnChannelObj(continent2)
            let nayaVariableRegion = returnRegionObj(continent2)
            // device dropdown
            $('#deviceList,#channelList,#RegionList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>

              `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>


            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
                $('#channelList').append(`<label class="dropdown-option channell">
                <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                ${value.Channel} 
              </label>
              `)
                // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
              <input type="checkbox" value="${value.region}" name="dropdown-group"  />
              ${value.region} 
            </label>
            `)
              // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnChannelChange(continent4) {
            let nayaVariableDevice = returnDeviceObj(continent4)
            let nayaVariableContinent = returnContinentObj(continent4)
            let nayaVariableRegion = returnRegionObj(continent4)
            // device dropdown
            $('#deviceList,#continentList,#RegionList').html('')
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
              <label class="dropdown-option device">
            <input type="checkbox" value=" ${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
            ${value.Device} 
          </label>
              `);
            // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
                <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
                ${value.Continent} 
                </label>
                `)
                // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableRegion, function (index, value) {
              $('#RegionList').append(`<label class="dropdown-option region">
                  <input type="checkbox" value="${value.region}" name="dropdown-group"  />
                  ${value.region} 
                </label>
                `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-RegionList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            })
          }
          function InitDropDownOnRegionChange(continent3) {
            let nayaVariableContinent = returnContinentObj(continent3)
            let nayaVariableDevice = returnDeviceObj(continent3)
            let nayaVariableChannel = returnChannelObj(continent3)
            $('#deviceList,#channelList,#continentList').html('')
            $.each(nayaVariableContinent, function (index, value) {
              $('#continentList').append(`<label class="dropdown-option continent">
              <input type="checkbox" value="${value.Continent}"  name="dropdown-group"  />
              ${value.Continent} 
              </label>
              `)
              // <span class="float-end d-block only"><a class="btn-custom btn-continentList">Only</a><small class="number"> ${kFormatter(value.Session)}</small></span>

            });
            $.each(nayaVariableDevice, function (index, value) {
              $('#deviceList').append(`
                <label class="dropdown-option device">
              <input type="checkbox" value="${value.Device}" name="dropdown-group" defaultvalue="Tablet" />
              ${value.Device} 
              </label>
                `);
              // <span class="float-end d-block only"><a class="btn-custom btn-deviceList">Only</a> <small class="number">${kFormatter(value.Session)}</small></span>

            });
            // channal dropdoen
            $.each(nayaVariableChannel, function (index, value) {
              $('#channelList').append(`<label class="dropdown-option channell">
                  <input type="checkbox" value="${value.Channel}"  name="dropdown-group" defaultvalue="Direct" />
                  ${value.Channel} 
                  </label>
                  `)
                  // <span class="float-end d-block only"><a class="btn-custom btn-channelList">Only</a><small class="number">${kFormatter(value.Session)}</small></span>

            })
          }
        
          // dropdown end
          google.charts.load('current', { 'packages': ['corechart', 'table'] });
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            $.each(Users, function (key, value) {
              UsersData.push([new Date(value.Date), value.Users])
            });
            $.each(Devices, function (key, value) {
              DevicesArray.push([value.Device, value.Users])
            });
            $.each(Devices2, function (key, value) {
              Devices2Array.push([value.Device, value['Users'], value["New_Users"]])
            });
            $.each(NewUsers, function (key, value) {
              NewUsersData.push([new Date(value.Date), value['New_Users']])
            });
            $.each(UsersPerSession, function (key, value) {
              UserPerSessionArray.push([new Date(value.Date), Number(value.Number_of_Sessions_per_User.toFixed(2))])
            });
            $.each(Sessions, function (key, value) {
              SessionArray.push([new Date(value.Date), value['Sessions']])
            });
            $.each(PageViews, function (key, value) {
              PageViewsArray.push([new Date(value.Date), value['Pageviews']])
            });
            $.each(pagesPerSession, function (key, value) {
              PagePerSessionArray.push([new Date(value.Date), Number(value.Pages_per_Session.toFixed(2))])
            });
            $.each(AvgSessionDuration, function (key, value) {
              AvgSessionDurationArray.push([new Date(value.Date), (value.Avg_Session_Duration)])
            });
            $.each(BounceRate, function (key, value) {
              BounceRateArray.push([new Date(value.Date), value.Bounce_Rate * 100])
            });
            $.each(LanguageBreakDown, function (key, value) {
              // ['Language', 'users', 'new users'],
              LanguageBreakDownArray.push([value['Language'], value['Users'], value['New_Users']])
            });
            $.each(Continents, function (key, value) {
              ContinentsArray.push([value['Continent'], value['Users'], value['New_Users']])
              var ContinentAbrv = ''
              if (value['Continent'] == 'Americas') {
                ContinentsUserArray.push(['na', value['Users']])
                ContinentsUserArray.push(['sa', value['Users']])

              } else if (value['Continent'] == 'Asia') {
                ContinentAbrv = 'as';
              } else if (value['Continent'] == 'Europe') {
                ContinentAbrv = 'eu';
              } else if (value['Continent'] == 'Oceania') {
                ContinentAbrv = 'oc';
              } else if (value['Continent'] == 'Africa') {
                ContinentAbrv = 'af';
              }
              ContinentsUserArray.push([ContinentAbrv, value['Users']])
            });
            (async () => {
              $('.countryBreakdownChart_spinner').hide();
              const topology = await fetch(
                'https://code.highcharts.com/mapdata/custom/world-continents.topo.json'
              ).then(response => response.json());
              Highcharts.mapChart('countryBreakdownChart', {
                chart: {
                  map: topology
                },

                title: {
                  text: ''
                },

                subtitle: {
                  text: ''
                },

                mapNavigation: {
                  enabled: true,
                  buttonOptions: {
                    verticalAlign: 'bottom'
                  }
                },
                credits: {
                  enabled: false
                },
                colorAxis: {
                  min: 0,

                  minColor: '#ffa800',
                  maxColor: '#93b136'
                },

                series: [{
                  data: ContinentsUserArray,
                  name: 'Users',
                  states: {
                    hover: {
                      color: '#eaff8f'
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                  }
                }]
              });

            })();
            $('.users_chart_spinner').hide();
            var chartwidth = $('#users_chart_div').width();
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Date');
            data.addColumn('number', 'Users');
            data.addRows(UsersData);
            UsersArray = Users.map(function (element) {
              return `${element.Users}`;
            })
            var options = {
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',

              },
              vAxis: {
                minValue: 0,
                format: 'short'
              },
              series: {
                0: { color: '#f66d00' },
              },
              width: chartwidth,
              chartArea: { width: chartwidth, left: 40, top: 20, right: 20, height: 150 }
            };
            var chart = new google.visualization.LineChart(document.getElementById('users_chart_div'));
            chart.draw(data, options);
            $('.newUsersChart_spinner').hide();
            var chartwidthPie = $('#newUsersPieChart').width();
            var dataNewUsers = new google.visualization.DataTable();
            dataNewUsers.addColumn('date', 'Date');
            dataNewUsers.addColumn('number', 'New_Users');
            dataNewUsers.addRows(NewUsersData);
            NewUsersArray = NewUsers.map(function (element) {
              return `${element['New_Users']}`;
            })
            var optionsNewUsers = {
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',
                gridlines: { color: 'transparent' }
              },
              vAxis: {
                gridlines: { color: 'transparent' },
                minValue: 0,
                format: 'short',
                ticks: 'true'
              },
              series: {
                0: { color: '#f66d00' },

              },
              width: chartwidthPie,
              chartArea: { width: chartwidthPie, right: 20, left: 20, top: 20, bottom: 20, height: 150 }
            };
            $('.newUsersLineChart_spinner').hide();
            var chartNewUsers = new google.visualization.LineChart(document.getElementById('newUsersLineChart'));
            chartNewUsers.draw(dataNewUsers, optionsNewUsers);
          
            const new_visitor = Number(user_count);
            var rturnigVisitors = Number(user_count -  new_user_count);
            const returning_visitors = rturnigVisitors
             
            var data = google.visualization.arrayToDataTable([
              ['New Visitor', 'Returning Visitors'],
              ['New Visitor', new_visitor],
              ['Returning Visitors', returning_visitors],

            ]);
            var optionsPieChart = {
              legend: { position: 'top', alignment: 'center' },
              title: '',
              pieHole: 0.4,
              colors: ['#f66d00', '#ffa800'],
              width: chartwidthPie,
              chartArea: { left: 2, top: 40, height: 305, width: chartwidthPie }
            };
            var chartPie = new google.visualization.PieChart(document.getElementById('newUsersPieChart'));
            chartPie.draw(data, optionsPieChart);
            $('.languageBreakdownChart_spinner').hide();
            google.load("visualization", "1", { packages: ["corechart"] });
            var chartwidthLanguage = $('#languageBreakdownChart').width();
            // var dataSetLanguage = LanguageBreakDownArray;
            var dataSetLanguage = [
              ['Language', 'users', 'new_users']
            ];
            dataSetLanguage = [...dataSetLanguage, ...LanguageBreakDownArray]
            // The first chart
            google.setOnLoadCallback(drawChart1);
            function drawChart1() {
              var dataLanguage = google.visualization.arrayToDataTable(dataSetLanguage);
              var options = {
                title: '',
                vAxis: {
                  title: '',
                  format: 'short',
                  showTextEvery: 1,

                },  // sets 
                hAxis: {
                  textPosition: "out",
                  slantedText: false,
                  showTextEvery: 1,
                  "viewWindowMode": "maximized",
                  "viewWindow": {
                  }
                },
                backgroundColor: { strokeWidth: 0 },  // to draw a nice box all around the chart
                isStacked: 'true',
                legend: { position: 'top', alignment: 'left' },
                series: {
                  0: { color: '#f66d00' },
                  1: { color: '#ffa800' },
                },
                width: chartwidthLanguage,
                chartArea: { width: chartwidthLanguage, right: 20, left: 40, top: 20, height: 150 },

                pagingButtonsConfiguration: 'auto'             //  = rowstacked in gnuplot
              };

              var chartLanguage = new google.visualization.ColumnChart(document.getElementById('languageBreakdownChart'));

              chartLanguage.draw(dataLanguage, options);
            }
            var dataLanguageTable = new google.visualization.DataTable();
            dataLanguageTable.addColumn('string', 'Language');
            dataLanguageTable.addColumn('number', 'Users');
            dataLanguageTable.addColumn('number', 'New_Users');
            dataLanguageTable.addRows(LanguageBreakDownArray);
            $('.languageBreakdownTable_spinner').hide();
            var table = new google.visualization.Table(document.getElementById('languageBreakdownTable'));
            let LanguageBreakDownformatter = new google.visualization.ColorFormat();
            LanguageBreakDownformatter.addGradientRange(1,LanguageBreakDownArray && LanguageBreakDownArray[0][1] + 1, '#000', '#ffa800', '#93b136');
            LanguageBreakDownformatter.format(dataLanguageTable, 1); // Apply formatter to second column
            table.draw(dataLanguageTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.countryBreakdownTable_spinner').hide();
            var countryTable = new google.visualization.DataTable();
            countryTable.addColumn('string', 'Continent');
            countryTable.addColumn('number', 'Users');
            countryTable.addColumn('number', 'New_Users');
            countryTable.addRows(ContinentsArray);
            var tableCountryBreakdown = new google.visualization.Table(document.getElementById('countryBreakdownTable'));
            let CountryBreakdownformatter = new google.visualization.ColorFormat();
            CountryBreakdownformatter.addGradientRange(ContinentsArray[(ContinentsArray.length) - 1][1], ContinentsArray[0][1] + 1, '#000', '#ffa800', '#93b136');
            CountryBreakdownformatter.format(countryTable, 1); // Apply formatter to second column
            tableCountryBreakdown.draw(countryTable, { allowHtml: true, showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.deviceTable_spinner').hide();
            var devicesTable = new google.visualization.DataTable();
            devicesTable.addColumn('string', 'Devices');
            devicesTable.addColumn('number', 'Users');
            devicesTable.addColumn('number', 'New_Users');
            devicesTable.addRows(Devices2Array);
            var tableDevices = new google.visualization.Table(document.getElementById('deviceTable'));
            tableDevices.draw(devicesTable, { showRowNumber: true, width: '100%', height: '100%', pageSize: 10, page: 'enable' });
            $('.deviceChart_spinner').hide();
            var deviceChartWidth = $('#deviceChart').width();
            var dataDevicesUsers = google.visualization.arrayToDataTable([
              ['Devices', 'Users'], ...DevicesArray
            ]);
            var optionsDevicesPieChart = {
              legend: { position: 'bottom', alignment: 'center' },
              title: '',
              pieHole: 0.4,
              colors: ['#7cb342', '#f66d00', '#ffa800'],
              width: deviceChartWidth,
              chartArea: { left: 2, bottom: 40, height: 550, width: deviceChartWidth }
            };
            var chartPieDevices = new google.visualization.PieChart(document.getElementById('deviceChart'));
            chartPieDevices.draw(dataDevicesUsers, optionsDevicesPieChart);
            var usersCountchartwidth = $('.grid-item').width() / 1.5;
            var optionsSparkLine = {
              tooltip: { isHtml: true, textStyle: { fontSize: 11 } },
              lineWidth: 3,
              title: '',
              legend: { position: 'top', alignment: 'start' },
              hAxis: {
                format: 'MMM d',
                gridlines: { color: 'transparent' },
                baselineColor: 'none',
                textPosition: 'none'
              },
              vAxis: {
                gridlines: { color: 'transparent' },
                baselineColor: 'none',
                minValue: 0,
                format: 'short',
                textPosition: 'none'
              },
              series: {
                0: { color: '#ffa800' },

              },

              width: usersCountchartwidth,
              height: 40,
              chartArea: { width: usersCountchartwidth, right: 0, left: 0, top: 0, height: 100 }
            };
            var SPlineUsers = new google.visualization.DataTable();
            SPlineUsers.addColumn('date', 'Date');
            SPlineUsers.addColumn('number', 'Users');
            SPlineUsers.addRows(UsersData);
            var SLUser = new google.visualization.LineChart(document.getElementById('usersCountChart'));
            SLUser.draw(SPlineUsers, optionsSparkLine);
            $('.pageViews_spinner').hide();
            
            var SPlineNewUsers = new google.visualization.DataTable();
            SPlineNewUsers.addColumn('date', 'Date');
            SPlineNewUsers.addColumn('number', 'New_Users');
            SPlineNewUsers.addRows(NewUsersData);
            var SLNewUser = new google.visualization.LineChart(document.getElementById('newUsersCountChart'));
            SLNewUser.draw(SPlineNewUsers, optionsSparkLine);
            
            var SPlineSessionPerUser = new google.visualization.DataTable();
            SPlineSessionPerUser.addColumn('date', 'Date');
            SPlineSessionPerUser.addColumn('number', 'Sessions Per User');
            SPlineSessionPerUser.addRows(UserPerSessionArray);
            var SLSessionPerUser = new google.visualization.LineChart(document.getElementById('usersSessionsChart'));
            SLSessionPerUser.draw(SPlineSessionPerUser, optionsSparkLine);
            let LastObj = (UsersPerSession[UsersPerSession.length - 1])
            let LastSessionPerUser = LastObj.Number_of_Sessions_per_User
            $('.pageViews_spinner').hide();
          
            var SPlineSessionCount = new google.visualization.DataTable();
            SPlineSessionCount.addColumn('date', 'Date');
            SPlineSessionCount.addColumn('number', 'Sessions');
            SPlineSessionCount.addRows(SessionArray);
            var SLSessionCount = new google.visualization.LineChart(document.getElementById('sessionCountChart'));
            SLSessionCount.draw(SPlineSessionCount, optionsSparkLine);
            let LastSessionObj = (Sessions[Sessions.length - 1])
            // $("#sessionCount").html(Sessions.reduce((accumulator, object) => {
            // return accumulator + object['Sessions'];
            // }, 0))
            //     $("#pageViews").html(PageViews.reduce((accumulator, object) => {
            // return accumulator + object['Pageviews'];        
            // }, 0))session_count
            $('.pageViews_spinner').hide();
          
            $('.pageViews_spinner').hide();
             
            var SPlinePageViews = new google.visualization.DataTable();
            SPlinePageViews.addColumn('date', 'Date');
            SPlinePageViews.addColumn('number', 'Page Views');
            SPlinePageViews.addRows(PageViewsArray);
            var SLPageViews = new google.visualization.LineChart(document.getElementById('pageViewsChart'));
            SLPageViews.draw(SPlinePageViews, optionsSparkLine);
            let LastObjPPS = (pagesPerSession[pagesPerSession.length - 1])
            let LastpagesPerSession = LastObjPPS.Pages_per_Session
            $('.pageViews_spinner').hide();
          
            var SPlinepagePerSession = new google.visualization.DataTable();
            SPlinepagePerSession.addColumn('date', 'Date');
            SPlinepagePerSession.addColumn('number', 'Pages / Session');
            SPlinepagePerSession.addRows(PagePerSessionArray);
            var SLpagePerSession = new google.visualization.LineChart(document.getElementById('pagePerSessionChart'));
            SLpagePerSession.draw(SPlinepagePerSession, optionsSparkLine);
            // toHHMMSS(value.Avg_Session_Duration)]
            let LastObjAvgDuration = (AvgSessionDuration[AvgSessionDuration.length - 1])
            let LastAvgDuration = LastObjAvgDuration.Avg_Session_Duration
            $('.pageViews_spinner').hide();
          
            var SPlineAvgSessionDuration = new google.visualization.DataTable();
            SPlineAvgSessionDuration.addColumn('date', 'Date');
            SPlineAvgSessionDuration.addColumn('number', 'Avg. Session Duration');
            SPlineAvgSessionDuration.addRows(AvgSessionDurationArray);
            var SLAvgSessionDuration = new google.visualization.LineChart(document.getElementById('sessonDurationChart'));
            SLAvgSessionDuration.draw(SPlineAvgSessionDuration, optionsSparkLine);
        //  var bounce_sum = 0;
        //  $.each(BounceRate,function(i,val){
        //    bounce_sum+=val.Bounce_Rate
        //  })
        //  console.log(bounce_sum/100,'BounceRate')
        
       
            $('.pageViews_spinner').hide();
           
            var SPlineBounceRate = new google.visualization.DataTable();
            SPlineBounceRate.addColumn('date', 'Date');
            SPlineBounceRate.addColumn('number', 'Bounce Rate');
            SPlineBounceRate.addRows(BounceRateArray);
            var SLBounceRate = new google.visualization.LineChart(document.getElementById('bounceRateChart'));
            SLBounceRate.draw(SPlineBounceRate, optionsSparkLine);
          }
        }
        }
      
      })
   
  }
  )
