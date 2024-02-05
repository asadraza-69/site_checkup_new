var quill
$(".plan_details_form_div").empty()
$("#select_menu").empty()
var all_data_array = []
$(document).ready(function () {
    //initializing Rich text
    quill = new Quill('#description', {
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]
        },
        placeholder: 'Remarks',
        theme: 'snow'
    });
    var content = quill.getContents();
})

//API of getting plans and have to edit them
$.ajax({
    method: 'GET',
    url: '/subscription/edit_plan_module/',
    success: function (res) {
        $.each(res.data, function (index, value) {
            $("#select_menu").append(`<option value="${value.plan_name}">${value.plan_name}</option>`);
        });

        //function of showing plan details
        function getEditAPIData() {
            var selected_options = $("#select_menu").find("option:selected").text()
            $.each(res.data, function (index, value) {
                if (value.plan_name === selected_options) {
                    $(".plan_details_form_div").empty()
                    var descriptionEdit = document.querySelector('#description')
                    $('#plan_name').val(value.plan_name);
                    $('#plan_price').val(value.plan_price);
                    $('#plan_id').val(value.plan_id);
                    $('#plan_anual_price').val(value.plan_annual_price);
                    $('#days').val(value.plan_days_per_interval)
                    descriptionEdit.children[0].innerHTML = value?.plan_description
                    $.each(value.plan_module, function (index, val) {
                        $(".plan_details_form_div").append(`
                            <div class="row row${index} plan_details" data_id=${val.plan_id_id}>
                                <div class="col-md-4 ">
                                    <div class="list-group-item mb-3"> <span class='pl-3'>${val.module_id_id}</span></div>
                                </div>
                            <input type="hidden" value=${val.id} >
                            <input type="hidden" value=${val.plan_id_id} >
                            <input type='hidden' value='${val.module_id_id}' class='module_id_id'/>
                            <div id="add_modules" class="col-md-4">
                                <input type="number" class="form-control mb-3" placeholder="Unit" value=${val.units_allowed}>
                            </div>
                            <div id="add_modules"  class="col-md-4">
                                <input type="text" class="form-control mb-3" placeholder="Remarks" value='${val.remarks}' >
                            </div>
                        </div>
                            `);
                    });
                }
            });
        }

        //call function on page load on first time
        getEditAPIData()

        //onchange function on selecting different option  
        $('#select_menu').change(function () {
            getEditAPIData()
        });
    }
})

//Have to edit plans and submit edited form
$('#add_plan_form').submit(function (event) {
    event.preventDefault();
    //looping plan detail input and push all data values to empty array..
    $('.plan_details').each(function (i, val) {
        var arr = [$(this).find("input[type='hidden']").eq(0).val(), $(this).find("input[type='hidden']").eq(1).val(), $(this).find(".module_id_id").val(), $(this).find("input[type='number']").val(), $(this).find("input[type='text']").val()]
        var arr_data = {
            id: arr[0],
            plan_id_id: arr[1],
            module_id_id: arr[2],
            unit: arr[3],
            remarks: arr[4]

        }
        all_data_array.push(arr_data)
    })

    //getting values of user inputs 
    var plan_name = $('#plan_name').val();
    var plan_idd = $('#plan_id').val();
    var plan_price = $('#plan_price').val();
    var plan_anual_price = $('#plan_anual_price').val();
    var description = quill.root.innerHTML
    var days_per_interval = $('#days').val()

    //store all data into an object to send them into backend using POST API
    var data =
    {
        name: plan_name,
        plan_id: plan_idd,
        price: plan_price,
        annual_price: plan_anual_price,
        description: description,
        days_per_interval: days_per_interval,
        module_details: JSON.parse(JSON.stringify(all_data_array))
    }
  
    //calling POST API to send all data inputs to backend..
    $.ajax({
        method: 'POST',
        url: '/subscription/edit_plan_module/',
        data: JSON.stringify(data),
        success: function (res) {
            all_data_array = []
            if (res.status) {
                //showing success notification, if status true
                ShowNoty("Plan Edit Successfully!", 'success')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            
            } else {  //showing error notification, if status false
                ShowNoty("Something Went Wrong!", 'error')
            }
        },
        error: function (res) {
            //if having API error, showing Error
            all_data_array = []
            ShowNoty(res.statusText, 'error')
        }
    })
   /* $('#plan_name').val("");
    $('#plan_price').val("");
    $('#plan_id').val("");
    $('#plan_anual_price').val("");
    quill.setText('');
    $('#days').val("")
    $(".plan_details_form_div").find("input").map(function () { return $(this).val("") }) */
})

//if user wants to delete, having delete function button
$('#btn-delete').on('click', function(e) {  
    //showing modal of confirming delete plan
    $('#confirm-delete-modal').modal('show');
    var get_plan_id = $('#plan_id').val();
    //getting Id to delete Plan Module
    var data ={
                plan_id:get_plan_id
            }

    //if clicking delete button, delete plan module by calling API
    $('#confirm-delete-btn').on('click', function() {
        $.ajax({
                method: 'POST',
                url: '/subscription/delete_plans/',
                data:data ,
                success: function (res) {
                    if (res.status) {
                        //if success, showing success notification
                        ShowNoty(res.message, 'success')
                        window.location.reload()
                    } else {
                         //if error, showing error notification
                        ShowNoty(res.error, 'error')
                    }
                },
                error: function (res) { //if API having an error, showing API error
                    ShowNoty(res.statusText, 'error')
                }
            })
    });
});