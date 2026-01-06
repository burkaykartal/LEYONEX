// Şuanda Çalışılan Fuarlar - Active Fairs Data
// Aktif fuar projeleri

export interface ActiveFair {
  id: number;
  name: string;
  city: string;
  country: string;
  startDate: string; // DD Ay YYYY
  endDate: string; // DD Ay YYYY
  logo?: string; // Fuar logosu path'i (opsiyonel)
}

export const activeFairs: ActiveFair[] = [
  {
    id: 1,
    name: "Istanbul Furniture Fair",
    city: "Istanbul",
    country: "Türkiye",
    startDate: "27 Ocak 2026",
    endDate: "31 Ocak 2026",
  },
  {
    id: 2,
    name: "Agro Expo",
    city: "Izmir",
    country: "Türkiye",
    startDate: "3 Şubat 2026",
    endDate: "7 Şubat 2026",
  },
  {
    id: 3,
    name: "EISENWARENMESSE",
    city: "Köln",
    country: "Germany",
    startDate: "3 Mart 2026",
    endDate: "6 Mart 2026",
  },
  {
    id: 4,
    name: "ITB Berlin",
    city: "Berlin",
    country: "Germany",
    startDate: "3 Mart 2026",
    endDate: "5 Mart 2026",
  },
  {
    id: 5,
    name: "Cosmoprof Worldwide",
    city: "Bologna",
    country: "Italy",
    startDate: "26 Mart 2026",
    endDate: "28 Mart 2026",
  },
  {
    id: 6,
    name: "MCE Mostra Convegno Expocomfort",
    city: "Milano",
    country: "Italy",
    startDate: "24 Mart 2026",
    endDate: "27 Mart 2026",
  },
  {
    id: 7,
    name: "Marble İzmir",
    city: "Izmir",
    country: "Türkiye",
    startDate: "14 Nisan 2026",
    endDate: "17 Nisan 2026",
  },
  {
    id: 8,
    name: "Hannover Messe",
    city: "Hannover",
    country: "Germany",
    startDate: "20 Nisan 2026",
    endDate: "24 Nisan 2026",
  },
  {
    id: 9,
    name: "Mebelexpo",
    city: "Tashkent",
    country: "Uzbekistan",
    startDate: "28 Nisan 2026",
    endDate: "30 Nisan 2026",
  },
  {
    id: 10,
    name: "Saha Expo",
    city: "İstanbul",
    country: "Türkiye",
    startDate: "5 Mayıs 2026",
    endDate: "9 Mayıs 2026",
  },
  {
    id: 11,
    name: "Metalloobrabotka",
    city: "Moscow",
    country: "Russia",
    startDate: "12 Mayıs 2026",
    endDate: "15 Mayıs 2026",
  },
];
