const path = require('path');


module.exports = {
    entry: "./src/server/index.js",

    output: {
        path: path.resolve(__dirname, "serverbuild"),
        filename: "bundle.js",
    },

    target: "node",

    module:{
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css$/,
                use: [ 'ignore-loader' ]
            }
        ]
    }
}