import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";
import TemplatesPage from '@/components/views/TemplatesPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Meta" });
    return {
        title: t("templatesTitle"),
        description: t("templatesDescription"),
        alternates: buildAlternates("/templates", locale),
        openGraph: {
            title: t("templatesTitle"),
            description: t("templatesDescription"),
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
