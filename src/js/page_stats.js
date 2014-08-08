(function() {
    define(['jquery'], function($) {
        var exports,  makeItHappen, moduleName, exampleAjax, showPageStats;
        exports = {};
        moduleName = "page_stats";
        exampleAjax = function($this) {
            console.log($this.html());
            var jsonFile;
            jsonFile = "http://redwall.herereadthis.com/api/example/";

            $.getJSON(jsonFile, function(data) {
                var fubar = data;
                console.log(fubar.length);
                // $this.append(JSON.stringify(fubar));
                $this.html($('<ul />'));
                $ul = $this.find('ul');
                var _i, _len;
                for (_i = 0, _len = data.length;_i < _len;_i++) {
                    // for (strName in data[_i]) {
                    //     strValue = data[_i][strName];
                    //     console.log(strName, strValue);
                    // }
                    $ul.append($('<li />').html(data[_i].name + ": ").append(data[_i].age));
                }
            });

        };
        String.prototype.getHostname = function () {
            var re = new RegExp('^(?:f|ht)tp(?:s)?://([^/]+)');
            return this.match(re) [1].toString();
        },
        showPageStats = function() {
            var canonical, jsonFile, documentURL, productionURL, addPageHit, productionHost;

            canonical = $('[rel="canonical"]').attr('href').getHostname();
            documentURL = encodeURIComponent(window.location.pathname);
            productionHost = window.location.host;
            console.log(productionHost);
            jsonFile = "http://redwall.herereadthis.com/api/page_stats/";
            totalHits = 0;

            if (productionHost != canonical) {
                console.log("not testing on production");
            }
            else {
                console.log("testing page stats on production");
                addPageHit = jsonFile + "?url=http%3A%2F%2F" + canonical + documentURL;
                $.getJSON(addPageHit, function(data) {
                    var getJSON, urlPath, _i, row;
                    getJSON = data;
                    urlPath = decodeURIComponent(documentURL);
                    console.log("page hits: " + data.page_hits);
                });
            }

            $.getJSON(jsonFile, function(data) {
                var totalHits, _row, entryPageHits;
                totalHits = 0;
                for (_row in data) {
                    entryPageHits = parseInt(data[_row].page_hits, 10);
                    totalHits = totalHits + entryPageHits;
                }
                console.log("total hits: " + totalHits);
            });

        }
        makeItHappen = function() {
            showPageStats();
        };
        exports.init = function() {
            makeItHappen();
        };
        return exports;
    });
}).call(this);
