'use client'

import './cv.css'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AboutMe() {
    usePageTitle({ title: 'About' })

    return (
        <div className="cv-body">
            <div className="intro border-b border-b-[#222] pb-8">
                <p>
                    Hi. I&apos;m Jeff. I am interested in how humans use
                    computers, and the interfaces between them.
                </p>
                <p>
                    I am a product designer, software developer, user experience
                    designer, and visual designer with more than 30 years of
                    experience as a practioner and leader in these fields. For
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
            <div className="border-t border-t-[#555] pt-10">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-[400] uppercase text-neutral-500 tracking-widest inline">
                        Curriculum Vitae
                    </h2>
                    <a className="download" href="/jeff-fohl-cv.pdf">
                        Download as a PDF ↓
                    </a>
                </div>
            </div>

            <p className="timeline-header">Timeline</p>
            <div className="timeline-grid">
                <div className="first timeline-section">
                    <h2>
                        <span className="position">Principal</span> at{' '}
                        <span className="company">Infinite Tape</span>
                    </h2>
                    <p className="position-description">
                        Infinite Tape builds AI-powered tools for professionals
                        and creatives, in a variety of industries from law to
                        music.
                    </p>
                </div>
                <div className="section-divider">
                    <div className="year">2024</div>
                </div>
                <div className=" timeline-section">
                    <h2>
                        <span className="position">
                            Manager, User Experience Engineering and Design
                        </span>{' '}
                        at <span className="company">H2O.ai</span>
                    </h2>
                    <p className="position-description">
                        H2O.ai is a leading AI cloud company, on a mission to
                        democratize AI. At H2O.ai, I filled multiple roles as a
                        manager, lead UI Engineer, UX Designer, and UI Designer.
                    </p>
                    <h3>Highlights</h3>
                    <ul className="highlights">
                        <li>
                            Managed teams developing multiple products ranging
                            from <span className="product">H2O AI Cloud</span>,{' '}
                            <span className="product">AI Engine Manager</span>,{' '}
                            <span className="product">App Store</span>,{' '}
                            <span className="product">Document AI</span>,{' '}
                            <span className="product">Feature Store</span>,{' '}
                            H2O.ai marketing website, and others.
                        </li>
                        <li>
                            Managed teams spanning many time zones, skill sets,
                            and projects to establish principles of engineering
                            and design excellence.
                        </li>
                        <li>
                            Led development of component libraries for internal
                            development to reduce redundancy, and speed UI
                            development across projects.
                        </li>
                        <li>
                            Led development of internal design system to create
                            coherent, usable interface designs across multiple
                            products.
                        </li>
                        <li>
                            Mentored UI Engineers and Designers to develop a
                            collaborative approach to designing and developing
                            software products.
                        </li>
                        <li>
                            Worked with Product and Engineering teams to develop
                            pathways for ideating and defining product visions,
                            defined by clearly designed artifacts that can be
                            easily understood by all stakeholders, from Sales,
                            to Product, to Design, to Engineering.
                        </li>
                        <li>
                            Increased collaboration and communication across all
                            product stakeholder teams.
                        </li>
                        <li>
                            Contributed code and design to many projects and
                            products including{' '}
                            <span className="product">H2O AI Cloud</span>,{' '}
                            <span className="product">AI Engine Manager</span>,{' '}
                            <span className="product">App Store</span>,{' '}
                            <span className="product">Feature Store</span>,{' '}
                            <span className="product">Document AI</span>,{' '}
                            <span className="product">h2oGPT</span>,{' '}
                            <span className="product">Enterprise h2oGPTe</span>,
                            and <span className="product">UI Kit.</span>
                        </li>
                    </ul>
                </div>
                <div className="section-divider">
                    <div className="year">2022</div>
                </div>
                <div className="timeline-section">
                    <h2>
                        <span className="position">
                            UI Engineer / UX Designer
                        </span>{' '}
                        at <span className="company">H2O.ai</span>
                    </h2>
                    <ul className="highlights">
                        <li>
                            Led a team of UI Engineers developing and refining
                            the user interface of the{' '}
                            <span className="product">H2O AI Cloud</span>{' '}
                            platform.
                        </li>
                        <li>
                            Developed multiple AI-powered auditing applications
                            for PwC. Lead UI Engineer and Designer for{' '}
                            <span className="product">Journals.ai</span>,{' '}
                            <span className="product">GL.ai</span>,{' '}
                            <span className="product">Fit.ai</span>,{' '}
                            <span className="product">Controller.ai</span>,{' '}
                            <span className="product">Cash.ai</span>, and{' '}
                            <span className="product">Audit.ai</span>.
                        </li>
                        <li>
                            Designed and built interactive data visualizations
                            for PwC products.
                        </li>
                        <li>
                            Designed and built interactive labeling applications
                            for labeling large data sets for supervised learning
                            models.
                        </li>
                    </ul>
                </div>
                <div className="section-divider">
                    <div className="year">2016</div>
                </div>
                <div className="timeline-section">
                    <h2>
                        <span className="position">Principal</span> at{' '}
                        <span className="company">fohldesign</span>
                    </h2>
                    <p className="position-description">
                        Contract design and software development.
                    </p>
                    <h3>Highlights</h3>
                    <ul className="highlights">
                        <li>
                            Primary focus was Web application design and
                            development.
                        </li>
                        <li>
                            Designed and built front end of{' '}
                            <a
                                className="product"
                                href="https://www.accesscorp.com/information-management/virgo/"
                            >
                                Virgo
                            </a>{' '}
                            retention and privacy compliance software for
                            Information Governance Solutions.
                        </li>
                        <li>
                            Jurist for Numenta's{' '}
                            <a href="https://htmchallenge.devpost.com/">
                                2015 HTM Challenge.
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="section-divider">
                    <div className="year">2013</div>
                </div>
                <div className="timeline-section">
                    <h2>
                        <span className="position">Creative Director</span> at{' '}
                        <span className="company">GTxcel</span>
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
                    <h3>Highlights</h3>
                    <ul className="highlights">
                        <li>
                            First employee. Helped to build the company from the
                            ground up to a head count of over 100.
                        </li>
                        <li>
                            Technical, creative, and team lead of{' '}
                            <span className="product">Rivista</span> product.{' '}
                            <span className="product">Rivista</span> allowed
                            magazine publishers to create a single website that
                            will work beautifully on any device, from a mobile
                            phone to a desktop computer, through the use of
                            responsive design techniques.
                        </li>
                        <li>
                            Oversaw the design of over 50 custom websites, as
                            well as standardized themes used in the
                            implementation of over 200 magazine websites,
                            managed by our own content management system
                            product.
                        </li>
                        <li>
                            Key contributor on the development team for
                            <span className="product">Rivista</span>.
                        </li>
                        <li>
                            Earned PHP 5 Zend Certified Engineer certification.
                        </li>
                        <li>
                            Drafted technical specifications, product road maps,
                            and quality assurance regimes for
                            <span className="product">Rivista</span>.
                        </li>
                        <li>
                            Supervised and implemented online advertising
                            creative campaigns.
                        </li>
                        <li>
                            Designed and developed all company branding,
                            website, and printed promotional materials.
                        </li>
                        <li>
                            Participated in business development, investor
                            relations, marketing, and sales.
                        </li>
                    </ul>
                </div>
                <div className="section-divider">
                    <div className="year">2005</div>
                </div>
                <div className="last timeline-section">
                    <h2>
                        <span className="position">Principal</span> at{' '}
                        <span className="company">fohldesign</span>
                    </h2>
                    <p className="position-description">
                        Contract design and illustration.
                    </p>
                    <ul className="highlights">
                        <li>
                            Clients included Rainfinity, Envive, Taos Mountain,
                            Mondo Media, Meyer Cookware, Intuit, Verio, Sun
                            Microsystems, Seagram, Meyer Cookware, Envive,
                            PlasmaSeal, and Hanuman Medical, Fast Company
                            Magazine, Red Herring Magazine, PC Magazine, Chicago
                            Tribune, Washington Post, Games Business Magazine.
                        </li>
                        <li>
                            President of{' '}
                            <a href="https://graphicartistsguild.org/">
                                Graphic Artists Guild
                            </a>{' '}
                            Northern California Chapter.
                        </li>
                        <li>
                            Board President at{' '}
                            <a href="https://theintersection.org/">
                                Intersection for the Arts
                            </a>
                            .
                        </li>
                    </ul>
                </div>
                <div className="firefox timeline-section"></div>
            </div>
            <div className="education">
                <h2>Education</h2>
                <ul>
                    <li>
                        <div className="school">
                            Rhode Island School of Design
                        </div>
                        <div className="study">BFA Illustration</div>
                    </li>
                    <li>
                        <div className="school">Sea Education Association</div>
                        <div className="study">Oceanography coursework</div>
                    </li>
                    <li>
                        <div className="school">Connecticut College</div>
                        <div className="study">Physics coursework</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
