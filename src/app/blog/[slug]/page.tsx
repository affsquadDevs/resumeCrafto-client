import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

type BlogPost = {
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    image: string;
    content: React.ReactNode;
};

const postsContent: Record<string, BlogPost> = {
    "future-of-resume-design-ai": {
        title: "The Future of Resume Design: AI-Powered Personalization",
        category: "Design Trends",
        date: "2026-01-28",
        author: "Sarah Johnson",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        content: (
            <>
                <p>
                    Artificial Intelligence is rapidly transforming how resumes are created,
                    reviewed, and optimized. What once took hours of manual tailoring can now
                    be done in seconds.
                </p>

                <h3>AI Personalization</h3>
                <p>
                    Modern AI tools analyze job descriptions and automatically adapt resumes
                    to match required skills, keywords, and even tone.
                </p>

                <h3>Smarter Design Decisions</h3>
                <p>
                    AI doesn’t just change text — it suggests layouts, spacing, and visual
                    hierarchy based on industry standards.
                </p>

                <p>
                    The future belongs to resumes that combine automation with human
                    authenticity.
                </p>
            </>
        ),
    },

    "resume-mistakes-cost-interview": {
        title: "10 Resume Mistakes That Cost You the Interview",
        category: "Career Tips",
        date: "2026-01-25",
        author: "Michael Chen",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
        content: (
            <>
                <p>
                    If you’re sending resumes and getting no replies, the problem might not
                    be your experience — but how it’s presented.
                </p>

                <h3>Common Fatal Errors</h3>
                <ul>
                    <li>Typos and grammar mistakes</li>
                    <li>Generic summaries</li>
                    <li>Ignoring ATS requirements</li>
                    <li>Overdesigned layouts</li>
                </ul>

                <p>
                    Fixing these mistakes alone can dramatically increase interview calls.
                </p>
            </>
        ),
    },

    "choose-perfect-resume-template": {
        title: "How to Choose the Perfect Resume Template",
        category: "Templates",
        date: "2026-01-22",
        author: "Emily Rodriguez",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        content: (
            <>
                <p>
                    A resume template sets the first impression before a recruiter reads a
                    single word.
                </p>

                <h3>Match Your Industry</h3>
                <p>
                    Creative roles allow bold layouts, while corporate positions demand clean
                    and minimal structure.
                </p>

                <h3>Focus on Readability</h3>
                <p>
                    White space, font size, and clear sections matter more than fancy visuals.
                </p>
            </>
        ),
    },

    "psychology-color-resume-design": {
        title: "The Psychology of Color in Resume Design",
        category: "Design Tips",
        date: "2026-01-20",
        author: "David Park",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
        content: (
            <>
                <p>
                    Colors influence emotions and perception. The right palette can subtly
                    boost your credibility.
                </p>

                <h3>Best Resume Colors</h3>
                <ul>
                    <li><strong>Blue</strong> — trust and professionalism</li>
                    <li><strong>Green</strong> — growth and balance</li>
                    <li><strong>Black & White</strong> — clarity and elegance</li>
                </ul>

                <p>
                    Use colors as accents — never let them overpower your content.
                </p>
            </>
        ),
    },

    "ats-optimization-getting-past-robots": {
        title: "ATS Optimization: Getting Past the Robots",
        category: "Career Tips",
        date: "2026-01-18",
        author: "Sarah Johnson",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        content: (
            <>
                <p>
                    Up to 75% of resumes never reach human eyes due to ATS filters.
                </p>

                <h3>ATS Rules</h3>
                <ol>
                    <li>Use job-specific keywords</li>
                    <li>Avoid tables and columns</li>
                    <li>Stick to standard headings</li>
                </ol>

                <p>
                    Design smart — not fancy — if you want results.
                </p>
            </>
        ),
    },
};

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = postsContent[slug];

    if (!post) notFound();

    return (
        <div className="min-h-screen bg-white">
            <CraftorNavbar />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 font-bold mb-8"
                    >
                        <ArrowLeft size={20} />
                        Back to Articles
                    </Link>

                    <header className="mb-10">
                        <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-bold uppercase">
                            {post.category}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-6">
                            {post.title}
                        </h1>

                        <p className="text-gray-500 mt-4">
                            {post.author} • {post.readTime}
                        </p>
                    </header>

                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <article className="prose prose-lg prose-purple max-w-none">
                        {post.content}
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
