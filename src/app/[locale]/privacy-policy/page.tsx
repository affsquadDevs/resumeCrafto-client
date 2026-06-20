import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read the ResumeCraftor privacy policy: what data we collect, how we use it, and your rights.",
    alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
    const t = useTranslations("PrivacyPolicyPage");
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <CraftorNavbar />
            <main className="container max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {t("heroTitle")}
                </h1>
                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    <p className="text-neutral-300 leading-relaxed">
                        {t("intro")}
                    </p>
                    <p className="text-neutral-400 text-sm">{t("lastUpdated", { date: new Date().toLocaleDateString() })}</p>

                    <section>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("commitment")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("collectTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("collectIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t.rich("collectAccount", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("collectResume", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("collectUsage", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("collectPayment", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("collectCommunications", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("useTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("useIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t("useProvide")}</li>
                            <li>{t("useDocuments")}</li>
                            <li>{t("useAuthenticate")}</li>
                            <li>{t("usePayments")}</li>
                            <li>{t("useNotifications")}</li>
                            <li>{t("useImprove")}</li>
                            <li>{t("useSupport")}</li>
                            <li>{t("useMarketing")}</li>
                            <li>{t("useLegal")}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("legalBasisTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("legalBasisIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t.rich("legalContract", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("legalConsent", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("legalInterests", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("legalObligations", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("sharingTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("sharingIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t.rich("sharingProviders", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("sharingTransfers", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("sharingLegal", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("sharingConsent", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed mt-4">
                            {t("sharingNoSell")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("retentionTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("retentionBody")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("rightsTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("rightsIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t.rich("rightsAccess", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsRectification", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsErasure", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsRestriction", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsPortability", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsObjection", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsWithdraw", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                            <li>{t.rich("rightsComplain", { strong: (chunks) => <strong className="text-white">{chunks}</strong> })}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("securityTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("securityBody")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("cookiesTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {t("cookiesIntro")}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>{t("cookiesSession")}</li>
                            <li>{t("cookiesPreferences")}</li>
                            <li>{t("cookiesAnalyze")}</li>
                            <li>{t("cookiesPersonalized")}</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed mt-4">
                            {t("cookiesControl")}
                        </p>
                        <p className="text-neutral-300 leading-relaxed mt-4">
                            {t.rich("cookiesAdvertising", { link: (chunks) => <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">{chunks}</a> })}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("thirdPartyTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("thirdPartyBody")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("transfersTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("transfersBody")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("childrenTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("childrenBody")}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("changesTitle")}</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {t("changesBody")}
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

                    <section className="border-t border-neutral-800 pt-8 mt-12">
                        <p className="text-neutral-400 text-sm italic">
                            {t("compliance")}
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
