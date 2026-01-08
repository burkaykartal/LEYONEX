"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Loader2 } from "lucide-react";

// Form validation schema
const companyProfileSchema = z.object({
	name: z.string().min(2, "Firma adı en az 2 karakter olmalıdır"),
	country: z.string().min(2, "Ülke seçiniz"),
	city: z.string().min(2, "İl/Şehir giriniz"),
	contactPerson: z.string().min(2, "Yetkili kişi adı giriniz"),
	contactEmail: z.string().email("Geçerli bir e-posta adresi giriniz"),
	contactPhone: z.string().optional(),
	sector: z.string().min(2, "Sektör seçiniz"),
	annualFairCount: z.coerce
		.number()
		.min(0, "En az 0 olmalıdır")
		.max(100, "En fazla 100 olabilir"),
	productivityScore: z.coerce
		.number()
		.min(1, "En az 1 olmalıdır")
		.max(10, "En fazla 10 olabilir"),
});

type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;

// Common countries for fair participation
const COUNTRIES = [
	"Türkiye",
	"Almanya",
	"İtalya",
	"Fransa",
	"İspanya",
	"İngiltere",
	"ABD",
	"Çin",
	"BAE",
	"Rusya",
	"Diğer",
];

// Common sectors
const SECTORS = [
	"Mobilya ve Dekorasyon",
	"Teknoloji ve Elektronik",
	"Gıda ve İçecek",
	"Tekstil ve Hazır Giyim",
	"Otomotiv",
	"İnşaat ve Yapı",
	"Makine ve Ekipman",
	"Enerji",
	"Sağlık ve Medikal",
	"Kimya",
	"Tarım",
	"Diğer",
];

interface CompanyProfileFormProps {
	onSuccess?: () => void;
}

export default function CompanyProfileForm({
	onSuccess,
}: CompanyProfileFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<CompanyProfileFormData>({
		resolver: zodResolver(companyProfileSchema),
		defaultValues: {
			annualFairCount: 0,
			productivityScore: 5,
		},
	});

	const selectedCountry = watch("country");
	const selectedSector = watch("sector");

	const onSubmit = async (data: CompanyProfileFormData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/company/profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Bir hata oluştu");
			}

			toast({
				title: "Başarılı!",
				description: "Firma profiliniz oluşturuldu.",
			});

			if (onSuccess) {
				onSuccess();
			} else {
				router.push("/uye/dashboard");
				router.refresh();
			}
		} catch (error) {
			console.error("Form submission error:", error);
			toast({
				variant: "destructive",
				title: "Hata",
				description:
					error instanceof Error ? error.message : "Bir hata oluştu",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="bg-white border-[#eaecf0] p-8 shadow-lg max-w-3xl mx-auto">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-3 bg-primary/10 rounded-lg">
					<Building2 className="text-primary" size={32} />
				</div>
				<div>
					<h2 className="text-2xl font-bold text-[#004767]">
						Firmanızı Tanımlayın
					</h2>
					<p className="text-[#404D60] text-sm">
						Lütfen firma bilgilerinizi eksiksiz doldurun
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Firma Adı */}
				<div className="space-y-2">
					<Label htmlFor="name" className="text-[#004767]">
						Firma Adı <span className="text-red-500">*</span>
					</Label>
					<Input
						id="name"
						{...register("name")}
						placeholder="Örn: ABC İthalat İhracat Ltd. Şti."
						className="border-[#eaecf0]"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm">{errors.name.message}</p>
					)}
				</div>

				{/* Ülke & Şehir */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="country" className="text-[#004767]">
							Ülke <span className="text-red-500">*</span>
						</Label>
						<Select
							value={selectedCountry}
							onValueChange={(value) => setValue("country", value)}
						>
							<SelectTrigger className="border-[#eaecf0]">
								<SelectValue placeholder="Ülke seçiniz" />
							</SelectTrigger>
							<SelectContent>
								{COUNTRIES.map((country) => (
									<SelectItem key={country} value={country}>
										{country}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.country && (
							<p className="text-red-500 text-sm">{errors.country.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="city" className="text-[#004767]">
							İl/Şehir <span className="text-red-500">*</span>
						</Label>
						<Input
							id="city"
							{...register("city")}
							placeholder="Örn: İstanbul"
							className="border-[#eaecf0]"
						/>
						{errors.city && (
							<p className="text-red-500 text-sm">{errors.city.message}</p>
						)}
					</div>
				</div>

				{/* Yetkili Kişi */}
				<div className="space-y-2">
					<Label htmlFor="contactPerson" className="text-[#004767]">
						Yetkili Kişi <span className="text-red-500">*</span>
					</Label>
					<Input
						id="contactPerson"
						{...register("contactPerson")}
						placeholder="Örn: Ahmet Yılmaz"
						className="border-[#eaecf0]"
					/>
					{errors.contactPerson && (
						<p className="text-red-500 text-sm">
							{errors.contactPerson.message}
						</p>
					)}
				</div>

				{/* İletişim Bilgileri */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="contactEmail" className="text-[#004767]">
							E-posta <span className="text-red-500">*</span>
						</Label>
						<Input
							id="contactEmail"
							type="email"
							{...register("contactEmail")}
							placeholder="ornek@firma.com"
							className="border-[#eaecf0]"
						/>
						{errors.contactEmail && (
							<p className="text-red-500 text-sm">
								{errors.contactEmail.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="contactPhone" className="text-[#004767]">
							Telefon (Opsiyonel)
						</Label>
						<Input
							id="contactPhone"
							{...register("contactPhone")}
							placeholder="+90 555 123 45 67"
							className="border-[#eaecf0]"
						/>
					</div>
				</div>

				{/* Sektör */}
				<div className="space-y-2">
					<Label htmlFor="sector" className="text-[#004767]">
						Sektör <span className="text-red-500">*</span>
					</Label>
					<Select
						value={selectedSector}
						onValueChange={(value) => setValue("sector", value)}
					>
						<SelectTrigger className="border-[#eaecf0]">
							<SelectValue placeholder="Sektör seçiniz" />
						</SelectTrigger>
						<SelectContent>
							{SECTORS.map((sector) => (
								<SelectItem key={sector} value={sector}>
									{sector}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.sector && (
						<p className="text-red-500 text-sm">{errors.sector.message}</p>
					)}
				</div>

				{/* Yıllık Fuar Sayısı & Verimlilik Skoru */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="annualFairCount" className="text-[#004767]">
							Yıllık Fuar Katılım Sayısı{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Input
							id="annualFairCount"
							type="number"
							min="0"
							max="100"
							{...register("annualFairCount")}
							className="border-[#eaecf0]"
						/>
						{errors.annualFairCount && (
							<p className="text-red-500 text-sm">
								{errors.annualFairCount.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="productivityScore" className="text-[#004767]">
							Verimlilik Skoru (1-10){" "}
							<span className="text-red-500">*</span>
						</Label>
						<Input
							id="productivityScore"
							type="number"
							min="1"
							max="10"
							{...register("productivityScore")}
							className="border-[#eaecf0]"
						/>
						<p className="text-xs text-[#404D60]">
							Mevcut fuar organizasyonlarınızdan ne kadar verimli
							olduğunuzu düşünüyorsunuz?
						</p>
						{errors.productivityScore && (
							<p className="text-red-500 text-sm">
								{errors.productivityScore.message}
							</p>
						)}
					</div>
				</div>

				{/* Submit Button */}
				<div className="pt-4">
					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-primary hover:opacity-90 text-white h-12 text-lg"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								Kaydediliyor...
							</>
						) : (
							"Profili Tamamla"
						)}
					</Button>
				</div>
			</form>
		</Card>
	);
}
