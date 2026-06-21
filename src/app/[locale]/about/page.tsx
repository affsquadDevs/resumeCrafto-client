import React from 'react';
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CraftorNavbar } from '@/components/dashboard/CraftorNavbar';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta" });
    return {
        title: t("aboutTitle"),
        description: t("aboutDescription"),
        alternates: buildAlternates("/about", locale),
        openGraph: {
            title: t("aboutTitle"),
            description: t("aboutDescription"),
            url: localizedUrl("/about", locale),
            type: "website",
            locale: ogLocale(locale),
        },
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("AboutPage");
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <CraftorNavbar />

            <main className="pt-24 md:pt-32">
                {/* Hero */}
                <section className="px-1 md:px-6 lg:px-10 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gray-950 text-white rounded-3xl px-8 py-16 md:px-16 md:py-24">
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight leading-snug md:leading-[1.1] mb-6 md:mb-10">
                                {t("heroTitleLine1")}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    {t("heroTitleLine2")}
                                </span>
                            </h1>

                            <p className="block md:hidden text-gray-400 text-lg leading-relaxed font-medium">
                                {t("heroSubtitleMobile")}
                            </p>

                            <p className="hidden md:block max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                                {t("heroSubtitleDesktop")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="px-6 lg:px-10 pb-24">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            {t("storyTitle")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("storyParagraph1")}                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("storyParagraph2")}                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t.rich("storyCta", {
                                templatesLink: (chunks) => (
                                    <Link href="/templates" className="text-purple-600 font-semibold hover:text-purple-700 underline">
                                        {chunks}
                                    </Link>
                                ),
                                guidesLink: (chunks) => (
                                    <Link href="/blog" className="text-purple-600 font-semibold hover:text-purple-700 underline">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                    </div>
                </section>

                {/* Principles */}
                <section className="px-6 lg:px-10 pb-24">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            {t("principlesTitle")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("principlesParagraph1")}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("principlesParagraph2")}
                        </p>
                    </div>
                </section>

                {/* Team */}
                <section className="px-6 lg:px-10 pb-32">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            {t("teamTitle")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("teamParagraph1")}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t("teamParagraph2")}
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 lg:px-10 pb-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-10">
                            {t("ctaTitle")}
                        </h2>
                        <Link
                            href="/resume-builder"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-950 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 transition"
                        >
                            {t("ctaButton")}
                            <ArrowRight size={22} />
                        </Link>
                    </div>
                </section>
            </main>

            <DashboardFooter />
        </div>
    );
}
