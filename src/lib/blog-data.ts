export interface BlogPostMeta {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
    image: string;
}

export const blogPosts: BlogPostMeta[] = [
    {
        id: '10',
        title: 'How to Write a Resume That Sounds More Strategic, Not Just Operational',
        excerpt: 'Learn how to present your work in a more strategic way so your resume shows business thinking, prioritization, and professional maturity.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-04-15',
        readTime: '8 min read',
        category: 'Career Tips',
        slug: 'how-to-write-a-strategic-resume',
        image: '/assets/photo/Resume%20comparison_%20operational%20vs%20strategic.png',
    },
    {
        id: '9',
        title: 'How to Make Your Resume Sound More Senior Without Exaggerating',
        excerpt: 'Learn how to present your experience in stronger, more senior language without exaggerating achievements or overstating your role.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-04-02',
        readTime: '9 min read',
        category: 'Career Tips',
        slug: 'how-to-make-your-resume-sound-more-senior',
        image: '/assets/photo/Resume%20comparison%20for%20career%20progression.png',
    },
    {
        id: '8',
        title: 'Resume Keywords for ATS: How to Use Them Naturally',
        excerpt: 'Learn how to use ATS resume keywords naturally so applicant tracking systems recognize your relevance without keyword stuffing.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-03-20',
        readTime: '8 min read',
        category: 'Resume Guide',
        slug: 'resume-keywords-for-ats',
        image: '/assets/photo/Job%20search%20with%20ATS%20keywords%20analysis.png',
    },
    {
        id: '7',
        title: 'ATS Resume Formatting Tips: What to Use and What to Avoid',
        excerpt: 'Learn which resume formatting choices help applicant tracking systems parse your resume correctly and which design mistakes often reduce ATS compatibility.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-03-10',
        readTime: '9 min read',
        category: 'Resume Formatting',
        slug: 'ats-resume-formatting-tips',
        image: '/assets/photo/ATS%20resume%20formatting%20guide.png',
    },
    {
        id: '6',
        title: 'What Is an ATS Resume? Meaning, Format, and Best Practices',
        excerpt: 'Learn what an ATS resume really is, how applicant tracking systems read resumes, and which formatting, file types, and best practices improve compatibility and readability.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-25',
        readTime: '10 min read',
        category: 'Resume Guide',
        slug: 'what-is-an-ats-resume',
        image: '/assets/photo/ATS%20resume%20guide%20in%20a%20modern%20office.png',
    },
    {
        id: '5',
        title: 'How to Make Your Resume Reflect Leadership Even If You Never Managed a Team',
        excerpt: 'Learn how to show leadership on your resume through ownership, initiative, judgment, and influence, even without formal management experience.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-10',
        readTime: '9 min read',
        category: 'Leadership',
        slug: 'how-to-make-your-resume-reflect-leadership',
        image: '/assets/photo/Resume%20strategy%20for%20leadership%20success.png',
    },
    {
        id: '1',
        title: 'ATS Optimization Explained: How Applicant Tracking Systems Work',
        excerpt: 'Learn how ATS (Applicant Tracking Systems) process resumes, common compatibility issues, and practical ways to improve ATS optimization without sacrificing readability.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-01-20',
        readTime: '10 min read',
        category: 'Career Tips',
        slug: 'ats-optimization-getting-past-the-robots',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    },
    {
        id: '2',
        title: 'Building Your Personal Brand Through Your Resume (Practical Guide)',
        excerpt: 'Learn how to build a clear personal brand through your resume using focused messaging, consistent structure, and evidence-based experience—without sounding generic.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-01-05',
        readTime: '8 min read',
        category: 'Branding',
        slug: 'building-your-personal-brand-through-your-resume',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    },
    {
        id: '3',
        title: 'How to Choose the Right Resume Template for Your Career',
        excerpt: 'Learn how to choose the right resume template based on your role, experience level, and professional goals without sacrificing clarity or compatibility.',
        author: 'ResumeCraftor Editorial Team',
        date: '2025-12-15',
        readTime: '7 min read',
        category: 'Resume Guide',
        slug: 'how-to-choose-the-perfect-resume-template',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    {
        id: '4',
        title: 'How to Build a Professional Resume: Step-by-Step Guide',
        excerpt: 'A clear, step-by-step guide to building a professional resume—from structure and summaries to experience, skills, and formatting best practices.',
        author: 'ResumeCraftor Editorial Team',
        date: '2025-11-20',
        readTime: '12 min read',
        category: 'Resume Guide',
        slug: 'how-to-build-a-professional-resume-step-by-step',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f',
    }
];
