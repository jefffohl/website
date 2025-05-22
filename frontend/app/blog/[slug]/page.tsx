'use client'

import { useEffect, useState } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { blocks } from '../components/Blocks'
import { Post } from '../../../types/api'
import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/usePageTitle'
import Link from 'next/link'
import Image from 'next/image'
export default function BlogPost() {
    const [post, setPost] = useState<Post | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [notFound, setNotFound] = useState(false)
    const params = useParams()

    const postTitle = post?.title ? post.title : 'Blog Post'

    usePageTitle({ title: postTitle })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

                if (!apiUrl) {
                    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
                }

                const response = await fetch(
                    `${apiUrl}/posts?filters[slug][$eq]=${params.slug}&populate=*`
                )
                if (response.status === 404) {
                    setNotFound(true)
                    return
                }
                const responseData = await response.json()
                const post = responseData.data[0]

                setPost(post)
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
        <div className="w-full lg:p-[1.3rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem]">
            {notFound ? (
                <>
                    <h1 className="text-neutral-500 text-4xl">
                        Post not found
                    </h1>
                    <p>
                        Sorry, that post does not seem to exist. Perhaps you are
                        calling from the incorrect point in time. If you think
                        that might be the case, please move forward or backward
                        in time, and try again. Alternatively, you could select
                        a different spatial-temporal gradient from which to make
                        the call.
                    </p>
                </>
            ) : error ? (
                <div>Error:{error}</div>
            ) : post ? (
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[15rem] lg:flex-[0_0_12em] text-neutral-400 pt-4 pb-4 order-3 border-b border-b-[var(--rule-top)] lg:border-b-0 border-t border-t-[var(--rule-bottom)] lg:border-t-0 lg:order-1 lg:border-r lg:border-r-[var(--rule-top)] lg:pr-8">
                        <div className="mb-4 underline-animation">
                            <Link href="/blog">&larr; Index</Link>
                        </div>
                        <div className="date">
                            Posted on{' '}
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        {post.updatedAt && post.updatedAt !== post.createdAt ? (
                            <div className="date">
                                Updated on{' '}
                                {new Date(post.updatedAt).toLocaleDateString()}
                            </div>
                        ) : null}
                        {post.tags ? (
                            <div className="tags mt-4">
                                {post.tags.map((tag: any) => (
                                    <Link
                                        key={tag.id}
                                        href={`/blog?tag=${tag.name}`}
                                        className={`text-neutral-300 hover:text-neutral-100 text-xs px-2 py-1 mr-2 rounded cursor-pointer bg-neutral-900 hover:bg-neutral-600`}
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    <div className="contents lg:block flex-[1_1_auto] underline-animation order-1 lg:order-2 lg:border-l lg:border-l-[var(--rule-bottom)] lg:pl-8">
                        <h1 className="text-neutral900 text-4xl mb-4">
                            {postTitle}
                        </h1>
                        {post.splash ? (
                            <div className="order-2 border-b border-b-[var(--rule-top)] lg:border-b-0 pb-4 lg:pb-0">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.splash.url}`}
                                    alt={
                                        post.splash.alternativeText || 'Splash'
                                    }
                                    width={post.splash.width}
                                    height={post.splash.height}
                                    className="w-full h-auto"
                                />
                            </div>
                        ) : null}
                        <div className="order-4 border-t border-t-[var(--rule-bottom)] lg:border-t-0">
                            <BlocksRenderer
                                blocks={blocks}
                                content={post.body || []}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
