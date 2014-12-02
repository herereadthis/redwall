'use strict';

var pageCountService = angular.module('pageCountService', ['ngResource']);

pageCountService.factory('pageCount', ['$resource', function($resource) {
        return $resource('http://redwall.herereadthis.com/api/page_stats/?url=http://herereadthis.com/', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    }]);
