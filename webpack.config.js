const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:4000',
        'webpack/hot/only-dev-server',
        "./src/client/index.js"
        ],

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/build/',
    },

    module:{
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        host: 'localhost',
        hot: true,
        proxy: {
            '*': 'http://localhost:3000',
        },
        port: 4000,
    }
}