import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ATS Optimization Explained: How Applicant Tracking Systems Work",
    description: "Learn how ATS (Applicant Tracking Systems) process resumes, common compatibility issues, and practical ways to improve ATS optimization without sacrificing readability.",
};

const blogPosts = [
    {
        id: '1',
        title: 'ATS Optimization Explained: How Applicant Tracking Systems Work',
        excerpt: 'Learn how ATS (Applicant Tracking Systems) process resumes, common compatibility issues, and practical ways to improve ATS optimization without sacrificing readability.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-05',
        readTime: '10 min read',
        category: 'Career Tips',
        slug: 'ats-optimization-getting-past-the-robots',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    },
    {
        id: '2',
        title: 'Building Your Personal Brand Through Your Resume (Practical Guide)',
        excerpt: 'Learn how to build a clear personal brand through your resume using focused messaging, consistent structure, and evidence-based experience—without sounding generic.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-05',
        readTime: '8 min read',
        category: 'Branding',
        slug: 'building-your-personal-brand-through-your-resume',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    },
    {
        id: '3',
        title: 'How to Choose the Right Resume Template for Your Career',
        excerpt: 'Learn how to choose the right resume template based on your role, experience level, and professional goals without sacrificing clarity or compatibility.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-06',
        readTime: '7 min read',
        category: 'Resume Guide',
        slug: 'how-to-choose-the-perfect-resume-template',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    {
        id: '4',
        title: 'How to Build a Professional Resume: Step-by-Step Guide',
        excerpt: 'A clear, step-by-step guide to building a professional resume—from structure and summaries to experience, skills, and formatting best practices.',
        author: 'ResumeCraftor Editorial Team',
        date: '2026-02-06',
        readTime: '12 min read',
        category: 'Resume Guide',
        slug: 'how-to-build-a-professional-resume-step-by-step',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f',
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-700">
            <CraftorNavbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
                            Latest Articles
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.id}
                                className="group cursor-pointer rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-500 bg-white"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-purple-600 text-xs font-bold shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-medium">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-50 font-bold">
                                        <span>{post.author}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Create Your Perfect Resume?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Join professionals who use ResumeCraftor to create clean, professional resumes.
                    </p>
                    <Link
                        href="/resume-builder"
                        className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        <span>Start Creating Now</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <DashboardFooter />
        </div>
    );
}
