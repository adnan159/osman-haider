<?php

namespace Osman\Haider;

/**
 * Handle Assets 
 */
class Assets {

	public function __construct(){
		add_action( 'wp_enqueue_scripts', [$this, 'enqueue_assets'] );
		add_action( 'admin_enqueue_scripts', [$this, 'enqueue_assets'] );
	}

	public function get_script() {
        $mainJsPath = OSMAN_HAIDER_ASSETS . '/js/admin/dashboard.js';
        if (file_exists($mainJsPath)) {
            $version = filemtime($mainJsPath);
        } else {
            $version = '1.0.0';
        }

		return [
			'oh-admin-script' => [
				'src'			=> OSMAN_HAIDER_ASSETS . '/js/admin/dashboard.js',
				'version'		=> $version,
				'dependency'	=> [ 'jquery' ]
			],
		];
	}

	public function get_style() {
        $mainCssPath = OSMAN_HAIDER_ASSETS . '/css/admin/dashboard.css';
        if (file_exists($mainCssPath)) {
            $version = filemtime($mainCssPath);
        } else {
            $version = '1.0.0';
        }
		return [
			'oh-admin-style' => [
				'src'		=> OSMAN_HAIDER_ASSETS . '/css/admin/dashboard.css',
				'version'	=> $version
			]
		];
	}

	public function enqueue_assets() {
		$scripts = $this->get_script();
		$styles = $this->get_style();

		foreach( $scripts as $handle=>$script ) {

			$dependency = isset( $script['dependency'] ) ? $script['dependency'] : false;

			wp_register_script( $handle, $script['src'], $dependency, $script['version'], true );
		}

		foreach( $styles as $handle => $style ) {

			$dependency = isset( $style['dependency'] ) ? $style['dependency'] : false;

			wp_register_style( $handle, $style['src'], $dependency, $style['version'] );
		}

		// wp_localize_script( 'ascode-enquery-script', 'AsCodeUrl', [
		// 	'ajaxurl'	=> admin_url( 'admin-ajax.php' ),
		// 	'error'		=> __( 'Something went wrong!', 'asscode-addressbook' ),
		// ] );

		// wp_localize_script( 'ascode-admin-script', 'AsCodeUrl', [
		// 	'nonce'		=> wp_create_nonce( 'ascode-admin-nonce' ),
		// 	'confirm'	=> __( 'Are you sure?', 'asscode-addressbook' ),
		// 	'error'		=> __( 'Something went wrong!', 'asscode-addressbook' ),
		// ] );
	}
}