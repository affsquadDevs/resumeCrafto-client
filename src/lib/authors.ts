export interface Author {
    slug: string;
    name: string;
    type: "Person" | "Organization";
    role: string;
    bio: string;
    expertise: string[];
    sameAs: string[];
    url: string;
}

export const authors: Author[] = [
    {
        slug: "resumecraftor-editorial-team",
        name: "ResumeCraftor Editorial Team",
        type: "Organization",
        role: "Editorial Team",
        bio: "The ResumeCraftor Editorial Team researches how hiring actually works, what recruiters look for, and how applicant tracking systems parse and rank resumes. We turn that research into clear, practical resume and career guidance that reflects real-world recruiter expectations rather than generic advice. Every article is reviewed against current ATS behavior and hiring practices before it is published.",
        expertise: [
            "Resume writing",
            "ATS optimization",
            "Recruiter expectations",
            "Career development",
            "Cover letters",
            "Job search strategy",
        ],
        sameAs: [
            "https://www.youtube.com/@resumecraftor",
            "https://www.facebook.com/people/ResumeCraftor/61586853676415/",
            "https://www.instagram.com/resumecraftor26",
        ],
        url: "/author/resumecraftor-editorial-team",
    },
];

export function getAuthor(slug: string): Author | undefined {
    return authors.find((author) => author.slug === slug);
}

export function getAuthorByName(name: string): Author | undefined {
    return authors.find((author) => author.name === name);
}
