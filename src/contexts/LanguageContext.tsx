'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'tr' | 'en' | 'ru' | 'ar' | 'zh';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    // Cookie'den dil tercihini oku
    const savedLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale;

    if (savedLocale) {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    // Çevirileri yükle
    fetch(`/locales/${locale}.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(() => setTranslations({}));

    // HTML dir attribute (Arapça için RTL)
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Cookie'ye kaydet (30 gün)
    document.cookie = `locale=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}`;
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
