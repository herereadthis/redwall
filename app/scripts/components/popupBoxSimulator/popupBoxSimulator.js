'use strict';

angular.module('redwallApp')
    .directive('popupBoxSimulator', function() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                titleBar: '=',
                popupTitle: '='
            },
            controller: function($scope) {
            },
            link: function(scope, element) {
                element.find('h1').text(scope.popupTitle);
            },
            templateUrl: '/scripts/components/popupBoxSimulator/popup-box-simulator.html'
        };
    });

