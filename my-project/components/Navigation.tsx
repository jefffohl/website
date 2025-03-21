'use client'

import { useState } from 'react'
import BioPanel from './BioPanel'
import MenuPanel from './MenuPanel'
import AboutPanel from './AboutPanel'
export default function Navigation() {
    const [bioHidden, setBioHidden] = useState(true)
    const [aboutHidden, setAboutHidden] = useState(true)

    const toggleBioPanel = () => {
        setBioHidden(!bioHidden)
        if (!aboutHidden) {
            setAboutHidden(true)
        }
    }

    const toggleAboutPanel = () => {
        setAboutHidden(!aboutHidden)
        if (!bioHidden) {
            setBioHidden(true)
        }
    }

    return (
        <div className="bg-[#222] min-h-[100vh] w-[200px] relative">
            <MenuPanel
                onToggleBio={toggleBioPanel}
                onToggleAbout={toggleAboutPanel}
            />
            <BioPanel isHidden={bioHidden} onClose={toggleBioPanel} />
            <AboutPanel isHidden={aboutHidden} onClose={toggleAboutPanel} />
        </div>
    )
}
