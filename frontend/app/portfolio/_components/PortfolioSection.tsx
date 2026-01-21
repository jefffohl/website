'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
    const [translateX, setTranslateX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [scrollY, setScrollY] = useState<number>(0)
    const [galleryLoadStates, setGalleryLoadStates] = useState<boolean[]>(
        new Array(assets.length).fill(false)
    )

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Handle body scroll lock
    useEffect(() => {
        if (!mounted) return
        if (isOpen) {
            // Add styles to prevent scrolling
            setScrollY(window.scrollY)
            document.body.style.top = `-${window.scrollY}px`
            document.body.style.position = 'fixed'
        } else {
            // Restore scroll position
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, scrollY || 0)
        }

        return () => {
            // Cleanup in case the component unmounts while modal is open
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
        }
    }, [isOpen, mounted])

    const handleDragStart = (clientX: number) => {
        setTouchStart(clientX)
        setIsDragging(true)
    }

    const handleDragMove = (clientX: number) => {
        if (!touchStart) return

        setTouchEnd(clientX)

        // Calculate the drag distance
        const dragDistance = clientX - touchStart
        setTranslateX(dragDistance)
    }

    const handleDragEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe && activeIndex < assets.length - 1) {
            onIndexChange(activeIndex + 1)
        } else if (isRightSwipe && activeIndex > 0) {
            onIndexChange(activeIndex - 1)
        }

        // Reset states
        setTouchStart(null)
        setTouchEnd(null)
        setTranslateX(0)
        setIsDragging(false)
    }

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation()
        handleDragStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        e.stopPropagation()
        handleDragMove(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation()
        handleDragEnd()
    }

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        handleDragStart(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        handleDragMove(e.clientX)
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        handleDragEnd()
    }

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        handleDragEnd()
    }

    const handleGalleryImageLoad = (index: number) => {
        setGalleryLoadStates((prev) => {
            const newStates = [...prev]
            newStates[index] = true
            return newStates
        })
    }

    if (!isOpen || !mounted) return null

    const modalContent = (
        <div
            className="fixed inset-0 bg-[var(--scrim-color)] bg-opacity-90 z-50 flex items-center justify-center w-[100dvw] h-[100dvh]"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            <CloseButton
                clickHandler={onClose}
                className="absolute top-4 right-4 z-51 bg-[var(--scrim-color)] rounded-4xl"
            />
            <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="flex transition-transform duration-300 ease-out items-center"
                    style={{
                        transform: `translateX(calc(-${activeIndex * 100}% + ${translateX}px))`,
                    }}
                >
                    {assets.map((asset, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-full flex items-center justify-center cursor-grab"
                        >
                            {asset.type === 'image' ? (
                                <div className="relative min-h-1">
                                    {!galleryLoadStates[index] && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-[80%] h-1 bg-[#ccc] dark:bg-[#666] rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-[var(--loader-bar-color)] loading-bar"></div>
                                            </div>
                                        </div>
                                    )}
                                    <Image
                                        src={asset.src}
                                        alt={asset.alt}
                                        width={Number(asset.width)}
                                        height={Number(asset.height)}
                                        quality={100}
                                        className={`max-w-[90dvw] max-h-[90dvh] object-contain rounded-md w-auto h-auto transition-opacity duration-300 ${
                                            galleryLoadStates[index]
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                        onLoad={() =>
                                            handleGalleryImageLoad(index)
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="relative aspect-video h-full w-full max-w-[90dvw] max-h-[90dvh]">
                                    {!galleryLoadStates[index] && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-[80%] h-1 bg-[#ccc] dark:bg-[#666] rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-[var(--loader-bar-color)] loading-bar"></div>
                                            </div>
                                        </div>
                                    )}
                                    <iframe
                                        width={asset.width}
                                        height={asset.height}
                                        src={asset.src}
                                        title={asset.alt}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className="max-w-[90dvw] max-h-[90dvh] rounded-md aspect-video"
                                        onLoad={() =>
                                            handleGalleryImageLoad(index)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-51">
                    {assets.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'bg-black dark:bg-white scale-125'
                                    : 'bg-black/50 dark:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
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
    const [activeAssetIndex, setActiveAssetIndex] = useState<number>(0)
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
        if (index !== activeAssetIndex) {
            setIsImageVisible(false)
        }
        setActiveAssetIndex(index)
        if (window.innerWidth < 1280) {
            setIsModalOpen(true)
        }
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
                                        ? 'xl:ring-2 xl:ring-[var(--link-color)]'
                                        : ''
                                }`}
                                onClick={() => handleThumbnailClick(i)}
                            >
                                {!thumbnailLoadStates[i] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[80%] h-1 bg-[var(--loader-bar-bg)] rounded-full overflow-hidden">
                                            <div className="w-full h-full bg-[var(--loader-bar-color)] loading-bar"></div>
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
                <div className="hidden xl:block asset-display-container flex-1  relative bg-[var(--portfolio-asset-thumbnail-bg)] xl:rounded-lg rounded overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                            <div className="w-[80%] h-1 bg-[var(--loader-bar-bg)] rounded-full overflow-hidden">
                                <div className="w-full h-full bg-[var(--loader-bar-color)] loading-bar"></div>
                            </div>
                        </div>
                    )}
                    {assets[activeAssetIndex].type === 'image' ? (
                        <div
                            className={`transition-opacity border-none duration-300 ${
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
