'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import ContentPageWrapper from '@/components/ContentPageWrapper'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Blog index error:', error)
    }, [error])

    return (
        <ContentPageWrapper>
            <div className="max-w-2xl mx-auto text-center underline-animation">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-neutral-600 mb-8">
                    We apologize, but there was an error loading the blog posts.
                    This could be due to a temporary issue or a problem with the
                    connection.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition-colors"
                    >
                        Try again
                    </button>
                    <div>
                        <Link
                            href="/"
                            className="text-neutral-600 hover:text-neutral-900 underline"
                        >
                            Return to home
                        </Link>
                    </div>
                </div>
            </div>
        </ContentPageWrapper>
    )
}
