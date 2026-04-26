/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Segoe UI"', '"Trebuchet MS"', '"Noto Sans"', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#eef4ff',
                    100: '#dfe9ff',
                    200: '#c7d9ff',
                    300: '#a4c2ff',
                    400: '#7fa4ff',
                    500: '#5f84ff',
                    600: '#4667f5',
                    700: '#3853dc',
                    800: '#3045b2',
                    900: '#2b3f8c',
                },
                ink: {
                    900: '#161d2b',
                    800: '#232d40',
                    700: '#3a4458',
                },
                surface: {
                    base: '#f4f7fc',
                    raised: '#ffffff',
                    muted: '#edf2fa',
                },
            },
            boxShadow: {
                'elev-1': '0 10px 30px rgba(12, 24, 42, 0.08)',
                'elev-2': '0 16px 45px rgba(12, 24, 42, 0.14)',
                'focus-brand': '0 0 0 3px rgba(70, 103, 245, 0.18)',
            },
            borderRadius: {
                xl: '14px',
                '2xl': '18px',
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(.22,.8,.2,1)',
            },
            transitionDuration: {
                180: '180ms',
            },
        },
    },
    plugins: [],
}
