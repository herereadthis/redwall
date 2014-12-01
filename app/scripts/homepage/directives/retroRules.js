'use strict';

angular.module('redwallApp')
    .directive('retroRules', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/homepage/retro-rules.html'
        };
    });