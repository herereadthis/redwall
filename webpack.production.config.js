// Most things in here will mirror webpack.config.js. For clarification on
// what is implemented here, see the comments in that file.
var Webpack, path, paths,
    ExtractTextPlugin, HtmlWebpackPlugin,
    SaveAssetsJson, TimestampWebpackPlugin,
    config;

Webpack = require('webpack');

path = require('path');

paths = {
    // node path module
    nodeModules: path.resolve(__dirname, 'node_modules'),
    bowerComponents: path.resolve(__dirname, 'bower_components'),
    archiveBuild: path.resolve(__dirname, 'archive'),
    docs: path.resolve(__dirname, 'docs'),
    build: path.resolve(__dirname, 'dist'),
    main: path.resolve(__dirname, 'app', 'main.js'),
    watches: path.resolve(__dirname, 'app/views/Watches', 'main.js')
};

// https://www.npmjs.com/package/html-webpack-plugin
HtmlWebpackPlugin = require('html-webpack-plugin');
ExtractTextPlugin = require("extract-text-webpack-plugin");
SaveAssetsJson = require('assets-webpack-plugin');
TimestampWebpackPlugin = require('timestamp-webpack-plugin');

config = {
    debug: false,
    entry: {
        app: paths.main,
        watches: paths.watches,
        vendors: ['react', 'react-router', 'flummox', 'axios', 'lodash']
    },
    output: {
        path: paths.build,
        filename: "[name].bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [paths.nodeModules, paths.bowerComponents, paths.archiveBuild, paths.docs],
                loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 0
                }
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
                test: /\.(ico)$/,
                loader: "static-loader"
            },
            {
                test: /\.(jpg?g|png|jpg|svg|gif)$/,
                loaders: [
                    "url?limit=10240&digest=hex&name=img-[sha512:hash:base64:7].[ext]",
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'app/']
    },
    plugins: [
        // Search for equal or similar files and deduplicate them in the
        // output.
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
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
            path: paths.build
        })
    ]
};

module.exports = config;
