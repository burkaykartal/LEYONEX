import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/data";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects(6);

  const standTypeLabels: Record<string, string> = {
    modular: "Modüler Stand",
    medium: "Orta Seviye",
    premium: "Premium Stand",
    digital: "Dijital Ekranlı",
  };

  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary font-bold">
                Öne Çıkan Projeler
              </span>
            </h2>
            <p className="text-[#555555] text-lg">
              Gerçekleştirdiğimiz başarılı projelerden seçmeler
            </p>
          </div>
          <Link
            href="/projeler"
            className="mt-4 md:mt-0 flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
          >
            <span className="font-medium">Tüm Projeleri Gör</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projeler/${project.slug}`}>
              <Card className="group bg-white border-[#eaecf0] hover:border-primary/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#f5f5f5]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

                  {project.heroImage ? (
                    <Image
                      src={project.heroImage}
                      alt={project.title.tr}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/20">{project.client}</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-primary border-0">
                      {standTypeLabels[project.standType]}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#2d2d2d] group-hover:text-primary transition-colors">
                    {project.title.tr}
                  </h3>
                  <p className="text-sm text-[#555555] mb-3">
                    {project.client} • {project.location.city}
                  </p>
                  <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium mr-2">Detayları Gör</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
