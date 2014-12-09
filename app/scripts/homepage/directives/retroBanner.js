'use strict';

angular.module('redwallApp')
    .directive('retroBanner', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            controller: ['colorShift', function(colorShift) {
                colorShift.greet('aowurgha;sgij');
            }],
            templateUrl: '/scripts/homepage/retro-banner.html'
        };
    });