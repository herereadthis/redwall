var express, path, fs, httpProxy;

express = require('express');
path = require('path');
fs = require('fs');
httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'app');

app.use(express.static(publicPath));


app.get('/timestamp.json', function(req, res) {
    fs.readFile('dist/timestamp.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});


// icons for predefined annotations
app.get('/images/banner_image/:img', function (req, res) {
    var img = fs.readFileSync('./static/images/banner_image/' +
        req.params.img);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');
});


// We only want to run the workflow when not in production
if (!isProduction) {

    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    var bundle = require('./server/bundle.js');
    bundle();

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});

