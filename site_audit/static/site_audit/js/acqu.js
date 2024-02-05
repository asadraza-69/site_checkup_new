
   
   
 function kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }

  function jsonChange1(){
var chartsObj = {
 doughnut_arry : [{"Default_Channel_Grouping":"Direct","Users":47792},{"Default_Channel_Grouping":"Paid_Search","Users":5551},{"Default_Channel_Grouping":"Display","Users":1514},{"Default_Channel_Grouping":"Affiliates","Users":139},{"Default_Channel_Grouping":"(Other)","Users":4}],
     user_new_users : [{"Date":"9-Aug-22","Users":2899,"New_Users":2077},{"Date":"10-Aug-22","Users":2820,"New_Users":1992},{"Date":"11-Aug-22","Users":2489,"New_Users":1781},{"Date":"12-Aug-22","Users":2245,"New_Users":1577},{"Date":"13-Aug-22","Users":1331,"New_Users":1140},{"Date":"14-Aug-22","Users":1441,"New_Users":1192},{"Date":"15-Aug-22","Users":2524,"New_Users":1794},{"Date":"16-Aug-22","Users":2455,"New_Users":1813},{"Date":"17-Aug-22","Users":2506,"New_Users":1838},{"Date":"18-Aug-22","Users":2776,"New_Users":2001},{"Date":"19-Aug-22","Users":2120,"New_Users":1548},{"Date":"20-Aug-22","Users":1254,"New_Users":1032},{"Date":"21-Aug-22","Users":1485,"New_Users":1190},{"Date":"22-Aug-22","Users":2529,"New_Users":1854},{"Date":"23-Aug-22","Users":2779,"New_Users":2006},{"Date":"24-Aug-22","Users":2570,"New_Users":1936},{"Date":"25-Aug-22","Users":2704,"New_Users":1983},{"Date":"26-Aug-22","Users":2455,"New_Users":1785},{"Date":"27-Aug-22","Users":1345,"New_Users":1074},{"Date":"28-Aug-22","Users":1396,"New_Users":1130},{"Date":"29-Aug-22","Users":2386,"New_Users":1727},{"Date":"30-Aug-22","Users":2409,"New_Users":1754},{"Date":"31-Aug-22","Users":2582,"New_Users":1954},{"Date":"1-Sep-22","Users":2313,"New_Users":1698},{"Date":"2-Sep-22","Users":1975,"New_Users":1450},{"Date":"3-Sep-22","Users":1248,"New_Users":1066},{"Date":"4-Sep-22","Users":1274,"New_Users":1076},{"Date":"5-Sep-22","Users":1823,"New_Users":1500},{"Date":"6-Sep-22","Users":2635,"New_Users":1957},{"Date":"7-Sep-22","Users":2588,"New_Users":1951}],
     conversion : [{"Date":"9-Aug-22","Goal_Conversion_Rate":0.278484943},{"Date":"10-Aug-22","Goal_Conversion_Rate":0.307276772},{"Date":"11-Aug-22","Goal_Conversion_Rate":0.246757925},{"Date":"12-Aug-22","Goal_Conversion_Rate":0.347613219},{"Date":"13-Aug-22","Goal_Conversion_Rate":0.162310867},{"Date":"14-Aug-22","Goal_Conversion_Rate":0.170870113},{"Date":"15-Aug-22","Goal_Conversion_Rate":0.252840909},{"Date":"16-Aug-22","Goal_Conversion_Rate":0.257007645},{"Date":"17-Aug-22","Goal_Conversion_Rate":0.253646389},{"Date":"18-Aug-22","Goal_Conversion_Rate":0.249262053},{"Date":"19-Aug-22","Goal_Conversion_Rate":0.290336313},{"Date":"20-Aug-22","Goal_Conversion_Rate":0.192223037},{"Date":"21-Aug-22","Goal_Conversion_Rate":0.195799876},{"Date":"22-Aug-22","Goal_Conversion_Rate":0.246657284},{"Date":"23-Aug-22","Goal_Conversion_Rate":0.265228426},{"Date":"24-Aug-22","Goal_Conversion_Rate":0.264131193},{"Date":"25-Aug-22","Goal_Conversion_Rate":0.255037991},{"Date":"26-Aug-22","Goal_Conversion_Rate":0.281295488},{"Date":"27-Aug-22","Goal_Conversion_Rate":0.180640763},{"Date":"28-Aug-22","Goal_Conversion_Rate":0.214519294},{"Date":"29-Aug-22","Goal_Conversion_Rate":0.266086298},{"Date":"30-Aug-22","Goal_Conversion_Rate":0.238934734},{"Date":"31-Aug-22","Goal_Conversion_Rate":0.227995758},{"Date":"1-Sep-22","Goal_Conversion_Rate":0.254863813},{"Date":"2-Sep-22","Goal_Conversion_Rate":0.277956742},{"Date":"3-Sep-22","Goal_Conversion_Rate":0.203414996},{"Date":"4-Sep-22","Goal_Conversion_Rate":0.148550725},{"Date":"5-Sep-22","Goal_Conversion_Rate":0.154550076},{"Date":"6-Sep-22","Goal_Conversion_Rate":0.235758408},{"Date":"7-Sep-22","Goal_Conversion_Rate":0.226554268}]
}

 doughnut_arry = chartsObj.doughnut_arry;
 user_new_users= chartsObj.user_new_users;
 conversion = chartsObj.conversion
}
function jsonChange2(){
    var chartsObj_obj = {
 doughnut_arry : [{"Default_Channel_Grouping":"Direct","Users":492},{"Default_Channel_Grouping":"Paid_Search","Users":51},{"Default_Channel_Grouping":"Display","Users":1914},{"Default_Channel_Grouping":"Affiliates","Users":1939},{"Default_Channel_Grouping":"(Other)","Users":4}],
     user_new_users : [{"Date":"8-Aug-22","Users":2899,"New_Users":2077},{"Date":"10-Aug-22","Users":2820,"New_Users":192},{"Date":"11-Aug-22","Users":289,"New_Users":1781},{"Date":"12-Aug-22","Users":2245,"New_Users":1977},{"Date":"13-Aug-22","Users":1331,"New_Users":1740},{"Date":"14-Aug-22","Users":1441,"New_Users":1192},{"Date":"15-Aug-22","Users":2524,"New_Users":1794},{"Date":"16-Aug-22","Users":2455,"New_Users":1813},{"Date":"17-Aug-22","Users":2506,"New_Users":1838},{"Date":"18-Aug-22","Users":2776,"New_Users":2001},{"Date":"19-Aug-22","Users":2120,"New_Users":1548},{"Date":"20-Aug-22","Users":1254,"New_Users":1032},{"Date":"21-Aug-22","Users":1485,"New_Users":1190},{"Date":"22-Aug-22","Users":2529,"New_Users":1854},{"Date":"23-Aug-22","Users":2779,"New_Users":2006},{"Date":"24-Aug-22","Users":2570,"New_Users":1936},{"Date":"25-Aug-22","Users":2704,"New_Users":1983},{"Date":"26-Aug-22","Users":2455,"New_Users":1785},{"Date":"27-Aug-22","Users":1345,"New_Users":1074},{"Date":"28-Aug-22","Users":1396,"New_Users":1130},{"Date":"29-Aug-22","Users":2386,"New_Users":1727},{"Date":"30-Aug-22","Users":2409,"New_Users":1754},{"Date":"31-Aug-22","Users":2582,"New_Users":1954},{"Date":"1-Sep-22","Users":2313,"New_Users":1698},{"Date":"2-Sep-22","Users":1975,"New_Users":1450},{"Date":"3-Sep-22","Users":1248,"New_Users":1066},{"Date":"4-Sep-22","Users":1274,"New_Users":1076},{"Date":"5-Sep-22","Users":1823,"New_Users":1500},{"Date":"6-Sep-22","Users":2635,"New_Users":1957},{"Date":"7-Sep-22","Users":2588,"New_Users":1951}],
     conversion : [{"Date":"01-Aug-22","Goal_Conversion_Rate":1000000.278484943},{"Date":"10-Aug-22","Goal_Conversion_Rate":2.307276772},{"Date":"11-Aug-22","Goal_Conversion_Rate":0.246757925},{"Date":"12-Aug-22","Goal_Conversion_Rate":4.347613219},{"Date":"13-Aug-22","Goal_Conversion_Rate":0.162310867},{"Date":"14-Aug-22","Goal_Conversion_Rate":0.170870113},{"Date":"15-Aug-22","Goal_Conversion_Rate":0.252840909},{"Date":"16-Aug-22","Goal_Conversion_Rate":0.257007645},{"Date":"17-Aug-22","Goal_Conversion_Rate":0.253646389},{"Date":"18-Aug-22","Goal_Conversion_Rate":0.249262053},{"Date":"19-Aug-22","Goal_Conversion_Rate":0.290336313},{"Date":"20-Aug-22","Goal_Conversion_Rate":0.192223037},{"Date":"21-Aug-22","Goal_Conversion_Rate":0.195799876},{"Date":"22-Aug-22","Goal_Conversion_Rate":0.246657284},{"Date":"23-Aug-22","Goal_Conversion_Rate":0.265228426},{"Date":"24-Aug-22","Goal_Conversion_Rate":0.264131193},{"Date":"25-Aug-22","Goal_Conversion_Rate":0.255037991},{"Date":"26-Aug-22","Goal_Conversion_Rate":0.281295488},{"Date":"27-Aug-22","Goal_Conversion_Rate":0.180640763},{"Date":"28-Aug-22","Goal_Conversion_Rate":0.214519294},{"Date":"29-Aug-22","Goal_Conversion_Rate":0.266086298},{"Date":"30-Aug-22","Goal_Conversion_Rate":0.238934734},{"Date":"31-Aug-22","Goal_Conversion_Rate":0.227995758},{"Date":"1-Sep-22","Goal_Conversion_Rate":0.254863813},{"Date":"2-Sep-22","Goal_Conversion_Rate":0.277956742},{"Date":"3-Sep-22","Goal_Conversion_Rate":0.203414996},{"Date":"4-Sep-22","Goal_Conversion_Rate":0.148550725},{"Date":"5-Sep-22","Goal_Conversion_Rate":0.154550076},{"Date":"6-Sep-22","Goal_Conversion_Rate":0.235758408},{"Date":"7-Sep-22","Goal_Conversion_Rate":0.226554268}]
}

  doughnut_arry = chartsObj_obj.doughnut_arry;
   user_new_users= chartsObj_obj.user_new_users;
     conversion = chartsObj_obj.conversion
}









   // conversion
    function Conversion(){
         // conversion
 
    var labelsArray = [];
    var datasetArray = [];
 
    $.each(conversion,function(i,val){
      labelsArray.push(val.Date);
      datasetArray.push(val.Goal_Conversion_Rate)
    });
   
   
    $('.conver_spinner').hide();
 
  
    
    }
// charts vars start
    function AcquisitionChannel(){
    var labelsd_array = [];
    var dataD_array = new Array();
    
   $.each(doughnut_arry,function(i,val){
  labelsd_array.push(val.Default_Channel_Grouping);
  dataD_array.push([val['Default_Channel_Grouping'],val['Users']])
   });
   // pie chart

   $('.donutChart_spinner').hide();
  
   var chartwidth = $('#donutchart').width();
   var chartheight = $('#donutchart').closest('.box').height();
   var daraPieArray = [['Default_Channel_Grouping','Users'],...dataD_array]
  google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(
      daraPieArray
        );

        var options = {
          title: 'Top Acquisition Channels',
          pieHole: 0.5,
          legend:{
          position:'right',
          alignment: 'center',
          fullWidth: true,
          reverse: false,
          labeledValueText:true,
          labels: {
                    usePointStyle: true,
                     boxWidth: 3,
                     fontSize: 12,
                     fontStyle: "bold",
                     fontColor: "#666",
          },
          },
          width:chartwidth,
          chartArea : {width:chartwidth,right:10,left:10,top:20,bottom:0,height:chartheight},
              colors : [
        'rgb(0, 182, 203)',
        'rgb(3, 169, 244)',
        'rgb(94, 53, 177)',
        'rgb(255, 168, 0)',
        'rgb(124, 179, 66)',

    ]
        };
if($("#donutchart").length >  0){
  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
     
      }
    };
    // new users
    function NewUsers(){
         
    //   new users


var labels_array = [];
var data_set_user = [];
var data_set_new_user = [];

$.each(user_new_users,function(i,val){
    labels_array.push(val.Date);
    data_set_user.push(val.Users)
    data_set_new_user.push(val.New_Users)

})
$('.myChart_spinner').hide();

    };
 

jsonChange1();
// json call on checkbox change
 var fn = 'jsonChange1';
$(document).on('change','input[name="dropdown-group"]',function(){
 
   if(fn == 'jsonChange1'){
    jsonChange2();
    fn = 'jsonChange2'
   }else{
jsonChange1();
fn = 'jsonChange1';
   }
 


AcquisitionChannel();
NewUsers();
Conversion();
})    
AcquisitionChannel();
NewUsers();
Conversion();
// table start
function drawTable(){
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
      table_dataArray.push([value['Source / Medium'], Number(value['Sessions']), Number(value['Users']), Number(value['New Users']), Number(value['Bounce Rate']), Number(value['Pages / Session']), Number(value['Avg Session Duration']), Number(value['Goal Conversion Rate']), Number(value['Goal Completions']), Number(value['Goal Value'])])
      SessionsArray.push(Number(value['Sessions']))
      UsersArray.push(Number(value['Users']))
      NewUsersArray.push(Number(value['New Users']))
      BounceRateArray.push(Number(value['Bounce Rate']))
      PagesSessionArray.push(Number(value['Pages / Session']))
      AvgSessionDurationArray.push(Number(value['Avg Session Duration']))
      GoalConversionRateArray.push(Number(value['Goal Conversion Rate']))
      GoalCompletions.push(Number(value['Goal Completions']))
      GoalValueArray.push(Number(value['Goal Value']))
    })
 

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

    var elementsData = {
      Sessions: kFormatter(SessionsArray.reduce((a, b) => a + b, 0)),
      Users: kFormatter(UsersArray.reduce((a, b) => a + b, 0)),
      NewUsers: kFormatter(NewUsersArray.reduce((a, b) => a + b, 0)),
      BounceRate: kFormatter((BounceRateArray.reduce((a, b) => a + b, 0)) / BounceRateArray.length).toFixed(1) + '%',
      Pages_Session: kFormatter((PagesSessionArray.reduce((a, b) => a + b, 0)) / PagesSessionArray.length).toFixed(1),
      AvgSessionDuration: toHHMMSS(AvgSessionDurationArray.reduce((a, b) => a + b, 0)),
      GoalConversionRate: ((GoalConversionRateArray.reduce((a, b) => a + b, 0)) / GoalConversionRateArray.length).toFixed(1) + '%',
      GoalCompletions: kFormatter(GoalCompletions.reduce((a, b) => a + b, 0).toFixed(1)),
      Goal_Value: kFormatter(GoalValueArray.reduce((a, b) => a + b, 0)),


    }
  //  topcards start
   $('.wrapper').empty();
   $('.wrapper').append(`
 <div><span>Users</span><strong>${elementsData.Sessions}</strong></div>
            <div><span>Sessions</span><strong>${elementsData.Users}</strong></div>
            <div><span>Bounce Rate</span><strong>${elementsData.BounceRate}</strong></div>
            <div><span>Goal Completion</span><strong>${elementsData.GoalCompletions}</strong></div>
            <div><span>Avg. Time on page</span><strong>${elementsData.AvgSessionDuration}</strong></div>
`)
  // topcards end
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);
    function drawTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Source');
      data.addColumn('number', 'Sessions');
      data.addColumn('number', 'Users');
      data.addColumn('number', 'New Users');
      data.addColumn('number', 'Bounce Rate');
      data.addColumn('number', 'Pages / Session');
      data.addColumn('number', 'Avg. Session Duration');
      data.addColumn('number', 'Goal Conversion');
      data.addColumn('number', 'Goal Completion');
      data.addColumn('number', 'Goal Value');

      data.addRows([
        ...table_dataArray
      ]);

  $('.table_spinner').hide();
if($("#table_div").length > 0){


      var table = new google.visualization.Table(document.getElementById('table_div'));
      let dataformatter1 = new google.visualization.ColorFormat();
      dataformatter1.addGradientRange(Number(Math.min(...SessionsArray)), Number(Math.max(...SessionsArray)) + 1, '#000', '#f6f0ec', '#f66d00');
      dataformatter1.format(data, 1);
      let dataformatter2 = new google.visualization.ColorFormat();
      dataformatter2.addGradientRange(Number(Math.min(...UsersArray)), Number(Math.max(...UsersArray)) + 1, '#000', '#f6f0ec', '#f66d00');
      dataformatter2.format(data, 2);
      let dataformatter3 = new google.visualization.ColorFormat();
      dataformatter3.addGradientRange(Number(Math.min(...NewUsersArray)), Number(Math.max(...NewUsersArray)) + 1, '#000', '#f6f0ec', '#f66d00');
      dataformatter3.format(data, 3);
      let dataformatter4 = new google.visualization.ColorFormat();
      dataformatter4.addGradientRange(Number(Math.min(...BounceRateArray)), Number(Math.max(...BounceRateArray)) + .1, '#000', '#f6f0ec', '#f66d00');
      dataformatter4.format(data, 4);
      let dataformatter5 = new google.visualization.ColorFormat();
      dataformatter5.addGradientRange(Number(Math.min(...PagesSessionArray)), Number(Math.max(...PagesSessionArray)) + .1, '#000', '#f6f0ec', '#f66d00');
      dataformatter5.format(data, 5);
      let dataformatter6 = new google.visualization.ColorFormat();
      dataformatter6.addGradientRange(Number(Math.min(...AvgSessionDurationArray)), Number(Math.max(...AvgSessionDurationArray)) + .1, '#000', '#f6f0ec', '#f66d00');
      dataformatter6.format(data, 6);
      let dataformatter7 = new google.visualization.ColorFormat();
      dataformatter7.addGradientRange(Number(Math.min(...GoalConversionRateArray)), Number(Math.max(...GoalConversionRateArray)) + .1, '#000', '#f6f0ec', '#f66d00');
      dataformatter7.format(data, 7);
      let dataformatter8 = new google.visualization.ColorFormat();
      dataformatter8.addGradientRange(Number(Math.min(...GoalCompletions)), Number(Math.max(...GoalCompletions)) + 1, '#000', '#f6f0ec', '#f66d00');
      dataformatter8.format(data, 8);
      let dataformatter9 = new google.visualization.ColorFormat();
      dataformatter9.addGradientRange(Number(Math.min(...GoalValueArray)), Number(Math.max(...GoalValueArray)) + 1, '#000', '#f6f0ec', '#f66d00');
      dataformatter9.format(data, 9);
      // Apply formatter to second column
      table.draw(data, { allowHtml: true, width: '100%', height: '100%' });
       
      $("#table_div table").prepend("<thead id='topThead'><tr><th></th><th colspan='3'>&nbsp;&nbsp;Acquisition</th><th colspan='3'>Behavior</th><th colspan='3'>Conversions</th></tr>"
        + "<tr><th></th><th>Sessions</th><th>Users</th><th>New Users</th><th>Bounce Rate</th><th>Pages / Session</th><th>Avg. Session Duration</th><th>Goal Conversion Rate</th><th>Goal Completions</th><th>Goal Value</th></tr>"
        + "<tr><td></td><td id='sessionTotal'>" + elementsData.Sessions + "</td><td id='usersTotal'>" + elementsData.Users + "</td><td id='newUsersTotal'>" + elementsData.NewUsers + "</td><td id='bounceRateTotal'>" + elementsData.BounceRate + "</td><td id='PagesSessionsTotal'>" + elementsData.Pages_Session + "</td><td id='AvgSessionDurationTotal'>" + elementsData.AvgSessionDuration + "</td><td id='GoalConversionRateTotal'>" + elementsData.GoalConversionRate + "</td><td id='GoalCompletionsTotal'>" + elementsData.GoalCompletions + "</td><td id='GoalValueTotal'>" + elementsData.Goal_Value + "</td></tr>"
        + "<thead>")
    }

  }
    // last table end
}
    // last table start
 
// drawTable();

    
// table end
// charts var end



// charts

    $('#basic-addon1').on('click', function () {
  $('.range_label').html('');
 
        $('input[name="daterange"]').focus();
       

    });



 



  





