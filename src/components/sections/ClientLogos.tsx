"use client";

import { useEffect, useRef } from "react";

// Placeholder client logos - Sanity'den gelecek
const clients = [
  "İdealmodel",
  "Green Energy",
  "Inkwer",
  "Duoline",
  "Anisah Coffee",
  "Özen Promosyon",
  "Hillebrand Chemicals",
  "Kromavis",
  "Kaptech",
  "Hasat Şapka",
  "İlpen",
  "Şamdan",
  "Olabi",
  "Misscollection",
  "Ünal",
];

export default function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset when reaching the end
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-20 bg-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white font-bold">
              Güvenilir Markalar Bizimle
            </span>
          </h2>
          <p className="text-white">
            100+ şirketin fuar organizasyonlarında yanlarındayız
          </p>
        </div>

        {/* Scrolling Logos */}
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {/* Duplicate for infinite scroll effect */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-20 bg-dark-card border border-white/10 rounded-lg flex items-center justify-center hover:border-accent/50 transition-all group grayscale hover:grayscale-0"
            >
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
