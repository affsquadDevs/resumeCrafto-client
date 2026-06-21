import rolesPl from "./content/roles/pl.json";
import rolesEs from "./content/roles/es.json";
import rolesPt from "./content/roles/pt.json";
import rolesFr from "./content/roles/fr.json";
import rolesIt from "./content/roles/it.json";
import rolesDe from "./content/roles/de.json";
import rolesUk from "./content/roles/uk.json";
import rolesSv from "./content/roles/sv.json";
import rolesCs from "./content/roles/cs.json";
import rolesEl from "./content/roles/el.json";

export interface ResumeRole {
    slug: string;          // kebab, e.g. "software-engineer"
    title: string;         // e.g. "Software Engineer"
    category: string;      // e.g. "Technology"
    summary: string;       // 1 sentence (used on hub cards + meta description seed)
    intro: string;         // 2-3 sentence paragraph
    keySkills: string[];   // 6-10 ATS keywords for the role
    tips: string[];        // 4-6 concrete resume tips for the role
    templateNames: string[]; // 2-4 relevant template names that exist in templates.ts
}

export const roles: ResumeRole[] = [
    {
        slug: "software-engineer",
        title: "Software Engineer",
        category: "Technology",
        summary: "Showcase your technical depth, shipped projects, and measurable impact for engineering roles.",
        intro:
            "A strong software engineer resume balances technical breadth with evidence of real impact. Recruiters and engineering managers want to see the languages and systems you work with, but they hire on outcomes such as features shipped, latency reduced, and problems solved. Lead with results and back them up with the stack you used.",
        keySkills: [
            "JavaScript",
            "TypeScript",
            "Python",
            "React",
            "Node.js",
            "REST APIs",
            "SQL",
            "Git",
            "CI/CD",
            "System Design",
        ],
        tips: [
            "Open each bullet with a strong verb and a measurable result, such as \"Reduced API response time by 40%.\"",
            "List your core languages and frameworks in a dedicated skills section so an ATS can match them quickly.",
            "Link to a GitHub profile or portfolio that demonstrates real, runnable code.",
            "Describe the scale you worked at (requests per second, users, data volume) to give context to your impact.",
            "Tailor the stack you highlight to the job description rather than listing every technology you have touched.",
        ],
        templateNames: ["Modern Professional Resume – Full Page", "Clean Analyst Resume", "Minimal Swiss Grid"],
    },
    {
        slug: "ux-designer",
        title: "UX Designer",
        category: "Design",
        summary: "Highlight your design process, research methods, and the product outcomes your work drove.",
        intro:
            "A UX designer resume should read like a case for how you think, not just a list of tools. Hiring teams look for a clear process: research, ideation, prototyping, and validation, tied to outcomes such as improved task success or higher conversion. Pair your craft with the business impact your designs delivered.",
        keySkills: [
            "User Research",
            "Wireframing",
            "Prototyping",
            "Figma",
            "Usability Testing",
            "Information Architecture",
            "Interaction Design",
            "Design Systems",
            "Accessibility",
        ],
        tips: [
            "Lead each role with the problem you were solving and the outcome you delivered, not just the screens you designed.",
            "Always include a link to a portfolio with two or three deep case studies.",
            "Quantify impact where you can, such as \"Increased onboarding completion by 22%.\"",
            "Name the research and testing methods you used so your process is visible to non-designers.",
            "Keep the layout clean and well-spaced; your resume itself is a design sample.",
        ],
        templateNames: ["UX Designer Resume – Full Page", "Creative Accent Designer", "Editorial Geometry Fixed"],
    },
    {
        slug: "accountant",
        title: "Accountant",
        category: "Finance",
        summary: "Demonstrate accuracy, compliance knowledge, and the financial controls you own.",
        intro:
            "An accountant resume is judged on precision, credibility, and trust. Employers want to see relevant certifications, the systems you work in, and a clean record of accurate, on-time reporting. Make your attention to detail obvious in both the content and the formatting of the page.",
        keySkills: [
            "Financial Reporting",
            "Accounts Payable",
            "Accounts Receivable",
            "General Ledger",
            "Reconciliations",
            "GAAP",
            "Tax Preparation",
            "QuickBooks",
            "Excel",
            "Auditing",
        ],
        tips: [
            "List certifications such as CPA prominently near the top of the page.",
            "Quantify the scale of what you manage, for example budgets, transaction volume, or number of accounts.",
            "Name the accounting software and ERP systems you know so the ATS can match them.",
            "Highlight compliance wins such as clean audits or reduced reporting errors.",
            "Keep formatting conservative and immaculate; accuracy is part of the message.",
        ],
        templateNames: ["Professional Accountant Resume", "Corporate Accounting Resume – Full Page", "Dense Corporate"],
    },
    {
        slug: "mechanical-engineer",
        title: "Mechanical Engineer",
        category: "Engineering",
        summary: "Present your design experience, technical tools, and the products you helped bring to life.",
        intro:
            "A mechanical engineer resume should connect technical capability to tangible results: parts designed, products launched, or costs reduced. Hiring managers scan for CAD proficiency, relevant standards, and hands-on experience across the product lifecycle. Show both what you built and the outcome it produced.",
        keySkills: [
            "CAD",
            "SolidWorks",
            "AutoCAD",
            "Finite Element Analysis",
            "GD&T",
            "Product Design",
            "Prototyping",
            "Manufacturing Processes",
            "Tolerance Analysis",
        ],
        tips: [
            "List the CAD and simulation tools you use and your proficiency level in each.",
            "Quantify outcomes such as weight reduced, cost saved, or cycle time improved.",
            "Reference the standards and methodologies you work to, such as GD&T or ISO.",
            "Highlight cross-functional work with manufacturing, quality, and suppliers.",
            "Include any patents, published designs, or capstone projects that show applied skill.",
        ],
        templateNames: ["Mechanical Engineer Resume", "Structured Two Column Full Page", "Clean Analyst Resume"],
    },
    {
        slug: "project-manager",
        title: "Project Manager",
        category: "Management",
        summary: "Prove you deliver projects on time, on budget, and with measurable business results.",
        intro:
            "A project manager resume lives and dies on outcomes. Employers want proof that you can scope work, manage stakeholders, and deliver against deadlines and budgets. Lead with the results of the projects you ran, then show the methodologies and tools that got you there.",
        keySkills: [
            "Project Planning",
            "Stakeholder Management",
            "Agile",
            "Scrum",
            "Risk Management",
            "Budgeting",
            "Jira",
            "Roadmapping",
            "Cross-functional Leadership",
        ],
        tips: [
            "Quantify scope on every project: budget size, team headcount, and timeline.",
            "Lead bullets with delivery outcomes such as \"Delivered a $1.2M migration two weeks early.\"",
            "Name your certifications such as PMP or CSM if you hold them.",
            "Show stakeholder and cross-functional management, not just task tracking.",
            "Match the methodology you emphasize to the role, whether Agile, Waterfall, or hybrid.",
        ],
        templateNames: ["Modern Professional Resume – Full Page", "Structured Two Column Full Page", "Dense Corporate"],
    },
    {
        slug: "marketing-manager",
        title: "Marketing Manager",
        category: "Marketing",
        summary: "Connect campaigns to revenue, growth, and the channels you scaled.",
        intro:
            "A marketing manager resume should read like a growth story. Hiring teams want to see which channels you own, the campaigns you ran, and the pipeline or revenue they generated. Anchor your experience in metrics so your impact is impossible to miss.",
        keySkills: [
            "Campaign Management",
            "SEO",
            "Content Marketing",
            "Paid Acquisition",
            "Marketing Analytics",
            "Email Marketing",
            "Brand Strategy",
            "Google Analytics",
            "Lead Generation",
            "Marketing Automation",
        ],
        tips: [
            "Quantify results such as leads generated, CAC reduced, or revenue influenced.",
            "Name the channels and platforms you own so they match the job's keywords.",
            "Show ownership of budget and the return you produced on it.",
            "Highlight a flagship campaign with clear before-and-after numbers.",
            "Demonstrate both strategy and execution, not just one or the other.",
        ],
        templateNames: ["Editorial Resume – Large Font", "Creative Accent Designer", "Modern Professional Resume – Full Page"],
    },
    {
        slug: "student",
        title: "Student",
        category: "Entry-Level",
        summary: "Turn coursework, projects, and internships into a compelling first resume.",
        intro:
            "An entry-level resume earns interviews by making the most of limited formal experience. Coursework, projects, internships, and extracurricular leadership all count when framed around skills and results. Focus on what you can do, supported by concrete examples, rather than apologizing for a short work history.",
        keySkills: [
            "Communication",
            "Teamwork",
            "Time Management",
            "Microsoft Office",
            "Research",
            "Problem Solving",
            "Adaptability",
            "Leadership",
        ],
        tips: [
            "Put education near the top and include relevant coursework, GPA if strong, and honors.",
            "Treat class projects and internships like jobs, with results-focused bullet points.",
            "Highlight leadership in clubs, sports, or volunteering to show initiative.",
            "Keep it to one page and use a clean, easy-to-scan layout.",
            "Tailor your skills section to the specific roles you are applying for.",
        ],
        templateNames: ["Student / Junior Resume", "Minimal Swiss Grid", "Clean Analyst Resume"],
    },
    {
        slug: "community-manager",
        title: "Community Manager",
        category: "Marketing",
        summary: "Show how you grow, engage, and retain audiences across channels.",
        intro:
            "A community manager resume should prove you can build and sustain an engaged audience. Hiring teams look for growth metrics, engagement results, and evidence that you can represent a brand voice while handling real conversations. Pair the platforms you manage with the outcomes you produced.",
        keySkills: [
            "Community Engagement",
            "Social Media Management",
            "Content Creation",
            "Moderation",
            "Brand Voice",
            "Analytics",
            "Discord",
            "Customer Support",
            "Event Coordination",
        ],
        tips: [
            "Quantify community growth, engagement rate, and retention where possible.",
            "Name the platforms and tools you manage, such as Discord, Slack, or social channels.",
            "Show how you handled escalations or turned negative sentiment around.",
            "Highlight campaigns or events you ran and the participation they drove.",
            "Demonstrate a consistent brand voice with concrete examples.",
        ],
        templateNames: ["Community Manager Resume", "Creative Accent Designer", "Editorial Resume – Large Font"],
    },
    {
        slug: "creative-writer",
        title: "Creative Writer",
        category: "Writing",
        summary: "Let your voice, range, and published work make the case for you.",
        intro:
            "A creative writer resume should demonstrate range, reliability, and a distinct voice. Editors and clients want to see published work, the formats you handle, and your ability to deliver polished writing on deadline. Lead with credits and let a portfolio do the heavy lifting.",
        keySkills: [
            "Copywriting",
            "Storytelling",
            "Editing",
            "Content Strategy",
            "SEO Writing",
            "Research",
            "Proofreading",
            "Brand Voice",
            "CMS",
        ],
        tips: [
            "Always include a portfolio link with a curated selection of your best pieces.",
            "List notable publications, bylines, or clients to establish credibility.",
            "Show range by naming the formats you write, such as long-form, scripts, or copy.",
            "Quantify reach where you can, for example readership or engagement on published work.",
            "Keep the resume itself crisp and typo-free; it is a writing sample.",
        ],
        templateNames: ["Creative Writer Resume", "Editorial Resume – Large Font", "Editorial Geometry Fixed"],
    },
    {
        slug: "sales-representative",
        title: "Sales Representative",
        category: "Sales",
        summary: "Lead with quota attainment, deals closed, and the revenue you drove.",
        intro:
            "A sales representative resume is fundamentally about numbers. Hiring managers scan for quota attainment, deal size, and how consistently you hit targets. Put your results front and center and back them with the process and tools you used to deliver them.",
        keySkills: [
            "Lead Generation",
            "Prospecting",
            "Negotiation",
            "CRM",
            "Salesforce",
            "Pipeline Management",
            "Closing",
            "Account Management",
            "Cold Calling",
        ],
        tips: [
            "Lead every role with quota attainment, for example \"Achieved 128% of quota in 2025.\"",
            "Quantify deal size, revenue generated, and the size of your book of business.",
            "Name the CRM and sales tools you use so they match the ATS keywords.",
            "Show progression such as President's Club awards or promotions.",
            "Highlight both new-business and account-growth results to show range.",
        ],
        templateNames: ["Modern Professional Resume – Full Page", "Dense Corporate", "Clean Analyst Resume"],
    },
];

export function getRole(slug: string): ResumeRole | undefined {
    return roles.find((role) => role.slug === slug);
}

// Per-locale, per-slug overrides of the translatable fields. Empty JSON until
// translated, in which case the English source is returned unchanged.
type RoleTranslation = Partial<Pick<ResumeRole, "title" | "category" | "summary" | "intro" | "keySkills" | "tips">>;

const ROLE_TRANSLATIONS = {
    pl: rolesPl, es: rolesEs, pt: rolesPt, fr: rolesFr, it: rolesIt,
    de: rolesDe, uk: rolesUk, sv: rolesSv, cs: rolesCs, el: rolesEl,
} as Record<string, Record<string, RoleTranslation>>;

export function getLocalizedRoles(locale: string): ResumeRole[] {
    const tr = ROLE_TRANSLATIONS[locale];
    if (!tr) return roles;
    return roles.map((r) => ({ ...r, ...(tr[r.slug] ?? {}) }));
}

export function getLocalizedRole(slug: string, locale: string): ResumeRole | undefined {
    const base = getRole(slug);
    if (!base) return undefined;
    const t = ROLE_TRANSLATIONS[locale]?.[slug];
    return t ? { ...base, ...t } : base;
}
