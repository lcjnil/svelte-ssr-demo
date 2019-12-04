const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.base');
const routes = require('../src/routes');

module.exports = merge(baseConfig, {
    target: 'node',
    output: {
        path: path.resolve('./dist/ssr'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: false,
                        hotReload: false,
                        generate: 'ssr',
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_SSR: 'true',
        }),
    ],
});
