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

				var getNav = function(n) {
					return navContainer.find(options.navigationSelector + ':eq(' + (n-1) + ')');
				};

				var getStep = function(n) {
					return stepsContainer.find(options.stepSelector + ':eq(' + (n-1) + ')');
				};

				var stepsObj = {
					restart: function() {
						stepsObj.goTo(1);
					},
					numberOfSteps: function() {
						return stepsContainer.find(options.stepSelector).length;
					},
					currentStep: function() {
						return currentStep;
					},
					goTo: function(n) {
						var currentNavElem = getNav(currentStep);
						var currentStepElem = getStep(currentStep);

						var nextStep;

						if (n > currentStep) {
							for (var i = currentStep; i <= n; i++) {
								nextStep = i;
								if (!options.canGoForward(i, getStep(i))) {
									break;
								}
							}
						} else {
							nextStep = n;
						}

						var nextNavObj = getNav(nextStep);
						var nextStepObj = getStep(nextStep);

						$.fn.customSteps.transitions.animateStepOut(currentStep, currentStepElem, function() {
							$.fn.customSteps.transitions.animateNavOut(currentStep, currentNavElem, function() {
								$.fn.customSteps.transitions.animateNavIn(nextStep, nextNavObj, function() {
									$.fn.customSteps.transitions.animateStepIn(nextStep, nextStepObj, function() {
										currentStep = nextStep;
									});
								});
							});
						});
					},
					next: function() {
						stepsObj.goTo(currentStep+1);
					},
					previous: function() {
						stepsObj.goTo(currentStep-1);
					}
				};

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
			canGoForward: function(step, element) {
				return true;
			}
	};

	$.fn.customSteps.transitions = {
		animateNavOut: function(navStep, element, cb) {
			element.removeClass('active');
			cb && cb();
		},
		animateNavIn: function(navStep, element, cb) {
			element.addClass('active');
			cb && cb();
		},
		animateStepOut: function(step, element, cb) {
			element.removeClass('active');
			cb && cb();
		},
		animateStepIn: function(step, element,cb) {
			element.addClass('active');
			cb && cb();
		}
	};

}(jQuery));
