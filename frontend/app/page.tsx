import { Metadata } from 'next'
import GridCanvasClient from './_components/GridCanvasClient'

export const metadata: Metadata = {
    title: 'Design | Code',
    description:
        'Jeff Fohl - Software designer for AI and machine learning, with over 30 years of experience.',
}

export default function Home() {
    return <GridCanvasClient />
}
