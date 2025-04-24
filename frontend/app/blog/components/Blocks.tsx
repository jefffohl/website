import Image from 'next/image'
import Link from 'next/link'

export interface TextInlineNode {
    type: 'text'
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
}

export interface LinkInlineNode {
    type: 'link'
    url: string
    children: TextInlineNode[]
}
export interface ListItemInlineNode {
    type: 'list-item'
    children: DefaultInlineNode[]
}
export type DefaultInlineNode = TextInlineNode | LinkInlineNode
export type NonTextInlineNode =
    | Exclude<DefaultInlineNode, TextInlineNode>
    | ListItemInlineNode
export interface ParagraphBlockNode {
    type: 'paragraph'
    children: DefaultInlineNode[]
}
export interface QuoteBlockNode {
    type: 'quote'
    children: DefaultInlineNode[]
}
export interface CodeBlockNode {
    type: 'code'
    children: DefaultInlineNode[]
}
export interface HeadingBlockNode {
    type: 'heading'
    level: 1 | 2 | 3 | 4 | 5 | 6
    children: DefaultInlineNode[]
}
export interface ListBlockNode {
    type: 'list'
    format: 'ordered' | 'unordered'
    children: (ListItemInlineNode | ListBlockNode)[]
}
export interface ImageBlockNode {
    type: 'image'
    image: {
        name: string
        alternativeText?: string | null
        url: string
        caption?: string | null
        width: number
        height: number
        formats?: Record<string, unknown>
        hash: string
        ext: string
        mime: string
        size: number
        previewUrl?: string | null
        provider: string
        provider_metadata?: unknown | null
        createdAt: string
        updatedAt: string
    }
    children: [
        {
            type: 'text'
            text: ''
        }
    ]
}

export type RootNode =
    | ParagraphBlockNode
    | QuoteBlockNode
    | CodeBlockNode
    | HeadingBlockNode
    | ListBlockNode
    | ImageBlockNode
export type Node = RootNode | NonTextInlineNode
export type GetPropsFromNode<T> = Omit<T, 'type' | 'children'> & {
    children?: React.ReactNode
    plainText?: T extends {
        type: 'code'
    }
        ? string
        : never
}

export type BlocksComponents = {
    [K in Node['type']]?: React.ComponentType<
        GetPropsFromNode<
            Extract<
                Node,
                {
                    type: K
                }
            >
        >
    >
}

export const blocks: BlocksComponents = {
    image: ({ image }) => {
        return (
            <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || ''}
            />
        )
    },
    paragraph: ({ children }) => (
        <p className="text-neutral900 max-w-prose">{children}</p>
    ),
    // ...or point to a design system
    heading: ({ children, level }) => {
        switch (level) {
            case 1:
                return <h1 className="text-neutral900 text-4xl">{children}</h1>
            case 2:
                return <h2 className="text-neutral900 text-2xl">{children}</h2>
            case 3:
                return <h3 className="text-neutral900 text-xl">{children}</h3>
            case 4:
                return <h4 className="text-neutral900 text-lg">{children}</h4>
            case 5:
                return <h5 className="text-neutral900 text-base">{children}</h5>
            case 6:
                return <h6 className="text-neutral900 text-sm">{children}</h6>
            default:
                return <h1 className="text-neutral900 text-4xl">{children}</h1>
        }
    },
    // For links, you may want to use the component from your router or framework
    link: ({ children, url }) => <Link href={url}>{children}</Link>,
}
