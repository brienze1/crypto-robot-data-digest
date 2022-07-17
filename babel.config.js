module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@': './src/main'
            }
        }],
        '@babel/plugin-transform-typescript'
    ],
    ignore: [
        '**/*.test.ts'
    ]
}