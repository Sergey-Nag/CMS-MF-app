const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3001,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    output: {
        publicPath: 'http://localhost:3001/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'remote',
            library: { type: 'var', name: 'remote' },
            filename: 'remoteEntry.js',
            exposes: {
                './AdminComponent': './src/App'
            },
            shared: {
                react: {
                    singleton: true,
                    version: '0',
                    requiredVersion: false,
                },
                'react-dom': {
                    requiredVersion: false,
                    singleton: true,
                    version: '0',
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};