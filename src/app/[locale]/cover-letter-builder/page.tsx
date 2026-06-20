import type { Metadata } from "next";
import Link from "next/link";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Cover Letter Builder",
    description:
        "Write a job-winning cover letter in minutes with our free cover letter builder. Follow a proven structure, tailor it to any job description, and keep it ATS-friendly so recruiters notice you.",
    alternates: {
        canonical: "https://resumecraftor.com/cover-letter-builder",
    },
    openGraph: {
        title: "Free Cover Letter Builder | ResumeCraftor",
        description:
            "Write a job-winning cover letter in minutes with our free cover letter builder. Follow a proven structure, tailor it to any job, and keep it ATS-friendly.",
        url: "https://resumecraftor.com/cover-letter-builder",
        type: "website",
    },
};

const faqs = [
    {
        question: "Is the cover letter builder really free?",
        answer:
            "Yes. You can structure, write, and refine your cover letter at no cost. Start from the resume builder, follow the guided sections, and export your document when it is ready to send.",
    },
    {
        question: "How long should a cover letter be?",
        answer:
            "Keep it to a single page, typically three to four short paragraphs and around 250 to 400 words. Hiring managers skim, so a focused letter that highlights two or three relevant achievements outperforms a long, generic one.",
    },
    {
        question: "Do I need a different cover letter for every job?",
        answer:
            "You should tailor each letter to the specific role. Reuse your core structure, but swap in the company name, the position, and one or two achievements that match the keywords in the job description. A tailored letter signals genuine interest and ranks better in applicant tracking systems.",
    },
    {
        question: "Will my cover letter pass an ATS?",
        answer:
            "It will if you keep the formatting clean. Use standard headings, avoid tables, images, and text boxes, save as a PDF unless told otherwise, and mirror a few exact phrases from the job posting so the system recognizes you as a relevant match.",
    },
    {
        question: "What should I do if I have no direct experience?",
        answer:
            "Lead with transferable skills and measurable results from school, internships, volunteering, or side projects. Show how those experiences map to the responsibilities in the posting, and express clear enthusiasm for learning the role.",
    },
];

export default function CoverLetterBuilderPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://resumecraftor.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Cover Letter Builder",
                "item": "https://resumecraftor.com/cover-letter-builder"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white selection:bg-purple-100 selection:text-purple-700">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <CraftorNavbar />

            <main className="container mx-auto px-4 py-32 max-w-4xl">
                {/* Hero / Intro */}
                <section className="text-center mb-16 md:mb-24 px-2 md:px-0">
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                        <Sparkles size={14} className="md:!w-4 md:!h-4" />
                        <span>Free Cover Letter Builder</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                        Free Cover Letter Builder
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Pair the right resume with a cover letter that actually gets read. Our free
                        cover letter builder walks you through a proven structure, helps you tailor
                        every paragraph to the job description, and keeps the formatting clean so it
                        sails through applicant tracking systems. Write a confident, professional
                        letter in minutes, not hours.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-purple-700 transition-colors shadow-xl"
                        >
                            <span>Start building</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Why your cover letter matters */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        Why your cover letter matters
                    </h2>
                    <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                        <p>
                            Your resume lists what you have done; your cover letter explains why it
                            matters for this specific role. It is the one place where you can connect
                            the dots between your experience and the problems a company is trying to
                            solve, in your own voice. A strong letter turns a stack of bullet points
                            into a story a hiring manager can picture.
                        </p>
                        <p>
                            Many candidates skip the cover letter or paste in a generic template, which
                            means a thoughtful, tailored letter instantly stands out. When two
                            applicants have similar resumes, the one who clearly understands the role
                            and articulates their fit is far more likely to land the interview.
                        </p>
                        <p>
                            A cover letter also gives you room to address things a resume cannot: a
                            career change, a relocation, a gap in employment, or genuine enthusiasm for
                            the company&apos;s mission. Used well, it reassures the reader and removes
                            doubts before they become reasons to pass.
                        </p>
                    </div>
                </section>

                {/* How to write a cover letter in 4 steps */}
                <section className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 md:p-12 mb-16 md:mb-24 border border-purple-100">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-10 text-gray-900">
                        How to write a cover letter in 4 steps
                    </h2>
                    <ol className="space-y-6 md:space-y-8">
                        {[
                            {
                                title: "Research the role and the company",
                                desc: "Read the job description closely and note the top three or four responsibilities and required skills. Look at the company's website to understand its priorities so you can speak directly to what they care about.",
                            },
                            {
                                title: "Open with a specific, confident hook",
                                desc: "Name the role and the company, then lead with the single most relevant reason you are a strong fit. Skip 'To whom it may concern' and 'I am writing to apply'; start with a result or a point of genuine interest instead.",
                            },
                            {
                                title: "Prove your fit with achievements",
                                desc: "In one or two body paragraphs, match your experience to the role's needs using concrete, measurable results. Quantify impact where you can, and mirror a few exact keywords from the posting so your relevance is obvious.",
                            },
                            {
                                title: "Close with a clear call to action",
                                desc: "Restate your enthusiasm in a sentence, thank the reader, and invite the next step, such as an interview. Keep it brief, confident, and free of typos before you export and send.",
                            },
                        ].map((step, i) => (
                            <li key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-sm sm:text-base">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* What to include */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        What to include
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                        Every effective cover letter follows the same skeleton. Use this checklist to
                        make sure yours has each essential part before you send it.
                    </p>
                    <ul className="space-y-4">
                        {[
                            {
                                label: "Header and greeting",
                                detail: "Your name and contact details at the top, the date, and a greeting addressed to a named hiring manager whenever you can find one.",
                            },
                            {
                                label: "Opening hook",
                                detail: "A first line that names the role, signals your fit, and gives the reader a reason to keep going.",
                            },
                            {
                                label: "Body with achievements",
                                detail: "One or two paragraphs that connect your most relevant, measurable accomplishments to the responsibilities in the job description.",
                            },
                            {
                                label: "Closing and call to action",
                                detail: "A confident sign-off that reiterates your interest, thanks the reader, and invites the next step, followed by a professional closing line.",
                            },
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="flex gap-4 items-start bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all"
                            >
                                <CheckCircle2 className="flex-shrink-0 text-purple-600 mt-0.5" size={22} />
                                <div>
                                    <span className="font-bold text-gray-900">{item.label}.</span>{" "}
                                    <span className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {item.detail}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Cover letter tips that get interviews */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        Cover letter tips that get interviews
                    </h2>
                    <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                        <p>
                            <span className="font-bold text-gray-900">Tailor it to the job description.</span>{" "}
                            Treat each posting as a checklist. Identify the core requirements and address
                            them directly, using the same language the employer used so your relevance is
                            impossible to miss.
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Keep it ATS-friendly.</span>{" "}
                            Use a clean, single-column layout with standard fonts and headings. Avoid
                            tables, graphics, and text boxes that automated systems struggle to parse, and
                            include a few exact keywords from the posting so you rank as a match.
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Lead with results, not duties.</span>{" "}
                            Quantify your impact wherever possible. &quot;Cut onboarding time by 30%&quot;
                            lands far harder than &quot;responsible for onboarding,&quot; and numbers give
                            the reader something concrete to remember.
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Match your cover letter to your resume.</span>{" "}
                            Use the same name, contact details, and visual style across both documents.
                            Browse our{" "}
                            <Link href="/templates" className="font-bold text-purple-600 underline hover:text-purple-700">
                                resume templates
                            </Link>{" "}
                            to keep your application consistent and polished.
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Keep it short and proofread it twice.</span>{" "}
                            Stay on one page, cut filler, and read your letter aloud to catch awkward
                            phrasing. A single typo can undo an otherwise excellent application, so review
                            carefully before you send.
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">Learn from real examples.</span>{" "}
                            Our{" "}
                            <Link href="/blog" className="font-bold text-purple-600 underline hover:text-purple-700">
                                career blog
                            </Link>{" "}
                            breaks down sample letters, ATS strategies, and resume tips you can apply right
                            away.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-purple-700 transition-colors shadow-xl"
                        >
                            <span>Build your cover letter</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Closing CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Write a Cover Letter That Gets Interviews?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Build a tailored, ATS-friendly cover letter and matching resume in minutes with ResumeCraftor.
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        <span>Start Building Now</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <DashboardFooter />
        </div>
    );
}
