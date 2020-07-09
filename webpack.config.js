// Tools for webpack
const path = require('path')

//Plugins
const HTMLWebpackplugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')



const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader',
    ]

    if(extra) loaders.push(extra)

    return loaders
}


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
         config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}



// Exporting code of webpack as module

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',



    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },



    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },



    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },

    optimization: optimization(),

    devServer: {
        port: 4200,
        hot: isDev
    },

    plugins: [
        new HTMLWebpackplugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),

    ],



    // Rules for working with modules

    module: {
        rules: [{
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
            },
            {
                test: /\.css$/i,
                use: cssLoaders(),
            },
                {
                test: /\.s[ca]ss$/i,
                use:cssLoaders('sass-loader'),
            {
                test: /\.less$/,
                use: cssLoaders('less-loaders')
            },
        ]
    }




}