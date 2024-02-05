$(document).ready(function (event) {

//submitting form of having Module Names and Description
$('#add_module_form').submit(function(event) {
        event.preventDefault();

        var moduleName = $('#module_name').val();
        var description = $('#description').val();
        var data = 
        {  module_name: moduleName,
        module_description: description,
        }

//POST Api of adding Modules
$.ajax({
        method: 'POST',
        url: '/subscription/get_and_add_plan_module/',
        data: data,
        success: function (res) {
            //showing success notification
            if (res.status) {
                ShowNoty("Module added Successfully", 'success')
            } else {
                //showing error notification if having error
                ShowNoty(res.error, 'error')
            }
        },
        error: function( res){
            ShowNoty(res.statusText, 'error')
        }
    })
$('#module_name').val("");
$('#description').val("");

} )

})
