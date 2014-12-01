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
    .config(
    [
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    title: 'Here, Read This',
                    templateUrl: 'views/homepage.html',
                    controller: 'HomepageController'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        }])
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

        $rootScope.location = 'http://herereadthis.com' + $location.path();
    }]);
