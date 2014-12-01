'use strict';

angular.module('redwallApp')
    .directive('retroBanner', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/homepage/retro-banner.html'
        };
    });