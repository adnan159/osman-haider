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
        add_action( 'admin_menu', [ $this, 'register_admin_menu' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Register admin menu
     *
     * @return void
     */
    public function register_admin_menu() {
        $parent_slug = 'osman-haider';
        $capability = 'manage_options';

        $hook = add_menu_page( 
            __( 'Osman Haider', 'osman-haider' ), 
            __( 'Osman Haider', 'osman-haider' ), 
            $capability, 
            $parent_slug, 
            [ $this, 'render_plugin_page' ], 
            'dashicons-admin-site' 
        );

        add_action( 'admin_head-' . $hook, [ $this, 'enqueue_assets' ] );
    }

    /**
     * Render the plugin page
     *
     * @return void
     */
    public function render_plugin_page() {
        include_once __DIR__ . '/views/osman-haider-view.php';
    }

    /**
     * Enqueue admin assets
     *
     * @return void
     */
    public function enqueue_assets() {
        wp_enqueue_style( 'oh-admin-style' );
        wp_enqueue_script( 'oh-admin-script' );
    }
}
