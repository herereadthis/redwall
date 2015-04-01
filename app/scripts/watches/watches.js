'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
    .controller('WatchesController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .directive('watches', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            controller: [
                '$scope',
                '$http',
                function ($scope, $http) {
                    $http.get('json/watches.min.json').success(function(data) {
                        $scope.watchData = data;

                        var _a, parentCompany;

                        for (_a in $scope.watchData) {
                            if ($scope.watchData[_a].parentID !== null) {

                                parentCompany = _.where($scope.watchData, {
                                    id: $scope.watchData[_a].parentID
                                });
                                $scope.watchData[_a].parentCompany = 
                                    parentCompany[0].companyName;
                            }
                        }
                    });

                    $scope.sortType = 'companyName';
                }
            ],
            templateUrl: '/scripts/watches/watches.html'
        };
    });
