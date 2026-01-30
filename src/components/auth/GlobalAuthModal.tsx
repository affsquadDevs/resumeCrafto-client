'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AuthModals } from '@/components/auth/AuthModals';
import { useUserStore } from '@/store/useUserStore';

export const GlobalAuthModal = () => {
    const searchParams = useSearchParams();
    const { authModal, setAuthModal } = useUserStore();

    useEffect(() => {
        if (!searchParams) return;
        const authParam = searchParams.get('auth');
        if (authParam === 'register' || authParam === 'login') {
            setAuthModal({ isOpen: true, mode: authParam as 'login' | 'register' });
            // Clean up URL
            const url = new URL(window.location.href);
            url.searchParams.delete('auth');
            window.history.replaceState({}, '', url.toString());
        }
    }, [searchParams, setAuthModal]);

    return (
        <AuthModals
            isOpen={authModal.isOpen}
            initialMode={authModal.mode}
            onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        />
    );
};
