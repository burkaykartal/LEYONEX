"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getUpcomingFairs } from "@/lib/data";

export default function FairsTable() {
  const fairs = getUpcomingFairs();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  // Get unique values for filters
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(fairs.map((f) => f.location.country)));
    return uniqueCountries.sort();
  }, [fairs]);

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(fairs.map((f) => f.location.city)));
    return uniqueCities.sort();
  }, [fairs]);

  const sectors = useMemo(() => {
    const uniqueSectors = Array.from(new Set(fairs.map((f) => f.sector.tr)));
    return uniqueSectors.sort();
  }, [fairs]);

  // Filter fairs
  const filteredFairs = useMemo(() => {
    return fairs.filter((fair) => {
      if (selectedCountry !== "all" && fair.location.country !== selectedCountry) return false;
      if (selectedCity !== "all" && fair.location.city !== selectedCity) return false;
      if (selectedSector !== "all" && fair.sector.tr !== selectedSector) return false;
      return true;
    });
  }, [fairs, selectedCountry, selectedCity, selectedSector]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-white border-[#eaecf0]">
        <h3 className="text-lg font-semibold mb-4 text-[#2d2a3f]">Filtreler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Country Filter */}
          <div>
            <label className="block text-sm font-medium text-[#4a4a5a] mb-2">
              Ülke
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border border-[#eaecf0] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-[#3f3c56]"
            >
              <option value="all">Tüm Ülkeler</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-[#4a4a5a] mb-2">
              Şehir
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-[#eaecf0] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-[#3f3c56]"
            >
              <option value="all">Tüm Şehirler</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-[#4a4a5a] mb-2">
              Sektör
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border border-[#eaecf0] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-[#3f3c56]"
            >
              <option value="all">Tüm Sektörler</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-[#4a4a5a]">
          <strong>{filteredFairs.length}</strong> fuar listeleniyor
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden bg-white border-[#eaecf0]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f5f5f5]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d2a3f]">
                  Fuar Adı
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d2a3f]">
                  Tarih
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d2a3f]">
                  Konum
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d2a3f]">
                  Sektör
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {filteredFairs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#4a4a5a]">
                    Seçili filtrelere uygun fuar bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredFairs.map((fair) => {
                  const startDate = new Date(fair.startDate);
                  const endDate = new Date(fair.endDate);
                  const isOngoing = startDate <= new Date() && endDate >= new Date();

                  return (
                    <tr
                      key={fair.id}
                      className="hover:bg-[#f5f5f5] transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="font-semibold text-[#2d2a3f] group-hover:text-primary transition-colors">
                              {fair.name.tr}
                            </div>
                            {isOngoing && (
                              <Badge className="mt-1 bg-green-500 text-white text-xs">
                                Devam Ediyor
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#4a4a5a]">
                          <Calendar size={16} className="text-primary" />
                          <span className="text-sm">
                            {format(startDate, "d MMM", { locale: tr })} -{" "}
                            {format(endDate, "d MMM yyyy", { locale: tr })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#4a4a5a]">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-sm">
                            {fair.location.city}, {fair.location.country}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building size={16} className="text-primary" />
                          <Badge className="bg-primary text-white">
                            {fair.sector.tr}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
