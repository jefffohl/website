'use client'

import Link from 'next/link'

export default function CVContent() {
    return (
        <div id="layout" className="cv-layout">
            <div className="menu panel">
                <h1>
                    <Link href="/">Jeff Fohl</Link> <span>CV</span>
                </h1>
                <nav>
                    <h2>Education</h2>
                    <ul>
                        <li>
                            <div className="school">
                                Rhode Island School of Design
                            </div>
                            <div className="study">BFA Illustration</div>
                        </li>
                        <li>
                            <div className="school">
                                Sea Education Association
                            </div>
                            <div className="study">Oceanography coursework</div>
                        </li>
                        <li>
                            <div className="school">Connecticut College</div>
                            <div className="study">Physics coursework</div>
                        </li>
                    </ul>
                    <h2>Contact</h2>
                    <ul>
                        <li>
                            Web
                            <a href="https://www.fohl.com">www.fohl.com</a>
                        </li>
                        <li>
                            Email
                            <a href="mailto:jeff@fohl.com">jeff@fohl.com</a>
                        </li>
                        <li>
                            Phone
                            <a href="tel:+14156256388">415-625-6388</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="content panel">
                <h2>Experience</h2>
                <div className="job">
                    <div className="job-title">
                        Staff Software Engineer, Applied AI
                    </div>
                    <div className="company">Anthropic</div>
                    <div className="timespan">2023 - Present</div>
                    <div className="job-details">
                        <div className="job-description">
                            Building better interfaces for AI and machine
                            intelligence.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">Staff UI Engineer</div>
                    <div className="company">Applied Intuition</div>
                    <div className="timespan">2022 - 2023</div>
                    <div className="job-details">
                        <div className="job-description">
                            Designing and building interfaces for autonomous
                            vehicles simulation and testing software.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">Senior UX Engineer</div>
                    <div className="company">Google</div>
                    <div className="timespan">2021 - 2022</div>
                    <div className="job-details">
                        <div className="job-description">
                            Building interfaces for Google Cloud AI and machine
                            learning tools.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">Principal Software Engineer</div>
                    <div className="company">Endlesss Ltd.</div>
                    <div className="timespan">2019 - 2021</div>
                    <div className="job-details">
                        <div className="job-description">
                            Designing and building interfaces for a
                            collaborative music creation platform.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">Senior UI Engineer</div>
                    <div className="company">Netflix</div>
                    <div className="timespan">2017 - 2019</div>
                    <div className="job-details">
                        <div className="job-description">
                            Building applications for Netflix content production
                            and studio operations.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">UI Architect</div>
                    <div className="company">Apple</div>
                    <div className="timespan">2010 - 2017</div>
                    <div className="job-details">
                        <div className="job-description">
                            Building interfaces for several Apple internal tools
                            and applications.
                        </div>
                    </div>
                </div>

                <div className="job">
                    <div className="job-title">UX Designer/Developer</div>
                    <div className="company">Freelance</div>
                    <div className="timespan">2000 - 2010</div>
                    <div className="job-details">
                        <div className="job-description">
                            Designing and developing websites and applications
                            for various clients.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
