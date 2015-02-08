'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
    .controller('LinkOfTheDayController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .directive('linkOfTheDay', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            controller: [
                '$scope',
                '$http',
                function ($scope, $http) {
                    $http.get('json/linkoftheday.min.json').success(function(data) {
                        var sourceCount;

                        sourceCount = _.countBy(data, 'source');
                        $scope.limit = 2;
                        $scope.linkData = data;
                        $scope.sourceObject = _.map(sourceCount, function(val, key) {
                            return {
                                source: key,
                                count: val
                            };
                        });
                    });
                }
            ],
            templateUrl: '/scripts/linkOfTheDay/link-of-the-day.html'
        };
    });
