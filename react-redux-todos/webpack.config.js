var dir = __dirname;
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var aboutHTML = path.join(dir, 'src', 'about.html');

module.exports = {
    entry: {
        vendor: [ 'jquery' ] 
        , app: dir + "/src/index"
        , about: aboutHTML
    }
    , output: {
        path: dir + '/dist'
        , filename: "[name].js"
    }
    , module: {
        loaders: [
            {
                test: aboutHTML 
                , loaders: [
                    'file?name=[name].[ext]'
                    , 'extract'
                    , 'html?' + JSON.stringify({
                        attrs: [
                            'img:src'
                            , 'link:href'
                        ]
                    })
                ]
            } 
            , {
                test: /\.css$/
                , loader: 'file?name=[path][name].[ext]!extract!css'
                // , loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
            , { 
                test: /\.jsx?$/
                , loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-1'
            }
            , {
                test: /\.(pn|jp)g$/
                , loader: 'url?limit=4000&name=[path][name].[ext]'
            }
        ]
    }
    , plugins: [
        // new HtmlWebpackPlugin({
        //     filename: 'index-auto-generated.html'
        // })
        new HtmlWebpackPlugin({
            // not work when using loader-template
            title: 'Todos App(not work)' 
            , filename: 'todos.html' 
            , template: 'html?attrs[]=img:src&attrs[]=link:href!./src/index.html'
            , inject: 'body'
            , chunks: [ 'vendor', 'app' ]
        })
        , new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        , new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            , minChunks: Infinity
        })
        // , new ExtractTextPlugin('[name]-[id].css')
    ]
}; 
