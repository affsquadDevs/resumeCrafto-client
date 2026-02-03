import { Zap, Shield, Palette, Cloud, Download, Users, Clock, Star } from 'lucide-react';

export const FeaturesGrid = () => {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Create professional resumes in under 10 minutes with our streamlined editor",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Shield,
            title: "ATS-Optimized",
            description: "Pass applicant tracking systems with templates designed for maximum compatibility",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Palette,
            title: "Fully Customizable",
            description: "Drag, drop, and style every element to match your personal brand",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Cloud,
            title: "Cloud Sync",
            description: "Access your resumes anywhere, anytime, on any device with auto-save",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Download,
            title: "PDF Export",
            description: "Download high-quality PDFs ready for job applications",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: Users,
            title: "Multiple Resumes",
            description: "Create and manage unlimited resume designs for different opportunities",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Clock,
            title: "Auto-Save",
            description: "Never lose your work with automatic saving as you type",
            color: "from-teal-500 to-green-500"
        },
        {
            icon: Star,
            title: "Professional Templates",
            description: "Choose from dozens of modern, recruiter-approved templates",
            color: "from-amber-500 to-yellow-500"
        }
    ];

    return (
        <section className="px-6 md:px-10 py-20 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to help you create the perfect resume
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
