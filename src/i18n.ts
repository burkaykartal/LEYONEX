import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Desteklenen diller
export const locales = ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'] as const;
export type Locale = (typeof locales)[number];

// Varsayılan dil
export const defaultLocale: Locale = 'tr';

// Dil isimleri (native)
export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  it: 'Italiano',
  ar: 'العربية',
  ru: 'Русский',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
};

// Dil bayrak emoji'leri
export const localeFlags: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  it: '🇮🇹',
  ar: '🇸🇦',
  ru: '🇷🇺',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  zh: '🇨🇳',
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
