'use client'

import GridCanvas from '@/components/GridCanvas'

export default function Home() {
    return (
        <div className="h-screen flex-auto overflow-hidden relative">
            <div className="top-[60px] left-0 w-full h-[calc(100%-60px)] lg:absolute lg:top-0 lg:h-full lg:z-0">
                <GridCanvas />
            </div>
        </div>
    )
}
