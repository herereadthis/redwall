'use strict';

angular.module('redwallApp')
    .directive('hitCounter', function() {
        return {
            restrict: 'A',
            controller: [
                '$scope',
                '$location',
                '$http',
                'greeter',
                'pageCount',
                function($scope, $location, $http, greeter, pageCount) {
                    window.console.log($location.path());
                window.console.log('awegsf');

                var url = 'http://redwall.herereadthis.com/api/page_stats/?url=http://herereadthis.com/'

                $http.get(url).success(function(data) {
                    $scope.pageCount = data;
                    window.console.log($scope.pageCount);
                });

                // $scope.pageCount = pageCount.query();


                greeter.greet('world');
            }],
            link: function(scope, element, attrs) {
            },
        };
    });