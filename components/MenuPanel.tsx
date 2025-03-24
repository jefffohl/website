'use client'

import { useState } from 'react'
import Link from 'next/link'
import './MenuPanel.css'

interface MenuPanelProps {
    onToggleBio: () => void
}

export default function MenuPanel({ onToggleBio }: MenuPanelProps) {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }

    return (
        <>
            <div id="menu-panel" className="panel">
                <h1>
                    <Link href="/" className="my-name">
                        Jeff Fohl
                    </Link>
                </h1>
                <nav id="nav" className={navShown ? 'shown' : ''}>
                    <ul>
                        <li
                            onClick={() => {
                                setNavShown(false)
                                onToggleBio()
                            }}
                        >
                            <span id="about-me">About me</span>
                        </li>
                        <li>
                            <Link
                                href="/portfolio"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/cv"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                            >
                                Curriculum vitae
                            </Link>
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
                    <h2>Archive</h2>
                    <ul>
                        <li>
                            <a href="/archive/2011">Portfolio 2012</a>
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
