'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }
    return (
        <div className="bg-[#222] lg:min-h-[100vh] lg:w-[200px] w-full h-[60px] fixed z-10 top-0 left-0">
            <div
                id="menu-panel"
                className="lg:w-[200px] w-full h-full bg-[#222] text-[#f5f5f5] absolute z-[15] overflow-auto"
            >
                <h1 className="px-8 h-[60px] leading-[60px] text-right z-1 relative bg-[#222] font-[350] text-[2rem] m-0 lg:h-[90px] lg:text-left overflow-hidden">
                    <Link
                        href="/"
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:no-underline"
                    >
                        Jeff Fohl
                    </Link>
                </h1>
                <nav
                    id="nav"
                    className={`h-[calc(100%-90px)] overflow-auto leading-[1.75rem] transition-all duration-[250ms] ease-linear ${navShown ? 'lg:top-0 top-[60px]' : 'lg:top-0 top-[-100vh]'}`}
                >
                    <ul className="m-0 py-5 list-none">
                        <li className="m-0 p-0 list-none">
                            <Link
                                href="/blog"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <Link
                                href="/portfolio"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <Link
                                href="/about"
                                onClick={() => {
                                    setNavShown(false)
                                }}
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    <h2 className="text-base font-normal uppercase m-0 mt-[0.83rem] px-8 py-0 text-[#aaa] tracking-[2px]">
                        Surfaces
                    </h2>
                    <ul className="m-0 py-5 list-none">
                        <li className="m-0 p-0 list-none">
                            <a
                                href="mailto:jeff@fohl.com"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Email
                            </a>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <a
                                href="https://medium.com/@jefffohl"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Medium
                            </a>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <a
                                href="https://github.com/jefffohl"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <a
                                href="https://www.linkedin.com/in/jeffreyfohl"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li className="m-0 p-0 list-none">
                            <a
                                href="https://endlesss.fm/spacetimespirit"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Endlesss
                            </a>
                        </li>
                    </ul>
                    <h2 className="text-base font-normal uppercase m-0 mt-[0.83rem] px-8 py-1 text-[#aaa] tracking-[2px]">
                        Archive
                    </h2>
                    <ul className="m-0 py-5 list-none">
                        <li className="m-0 p-0 list-none">
                            <a
                                href="/archive/2011"
                                className="text-[#aaa] no-underline block p-2 px-8 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer"
                            >
                                Portfolio 2012
                            </a>
                        </li>
                    </ul>
                </nav>
                <span
                    id="more"
                    className={`lg:hidden block absolute top-0 left-0 h-[60px] w-[60px] z-[2] before:content-[''] before:block before:w-[25px] before:h-[2px] before:bg-[#ccc] before:absolute before:left-[17.5px] before:transition-all before:duration-[250ms] before:ease-linear before:rotate-0 after:content-[''] after:block after:w-[25px] after:h-[2px] after:bg-[#ccc] after:absolute after:left-[17.5px] after:transition-all after:duration-[250ms] after:ease-linear after:rotate-0 before:top-[25px] after:top-[35px] ${navShown ? 'before:top-[30px] before:rotate-45 after:top-[30px] after:rotate-[-45deg]' : ''}`}
                    onClick={toggleNav}
                ></span>
            </div>
        </div>
    )
}
