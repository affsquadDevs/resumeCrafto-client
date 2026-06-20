import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { roles } from "@/lib/roles";

export const metadata: Metadata = {
    title: "Resume Examples by Job & Role",
    description:
        "Browse free, ATS-friendly resume examples by job and role. Find role-specific tips, keywords, and templates for software engineers, designers, accountants, managers, and more.",
    openGraph: {
        title: "Resume Examples by Job & Role",
        description:
            "Browse free, ATS-friendly resume examples by job and role, with tailored tips, keywords, and templates for every career.",
        url: "https://resumecraftor.com/resume-examples",
        type: "website",
    },
    alternates: {
        canonical: "https://resumecraftor.com/resume-examples",
    },
};

export default async function ResumeExamplesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("ResumeExamplesPage");

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://resumecraftor.com/",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Resume Examples",
                "item": "https://resumecraftor.com/resume-examples",
            },
        ],
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Resume Examples by Job & Role",
        "url": "https://resumecraftor.com/resume-examples",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": roles.map((role, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": `${role.title} Resume Template`,
                "url": `https://resumecraftor.com/resume-templates/${role.slug}`,
            })),
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <CraftorNavbar />

            <main className="container mx-auto px-4 py-32 max-w-6xl">
                {/* Hero */}
                <div className="text-center mb-12 md:mb-20 px-4 md:px-0">
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                        <span>{t("heroBadge")}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                        {t("heroTitle")}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
                        {t("heroDescription")}
                    </p>
                </div>

                {/* Role grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {roles.map((role) => (
                        <Link
                            key={role.slug}
                            href={`/resume-templates/${role.slug}`}
                            aria-label={t("roleCardAriaLabel", { role: role.title })}
                            className="group rounded-3xl border border-gray-100 p-8 bg-white hover:shadow-2xl hover:border-purple-200 transition-all duration-300"
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold mb-4">
                                {role.category}
                            </span>
                            <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                                {role.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {role.summary}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Internal links */}
                <div className="text-center mb-24 border-t border-gray-100 pt-12">
                    <p className="text-gray-600 leading-relaxed">
                        {t.rich("internalLinks", {
                            templatesLink: (chunks) => (
                                <Link
                                    href="/templates"
                                    className="font-bold text-purple-700 underline hover:text-purple-900"
                                >
                                    {chunks}
                                </Link>
                            ),
                            blogLink: (chunks) => (
                                <Link
                                    href="/blog"
                                    className="font-bold text-purple-700 underline hover:text-purple-900"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-6 md:p-12 text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">
                        {t("ctaTitle")}
                    </h2>
                    <p className="text-purple-100 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                        {t("ctaDescription")}
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-block bg-white text-purple-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs sm:text-sm md:text-sm uppercase tracking-wider hover:bg-purple-50 transition-colors shadow-xl"
                    >
                        {t("ctaButton")}
                    </Link>
                </div>
            </main>

            <DashboardFooter />
        </div>
    );
}
