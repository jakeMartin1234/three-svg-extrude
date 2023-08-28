const path = require('path');

module.exports = {
    entry: './src/index.js', // Assuming you've placed your function in a src folder
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'three-svg-extrude'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: {
        'three': 'THREE'
    }
};
