import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    ...compat.extends('next/core-web-vitals'),
    // ...pluginQuery.configs['flat/recommended'],
    {
        ignores: [
            'node_modules/**',
            '.next/*',
            '.next/**/*',
            'build/**',
            'dist/**',
            'coverage/**',
            'public/**',
            '*.configs.js',
            '.idea/**',
        ],
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@stylistic': stylistic,
            '@typescript-eslint': typescript,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            '@stylistic/semi': 'error',
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/max-len': [
                'error',
                {
                    code: 120,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreComments: true,
                    ignorePattern: 'className|class',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-cycle': 'warn',
            'import/no-duplicates': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            eqeqeq: 'error',
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
    eslintConfigPrettier,
];

export default eslintConfig;
