'use strict';

angular.module('redwallApp')
    .directive('bannerAds', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            templateUrl: '/scripts/homepage/banner-ads.html'
        };
    });