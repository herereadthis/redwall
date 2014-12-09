'use strict';

var colorShiftService = angular.module('colorShiftService', []);

colorShiftService.factory('colorShift', function() {
        return {
            greet: function(text) {
                window.console.log('hello ' + text);
            }
        };
    });
