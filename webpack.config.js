const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'virtual-dom.js',
    },
    mode: process.env.NODE_ENV || 'production',
    devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : '',
    // plugins: [
    //     new UglifyJsPlugin()
    // ],
    devServer: {
        contentBase: path.join(__dirname, "demo"),
      }
};
