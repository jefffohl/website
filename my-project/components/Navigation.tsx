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
        <div className="bg-[#222] min-h-[100vh] w-[200px] relative">
            <MenuPanel onToggleBio={toggleBioPanel} />
            <BioPanel isHidden={bioHidden} onClose={toggleBioPanel} />
        </div>
    )
}
