'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import CloseButton from '@/components/CloseButton'

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
    type: 'image' | 'video'
    thumbnail: ImageProps
    src: string
    alt: string
    width: number | string
    height: number | string
}

interface FullScreenModalProps {
    isOpen: boolean
    onClose: () => void
    assets: PortfolioAsset[]
    activeIndex: number
    onIndexChange: (index: number) => void
}

function FullScreenModal({
    isOpen,
    onClose,
    assets,
    activeIndex,
    onIndexChange,
}: FullScreenModalProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe && activeIndex < assets.length - 1) {
            onIndexChange(activeIndex + 1)
        } else if (isRightSwipe && activeIndex > 0) {
            onIndexChange(activeIndex - 1)
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

    if (!isOpen) return null

    return (
        <div className="fixed xl:hidden inset-0 bg-[var(--scrim-color)] bg-opacity-90 z-50 flex items-center justify-center">
            <CloseButton
                clickHandler={onClose}
                className="absolute top-4 right-4 z-50 bg-[var(--scrim-color)] rounded-4xl"
            />
            <div
                className="relative w-full h-full flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {assets[activeIndex].type === 'image' ? (
                    <Image
                        src={assets[activeIndex].src}
                        alt={assets[activeIndex].alt}
                        width={Number(assets[activeIndex].width)}
                        height={Number(assets[activeIndex].height)}
                        quality={100}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <iframe
                        width={assets[activeIndex].width}
                        height={assets[activeIndex].height}
                        src={assets[activeIndex].src}
                        title={assets[activeIndex].alt}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="max-w-full max-h-full"
                    />
                )}
            </div>
        </div>
    )
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
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const handleThumbnailClick = (index: number) => {
        setIsImageVisible(false)
        setActiveAssetIndex(index)
        setIsModalOpen(true)
    }

    // Handle initial image load
    useEffect(() => {
        if (assets[0].type === 'image') {
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
        <section className="portfolio-section p-[2rem_0_4rem_0] border-t border-b border-t-[var(--rule-bottom)] border-b-[var(--rule-top)]">
            <div
                className={`flex xl:flex-row flex-col ${
                    assets[activeAssetIndex].type === 'image'
                        ? 'items-start'
                        : 'items-stretch'
                }`}
            >
                <div className="xl:flex-[0_0_auto] xl:w-[30rem] flex-1 xl:pr-8 pr-0 flex flex-col">
                    <h2 className="text-2xl font-[400] mb-4 order-1">
                        {title}
                    </h2>
                    <div className="order-4 xl:order-2">{description}</div>
                    <dl className="order-5 xl:order-3 grid grid-cols-[7rem_1fr] gap-0 font-size-085 my-4">
                        <dt className="text-neutral-500 py-1">Date</dt>
                        <dd className="py-1 border-b border-b-[var(--portfolio-detail-rule-color)]">
                            {date}
                        </dd>
                        <dt className="text-neutral-500 py-1">Company</dt>
                        <dd className="py-1 border-b border-b-[var(--portfolio-detail-rule-color)]">
                            <a target="_blank" href={companyUrl}>
                                {company}
                            </a>
                        </dd>
                        <dt className="text-neutral-500 py-1">Roles</dt>
                        <dd className="py-1 border-b border-b-[var(--portfolio-detail-rule-color)]">
                            {roles.join(', ')}
                        </dd>
                        {stack && (
                            <>
                                <dt className="text-neutral-500 py-1">Stack</dt>
                                <dd className="py-1 border-b border-b-[var(--portfolio-detail-rule-color)]">
                                    {stack.join(', ')}
                                </dd>
                            </>
                        )}
                    </dl>

                    <div className="grid xl:grid-cols-6 md:grid-cols-8 grid-cols-4 gap-2 order-2 xl:order-4">
                        {assets.map((asset, i) => (
                            <div
                                key={'asset_' + i}
                                className={`asset-thumbnail bg-[var(--portfolio-asset-thumbnail-bg)] transition-all duration-300 shadow rounded overflow-hidden cursor-pointer relative ${
                                    i === activeAssetIndex
                                        ? 'ring-2 ring-[var(--link-color)]'
                                        : ''
                                }`}
                                onClick={() => handleThumbnailClick(i)}
                            >
                                {!thumbnailLoadStates[i] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[80%] h-1 bg-gray-600 rounded-full overflow-hidden">
                                            <div className="w-full h-full bg-[var(--link-color)] loading-bar"></div>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`[&_img]:object-cover [&_img]:min-h-full [&_img]:min-w-full w-full h-full aspect-square transition-opacity duration-300 ${
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
                <div className="hidden xl:block asset-display-container flex-1 relative bg-[var(--portfolio-asset-thumbnail-bg)] xl:rounded-lg rounded overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                            <div className="w-[80%] h-1 bg-gray-600 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-[var(--link-color)] loading-bar"></div>
                            </div>
                        </div>
                    )}
                    {assets[activeAssetIndex].type === 'image' ? (
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
            <FullScreenModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                assets={assets}
                activeIndex={activeAssetIndex}
                onIndexChange={setActiveAssetIndex}
            />
        </section>
    )
}
