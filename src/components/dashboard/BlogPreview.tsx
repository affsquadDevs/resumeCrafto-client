import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export const BlogPreview = () => {
    // Take the 3 latest posts
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Latest from <span className="text-purple-600">Our Blog</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed">
                            Expert advice on resume writing, career strategy, and standing out in a competitive job market.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-purple-600 font-bold text-lg hover:text-purple-700 transition-colors"
                    >
                        <span>View all articles</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.id}
                            title={post.title}
                            aria-label={`Read article: ${post.title}`}
                            className="group flex flex-col rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-500 bg-white h-full"
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
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-medium text-sm flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                                        <span>Read Article</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <span className="text-xs text-gray-400 font-bold">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
