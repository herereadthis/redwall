'use strict';

angular.module('redwallApp')
    .directive('socialFu', function () {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
            },
            controller: [
                '$scope',
                function ($scope) {
                    window.console.log('social fu');
                }],
            link: function (scope, element) {
            },
            templateUrl: '/scripts/components/popupBoxSimulator/popup-box-simulator.html'
        };
    });

