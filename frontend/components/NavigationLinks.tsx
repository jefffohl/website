'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
    name: string
    path: string
}

interface NavigationLinksProps {
    links: NavLink[]
    onLinkClick: () => void
}

export default function NavigationLinks({
    links,
    onLinkClick,
}: NavigationLinksProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname.startsWith(path)
    }

    const getLinkClass = (path: string) => {
        if (isActive(path)) {
            return 'text-[var(--menu-link-color-active)] bg-[var(--menu-link-bg-active)] hover:bg-[var(--menu-link-bg-active)] hover:text-[var(--menu-link-color-active)]'
        }
        return 'text-[var(--menu-link-color)] bg-[var(--menu-link-bg)] hover:bg-[var(--menu-link-bg-hover)] hover:text-[var(--menu-link-color-hover)]'
    }

    return (
        <ul className="m-0 py-5 list-none">
            {links.map((link) => (
                <li key={link.path} className="m-0 p-0 list-none relative">
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 text-[var(--menu-link-color-active)] ${
                            isActive(link.path) ? 'left-[1rem]' : 'left-[-1rem]'
                        }`}
                    >
                        •
                    </span>
                    <Link
                        href={link.path}
                        onClick={onLinkClick}
                        className={`block no-underline p-2 px-8 cursor-pointer ${getLinkClass(
                            link.path
                        )}`}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
