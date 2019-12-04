const path = require('path');

module.exports = [
    {
        route: '/page-a',
        name: 'page-a',
        entry: path.resolve(__dirname, './pages/page-a/index.js'),
    },
    {
        route: '/page-b',
        name: 'page-b',
        entry: path.resolve(__dirname, './pages/page-b/index.js'),
    },
];
