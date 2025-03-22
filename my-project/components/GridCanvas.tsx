'use client'

import { useEffect, useState } from 'react'
import { buildAndAnimateGrid } from '@/animations/script'
import AboutPanel from './AboutPanel'

export default function GridCanvas() {
    const [aboutHidden, setAboutHidden] = useState(true)

    const toggleAboutPanel = () => {
        setAboutHidden(!aboutHidden)
    }

    useEffect(() => {
        const animator = buildAndAnimateGrid('grid-canvas')
        return () => {
            animator.destroy()
        }
    }, [])

    return (
        <div className="w-full h-full lg:relative absolute top-0 left-0">
            <div
                onClick={toggleAboutPanel}
                className="absolute top-4 right-4 w-[35px] h-[35px] rounded-full bg-[#22222244] hover:bg-[#444444] z-10 flex items-center justify-center text-white text-xl cursor-pointer"
            >
                {aboutHidden ? '?' : 'X'}
            </div>
            <AboutPanel isHidden={aboutHidden} onClose={toggleAboutPanel} />
            <canvas id="grid-canvas" className="w-full h-full block" />
        </div>
    )
}
