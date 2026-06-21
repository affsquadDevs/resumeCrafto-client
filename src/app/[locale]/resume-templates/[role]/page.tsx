import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { roles, getLocalizedRole } from "@/lib/roles";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

export async function generateStaticParams() {
    return roles.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; role: string }>;
}): Promise<Metadata> {
    const { locale, role: slug } = await params;
    const role = getLocalizedRole(slug, locale);

    if (!role) {
        return { title: "Resume Template Not Found" };
    }

    const description = `${role.summary} Use our free, ATS-friendly ${role.title} resume template to build a polished resume in minutes.`;

    return {
        title: `${role.title} Resume Template (Free & ATS-Friendly)`,
        description,
        openGraph: {
            title: `${role.title} Resume Template (Free & ATS-Friendly)`,
            description,
            url: localizedUrl(`/resume-templates/${role.slug}`, locale),
            type: "website",
            locale: ogLocale(locale),
        },
        alternates: buildAlternates(`/resume-templates/${role.slug}`, locale),
    };
}

export default async function ResumeTemplateRolePage({
    params,
}: {
    params: Promise<{ locale: string; role: string }>;
}) {
    const { locale, role: slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("RoleTemplatePage");
    const role = getLocalizedRole(slug, locale);

    if (!role) {
        notFound();
    }

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
                "name": "Resume Templates",
                "item": "https://resumecraftor.com/resume-examples",
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `${role.title} Resume Template`,
                "item": `https://resumecraftor.com/resume-templates/${role.slug}`,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <CraftorNavbar />

            <main className="container mx-auto px-4 py-32 max-w-4xl">
                {/* Hero */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-6">
                        <span>{role.category}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                        {t("heroTitle", { role: role.title })}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                        {role.intro}
                    </p>
                </div>

                {/* Primary CTA */}
                <div className="mb-16">
                    <Link
                        href="/resume-builder"
                        className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:opacity-95 transition-opacity shadow-xl"
                    >
                        {t("buildCta", { role: role.title })}
                    </Link>
                </div>

                {/* Key skills & keywords */}
                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-gray-900">
                        {t("keySkillsTitle")}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {t("keySkillsDescription", { role: role.title })}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {role.keySkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 rounded-full bg-white border border-gray-100 text-gray-700 text-sm font-bold shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Resume tips */}
                <section className="mb-16 bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 md:p-10 border border-purple-100">
                    <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900">
                        {t("tipsTitle", { role: role.title })}
                    </h2>
                    <div className="space-y-6">
                        {role.tips.map((tip, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-sm">
                                    {i + 1}
                                </div>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-1">
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Relevant templates */}
                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-gray-900">
                        {t("recommendedTitle", { role: role.title })}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {role.templateNames.map((name) => (
                            <div
                                key={name}
                                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all"
                            >
                                <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/templates"
                        className="inline-block bg-white text-purple-700 border-2 border-purple-600 px-6 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:bg-purple-50 transition-colors"
                    >
                        {t("browseAll")}
                    </Link>
                </section>

                {/* Internal links */}
                <section className="mb-16 border-t border-gray-100 pt-10">
                    <p className="text-gray-600 leading-relaxed">
                        {t.rich("internalLinks", {
                            examplesLink: (chunks) => (
                                <Link
                                    href="/resume-examples"
                                    className="font-bold text-purple-700 underline hover:text-purple-900"
                                >
                                    {chunks}
                                </Link>
                            ),
                            guidesLink: (chunks) => (
                                <Link
                                    href="/blog"
                                    className="font-bold text-purple-700 underline hover:text-purple-900"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </section>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-6 md:p-12 text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">
                        {t("ctaTitle", { role: role.title })}
                    </h2>
                    <p className="text-purple-100 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                        {t("ctaDescription")}
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-block bg-white text-purple-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs sm:text-sm md:text-sm uppercase tracking-wider hover:bg-purple-50 transition-colors shadow-xl"
                    >
                        {t("buildCta", { role: role.title })}
                    </Link>
                </div>
            </main>

            <DashboardFooter />
        </div>
    );
}
