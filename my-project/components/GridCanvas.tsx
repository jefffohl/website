'use client'

import { useEffect } from 'react'
import { buildAndAnimateGrid } from '@/animations/script'

export default function GridCanvas() {
    useEffect(() => {
        buildAndAnimateGrid()
    }, [])

    return <canvas id="grid-canvas" className="w-full h-full block" />
}
