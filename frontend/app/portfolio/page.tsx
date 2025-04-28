'use client'

import PortfolioSection, {
    PortfolioAssetType,
} from './_components/PortfolioSection'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Portfolio() {
    usePageTitle({ title: 'Portfolio' })

    return (
        <div className="w-full lg:p-[2rem_3rem_3rem_3rem] p-[5rem_1rem_3rem_1rem] underline-animation">
            <h1 className="text-2xl font-[400] uppercase text-neutral-500 tracking-widest">
                Portfolio
            </h1>
            <p className="w-full lg:w-[50%]">
                Recent work, in reverse chronology. Much of this work was
                produced by teams of people, in which I played a role. These
                roles include: engineer, designer, UX designer, leader, manager,
                or any combination of these. I will attempt to clarify my role
                in each case.
            </p>
            <div className="border-b border-[#222] pb-4"></div>
            <PortfolioSection
                title="Lawful Good"
                description={
                    <>
                        <p>
                            In 2025, I was the founder and principal designer at{' '}
                            <a href="https://infinitetape.net">Infinite Tape</a>
                            , a startup that builds AI-powered tools for
                            professionals and creatives.
                        </p>
                        <p>
                            One of the projects I developed was called{' '}
                            <a href="https://lawfulgood.us">Lawful Good</a>.
                            This project is ongoing as of this writing. Lawful
                            Good is an AI Agent designed to help independent
                            lawyers manage documents more effectively using a{' '}
                            <a href="https://en.wikipedia.org/wiki/Retrieval-Augmented_Generation">
                                RAG-based approach
                            </a>
                            .
                        </p>
                    </>
                }
                company="Infinite Tape"
                companyUrl="https://infinitetape.net"
                date="2025"
                roles={['Engineer', 'Designer']}
                stack={[
                    'React',
                    'TypeScript',
                    'Python',
                    'FastAPI',
                    'LangChain',
                    'OpenAI',
                    'Gemini',
                    'PostgreSQL',
                    'ChromaDB',
                    'Google Cloud Platform',
                ]}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/lawful-good/lawful-good-empty-state.png',
                        thumbnail: {
                            src: '/portfolio/lawful-good/lawful-good-empty-state_thumb.png',
                            alt: 'Lawful Good Empty State',
                            width: 149,
                            height: 85,
                        },
                        alt: 'Lawful Good Empty State',
                        width: 2109,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/lawful-good/lawful-good-document-view.png',
                        thumbnail: {
                            src: '/portfolio/lawful-good/lawful-good-document-view_thumb.png',
                            alt: 'Lawful Good Workflow',
                            width: 145,
                            height: 85,
                        },
                        alt: 'Lawful Good Workflow',
                        width: 2109,
                        height: 1200,
                    },
                ]}
            />

            <PortfolioSection
                title="H2O Actions"
                description={
                    <>
                        <p>
                            H2O Actions was the brainchild of{' '}
                            <a href="https://www.linkedin.com/in/jiripuc">
                                Jiri Puc
                            </a>
                            , an AI Engineer at H2O.ai. The idea behind this
                            project was to create an AI Agent that could be used
                            to automate tasks in the H2O AI Cloud, using a
                            natural language interface. Users would be able to
                            create experiments, perform data exploration, launch
                            AI Engines for Driverless AI, and more, all by
                            interacting with the AI Agent.
                        </p>
                    </>
                }
                company="H2O.ai"
                companyUrl="https://h2o.ai"
                date="2024"
                roles={['Designer']}
                stack={[
                    'React',
                    'TypeScript',
                    'Python',
                    'LangChain',
                    'h2oGPT',
                    'OpenAI',
                    'Kubernetes',
                ]}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-actions/actions-empty-state.png',
                        thumbnail: {
                            src: '/portfolio/h2o-actions/actions-empty-state_thumb.png',
                            alt: 'H2O Actions Empty State Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Actions Empty State',
                        width: 2135,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-actions/actions-action-selection.png',
                        thumbnail: {
                            src: '/portfolio/h2o-actions/actions-action-selection_thumb.png',
                            alt: 'H2O Actions Action Selection Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Actions Action Selection',
                        width: 2135,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-actions/actions-navigation.png',
                        thumbnail: {
                            src: '/portfolio/h2o-actions/actions-navigation_thumb.png',
                            alt: 'H2O Actions Navigation Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Actions Navigation',
                        width: 2135,
                        height: 1200,
                    },
                ]}
            />

            <PortfolioSection
                title="AI Governance"
                description={
                    <>
                        <p>
                            AI Governance is an important part of managing the
                            deployment of AI models in the enterprise.
                            Understanding model risk and health is critical for
                            business leaders to understand their risk exposure.
                        </p>
                        <p>
                            The AI Governance project at H2O.ai was designed to
                            help Risk Management Officers understand at the
                            highest level what models they have deployed, and to
                            quantify the risks associated with these models.
                        </p>
                    </>
                }
                company="H2O.ai"
                companyUrl="https://h2o.ai"
                date="2024"
                roles={['Designer', 'Engineer']}
                stack={['React', 'TypeScript', 'Java', 'PostgreSQL']}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/ai-governance/ai-gov-models.png',
                        thumbnail: {
                            src: '/portfolio/ai-governance/ai-gov-models_thumb.png',
                            alt: 'AI Governance Models Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'AI Governance Models',
                        width: 2134,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/ai-governance/model-health.png',
                        thumbnail: {
                            src: '/portfolio/ai-governance/model-health_thumb.png',
                            alt: 'AI Governance Model Health Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'AI Governance Model Health',
                        width: 2134,
                        height: 1200,
                    },
                ]}
            />

            <PortfolioSection
                title="Document AI Dashboard"
                description={
                    <>
                        <p>
                            H2O.ai&apos;s{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/document-ai/">
                                Document AI
                            </a>{' '}
                            is designed to help data scientists create data
                            extraction pipelines from large quantities of
                            documents, using combinations of models ranging from
                            OCR, layout models, and LLMs.
                        </p>
                    </>
                }
                company="H2O.ai"
                companyUrl="https://h2o.ai"
                date="2023"
                roles={['Designer', 'Engineer']}
                stack={['React', 'TypeScript', 'Java', 'PostgreSQL']}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/document-ai-dashboard/dashboard.png',
                        thumbnail: {
                            src: '/portfolio/document-ai-dashboard/dashboard_thumb.png',
                            alt: 'H2O Document AI Dashboard Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Document AI Dashboard',
                        width: 2134,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/document-ai-dashboard/pipelines.png',
                        thumbnail: {
                            src: '/portfolio/document-ai-dashboard/pipelines_thumb.png',
                            alt: 'H2O Document AI Pipelines Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Document AI Pipelines',
                        width: 2134,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/document-ai-dashboard/pipelines-expanded.png',
                        thumbnail: {
                            src: '/portfolio/document-ai-dashboard/pipelines-expanded_thumb.png',
                            alt: 'H2O Document AI Pipelines Expanded Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: 'H2O Document AI Pipelines Expanded',
                        width: 2134,
                        height: 1200,
                    },
                ]}
            />

            <PortfolioSection
                title="H2O AI Cloud"
                description={
                    <>
                        <p>
                            In 2019, H2O.ai embarked on an ambitious project to
                            build a cloud-based platform for AI. Named simply{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/">
                                H2O AI Cloud
                            </a>
                            , the project was intended to bring together the
                            best of H2O&apos;s AI products into a single,
                            unified platform. Key components included H2O&apos;s
                            flagship products,{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/h2o-driverless-ai/">
                                Driverless AI
                            </a>{' '}
                            and{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/h2o/">
                                H2O-3
                            </a>
                            , and a suite of cloud-based products, such as{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/hydrogen-torch/">
                                Hydrogen Torch
                            </a>
                            ,{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/operate/h2o-mlops/">
                                MLOps
                            </a>
                            ,{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/feature-store/">
                                Feature Store
                            </a>
                            , and{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/document-ai/">
                                Document AI
                            </a>
                            . The idea was to allow H2O&apos;s customers to
                            build apps using these tools and H2O&apos;s low-code
                            app framework,{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/make/h2o-wave/">
                                Wave
                            </a>
                            , and deploy them on their own{' '}
                            <a href="https://h2o.ai/platform/ai-cloud/key-features-datasheet/#innovate">
                                App Store
                            </a>{' '}
                            instance.
                        </p>
                        <p>
                            I joined the project in 2020 after it had begun
                            development. I was initially tasked with leading the
                            UI engineering effort. Eventually, I also became
                            involved with leading the UX team.
                        </p>
                    </>
                }
                company="H2O.ai"
                companyUrl="https://h2o.ai"
                date="2020-2024"
                roles={['Lead Engineer', 'UX Manager']}
                stack={[
                    'React',
                    'TypeScript',
                    'Kubernetes',
                    'Go',
                    'Protocol Buffers',
                    'Python',
                    'Java',
                    'PostgreSQL',
                ]}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/app-store.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/app-store_thumb.png',
                            alt: 'H2O Cloud App Store',
                            width: 136,
                            height: 85,
                        },
                        alt: 'H2O Cloud App Store Thumbnail',
                        width: 1933,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/app-store-detail.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/app-store-detail_thumb.png',
                            alt: 'App Store Detail Thumbnail',
                            width: 136,
                            height: 85,
                        },
                        alt: 'App Store Detail',
                        width: 1933,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/ai-engines.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/ai-engines_thumb.png',
                            alt: 'AI Engine Manager Thumbnail',
                            width: 136,
                            height: 85,
                        },
                        alt: 'AI Engine Manager',
                        width: 1933,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/ai-engines-selection.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/ai-engines-selection_thumb.png',
                            alt: 'AI Engine Manager Selection Thumbnail',
                            width: 136,
                            height: 85,
                        },
                        alt: 'AI Engine Manager',
                        width: 1933,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/ai-engines-conf.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/ai-engines-config_thumb.png',
                            alt: 'AI Engine Manager Configuration Thumbnail',
                            width: 136,
                            height: 85,
                        },
                        alt: 'AI Engine Manager Configuration',
                        width: 1933,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/h2o-ai-cloud/logging-services.png',
                        thumbnail: {
                            src: '/portfolio/h2o-ai-cloud/logging-services_thumb.png',
                            alt: 'AI Engine Manager Logging Services Thumbnail',
                            width: 136,
                            height: 85,
                        },
                        alt: 'AI Engine Manager Logging Services',
                        width: 1933,
                        height: 1200,
                    },
                ]}
            />
            <div className="p-[4rem_0] border-t border-b border-t-[#555] border-b-[#222]">
                <h3 className="text-[2rem] font-[400]">PwC</h3>
                <p>
                    In 2016, <a href="https://pwc.com">PwC</a>{' '}
                    (PricewaterhouseCoopers) engaged with H2O.ai to build
                    AI-powered auditing applications. Initially, my role was to
                    design and build these applications in collaboration with
                    H2O.ai&apos;s data science team. Since the PwC group we were
                    working with was based in London, the leadership team there
                    eventually chose to work with a design team based in London.
                    Thereafter, my role was primarily as Lead UI Engineer, but I
                    occasionally gave UX feedback to the London-based design
                    team.
                </p>
                <p>
                    Between 2016 and 2021, I worked on a number of projects
                    including Journals.ai, GL.ai, Fit.ai, Controller.ai,
                    Cash.ai, and Audit.ai. PwC is quite private with their
                    internal projects, so much of this work I am not able to
                    share publicly. What I am able to share, I have included
                    below.
                </p>
            </div>

            <PortfolioSection
                title="Cash.ai"
                description={
                    <>
                        <p>
                            PwC&apos;s Cash.ai application is used internally by
                            PwC audit teams to accelerate the audit process. It
                            uses machine learning, machine vision, and other AI
                            processes to quickly and accurately scan documents,
                            extract their data, and correlate this data with the
                            audited journals.
                        </p>
                        <p>
                            Cash.ai is one module of a larger suite of
                            applications called Audit.ai. Each module focuses on
                            one aspect of the audit process. Other modules
                            include Accounts Payable, Accounts Receivable, and
                            Property, Plant, & Equipment (PP&E).
                        </p>
                    </>
                }
                company="PwC"
                companyUrl="https://pwc.com"
                date="2017"
                roles={['Engineer', 'UX Guidance']}
                stack={[
                    'Angular',
                    'TypeScript',
                    'Java',
                    'Spring Boot',
                    'PostgreSQL',
                ]}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/pwc/cash-ai.png',
                        thumbnail: {
                            src: '/portfolio/pwc/cash-ai_thumb.png',
                            alt: 'Cash.ai Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: "PwC's Cash.ai",
                        width: 2132,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/pwc/cash-ai-document.png',
                        thumbnail: {
                            src: '/portfolio/pwc/cash-ai-document_thumb.png',
                            alt: 'Cash.ai Document Thumbnail',
                            width: 151,
                            height: 85,
                        },
                        alt: "PwC's Cash.ai",
                        width: 2128,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Video,
                        src: 'https://www.youtube.com/embed/SsCUtOnVJ8c?si=6fXoaofu52JGpWUU',
                        thumbnail: {
                            src: '/portfolio/pwc/cash-ai-video_thumbnail.png',
                            alt: 'Cash.ai Video Thumbnail',
                            width: 122,
                            height: 85,
                        },
                        alt: "PwC's Cash.ai",
                        width: '100%',
                        height: '100%',
                    },
                ]}
            />
            <PortfolioSection
                title="GL.ai"
                description={
                    <>
                        <p>
                            PwC&apos;s GL.ai application is an AI tool which
                            uses anomaly detection to analyze ledgers using
                            machine learning. Using machine learning allows the
                            audit team to analyize the entire general legger, as
                            opposed to a statistical sample. This provides a
                            great deal more efficacy and accuracy than
                            tradtional methods would allow.
                        </p>
                        <p>
                            While the AI handles the analysis, the centerpiece
                            of the user experience are data visualizations which
                            display the results of the models. These
                            visualizations make it easy for auditors to spot
                            inconsistencies and unexpected patterns.
                        </p>
                    </>
                }
                company="PwC"
                companyUrl="https://pwc.com"
                date="2019"
                roles={['Engineer', 'Data Visualization', 'UX Guidance']}
                stack={[
                    'Angular',
                    'TypeScript',
                    'D3.js',
                    'Java',
                    'Spring Boot',
                    'PostgreSQL',
                ]}
                assets={[
                    {
                        type: PortfolioAssetType.Image,
                        src: '/portfolio/pwc/gl-ai.png',
                        thumbnail: {
                            src: '/portfolio/pwc/gl-ai_thumb.png',
                            alt: 'GL.ai Thumbnail',
                            width: 140,
                            height: 85,
                        },
                        alt: "PwC's Cash.ai",
                        width: 1978,
                        height: 1200,
                    },
                    {
                        type: PortfolioAssetType.Video,
                        src: 'https://www.youtube.com/embed/UoYxMqdvcVA?si=weHQFLDv1WFtO5sn',
                        thumbnail: {
                            src: '/portfolio/pwc/gl-ai-video_thumb.png',
                            alt: 'GL.ai Video Thumbnail',
                            width: 114,
                            height: 85,
                        },
                        alt: "PwC's GL.ai",
                        width: '100%',
                        height: '100%',
                    },
                ]}
            />
        </div>
    )
}
