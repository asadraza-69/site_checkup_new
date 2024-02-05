//function of showing subscription details..
function memberShip(){
    $.ajax({
    method: 'GET',
    url: '/payment/view_subscription/',
    // beforeSend: function() {
    //     $('.tb_loader').show() 
    // },
    success: function (res) {
      //getting card data from API
      var tableData = res.data

      //console.log(tableData,"table")
      // setTimeout(() => {
      //   $('#displayTable').DataTable({
      //     dom: 'frtipB',
      //     pageLength: 3,
      //     "aaSorting": [],
      //     "bDestroy": true,
      //     responsive:true
      //   });
      // },);

      //loader hide when data came from backend
      $('.tb_loader').hide();

      //looping data to append membership card details
      $.each(tableData, function (key, value) {
        $(".membership-action-btn").html("")
  
// $(".membership-action-btn").append(`
// <label class="toggle1 mt-1">
//                                     <input type="checkbox" ${value.is_active?'checked':'unchecked'} id="switch3">
//                                     <span class="slider"></span>
//                                     <span class="labels" data-on=" Cancel" data-off="Renew"></span>
//                                   </label>
// `)
// value.plan_id_id = "Pro Plan"
// $(".membership-action-btn").append(`
// <button type="button" class="btn btn-secondary  " style="background-color: #707070; width: 150px;" id="switch3"  subscription_btn_id="1"> 
//   <span class="membership-action-loader"> 
//   <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
//   <span class="sr-only">Loading...</span>  </span>${value.plan_id_id === "Pro Plan" ? 'Cancel':'Renew'}</button>
//   `)

                //checking to show a button if plan is free or should renew subscription
                $(".membership-action-btn").append(`
                    ${value.plan_id_id !== "Free Plan"  ? `<a class="btn custom-subscription-btn"  href='' style="background-color: #707070; width: 120px; color: #fff;" id="switch3">Cancel</a>`: `<a class="btn custom-subscription-btn"  href='/subscription/renew_subscription/' style="background-color: #707070; width: 120px; color: #fff;" id="switch3">Renew</a>`}
                      `)
                // console.log("hjasdhjasd", value.plan_id_id )

                 //checking to showing a button if free plan is not active
                if(value.plan_id_id !== "Free Plan"){
   
                    $(".membership-action-btn").show()
                    }

        $("#links_detail").html("")

        //appending membership card details and also checking if subscription is active or inactive
        $("#links_detail").append(`
        <tr>
          <td>Billing Cycle</td>
          <td class="text-end ">
            <span class="badge custom-badge badge-secondary billing-cycle py-1 " style="border-radius: 4px ; ">${value.billing_cycle}</span> </td>
          </tr>

          <tr >
          <td >Starts At</td>
         
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.starts_at?moment(value.starts_at).format("DD/MM/YYYY"):"-"}</span> </td>
          </tr>

          <tr >
          <td>Ends At</td>
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.ends_at? moment(value.ends_at).format("DD/MM/YYYY"): '-'}</span></td>
          </tr>

          <tr >
          <td>Renewed At</td>
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.renewed_at?moment(value.renewed_at).format("DD/MM/YYYY"): '-'}</span></td>
          </tr>

          <tr >
          <td>Cancelled At</td>
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.cancelled_at?moment(value.cancelled_at).format("DD/MM/YYYY"):"-"}</span></td>
          </tr>

          <tr >
          <td>Created At</td>
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.created_at? moment(value.created_at).format("DD/MM/YYYY"): "-"}</span></td>
          </tr>

          <tr >
          <td>Expired At</td>
          <td class="text-end date-letter-spacing"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.expired_at?moment(value.expired_at).format("DD/MM/YYYY"): "-"}</span></td>
          </tr>

          <tr >
          <td>Plan</td>
          <td class="text-end"><span class="badge custom-badge badge-secondary py-1" style="border-radius: 4px ; ">${value.plan_id_id}</span></td>
          </tr>

          <tr >
          <td >Membership Status</td>
          <td class="text-end fw-bold active-color ">
            ${value.is_active ?
           ` <span class="badge  bg-primary custom-badge2 py-1" style="border-radius: 4px ; ">Active</span>`
            :
            `<span class="badge  bg-danger custom-badge2 py-1" style="border-radius: 4px ; ">In Active</span>`
           }</td>
          </tr>
                             
                                `);
                                // value.is_active ? $(".active-color").css("color", "green") : $(".active-color").css("color", "red") 
      })
    }

  })
  
  }


  //calling a function of membership
  memberShip();
  
  var switchStatus = false;

  // code of button click to check if user wants to cancel or renew membership
  $(document).on('click', "#switch3", function () {
    // $(".membership-action-loader").show()
    // if ($(this).is(':checked')) {
    //   switchStatus = $(this).is(':checked');
    //   // alert(switchStatus);// To verify
    // }
    // else {
    //   switchStatus = $(this).is(':checked');
    //   //  alert(switchStatus);// To verify
    // }

    //getting button whether its Cancel or Renew
    var subscription_btn_id =$.trim($(this).text())

    // console.log("sdfjksd", subscription_btn_id)

    //POST API of updating a subscription if user wants
    $.ajax({
      method: 'POST',
      url: '/payment/update_subscription/',
      data: {button : subscription_btn_id },
      success: function (res) {
        if (res.status) {
         //if user cancels, button changes to Renew
          $("#switch3").text("Renew")

           memberShip();
        }
      },
      error: function(res){
        //if gets an error, showing notif bar of error
        ShowNoty(res.statusText, 'error')
                   setTimeout(() => {
                    // $(".membership-action-loader").hide()
                   }, 2000);
                }
    })
  });
