const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        main: './main.ts',
    },
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: false
    },
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
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.node'],
    },
    mode: 'production',

    stats: {
        warnings: false
    },

    optimization: {
        // namedModules: true, // uncomment this to fix build problem
        // namedChunks: true, // uncomment this to fix build problem

        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: true,
            extractComments: true,
            terserOptions: {
                warnings: true,
                ie8: true,
                // keep_fnames: true, // uncomment this to fix build problem
                // keep_classnames: true, // uncomment this to fix build problem
            }
        })]
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
