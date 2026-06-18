import type { Metadata } from "next";
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
  return (
    <>
      <WebApplicationSchema />
      <section className="sr-only">
        <h1>Free Online Resume Builder</h1>
        <p>ResumeCraftor is a free online resume and CV builder that helps you create a professional, ATS-optimized resume in minutes. Start from a <a href="/templates">professional resume template</a>, customize every section with an intuitive drag-and-drop editor, and export a polished PDF. New to resumes? Read our <a href="/blog">resume writing and ATS guides</a>.</p>
      </section>
      <EditorPage />
    </>
  );
}
