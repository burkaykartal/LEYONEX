import Image from "next/image";

export default function ProcessManagement() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2d2d2d]">
            <span className="text-primary font-bold">360°</span> Fuar Süreç Yönetimi
          </h2>
          <p className="text-[#555555] text-lg">
            Tek fatura, tek rapor, tamamen denetlenebilir yapı
          </p>
        </div>

        {/* Process Image */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/surec-yonetimi.png"
              alt="360° Fuar Süreç Yönetimi - 3 Aşamalı Tek Sistem"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2d2d2d]">Fuar Öncesi Hazırlık</h3>
            <p className="text-[#555555]">
              Stand tasarım stratejisi, marka konumlandırma, malzeme verimliliği ve promosyon ürün stratejisi
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2d2d2d]">Fuar Zamanı Yönetimi</h3>
            <p className="text-[#555555]">
              Gerçek zamanlı destek, güvenlik koordinasyonu ve toplantı konaklama desteği
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2d2d2d]">Fuar Sonrası Analiz</h3>
            <p className="text-[#555555]">
              Kapsamlı hizmet raporlaması, fuar sonrası iyi görünüm anketi, tasarım ve gelişim önerileri
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
