'use client'

import { useState } from 'react'
import BioPanel from './BioPanel'
import MenuPanel from './MenuPanel'
export default function Navigation() {
    const [bioHidden, setBioHidden] = useState(true)

    const toggleBioPanel = () => {
        setBioHidden(!bioHidden)
    }

    return (
        <div className="bg-[#222] lg:min-h-[100vh] lg:w-[200px] lg:relative w-full h-[60px] absolute top-0 left-0">
            <MenuPanel onToggleBio={toggleBioPanel} />
            <BioPanel isHidden={bioHidden} onClose={toggleBioPanel} />
        </div>
    )
}
