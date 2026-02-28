'use client'

import { useState } from 'react'
import NavigationLinks, { NavLink } from './NavigationLinks'
import { LuChevronDown } from 'react-icons/lu'

export interface ChildNavigationProps {
    pageTitle: string
    links: NavLink[]
}

export default function ChildNavigation({
    links,
    pageTitle,
}: ChildNavigationProps) {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }

    return (
        <div className="flex flex-row xl:flex-col justify-start items-start w:full xl:w-48">
            <h1 className="w-full xl:p-[2rem_3rem_3rem_3rem] p-[1rem_0.5rem_1rem_1rem] text-2xl font-[400] uppercase text-[var(--site-section-title-color)] tracking-widest">
                {pageTitle}
            </h1>
            <nav
                className={`flex-1 ${navShown ? 'h-auto' : 'h-0'} overflow-hidden absolute top-14 z-1 w-[95vw] left-[2.5vw] transition-all shadow xl:shadow-none xl:w-full xl:static xl:h-auto`}
            >
                <NavigationLinks links={links} />
            </nav>
            <LuChevronDown
                onClick={toggleNav}
                className={`xl:hidden block text-2xl text-[var(--site-section-title-color)] mt-1 ${navShown ? 'transform-[rotate(180deg)]' : 'transform-[rotate(0deg)]'}`}
            />
        </div>
    )
}
