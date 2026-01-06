import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Hotel, Coffee, Camera, Car, Gift, Utensils, Lightbulb, Box } from "lucide-react";

const services = [
  {
    icon: Box,
    title: "Stand Tasarımı & Kurulumu",
    description: "Modüler, orta seviye, premium ve dijital ekranlı stand çözümleri",
    href: "/hizmetler/stand-tasarimi",
  },
  {
    icon: Users,
    title: "Hostes & Personel Desteği",
    description: "VIP, servis, formal ve İngilizce bilen profesyonel personel",
    href: "/hizmetler/hostes-personel",
  },
  {
    icon: Hotel,
    title: "Otel & Konaklama",
    description: "3-5 yıldız otellerde fuar alanına yakın konaklama çözümleri",
    href: "/hizmetler/otel-konaklama",
  },
  {
    icon: Coffee,
    title: "Stand İkramları",
    description: "Kuru pasta, tatlı, çay/kahve, meyve ve premium ikram seçenekleri",
    href: "/hizmetler/stand-ikramlari",
  },
  {
    icon: Camera,
    title: "Fotoğraf & Video Çekimi",
    description: "Stand görüntüleri, ürün odaklı, röportaj ve drone çekimleri",
    href: "/hizmetler/fotograf-video",
  },
  {
    icon: Car,
    title: "Ulaşım & Shuttle",
    description: "Günlük shuttle, VIP araç, grup ve havalimanı transfer hizmetleri",
    href: "/hizmetler/ulasim-shuttle",
  },
  {
    icon: Gift,
    title: "Kurumsal Hediye & Promosyon",
    description: "Klasik, premium VIP ve kurumsal kıyafet promosyon ürünleri",
    href: "/hizmetler/kurumsal-hediye",
  },
  {
    icon: Utensils,
    title: "Akşam Yemeği & Gala",
    description: "Gala yemeği, cocktail, özel davet ve VIP masa organizasyonları",
    href: "/hizmetler/aksam-yemegi-gala",
  },
  {
    icon: Lightbulb,
    title: "Fuar Danışmanlığı",
    description: "Fuar seçimi, bütçe planlama, strateji ve analiz hizmetleri",
    href: "/hizmetler/fuar-danismanligi",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#004767] font-bold">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-[#404D60] text-lg font-medium">
            İhtiyacınıza özel, paket değil seçilebilir hizmetler
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={index} href={service.href}>
                <Card className="group bg-white border-[#eaecf0] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 p-6 h-full">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                      <Icon size={32} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2 text-[#004767] group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#404D60] text-sm flex-grow leading-relaxed">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium mr-2">Detaylı Bilgi</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/teklif-al">
            <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white transition-all rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
              Teklif Alın
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
