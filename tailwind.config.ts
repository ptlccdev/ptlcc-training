import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                primaryColor: '#1c2536',
                // primaryColor: '#09203f',
                secondaryColor: '#6366f1',
                // secondaryColor: '#cd9a35',
                backgroundColor: '#121212',
                // registerBlue: '#0f538d',
                // backgroundColor: '#121212',
            },
            backgroundImage: theme => ({
                'custom-gradient':
                    'linear-gradient(to top, #09203f 0%, #537895 100%)',
                // 'another-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }),
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
