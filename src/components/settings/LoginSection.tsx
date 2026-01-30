
import React, { useState } from 'react';
import { Lock, LogIn, Loader2, Check, AlertCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const LoginSection = () => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        setIsLoading(true);
        setMessage(null);
        try {
            const res = await fetch('/api/user/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new,
                }),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' });
                setPasswords({ current: '', new: '', confirm: '' });
                setIsChangingPassword(false);
            } else {
                const data = await res.json();
                setMessage({ type: 'error', text: data.error || 'Failed to update password.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong.' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {message && (
                <div className={`fixed top-24 right-8 z-[70] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-right-10 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <p className="font-bold">{message.text}</p>
                </div>
            )}

            <section>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Login Settings</h3>
                <div className="space-y-6 bg-white border border-gray-100 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col gap-6 group border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Password</h4>
                                    <p className="text-sm text-gray-500 font-medium italic">Update your account password</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChangingPassword(!isChangingPassword)}
                                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm"
                            >
                                {isChangingPassword ? 'Cancel' : 'Change Password'}
                            </button>
                        </div>

                        {isChangingPassword && (
                            <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwords.current}
                                            onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-purple-200 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="hidden md:block"></div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwords.new}
                                            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-purple-200 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-purple-200 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                    >
                                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 group text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl shrink-0">
                                <LogIn className="rotate-180" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Logout</h4>
                                <p className="text-sm text-gray-500 font-medium">Log out of your current session</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full sm:w-auto px-5 py-2.5 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
