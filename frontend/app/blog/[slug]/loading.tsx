// TODO: figure out why the Loading component for the parent route is loading first, and then rendering this, followed by the page content

import ContentPageWrapper from '@/components/ContentPageWrapper'

export default function Loading() {
    return (
        <ContentPageWrapper className="animate-pulse">
            <div className="flex flex-col xl:flex-row">
                <div className="w-full xl:w-[15rem] xl:flex-[0_0_12em] text-neutral-400 pt-4 pb-4 order-3 border-b border-b-[var(--rule-top)] xl:border-b-0 border-t border-t-[var(--rule-bottom)] xl:border-t-0 xl:order-1 xl:border-r xl:border-r-[var(--rule-top)] xl:pr-8">
                    <div className="mb-4">
                        <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                    </div>
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                </div>
                <div className="contents xl:block flex-[1_1_auto] order-1 xl:order-2 xl:border-l xl:border-l-[var(--rule-bottom)] xl:pl-8">
                    <div className="h-12 w-3/4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded mb-4"></div>
                    <div className="h-64 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                        <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                        <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        </ContentPageWrapper>
    )
}
