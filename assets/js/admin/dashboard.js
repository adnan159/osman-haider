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
                const tableData = JSON.parse(response);

                if (tableData.title && tableData.data && tableData.data.headers && tableData.data.rows) {
                    // Assuming you have a table with the class 'oh-table' in your HTML
                    const table = $('.oh-table');
                    const thead = table.find('thead');
                    const tbody = table.find('tbody');
                    const caption = table.find('.oh-table-caption');

                    // Set dynamic table caption
                    caption.text(tableData.title);

                    // Clear existing content
                    thead.empty();
                    tbody.empty();

                    // Create table headers
                    let headersHtml = '<tr>';
                    tableData.data.headers.forEach(header => {
                        headersHtml += `<th>${header}</th>`;
                    });
                    headersHtml += '</tr>';
                    thead.append(headersHtml);

                    // Convert rows object to an array using Object.values
                    const rowsArray = Object.values(tableData.data.rows);

                    // Loop through the response data and append rows to the table
                    rowsArray.forEach((row, index) => {
                        const rowClass = index % 2 === 0 ? 'oh-row-even' : 'oh-row-odd';
                        const rowHtml = `<tr class="${rowClass}">
                            <td class="oh-col-id">${row.id}</td>
                            <td>${row.fname}</td>
                            <td>${row.lname}</td>
                            <td>${row.email}</td>
                            <td class="oh-col-date">${new Date(row.date * 1000).toLocaleDateString()}</td>
                        </tr>`;

                        // Append the row to the table body
                        tbody.append(rowHtml);
                    });
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
        miusageAjaxCall();
    });

    // Document ready
    $(document).ready(function() {
        miusageAjaxCall();
    });
});
