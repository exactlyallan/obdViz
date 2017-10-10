const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8000',
        './src/index.js'
    ],
    module: {
        rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
        {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?name=images/[name].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: __dirname + '/public',
        publicPath: '',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head', // A-frame requires components injected before DOM
            filename: "index.html",
            template: "src/raw-index.html" // html based on tempalte, use style instead of css
        })
    ]
};