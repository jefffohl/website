import Link from 'next/link'
import ContentPageWrapper from '@/components/ContentPageWrapper'

export default function NotFound() {
    return (
        <ContentPageWrapper>
            <div className="max-w-2xl mx-auto text-white underline-animation">
                <h1 className=" text-4xl mb-6">Post not found</h1>
                <div className="prose prose-neutral">
                    <p className=" mb-8">
                        Sorry, that post does not seem to exist. Perhaps you are
                        calling from the incorrect point in time. If you think
                        that might be the case, please move forward or backward
                        in time, and try again. Alternatively, you could select
                        a different spatial-temporal gradient from which to make
                        the call.
                    </p>
                    <div className="mb-4">
                        <Link href="/blog" className="inline-flex items-center">
                            <span className="mr-2">&larr;</span> Return to blog
                            index
                        </Link>
                    </div>
                </div>
            </div>
        </ContentPageWrapper>
    )
}
