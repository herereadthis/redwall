'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
    .controller('LinkOfTheDayController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .directive('linkOfTheDay', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            controller: [
                '$scope',
                '$http',
                function ($scope, $http) {
                    $http.get('json/linkoftheday.min.json').success(function(data) {
                        var sourceCount, sourceTypeCount;

                        $scope.limit = 2;
                        $scope.linkData = data;
                        $scope.sourceSize = data.length;

                        sourceCount = _.countBy(data, 'source');
                        $scope.sourceObject = _.map(sourceCount, function(val, key) {
                            return {
                                source: key,
                                count: val
                            };
                        });

                        sourceTypeCount = _.countBy(data, 'sourceType');
                        $scope.sourceTypeObject = _.map(sourceTypeCount, function(val, key) {
                            return {
                                sourceType: key,
                                count: val
                            };
                        });
                        $scope.query = '';
                    });

                    $scope.filterSource = function(source) {
                        if (_.isNull(source) || _.isUndefined(source)) {
                            $scope.query = '';
                        }
                        else {
                            $scope.query = {
                                source: source
                            };
                        }
                    };
                    $scope.filterSourceType = function(sourceType) {
                        if (_.isNull(sourceType) || _.isUndefined(sourceType)) {
                            $scope.query = '';
                        }
                        else {
                            $scope.query = {
                                sourceType: sourceType
                            };
                        }
                    };
                    $scope.sourceFilter = 'source';
                    $scope.filterSorce = function(orderProp) {
                        $scope.sourceFilter = orderProp;
                    };
                    $scope.sourceTypeFilter = 'sourceType';
                    $scope.filterSorceType = function(orderProp) {
                        $scope.sourceTypeFilter = orderProp;
                    };
                    $scope.mediaExists = function(media) {
                        if (_.isNull(media) || _.isUndefined(media) || media === '') {
                            return false;
                        }
                        else {
                            return true;
                        }
                    };
                    $scope.checkVideo = function(url,videoSource) {
                        var index = url.indexOf(videoSource);

                        if (index > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }
            ],
            templateUrl: '/scripts/linkOfTheDay/link-of-the-day.html'
        };
    });
