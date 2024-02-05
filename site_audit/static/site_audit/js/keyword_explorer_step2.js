$( document ).ready(function() {
    Get_country_languages();
   
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



$('#SearchKeyWord').submit(function(event) {
    $(".loader").show()
     $("#monthlyVolume").html('<div class="loader"> <div class="spinner-border text-primary spinner-border-sm web_spinner  mt-1 mr-1" role="status"> <span class="visually-hidden">Loading...</span></div><div></div><div></div><div></div></div>');
    $("#rankingDifficulty").html('<div class="loader"><div class="spinner-border text-primary spinner-border-sm web_spinner  mt-1 mr-1" role="status"> <span class="visually-hidden">Loading...</span></div><div></div><div></div><div></div></div>');
     $("#costPerClick").html('<div class="loader"><div class="spinner-border text-primary spinner-border-sm web_spinner  mt-1 mr-1" role="status"> <span class="visually-hidden">Loading...</span></div><div></div><div></div><div></div></div>');
     
     $("#tableApp").css('display','none')
     $(".loaderr").html("")
    $(".loaderr").html('<div class="loader"><div class="spinner-border text-primary mt-5 mr-1" role="status"> <span class="visually-hidden">Loading...</span></div></div>');

    

     $(".keywords-total-counts").html(' <span class="spinner-border text-primary spinner-border-sm web_spinner  mt-1 mr-1" role="status"> <span class="visually-hidden">Loading...</span></span>');
     $(".web_spinner").show()
     $('#dynamicTable').css('display','none');
     $("#dynamicTable_paginate").hide()
    // $("#monthlyVolume").empty()
    // $('#rankingDifficulty').empty()
    // $("#costPerClick").empty()
    // $("#dynamicTable").empty()

    
    
    $(".website").html('')
    var keyCode = $('.Keyword').val();
    // keyCode = keyCode.replace('#',' ');
    keyCode = keyCode.replace('$',' ');
    keyCode = keyCode.replace(',',' ');
    
    $("#keyErrors").html("");
    var regex = /^[/\s[(.?)\]/{}".A-Za-z0-9]*$/;
    var isValid = regex.test(keyCode);

    // if (!isValid) {
    //      $("#keyErrors").html("Keyword contain non-standard characters like: \!@%*+;#");
    //      return false;
    // }

        event.preventDefault();
        var dataString = $("#SearchKeyWord").serialize();
         // let Keyword = $(".Keyword").val();
      
     let Country = $(".CountrySelect").val();

     // let SearchedWord = { 'Keyword': Keyword, 'country': Country }; //store a key/value
        // localStorage.setItem('SearchedWord', JSON.stringify(SearchedWord)); //stringify object and store
        
        $.ajax({
            url: '/site_audit/keyword_data_listview/?keyword='+keyCode+'&country='+Country,
            method: 'GET',
               // data: dataString,
            success: function(response) {
    
                // $("#costPerClick .loader").hide()
                // $("#rankingDifficulty .loader").hide()
                // $("#monthlyVolume .loader").hide()

                if (response.status) {
                    $("#ActionBtn").empty();

                    var arr = response.keyword_data.listview_data;

                   var Headers = response.headers;
                    var searchVolume = response.keyword_data.monthly_volume;
                    var rankingDifficulty = response.keyword_data.ranking_difficulty;
                    var costPerClick = response.keyword_data.cost_per_click;
                   
                    $("#monthlyVolume").html(numberWithCommas(searchVolume));
                    $("#rankingDifficulty").html(rankingDifficulty);
                    $("#costPerClick").html(costPerClick);

                    $(".web_spinner").hide()
                    $(".website").html(response.keyword_data.keyword)
                    $('.hideTable').css('display','block');

                    $(".total_spinner").hide()
                 $('.keywords-total-counts').html(response.data.length)
                  // getAndRenderDynamicTable('../../research_keyword/keyword_data_listview/', 'dynamicTable');

                    $(".loader").hide()
                    $("#tableApp").css("display", "block")
                    renderDynamicTable(response, 'dynamicTable', extras = true, tableDiv = $('#tableApp'));

                    $('tbody tr').each( function () { 
                        $(this).children('td:gt(0)').filter(function() {
                            return this.innerHTML.match(/^[0-9\s\.,]+$/);
                        }).css('text-align','right');
                        
                      
                    });

                        // $("#keywordIdeas").empty();
    
                    // $("#keywordIdeas").append(
                    //   "<table class='table table-striped'><thead><tr class='table-dark'></tr></thead><tbody></tbody></table>"
                    // );
                    // var thead = arr[0];
                    // jQuery.each(thead, function (i, val) {
                    //   $("#keywordIdeas table thead tr").append(
                    //     '<th class="' + i + '_th">' + i + "</th>"
                    //   );
                    // });
    
                    // for (var key of Object.keys(arr)) {
                    //   var arr2 = arr[key];
    
                    //   $("#keywordIdeas table tbody").append(
                    //     "<tr><td>" +
                    //       arr2.keyword +
                    //       '</td><td class="sparkbar chart_' +
                    //       [key] +
                    //       '"></td><td>' +
                    //       arr2.volume +
                    //       "</td><td>" +
                    //       arr2.cpc +
                    //       "</td></tr>"
                    //   );
                    //   var objc = arr2.trend;
    
                    //   var sparkValues = Object.values(objc);
    
                    //   $(".chart_" + [key]).sparkline(sparkValues, {
                    //     type: "bar",
                    //     barWidth: 5,
                    //     barSpacing: 2,
                    //     fillColor: "",
                    //     lineColor: "ccc",
                    //     tooltipSuffix: "",
                    //     width: 100,
                    //     height: "30",
                    //     barColor: "#e5e5e5",
                    //     negBarColor: "333",
                    //     stackedBarColor: ["ff0", "9f0", "999", "f60"],
                    //     sliceColors: ["ff0", "9f0", "000", "f60"],
                    //     offset: "30",
                    //     borderWidth: 1,
                    //     borderColor: "ccc",
                    //   });
                    // }
    
                    // ShowNoty("success!", "error");
    
                    // GetServiceCharges();
                   
                } 
                else {

                    if(response.limits_error) {
                        $("#upgradeSub").modal('show')
                        $("#sidebarMenu").css("z-index",'10000')
                        $('#main-navbar').css("z-index",'99999')
                        $('main').css('opacity', '0.07')
                    }else{
                        ShowNoty(response.error,'error')
                    }
                    $('#tableApp').css("display", "block").html(
                        "<h5 class='text-center'> <strong> Sorry </strong> <span> No Data Found ! </span> </h5>"
                    );
                    $(".web_spinner, .loader").hide()
                    $(".summary-metric__value").addClass("text-center").html('-')
                   // ShowNoty(response.error, "error");
                    $('.SearchKeyword').on('click', function() {
                        $("#upgrade_subscription").modal('show')
                    })
                   
                }
            },
            error: function(response) {
                ShowNoty(response.error, "error");
            },
        });
    })
    $(document).on("click",".link-monthly-volume",function() {
        $('#dictionary').modal('show');
        openTab('', 'MonthlyVolume');
        
    });
    $(document).on("click",".link-ranking-difficulty",function() {
        $('#dictionary').modal('show');
        openTab('', 'RankingDifficulty');
       
    });
    $(document).on("click",".link-cost-per-click",function() {
        $('#dictionary').modal('show');
        openTab('', 'CPC');
      
    });

    function Get_country_languages() {
        $.ajax({
            type: "GET",
            url: "/user_management/get_country_languages/",
    
            success: function(response) {
                if (response.status) {
    
                    $('.CountrySelect').empty();
                    $('.CountrySelect').html('<option></option>')
                    var json = response.country_languages;
                   //  glob =JSON.stringify(json);
                    var options = [];
                   
                    for (var i = 0; i < json.length; i++) {
    
                        var obj = json[i];
                       
                        let country = obj.Country;
    
                        let lang = obj.Language;
                        let code = obj.code;
                        options.push({ id: code + '_' + country + '_' + lang, abbreviation: code, text: country + ' / ' + lang });
                    }
    
                    $('.CountrySelect').select2({
                        placeholder: 'Select Location / Language',
                        templateResult: formatCountry,
                        data: options
                    });
    
                    function formatCountry(country) {
                        if (!country.id) {
                            return country.text;
                        }
                        var $country = $(
                            '<span class="flag-icon flag-icon-' + country.abbreviation.toLowerCase() + ' flag-icon-squared"></span>' + '<span style="margin-left:10px;">' + country.text + '</span>'
                        );
                        return $country;
                    };
                    $('.CountrySelect').val($("#selectedLoaction").val()).trigger('change');
                    $('.SearchKeyword').trigger('click');
    
                } else {
                 ShowNoty(response.error,'error')
                }  
            },
            error: function(response) {
                ShowNoty(response.error,'error');
            }
        });
    
    }

    $('.CountrySelect').on('change', function() {
        $(this).attr('value', this.text);
    });
    $('.Keyword').on('keyup change paste', function() {
    
        
        if($(this).val() != ""){
            $(".SearchKeyword").removeClass('disabled')  
        }
        else{
            $(".SearchKeyword").addClass('disabled')  
        }
       
    });
    
     
// $(document).on("change", ".radio", function () {

//     $(".website").html("")
//     $("#monthlyVolume").empty()
//     $("#rankingDifficulty").empty()
//     $("#costPerClick").empty()
//     $(".loader").show()
//     $(".keywords-total-counts").empty()
//     $("#tableApp").empty()


// $('#SearchKeyWord').submit(function(event) {
//     $('.hideTable').css('display','none');
//     // $("#monthlyVolume").html('<div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div></div></div>');
//     // $("#rankingDifficulty").html('<div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div></div></div>');
//     // $("#costPerClick").html('<div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div></div></div>');

    
//     $(".website").html('')
//     var keyCode = $('.Keyword').val();
//     // keyCode = keyCode.replace('#',' ');
//     keyCode = keyCode.replace('$',' ');
//     keyCode = keyCode.replace(',',' ');
    
//     $("#keyErrors").html("");
//     var regex = /^[/\s[(.?)\]/{}".A-Za-z0-9]*$/;
//     var isValid = regex.test(keyCode);
//     // if (!isValid) {
//     //      $("#keyErrors").html("Keyword contain non-standard characters like: \!@%*+;#");
//     //      return false;
//     // }
//         event.preventDefault();
//         var dataString = $("#SearchKeyWord").serialize();
//         // let Keyword = $(".Keyword").val();
//      let Country = $(".CountrySelect").val();
//         // let SearchedWord = { 'Keyword': Keyword, 'country': Country }; //store a key/value
//         // localStorage.setItem('SearchedWord', JSON.stringify(SearchedWord)); //stringify object and store
    
//         $.ajax({
//             url: '/site_audit/keyword_data_listview/?keyword='+keyCode+'&country='+Country,
//             method: 'GET',
//             // data: dataString,
//             success: function(response) {
//                 $(".loader").hide()
//                 if (response.status == true) {
//                     $("#ActionBtn").empty();
//                     var arr = response.keyword_data.listview_data;

//                    var Headers = response.headers;
//                     var searchVolume = response.keyword_data.monthly_volume;
//                     var rankingDifficulty = response.keyword_data.ranking_difficulty;
//                     var costPerClick = response.keyword_data.cost_per_click;
                   
//                     $("#monthlyVolume").html(numberWithCommas(searchVolume));
//                     $("#rankingDifficulty").html(rankingDifficulty);
//                     $("#costPerClick").html(costPerClick);

//                     $(".web_spinner").hide()
//                     $(".website").html(response.keyword_data.keyword)
//                     $('.hideTable').css('display','block');
//                  $('.keywords-total-counts').html(response.data.length)
//                     // getAndRenderDynamicTable('../../research_keyword/keyword_data_listview/', 'dynamicTable');
    
//                     $(".loader").hide()
//                     renderDynamicTable(response, 'dynamicTable', extras = true, tableDiv = $('#tableApp'));

//                     $('tbody tr').each( function () { 
//                         $(this).children('td:gt(0)').filter(function() {
//                             return this.innerHTML.match(/^[0-9\s\.,]+$/);
//                         }).css('text-align','right');
                        
                      
//                     });
//                     // $("#keywordIdeas").empty();
    
//                     // $("#keywordIdeas").append(
//                     //   "<table class='table table-striped'><thead><tr class='table-dark'></tr></thead><tbody></tbody></table>"
//                     // );
//                     // var thead = arr[0];
//                     // jQuery.each(thead, function (i, val) {
//                     //   $("#keywordIdeas table thead tr").append(
//                     //     '<th class="' + i + '_th">' + i + "</th>"
//                     //   );
//                     // });
    
//                     // for (var key of Object.keys(arr)) {
//                     //   var arr2 = arr[key];
    
//                     //   $("#keywordIdeas table tbody").append(
//                     //     "<tr><td>" +
//                     //       arr2.keyword +
//                     //       '</td><td class="sparkbar chart_' +
//                     //       [key] +
//                     //       '"></td><td>' +
//                     //       arr2.volume +
//                     //       "</td><td>" +
//                     //       arr2.cpc +
//                     //       "</td></tr>"
//                     //   );
//                     //   var objc = arr2.trend;
    
//                     //   var sparkValues = Object.values(objc);
    
//                     //   $(".chart_" + [key]).sparkline(sparkValues, {
//                     //     type: "bar",
//                     //     barWidth: 5,
//                     //     barSpacing: 2,
//                     //     fillColor: "",
//                     //     lineColor: "ccc",
//                     //     tooltipSuffix: "",
//                     //     width: 100,
//                     //     height: "30",
//                     //     barColor: "#e5e5e5",
//                     //     negBarColor: "333",
//                     //     stackedBarColor: ["ff0", "9f0", "999", "f60"],
//                     //     sliceColors: ["ff0", "9f0", "000", "f60"],
//                     //     offset: "30",
//                     //     borderWidth: 1,
//                     //     borderColor: "ccc",
//                     //   });
//                     // }
    
//                     // ShowNoty("success!", "error");
    
//                     // GetServiceCharges();
//                 } else {
//                     $('#tableApp').html(
//                         "<h5> <strong> Sorry </strong> <span> No Data Found ! </span> </h5>"
//                     );
//                     ShowNoty("Something went wrong!", "error");
//                 }
//             },
//             error: function(response) {
//                 ShowNoty("Response failure!", "error");
//             },
//         });
//     })
//     $(document).on("click",".link-monthly-volume",function() {
  
//         $('#dictionary').modal('show');
//         openTab('', 'MonthlyVolume');
        
//     });
//     $(document).on("click",".link-ranking-difficulty",function() {
//         $('#dictionary').modal('show');
//         openTab('', 'RankingDifficulty');
       
      
//     });
//     $(document).on("click",".link-cost-per-click",function() {
//         $('#dictionary').modal('show');
//         openTab('', 'CPC');
      
//     });

    
//     function Get_country_languages() {
//         $.ajax({
//             type: "GET",
//             url: "/user_management/get_country_languages/",
    
//             success: function(response) {
//                 if (response.status == true) {
    
//                     $('.CountrySelect').empty();
//                     $('.CountrySelect').html('<option></option>')
//                     var json = response.country_languages;
//                     //  glob =JSON.stringify(json);
//                     var options = [];
//                     //  console.log('g',glob)
//                     for (var i = 0; i < json.length; i++) {
    
//                         var obj = json[i];
//                         // console.log('obj',obj)
//                         let country = obj.Country;
    
//                         let lang = obj.Language;
//                         let code = obj.code;
//                         options.push({ id: code + '_' + country + '_' + lang, abbreviation: code, text: country + ' / ' + lang });
//                     }
    
//                     $('.CountrySelect').select2({
//                         placeholder: 'Select Location / Language',
//                         templateResult: formatCountry,
//                         data: options
//                     });
    
//                     function formatCountry(country) {
//                         if (!country.id) {
//                             return country.text;
//                         }
//                         var $country = $(
//                             '<span class="flag-icon flag-icon-' + country.abbreviation.toLowerCase() + ' flag-icon-squared"></span>' + '<span style="margin-left:10px;">' + country.text + '</span>'
//                         );
//                         return $country;
//                     };
//                     $('.CountrySelect').val($("#selectedLoaction").val()).trigger('change');
//                     $('.SearchKeyword').trigger('click');
    
//                 } else {
    
//                 }
             
         


             
//             },
//             error: function(response) {
//                 alert('error');
    
//             }
//         });
    
//     }
    
    
    
//     $('.CountrySelect').on('change', function() {
//         $(this).attr('value', this.text);
    
    
//     });
//     $('.Keyword').on('keyup change paste', function() {
    
        
//         if($(this).val() != ""){
//             $(".SearchKeyword").removeClass('disabled')  
//         }
//         else{
//             $(".SearchKeyword").addClass('disabled')  
//         }
       
    
//     });
    
    
// })