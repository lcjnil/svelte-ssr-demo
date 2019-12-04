const webpack = require('webpack');
const Koa = require('koa');
const once = require('lodash/once');
const fs = require('fs');
const path = require('path');

const clientConfig = require('../build/webpack.config.client');
const serverConfig = require('../build/webpack.config.server');
const routes = require('./routes');

const compiler = webpack([clientConfig, serverConfig]);

let resolver;

const buildPromise = new Promise(resolve => {
    resolver = once(resolve);
});

compiler.watch({}, (err, stats) => {
    console.log(stats.toString({ colors: true }));

    resolver();
});

const app = new Koa();

function staticRender(route) {
    const ssrResult = require(`../dist/ssr/${route.name}`).default;
    const template = fs.readFileSync(path.resolve(`./dist/${route.name}/index.html`), 'utf-8');

    return template
        .replace('<!-- ssr-outlet !-->', ssrResult.html)
        .replace(' <!-- head-placeholder !-->', ssrResult.head)
        .replace('<!-- css-placeholder !-->', `<style>${ssrResult.css.code}</style>`);
}

app.use(async (ctx, next) => {
    await resolver();

    const path = ctx.path;
    const route = routes.find(route => route.route === path);
    if (route) {
        ctx.body = staticRender(route);
        ctx.status = 200;
        return;
    }

    return next();
});

app.use(require('koa-static')(path.resolve('./dist')));

app.listen(process.env.PORT || 3001);
