'use client'

interface CloseButtonProps {
    clickHandler: () => void
    className?: string
}

export default function CloseButton({
    clickHandler,
    className = '',
}: CloseButtonProps) {
    return (
        <button
            onClick={clickHandler}
            className={`group cursor-pointer w-[50px] h-[50px] ${className}`}
        >
            <span className="block absolute h-[50px] top-0 w-[50px] before:content-[''] before:block before:w-[2px] before:h-[25px] before:absolute before:top-[13px] before:left-[23px] before:bg-[var(--button-icon-color)] before:rotate-45 before:transition-colors before:duration-250 after:content-[''] after:block after:w-[2px] after:h-[25px] after:absolute after:top-[13px] after:left-[23px] after:bg-[var(--button-icon-color)] after:rotate-[-45deg] after:transition-colors after:duration-250 group-hover:before:bg-[var(--button-icon-hover)] group-hover:after:bg-[var(--button-icon-hover)]"></span>
        </button>
    )
}
