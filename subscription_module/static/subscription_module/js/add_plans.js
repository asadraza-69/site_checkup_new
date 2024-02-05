$(document).ready(function(){

    //showing list of plan modules
    $.ajax({
        method: 'GET',
        url: '/subscription/get_and_add_plan_module/',
        success: function (res) {
           // console.log(res, "Res")
            $.each(res.data, function(index, value) {
                $("#getModules").append(`<li class="list-group-item mb-3"><span>${value.id})</span> <span class='pl-3'>${value.name}</span></li>`);
            })
        
        }
    })

})


$.ajax({
    method: 'POST',
    url: '/subscription/get_and_add_plan_module/',
    data:data,
    success: function(res) {
    }
})
