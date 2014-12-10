'use strict';

angular.module('redwallApp')
    .directive('popupBoxSimulator', function () {
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
                function ($scope, colorShift) {
                    var colorShiftParams = {
                        colorBegin: $scope.colorShiftStart,
                        colorEnd: $scope.colorShiftEnd,
                        title: $scope.popupTitle
                    };
                    $scope.colorShiftTitle = colorShift.letters(colorShiftParams);
                }],
            link: function (scope, element) {
            },
            templateUrl: '/scripts/components/popupBoxSimulator/popup-box-simulator.html'
        };
    });

