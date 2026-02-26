'use client'

import CloseButton from './CloseButton'

interface AboutPanelProps {
    isHidden: boolean
    onClose?: () => void
    content: string
    title: string
}

export default function AboutPanel({
    isHidden,
    onClose,
    content,
    title,
}: AboutPanelProps) {
    return (
        <div
            className={`w-full h-full absolute top-0 bg-[var(--panel-bg)] leading-[1.5rem] text-base ${isHidden ? 'right-[-100%] xl:right-[-400px]' : 'right-0'} xl:left-auto xl:w-[400px]`}
        >
            <h2 className="font-medium text-[1.5rem] pl-6 pr-15 h-[60px] leading-[60px]">
                {title}
                {onClose && (
                    <CloseButton
                        clickHandler={onClose}
                        className="absolute top-[5px] right-[5px]"
                    />
                )}
            </h2>
            <div
                className="underline-animation overflow-auto h-[calc(100%-60px)] px-6 pb-8"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    )
}
