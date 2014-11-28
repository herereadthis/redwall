'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
