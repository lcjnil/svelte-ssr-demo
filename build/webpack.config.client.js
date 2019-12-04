const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base');
const routes = require('../src/routes');

module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: false,
                        generate: 'dom',
                        hydratable: true,
                        legacy: true,
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_SSR: 'false',
        }),
        ...routes.map(
            ({ name }) =>
                new HtmlWebpackPlugin({
                    filename: `${name}/index.html`,
                    template: './src/template.html',
                    inject: true,
                    chunks: [name],
                }),
        ),
    ],
});
