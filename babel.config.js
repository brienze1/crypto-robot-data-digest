module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@': './src/main',
                },
            },
        ],
        '@babel/plugin-transform-typescript',
    ],
    env: {
        production: {
            plugins: [
                [
                    'inline-dotenv',
                    {
                        path: './resources/.env.production',
                    },
                ],
            ],
        },
        localstack: {
            plugins: [
                [
                    'inline-dotenv',
                    {
                        path: './resources/.env.localstack',
                    },
                ],
            ],
        },
        development: {
            plugins: [
                [
                    'inline-dotenv',
                    {
                        path: './resources/.env.development',
                    },
                ],
            ],
        },
    },
    ignore: [
        '**/*.test.ts',
        '**/*.steps.ts',
        '**/*.feature',
        '*/test/**/*.json'
    ],
};
