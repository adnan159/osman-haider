<?php

namespace Osman\Haider\Frontend;

class Block {
    
    public function __construct() {
        add_action( 'admin_enqueue_scripts', array( $this, 'oh_block_script' ) );
    }

    public function oh_block_script() {
        wp_enqueue_script( 'oh-block-script' );
        wp_enqueue_style( 'oh-block-style' );
    }

}
