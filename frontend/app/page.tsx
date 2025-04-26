'use client'

import { useEffect, useState } from 'react'
import { buildAndAnimateGrid } from '@/animations/script'
import AboutPanel from '@/components/AboutPanel'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function GridCanvas() {
    const [aboutHidden, setAboutHidden] = useState(true)
    usePageTitle({ title: 'Design | Code' })

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
        <div className="overflow-hidden absolute top-[60px] left-0 w-full h-[calc(100%-60px)] lg:h-full lg:top-0">
            <div
                onClick={toggleAboutPanel}
                className="transition absolute top-4 right-4 w-[35px] h-[35px] rounded-full bg-[#22222244] hover:bg-[#22222299] z-5 flex items-center justify-center text-white text-xl cursor-pointer"
            >
                {aboutHidden ? '?' : 'X'}
            </div>
            <AboutPanel isHidden={aboutHidden} onClose={toggleAboutPanel} />
            <canvas id="grid-canvas" className="w-full h-full block" />
        </div>
    )
}
