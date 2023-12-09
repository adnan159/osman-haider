const { registerBlockType } = wp.blocks;

registerBlockType('osman-haider/my-block', {
    title: 'My Block',
    icon: 'smiley',
    category: 'common',
    edit: () => <div>Hello, world!</div>,
    save: () => <div>Hello, world!</div>,
});