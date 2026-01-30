import { EditorElement } from "@/store/useEditorStore";

export interface Template {
    id: string;
    name: string;
    elements: Partial<EditorElement>[];
}

export const TEMPLATES: Template[] = [
    {
        id: 'modern-split-fullpage',
        name: 'Modern Sidebar Full Page',
        elements: [
            // Sidebar (ліва частина)
            { type: 'shape', x: 0, y: 0, width: 280, height: 1123, styles: { backgroundColor: '#2d3748' } },

            // Sidebar Content
            { type: 'text', x: 30, y: 60, width: 220, height: 40, content: 'CONTACT', styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' } },
            { type: 'text', x: 30, y: 110, width: 220, height: 140, content: '📧 hello@resumecraft.com\n📞 +1 555 0123\n🌍 www.resumecraft.com\n📍 Kyiv, Ukraine', styles: { fontSize: '12px', color: '#CBD5E0', lineHeight: '2' } },

            { type: 'text', x: 30, y: 270, width: 220, height: 40, content: 'EXPERTISE', styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' } },
            { type: 'text', x: 30, y: 320, width: 220, height: 200, content: '• User Interface Design\n• Mobile App Development\n• Backend Engineering\n• Product Strategy\n• User Research\n• UX Audits\n• Interaction Design', styles: { fontSize: '12px', color: '#CBD5E0', lineHeight: '1.8' } },

            { type: 'text', x: 30, y: 540, width: 220, height: 40, content: 'LANGUAGES', styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' } },
            { type: 'text', x: 30, y: 590, width: 220, height: 80, content: '🇺🇦 Ukrainian (Native)\n🇬🇧 English (Fluent)\n🇩🇪 German (Basic)\n🇫🇷 French (Intermediate)', styles: { fontSize: '12px', color: '#CBD5E0', lineHeight: '1.8' } },

            { type: 'text', x: 30, y: 700, width: 220, height: 40, content: 'TOOLS', styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' } },
            { type: 'text', x: 30, y: 740, width: 220, height: 160, content: '• Figma\n• Sketch\n• Adobe XD\n• Illustrator\n• Photoshop\n• After Effects\n• Zeplin\n• Miro', styles: { fontSize: '12px', color: '#CBD5E0', lineHeight: '1.8' } },

            // Main Content (права частина)
            { type: 'text', x: 320, y: 60, width: 444, height: 80, content: 'ALEX\nJOHNSON', styles: { fontSize: '48px', fontWeight: '900', color: '#1a202c', lineHeight: '1' } },
            { type: 'text', x: 320, y: 150, width: 444, height: 30, content: 'PRODUCT DESIGNER', styles: { fontSize: '18px', color: '#4a5568', letterSpacing: '3px' } },

            { type: 'shape', x: 320, y: 200, width: 100, height: 4, styles: { backgroundColor: '#2d3748' } },

            { type: 'text', x: 320, y: 240, width: 444, height: 30, content: 'WORK EXPERIENCE', styles: { fontSize: '20px', fontWeight: 'bold', color: '#2d3748' } },

            // Job 1
            { type: 'text', x: 320, y: 290, width: 300, height: 22, content: 'Senior Product Designer at Apple', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 290, width: 144, height: 22, content: '2019 - Present', styles: { fontSize: '11px', textAlign: 'right', color: '#718096' } },
            { type: 'text', x: 320, y: 315, width: 444, height: 140, content: 'Leading the design of next-generation features for iOS. Worked closely with engineering to ensure seamless implementation of high-fidelity prototypes. Owned end-to-end design of SaaS products, created scalable design systems, and improved user engagement across multiple platforms.', styles: { fontSize: '12px', color: '#4a5568', lineHeight: '1.7' } },

            // Job 2
            { type: 'text', x: 320, y: 470, width: 300, height: 22, content: 'UX Designer at Google', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 470, width: 144, height: 22, content: '2016 - 2019', styles: { fontSize: '11px', textAlign: 'right', color: '#718096' } },
            { type: 'text', x: 320, y: 495, width: 444, height: 140, content: 'Designed user-centric solutions for Google Cloud Platform. Conducted extensive user research, usability testing, and A/B testing to improve accessibility and overall product performance. Developed prototypes and collaborated with cross-functional teams to refine UX flows.', styles: { fontSize: '12px', color: '#4a5568', lineHeight: '1.7' } },

            // Job 3
            { type: 'text', x: 320, y: 650, width: 300, height: 22, content: 'Interaction Designer at Airbnb', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 650, width: 144, height: 22, content: '2014 - 2016', styles: { fontSize: '11px', textAlign: 'right', color: '#718096' } },
            { type: 'text', x: 320, y: 675, width: 444, height: 140, content: 'Worked on interaction patterns for Airbnb web and mobile apps. Designed and prototyped innovative solutions, conducted user testing sessions, and optimized UI for responsiveness and accessibility.', styles: { fontSize: '12px', color: '#4a5568', lineHeight: '1.7' } },

            // Additional decorative shapes for balance
            { type: 'shape', x: 320, y: 830, width: 60, height: 6, styles: { backgroundColor: '#2d3748' } },
            { type: 'shape', x: 380, y: 840, width: 100, height: 6, styles: { backgroundColor: '#4a5568' } },
            { type: 'shape', x: 500, y: 850, width: 120, height: 6, styles: { backgroundColor: '#718096' } }
        ]
    },
    {
        id: 'dense-corporate',
        name: 'Dense Corporate',
        elements: [
            // Header
            { type: 'shape', x: 0, y: 0, width: 794, height: 190, styles: { backgroundColor: '#f1f5f9' } },

            { type: 'text', x: 40, y: 55, width: 530, height: 80, content: 'MICHAEL\nANDERSON', styles: { fontSize: '44px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { type: 'text', x: 40, y: 135, width: 500, height: 30, content: 'SENIOR SOFTWARE ENGINEER', styles: { fontSize: '16px', letterSpacing: '3px', color: '#475569' } },

            { type: 'text', x: 560, y: 60, width: 200, height: 110, content: '📧 michael.anderson@email.com\n📞 +1 202 555 0187\n🌍 www.anderson.dev\n📍 Berlin, Germany', styles: { fontSize: '12px', color: '#1e293b', lineHeight: '1.8', textAlign: 'right' } },

            // Professional Summary
            { type: 'text', x: 40, y: 230, width: 700, height: 30, content: 'PROFESSIONAL SUMMARY', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 40, y: 260, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },
            { type: 'text', x: 40, y: 280, width: 700, height: 120, content: 'Senior Software Engineer with over 8 years of experience designing, developing and maintaining scalable web applications. Strong background in full-stack development, cloud infrastructure and real-time systems. Proven ability to lead technical initiatives, collaborate with cross-functional teams and deliver high-quality solutions in fast-paced environments.', styles: { fontSize: '13px', color: '#334155', lineHeight: '1.7' } },

            // Experience
            { type: 'text', x: 40, y: 420, width: 700, height: 30, content: 'PROFESSIONAL EXPERIENCE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 40, y: 450, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },

            { type: 'text', x: 40, y: 475, width: 480, height: 22, content: 'Senior Software Engineer — TechNova Solutions', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 520, y: 475, width: 220, height: 22, content: '2019 — Present', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 40, y: 500, width: 700, height: 150, content: 'Led the development of enterprise-level web applications serving more than 500,000 users worldwide. Architected REST and WebSocket-based services to support real-time data synchronization. Optimized application performance, reducing load times by 35%. Mentored junior engineers and contributed to internal engineering standards and best practices.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            { type: 'text', x: 40, y: 670, width: 480, height: 22, content: 'Software Engineer — DigitalCore GmbH', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 520, y: 670, width: 220, height: 22, content: '2015 — 2019', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 40, y: 695, width: 700, height: 150, content: 'Developed and maintained full-stack features using JavaScript, TypeScript and modern frontend frameworks. Collaborated closely with product managers and designers to translate business requirements into technical solutions. Improved system reliability through automated testing and CI/CD pipelines.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Skills
            { type: 'text', x: 40, y: 870, width: 700, height: 30, content: 'TECHNICAL SKILLS', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 40, y: 900, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },
            { type: 'text', x: 40, y: 920, width: 700, height: 120, content: 'Programming Languages: JavaScript, TypeScript, Python\nFrontend: React, Next.js, HTML5, CSS3\nBackend: Node.js, Django, REST APIs, WebSockets\nDatabases: PostgreSQL, Redis\nDevOps & Cloud: Docker, CI/CD, AWS\nTools: Git, Linux, Jira', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.8' } },

            // Footer filler
            { type: 'shape', x: 0, y: 1080, width: 794, height: 43, styles: { backgroundColor: '#ffffff' } }
        ]
    },
    {
        id: 'structured-two-column-fullpage',
        name: 'Structured Two Column Full Page',
        elements: [
            // Left Column
            { type: 'shape', x: 0, y: 0, width: 260, height: 1123, styles: { backgroundColor: '#f8fafc' } },

            { type: 'text', x: 25, y: 50, width: 210, height: 70, content: 'EMILY\nROBERTS', styles: { fontSize: '28px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { type: 'text', x: 25, y: 120, width: 210, height: 40, content: 'DATA ANALYST', styles: { fontSize: '13px', letterSpacing: '2px', color: '#475569' } },

            // Contact
            { type: 'text', x: 25, y: 180, width: 210, height: 30, content: 'CONTACT', styles: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'text', x: 25, y: 210, width: 210, height: 120, content: '📧 emily.roberts@email.com\n📞 +44 7700 900321\n🌍 portfolio.example\n📍 London, UK', styles: { fontSize: '11px', color: '#334155', lineHeight: '1.8' } },

            // Skills
            { type: 'text', x: 25, y: 350, width: 210, height: 30, content: 'SKILLS', styles: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'text', x: 25, y: 380, width: 210, height: 300, content: 'Data Analysis\nSQL & PostgreSQL\nPython (Pandas, NumPy)\nData Visualization\nPower BI / Tableau\nStatistics\nA/B Testing\nBusiness Intelligence\nETL Processes\nReporting Automation\nMachine Learning Basics\nR Programming', styles: { fontSize: '11px', color: '#334155', lineHeight: '1.8' } },

            // Languages
            { type: 'text', x: 25, y: 690, width: 210, height: 80, content: 'LANGUAGES\nEnglish — Native\nGerman — Fluent\nFrench — Intermediate\nSpanish — Basic', styles: { fontSize: '11px', color: '#334155', lineHeight: '1.8' } },

            // Right Column Content
            { type: 'text', x: 300, y: 50, width: 460, height: 30, content: 'PROFESSIONAL SUMMARY', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 300, y: 80, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },
            { type: 'text', x: 300, y: 100, width: 460, height: 140, content: 'Data Analyst with 6+ years of experience transforming complex datasets into actionable business insights. Strong expertise in SQL, Python and data visualization tools. Proven track record of supporting strategic decisions through accurate analysis, predictive modeling, and clear reporting. Adept at cross-team collaboration and process optimization.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Experience
            { type: 'text', x: 300, y: 250, width: 460, height: 30, content: 'WORK EXPERIENCE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 300, y: 280, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },

            { type: 'text', x: 300, y: 305, width: 320, height: 22, content: 'Senior Data Analyst — FinTech Corp', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 305, width: 140, height: 22, content: '2020 — Present', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 300, y: 330, width: 460, height: 160, content: 'Analyzed large transactional datasets to identify trends and anomalies. Built automated dashboards reducing manual reporting time by 40%. Partnered with product and finance teams to improve forecasting accuracy and customer segmentation. Mentored junior analysts and streamlined reporting processes.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            { type: 'text', x: 300, y: 500, width: 320, height: 22, content: 'Data Analyst — Insight Solutions', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 500, width: 140, height: 22, content: '2017 — 2020', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 300, y: 525, width: 460, height: 160, content: 'Supported business units with ad-hoc analysis and performance tracking. Developed SQL queries and Python scripts to clean and process raw data. Delivered actionable insights and visual reports to non-technical stakeholders. Improved KPIs tracking and data accuracy.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            { type: 'text', x: 300, y: 700, width: 320, height: 22, content: 'Junior Data Analyst — TechNova', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 620, y: 700, width: 140, height: 22, content: '2015 — 2017', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 300, y: 725, width: 460, height: 120, content: 'Performed data cleaning, reporting, and basic analytics tasks. Assisted in dashboard creation and collaborated with senior analysts on business insights.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Education
            { type: 'text', x: 300, y: 870, width: 460, height: 30, content: 'EDUCATION', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 300, y: 900, width: 70, height: 3, styles: { backgroundColor: '#0f172a' } },
            { type: 'text', x: 300, y: 920, width: 460, height: 100, content: 'BSc in Data Science — University of Manchester (2013 — 2017)\nCertification: Tableau Desktop Specialist (2019)\nCertification: Python for Data Science (2020)', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Footer filler / Decorative
            { type: 'shape', x: 300, y: 1050, width: 460, height: 3, styles: { backgroundColor: '#0f172a' } },
            { type: 'shape', x: 300, y: 1065, width: 300, height: 3, styles: { backgroundColor: '#64748b' } }
        ]
    },
    {
        id: 'creative-designer-accent',
        name: 'Creative Accent Designer',
        elements: [
            // Top decorative block
            { type: 'shape', x: 0, y: 0, width: 794, height: 260, styles: { backgroundColor: '#0f172a' } },

            // Accent circles
            { type: 'shape', x: 560, y: 120, width: 180, height: 180, styles: { backgroundColor: '#38bdf8', borderRadius: '50%', opacity: 0.9 } },

            // Name
            { type: 'text', x: 60, y: 90, width: 520, height: 80, content: 'ALEXANDER\nMORGAN', styles: { fontSize: '46px', fontWeight: '900', color: '#ffffff', lineHeight: '1.05' } },
            { type: 'text', x: 60, y: 205, width: 520, height: 30, content: 'CREATIVE DIRECTOR', styles: { fontSize: '16px', letterSpacing: '4px', color: '#bae6fd' } },

            // Floating card
            { type: 'shape', x: 40, y: 280, width: 714, height: 220, styles: { backgroundColor: '#ffffff', borderRadius: '18px', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' } },

            // Summary
            { type: 'text', x: 70, y: 310, width: 650, height: 30, content: 'PROFILE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 70, y: 340, width: 80, height: 4, styles: { backgroundColor: '#38bdf8' } },
            { type: 'text', x: 70, y: 360, width: 650, height: 120, content: 'Creative Director with over 10 years of experience leading design teams and building strong visual identities for global brands. Expert in digital product design, branding systems and creative strategy. Passionate about turning complex ideas into elegant visual solutions.', styles: { fontSize: '13px', color: '#334155', lineHeight: '1.7' } },

            // Left column
            { type: 'shape', x: 0, y: 520, width: 260, height: 603, styles: { backgroundColor: '#f8fafc' } },

            // Contact
            { type: 'text', x: 40, y: 550, width: 180, height: 30, content: 'CONTACT', styles: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'text', x: 40, y: 580, width: 180, height: 120, content: '📧 contact@creative.com\n📞 +1 555 0145\n🌍 portfolio.site\n📍 New York, USA', styles: { fontSize: '11px', color: '#475569', lineHeight: '1.8' } },

            // Skills pills
            { type: 'text', x: 40, y: 720, width: 180, height: 30, content: 'CORE SKILLS', styles: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' } },

            { type: 'shape', x: 40, y: 755, width: 80, height: 26, styles: { backgroundColor: '#38bdf8', borderRadius: '13px' } },
            { type: 'text', x: 55, y: 760, width: 60, height: 20, content: 'Branding', styles: { fontSize: '11px', color: '#0f172a' } },

            { type: 'shape', x: 40, y: 790, width: 110, height: 26, styles: { backgroundColor: '#e2e8f0', borderRadius: '13px' } },
            { type: 'text', x: 55, y: 795, width: 90, height: 20, content: 'UI / UX', styles: { fontSize: '11px', color: '#0f172a' } },

            { type: 'shape', x: 40, y: 825, width: 140, height: 26, styles: { backgroundColor: '#e2e8f0', borderRadius: '13px' } },
            { type: 'text', x: 55, y: 830, width: 120, height: 20, content: 'Design Systems', styles: { fontSize: '11px', color: '#0f172a' } },

            // Right content
            { type: 'text', x: 300, y: 550, width: 460, height: 30, content: 'EXPERIENCE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 300, y: 580, width: 80, height: 4, styles: { backgroundColor: '#38bdf8' } },

            { type: 'text', x: 300, y: 610, width: 300, height: 22, content: 'Creative Director — Studio Nova', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 600, y: 610, width: 160, height: 22, content: '2018 — Present', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 300, y: 635, width: 460, height: 140, content: 'Led multidisciplinary design teams delivering branding and digital experiences for international clients. Defined creative vision, design systems and visual language across web and mobile platforms. Improved client satisfaction scores by 30%.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Decorative line
            { type: 'shape', x: 300, y: 790, width: 460, height: 1, styles: { backgroundColor: '#e2e8f0' } },

            { type: 'text', x: 300, y: 820, width: 300, height: 22, content: 'Senior Designer — Bright Agency', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 600, y: 820, width: 160, height: 22, content: '2014 — 2018', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            { type: 'text', x: 300, y: 845, width: 460, height: 140, content: 'Designed high-impact marketing and product visuals for global campaigns. Collaborated with developers to ensure design feasibility and consistency across platforms.', styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' } },

            // Footer accent
            { type: 'shape', x: 0, y: 1080, width: 794, height: 43, styles: { backgroundColor: '#0f172a' } }
        ]
    },
    {
        id: 'editorial-geometry-fixed',
        name: 'Editorial Geometry Fixed',
        elements: [

            // Decorative vertical bar
            { type: 'shape', x: 40, y: 0, width: 80, height: 1123, styles: { backgroundColor: '#0f172a' } },

            // Geometry accents
            { type: 'shape', x: 520, y: -120, width: 320, height: 320, styles: { backgroundColor: '#38bdf8', borderRadius: '40px' } },
            { type: 'shape', x: 470, y: 40, width: 240, height: 240, styles: { backgroundColor: '#e2e8f0', borderRadius: '32px' } },

            // Name
            { type: 'text', x: 160, y: 80, width: 480, height: 90, content: 'NATALIE\nCARTER', styles: { fontSize: '48px', fontWeight: '900', color: '#0f172a', lineHeight: '1.05' } },
            { type: 'text', x: 160, y: 175, width: 480, height: 30, content: 'LEAD PRODUCT DESIGNER', styles: { fontSize: '16px', letterSpacing: '4px', color: '#475569' } },

            // Left info card
            { type: 'shape', x: 140, y: 260, width: 220, height: 260, styles: { backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 12px 30px rgba(15,23,42,0.12)' } },
            { type: 'text', x: 165, y: 290, width: 170, height: 30, content: 'CONTACT', styles: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 165, y: 315, width: 60, height: 3, styles: { backgroundColor: '#38bdf8' } },
            { type: 'text', x: 165, y: 335, width: 170, height: 160, content: '📧 hello@portfolio.com\n📞 +44 7000 112233\n🌍 nat.design\n📍 Amsterdam, NL', styles: { fontSize: '11px', color: '#334155', lineHeight: '1.8' } },

            // Profile card
            { type: 'shape', x: 380, y: 260, width: 380, height: 240, styles: { backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15,23,42,0.12)' } },
            { type: 'text', x: 410, y: 295, width: 320, height: 30, content: 'PROFILE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 410, y: 325, width: 90, height: 4, styles: { backgroundColor: '#38bdf8' } },
            { type: 'text', x: 410, y: 345, width: 320, height: 140, content: 'Lead Product Designer with 9+ years of experience crafting user-centered digital products. Specialized in scalable design systems, complex UX flows, and cross-functional collaboration.', styles: { fontSize: '13px', color: '#334155', lineHeight: '1.7' } },

            // Experience header
            { type: 'text', x: 160, y: 540, width: 600, height: 30, content: 'PROFESSIONAL EXPERIENCE', styles: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } },
            { type: 'shape', x: 160, y: 570, width: 90, height: 4, styles: { backgroundColor: '#38bdf8' } },

            // Timeline line
            { type: 'shape', x: 150, y: 610, width: 2, height: 460, styles: { backgroundColor: '#cbd5f5' } },

            // Job 1
            { type: 'shape', x: 144, y: 610, width: 14, height: 14, styles: { backgroundColor: '#38bdf8', borderRadius: '50%' } },
            { type: 'text', x: 170, y: 600, width: 350, height: 22, content: 'Lead Product Designer — Flow Labs', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 560, y: 600, width: 200, height: 22, content: '2019 — Present', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            {
                type: 'text',
                x: 170,
                y: 625,
                width: 590,
                height: 170,
                content:
                    'Owned end-to-end design for complex SaaS platforms serving enterprise clients across multiple industries. Led the full design lifecycle—from discovery and UX research to high-fidelity UI and developer handoff. Built scalable design systems that improved consistency and reduced development time. Collaborated closely with engineering and product teams to deliver accessible, data-driven solutions.',
                styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' }
            },

            // Job 2
            { type: 'shape', x: 144, y: 820, width: 14, height: 14, styles: { backgroundColor: '#38bdf8', borderRadius: '50%' } },
            { type: 'text', x: 170, y: 810, width: 350, height: 22, content: 'Senior Product Designer — Studio North', styles: { fontSize: '14px', fontWeight: 'bold' } },
            { type: 'text', x: 560, y: 810, width: 200, height: 22, content: '2015 — 2019', styles: { fontSize: '11px', textAlign: 'right', color: '#64748b' } },
            {
                type: 'text',
                x: 170,
                y: 835,
                width: 590,
                height: 150,
                content:
                    'Designed and shipped user-focused web and mobile products for startups and growing businesses. Created wireframes, prototypes, and high-fidelity interfaces while partnering closely with clients and developers. Played a key role in defining product strategy, improving usability, and establishing visual foundations for long-term growth.',
                styles: { fontSize: '12px', color: '#334155', lineHeight: '1.7' }
            },

            // Bottom accents
            { type: 'shape', x: 380, y: 1020, width: 260, height: 3, styles: { backgroundColor: '#38bdf8' } },
            { type: 'shape', x: 380, y: 1035, width: 160, height: 3, styles: { backgroundColor: '#e2e8f0' } }
        ]
    },
    {
        id: 'minimal-swiss-grid',
        name: 'Minimal Swiss Grid',
        elements: [
            // Right sidebar
            { type: 'shape', x: 560, y: 0, width: 234, height: 1123, styles: { backgroundColor: '#020617' } },

            // Name
            {
                type: 'text',
                x: 80,
                y: 100,
                width: 440,
                height: 90,
                content: 'ALEX\nMORGAN',
                styles: { fontSize: '52px', fontWeight: '800', color: '#020617', lineHeight: '1.05' }
            },

            // Title
            {
                type: 'text',
                x: 80,
                y: 200,
                width: 440,
                height: 30,
                content: 'SENIOR PRODUCT DESIGNER',
                styles: { fontSize: '14px', letterSpacing: '3px', color: '#475569' }
            },

            // Divider
            { type: 'shape', x: 80, y: 240, width: 60, height: 3, styles: { backgroundColor: '#020617' } },

            // Profile
            {
                type: 'text',
                x: 80,
                y: 280,
                width: 440,
                height: 150,
                content:
                    'Senior Product Designer with extensive experience building scalable digital products. Focused on clarity, usability, and systems thinking. Strong background in collaborating with engineering teams and translating business goals into intuitive user experiences.',
                styles: { fontSize: '13px', color: '#334155', lineHeight: '1.8' }
            },

            // Experience title
            {
                type: 'text',
                x: 80,
                y: 470,
                width: 300,
                height: 30,
                content: 'EXPERIENCE',
                styles: { fontSize: '18px', fontWeight: '700', color: '#020617' }
            },

            { type: 'shape', x: 80, y: 500, width: 40, height: 3, styles: { backgroundColor: '#020617' } },

            // Job 1
            {
                type: 'text',
                x: 80,
                y: 540,
                width: 380,
                height: 22,
                content: 'Senior Product Designer — Atlas Systems',
                styles: { fontSize: '14px', fontWeight: '600', color: '#020617' }
            },
            {
                type: 'text',
                x: 80,
                y: 565,
                width: 380,
                height: 20,
                content: '2020 — Present',
                styles: { fontSize: '11px', color: '#64748b' }
            },
            {
                type: 'text',
                x: 80,
                y: 595,
                width: 440,
                height: 140,
                content:
                    'Led design for large-scale SaaS products used by enterprise customers. Defined UX strategy, created design systems, and ensured consistency across multiple platforms. Worked closely with product managers and engineers to deliver high-quality, maintainable solutions.',
                styles: { fontSize: '12px', color: '#334155', lineHeight: '1.8' }
            },

            // Job 2
            {
                type: 'text',
                x: 80,
                y: 760,
                width: 380,
                height: 22,
                content: 'Product Designer — Mono Studio',
                styles: { fontSize: '14px', fontWeight: '600', color: '#020617' }
            },
            {
                type: 'text',
                x: 80,
                y: 785,
                width: 380,
                height: 20,
                content: '2016 — 2020',
                styles: { fontSize: '11px', color: '#64748b' }
            },
            {
                type: 'text',
                x: 80,
                y: 815,
                width: 440,
                height: 120,
                content:
                    'Designed interfaces for web and mobile applications with a strong focus on typography and layout. Collaborated with startups to shape early product vision and transform ideas into polished, user-ready designs.',
                styles: { fontSize: '12px', color: '#334155', lineHeight: '1.8' }
            },

            // Sidebar content
            {
                type: 'text',
                x: 590,
                y: 120,
                width: 180,
                height: 200,
                content:
                    'CONTACT\n\nhello@portfolio.com\n+44 7000 112233\nportfolio.design\nAmsterdam, NL',
                styles: { fontSize: '12px', color: '#e5e7eb', lineHeight: '1.9' }
            },

            {
                type: 'text',
                x: 590,
                y: 360,
                width: 180,
                height: 200,
                content:
                    'TOOLS\n\nFigma\nDesign Systems\nPrototyping\nUX Research\nAccessibility',
                styles: { fontSize: '12px', color: '#e5e7eb', lineHeight: '1.9' }
            }
        ]
    },
    {
        id: 'freeform-color-blocks-fullpage',
        name: 'Freeform Color Blocks Full Page',
        elements: [

            // Top accent blocks
            { type: 'shape', x: 60, y: 40, width: 220, height: 60, styles: { backgroundColor: '#f87171', borderRadius: '16px' } },
            { type: 'shape', x: 300, y: 40, width: 300, height: 60, styles: { backgroundColor: '#60a5fa', borderRadius: '16px' } },

            // Name block
            { type: 'text', x: 60, y: 120, width: 440, height: 120, content: 'LUCAS\nHARRIS', styles: { fontSize: '60px', fontWeight: '900', color: '#111827', lineHeight: '1.05' } },
            { type: 'text', x: 60, y: 250, width: 440, height: 40, content: 'VISUAL / PRODUCT DESIGNER', styles: { fontSize: '16px', letterSpacing: '3px', color: '#475569' } },

            // Diagonal decorative shapes across page
            { type: 'shape', x: 500, y: 80, width: 220, height: 220, styles: { backgroundColor: '#34d399', borderRadius: '24px' } },
            { type: 'shape', x: 420, y: 300, width: 180, height: 180, styles: { backgroundColor: '#facc15', borderRadius: '24px' } },
            { type: 'shape', x: 550, y: 550, width: 200, height: 200, styles: { backgroundColor: '#f472b6', borderRadius: '24px' } },

            // Profile/About block (full width content block)
            { type: 'shape', x: 60, y: 320, width: 680, height: 160, styles: { backgroundColor: '#f3f4f6', borderRadius: '16px' } },
            { type: 'text', x: 80, y: 340, width: 640, height: 120, content: 'Designer focused on bold, expressive visuals and user-centered digital products. Experienced in branding, UI/UX, illustration, and motion design. Passionate about creating memorable and functional user experiences across platforms.', styles: { fontSize: '14px', color: '#1f2937', lineHeight: '1.7' } },

            // Experience Header
            { type: 'text', x: 60, y: 500, width: 400, height: 30, content: 'EXPERIENCE', styles: { fontSize: '20px', fontWeight: 'bold', color: '#111827' } },

            // Job 1
            { type: 'shape', x: 60, y: 540, width: 680, height: 160, styles: { backgroundColor: '#e0f2fe', borderRadius: '12px' } },
            { type: 'text', x: 80, y: 560, width: 600, height: 22, content: 'Senior Designer — Bright Ideas Studio', styles: { fontSize: '14px', fontWeight: 'bold', color: '#111827' } },
            { type: 'text', x: 80, y: 590, width: 600, height: 100, content: 'Led multi-platform design projects, from concept to launch. Created design systems and visual languages for tech startups and lifestyle brands. Collaborated closely with developers to ensure pixel-perfect execution.', styles: { fontSize: '12px', color: '#1f2937', lineHeight: '1.7' } },

            // Job 2
            { type: 'shape', x: 60, y: 720, width: 680, height: 160, styles: { backgroundColor: '#fef3c7', borderRadius: '12px' } },
            { type: 'text', x: 80, y: 740, width: 600, height: 22, content: 'Product Designer — Nova Labs', styles: { fontSize: '14px', fontWeight: 'bold', color: '#111827' } },
            { type: 'text', x: 80, y: 770, width: 600, height: 100, content: 'Designed interfaces for mobile and web apps, focusing on usability and aesthetics. Developed prototypes and conducted user testing to refine product experiences. Coordinated with product teams to align vision and design goals.', styles: { fontSize: '12px', color: '#1f2937', lineHeight: '1.7' } },

            // Contact + Skills blocks (right side, floating)
            { type: 'shape', x: 60, y: 900, width: 320, height: 140, styles: { backgroundColor: '#dbeafe', borderRadius: '12px' } },
            { type: 'text', x: 80, y: 920, width: 280, height: 100, content: 'CONTACT\n📧 lucas@designhub.com\n📞 +1 555 987 6543\n🌍 www.lucashub.com\n📍 Berlin, DE', styles: { fontSize: '12px', color: '#1f2937', lineHeight: '1.7' } },

            { type: 'shape', x: 420, y: 900, width: 320, height: 140, styles: { backgroundColor: '#fcd34d', borderRadius: '12px' } },
            { type: 'text', x: 440, y: 920, width: 280, height: 100, content: 'SKILLS\n• UI/UX Design\n• Motion Graphics\n• Branding\n• Prototyping\n• Illustration', styles: { fontSize: '12px', color: '#111827', lineHeight: '1.7' } },

            // Decorative small accents bottom
            { type: 'shape', x: 60, y: 1060, width: 200, height: 6, styles: { backgroundColor: '#f87171', borderRadius: '4px' } },
            { type: 'shape', x: 320, y: 1060, width: 200, height: 6, styles: { backgroundColor: '#60a5fa', borderRadius: '4px' } },
            { type: 'shape', x: 580, y: 1060, width: 160, height: 6, styles: { backgroundColor: '#34d399', borderRadius: '4px' } }
        ]
    }


];
