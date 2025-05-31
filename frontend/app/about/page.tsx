import { Metadata } from 'next'
import Milestone from '@/components/timeline/Milestone'
import Position from '@/components/timeline/Position'

export const metadata: Metadata = {
    title: 'About',
    description:
        'About Jeff Fohl - Product designer, software developer, and UX designer with 30+ years of experience in AI and machine learning.',
}

export default function AboutMe() {
    return (
        <div className="underline-animation flex-1 lg:p-[1rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem] max-w-[100ch] break-after-page">
            <div className="border-b border-[#222] pb-8">
                <p>
                    Hi. I&apos;m Jeff. I am interested in how humans use
                    computers, and the interfaces between them.
                </p>
                <p>
                    I am a product designer, software developer, user experience
                    designer, and visual designer with more than 30 years of
                    experience as a practitioner and leader in these fields. For
                    the last decade, I have been working in the machine learning
                    / AI space.
                </p>
                <p>
                    One question I have been asking since I become involved with
                    AI is, &ldquo;What is the appropriate user experience for
                    AI?&rdquo;. With the advent of Generative AI, and Large
                    Language Models, this question has become even more
                    critical.
                </p>
                <p>
                    In a world of Generative AI, how will humans interact with
                    systems that become more and more inscrutable? How do we
                    design systems that produce good outcomes when the
                    underlying system is largely non-deterministic? These are
                    the questions on my mind lately.
                </p>
                <p></p>
            </div>
            <div className="border-t border-[#555] pt-10">
                <div className="flex justify-between items-start lg:flex-row flex-col">
                    <h2 className="text-2xl font-normal uppercase text-neutral-500 tracking-widest inline">
                        Curriculum Vitae
                    </h2>
                    <a
                        className="relative h-auto leading-[1.5em]"
                        href="/jeff-fohl-cv.pdf"
                    >
                        Download as a PDF ↓
                    </a>
                </div>
            </div>

            <p className="uppercase tracking-[2px] mb-8 text-[1.1rem]">
                Timeline
            </p>
            <div className="grid">
                <Position
                    isFirst
                    title="Principal"
                    company="Infinite Tape"
                    description={
                        <>
                            Infinite Tape builds AI-powered tools for
                            professionals and creatives, in a variety of
                            industries from <span className="italic">law</span>{' '}
                            to <span className="italic">music</span>.
                        </>
                    }
                />
                <Milestone year="2024" />
                <Position
                    title="Manager, User Experience Engineering and Design"
                    company="H2O.ai"
                    description={
                        <>
                            H2O.ai is a leading AI cloud company, on a mission
                            to democratize AI. At H2O.ai, I filled multiple
                            roles as a <span className="italic">manager</span>,{' '}
                            <span className="italic">lead UI Engineer</span>,{' '}
                            <span className="italic">UX Designer</span>, and{' '}
                            <span className="italic">UI Designer</span>.
                        </>
                    }
                    highlights={{
                        title: 'Highlights',
                        items: [
                            <>
                                Managed teams developing multiple products
                                ranging from{' '}
                                <span className="italic">H2O AI Cloud</span>,{' '}
                                <span className="italic">
                                    AI Engine Manager
                                </span>
                                , <span className="italic">App Store</span>,{' '}
                                <span className="italic">Document AI</span>,{' '}
                                <span className="italic">Feature Store</span>,{' '}
                                H2O.ai marketing website, and others.
                            </>,
                            'Managed teams spanning many time zones, skill sets, and projects to establish principles of engineering and design excellence.',
                            'Led development of component libraries for internal development to reduce redundancy, and speed UI development across projects.',
                            'Led development of internal design system to create coherent, usable interface designs across multiple products.',
                            'Mentored UI Engineers and Designers to develop a collaborative approach to designing and developing software products.',
                            'Worked with Product and Engineering teams to develop pathways for ideating and defining product visions, defined by clearly designed artifacts that can be easily understood by all stakeholders, from Sales, to Product, to Design, to Engineering.',
                            'Increased collaboration and communication across all product stakeholder teams.',
                            <>
                                Contributed code and design to many projects and
                                products including{' '}
                                <span className="italic">H2O AI Cloud</span>,{' '}
                                <span className="italic">
                                    AI Engine Manager
                                </span>
                                , <span className="italic">App Store</span>,{' '}
                                <span className="italic">Feature Store</span>,{' '}
                                <span className="italic">Document AI</span>,{' '}
                                <span className="italic">h2oGPT</span>,{' '}
                                <span className="italic">
                                    Enterprise h2oGPTe
                                </span>
                                , and <span className="italic">UI Kit</span>.
                            </>,
                        ],
                    }}
                />
                <Milestone year="2022" />
                <Position
                    title="UI Engineer / UX Designer"
                    company="H2O.ai"
                    highlights={{
                        items: [
                            <>
                                Led a team of UI Engineers developing and
                                refining the user interface of the{' '}
                                <span className="italic">H2O AI Cloud</span>{' '}
                                platform.
                            </>,
                            <>
                                Developed multiple AI-powered auditing
                                applications for PwC. Lead UI Engineer and
                                Designer for{' '}
                                <span className="italic">Journals.ai</span>,{' '}
                                <span className="italic">GL.ai</span>,{' '}
                                <span className="italic">Fit.ai</span>,{' '}
                                <span className="italic">Controller.ai</span>,{' '}
                                <span className="italic">Cash.ai</span>, and{' '}
                                <span className="italic">Audit.ai</span>.
                            </>,
                            'Designed and built interactive data visualizations for PwC products.',
                            'Designed and built interactive labeling applications for labeling large data sets for supervised learning models.',
                        ],
                    }}
                />
                <Milestone year="2016" />
                <Position
                    title="Principal"
                    company="fohldesign"
                    description="Contract design and software development."
                    highlights={{
                        title: 'Highlights',
                        items: [
                            'Primary focus was Web application design and development.',
                            <>
                                Designed and built front end of{' '}
                                <a
                                    className="italic"
                                    href="https://www.accesscorp.com/information-management/virgo/"
                                >
                                    Virgo
                                </a>{' '}
                                retention and privacy compliance software for
                                Information Governance Solutions.
                            </>,
                            <>
                                Jurist for Numenta's{' '}
                                <a href="https://htmchallenge.devpost.com/">
                                    2015 HTM Challenge
                                </a>
                                .
                            </>,
                        ],
                    }}
                />
                <Milestone year="2013" />
                <Position
                    title="Creative Director"
                    company="GTxcel"
                    description={
                        <>
                            GTxcel offers a suite of products and services to
                            help magazine publishers diversify their revenue
                            streams.{' '}
                            <span className="italic">As Creative Director</span>
                            , I was involved in both developing the core product
                            offerings, and the professional services tied to the
                            products.
                        </>
                    }
                    highlights={{
                        title: 'Highlights',
                        items: [
                            'First employee. Helped to build the company from the ground up to a head count of over 100.',
                            <>
                                Technical, creative, and team lead of{' '}
                                <span className="italic">Rivista</span> product.{' '}
                                <span className="italic">Rivista</span> allowed
                                magazine publishers to create a single website
                                that will work beautifully on any device, from a
                                mobile phone to a desktop computer, through the
                                use of responsive design techniques.
                            </>,
                            'Oversaw the design of over 50 custom websites, as well as standardized themes used in the implementation of over 200 magazine websites, managed by our own content management system product.',
                        ],
                    }}
                />
                <Milestone year="2005" />
                <Position
                    isLast
                    title="Principal"
                    company="fohldesign"
                    description="Contract design and illustration."
                    highlights={{
                        items: [
                            'Clients included Rainfinity, Envive, Taos Mountain, Mondo Media, Meyer Cookware, Intuit, Verio, Sun Microsystems, Seagram, Meyer Cookware, Envive, PlasmaSeal, and Hanuman Medical, Fast Company Magazine, Red Herring Magazine, PC Magazine, Chicago Tribune, Washington Post, Games Business Magazine.',
                            <>
                                President of{' '}
                                <a href="https://graphicartistsguild.org/">
                                    Graphic Artists Guild
                                </a>{' '}
                                Northern California Chapter.
                            </>,
                            <>
                                Board President at{' '}
                                <a href="https://theintersection.org/">
                                    Intersection for the Arts
                                </a>
                                .
                            </>,
                        ],
                    }}
                />
            </div>
            <div className="mt-8">
                <h2 className="uppercase tracking-[2px] mb-8 text-[1.1rem]">
                    Education
                </h2>
                <ul className="list-none p-0 m-0 ml-8 mb-8">
                    <li className="list-none p-0 m-0 mb-4">
                        <div className="text-[#b0deff] font-semibold">
                            Rhode Island School of Design
                        </div>
                        <div className="text-[#5ca9e0]">BFA Illustration</div>
                    </li>
                    <li className="list-none p-0 m-0 mb-4">
                        <div className="text-[#b0deff] font-semibold">
                            Sea Education Association
                        </div>
                        <div className="text-[#5ca9e0]">
                            Oceanography coursework
                        </div>
                    </li>
                    <li className="list-none p-0 m-0 mb-4">
                        <div className="text-[#b0deff] font-semibold">
                            Connecticut College
                        </div>
                        <div className="text-[#5ca9e0]">Physics coursework</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
