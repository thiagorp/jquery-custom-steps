(function($) {

	$.fn.customSteps = function(options) {
		var settings = $.extend({}, $.fn.customSteps.defaults, options);

		var buildSteps = function(element, options) {
			var navContainer = $(options.navigationContainerSelector);
			var stepsContainer = $(options.stepsContainerSelector);

			return (stepsObj = {
				restart: function() {
				},
				numberOfSteps: function() {
				},
				currentStep: function() {
				},
				goTo: function(n) {
				},
				next: function() {
				},
				previous: function() {
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
