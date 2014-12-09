'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
    .controller('HomepageController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .directive('homepage', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            templateUrl: '/scripts/homepage/homepage.html'
        };
    });
