const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl, CheckboxControl } = wp.components;
const { withState } = wp.compose;
const { Component, createElement: el } = wp.element;

registerBlockType('osman-haider/my-block', {
    title: 'Osman Haider - My Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        responseData: {
            type: 'json',
        },
        showColumns: {
            type: 'object',
            default: {
                id: true,
                fname: true,
                lname: true,
                email: true,
                date: true,
            },
        },
    },
    edit: function (props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
    
        // Function to handle AJAX request and update data in the block
        function fetchData() {
            jQuery.ajax({
                url: miusageData.ajaxurl,
                type: 'GET',
                data: {
                    action: 'oh_miusage_action',
                },
                success: function (response) {
                    setAttributes({
                        responseData: JSON.parse(response),
                    });
                },
            });
        }
    
        React.useEffect(function () {
            fetchData();
        }, []);
    
        // Function to toggle the visibility of table columns
        function toggleColumnVisibility(column) {
            setAttributes({
                showColumns: {
                    ...attributes.showColumns,
                    [column]: !attributes.showColumns[column],
                },
            });
        }
    
        if (attributes.responseData) {
            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: 'Table Settings', initialOpen: true },
                        Object.keys(attributes.showColumns).map(function (column, index) {
                            return el(PanelRow, { key: index },
                                el(CheckboxControl, {
                                    label: `Show ${column} Column`,
                                    checked: attributes.showColumns[column],
                                    onChange: () => toggleColumnVisibility(column),
                                })
                            );
                        })
                    )
                ),
                el('div', { className: 'custom-block-content' },
                    el('table', { className: 'oh-table' }, 
                        el('caption', { className: 'oh-caption' }, attributes.responseData.title),
    
                        // Table headers
                        el('thead', { className: 'oh-thead' },
                            el('tr', { className: 'oh-tr' },
                                Object.keys(attributes.showColumns).map(function (column, index) {
                                    return attributes.showColumns[column] && el('th', { key: index, className: 'oh-th' }, column);
                                })
                            )
                        ),
    
                        // Table body
                        el('tbody', { className: 'oh-tbody' },
                            Object.keys(attributes.responseData.data.rows).map(function (rowKey) {
                                var row = attributes.responseData.data.rows[rowKey];
                                return el('tr', { key: rowKey, className: 'oh-tr' },
                                    Object.keys(attributes.showColumns).map(function (column, index) {
                                        return attributes.showColumns[column] && el('td', { key: index, className: 'oh-td' },
                                            // Convert date only if the column is 'date'
                                            column === 'date' ? new Date(row[column] * 1000).toLocaleDateString() : row[column]
                                        );
                                    })
                                );
                            })
                        )
                    )
                ),
            ];
        }
    },

    save: function (props) {
    var attributes = props.attributes;

    if (attributes.responseData) {
        return el('div', { className: 'custom-block-content' },
            el('table', { className: 'oh-table' }, 
                el('caption', { className: 'oh-caption' }, attributes.responseData.title),

                // Table headers
                el('thead', { className: 'oh-thead' },
                    el('tr', { className: 'oh-tr' },
                        Object.keys(attributes.showColumns).map(function (column, index) {
                            return attributes.showColumns[column] && el('th', { key: index, className: 'oh-th' }, column);
                        })
                    )
                ),

                // Table body
                el('tbody', { className: 'oh-tbody' },
                    Object.keys(attributes.responseData.data.rows).map(function (rowKey) {
                        var row = attributes.responseData.data.rows[rowKey];
                        return el('tr', { key: rowKey, className: 'oh-tr' },
                            Object.keys(attributes.showColumns).map(function (column, index) {
                                return attributes.showColumns[column] && el('td', { key: index, className: 'oh-td' },
                                    // Convert date only if the column is 'date'
                                    column === 'date' ? new Date(row[column] * 1000).toLocaleDateString() : row[column]
                                );
                            })
                        );
                    })
                )
            )
        );
    }

    // If there is no responseData, return an empty div
    return el('div');
},

    
});
