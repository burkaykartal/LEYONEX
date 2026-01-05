# 🚀 LEYONEX - Kurulum ve Deploy Rehberi

## 📦 Flash Belleğinde Olması Gerekenler

Aşağıdaki klasör ve dosyalar **MUTLAKA** olmalı:

```
LEYONEX/
├── src/                          # Kaynak kodlar (ZORUNLU)
│   ├── app/                      # Next.js sayfa ve route'lar
│   ├── components/               # React bileşenleri
│   ├── data/                     # Static veriler (fairs, projects, services)
│   ├── emails/                   # Email şablonları
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Yardımcı fonksiyonlar
│   ├── types/                    # TypeScript tip tanımlamaları
│   └── middleware.ts             # Next.js middleware
│
├── public/                       # Statik dosyalar (ZORUNLU)
│   ├── logo.png                  # Site logosu
│   ├── logo-white.png            # Beyaz logo
│   └── referanslar/              # Proje görselleri (boş olabilir)
│
├── messages/                     # Çeviri dosyaları (ZORUNLU)
│   ├── tr.json                   # Türkçe çeviriler
│   └── en.json                   # İngilizce çeviriler
│
├── package.json                  # Bağımlılık listesi (ZORUNLU)
├── package-lock.json             # Bağımlılık kilidi
├── tsconfig.json                 # TypeScript ayarları
├── next.config.ts                # Next.js yapılandırması
├── tailwind.config.ts            # Tailwind CSS ayarları
├── postcss.config.mjs            # PostCSS ayarları
├── components.json               # shadcn/ui ayarları
├── .env.example                  # Örnek environment variables
├── .gitignore                    # Git ignore dosyası
└── README.md                     # Proje açıklaması
```

### ❌ OLMAMASI GEREKENLER (Silinmeli):

```
❌ node_modules/        # npm install ile yeniden oluşacak (~800 MB)
❌ .next/               # Build dosyaları, npm run build ile oluşacak
❌ .env.local           # Kişisel API keyleri, herkes kendi oluşturacak
❌ .vercel/             # Vercel deploy dosyaları
❌ .vscode/             # IDE ayarları
❌ .idea/               # IDE ayarları
```

### 📊 Doğru Flash Bellek Boyutu: **~3-5 MB**

---

## 🔧 1. Adım: Projeyi Bilgisayara Kopyala

```bash
# Flash belleği tak ve projeyi kopyala
# Örnek: C:\Projects\LEYONEX
```

**⚠️ ÖNEMLİ:** Flash belleği kopyaladıktan sonra yukarıdaki "OLMAMASI GEREKENLER" listesindeki klasörleri **SİL**.

---

## 🌐 2. Adım: GitHub'a Yükle

### a) Git Kurulumu
Git yüklü değilse: https://git-scm.com/downloads

### b) GitHub Repository Oluştur
1. https://github.com adresine git
2. Sağ üstten "New repository" tıkla
3. Repository adı: **LEYONEX**
4. Public veya Private seç
5. **Create repository** tıkla

### c) Claude Code ile Git İşlemlerini Yap

**Claude Code'u başlat:**
```bash
cd C:\Projects\LEYONEX
claude
```

**Claude Code'a söyle:**
```
GitHub'a yüklemek istiyorum. Repomu oluşturdum: https://github.com/KULLANICI-ADIN/LEYONEX
Lütfen git init yap, tüm dosyaları commit et ve push et.
```

Claude Code şunları otomatik yapacak:
```bash
git init
git add .
git commit -m "Initial commit: LEYONEX project setup"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADIN/LEYONEX.git
git push -u origin main
```

---

## 🔐 3. Adım: API Keylerini Al

### 📌 Clerk (Kullanıcı Girişi - ZORUNLU)

1. **Hesap Oluştur:** https://clerk.com
2. **Create Application** tıkla
3. Application Name: **LEYONEX**
4. Uygulamayı oluşturduktan sonra:
   - **API Keys** sekmesine git
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` kopyala
   - `CLERK_SECRET_KEY` kopyala
5. **Türkçe Dil Desteği:**
   - Sol menüden **Customization** → **Localization**
   - **Add language** → **Turkish** seç

### 📧 Resend (Email Gönderimi - Opsiyonel)

1. **Hesap Oluştur:** https://resend.com
2. **API Keys** → **Create API Key**
3. Key'i kopyala
4. Domain doğrulaması (prod için gerekli, test için gerekli değil)

### 🐛 Sentry (Hata Takibi - Opsiyonel)

1. **Hesap Oluştur:** https://sentry.io
2. **Create Project** → **Next.js** seç
3. DSN'i kopyala

---

## 🚀 4. Adım: Vercel'de Deploy

### a) Vercel'e Git
https://vercel.com → **Sign Up** (GitHub ile giriş yap)

### b) Projeyi Import Et
1. **Add New** → **Project**
2. GitHub hesabını bağla
3. **LEYONEX** repo'sunu seç
4. **Import** tıkla

### c) Environment Variables Ekle

**HENÜZ DEPLOY ETME!** Önce **Environment Variables** ekle:

```env
# Clerk Authentication (ZORUNLU)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/giris
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/kayit
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/uye/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/uye/dashboard

# Email - Resend (Opsiyonel)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=info@yourdomain.com

# Error Tracking - Sentry (Opsiyonel)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
```

**NOT:** Sanity ile ilgili environment variable'lara gerek yok, sistem artık static data kullanıyor.

### d) Deploy Et!
**Deploy** butonuna bas. 2-3 dakika içinde siteniz hazır!

### e) Clerk Domain Ayarları
1. Clerk Dashboard → **Domains**
2. Vercel URL'ini ekle: `https://your-project.vercel.app`

---

## 💻 5. Adım: Yerel Geliştirme (Local Development)

### a) Projeyi Klonla (Başka birisi için)
```bash
git clone https://github.com/KULLANICI-ADIN/LEYONEX.git
cd LEYONEX
```

### b) Bağımlılıkları Yükle
```bash
npm install
```

### c) Environment Variables Oluştur

**Claude Code ile:**
```bash
claude
```

**Claude'a söyle:**
```
.env.example dosyasını kopyalayıp .env.local oluştur ve bana düzenlemem için aç.
```

Veya **manuel:**
```bash
cp .env.example .env.local
```

**.env.local dosyasını düzenle** ve Clerk keylerini ekle:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
# ... diğer keyler
```

### d) Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

Tarayıcıda: http://localhost:3000

---

## 🛠️ 6. Claude Code ile Çalışma

### Claude Code Kurulumu
```bash
npm install -g @anthropic/claude-code
```

### Kullanım Örnekleri

**Proje klasöründe:**
```bash
cd C:\Projects\LEYONEX
claude
```

**Claude'a söyleyebileceklerin:**

1. **Değişiklik yapmak:**
   ```
   "Anasayfadaki başlık metnini 'Modern Fuar Standları' olarak değiştir"
   "İletişim formuna yeni bir alan ekle: 'Şirket Adı'"
   "Navbar'a 'Blog' menü öğesi ekle"
   ```

2. **Yeni özellik eklemek:**
   ```
   "Projeler sayfasına filtreleme özelliği ekle (kategoriye göre)"
   "Yeni bir hizmet ekle: '3D Render Hizmetleri'"
   ```

3. **Static data düzenlemek:**
   ```
   "src/data/projects.ts dosyasına yeni bir proje ekle"
   "src/data/fairs.ts'deki İstanbul fuarının tarihini güncelle"
   ```

4. **Git işlemleri:**
   ```
   "Değişiklikleri commit et ve GitHub'a push et"
   "Yeni bir branch oluştur: feature/yeni-tasarim"
   ```

5. **Build ve test:**
   ```
   "Projeyi build et ve hata var mı kontrol et"
   "TypeScript hatalarını düzelt"
   ```

---

## 🔄 Günlük Workflow

### Değişiklik Yapmak İçin:

```bash
# 1. Claude Code'u başlat
claude

# 2. İstediğin değişikliği söyle
> "Hakkımızda sayfasındaki metni güncelle"

# 3. Claude değişikliği yapar ve sorar:
> "Değişiklikleri GitHub'a push etmemi ister misin?"

# 4. Evet dersen otomatik:
git add .
git commit -m "feat: hakkımızda metni güncellendi"
git push

# 5. Vercel otomatik deploy eder (2-3 dakika)
```

---

## 📁 Önemli Dosyalar ve Klasörler

### Static Data (İçerik Yönetimi)
```
src/data/
├── projects.ts      # Projeler (portföy)
├── services.ts      # Hizmetler
└── fairs.ts         # Fuarlar
```

**Yeni proje eklemek için:**
```typescript
// src/data/projects.ts
export const projects: Project[] = [
  {
    id: 4,  // Son ID + 1
    title: { tr: "Proje Adı", en: "Project Name" },
    slug: "proje-adi",
    client: "Müşteri Adı",
    category: "Teknoloji",
    standType: "premium",
    squareMeters: 150,
    location: {
      city: "İstanbul",
      country: "Türkiye",
      fairName: "Fuar Adı"
    },
    year: 2024,
    heroImage: "https://placehold.co/1200x800",
    gallery: [
      "https://placehold.co/800x600",
      "https://placehold.co/800x600"
    ],
    challenge: { tr: "Zorluk...", en: "Challenge..." },
    solution: { tr: "Çözüm...", en: "Solution..." },
    result: { tr: "Sonuç...", en: "Result..." },
    featured: true
  },
  // ... diğer projeler
];
```

### Çeviri Dosyaları
```
messages/
├── tr.json         # Türkçe
└── en.json         # İngilizce
```

---

## ⚠️ Önemli Notlar

### ❗ Güvenlik
- **ASLA** `.env.local` dosyasını Git'e ekleme (zaten .gitignore'da var)
- API keylerini kimseyle paylaşma
- GitHub repo'su private ise sorun yok, public ise dikkat et

### 🔄 Vercel Auto-Deploy
- `main` branch'e her push'ta otomatik deploy olur
- Deploy süresi: ~2-3 dakika
- Deploy loglarını Vercel dashboard'dan izle

### 🌍 Domain Bağlama (Opsiyonel)
1. Vercel → Project Settings → Domains
2. Kendi domain'ini ekle (örn: `www.LEYONEX.com`)
3. DNS ayarlarını Vercel'in verdiği gibi yap
4. Clerk Dashboard'da da yeni domain'i ekle

### 📊 Sanity Kullanılmıyor
- Önceden Sanity CMS kullanılıyordu
- Artık static data kullanılıyor (`src/data/`)
- Sanity paketleri package.json'da var ama kullanılmıyor
- İstersen kaldırabilirsin (opsiyonel)

**Sanity paketlerini kaldırmak için (opsiyonel):**
```bash
npm uninstall @sanity/client @sanity/image-url next-sanity
```

---

## 🆘 Sorun Giderme

### Build Hatası
```bash
# Yerel build test et
npm run build

# Hata varsa Claude Code'a sor:
> "Build hatası var, düzeltir misin?"
```

### Clerk Çalışmıyor
1. Clerk Dashboard → Domains → Vercel URL'i eklenmiş mi?
2. `.env.local` dosyasında keyler doğru mu?
3. Clerk'te application active mi?

### Vercel Deploy Başarısız
1. Vercel → Deployments → Log'lara bak
2. Environment variables eksiksiz mi?
3. GitHub push başarılı mı?

### Claude Code Hatası
```bash
# Claude Code'u güncelle
npm update -g @anthropic/claude-code

# Yeniden başlat
claude
```

---

## 📞 Yardım

- **Claude Code Dokümantasyonu:** https://docs.anthropic.com/claude-code
- **Clerk Dokümantasyonu:** https://clerk.com/docs
- **Next.js Dokümantasyonu:** https://nextjs.org/docs
- **Vercel Dokümantasyonu:** https://vercel.com/docs

---

## ✅ Checklist

Arkadaşına vermeden önce kontrol et:

- [ ] `node_modules` klasörü **SİLİNMİŞ**
- [ ] `.next` klasörü **SİLİNMİŞ**
- [ ] `.env.local` dosyası **SİLİNMİŞ**
- [ ] `src/` klasörü **MEVCUT**
- [ ] `public/logo.png` ve `public/logo-white.png` **MEVCUT**
- [ ] `messages/tr.json` ve `messages/en.json` **MEVCUT**
- [ ] `package.json` **MEVCUT**
- [ ] `.env.example` **MEVCUT**
- [ ] `.gitignore` **MEVCUT**
- [ ] `README.md` **MEVCUT**
- [ ] **Flash bellek boyutu ~3-5 MB**

---

## 🎉 Başarılar!

Bu rehberi takip edersen sorunsuz bir şekilde:
- ✅ GitHub'a yükleyebilecek
- ✅ Clerk'e bağlayabilecek
- ✅ Vercel'de deploy edebilecek
- ✅ Claude Code ile değişiklik yapabilecek

**İyi çalışmalar!** 🚀
