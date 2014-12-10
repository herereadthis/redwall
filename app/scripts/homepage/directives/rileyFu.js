'use strict';

angular.module('redwallApp')
    .directive('rileyFu', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/homepage/riley-fu.html'
        };
    });