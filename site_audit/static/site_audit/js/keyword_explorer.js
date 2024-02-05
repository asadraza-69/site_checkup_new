
$( document ).ready(function() {
    Get_country_languages();
});


function Get_country_languages() {
    $.ajax({
        type: "GET",
        url: "/user_management/get_country_languages/",

        success: function(response) {
            if (response.status == true) {

                $('.CountrySelect').empty();
                $('.CountrySelect').html('<option></option>')
                var json = response.country_languages;
                //  glob =JSON.stringify(json);
                var options = [];
                //  console.log('g',glob)
                for (var i = 0; i < json.length; i++) {

                    var obj = json[i];
                    // console.log('obj',obj)
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



            } else {
        ShowNoty(response.error, "error")
            }
         
            $('.CountrySelect').val('us_United States_English').trigger('change');
        },
        error: function(response) {
           ShowNoty(response.error, "error")
        }
    });

}



// $('#SearchKeyWord').submit(function(event) {
   
//     var keyCode = $('.Keyword').val();
//     // keyCode = keyCode.replace('#',' ');
//     keyCode = keyCode.replace('$',' ');
//     keyCode = keyCode.replace(',',' ');
    
//     $("#keyErrors").html("");
//     var regex = /^[/\s[(.?)\]/{}".A-Za-z0-9]*$/;
//     var isValid = regex.test(keyCode);
//     if (!isValid) {
//          $("#keyErrors").html("Keyword contain non-standard characters like: \!@%*+;#");
//          return false;
//     }
//         event.preventDefault();
//         var dataString = $("#SearchKeyWord").serialize();
       
//          let Country = $(".CountrySelect").val();
//         // let SearchedWord = { 'Keyword': Keyword, 'country': Country }; //store a key/value
//         // localStorage.setItem('SearchedWord', JSON.stringify(SearchedWord)); //stringify object and store
    
//         $.ajax({
//             url: '/site_audit/keyword_explorer/',
//             method: 'POST',
//             data: dataString,
//             success: function(response) {

//                 console.log(response)
//                 if (response.status == true) {
                  
                  
                 
//                 } else {
                  
//                     ShowNoty("Something went wrong!", "error");
//                 }
//             },
//             error: function(response) {
//                 ShowNoty("Response failure!", "error");
//             },
//         });
//     })