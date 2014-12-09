'use strict';

angular.module('redwallApp')
    .directive('popupBoxSimulator', function() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                titleBar: '=',
                popupTitle: '=',
                colorShiftStart: '=',
                colorShiftEnd: '='
            },
            controller: [
                '$scope',
                'colorShift',
                function($scope, colorShift) {
                $scope.colorShiftTitle = colorShift.letters($scope.popupTitle);
            }],
            link: function(scope, element) {
            },
            templateUrl: '/scripts/components/popupBoxSimulator/popup-box-simulator.html'
        };
    });

