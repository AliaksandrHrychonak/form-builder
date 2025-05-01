import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
    ...fsd.configs.recommended,
    {
        // disable the `public-api` rule for files in the Shared layer
        files: ['./src/shared/**'],
        rules: {
            'fsd/public-api': 'off',
        },
    },

    {
        files: ['./src/**'],
        rules: {
            /**
             * IMPORTANT: Rule 'fsd/insignificant-slice' is temporarily disabled
             *
             * Reasons for temporary disabling:
             * 1. Project is in early development stage
             * 2. Architecture is actively evolving
             *
             * Action plan:
             * 1. Rule will be enabled after core features stabilization
             *
             * @todo Enable rule before v2.0.0 release
             * @see https://feature-sliced.design/docs/reference/rules/public-api
             */
            'fsd/insignificant-slice': 'off',
        },
    },
    {
        files: ['./src/features/**'],
        rules: {
            /**
             * IMPORTANT: Rule 'fsd/no-segmentless-slices' is disabled for features folder
             *
             * Rationale for our approach:
             * 1. We use a modified FSD structure to optimize development:
             *    - Features represent atomic functionality blocks
             *    - Each feature contains only the necessary minimum files
             *    - Segmentation will be added as feature complexity grows
             *
             * 2. Benefits of this approach:
             *    - Simplified navigation through small features
             *    - Quick access to components
             *    - Less boilerplate code for simple features
             *    - Easier to maintain code cleanliness
             *
             * 3. Refactoring guidelines:
             *    - When features reach certain complexity
             *    - When there's a need to separate logic
             *
             * @note This is a deliberate deviation from standard FSD structure
             * @todo Regularly audit features for segmentation needs
             */
            'fsd/no-segmentless-slices': 'off',
        },
    },
]);
