<?php

/**
 * Plugin Name: Cherry Charts
 * Plugin URI:  http://www.cherryframework.com/
 * Description: Charts plugin.
 * Version:     1.0.1
 * Author:      Cherry Team
 * Author URI:  http://www.cherryframework.com/
 * Text Domain: cherry-charts
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // disable direct access
}

if ( ! class_exists( 'cherry_charts' ) ) {
	/**
	 * Main plugin class
	 */
	final class cherry_charts {

		/**
		 * @var   string
		 * @since 1.0.0
		 */
		public $version = '1.0.1';

		/**
		 * Constructor
		 */
		public function __construct() {
			// Set the constants needed by the plugin.
			$this->constants();
			// Internationalize the text strings used.
			add_action( 'plugins_loaded', array( $this, 'lang' ), 2 );
			// Include necessary files
			add_action( 'plugins_loaded', array( $this, 'includes' ), 5 );
			add_action( 'plugins_loaded', array( $this, 'admin' ), 1 );
			add_action( 'plugins_loaded', array( $this, 'updater' ), 10 );
		}

		/**
		 * Initialise translations
		 *
		 * @since 1.0.0
		 */
		public function lang() {
			load_plugin_textdomain( 'cherry-charts', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}

		/**
		 * Defines constants for the plugin.
		 *
		 * @since 1.0.0
		 */
		function constants() {

			/**
			 * Set the version number of the plugin.
			 *
			 * @since 1.0.0
			 */
			define( 'CHERRY_CHARTS_VERSION', $this->version );

			/**
			 * Set the slug of the plugin.
			 *
			 * @since 1.0.0
			 */
			define( 'CHERRY_CHARTS_SLUG', basename( dirname( __FILE__ ) ) );

			/**
			 * Set constant path to the plugin directory.
			 *
			 * @since 1.0.0
			 */
			define( 'CHERRY_CHARTS_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

			/**
			 * Set constant path to the plugin URI.
			 *
			 * @since 1.0.0
			 */
			define( 'CHERRY_CHARTS_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );

		}

		/**
		 * Include core files for both: admin and public
		 *
		 * @since 1.0.0
		 */
		function includes() {
			require_once( 'includes/cherry-charts-functions.php' );
			require_once( 'includes/class-cherry-charts-init.php' );
			require_once( 'includes/class-charts-shortcode.php' );
			// include updater class if not included
			if( !class_exists( 'EDD_SL_Plugin_Updater' ) ) {
				require_once( 'includes/lib/EDD_SL_Plugin_Updater.php' );
			}
		}

		function admin() {
			if ( is_admin() ) {
				require_once( CHERRY_CHARTS_DIR . 'admin/includes/class-cherry-update/class-cherry-plugin-update.php' );

				$Cherry_Plugin_Update = new Cherry_Plugin_Update();
				$Cherry_Plugin_Update -> init( array(
						'version'			=> CHERRY_CHARTS_VERSION,
						'slug'				=> CHERRY_CHARTS_SLUG,
						'repository_name'	=> CHERRY_CHARTS_SLUG
				));
			}
		}

		/**
		 * Init updater script
		 *
		 * @since  1.0.0
		 */
		function updater() {

			// retrieve our license key from the DB
			$license_key = get_option( 'cherry_keys' );
			$license_key = isset( $license_key['cherry-charts'] ) ? $license_key['cherry-charts'] : '';

			// setup the updater
			$edd_updater = new EDD_SL_Plugin_Updater(
				'https://cloud.cherryframework.com',
				__FILE__,
				array(
					'version'   => CHERRY_CHARTS_VERSION,
					'license'   => $license_key,
					'item_name' => 'Cherry Charts',
					'author'    => 'Cherry Team',
					'url'       => home_url()
				)
			);
		}

	}

	new cherry_charts();
}