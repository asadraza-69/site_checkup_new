var selectedWebsiteId;
$( document ).ready(function() {
    // check if the referrer URL is not from the specified page
    if(!(document.referrer).includes('/site_audit/competitors_step2/') || (document.referrer) != ''){
        setTimeout(() => {
            //selecting website name 
            selectedWebsiteId =  $(".radio :selected").first().attr('data-id');
          }, "2000");
    }

});
// $('#competitorAnalysis').submit(function(event) {
//     event.preventDefault();
//     selectedWebsiteId =  $(".radio :selected").first().attr('data-id');
//     $("#project_id").val(selectedWebsiteId)
//     var dataString = $("#competitorAnalysis").serialize();
//     $.ajax({
//         url: '/site_audit/add_competitor/',
//         method: 'POST',
//         data: dataString,
//         success: function(response) {
//             if (response.status) {
//                 window.location.replace("/site_audit/competitors_step2/");

//             } else {
//                   if(response.limits_error) {
//                     $("#upgradeSub").modal('show')
//                     $("#sidebarMenu").css("z-index",'10000')
//                     $('#main-navbar').css("z-index",'99999')
//                     $('main').css('opacity', '0.07')
//                     $("#responseError").html(response.limits_error).show();
                  
//                   }else{
                   
//                 $("#responseError").html(response.error).show();
            
//                   }
//             }
           
//         },
//         error: function(response) {
//            ShowNoty(response.limits_error, "error")
//         },
//     });
// })

//onChange method and check if the referrer URL is not from the specified page
$(document).on('change','.radio', function () {
        if(!(document.referrer).includes('/site_audit/competitors_step2/') || (document.referrer) != ''){
            setTimeout(() => {
                selectedWebsiteId =  $(".radio :selected").first().attr('data-id');
              }, "2000");
        }
    
    });
    // submit competitor website to the input and then redirect..
    $('#competitorAnalysis').submit(function(event) {
        event.preventDefault();
        selectedWebsiteId =  $(".radio :selected").first().attr('data-id');
        $("#project_id").val(selectedWebsiteId)
        var dataString = $("#competitorAnalysis").serialize();
        $.ajax({
            url: '/site_audit/add_competitor/',
            method: 'POST',
            data: dataString,
            success: function(response) {
                if (response.status) {
                    window.location.replace("/site_audit/competitors_step2/");
                } else {
                    if(response.limits_error) {
                          $("#upgradeSub").modal('show')
                            $("#sidebarMenu").css("z-index",'10000')
                            $('#main-navbar').css("z-index",'99999')
                            $('main').css('opacity', '0.07')
                    } else {
                   ShowNoty(response.error, "error")
                    }
                    
                }
               
            },
            error: function(response) {
                ShowNoty(response.error, "error")
            },
        });
   
})