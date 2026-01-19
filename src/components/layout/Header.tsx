'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const [currentLang, setCurrentLang] = useState<'tr' | 'en'>('tr');
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // TranslateElement oluşturulmasını bekle
    const waitForTranslate = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

      if (select && select.options && select.options.length > 0) {
        console.log('✅ Select hazır, options:', select.options.length);
        setIsTranslateReady(true);
        clearInterval(waitForTranslate);
      }
    }, 200);

    // 10 saniye timeout
    setTimeout(() => {
      if (!isTranslateReady) {
        console.warn('⚠️ Timeout: Google Translate yüklenemedi');
        // Yine de butonu aktif et (fallback)
        setIsTranslateReady(true);
      }
      clearInterval(waitForTranslate);
    }, 10000);

    return () => clearInterval(waitForTranslate);
  }, [isTranslateReady]);

  const toggleLanguage = () => {
    console.log('🔘 Buton tıklandı, isTranslateReady:', isTranslateReady);

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

    if (!select) {
      console.error('❌ Select bulunamadı!');
      alert('Çeviri sistemi yüklenemedi. Sayfayı yenileyin.');
      return;
    }

    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    const selectValue = newLang === 'tr' ? '' : 'en';

    console.log('Mevcut dil:', currentLang, '→ Yeni dil:', newLang);
    console.log('Select value değişiyor:', select.value, '→', selectValue);

    select.value = selectValue;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    setCurrentLang(newLang);
    console.log('✅ Dil değişti:', newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
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

            {/* TR/EN Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              title="Dil değiştir / Change language"
            >
              <span className="text-xl">{currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span className="text-white text-sm font-medium">{currentLang.toUpperCase()}</span>
              <span className="text-slate-400 text-xs">↔</span>
            </button>

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

            <button
              onClick={toggleLanguage}
              className="w-full px-4 py-3 bg-slate-800 rounded-lg text-left flex items-center space-x-3 hover:bg-slate-700"
            >
              <span className="text-2xl">{currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span className="text-sm font-medium text-white">
                {currentLang === 'tr' ? 'Türkçe → English' : 'English → Türkçe'}
              </span>
            </button>

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
