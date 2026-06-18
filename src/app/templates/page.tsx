import type { Metadata } from "next";
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

export default function Page() {
    return (
        <>
            <section className="sr-only">
                <h1>Professional Resume Templates</h1>
                <p>Choose from a library of free, ATS-friendly resume templates designed for every career stage — from student and entry-level resumes to senior, executive, and creative roles. Every ResumeCraftor template uses clean, single-column-friendly formatting that applicant tracking systems can parse, and you can customize colors, fonts, and layout in minutes before exporting a polished PDF.</p>
            </section>
            <TemplatesPage />
        </>
    );
}
