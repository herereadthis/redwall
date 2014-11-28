'use strict';

/**
 * @ngdoc overview
 * @name redwallApp
 * @description
 * # redwallApp
 *
 * Main module of the application.
 */
angular
    .module('redwallApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'Here, Read This',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    // http://stackoverflow.com/questions/12506329/
    // how-to-dynamically-change-header-based-on-angularjs-partial-view
    .run(['$location', '$rootScope', function ($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            var viewTitle = current.$$route.title,
                defaultTitle = 'Here, Read This';

            if (viewTitle !== '') {
                $rootScope.title = viewTitle + ' &mdash; ' + defaultTitle;
            }
            else {
                $rootScope.title = defaultTitle;
            }
        });
    }]);