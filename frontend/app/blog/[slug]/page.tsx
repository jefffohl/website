'use client'

import { useEffect, useState } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { blocks, RootNode } from '../components/Blocks'
import { ApiPostPost } from '../../../../backend/types/generated/contentTypes'
import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function BlogPost() {
    const [post, setPost] = useState<ApiPostPost['attributes'] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const params = useParams()

    const postTitle = post?.title
        ? (post.title as unknown as string)
        : 'Blog Post'

    usePageTitle({ title: postTitle })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
                console.log('API URL:', apiUrl) // Debug log

                if (!apiUrl) {
                    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
                }

                const slug = await params.slug
                const response = await fetch(
                    `${apiUrl}/api/posts/${params.slug}`
                )
                const responseData = await response.json()

                if (responseData.data.length === 0) {
                    throw new Error('Post not found')
                }

                setPost(responseData.data)
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'Failed to fetch post.'
                )
                console.error('Error fetching post:', err)
            }
        }
        fetchPost()
    }, [params.slug])

    return (
        <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            {error ? (
                <div>Error: {error}</div>
            ) : post ? (
                <>
                    <h1 className="text-neutral900 text-4xl">{postTitle}</h1>
                    <BlocksRenderer
                        blocks={blocks}
                        content={(post.body as unknown as RootNode[]) || []}
                    />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
