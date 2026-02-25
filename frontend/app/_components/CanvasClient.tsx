'use client'

import { useEffect, useState } from 'react'
import { CanvasMap } from './CanvasMap'

export default function CanvasClient({ canvasType }: { canvasType: string }) {
    const [aboutHidden, setAboutHidden] = useState(true)
    const toggleAboutPanel = () => {
        setAboutHidden(!aboutHidden)
    }
    // const pathname = usePathname()

    useEffect(() => {
        const animator = CanvasMap.get(canvasType)
        let animation: any
        if (animator) {
            animation = animator('canvas')
        }
        return () => {
            if (animation && animation.destroy) {
                animation.destroy()
            }
        }
    }, [])

    return (
        <div className="overflow-hidden absolute top-0 left-0 w-full h-[calc(100dvh-60px)] xl:h-full xl:top-0">
            <div
                onClick={toggleAboutPanel}
                className={`transition absolute top-4 right-4 w-[35px] h-[35px] rounded-full bg-[#22222244] hover:bg-[#22222299] z-0 flex items-center justify-center text-white text-xl cursor-pointer`}
            >
                ?
            </div>
            {/* <AboutPanel isHidden={aboutHidden} onClose={toggleAboutPanel} /> */}
            <canvas id="canvas" className="w-full h-full block" />
        </div>
    )
}
