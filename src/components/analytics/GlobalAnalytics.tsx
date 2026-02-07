'use client';

import { useEffect } from 'react';
import { pushToDataLayer } from '@/utils/analytics';
import { useSession } from 'next-auth/react';

export const GlobalAnalytics = () => {
    const { data: session } = useSession();

    useEffect(() => {
        // 1. Handle pending sign_up event
        if (sessionStorage.getItem('pending_sign_up')) {
            pushToDataLayer('sign_up', {
                user_email: sessionStorage.getItem('user_email') || ''
            });
            sessionStorage.removeItem('pending_sign_up');
            sessionStorage.removeItem('user_email');
        }

        // 2. Handle pending cv_created event (if any redirect happens)
        if (sessionStorage.getItem('pending_cv_created')) {
            pushToDataLayer('cv_created', {
                user_id: session?.user?.email || '',
                cv_id: sessionStorage.getItem('cv_id') || ''
            });
            sessionStorage.removeItem('pending_cv_created');
            sessionStorage.removeItem('cv_id');
        }
    }, [session]);

    return null;
};
