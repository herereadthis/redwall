'use strict';

var colorShiftService = angular.module('colorShiftService', []);

colorShiftService.factory('colorShift', function() {
		
        return {
            letters: function(text) {
            	return(text);
            }
        };
    });
