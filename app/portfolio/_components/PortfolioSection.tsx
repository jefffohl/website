'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

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
    return (
        <section className="p-[4rem_0] border-t border-b border-t-[#555] border-b-[#222]">
            <div className="flex lg:flex-row flex-col">
                <div className="lg:flex-[0_0_auto] lg:w-[30rem] flex-1 lg:pr-8 pr-0">
                    <h2>{title}</h2>
                    {description}
                    <dl>
                        <dt>Date</dt>
                        <dd>{date}</dd>
                        <dt>Company</dt>
                        <dd>
                            <a href={companyUrl}>{company}</a>
                        </dd>
                        <dt>Roles</dt>
                        <dd>{roles.join(', ')}</dd>
                        {stack && (
                            <>
                                <dt>Stack</dt>
                                <dd>{stack.join(', ')}</dd>
                            </>
                        )}
                    </dl>
                    <div className="flex flex-wrap">
                        {assets.map((asset, i) => (
                            <div
                                key={'asset_' + i}
                                className={`asset-thumbnail transition-all duration-300 shadow-md rounded overflow-hidden mr-4 mb-4 cursor-pointer ${
                                    i === activeAssetIndex
                                        ? 'ring-2 ring-[var(--link-color)]'
                                        : ''
                                }`}
                                onClick={() => setActiveAssetIndex(i)}
                            >
                                <Image
                                    src={asset.thumbnail.src}
                                    alt={asset.thumbnail.alt}
                                    width={asset.thumbnail.width}
                                    height={asset.thumbnail.height}
                                    quality={100}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="asset-display-container flex-1">
                    {assets[activeAssetIndex].type ===
                    PortfolioAssetType.Image ? (
                        <Image
                            src={assets[activeAssetIndex].src}
                            alt={assets[activeAssetIndex].alt}
                            width={Number(assets[activeAssetIndex].width)}
                            height={Number(assets[activeAssetIndex].height)}
                            quality={100}
                        />
                    ) : (
                        <iframe
                            width={assets[activeAssetIndex].width}
                            height={assets[activeAssetIndex].height}
                            src={assets[activeAssetIndex].src}
                            title={assets[activeAssetIndex].alt}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        </section>
    )
}
