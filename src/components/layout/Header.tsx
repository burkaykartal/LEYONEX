'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

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

            {/* Google Translate Widget */}
            <div id="google_translate_element" className="google-translate-container"></div>

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

            {/* Mobile Google Translate */}
            <div className="pt-4 border-t border-slate-700">
              <div id="google_translate_element"></div>
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
