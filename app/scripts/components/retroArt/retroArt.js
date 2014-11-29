'use strict';

// draws heavily from http://jsfiddle.net/jaredwilli/SfJ8c/
angular.module('redwallApp')
    .directive('retroArt', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/components/retroArt/retro-art.html'
        };
    });