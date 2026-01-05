# LEYONEX - Proje Özeti

## 📍 Proje Bilgileri

**Proje Klasörü:**
```
C:\Users\ibaval055\Downloads\luna\Luna Organizasyon Firması\luna360expo
```

**GitHub:**
```
https://github.com/burkaykartal/LEYONEX
```

**Vercel:**
- Deploy: ✅ Aktif
- Auto-deploy: main branch

**Domain:**
- guzel.net (DNS ayarları bekleniyor)

---

## 🎨 Renk Paleti (RAL)

```
Primary (Ana):    RAL 3028 - #CB3234 (Pure Red)
Secondary (Gri):  RAL 7017 - #4A4A4A (Brown Grey)
Background:       RAL 9016 - #F1F0EA (Traffic White)
```

**Tema:**
- Ana arka plan: BEYAZ
- Kartlar/Sections: GRİ
- Butonlar/Vurgular: KIRMIZI
- Gradient: YOK (tümü kaldırıldı)

---

## 🎬 Video Sistemi

**Dosya:** `public/leyonex-video-cikis.mp4` (324KB)

**Ayarlar:**
```typescript
// src/components/sections/HeroSection.tsx
const [videoPlaying, setVideoPlaying] = useState(true);
const [showContent, setShowContent] = useState(false);
```

**Süre:** 3 saniye (timer ile)

**Akış:**
1. Video arka planda oynar (3 saniye)
2. Yazılar fade in
3. Video fade out
4. Normal hero görünür

---

## 🔑 Environment Variables

**Vercel'de ayarlanmış:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/giris
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/kayit
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/uye/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/uye/dashboard
```

**Local:** `.env.local` (oluşturuldu)

---

## 📦 Yapılan Değişiklikler

### Son Güncellemeler:
1. ✅ Rebrand: Luna360Expo → Leyonex
2. ✅ Arka plan rengi: Siyah → Gri (#2a2a2a)
3. ✅ RAL renk paleti uygulandı
4. ✅ Renkler tersine çevrildi (beyaz ↔ gri)
5. ✅ Tüm gradient'ler kaldırıldı
6. ✅ Hero background video eklendi (3 saniye)

### Dosya Değişiklikleri:
- `package.json` - Proje adı: leyonex
- `tailwind.config.ts` - RAL renkleri
- `globals.css` - Beyaz arka plan
- `HeroSection.tsx` - 3 saniyelik video
- Tüm sayfalar - Gradient temizlendi
- Email adresleri - info@leyonex.com

---

## 🚀 Başlatma Komutları

```bash
# Proje klasörüne git
cd "C:\Users\ibaval055\Downloads\luna\Luna Organizasyon Firması\luna360expo"

# Development server
npm run dev

# Build
npm run build

# Git push
git add .
git commit -m "mesaj"
git push
```

---

## 📋 Yapılacaklar (TODO)

### Domain Bağlama:
1. **guzel.net** DNS ayarları:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

2. Vercel'de domain ekle
3. Clerk'te domain ekle
4. `NEXT_PUBLIC_SITE_URL` güncelle

### Opsiyonel Servisler:
- [ ] Resend API (email)
- [ ] Sentry (hata takibi)
- [ ] Sanity CMS (şu an kullanılmıyor)

---

## 💡 Önemli Notlar

- Video devre dışı bırakmak için: `videoPlaying = false`
- Renk değiştirmek için: `tailwind.config.ts`
- Gradient eklemek için: ❌ İSTENMİYOR
- Email: info@leyonex.com
- WhatsApp: 905xxxxxxxxx

---

## 🆘 Claude Code'a Nasıl Başlanır?

Proje klasöründe:
```bash
claude
```

Bu dosyayı göster:
```
"PROJE-OZET.md dosyasını oku"
```

---

**Son Güncelleme:** 2026-01-06
**Durum:** ✅ Production Ready
