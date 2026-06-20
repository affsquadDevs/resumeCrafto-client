import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import EditorPage from '@/components/views/EditorPage';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export const metadata: Metadata = {
  title: "Free Online Resume Builder",
  description: "Build a professional, ATS-optimized resume online for free. Drag-and-drop editor, professional templates, and instant PDF export — no design skills needed.",
  alternates: { canonical: "/resume-builder" },
  openGraph: {
    title: "Free Online Resume Builder | ResumeCraftor",
    description: "Build a professional, ATS-optimized resume online for free.",
    url: "https://resumecraftor.com/resume-builder",
    type: "website"
  }
};

export default function Page() {
  const t = useTranslations("ResumeBuilderPage");
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
