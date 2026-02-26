import { Metadata } from 'next'
import CanvasClient from './_components/CanvasClient'
import { CanvasType } from './_components/CanvasMap'

export const metadata: Metadata = {
    title: 'Design | Code',
    description:
        'Jeff Fohl - Software designer for AI and machine learning, with over 30 years of experience.',
}

export default function Home() {
    return <CanvasClient canvasType={CanvasType.BLOOM} />
}
