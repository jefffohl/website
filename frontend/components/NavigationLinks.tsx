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
            return 'text-[#f5f5f5] bg-[rgba(0,0,0,0.5)]'
        }
        return 'text-[#aaa] bg-[rgba(0,0,0,0.15)]'
    }

    return (
        <ul className="m-0 py-5 list-none">
            {links.map((link) => (
                <li key={link.path} className="m-0 p-0 list-none relative">
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 text-[#f5f5f5] ${
                            isActive(link.path) ? 'left-[1rem]' : 'left-[-1rem]'
                        }`}
                    >
                        •
                    </span>
                    <Link
                        href={link.path}
                        onClick={onLinkClick}
                        className={`text-[#aaa] block no-underline p-2 px-8 hover:bg-[rgba(0,0,0,0.5)] hover:text-[#f5f5f5] cursor-pointer ${getLinkClass(
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
