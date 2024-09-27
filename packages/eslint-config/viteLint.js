const {resolve} = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
    extends: [
        require.resolve('@vercel/style-guide/eslint/node'),
        require.resolve('@vercel/style-guide/eslint/typescript'),
        require.resolve('@vercel/style-guide/eslint/browser'),
        require.resolve('@vercel/style-guide/eslint/react'),
        // Turborepo custom eslint configuration configures the following rules:
        //  - https://github.com/vercel/turborepo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
        'eslint-config-turbo',
    ].map(require.resolve),
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
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
        '@typescript-eslint/naming-convention': [
            'error',
            {
                // Define the naming convention for enum members
                "selector": "enumMember",
                "format": ["UPPER_CASE"], // Use SCREAMING_SNAKE_CASE
            },
            {
                // If you have other naming conventions, you can define them here as needed
                "selector": "enum",
                "format": ["UPPER_CASE"] // Enum names are typically PascalCase
            }
        ],
        '@typescript-eslint/no-dynamic-delete': 'warn',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': "off"
    },
};