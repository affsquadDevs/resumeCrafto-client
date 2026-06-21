import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta" });
    return {
        title: t("termsTitle"),
        description: t("termsDescription"),
        alternates: buildAlternates("/terms-of-service", locale),
        openGraph: {
            title: t("termsTitle"),
            description: t("termsDescription"),
            url: localizedUrl("/terms-of-service", locale),
            locale: ogLocale(locale),
            type: "website",
        },
    };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("TermsOfServicePage");
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <CraftorNavbar />
            <main className="container max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("heroTitle")}</h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-neutral-400">{t("lastUpdated", { date: new Date().toLocaleDateString() })}</p>
                    <p>
                        {t("intro")}
                    </p>
                    {/* Content would go here */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t("howToUseTitle")}</h2>
                            <p className="text-neutral-300 mb-4">
                                {t("howToUseIntro")}
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                                <li>{t("howToUseCreateAccount")}</li>
                                <li>{t("howToUseCopyright")}</li>
                                <li>{t("howToUseAccurate")}</li>
                                <li>{t("howToUsePersonal")}</li>
                            </ul>
                        </section>

                        <section className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <span className="text-3xl">⚠️</span> {t("riskWarningTitle")}
                            </h2>
                            <p className="text-red-200 mb-4">
                                {t("riskWarningIntro")}
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-red-200">
                                <li>{t("riskDataPrivacy")}</li>
                                <li>{t("riskJobOutcomes")}</li>
                                <li>{t("riskAts")}</li>
                            </ul>
                        </section>

                        <section className="bg-purple-900/20 border border-purple-500/20 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-purple-300 mb-4">{t("serviceModelTitle")}</h2>
                            <p className="text-neutral-300 mb-4">
                                {t("serviceModelIntro")}
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                                <li>{t("serviceModelFree")}</li>
                                <li>{t("serviceModelAdSupported")}</li>
                                <li>{t("serviceModelPartners")}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t("acceptanceTitle")}</h2>
                            <p className="text-neutral-300">
                                {t("acceptanceBody")}
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("contactTitle")}</h2>
                            <p className="text-neutral-300 leading-relaxed mb-4">
                                {t("contactIntro")}
                            </p>
                            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                                <p className="text-white font-semibold mb-2">{t("contactTeam")}</p>
                                <p className="text-neutral-300">
                                    {t("contactEmailLabel")} <a href="mailto:hello@resumecraftor.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                        hello@resumecraftor.com
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <DashboardFooter />
        </div>
    );
}
