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

		return array(
			'oh-admin-script' => array(
				'src'        => OSMAN_HAIDER_ASSETS . '/js/admin/dashboard.js',
				'version'    => '1.0.0',
				'dependency' => array( 'jquery' ),
			),
			'oh-block-script' => array(
				'src'        => OSMAN_HAIDER_ASSETS . '/js/frontend/build/miusage/index.js',
				'version'    => '1.0.0',
				'dependency' => array('wp-blocks', 'wp-element', 'wp-editor'),
			),
		);
	}
	
    /**
     * Get all the styles
     *
     * @return array
     */
	public function get_style() {

		return array(
			'oh-admin-style' => array(
				'src'     => OSMAN_HAIDER_ASSETS . '/css/admin/dashboard.css',
				'version' => '1.0.0',
			),
			'oh-block-style' => array(
				'src'     => OSMAN_HAIDER_ASSETS . '/css/frontend/block-style.css',
				'version' => '1.0.0',
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

		wp_localize_script( 'oh-block-script', 'miusageData', [
			'ajaxurl'   => admin_url( 'admin-ajax.php' ),
		] );
	}

}
