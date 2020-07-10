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
const {BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')







// Helpers

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

const babelOptions = (preset) => {
const opts = {
    presets: [
        '@babel/preset-env',
      
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
}

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
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


const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}



const plugins = () => {
    
  const base = [
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

    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}






// Exporting code of webpack as module

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',



    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
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

    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),



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
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions(  '@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions(  '@babel/preset-react')
                }
            }
        ]
    }




}