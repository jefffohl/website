export default function ContentPageWrapper({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={`w-full xl:p-[2rem_3rem_3rem_3rem] p-[1rem_1rem_3rem_1rem] ${className || ''}`}
        >
            {children}
        </div>
    )
}
