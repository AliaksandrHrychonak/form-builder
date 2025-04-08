/** @type {import('tailwindcss').Config} */
export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-mono-sans)'],
            },
            colors: {
                border: 'var(--color-border)',
                input: 'var(--color-input)',
                ring: 'var(--color-ring)',
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)',
                    foreground: 'var(--color-destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--color-popover)',
                    foreground: 'var(--color-popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--color-card)',
                    foreground: 'var(--color-card-foreground)',
                },
                sidebar: {
                    DEFAULT: 'var(--sidebar-background)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)',
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        function ({ addUtilities }) {
            const autofillUtilities = {
                '.autofill-transparent': {
                    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
                        '-webkit-box-shadow': '0 0 0 30px transparent inset !important',
                        '-webkit-text-fill-color': 'inherit !important',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    '&:-webkit-autofill::first-line': {
                        font: 'inherit',
                    },
                    '&:autofill': {
                        background: 'transparent',
                        color: 'inherit',
                    },
                    '&:-ms-autofill': {
                        background: 'transparent',
                        color: 'inherit',
                    },
                },
            };
            addUtilities(autofillUtilities, ['hover', 'focus']);
        },
    ],
};
