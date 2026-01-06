"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Video başladıktan 3 saniye sonra otomatik durdur
    const timer = setTimeout(() => {
      if (videoRef.current && videoPlaying) {
        handleVideoEnd();
      }
    }, 3000); // 3 saniye

    return () => clearTimeout(timer);
  }, [videoPlaying]);

  const handleVideoEnd = () => {
    // Video bitince içeriği göster ve videoyu yavaşça gizle
    setShowContent(true);
    setTimeout(() => {
      setVideoPlaying(false);
    }, 1500); // Video fade out süresi
  };

  const handleVideoError = () => {
    // Video yoksa direkt içeriği göster
    setShowContent(true);
    setVideoPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Arka planda oynar */}
      <div className="absolute inset-0 z-0">
        {videoPlaying && (
          <div className={`absolute inset-0 transition-opacity duration-1500 ${showContent ? 'opacity-0' : 'opacity-100'}`}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              className="w-full h-full object-cover"
            >
              <source src="/leyonex-video-cikis.mp4" type="video/mp4" />
            </video>
            {/* Video üstüne hafif overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Normal background - video bittikten sonra görünür */}
        <div className={`absolute inset-0 bg-[#3f3c56] transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 bg-[url('/grid.svg')] opacity-10 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content - Video bitince beliriyor */}
      <div className={`relative z-10 container mx-auto px-4 text-center pt-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              ✨ Fuar Dünyasında Yeni Bir Soluk
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-primary font-bold">
              Fuar Dünyasında
            </span>
            <br />
            Fark Yaratan Çözümler
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Stand tasarımından organizasyona tüm hizmetleri tek noktadan yönetin
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/teklif-al">
              <Button
                size="lg"
                className="bg-primary hover:opacity-90 transition-opacity px-8 py-6 text-lg"
              >
                Hemen Başlayın
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 hover:bg-white/5 px-8 py-6 text-lg"
            >
              <Play className="mr-2" size={20} />
              Videoyu İzle
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">15+</div>
              <div className="text-sm text-gray-400 mt-1">Yıllık Deneyim</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
              <div className="text-sm text-gray-400 mt-1">Tamamlanan Proje</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">25+</div>
              <div className="text-sm text-gray-400 mt-1">Ülke</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/50" />
      </div>
    </section>
  );
}
