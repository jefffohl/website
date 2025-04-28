import { ReactNode } from 'react'

interface PositionProps {
    title: string
    company: string
    description?: ReactNode
    highlights?: {
        title?: string
        items: ReactNode[]
    }
    isFirst?: boolean
    isLast?: boolean
}

export default function Position({
    title,
    company,
    description,
    highlights,
    isFirst = false,
    isLast = false,
}: PositionProps) {
    return (
        <div
            className={`ml-[30px] py-[30px] pl-[30px] border-l border-[#666] ${!isLast ? 'border-b' : ''} ${isFirst ? 'relative pt-0 before:content-[""] before:block before:absolute before:w-[10px] before:h-[10px] before:rotate-[-45deg] before:border-t before:border-r before:border-[#666] before:top-[1px] before:left-[-6px]' : ''}`}
        >
            <h2 className="text-[1.5rem] font-normal text-[#999] leading-[1.85rem]">
                <span className="font-semibold text-white">{title}</span> at{' '}
                <span className="company">{company}</span>
            </h2>
            {description && (
                <p className="position-description">{description}</p>
            )}
            {highlights && (
                <>
                    {highlights.title && (
                        <h3 className="font-normal text-[1.1rem] uppercase tracking-[1px] my-[0.83rem]">
                            {highlights.title}
                        </h3>
                    )}
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        {highlights.items.map((item, index) => (
                            <li key={index} className="mb-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
