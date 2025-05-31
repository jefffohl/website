import { Metadata } from 'next'
import GridCanvasClient from './_components/GridCanvasClient'

export const metadata: Metadata = {
    title: 'Design | Code',
    description:
        'Jeff Fohl - Product designer, software developer, and UX designer with 30+ years of experience in AI and machine learning.',
}

export default function Home() {
    return <GridCanvasClient />
}
