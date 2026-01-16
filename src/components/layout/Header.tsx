'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const { isSignedIn } = useAuth();

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  ];

  const [currentLang, setCurrentLang] = useState(languages[0]);

  useEffect(() => {
    // Google Translate'in yüklenmesini bekle
    const checkTranslate = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        setIsTranslateReady(true);
        clearInterval(checkTranslate);
      }
    }, 100);

    // 10 saniye sonra vazgeç
    setTimeout(() => clearInterval(checkTranslate), 10000);

    return () => clearInterval(checkTranslate);
  }, []);

  const changeLanguage = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsLangOpen(false);

    if (!isTranslateReady) {
      console.log('Google Translate henüz yüklenmedi');
      return;
    }

    // Google Translate'i tetikle
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      // Türkçe'ye dönmek için boş string
      select.value = lang.code === 'tr' ? '' : lang.code;

      // Change event'i tetikle
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);

      console.log('Dil değiştirildi:', lang.code);
    } else {
      console.log('Google Translate select bulunamadı');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      {/* Google Translate Widget - Gizli ama DOM'da olmalı */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div id="google_translate_element"></div>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-white">
            LEYONEX
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-300 hover:text-orange-500 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="text-slate-300 hover:text-orange-500 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/hizmetler" className="text-slate-300 hover:text-orange-500 transition-colors">
              Hizmetler
            </Link>
            <Link href="/fuarlar" className="text-slate-300 hover:text-orange-500 transition-colors">
              Fuarlar
            </Link>
            <Link href="/iletisim" className="text-slate-300 hover:text-orange-500 transition-colors">
              İletişim
            </Link>

            {/* Özel Dil Seçici */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                title={isTranslateReady ? 'Dil seçin' : 'Yükleniyor...'}
              >
                <span className="text-xl">{currentLang.flag}</span>
                <span className="text-white text-sm font-medium">{currentLang.code === 'zh-CN' ? 'ZH' : currentLang.code.toUpperCase()}</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 py-2 z-20">
                    {!isTranslateReady && (
                      <div className="px-4 py-2 text-slate-400 text-xs">
                        Çeviri yükleniyor...
                      </div>
                    )}
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang)}
                        disabled={!isTranslateReady}
                        className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          currentLang.code === lang.code ? 'bg-slate-700 text-orange-500' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                        {currentLang.code === lang.code && (
                          <svg className="w-5 h-5 ml-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/uye/dashboard" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link href="/giris" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Giriş Yap
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-slate-800">
            <Link href="/" className="block text-slate-300 hover:text-orange-500">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="block text-slate-300 hover:text-orange-500">Hakkımızda</Link>
            <Link href="/hizmetler" className="block text-slate-300 hover:text-orange-500">Hizmetler</Link>
            <Link href="/fuarlar" className="block text-slate-300 hover:text-orange-500">Fuarlar</Link>
            <Link href="/iletisim" className="block text-slate-300 hover:text-orange-500">İletişim</Link>

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-xs mb-3 px-2">
                Dil Seçimi / Language {!isTranslateReady && '(yükleniyor...)'}
              </p>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                    disabled={!isTranslateReady}
                    className={`w-full px-4 py-3 rounded-lg text-left flex items-center space-x-3 transition-colors disabled:opacity-50 ${
                      currentLang.code === lang.code ? 'bg-slate-700 text-orange-500' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {isSignedIn ? (
              <div className="space-y-4 pt-4 border-t border-slate-700">
                <Link href="/uye/dashboard" className="block text-slate-300 hover:text-orange-500">Dashboard</Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link href="/giris" className="block px-4 py-2 bg-orange-500 text-white rounded-lg text-center">
                Giriş Yap
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
