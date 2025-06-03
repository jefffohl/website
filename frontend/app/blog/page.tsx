import { Post } from '@/types/api'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

// Generate metadata for the page
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ tag?: string }>
}): Promise<Metadata> {
    const { tag } = await searchParams
    const title = tag ? `Blog - ${tag}` : 'Blog'
    const description = tag
        ? `Blog posts tagged with ${tag}`
        : 'Latest blog posts and articles'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    }
}

export default async function Blog({
    searchParams,
}: {
    searchParams: Promise<{ tag?: string }>
}) {
    const { tag } = await searchParams
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
    }

    // Build the filter query based on selected tag
    const filterQuery = tag
        ? `&filters[tags][name][$eq]=${encodeURIComponent(tag)}`
        : ''

    const response = await fetch(
        `${apiUrl}/posts?populate=*&sort=createdAt:desc${filterQuery}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    )

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    const responseData = await response.json()
    const posts: Post[] = responseData.data

    return (
        <div className="w-full xl:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            <h1 className="text-2xl font-[400] uppercase text-[var(--site-section-title-color)] tracking-widest pb-4">
                Blog
            </h1>
            {tag && (
                <div className="mb-4">
                    <span className="text-neutral-400">Filtering by: </span>
                    <Link
                        href="/blog"
                        className="bg-[var(--tag-bg)] hover:bg-[var(--tag-bg-hover)] text-[var(--tag-color)] hover:text-[var(--tag-color-hover)] px-2 py-1 ml-2 rounded cursor-pointer inline-flex items-center"
                    >
                        {tag}
                        <span className="inline-block ml-4 text-neutral-500">
                            x
                        </span>
                    </Link>
                </div>
            )}
            <div className="border-t border-t-[var(--rule-top)] border-b border-b-[var(--rule-bottom)]">
                {posts?.length > 0 ? (
                    <>
                        {posts.map((post: Post) => (
                            <div
                                key={post.id}
                                className="border-t border-t-[var(--rule-bottom)] border-b border-b-[var(--rule-top)] py-4"
                            >
                                <div className="flex items-start gap-6">
                                    {post.splash && (
                                        <Image
                                            src={post.splash.url}
                                            alt={post.title}
                                            width="150"
                                            height="150"
                                            className="rounded"
                                        />
                                    )}
                                    <div className="flex-1 flex flex-col">
                                        <span>
                                            <Link
                                                href={`/blog/${encodeURIComponent(
                                                    post.slug
                                                )}`}
                                                className="underline-animation relative inline"
                                            >
                                                <h2 className="text-2xl leading-[1.1] mb-2 inline">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                        </span>
                                        {post.tags ? (
                                            <div className="tags flex items-center gap-1 mt-2">
                                                {post.tags.map((tag: any) => (
                                                    <Link
                                                        key={tag.id}
                                                        href={`/blog?tag=${encodeURIComponent(
                                                            tag.name
                                                        )}`}
                                                        className="text-xs px-2 py-1 rounded cursor-pointer bg-[var(--tag-bg)] hover:bg-[var(--tag-bg-hover)] text-[var(--tag-color)] hover:text-[var(--tag-color-hover)]"
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="text-[var(--date-color)] mt-2 text-sm">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="py-4 text-neutral-500">
                        No posts found
                        {tag && <span> for tag &quot;{tag}&quot;</span>}
                    </div>
                )}
            </div>
        </div>
    )
}
