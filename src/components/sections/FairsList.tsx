import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getUpcomingFairs } from "@/lib/data";

export default function FairsList() {
  const fairs = getUpcomingFairs();

  if (fairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          Şu anda yaklaşan fuar bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fairs.map((fair) => {
        const startDate = new Date(fair.startDate);
        const endDate = new Date(fair.endDate);
        const isOngoing = startDate <= new Date() && endDate >= new Date();

        return (
          <Link key={fair.id} href={`/fuarlar/${fair.slug}`}>
            <Card className="group bg-dark-card border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 p-6 h-full">
              <div className="flex flex-col h-full">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {isOngoing && (
                    <Badge className="bg-green-500 text-white">Devam Ediyor</Badge>
                  )}
                  <Badge className="bg-primary">{fair.sector.tr}</Badge>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {fair.name.tr}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Calendar size={16} className="text-accent" />
                  <span>
                    {format(startDate, "d MMM", { locale: tr })} -{" "}
                    {format(endDate, "d MMM yyyy", { locale: tr })}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin size={16} className="text-accent" />
                  <span>
                    {fair.location.city}, {fair.location.country}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm flex-grow line-clamp-3">
                  {fair.description.tr}
                </p>

                {/* Link */}
                <div className="mt-4 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Detayları Gör →
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
