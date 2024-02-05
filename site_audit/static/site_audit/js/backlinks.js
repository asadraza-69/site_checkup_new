$(".cv_add_analytics_button").on("click", function () {
  $(".cv_add_analytics_button  .google_spinner").css("opacity", "1");
});
var selectedWebsiteId;
// replace number with qouma if exist
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var selectedURL;
var selectedWebsiteId;
var setInt = setInterval(Get_Backlinks, 1000);
// get backlinks function
function Get_Backlinks() {
  selectedURL = $(".radio :selected").first().val();
  $(".selectedWebsite1").html("");
  $("#count_spinner1").hide();
  setTimeout(() => {
    var finalUrll = $("#selectedDomain :selected").text();
    $(".selectedWebsite1").html(finalUrll);
  }, 300);
  if (selectedURL !== undefined && selectedURL !== "") {
    clearInterval(setInt);
    selectedWebsiteId = $(".radio :selected").first().attr("data-id");
    $.ajax({
      type: "GET",
      url:
        "/site_audit/get_backlinks/?website_url=" +
        selectedURL +
        "&project_id=" +
        selectedWebsiteId,
      beforeSend: function () {
        $(".count_spinner").show();
      },
      success: function (response) {
        //appending data from response to a table
        if (response.status) {
          let json = response.results;
          let AnchorTextjson = response.anchor_text.results;
          $("#backLinksTable tbody").html("");
          $("#anchorTextTable tbody").html("");
          $("#spammyBacklinksTable tbody").empty();
          var lowerRange = 0;
          var middleRange = 0;
          var upperRange = 0;
          var downRange = 0;
          var BacklinksCount = 0;
          var AnchortextCount = 0;
          var SpammyBacklinksCount = 0;
          json.forEach(function (item) {

            //checking for lowerRange, middle range and upper range
            let SourceObject = item.source;
            let TargetObject = item.target;
            if (
              SourceObject.domain_authority >= 50 &&
              SourceObject.domain_authority <= 60
            ) {
              lowerRange++;
            }
            if (
              SourceObject.domain_authority >= 61 &&
              SourceObject.domain_authority <= 80
            ) {
              middleRange++;
            }
            if (
              SourceObject.domain_authority >= 81 &&
              SourceObject.domain_authority <= 100
            ) {
              upperRange++;
            }
            if (
              SourceObject.domain_authority >= 1 &&
              SourceObject.domain_authority <= 49
            ) {
              downRange++;
            }

            BacklinksCount++;
            $(".loader").hide();

            //showing domain authority on different conditions
            var elements = "";
            if (
              SourceObject.domain_authority >= 50 &&
              SourceObject.domain_authority <= 60
            ) {
              elements +=
                "<td class='text-center'> " +
                "<span class='countt orange' style='background-color:#FF8000'>" +
                SourceObject.domain_authority +
                "</span> </td>";
            } else if (
              SourceObject.domain_authority >= 61 &&
              SourceObject.domain_authority <= 80
            ) {
              elements +=
                "<td class='text-center'> " +
                "<span class='countt yellow bg-yellow '>" +
                SourceObject.domain_authority +
                "</span> </td>";
            } else if (
              SourceObject.domain_authority >= 81 &&
              SourceObject.domain_authority <= 100
            ) {
              elements +=
                "<td class='text-center'> " +
                "<span class='countt green bg-green '>" +
                SourceObject.domain_authority +
                "</span> </td>";
            } else {
              elements +=
                "<td class='text-center'> " +
                "<span class='countt red bg-red '>" +
                SourceObject.domain_authority +
                "</span> </td>";
            }

            //appending backlinks Table Data of 3 different tabs
            $("#backLinksTable tbody").append(
              "<tr><td><a href='//" +
                SourceObject.page +
                "' class='d-flex justify-content-start sourceLink text-elipses' title='" +
                SourceObject.page +
                " '  target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
                SourceObject.page +
                "</span></a></td>" +
                elements +
                "<td>" +
                "href</td><td><span class='anchorText' title='" +
                item.anchor_text +
                "'>" +
                (item.anchor_text == ""
                  ? "Empty anchor text"
                  : item.anchor_text) +
                "</span></td><td><a href='//" +
                TargetObject.page +
                "' class='targetLink' title='" +
                TargetObject.page +
                "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
                moment(item.date_first_seen).format("MMM DD, YYYY") +
                "</td><td>" +
                moment(item.date_last_seen).format("MMM DD, YYYY") +
                "</td></tr>"
            );
          });
          $("#lower-Range").text(lowerRange);
          $("#middle-Range").text(middleRange);
          $("#upper-Range").text(upperRange);
          $("#down-Range").text(downRange);
          AnchorTextjson.forEach(function (item) {
            AnchortextCount++;

            $(".loader").hide();
            $("#anchorTextTable tbody").append(
              "<tr><td><span class='d-flex justify-content-start'>" +
                (item.anchor_text == ""
                  ? "Empty anchor text"
                  : item.anchor_text) +
                "</span></td><td class='text-center'>" +
                numberWithCommas(item["external_pages"]) +
                "</td><td class='text-center'>" +
                numberWithCommas(item["external_root_domains"]) +
                "</td></tr>"
            );
          });
          var totalreferDomain =
            response["results"][0]["target"]["root_domains_to_root_domain"];
          var prevtotalreferDomain;
          if (response["previous_results"] != "") {
            prevtotalreferDomain =
              response["previous_results"][0]["target"][
                "root_domains_to_root_domain"
              ];
          } else {
            prevtotalreferDomain = totalreferDomain;
          }
          if (totalreferDomain > prevtotalreferDomain) {
            $(".referringDomains.changeIcon").html(
              '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
            );
            $(".referringDomains.changeDesc").html(
              '<span class="text-success">' +
                (totalreferDomain - prevtotalreferDomain) +
                "</span> more than previous month"
            );
          } else if (totalreferDomain < prevtotalreferDomain) {
            $(".referringDomains.changeIcon").html(
              '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
            );
            $(".referringDomains.changeDesc").html(
              '<span class="text-danger">' +
                (totalreferDomain - prevtotalreferDomain) +
                "</span> less than previous month"
            );
          } else {
            $(".referringDomains.changeIcon").html("");
            $(".referringDomains.changeDesc").html(
              "no change than previous month"
            );
          }

          $("#referringDomains").html("");
          $(".count_spinner").hide();
          $("#referringDomains").html(numberWithCommas(totalreferDomain));
          //external_pages_to_root_domain = Total Number of Backlinks
          var totalBackLinks =
            response["results"][0]["target"]["external_pages_to_root_domain"];
          var prevtotalBackLinks;
          if (response["previous_results"] != "") {
            prevtotalBackLinks =
              response["previous_results"][0]["target"][
                "external_pages_to_root_domain"
              ];
          } else {
            prevtotalBackLinks = totalBackLinks;
          }

          $("#totalNumberOfBacklinks").html("");
          $(".count_spinner").hide();
          $("#totalNumberOfBacklinks").html(numberWithCommas(totalBackLinks));

          if (totalBackLinks > prevtotalBackLinks) {
            $(".totalBackLinks.changeIcon").html(
              '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
            );
            $(".totalBackLinks.changeDesc").html(
              '<span class="text-success">' +
                (totalBackLinks - prevtotalBackLinks) +
                "</span> more than previous month"
            );
          } else if (totalBackLinks < prevtotalBackLinks) {
            $(".totalBackLinks.changeIcon").html(
              '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
            );
            $(".totalBackLinks.changeDesc").html(
              '<span class="text-danger">' +
                (totalBackLinks - prevtotalBackLinks) +
                "</span> less than previous month"
            );
          } else {
            $(".totalBackLinks.changeIcon").html("");
            $(".totalBackLinks.changeDesc").html(
              "no change than previous month"
            );
          }

          var total_pages =
            response["results"][0]["target"]["pages_to_root_domain"];
          var total_nofollow =
            response["results"][0]["target"]["nofollow_pages_to_root_domain"];
          var total = total_nofollow / total_pages;
          var noFollow_per = Math.round(total * 100);
          var follow = Math.round(100 - noFollow_per);
          $(".count_spinner").hide();
          $("#follow").html(follow + "% ");

          $(".count_spinner").hide();
          $("#noFollow").html(noFollow_per + "% ");
        } else {
          if (response.limits_error) {
            $("#upgradeSub").modal("show");
            $("#sidebarMenu").css("z-index", "10000");
            $("#main-navbar").css("z-index", "99999");
            $("main").css("opacity", "0.07");
            //  ShowNoty(response.limits_error,"error")
          } else {
            ShowNoty(response.error, "error");
          }
        }

        if (BacklinksCount >= 0 && BacklinksCount <= 49) {
          $(".backlinksCount").css("border-color", "red");
          $(".backlinksCount").text(BacklinksCount);
          $(".backlinksCount").addClass("bg-red");
        } else if (BacklinksCount >= 50 && BacklinksCount <= 89) {
          $(".backlinksCount").css("border-color", "yellow");
          $(".backlinksCount").text(BacklinksCount);
          $(".backlinksCount").addClass("bg-yellow");
        } else {
          $(".backlinksCount").text(BacklinksCount);
          $(".backlinksCount").css("border-color", "green");
          $(".backlinksCount").addClass("bg-green");
        }

        if (AnchortextCount >= 0 && AnchortextCount <= 49) {
          $(".anchorTextCount").css("border-color", "red");
          $(".anchorTextCount").text(AnchortextCount);
          $(".anchorTextCount").addClass("bg-red");
        } else if (AnchortextCount >= 50 && AnchortextCount <= 89) {
          $(".anchorTextCount").css("border-color", "yellow");
          $(".anchorTextCount").text(AnchortextCount);
          $(".anchorTextCount").addClass("bg-yellow");
        } else {
          $(".anchorTextCount").text(AnchortextCount);
          $(".anchorTextCount").css("border-color", "green");
          $(".anchorTextCount").addClass("bg-green");
        }

        if (SpammyBacklinksCount >= 0 && SpammyBacklinksCount <= 49) {
          $(".spammyBacklinksCount").css("border-color", "red");
          $(".spammyBacklinksCount").text(SpammyBacklinksCount);
          $(".spammyBacklinksCount").addClass("bg-red");
        } else if (SpammyBacklinksCount >= 50 && SpammyBacklinksCount <= 89) {
          $(".spammyBacklinksCount").css("border-color", "yellow");
          $(".spammyBacklinksCount").text(SpammyBacklinksCount);
          $(".spammyBacklinksCount").addClass("bg-yellow");
        } else {
          $(".spammyBacklinksCount").text(SpammyBacklinksCount);
          $(".spammyBacklinksCount").css("border-color", "green");
          $(".spammyBacklinksCount").addClass("bg-green");
        }

        $(document).trigger("function_a_complete");
      },
      error: function (response) {
        ShowNoty(response.error, "error");
      },
    });
  }
}

$(document).bind("function_a_complete", initializeDatatables);

function initializeDatatables() {
  $("#backLinksTable").DataTable({
    dom: "frtipB",
    bDestroy: true,
    pageLength: 10,
    aaSorting: [],
    buttons: [
      {
        extend: "csvHtml5",
        className: "btn btn-sm  btn-light",
        text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
        titleAttr: "CSV",
        title: "Backlinks",
      },
    ],
  });

  $("#anchorTextTable").DataTable({
    dom: "frtipB",
    bDestroy: true,
    pageLength: 10,
    aaSorting: [],
    buttons: [
      {
        extend: "csvHtml5",
        className: "btn btn-sm  btn-light",
        text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
        titleAttr: "CSV",
        title: "Anchor Text",
      },
    ],
  });

  $("#spammyBacklinksTable").DataTable({
    dom: "frtipB",
    pageLength: 10,
    bDestroy: true,
    aaSorting: [],
    buttons: [
      {
        extend: "csvHtml5",
        className: "btn btn-sm  btn-light",
        text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
        titleAttr: "CSV",
        title: "Spammy Backlinks",
        //   exportOptions: {
        //     columns: headerDictExport,
        //   },
      },
    ],
    oLanguage: {
      sEmptyTable:
        '<div class="py-5 d-flex"><img src="../../static/site_audit/assets/spammy-backlinks-result.svg" alt="designer-image" decoding="async" class="tool-information__image"></img>' +
        "<div><h4><span>Nice! We didn't find any spammy backlinks pointing to " +
        selectedURL +
        "</span></h4> <p>We are actively monitoring this and will notify you if we detect any suspicious backlinks in the future.</p></div></div>",
    },
  });

  $(".table.list_viewTable").css("table-layout", "fixed");

  $(".customExportBtn").click(function () {
    $(".tab-content>.active .dt-button.buttons-csv").trigger("click");
  });
}

$(".chooseTabsData").click(function () {
  $("#chooseData").modal("show");

  let tabsName = $(".nav-tabs .nav-link.active").data("id");

  if (tabsName == "Backlinks") {
    $(".BacklinksColumns").show().addClass("active");
    $(".AnchorTextColumns").hide().removeClass("active");
    $(".SpammyBacklinksColumns").hide().removeClass("active");
  } else if (tabsName == "Anchor Text") {
    $(".BacklinksColumns").hide().removeClass("active");
    $(".AnchorTextColumns").show().addClass("active");
    $(".SpammyBacklinksColumns").hide().removeClass("active");
  } else if (tabsName == "Spammy Backlinks") {
    $(".BacklinksColumns").hide().removeClass("active");
    $(".AnchorTextColumns").hide().removeClass("active");
    $(".SpammyBacklinksColumns").show().addClass("active");
  }

  $("#columnFunctionActiveTab").click(function () {
    var checkboxesUnchecked = $("#chooseColumnsTabs")
      .find(".active")
      .find(".form-check-input:not(:checked)");
    var checkboxesChecked = $("#chooseColumnsTabs")
      .find(".active")
      .find(".form-check-input:is(:checked)");

    // Get the column API object

    for (let element of checkboxesChecked) {
      let item = $(element).attr("data-column");

      let headers = $(".tab-content>.active .dataTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();
      var columnNo = headers.indexOf(item);
      var column = $(".tab-content>.active .dataTable")
        .DataTable()
        .column(columnNo);

      // Toggle the visibility
      column.visible(true);

      $("#chooseData").find(".btn-close").trigger("click");
    }
    for (let element of checkboxesUnchecked) {
      let item = $(element).attr("data-column");

      let headers = $(".tab-content>.active .dataTable")
        .DataTable()
        .columns()
        .header()
        .map((d) => d.textContent.trim().replace(/^\s+|\s+$/g, ""))
        .toArray();
      var columnNo = headers.indexOf(item);
      var column = $(".tab-content>.active .dataTable")
        .DataTable()
        .column(columnNo);
      // Toggle the visibility
      column.visible(false);

      $("#chooseData").find(".btn-close").trigger("click");
    }

    // Toggle the visibility
  });
});

$(document).on("click", ".link-website-authority", function () {
  $("#dictionary").modal("show");
  openTab("", "WebsiteAuthority");
});
$(document).on("click", ".link-traffic", function () {
  $("#dictionary").modal("show");
  openTab("", "Traffic");
});

$(document).on("click", ".link-total-keywords", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofKeywords");
});

$(document).on("click", ".link-total-backlinks", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofBacklinks");
});

$(document).on("click", ".link-Referring-domains", function () {
  $("#dictionary").modal("show");
  openTab("", "ReferringDomains");
});

$(document).on("click", ".link-followNofollow", function () {
  $("#dictionary").modal("show");
  openTab("", "FollowNoFollow");
});

$(document).on("click", ".link-Link-Type", function () {
  $("#dictionary").modal("show");
  openTab("", "LinkType");
});
$(document).on("click", ".link-Anchor-Text", function () {
  $("#dictionary").modal("show");
  openTab("", "AnchorText");
});

$(document).on("click", ".link-Total-Number-of-Backlinks", function () {
  $("#dictionary").modal("show");
  openTab("", "TotalNumberofBacklinks");
});

$(".selectedWebsitee").html("");

// on dropdown change
$(document).on("change", ".radio", function () {
  $(".selectedWebsite1").html("");
  $(".count_spinner").show();
  $(".backlink_analysis_rslt").hide();
  $("#backLinksTable tbody").html("");
  $("#backLinksTable").DataTable().destroy();
  $("#anchorTextTable tbody").html("");
  $("#spammyBacklinksTable tbody").empty();
  $(".loader").show();
  $(".backlinksCount").html("");
  $(".anchorTextCount").html("");
  $(".spammyBacklinksCount").html("");
  selectedURL = $(this).first().val();

  selectedWebsiteId = $(".radio :selected").first().attr("data-id");
  $.ajax({
    type: "GET",
    url:
      "/site_audit/get_backlinks/?website_url=" +
      selectedURL +
      "&project_id=" +
      selectedWebsiteId,
    beforeSend: function () {
      $(".count_spinner").show();
    },

    success: function (response) {
      $("#count_spinner1").hide();
      setTimeout(() => {
        var finalUrll = $("#selectedDomain :selected").text();
        $(".selectedWebsite1").html(finalUrll);
      });
      if (response.status) {
        $(".backlink_analysis_rslt").show();
        let json = response.results;
        let AnchorTextjson = response.anchor_text.results;

        var BacklinksCount = 0;
        var lowerRange = 0;
        var middleRange = 0;
        var upperRange = 0;
        var downRange = 0;
        var AnchortextCount = 0;
        var SpammyBacklinksCount = 0;
        $("#backLinksTable tbody").html("");
        json.forEach(function (item) {
          let SourceObject = item.source;
          let TargetObject = item.target;

          // console.log("hello",  SourceObject.domain_authority)
          if (
            SourceObject.domain_authority >= 50 &&
            SourceObject.domain_authority <= 60
          ) {
            lowerRange++;
          }
          if (
            SourceObject.domain_authority >= 61 &&
            SourceObject.domain_authority <= 80
          ) {
            middleRange++;
          }
          if (
            SourceObject.domain_authority >= 81 &&
            SourceObject.domain_authority <= 100
          ) {
            upperRange++;
          }

          if (
            SourceObject.domain_authority >= 1 &&
            SourceObject.domain_authority <= 49
          ) {
            downRange++;
          }

          BacklinksCount++;
          $(".loader").hide();

          var elements = "";
          if (
            SourceObject.domain_authority >= 50 &&
            SourceObject.domain_authority <= 60
          ) {
            elements +=
              "<td class='text-center'> " +
              "<span class='countt orange' style='background-color:#FF8000'>" +
              SourceObject.domain_authority +
              "</span> </td>";
          } else if (
            SourceObject.domain_authority >= 61 &&
            SourceObject.domain_authority <= 80
          ) {
            elements +=
              "<td class='text-center'> " +
              "<span class='countt yellow bg-yellow '>" +
              SourceObject.domain_authority +
              "</span> </td>";
          } else if (
            SourceObject.domain_authority >= 81 &&
            SourceObject.domain_authority <= 100
          ) {
            elements +=
              "<td class='text-center'> " +
              "<span class='countt green bg-green '>" +
              SourceObject.domain_authority +
              "</span> </td>";
          } else {
            elements +=
              "<td class='text-center'> " +
              "<span class='countt red bg-red '>" +
              SourceObject.domain_authority +
              "</span> </td>";
          }

          $("#backLinksTable tbody").append(
            "<tr><td><a href='//" +
              SourceObject.page +
              "' class='d-flex justify-content-start sourceLink text-elipses' title='" +
              SourceObject.page +
              " '  target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
              SourceObject.page +
              "</span></a></td>" +
              elements +
              "<td>" +
              "href</td><td><span class='anchorText' title='" +
              item.anchor_text +
              "'>" +
              (item.anchor_text == ""
                ? "Empty anchor text"
                : item.anchor_text) +
              "</span></td><td><a href='//" +
              TargetObject.page +
              "' class='targetLink' title='" +
              TargetObject.page +
              "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
              moment(item.date_first_seen).format("MMM DD, YYYY") +
              "</td><td>" +
              moment(item.date_last_seen).format("MMM DD, YYYY") +
              "</td></tr>"
          );
        });

        $("#lower-Range").text(lowerRange);
        $("#middle-Range").text(middleRange);
        $("#upper-Range").text(upperRange);
        $("#down-Range").text(downRange);

        AnchorTextjson.forEach(function (item) {
          AnchortextCount++;

          $(".loader").hide();
          $("#anchorTextTable tbody").append(
            "<tr><td><span class='d-flex justify-content-start'>" +
              (item.anchor_text == ""
                ? "Empty anchor text"
                : item.anchor_text) +
              "</span></td><td class='text-center'>" +
              numberWithCommas(item["external_pages"]) +
              "</td><td class='text-center'>" +
              numberWithCommas(item["external_root_domains"]) +
              "</td></tr>"
          );
        });

        //         $("#lower-click").click(function () {
        //           if (!$.fn.DataTable.isDataTable()) {
        //             $('#backLinksTable').DataTable().destroy();
        //           }

        //           $("#backLinksTable tbody").html("");
        //           json.forEach(function (item) {
        //             let SourceObject = item.source;
        //             let TargetObject = item.target;
        //             if(SourceObject.domain_authority >= 50 && SourceObject.domain_authority <= 60)
        //             {

        //             lowerRange++
        //             $("#backLinksTable tbody").append(
        //               "<tr><td><a href='//" +
        //                 SourceObject.page +
        //                 "' class='d-flex justify-content-start sourceLink text-elipses' title='" +
        //                 SourceObject.page +
        //                 " '  target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
        //                 SourceObject.page +
        //                 "</span></a></td><td class='text-center'>" +
        //                 SourceObject.domain_authority +
        //                 "</td><td>" +
        //                 "href</td><td><span class='anchorText' title='" +
        //                 item.anchor_text +
        //                 "'>" +
        //                 (item.anchor_text == ""
        //                   ? "Empty anchor text"
        //                   : item.anchor_text) +
        //                 "</span></td><td><a href='//" +
        //                 TargetObject.page +
        //                 "' class='targetLink' title='" +
        //                 TargetObject.page +
        //                 "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
        //                 moment(item.date_first_seen).format("MMM DD, YYYY") +
        //                 "</td><td>" +
        //                 moment(item.date_last_seen).format("MMM DD, YYYY") +
        //                 "</td></tr>"
        //             );
        //             }

        //           })

        //           setTimeout(() => {
        //             $('#backLinksTable').DataTable({
        //               dom: 'frtipB',
        //               pageLength: 3,
        //               "aaSorting": [],
        //               "bDestroy": true
        //             });
        //           },);
        //           });
        //           $("#middle-click").click(function () {
        //             if (!$.fn.DataTable.isDataTable()) {
        //               $('#backLinksTable').DataTable().destroy();
        //             }
        //             $("#backLinksTable tbody").html("");
        //             json.forEach(function (item) {
        //               let SourceObject = item.source;
        //               let TargetObject = item.target;
        //               if(SourceObject.domain_authority >= 61 && SourceObject.domain_authority <= 80)
        //               {

        //               middleRange++
        //               $("#backLinksTable tbody").append(
        //                 "<tr><td><a href='//" +
        //                   SourceObject.page +
        //                   "' class='d-flex justify-content-start sourceLink text-elipses' title='" +
        //                   SourceObject.page +
        //                   " '  target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
        //                   SourceObject.page +
        //                   "</span></a></td><td class='text-center'>" +
        //                   SourceObject.domain_authority +
        //                   "</td><td>" +
        //                   "href</td><td><span class='anchorText' title='" +
        //                   item.anchor_text +
        //                   "'>" +
        //                   (item.anchor_text == ""
        //                     ? "Empty anchor text"
        //                     : item.anchor_text) +
        //                   "</span></td><td><a href='//" +
        //                   TargetObject.page +
        //                   "' class='targetLink' title='" +
        //                   TargetObject.page +
        //                   "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
        //                   moment(item.date_first_seen).format("MMM DD, YYYY") +
        //                   "</td><td>" +
        //                   moment(item.date_last_seen).format("MMM DD, YYYY") +
        //                   "</td></tr>"
        //               );
        //               }

        //             })
        //             setTimeout(() => {
        //               $('#backLinksTable').DataTable({
        //                 dom: 'frtipB',
        //                 pageLength: 3,
        //                 "aaSorting": [],
        //                 "bDestroy": true
        //               });
        //             },);
        //             });
        //             $("#upper-click").click(function () {
        //               if (!$.fn.DataTable.isDataTable()) {
        //                 $('#backLinksTable').DataTable().destroy();
        //               }
        //               $("#backLinksTable tbody").html("");
        //           json.forEach(function (item) {
        //             let SourceObject = item.source;
        //             let TargetObject = item.target;
        //             if(SourceObject.domain_authority >= 81 && SourceObject.domain_authority <= 100)
        //             {

        //             upperRange++
        //             $("#backLinksTable tbody").append(
        //               "<tr><td><a href='//" +
        //                 SourceObject.page +
        //                 "' class='d-flex justify-content-start sourceLink text-elipses' title='" +
        //                 SourceObject.page +
        //                 " '  target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i><span class='text-primary ms-2'>" +
        //                 SourceObject.page +
        //                 "</span></a></td><td class='text-center'>" +
        //                 SourceObject.domain_authority +
        //                 "</td><td>" +
        //                 "href</td><td><span class='anchorText' title='" +
        //                 item.anchor_text +
        //                 "'>" +
        //                 (item.anchor_text == ""
        //                   ? "Empty anchor text"
        //                   : item.anchor_text) +
        //                 "</span></td><td><a href='//" +
        //                 TargetObject.page +
        //                 "' class='targetLink' title='" +
        //                 TargetObject.page +
        //                 "' target='_blank'><i class='fa fa-external-link' aria-hidden='true'></i></a></td><td>" +
        //                 moment(item.date_first_seen).format("MMM DD, YYYY") +
        //                 "</td><td>" +
        //                 moment(item.date_last_seen).format("MMM DD, YYYY") +
        //                 "</td></tr>"
        //             );
        //             }

        //             setTimeout(() => {
        //               $('#backLinksTable').DataTable({
        //                 dom: 'frtipB',
        //                 pageLength: 3,
        //                 "aaSorting": [],
        //                 "bDestroy": true
        //               });
        //             },);
        //           })
        //               });
        // $("#lower-Range").text(lowerRange)
        //         $("#middle-Range").text(middleRange)
        //         $("#upper-Range").text(upperRange)
        //         AnchorTextjson.forEach(function (item) {
        //           AnchortextCount++;

        //           $(".loader").hide()
        //           $("#anchorTextTable tbody").append(
        //             "<tr><td><span class='d-flex justify-content-start'>" +
        //               (item.anchor_text == ""
        //                 ? "Empty anchor text"
        //                 : item.anchor_text) +
        //               "</span></td><td class='text-center'>" +
        //               numberWithCommas(item["external_pages"]) +
        //               "</td><td class='text-center'>" +
        //               numberWithCommas(item["external_root_domains"]) +
        //               "</td></tr>"
        //           );
        //         });

        //  root_domains_to_root_domain  Referring domains
        var totalreferDomain =
          response["results"][0]["target"]["root_domains_to_root_domain"];
        var prevtotalreferDomain;
        if (response["previous_results"] != "") {
          prevtotalreferDomain =
            response["previous_results"][0]["target"][
              "root_domains_to_root_domain"
            ];
        } else {
          prevtotalreferDomain = totalreferDomain;
        }
        if (totalreferDomain > prevtotalreferDomain) {
          $(".referringDomains.changeIcon").html(
            '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
          );
          $(".referringDomains.changeDesc").html(
            '<span class="text-success">' +
              (totalreferDomain - prevtotalreferDomain) +
              "</span> more than previous month"
          );
        } else if (totalreferDomain < prevtotalreferDomain) {
          $(".referringDomains.changeIcon").html(
            '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
          );
          $(".referringDomains.changeDesc").html(
            '<span class="text-danger">' +
              (totalreferDomain - prevtotalreferDomain) +
              "</span> less than previous month"
          );
        } else {
          $(".referringDomains.changeIcon").html("");
          $(".referringDomains.changeDesc").html(
            "no change than previous month"
          );
        }

        $("#referringDomains").html("");
        $(".count_spinner").hide();
        $("#referringDomains").html(numberWithCommas(totalreferDomain));
        //external_pages_to_root_domain = Total Number of Backlinks
        var totalBackLinks =
          response["results"][0]["target"]["external_pages_to_root_domain"];
        var prevtotalBackLinks;
        if (response["previous_results"] != "") {
          prevtotalBackLinks =
            response["previous_results"][0]["target"][
              "external_pages_to_root_domain"
            ];
        } else {
          prevtotalBackLinks = totalBackLinks;
        }

        $("#totalNumberOfBacklinks").html("");
        $(".count_spinner").hide();
        $("#totalNumberOfBacklinks").html(numberWithCommas(totalBackLinks));

        if (totalBackLinks > prevtotalBackLinks) {
          $(".totalBackLinks.changeIcon").html(
            '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>'
          );
          $(".totalBackLinks.changeDesc").html(
            '<span class="text-success">' +
              (totalBackLinks - prevtotalBackLinks) +
              "</span> more than previous month"
          );
        } else if (totalBackLinks < prevtotalBackLinks) {
          $(".totalBackLinks.changeIcon").html(
            '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>'
          );
          $(".totalBackLinks.changeDesc").html(
            '<span class="text-danger">' +
              (totalBackLinks - prevtotalBackLinks) +
              "</span> less than previous month"
          );
        } else {
          $(".totalBackLinks.changeIcon").html("");
          $(".totalBackLinks.changeDesc").html("no change than previous month");
        }

        var total_pages =
          response["results"][0]["target"]["pages_to_root_domain"];
        var total_nofollow =
          response["results"][0]["target"]["nofollow_pages_to_root_domain"];
        var total = total_nofollow / total_pages;
        var noFollow_per = Math.round(total * 100);
        var follow = Math.round(100 - noFollow_per);
        $(".count_spinner").hide();
        $("#follow").html(follow + "% ");

        $(".count_spinner").hide();
        $("#noFollow").html(noFollow_per + "% ");
      } else {
        ShowNoty(response.error, "error");
      }

      $(".backlinksCount").text(BacklinksCount);
      $(".anchorTextCount").text(AnchortextCount);
      $(".spammyBacklinksCount").text(SpammyBacklinksCount);
      $(document).trigger("function_a_complete");
    },
    error: function (response) {
      ShowNoty(response.error, "error");
    },
  });
});
