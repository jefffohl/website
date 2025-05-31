'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Blog post error:', error)
    }, [error])

    return (
        <div className="w-full xl:p-[1.3rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-neutral-600 mb-8">
                    We apologize, but there was an error loading this blog post.
                    This could be due to a temporary issue or a problem with the
                    content.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition-colors"
                    >
                        Try again
                    </button>
                    <div>
                        <a
                            href="/blog"
                            className="text-neutral-600 hover:text-neutral-900 underline"
                        >
                            Return to blog index
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
