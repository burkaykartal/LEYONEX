"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, Download, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";

interface ParsedFair {
  name_tr: string;
  name_en: string;
  slug: string;
  sector_tr: string;
  sector_en: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  country: string;
  website?: string;
  description_tr: string;
  description_en: string;
  image?: string;
  featured: boolean;
}

export default function FuarImportPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [parsedData, setParsedData] = useState<ParsedFair[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Check if user is authorized
  if (isLoaded && user?.primaryEmailAddress?.emailAddress !== "agnathe@gmail.com") {
    router.push("/uye/dashboard");
    return null;
  }

  const downloadTemplate = () => {
    const template = [
      {
        name_tr: "Örnek Fuar Adı",
        name_en: "Sample Fair Name",
        slug: "ornek-fuar-adi-2025",
        sector_tr: "Teknoloji",
        sector_en: "Technology",
        startDate: "2025-06-15",
        endDate: "2025-06-18",
        venue: "İstanbul Fuar Merkezi",
        city: "İstanbul",
        country: "Türkiye",
        website: "https://example.com",
        description_tr: "Fuar açıklaması",
        description_en: "Fair description",
        image: "https://images.unsplash.com/photo-xxxxx",
        featured: "EVET",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fuarlar");
    XLSX.writeFile(wb, "fuar-import-sablonu.xlsx");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setParsedData([]);
    setGeneratedCode("");

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      const parsed: ParsedFair[] = jsonData.map((row) => ({
        name_tr: row.name_tr || "",
        name_en: row.name_en || "",
        slug: row.slug || "",
        sector_tr: row.sector_tr || "",
        sector_en: row.sector_en || "",
        startDate: row.startDate || "",
        endDate: row.endDate || "",
        venue: row.venue || "",
        city: row.city || "",
        country: row.country || "",
        website: row.website || "",
        description_tr: row.description_tr || "",
        description_en: row.description_en || "",
        image: row.image || "",
        featured: row.featured === "EVET" || row.featured === "TRUE" || row.featured === true,
      }));

      setParsedData(parsed);
      generateTypeScriptCode(parsed);
    } catch (err) {
      setError("Excel dosyası okunamadı. Lütfen şablonu kullanın.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const generateTypeScriptCode = (data: ParsedFair[]) => {
    const fairsCode = data.map((fair, index) => {
      return `  {
    id: ${index + 1},
    name: {
      tr: "${fair.name_tr}",
      en: "${fair.name_en}",
    },
    slug: "${fair.slug}",
    sector: {
      tr: "${fair.sector_tr}",
      en: "${fair.sector_en}",
    },
    startDate: "${fair.startDate}",
    endDate: "${fair.endDate}",
    location: {
      venue: "${fair.venue}",
      city: "${fair.city}",
      country: "${fair.country}",
    },${fair.website ? `\n    website: "${fair.website}",` : ""}
    description: {
      tr: "${fair.description_tr}",
      en: "${fair.description_en}",
    },${fair.image ? `\n    image: "${fair.image}",` : ""}
    featured: ${fair.featured},
  }`;
    });

    const code = `export const fairs: Fair[] = [\n${fairsCode.join(",\n")}\n];`;
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Kod kopyalandı! src/data/fairs.ts dosyasına yapıştırın.");
  };

  const saveToFile = async () => {
    try {
      const response = await fetch("/api/admin/update-fairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: generatedCode }),
      });

      if (response.ok) {
        alert("Fuarlar başarıyla güncellendi!");
        router.push("/fuarlar");
      } else {
        throw new Error("Güncelleme başarısız");
      }
    } catch (err) {
      setError("Dosya güncellenemedi. Kodu manuel olarak kopyalayın.");
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-primary font-bold">
              Fuar Excel İmport
            </span>
          </h1>
          <p className="text-gray-400">Excel dosyasından toplu fuar ekleme</p>
        </div>

        {/* Template Download */}
        <Card className="bg-dark-card border-white/10 p-6 mb-6">
          <div className="flex items-start gap-4">
            <FileSpreadsheet className="text-accent mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">1. Excel Şablonunu İndirin</h3>
              <p className="text-gray-400 mb-4">
                Önce şablon dosyasını indirin ve Excel ile doldurun.
              </p>
              <Button onClick={downloadTemplate} variant="outline">
                <Download className="mr-2" size={16} />
                Şablonu İndir
              </Button>
            </div>
          </div>
        </Card>

        {/* File Upload */}
        <Card className="bg-dark-card border-white/10 p-6 mb-6">
          <div className="flex items-start gap-4">
            <Upload className="text-accent mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">2. Doldurduğunuz Dosyayı Yükleyin</h3>
              <p className="text-gray-400 mb-4">Excel dosyanızı seçin ve yükleyin.</p>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:opacity-90 file:cursor-pointer
                  cursor-pointer"
              />
              {uploading && <p className="text-accent mt-2">Dosya işleniyor...</p>}
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/50 p-4 mb-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          </Card>
        )}

        {/* Preview */}
        {parsedData.length > 0 && (
          <Card className="bg-dark-card border-white/10 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              3. Önizleme ({parsedData.length} fuar bulundu)
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {parsedData.map((fair, idx) => (
                <div key={idx} className="bg-dark-lighter p-3 rounded-lg">
                  <p className="font-medium">
                    {fair.name_tr} ({fair.startDate} - {fair.endDate})
                  </p>
                  <p className="text-sm text-gray-400">
                    {fair.city}, {fair.country} • {fair.sector_tr}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Generated Code */}
        {generatedCode && (
          <Card className="bg-dark-card border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">4. Kodu Kopyalayın veya Otomatik Kaydedin</h3>
            <pre className="bg-dark-lighter p-4 rounded-lg overflow-x-auto mb-4 text-sm">
              <code>{generatedCode}</code>
            </pre>
            <div className="flex gap-3">
              <Button onClick={copyToClipboard} variant="outline">
                Kodu Kopyala
              </Button>
              <Button onClick={saveToFile} className="bg-primary">
                Otomatik Kaydet
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              Manuel yöntem: Kopyalayıp <code className="text-accent">src/data/fairs.ts</code>{" "}
              dosyasına yapıştırın.
            </p>
          </Card>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
}
