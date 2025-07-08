import './globals.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ThemeProvider from '@/components/ThemeProvider'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Jeff Fohl',
    description:
        'Jeff Fohl - Software designer for AI and machine learning, with over 30 years of experience.',
    metadataBase: new URL('https://fohl.com'),
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
                    <div className="flex flex-col xl:flex-row items-stretch">
                        <div className="h-[60px] flex-[0_0_60px] xl:w-[200px] xl:flex-[0_0_200px]">
                            <Navigation />
                        </div>
                        <div className="relative xl:h-screen flex-1 flex-grow">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
            <GoogleAnalytics gaId="G-ZFJFQSQ14F" />
        </html>
    )
}
