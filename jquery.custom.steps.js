(function($) {

	$.fn.customSteps = function(options) {

		var getWizard = function(el) {
			return el.data('wizard');
		};

		var methods = {
			init: function(options) {
				var navContainer = this.find(options.navigationContainerSelector);
				var stepsContainer = this.find(options.stepsContainerSelector);
				var currentStep = 1;

				var stepsObj = {
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

						navContainer.find(options.navigationSelector + ':eq(' + (n-1) + ')').addClass('active');
						stepsContainer.find(options.stepSelector + ':eq(' + (n-1) + ')').addClass('active');

						currentStep = n;
					},
					next: function() {
						stepsObj.goTo(currentStep+1);
					},
					previous: function() {
						stepsObj.goTo(currentStep-1);
					}
				};

				stepsObj.goTo(1);
				return stepsObj;
			},
			next: function() {
				var wizard = getWizard(this);
				wizard.next();
			},
			previous: function() {
				var wizard = getWizard(this);
				wizard.previous();
			},
			goTo: function(n) {
				var wizard = getWizard(this);
				wizard.goTo(n);
			}
		};

		var args = arguments;
		return this.each(function() {
			var elem = $(this);
			var options = args[0];

			if (typeof options == 'string') {
				if (methods[options]) {
					methods[options].apply(elem, [].slice.call(args, 1));
				}
			} else {
				var settings = $.extend({}, $.fn.customSteps.defaults, options);
				var wizard = methods.init.call(elem, settings);
				elem.data('wizard', wizard);
			}
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
