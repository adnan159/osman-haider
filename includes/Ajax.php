<?php

namespace Osman\Haider;

/**
 * The Ajax handler class
 */
class Ajax {

    /**
     * Class constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_nopriv_oh_miusage_action', array( $this, 'oh_miusage_action' ) );
        add_action( 'wp_ajax_oh_miusage_action', array( $this, 'oh_miusage_action' ) );
    }

    /**
     * Handle the Ajax request
     *
     * @return void
     */
    public function oh_miusage_action() {
        $cached_data = get_transient( 'miusage_cached_data' );

        if ( false === $cached_data ) {
            $api_url  = 'https://miusage.com/v1/challenge/1/';
            $response = wp_remote_get( esc_url( $api_url ) );

            if ( ! is_wp_error( $response ) && wp_remote_retrieve_response_code( $response ) === 200 ) {
                // If the API request is successful, cache the data for 1 hour
                $cached_data = wp_remote_retrieve_body( $response );
                set_transient( 'miusage_cached_data', $cached_data, HOUR_IN_SECONDS );
            }
        }

        wp_send_json( wp_unslash( $cached_data ) );
    }

}
