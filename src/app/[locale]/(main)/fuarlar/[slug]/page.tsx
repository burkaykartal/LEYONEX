import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getFairBySlug, getFairSlugs } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Globe, Building2 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface FairDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FairDetailPage({ params }: FairDetailPageProps) {
  const { slug } = await params;
  const fair = getFairBySlug(slug);

  if (!fair) {
    notFound();
  }

  const startDate = new Date(fair.startDate);
  const endDate = new Date(fair.endDate);
  const isUpcoming = startDate > new Date();
  const isOngoing = startDate <= new Date() && endDate >= new Date();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Link
              href="/fuarlar"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft size={20} />
              <span>Fuar Takvimine Dön</span>
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3 mb-4">
                {isOngoing && (
                  <Badge className="bg-green-500 text-white text-base">
                    Şu Anda Devam Ediyor
                  </Badge>
                )}
                {isUpcoming && (
                  <Badge className="bg-primary text-base">Yaklaşan Fuar</Badge>
                )}
                <Badge variant="outline" className="text-base">
                  {fair.sector.tr}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">{fair.name.tr}</h1>

              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-accent" />
                  <span>
                    {format(startDate, "d MMMM", { locale: tr })} -{" "}
                    {format(endDate, "d MMMM yyyy", { locale: tr })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-accent" />
                  <span>
                    {fair.location.city}, {fair.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-accent" />
                  <span>{fair.location.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">Fuar Hakkında</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {fair.description.tr}
                  </p>
                </div>

                {/* Hizmetlerimiz */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Bu Fuar İçin Sunduğumuz Hizmetler
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Stand Tasarımı",
                      "Hostes Desteği",
                      "Konaklama",
                      "Stand İkramları",
                      "Fotoğraf/Video",
                      "Ulaşım",
                      "Kurumsal Hediye",
                      "Gala Organizasyonu",
                      "Danışmanlık",
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6 sticky top-24">
                  {/* Fuar Bilgileri */}
                  <Card className="bg-dark-card border-white/10 p-6">
                    <h3 className="text-xl font-bold mb-4">Fuar Bilgileri</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-gray-400 block mb-1">Tarih:</span>
                        <p className="font-medium">
                          {format(startDate, "d MMM", { locale: tr })} -{" "}
                          {format(endDate, "d MMM yyyy", { locale: tr })}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">Lokasyon:</span>
                        <p className="font-medium">
                          {fair.location.city}, {fair.location.country}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">Mekan:</span>
                        <p className="font-medium">{fair.location.venue}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">Sektör:</span>
                        <p className="font-medium">{fair.sector.tr}</p>
                      </div>
                    </div>

                    {fair.website && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <a
                          href={fair.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent hover:underline"
                        >
                          <Globe size={18} />
                          <span>Fuar Web Sitesi</span>
                        </a>
                      </div>
                    )}
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">
                      Bu Fuara Katılmak İster misiniz?
                    </h3>
                    <p className="text-white/90 mb-4 text-sm">
                      Fuar organizasyonunuzu bizimle planlayın
                    </p>
                    <Link href="/teklif-al">
                      <Button className="w-full bg-white text-primary hover:bg-white/90 mb-3">
                        Teklif Alın
                      </Button>
                    </Link>
                    <Link href="/iletisim">
                      <Button
                        variant="outline"
                        className="w-full border-white text-white hover:bg-white/10"
                      >
                        İletişime Geçin
                      </Button>
                    </Link>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-dark-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diğer Fuarları Keşfedin
            </h2>
            <Link href="/fuarlar">
              <Button variant="outline" size="lg" className="mt-4">
                Fuar Takvimi
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Generate static params
export function generateStaticParams() {
  const slugs = getFairSlugs();
  return slugs.map((slug) => ({ slug }));
}
