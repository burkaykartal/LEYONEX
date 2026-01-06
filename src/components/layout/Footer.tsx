import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f8fa] border-t border-[#eaecf0]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Image
              src="/logo-white.png"
              alt="Leyonex"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
            <p className="text-[#555555] text-sm">
              Fuar dünyasında fark yaratan çözümler. Stand tasarımından organizasyona tüm hizmetleri tek noktadan yönetin.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2d2d2d]">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-[#555555] hover:text-accent transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="text-[#555555] hover:text-accent transition-colors text-sm">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="text-[#555555] hover:text-accent transition-colors text-sm">
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/fuarlar" className="text-[#555555] hover:text-accent transition-colors text-sm">
                  Fuar Takvimi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-[#555555] hover:text-accent transition-colors text-sm">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2d2d2d]">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-[#555555] text-sm">
              <li>Stand Tasarımı & Kurulumu</li>
              <li>Hostes & Personel Desteği</li>
              <li>Otel & Konaklama</li>
              <li>Fotoğraf & Video Çekimi</li>
              <li>Fuar Danışmanlığı</li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2d2d2d]">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-[#555555]">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-accent" />
                <span>Adres Bilgisi<br />İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-3 text-[#555555]">
                <Phone size={18} className="flex-shrink-0 text-accent" />
                <a href="tel:+905xxxxxxxxx" className="hover:text-accent transition-colors">
                  +90 5XX XXX XX XX
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#555555]">
                <Mail size={18} className="flex-shrink-0 text-accent" />
                <a href="mailto:info@leyonex.com" className="hover:text-accent transition-colors">
                  info@leyonex.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#eaecf0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#555555] text-sm">
            © {currentYear} Leyonex. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/gizlilik" className="text-[#555555] hover:text-accent transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kvkk" className="text-[#555555] hover:text-accent transition-colors">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
