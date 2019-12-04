const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const routes = require('../src/routes');
const entry = routes.reduce((result, route) => {
    result[route.name] = route.entry;
    return result;
}, {});

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    mode,
    entry,
    devtool: prod ? false : 'source-map',
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name]/index.js',
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|mjs|svelte)$/,
                use: {
                    loader: 'babel-loader',
                },
                include: [path.resolve('./src'), path.resolve('./node_modules/svelte')],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/index.css',
        }),

    ],
};
