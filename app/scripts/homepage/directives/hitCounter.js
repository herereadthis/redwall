'use strict';

angular.module('redwallApp')
    .directive('hitCounter', function() {

        var gVars, dVars, lcd, url;

        dVars= {};

        gVars = {
            figures: 6,
            colorOn: 'rgba(0,255,0,1)',
            colorOff: 'rgba(0,255,0,0.18)',
            cWidth: 120,
            cHeight: 240
        };

        // object of all the bars to make lcd numbers
        // cMatch represents when the bar is 'on' for that specific number
        // poly is the shape of the bar
        lcd = {
            // top horizontal bar
            tb: {
                cMatch: [0,2,3,5,6,7,8,9],
                poly: [18,12, 30,0, 90,0, 102,12, 90,24, 30,24]
            },
            // middle horizontal bar
            mb: {
                cMatch: [2,3,4,5,6,8,9],
                poly: [18,108, 30,96, 90,96, 102,108, 90,120, 30,120]
            },
            // bottom horizontal bar
            bb: {
                cMatch: [0,2,3,5,6,8],
                poly: [18,204, 30,192, 90,192, 102,204, 90,216, 30,216]  
            },
            // top left vertical bar
            tl: {
                cMatch: [0,4,5,6,8,9],
                poly: [0,30, 12,18, 24,30, 24,90, 12,102, 0,90]
            },
            // top right vertical bar
            tr: {
                cMatch: [0,1,2,3,4,7,8,9], 
                poly: [96,30, 108,18, 120,30, 120,90, 108,102, 96,90]
            },
            // bottom left vertical bar
            bl: {
                cMatch: [0,2,6,8],
                poly: [0,126, 12,114, 24,126, 24,186, 12,198, 0,186]
            },
            // bottom right vertical bar
            br: {
                cMatch: [0,1,3,4,5,6,7,8,9],
                poly: [96,126, 108,114, 120,126, 120,186, 108,198, 96,186] 
            }
        };
        url = 'http://redwall.herereadthis.com/api/page_stats/?url=http://herereadthis.com/';
        return {
            restrict: 'A',
            scope: {
                hitCounterFigures: '='
            },
            controller: [
                '$scope',
                '$location',
                '$http',
                'pageCount',
                function($scope, $location, $http, pageCount) {
                // window.console.log($location.path());

                $scope.makeNumbers = function(element, figures) {
                    window.console.log('aw9eufhila');
                    window.console.log(figures);
                    var _i, placeNumberClass, hitNum;

                    for (_i = 0; _i < figures; _i += 1) {

                        placeNumberClass = 'counter_digit_' + _i;
                        window.console.log(pageNumberClass);
                    }
                };
                $scope.foo = pageCount.query();
                // window.console.log($scope.foo);
                $scope.makeItHappen = function (element) {
                    $http.get(url).success(function(data) {
                        $scope.pageCount = data;
                        window.console.log($scope.pageCount);

                        dVars.figures = $scope.hitCounterFigures || gVars.figures;



                    });  
                };

            }],
            link: function(scope, element, attrs) {
                scope.makeItHappen(element);
                // scope.makeNumbers(element, dVars.figures);
            },
        };
    });