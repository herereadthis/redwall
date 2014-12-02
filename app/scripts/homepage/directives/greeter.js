'use strict';

var greeterService = angular.module('greeterService', []);

greeterService.factory('greeter', ['$window', function($window) {
        return {
            greet: function(text) {
                $window.console.log('hello ' + text);
            }
        };
    }]);