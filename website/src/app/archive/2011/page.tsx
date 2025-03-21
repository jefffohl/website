'use client'

import Link from 'next/link'

export default function Archive2011() {
    return (
        <div className="p-8">
            <h1>Archive - 2011</h1>
            <p>
                This is the archive page for 2011. Content will be added later.
            </p>
            <div className="mt-8">
                <Link href="/" className="text-blue-500 hover:underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
