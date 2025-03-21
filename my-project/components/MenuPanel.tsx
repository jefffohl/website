'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MenuPanelProps {
    onToggleBio: () => void
    onToggleAbout: () => void
}

export default function MenuPanel({
    onToggleBio,
    onToggleAbout,
}: MenuPanelProps) {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }

    return (
        <>
            <div id="menu-panel" className="panel">
                <h1>
                    <Link href="/">Jeff Fohl</Link>
                </h1>
                <nav id="nav">
                    <ul>
                        <li onClick={onToggleAbout}>
                            <span id="what-is-this">What is this?</span>
                        </li>
                        <li onClick={onToggleBio}>
                            <span id="about-me">About me</span>
                        </li>
                        <li>
                            <Link href="/cv">Curriculum vitae</Link>
                        </li>
                    </ul>

                    <h2>Surfaces</h2>
                    <ul>
                        <li>
                            <a href="mailto:jeff@fohl.com">Email</a>
                        </li>
                        <li>
                            <a href="https://medium.com/@jefffohl">Medium</a>
                        </li>
                        <li>
                            <a href="https://github.com/jefffohl">GitHub</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/jeffreyfohl">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://endlesss.fm/spacetimespirit">
                                Endlesss
                            </a>
                        </li>
                    </ul>
                    <h2>Portfolios</h2>
                    <ul>
                        <li>
                            <Link href="/portfolio">2025</Link>
                        </li>
                        <li>
                            <a href="/archive/2011">2011</a>
                        </li>
                    </ul>
                </nav>
                <span
                    id="more"
                    className={`${navShown ? 'open' : ''}`}
                    onClick={toggleNav}
                ></span>
            </div>
        </>
    )
}
