// TODO: figure out why this component is not loading when the page is rendered

export default function Loading() {
    return (
        <div className="w-full xl:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem] animate-pulse">
            <div className="h-8 w-32 bg-neutral-700 rounded mb-4"></div>
            <div className="border-t border-t-[var(--rule-top)] border-b border-b-[var(--rule-bottom)]">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="border-t border-t-[var(--rule-bottom)] border-b border-b-[var(--rule-top)] py-4"
                    >
                        <div className="h-8 w-3/4 bg-neutral-700 rounded mb-2"></div>
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3].map((j) => (
                                <div
                                    key={j}
                                    className="h-6 w-16 bg-neutral-700 rounded"
                                ></div>
                            ))}
                        </div>
                        <div className="h-4 w-24 bg-neutral-700 rounded mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
