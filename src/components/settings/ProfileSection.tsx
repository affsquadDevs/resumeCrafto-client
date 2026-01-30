
import React from 'react';
import { Camera, ChevronRight } from 'lucide-react';

export const ProfileSection = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Photo Section */}
            <section>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Profile Photo</h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl md:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative group shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 md:bottom-1 md:right-1 p-2 md:p-2.5 bg-white border border-gray-100 rounded-full shadow-xl text-gray-600 hover:text-purple-600 hover:scale-110 transition-all">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <button className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                                Change Photo
                            </button>
                            <button className="w-full sm:w-auto px-6 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
                                Remove Photo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Details */}
            <section className="space-y-6">
                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Name</h4>
                            <p className="text-lg font-bold text-gray-900 tracking-tight">Sviatoclav Bentsa</p>
                        </div>
                        <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm">
                            Edit
                        </button>
                    </div>
                </div>

                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</h4>
                            <p className="text-lg font-bold text-gray-900 tracking-tight">bentsasv@gmail.com</p>
                        </div>
                        <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm">
                            Edit
                        </button>
                    </div>
                </div>

                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">What are you planning to use Craftor for?</h4>
                    <div className="relative max-w-md">
                        <select className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-purple-300 font-bold text-gray-700 appearance-none shadow-sm cursor-pointer transition-all">
                            <option>Student</option>
                            <option>Professional</option>
                            <option>Business Owner</option>
                            <option>Personal Use</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight className="rotate-90" size={20} />
                        </div>
                    </div>
                    <div className="mt-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                        <p className="text-sm text-blue-700 font-medium leading-relaxed">
                            We adapt the platform to best meet your needs as a student. You can change these settings at any time.
                        </p>
                    </div>
                </div>

                <div className="group pb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Language</h4>
                    <div className="relative max-w-md">
                        <select className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-purple-300 font-bold text-gray-700 appearance-none shadow-sm cursor-pointer transition-all">
                            <option>English (US)</option>
                            <option>Ukrainian</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight className="rotate-90" size={20} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
