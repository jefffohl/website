import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Design | Code - Jeff Fohl',
    description: 'A personal website for Jeff Fohl, software designer',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable}`}>
                <div className="xl:flex xl:flex-row xl:items-stretch">
                    <div className="xl:w-[200px] flex-[0_0_200px]">
                        <Navigation />
                    </div>
                    <div className="relative h-screen xl:flex-1">
                        {children}
                    </div>
                </div>
            </body>
            <GoogleAnalytics gaId="G-ZFJFQSQ14F" />
        </html>
    )
}
