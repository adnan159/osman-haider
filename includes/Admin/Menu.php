<?php

namespace Osman\Haider\Admin;

/**
 * The Menu handler class
 */
class Menu {

    /**
     * Class constructor
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    /**
     * Register admin menu
     *
     * @return void
     */
    public function admin_menu() {
        $parent_slug = 'osman-haider';
        $capability = 'manage_options';

        add_menu_page( 
            __( 'Osman Haider', 'osman-haider' ), 
            __( 'Osman Haider', 'osman-haider' ), 
            $capability, $parent_slug, 
            [ $this, 'plugin_page' ], 
            'dashicons-admin-site' 
        );
    }

    /**
     * Render the plugin page
     *
     * @return void
     */
    public function plugin_page() {
        include_once __DIR__ . '/views/osman-haider-view.php';
    }
}