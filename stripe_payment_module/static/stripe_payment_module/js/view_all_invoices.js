//API of getting All Invoices
function all_invoices(){
   
    $.ajax({
        method: 'GET',
        url: '/payment/get_all_invoices/',
        beforeSend: function() {
            //loader show before getting Data
            $('.tb_loader').show() 
        },
        success: function (res) {
            if(res.status){
                //getting data of a table from API
                var tableData = res.data
                setTimeout(() => {
                     //initializing DataTable
                    var table= $('#displayTable').DataTable({
                        searching:true,
                        dom: 'Bfrtip',
                        pageLength: 10,
                        "aaSorting": [[1, "asc"]],
                        "bDestroy": true,
                        responsive:true
                        });

                        var select = document.getElementById("select_invoice");

                        select.addEventListener("change", function() {
                            var selectedOption = select.value;
                            if(selectedOption === 'name'){
                                table
                                    .column(0)
                                    .order('asc')
                                    .draw();
              
                            } else if(selectedOption === 'number'){
                                table
                                    .column(1).order('asc')
                                    .draw();
                            }
                            else if(selectedOption === 'invoice_plan') {
                              table
                              .column(2).order('asc')
                              .draw();
                            }
                        });
                        
                        //input searching feature
                        $('#searchInput').on('keyup', function() {
                            table.search(this.value).draw();
                          });
                }, );
                 //loader hide when getting data from API
                $('.tb_loader').hide() 
                        
                 //loop of appending data in the table
                            $.each(tableData, function (index, value) {
    
                              $("#links_detail").append(`
                    <tr class="">
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.i_customer_id}">${value.i_customer_id === "" || null ? "-" : value.i_customer_id}</p></td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.invoice_number=== "" || null ? "-" : value.invoice_number} </p></td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.i_plan_id === "" || null ? "-" : value.i_plan_id} </p> </td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> $${value.amount === "" || null ? "-" : value.amount} </p></td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.email}"> ${value.email === "" || null ? "-" : value.email} </p> </td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.from_date === "" || null ? "-" : value.from_date} </p> </td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.paid_date === null ? "-" : value.paid_date} </p> </td>
                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.to_date=== "" || null ? "-" : value.to_date} </p> </td>
                                <td> <p class="text-gray mb-1 text-elipses text-remarks-class" title="${value.remarks}">${value.remarks === "" || null ? "-" : value.remarks} </p></td>
                    
                    </tr>
                                    `);
                            })
            }

            else {
                //if getting No data, Appending no Data Found in the Table
                $('.tb_loader').hide() 
                $("#links_detail").empty();
                $("#links_detail").append(`<tr><td class="text-center" colspan="9">No Data found</td></tr>`);
            }
        }
              
      })
    }


$(document).ready(function(){
    //Function call on Page load
    all_invoices()
})

//select on change data on 3 different Api
    $("#invoices").change(function() {
        $('#displayTable').DataTable().destroy();
        $("#links_detail").html('')
        var selectedOption = $(this).val();

        //getting data of All invoices
        if (selectedOption === "all_invoices") {
            all_invoices();
        }
        //checking and getting data of Paid Invoices 
            else if(selectedOption === "paid_invoices") {
                $.ajax({
                    method: 'GET',
                    url: '/payment/get_all_paid_invoices/',
                    beforeSend: function() {
                        //showing loader before getting Data
                        $('.tb_loader').show() 
                    },
                    success: function (res) {
                        if(res.status){
                            var tableData = res.data
                            setTimeout(() => {
                             //initializing data table
                             var table= $('#displayTable').DataTable({
                                    dom: 'Bfrtip',
                                    pageLength: 10,
                                    "aaSorting": [],
                                    "bDestroy": true,
                                    responsive:true
                                    });

                             var select = document.getElementById("select_invoice");

                            select.addEventListener("change", function() {
                            var selectedOption = select.value;

                                if(selectedOption === 'name'){
                                        table
                                            .column(0)
                                            .order('asc')
                                            .draw();
                          
                                } else if(selectedOption === 'number'){
                                        table
                                            .column(1)
                                            .order('asc')
                                            .draw();
                                        }
                                else if(selectedOption === 'invoice_plan') {
                                        table
                                          .column(2)
                                          .order('asc')
                                          .draw();
                                        }
                                    });

                                //input searching feature
                            $('#searchInput').on('keyup', function() {
                                table.search(this.value).draw();
                              });
                            }, );
                             
                            //hiding loader
                            $('.tb_loader').hide() 
                                        //looping data to append in the table
                                        $.each(tableData, function (index, value) {
                                        //loop of appending data in the table
                                          $("#links_detail").append(`
                                            <tr class="">
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.i_customer_id}">${value.i_customer_id === "" || null ? "-" : value.i_customer_id}</p></td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.invoice_number=== "" || null ? "-" : value.invoice_number} </p></td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.i_plan_id === "" || null ? "-" : value.i_plan_id} </p> </td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> $${value.amount === "" || null ? "-" : value.amount} </p></td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.email}"> ${value.email === "" || null ? "-" : value.email} </p> </td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.from_date === "" || null ? "-" : value.from_date} </p> </td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.paid_date === null ? "-" : value.paid_date} </p> </td>
                                                <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.to_date=== "" || null ? "-" : value.to_date} </p> </td>
                                                <td> <p class="text-gray mb-1 text-elipses text-remarks-class" title="${value.remarks}">${value.remarks === "" || null ? "-" : value.remarks} </p></td>
                                
                                            </tr>
                                                `);
                                        })
                        }
                        else {
                            $('.tb_loader').hide() 
                            $("#links_detail").empty();
                            $("#links_detail").append(`<tr><td class="text-center" colspan="9">No Data found</td></tr>`);
                        }
                       
                    }
   
                  })
            }

            //checking of unpaid invoices
            else if (selectedOption === "unpaid_invoices") {
                $.ajax({
                    method: 'GET',
                    url: '/payment/get_all_unpaid_invoices/',
                    beforeSend: function() {
                        $('.tb_loader').show() 
                    },
                    success: function (res) {
                        if(res.status){
                            var tableData = res.data
                        
                            setTimeout(() => {
                                var table= $('#displayTable').DataTable({
                                    dom: 'Bfrtip',
                                    pageLength: 10,
                                    "aaSorting": [],
                                    "bDestroy": true,
                                    responsive:true
                                    });

                                    var select = document.getElementById("select_invoice");

                                    select.addEventListener("change", function() {
                                        var selectedOption = select.value;
                                        if(selectedOption === 'name'){
                                            table
                                                .column(0)
                                                .order('asc')
                                                .draw();
                          
                                        } else if(selectedOption === 'number'){
                                            table
                                                .column(1).order('asc')
                                                .draw();
                                        }
                                        else if(selectedOption === 'invoice_plan') {
                                          table
                                          .column(2).order('asc')
                                          .draw();
                                        }
                                    });

                            //input searching feature
                            $('#searchInput').on('keyup', function() {
                                table.search(this.value).draw();
                              });
                            }, );
                            $('.tb_loader').hide() 
                                        //looping data 
                                        $.each(tableData, function (index, value) {
                                            if(value.retry_count > 0) {
                                                $("#links_detail").append(`
                                                <tr class="">
                                                            <td> <p class="text-red mb-1 text-elipses text-elpsis-class" title="${value.i_customer_id}">${value.i_customer_id === "" || null ? "-" : value.i_customer_id}</p></td>
                                                            <td> <p class="text-red mb-1 text-elipses text-elpsis-class">${value.invoice_number=== "" || null ? "-" : value.invoice_number} </p></td>
                                                            <td> <p class="text-red mb-1 text-elipses  text-elpsis-class">${value.i_plan_id === "" || null ? "-" : value.i_plan_id} </p> </td>
                                                            <td> <p class="text-red mb-1 text-elipses text-elpsis-class"> $${value.amount === "" || null ? "-" : value.amount} </p></td>
                                                            <td> <p class="text-red mb-1 text-elipses text-elpsis-class" title="${value.email}"> ${value.email === "" || null ? "-" : value.email} </p> </td>
                                                            <td> <p class="text-red mb-1 text-elipses  text-elpsis-class">${value.from_date === "" || null ? "-" : value.from_date} </p> </td>
                                                            <td> <p class="text-red mb-1 text-elipses  text-elpsis-class"> ${value.paid_date === null ? "-" : value.paid_date} </p> </td>
                                                            <td> <p class="text-red mb-1 text-elipses text-elpsis-class"> ${value.to_date=== "" || null ? "-" : value.to_date} </p> </td>
                                                            <td> <p class="text-red mb-1 text-elipses text-remarks-class" title="${value.remarks}" >${value.remarks === "" || null ? "-" : value.remarks} </p></td>
                                                
                                                </tr>
                                                                `);
                                            }
                                            else {
                                                $("#links_detail").append(`
                                                <tr class="">
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.i_customer_id}">${value.i_customer_id === "" || null ? "-" : value.i_customer_id}</p></td>
                                                            <td> <p class="text-gray mb-1 text-elipses  text-elpsis-class">${value.invoice_number=== "" || null ? "-" : value.invoice_number} </p></td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.i_plan_id === "" || null ? "-" : value.i_plan_id} </p> </td>
                                                            <td> <p class="text-gray mb-1 text-elipses float-end text-elpsis-class"> $${value.amount === "" || null ? "-" : value.amount} </p></td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.email}"> ${value.email === "" || null ? "-" : value.email} </p> </td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class">${value.from_date === "" || null ? "-" : value.from_date} </p> </td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.paid_date === null ? "-" : value.paid_date} </p> </td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class"> ${value.to_date=== "" || null ? "-" : value.to_date} </p> </td>
                                                            <td> <p class="text-gray mb-1 text-elipses text-elpsis-class" title="${value.remarks}">${value.remarks === "" || null ? "-" : value.remarks} </p></td>
                                                
                                                </tr>
                                                                `);
                                            }
                                       
                                        })
                        }
                        else {
                        $('.tb_loader').hide() 
                            $("#links_detail").empty();
                            $("#links_detail").append(`<tr><td class="text-center" colspan="9">No Data found</td></tr>`);
                        }
                     
                    }      
                  })

            }
        })