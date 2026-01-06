// Fuarlar - Static Data
// Fuar eklemek/güncellemek için bu listeyi düzenleyin

export interface Fair {
  id: number;
  name: { tr: string; en: string };
  slug: string;
  sector: { tr: string; en: string };
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  location: {
    venue: string;
    city: string;
    country: string;
  };
  website?: string;
  description: { tr: string; en: string };
  image?: string;
  featured: boolean;
}

export const fairs: Fair[] = [
  {
    id: 1,
    name: {
      tr: "İstanbul Mobilya Fuarı 2026",
      en: "Istanbul Furniture Fair 2026",
    },
    slug: "istanbul-mobilya-fuari-2026",
    sector: {
      tr: "Mobilya ve Dekorasyon",
      en: "Furniture and Decoration",
    },
    startDate: "2026-01-15",
    endDate: "2026-01-19",
    location: {
      venue: "CNR Expo",
      city: "İstanbul",
      country: "Türkiye",
    },
    website: "https://www.cnrexpo.com",
    description: {
      tr: "Türkiye'nin en büyük mobilya ve dekorasyon fuarı. Yurt içi ve yurt dışından binlerce ziyaretçi.",
      en: "Turkey's largest furniture and decoration fair. Thousands of visitors from domestic and abroad.",
    },
    featured: true,
  },
  {
    id: 2,
    name: {
      tr: "Hannover Messe 2026",
      en: "Hannover Messe 2026",
    },
    slug: "hannover-messe-2026",
    sector: {
      tr: "Endüstri ve Teknoloji",
      en: "Industry and Technology",
    },
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    location: {
      venue: "Hannover Messe",
      city: "Hannover",
      country: "Almanya",
    },
    description: {
      tr: "Dünyanın en büyük endüstri teknolojileri fuarı. Otomasyon, enerji ve dijital dönüşüm.",
      en: "World's largest industrial technology fair. Automation, energy and digital transformation.",
    },
    featured: true,
  },
  {
    id: 3,
    name: {
      tr: "CES 2026",
      en: "CES 2026",
    },
    slug: "ces-2026",
    sector: {
      tr: "Teknoloji ve Elektronik",
      en: "Technology and Electronics",
    },
    startDate: "2026-01-06",
    endDate: "2026-01-09",
    location: {
      venue: "Las Vegas Convention Center",
      city: "Las Vegas",
      country: "ABD",
    },
    description: {
      tr: "Tüketici elektroniği ve teknoloji sektörünün en prestijli fuarı.",
      en: "The most prestigious fair of consumer electronics and technology sector.",
    },
    featured: true,
  },
  {
    id: 4,
    name: {
      tr: "Mobile World Congress 2026",
      en: "Mobile World Congress 2026",
    },
    slug: "mobile-world-congress-2026",
    sector: {
      tr: "Mobil Teknoloji",
      en: "Mobile Technology",
    },
    startDate: "2026-02-23",
    endDate: "2026-02-26",
    location: {
      venue: "Fira Barcelona",
      city: "Barcelona",
      country: "İspanya",
    },
    description: {
      tr: "Mobil teknoloji ve telekomunikasyon sektörünün lider fuarı.",
      en: "The leading fair of mobile technology and telecommunications sector.",
    },
    featured: true,
  },
  {
    id: 5,
    name: {
      tr: "Gıda Teknolojileri Fuarı 2026",
      en: "Food Technologies Fair 2026",
    },
    slug: "gida-teknolojileri-fuari-2026",
    sector: {
      tr: "Gıda ve İçecek",
      en: "Food and Beverage",
    },
    startDate: "2026-03-10",
    endDate: "2026-03-13",
    location: {
      venue: "CNR Expo",
      city: "İstanbul",
      country: "Türkiye",
    },
    description: {
      tr: "Gıda sektörünün en yenilikçi ürün ve teknolojileri bir arada.",
      en: "The most innovative products and technologies of the food sector together.",
    },
    featured: false,
  },
  {
    id: 6,
    name: {
      tr: "Anuga 2026",
      en: "Anuga 2026",
    },
    slug: "anuga-2026",
    sector: {
      tr: "Gıda ve İçecek",
      en: "Food and Beverage",
    },
    startDate: "2026-10-10",
    endDate: "2026-10-14",
    location: {
      venue: "Koelnmesse",
      city: "Köln",
      country: "Almanya",
    },
    description: {
      tr: "Dünyanın en büyük gıda ve içecek fuarı. 170 ülkeden katılımcı.",
      en: "World's largest food and beverage fair. Participants from 170 countries.",
    },
    featured: true,
  },
  {
    id: 7,
    name: {
      tr: "Bauma 2026",
      en: "Bauma 2026",
    },
    slug: "bauma-2026",
    sector: {
      tr: "İnşaat ve Madencilik",
      en: "Construction and Mining",
    },
    startDate: "2026-04-06",
    endDate: "2026-04-12",
    location: {
      venue: "Messe München",
      city: "Münih",
      country: "Almanya",
    },
    description: {
      tr: "İnşaat makineleri ve madencilik ekipmanları fuarı. 3000+ katılımcı.",
      en: "Construction machinery and mining equipment fair. 3000+ exhibitors.",
    },
    featured: false,
  },
  {
    id: 8,
    name: {
      tr: "Dubai World Trade Centre Expo 2026",
      en: "Dubai World Trade Centre Expo 2026",
    },
    slug: "dubai-expo-2026",
    sector: {
      tr: "Ticaret ve İnovasyon",
      en: "Trade and Innovation",
    },
    startDate: "2026-05-15",
    endDate: "2026-05-19",
    location: {
      venue: "Dubai World Trade Centre",
      city: "Dubai",
      country: "BAE",
    },
    description: {
      tr: "Ortadoğu'nun en büyük ticaret ve inovasyon fuarı.",
      en: "Middle East's largest trade and innovation fair.",
    },
    featured: false,
  },
  {
    id: 9,
    name: {
      tr: "Automechanika 2026",
      en: "Automechanika 2026",
    },
    slug: "automechanika-2026",
    sector: {
      tr: "Otomotiv",
      en: "Automotive",
    },
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    location: {
      venue: "Messe Frankfurt",
      city: "Frankfurt",
      country: "Almanya",
    },
    description: {
      tr: "Otomotiv yan sanayi ve servis ekipmanları fuarı.",
      en: "Automotive aftermarket and service equipment fair.",
    },
    featured: false,
  },
  {
    id: 10,
    name: {
      tr: "GITEX Technology Week 2026",
      en: "GITEX Technology Week 2026",
    },
    slug: "gitex-2026",
    sector: {
      tr: "Bilişim Teknolojileri",
      en: "Information Technology",
    },
    startDate: "2026-10-18",
    endDate: "2026-10-22",
    location: {
      venue: "Dubai World Trade Centre",
      city: "Dubai",
      country: "BAE",
    },
    description: {
      tr: "Ortadoğu ve Afrika'nın en büyük teknoloji fuarı.",
      en: "Middle East and Africa's largest technology fair.",
    },
    featured: false,
  },
];
