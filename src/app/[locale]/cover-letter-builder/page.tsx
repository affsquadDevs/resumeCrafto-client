import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
    const t = useTranslations("CoverLetterBuilderPage");

    const steps = [
        { titleKey: "step1Title", descKey: "step1Desc" },
        { titleKey: "step2Title", descKey: "step2Desc" },
        { titleKey: "step3Title", descKey: "step3Desc" },
        { titleKey: "step4Title", descKey: "step4Desc" },
    ];

    const includeItems = [
        { labelKey: "includeHeaderLabel", detailKey: "includeHeaderDetail" },
        { labelKey: "includeOpeningLabel", detailKey: "includeOpeningDetail" },
        { labelKey: "includeBodyLabel", detailKey: "includeBodyDetail" },
        { labelKey: "includeClosingLabel", detailKey: "includeClosingDetail" },
    ];

    const faqItems = [
        { questionKey: "faq1Question", answerKey: "faq1Answer" },
        { questionKey: "faq2Question", answerKey: "faq2Answer" },
        { questionKey: "faq3Question", answerKey: "faq3Answer" },
        { questionKey: "faq4Question", answerKey: "faq4Answer" },
        { questionKey: "faq5Question", answerKey: "faq5Answer" },
    ];

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
                        <span>{t("heroBadge")}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                        {t("heroTitle")}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {t("heroDescription")}
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-purple-700 transition-colors shadow-xl"
                        >
                            <span>{t("heroCta")}</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Why your cover letter matters */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        {t("whyTitle")}
                    </h2>
                    <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                        <p>{t("whyParagraph1")}</p>
                        <p>{t("whyParagraph2")}</p>
                        <p>{t("whyParagraph3")}</p>
                    </div>
                </section>

                {/* How to write a cover letter in 4 steps */}
                <section className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 md:p-12 mb-16 md:mb-24 border border-purple-100">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-10 text-gray-900">
                        {t("stepsTitle")}
                    </h2>
                    <ol className="space-y-6 md:space-y-8">
                        {steps.map((step, i) => (
                            <li key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-sm sm:text-base">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-900">
                                        {t(step.titleKey)}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {t(step.descKey)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* What to include */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        {t("includeTitle")}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                        {t("includeIntro")}
                    </p>
                    <ul className="space-y-4">
                        {includeItems.map((item, i) => (
                            <li
                                key={i}
                                className="flex gap-4 items-start bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all"
                            >
                                <CheckCircle2 className="flex-shrink-0 text-purple-600 mt-0.5" size={22} />
                                <div>
                                    <span className="font-bold text-gray-900">{t(item.labelKey)}.</span>{" "}
                                    <span className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {t(item.detailKey)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Cover letter tips that get interviews */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 text-gray-900">
                        {t("tipsTitle")}
                    </h2>
                    <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                        <p>
                            <span className="font-bold text-gray-900">{t("tipTailorLabel")}</span>{" "}
                            {t("tipTailorText")}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">{t("tipAtsLabel")}</span>{" "}
                            {t("tipAtsText")}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">{t("tipResultsLabel")}</span>{" "}
                            {t("tipResultsText")}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">{t("tipMatchLabel")}</span>{" "}
                            {t.rich("tipMatchText", {
                                link: (chunks) => (
                                    <Link href="/templates" className="font-bold text-purple-600 underline hover:text-purple-700">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">{t("tipShortLabel")}</span>{" "}
                            {t("tipShortText")}
                        </p>
                        <p>
                            <span className="font-bold text-gray-900">{t("tipExamplesLabel")}</span>{" "}
                            {t.rich("tipExamplesText", {
                                link: (chunks) => (
                                    <Link href="/blog" className="font-bold text-purple-600 underline hover:text-purple-700">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-purple-700 transition-colors shadow-xl"
                        >
                            <span>{t("tipsCta")}</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-gray-900">
                        {t("faqTitle")}
                    </h2>
                    <div className="space-y-6">
                        {faqItems.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">
                                    {t(faq.questionKey)}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {t(faq.answerKey)}
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
                        {t("ctaTitle")}
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        {t("ctaDescription")}
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        <span>{t("ctaButton")}</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <DashboardFooter />
        </div>
    );
}
