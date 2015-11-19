/**
 * Frontend scripts init
 */
(function( $ ) {

	$(function() {

		// Setup radial progress bar
		$( '.cherry-charts-bar.radial' ).each( function() {

			var dataProgress = [
					{
						value: $( this ).data( 'value' ),
						color: $( this ).data( 'color' )
					},
					{
						value: $( this ).data( 'left' ),
						color: $( this ).data( 'bg-color' )
					}
				],
				optionProgress = {
					scaleShowLabels: false,
					showTooltips: false,
					animationSteps: 100,
					segmentShowStroke: false,
					percentageInnerCutout: $( this ).data( 'cutout' ),
					animationEasing: 'easeOutExpo'
				},
				userOptions = $( this ).data( 'user-settings' ),
				ctxProgress,
				chartProgress;

			if ( userOptions ) {
				$.extend( optionProgress, userOptions );
			}

			ctxProgress = $( 'canvas', this ).get( 0 ).getContext( '2d' );
			chartProgress = new window.Chart( ctxProgress ).Doughnut( dataProgress, optionProgress );

		});

		// Setup pie data
		$( '.cherry-charts-pie' ).each( function() {

			var pieData = $( this ).data( 'pie' ),
				showLabels = $( this ).data( 'show-labels' ),
				showLegend = $( this ).data( 'show-legend' ),
				optionPie = {
					scaleShowLabels: showLabels,
					showTooltips: showLabels,
					animationSteps: 100,
					segmentShowStroke: false,
					animationEasing: 'easeOutExpo'
				},
				userOptions = $( this ).data( 'user-settings' ),
				ctxPie,
				chartPie,
				legend;

			if ( userOptions ) {
				$.extend( optionPie, userOptions );
			}

			ctxPie = $( 'canvas', this ).get( 0 ).getContext( '2d' );
			chartPie = new window.Chart( ctxPie ).Pie( pieData, optionPie );

			if ( 'yes' === showLegend ) {
				legend = chartPie.generateLegend();
				$( this ).append( legend );
			}
		});

		// Setup doughnut data
		$( '.cherry-charts-doughnut' ).each( function() {

			var doughnutData = $( this ).data( 'doughnut' ),
				showLabels = $( this ).data( 'show-labels' ),
				showLegend = $( this ).data( 'show-legend' ),
				optionDoughnut = {
					scaleShowLabels: showLabels,
					showTooltips: showLabels,
					animationSteps: 100,
					percentageInnerCutout: $( this ).data( 'cutout' ),
					segmentShowStroke: false,
					animationEasing: 'easeOutExpo'
				},
				userOptions = $( this ).data( 'user-settings' ),
				ctxDoughnut,
				chartDoughnut,
				legend;

			if ( userOptions ) {
				$.extend( optionDoughnut, userOptions );
			}

			ctxDoughnut = $( 'canvas', this ).get( 0 ).getContext( '2d' );
			chartDoughnut = new window.Chart( ctxDoughnut ).Doughnut( doughnutData, optionDoughnut );

			if ( 'yes' === showLegend ) {
				legend = chartDoughnut.generateLegend();
				$( this ).append( legend );
			}
		});

		// Setup bar chart
		$( '.cherry-charts-type-bar' ).each( function() {

			var barData = {
					labels: $( this ).data( 'labels' ),
					datasets: $( this ).data( 'bar' )
				},
				showLabels = $( this ).data( 'show-labels' ),
				showLegend = $( this ).data( 'show-legend' ),
				optionsBar = {
					scaleShowLabels: showLabels,
					showTooltips: showLabels,
					animationSteps: 100,
					segmentShowStroke: false,
					multiTooltipTemplate: '<%= datasetLabel %>: <%= value %>',
					animationEasing: 'easeOutExpo'
				},
				userOptions = $( this ).data( 'user-settings' ),
				ctxBar,
				chartBar,
				legend;

			if ( userOptions ) {
				$.extend( optionsBar, userOptions );
			}

			ctxBar = $( 'canvas', this ).get( 0 ).getContext( '2d' );
			chartBar = new window.Chart( ctxBar ).Bar( barData, optionsBar );

			if ( true === showLegend ) {
				legend = chartBar.generateLegend();
				$( this ).append( legend );
			}
		});

		// Setup vertical and horizontal progress bars
		$( '.cherry-charts-bar.horizontal' ).each( function() {
			var width = $( this ).data( 'value' );
			$( '.cherry-charts-progress', $( this ) ).css( 'width', width + '%' );
		});

		$( '.cherry-charts-bar.vertical' ).each( function() {

			var height  = $( this ).data( 'value' ),
				animate = $( this ).data( 'animate' );

			if ( 'no' !== animate ) {
				$( '.cherry-charts-progress', $( this ) ).css( 'height', height + '%' );
			}

		});
	});

})( jQuery );
