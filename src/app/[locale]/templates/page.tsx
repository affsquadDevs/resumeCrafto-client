import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TemplatesPage from '@/components/views/TemplatesPage';

export const metadata: Metadata = {
    title: "Professional Resume Templates (ATS-Friendly)",
    description: "Browse free, professionally designed, ATS-friendly resume templates for every role and experience level. Pick one and customize it in minutes with ResumeCraftor.",
    alternates: { canonical: "/templates" },
    openGraph: {
        title: "Professional Resume Templates (ATS-Friendly) | ResumeCraftor",
        description: "Browse free, ATS-friendly resume templates for every role.",
        url: "https://resumecraftor.com/templates",
        type: "website"
    }
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("TemplatesIndexPage");
    return (
        <>
            <section className="sr-only">
                <h1>{t("srHeading")}</h1>
                <p>{t("srDescription")}</p>
            </section>
            <TemplatesPage />
        </>
    );
}
