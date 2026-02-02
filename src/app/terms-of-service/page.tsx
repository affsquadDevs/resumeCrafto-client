import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <CraftorNavbar />
            <main className="container max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-3xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        Please read these terms carefully before using ResumeCraftor.
                    </p>
                    {/* Content would go here */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. How to Use ResumeCraftor</h2>
                            <p className="text-neutral-300 mb-4">
                                ResumeCraftor is designed to be intuitive and easy to use. Here are the basic rules for using our platform:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                                <li>**Create an Account:** While you can try the editor as a guest, we recommend creating an account to save your progress and access all features.</li>
                                <li>**Respect Copyright:** improved content templates are provided for your personal use. Do not redistribute or sell our templates or designs as your own.</li>
                                <li>**Accurate Information:** You agree to provide accurate and truthful information in your resumes and CVs. We are not responsible for any consequences resulting from false information.</li>
                                <li>**Personal Use Only:** Our free service is intended for personal, non-commercial use.</li>
                            </ul>
                        </section>

                        <section className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <span className="text-3xl">⚠️</span> Risk Warning
                            </h2>
                            <p className="text-red-200 mb-4">
                                Please be aware of the following risks when using any online resume builder, including ResumeCraftor:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-red-200">
                                <li>**Data Privacy:** While we implement strong security measures, no online service is 100% secure. Avoid including highly sensitive personal information (like social security numbers or bank details) in your resume drafts.</li>
                                <li>**Job Application Outcomes:** We provide tools to create professional resumes, but we explicitly **do not guarantee** that using our service will result in job offers, interviews, or employment. Employment decisions are solely at the discretion of employers.</li>
                                <li>**ATS Compatibility:** While we strive for high ATS (Applicant Tracking System) compatibility, ATS software varies widely and we cannot guarantee 100% parsing accuracy on every single system.</li>
                            </ul>
                        </section>

                        <section className="bg-purple-900/20 border border-purple-500/20 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-purple-300 mb-4">Service Model & Monetization</h2>
                            <p className="text-neutral-300 mb-4">
                                ResumeCraftor is committed to providing a powerful free tool for job seekers. To sustain our operations and keep the core features free, please note:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                                <li>**Free to Use:** The core resume building functionality is free of charge.</li>
                                <li>**Ad-Supported:** Our website may display third-party advertisements. These ads help cover our server and development costs.</li>
                                <li>**Partner Promotions:** We may occasionally feature promotional offers from our partners (e.g., career coaching services, job boards). These will be clearly identified.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Acceptance of Terms</h2>
                            <p className="text-neutral-300">
                                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
