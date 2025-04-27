'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Blog() {
    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    usePageTitle({ title: 'Blog' })

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

                if (!apiUrl) {
                    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
                }

                const response = await fetch(
                    `${apiUrl}/api/posts?populate=*&sort=createdAt:desc`
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
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            <h1 className="text-2xl font-[400] uppercase text-neutral-500 tracking-widest pb-4">
                Blog
            </h1>
            <div className="border-t border-t-[#222]">
                {posts.length > 0 ? (
                    <>
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="border-t border-t-[#555] border-b border-b-[#222] py-4"
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
                                            <div
                                                key={tag.id}
                                                className="text-neutral-300 text-xs bg-neutral-900 px-2 py-1 rounded"
                                            >
                                                {tag.name}
                                            </div>
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
