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
      tr: "İstanbul Mobilya Fuarı 2025",
      en: "Istanbul Furniture Fair 2025",
    },
    slug: "istanbul-mobilya-fuari-2025",
    sector: {
      tr: "Mobilya ve Dekorasyon",
      en: "Furniture and Decoration",
    },
    startDate: "2025-01-15",
    endDate: "2025-01-19",
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
      tr: "İstanbul Tekstil Fuarı 2025",
      en: "Istanbul Textile Fair 2025",
    },
    slug: "istanbul-tekstil-fuari-2025",
    sector: {
      tr: "Tekstil ve Hazır Giyim",
      en: "Textile and Ready-Made Clothing",
    },
    startDate: "2025-02-10",
    endDate: "2025-02-13",
    location: {
      venue: "İstanbul Expo Center",
      city: "İstanbul",
      country: "Türkiye",
    },
    description: {
      tr: "Tekstil sektörünün buluşma noktası. Yeni trendler ve networking fırsatları.",
      en: "The meeting point of the textile sector. New trends and networking opportunities.",
    },
    featured: true,
  },
  {
    id: 3,
    name: {
      tr: "Gıda Teknolojileri Fuarı 2025",
      en: "Food Technologies Fair 2025",
    },
    slug: "gida-teknolojileri-fuari-2025",
    sector: {
      tr: "Gıda ve İçecek",
      en: "Food and Beverage",
    },
    startDate: "2025-03-05",
    endDate: "2025-03-08",
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
    id: 4,
    name: {
      tr: "Enerji Fuarı 2025",
      en: "Energy Fair 2025",
    },
    slug: "enerji-fuari-2025",
    sector: {
      tr: "Enerji ve Çevre",
      en: "Energy and Environment",
    },
    startDate: "2025-04-12",
    endDate: "2025-04-15",
    location: {
      venue: "İstanbul Fuar Merkezi",
      city: "İstanbul",
      country: "Türkiye",
    },
    description: {
      tr: "Yenilenebilir enerji ve çevre teknolojileri fuarı.",
      en: "Renewable energy and environmental technologies fair.",
    },
    featured: false,
  },
  {
    id: 5,
    name: {
      tr: "Otomotiv Yan Sanayi Fuarı 2025",
      en: "Automotive Supply Industry Fair 2025",
    },
    slug: "otomotiv-yan-sanayi-fuari-2025",
    sector: {
      tr: "Otomotiv",
      en: "Automotive",
    },
    startDate: "2025-05-20",
    endDate: "2025-05-23",
    location: {
      venue: "TÜYAP Fuar Merkezi",
      city: "İstanbul",
      country: "Türkiye",
    },
    description: {
      tr: "Otomotiv yan sanayi sektörünün lider fuarı.",
      en: "The leading fair of the automotive supply industry sector.",
    },
    featured: false,
  },
];
