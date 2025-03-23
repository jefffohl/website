'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export interface PortfolioSectionProps {
    title: string
    description: React.ReactNode
    company: string
    assets: PortfolioAsset[]
    date: string
    roles: string[]
}

export interface PortfolioAsset {
    type: PortfolioAssetType
    thumbnail: ImageProps
    src: string
    alt: string
    width: number
    height: number
}

export enum PortfolioAssetType {
    Image = 'image',
    Video = 'video',
}

export default function PortfolioSection({
    title,
    description,
    company,
    assets,
    date,
    roles,
}: PortfolioSectionProps) {
    const [activeAssetIndex, setActiveAssetIndex] = useState(0)
    return (
        <section>
            <div className="flex lg:flex-row flex-col">
                <div className="lg:flex-[0_0_30rem] flex-1 lg:pr-8 pr-0">
                    <h2>{title}</h2>
                    {description}
                    <dl>
                        <dt>Date</dt>
                        <dd>{date}</dd>
                        <dt>Company</dt>
                        <dd>{company}</dd>
                        <dt>Roles</dt>
                        <dd>{roles.join(', ')}</dd>
                    </dl>
                    <div className="flex mb-4">
                        {assets.map((asset, i) => (
                            <div
                                key={'asset_' + i}
                                className={`asset-thumbnail transition-all duration-300 lg:w-[150px] w-[100px] shadow-md rounded overflow-hidden mr-4 cursor-pointer ${
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
                            width={assets[activeAssetIndex].width}
                            height={assets[activeAssetIndex].height}
                        />
                    ) : (
                        <video
                            src={assets[activeAssetIndex].src}
                            controls
                            width={assets[activeAssetIndex].width}
                            height={assets[activeAssetIndex].height}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
