jQuery(document).ready(function($) {

    // Ajax call to get the data from the server
    function miusageAjaxCall() {
        $.ajax({
            url: ajaxurl,
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'oh_miusage_action'
            },
            success: function(response) {
                let tableData = JSON.parse(response);
                console.log(tableData);

                if (tableData.title && tableData.data && tableData.data.headers && tableData.data.rows) {
                // Assuming you have a table with the class 'oh-table' in your HTML
                var table = $('.oh-table');
                var thead = table.find('thead');
                var tbody = table.find('tbody');

                // Clear existing content
                thead.empty();
                tbody.empty();

                // Create table headers
                var headersHtml = '<tr>';
                tableData.data.headers.forEach(function(header) {
                    headersHtml += '<th>' + header + '</th>';
                });
                headersHtml += '</tr>';
                thead.append(headersHtml);

                // Loop through the response data and append rows to the table
                for (var key in tableData.data.rows) {
                    if (tableData.data.rows.hasOwnProperty(key)) {
                        var row = tableData.data.rows[key];
                        var rowClass = (parseInt(key) % 2 === 0) ? 'oh-row-even' : 'oh-row-odd';
                        var rowHtml = '<tr class="' + rowClass + '">';
                        rowHtml += '<td class="oh-col-id">' + row.id + '</td>';
                        rowHtml += '<td>' + row.fname + '</td>';
                        rowHtml += '<td>' + row.lname + '</td>';
                        rowHtml += '<td>' + row.email + '</td>';
                        rowHtml += '<td class="oh-col-date">' + new Date(row.date).toISOString() + '</td>';
                        rowHtml += '</tr>';

                        // Append the row to the table body
                        tbody.append(rowHtml);
                    }
                }
            }

            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    // Refresh button click event
    $('#oh-refresh-button').on('click', function(event) {
        event.preventDefault();
        miusageAjaxCall()
        
    });

    // Document ready
    $(document).ready(function() {
        miusageAjaxCall();
    });
});
