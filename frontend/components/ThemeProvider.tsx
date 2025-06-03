'use client'

import { useEffect } from 'react'

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        // Function to update theme based on system preference
        const updateTheme = () => {
            const isDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
            document.documentElement.setAttribute(
                'data-theme',
                isDark ? 'dark' : 'light'
            )
        }

        // Initial theme setup
        updateTheme()

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', updateTheme)

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', updateTheme)
        }
    }, [])

    return <>{children}</>
}
