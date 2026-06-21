import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";
import TemplatesPage from '@/components/views/TemplatesPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Professional Resume Templates (ATS-Friendly)",
        description: "Browse free, professionally designed, ATS-friendly resume templates for every role and experience level. Pick one and customize it in minutes with ResumeCraftor.",
        alternates: buildAlternates("/templates", locale),
        openGraph: {
            title: "Professional Resume Templates (ATS-Friendly) | ResumeCraftor",
            description: "Browse free, ATS-friendly resume templates for every role.",
            url: localizedUrl("/templates", locale),
            locale: ogLocale(locale),
            type: "website"
        }
    };
}

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
