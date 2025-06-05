'use client'

import { useState } from 'react'
import Link from 'next/link'
import NavigationLinks from './NavigationLinks'

const mainLinks = [
    { name: 'Blog', path: '/blog' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
]

const socialLinks = [
    { name: 'Email', href: 'mailto:jeff@fohl.com' },
    { name: 'Medium', href: 'https://medium.com/@jefffohl' },
    { name: 'GitHub', href: 'https://github.com/jefffohl' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jeffreyfohl' },
    { name: 'Endlesss', href: 'https://endlesss.fm/spacetimespirit' },
]

export default function Navigation() {
    const [navShown, setNavShown] = useState(false)

    const toggleNav = () => {
        setNavShown(!navShown)
    }

    return (
        <div className="bg-[var(--menu-bg)] xl:min-h-[100vh] xl:w-[200px] w-full h-[60px] fixed z-10 top-0 left-0 shadow-md xl:shadow-none">
            <div className="top-0 left-0 xl:w-[200px] h-[60px] w-full xl:h-full bg-[var(--menu-bg)] text-[var(--menu-color)] absolute z-[10] xl:z-[15] overflow-visible xl:overflow-auto">
                <h1 className="px-8 h-[60px] leading-[60px] xl:leading-[inherit] text-right z-1 relative bg-[var(--menu-bg)] font-[350] text-[2rem] m-0 xl:h-[90px] xl:text-left xl:p-8 overflow-hidden">
                    <Link
                        href="/"
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:no-underline"
                        onClick={() => {
                            setNavShown(false)
                        }}
                    >
                        Jeff Fohl
                    </Link>
                </h1>
                <nav
                    className={`dark:shadow-[0_5px_25px_rgba(0,0,0,0.75)] shadow-[0_5px_25px_rgba(0,0,0,0.25)]  xl:shadow-none xl:dark:shadow-none max-h-[calc(100vh-60px)] absolute left-0 w-full overflow-auto bg-[var(--menu-bg)] z-[0] xl:height-[calc(100%-90px)] xl:static leading-[1.75rem] ${
                        navShown ? 'top-[60px]' : 'top-[-100vh]'
                    }`}
                >
                    <NavigationLinks
                        links={mainLinks}
                        onLinkClick={() => setNavShown(false)}
                    />

                    <h2 className="text-base font-normal uppercase m-0 mt-[0.83rem] px-8 py-0 text-[var(--menu-color)] tracking-[2px]">
                        Surfaces
                    </h2>
                    <ul className="m-0 py-5 list-none">
                        {socialLinks.map((link) => (
                            <li key={link.name} className="m-0 p-0 list-none">
                                <a
                                    href={link.href}
                                    target="_blank"
                                    className="text-[var(--menu-link-color)] bg-[var(--menu-link-bg)] hover:bg-[var(--menu-link-bg-hover)] hover:text-[var(--menu-link-color-hover)] no-underline block p-2 px-8 cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-base font-normal uppercase m-0 mt-[0.83rem] px-8 py-1 text-[var(--menu-color)] tracking-[2px]">
                        Archive
                    </h2>
                    <ul className="m-0 py-5 list-none">
                        <li className="m-0 p-0 list-none">
                            <a
                                href="/archive/2011"
                                className="text-[var(--menu-link-color)] bg-[var(--menu-link-bg)] hover:bg-[var(--menu-link-bg-hover)] hover:text-[var(--menu-link-color-hover)] no-underline block p-2 px-8 cursor-pointer"
                            >
                                Portfolio 2011
                            </a>
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
