const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        main: './main.ts',
    },
    target: "node",
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.(json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ],

                exclude: /node_modules/,

            },
            {
                test: /\.(ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.node$/,
                loader: "native-ext-loader"
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.node'],
    },
    mode: 'development',

    stats: {
        warnings: false
    },

    externals: ["pg", "sqlite3", "pg-hstore", "rmcast"],
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {from: 'data', to: 'data'},
        ]),
    ]
};

module.exports = config;
