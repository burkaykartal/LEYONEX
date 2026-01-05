import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getServiceBySlug, getAllServices } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft size={20} />
              <span>Tüm Hizmetlere Dön</span>
            </Link>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-primary">Hizmetlerimiz</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {service.title.tr}
              </h1>
              {service.shortDescription && (
                <p className="text-xl text-gray-300">{service.shortDescription.tr}</p>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {service.fullDescription?.tr && (
                  <div className="prose prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6 text-white">Hizmet Detayları</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {service.fullDescription.tr}
                    </p>
                  </div>
                )}

                {/* Alt Hizmetler */}
                {service.subServices && service.subServices.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Alt Hizmetler</h2>
                    <div className="grid gap-4">
                      {service.subServices.map((subService: any, index: number) => (
                        <Card key={index} className="bg-dark-card border-white/10 p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <CheckCircle className="text-accent" size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2">
                                {subService.name.tr}
                              </h3>
                              {subService.description?.tr && (
                                <p className="text-gray-400">{subService.description.tr}</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-dark-card border-white/10 p-6 sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">Teklif Alın</h3>
                  <p className="text-gray-400 mb-6">
                    Bu hizmet için özel teklif almak ister misiniz?
                  </p>
                  <Link href="/teklif-al">
                    <Button className="w-full bg-primary hover:opacity-90">
                      Teklif Talep Formu
                    </Button>
                  </Link>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="font-semibold mb-4">İletişim</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                      <p>📧 info@luna360expo.com</p>
                      <p>📞 +90 5XX XXX XX XX</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-dark-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diğer Hizmetlerimizi Keşfedin
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Fuar organizasyonunuz için ihtiyacınız olan tüm hizmetleri sunuyoruz
            </p>
            <Link href="/hizmetler">
              <Button variant="outline" size="lg">
                Tüm Hizmetler
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Generate static params for all services
export function generateStaticParams() {
  const allServices = getAllServices();

  return allServices.map((service) => ({
    slug: service.slug,
  }));
}
