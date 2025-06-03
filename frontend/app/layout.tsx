import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ThemeProvider from '@/components/ThemeProvider'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Jeff Fohl',
    description:
        'Jeff Fohl - Product designer, software developer, and user experience designer for AI and machine learning, with over 30 years of experience.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={openSans.className}>
                <ThemeProvider>
                    <div className="xl:flex xl:flex-row xl:items-stretch">
                        <div className="xl:w-[200px] flex-[0_0_200px]">
                            <Navigation />
                        </div>
                        <div className="relative h-screen xl:flex-1">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
