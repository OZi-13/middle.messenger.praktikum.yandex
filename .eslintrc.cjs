module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    overrides: [
        {
            files: [
                '*.config.js',
                '*.cjs',
                'server.js'
            ],
            parserOptions: {
                project: null,
                tsconfigRootDir: null,
                parser: 'espree',
            },
            rules: {
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',

                '@typescript-eslint/require-await': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
    plugins: ['@typescript-eslint'],
    extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    rules: {
        'react/jsx-filename-extension': 0,
        'import/extensions': 0,
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-unsafe-assignment': 2,
        '@typescript-eslint/no-unsafe-argument': 2,
        '@typescript-eslint/no-unsafe-return': 2,
        '@typescript-eslint/no-unsafe-call': 2,
        '@typescript-eslint/no-unsafe-member-access': 2,
        '@typescript-eslint/ban-ts-comment': 2,
    },
};