/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                'menu-bg': 'var(--menu-bg)',
                'menu-color': 'var(--menu-color)',
                'link-color': 'var(--link-color)',
                'link-hover': 'var(--link-hover)',
                'heading-color': 'var(--heading-color)',
            },
        },
    },
    plugins: [],
}

export default config
