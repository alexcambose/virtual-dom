
const path = require('path');
module.exports = {
    entry: './src/index',
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    mode: 'development',
    devtool: 'source-map',
};