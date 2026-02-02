'use client';

import dynamic from 'next/dynamic';

const GlobalAuthModal = dynamic(() => import('./GlobalAuthModal').then(mod => mod.GlobalAuthModal), {
    ssr: false
});

export function LazyAuthModal() {
    return <GlobalAuthModal />;
}
