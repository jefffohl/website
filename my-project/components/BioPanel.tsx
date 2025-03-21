'use client'

interface BioPanelProps {
    isHidden: boolean
    onClose: () => void
}

export default function BioPanel({ isHidden, onClose }: BioPanelProps) {
    return (
        <div className={`sub-panel ${isHidden ? 'outta-sight' : ''}`} id="bio">
            <h2>
                About Jeff <span className="close" onClick={onClose}></span>
            </h2>
            <div className="panel-content">
                <p>
                    Hi. I&apos;m Jeff. I am interested in how humans use
                    computers, and the interfaces between them.
                </p>
                <p>
                    I have been working in this area for about 30 years, prior
                    to the general availability of the World Wide Web. Since
                    those early days, I have worked as an interface designer,
                    graphic artist, illustrator, web developer, software
                    engineer, and user experience designer.
                </p>
                <p>
                    Much of this work has revolved around the Web, though this
                    is not by any means my sole interest. For the last several
                    years I have been working in the machine learning / AI
                    space.
                </p>
                <p>
                    One question I have been asking since I become involved with
                    AI is, &ldquo;What is the user interface for AI?&rdquo;.
                    With the advent of Large Language Models, this question has
                    become even more critical.
                </p>
                <p>
                    In a world of Generative AI, how will humans interact with
                    systems that become more and more inscrutable? How do we
                    design systems that produce good outcomes when the
                    underlying system is largely non-deterministic? These are
                    the questions on my mind lately.
                </p>
            </div>
        </div>
    )
}
