interface MilestoneProps {
    year: string
}

export default function Milestone({ year }: MilestoneProps) {
    return (
        <div className="relative">
            <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                {year}
            </div>
        </div>
    )
}
