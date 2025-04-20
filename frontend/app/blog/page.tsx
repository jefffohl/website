'use client'

import { useEffect, useState } from 'react'
import {
    BlocksRenderer,
    type BlocksContent,
} from '@strapi/blocks-react-renderer'

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
                            <h2>{post.title}</h2>
                            <BlocksRenderer content={post.body} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>No posts found</div>
            )}
        </>
    )
}
