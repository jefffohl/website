// TODO: figure out why the Loading component for the parent route is loading first, and then rendering this, followed by the page content

export default function Loading() {
    return (
        <div className="w-full lg:p-[1.3rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-[15rem] lg:flex-[0_0_12em] text-neutral-400 pt-4 pb-4 order-3 border-b border-b-[var(--rule-top)] lg:border-b-0 border-t border-t-[var(--rule-bottom)] lg:border-t-0 lg:order-1 lg:border-r lg:border-r-[var(--rule-top)] lg:pr-8">
                    <div className="mb-4">
                        <div className="h-6 w-24 bg-neutral-800 animate-pulse rounded"></div>
                    </div>
                    <div className="h-4 w-32 bg-neutral-800 animate-pulse rounded"></div>
                </div>
                <div className="contents lg:block flex-[1_1_auto] order-1 lg:order-2 lg:border-l lg:border-l-[var(--rule-bottom)] lg:pl-8">
                    <div className="h-12 w-3/4 bg-neutral-800 animate-pulse rounded mb-4"></div>
                    <div className="h-64 w-full bg-neutral-800 animate-pulse rounded mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-neutral-800 animate-pulse rounded"></div>
                        <div className="h-4 w-5/6 bg-neutral-800 animate-pulse rounded"></div>
                        <div className="h-4 w-4/6 bg-neutral-800 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
