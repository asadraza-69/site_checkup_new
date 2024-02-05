$(document).ready(function(){

//
setTimeout(()=>{
 var  selectedWebsiteId = $(".url").first().attr("data-id");
   var selectedURL = $(".selectedWebsite").first().text();
var domain_authority = '';
 $.ajax({
      method: "GET",
      url: "/site_audit/get_backlinks/?website_url="+$(".url").first().text()+"&project_id="+selectedWebsiteId,
      success: function (response) {
        if (response.status) {
         if (
            response["results"][0]["target"]["domain_authority"] !==
              undefined &&
            response["results"][0]["target"]["domain_authority"] !== ""
          ) {
            // console.log(response['results'][0]['source']['domain_authority'],'test');
             domain_authority =
              response["results"][0]["target"]["domain_authority"];
          }

        }
        
        }
        
        
        })
// 
setTimeout(()=>{
 getData();
},100)
 function getData(){

 var  selectedWebsiteId = $(".url").first().attr("data-id");

 $.ajax({
  method:'GET',
  url:'/site_audit/get_objectives/?project_id='+selectedWebsiteId,
  success:function(response){

   if(response.status){
    
 $('.loader').html('')
     var obj_count = 0;

     var objectives = response.objectives;
     $.each(objectives,function(i,val){
      obj_count++;
      var description_objective = val.objective_desc;
     
      description_objective = description_objective.replace('{{ domainAuthority }}',domain_authority)
     

      if(val.i_objective_type__name !== undefined && val.i_objective_type__name === 'Pro Growth'){
         if(val.objective_name !== undefined && val.objective_name === 'google_business'){
          
            $('#google_business_obj').html('')
             $('#google_business_obj').append(`
             <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2">
                      <div class="dFlex">
                        <div class="icon success">
                          <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-10">
                      <div class="content_">
                        <div class="label">
                        
                        <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}">                        ${description_objective}</a>
</a>
                        </div>
                        <div class="item-list">
                         
                          <div class="item_">
                            <div class="label">Duration</div>
                            <div class="value_">${val.duration}</div>
                          </div>
                          <div class="item_">
                            <div class="label">Level</div>
                            <div class="value_">${val.level}</div>
                          </div>
                          <div class="item_ two-column">
                            <div class="label two-line">${val.completion_score}% complete</div>
                            <div class="new ng-star-inserted">new</div>
                          </div>
                          <div class="item_">
                          </div>
                        </div>
                        <div class="footer1">
                          <div class="voting float-start">
                            <div class="question ng-star-inserted">Thank you for your feedback!</div>
                             <img  src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                                  class="thumbs-up ng-star-inserted"><img 
                                  src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                                  class="thumbs-down ng-star-inserted">
                          </div>
                          <div class="actions float-end">
                           <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             `);
             $('#google_business_dashboard').html('');
             $('#google_business_dashboard').append(`
               <div class="card card_list">
              <div class="row g-0">
                <div class="col-md-2 arrow-icon">
                  <div class="arrow-bg">
                    <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="card-body">
                     <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

                  </div>
                </div>
              </div>
            </div>

             `);
             

         }
         // 
         if(val.objective_name !== undefined && val.objective_name === "moz_domain_authority"){
              $('#moz_domain_authority').html('')
                $('#moz_domain_authority').append(`<div class="card mt-4">
  <div class="card-body">
    <div class="row">
      <div class="col-md-2">
        <div class="dFlex">
          <div class="icon success">
            <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="content_">
          <div class="label">
                                 <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>


          </div>
          <div class="item-list">
           
            <div class="item_">
              <div class="label">Duration</div>
              <div class="value_">${val.duration}</div>
            </div>
            <div class="item_">
              <div class="label">Level</div>
              <div class="value_">${val.level}</div>
            </div>
            <div class="item_ two-column">
              <div class="label two-line">${val.completion_score}% complete</div>
              <div class="new ng-star-inserted">new</div>
            </div>
            <div class="item_">
            </div>
          </div>
          <div class="footer1">
            <div class="voting float-start">
              <div class="question ng-star-inserted">Thank you for your feedback!</div>
               <img  src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                    class="thumbs-up ng-star-inserted"><img 
                    src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                    class="thumbs-down ng-star-inserted"> 
            </div>
            <div class="actions float-end">
              <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
// dashboard
   $('#moz_domain_authority_dashboard').html('')
   $('#moz_domain_authority_dashboard').append(`
   <div class="card card_list">
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
                                <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

      </div>
    </div>
  </div>
</div>

   `)

         }
         // 
         if(val.objective_name !== undefined && val.objective_name === "organic_traffic"){
            $('#organic_traffic').html('')
               $('#organic_traffic').append(`<div class="card mt-4">
  <div class="card-body">
    <div class="row">
      <div class="col-md-2">
        <div class="dFlex">
          <div class="icon success">
            <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="content_">
          <div class="label">
                                  <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>


          </div>
          <div class="item-list">
            <div class="item_">
              <div class="label">Duration</div>
              <div class="value_">${val.duration}</div>
            </div>
            <div class="item_">
              <div class="label">Level</div>
              <div class="value_">${val.level}</div>
            </div>
            <div class="item_ two-column">
              <div class="label two-line">${val.completion_score}% complete</div>
              <div class="new ng-star-inserted">new</div>
            </div>
            <div class="item_">
            </div>
          </div>
          <div class="footer1">
            <div class="voting float-start">
              <div class="question ng-star-inserted">Was this objective helpful?</div>
              <img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-up ng-star-inserted" /><img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-down ng-star-inserted" />
            </div>
            <div class="actions float-end">
             <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</div>
`);
// dashboard
  $('#organic_traffic_dashboard').html('')
  $('#organic_traffic_dashboard').append(`
  <div class="card card_list">
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
                               <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>
      
      </div>
    </div>
  </div>
</div>

  `)

         }
         // 
         if(val.objective_name !== undefined && val.objective_name === "backlinks"){
           $('#back_links').html('')
              $('#back_links').append(`<div class="card mt-4">
  <div class="card-body">
    <div class="row">
      <div class="col-md-2">
        <div class="dFlex">
          <div class="icon success">
            <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="content_">
          <div class="label">
                                 <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

          </div>
          <div class="item-list">
            <div class="item_">
              <div class="label">Duration</div>
              <div class="value_">${val.duration}</div>
            </div>
            <div class="item_">
              <div class="label">Level</div>
              <div class="value_">${val.level}</div>
            </div>
            <div class="item_ two-column">
              <div class="label two-line">${val.completion_score}% complete</div>
              <div class="new ng-star-inserted">new</div>
            </div>
            <div class="item_">
            </div>
          </div>
          <div class="footer1">
            <div class="voting float-start">
              <div class="question ng-star-inserted">Was this objective helpful?</div>
              <img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-up ng-star-inserted" /><img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-down ng-star-inserted" />
            </div>
            <div class="actions float-end">
                                       <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</div>
`);
// dashboard
 $('#back_links_dashboard').html('');
 $('#back_links_dashboard').append(`
 <div class="card card_list missing_backlinks_">
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
          <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>
      </div>
    </div>
  </div>
</div>

 `);

          
         }
//           if(val.objective_name !== undefined && val.objective_name === "nice_work"){
//               $('#nice_work').html('');
//               $('#nice_work').append(`<div class="card mt-4">
//   <div class="card-body">
//     <div class="row">
//       <div class="col-md-2">
//         <div class="dFlex">
//           <div class="icon success">
//             <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
//           </div>
//         </div>
//       </div>
//       <div class="col-md-10">
//         <div class="content_">
//           <div class="label">
//            <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

//           </div>
//           <div class="item-list">
//             <div class="item_">
//               <div class="label">Duration</div>
//               <div class="value_">${val.duration}</div>
//             </div>
//             <div class="item_">
//               <div class="label">Level</div>
//               <div class="value_">${val.level}</div>
//             </div>
//             <div class="item_ two-column">
//               <div class="label two-line">${val.completion_score}% complete</div>
//               <div class="new ng-star-inserted">new</div>
//             </div>
//             <div class="item_">
//             </div>
//           </div>
//           <div class="footer1">
//             <div class="voting float-start">
//               <div class="question ng-star-inserted">Was this objective helpful?</div>
//               <img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-up ng-star-inserted" /><img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-down ng-star-inserted" />
//             </div>
//             <div class="actions float-end">
//              <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
  
//   </div>
// </div>
// `)
//          }
         // 
          if(val.objective_name !== undefined && val.objective_name === "website"){
              $('#website').html('')
              $('#website').append(`<div class="card mt-4">
  <div class="card-body">
    <div class="row">
      <div class="col-md-2">
        <div class="dFlex">
          <div class="icon success">
            <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="content_">
          <div class="label">
                                  <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

          </div>
          <div class="item-list">
            <div class="item_">
              <div class="label">Duration</div>
              <div class="value_">${val.duration}</div>
            </div>
            <div class="item_">
              <div class="label">Level</div>
              <div class="value_">${val.level}</div>
            </div>
            <div class="item_ two-column">
              <div class="label two-line">${val.completion_score}% complete</div>
              <div class="new ng-star-inserted">new</div>
            </div>
            <div class="item_">
            </div>
          </div>
          <div class="footer1">
            <div class="voting float-start">
              <div class="question ng-star-inserted">Was this objective helpful?</div>
              <img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-up ng-star-inserted" /><img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-down ng-star-inserted" />
            </div>
            <div class="actions float-end">
              <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</div>
`)
         }
      
      }else if(val.i_objective_type__name !== undefined && val.i_objective_type__name === 'Social Media'){
       if(val.objective_name !== undefined && val.objective_name === 'facebook_analytics'){
           $('#social_objectives').html('')
           $('#social_objectives').append(`
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <div class="dFlex">
              <div class="icon success">
                <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <div class="content_">
              <div class="label">
                                      <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

              </div>
              <div class="item-list">
               
                <div class="item_">
                  <div class="label">Duration</div>
                  <div class="value_">${val.duration}</div>
                </div>
                <div class="item_">
                  <div class="label">Level</div>
                  <div class="value_">${val.level}</div>
                </div>
                <div class="item_ two-column">
                  <div class="label two-line">${val.completion_score}% complete</div>
                  <div class="new ng-star-inserted">new</div>
                </div>
                <div class="item_">
                 
                </div>
              </div>
              <div class="footer1">
                <div class="voting float-start">
                  <div class="question ng-star-inserted">Was this objective helpful?</div>
                  <img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-up ng-star-inserted" /><img src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon" class="thumbs-down ng-star-inserted" />
                 
                </div>
                <div class="actions float-end">
                 <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   

`);
// dashboard
  $('#social_objectives_dashboard').html('');
  $('#social_objectives_dashboard').append(`
  <div class="card card_list">
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
          <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>
      </div>
    </div>
  </div>
</div>

  `);

       }
      
      }else if(val.i_objective_type__name !== undefined && val.i_objective_type__name === 'Traffic'){
       if(val.objective_name !== undefined && val.objective_name === 'competitors'){

     
        $('#traffic_objectives').html('');
        $('#traffic_objectives').append(`
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <div class="dFlex">
              <div class="icon success">
                <img src="../../static/site_audit/assets/img/target-icons.png" alt="target 1 icon" />
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <div class="content_">
              <div class="label">
                                      <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>

              </div>
              <div class="item-list">
               
                <div class="item_">
                  <div class="label">Duration</div>
                  <div class="value_">${val.duration}</div>
                </div>
                <div class="item_">
                  <div class="label">Level</div>
                  <div class="value_">${val.level}</div>
                </div>
                <div class="item_ two-column">
                  <div class="label two-line">${val.completion_score}% complete</div>
                  <div class="new ng-star-inserted">new</div>
                </div>
                <div class="item_">
                 
                </div>
              </div>
              <div class="footer1">
                <div class="voting float-start">
                  <div class="question ng-star-inserted">Thank you for your feedback!</div>
                   <img  src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                    class="thumbs-up ng-star-inserted"><img 
                    src="../../static/site_audit/assets/uil_thumbs-up.svg" alt="Thumbs up icon"
                    class="thumbs-down ng-star-inserted"> 
                </div>
                <div class="actions float-end">
                  <button class="skip ng-star-inserted data-status" data-status="skip" data-id="${val.id}">Skip</button><a  href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class=" begin data-status  ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}" tabIndex={0}>${val.objective_status.toUpperCase()}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
`);
 $('#traffic_objectives_dashboard').html('');
 $('#traffic_objectives_dashboard').append(`
   <div class="card card_list">
  <div class="row g-0">
    <div class="col-md-2 arrow-icon">
      <div class="arrow-bg">
        <img src="../../static/site_audit/assets/target-icons.png" class="img-fluid rounded-start" alt="..." />
      </div>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <a href="javascript:void()" data-link="/site_audit/objective/?objective_id=${val.id}" class="card-title data-status ng-star-inserted" data-status="${val.objective_status}" data-id="${val.id}"> ${description_objective}</a>
      </div>
    </div>
  </div>
</div>

 
 `);


      }
        }
     });
   
     $('.objective_counter').html(obj_count)
   }else{
    console.log(response.error)
   }
  }
 });
  }
 // post objectives
 $(document).on('click','.data-status ',function(){
  var href =  $(this).attr('data-link');

  var objective_status = $(this).attr('data-status');
  var objective_id = $(this).attr('data-id');
  var data = {
  objective_status:objective_status,
  objective_id:objective_id,
  project_id:selectedWebsiteId
  }
  
  $.ajax({
   method:'POST',
   url:'/site_audit/update_objective_status/',
   data:data,
   success:function(response){
   if(response.status){
   
    getData();
     window.location.href = href

   }else{
    console.log(response.error)
   }
   }
  })
 });
 
 },1000)
})