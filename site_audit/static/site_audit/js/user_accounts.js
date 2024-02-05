var ga4_prop_array = [];
var getAccData = setInterval(getAccountData,1000);
function getAccountData(){
var project_id = $('.radio :selected').first().attr('data-id');
if(project_id !== undefined && project_id !== ''){
  clearInterval(getAccData);
  $.ajax({
  method: "GET",
  url: "/site_audit/get_account_list_data?project_id="+project_id,
  success: function (res) {
    console.log("BEFORE IF ", res)
    console.log(res.hasOwnProperty("UA"))
    if(!res.hasOwnProperty("error")){
        console.log("INSIDE IF ")

   
    $('#UA_spinner').hide()
  window.onload = function () {

   
  const storedValue = 'UA';
  const $sel = $("#accounts").on("change", function() {
  console.log('Change triggered, value =', this.value)
});

$sel.val(storedValue).change()
};

var keys = Object.keys(res);
    $.each(keys, function (i, val) {
      $("#accounts").append(`<option value="${val}">${val}</option>`);
    });
    $("#accounts").on("change", function () {
      $("#ga4_prop").html("");
      $("#ga4").html("");

      var selected_acc = $("#accounts").val();
      if (selected_acc == "GA4") {
        $("#acc_row_ua").hide();
        $("#acc_row_ga4").show();

        var obj = res[selected_acc];
        Object.entries(obj).map(function ([key, value]) {
          console.log("response",  key, value)
          ga4_prop_array.push(value);
          $("#ga4").append(
            ` <li class="list-group-item " account-name="${value.account_name}" account="${value.account}">${value.account_name}</li>`
          );
        });
        $("#ga4_prop").append(`
                                        
                                        <a href="#" class="list-group-item list-group-item-action flex-column lign-items-center cls" >
                                                <div class="d-flex w-100 justify-content-center">
                                                
                                                <span class="lign-items-center"><i class="fa fa-arrow-left text-info"></i> Please select an account from accounts</span>
                                                </div>
                                            
                                                <small class=""></small>
                                            </a>
                                        `);
        $(document).on("click", "#ga4 .list-group-item", function () {
          var arr = [];
          var acc = $(this).attr("account");
          ga4_prop_array.forEach(function (element, index) {
            if (element.account == acc) {
              arr.push(element.properties);
            }
          });

          $.each(arr, function (i, val) {
            $("#ga4_prop").html("");
            if (val.length > 0) {
              console.log("vvv", val)
              $.each(val, function (i, val) {
                $("#ga4_prop").append(`
                                        
                                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" property="${val.property}" prop-name="${val.property_name}" >
                                                <div class="d-flex w-100 justify-content-between">
                                                
                                                <h6 class="">${val.property_name}</h6>
                                                </div>
                                            
                                                <small class="">${val.property}</small>
                                            </a>
                                        `);
              });
            } else {
              $("#ga4_prop").append(` 
                                 <a href="#" class="list-group-item list-group-item-action flex-column lign-items-center cls">
                                                <div class="d-flex w-100 justify-content-center">
                                                
                                                <b class="">No Date Found</b>
                                                </div>
                                            </a>`);
            }
          });
        });
      } else {
        $("#acc_row_ga4").hide();
        $("#acc_row_ua").show();
        $("#ua_acc").html("");
        var obj = res[selected_acc];
        Object.entries(obj).map(function ([key, value]) {
          ga4_prop_array.push(value);
          $("#ua_acc").append(
            ` <li class="list-group-item " account-name="${value.account_name}" account="${value.account}">${value.account_name}</li>`
          );
        });
        $("#ua_prop").html("");
        $("#ua_prop").append(`
                        
                        <a href="#" class="list-group-item list-group-item-action flex-column lign-items-center cls">
                                <div class="d-flex w-100 justify-content-center">
                                
                                <span class=""><i class="fa fa-arrow-left text-info"></i> Please select an account from accounts</span>

                                </div>
                            
                               
                            </a>
                        `);
        $("#ua_profile").html("");
        $("#ua_profile").append(`
                        
                        <a href="#" class="list-group-item list-group-item-action flex-column lign-items-center cls">
                                <div class="d-flex w-100 justify-content-center">
                                
                                <span class=""><i class="fa fa-arrow-left text-info"></i> Please select an property from properties</span>
                               
                                </div>
                            
                               
                            </a>
                        `);
        var arr = [];
        $(document).on("click", "#ua_acc .list-group-item", function () {
          var acc = $(this).attr("account");
          ga4_prop_array.forEach(function (element, index) {
            if (element.account == acc) {
              arr.push(element.properties);
            }
          });

          $.each(arr, function (i, val) {
            $("#ua_prop").html("");

            if (val.length > 0) {
              $.each(val, function (i, val) {
                $("#ua_prop").append(`
                        
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" property="${val.property}" prop-name="${val.property_name}">
                                <div class="d-flex w-100 justify-content-between">
                                
                                <h6 class="">${val.property_name}</h6>
                                </div>
                            
                                <small class="">${val.property}</small>
                            </a>
                        `);
                //  $('#ua_profile').append(`

                // <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" profile-name="${val.profile_name}" profile="${val.profile}">
                //         <div class="d-flex w-100 justify-content-between">

                //         <b class="">${val.profile_name}</b>
                //         </div>

                //         <small class="">${val.profile}</small>
                //     </a>
                // `);
              });
            } else {
              $("#ua_prop").append(`
                        
                        <a href="#" class="list-group-item list-group-item-action flex-column lign-items-center cls">
                                <div class="d-flex w-100 justify-content-center">
                                
                                <b class="">No Data Found</b>
                                </div>
                            
                               
                            </a>
                        `);
              //  $('#ua_profile').append(`

              // <a href="#" class="list-group-item list-group-item-action flex-column align-items-center cls">
              //         <div class="d-flex w-100 justify-content-center">

              //         <b class="">No Data Found</b>
              //         </div>

              //     </a>
              // `);
            }
          });
        });
        // prop click
        $(document).on("click", "#ua_prop .list-group-item", function () {
          var prop = $(this).attr("property");
          var prop_arr = [];
          arr.forEach(function (element, index) {
            prop_arr.push(element);
          });
          $.each(prop_arr, function (i, val) {
            $("#ua_profile").html("");
            $.each(val, function (i, val) {
              if (val.property == prop) {
                $("#ua_profile").append(`
                        
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" profile-name="${val.profile_name}" profile="${val.profile}">
                                <div class="d-flex w-100 justify-content-between">
                                
                                <h6 class="">${val.profile_name}</h6>
                                </div>
                            
                                <small class="">${val.profile}</small>
                            </a>
                        `);
                return false;
              }
            });
          });
        });
      }
    });
     }else{
      ShowNoty(res.error,'error')
     }
  },
});

}
}

$(".account_list").on("click", "li", function () {
  $(".account_list li.active").removeClass("active");
  $(this).addClass("active");
});
$(".prop_list").on("click", "a", function () {
  $(".prop_list a.active").removeClass("active");
  $(this).addClass("active");
});
$(".profile_list").on("click", "a", function () {
  $(".profile_list a.active").removeClass("active");
  $(this).addClass("active");
});

$(document).on("click", ".post_acc_ga4", function () {
  var account_name = $(".account_list li.active").attr("account-name");
  var account_number = $(".account_list li.active").attr("account");
  var property = $(".prop_list a.active").attr("property");
  var property_name = $(".prop_list a.active").attr("prop-name");
  var project_id = $('.radio :selected').first().attr("data-id")
  var account_data = {
    GA4: [
      {
        account: account_number,
        account_name: account_name,
        properties: [
          {
            property: property,
            property_name: property_name,
          },
        ],
      },
    ],
  };

  $.ajax({
    method:'POST',
    url:'/site_audit/add_account_data/',
   data: {account_data: JSON.stringify(account_data), project_id: project_id},
    success:function(response){
        if(response.status){
               ShowNoty("Your account saved successfully", "success");
               setTimeout(()=>{
                     window.location.href = '/site_audit/dashboard/';
               },1000)
            
        }else{
             ShowNoty("Somthing went wrong", "error");
        }
          
        
    }
 })
});
$(document).on("click", ".post_ua", function () {
  var account_name = $(".account_list li.active").attr("account-name");
  var account_number = $(".account_list li.active").attr("account");
  var property = $(".prop_list a.active").attr("property");
  var property_name = $(".prop_list a.active").attr("property");
  var profile = $(".profile_list a.active").attr("profile");
  var profile_name = $(".profile_list a.active").attr("profile-name");
  var project_id =$('.radio :selected').first().attr("data-id")
  var account_data = {
    UA: [
      {

        account: account_number,
        account_name: account_name,
        properties: [
          {
            property: property,
            property_name: property_name,
            profile: profile,
            profile_name: profile_name,
          },
        ],
      },
    ],
  };
  

 $.ajax({
    method:'POST',
    url:'/site_audit/add_account_data/',
    data: {account_data: JSON.stringify(account_data), project_id: project_id},
    success:function(response){
    
          if(response.status){
               ShowNoty("Your account saved successfully", "success");
  
             setTimeout(()=>{
                     window.location.href = '/site_audit/dashboard/';
               },1000)
        }else{
             ShowNoty("Somthing went wrong", "error");
        }
    }
 })
});
