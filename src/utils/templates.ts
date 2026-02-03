import { EditorElement } from "@/store/useEditorStore";

export interface Template {
    id: string;
    name: string;
    elements: Partial<EditorElement>[];
}

// Basic icons paths (Lucide style)
const ICONS = {
    MAIL: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    PHONE: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    GLOBE: "M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z",
    MAP_PIN: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
};

export const TEMPLATES: Template[] = [
    {
        id: 'modern-split-fullpage',
        name: 'Modern Sidebar Full Page',
        elements: [
            // Sidebar (ліва частина)
            { type: 'shape', x: 0, y: 0, width: 280, height: 1123, styles: { backgroundColor: '#2d3748' } },

            // Sidebar Content
            { type: 'text', x: 30, y: 60, width: 220, height: 40, content: 'CONTACT', styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' } },

            // Email
            { type: 'icon', x: 30, y: 110, width: 14, height: 14, styles: { iconPath: ICONS.MAIL, backgroundColor: '#CBD5E0' } },
            { type: 'text', x: 55, y: 107, width: 200, height: 20, content: 'hello@resumecraft.com', styles: { fontSize: '12px', color: '#CBD5E0' } },

            // Phone
            { type: 'icon', x: 30, y: 134, width: 14, height: 14, styles: { iconPath: ICONS.PHONE, backgroundColor: '#CBD5E0' } },
            { type: 'text', x: 55, y: 131, width: 200, height: 20, content: '+1 555 0123', styles: { fontSize: '12px', color: '#CBD5E0' } },

            // Website
            { type: 'icon', x: 30, y: 158, width: 14, height: 14, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#CBD5E0' } },
            { type: 'text', x: 55, y: 155, width: 200, height: 20, content: 'www.resumecraft.com', styles: { fontSize: '12px', color: '#CBD5E0' } },

            // Location
            { type: 'icon', x: 30, y: 182, width: 14, height: 14, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#CBD5E0' } },
            { type: 'text', x: 55, y: 179, width: 200, height: 20, content: 'Kyiv, Ukraine', styles: { fontSize: '12px', color: '#CBD5E0' } },

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
    // 1
    {
        id: 'dense-corporate',
        name: 'Dense Corporate',
        elements: [
            // Header
            { type: 'shape', x: 0, y: 0, width: 794, height: 190, styles: { backgroundColor: '#f1f5f9' } },

            { type: 'text', x: 40, y: 55, width: 530, height: 80, content: 'MICHAEL\nANDERSON', styles: { fontSize: '44px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { type: 'text', x: 40, y: 135, width: 500, height: 30, content: 'SENIOR SOFTWARE ENGINEER', styles: { fontSize: '16px', letterSpacing: '3px', color: '#475569' } },

            // Contact (converted to icons)
            { type: 'icon', x: 560, y: 60, width: 14, height: 14, styles: { iconPath: ICONS.MAIL, backgroundColor: '#1e293b' } },
            { type: 'text', x: 585, y: 57, width: 180, height: 20, content: 'michael.anderson@email.com', styles: { fontSize: '12px', color: '#1e293b', textAlign: 'left' } },

            { type: 'icon', x: 560, y: 84, width: 14, height: 14, styles: { iconPath: ICONS.PHONE, backgroundColor: '#1e293b' } },
            { type: 'text', x: 585, y: 81, width: 180, height: 20, content: '+1 202 555 0187', styles: { fontSize: '12px', color: '#1e293b', textAlign: 'left' } },

            { type: 'icon', x: 560, y: 108, width: 14, height: 14, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#1e293b' } },
            { type: 'text', x: 585, y: 105, width: 180, height: 20, content: 'www.anderson.dev', styles: { fontSize: '12px', color: '#1e293b', textAlign: 'left' } },

            { type: 'icon', x: 560, y: 132, width: 14, height: 14, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#1e293b' } },
            { type: 'text', x: 585, y: 129, width: 180, height: 20, content: 'Berlin, Germany', styles: { fontSize: '12px', color: '#1e293b', textAlign: 'left' } },

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
    // 2
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
            // Contact
            { type: 'icon', x: 25, y: 210, width: 13, height: 13, styles: { iconPath: ICONS.MAIL, backgroundColor: '#334155' } },
            { type: 'text', x: 45, y: 208, width: 180, height: 18, content: 'emily.roberts@email.com', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 25, y: 232, width: 13, height: 13, styles: { iconPath: ICONS.PHONE, backgroundColor: '#334155' } },
            { type: 'text', x: 45, y: 230, width: 180, height: 18, content: '+44 7700 900321', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 25, y: 254, width: 13, height: 13, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#334155' } },
            { type: 'text', x: 45, y: 252, width: 180, height: 18, content: 'portfolio.example', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 25, y: 276, width: 13, height: 13, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#334155' } },
            { type: 'text', x: 45, y: 274, width: 180, height: 18, content: 'London, UK', styles: { fontSize: '11px', color: '#334155' } },

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
    // 3
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
            { type: 'icon', x: 40, y: 580, width: 13, height: 13, styles: { iconPath: ICONS.MAIL, backgroundColor: '#475569' } },
            { type: 'text', x: 60, y: 578, width: 160, height: 18, content: 'contact@creative.com', styles: { fontSize: '11px', color: '#475569' } },

            { type: 'icon', x: 40, y: 602, width: 13, height: 13, styles: { iconPath: ICONS.PHONE, backgroundColor: '#475569' } },
            { type: 'text', x: 60, y: 600, width: 160, height: 18, content: '+1 555 0145', styles: { fontSize: '11px', color: '#475569' } },

            { type: 'icon', x: 40, y: 624, width: 13, height: 13, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#475569' } },
            { type: 'text', x: 60, y: 622, width: 160, height: 18, content: 'portfolio.site', styles: { fontSize: '11px', color: '#475569' } },

            { type: 'icon', x: 40, y: 646, width: 13, height: 13, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#475569' } },
            { type: 'text', x: 60, y: 644, width: 160, height: 18, content: 'New York, USA', styles: { fontSize: '11px', color: '#475569' } },

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
    // 4
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
            { type: 'icon', x: 165, y: 335, width: 13, height: 13, styles: { iconPath: ICONS.MAIL, backgroundColor: '#334155' } },
            { type: 'text', x: 185, y: 333, width: 150, height: 18, content: 'hello@portfolio.com', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 165, y: 357, width: 13, height: 13, styles: { iconPath: ICONS.PHONE, backgroundColor: '#334155' } },
            { type: 'text', x: 185, y: 355, width: 150, height: 18, content: '+44 7000 112233', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 165, y: 379, width: 13, height: 13, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#334155' } },
            { type: 'text', x: 185, y: 377, width: 150, height: 18, content: 'nat.design', styles: { fontSize: '11px', color: '#334155' } },

            { type: 'icon', x: 165, y: 401, width: 13, height: 13, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#334155' } },
            { type: 'text', x: 185, y: 399, width: 150, height: 18, content: 'Amsterdam, NL', styles: { fontSize: '11px', color: '#334155' } },

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
    // 5
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
    // 6
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
            { type: 'text', x: 80, y: 920, width: 280, height: 20, content: 'CONTACT', styles: { fontSize: '12px', color: '#1f2937', fontWeight: 'bold' } },

            { type: 'icon', x: 80, y: 948, width: 14, height: 14, styles: { iconPath: ICONS.MAIL, backgroundColor: '#1f2937' } },
            { type: 'text', x: 105, y: 945, width: 250, height: 20, content: 'lucas@designhub.com', styles: { fontSize: '12px', color: '#1f2937' } },

            { type: 'icon', x: 80, y: 972, width: 14, height: 14, styles: { iconPath: ICONS.PHONE, backgroundColor: '#1f2937' } },
            { type: 'text', x: 105, y: 969, width: 250, height: 20, content: '+1 555 987 6543', styles: { fontSize: '12px', color: '#1f2937' } },

            { type: 'icon', x: 80, y: 996, width: 14, height: 14, styles: { iconPath: ICONS.GLOBE, backgroundColor: '#1f2937' } },
            { type: 'text', x: 105, y: 993, width: 250, height: 20, content: 'www.lucashub.com', styles: { fontSize: '12px', color: '#1f2937' } },

            { type: 'icon', x: 80, y: 1020, width: 14, height: 14, styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#1f2937' } },
            { type: 'text', x: 105, y: 1017, width: 250, height: 20, content: 'Berlin, DE', styles: { fontSize: '12px', color: '#1f2937' } },

            { type: 'shape', x: 420, y: 900, width: 320, height: 140, styles: { backgroundColor: '#fcd34d', borderRadius: '12px' } },
            { type: 'text', x: 440, y: 920, width: 280, height: 100, content: 'SKILLS\n• UI/UX Design\n• Motion Graphics\n• Branding\n• Prototyping\n• Illustration', styles: { fontSize: '12px', color: '#111827', lineHeight: '1.7' } },

            // Decorative small accents bottom
            { type: 'shape', x: 60, y: 1060, width: 200, height: 6, styles: { backgroundColor: '#f87171', borderRadius: '4px' } },
            { type: 'shape', x: 320, y: 1060, width: 200, height: 6, styles: { backgroundColor: '#60a5fa', borderRadius: '4px' } },
            { type: 'shape', x: 580, y: 1060, width: 160, height: 6, styles: { backgroundColor: '#34d399', borderRadius: '4px' } }
        ]
    },
    // 7
    {
        id: 'minimal-fashion-designer-fullpage',
        name: 'Minimal Fashion Designer Resume',
        elements: [

            // Background
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ede4db' }
            },

            // Title
            {
                type: 'text',
                x: 60,
                y: 60,
                width: 680,
                height: 140,
                content: 'RESUME',
                styles: {
                    fontSize: '120px',
                    fontWeight: '900',
                    color: '#1f1f1f',
                    letterSpacing: '4px'
                }
            },

            // Name + location
            {
                type: 'text',
                x: 60,
                y: 210,
                width: 360,
                height: 40,
                content: 'JULIANA SILVA, LONDON\n20.01.1995',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: '#1f1f1f'
                }
            },

            // Contact
            {
                type: 'text',
                x: 60,
                y: 270,
                width: 360,
                height: 80,
                content: 'HELLO@REALLYGREATSITE.COM\n+123-456-7890\nREALLYGREATSITE.COM',
                styles: {
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Profession label
            {
                type: 'text',
                x: 460,
                y: 220,
                width: 280,
                height: 30,
                content: '(FASHION DESIGNER)',
                styles: {
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    color: '#1f1f1f'
                }
            },

            // Profile header
            {
                type: 'text',
                x: 60,
                y: 360,
                width: 360,
                height: 30,
                content: 'PROFILE',
                styles: {
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f1f1f'
                }
            },

            // Profile text
            {
                type: 'text',
                x: 60,
                y: 400,
                width: 360,
                height: 120,
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Experience header
            {
                type: 'text',
                x: 60,
                y: 540,
                width: 360,
                height: 30,
                content: 'PROFESSIONAL EXPERIENCE',
                styles: {
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f1f1f'
                }
            },

            // Experience block 1
            {
                type: 'text',
                x: 60,
                y: 580,
                width: 360,
                height: 140,
                content:
                    'ASSISTANT FASHION DESIGNER\nJANUARY 2022 – PRESENT\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Experience block 2
            {
                type: 'text',
                x: 60,
                y: 740,
                width: 360,
                height: 140,
                content:
                    'ASSISTANT FASHION DESIGNER\nJANUARY 2020 – DECEMBER 2021\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Experience block 3
            {
                type: 'text',
                x: 60,
                y: 900,
                width: 360,
                height: 140,
                content:
                    'FASHION DESIGN INTERN, LICERIA & CO.\nMAY 2019 – JANUARY 2020\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Image placeholder
            {
                type: 'shape',
                x: 460,
                y: 300,
                width: 240,
                height: 300,
                styles: {
                    backgroundColor: '#d6cdc4'
                }
            },

            // Education header
            {
                type: 'text',
                x: 460,
                y: 640,
                width: 280,
                height: 30,
                content: 'EDUCATION',
                styles: {
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f1f1f'
                }
            },

            // Education text
            {
                type: 'text',
                x: 460,
                y: 680,
                width: 280,
                height: 80,
                content:
                    'NAME OF UNIVERSITY / COLLEGE\nSEPTEMBER 2015 – MAY 2019',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#1f1f1f'
                }
            },

            // Skills header
            {
                type: 'text',
                x: 460,
                y: 780,
                width: 280,
                height: 30,
                content: 'KEY SKILLS',
                styles: {
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f1f1f'
                }
            },

            // Skills list
            {
                type: 'text',
                x: 460,
                y: 820,
                width: 280,
                height: 200,
                content:
                    '• Trend Analysis\n• Fashion Design\n• Prototyping\n• Product Development\n• Creativity',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: '#1f1f1f'
                }
            }
        ]
    },
    // 8
    {
        id: 'fashion-contrast-black-white-fullpage',
        name: 'Fashion Contrast Resume',
        elements: [

            // LEFT BLACK COLUMN
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 360,
                height: 1130,
                styles: { backgroundColor: '#000000' }
            },

            // RIGHT LIGHT BACKGROUND
            {
                type: 'shape',
                x: 360,
                y: 0,
                width: 440,
                height: 1130,
                styles: { backgroundColor: '#f5f5f5' }
            },

            // NAME
            {
                type: 'text',
                x: 40,
                y: 60,
                width: 280,
                height: 120,
                content: 'OLIVIA\nWILSON',
                styles: {
                    fontSize: '48px',
                    fontWeight: '700',
                    lineHeight: '1.1',
                    color: '#ffffff'
                }
            },

            // PROFESSION
            {
                type: 'text',
                x: 40,
                y: 190,
                width: 280,
                height: 30,
                content: 'Fashion Designer',
                styles: {
                    fontSize: '14px',
                    color: '#ffffff'
                }
            },

            // DECOR LINE
            {
                type: 'shape',
                x: 40,
                y: 225,
                width: 180,
                height: 2,
                styles: { backgroundColor: '#ffffff' }
            },

            // CONTACT
            {
                type: 'text',
                x: 40,
                y: 250,
                width: 280,
                height: 120,
                content:
                    '+123-456-7890\n123 Anywhere St, Any City\nhello@reallygreatsite.com',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: '#ffffff'
                }
            },

            // EDUCATION HEADER
            {
                type: 'text',
                x: 40,
                y: 400,
                width: 280,
                height: 30,
                content: 'Education',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff'
                }
            },

            // EDUCATION BLOCK
            {
                type: 'text',
                x: 40,
                y: 440,
                width: 280,
                height: 260,
                content:
                    'Borcelle University (2013–2015)\nMaster Degree – Informatic Engineering\n\nBorcelle University (2015–2019)\nMaster Degree – Graphic Design\n\nLarana University (2019–2022)\nMaster Degree – English Language Education',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#ffffff'
                }
            },

            // EXPERIENCE HEADER
            {
                type: 'text',
                x: 40,
                y: 730,
                width: 280,
                height: 30,
                content: 'Experience',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff'
                }
            },

            // EXPERIENCE BLOCK
            {
                type: 'text',
                x: 40,
                y: 770,
                width: 280,
                height: 260,
                content:
                    'Studio Showde (2020–2022)\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nLarana, Inc. (2022–2023)\nLorem ipsum dolor sit amet, consectetur adipiscing elit.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.7',
                    color: '#ffffff'
                }
            },

            // PHOTO PLACEHOLDER
            {
                type: 'shape',
                x: 400,
                y: 80,
                width: 340,
                height: 520,
                styles: {
                    backgroundColor: '#cccccc'
                }
            },

            // SKILLS HEADER
            {
                type: 'text',
                x: 400,
                y: 650,
                width: 340,
                height: 30,
                content: 'Skills',
                styles: {
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#000000'
                }
            },

            // SKILL BARS
            {
                type: 'text',
                x: 400,
                y: 700,
                width: 200,
                height: 20,
                content: 'Communication',
                styles: { fontSize: '12px', color: '#000000' }
            },
            {
                type: 'shape',
                x: 400,
                y: 725,
                width: 300,
                height: 6,
                styles: { backgroundColor: '#000000' }
            },

            {
                type: 'text',
                x: 400,
                y: 760,
                width: 200,
                height: 20,
                content: 'Public Speaking',
                styles: { fontSize: '12px', color: '#000000' }
            },
            {
                type: 'shape',
                x: 400,
                y: 785,
                width: 260,
                height: 6,
                styles: { backgroundColor: '#000000' }
            },

            {
                type: 'text',
                x: 400,
                y: 820,
                width: 200,
                height: 20,
                content: 'Negotiation',
                styles: { fontSize: '12px', color: '#000000' }
            },
            {
                type: 'shape',
                x: 400,
                y: 845,
                width: 240,
                height: 6,
                styles: { backgroundColor: '#000000' }
            },

            {
                type: 'text',
                x: 400,
                y: 880,
                width: 200,
                height: 20,
                content: 'Fashion Design',
                styles: { fontSize: '12px', color: '#000000' }
            },
            {
                type: 'shape',
                x: 400,
                y: 905,
                width: 300,
                height: 6,
                styles: { backgroundColor: '#000000' }
            },

            {
                type: 'text',
                x: 400,
                y: 940,
                width: 200,
                height: 20,
                content: 'Editing Photo',
                styles: { fontSize: '12px', color: '#000000' }
            },
            {
                type: 'shape',
                x: 400,
                y: 965,
                width: 220,
                height: 6,
                styles: { backgroundColor: '#000000' }
            }
        ]
    },
    // 9
    {
        id: 'clean-analyst-editorial-fullpage',
        name: 'Clean Analyst Resume',
        elements: [

            // LEFT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 300,
                height: 1130,
                styles: { backgroundColor: '#f4f9fd' }
            },

            // RIGHT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 300,
                y: 0,
                width: 500,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // DECORATIVE PAPER BLOCK
            {
                type: 'shape',
                x: 60,
                y: 80,
                width: 180,
                height: 220,
                styles: {
                    backgroundColor: '#ffffff',
                    borderRadius: '4px'
                }
            },

            // HELLO TEXT
            {
                type: 'text',
                x: 100,
                y: 250,
                width: 160,
                height: 80,
                content: '¡hol\na!',
                styles: {
                    fontSize: '42px',
                    fontWeight: '700',
                    lineHeight: '1',
                    color: '#000000'
                }
            },

            // CONTACT DATA HEADER
            {
                type: 'text',
                x: 40,
                y: 360,
                width: 220,
                height: 20,
                content: 'DATOS DE CONTACTO',
                styles: {
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#000000'
                }
            },

            // CONTACT DATA
            {
                type: 'text',
                x: 40,
                y: 390,
                width: 220,
                height: 120,
                content:
                    '31 años\nhola@sitioincreible.com\nTel: 1234-5678\nCalle Cualquiera 123,\nCualquier lugar',
                styles: {
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // EDUCATION HEADER
            {
                type: 'text',
                x: 40,
                y: 540,
                width: 220,
                height: 20,
                content: 'EDUCACIÓN',
                styles: {
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#000000'
                }
            },

            // EDUCATION
            {
                type: 'text',
                x: 40,
                y: 570,
                width: 220,
                height: 160,
                content:
                    'Contador Público\nUniversidad Increíble\n2014–2018\n\nBachiller administrativo\nEscuela Terciaria Increíble\n2008–2013',
                styles: {
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // COURSES HEADER
            {
                type: 'text',
                x: 40,
                y: 760,
                width: 220,
                height: 20,
                content: 'CURSOS E IDIOMAS',
                styles: {
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#000000'
                }
            },

            // COURSES
            {
                type: 'text',
                x: 40,
                y: 790,
                width: 220,
                height: 220,
                content:
                    'Idioma Inglés\nNivel oral y escrito avanzado\n\nCurso de Impuestos Avanzado\n\nManejo de redes sociales y calendario de posteos',
                styles: {
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // NAME
            {
                type: 'text',
                x: 360,
                y: 100,
                width: 380,
                height: 80,
                content: 'Olivia\nWilson',
                styles: {
                    fontSize: '36px',
                    fontWeight: '500',
                    lineHeight: '1.1',
                    color: '#000000'
                }
            },

            // JOB TITLE
            {
                type: 'text',
                x: 360,
                y: 190,
                width: 380,
                height: 20,
                content: 'ANALISTA CONTABLE',
                styles: {
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: '#000000'
                }
            },

            // PROFILE TEXT
            {
                type: 'text',
                x: 360,
                y: 240,
                width: 380,
                height: 120,
                content:
                    'Me considero una persona proactiva y responsable, con buenas relaciones interpersonales. Busco un puesto que me desafíe a continuar creciendo.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: '#000000'
                }
            },

            // EXPERIENCE HEADER
            {
                type: 'text',
                x: 360,
                y: 400,
                width: 380,
                height: 20,
                content: 'EXPERIENCIA LABORAL',
                styles: {
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#000000'
                }
            },

            // EXPERIENCE BLOCK
            {
                type: 'text',
                x: 360,
                y: 430,
                width: 380,
                height: 600,
                content:
                    '• Analista contable\nEmpresa Increíble, Enero 2021 – presente\nAsistencia contable integral a Gerencia. Seguimiento de presupuesto.\n\n• Contador junior\nEmpresa Increíble, Septiembre 2019 – Enero 2021\nAsistencia a mesa de entradas. Organización de libro de entrada y salida.\n\n• Pasantía de contadora\nEmpresa Increíble, Septiembre 2018 – Septiembre 2019\nRecepción de clientes. Manejo de computadora. Atención a inspecciones.',
                styles: {
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: '#000000'
                }
            }
        ]
    },
    // 10
    {
        id: 'editorial-template-large-font',
        name: 'Editorial Resume – Large Font',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#f6f1e8' }
            },

            // TOP HEADER
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 210,
                styles: { backgroundColor: '#1a140f' }
            },

            // PROFILE IMAGE
            {
                type: 'shape',
                x: 70,
                y: 60,
                width: 230,
                height: 230,
                styles: {
                    backgroundColor: '#cccccc',
                    borderRadius: '10px'
                }
            },

            // NAME
            {
                type: 'text',
                x: 360,
                y: 50,
                width: 420,
                height: 100,
                content: 'FULL NAME\nSURNAME',
                styles: {
                    fontSize: '42px',
                    fontWeight: '600',
                    lineHeight: '1.1',
                    color: '#ffffff'
                }
            },

            // TITLE
            {
                type: 'text',
                x: 360,
                y: 155,
                width: 380,
                height: 32,
                content: 'PRIMARY PROFESSIONAL TITLE',
                styles: {
                    fontSize: '14px',
                    letterSpacing: '2px',
                    color: '#cfe86a'
                }
            },

            // LEFT COLUMN CARD
            {
                type: 'shape',
                x: 50,
                y: 270,
                width: 280,
                height: 860,
                styles: {
                    backgroundColor: '#ffffff',
                    borderRadius: '16px'
                }
            },

            // LEFT — PROFILE
            {
                type: 'text',
                x: 75,
                y: 310,
                width: 230,
                height: 240,
                content:
                    'SECTION TITLE\n\nExtended profile description text goes here. This section contains a detailed overview of professional background, values, mindset, and long-term goals.\n\nAdditional paragraph continues naturally to maintain visual density.',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // LEFT — EDUCATION
            {
                type: 'text',
                x: 75,
                y: 570,
                width: 230,
                height: 280,
                content:
                    'SECTION TITLE\n\nDegree Title — Institution Name\nDate Range\n• Academic focus or specialization\n• Achievement or distinction\n\nDegree Title — Institution Name\nDate Range\n• Academic focus or specialization\n• Achievement or distinction',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // LEFT — COURSES
            {
                type: 'text',
                x: 75,
                y: 870,
                width: 230,
                height: 240,
                content:
                    'SECTION TITLE\n\nCourse or Certification Name\nDetailed explanation of learning outcome and application.\n\nCourse or Certification Name\nDetailed explanation of learning outcome and application.',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // RIGHT — EXPERIENCE
            {
                type: 'text',
                x: 360,
                y: 260,
                width: 400,
                height: 580,
                content:
                    'MAIN SECTION TITLE\n\nRole / Position Title\nCompany Name — Date Range\nDetailed description explaining responsibilities, tools, collaboration, and outcomes. Text is intentionally longer to ensure full vertical coverage.\n• Responsibility or achievement\n• Responsibility or achievement\n• Responsibility or achievement\n\nRole / Position Title\nCompany Name — Date Range\nDetailed description explaining responsibilities, tools, collaboration, and outcomes.\n• Responsibility or achievement\n• Responsibility or achievement',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#000000'
                }
            },

            // RIGHT — SECONDARY
            {
                type: 'text',
                x: 360,
                y: 870,
                width: 400,
                height: 200,
                content:
                    'SECONDARY SECTION TITLE\n\nProject or Initiative Name\nDescriptive paragraph outlining scope, contribution, and results.\n\nProject or Initiative Name\nDescriptive paragraph outlining scope, contribution, and results.',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: '#000000'
                }
            },

            // FOOTER BAR
            {
                type: 'shape',
                x: 0,
                y: 1010,
                width: 800,
                height: 120,
                styles: {
                    backgroundColor: '#cfe86a'
                }
            },

            // CONTACT
            {
                type: 'text',
                x: 60,
                y: 1035,
                width: 680,
                height: 90,
                content:
                    'CONTACT INFORMATION · Phone · Email · Website · Portfolio · Location',
                styles: {
                    fontSize: '13px',
                    lineHeight: '1.7',
                    color: '#000000',
                    textAlign: 'center'
                }
            }
        ]
    },
    // 11
    {
        id: 'corporate-accounting-template-fullpage',
        name: 'Corporate Accounting Resume – Full Page',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // HEADER STRIPE
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 120,
                styles: { backgroundColor: '#f4f6fb' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 40,
                width: 500,
                height: 60,
                content: 'FULL NAME',
                styles: {
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#2f4fd8'
                }
            },

            // SUMMARY
            {
                type: 'text',
                x: 60,
                y: 110,
                width: 500,
                height: 120,
                content:
                    'Professional summary text goes here. This is a longer description intended to clearly communicate expertise, professional focus, and career objectives. Multiple sentences are expected to ensure proper page density.',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // CONTACT BLOCK
            {
                type: 'text',
                x: 600,
                y: 40,
                width: 160,
                height: 180,
                content:
                    'CONTACT\n\nStreet Address\nPhone Number\nEmail Address\nWebsite or LinkedIn',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: '#111827'
                }
            },

            // LEFT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 260,
                width: 520,
                height: 870,
                styles: { backgroundColor: '#ffffff' }
            },

            // RIGHT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 520,
                y: 260,
                width: 280,
                height: 870,
                styles: { backgroundColor: '#f9fafb' }
            },

            // WORK EXPERIENCE HEADER
            {
                type: 'text',
                x: 60,
                y: 280,
                width: 420,
                height: 30,
                content: 'WORK EXPERIENCE',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2f4fd8'
                }
            },

            // WORK EXPERIENCE (EXTENDED)
            {
                type: 'text',
                x: 60,
                y: 320,
                width: 420,
                height: 520,
                content:
                    'ROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n\nROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n\nROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // EDUCATION HEADER
            {
                type: 'text',
                x: 60,
                y: 860,
                width: 420,
                height: 30,
                content: 'EDUCATION',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2f4fd8'
                }
            },

            // EDUCATION
            {
                type: 'text',
                x: 60,
                y: 900,
                width: 420,
                height: 210,
                content:
                    'DEGREE TITLE\nInstitution Name\nDate Range\n• Area of specialization\n\nDEGREE TITLE\nInstitution Name\nDate Range\n• Area of specialization',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // SKILLS HEADER
            {
                type: 'text',
                x: 560,
                y: 280,
                width: 200,
                height: 30,
                content: 'SKILLS',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2f4fd8'
                }
            },

            // SKILLS (TECH + TOOLS + LANGUAGES)
            {
                type: 'text',
                x: 560,
                y: 320,
                width: 200,
                height: 360,
                content:
                    'TECHNICAL SKILLS\n• Skill one\n• Skill two\n• Skill three\n• Skill four\n\nTOOLS\n• Tool name\n• Tool name\n• Tool name\n\nLANGUAGES\n• Language — Level\n• Language — Level',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // CERTIFICATIONS
            {
                type: 'text',
                x: 560,
                y: 700,
                width: 200,
                height: 200,
                content:
                    'CERTIFICATIONS\n• Certification name\n• Certification name\n• Certification name',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // ADDITIONAL INFO (BOTTOM RIGHT)
            {
                type: 'text',
                x: 560,
                y: 920,
                width: 200,
                height: 180,
                content:
                    'ADDITIONAL INFORMATION\n• Leadership or volunteer activity\n• Award or recognition\n• Professional membership',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            }
        ]
    },
    // 12
    {
        id: 'modern-professional-template-fullpage',
        name: 'Modern Professional Resume – Full Page',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // HEADER STRIPE
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 100,
                styles: { backgroundColor: '#1e3a8a' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 30,
                width: 500,
                height: 50,
                content: 'FULL NAME',
                styles: {
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#ffffff'
                }
            },

            // TITLE
            {
                type: 'text',
                x: 60,
                y: 80,
                width: 500,
                height: 30,
                content: 'PRIMARY PROFESSIONAL TITLE',
                styles: {
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: '#cbd5e1'
                }
            },

            // CONTACT BLOCK
            {
                type: 'text',
                x: 600,
                y: 30,
                width: 160,
                height: 150,
                content:
                    'CONTACT\n\nStreet Address\nPhone Number\nEmail Address\nLinkedIn Profile',
                styles: {
                    fontSize: '13px',
                    lineHeight: '1.7',
                    color: '#111827'
                }
            },

            // LEFT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 130,
                width: 520,
                height: 1000,
                styles: { backgroundColor: '#ffffff' }
            },

            // RIGHT COLUMN BACKGROUND
            {
                type: 'shape',
                x: 520,
                y: 130,
                width: 280,
                height: 1000,
                styles: { backgroundColor: '#f9fafb' }
            },

            // SUMMARY
            {
                type: 'text',
                x: 60,
                y: 150,
                width: 420,
                height: 140,
                content:
                    'Professional summary text goes here. This is a longer description intended to clearly communicate expertise, professional focus, and career objectives. Multiple sentences are expected to ensure proper page density.',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // WORK EXPERIENCE HEADER
            {
                type: 'text',
                x: 60,
                y: 310,
                width: 420,
                height: 30,
                content: 'WORK EXPERIENCE',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e3a8a'
                }
            },

            // WORK EXPERIENCE (EXTENDED)
            {
                type: 'text',
                x: 60,
                y: 350,
                width: 420,
                height: 500,
                content:
                    'ROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n\nROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement\n\nROLE TITLE — COMPANY NAME\nDate Range\n• Responsibility or measurable achievement\n• Responsibility or measurable achievement',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // EDUCATION HEADER
            {
                type: 'text',
                x: 60,
                y: 870,
                width: 420,
                height: 30,
                content: 'EDUCATION',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e3a8a'
                }
            },

            // EDUCATION
            {
                type: 'text',
                x: 60,
                y: 910,
                width: 420,
                height: 180,
                content:
                    'DEGREE TITLE\nInstitution Name\nDate Range\n• Area of specialization\n\nDEGREE TITLE\nInstitution Name\nDate Range\n• Area of specialization',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // SKILLS HEADER
            {
                type: 'text',
                x: 560,
                y: 150,
                width: 200,
                height: 30,
                content: 'SKILLS',
                styles: {
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e3a8a'
                }
            },

            // SKILLS (TECH + TOOLS + LANGUAGES)
            {
                type: 'text',
                x: 560,
                y: 190,
                width: 200,
                height: 360,
                content:
                    'TECHNICAL SKILLS\n• Skill one\n• Skill two\n• Skill three\n• Skill four\n\nTOOLS\n• Tool name\n• Tool name\n• Tool name\n\nLANGUAGES\n• Language — Level\n• Language — Level',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // CERTIFICATIONS
            {
                type: 'text',
                x: 560,
                y: 570,
                width: 200,
                height: 180,
                content:
                    'CERTIFICATIONS\n• Certification name\n• Certification name\n• Certification name',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // ADDITIONAL INFO (BOTTOM RIGHT)
            {
                type: 'text',
                x: 560,
                y: 770,
                width: 200,
                height: 200,
                content:
                    'ADDITIONAL INFORMATION\n• Leadership or volunteer activity\n• Award or recognition\n• Professional membership',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            }
        ]
    },
    // 13
    {
        id: 'ux-designer-template-fullpage',
        name: 'UX Designer Resume – Full Page',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // HEADER
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 140,
                styles: { backgroundColor: '#f4f5f7' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 40,
                width: 500,
                height: 50,
                content: 'FULL NAME',
                styles: {
                    fontSize: '34px',
                    fontWeight: '700',
                    color: '#111827'
                }
            },

            // JOB TITLE
            {
                type: 'text',
                x: 60,
                y: 85,
                width: 500,
                height: 26,
                content: 'PROFESSIONAL TITLE',
                styles: {
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#374151'
                }
            },

            // CONTACT LINE
            {
                type: 'text',
                x: 60,
                y: 115,
                width: 680,
                height: 30,
                content: 'City · Phone · Email · Portfolio / LinkedIn',
                styles: {
                    fontSize: '14px',
                    color: '#6b7280'
                }
            },

            // SUMMARY HEADER
            {
                type: 'shape',
                x: 60,
                y: 170,
                width: 680,
                height: 36,
                styles: {
                    backgroundColor: '#e5e7eb',
                    borderRadius: '18px'
                }
            },
            {
                type: 'text',
                x: 80,
                y: 178,
                width: 640,
                height: 20,
                content: 'SUMMARY',
                styles: {
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827'
                }
            },

            // SUMMARY TEXT
            {
                type: 'text',
                x: 60,
                y: 220,
                width: 680,
                height: 130,
                content:
                    'Professional summary text goes here. This paragraph is intentionally longer to ensure full page density. Describe experience, mindset, problem-solving approach, collaboration style, and impact. Additional sentences help remove vertical gaps and improve readability.',
                styles: {
                    fontSize: '15px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // TECH SKILLS HEADER
            {
                type: 'shape',
                x: 60,
                y: 370,
                width: 680,
                height: 36,
                styles: {
                    backgroundColor: '#e5e7eb',
                    borderRadius: '18px'
                }
            },
            {
                type: 'text',
                x: 80,
                y: 378,
                width: 640,
                height: 20,
                content: 'TECHNICAL SKILLS',
                styles: {
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827'
                }
            },

            // TECH SKILLS
            {
                type: 'text',
                x: 60,
                y: 420,
                width: 680,
                height: 140,
                content:
                    'Category Name: Skill · Skill · Skill · Skill\nCategory Name: Skill · Skill · Skill · Skill\nCategory Name: Skill · Skill · Skill · Skill',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.8',
                    color: '#111827'
                }
            },

            // EXPERIENCE HEADER
            {
                type: 'shape',
                x: 60,
                y: 580,
                width: 680,
                height: 36,
                styles: {
                    backgroundColor: '#e5e7eb',
                    borderRadius: '18px'
                }
            },
            {
                type: 'text',
                x: 80,
                y: 588,
                width: 640,
                height: 20,
                content: 'PROFESSIONAL EXPERIENCE',
                styles: {
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827'
                }
            },

            // EXPERIENCE
            {
                type: 'text',
                x: 60,
                y: 630,
                width: 680,
                height: 260,
                content:
                    'ROLE TITLE — COMPANY NAME\nDate Range\n• Key achievement with measurable impact\n• Key achievement with measurable impact\n• Key achievement with measurable impact\n\nROLE TITLE — COMPANY NAME\nDate Range\n• Key achievement with measurable impact\n• Key achievement with measurable impact',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // EDUCATION HEADER
            {
                type: 'shape',
                x: 60,
                y: 910,
                width: 680,
                height: 36,
                styles: {
                    backgroundColor: '#e5e7eb',
                    borderRadius: '18px'
                }
            },
            {
                type: 'text',
                x: 80,
                y: 918,
                width: 640,
                height: 20,
                content: 'EDUCATION & ADDITIONAL INFORMATION',
                styles: {
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827'
                }
            },

            // EDUCATION + ADDITIONAL
            {
                type: 'text',
                x: 60,
                y: 960,
                width: 680,
                height: 150,
                content:
                    'Degree Title — Institution Name\nDate Range\n• Focus area or thesis\n\nCertifications · Languages · Awards · Activities',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            }
        ]
    },
    // 14
    {
        id: 'professional-accountant-with-icons',
        name: 'Professional Accountant Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // HEADER
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 160,
                styles: { backgroundColor: '#f3f4f6' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 40,
                width: 420,
                height: 60,
                content: 'ALEXANDER MORRIS',
                styles: {
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#111827'
                }
            },

            // TITLE
            {
                type: 'text',
                x: 60,
                y: 85,
                width: 420,
                height: 26,
                content: 'Senior Financial Specialist',
                styles: {
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#374151'
                }
            },

            // CONTACT ICONS + TEXT
            {
                type: 'icon',
                x: 60,
                y: 125,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#111827' }
            },
            {
                type: 'text',
                x: 82,
                y: 122,
                width: 200,
                height: 20,
                content: '+44 7700 900123',
                styles: { fontSize: '14px', color: '#111827' }
            },

            {
                type: 'icon',
                x: 260,
                y: 125,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#111827' }
            },
            {
                type: 'text',
                x: 282,
                y: 122,
                width: 260,
                height: 20,
                content: 'alex.morris@email.com',
                styles: { fontSize: '14px', color: '#111827' }
            },

            {
                type: 'icon',
                x: 560,
                y: 125,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#111827' }
            },
            {
                type: 'text',
                x: 582,
                y: 122,
                width: 180,
                height: 20,
                content: 'London, United Kingdom',
                styles: { fontSize: '14px', color: '#111827' }
            },

            // PROFILE
            {
                type: 'text',
                x: 60,
                y: 200,
                width: 680,
                height: 140,
                content:
                    'PROFILE\nExperienced financial specialist with a strong background in accounting, reporting, and business analysis. Skilled in managing financial data, supporting strategic decisions, and improving internal processes. Known for reliability, accuracy, and clear communication.',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // EDUCATION
            {
                type: 'text',
                x: 60,
                y: 360,
                width: 680,
                height: 180,
                content:
                    'EDUCATION\n\nMaster of Finance and Business Strategy\nNorthbridge University · 2024 – 2026\nFocused on corporate finance, budgeting, and strategic planning.\n\nBachelor of Accounting and Economics\nNorthbridge University · 2020 – 2024\nStrong foundation in financial reporting and management accounting.',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // WORK EXPERIENCE
            {
                type: 'text',
                x: 60,
                y: 560,
                width: 680,
                height: 320,
                content:
                    'WORK EXPERIENCE\n\nSenior Financial Analyst — FinCore Solutions\n2024 – Present\n• Prepare and analyze financial reports for senior management\n• Support budgeting and forecasting across departments\n• Identify cost-saving opportunities and process improvements\n\nFinancial Analyst — FinCore Solutions\n2022 – 2024\n• Assisted in monthly and quarterly reporting\n• Monitored expenses and performed variance analysis\n• Improved reporting workflows and documentation\n\nJunior Accountant — BrightLedger Group\n2020 – 2022\n• Maintained financial records and reconciliations\n• Supported audits and compliance checks\n• Processed invoices and tracked expenses',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // SKILLS
            {
                type: 'text',
                x: 60,
                y: 900,
                width: 680,
                height: 180,
                content:
                    'SKILLS\n\nProfessional: Financial Analysis · Financial Reporting · Budgeting · Auditing Support\nTechnical: Management Accounting · Expense Tracking · Accounts Payable & Receivable\nPersonal: Communication · Leadership · Time Management · Problem Solving',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            }
        ]
    },
    // 15
    {
        id: 'mechanical-engineer-clean-template',
        name: 'Mechanical Engineer Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // HEADER
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 150,
                styles: { backgroundColor: '#f5f6f8' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 40,
                width: 520,
                height: 60,
                content: 'EMILY CARTER',
                styles: {
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#111827'
                }
            },

            // JOB TITLE
            {
                type: 'text',
                x: 60,
                y: 85,
                width: 520,
                height: 26,
                content: 'Mechanical Engineering Specialist',
                styles: {
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#374151'
                }
            },

            // CONTACT — ADDRESS
            {
                type: 'icon',
                x: 600,
                y: 40,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#f97316' }
            },
            {
                type: 'text',
                x: 622,
                y: 38,
                width: 160,
                height: 20,
                content: 'Berlin, Germany',
                styles: { fontSize: '13.5px', color: '#111827' }
            },

            // CONTACT — PHONE
            {
                type: 'icon',
                x: 600,
                y: 70,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#f97316' }
            },
            {
                type: 'text',
                x: 622,
                y: 68,
                width: 160,
                height: 20,
                content: '+49 170 1234567',
                styles: { fontSize: '13.5px', color: '#111827' }
            },

            // CONTACT — EMAIL
            {
                type: 'icon',
                x: 600,
                y: 100,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#f97316' }
            },
            {
                type: 'text',
                x: 622,
                y: 98,
                width: 160,
                height: 20,
                content: 'emily.carter@email.com',
                styles: { fontSize: '13.5px', color: '#111827' }
            },

            // SUMMARY
            {
                type: 'text',
                x: 60,
                y: 180,
                width: 680,
                height: 140,
                content:
                    'PROFILE\nDetail-oriented mechanical engineering specialist with hands-on experience in system design, technical analysis, and process optimization. Strong background in mechanical components, cross-team collaboration, and quality assurance. Focused on delivering reliable, efficient, and scalable engineering solutions.',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // WORK EXPERIENCE
            {
                type: 'text',
                x: 60,
                y: 340,
                width: 680,
                height: 360,
                content:
                    'WORK EXPERIENCE\n\nSenior Mechanical Engineer — NovaTech Industries\n2022 – Present\n• Lead mechanical system design for industrial projects\n• Coordinate testing, validation, and implementation phases\n• Mentor junior engineers and review technical documentation\n• Improve system efficiency through design optimization\n\nMechanical Project Engineer — Axis Manufacturing\n2019 – 2022\n• Managed mechanical projects from concept to production\n• Conducted failure analysis and implemented corrective actions\n• Collaborated with manufacturing teams to improve durability\n• Ensured compliance with safety and quality standards',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // SKILLS
            {
                type: 'text',
                x: 60,
                y: 720,
                width: 680,
                height: 220,
                content:
                    'SKILLS\n\nHard Skills: 3D Modeling · Finite Element Analysis · Thermal Simulation · Mechanical Design\nTechnical Skills: Root Cause Analysis · Project Planning · Design Optimization · Quality Control\nSoft Skills: Technical Communication · Team Leadership · Time Management',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // EDUCATION
            {
                type: 'text',
                x: 60,
                y: 960,
                width: 680,
                height: 140,
                content:
                    'EDUCATION\n\nBachelor of Mechanical Engineering\nInstitute of Applied Engineering · 2016 – 2020\nFocused on thermodynamics, machine design, and manufacturing processes.',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            }
        ]
    },
    // 16
    {
        id: 'community-manager-dark-template',
        name: 'Community Manager Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // TOP DARK HEADER
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 150,
                styles: { backgroundColor: '#000000' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 40,
                width: 360,
                height: 60,
                content: 'NATALIE BROWN',
                styles: {
                    fontSize: '34px',
                    fontWeight: '600',
                    color: '#f3d6cc'
                }
            },

            // JOB TITLE
            {
                type: 'text',
                x: 60,
                y: 85,
                width: 360,
                height: 26,
                content: 'Community & Growth Manager',
                styles: {
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: '#f3d6cc'
                }
            },

            // CONTACT — PHONE
            {
                type: 'icon',
                x: 480,
                y: 42,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#f3d6cc' }
            },
            {
                type: 'text',
                x: 502,
                y: 40,
                width: 240,
                height: 20,
                content: '+1 202 555 0198',
                styles: { fontSize: '13px', color: '#ffffff' }
            },

            // CONTACT — EMAIL
            {
                type: 'icon',
                x: 480,
                y: 70,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#f3d6cc' }
            },
            {
                type: 'text',
                x: 502,
                y: 68,
                width: 240,
                height: 20,
                content: 'natalie.brown@email.com',
                styles: { fontSize: '13px', color: '#ffffff' }
            },

            // CONTACT — LOCATION
            {
                type: 'icon',
                x: 480,
                y: 98,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAP_PIN, backgroundColor: '#f3d6cc' }
            },
            {
                type: 'text',
                x: 502,
                y: 96,
                width: 240,
                height: 20,
                content: 'New York, United States',
                styles: { fontSize: '13px', color: '#ffffff' }
            },

            // SUMMARY
            {
                type: 'text',
                x: 60,
                y: 190,
                width: 680,
                height: 140,
                content:
                    'SUMMARY\nStrategic community and growth manager with experience building engaged online communities and supporting brand visibility through content, events, and partnerships. Strong ability to analyze engagement data, understand audience needs, and translate insights into effective campaigns.',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // HIGHLIGHTS
            {
                type: 'text',
                x: 60,
                y: 350,
                width: 680,
                height: 140,
                content:
                    'HIGHLIGHTS\n\n• Community growth strategies\n• Content planning & moderation\n• Social media campaigns\n• Event coordination\n• Performance tracking\n• Stakeholder collaboration',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.9',
                    color: '#111827'
                }
            },

            // EXPERIENCE HEADER
            {
                type: 'shape',
                x: 520,
                y: 510,
                width: 220,
                height: 36,
                styles: { backgroundColor: '#000000' }
            },
            {
                type: 'text',
                x: 540,
                y: 518,
                width: 180,
                height: 20,
                content: 'EXPERIENCE',
                styles: {
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#f3d6cc'
                }
            },

            // EXPERIENCE CONTENT
            {
                type: 'text',
                x: 60,
                y: 560,
                width: 680,
                height: 360,
                content:
                    'Community Manager — BrightConnect Agency\n2020 – Present\n• Plan and execute community engagement initiatives\n• Manage online discussions and brand presence\n• Coordinate campaigns with marketing and product teams\n• Track performance metrics and optimize strategies\n\nCommunity Coordinator — SocialHub Network\n2017 – 2020\n• Supported daily community operations\n• Organized online events and feedback sessions\n• Collected insights to improve user engagement\n• Assisted in campaign planning and execution',
                styles: {
                    fontSize: '14.5px',
                    lineHeight: '1.75',
                    color: '#111827'
                }
            },

            // BOTTOM DARK FOOTER
            {
                type: 'shape',
                x: 0,
                y: 960,
                width: 800,
                height: 170,
                styles: { backgroundColor: '#000000' }
            },

            // EDUCATION
            {
                type: 'text',
                x: 60,
                y: 1000,
                width: 680,
                height: 120,
                content:
                    'EDUCATION\nBachelor of Arts in Marketing & Communication\nCity University · 2015 – 2019',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.75',
                    color: '#f3d6cc'
                }
            }
        ]
    },
    // 17
    {
        id: 'actor-theatre-elegant-template',
        name: 'Actor Theatre Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // DECORATIVE BORDER (TOP)
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 60,
                styles: { backgroundColor: '#f3f4f6' }
            },

            // NAME
            {
                type: 'text',
                x: 200,
                y: 90,
                width: 400,
                height: 50,
                content: 'EMILIE MARTIN',
                styles: {
                    fontSize: '30px',
                    fontWeight: '500',
                    letterSpacing: '4px',
                    textAlign: 'center',
                    color: '#374151'
                }
            },

            // PROFESSION
            {
                type: 'text',
                x: 200,
                y: 140,
                width: 400,
                height: 24,
                content: 'ACTOR — THEATRE & CINEMA',
                styles: {
                    fontSize: '12px',
                    letterSpacing: '3px',
                    textAlign: 'center',
                    color: '#6b7280'
                }
            },

            // LEFT COLUMN — PROFILE
            {
                type: 'text',
                x: 80,
                y: 220,
                width: 300,
                height: 200,
                content:
                    'PERSONAL PROFILE\n\nActor with experience in theatre productions and independent film projects. Passionate about character development, expressive performance, and collaborative creative environments. Comfortable performing in both classical and contemporary works.',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // RIGHT COLUMN — EXPERIENCE
            {
                type: 'text',
                x: 420,
                y: 220,
                width: 300,
                height: 240,
                content:
                    'PROFESSIONAL EXPERIENCE\n\nStage Performances\n• Lead and supporting roles in theatre productions\n• Collaboration with directors and stage designers\n• Live performances for diverse audiences\n\nScreen Acting\n• Participation in short films and independent cinema projects\n• Festival screenings and local showcases',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // LEFT — ACHIEVEMENTS
            {
                type: 'text',
                x: 80,
                y: 460,
                width: 300,
                height: 200,
                content:
                    'ACHIEVEMENTS\n\n• Recognition for expressive stage presence\n• Participation in national theatre events\n• Award nomination at a regional performance festival\n• Ongoing professional development workshops',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // RIGHT — EDUCATION
            {
                type: 'text',
                x: 420,
                y: 480,
                width: 300,
                height: 220,
                content:
                    'EDUCATION & TRAINING\n\nAcademy of Performing Arts\nDiploma in Theatre & Acting\n\nSpecialized training in stage movement, voice control, and character analysis.\n\nAdditional workshops in camera acting and improvisation.',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // LEFT — SPECIAL SKILLS
            {
                type: 'text',
                x: 80,
                y: 700,
                width: 300,
                height: 200,
                content:
                    'SPECIAL SKILLS\n\n• Voice modulation\n• Stage movement and physical theatre\n• Improvisation\n• Script analysis\n• Languages: English, French',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // RIGHT — CONTACT
            {
                type: 'text',
                x: 420,
                y: 720,
                width: 300,
                height: 40,
                content: 'CONTACT',
                styles: {
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    color: '#374151'
                }
            },

            {
                type: 'icon',
                x: 420,
                y: 770,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#374151' }
            },
            {
                type: 'text',
                x: 445,
                y: 767,
                width: 260,
                height: 20,
                content: '+33 6 12 34 56 78',
                styles: { fontSize: '13px', color: '#374151' }
            },

            {
                type: 'icon',
                x: 420,
                y: 800,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#374151' }
            },
            {
                type: 'text',
                x: 445,
                y: 797,
                width: 260,
                height: 20,
                content: 'emilie.martin@email.com',
                styles: { fontSize: '13px', color: '#374151' }
            },

            {
                type: 'icon',
                x: 420,
                y: 830,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.GLOBE, backgroundColor: '#374151' }
            },
            {
                type: 'text',
                x: 445,
                y: 827,
                width: 260,
                height: 20,
                content: 'www.emiliemartin.com',
                styles: { fontSize: '13px', color: '#374151' }
            },

            // DECORATIVE BORDER (BOTTOM)
            {
                type: 'shape',
                x: 0,
                y: 1070,
                width: 800,
                height: 60,
                styles: { backgroundColor: '#f3f4f6' }
            }
        ]
    },
    // 18
    {
        id: 'student-junior-clean-centered',
        name: 'Student / Junior Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#ffffff' }
            },

            // NAME
            {
                type: 'text',
                x: 200,
                y: 80,
                width: 400,
                height: 60,
                content: 'ANDREW KOVACS',
                styles: {
                    fontSize: '32px',
                    fontWeight: '600',
                    letterSpacing: '3px',
                    textAlign: 'center',
                    color: '#334155'
                }
            },

            // TITLE
            {
                type: 'text',
                x: 200,
                y: 130,
                width: 400,
                height: 24,
                content: 'DIGITAL MARKETING TRAINEE',
                styles: {
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textAlign: 'center',
                    color: '#64748b'
                }
            },

            // INTRO / SUMMARY
            {
                type: 'text',
                x: 150,
                y: 180,
                width: 500,
                height: 100,
                content:
                    'INTRODUCTION\nMotivated student with strong communication skills and a growing interest in digital marketing. Passionate about content creation, online research, and supporting marketing activities. Eager to learn, improve, and contribute to real projects.',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    textAlign: 'center',
                    color: '#334155'
                }
            },

            // CENTER DIVIDER
            {
                type: 'shape',
                x: 398,
                y: 310,
                width: 4,
                height: 520,
                styles: { backgroundColor: '#cbd5e1' }
            },

            // LEFT COLUMN — EDUCATION
            {
                type: 'text',
                x: 120,
                y: 320,
                width: 260,
                height: 180,
                content:
                    'EDUCATION\n\nCentral High School\n2019 – 2023\n\nGeneral Secondary School\n2015 – 2019',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // LEFT — AWARDS
            {
                type: 'text',
                x: 120,
                y: 520,
                width: 260,
                height: 160,
                content:
                    'ACHIEVEMENTS\n\n• Academic excellence award\n• Student leadership recognition\n• Participation in national competitions',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // LEFT — ACTIVITIES
            {
                type: 'text',
                x: 120,
                y: 700,
                width: 260,
                height: 160,
                content:
                    'ACTIVITIES\n\n• Volunteering projects\n• School media club\n• Content writing and editing',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // RIGHT COLUMN — EXPERIENCE
            {
                type: 'text',
                x: 420,
                y: 320,
                width: 260,
                height: 220,
                content:
                    'EXPERIENCE\n\nContent Assistant\n2022 – Present\n• Supported content preparation and publishing\n• Assisted with social media posts\n• Conducted basic online research\n\nStudent Helper\n2021 – 2022\n• Assisted with administrative tasks\n• Supported daily operations',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // RIGHT — SKILLS
            {
                type: 'text',
                x: 420,
                y: 560,
                width: 260,
                height: 160,
                content:
                    'SKILLS\n\n• Written communication\n• Social media basics\n• Online research\n• Team collaboration',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // RIGHT — LANGUAGES
            {
                type: 'text',
                x: 420,
                y: 740,
                width: 260,
                height: 120,
                content:
                    'LANGUAGES\n\nEnglish — Intermediate\nHungarian — Native',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#334155'
                }
            },

            // REFERENCES
            {
                type: 'text',
                x: 120,
                y: 880,
                width: 560,
                height: 120,
                content:
                    'REFERENCES\n\nAlex Brown — School Supervisor\n+36 30 123 4567\n\nMaria Novak — Project Mentor\nmaria.novak@email.com',
                styles: {
                    fontSize: '13.5px',
                    lineHeight: '1.7',
                    color: '#334155'
                }
            },

            // CONTACT ICONS (FOOTER)
            {
                type: 'icon',
                x: 220,
                y: 1030,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#334155' }
            },
            {
                type: 'text',
                x: 242,
                y: 1027,
                width: 160,
                height: 20,
                content: '+36 30 123 4567',
                styles: { fontSize: '13px', color: '#334155' }
            },

            {
                type: 'icon',
                x: 420,
                y: 1030,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#334155' }
            },
            {
                type: 'text',
                x: 442,
                y: 1027,
                width: 200,
                height: 20,
                content: 'andrew.kovacs@email.com',
                styles: { fontSize: '13px', color: '#334155' }
            }
        ]
    },
    // 19
    {
        id: 'creative-writer-warm-template',
        name: 'Creative Writer Resume',
        elements: [

            // PAGE BACKGROUND
            {
                type: 'shape',
                x: 0,
                y: 0,
                width: 800,
                height: 1130,
                styles: { backgroundColor: '#fffdf8' }
            },

            // BOTTOM ACCENT BAR
            {
                type: 'shape',
                x: 0,
                y: 1030,
                width: 800,
                height: 100,
                styles: { backgroundColor: '#f1d48b' }
            },

            // NAME
            {
                type: 'text',
                x: 60,
                y: 60,
                width: 300,
                height: 70,
                content: 'MICHAEL TURNER',
                styles: {
                    fontSize: '34px',
                    fontWeight: '700',
                    color: '#d4a017'
                }
            },

            // LEFT COLUMN — OBJECTIVE
            {
                type: 'text',
                x: 60,
                y: 180,
                width: 300,
                height: 150,
                content:
                    'CAREER OBJECTIVE\nMotivated content writer with a strong interest in storytelling, editorial writing, and digital content. Seeking opportunities to grow professionally while contributing creative and well-structured written materials.',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // LEFT — ACHIEVEMENTS
            {
                type: 'text',
                x: 60,
                y: 350,
                width: 300,
                height: 180,
                content:
                    'KEY ACHIEVEMENTS\n\n• Contributed articles to online publications\n• Participated in editorial and creative writing projects\n• Assisted in content planning and review\n• Delivered multiple writing assignments on deadline',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // LEFT — CONTACT
            {
                type: 'text',
                x: 60,
                y: 560,
                width: 300,
                height: 30,
                content: 'CONTACT',
                styles: {
                    fontSize: '15px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    color: '#d4a017'
                }
            },

            {
                type: 'icon',
                x: 60,
                y: 610,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.PHONE, backgroundColor: '#d4a017' }
            },
            {
                type: 'text',
                x: 82,
                y: 607,
                width: 260,
                height: 20,
                content: '+44 7700 123456',
                styles: { fontSize: '13.5px', color: '#374151' }
            },

            {
                type: 'icon',
                x: 60,
                y: 640,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.MAIL, backgroundColor: '#d4a017' }
            },
            {
                type: 'text',
                x: 82,
                y: 637,
                width: 260,
                height: 20,
                content: 'michael.turner@email.com',
                styles: { fontSize: '13.5px', color: '#374151' }
            },

            {
                type: 'icon',
                x: 60,
                y: 670,
                width: 14,
                height: 14,
                styles: { iconPath: ICONS.GLOBE, backgroundColor: '#d4a017' }
            },
            {
                type: 'text',
                x: 82,
                y: 667,
                width: 260,
                height: 20,
                content: 'www.michaelturner.com',
                styles: { fontSize: '13.5px', color: '#374151' }
            },

            // RIGHT COLUMN — EXPERIENCE
            {
                type: 'text',
                x: 420,
                y: 60,
                width: 320,
                height: 300,
                content:
                    'PROFESSIONAL EXPERIENCE\n\nFreelance Content Writer\n2019 – Present\n• Write articles, blog posts, and website content\n• Adapt writing style to different audiences and platforms\n• Collaborate with editors and content managers\n\nEditorial Assistant\n2017 – 2019\n• Supported content editing and proofreading\n• Assisted in managing publication schedules\n• Conducted background research for articles',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // RIGHT — EDUCATION
            {
                type: 'text',
                x: 420,
                y: 390,
                width: 320,
                height: 200,
                content:
                    'EDUCATION\n\nBachelor of Arts in Communication\nCity University · 2013 – 2017\n\nSecondary School Diploma\nCity High School · 2009 – 2013',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            },

            // RIGHT — CORE SKILLS
            {
                type: 'text',
                x: 420,
                y: 610,
                width: 320,
                height: 200,
                content:
                    'CORE COMPETENCIES\n\n• Creative writing\n• Editorial proofreading\n• Content planning\n• Research and fact-checking\n• Time management',
                styles: {
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#374151'
                }
            }
        ]
    }


];
