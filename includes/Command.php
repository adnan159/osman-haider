<?php

/**
 * Manage the AJAX endpoint.
 *
 * @package Osman\Haider
 */

namespace Osman\Haider;

use WP_CLI;
use WP_CLI_Command;

/**
 * Manage the AJAX endpoint.
 */
class Command extends WP_CLI_Command {

    /**
     * Force refresh of the data for the AJAX endpoint.
     *
     * ## OPTIONS
     *
     * None.
     *
     * ## EXAMPLES
     *
     *     wp miusage-cache refresh
     *
     * @when after_wp_load
     */
    public function refresh() {
        // Define the transient key used for caching
        $transient_key = 'miusage_cached_data';

        // Delete the transient to force a refresh on the next AJAX request
        if ( delete_transient( $transient_key ) ) {
            WP_CLI::success( 'Data refresh forced for the next AJAX request.' );
        } else {
            WP_CLI::error( 'Failed to delete transient.' );
        }
    }

}
