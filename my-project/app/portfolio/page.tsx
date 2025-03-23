'use client'

import './portfolio.css'

import { useRef } from 'react'
import PortfolioSection, {
    PortfolioAssetType,
} from './_components/PortfolioSection'

export default function Portfolio() {
    const imageDisplayContainer = useRef(null)

    return (
        <div className="flex">
            <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
                <h1 className="text-2xl font-[400] uppercase text-neutral-500 tracking-widest">
                    Portfolio
                </h1>
                <p className="w-full lg:w-[50%]">
                    Work from 2025 to 2016, in reverse chronology. Much of this
                    work was produced by teams of people, in which I played a
                    role. These roles include: engineer, designer, UX designer,
                    leader, manager, or any combination of these. I will attempt
                    to clarify my role in each case.
                </p>
                <div className="border-b border-[#222] pb-4"></div>
                <PortfolioSection
                    title="Lawful Good"
                    description={
                        <>
                            <p>
                                In 2025, I was the founder and principal
                                designer at{' '}
                                <a href="https://infinitetape.net">
                                    Infinite Tape
                                </a>
                                , a startup that builds AI-powered tools for
                                professionals and creatives.
                            </p>
                            <p>
                                One of the projects I developed was called{' '}
                                <a href="https://lawfulgood.us">Lawful Good</a>.
                                This project is ongoing as of this writing.
                                Lawful Good is an AI Agent designed to help
                                independent lawyers manage documents more
                                effectively using a{' '}
                                <a href="https://en.wikipedia.org/wiki/Retrieval-Augmented_Generation">
                                    RAG-based approach
                                </a>
                                .
                            </p>
                        </>
                    }
                    company="Infinite Tape"
                    date="2025"
                    roles={['Engineer', 'Designer']}
                    assets={[
                        {
                            type: PortfolioAssetType.Image,
                            src: '/portfolio/lawful-good-empty-state.png',
                            thumbnail: {
                                src: '/portfolio/lawful-good-empty-state_thumb.png',
                                alt: 'Lawful Good Empty State',
                                width: 3370,
                                height: 1918,
                            },
                            alt: 'Lawful Good Empty State',
                            width: 3370,
                            height: 1918,
                        },
                        {
                            type: PortfolioAssetType.Image,
                            src: '/portfolio/lawful-good-document-view.png',
                            thumbnail: {
                                src: '/portfolio/lawful-good-document-view_thumb.png',
                                alt: 'Lawful Good Document View',
                                width: 3370,
                                height: 1918,
                            },
                            alt: 'Lawful Good Empty State',
                            width: 3370,
                            height: 1918,
                        },
                    ]}
                />
            </div>
            <div ref={imageDisplayContainer} className="max-w-[20ch]"></div>
        </div>
    )
}
