// Projeler - Static Data
// Yeni proje eklemek için bu listeye ekleyin

export interface Project {
  id: number;
  title: { tr: string; en: string };
  slug: string;
  client: string;
  category: string;
  standType: "modular" | "medium" | "premium" | "digital";
  squareMeters: number;
  location: {
    city: string;
    country: string;
    fairName: string;
  };
  year: number;
  heroImage: string;
  gallery: string[];
  challenge: { tr: string; en: string };
  solution: { tr: string; en: string };
  result: { tr: string; en: string };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: {
      tr: "İdealmodel Maxima",
      en: "Idealmodel Maxima",
    },
    slug: "idealmodel-maxima",
    client: "İdealmodel",
    category: "Ev ve Mobilya",
    standType: "modular",
    squareMeters: 48,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "CNR Expo",
    },
    year: 2024,
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    ],
    challenge: {
      tr: "Müşteri geniş ürün yelpazesini sınırlı alanda sergilemek istiyordu.",
      en: "The client wanted to display their wide product range in a limited space.",
    },
    solution: {
      tr: "Modüler stand tasarımı ile esnek sergileme alanları oluşturduk.",
      en: "We created flexible display areas with modular stand design.",
    },
    result: {
      tr: "Stand %30 daha fazla ürün sergileme kapasitesi sağladı.",
      en: "The stand provided 30% more product display capacity.",
    },
    featured: true,
  },
  {
    id: 2,
    title: {
      tr: "Green Energy",
      en: "Green Energy",
    },
    slug: "green-energy",
    client: "Green Energy",
    category: "Enerji",
    standType: "premium",
    squareMeters: 72,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "İstanbul Expo Center",
    },
    year: 2024,
    heroImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&q=80",
    ],
    challenge: {
      tr: "Yenilenebilir enerji çözümlerini görsel olarak etkileyici bir şekilde sunmak.",
      en: "To present renewable energy solutions in a visually impressive way.",
    },
    solution: {
      tr: "Dijital ekranlar ve interaktif demo alanları ile modern bir stand tasarladık.",
      en: "We designed a modern stand with digital screens and interactive demo areas.",
    },
    result: {
      tr: "Fuar boyunca 1500+ ziyaretçi çekildi ve 120 nitelikli lead elde edildi.",
      en: "Attracted 1500+ visitors during the fair and obtained 120 qualified leads.",
    },
    featured: true,
  },
  {
    id: 3,
    title: {
      tr: "Inkwer",
      en: "Inkwer",
    },
    slug: "inkwer",
    client: "Inkwer",
    category: "Tekstil",
    standType: "digital",
    squareMeters: 36,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "CNR Expo",
    },
    year: 2024,
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    ],
    challenge: {
      tr: "Dijital baskı teknolojilerini canlı olarak göstermek.",
      en: "To demonstrate digital printing technologies live.",
    },
    solution: {
      tr: "LED ekranlar ve canlı demo alanı ile interaktif deneyim sundul.",
      en: "Interactive experience offered with LED screens and live demo area.",
    },
    result: {
      tr: "Canlı demolar sayesinde %45 artışla satış görüşmeleri gerçekleşti.",
      en: "Sales meetings took place with a 45% increase thanks to live demos.",
    },
    featured: true,
  },
  {
    id: 4,
    title: {
      tr: "Duoline",
      en: "Duoline",
    },
    slug: "duoline",
    client: "Duoline",
    category: "Teknoloji",
    standType: "medium",
    squareMeters: 54,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "İstanbul Fuar Merkezi",
    },
    year: 2023,
    heroImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    ],
    challenge: {
      tr: "Teknoloji ürünlerini modern ve ilgi çekici şekilde sergilemek.",
      en: "To display technology products in a modern and attractive way.",
    },
    solution: {
      tr: "Minimalist tasarım ve ürün odaklı yerleşim ile dikkat çektik.",
      en: "We attracted attention with minimalist design and product-focused layout.",
    },
    result: {
      tr: "Başarılı bir fuar dönemi ve yeni iş ortaklıkları.",
      en: "Successful fair period and new business partnerships.",
    },
    featured: true,
  },
  {
    id: 5,
    title: {
      tr: "Anisah Coffee",
      en: "Anisah Coffee",
    },
    slug: "anisah-coffee",
    client: "Anisah Coffee",
    category: "Gıda",
    standType: "premium",
    squareMeters: 42,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "WorldFood İstanbul",
    },
    year: 2023,
    heroImage: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    ],
    challenge: {
      tr: "Kahve markasının premium imajını yansıtan bir stand.",
      en: "A stand reflecting the premium image of the coffee brand.",
    },
    solution: {
      tr: "Ahşap detaylar ve sıcak aydınlatma ile boutique bir atmosfer.",
      en: "A boutique atmosphere with wood details and warm lighting.",
    },
    result: {
      tr: "Standın tasarımı fuarın en beğenilen standları arasına girdi.",
      en: "The stand design was among the most appreciated stands of the fair.",
    },
    featured: true,
  },
  {
    id: 6,
    title: {
      tr: "Özen Promosyon",
      en: "Özen Promosyon",
    },
    slug: "ozen-promosyon",
    client: "Özen Promosyon",
    category: "Promosyon",
    standType: "modular",
    squareMeters: 32,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "İstanbul Fuar Merkezi",
    },
    year: 2023,
    heroImage: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1573165231977-3f0e27806045?w=800&q=80",
    ],
    challenge: {
      tr: "Çok çeşitli promosyon ürünlerini düzenli sergilemek.",
      en: "To display a wide variety of promotional products in an organized manner.",
    },
    solution: {
      tr: "Modüler raf sistemleri ile esnek sergileme alanları.",
      en: "Flexible display areas with modular shelving systems.",
    },
    result: {
      tr: "Ürün çeşitliliği etkin şekilde sunuldu ve yüksek ilgi gördü.",
      en: "Product diversity was presented effectively and received high interest.",
    },
    featured: true,
  },
];
