import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Design | Code - Jeff Fohl',
    description: 'A personal website for Jeff Fohl, software desiger',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable}`}>
                <div className="flex flex-row items-stretch">
                    <Navigation />
                    {children}
                </div>
            </body>
        </html>
    )
}
