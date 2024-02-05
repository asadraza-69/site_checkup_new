//initializing a function
function technical_site_audit() {
  var url = $(".radio").first().val(); // Get the value of the first radio button with the class "radio"

   // Set the text and href of the HTML element with the ID of "finalUrl" to the value of the radio button
  $("#finalUrl").html("");
  $("#finalUrl").html(`${url}`);
  $("#finalUrl").attr("href", url);

   // Make an AJAX GET request to the specified URL for getting table Data
  $.ajax({
    type: "GET",
    url: "/crawler/crawl/?website_url=" + url,

    success: function (response) {
      //console.log(response, "working");
      var myObject = response.data;
      var check = $(".tabs li.active").find("span").first().text();

        //Calculate the error count by mapping over the values of the object, filtering them by a condition, and reducing the resulting array to a single value
      const error_count = Object.values(Object.values(myObject))
        .map((val) => Object.values(val).filter((val) => val.Founded > 0))
        .map((val) => val.map((val) => val.Founded).reduce((a, b) => a + b, 0));

        // Append the error count 
      $.each(error_count, function (i, val) {
        $(".pagevalue" + i).append(`${val}`);
      });

       // Filter the object based on the currently active tab
      function getValue() {
        var newObject = Object.fromEntries(
          Object.entries(myObject).filter(([key]) => key.includes(check))
        );
        
          // Append the filtered data to the appropriate active tabs
        Object.entries(newObject).map(function ([key, value]) {
          $(".count_loader").hide();
          $("#external_pages").html("");
          $("#links").html("");
          $("#Indexability").html("");
          $("#Redirects").html("");
          $("#Content").html("");
          $("#Images").html("");
          $("#Social").html("");
          $("#Other").html("");
          $("#Performance").html("");
          $.each(value, function (i, val) {
            var index = i.replace(/\s/g, "");
            if (key == "internal_pages") {
              // Append data for "internal_pages" tab
              $("#external_pages").append(`
                 <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}" >
                                            <a href="javascript:void()" class="text-gray">
                                               ${val.name}
                                            </a> <span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span>
                                        </td>
                                        <td class="text-red"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="internal_pages_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                `);
            } else if (key == "Links") {
              // Append data for "Links" tab
              $("#links").append(`
                  <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-d-blue"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="links_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                 `);
            } else if (key == "Indexability") {
                // Append data for "Indexability" tab
              $("#Indexability").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="indexability_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Redirects") {
                // Append data for "Redirects" tab
              $("#Redirects").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="redirects_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Content") {
               // Append data for "Content" tab
              $("#Content").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="found_content">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Images") {
              // Append data for "Images" tab
              $("#Images").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="images_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Social") {
                // Append data for "Social" tab
              $("#Social").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a><span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="social_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Other") {
                // Append data for "Other" tab
              $("#Other").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a> <span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="other_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            } else if (key == "Performance") {
                // Append data for "Performance" tab
              $("#Performance").append(`
                    <tr class="text-center">
                                        <td class="text-left clickable" data-text="${val.name}"><a href="javascript:void()" class="text-gray">${val.name}</a> <span class='help-icon${index}'> <i class="far fa-question-circle text-d-blue p-2  font-14 help-icon"></i> <small class="tbl_popup" title="${val.name}"> </small> </span></td>
                                        <td class="text-yellow"><i class="fa-solid fa-circle-exclamation font-14"></i></td>
                                        <td class="performance_found">${val.Founded}</td>
                                        <td></td>
                                    </tr>
                   `);
            }
          });
          $(".tb_loader").hide();


          //on clicking Li, hide bottom table
          $("li").on("click", function () {
            $(".bottom_table").css("display", "none");
          });

          //on clicking tabs list, showing bottom table data by clicking specific td..
          $(document).on("click", ".clickable", function () {
            $(".bottom_table").css("display", "block");
            var match_word = $(this).attr("data-text");
            $(".errorTypesLabel").html("");
            $(".errorTypesLabel").append(match_word);
            $("#links_detail").html("");

            // Loop data from API & check if the "name" property matches the "match_word" variable
            $.each(value, function (i, value) {
              if (value.name === match_word) {
                var table = value.table;
                if (table.length > 0) {
                  $.each(table, function (i, j) {
                    //appending and showing bottom table Data
                    $("#links_detail").append(`
                                 <tr>
                                         <td>
                                             <p class="text-gray font-14 text-left mb-1 text-elipses w-390">
                                               ${j.source_page_title}
                                             </p>
                                             <div class="text-left font-12">
                                                 <a
                                                     href="${j.website_url}">${j.website_url}</a>
                                             </div>
                                         </td>
                                         <td class="text-red"> ${j.status_code}</td>
                                         <td><button class="b-gray text-gray font-10">${j.content_type}</button></td>
                                         <td>${j.date}</td>
                                         <td>${j.last_modified}</td>
                                         <td>${j.server}</td>
                                     </tr>
                                `);
                  });
                } else { 
                  //if No data come from API
                  $("#links_detail").append(
                    `<td colspan='6' class="bg-light-blue2 text-center fw-bold fs-3 "> No Data Found </td> `
                  );
                }
              }
            });
          });
        });
      }

      getValue();
      $("li").on("click", function () {
        $(".bottom_table").css("display", "none");
        check = $(".tabs li.active").find("span").first().text();

        getValue();
      });
      //    here

      // end
    },
  });
}

// When the window has finished loading,
$(window).bind("load", function () {
  technical_site_audit();
});

/* Tab Function */
$(document).on("click", ".clickable", function () {
  $("#links_detail").html("");
});
