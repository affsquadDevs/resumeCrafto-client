
import React from 'react';
import { Lock, LogIn } from 'lucide-react';

export const LoginSection = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Login Settings</h3>
                <div className="space-y-6 bg-white border border-gray-100 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 group border-b border-gray-50 pb-6 last:border-0 last:pb-0 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Password</h4>
                                <p className="text-sm text-gray-500 font-medium italic">Last changed 2 months ago</p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm">
                            Change Password
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 group text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl shrink-0">
                                <LogIn className="rotate-180" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Active Sessions</h4>
                                <p className="text-sm text-gray-500 font-medium">Logged in on 2 devices</p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto px-5 py-2.5 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
                            Logout
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
