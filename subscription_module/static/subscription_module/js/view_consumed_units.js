//API of getting user consumed Units
$.ajax({
    method: 'GET',
    url: '/subscription/get_all_consumed_units/',
    beforeSend: function() {
      //loader show before getting Data
        $('.tb_loader').show() 
    },
    success: function (res) {
        if (res.status){
      $("#links_detail").html('')
      //getting data of a table from API
        var tableData = res.data
       // console.log(tableData,"tableData")
        setTimeout(() => {

             //initializing DataTable
            var table= $('#displayTable').DataTable({
              searching:true,
              dom: 'lfrtip',
              pageLength: 10,
                "aaSorting": [],
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
        tableData.forEach(function(item)  {
                 $("#links_detail").append(`
                   <tr class="">
                      <td> <p class="text-gray   mb-1 text-elipses text-elpsis-class" >${item.user_id=== "" || null ? "-" : item.user_id}</p></td>
                      <td> <p class="text-gray   mb-1 text-elipses text-elpsis-class">${item.subscription_id=== "" || null ? "-" : item.subscription_id} </p></td>
                      <td> <p class="text-gray   mb-1 text-elipses text-elpsis-class">${item.module_id === "" || null ? "-" : item.module_id} </p> </td> 
                      <td> <p class="text-gray  float-end  mb-1 text-elipses text-elpsis-class">${item.consumed_units === "" || null ? "-" : item.consumed_units} </p> </td>    
                  </tr>
                      `);
        })
                    
    }
       else {
        //if getting No data, Appending no Data Found in the Table
          $('.tb_loader').hide() 
          $("#links_detail").empty();
          $("#links_detail").append(`<tr><td class="text-center" colspan="4">No Data found</td></tr>`);
    }
}
          
  })