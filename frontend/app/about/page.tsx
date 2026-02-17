import { Metadata } from 'next'
import Milestone from '@/components/timeline/Milestone'
import Position from '@/components/timeline/Position'
import ContentPageWrapper from '@/components/ContentPageWrapper'

export const metadata: Metadata = {
    title: 'About',
    description:
        'About Jeff Fohl - Software designer for AI and machine learning, with over 30 years of experience.',
}

export default function AboutMe() {
    return (
        <ContentPageWrapper className="max-w-[80ch] break-after-page">
            <div className="underline-animation">
                <div className="border-b border-[var(--rule-top)] pb-8">
                    <p>
                        I am a product designer who designs and ships AI-powered
                        systems by working deeply across design and engineering.
                        I have over 30 years of experience and over 10 years of
                        experience in the AI space. My focus is on
                        conversational and agentic experiences built on large
                        language models, where system behavior, interaction
                        design, and technical constraints are inseparable. I am
                        mapping the way forward as we shift into a new paradigm
                        of human-computer interaction from the graphic user
                        interface to conversational and language-based
                        interactions.
                    </p>
                </div>
                <div className="border-t border-[var(--rule-bottom)] pt-10">
                    <div className="flex justify-between items-start xl:flex-row flex-col">
                        <h2 className="text-2xl font-normal uppercase text-[var(--site-section-title-color)] tracking-widest inline">
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
                        title="Founder"
                        company="Lawful Good"
                        description={
                            <>
                                <a href="https://lawfulgood.us">Lawful Good</a>{' '}
                                is a secure AI assistant for attorneys to
                                collaborate with AI on legal research and
                                document drafting.
                            </>
                        }
                        highlights={{
                            title: 'Highlights',
                            items: [
                                'Designed, developed, and launched the Lawful Good application, handling the entire stack from backend to frontend through production deployment.',
                                'Designed the agentic system for Lawful Good using LangChain and LangGraph.',
                                'Architected full-stack application on GCP (Cloud Run, Cloud SQL, Vertex AI) with Python backend, TypeScript/React frontend, PostgreSQL state management, and ChromaDB vector database for semantic search.',
                                'Designed and implemented intuitive document understanding and editing interfaces allowing attorneys to work naturally with AI through conversation and collaborative document refinement.',
                                'Prioritized security and trust as core product values—all data encrypted in transit and at rest, with clear commitments around attorney-client privilege and model training policies.',
                                'Developed a cohort of attorneys to test and validate the application in a pilot program.',
                                'Designed and developed all marketing materials.',
                            ],
                        }}
                    />
                    <Milestone year="2025" />
                    <Position
                        title="Principal"
                        company="Infinite Tape"
                        description={
                            <>
                                Infinite Tape is a software design and
                                development studio that builds AI-powered
                                applications on a contract basis.
                            </>
                        }
                    />
                    <Milestone year="2024" />
                    <Position
                        title="Manager, User Experience Engineering and Design"
                        company="H2O.ai"
                        description={
                            <>
                                H2O.ai is a leading AI cloud company, on a
                                mission to democratize AI. At H2O.ai, I filled
                                multiple roles as a manager, lead UI Engineer,
                                UX Designer, and UI Designer.
                            </>
                        }
                        highlights={{
                            title: 'Highlights',
                            items: [
                                <>
                                    Managed teams developing multiple products
                                    ranging from{' '}
                                    <span className="italic">H2O AI Cloud</span>
                                    ,{' '}
                                    <span className="italic">
                                        AI Engine Manager
                                    </span>
                                    , <span className="italic">App Store</span>,{' '}
                                    <span className="italic">Document AI</span>,{' '}
                                    <span className="italic">
                                        Feature Store
                                    </span>
                                    , H2O.ai marketing website, and others.
                                </>,
                                'Managed teams spanning many time zones, skill sets, and projects to establish principles of engineering and design excellence.',
                                'Led development of component libraries for internal development to reduce redundancy, and speed UI development across projects.',
                                'Led development of internal design system to create coherent, usable interface designs across multiple products.',
                                'Mentored UI Engineers and Designers to develop a collaborative approach to designing and developing software products.',
                                'Worked with Product and Engineering teams to develop pathways for ideating and defining product visions, defined by clearly designed artifacts that can be easily understood by all stakeholders, from Sales, to Product, to Design, to Engineering.',
                                'Increased collaboration and communication across all product stakeholder teams.',
                                <>
                                    Contributed code and design to many projects
                                    and products including{' '}
                                    <span className="italic">H2O AI Cloud</span>
                                    ,{' '}
                                    <span className="italic">
                                        AI Engine Manager
                                    </span>
                                    , <span className="italic">App Store</span>,{' '}
                                    <span className="italic">
                                        Feature Store
                                    </span>
                                    ,{' '}
                                    <span className="italic">Document AI</span>,{' '}
                                    <span className="italic">h2oGPT</span>,{' '}
                                    <span className="italic">
                                        Enterprise h2oGPTe
                                    </span>
                                    , and <span className="italic">UI Kit</span>
                                    .
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
                                    <span className="italic">
                                        Controller.ai
                                    </span>
                                    , <span className="italic">Cash.ai</span>,
                                    and <span className="italic">Audit.ai</span>
                                    .
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
                                    retention and privacy compliance software
                                    for Information Governance Solutions.
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
                                GTxcel offers a suite of products and services
                                to help magazine publishers diversify their
                                revenue streams.{' '}
                                <span className="italic">
                                    As Creative Director
                                </span>
                                , I was involved in both developing the core
                                product offerings, and the professional services
                                tied to the products.
                            </>
                        }
                        highlights={{
                            title: 'Highlights',
                            items: [
                                'First employee. Helped to build the company from the ground up to a head count of over 100.',
                                <>
                                    Technical, creative, and team lead of{' '}
                                    <span className="italic">Rivista</span>{' '}
                                    product.{' '}
                                    <span className="italic">Rivista</span>{' '}
                                    allowed magazine publishers to create a
                                    single website that will work beautifully on
                                    any device, from a mobile phone to a desktop
                                    computer, through the use of responsive
                                    design techniques.
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
                        Skills
                    </h2>
                    <ul className="list-disc p-0 m-0 ml-8 mb-8">
                        <li>Building products around Large Language Models</li>
                        <li>
                            LangChain and LangGraph for building agentic AI
                            applications
                        </li>
                        <li>Typescript, Javascript, Python</li>
                        <li>
                            Web Standards, and the entire Web application stack
                        </li>
                        <li>
                            Web frontend frameworks such as React, Angular, and
                            NextJS
                        </li>
                        <li>
                            Unit testing, integration testing, and end-to-end
                            testing frameworks such React Testing Framework,
                            Jest, Jasmine, Karma, Playwright, Cypress and
                            Storybook
                        </li>
                        <li>
                            Application and API development frameworks such as
                            FastAPI and Spring Boot and Protobuf for data and
                            API definitions
                        </li>
                        <li>PostgreSQL, MySQL, ChromaDB</li>
                        <li>Data visualization</li>
                        <li>Google Cloud Platform</li>
                        <li>Docker and containerization</li>
                        <li>User interface design</li>
                        <li>User experience design</li>
                        <li>Illustration, graphic design</li>
                        <li>Adobe Creative Cloud, Figma, and Sketch</li>
                        <li>Leadership and management</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h2 className="uppercase tracking-[2px] mb-8 text-[1.1rem]">
                        Education
                    </h2>
                    <ul className="list-none p-0 m-0 ml-8 mb-8">
                        <li className="list-none p-0 m-0 mb-4">
                            <div className="text-[var(--cv-college-color)] font-semibold">
                                Rhode Island School of Design
                            </div>
                            <div className="text-[var(--cv-college-degree-color)]">
                                BFA Illustration
                            </div>
                        </li>
                        <li className="list-none p-0 m-0 mb-4">
                            <div className="text-[var(--cv-college-color)] font-semibold">
                                Sea Education Association
                            </div>
                            <div className="text-[var(--cv-college-degree-color)]">
                                Oceanography coursework
                            </div>
                        </li>
                        <li className="list-none p-0 m-0 mb-4">
                            <div className="text-[var(--cv-college-color)] font-semibold">
                                Connecticut College
                            </div>
                            <div className="text-[var(--cv-college-degree-color)]">
                                Physics coursework
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </ContentPageWrapper>
    )
}
