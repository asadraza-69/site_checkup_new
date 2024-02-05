var mainPageTitle = "";
var true_values = ["yes", "active", "no lock", "normal"];
var false_values = ["no", "inactive", "locked", "bar all calls"];
var info_values = ["info"];
var high_values = ["high"];
var medium_values = ["medium"];
var low_values = ["low"];
var unknown_values = ["unspecified"];
var SortBy= "";


function getAndRenderDynamicTable(url, table_id, tableParentDiv) {
    dynamicTable_url = url;
    dynamicTable_id = table_id;
    tableDiv = $("#" + tableParentDiv);

    $.ajax({
        url: url,
        method: "GET",
        success: function(response) {
            // var response = {"page_lis_title": "FeeGroup", "headers": ["", "Group Name", "Classes", "Late Fees", "Template", "Fee Types", "Bank", "Course Assigned", "Custom", "Status", "Action"], "page_title": "Fee Group", "data": [[["", ""], ["group 1", "35"], [[["bits-g - bscs > 2 semester", 26]], ["modal", "section"]], ["Default", ""], ["Default", ""], [[["security deposit", ""], ["admission fees", ""], ["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=35", "Edit", ""], [35, "Generate Voucher", "edit"]], "action"]], [["", ""], ["Applied Physics-Semester 2", "37"], [[["bits-g - applied physics > 2 semester", 30]], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[["security deposit", ""], ["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Meezan Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=37", "Edit", ""], [37, "Generate Voucher", "edit"]], "action"]], [["", ""], ["default custom group", "36"], [[], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["True", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=36", "Edit", ""]], "action"]], [["", ""], ["G1", "38"], [[["bits-g - XI - Ninth > XI - A", 57]], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[["admission fees", ""], ["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=38", "Edit", ""], [38, "Generate Voucher", "edit"]], "action"]], [["", ""], ["Bs(CS) Semester 1", "40"], [[["bits-g - bscs > 1 semester", 25]], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[["security deposit", ""], ["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=40", "Edit", ""], [40, "Generate Voucher", "edit"]], "action"]], [["", ""], ["Secondary", "39"], [[["bits-g - bsse > 2 semester", 28], ["bits-g - applied physics > 1 semester", 29]], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=39", "Edit", ""], [39, "Generate Voucher", "edit"]], "action"]], [["", ""], ["Secondary1", "44"], [[["bits-n - SCI 1 > SCI SEC 1", 51]], ["modal", "section"]], ["After 15 days", ""], ["Default", ""], [[["lab fees", ""], ["tuition fees", ""]], ["modal", "Feetype"], [{"timetable": false}]], ["Faysal Bank", ""], ["False", ""], ["False", ""], ["True", ""], [[["/fms/create_update_feegroup/?id=44", "Edit", ""], [44, "Generate Voucher", "edit"]], "action"]]], "model_name": "FeeGroup"}
            if (response.status == true) {
                renderDynamicTable(response, table_id, "true", tableDiv);
                // console.log(response, table_id,tableDiv);
            } else {
                // ShowNoty("Something went wrong!", "error");
                tableDiv.html(
                    "<h5> <strong> Sorry </strong> <span> No Data Found ! </span> </h5>"
                );
            }
        },
        error: function(error) {
            $(".spinner.loading").remove();
            tableDiv.html(
                "<h5> <strong> Sorry </strong> <span> No Data Found ! </span> </h5>"
            );
        },
    });
}

function renderDynamicTable(response, table_id, extras = true, tableDiv) {
    // response = '{"status": true, "headers": ["Project ID", "Website Name", "Website URL", "Location", "Created On", "Action"], "data": [[[69, ""], ["jumpto1", ""], ["https://jumpto1.com/", ""], ["United States / English", ""], ["2021-11-24 11:10:31", ""], [[["/research_keyword/competitors/?project_id=69", "Competitors Analysis", ""], ["/research_keyword/keyword_freq_analysis_list/?project_id=69", "Keyword Frequency Analysis", ""], ["/research_keyword/get_project_competitor/?project_id=69", "View Competitors", ""], ["/research_keyword/get_project_keywords/?project_id=69", "View keywords", ""], ["69", "Edit Project", ""]], "action"]]], "page_title": "Projects"}'
    // response = '{"status": true, "headers": ["Project ID", "Website Name", "Website URL", "Location", "Created On", "Action"], "data": [[[69, ""], ["jumpto1", ""], ["https://jumpto1.com/", ""], ["United States / English", ""], ["2021-11-24 11:10:31", ""], ["<div class="btn-group"> <a class="px-3" href="#" type="button"  data-bs-toggle="dropdown" aria-expanded="false">  <i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a>  <ul class="menu dropdown-menu dropdown-menu-end"> </ul> </div>",""], "page_title": "Projects"}'

    $(tableDiv[0]).css("min-height", "650px");
    if (response.app_label) {
        var appName = response.app_label;
    } else {
        var appName = urlParse()[1];
    }
    if (response.button_title) {
        var buttonTitle = response.button_title;
    } else if (response.page_list_title) {
        var buttonTitle = response.page_list_title.split(" ")[0];
        mainPageTitle = buttonTitle;
    }
    var table_app_html;
    if (extras) {
        table_app_html =
            "" +
            '<div class="breadcrums">' +
            '<ul id="page_breadcrums"></ul>' +
            "</div>" +
            '<div class="page_header">' +
            "<h4>" +
            '<span class="pageTitle"></span>' +
            '<small class="pageListTitle"></small>' +
            "</h4>" +
            '<button class="btn btn-sm btn-theme ' +
            table_id +
            'Btn searchBarToggle float-end" data-bs-toggle="tooltip" data-bs-placement="top" title="Advance table options" data-position="left center" data-id="' +
            table_id +
            '"><i class="fa fa-sliders" aria-hidden="true"></i></button>' +
            '<button class="btn btn-sm btn-theme labeled modelFormTrigger float-end" data-name="' +
            buttonTitle +
            '" data-model_name="' +
            response.model_name +
            '" data-app_name="' +
            appName +
            '"  data-status="create"><i class="fa fa-plus-square" aria-hidden="true"></i> Create ' +
            buttonTitle +
            "</button>" +
            "</div>" +
            '<div class="table-container ui form mini list_viewTable_container">' +
            '<input type="search" id="searchInput" style="width:250px; float:right" class="form-control form-control-sm mb-2 " placeholder="Search" aria-controls="example">' +
            '<table id="' +
            table_id +
            '" class="table list_viewTable table-md ba-table"></table>' +
            "</div>";
    } else {
        table_app_html =
            "" +
            '<div class="table-container ui form mini list_viewTable_container">' +
            '<table id="' +
            table_id +
            '" class="table list_viewTable table-md"></table>' +
            "</div>";
    }
    tableDiv.html(table_app_html),createDynamicDataTable(response.data,response.headers,table_id,appName,response.model_name);var parent=tableDiv[0].id;// console.log(parent + " table_idtable_idtable_idtable_id");
    $("#" + parent + " .spinner.loading").remove();
    $("#" + parent + " .pageTitle").html(response.page_title);
    $("#" + parent + " .pageListTitle").html(response.page_list_title);
    var breadcrumList = response.breadcrums; // Temp List
    if (breadcrumList) {
        var htmlList = "";
        $.each(breadcrumList, function(index, value) {
            if (value[1].length) {
                htmlList += '<li><a href="' + value[1] + '">' + value[0] + "</a></li>";
            } else {
                htmlList += '<li class="breadCrum-nolink"><a>' + value[0] + "</a></li>";
            }
        });
        $("#page_breadcrums").html(htmlList);
    }
}

var oTable = {};
var no_sort=[];
var IDColumn =[];
var ActionIndex =[];
var CheckBoxIndex =[];
function createDynamicDataTable(
    data_set,    
    headers,
    table_id,
    getAppName,
    getModelName
) {
 
    this.headers = headers;
    this.data_set = data_set;
    this.table_id = table_id;
    $("#" + table_id).show();
    var headerDict = [];
    var headerDictExport = [];
    $.each(headers, function(index, value) {
         if (value == "Select All Checkbox") {
            headerDict.push({ title: "<span class='selectall'>Select All</span><input type='checkbox' class='SelectAll' />" });
            no_sort.push(index);
            CheckBoxIndex.push(index);
        } else {
            headerDict.push({ title: value });
        }
        if (value != "Action" && value != "Select All Checkbox") {
            headerDictExport.push(index);
        }
        if (value == "Action") {
            no_sort.push(index);
            ActionIndex.push(index);
        }
        if (value == "Volume" || value == "Count"|| value == "count" || value == "Avg. monthly searches") {
            SortBy = index;
        }
        if (value == "Project ID" || value == "ID") {
            IDColumn.push(index);
        }
    });

    var buttonArray = {
        edit: ["green", "write"],
        view: ["blue", "zoom"],
        delete: ["red", "remove"],
    };
    var that = this;
 
    setTimeout(() => {
      //initializing DataTable
     var table= oTable[table_id] = $("#" + this.table_id).DataTable({
      destroy: true,
      columns: headerDict,
      data: this.data_set,
      searching:true,
      pageLength: 10,
      // dom: 'Bfrtip',
      order: [],
      bSortClasses: false,
      // buttons: [
      //   {
      //     extend: "collection",
      //     text: '<i class="fa fa-download" aria-hidden="true"></i> Export',
      //     className: "btn btn-sm  btn-theme",
      //     buttons: [
      //       {
      //         extend: "excelHtml5",

      //         className: "btn btn-sm  btn-theme",
      //         text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel',
      //         titleAttr: "Excel",
      //         exportOptions: {
      //           columns: headerDictExport,
      //         },
      //       },
      //       {
      //         extend: "pdfHtml5",
      //         className: "btn btn-sm  btn-theme",
      //         text: '<i class="fa fa-file-pdf-o"></i> PDF',
      //         titleAttr: "PDF",
      //         exportOptions: {
      //           columns: headerDictExport,
      //         },
      //       },
      //       {
      //         extend: "csvHtml5",
      //         className: "btn btn-sm  btn-theme",
      //         text: '<i class="fa fa-upload" aria-hidden="true"></i> Export',
      //         titleAttr: "CSV",
      //         exportOptions: {
      //           columns: headerDictExport,
      //         },
      //       },
      //     ],
      //   },
      // ],
      autoWidth: true,
      lengthChange: false,
      deferRender: true,
      lengthMenu: [
        [10, 25, 50, 100, 500, 1000],
        [10, 25, 50, 100, 500, 1000],
      ],
      fixedHeader: { 
        "header": true, 
        "footer": false 
        },
      // "pagingType": "listbox",
      columnDefs: [
          {targets: ActionIndex,
            render: function (data, type, row, meta){
              e = data;
            
              if ("action" == e[1]) {
                  var i = ('<div class="btn-group"> <a class="px-3" href="#" type="button"  data-bs-toggle="dropdown" aria-expanded="false">  <i class="custom-bg fa fa-ellipsis-h icon-color"  aria-hidden="true"></i> </a>  <ul class="menu dropdown-menu dropdown-menu-end"> </ul> </div>');
                    }
                    return i;
                },
          createdCell: function(td, cellData, rowData, row, col) {
              $(td).addClass("text-center");
              var e = cellData;
              if ("action" == e[1]) {
                  var i = '';
                  
                  $.each(e[0], function (t, a) {
                      var e = a[0],s = a[1],o = a[2];
                  //  /^\/?([^:\/\s]+)(:([^\/]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/m.test(e)
                  // i += "edit" == o ? '<li><a class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '" data-name="' + mainPageTitle + '" data-url="' + e + '" data-model_name="' + getModelName + '" data-app_name="' + getAppName + '" data-status="edit" >' + s + "</a></li>" : "url" == o ? '<li><a href="' + e + '" data-id="' + e + '" data-action="' + (o || s.toLowerCase().replace(/ /g, "_")) + '" class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '" >' + s + "</a></li>" : '<li><a href="#" data-id="' + e + '" data-action="' + (o || s.toLowerCase().replace(/ /g, "_")) + '" class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '">' + s + "</a></li>"
                  /^\/?([^:\/\s]+)(:([^\/]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/m.test(e) && (o = "url"), i += "edit" == o ? '<li><a class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '" data-name="' + mainPageTitle + '" data-url="' + e + '" data-model_name="' + getModelName + '" data-app_name="' + getAppName + '" data-status="edit" >' + s + "</a></li>" : "url" == o ? '<li><a href="' + e + '" data-id="' + e + '" data-action="' + (o || s.toLowerCase().replace(/ /g, "_")) + '" class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '" >' + s + "</a></li>" : '<li><a href="#" data-id="' + e + '" data-action="' + (o || s.toLowerCase().replace(/ /g, "_")) + '" class="dropdown-item" data-nametrigger="' + mainPageTitle.toLowerCase().replace(/ /g, "_") + '">' + s + "</a></li>"
                  
                  });
                 
                  // $(this).addClass("text-center"),
                   $(td).find(".btn-group").find(".dropdown-menu").html(i)
                   "" != i ? $(td).find(".btn-group").find(".dropdown-menu").html(i) : ($(td).find(".btn-group a").css("cursor", "not-allowed"), $(td).find(".btn-group").find(".dropdown-menu").hide()), $(td).width("5")
              } else if ("modal" == e[1][0]) {
                  if ($(td).parents("table").find("thead:first").find("th:eq(" + t + ")").addClass("text-center"), e[0].length) var s = '<button class="ui blue circular icon button dynamicTableColumnModal" data-bs-toggle="tooltip" data-bs-placement="top" data-tooltip="' + e[1][1].toSentenceCase() + ' List" title="' + e[1][1].toSentenceCase() + ' List" data-inverted="" data-modalname="' + e[1][1] + '"> <i class="list icon"></i> </button>';
                  else s = '<button class="ui circular icon button" data-bs-toggle="tooltip" data-bs-placement="top" data-tooltip="No ' + e[1][1].toSentenceCase() + ' Found" title="No ' + e[1][1].toSentenceCase() + ' Found" data-inverted="" data-modalname="' + e[1][1] + '"> <i class="list icon"></i> </button>';
                  $(td).addClass("text-center").width("120").html(s)
              } 
              $(".ui.dropdown").dropdown(); 
              
          }
              
           
          
      },
           { targets: no_sort, orderable: false, width: "50px" },
        { targets: IDColumn, width: "100px" },
        {
            targets: CheckBoxIndex,
            orderable: false,
            render: function (data, type, full, meta) {
                
              return data[0];
            },
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).attr("data-id", cellData[1]);
              var e = cellData;
               "Checkbox" === e[0] && ($(td).html("<input type='checkbox' class='Checkbox'/><span class='tr-button'></span><td class='CheckboxTd'>"), $(td).addClass("CheckboxTd text-center"))
               
            },
            
          },
        {
          targets: "_all",
          orderable: true,
          render: function (data, type, full, meta) {
              
            return data[0];
          },
          createdCell: function (td, cellData, rowData, row, col) {
            var wordCountLimit = "";
               var overheadClass = "";

            if (cellData.length) {
                var columnsCounts = cellData[0].length;

                if (columnsCounts <= 5) {
                    var overheadClass = "";
                    wordCountLimit = 200;
                } else if (columnsCounts > 8 && wordCountLimit < 11) {
                    var overheadClass = "";
                    wordCountLimit = 22;
                } else if (columnsCounts > 10) {
                    var overheadClass = "";
                    wordCountLimit = 14;
                }
            }

            $(td).attr("data-id", cellData[1]);
            var e = cellData;
                var o = tooltipVal = e[0];
                e[0].length > wordCountLimit && $(td).html('<div data-position="right center" data-inverted=""  data-bs-toggle="tooltip" data-bs-placement="top" data-tooltip="' + tooltipVal + '" title="' + tooltipVal + '"><span class="overhead ' + overheadClass + '" >' + o + "</span></div>"), isNaN(o) || (Number.isInteger(o), $(td).html(Number(o))), isNaN(e[0]) && (Array.isArray(e[0]) || (-1 != $.inArray(e[0].toLowerCase(), true_values) && $(td).html('<i class="fa fa-check-circle text-success" aria-hidden="true"></i>').addClass("text-center"), -1 != $.inArray(e[0].toLowerCase(), false_values) && $(td).html('<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>').addClass("text-center"), -1 != $.inArray(e[0].toLowerCase(), info_values) && $(td).html('<i class="fa fa-info-circle text-info" aria-hidden="true"></i>').addClass("text-center").attr({
                    title: e[0],
                    "data-tooltip": e[0],
                    "data-position": "bottom center",
                    "text-align": "left"
                }), -1 != $.inArray(e[0].toLowerCase(), high_values) && $(td).html(e[0]).attr({
                    title: e[0],
                    "data-tooltip": e[0],
                    "data-position": "bottom center"
                }), -1 != $.inArray(e[0].toLowerCase(), medium_values) && $(td).html(e[0]).attr({
                    title: e[0],
                    "data-tooltip": e[0],
                    "data-position": "bottom center"
                }), -1 != $.inArray(e[0].toLowerCase(), low_values) && $(td).html(e[0]).attr({
                    title: e[0],
                    "data-tooltip": e[0],
                    "data-position": "bottom center"
                }), -1 != $.inArray(e[0].toLowerCase(), unknown_values) && $(td).html(e[0]).attr({
                    title: e[0],
                    "data-tooltip": e[0],
                    "data-position": "bottom center"
                })))
               
          },
          
        },
        
      ],    
      drawCallback: function() {
           
               
        responsiveTable($("#" + table_id).parent());
        $('tbody tr').each( function () { 
          $(this).children('td').filter(function() {
              return this.innerHTML.match(/^[0-9\s\.,]+$/);
          }).css('text-align','right');
        
        
      });
       
    },
      initComplete: function (settings, json) {
        responsiveTable($("#" + table_id).parent())
        
        $("#" + table_id + "Modal").remove();
        var filters_header = "<tr>";
        $(settings.nTHead)
          .find("th")
          .each(function (index, el) {
            filters_header += "<th>" + $(el).text() + "</th>";
          });
        filters_header += "</tr>";
        $(settings.nTHead)
          .parent()
          .find("." + that.table_id + "_filters")
          .remove();
        $(settings.nTHead).after(
          '<thead class="' +
            that.table_id +
            '_filters filters-head hide ui form">' +
            filters_header +
            "</thead>"
        );

        $("#" + table_id + " ." + table_id + "_filters th").each(function () {
          var title = $(this).text();
          // console.log(title + " title Header")
          if (
            title == "Action" ||
            title == "" ||
            title == "Select All Checkbox" ||
            title == "Select All"
          ) {
            $(this).html("");
          } else if (
            title == "Playback Status" ||
            title == "Hot Target" ||
            title == "Is Active" ||
            title == "User Status"
          ) {
            $(this).html(`<select>
                    <option value="">All</option>
                    <option value="true">Active</option>
                    <option value="false">In Active</option>
                    </select>`);
          } else {
            $(this).html(
              '<div class="form-group mb-0"><input type="text" class="form-control form-control-sm" placeholder="&#xF002; ' +
                title +
                '" title="Search ' +
                title +
                '" style="font-family:Rubik,Arial, FontAwesome;" /><span class="ui small loader"></span><i class="fa fa-remove"></i></div>'
            );
          }
        });
        // Add Advance Filter Button

        var advFilterBtn =
          '<div><a id="' +
          that.table_id +
          '_toggle_filter" class="btn btn-sm  btn-theme toggle_filter" title="Filter"><i class="fa fa-filter" aria-hidden="true"></i></a></div>';
        var searchField =
          '<div id="' +
          that.table_id +
          '_datatable-search-ui"><span id="' +
          that.table_id +
          '_input_field_cont" style="display:none;"><input class="animated form-control form-control-sm" id="' +
          that.table_id +
          '_search_field" placeholder="Search"></span><a id="' +
          that.table_id +
          '_toggle_search" class="btn btn-sm btn-theme toggle_search"><i class="fa fa-search" aria-hidden="true"></i></a></div>';

        $(settings.nTableWrapper)
          .find("#" + that.table_id + "_toggle_filter")
          .remove();
        $(settings.nTableWrapper)
          .find("#" + that.table_id + "_filter")
          .html(searchField + advFilterBtn);

        // Add Advance Filter Button Click Function
        $("#" + table_id + "_toggle_search").click(function () {
          $("#" + table_id + "_input_field_cont")
            .show()
            .removeClass("fadeOut")
            .addClass("animated fadeIn");
          $("#" + table_id + "_input_field_cont")
            .find("i.fa-search")
            .animate(
              {
                left: 10,
              },
              500,
              function () {
                $(this)
                  .parent()
                  .find("input")
                  .attr("placeholder", "Search ...")
                  .focus();
              }
            );
        });
        $("#" + table_id + "_input_field_cont")
          .find("input")
          .blur(function () {
            var thisValue = $(this).val();
            if (!thisValue) {
              $("#" + table_id + "_input_field_cont")
                .find("i.fa-search")
                .removeAttr("style");
              $("#" + table_id + "_input_field_cont")
                .find("i.fa-search")
                .animate(
                  {
                    right: 5,
                  },
                  500,
                  function () {}
                );
              // $(this).parent().find('input').removeAttr('placeholder')
              $("#" + table_id + "_input_field_cont")
                .removeClass("fadeIn")
                .addClass("animated fadeOut")
                .hide();
            }
          });
        $("#" + table_id + "_input_field_cont")
          .find("input")
          .keyup(function () {
            oTable[table_id].search($(this).val()).draw(false);
          });

        // dataTables_length
        // dataTables_filter
        var dataId = $(".searchBarToggle").attr("data-id");
        $("#" + dataId + "_filter, #" + dataId + "_length");
        // $('#'+that.table_id+'_filter, #'+that.table_id+'_length').slideUp();
        $("." + table_id + "Btn.searchBarToggle").on("click", function () {
          var $this = $(this);
          var dataId = $this.attr("data-id");
          var hasClass = $("#" + dataId + "_filter").hasClass("active");
          if (hasClass) {
            $("#" + dataId + "_filter, #" + dataId + "_length").removeClass(
              "active"
            );
            $(".dt-buttons").removeClass("active");
          } else {
            $("#" + dataId + "_filter, #" + dataId + "_length").addClass(
              "active"
            );
            $(".dt-buttons").addClass("active");
          }
        });

        var dynamicTableColumnModal_HTML =
          "" +
          '<div class="ui modal small border_radius" id="' +
          table_id +
          'Modal">' +
          '<i class="fa fa-remove"></i>' +
          '<div class="header" id="dynamicTableModal_header"></div>' +
          '<div class="content">' +
          '<div class="search_dynamicTableModal_Field">' +
          '<div class="ui form">' +
          '<div class="form-group mb-0">' +
          '<input type="text" class="form-control form-control-sm" id="search_dynamicTableModal_List_Input" placeholder="">' +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="dynamicTableModal_listContainer">' +
          '<ul id="dynamicTableModal_ListTag"></ul>' +
          "</div>" +
          "</div>" +
          "</div>";

        tableDiv.find("#" + table_id + "Modal").remove();
        tableDiv.append(dynamicTableColumnModal_HTML);

        tableWrapOverlapContainer();

        $(window).resize(function () {
          tableWrapOverlapContainer();
        });

        function tableWrapOverlapContainer() {
          var tableWidth = $("#" + that.table_id + "").width();
          var tableAppWidth = tableDiv.width() + 20;
          $(".tableOuterOverlap").removeClass("table_overlaping");
          if (tableWidth > tableAppWidth) {
            if (!$(".tableOuterOverlap").length) {
              $("#" + that.table_id + "").wrap(
                '<div class="tableOuterOverlap"></div>'
              );
            }
            $(".tableOuterOverlap").addClass("table_overlaping");
          }
        }
        var tableWidth = $("#" + that.table_id).width;
      },
    });

    $('#searchInput').on('keyup', function() {
      table.search(this.value).draw();
    });
   
  })

   
    $('#'+table_id).on( 'order.dt', function () {

       $('tbody tr').each( function () { 
                        $(this).children('td').filter(function() {
                            return this.innerHTML.match(/^[0-9\s\.,]+$/);
                        }).css('text-align','right');
                      
                      
                    });

      // This will show: "Ordering on column 1 (asc)", for example
      // var order = oTable[table_id].order();
      // console.log( 'Ordering on column '+order[0][0]+' ('+order[0][1]+')' );
  } );
  
    $("#columnFunction").click(function () {
          var checkboxes = $("#chooseColumns").find($(".form-check-input:not(:checked)"))
          var checkboxesChecked = $("#chooseColumns").find($(".form-check-input:is(:checked)"))
          
      // console.log(checkboxes)
      // Get the column API object
 
      for (let element of checkboxesChecked) {
  
        let item = ($(element).attr('data-column'))
  
        console.log(headers, ' headers',item)
        var columnNo = (headers.indexOf(item))
       var column = oTable[table_id].column(columnNo);
       // Toggle the visibility
        column.visible(true);
        $("#chooseData").find(".btn-close").trigger('click');
        oTable[table_id].columns.adjust().draw( false )
      }
      for (let element of checkboxes) {
        
        let item = ($(element).attr('data-column'))

         console.log(headers, ' headers',item)
         var columnNo = (headers.indexOf(item))
        var column = oTable[table_id].column(columnNo);
        // Toggle the visibility
        column.visible(false);
        $("#chooseData").find(".btn-close").trigger('click');
        oTable[table_id].columns.adjust().draw( false )
    }
   
      // Toggle the visibility
     
  });


    // oTable[table_id].buttons().container().appendTo("#" + this.table_id + "_filter");

if(SortBy != ""){
    
    oTable[table_id].order( [SortBy, 'desc' ] ).draw();
}
 
    // Apply the search
    var timer,$searchInput = $(
            "#" + table_id + " input[type=text], #" + table_id + " select"
        ),
        $loaders = $searchInput.parent().find(".ui.loader");

    $searchInput.on("keyup change", function(e) {
        var table = $(e.target).closest("table");
        var firstCol = table.find("th:first-child input:checkbox").length;

        var $this = $(this),
            thisVal = $this.val(),
            $loader = $this.parent().find(".ui.loader");
        // if (firstCol > 0) {
        //     idx = $this.closest("th").prev("th").index();
        // } else {
        //     idx = $this.closest("th").index();
        // }
        idx = $this.closest("th").index();
        $loader.addClass("active");

        if (thisVal) {
            // console.log((oTable[table_id]).column(idx).search(thisVal));

            oTable[table_id].column(idx).search(thisVal).draw();
            $loaders.removeClass("active");
        } else {
            oTable[table_id].column(idx).search("").draw();
            $loaders.removeClass("active");
        }
    });

    $searchInput.on("keydown change", function() {
        clearTimeout(timer);
    });

    // Clear column filter fields
    $(".fa-remove").click(function(event) {
        $(this).parent().find("input:text").val("");
        $(this).parent().find("input:text").trigger("keyup");
    });
    $(".toggle_filter").unbind().click(function() {
            var table_id = $(this).closest(".dataTables_wrapper").find(".table").attr("id");
            console.log(table_id);
            $("." + table_id + "_filters").toggleClass("hide");
            $("." + table_id + "_filters").find("input").val("");
            $(".fa-remove").trigger("click");
            oTable[table_id].search("").draw(false);
        });

    var $dynamicTableModal = $("#dynamicTableModal");
    tableDiv.off("click").on("click", ".dynamicTableColumnModal", function() {
        var $cellNode = $(this).parents("td:first");
        var cellData = oTable[table_id].cell($cellNode).data();
        var listOfValues = cellData[0];
        var timeTableCheck = cellData[2];
        var modalName = cellData[1][1];
        var timeTableToolTip = true;
        var dateFormat = "MMM dd, yyyy";
        if (modalName == "months") {
            dateFormat = "MMM yyyy";
        }
        if (timeTableCheck) {
            // console.log('timeTableCheck', timeTableCheck, timeTableCheck[0]["timetable"])
            timeTableToolTip = timeTableCheck[0]["timetable"];
        }

        $("#dynamicTableModal_header").html(modalName.toSentenceCase() + " List");

        $("#search_dynamicTableModal_List_Input")
            .attr("placeholder", "Search " + modalName.toSentenceCase())
            .val("");

        var listOfValues_HTML = "";
        $.each(listOfValues, function(index, value) {
            if (timeTableToolTip) {
                // console.log('timeTableCheck',timeTableToolTip)
                listOfValues_HTML +=
                    '<li data-name="' +
                    value[0].toLowerCase() +
                    '" data-id="' +
                    value[1] +
                    '" data-inverted="" data-bs-toggle="tooltip" data-bs-placement="top" data-tooltip="' +
                    value[0] +
                    '" title="' +
                    value[0] +
                    '"><a>' +
                    value[0] +
                    "</a></li>";
            } else {
                var textValue = value[0];
                if (moment(value[0]).isValid() && isNaN(value[0])) {
                    if (Date.parse(value[0])) {
                        var colValue = Date.parse(value[0]).toString(dateFormat);
                        textValue = colValue;
                    }
                }
                listOfValues_HTML +=
                    '<li data-name="' +
                    textValue.toLowerCase() +
                    '" data-id="' +
                    value[1] +
                    '" data-inverted="" ><span title="' +
                    textValue +
                    '">' +
                    textValue +
                    "</span></li>";
            }
        });

        $("#dynamicTableModal_ListTag").html(listOfValues_HTML);
        $dynamicTableModal.modal("show");
    });
    $("body").on("keyup", "#search_dynamicTableModal_List_Input", function() {
        var thisValue = $(this).val();
        if (thisValue) {
            $("#dynamicTableModal_ListTag").find("li").hide();
            $("#dynamicTableModal_ListTag")
                .find('li[data-name*="' + thisValue.toLowerCase() + '"]')
                .show();
        } else {
            $("#dynamicTableModal_ListTag").find("li").show();
        }
    });
}

var format = "hh:mm:ss";
