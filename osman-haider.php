<?php

/*
* Plugin Name: Osman Haider
* Plugin URI: http://osmanhaider.com
* Description: This is a plugin for Osman Haider
* Version: 1.0
* Author: Osman Haider
* Author URI: http://osmanhaider.com
* License: GPL2
*/

if( ! defined( 'ABSPATH' ) ) {
    exit;
 }

 if( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    die( 'Please run `composer install` on main plugin directory' );
 }

 require_once __DIR__ . '/vendor/autoload.php';

 /**
  * The main plugin class
  */
 final class Osman_Haider {

    const VERSION = '1.0';

    /**
     * Class constructor
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initialize a singleton instance
     *
     * @return \Osman_Haider
     */
    public static function init() {
        static $instance = false;

        if( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define required plugin constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'OSMAN_HAIDER_VERSION', self::VERSION );
        define( 'OSMAN_HAIDER_FILE', __FILE__ );
        define( 'OSMAN_HAIDER_PATH', __DIR__ );
        define( 'OSMAN_HAIDER_URL', plugins_url( '', OSMAN_HAIDER_FILE ) );
        define( 'OSMAN_HAIDER_ASSETS', OSMAN_HAIDER_URL . '/assets' );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function activate() {
        $installed = get_option( 'osman_haider_installed' );

        if( ! $installed ) {
            update_option( 'osman_haider_installed', time() );
        }

        update_option( 'osman_haider_version', OSMAN_HAIDER_VERSION );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {

        new \Osman\Haider\Assets();

        if( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            new Osman\Haider\Ajax();
        }

        if( is_admin() ) {
            new \Osman\Haider\Admin();
        } else {
            // for frontend
        }
    }
 }

 /**
  * Initialize the main plugin
  *
  * @return \Osman_Haider
  */
function osman_haider() {
    return Osman_Haider::init();
}

// kick-off the plugin
osman_haider();
