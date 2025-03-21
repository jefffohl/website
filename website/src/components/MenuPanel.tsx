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

    /**

#nav {
    height: calc(100% - 90px);
    overflow: auto;
    line-height: 1.75rem;
    transition: all 250ms linear;
    -webkit-transition: all 250ms linear;
    -moz-transition: all 250ms linear;
    -ms-transition: all 250ms linear;
    -o-transition: all 250ms linear;
}

#menu-panel h2 {
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0;
    padding: 0.25rem 2rem 0 2rem;
    color: #aaa;
    letter-spacing: 2px;
}

#grid-panel {
    position: absolute;
    left: 200px;
    top: 0;
    width: calc(100% - 200px);
    height: 100%;
    z-index: 0;
}


#menu-panel ul {
    margin: 0;
    padding: 20px 0;
    list-style: none;
}
#menu-panel ul li {
    margin: 0;
    padding: 0;
    list-style: none;
}
#menu-panel ul li a,
#menu-panel ul li span {
    color: #aaa;
    text-decoration: none;
    display: block;
    padding: 0.5rem 2rem;
    background-color: rgb(0 0 0 / 0.15);
}
#menu-panel ul li a:hover,
#menu-panel ul li span:hover {
    background-color: rgb(0 0 0 / 0.25);
    color: #f5f5f5;
    cursor: pointer;
}

@media (max-width: 1024px) {
    #menu-panel h1 {
        padding: 0 2rem;
        height: 60px;
        line-height: 60px;
        text-align: right;
        z-index: 1;
        position: relative;
        background-color: #222;
    }
    #menu-panel #nav {
        position: absolute;
        top: -100vh;
        left: 0;
        width: 100%;
        overflow: auto;
        height: calc(100vh - 60px);
        background-color: #222;
        z-index: 0;
    }
    #menu-panel #nav.shown {
        top: 60px;
    }
    #grid-panel {
        top: 60px;
        left: 0;
        width: 100%;
        height: calc(100% - 60px);
    }
}


#menu-panel h1 {
    font-weight: 350;
    font-size: 2rem;
    padding: 2rem;
    margin: 0;
    color: #e5e5e5;
    height: 90px;
    overflow: hidden;
}

 */

    return (
        <div className="top-0 left-0 w-full h-[60px] overflow-visible z-1 bg-menu-bg text-menu-color absolute lg:relative lg:z-20 lg:overflow-auto lg:w-[200px] lg:h-full ">
            <h1 className="font-[350] text-[2rem] m-0 text-menu-color lg:h-[90px] overflow-hidden pt-2 h-[60px] leading-[60px] text-right z-10 relative bg-[#222]">
                Jeff Fohl
            </h1>
            <nav className={`nav ${navShown ? 'shown' : ''}`}>
                <ul>
                    <li>
                        <span onClick={onToggleAbout}>What is this?</span>
                    </li>
                    <li>
                        <span onClick={onToggleBio}>About me</span>
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
                        <a
                            href="https://medium.com/@jefffohl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Medium
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/jefffohl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/jeffreyfohl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://endlesss.fm/spacetimespirit"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Endlesss
                        </a>
                    </li>
                </ul>
                <h2>Archive</h2>
                <ul>
                    <li>
                        <Link href="/archive/2011">2011</Link>
                    </li>
                </ul>
            </nav>
            <span
                className={`more ${navShown ? 'open' : ''}`}
                onClick={toggleNav}
            ></span>
        </div>
    )
}
