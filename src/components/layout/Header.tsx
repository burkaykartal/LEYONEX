'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'tr' | 'en'>('tr');
  const { isSignedIn } = useAuth();

  const toggleLanguage = () => {
    console.log('🔘 DİL DEĞİŞTİRME BAŞLADI');

    const newLang = currentLang === 'tr' ? 'en' : 'tr';

    // Cookie'de sakla
    document.cookie = `googtrans=/tr/${newLang}; path=/; max-age=31536000`;
    document.cookie = `googtrans=/tr/${newLang}; domain=.leyonex.com; path=/; max-age=31536000`;

    setCurrentLang(newLang);

    console.log('🌍 Dil değişti:', newLang);
    console.log('📍 Sayfa yenileniyor...');

    // Sayfayı yenile (Google Translate cookie'den okuyacak)
    window.location.reload();
  };

  // Sayfa yüklendiğinde cookie'den dili oku
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const googtrans = cookies.find(c => c.trim().startsWith('googtrans='));

    if (googtrans) {
      const lang = googtrans.split('/')[2];
      if (lang === 'en') {
        setCurrentLang('en');
      }
    }
  }, []);

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

            {/* TR/EN Toggle - Cookie Based */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
            >
              <span className="text-xl">{currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span className="text-white text-sm font-bold">{currentLang.toUpperCase()}</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
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
              className="w-full px-4 py-3 bg-orange-500 rounded-lg text-left flex items-center space-x-3 hover:bg-orange-600"
            >
              <span className="text-2xl">{currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span className="text-sm font-bold text-white">
                {currentLang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
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
