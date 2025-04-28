import Image from 'next/image'
import Link from 'next/link'

import { BlocksComponents } from '../../../types/api'

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
        <p className="text-neutral900 max-w-prose lg:text-lg">{children}</p>
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
