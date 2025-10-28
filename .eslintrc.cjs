module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },

    plugins: ['@typescript-eslint'],

    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],

    env: {
        browser: true,
        es2020: true,
        node: true,
    },

    rules: {
        'react/jsx-filename-extension': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',

        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
    },

    overrides: [
        {
            files: [
                '*.config.js',
                '*.cjs',
                'server.js',
                'vite.config.js',
                'postcss.config.js'
            ],

            parser: 'espree',

            parserOptions: {
                project: null,
                tsconfigRootDir: null,
            },

            extends: [
                'eslint:recommended',
            ],

            rules: {
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/await-thenable': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                'import/no-extraneous-dependencies': 'off',
                'no-undef': 'off',
                'no-console': 'off',

                '@typescript-eslint/no-misused-promises': 'off',
            },
        },
    ],
};
