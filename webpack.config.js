/*
 A lot of the work here inspired from
 http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
 */

var Webpack, path, paths,
    ExtractTextPlugin, SaveAssetsJson, TimestampWebpackPlugin,
    HtmlWebpackPlugin,
    config;

Webpack = require('webpack');

path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');

paths = {
    // node path module
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponents: path.resolve(__dirname, 'bower_components'),
    archiveBuild: path.resolve(__dirname, 'archive'),
    docs: path.resolve(__dirname, 'docs'),
    build: path.resolve(__dirname, 'app'),
    dist: path.resolve(__dirname, 'dist'),
    main: path.resolve(__dirname, 'app', 'main.js'),
    watches: path.resolve(__dirname, 'app/views/Watches', 'main.js'),
    esLintRC: path.resolve(__dirname, '.eslintrc')
};

// Extract Text Plugin is for embedded stylesheets to be compiled as CSS
// http://webpack.github.io/docs/stylesheets.html
ExtractTextPlugin = require("extract-text-webpack-plugin");
SaveAssetsJson = require('assets-webpack-plugin');
TimestampWebpackPlugin = require('timestamp-webpack-plugin');

config = {
    // Makes sure errors in console map to the correct file and line number
    devtool: 'inline-source-map',
    debug: true,
    entry: {
        app: [
            // For hot style updates
            'webpack/hot/dev-server',
            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080',
            // Our application
            paths.main
        ],
        watches: [
            // For hot style updates
            'webpack/hot/dev-server',
            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080',
            // Our application
            paths.watches
        ],
        vendors: ['react', 'react-router', 'flummox', 'axios', 'lodash']
    },
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the paths.build
        // as that points to where the files will eventually be bundled
        // in production
        path: path.join(__dirname, "js"),
        filename: "[name].bundle.js",

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/'
    },
    eslint: {
        configFile: paths.esLintRC
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'app']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [paths.nodeModules, paths.bowerComponents, paths.archiveBuild],
                loader: 'babel',
                query: {
                    // handle flummox async, or otherwise,
                    //  Uncaught ReferenceError:
                    // regeneratorRuntime is not defined webpack
                    optional: ['runtime'],
                    stage: 0
                }
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: paths.nodeModules
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader', 'css-loader!less-loader'
                )
            },
            {
                test: /\.(json)$/,
                loader: 'json'
            },
            {
                // favicon
                test: /\.(ico)$/,
                loader: "static-loader"
            },
            {
                test: /\.(jpg?g|png|jpg|svg|gif)$/,
                loaders: [
                    'url?limit=10240&digest=hex&name=img-[sha512:hash:base64:7].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
        new Webpack.optimize.DedupePlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: 'app/index.html',
            excludeChunks: ['watches.bundle.js']
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'watches/index.html',
            template: 'app/views/watches/index.html',
            excludeChunks: ['app.bundle.js']
        }),
        new SaveAssetsJson({
            path: paths.build,
            filename: 'assets.json'
        }),
        new TimestampWebpackPlugin({
            path: paths.dist
        })
    ]
};

module.exports = config;
