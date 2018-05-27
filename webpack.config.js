const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            options: {
                presets: ['env']
            }
        }, {
            // typescript の compile
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.(less|css)$/,

            use: [{
                loader: 'css-loader',

                options: {
                    sourceMap: true
                }
            }, {
                loader: 'less-loader',

                options: {
                    sourceMap: true
                }
            }]
        }]
    },
    resolve: {
        // importで.tsファイルの参照を解決するため
        extensions: [
            '.ts'
        ],
        // Webpackで利用するときの設定
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [new UglifyJSPlugin()],
    entry: './src/main.ts',
    output: {
        // chunk hashが不要の場合
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
}