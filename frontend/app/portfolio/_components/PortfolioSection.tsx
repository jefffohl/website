'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

export interface PortfolioSectionProps {
    title: string
    description: React.ReactNode
    company: string
    companyUrl: string
    assets: PortfolioAsset[]
    date: string
    roles: string[]
    stack?: string[]
}

export interface PortfolioAsset {
    type: PortfolioAssetType
    thumbnail: ImageProps
    src: string
    alt: string
    width: number | string
    height: number | string
}

export enum PortfolioAssetType {
    Image = 'image',
    Video = 'video',
}

export default function PortfolioSection({
    title,
    description,
    company,
    companyUrl,
    assets,
    date,
    roles,
    stack,
}: PortfolioSectionProps) {
    const [activeAssetIndex, setActiveAssetIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isImageVisible, setIsImageVisible] = useState(false)
    const [thumbnailLoadStates, setThumbnailLoadStates] = useState<boolean[]>(
        new Array(assets.length).fill(false)
    )

    const handleAssetChange = (index: number) => {
        setIsImageVisible(false)
        setActiveAssetIndex(index)
        setIsLoading(true)
    }

    const handleAssetLoad = () => {
        setIsLoading(false)
        setIsImageVisible(true)
    }

    const handleThumbnailLoad = (index: number) => {
        setThumbnailLoadStates((prev) => {
            const newStates = [...prev]
            newStates[index] = true
            return newStates
        })
    }

    // Handle initial image load
    useEffect(() => {
        if (assets[0].type === PortfolioAssetType.Image) {
            const img = new window.Image()
            img.src = assets[0].src
            img.onload = handleAssetLoad
        } else {
            // For iframes, we'll assume they're loaded when the component mounts
            handleAssetLoad()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array means this runs once on mount

    return (
        <section className="portfolio-section p-[4rem_0] border-t border-b border-t-[#555] border-b-[#222]">
            <div
                className={`flex lg:flex-row flex-col ${
                    assets[activeAssetIndex].type === PortfolioAssetType.Image
                        ? 'items-start'
                        : 'items-stretch'
                }`}
            >
                <div className="lg:flex-[0_0_auto] lg:w-[30rem] flex-1 lg:pr-8 pr-0">
                    <h2 className="text-2xl font-[400] mb-4">{title}</h2>
                    {description}
                    <dl className="grid grid-cols-[7rem_1fr] gap-0 font-size-085 my-4">
                        <dt className="text-neutral-500 py-1">Date</dt>
                        <dd className="py-1 border-b border-b-neutral-800">
                            {date}
                        </dd>
                        <dt className="text-neutral-500 py-1">Company</dt>
                        <dd className="py-1 border-b border-b-neutral-800">
                            <a href={companyUrl}>{company}</a>
                        </dd>
                        <dt className="text-neutral-500 py-1">Roles</dt>
                        <dd className="py-1 border-b border-b-neutral-800">
                            {roles.join(', ')}
                        </dd>
                        {stack && (
                            <>
                                <dt className="text-neutral-500 py-1">Stack</dt>
                                <dd className="py-1 border-b border-b-neutral-800">
                                    {stack.join(', ')}
                                </dd>
                            </>
                        )}
                    </dl>
                    <div className="flex flex-wrap">
                        {assets.map((asset, i) => (
                            <div
                                key={'asset_' + i}
                                className={`asset-thumbnail bg-[#111] transition-all duration-300 shadow-md rounded overflow-hidden mr-4 mb-4 cursor-pointer relative ${
                                    i === activeAssetIndex
                                        ? 'ring-2 ring-[var(--link-color)]'
                                        : ''
                                }`}
                                onClick={() => handleAssetChange(i)}
                            >
                                {!thumbnailLoadStates[i] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[80%] h-1 bg-gray-600 rounded-full overflow-hidden">
                                            <div className="w-full h-full bg-[var(--link-color)] loading-bar"></div>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`transition-opacity duration-300 ${
                                        thumbnailLoadStates[i]
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                >
                                    <Image
                                        src={asset.thumbnail.src}
                                        alt={asset.thumbnail.alt}
                                        width={asset.thumbnail.width}
                                        height={asset.thumbnail.height}
                                        quality={100}
                                        onLoad={() => handleThumbnailLoad(i)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="asset-display-container flex-1 relative bg-[#111] lg:rounded-lg rounded overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.35)]">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                            <div className="w-[80%] h-1 bg-gray-600 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-[var(--link-color)] loading-bar"></div>
                            </div>
                        </div>
                    )}
                    {assets[activeAssetIndex].type ===
                    PortfolioAssetType.Image ? (
                        <div
                            className={`transition-opacity duration-300 ${
                                isImageVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Image
                                src={assets[activeAssetIndex].src}
                                alt={assets[activeAssetIndex].alt}
                                width={Number(assets[activeAssetIndex].width)}
                                height={Number(assets[activeAssetIndex].height)}
                                quality={100}
                                onLoad={handleAssetLoad}
                            />
                        </div>
                    ) : (
                        <iframe
                            width={assets[activeAssetIndex].width}
                            height={assets[activeAssetIndex].height}
                            src={assets[activeAssetIndex].src}
                            title={assets[activeAssetIndex].alt}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            onLoad={handleAssetLoad}
                        ></iframe>
                    )}
                </div>
            </div>
        </section>
    )
}
