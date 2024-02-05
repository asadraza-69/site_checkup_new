$(".plan_details_form_div").empty()
var all_data_array = []
$(document).ready(function () {

//initializing rich text input
    var quill = new Quill('#description', {
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
    // jQuery('#datepicker').datepicker({
    //     format: 'dd-mm-yyyy',
    //     startDate: '+1d'
    // });
    // jQuery('#datepicker2').datepicker({
    //     format: 'dd-mm-yyyy',
    //     startDate: '+1d'
    // });
    //             tinymce.init({
    //     selector: '#description'
    //   });


//API of getting plan modules
    $(document).ready(function () {
        $.ajax({
            method: 'GET',
            url: '/subscription/get_and_add_plan_module/',
            success: function (res) {
                //console.log(res, "Res")
                
                //getting plan modules and showing all the information
                $.each(res.data, function (index, value) {
                    $(".plan_details_form_div").append(`
                        <div class="row row${index} plan_details" data_id=${value.id}>
                            <div class="col-md-4 ">
                                <div class="list-group-item mb-1" style="border: none"><span>${index + 1})</span> <span class='pl-3'>${value.name}</span></div>
                            </div>
                            <div id="add_modules"  class="col-md-4">
                                <input style="border:none; border-bottom:1px solid #707070;" type="number" class="form-control inputss mb-3" placeholder="Unit" required>
                            </div>
                            <div id="add_modules"  class="col-md-4">
                                <input style="border:none; border-bottom:1px solid #707070;" type="text" class="form-control mb-3" placeholder="Remarks" required>
                            </div>
                            <div class="mb-2 mt-2" style="border-bottom: 2px solid #dde2e3ad;"> </div>
                            </div>
            `);
                })
            }
        })
    })

    //showing modal of having plan modules and their units..
    $('#plan_details_form').submit(function (event) {
        event.preventDefault();
        $('#custom-subscription-btn').prop("disabled", false);
        $('#plan_details_modal').modal('toggle');
        $('.plan_details').each(function (i, val) {
            var arr = $(this).find("input").map(function () { return $(this).val() }).get()
            var data_id = $(this).attr("data_id")
            var arr_data = {
                [data_id]: {
                    unit: arr[0],
                    remarks: arr[1]
                }
            }
            all_data_array.push(arr_data)
        })
        //console.log("my data ",JSON.stringify(all_data_array))
        $(this).find("input").map(function () { return $(this).val("") })
    })

    // getting inputs value and send it to the backend
    $('#add_plan_form').submit(function (event) {
        event.preventDefault();
        $('#custom-subscription-btn').prop("disabled", true);
        var plan_name = $('#plan_name').val();
        var plan_price = $('#plan_price').val();
        var plan_anual_price = $('#plan_anual_price').val();
        // var plan_start_date = $('#datepicker').val();
        // var plan_end_date = $('#datepicker2').val();
        var description = quill.root.innerHTML
        var days_per_interval = $('#days').val()
        var data =
        {
            name: plan_name,
            price: plan_price,
            annual_price: plan_anual_price,
            // start_date: plan_start_date, 
            // end_date: plan_end_date,
            description: description,
            days_per_interval: days_per_interval,
            module_details: JSON.parse(JSON.stringify(all_data_array))
        }
        //console.log("post daatta", data)

        //add_plan API of Posting plans to backend
        $.ajax({
            method: 'POST',
            url: '/subscription/add_plan/',
            data:JSON.stringify(data) ,
            success: function (res) {
                all_data_array = []
                if (res.status) { //showing success notification if status true
                    ShowNoty(res.message, 'success')
                } else { //showing error notification if status false
                    ShowNoty(res.error, 'error')
                }
            },
            error: function (res) {
                all_data_array = []

                ShowNoty(res.statusText, 'error')
            }
        })
        $('#plan_name').val("");
        $('#plan_price').val("");
        $('#plan_anual_price').val("");
        quill.setText('');
        $('#days').val("")

    })
})