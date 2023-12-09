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

        if (attributes.responseData) {
            return [
                el('div', { className: 'custom-block-content' },
                    el('table', { className: 'oh-table' }, 
                        el('caption', { className: 'oh-caption' }, attributes.responseData.title),

                        // Table headers
                        el('thead', { className: 'oh-thead' },
                            el('tr', { className: 'oh-tr' },
                                attributes.responseData.data.headers.map(function (header, index) {
                                    return el('th', { key: index, className: 'oh-th' }, header);
                                })
                            )
                        ),

                        // Table body
                        el('tbody', { className: 'oh-tbody' },
                            Object.keys(attributes.responseData.data.rows).map(function (rowKey) {
                                var row = attributes.responseData.data.rows[rowKey];
                                return el('tr', { key: rowKey, className: 'oh-tr' },
                                    el('td', { className: 'oh-td' }, row.id),
                                    el('td', { className: 'oh-td' }, row.fname),
                                    el('td', { className: 'oh-td' }, row.lname),
                                    el('td', { className: 'oh-td' }, row.email),
                                    el('td', { className: 'oh-td' }, new Date(row.date * 1000).toLocaleDateString()) // Convert timestamp to date
                                );
                            })
                        )
                    )
                ),
            ];
        }
    },
    save: () => <div>Hello, dev!</div>,
});
