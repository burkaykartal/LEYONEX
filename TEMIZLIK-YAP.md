# 🧹 Flash Belleğe Hazırlama - Temizlik Adımları

## ⚠️ ÖNEMLİ: Aşağıdaki klasörleri/dosyaları SİL

Flash belleğe kopyalamadan ÖNCE şunları **MUTLAKA SİL**:

### 1️⃣ node_modules klasörünü SİL
```
📁 luna360expo/
   ❌ node_modules/  ← BU KLASÖRÜ TAM SİL (800-900 MB)
```

**Nasıl silinir:**
- Windows: Klasöre sağ tıkla → Delete (biraz zaman alabilir)
- Veya CMD: `rd /s /q node_modules`

### 2️⃣ .next klasörünü SİL
```
📁 luna360expo/
   ❌ .next/  ← BU KLASÖRÜ TAM SİL (50-100 MB)
```

**Nasıl silinir:**
- Windows: Klasöre sağ tıkla → Delete
- Veya CMD: `rd /s /q .next`

### 3️⃣ .env.local dosyasını SİL
```
📁 luna360expo/
   ❌ .env.local  ← BU DOSYAYI SİL (kişisel API keyleri içerir)
```

### 4️⃣ Diğer gereksiz dosyalar (varsa SİL)
```
❌ .vercel/
❌ .vscode/
❌ .idea/
❌ *.log
```

---

## ✅ KALACAK Dosyalar ve Klasörler

```
📁 luna360expo/
   ✅ src/                    # Kaynak kodlar
   ✅ public/                 # Görseller (logo.png, logo-white.png)
   ✅ messages/               # Çeviri dosyaları
   ✅ package.json            # Bağımlılıklar listesi
   ✅ package-lock.json       # Bağımlılık kilidi
   ✅ tsconfig.json           # TypeScript ayarları
   ✅ next.config.ts          # Next.js ayarları
   ✅ tailwind.config.ts      # Tailwind CSS
   ✅ postcss.config.mjs      # PostCSS
   ✅ components.json         # shadcn/ui
   ✅ .env.example            # Örnek environment variables
   ✅ .gitignore              # Git ignore
   ✅ README.md               # Dokümantasyon
   ✅ KURULUM-REHBERI.md      # Bu rehber
```

---

## 🎯 Sonuç

**Temizlik öncesi:** ~1 GB
**Temizlik sonrası:** ~3-5 MB ✨

---

## 📋 Hızlı Komutlar (CMD/PowerShell)

Proje klasöründe CMD açıp şunları çalıştır:

```cmd
cd "D:\web sitesi içerik\luna360expo"

rem node_modules sil
rd /s /q node_modules

rem .next sil
rd /s /q .next

rem .env.local sil
del .env.local

rem .vercel sil (varsa)
rd /s /q .vercel

echo Temizlik tamamlandi!
```

Veya tek komut:
```cmd
cd "D:\web sitesi içerik\luna360expo" && rd /s /q node_modules .next .vercel 2>nul && del .env.local 2>nul && echo Temizlik OK!
```

---

## ✅ Kontrol Et

Temizlik sonrası proje klasörünün boyutunu kontrol et:

```cmd
cd "D:\web sitesi içerik\luna360expo"
dir
```

**Beklenen boyut:** 3-5 MB civarı olmalı.

---

## 🚀 Artık Flash Belleğe Kopyalayabilirsin!

Temizlik tamamlandıysa:
1. Tüm `luna360expo` klasörünü flash belleğe kopyala
2. `KURULUM-REHBERI.md` dosyasını arkadaşına göster
3. İyi çalışmalar! 🎉
