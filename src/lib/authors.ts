import authorsPl from "./content/authors/pl.json";
import authorsEs from "./content/authors/es.json";
import authorsPt from "./content/authors/pt.json";
import authorsFr from "./content/authors/fr.json";
import authorsIt from "./content/authors/it.json";
import authorsDe from "./content/authors/de.json";
import authorsUk from "./content/authors/uk.json";
import authorsSv from "./content/authors/sv.json";
import authorsCs from "./content/authors/cs.json";
import authorsEl from "./content/authors/el.json";

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

// Per-locale, per-slug overrides of the translatable author fields.
type AuthorTranslation = Partial<Pick<Author, "role" | "bio" | "expertise">>;

const AUTHOR_TRANSLATIONS = {
    pl: authorsPl, es: authorsEs, pt: authorsPt, fr: authorsFr, it: authorsIt,
    de: authorsDe, uk: authorsUk, sv: authorsSv, cs: authorsCs, el: authorsEl,
} as Record<string, Record<string, AuthorTranslation>>;

function localizeAuthor(author: Author, locale: string): Author {
    const t = AUTHOR_TRANSLATIONS[locale]?.[author.slug];
    return t ? { ...author, ...t } : author;
}

export function getLocalizedAuthor(slug: string, locale: string): Author | undefined {
    const base = getAuthor(slug);
    return base ? localizeAuthor(base, locale) : undefined;
}

export function getLocalizedAuthorByName(name: string, locale: string): Author | undefined {
    const base = getAuthorByName(name);
    return base ? localizeAuthor(base, locale) : undefined;
}
