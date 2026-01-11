import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProjectBySlug, getProjectSlugs } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Maximize2 } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const standTypeLabels: Record<string, string> = {
    modular: "Modüler",
    medium: "Orta Seviye",
    premium: "Premium",
    digital: "Dijital Ekranlı",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft size={20} />
              <span>Tüm Projelere Dön</span>
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-primary text-base">
                  {standTypeLabels[project.standType]}
                </Badge>
                <Badge variant="outline" className="text-base">
                  {project.category}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title.tr}</h1>

              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-accent" />
                  <span>
                    {project.location.city}, {project.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-accent" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 size={20} className="text-accent" />
                  <span>{project.squareMeters} m²</span>
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
              <div className="lg:col-span-2 space-y-12">
                {project.challenge?.tr && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-accent">Zorluk</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {project.challenge.tr}
                    </p>
                  </div>
                )}

                {project.solution?.tr && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-primary">Çözüm</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {project.solution.tr}
                    </p>
                  </div>
                )}

                {project.result?.tr && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">Sonuç</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {project.result.tr}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6 sticky top-24">
                  {/* Proje Detayları */}
                  <Card className="bg-dark-card border-white/10 p-6">
                    <h3 className="text-xl font-bold mb-4">Proje Detayları</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Müşteri:</span>
                        <p className="font-medium">{project.client}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Fuar:</span>
                        <p className="font-medium">{project.location.fairName}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Stand Türü:</span>
                        <p className="font-medium">{standTypeLabels[project.standType]}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Alan:</span>
                        <p className="font-medium">{project.squareMeters} m²</p>
                      </div>
                    </div>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">
                      Benzer Bir Proje mi İstiyorsunuz?
                    </h3>
                    <p className="text-white/90 mb-4 text-sm">
                      Size özel teklif hazırlayalım
                    </p>
                    <Link href="/teklif-al">
                      <Button className="w-full bg-white text-primary hover:bg-white/90">
                        Teklif Alın
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
              Diğer Projelerimizi Keşfedin
            </h2>
            <Link href="/projeler">
              <Button variant="outline" size="lg" className="mt-4">
                Tüm Projeler
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
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}
