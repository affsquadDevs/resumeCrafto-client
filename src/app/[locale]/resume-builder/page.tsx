import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, ogLocale, localizedUrl } from "@/lib/seo";
import EditorPage from '@/components/views/EditorPage';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("resumeBuilderTitle"),
    description: t("resumeBuilderDescription"),
    alternates: buildAlternates("/resume-builder", locale),
    openGraph: {
      title: t("resumeBuilderTitle"),
      description: t("resumeBuilderDescription"),
      url: localizedUrl("/resume-builder", locale),
      locale: ogLocale(locale),
      type: "website"
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ResumeBuilderPage");
  return (
    <>
      <WebApplicationSchema />
      <section className="sr-only">
        <h1>{t("srHeading")}</h1>
        <p>
          {t.rich("srDescription", {
            templatesLink: (chunks) => <a href="/templates">{chunks}</a>,
            blogLink: (chunks) => <a href="/blog">{chunks}</a>,
          })}
        </p>
      </section>
      <EditorPage />
    </>
  );
}
