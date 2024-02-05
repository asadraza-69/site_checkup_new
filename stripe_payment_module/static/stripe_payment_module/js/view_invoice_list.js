//API of getting user Invoices

$.ajax({
    method: 'GET',
    url: '/payment/get_user_invoices/',
    beforeSend: function() {
       //loader show before getting Data
      $('.tb_loader').show() 
  },
    success: function (res) {
      if(res.status) {
      //getting data of a table from API
      var tableData = res.data
      setTimeout(() => {
           //initializing DataTable

          var table= $('#displayTable').DataTable({
              searching:true,
              dom: 'lfrtip',
              pageLength: 10,
              "aaSorting": [[1, "desc"]],
              "bDestroy": true,
              responsive:true
              });

               //input searching feature
              $('#searchInput').on('keyup', function() {
                table.search(this.value).draw();
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


      }, );

      //loader hide when getting data from API
      $('.tb_loader').hide() 
       //loop of appending data in the table
                  $.each(tableData, function (index, value) {

                    $("#links_detail").append(`
                      <tr class="">
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class">${value.i_customer_id}</p></td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class">${value.invoice_number} </p></td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class">${value.i_plan_id} </p> </td>
                          <td> <p class="text-gray mb-0 text-elipses float-end text-elpsis-class"> $${value.amount} </p></td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class"> ${value.email} </p> </td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class">${value.from_date} </p> </td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class"> ${value.paid_date === null ? "-" : value.paid_date} </p> </td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class"> ${value.to_date} </p> </td>
                          <td> <p class="text-gray mb-0 text-elipses text-elpsis-class">${value.remarks === "" || null ? "-" : value.remarks} </p></td>
          
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
  // <td> ${value.is_paid == true ? '<i class="fa fa-solid fa-check checkmark" aria-hidden="true"></i>' : '<i class="fa fa-times crossmark" aria-hidden="true"></i>' } </td>
  // <td class="text-gray">${value.multiple_payment == true ? '<i class="fa fa-solid fa-check checkmark" aria-hidden="true"></i>' : '<i class="fa fa-times crossmark" aria-hidden="true"></i>' } </td>
  //         <td class="text-gray">${value.is_recurring  == true ? '<i class="fa fa-solid fa-check checkmark" aria-hidden="true"></i>' : '<i class="fa fa-times crossmark" aria-hidden="true"></i>' } </td>
