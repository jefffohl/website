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
        },
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

export type Entity = {
    createdAt: string
    documentId: string
    id: number
    publishedAt: string | null
    updatedAt: string | null
}

export type Post = Entity & {
    body: RootNode[]
    slug: string
    title: string
    tags: Tag[]
    splash?: Image
}

export type Tag = Entity & {
    name: string
}

export type ImageFormat = {
    ext: string
    hash: string
    height: number
    width: number
    mime: string
    name: string
    path: string | null
    size: number
    sizeInBytes: number
    url: string
}

export type Image = Entity & {
    alternativeText: string | null
    caption: string | null
    ext: string
    formats: {
        large: ImageFormat
        thumbnail: ImageFormat
        small: ImageFormat
        medium: ImageFormat
    }
    hash: string
    height: number
    mime: string
    name: string
    previewUrl: string | null
    provider: string
    provider_metadata: unknown | null
    publishedAt: string
    size: number
    updatedAt: string
    url: string
    width: number
}
