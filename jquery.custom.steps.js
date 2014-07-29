(function($) {

	$.fn.customSteps = function(options) {
		var settings = $.extend({}, $.fn.customSteps.defaults, options);

		var getWizard = function(el) {
			return el.data('wizard');
		};

		var methods = {
			init: function(options) {
				var navContainer = this.find(options.navigationContainerSelector);
				var stepsContainer = this.find(options.stepsContainerSelector);

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
			},
			next: function() {
				var wizard = getWizard(this);
				wizard.next();
			},
			previous: function() {
				var wizard = getWizard(this);
				wizard.previous();
			}
		};

		return this.each(function() {
			if (typeof options == 'string') {
				if (methods[options]) {
					methods[options].apply(this, [].slice.call(arguments, 1));
				}
			} else {
				var wizard = methods.init.apply(this, arguments);
				this.data('wizard', wizard);
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
