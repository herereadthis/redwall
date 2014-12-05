'use strict';

angular.module('redwallApp')
    .directive('popupBoxSimulator', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                titleBar: '='
            },
            controller: function($scope) {
            },
            link: function(scope, element) {
            },
            templateUrl: '/scripts/components/popupBoxSimulator/popup-box-simulator.html'
        };
    });
