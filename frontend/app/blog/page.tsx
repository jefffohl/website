'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useSearchParams, useRouter } from 'next/navigation'

function BlogContent() {
    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedTag = searchParams.get('tag')

    usePageTitle({ title: 'Blog' })

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

                if (!apiUrl) {
                    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
                }

                // Build the filter query based on selected tag
                const filterQuery = selectedTag
                    ? `&filters[tags][name][$eq]=${encodeURIComponent(selectedTag)}`
                    : ''

                const response = await fetch(
                    `${apiUrl}/posts?populate=*&sort=createdAt:desc${filterQuery}`
                )
                const responseData = await response.json()
                setPosts(responseData.data)
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'Failed to fetch posts'
                )
                console.error('Error fetching posts:', err)
            }
        }
        fetchPosts()
    }, [selectedTag])

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tag', tag)
        router.push(`?${params.toString()}`)
    }

    const handleClearTag = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('tag')
        router.push(`?${params.toString()}`)
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            <h1 className="text-2xl font-[400] uppercase text-neutral-500 tracking-widest pb-4">
                Blog
            </h1>
            {selectedTag && (
                <div className="mb-4">
                    <span className="text-neutral-400">Filtering by: </span>
                    <button
                        onClick={handleClearTag}
                        className="text-neutral-300 bg-neutral-900 px-2 py-1 ml-2 rounded hover:bg-neutral-800 cursor-pointer"
                    >
                        {selectedTag}
                        <span className="inline-block ml-4 text-neutral-500">
                            x
                        </span>
                    </button>
                </div>
            )}
            <div className="border-t border-t-[var(--rule-top)] border-b border-b-[var(--rule-bottom)]">
                {posts.length > 0 ? (
                    <>
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="border-t border-t-[var(--rule-bottom)] border-b border-b-[var(--rule-top)] py-4"
                            >
                                <Link
                                    href={`/blog/${encodeURIComponent(
                                        post.slug
                                    )}`}
                                    className="underline-animation relative"
                                >
                                    <h2 className="text-2xl mb-1">
                                        {post.title}
                                    </h2>
                                </Link>
                                {post.tags ? (
                                    <div className="tags flex items-center gap-1 mt-2">
                                        {post.tags.map((tag: any) => (
                                            <button
                                                key={tag.id}
                                                onClick={() =>
                                                    handleTagClick(tag.name)
                                                }
                                                className={`text-neutral-300 text-xs px-2 py-1 rounded cursor-pointer ${
                                                    selectedTag === tag.name
                                                        ? 'bg-neutral-800'
                                                        : 'bg-neutral-900 hover:bg-neutral-800'
                                                }`}
                                            >
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="text-neutral-500 mt-2">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>No posts found</div>
                )}
            </div>
        </div>
    )
}

export default function Blog() {
    return (
        <Suspense
            fallback={
                <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
                    Loading...
                </div>
            }
        >
            <BlogContent />
        </Suspense>
    )
}
