<?php 

namespace Osman\Haider\Frontend;

class Block {
    
    public function __construct() {
        wp_enqueue_script( 'oh-block-script' );
    }
}