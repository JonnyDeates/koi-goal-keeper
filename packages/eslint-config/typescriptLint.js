const {resolve} = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
    extends: [
        require.resolve('@vercel/style-guide/eslint/node'),
        require.resolve('@vercel/style-guide/eslint/typescript'),
        'eslint-config-turbo',
    ].map(require.resolve),
    parserOptions: {
        project,
        "ecmaVersion": 2020,
        "sourceType": "module",
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ['node_modules/', 'dist/', "/src/**/*.js"],
    // add rules configurations here
    rules: {
        'import/no-default-export': 'off',
        'unicorn/filename-case': 'off',
        "semi": ['error', 'always'],
        '@typescript-eslint/array-type': "off",
        '@typescript-eslint/explicit-function-return-type': "off",
        '@typescript-eslint/no-dynamic-delete': 'warn',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': "off",
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off'
    },
};