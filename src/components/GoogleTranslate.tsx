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
    window.googleTranslateElementInit = function() {
      console.log('🔄 Google Translate init');

      const container = document.getElementById('google_translate_element');
      if (!container) return;

      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'tr',
          includedLanguages: 'en', // Sadece İngilizce
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
        console.log('✅ TranslateElement oluşturuldu (TR/EN)');
      }
    };

    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      window.googleTranslateElementInit();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

  }, []);

  return (
    <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
      <div id="google_translate_element"></div>
    </div>
  );
}
