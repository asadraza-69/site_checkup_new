
//toggle up and down arrow by clicking icon
$(document).on("click", ".sorting-icon", function () {
  $(this).find("small").find("i").toggleClass("fa-chevron-down fa-chevron-up");
});
$("#displayTable").DataTable().destroy();

//by clicking any td, scroll to table 
$(document).on("click", ".clickable", function (event) {
  // document.querySelector("#displayTable").scrollIntoView({
  //   behavior: "smooth",
  // });
  event.preventDefault(); // prevent default action of the link
  $('html, body').animate({
    scrollTop: $("#displayTable").offset().top
  }, 0);
  $("#links_detail").html("");

  //keyword-stuffing code
  var keyStuffing = $.trim($(this).text());
  if (keyStuffing !== "Pages with keyword stuffing") {
    $(".links_detail_loader").hide();
    if (!$.fn.DataTable.isDataTable()) {
      $("#displayTable").DataTable().destroy();
    }
    setTimeout(() => {
      //initialize DataTable
      $("#displayTable").DataTable({
        dom: "frtipB",
        pageLength: 2,
        aaSorting: [],
        bDestroy: true,
      });
    });

  } else if (keyStuffing === "Pages with keyword stuffing") {
    $("#displayTable").DataTable().destroy();
  }
});
// content page ajax with live dta start
// content function start

function contentFnc2(url) {
  $.ajax({
    type: "GET",
    url: "/crawler/content/?website_url=" + url,
    success: function (response) {
      if (response.status === true) {
        // in process alert end
        var match_word = "";
        var keywordCounts = "";
        var sentence = " ";
        var selected_icon = "";
        var myObject = response.data;

        // in process alert start
        // if status true and crawel request in proces false
        var check = $(".tabs li.active").find("span").first().text();
        const error_count = Object.values(Object.values(myObject))
          .map((val) => Object.values(val).filter((val) => val.Founded > 0))
          .map((val) =>
            val.map((val) => val.Founded).reduce((a, b) => a + b, 0)
          );
        // table row on click accordian in table
        $(document).on("click", ".acordion_row", function () {
          $(".keyword_click").removeClass("bg-red");
          $(".keyword").remove();
          selected_icon = $(this).find("i").attr("id");
          $(this).parent().next().slideToggle(0);
          if ($(this).parent().prev().is(":visible")) {
            $(this).parent().prev().hide();
          }
          $(".key-empty").remove();
        });
        //  keyword functionality start
        $(document).on("click", ".keyword_click", function () {
          $(".key-empty").remove();
          $(".keyword").remove();
          $(".keyword_click").removeClass("bg-red");
          $(this).addClass("bg-red");
          var row = "";
          row = $(this).parent().parent();
          var id = $(this).attr("id");
          setTimeout(() => {
            $(`  <tr class="key-empty" >   <td colspan="3"> <div class="tb_loader1 text-center"   >
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div> </td> </tr>
     `).insertAfter(row);
          }, 100);
          setTimeout(() => {
            $(".key-empty").remove();
          }, 500);
          keyword = $(this).children(":first").text();
          var newObject = Object.fromEntries(
            Object.entries(myObject).filter(([key]) => key === check)
          );
          Object.entries(newObject).map(function ([key, value]) {
            $.each(value, function (i, value) {
              if (value.name === match_word) {
                var table = value.table;
                var detail = value.detail;
                var length;
                if (
                  key === "Content Ratio" &&
                  value.name === "Pages with keyword stuffing"
                ) {
                  if (table.length > 0) {
                    $.each(table, function (i, j) {
                      if (i == selected_icon) {
                        sentence = j.key_sentence && j.key_sentence[keyword];
                        length = sentence ? sentence.length : 0;
                        if (length > 0) {
                          setTimeout(() => {
                            $(` <tr class="key-empty" id="${id}" >
                                                <td   colspan="3" class="text-left keyword-td " >
                                                  <div class="td_div">
                                                  ${sentence
                                                    .map(
                                                      (val, i) =>
                                                        `<div class="d-flex shadow_"><i class="fa fa-circle mt-1 " style="font-size: 10px;"></i> &nbsp;&nbsp; <span class="m-0 text-gray font-14 fw-400 keyword-para" id="key_${i}" > ${val} </span></div>`
                                                    )
                                                    .join("<br>")}
                                                  </div>
                                                </td>
                                     </tr>
                                        `).insertAfter(row);
                            var search = keyword;
                            // highlite keyword if matched
                            $(".keyword-para").each(function () {
                              var text = $(this).text();
                              var regex = new RegExp(
                                "\\b" + search + "\\b(?=[^\\w'])",
                                "gi"
                              );
                              var newText = text.replace(
                                regex,
                                `<span class='text-red'>${search}</span>`
                              );
                              $(this).html(newText);
                            });

                            $(".keyword-para").each(function () {
                              var text = $(this).text().replace(/[’']/g, "'");
                              var keyword = search;
                              var regex = new RegExp(
                                `\\b${keyword}\\b(?=[^'])`,
                                "gi"
                              );
                              var newText = text.replace(
                                regex,
                                `<span class='text-red'>${keyword}</span>`
                              );
                              $(this).html(newText);
                            });
                          }, 600);
                        }
                      }
                    });
                  }
                }
              }
            });
          });
        });
        //  keyword functionality end
        $.each(error_count, function (i, val) {
          $(".pagevalue" + i).html("");
          $(".pagevalue" + i).append(`${val}`);
        });
        var h1Detail = "";
        $(document).on("click", ".help-class-icon", function () {
          $(".modal-body-text").empty();
          var selected_row = $(this).attr("id");
          var modal_description = $(`#description_${selected_row}`).text();
          $(".modal-body-text").append(
            `<ul> ${
              modal_description
                ? modal_description
                : h1Detail[selected_row]
                    .map((val) => `<li>${val}</li> `)
                    .join("")
            } </ul>`
          );
          var match_wordd = $(this).parent(":first").text();
          $("#modalBroken-heading").text(match_word);
          $("#modal-audit-scroll-bar").html("");
          $("#tableContentPopup").modal("show");
          var newObject = Object.fromEntries(
            Object.entries(myObject).filter(([key]) => key === check)
          );
          var currentTab = $(".tabs-li.active").children(":first").text();
          var Selected_obj = Object.values(newObject[currentTab]).filter(
            (val) => val.name === $.trim(match_wordd)
          );
          Object.entries(Selected_obj).map(function ([key, valuee]) {
            $("#modal-heading").text(valuee.name);
          });
        });
        function getValue() {
          var newObject = Object.fromEntries(
            Object.entries(myObject).filter(([key]) => key === check)
          );
          Object.entries(newObject).map(function ([key, value]) {
            $(".count_loader").hide();
            $("#page_title").html("");
            $("#Page_Description").html("");
            $("#Content_Ratio").html("");
            $("#Word_Count").html("");
            $("#H1").html("");
            $.each(value, function (i, val) {
              var index = i.replace(/\s/g, "");
              if (key == "Page Titles") {
                if (val.Founded == 0) {
                  $("#page_title").append(`
              <tr class="text-center">
              <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small></span></td>
                                     <td class="text-green"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Pagetitle_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
             `);
                } else if (val.Founded > 0) {
                  $("#page_title").append(`
              <tr class="text-center">
              <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small></span></td>
                                     <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Pagetitle_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
             `);
                }
              } else if (key == "Page Description") {
                if (val.Founded == 0) {
                  $("#Page_Description").append(`
             <tr class="text-center">
                                   <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                   <td class="text-green"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                   <td class="Pagedescription_found">${val.Founded}</td>
                                   <td></td>
                               </tr>
            `);
                } else {
                  $("#Page_Description").append(`
             <tr class="text-center">
                                   <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                   <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                   <td class="Pagedescription_found">${val.Founded}</td>
                                   <td></td>
                               </tr>
            `);
                }
              } else if (key == "Content Ratio") {
                if (val.Founded == 0) {
                  $("#Content_Ratio").append(`
                 <tr class="text-center">
                                     <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon" ></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                     <td class="text-green"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Contentratio_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
                `);
                } else {
                  $("#Content_Ratio").append(`
                 <tr class="text-center">
                                       <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                     <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Contentratio_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
                `);
                }
              } else if (key == "Word Count") {
                if (val.Founded == 0) {
                  $("#Word_Count").append(`
                 <tr class="text-center">
                                     <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                     <td class="text-green"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Wordcount_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
                `);
                } else {
                  // $(".sub-headline").text("Note: While Google does not specify a recommended length for title tags, most desktop and mobile browsers are able to display the first 50–60 characters")
                  $("#Word_Count").append(`
                 <tr class="text-center">
                                     <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                     <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="Wordcount_found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
                `);
                }
              } else if (key == "H1") {
                if (val.Founded == 0) {
                  $(".sub-headline").text("");
                  $("#H1").append(`
               <tr class="text-center">
                                   <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small></span></td>
                                   <td class="text-green"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                   <td class="H-found">${val.Founded}</td>
                                   <td></td>
                               </tr>
              `);
                } else {
                  $(".sub-headline").text("");
                  $("#H1").append(`
                 <tr class="text-center">
                                     <td class="text-left clickable" ><a href="javascript:void()"  data-text="${val.name}" class="text-gray ">${val.name}</a> <span class=' help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i><small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                     <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                     <td class="H-found">${val.Founded}</td>
                                     <td></td>
                                 </tr>
                `);
                }
              }
            });
            $(".tb_loader").hide();
            $(".tabs-li").on("click", function () {
              $(".bottom_table").css("display", "none");
            });
            $(document).on("click", ".clickable .help-icon", function (e) {
              e.stopPropagation();
            });
            $(document).on("click", ".clickable", function (event) {
              // document.querySelector("#displayTable").scrollIntoView({
              //   behavior: "smooth",
              // });
              event.preventDefault(); // prevent default action of the link
              $('html, body').animate({
                scrollTop: $("#displayTable").offset().top
              }, 0);

              $(this).parent().addClass("bg-light-blue3");
              $(this).parent().siblings().removeClass("bg-light-blue3");
              //   $('html, body').animate({
              // scrollTop: $("#displayTable").offset().top
              //  },0);
              $(".bottom_table").css("display", "block");
              match_word = $.trim($(this).text());

              $(".error_type_label").html("");
              $(".error_type_label").append(match_word);
              $("#links_detail").html("");
              if (key === "H1") {
                $("#tableHead").html("");
                $("#tableHead").html(`
            <tr>
                  <th class=" sorting-icon th-sm p-relative w-37" style="text-align: left;"> Title  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small> </th>
                  <th class=" sorting-icon th-sm p-relative w-16" style="text-align: left;">Http Status  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm p-relative w-15" style="text-align: left;">
                      Content Type
                      <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;">
                          <i class="fa-solid fa-chevron-up me-1"></i>
                      </small>
                  </th>
                  <th class=" sorting-icon th-sm w-10" style="text-align: left;">Date  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class="sorting-icon th-sm w-16" style="text-align: left;">Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm w-16" style="text-align: left;">Recommended Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
              </tr>
            `);
              } else if (key === "Page Description") {
                $("#tableHead").html("");
                $("#tableHead").html(`
                    <tr>
                  <th class=" sorting-icon th-sm p-relative w-37" style="text-align: left;"> Source Page Title <small
                          class="tbl-sml-txt">Website URL</small>
                          <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small>
                  </th>
                  <th class=" sorting-icon th-sm p-relative w-15" style="text-align: left;">Description  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm p-relative w-11" style="text-align: left;">
                      Content Type
                      <small class="  tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;">
                          <i class="fa-solid fa-chevron-up me-1"></i>
                      </small>
                  </th>
                  <th class=" sorting-icon th-sm w-10" style="text-align: left;">Date  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm w-12" style="text-align: left;">Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm w-15" style="text-align: left;">Recommended Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
              </tr> `);
              } else {
                $("#tableHead").html("");
                $("#tableHead").html(`
                 <tr>
                  <th class=" sorting-icon th-sm p-relative w-37" style="text-align: left;"> Source Page Title <small
                          class="tbl-sml-txt">Website URL</small>
                          <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                     
                  </small>
                  </th>
                  <th class=" sorting-icon th-sm p-relative w-15" style="text-align: left;">Title  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm p-relative w-11" style="text-align: left;">
                      Content Type
                      <small class="  tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;">
                          <i class="fa-solid fa-chevron-up me-1"></i>
                      </small>
                  </th>
                  <th class=" sorting-icon th-sm w-10" style="text-align: left;">Date  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm w-12" style="text-align: left;">Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
                  <th class=" sorting-icon th-sm w-15" style="text-align: left;">Recommended Length  <small class=" tbl-sml-txt chevron d-flex justify-content-end" style="padding-bottom: 20px;" >
                      <i class="fa-solid fa-chevron-up me-1"></i>
                  </small></th>
              </tr>
            `);
              }
              $.each(value, function (i, value) {
                if (value.name === match_word) {
                  var table = value.table;
                  var detail = value.detail;
                  if (
                    key === "Content Ratio" &&
                    value.name === "Pages with keyword stuffing"
                  ) {
                    $("#tableHead").html("");
                    $("#tableHead").html(`
            <tr>
              <th class=" sorting-icon th-sm p-relative w-25" style="text-align: left;"> Source Page Title 
                  </th>
                  <th class=" sorting-icon th-sm p-relative w-37" style="text-align: left;"> Reasons for spam penalization 
                  </th>
                  <th class=" sorting-icon th-sm p-relative w-10" style="text-align: left;">Page Words Count </th>
              </tr>
            `);
                  }

                  if (
                    key === "Content Ratio" &&
                    value.name === "Pages with keyword stuffing"
                  ) {
                    if (table.length > 0) {
                      $.each(table, function (i, j) {
                        keywordCounts = "";
                        keywordCounts = j.keyword_stuffing.map(
                          (val) =>
                            val["stuffing_value"] ||
                            val["bigram_value"] ||
                            val["trigram_value"]
                        );
                        $("#links_detail")
                          .parent()
                          .parent()
                          .addClass("displayTableWrapper");
                        $("#links_detail").append(`
                <tr id="${i}" >
                        <td>
                            <p class="text-gray font-14 text-left mb-1 text-elipses text-elpsis-class d-block" title="${
                              j.source_page_title
                            }">
                              ${j.source_page_title}
                            </p>
                            <div class="text-left font-12">
                                <a class="text-elipses text-elpsis-class d-block"
                                title="${j.website_url}"
                                    href="${
                                      j.website_url
                                    }" target="blank">${j.website_url}</a>
                            </div>
                        </td> 
                        ${
                          j.Reasons_for_spam_penalization.length > 0
                            ? `<td class="text-left acordion_row " > 
                         <div class="d-flex" > 
                           <div style="width: 100%">
                             ${
                               j.Reasons_for_spam_penalization
                                 ? j.Reasons_for_spam_penalization.split(",")
                                     .map(
                                       (val) =>
                                         `<span class="badge badge-info ">${val}</span>`
                                     )
                                     .join(",")
                                     .replace(/,/g, " ")
                                 : "---"
                             } 
                             </div>
                              <div style="cursor: pointer;"> <i id="${i}" class="icon-click fa-solid fa-chevron-down me-1  " ></i> </div>
                              </td>`
                            : `<td class="text-left " > 
                         <div class="d-flex" > 
                           <div style="width: 100%">
                             ${
                               j.Reasons_for_spam_penalization
                                 ? j.Reasons_for_spam_penalization.split(",")
                                     .map(
                                       (val) =>
                                         `<span class="badge badge-info ">${val}</span>`
                                     )
                                     .join(",")
                                     .replace(/,/g, " ")
                                 : "---"
                             } 
                             </div>
                              <div style="cursor: pointer;"> <i id="${i}" class="icon-click fa-solid fa-chevron-down me-1  " ></i> </div>
                              </td>`
                        }
                        <td>${j.Page_Words_Count}</td>
                    </tr>
                    <tr class="acordion_1" style="display: none;">
                    <td colspan=3 style="cursor: pointer;" > ${j.Reasons_for_spam_penalization.split(
                      ","
                    )
                      .map(
                        (val, ind) =>
                          `<span class="badge badge-info keyword_click" id="keyword_${ind}${i}"><span>${val}</span><span class="keyword-counts badge bg-danger " id="click_${ind}${i}" style="margin-left: 10px; margin-right: -2px; font-size: 10px; padding-bottom: 1px;">0</span>  </span>`
                      )
                      .join(",")
                      .replace(/,/g, " ")}</td>
                   </tr>
               `);
                        keywordCounts.map((val, ind) =>
                          $(`#click_${ind}${i}`).text(val)
                        );
                        // <td class="text-left" > <div class="d-flex" > <div>${ j.Reasons_for_spam_penalization ? (j.Reasons_for_spam_penalization.split(',').map((val) => `<span class="badge badge-info">${val}</span>`).join(',').replace(/,/g, ' ')) : "---"} </div> <div style="cursor: pointer;">  <i id="icon_${i}" class="icon-click fa-solid fa-chevron-down me-1 acordion_row " ></i> </div></td>
                        //  <tr class="acordion_1" style="display: none;">
                        //   <td colspan="3"> ${j.Reasons_for_spam_penalization.split(',').map((val) => `<span class="badge badge-info">${val}</span>`).join(',').replace(/,/g, ' ')}</td>
                        //   </tr>
                      });
                    } else {
                      $("#links_detail")
                        .parent()
                        .parent()
                        .removeClass("displayTableWrapper");
                      $("#links_detail").append(
                        `<td colspan='6' class="bg-light-blue2 text-center fw-bold fs-3 "> No Data Found </td> `
                      );
                      $(".links_detail_loader").show();
                    }
                  } else if (
                    key === "Content Ratio" &&
                    value.name === "Pages with thin content"
                  ) {
                    if (table.length > 0) {
                      $.each(table, function (i, j) {
                        $("#links_detail")
                          .parent()
                          .parent()
                          .removeClass("displayTableWrapper");
                        $("#links_detail").append(`
                               <tr>
                                       <td>
                                       <div class="d-flex justify-content-between">
                                       <div>
                                           <p class="text-gray font-14 text-left mb-1 text-elipses d-block text-elpsis-class" title="${
                                             j.source_page_title
                                           }">
                                             ${j.source_page_title}
                                           </p>
                                           <div class="text-left font-12">
                                               <a class="text-elipses text-elpsis-class d-block"
                                               title="${j.website_url}"
                                                   href="${
                                                     j.website_url
                                                   }" target="blank">${j.website_url}</a>
                                           </div>
                                        </div>
                                        <div class=""> 
                                        </div>
                                        </div>
                                       </td>
                                       <td id="description_${i}" >${j.source_page_title ? j.source_page_title : "--"}</td>
                                       <td><button class="b-gray text-gray font-10">${
                                         j.content_type
                                       }</button></td>
                                       <td>${j.date}</td>
                                       ${
                                         j.last_modified === 0
                                           ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                       }
                                       <td>${j.server}</td>
                                   </tr>
                              `);
                      });
                    }
                  } else if (
                    key === "Content Ratio" &&
                    value.name === "100% duplicate pages"
                  ) {
                    if (table.length > 0) {
                      $.each(table, function (i, j) {
                        $("#links_detail")
                          .parent()
                          .parent()
                          .removeClass("displayTableWrapper");
                        $("#links_detail").append(`
                                   <tr>
                                           <td>
                                           <div class="d-flex justify-content-between">
                                           <div>
                                               <p class="text-gray font-14 text-left mb-1 text-elipses d-block text-elpsis-class" title="${
                                                 j.source_page_title
                                               }">
                                                 ${j.source_page_title}
                                               </p>
                                               <div class="text-left font-12">
                                                   <a class="text-elipses text-elpsis-class d-block"
                                                   title="${j.website_url}"
                                                       href="${
                                                         j.website_url
                                                       }" target="blank">${j.website_url}</a>
                                               </div>
                                            </div>
                                            <div class=""> 
                                            </div>
                                            </div>
                                           </td>
                                           <td id="description_${i}" >${j.source_page_title ? j.source_page_title : "--"}</td>
                                           <td><button class="b-gray text-gray font-10">${
                                             j.content_type
                                           }</button></td>
                                           <td>${j.date}</td>
                                           ${
                                             j.last_modified === 0
                                               ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                               : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           }
                                           <td>${j.server}</td>
                                       </tr>
                                  `);
                      });
                    }
                  } else {
                    if (table.length > 0) {
                      $.each(table, function (i, j) {
                        if (key == "Page Description") {
                          $("#links_detail")
                            .parent()
                            .parent()
                            .removeClass("displayTableWrapper");
                          $("#links_detail").append(`
                               <tr>
                                       <td>
                                       <div class="d-flex justify-content-between">
                                       <div>
                                           <p class="text-gray font-14 text-left mb-1 text-elipses d-block text-elpsis-class" title="${
                                             j.source_page_title
                                           }">
                                             ${j.source_page_title}
                                           </p>
                                           <div class="text-left font-12">
                                               <a class="text-elipses text-elpsis-class d-block"
                                               title="${j.website_url}"
                                                   href="${
                                                     j.website_url
                                                   }" target="blank">${
                            j.website_url
                          }</a>
                                           </div>
                                        </div>
                                        <div class=""> 
                                        <span class='help-class-icon' id="${i}" > <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon" ></i> </span> 
                                        </div>
                                        </div>
                                       </td>
                                       <td id="description_${i}" title="${
                            j.description
                          }" style="max-width:370px; overflow: hidden; white-space: nowrap;">${
                            j.description ? j.description : "--"
                          }</td>
                                       <td><button class="b-gray text-gray font-10">${
                                         j.content_type
                                       }</button></td>
                                       <td>${j.date}</td>
                                       ${
                                         j.last_modified === 0
                                           ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                       }
                                       <td>${j.server}</td>
                                   </tr>
                              `);
                        } else if (
                          key == "Page Titles" ||
                          key == "Word Count"
                        ) {
                          $("#links_detail")
                            .parent()
                            .parent()
                            .removeClass("displayTableWrapper");
                          $("#links_detail").append(`
                               <tr>
                                       <td>
                                       <div class="d-flex justify-content-between">
                                       <div>
                                           <p class="text-gray font-14 text-left mb-1 text-elipses d-block text-elpsis-class" title="${
                                             j.source_page_title
                                           }">
                                             ${j.source_page_title}
                                           </p>
                                           <div class="text-left font-12">
                                               <a class="text-elipses text-elpsis-class d-block"
                                               title="${j.website_url}"
                                                   href="${
                                                     j.website_url
                                                   }" target="blank">${
                            j.website_url
                          }</a>
                                           </div>
                                           </div>
                                        <div class=""> 
                                        <span class='help-class-icon' id="${i}" > <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon" ></i> </span> 
                                        </div>
                                        </div>
                                       </td>
                                       <td class="" id="description_${i}" title="${
                            j.source_page_title
                          }" style="max-width:370px; overflow: hidden; white-space: nowrap;" >${
                            j.source_page_title ? j.source_page_title : "--"
                          }</td>
                                       <td><button class="b-gray text-gray font-10">${
                                         j.content_type
                                       }</button></td>
                                       <td>${j.date}</td>
                                       ${
                                         j.last_modified === 0
                                           ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                       }
                                       <td>${j.server}</td>
                                   </tr>
                              `);
                        } else if (key == "H1" && value.name === "Missing H1") {
                          h1Detail = detail;

                          $("#links_detail")
                            .parent()
                            .parent()
                            .removeClass("displayTableWrapper");
                          $("#links_detail").append(`
                               <tr>
                                       <td>

                                       <div class="d-flex justify-content-between">
                                       <div>
                                           <p class="text-gray font-14 text-left mb-1 text-elipses text-elpsis-class d-block" title="${
                                             j.source_page_title
                                           }">
                                             ${j.source_page_title}
                                           </p>
                                           <div class="text-left font-12">
                                               <a class="text-elipses text-elpsis-class d-block"
                                               title="${j.website_url}"
                                                   href="${
                                                     j.website_url
                                                   }" target="blank">${
                            j.website_url
                          }</a>
                                           </div>
                                           </div>
                                        </div>
                                       </td>
                                     <td>  ${
                                       j.status_code === 200
                                         ? `<span class="border-d-green border-radius-3 text-green px-1 py-1 bg-light-green">200
                                                Ok</span>`
                                         : ` ${j.status_code}`
                                     } </td>
                                       <td><button class="b-gray text-gray font-10">${
                                         j.content_type
                                       }</button></td>
                                       <td>${j.date}</td>
                                       ${
                                         j.last_modified === 0
                                           ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                       }
                                       <td>${j.server}</td>
                                   </tr>
                              `);
                        } else {
                          h1Detail = detail;

                          $("#links_detail")
                            .parent()
                            .parent()
                            .removeClass("displayTableWrapper");
                          $("#links_detail").append(`
                               <tr>
                                       <td>

                                       <div class="d-flex justify-content-between">
                                       <div>
                                           <p class="text-gray font-14 text-left mb-1 text-elipses text-elpsis-class d-block" title="${
                                             j.source_page_title
                                           }">
                                             ${j.source_page_title}
                                           </p>
                                           <div class="text-left font-12">
                                               <a class="text-elipses text-elpsis-class d-block"
                                               title="${j.website_url}"
                                                   href="${
                                                     j.website_url
                                                   }" target="blank">${
                            j.website_url
                          }</a>
                                           </div>
                                           </div>
                                        <div class=""> 
                                        <span class='help-class-icon' id="${i}" > <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon" ></i> </span> 
                                        </div>
                                        </div>
                                       </td>
                                     <td>  ${
                                       j.status_code === 200
                                         ? `<span class="border-d-green border-radius-3 text-green px-1 py-1 bg-light-green">200
                                                Ok</span>`
                                         : ` ${j.status_code}`
                                     } </td>
                                       <td><button class="b-gray text-gray font-10">${
                                         j.content_type
                                       }</button></td>
                                       <td>${j.date}</td>
                                       ${
                                         j.last_modified === 0
                                           ? `<td class="text-green " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                           : `<td class="text-red " ><i class="fa-solid fa-circle-exclamation font-14" style="margin-right:3px"></i>${j.last_modified}</td>`
                                       }
                                       <td>${j.server}</td>
                                   </tr>
                              `);
                        }
                      });
                    } else {
                      $("#links_detail")
                        .parent()
                        .parent()
                        .removeClass("displayTableWrapper");
                    }
                  }
                }
              });
            });
          });
        }
        getValue();
        $(".tabs-li").on("click", function () {
          $(".bottom_table").css("display", "none");
          check = $(".tabs li.active").find("span").first().text();
          getValue();
        });
      } else if (
        response.status === false &&
        response.crawl_request_inprocess === true
      ) {
        ShowNoty("Crawled data in process,you may go to Project List for further details", "warning");
      } else {
        ShowNoty(response.error, "error");
        $("#noty_layout__topRight")
          .find("span:nth-child(2)")
          .attr("title", `${response.error}`);
        $("#noty_layout__topRight")
          .find("span:nth-child(2)")
          .addClass("text-elipses");
        $(".count_loader,.tb_loader").hide();
        $(".empty_counts").text("-");
        $(".count_loader").hide();
        $("#page_title").empty();
        $("#page_title").append(`<tr><td colspan="4">No Data found</td></tr>`);
        $("#Page_Description").empty();
        $("#Page_Description").append(
          `<tr><td colspan="4" >No Data found</td></tr>`
        );
        $("#Content_Ratio").empty();
        $("#Content_Ratio").append(
          `<tr><td colspan="4" >No Data found</td></tr>`
        );
        $("#Word_Count").empty();
        $("#Word_Count").append(`<tr><td colspan="4" >No Data found</td></tr>`);
        $("#H1").empty();
        $("#H1").append(`<tr><td colspan="4" >No Data found</td></tr>`);
      }
    },
  });
}
// content function end
var seyInt = setInterval(contentFnc, 1000);
function contentFnc() {
  var id = $('.radio :selected').first().attr('data-id')
  var url = $(".radio :selected").first().val();
  if (url !== undefined && url !== "") {
    clearInterval(seyInt);
    $("#finalUrl").html("");
    $("#finalUrl").html(`${url}`);
    $("#finalUrl").attr("href", url);
    //  crawler page start
    $.ajax({
      method: "GET",
      url: "/site_audit/crawler_data/?project_id=" + id,
      success: function (response) {
        if (!response.crawl_request_inprocess) {
          contentFnc2(url);
        } else if (response.crawl_request_inprocess) {
          contentFnc2(url);
          // ShowNoty('Crawled data in process','warning')
          $(".count_loader,.tb_loader").hide();
          $(".empty_counts").html("-");
          $(".count_loader").hide();
          $("#page_title").empty();
          $("#page_title").append(
            `<tr><td colspan="4">Crawled data in process</td></tr>`
          );
          $("#Page_Description").empty();
          $("#Page_Description").append(
            `<tr><td colspan="4" >Crawled data in process</td></tr>`
          );
          $("#Content_Ratio").empty();
          $("#Content_Ratio").append(
            `<tr><td colspan="4" >Crawled data in process</td></tr>`
          );
          $("#Word_Count").empty();
          $("#Word_Count").append(
            `<tr><td colspan="4" >Crawled data in process</td></tr>`
          );
          $("#H1").empty();
          $("#H1").append(
            `<tr><td colspan="4" >Crawled data in process</td></tr>`
          );
        }
      },
    });
    //  crawler page end
  }
}

/* Tab Function */
$(document).on("click", ".clickable", function () {
  $("#links_detail").html("");
  // document.querySelector("#displayTable").scrollIntoView({
  //   behavior: "smooth",
  // });
});

$(document).on("change", ".radio", function () {
  location.reload();
  $("#links_detail").parent().parent().removeClass("displayTableWrapper");
  $("#links_detail").html("");
  // $(".acordion_row1").remove()
  $(".key-empty").remove();
  $("#displayTable_wrapper").hide();
  $("#table-heading").hide();
  var url = "";
  url = $(this).val();
  $("#finalUrl").html("");
  $("#finalUrl").html(`${url}`);
  $("#finalUrl").attr("href", url);
  $("#PageTitle").html("");
  $("#PageDescription").html("");
  $("#ContentRatio").html("");
  $("#WordCount").html("");
  $("#H-1").html("");
  $("#page_title").empty();
  $("#Page_Description").empty();
  $("#Content_Ratio").empty();
  $("#Word_Count").empty();
  $("#H1").empty();
  $(".count_loader").show();
  $(".tb_loader").show();
  contentFnc(url);
  $(document).on("click", ".clickable", function () {
    $("#links_detail").html("");
  });
});
