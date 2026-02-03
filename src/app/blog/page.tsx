import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

// Placeholder blog posts - replace with actual data from CMS or database
const featuredPost = {
    id: '1',
    title: 'The Future of Resume Design: AI-Powered Personalization',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way professionals create and customize their resumes for maximum impact.',
    author: 'Sarah Johnson',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'Design Trends',
    slug: 'future-of-resume-design-ai'
};

const blogPosts = [
    {
        id: '2',
        title: '10 Resume Mistakes That Cost You the Interview',
        excerpt:
            'Learn about the most common resume pitfalls and how to avoid them to increase your chances of landing your dream job.',
        author: 'Michael Chen',
        date: '2026-01-25',
        readTime: '6 min read',
        category: 'Career Tips',
        slug: 'resume-mistakes-cost-interview',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    {
        id: '3',
        title: 'How to Choose the Perfect Resume Template',
        excerpt:
            'A comprehensive guide to selecting a resume template that matches your industry, experience level, and personal brand.',
        author: 'Emily Rodriguez',
        date: '2026-01-22',
        readTime: '5 min read',
        category: 'Templates',
        slug: 'choose-perfect-resume-template',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    },
    {
        id: '4',
        title: 'The Psychology of Color in Resume Design',
        excerpt:
            "Understand how different colors affect recruiters' perceptions and learn to use color psychology to your advantage.",
        author: 'David Park',
        date: '2026-01-20',
        readTime: '7 min read',
        category: 'Design Tips',
        slug: 'psychology-color-resume-design',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
    },
    {
        id: '5',
        title: 'ATS Optimization: Getting Past the Robots',
        excerpt:
            'Master the art of creating ATS-friendly resumes that pass automated screening while maintaining visual appeal.',
        author: 'Sarah Johnson',
        date: '2026-01-18',
        readTime: '9 min read',
        category: 'Career Tips',
        slug: 'ats-optimization-getting-past-robots',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    },
    {
        id: '6',
        title: 'Building Your Personal Brand Through Your Resume',
        excerpt:
            'Transform your resume from a simple document into a powerful personal branding tool that tells your unique story.',
        author: 'Michael Chen',
        date: '2026-01-15',
        readTime: '6 min read',
        category: 'Personal Branding',
        slug: 'building-personal-brand-resume',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    },
];

const categories = ['All Posts', 'Career Tips', 'Design Tips', 'Templates', 'Design Trends', 'Personal Branding'];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <CraftorNavbar />


            {/* Blog Posts Grid */}
            <section className="py-16 pt-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black text-gray-900 mb-8">Latest Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.id}
                                className="group cursor-pointer rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                            >
                                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-bold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                                        <span className="font-bold">{post.author}</span>
                                        <div className="flex items-center gap-3">
                                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="max-w-4xl mx-auto text-center relative">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Create Your Perfect Resume?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Join thousands of professionals who've landed their dream jobs with ResumeCraftor.
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
