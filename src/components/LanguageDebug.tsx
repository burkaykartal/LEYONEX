'use client';

import { useEffect, useState } from 'react';

export default function LanguageDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // 2 saniye sonra kontrol et
    setTimeout(() => {
      const info: any = {
        timestamp: new Date().toISOString(),
        googleObjectExists: typeof (window as any).google !== 'undefined',
        translateExists: typeof (window as any).google?.translate !== 'undefined',
        container: !!document.getElementById('google_translate_element'),
        selectElement: !!document.querySelector('.goog-te-combo'),
        allSelects: document.querySelectorAll('select').length,
        googElements: document.querySelectorAll('[class*="goog"]').length,
        scripts: Array.from(document.querySelectorAll('script'))
          .filter(s => s.src.includes('translate'))
          .map(s => s.src),
      };

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        info.selectInfo = {
          value: select.value,
          disabled: select.disabled,
          options: Array.from(select.options).map(o => ({
            value: o.value,
            text: o.text
          })),
          computedStyle: {
            display: window.getComputedStyle(select).display,
            visibility: window.getComputedStyle(select).visibility,
            pointerEvents: window.getComputedStyle(select).pointerEvents,
          }
        };
      }

      console.log('🔍 GOOGLE TRANSLATE DEBUG:', info);
      setDebugInfo(info);
    }, 2000);
  }, []);

  const testClick = () => {
    console.log('🧪 TEST BUTON TIKLANDI!');

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    console.log('Select element:', select);

    if (select) {
      console.log('Select value ÖNCESİ:', select.value);
      select.value = 'en';
      console.log('Select value SONRASI:', select.value);

      console.log('Change event tetikleniyor...');
      select.dispatchEvent(new Event('change', { bubbles: true }));

      setTimeout(() => {
        console.log('1 saniye sonra select value:', select.value);
      }, 1000);
    } else {
      console.error('❌ SELECT BULUNAMADI!');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 border border-orange-500 rounded-lg p-4 max-w-md z-50 text-xs">
      <h3 className="text-orange-500 font-bold mb-2">🔍 Google Translate Debug</h3>

      <button
        onClick={testClick}
        className="w-full mb-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold"
      >
        🧪 TEST DİL DEĞİŞTİR
      </button>

      <div className="space-y-1 text-slate-300">
        <div>Google Object: {debugInfo.googleObjectExists ? '✅' : '❌'}</div>
        <div>Translate API: {debugInfo.translateExists ? '✅' : '❌'}</div>
        <div>Container: {debugInfo.container ? '✅' : '❌'}</div>
        <div>Select Element: {debugInfo.selectElement ? '✅' : '❌'}</div>
        <div>Total Selects: {debugInfo.allSelects || 0}</div>
        <div>Goog Elements: {debugInfo.googElements || 0}</div>

        {debugInfo.selectInfo && (
          <div className="mt-2 p-2 bg-slate-900 rounded">
            <div className="text-orange-400 font-bold">Select Info:</div>
            <div>Value: {debugInfo.selectInfo.value || '(empty)'}</div>
            <div>Disabled: {debugInfo.selectInfo.disabled ? '❌ YES' : '✅ NO'}</div>
            <div>Display: {debugInfo.selectInfo.computedStyle.display}</div>
            <div>Visibility: {debugInfo.selectInfo.computedStyle.visibility}</div>
            <div>Options: {debugInfo.selectInfo.options.length}</div>
          </div>
        )}
      </div>

      <div className="mt-2 text-slate-500 text-[10px]">
        F12 Console&apos;a bak
      </div>
    </div>
  );
}
