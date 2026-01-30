
import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/useUserStore';

export const ProfileSection = () => {
    const { data: session, update } = useSession();
    const { user: storeUser, updateUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [profile, setProfile] = useState({ name: '', email: '', usage: 'Student', language: 'English (US)', image: '' });
    const [originalProfile, setOriginalProfile] = useState({ name: '', email: '', usage: 'Student', language: 'English (US)', image: '' });
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    const profileData = {
                        name: data.name || '',
                        email: data.email || '',
                        usage: data.usage || 'Student',
                        language: data.language || 'English (US)',
                        image: data.image || ''
                    };
                    setProfile(profileData);
                    setOriginalProfile(profileData);
                    setTempName(data.name || '');
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const hasChanges =
        profile.name !== originalProfile.name ||
        profile.usage !== originalProfile.usage ||
        profile.language !== originalProfile.language ||
        profile.image !== originalProfile.image;

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setOriginalProfile(profile);
                updateUser(profile); // Update global store only on save
                setMessage({ type: 'success', text: 'Changes saved successfully!' });

                // Update NextAuth session
                const updates: any = {};
                if (profile.name !== originalProfile.name) updates.name = profile.name;
                if (profile.image !== originalProfile.image) updates.image = profile.image || null;

                if (Object.keys(updates).length > 0) {
                    await update(updates);
                }
            } else {
                setMessage({ type: 'error', text: 'Failed to save changes.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please upload an image file.' });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File size should be less than 5MB.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/user/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setProfile(prev => ({ ...prev, image: data.imageUrl }));
            } else {
                setMessage({ type: 'error', text: 'Failed to upload photo.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleRemovePhoto = async () => {
        setProfile(prev => ({ ...prev, image: '' }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-20">
            {message && (
                <div className={`fixed top-24 right-8 z-[70] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-right-10 duration-300 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <p className="font-bold">{message.text}</p>
                </div>
            )}

            {/* Profile Photo Section */}
            <section>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Profile Photo</h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl md:rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative group shrink-0">
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100 flex items-center justify-center text-gray-300">
                            {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                                    {isSaving ? <Loader2 className="w-10 h-10 animate-spin" /> : <Camera size={40} />}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isSaving}
                            className="absolute bottom-0 right-0 md:bottom-1 md:right-1 p-2 md:p-2.5 bg-white border border-gray-100 rounded-full shadow-xl text-gray-600 hover:text-purple-600 hover:scale-110 transition-all disabled:opacity-50"
                        >
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSaving}
                                className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                            >
                                {isSaving ? 'Uploading...' : 'Change Photo'}
                            </button>
                            {profile.image && (
                                <button
                                    onClick={handleRemovePhoto}
                                    disabled={isSaving}
                                    className="w-full sm:w-auto px-6 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                                >
                                    Remove Photo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Details */}
            <section className="space-y-6">
                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Name</h4>
                            {isEditingName ? (
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => {
                                        setTempName(e.target.value);
                                    }}
                                    className="w-full text-lg font-bold text-gray-900 tracking-tight bg-gray-50 border-none outline-none p-1 rounded-sm focus:ring-2 focus:ring-purple-200"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setProfile(prev => ({ ...prev, name: tempName }));
                                            setIsEditingName(false);
                                        }
                                        if (e.key === 'Escape') {
                                            setTempName(profile.name);
                                            setIsEditingName(false);
                                        }
                                    }}
                                />
                            ) : (
                                <p className="text-lg font-bold text-gray-900 tracking-tight">{profile.name || 'Set your name'}</p>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                if (isEditingName) {
                                    setProfile(prev => ({ ...prev, name: tempName }));
                                }
                                setIsEditingName(!isEditingName);
                            }}
                            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm shrink-0"
                        >
                            {isEditingName ? 'Done' : 'Edit'}
                        </button>
                    </div>
                </div>

                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</h4>
                            <p className="text-lg font-bold text-gray-900 tracking-tight">{profile.email}</p>
                        </div>
                        <div className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">
                            Permanent
                        </div>
                    </div>
                </div>

                <div className="group border-b border-gray-100 pb-8 hover:border-purple-100 transition-colors">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">What are you planning to use Craftor for?</h4>
                    <div className="relative max-w-md">
                        <select
                            value={profile.usage}
                            onChange={(e) => {
                                setProfile(prev => ({ ...prev, usage: e.target.value }));
                            }}
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-purple-300 font-bold text-gray-700 appearance-none shadow-sm cursor-pointer transition-all disabled:opacity-50"
                            disabled={isSaving}
                        >
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
                            We adapt the platform to best meet your needs as a {profile.usage.toLowerCase()}. You can change these settings at any time.
                        </p>
                    </div>
                </div>

                <div className="group pb-8">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Language</h4>
                    <div className="relative max-w-md">
                        <select
                            value={profile.language}
                            onChange={(e) => {
                                setProfile(prev => ({ ...prev, language: e.target.value }));
                            }}
                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-purple-300 font-bold text-gray-700 appearance-none shadow-sm cursor-pointer transition-all disabled:opacity-50"
                            disabled={isSaving}
                        >
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

            {/* Save Button (Floating-ish at bottom) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] w-full max-w-4xl px-6">
                <div className={`flex items-center justify-between gap-6 p-4 md:p-6 bg-white border border-gray-100 rounded-[2rem] shadow-2xl transition-all duration-500 ${hasChanges ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="hidden md:block">
                        <p className="font-bold text-gray-900">Unsaved changes detected</p>
                        <p className="text-xs text-gray-500 font-medium italic">Your profile has been modified but not saved yet.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => {
                                setProfile(originalProfile);
                                setTempName(originalProfile.name);
                            }}
                            className="flex-1 md:flex-none px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-all"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                            {isSaving ? 'Save Changes' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
