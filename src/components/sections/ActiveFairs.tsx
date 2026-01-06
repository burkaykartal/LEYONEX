"use client";

import { activeFairs } from "@/data/activeFairs";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";

export default function ActiveFairs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary font-bold">Şuanda Çalışılan</span> Fuarlar
          </h2>
          <p className="text-[#4B86A1] text-lg">
            Aktif olarak stand kurulumu ve organizasyon hizmeti verdiğimiz fuarlar
          </p>
        </div>

        {/* Fairs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeFairs.map((fair) => (
            <Card
              key={fair.id}
              className="group overflow-hidden border-[#E8ECF1] hover:border-accent/50 transition-all duration-300 hover:shadow-xl bg-white"
            >
              {/* Fair Logo/Name Display */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                {/* Fallback: Display first letter as logo */}
                {!fair.logo && (
                  <div className="text-white text-6xl font-bold opacity-90 group-hover:scale-110 transition-transform duration-300">
                    {fair.name.charAt(0)}
                  </div>
                )}

                {/* If logo exists, display it */}
                {fair.logo && (
                  <img
                    src={fair.logo}
                    alt={fair.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                  />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Fair Information */}
              <div className="p-5 space-y-3">
                {/* Fair Name */}
                <h3 className="text-lg font-semibold text-[#004767] group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                  {fair.name}
                </h3>

                {/* Location */}
                <div className="flex items-start gap-2 text-[#4B86A1]">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    {fair.city}, {fair.country}
                  </span>
                </div>

                {/* Dates */}
                <div className="flex items-start gap-2 text-[#4B86A1]">
                  <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {fair.startDate} - {fair.endDate}
                  </span>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-[#4B86A1] text-sm">
            Fuarınız için profesyonel stand ve organizasyon hizmeti almak ister misiniz?
          </p>
        </div>
      </div>
    </section>
  );
}
