"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/fuarlar", label: "Fuarlar" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-lg shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <Image
              src="/logo-white.png"
              alt="Leyonex"
              width={150}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/uye/dashboard">
                  <Button variant="ghost" size="sm">
                    Panel
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/giris">
                  <Button variant="ghost" size="sm">
                    Giriş
                  </Button>
                </Link>
                <Link href="/teklif-al">
                  <Button
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Teklif Al
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-dark-card/98 backdrop-blur-lg border-t border-white/10 animate-in slide-in-from-top">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              {isSignedIn ? (
                <>
                  <Link href="/uye/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Panel
                    </Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <>
                  <Link href="/giris" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Giriş
                    </Button>
                  </Link>
                  <Link href="/teklif-al" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Teklif Al
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
