import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Contact Us",
        description: "Contact the ResumeCraftor team for support, feedback, or account questions. We're happy to help you build a better resume.",
        alternates: buildAlternates("/contact", locale),
        openGraph: {
            title: "Contact Us",
            description: "Contact the ResumeCraftor team for support, feedback, or account questions.",
            url: localizedUrl("/contact", locale),
            type: "website",
            locale: ogLocale(locale),
        },
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("ContactPage");
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30 overflow-hidden">
            <CraftorNavbar />
            <main className="container mx-auto px-4 py-32 relative">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-neutral-400 mb-12">
                        {t("subtitle")}
                    </p>

                    <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
                        <p className="mb-4 text-neutral-300">{t("primaryContactLabel")}</p>
                        <a href="mailto:hello@resumecraftor.com" className="text-2xl font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                            hello@resumecraftor.com
                        </a>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-sm text-neutral-500 leading-relaxed max-w-lg mx-auto">
                                {t.rich("disclaimer", {
                                    privacyLink: (chunks) => (
                                        <a href="/privacy-policy" className="text-purple-400/80 hover:text-purple-300 transition-colors">{chunks}</a>
                                    ),
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <DashboardFooter />
        </div>
    );
}
