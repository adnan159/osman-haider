<?php 

namespace Osman\Haider\Frontend;

class Block {
    
    public function __construct() {
        wp_enqueue_script( 'oh-block-script' );
        wp_enqueue_style( 'oh-block-style' );
    }
}