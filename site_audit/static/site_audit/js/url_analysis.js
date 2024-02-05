   $(document).ready(function(){
     $('.health-score').hide()
    setTimeout(()=>{
  var yellow_class = $(".box.yellow .percent svg circle:nth-child(2)");
  var red_class = $(".box.red .percent svg circle:nth-child(2)");
  var green_class = $(".box.green .percent svg circle:nth-child(2)");
  var red_lower_range = 0;
  var red_upper_range = 49;
  var yellow_lower_range = 50;
  var yellow_upper_range = 89;
  var green_lower_range = 90;
  var green_upper_range = 100;
    $('.health_spinner').removeClass('d-none')
       var url = $("#url").text()
         var comp = new RegExp($("#url").text());
       $('.searchBtn').on('click',function(){
        $("#input_response").html('')
          var in_url = $('.urlInput').val()
          if(comp.test(in_url)){
          
        }
        else{
           $("#input_response").html(`Please enter correct domain i.e ${url}`).addClass('text-danger')
        }
      

       });
         $(document).on('input change','.urlInput',function(){
        
            var website_url  = $(this).val();
     $("#input_response").html("")
    var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;

    if(pattern.test(website_url)){
       $('.searchBtn').prop('disabled',false);
     
    }else{
      
    $('.searchBtn').prop('disabled',true)
     $("#input_response").html('Please enter correct url i.e https://example.com').addClass('text-danger')
    }
        })

       $.ajax({
          method:'GET',
          url: "/site_audit/get_site_live_data/?url=" + url,
         
          success:function(response){
           console.log(response,'res')
               if(response.status){
                   $('.health_spinner').addClass('d-none')
                  $('.health-score').show()

 

        var destop_response = response.response_desktop.all_data;
        if (
          destop_response.lighthouseResult != undefined &&
          destop_response != ""
        ) {
          var desktop_main_response =
            destop_response.lighthouseResult.categories;
          if (
            desktop_main_response != undefined &&
            desktop_main_response != ""
          ) {
            var destop_web_performance_score =
              desktop_main_response["performance"]["score"];
            var destop_web_performance = Math.ceil(
              destop_web_performance_score * 100
            );
            if (
              destop_web_performance != "" &&
              destop_web_performance != undefined
            ) {
              $("#desktop_web_result").prepend(`${destop_web_performance}`);
              if (
                destop_web_performance >= yellow_lower_range &&
                destop_web_performance <= yellow_upper_range
              ) {
                $(".desktop .box").addClass("yellow");
                $('.desktop .status-btn').addClass("bg-yellow");
                $('.desktop .status-btn').text("Average");
                $('.desktop_Health_circle').circleProgress({
                  value: destop_web_performance/100,
                  size: 130,
                  fill:"#ffc107"
                });
                // $(yellow_class).css(
                //   "stroke-dashoffset",
                //   `calc(440 - (440 * ${destop_web_performance}) / 100)`
                // );
              } else if (
                destop_web_performance >= red_lower_range &&
                destop_web_performance <= red_upper_range
              ) {
                $(".desktop .box").addClass("red");
                $('.desktop .status-btn').addClass("bg-red");
                $('.desktop .status-btn').text("Poor");
                $(red_class).css(
                  "stroke-dashoffset",
                  `calc(440 - (440 * ${destop_web_performance}) / 100)`
                );
              } else if (
                destop_web_performance >= green_lower_range &&
                destop_web_performance <= green_upper_range
              ) {
                $(".desktop .box").addClass("green");
                $('.desktop .status-btn').addClass("bg-green");
                $('.desktop .status-btn').text("Good");
                $(green_class).css(
                  "stroke-dashoffset",
                  `calc(440 - (440 * ${destop_web_performance}) / 100)`
                );
              }
            }
          }
        }

        var mobile_response = response.response_mobile.all_data;
        if (
          mobile_response != undefined &&
          mobile_response != ""
        ) {
          var mobile_main_response =  mobile_response.lighthouseResult.categories;
          if (
            mobile_main_response.performance != undefined &&
            mobile_main_response != ""
          ) {
            var mobile_web_performance_score =
              mobile_main_response['performance']['score'];
            
            var mobile_web_performance = Math.ceil(
              mobile_web_performance_score * 100
            );
           
            // mobile chart
            if (
              mobile_web_performance != "" &&
              mobile_web_performance != undefined
            ) {
              $("#mobile_web_result").html(`${mobile_web_performance} %`);
              if (
                mobile_web_performance >= yellow_lower_range &&
                mobile_web_performance <= yellow_upper_range
              ) {
                $(".mobile_chart .box").addClass("yellow");
                $('.mobile_chart .status-btn').addClass("bg-yellow");
                $('.mobile_chart .status-btn').text("Average");
                // $('.mobile_Health_circle').circleProgress({
                //   value: mobile_web_performance/100,
                //   size: 130,
                //   fill:"#ffc107"
                // });
                
                // $(yellow_class).css(
                //   "stroke-dashoffset",
                //   `calc(440 - (440 * ${mobile_web_performance}) / 100)`
                // );
                
              } else if (
                mobile_web_performance >= red_lower_range &&
                mobile_web_performance <= red_upper_range
              ) {
                $(".mobile_chart .box").addClass("red");
                $('.mobile_chart .status-btn').addClass("bg-red");
                $('.mobile_chart .status-btn').text("Poor");
                $('.mobile_Health_circle').circleProgress({
                  value: mobile_web_performance/100,
                  size: 130,
                  fill:"#eb4335"
                });
                // $(red_class).css(
                //   "stroke-dashoffset",
                //   `calc(440 - (440 * ${mobile_web_performance}) / 100)`
                // );
              
              } else if (
                mobile_web_performance >= green_lower_range &&
                mobile_web_performance <= green_upper_range
              ) {
                $(".mobile_chart .box").addClass("green");
                $('.mobile_chart .status-btn').addClass("bg-green");
                $('.mobile_chart .status-btn').text("Good");
                $(green_class).css(
                  "stroke-dashoffset",
                  `calc(440 - (440 * ${mobile_web_performance}) / 100)`
                );
              }
            }
          }
        }
               }
               else{
                  $("#input_response").html(`${response.error}`).addClass('text-danger').removeClass('text-success');
                  
               }

          }
         })
   
   

 
  // $('.searchBtn').prop('disabled',true)
  // $('.urlInput').on('change input type',function(){
  //    website_url  = $(this).val();
  //    $("#input_response").html("")
  //   var pattern =  'https://searchberg.com';

  //   if(pattern.test(website_url)){
  //      $('.searchBtn').prop('disabled',false);
     
  //   }else{
      
  //   $('.searchBtn').prop('disabled',true)
  //    $("#input_response").html('Please enter correct url i.e https://example.com').addClass('text-danger')
  //   }

  // });
    // $('.searchBtn').on('click',function(e){
    //   $('.health_spinner').removeClass('d-none')
    //  $('.health-score').hide();
    // e.preventDefault();
    //    if(website_url != "" && website_url != undefined){
      
    //    }else{
    //      $("#input_response").html("url is undefined")
    //    }
      
    //    });

    // images type start
    
    $.ajax({
    type: "GET",
    //    url: "/site_audit/get_site_data/?project_id=1",
    url: "/crawler/images_type/?website_url=" + url,
    dataType: "json", // expect html to be returned
    success: function (response) {
    if (response.status == true) {
        console.log(response.data, '  response1' )
        const png_count = response.data.png;
        const gif_count = response.data.gif;
        const jpeg_count = response.data.jpeg;
        const other_count = response.data.other;
        const svg_count = response.data.svg;
        const webp_count = response.data.webp;
          $('.png_count').html('');
          $('.gif_count').html('');
          $('.jpeg_count').html('');
          $('.other_count').html('');
          $('.svg_count').html('');
          $('.webp_count').html('');
      

        $('.png_count').html(png_count)
        $('.gif_count').html(gif_count)
        $('.jpeg_count').html(jpeg_count)
        $('.other_count').html(other_count)
        $('.svg_count').html(svg_count)
        $('.webp_count').html(webp_count)

//     let sum = 0;
// for (const value of Object.values(response.data)) {
//   sum += value;
// }

//    $("#imgCount").text(sum)

  }
}
});

    // images type end
        },1000) //set timeout end
       // backlinks api start
       var selectedWebsiteId;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$( document ).ready(function() {

  


    setTimeout(() => {
        selectedWebsiteId = $(".url").first().attr('data-id');
        ////console.log(selectedWebsiteId, ' selectedWebsiteId');
      
         Get_Backlinks();
      }, "2000")
    
 

});

var selectedURL;


function Get_Backlinks() {



     selectedURL = $(".selectedWebsite").first().text();

    
     selectedURL = selectedURL.replace('https://','').replace('http://','').replace(/\/$/, "")
    console.log(selectedURL, ' selectedURL')
    selectedWebsiteId = $(".url").first().attr('data-id');
    $.ajax({
        type: "GET",
        url: "/site_audit/get_backlinks/?website_url="+$(".url").first().text()+"&project_id="+selectedWebsiteId,
        success: function(response) {
         // console.log(response.results,'backlinks')
         const pages = response.results;
     
         let sum_ex_links  = 0;
        pages.forEach(function (arrayItem) {
        sum_ex_links+=arrayItem.source.external_pages_to_page
   
        });
        $('.externalLinks_count').html('');
        $('.externalLinks_count').html(sum_ex_links)

        let sum_in_links  = 0;
        pages.forEach(function (arrayItem) {
        sum_in_links+=arrayItem.source.pages_from_page
   
        });
        $('.internalLinks_count').html('');
        $('.internalLinks_count').html(sum_in_links)
         // $.each(ex_pages,function(i,val){
         //    // console.log(val,'val')
         //    $.each(val,function(index,val){
         //     console.log(index['source'],'source')
         //    })
         // })
          $('.loaderBacklinks').html('')
            if (response.status == true) {
                let json = response.results;
                let AnchorTextjson = response.anchor_text.results;
                $('#backLinksTable tbody').empty();
                $('#anchorTextTable tbody').empty();
                console.log(json);
                var BacklinksCount = 0;
                var AnchortextCount = 0;
                var SpammyBacklinksCount = 0;
                json.forEach(function(item) {
                    let SourceObject = item.source;
                    let TargetObject = item.target;
                    BacklinksCount++;
                    $('#backLinksTable tbody').append("<tr><td><a href='//"+SourceObject.page+"' class='sourceLink' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>"+SourceObject.page+"</span></a></td><td class='text-end'>"+SourceObject.domain_authority+"</td><td>"+
               
                    "href</td><td><span class='anchorText' title='"+item.anchor_text+"'>"+
                    (item.anchor_text == ''?'Empty anchor text':item.anchor_text)+"</span></td><td><a href='//"+TargetObject.page+"' class='targetLink' title='"+TargetObject.page+"' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>"+moment(item.date_first_seen).format("MMM DD, YYYY")+"</td><td>"+moment(item.date_last_seen).format("MMM DD, YYYY")+"</td></tr>");
                    });
                    AnchorTextjson.forEach(function(item) {
                      AnchortextCount++;
                      $('#anchorTextTable tbody').append("<tr><td><span class='d-inline-block text-primary'>"+(item.anchor_text == ''?'Empty anchor text':item.anchor_text)+"</span></td><td class='text-end'>"+numberWithCommas(item['external_pages'])+"</td><td class='text-end'>"+numberWithCommas(item['external_root_domains'])+"</td></tr>");
                      });
             var totalreferDomain = response["results"][0]["target"]["root_domains_to_root_domain"];
             var prevtotalreferDomain;
             if( response["previous_results"] != ""){
              prevtotalreferDomain = response["previous_results"][0]["target"]["root_domains_to_root_domain"];
         
             }else{
              prevtotalreferDomain = totalreferDomain;
         
             }
              if(totalreferDomain > prevtotalreferDomain){
              $(".referringDomains.changeIcon").html('<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>');
              $(".referringDomains.changeDesc").html('<span class="text-success">'+(totalreferDomain-prevtotalreferDomain)+'</span> more than previous month')
           }else if(totalreferDomain < prevtotalreferDomain){
            $(".referringDomains.changeIcon").html('<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>')
            $(".referringDomains.changeDesc").html('<span class="text-danger">'+(totalreferDomain-prevtotalreferDomain)+'</span> less than previous month')
         
          }else{
          $(".referringDomains.changeIcon").html('')
          $(".referringDomains.changeDesc").html('no change than previous month')
         
         }
           
             
             $('#referringDomains').html('')
             $('#referringDomains').html(numberWithCommas(totalreferDomain))
//external_pages_to_root_domain = Total Number of Backlinks
             var totalBackLinks = response["results"][0]["target"]["external_pages_to_root_domain"];
             var prevtotalBackLinks;
             if(response["previous_results"] != ""){
              prevtotalBackLinks = response["previous_results"][0]["target"]["external_pages_to_root_domain"];
             }else{
              prevtotalBackLinks  = totalBackLinks;
             }
           
              $('#totalNumberOfBacklinks').html('')
           $('#totalNumberOfBacklinks').html(numberWithCommas(totalBackLinks));

           if(totalBackLinks > prevtotalBackLinks){
            $(".totalBackLinks.changeIcon").html('<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>');
            $(".totalBackLinks.changeDesc").html('<span class="text-success">'+(totalBackLinks-prevtotalBackLinks)+'</span> more than previous month')
         }else if(totalBackLinks < prevtotalBackLinks){
          $(".totalBackLinks.changeIcon").html('<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>')
          $(".totalBackLinks.changeDesc").html('<span class="text-danger">'+(totalBackLinks-prevtotalBackLinks)+'</span> less than previous month')
       
        }else{
        $(".totalBackLinks.changeIcon").html('')
        $(".totalBackLinks.changeDesc").html('no change than previous month')
       
       }


      
            } else {

            }

             $(".backlinksCount").text(BacklinksCount);
             $(".anchorTextCount").text(AnchortextCount);
             $(".spammyBacklinksCount").text(SpammyBacklinksCount);
            $(document).trigger('function_a_complete'); 
           





         
        },
        error: function(response) {
           

        }
    });

 



}

// $(document).bind('function_a_complete', initializeDatatables);

// function initializeDatatables() {

     
// $('#backLinksTable').DataTable({
//     dom: 'frtipB',
//     pageLength: 10,
//     "aaSorting": [],
//     buttons: [         
//     {
//           extend: "csvHtml5",
//           className: "btn btn-sm  btn-light",             
//           text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
//           titleAttr: "CSV",
//           title: 'Backlinks'
//         //   exportOptions: {
//         //     columns: headerDictExport,
//         //   },  
//         }       
//     ]
// });

// $('#anchorTextTable').DataTable({
//     dom: 'frtipB',
//     pageLength: 10,
//     "aaSorting": [],
//     buttons: [         
//     {
//           extend: "csvHtml5",
//           className: "btn btn-sm  btn-light",          
//           text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
//           titleAttr: "CSV",
//           title: 'Anchor Text'
//         //   exportOptions: {
//         //     columns: headerDictExport,
//         //   },  
//         }       
//     ]
// });

//  $('#spammyBacklinksTable').DataTable({
//     dom: 'frtipB',
//     pageLength: 10,
//     "aaSorting": [],
//     buttons: [         
//     {
//           extend: "csvHtml5",
//           className: "btn btn-sm  btn-light",              
//           text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
//           titleAttr: "CSV",
//           title: 'Spammy Backlinks'
//         //   exportOptions: {
//         //     columns: headerDictExport,
//         //   },  
//         }       
//     ],
//     oLanguage: {
//         "sEmptyTable": '<div class="py-5 d-flex"><img src="../../static/site_audit/assets/spammy-backlinks-result.svg" alt="designer-image" decoding="async" class="tool-information__image"></img>'+"<div><h4><span>Nice! We didn't find any spammy backlinks pointing to "+selectedURL+'</span></h4> <p>We are actively monitoring this and will notify you if we detect any suspicious backlinks in the future.</p></div></div>'
//     }

// });


// $(".table.list_viewTable").css('table-layout','fixed')

// $( ".customExportBtn" ).click(function() {
//     $( ".tab-content>.active .dt-button.buttons-csv" ).trigger('click');
//   });
// }


$(".chooseTabsData").click(function() {

    $("#chooseData").modal('show'); 




   let tabsName = $(".nav-tabs .nav-link.active").data('id');

   if(tabsName == 'Backlinks'){
$(".BacklinksColumns").show().addClass('active');
$(".AnchorTextColumns").hide().removeClass('active');
$(".SpammyBacklinksColumns").hide().removeClass('active');
   }else if(tabsName == 'Anchor Text'){
    $(".BacklinksColumns").hide().removeClass('active');
    $(".AnchorTextColumns").show().addClass('active');
    $(".SpammyBacklinksColumns").hide().removeClass('active');
}else if(tabsName == 'Spammy Backlinks'){
    $(".BacklinksColumns").hide().removeClass('active');
    $(".AnchorTextColumns").hide().removeClass('active');
    $(".SpammyBacklinksColumns").show().addClass('active');
}




$("#columnFunctionActiveTab").click(function() {
   
    var checkboxesUnchecked = $("#chooseColumnsTabs").find('.active').find(".form-check-input:not(:checked)")
    var checkboxesChecked = $("#chooseColumnsTabs").find('.active').find(".form-check-input:is(:checked)")

// Get the column API object

for (let element of checkboxesChecked) {
  
    let item = ($(element).attr('data-column'))
  
    let headers = ($('.tab-content>.active .dataTable').DataTable().columns().header().map(d => d.textContent.trim().replace(/^\s+|\s+$/g, '')).toArray())
      var columnNo = (headers.indexOf(item))
      //  console.log('.tab-content>.active .dataTable').column(columnNo)
    var column = $('.tab-content>.active .dataTable').DataTable().column(columnNo);
  //   console.log(headers, ' headers',item)

  // Toggle the visibility
    column.visible(true);
   
    $("#chooseData").find(".btn-close").trigger('click');
  
  }
for (let element of checkboxesUnchecked) {
  
  let item = ($(element).attr('data-column'))

  let headers = ($('.tab-content>.active .dataTable').DataTable().columns().header().map(d => d.textContent.trim().replace(/^\s+|\s+$/g, '')).toArray())
    var columnNo = (headers.indexOf(item))
    //  console.log('.tab-content>.active .dataTable').column(columnNo)
  var column = $('.tab-content>.active .dataTable').DataTable().column(columnNo);
//   console.log(headers, ' headers',item)
// Toggle the visibility
  column.visible(false);
 
  $("#chooseData").find(".btn-close").trigger('click');
 
}


// Toggle the visibility

});



});








$(document).on("click",".link-website-authority",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'WebsiteAuthority');
  
});
$(document).on("click",".link-traffic",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'Traffic');
  
});

$(document).on("click",".link-total-keywords",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'TotalNumberofKeywords');
  
});


$(document).on("click",".link-total-backlinks",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'TotalNumberofBacklinks');
  
});


$(document).on("click",".link-Referring-domains",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'ReferringDomains');
  
});


$(document).on("click",".link-followNofollow",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'FollowNoFollow');
  
});

$(document).on("click",".link-Link-Type",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'LinkType');
  
});
$(document).on("click",".link-Anchor-Text",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'AnchorText');
  
});

$(document).on("click",".link-Total-Number-of-Backlinks",function() {
  
  $('#dictionary').modal('show');
  openTab('', 'TotalNumberofBacklinks');
  
});


       // backlinks api end
});
