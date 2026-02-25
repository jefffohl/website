import { Metadata } from 'next'
import NavigationLinks from '@/components/NavigationLinks'

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
        <div className=" flex flex-row justify-between">
            <div className="flex-col justify-between items-center w-48 ">
                <h1 className="xl:p-[2rem_3rem_3rem_3rem] p-[1rem_1rem_3rem_1rem] text-2xl font-[400] uppercase text-[var(--site-section-title-color)] tracking-widest">
                    Art
                </h1>
                <NavigationLinks links={links} />
            </div>
            <div className="w-[calc(100vw-12rem)] h-[100vh] flex-1">
                {children}
            </div>
        </div>
    )
}
