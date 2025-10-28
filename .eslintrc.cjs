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
            files: ['*.js', '*.cjs'],
            parserOptions: {
                project: './tsconfig.node.json',
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