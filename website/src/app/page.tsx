'use client'

import { useState } from 'react'
import MenuPanel from '@/components/MenuPanel'
import BioPanel from '@/components/BioPanel'
import AboutPanel from '@/components/AboutPanel'
import GridCanvas from '@/components/GridCanvas'

export default function Home() {
    const [bioHidden, setBioHidden] = useState(true)
    const [aboutHidden, setAboutHidden] = useState(true)

    const toggleBioPanel = () => {
        setBioHidden(!bioHidden)
        if (!bioHidden && !aboutHidden) {
            setAboutHidden(true)
        }
    }

    const toggleAboutPanel = () => {
        setAboutHidden(!aboutHidden)
        if (!aboutHidden && !bioHidden) {
            setBioHidden(true)
        }
    }

    return (
        <div className="h-screen w-full overflow-hidden relative">
            <MenuPanel
                onToggleBio={toggleBioPanel}
                onToggleAbout={toggleAboutPanel}
            />
            <BioPanel isHidden={bioHidden} onClose={toggleBioPanel} />
            <AboutPanel isHidden={aboutHidden} onClose={toggleAboutPanel} />
            <div className="grid-panel">
                <GridCanvas />
            </div>
        </div>
    )
}
