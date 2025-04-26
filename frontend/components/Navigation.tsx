'use client'

import { useState } from 'react'
import Link from 'next/link'
import './MenuPanel.css'

export default function Navigation() {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }
    return (
        <div className="bg-[#222] lg:min-h-[100vh] lg:w-[200px] w-full h-[60px] fixed z-10 top-0 left-0">
            <div id="menu-panel" className="panel">
                <h1>
                    <Link href="/" className="my-name">
                        Jeff Fohl
                    </Link>
                </h1>
                <nav id="nav" className={navShown ? 'shown' : ''}>
                    <ul>
                        <li>
                            <Link
                                href="/blog"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                            >
                                Blog
                            </Link>
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
                                href="/about"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                            >
                                About
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
        </div>
    )
}
