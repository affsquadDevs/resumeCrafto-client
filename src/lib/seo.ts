import { routing } from "@/i18n/routing";

export const BASE_URL = "https://resumecraftor.com";

// Open Graph locale codes (language_TERRITORY) per app locale.
const OG_LOCALES: Record<string, string> = {
    en: "en_US", pl: "pl_PL", es: "es_ES", pt: "pt_PT", fr: "fr_FR",
    it: "it_IT", de: "de_DE", uk: "uk_UA", sv: "sv_SE", cs: "cs_CZ", el: "el_GR",
};

export function ogLocale(locale: string): string {
    return OG_LOCALES[locale] ?? "en_US";
}

// Absolute URL for a logical path ("/", "/about", "/blog/x") in a locale.
// The default locale (en) has no prefix; others are served under /<locale>.
export function localizedUrl(path: string, locale: string): string {
    const clean = path === "/" ? "/" : path;
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return `${BASE_URL}${prefix}${clean}`;
}

// metadata.alternates for a page: a self-referencing canonical for the active
// locale plus hreflang alternates for every locale (and x-default → en).
export function buildAlternates(path: string, locale: string) {
    const languages: Record<string, string> = {};
    for (const loc of routing.locales) {
        languages[loc] = localizedUrl(path, loc);
    }
    languages["x-default"] = localizedUrl(path, routing.defaultLocale);
    return {
        canonical: localizedUrl(path, locale),
        languages,
    };
}
