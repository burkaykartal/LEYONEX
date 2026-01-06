// Hizmetler - Static Data
// Değişiklik yapmak için bu dosyayı düzenleyin

export interface Service {
  id: number;
  title: { tr: string; en: string };
  slug: string;
  shortDescription: { tr: string; en: string };
  fullDescription: { tr: string; en: string };
  icon: string;
  order: number;
  subServices: Array<{
    name: { tr: string; en: string };
    description: { tr: string; en: string };
  }>;
}

export const services: Service[] = [
  {
    id: 1,
    title: {
      tr: "Stand Tasarımı & Kurulumu",
      en: "Stand Design & Installation",
    },
    slug: "stand-tasarimi",
    shortDescription: {
      tr: "Modüler, orta seviye, premium ve dijital ekranlı stand çözümleri",
      en: "Modular, medium, premium and digital display stand solutions",
    },
    fullDescription: {
      tr: "Fuar standınız markanızın vitrinidir. Profesyonel tasarım ve kurulum hizmetimizle ziyaretçilerinizde unutulmaz bir izlenim bırakın.",
      en: "Your exhibition stand is your brand's showcase. Leave an unforgettable impression on your visitors with our professional design and installation service.",
    },
    icon: "box",
    order: 1,
    subServices: [
      {
        name: { tr: "Modüler Stand", en: "Modular Stand" },
        description: {
          tr: "Ekonomik ve pratik modüler stand çözümleri",
          en: "Economic and practical modular stand solutions",
        },
      },
      {
        name: { tr: "Orta Seviye Stand", en: "Medium Level Stand" },
        description: {
          tr: "Dengeli fiyat-performans sunan standlar",
          en: "Stands offering balanced price-performance",
        },
      },
      {
        name: { tr: "Premium Stand", en: "Premium Stand" },
        description: {
          tr: "Özel tasarım, yüksek kalite premium standlar",
          en: "Custom design, high quality premium stands",
        },
      },
      {
        name: { tr: "Dijital Ekranlı", en: "Digital Display" },
        description: {
          tr: "LED ekran ve dijital görsel entegrasyonlu standlar",
          en: "Stands with LED screen and digital visual integration",
        },
      },
    ],
  },
  {
    id: 2,
    title: {
      tr: "Hostes & Personel Desteği",
      en: "Hostess & Staff Support",
    },
    slug: "hostes-personel",
    shortDescription: {
      tr: "VIP, servis, formal ve İngilizce bilen profesyonel personel",
      en: "VIP, service, formal and English-speaking professional staff",
    },
    fullDescription: {
      tr: "Fuarınızda profesyonel ve deneyimli personel ekibimizle ziyaretçilerinize en iyi hizmeti sunun.",
      en: "Provide the best service to your visitors with our professional and experienced staff team at your fair.",
    },
    icon: "users",
    order: 2,
    subServices: [
      {
        name: { tr: "VIP Hostes", en: "VIP Hostess" },
        description: {
          tr: "Özel misafirleriniz için VIP hostes hizmeti",
          en: "VIP hostess service for your special guests",
        },
      },
      {
        name: { tr: "Servis Personeli", en: "Service Staff" },
        description: {
          tr: "İkram ve servis için deneyimli personel",
          en: "Experienced staff for catering and service",
        },
      },
      {
        name: { tr: "Formal Personel", en: "Formal Staff" },
        description: {
          tr: "Kurumsal etkinlikler için özel eğitimli personel",
          en: "Specially trained staff for corporate events",
        },
      },
      {
        name: { tr: "İngilizce Bilen", en: "English Speaking" },
        description: {
          tr: "Uluslararası fuarlar için yabancı dil bilen personel",
          en: "Foreign language speaking staff for international fairs",
        },
      },
    ],
  },
  {
    id: 3,
    title: {
      tr: "Otel & Konaklama",
      en: "Hotel & Accommodation",
    },
    slug: "otel-konaklama",
    shortDescription: {
      tr: "3-5 yıldız otellerde fuar alanına yakın konaklama çözümleri",
      en: "Accommodation solutions in 3-5 star hotels close to the fair area",
    },
    fullDescription: {
      tr: "Fuar süreciniz boyunca konforlu konaklama seçenekleri sunuyoruz. Fuar alanına yakın veya şehir merkezinde oteller.",
      en: "We offer comfortable accommodation options throughout your fair process. Hotels near the fair area or in the city center.",
    },
    icon: "hotel",
    order: 3,
    subServices: [
      {
        name: { tr: "Lüks 5 Yıldız", en: "Luxury 5 Star" },
        description: {
          tr: "Premium konfor ve hizmet",
          en: "Premium comfort and service",
        },
      },
      {
        name: { tr: "4 Yıldız Otel", en: "4 Star Hotel" },
        description: {
          tr: "Konfor ve uygun fiyat dengesi",
          en: "Balance of comfort and affordable price",
        },
      },
      {
        name: { tr: "Fuar Alanına Yakın", en: "Near Fair Area" },
        description: {
          tr: "Minimum ulaşım mesafesi",
          en: "Minimum transportation distance",
        },
      },
    ],
  },
  {
    id: 4,
    title: {
      tr: "Stand İkramları",
      en: "Stand Catering",
    },
    slug: "stand-ikramlari",
    shortDescription: {
      tr: "Kuru pasta, tatlı, çay/kahve, meyve ve premium ikram seçenekleri",
      en: "Cookies, desserts, tea/coffee, fruit and premium catering options",
    },
    fullDescription: {
      tr: "Ziyaretçilerinize özel hazırlanmış ikramlarla standınızda hoş bir atmosfer yaratın.",
      en: "Create a pleasant atmosphere in your stand with specially prepared treats for your visitors.",
    },
    icon: "coffee",
    order: 4,
    subServices: [],
  },
  {
    id: 5,
    title: {
      tr: "Fotoğraf & Video Çekimi",
      en: "Photography & Video Shooting",
    },
    slug: "fotograf-video",
    shortDescription: {
      tr: "Stand görüntüleri, ürün odaklı, röportaj ve drone çekimleri",
      en: "Stand visuals, product-focused, interview and drone shootings",
    },
    fullDescription: {
      tr: "Profesyonel fotoğraf ve video ekibimizle fuar anlarınızı ölümsüzleştirin.",
      en: "Immortalize your fair moments with our professional photography and video team.",
    },
    icon: "camera",
    order: 5,
    subServices: [],
  },
  {
    id: 6,
    title: {
      tr: "Ulaşım & Shuttle",
      en: "Transportation & Shuttle",
    },
    slug: "ulasim-shuttle",
    shortDescription: {
      tr: "Günlük shuttle, VIP araç, grup ve havalimanı transfer hizmetleri",
      en: "Daily shuttle, VIP vehicle, group and airport transfer services",
    },
    fullDescription: {
      tr: "Fuar süreciniz boyunca rahat ve güvenli ulaşım hizmetleri sunuyoruz.",
      en: "We offer comfortable and safe transportation services throughout your fair process.",
    },
    icon: "car",
    order: 6,
    subServices: [],
  },
  {
    id: 7,
    title: {
      tr: "Kurumsal Hediye & Promosyon",
      en: "Corporate Gifts & Promotion",
    },
    slug: "kurumsal-hediye",
    shortDescription: {
      tr: "Klasik, premium VIP ve kurumsal kıyafet promosyon ürünleri",
      en: "Classic, premium VIP and corporate apparel promotional products",
    },
    fullDescription: {
      tr: "Markanızı hatırlatacak özel tasarım kurumsal hediye ve promosyon ürünleri.",
      en: "Custom designed corporate gifts and promotional products to remind your brand.",
    },
    icon: "gift",
    order: 7,
    subServices: [],
  },
  {
    id: 8,
    title: {
      tr: "Akşam Yemeği & Gala",
      en: "Dinner & Gala",
    },
    slug: "aksam-yemegi-gala",
    shortDescription: {
      tr: "Gala yemeği, cocktail, özel davet ve VIP masa organizasyonları",
      en: "Gala dinner, cocktail, special invitation and VIP table organizations",
    },
    fullDescription: {
      tr: "Müşterileriniz ve iş ortaklarınız için unutulmaz gala ve yemek organizasyonları.",
      en: "Unforgettable gala and dinner organizations for your customers and business partners.",
    },
    icon: "utensils",
    order: 8,
    subServices: [],
  },
  {
    id: 9,
    title: {
      tr: "Fuar Danışmanlığı",
      en: "Fair Consulting",
    },
    slug: "fuar-danismanligi",
    shortDescription: {
      tr: "Fuar seçimi, bütçe planlama, strateji ve analiz hizmetleri",
      en: "Fair selection, budget planning, strategy and analysis services",
    },
    fullDescription: {
      tr: "Deneyimli ekibimizle fuar sürecinizi A'dan Z'ye planlayın ve yönetin.",
      en: "Plan and manage your fair process from A to Z with our experienced team.",
    },
    icon: "lightbulb",
    order: 9,
    subServices: [],
  },
  {
    id: 10,
    title: {
      tr: "Devlet Desteği Danışmanlığı",
      en: "Government Support Consulting",
    },
    slug: "devlet-destegi-danismanligi",
    shortDescription: {
      tr: "Fuar katılımlarınız için devlet teşvik ve destek programları danışmanlığı",
      en: "Government incentive and support programs consulting for your fair participations",
    },
    fullDescription: {
      tr: "Fuar katılımlarınızda yararlanabileceğiniz KOSGEB, TİM, TOBB ve diğer devlet teşvik programları için profesyonel danışmanlık hizmeti sunuyoruz. Başvuru süreçlerinizi yönetir ve maksimum destek almanızı sağlarız.",
      en: "We provide professional consulting services for KOSGEB, TİM, TOBB and other government incentive programs that you can benefit from in your fair participations. We manage your application processes and ensure you receive maximum support.",
    },
    icon: "award",
    order: 10,
    subServices: [],
  },
];
