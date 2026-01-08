-- Seed Fairs Data
-- Run this SQL directly in Vercel Postgres Query interface
-- Dashboard → Storage → Your Database → Query tab

-- Clear existing fairs (optional - uncomment if you want to reset)
-- DELETE FROM "Fair";

-- Insert 10 fairs
INSERT INTO "Fair" (
  id, name_tr, name_en, description_tr, description_en,
  sector, country, city, venue,
  "startDate", "endDate", status,
  "websiteUrl", "createdAt", "updatedAt"
) VALUES

-- 1. İstanbul Mobilya Fuarı 2026
(
  'cm4z1fair001',
  'İstanbul Mobilya Fuarı 2026',
  'Istanbul Furniture Fair 2026',
  'Türkiye''nin en büyük mobilya ve dekorasyon fuarı. Yurt içi ve yurt dışından binlerce ziyaretçi.',
  'Turkey''s largest furniture and decoration fair. Thousands of visitors from domestic and abroad.',
  'Mobilya ve Dekorasyon',
  'Türkiye',
  'İstanbul',
  'CNR Expo',
  '2026-01-15'::timestamp,
  '2026-01-19'::timestamp,
  'UPCOMING',
  'https://www.cnrexpo.com',
  NOW(),
  NOW()
),

-- 2. Hannover Messe 2026
(
  'cm4z1fair002',
  'Hannover Messe 2026',
  'Hannover Messe 2026',
  'Dünyanın en büyük endüstri teknolojileri fuarı. Otomasyon, enerji ve dijital dönüşüm.',
  'World''s largest industrial technology fair. Automation, energy and digital transformation.',
  'Endüstri ve Teknoloji',
  'Almanya',
  'Hannover',
  'Hannover Messe',
  '2026-04-20'::timestamp,
  '2026-04-24'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 3. CES 2026
(
  'cm4z1fair003',
  'CES 2026',
  'CES 2026',
  'Tüketici elektroniği ve teknoloji sektörünün en prestijli fuarı.',
  'The most prestigious fair of consumer electronics and technology sector.',
  'Teknoloji ve Elektronik',
  'ABD',
  'Las Vegas',
  'Las Vegas Convention Center',
  '2026-01-06'::timestamp,
  '2026-01-09'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 4. Mobile World Congress 2026
(
  'cm4z1fair004',
  'Mobile World Congress 2026',
  'Mobile World Congress 2026',
  'Mobil teknoloji ve telekomunikasyon sektörünün lider fuarı.',
  'The leading fair of mobile technology and telecommunications sector.',
  'Mobil Teknoloji',
  'İspanya',
  'Barcelona',
  'Fira Barcelona',
  '2026-02-23'::timestamp,
  '2026-02-26'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 5. Gıda Teknolojileri Fuarı 2026
(
  'cm4z1fair005',
  'Gıda Teknolojileri Fuarı 2026',
  'Food Technologies Fair 2026',
  'Gıda sektörünün en yenilikçi ürün ve teknolojileri bir arada.',
  'The most innovative products and technologies of the food sector together.',
  'Gıda ve İçecek',
  'Türkiye',
  'İstanbul',
  'CNR Expo',
  '2026-03-10'::timestamp,
  '2026-03-13'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 6. Anuga 2026
(
  'cm4z1fair006',
  'Anuga 2026',
  'Anuga 2026',
  'Dünyanın en büyük gıda ve içecek fuarı. 170 ülkeden katılımcı.',
  'World''s largest food and beverage fair. Participants from 170 countries.',
  'Gıda ve İçecek',
  'Almanya',
  'Köln',
  'Koelnmesse',
  '2026-10-10'::timestamp,
  '2026-10-14'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 7. Bauma 2026
(
  'cm4z1fair007',
  'Bauma 2026',
  'Bauma 2026',
  'İnşaat makineleri ve madencilik ekipmanları fuarı. 3000+ katılımcı.',
  'Construction machinery and mining equipment fair. 3000+ exhibitors.',
  'İnşaat ve Madencilik',
  'Almanya',
  'Münih',
  'Messe München',
  '2026-04-06'::timestamp,
  '2026-04-12'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 8. Dubai World Trade Centre Expo 2026
(
  'cm4z1fair008',
  'Dubai World Trade Centre Expo 2026',
  'Dubai World Trade Centre Expo 2026',
  'Ortadoğu''nun en büyük ticaret ve inovasyon fuarı.',
  'Middle East''s largest trade and innovation fair.',
  'Ticaret ve İnovasyon',
  'BAE',
  'Dubai',
  'Dubai World Trade Centre',
  '2026-05-15'::timestamp,
  '2026-05-19'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 9. Automechanika 2026
(
  'cm4z1fair009',
  'Automechanika 2026',
  'Automechanika 2026',
  'Otomotiv yan sanayi ve servis ekipmanları fuarı.',
  'Automotive aftermarket and service equipment fair.',
  'Otomotiv',
  'Almanya',
  'Frankfurt',
  'Messe Frankfurt',
  '2026-09-15'::timestamp,
  '2026-09-19'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
),

-- 10. GITEX Technology Week 2026
(
  'cm4z1fair010',
  'GITEX Technology Week 2026',
  'GITEX Technology Week 2026',
  'Ortadoğu ve Afrika''nın en büyük teknoloji fuarı.',
  'Middle East and Africa''s largest technology fair.',
  'Bilişim Teknolojileri',
  'BAE',
  'Dubai',
  'Dubai World Trade Centre',
  '2026-10-18'::timestamp,
  '2026-10-22'::timestamp,
  'UPCOMING',
  NULL,
  NOW(),
  NOW()
);

-- Verify inserts
SELECT COUNT(*) as total_fairs FROM "Fair";
SELECT name_tr, sector, city, country, "startDate" FROM "Fair" ORDER BY "startDate";
