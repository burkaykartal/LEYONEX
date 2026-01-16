'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Google Translate init fonksiyonu
    window.googleTranslateElementInit = function() {
      console.log('🔄 Google Translate init çağrıldı');
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'tr',
          includedLanguages: 'en,ru,ar,zh-CN',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
        console.log('✅ TranslateElement oluşturuldu');
      }
    };

    // Script zaten yüklü mü kontrol et
    if (window.google && window.google.translate) {
      console.log('✅ Google Translate zaten yüklü, init çağrılıyor');
      window.googleTranslateElementInit();
      return;
    }

    // Script'i yükle
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => console.error('❌ Google Translate script yüklenemedi');
    document.body.appendChild(script);
    console.log('📥 Google Translate script eklendi');

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'absolute', left: '-9999px', top: 0, opacity: 0 }}>
      <div id="google_translate_element"></div>
    </div>
  );
}
