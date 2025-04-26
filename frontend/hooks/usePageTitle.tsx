import { useEffect } from 'react'

interface UsePageTitleProps {
    title: string
    description?: string
}

export function usePageTitle({
    title,
    description = 'A personal website for Jeff Fohl, software designer',
}: UsePageTitleProps) {
    useEffect(() => {
        document.title = `${title} - Jeff Fohl`
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        )
        if (metaDescription) {
            metaDescription.setAttribute('content', description)
        }
    }, [title, description])
}
