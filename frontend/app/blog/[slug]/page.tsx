import { Metadata } from 'next'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { blocks } from '../_components/Blocks'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ContentPageWrapper from '@/components/ContentPageWrapper'

// Generate metadata for the page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

    if (!apiUrl) {
        return {
            title: 'Blog Post',
            description: 'Blog post not found',
        }
    }

    try {
        const response = await fetch(
            `${apiUrl}/posts?filters[slug][$eq]=${slug}&populate=*`,
            { next: { revalidate: 3600 } } // Revalidate every hour
        )

        if (!response.ok) {
            return {
                title: 'Blog Post Not Found',
                description: 'The requested blog post could not be found',
            }
        }

        const responseData = await response.json()
        const post = responseData.data[0]

        if (!post) {
            return {
                title: 'Blog Post Not Found',
                description: 'The requested blog post could not be found',
            }
        }

        return {
            title: post.title,
            description: post.excerpt || post.title,
            openGraph: {
                title: post.title,
                description: post.excerpt || post.title,
                images: post.splash ? [post.splash.url] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.excerpt || post.title,
                images: post.splash ? [post.splash.url] : [],
            },
        }
    } catch (error) {
        return {
            title: 'Blog Post',
            description: 'Error loading blog post',
        }
    }
}

// Server component for the blog post content
export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || ''
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
    }

    const response = await fetch(
        `${apiUrl}/posts?filters[slug][$eq]=${slug}&populate=*`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    )

    if (!response.ok) {
        notFound()
    }

    const responseData = await response.json()
    const post = responseData.data[0]

    if (!post) {
        notFound()
    }

    return (
        <ContentPageWrapper>
            <div className="flex flex-col xl:flex-row">
                <div className="w-full xl:w-[15rem] xl:flex-[0_0_12em] text-[var(--date-color)] pt-4 pb-4 order-3 border-b border-b-[var(--rule-top)] xl:border-b-0 border-t border-t-[var(--rule-bottom)] xl:border-t-0 xl:order-1 xl:border-r xl:border-r-[var(--rule-top)] xl:pr-8">
                    <div className="mb-4 underline-animation">
                        <Link href="/blog">&larr; Index</Link>
                    </div>
                    <dl className="flex flex-col gap-4 text-sm">
                        <div className="flex gap-0 flex-col">
                            <dt className="text-[var(--date-color)]">
                                Posted on
                            </dt>
                            <dd>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </dd>
                        </div>
                        {post.updatedAt && post.updatedAt !== post.createdAt ? (
                            <div className="flex gap-0 flex-col">
                                <dt className="text-[var(--date-color)]">
                                    Updated on
                                </dt>
                                <dd>
                                    {new Date(
                                        post.updatedAt
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                        ) : null}
                    </dl>
                    {post.tags ? (
                        <div className="tags mt-4">
                            {post.tags.map((tag: any) => (
                                <Link
                                    key={tag.id}
                                    href={`/blog?tag=${tag.name}`}
                                    className={`text-[var(--tag-color)] hover:text-[var(--tag-color-hover)] text-xs px-2 py-1 mr-2 rounded cursor-pointer bg-[var(--tag-bg)] hover:bg-[var(--tag-bg-hover)]`}
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="contents xl:block flex-[1_1_auto] underline-animation order-1 xl:order-2 xl:border-l xl:border-l-[var(--rule-bottom)] xl:pl-8">
                    <h1 className="text-2xl xl:text-4xl mb-4">{post.title}</h1>
                    {post.splash ? (
                        <div className="order-2 border-b border-b-[var(--rule-top)] xl:border-b-0 pb-4 xl:pb-0">
                            <Image
                                src={`${imageUrl}${post.splash.url}`}
                                alt={post.splash.alternativeText || 'Splash'}
                                width={post.splash.width}
                                height={post.splash.height}
                                className="w-full h-auto"
                            />
                        </div>
                    ) : null}
                    <div className="order-4 border-t border-t-[var(--rule-bottom)] xl:border-t-0">
                        <BlocksRenderer
                            blocks={blocks}
                            content={post.body || []}
                        />
                    </div>
                </div>
            </div>
        </ContentPageWrapper>
    )
}
