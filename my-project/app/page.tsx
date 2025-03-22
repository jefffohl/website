'use client'

import GridCanvas from '@/components/GridCanvas'

export default function Home() {
    return (
        <div className="top-[60px] lg:h-screen h-[calc(100%-60px)] lg:flex-auto overflow-hidden lg:relative absolute left-0 z-1 w-full">
            <div className="top-0 left-0 w-full h-full lg:h-screen lg:top-0 absolute z-0">
                <GridCanvas />
            </div>
        </div>
    )
}
