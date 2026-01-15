'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useParams, usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const params = useParams();
  const pathname = usePathname();

  const locale = (params?.locale as string) || 'tr';

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const getLocalizedPath = (path: string) => {
    return locale === 'tr' ? path : `/${locale}${path}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href={getLocalizedPath('/')} className="text-2xl font-bold text-white">
            LEYONEX
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href={getLocalizedPath('/')} className="text-slate-300 hover:text-orange-500 transition-colors">
              {locale === 'en' ? 'Home' : locale === 'ru' ? 'Главная' : locale === 'ar' ? 'الرئيسية' : locale === 'zh' ? '主页' : 'Ana Sayfa'}
            </Link>
            <Link href={getLocalizedPath('/hakkimizda')} className="text-slate-300 hover:text-orange-500 transition-colors">
              {locale === 'en' ? 'About' : locale === 'ru' ? 'О нас' : locale === 'ar' ? 'من نحن' : locale === 'zh' ? '关于' : 'Hakkımızda'}
            </Link>
            <Link href={getLocalizedPath('/hizmetler')} className="text-slate-300 hover:text-orange-500 transition-colors">
              {locale === 'en' ? 'Services' : locale === 'ru' ? 'Услуги' : locale === 'ar' ? 'الخدمات' : locale === 'zh' ? '服务' : 'Hizmetler'}
            </Link>
            <Link href={getLocalizedPath('/fuarlar')} className="text-slate-300 hover:text-orange-500 transition-colors">
              {locale === 'en' ? 'Fairs' : locale === 'ru' ? 'Выставки' : locale === 'ar' ? 'المعارض' : locale === 'zh' ? '展会' : 'Fuarlar'}
            </Link>
            <Link href={getLocalizedPath('/iletisim')} className="text-slate-300 hover:text-orange-500 transition-colors">
              {locale === 'en' ? 'Contact' : locale === 'ru' ? 'Контакты' : locale === 'ar' ? 'اتصل' : locale === 'zh' ? '联系' : 'İletişim'}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
              >
                <span>{currentLang.flag}</span>
                <span className="text-white text-sm">{currentLang.code.toUpperCase()}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl py-2">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={lang.code === 'tr' ? pathname.replace(/^\/(en|ru|ar|zh)/, '') || '/' : `/${lang.code}${pathname.replace(/^\/(tr|en|ru|ar|zh)/, '') || ''}`}
                      className={`block px-4 py-2 hover:bg-slate-700 ${locale === lang.code ? 'text-orange-500' : 'text-slate-300'}`}
                      onClick={() => setIsLangOpen(false)}
                    >
                      {lang.flag} {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link href={getLocalizedPath('/uye/dashboard')} className="text-slate-300 hover:text-orange-500">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl={getLocalizedPath('/')} />
              </div>
            ) : (
              <Link href={getLocalizedPath('/giris')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                {locale === 'en' ? 'Login' : locale === 'ru' ? 'Войти' : locale === 'ar' ? 'دخول' : locale === 'zh' ? '登录' : 'Giriş Yap'}
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
      </nav>
    </header>
  );
}
