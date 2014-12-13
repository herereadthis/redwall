'use strict';

angular.module('redwallApp')
    .directive('socialFu', function () {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
            },
            controller: [
                '$scope',
                function ($scope) {
                    window.console.log('social fu');

                    $scope.socialData = [
                        {
                            resourceUrl: 'https://www.facebook.com/',
                            text: 'Facebook',
                            url: 'https://www.facebook.com/herereadthis',
                            account: 'herereadthis'
                        },
                        {
                            resourceUrl: 'https://twitter.com/',
                            text: 'Twitter',
                            url: 'http://twitter.com/herereadthis',
                            account: 'herereadthis'
                        },
                        {
                            resourceUrl: 'https://github.com/',
                            text: 'GitHub',
                            url: 'https://github.com/herereadthis/redwall',
                            account: 'herereadthis'
                        },
                        {
                            resourceUrl: 'http://pinterest.com/',
                            text: 'Pinterest',
                            url: 'http://pinterest.com/herereadthis/',
                            account: 'herereadthis'
                        }
                    ]
                }],
            link: function (scope, element) {
            },
            templateUrl: '/scripts/components/socialFu/social-fu.html'
        };
    });

