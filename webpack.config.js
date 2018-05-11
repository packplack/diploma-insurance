const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const exctractPlugin = new ExtractTextPlugin({
    filename: 'static/bundle-[hash].css',
});

module.exports = {
    entry: [
        './client/client.js',
    ],
    output: {
        path: path.resolve(__dirname, './client-dist'),
        publicPath: '/',
        filename: 'static/bundle-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: { loader: 'vue-loader' },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
            {
                test: /\.scss$/,
                use: exctractPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'sass-loader' },
                    ],
                }),
            },
            {
                test: /\.css$/,
                use: exctractPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { minimize: true } }
                    ],
                }),
            },
            {
                test: /\.html$/,
                use: { 
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                    },
                },
                
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/img/',
                    },
                },
            },
            { 
                test: /\.(woff|woff2|eot|ttf)$/, 
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'vue-svg-loader',
                    options: {},
                },
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    devServer: {
        noInfo: true,
        historyApiFallback: true,
        overlay: true,
        contentBase: path.join(__dirname, 'client-dist'),
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    plugins: [
        exctractPlugin,
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'client/index.html',
        }),
        new CleanWebpackPlugin(['client-dist']),
    ],
};

if (process.env.NODE_ENV === 'development') {
    module.exports.devtool = 'eval-source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '\'development\'',
            },
        }),
    ]);
}


if (process.env.NODE_ENV !== 'development') {
    module.exports.devtool = 'source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                comparisons: false,
                drop_console: true,
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]);
}
