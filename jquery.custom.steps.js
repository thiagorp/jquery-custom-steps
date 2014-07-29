(function($) {

	$.fn.customSteps = function(options) {
		var settings = $.extend({}, $.fn.customSteps.defaults, options);

		var buildSteps = function(element, options) {
			var navContainer = element.find(options.navigationContainerSelector);
			var stepsContainer = element.find(options.stepsContainerSelector);

			var currentStep = 1;

			return (stepsObj = {
				restart: function() {
					currentStep = 1;

					navContainer.find(options.navigationSelector + '.active').removeClass('active');
					stepsContainer.find(options.stepSelector + '.active').removeClass('active');

					navContainer.find(options.navigationSelector + ':first-child').addClass('active');
					stepsContainer.find(options.stepSelector + ':first-child').addClass('active');
				},
				numberOfSteps: function() {
					return stepsContainer.find(options.stepSelector).length;
				},
				currentStep: function() {
					return currentStep;
				},
				goTo: function(n) {
					navContainer.find(options.navigationSelector + '.active').removeClass('active');
					stepsContainer.find(options.stepSelector + '.active').removeClass('active');

					navContainer.find(options.navigationSelector + ':eq(' + n + ')').addClass('active');
					stepsContainer.find(options.stepSelector + ':eq(' + n + ')').addClass('active');
				},
				next: function() {
					goTo(currentStep+1);
				},
				previous: function() {
					goTo(currentStep-1);
				}
			});
		};

		return this.each(function() {
			buildSteps(element, settings);
		});
	};

	$.fn.customSteps.defaults = {
			navigationContainerSelector: '.steps-nav-container',
			navigationSelector: '.step-nav',
			stepsContainerSelector: '.steps-container',
			stepSelector: '.step',
			fields: []
	};

}(jQuery));
