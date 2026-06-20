'use client';

import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

// Endonyms — each language shown in its own language, the same across all locales.
const LANGUAGE_NAMES: Record<string, string> = {
    en: 'English',
    pl: 'Polski',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
    it: 'Italiano',
    de: 'Deutsch',
    uk: 'Українська',
    sv: 'Svenska',
    cs: 'Čeština',
    el: 'Ελληνικά',
};

interface LocaleSwitcherProps {
    // 'navbar' = compact globe + dropdown; 'menu' = labeled grid for the mobile menu.
    variant?: 'navbar' | 'menu';
    onNavigate?: () => void;
}

export function LocaleSwitcher({ variant = 'navbar', onNavigate }: LocaleSwitcherProps) {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const select = (next: string) => {
        setOpen(false);
        onNavigate?.();
        if (next === locale) return;
        // Re-render the current path under the chosen locale (next-intl adds the
        // prefix for non-default locales, drops it for en).
        startTransition(() => {
            router.replace(pathname, { locale: next });
        });
    };

    if (variant === 'menu') {
        return (
            <div className="px-2 py-2">
                <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{t('language')}</p>
                <div className="grid grid-cols-2 gap-1">
                    {routing.locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => select(loc)}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-bold transition-all ${loc === locale ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
                        >
                            <span>{LANGUAGE_NAMES[loc]}</span>
                            {loc === locale && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                aria-label={t('selectLanguage')}
                aria-expanded={open}
                aria-haspopup="menu"
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-500 hover:text-purple-600 hover:bg-purple-50/50 transition-all font-bold disabled:opacity-60"
            >
                <Globe size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{locale}</span>
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-44 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] animate-in fade-in zoom-in-95 duration-200"
                >
                    {routing.locales.map((loc) => (
                        <button
                            key={loc}
                            role="menuitem"
                            onClick={() => select(loc)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-all text-left ${loc === locale ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'}`}
                        >
                            <span>{LANGUAGE_NAMES[loc]}</span>
                            {loc === locale && <Check size={16} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
