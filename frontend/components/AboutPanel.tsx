'use client'

interface AboutPanelProps {
    isHidden: boolean
    onClose?: () => void
}

export default function AboutPanel({ isHidden, onClose }: AboutPanelProps) {
    return (
        <div
            className={`w-full h-full absolute top-0 text-[#f5f5f5] p-[60px_30px_30px_30px] bg-[#222] leading-[1.5rem] text-base ${isHidden ? 'right-[-100%] xl:right-[-400px]' : 'right-0 md:right-0'} xl:left-auto xl:bg-[#222] xl:w-[400px] xl:h-full xl:absolute xl:overflow-visible md:bg-[#222] md:w-full md:h-screen md:absolute md:overflow-hidden`}
        >
            <h2 className="absolute w-full top-0 left-0 pl-8 font-medium text-[1.5rem] my-[0.83em] md:bg-[#222] md:m-0 md:top-0 md:left-0 md:h-[60px] md:p-0 md:px-8 md:leading-[60px]">
                What is this all about?
                {onClose && (
                    <span
                        className="block absolute h-[60px] w-[60px] top-0 right-[5px] cursor-pointer before:content-[''] before:block before:w-[2px] before:h-[25px] before:absolute before:top-[20px] before:left-[30px] before:bg-[#ccc] before:hover:bg-white before:rotate-45 after:content-[''] after:block after:w-[2px] after:h-[25px] after:absolute after:top-[20px] after:left-[30px] after:bg-[#ccc] after:hover:bg-white after:rotate-[-45deg]"
                        onClick={onClose}
                    ></span>
                )}
            </h2>
            <div className="underline-animation absolute top-[60px] left-0 overflow-auto h-[calc(100%-60px)] w-full p-[0_30px_30px_30px] md:pb-[120px]">
                <p className="font-light">
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
                <p className="font-light">
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
                        href="https://github.com/jefffohl/website"
                        target="_blank"
                    >
                        You can see the code here.
                    </a>
                </p>
                <p className="font-light">
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
