import CanvasClient from '@/app/_components/CanvasClient'

// Server component for the blog post content
export default async function BlogPost({
    params,
}: {
    params: Promise<{ artwork: string }>
}) {
    let artworkType = 'grid'
    const { artwork } = await params
    if (artwork) {
        artworkType = artwork
    }

    return (
        <div className="flex-1 w-full h-full relative">
            <CanvasClient canvasType={artworkType} />
        </div>
    )
}
