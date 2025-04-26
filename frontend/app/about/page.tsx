'use client'

import { usePageTitle } from '@/hooks/usePageTitle'

export default function AboutMe() {
    usePageTitle({ title: 'About' })

    return (
        <div className="underline-animation flex-1 p-8 md:p-12 max-w-[100ch] break-after-page">
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
                <div className="flex justify-between items-start">
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
                <div className="relative ml-[30px] pt-0 pb-[30px] pl-[30px] border-l border-[#666] border-b before:content-[''] before:block before:absolute before:w-[10px] before:h-[10px] before:rotate-[-45deg] before:border-t before:border-[#666] before:border-r before:border-[#666] before:top-[1px] before:left-[-6px]">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            Principal
                        </span>{' '}
                        at <span className="company">Infinite Tape</span>
                    </h2>
                    <p className="position-description">
                        Infinite Tape builds AI-powered tools for professionals
                        and creatives, in a variety of industries from law to
                        music.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                        2024
                    </div>
                </div>
                <div className="ml-[30px] py-[30px] pl-[30px] border-l border-[#666] border-b">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            Manager, User Experience Engineering and Design
                        </span>{' '}
                        at <span className="company">H2O.ai</span>
                    </h2>
                    <p className="position-description">
                        H2O.ai is a leading AI cloud company, on a mission to
                        democratize AI. At H2O.ai, I filled multiple roles as a
                        manager, lead UI Engineer, UX Designer, and UI Designer.
                    </p>
                    <h3 className="font-normal text-[1.1rem] uppercase tracking-[1px] my-[0.83rem]">
                        Highlights
                    </h3>
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        <li className="mb-2">
                            Managed teams developing multiple products ranging
                            from <span className="italic">H2O AI Cloud</span>,{' '}
                            <span className="italic">AI Engine Manager</span>,{' '}
                            <span className="italic">App Store</span>,{' '}
                            <span className="italic">Document AI</span>,{' '}
                            <span className="italic">Feature Store</span>,{' '}
                            H2O.ai marketing website, and others.
                        </li>
                        <li className="mb-2">
                            Managed teams spanning many time zones, skill sets,
                            and projects to establish principles of engineering
                            and design excellence.
                        </li>
                        <li className="mb-2">
                            Led development of component libraries for internal
                            development to reduce redundancy, and speed UI
                            development across projects.
                        </li>
                        <li className="mb-2">
                            Led development of internal design system to create
                            coherent, usable interface designs across multiple
                            products.
                        </li>
                        <li className="mb-2">
                            Mentored UI Engineers and Designers to develop a
                            collaborative approach to designing and developing
                            software products.
                        </li>
                        <li className="mb-2">
                            Worked with Product and Engineering teams to develop
                            pathways for ideating and defining product visions,
                            defined by clearly designed artifacts that can be
                            easily understood by all stakeholders, from Sales,
                            to Product, to Design, to Engineering.
                        </li>
                        <li className="mb-2">
                            Increased collaboration and communication across all
                            product stakeholder teams.
                        </li>
                        <li className="mb-2">
                            Contributed code and design to many projects and
                            products including{' '}
                            <span className="italic">H2O AI Cloud</span>,{' '}
                            <span className="italic">AI Engine Manager</span>,{' '}
                            <span className="italic">App Store</span>,{' '}
                            <span className="italic">Feature Store</span>,{' '}
                            <span className="italic">Document AI</span>,{' '}
                            <span className="italic">h2oGPT</span>,{' '}
                            <span className="italic">Enterprise h2oGPTe</span>,
                            and <span className="italic">UI Kit.</span>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                        2022
                    </div>
                </div>
                <div className="ml-[30px] py-[30px] pl-[30px] border-l border-[#666] border-b">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            UI Engineer / UX Designer
                        </span>{' '}
                        at <span className="company">H2O.ai</span>
                    </h2>
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        <li className="mb-2">
                            Led a team of UI Engineers developing and refining
                            the user interface of the{' '}
                            <span className="italic">H2O AI Cloud</span>{' '}
                            platform.
                        </li>
                        <li className="mb-2">
                            Developed multiple AI-powered auditing applications
                            for PwC. Lead UI Engineer and Designer for{' '}
                            <span className="italic">Journals.ai</span>,{' '}
                            <span className="italic">GL.ai</span>,{' '}
                            <span className="italic">Fit.ai</span>,{' '}
                            <span className="italic">Controller.ai</span>,{' '}
                            <span className="italic">Cash.ai</span>, and{' '}
                            <span className="italic">Audit.ai</span>.
                        </li>
                        <li className="mb-2">
                            Designed and built interactive data visualizations
                            for PwC products.
                        </li>
                        <li className="mb-2">
                            Designed and built interactive labeling applications
                            for labeling large data sets for supervised learning
                            models.
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                        2016
                    </div>
                </div>
                <div className="ml-[30px] py-[30px] pl-[30px] border-l border-[#666] border-b">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            Principal
                        </span>{' '}
                        at <span className="company">fohldesign</span>
                    </h2>
                    <p className="position-description">
                        Contract design and software development.
                    </p>
                    <h3 className="font-normal text-[1.1rem] uppercase tracking-[1px] my-[0.83rem]">
                        Highlights
                    </h3>
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        <li className="mb-2">
                            Primary focus was Web application design and
                            development.
                        </li>
                        <li className="mb-2">
                            Designed and built front end of{' '}
                            <a
                                className="italic"
                                href="https://www.accesscorp.com/information-management/virgo/"
                            >
                                Virgo
                            </a>{' '}
                            retention and privacy compliance software for
                            Information Governance Solutions.
                        </li>
                        <li className="mb-2">
                            Jurist for Numenta's{' '}
                            <a href="https://htmchallenge.devpost.com/">
                                2015 HTM Challenge.
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                        2013
                    </div>
                </div>
                <div className="ml-[30px] py-[30px] pl-[30px] border-l border-[#666] border-b">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            Creative Director
                        </span>{' '}
                        at <span className="company">GTxcel</span>
                    </h2>
                    <p className="position-description">
                        GTxcel offers a suite of products and services to help
                        magazine publishers diversify their revenue streams.
                    </p>
                    <p>
                        As Creative Director, I was involved in both developing
                        the core product offerings, and the professional
                        services tied to the products.
                    </p>
                    <h3 className="font-normal text-[1.1rem] uppercase tracking-[1px] my-[0.83rem]">
                        Highlights
                    </h3>
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        <li className="mb-2">
                            First employee. Helped to build the company from the
                            ground up to a head count of over 100.
                        </li>
                        <li className="mb-2">
                            Technical, creative, and team lead of{' '}
                            <span className="italic">Rivista</span> product.{' '}
                            <span className="italic">Rivista</span> allowed
                            magazine publishers to create a single website that
                            will work beautifully on any device, from a mobile
                            phone to a desktop computer, through the use of
                            responsive design techniques.
                        </li>
                        <li className="mb-2">
                            Oversaw the design of over 50 custom websites, as
                            well as standardized themes used in the
                            implementation of over 200 magazine websites,
                            managed by our own content management system
                            product.
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-[-30px] rounded-[60px] h-[60px] w-[60px] bg-[#666] text-[var(--background)] border-[5px] border-[var(--background)] text-center leading-[48px]">
                        2005
                    </div>
                </div>
                <div className="ml-[30px] py-[30px] pl-[30px] border-l border-[#666]">
                    <h2 className="text-[1.5rem] font-normal text-[#999]">
                        <span className="font-semibold text-white">
                            Principal
                        </span>{' '}
                        at <span className="company">fohldesign</span>
                    </h2>
                    <p className="position-description">
                        Contract design and illustration.
                    </p>
                    <ul className="my-[0.83rem] pl-[2ch] list-disc">
                        <li className="mb-2">
                            Clients included Rainfinity, Envive, Taos Mountain,
                            Mondo Media, Meyer Cookware, Intuit, Verio, Sun
                            Microsystems, Seagram, Meyer Cookware, Envive,
                            PlasmaSeal, and Hanuman Medical, Fast Company
                            Magazine, Red Herring Magazine, PC Magazine, Chicago
                            Tribune, Washington Post, Games Business Magazine.
                        </li>
                        <li className="mb-2">
                            President of{' '}
                            <a href="https://graphicartistsguild.org/">
                                Graphic Artists Guild
                            </a>{' '}
                            Northern California Chapter.
                        </li>
                        <li className="mb-2">
                            Board President at{' '}
                            <a href="https://theintersection.org/">
                                Intersection for the Arts
                            </a>
                            .
                        </li>
                    </ul>
                </div>
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
