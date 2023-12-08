<?php

namespace Osman\Haider;

/**
 * Handle Assets
 */
class Assets {

    /**
     * Class constructor
     */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

    /**
     * Get all the scripts
     *
     * @return array
     */
	public function get_script() {
        $main_js_path = OSMAN_HAIDER_ASSETS . '/js/admin/dashboard.js';

        if ( file_exists( $main_js_path ) ) {
            $version = filemtime( $main_js_path );
        } else {
            $version = '1.0.0';
        }

		return array(
			'oh-admin-script' => array(
				'src'        => OSMAN_HAIDER_ASSETS . '/js/admin/dashboard.js',
				'version'    => $version,
				'dependency' => array( 'jquery' ),
			),
		);
	}

    /**
     * Get all the styles
     *
     * @return array
     */
	public function get_style() {
        $main_css_path = OSMAN_HAIDER_ASSETS . '/css/admin/dashboard.css';

        if ( file_exists( $main_css_path ) ) {
            $version = filemtime( $main_css_path );
        } else {
            $version = '1.0.0';
        }

		return array(
			'oh-admin-style' => array(
				'src'     => OSMAN_HAIDER_ASSETS . '/css/admin/dashboard.css',
				'version' => $version,
			),
		);
	}

    /**
     * Enqueue all the assets
     *
     * @return void
     */
	public function enqueue_assets() {
		$scripts = $this->get_script();
		$styles  = $this->get_style();

		foreach ( $scripts as $handle => $script ) {
			$dependency = $script['dependency'] ?? false;

			wp_register_script( $handle, $script['src'], $dependency, $script['version'], true );
		}

		foreach ( $styles as $handle => $style ) {
			$dependency = $style['dependency'] ?? false;

			wp_register_style( $handle, $style['src'], $dependency, $style['version'] );
		}

		// wp_localize_script( 'ascode-enquery-script', 'AsCodeUrl', [
		// 'ajaxurl'   => admin_url( 'admin-ajax.php' ),
		// 'error'     => __( 'Something went wrong!', 'asscode-addressbook' ),
		// ] );

		// wp_localize_script( 'ascode-admin-script', 'AsCodeUrl', [
		// 'nonce'     => wp_create_nonce( 'ascode-admin-nonce' ),
		// 'confirm'   => __( 'Are you sure?', 'asscode-addressbook' ),
		// 'error'     => __( 'Something went wrong!', 'asscode-addressbook' ),
		// ] );
	}

}
