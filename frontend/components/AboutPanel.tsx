'use client'

import CloseButton from './CloseButton'

interface AboutPanelProps {
    isHidden: boolean
    onClose?: () => void
}

export default function AboutPanel({ isHidden, onClose }: AboutPanelProps) {
    return (
        <div
            className={`w-full h-full absolute top-0 bg-[var(--panel-bg)] leading-[1.5rem] text-base ${isHidden ? 'right-[-100%] xl:right-[-400px]' : 'right-0'} xl:left-auto xl:w-[400px]`}
        >
            <h2 className="font-medium text-[1.5rem] pl-6 pr-15 h-[60px] leading-[60px]">
                What is this all about?
                {onClose && (
                    <CloseButton
                        clickHandler={onClose}
                        className="absolute top-[5px] right-[5px]"
                    />
                )}
            </h2>
            <div className="underline-animation overflow-auto h-[calc(100%-60px)] px-6 pb-8">
                <p>
                    What you see happening on this page started out as a doodle,
                    initially inspired by abstract works by artists such as{' '}
                    <a
                        href="https://diebenkorn.org/collections/6673/objects/"
                        target="_blank"
                    >
                        Richard Diebenkorn
                    </a>
                    . The doodle evolved over time into a kind of grid, dancing
                    in my mind between the abstract and the concrete.
                </p>
                <p>
                    I became curious if I could write an algorithm to generate
                    variants on the design. Something perhaps similar to{' '}
                    <a
                        href="https://mathworld.wolfram.com/Rule110.html"
                        target="_blank"
                    >
                        cellular automata
                    </a>
                    , but turned on its head. Instead of writing an algorithm to
                    see what it would produce, I started with an idea of what I
                    wanted the end product to look like, and crafted my
                    algorithm to produce something akin to that. That idea
                    evolved in to what you see creating and destroying itself
                    here. With some relatively simple rules for generating the
                    design, and then deconstructing it, the system will
                    endlessly explore these ideas of abstraction.{' '}
                    <a
                        href="https://github.com/jefffohl/website/blob/main/frontend/animations/script.ts"
                        target="_blank"
                    >
                        You can see the code here.
                    </a>
                </p>
                <p>
                    What I find fascinating here is how our minds will look at
                    this random arrangement of rectangles and inevitably attempt
                    to identify it, to classify it. Is it a landscape? An aerial
                    view of farmland? A slice of metamorphic schist? What I find
                    interesting is that what our minds do here seems to be
                    similar to the behavior of neural nets. Does this mean that
                    these algorithms are getting closer to the way our own minds
                    process information and perceive the world? I don&apos;t
                    really know. But it is an interesting question.
                </p>
            </div>
        </div>
    )
}
