

  // bottom graph function start
  var grf = setInterval(bottomGraph,1000)

    function bottomGraph() {
        var project_id =   $('.radio :selected').first().attr('data-id')
        var url= $("#url").text()
        if(project_id !== undefined && project_id !== ''){
            clearInterval(grf)
                        var todayDate = new Date();
        var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
        var startDate = minDate;
        var endDate = maxDate;
        var fromdate = moment(startDate).format("YYYY-MM-DD");
        var todate = moment(endDate).format("YYYY-MM-DD");

        var session_count = 0;
       
        var Bounce_Rate = 0;
       
        $.ajax({
            method: 'GET',
            url: '/site_audit/audience_overview_data/?project_id=' + project_id + '&fromdate=' + fromdate + '&todate=' + todate + '&continent=&deviceCategory=&channelGrouping=',
            success: function (res) {
                if(res && res.status === false)
                {
                    $(".main_webite_rank").hide()
                    $("#alternative_img").show()
                    $("#front-text-url").text(url)
                }
                else{
                    if (res.error) {
                        $('.traffic_loader').hide();
                      $('.social_loader').hide();  
                      $('.visitor_loader').hide(); 
                        $('#traffic_score_').append('add analytics');
                      $('#social_score_').append('add analytics');  
                      $('#visitor_score_').append('add analytics');   
  
                  } else {
                    
                    
                   
                      var table3 = res.table3
                      $.each(table3, function (i, val) {
                       
                          session_count = val.sessions;
                          Bounce_Rate = val.bounceRate;
                       
                        
                        
                         
                      });
                    
                    
                      $("#traffic_score_").html('')
                      $("#traffic_score_").html(session_count);
                      
                     
                      $("#visitor_score_").html('')
                      $("#visitor_score_").html((Bounce_Rate * 100).toFixed(2) + '%')
       $('.traffic_loader').hide();
       new Chart(document.getElementsByClassName('traffic'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
              datasets: [{
                  data: [100,(session_count)],
                  backgroundColor: [
                       'lightgrey',
                        '#eb4335'
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'dsd'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
          
      });
  $('.visitor_loader').hide();   
   new Chart(document.getElementsByClassName('visitor'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
           
              datasets: [{
                                data: [100,(Bounce_Rate * 100)],
  
                  backgroundColor: [
                       'lightgrey',
                     '#eb4335'
  
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'gfhg'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
         
      });
      $('.social_loader').hide();  
       
   new Chart(document.getElementsByClassName('social'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
           
              datasets: [{
                                data: [100,0],
  
                  backgroundColor: [
                       'lightgrey',
                     '#eb4335'
  
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'gfhg'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
         
      });
  
                  }
                }
            }

        })
        }
   

    }
    bottomGraph();
    // bottom graph function end

    $(document).on('change','.radio',function(){
        var project_id = $('.url').attr('data-id')
     var todayDate = new Date();
        var maxDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        var minDate = new Date(new Date().setDate(new Date().getDate() - 30))
        var startDate = minDate;
        var endDate = maxDate;
        var fromdate = moment(startDate).format("YYYY-MM-DD");
        var todate = moment(endDate).format("YYYY-MM-DD");

        var session_count = 0;
       
        var Bounce_Rate = 0;
        var url = $(this).val();
        $.ajax({
            method: 'GET',
            url: '/site_audit/audience_overview_data/?project_id=' + project_id + '&fromdate=' + fromdate + '&todate=' + todate + '&continent=&deviceCategory=&channelGrouping=',
            success: function (res) {
                if(res && res.status === false)
                {
                    $(".main_webite_rank").hide()
                    $("#alternative_img").show()
                    $("#front-text-url").text(url)
                }
                else{
                    if (res.error) {
                        $('.traffic_loader').hide();
                      $('.social_loader').hide();  
                      $('.visitor_loader').hide(); 
                        $('#traffic_score_').append('add analytics');
                      $('#social_score_').append('add analytics');  
                      $('#visitor_score_').append('add analytics');   
  
                  } else {
                    
                    
                   
                      var table3 = res.table3
                      $.each(table3, function (i, val) {
                       
                          session_count = val.sessions;
                          Bounce_Rate = val.bounceRate;
                       
                        
                        
                         
                      });
                    
                    
                      $("#traffic_score_").html('')
                      $("#traffic_score_").html(session_count);
                      
                     
                      $("#visitor_score_").html('')
                      $("#visitor_score_").html((Bounce_Rate * 100).toFixed(2) + '%')
       $('.traffic_loader').hide();
       new Chart(document.getElementsByClassName('traffic'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
              datasets: [{
                  data: [100,(session_count)],
                  backgroundColor: [
                       'lightgrey',
                        '#eb4335'
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'dsd'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
          
      });
  $('.visitor_loader').hide();   
   new Chart(document.getElementsByClassName('visitor'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
           
              datasets: [{
                                data: [100,(Bounce_Rate * 100)],
  
                  backgroundColor: [
                       'lightgrey',
                     '#eb4335'
  
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'gfhg'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
         
      });
      $('.social_loader').hide();  
       
   new Chart(document.getElementsByClassName('social'), {
          type: 'doughnut',
          animation: {
              animateScale: true
          },
          data: {
           
              datasets: [{
                                data: [100,0],
  
                  backgroundColor: [
                       'lightgrey',
                     '#eb4335'
  
                  ]
              }]
          },
          options: {
              cutoutPercentage: 70,
              elements: {
                  center: {
                      text: 'gfhg'
                  }
              },
              responsive: true,
              legend: false,
   tooltips: {
         enabled: false
    },
          },
         
      });
  
                  }
                }


            }

        })
      
   

    
    })