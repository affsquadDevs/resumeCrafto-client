import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, FileText, Wand2, Download, Zap, Shield, Palette, Globe } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <CraftorNavbar />
            <main className="container mx-auto px-4 py-32 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-12 md:mb-20 px-4 md:px-0">
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                        <Sparkles size={14} className="md:!w-4 md:!h-4" />
                        <span>Simple, Fast, Professional</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                        How ResumeCraftor Works
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
                        Create a professional, ATS-optimized resume in minutes. Our intelligent platform guides you through every step of building a resume that gets you hired.
                    </p>
                </div>

                {/* 3-Step Process */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: FileText,
                            step: "01",
                            title: "Choose Your Template",
                            desc: "Select from our curated collection of modern, ATS-friendly resume templates designed by professionals."
                        },
                        {
                            icon: Wand2,
                            step: "02",
                            title: "Build & Customize",
                            desc: "Use our intuitive drag-and-drop editor to add your experience, skills, and achievements with ease."
                        },
                        {
                            icon: Download,
                            step: "03",
                            title: "Export & Apply",
                            desc: "Download your polished resume as a PDF and start applying to your dream jobs with confidence."
                        }
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all h-full">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={28} />
                                </div>
                                <div className="text-xs font-black text-purple-300 tracking-widest mb-3">STEP {item.step}</div>
                                <h3 className="text-2xl font-black mb-4 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Features */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">Powerful Features</h2>
                        <p className="text-gray-600 text-lg">Everything you need to create a winning resume</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Zap,
                                title: "Lightning Fast",
                                desc: "Create a professional resume in under 10 minutes",
                                color: "text-yellow-600 bg-yellow-50"
                            },
                            {
                                icon: Shield,
                                title: "ATS-Optimized",
                                desc: "Pass applicant tracking systems with optimized formatting",
                                color: "text-green-600 bg-green-50"
                            },
                            {
                                icon: Palette,
                                title: "Fully Customizable",
                                desc: "Drag, drop, and style every element to match your brand",
                                color: "text-purple-600 bg-purple-50"
                            },
                            {
                                icon: Globe,
                                title: "Cloud Sync",
                                desc: "Access your resumes anywhere, anytime, on any device",
                                color: "text-blue-600 bg-blue-50"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon size={24} />
                                </div>
                                <h4 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Process */}
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 md:p-12 mb-12 md:mb-24 border border-purple-100">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-12 text-center text-gray-900">
                        The Complete Process
                    </h2>

                    <div className="space-y-6 md:space-y-8">
                        {[
                            {
                                title: "Sign Up & Set Up Your Profile",
                                desc: "Create your free account in seconds. No credit card required. Set your preferences and get ready to build."
                            },
                            {
                                title: "Browse Professional Templates",
                                desc: "Explore our collection of modern resume templates. Each one is designed to be ATS-friendly and visually stunning."
                            },
                            {
                                title: "Use the Smart Editor",
                                desc: "Our intelligent editor guides you with suggestions, auto-formatting, and real-time previews. Add sections, reorder content, and customize colors with ease."
                            },
                            {
                                title: "Add Your Experience & Skills",
                                desc: "Fill in your work history, education, skills, and achievements. Use our built-in suggestions to write compelling bullet points."
                            },
                            {
                                title: "Preview & Refine",
                                desc: "See exactly how your resume will look. Make adjustments until it's perfect. Our live preview ensures what you see is what you get."
                            },
                            {
                                title: "Download as PDF",
                                desc: "Export your resume as a high-quality PDF ready for applications. Your formatting stays intact across all devices and platforms."
                            }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-sm sm:text-base">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-6 md:p-12 text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4">
                        Ready to Build Your Resume?
                    </h2>

                    <p className="text-purple-100 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-sm sm:max-w-xl md:max-w-2xl mx-auto">
                        Join thousands of professionals who landed their dream jobs with ResumeCraftor
                    </p>

                    <a
                        href="/resume-builder"
                        className="inline-block bg-white text-purple-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs sm:text-sm md:text-sm uppercase tracking-wider hover:bg-purple-50 transition-colors shadow-xl"
                    >
                        Start Building Now →
                    </a>
                </div>
            </main>
            <DashboardFooter />
        </div>
    );
}
