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
                    window.console.log('asdf');

                    $http.get('json/linkoftheday.min.json').success(function(data) {
                        $scope.linkData = data;
                        $scope.foo = _.uniq(data, function(story) {
                            return story.source;
                        });
                        window.console.log($scope.foo);
                        
                    });
                }
            ],
            templateUrl: '/scripts/linkOfTheDay/link-of-the-day.html'
        };
    });
