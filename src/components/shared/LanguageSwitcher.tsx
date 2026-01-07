"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    // Mevcut path'den locale'i çıkar
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // Yeni locale ile path oluştur
    const newPath = newLocale === 'tr'
      ? pathWithoutLocale // Türkçe için URL'de locale yok
      : `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-[#404D60] hover:text-primary"
        >
          <Globe size={18} />
          <span className="hidden md:inline">{localeNames[locale]}</span>
          <span className="md:hidden">{localeFlags[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`cursor-pointer gap-3 ${
              locale === loc ? 'bg-primary/10 text-primary font-semibold' : ''
            }`}
          >
            <span className="text-xl">{localeFlags[loc]}</span>
            <span>{localeNames[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
