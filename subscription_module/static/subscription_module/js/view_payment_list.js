  //API of getting user payments
        $.ajax({
            method: 'GET',
            url: '/payment/get_user_payments/',
            beforeSend: function() {
              $('.tb_loader').show() 
          },
            success: function (res) {
              if(res.status){
       
      //getting data of a table 
      var tableData = res.data
      setTimeout(() => {
        //initializing DataTable
     var table=  $('#displayTable').DataTable({
            searching: true,
            dom: 'lfrtip',
            pageLength: 10,
            "aaSorting": [[0, "desc"]],
            "bDestroy": true,
            responsive:true,
            initComplete: function () {
              var searchInput = $('#searchInput');
              var lengthMenu = $('#displayTable_length');
              var container = $('<div>').addClass('d-flex justify-content-between align-items-center');
              var lengthMenuLabel = $('label[for="displayTable_length"]');
              container.append(lengthMenu).append(searchInput);
              $('#displayTable_filter').after(container);
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
                              <td> <p class="text-gray mb-0">${value.i_invoice_id === "" || null ? "-" : value.i_invoice_id} </p></td>
                              <td> <p class="text-gray mb-0">${value.i_plan_id=== "" || null ? "-" : value.i_plan_id}</p> </td>
                              <td> <p class="text-gray float-end mb-0"> $${value.amount === "" || null ? "-" : value.amount} </p></td>
                          </tr>
               `);
               })
            }

            //if getting No data, Appending no Data Found in the Table
            else {
                $('.tb_loader').hide();
                $("#links_detail").empty();
              $("#links_detail").append(`<tr><td class="text-center" colspan="3">No Data found</td></tr>`);
            }
          }
          })
          
  