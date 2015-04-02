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

                        $scope.keys = [];
                        var _l, _k;
                        _l = 0;
                        // loop though first entry and get keys
                        // ES6 Object.key didn't really work that well
                        for (_k in $scope.watchData[0]) {
                            if (_k !== 'id') {
                                $scope.keys[_l] = _k;
                                _l = _l + 1;
                            }
                        }

                        $scope.newKeys = _.map($scope.watchData[0], function(val, key) {
                            return {
                                keyName: key,
                                state: false
                            };
                        });
                    });

                    $scope.sortType = 'companyName';
                }
            ],
            templateUrl: '/scripts/watches/watches.html'
        };
    });