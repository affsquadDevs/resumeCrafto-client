import { defineRouting } from "next-intl/routing";

// Supported locales. `en` is the default and is served at the root (no prefix);
// every other locale is served under its own sub-path, e.g. /es, /de, /uk.
// Note: these are ISO 639-1 *language* codes — Ukrainian is `uk` (not `ua`) and
// Czech is `cs` (not `cz`). `pt` defaults to European Portuguese.
export const routing = defineRouting({
  locales: ["en", "pl", "es", "pt", "fr", "it", "de", "uk", "sv", "cs", "el"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
