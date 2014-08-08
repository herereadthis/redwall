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
        showPageStats = function() {
            var jsonFile, documentURL, origin;

            documentURL = encodeURIComponent(window.location.pathname);
            jsonFile = "http://redwall.herereadthis.com/api/page_stats/";
            origin = window.location.origin;

            if (origin != "http:\/\/herereadthis.com") {
                console.log("not testing on production");
            }
            else {
                console.log("testing page stats on production");
                jsonFile = jsonFile + "?url=" + documentURL;
            }
            $.getJSON(jsonFile, function(data) {
                var getJSON, urlPath, _i, row;
                getJSON = data;
                urlPath = decodeURIComponent(documentURL);
                for (_i in getJSON) {
                    row = getJSON[_i];
                    if (row.url_path === urlPath) {
                        console.log("page hits: " + row.page_hits);
                    }
                }
            });

            // $.getJSON(jsonFile, function(data) {
            //     var getPageStats = data;
            //     // console.log(getPageStats.length);
            //     // // $this.append(JSON.stringify(fubar));
            //     // console.log(getPageStats);

            // });

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
