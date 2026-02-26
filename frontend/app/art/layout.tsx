import { Metadata } from 'next'
import ChildNavigation from '@/components/ChildNavigation'

export const metadata: Metadata = {
    title: 'Art',
    description: 'Recent art work by Jeff Fohl.',
}

const links = [
    { name: 'Grid', path: '/art/grid' },
    { name: 'Bloom', path: '/art/bloom' },
]

export default function Art({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col xl:flex-row justify-between w-full">
            <ChildNavigation links={links} pageTitle={'Art'} />
            <div className="w-full xl:h-[100vh] flex-1">{children}</div>
        </div>
    )
}
