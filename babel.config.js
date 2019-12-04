module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['iOS >= 9', 'Android >= 4.4'],
                },
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false,
            },
        ],
    ],
    sourceType: "unambiguous",
};
