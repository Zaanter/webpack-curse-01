const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@template': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[contenthash][ext]'
                }
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash][ext]',
                },
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new dotenv(),
        new CleanWebpackPlugin()
    ],
    optimization:{
        minimize:true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}