'use strict';

angular.module('redwallApp')
    .directive('retroArt', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/homepage/retro-footer.html'
        };
    });