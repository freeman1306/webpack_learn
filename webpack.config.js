
// Tools for webpack
const path = require('path')

//Plugins
const HTMLWebpackplugin = require("html-webpack-plugin")
const { CleanWebpackPlugin} = require('clean-webpack-plugin')



// Exporting code of webpack as module

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',



    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },



    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },



    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    plugins: [
        new HTMLWebpackplugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ],



    // Rules for working with modules

    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }




}