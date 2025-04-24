'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Blog() {
    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
                console.log('API URL:', apiUrl) // Debug log

                if (!apiUrl) {
                    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
                }

                const response = await fetch(`${apiUrl}/api/posts?populate=*`)
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

    console.warn('posts', posts)

    return (
        <>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <Link
                                href={`/blog/${encodeURIComponent(post.slug)}`}
                            >
                                <h2 className="text-neutral900 text-2xl">
                                    {post.title}
                                </h2>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No posts found</div>
            )}
        </>
    )
}
