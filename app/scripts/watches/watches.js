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
                            $scope.watchData[_a].showModal = false;
                        }

                        $scope.licencedCompanies = $scope.watchData;
                        $scope.licencedCompanies = _.where($scope.licencedCompanies, {
                            companyType: 'licence'
                        });


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
                    $scope.colOrder = {
                        type: 'companyName',
                        reverse: false
                    };

                    $scope.licenseOrder = {
                        type: 'companyName',
                        reverse: false
                    };

                    $scope.sortType = 'companyName';
                    $scope.reverseSort = false;

                    $scope.sortCol = function(key) {
                        var sortColumn = _.where($scope.newKeys, {keyName: key});

                        if ($scope.sortType === key) {
                            sortColumn[0].state = !sortColumn[0].state;
                        }

                        $scope.colOrder = {
                            type: sortColumn[0].keyName,
                            reverse: sortColumn[0].state
                        };
                    };


                    $scope.sortLicense = function(key) {
                        var sortColumn = _.where($scope.newKeys, {keyName: key});

                        if ($scope.sortType === key) {
                            sortColumn[0].state = !sortColumn[0].state;
                        }

                        $scope.licenseOrder = {
                            type: sortColumn[0].keyName,
                            reverse: sortColumn[0].state
                        };
                    };
                    $scope.launchWatchModal = function(rowID) {
                        var closeModal, openModal;

                        closeModal = _.find($scope.watchData, function(item) {
                            return item.showModal === true;
                        });

                        openModal = _.findWhere($scope.watchData, {id: rowID});

                        if (openModal.id === rowID && openModal.showModal === true) {
                            window.console.log(1);
                            openModal.showModal = false;
                        }
                        else {
                            if (closeModal !== undefined) {
                                closeModal.showModal = false;
                            }
                            openModal.showModal = true;
                        }
                        $scope.showWatchDetail = true;
                        $scope.watchDetail = {
                            title: openModal.companyName
                        };
                    };
                    $scope.showWatchDetail = false;
                    $scope.watchDetail = {};

                }
            ],
            templateUrl: '/scripts/watches/watches.html'
        };
    });