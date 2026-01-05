"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

const services = [
	"Stand Tasarımı ve Kurulumu",
	"Hostes ve Personel Desteği",
	"Konaklama Organizasyonu",
	"Stand İkramları",
	"Fotoğraf ve Video Çekimi",
	"Ulaşım Hizmetleri",
	"Kurumsal Hediye",
	"Gala ve Etkinlik Organizasyonu",
	"Danışmanlık Hizmetleri",
];

export default function TeklifAlPage() {
	const { toast } = useToast();
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		// Step 1: İletişim Bilgileri
		name: "",
		email: "",
		phone: "",
		company: "",

		// Step 2: Fuar Bilgileri
		fairName: "",
		fairDate: "",
		fairLocation: "",
		standSize: "",

		// Step 3: Hizmet Seçimi
		selectedServices: [] as string[],

		// Step 4: Ek Bilgiler
		budget: "",
		additionalNotes: "",
	});

	const handleServiceToggle = (service: string) => {
		setFormData(prev => ({
			...prev,
			selectedServices: prev.selectedServices.includes(service)
				? prev.selectedServices.filter(s => s !== service)
				: [...prev.selectedServices, service]
		}));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/quote-request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast({
					title: "Başarılı!",
					description: "Teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.",
				});
				// Form reset
				setFormData({
					name: "", email: "", phone: "", company: "",
					fairName: "", fairDate: "", fairLocation: "", standSize: "",
					selectedServices: [],
					budget: "", additionalNotes: "",
				});
				setStep(1);
			} else {
				throw new Error("Gönderim başarısız");
			}
		} catch (error) {
			toast({
				title: "Hata",
				description: "Teklif talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const canGoNext = () => {
		if (step === 1) {
			return formData.name && formData.email && formData.phone && formData.company;
		}
		if (step === 2) {
			return formData.fairName && formData.fairDate && formData.fairLocation;
		}
		if (step === 3) {
			return formData.selectedServices.length > 0;
		}
		return true;
	};

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="max-w-3xl mx-auto">
						{/* Header */}
						<div className="text-center mb-12">
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								<span className="text-primary font-bold">
									Teklif Al
								</span>
							</h1>
							<p className="text-gray-400 text-lg">
								Size özel fuar organizasyon teklifimizi hazırlayalım
							</p>
						</div>

						{/* Progress Steps */}
						<div className="flex items-center justify-between mb-8">
							{[1, 2, 3, 4].map((s) => (
								<div key={s} className="flex items-center flex-1">
									<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
										s === step
											? "bg-primary text-white"
											: s < step
												? "bg-green-500 text-white"
												: "bg-dark-card text-gray-400"
									}`}>
										{s < step ? <CheckCircle2 size={20} /> : s}
									</div>
									{s < 4 && (
										<div className={`flex-1 h-1 mx-2 ${
											s < step ? "bg-green-500" : "bg-dark-card"
										}`} />
									)}
								</div>
							))}
						</div>

						{/* Form Card */}
						<Card className="bg-dark-card border-white/10 p-8">
							{/* Step 1: İletişim Bilgileri */}
							{step === 1 && (
								<div className="space-y-6">
									<h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>

									<div>
										<label className="block mb-2 text-sm font-medium">Ad Soyad *</label>
										<Input
											value={formData.name}
											onChange={(e) => setFormData({ ...formData, name: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="Adınız Soyadınız"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">E-posta *</label>
										<Input
											type="email"
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="ornek@firma.com"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Telefon *</label>
										<Input
											type="tel"
											value={formData.phone}
											onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="+90 555 555 5555"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Şirket Adı *</label>
										<Input
											value={formData.company}
											onChange={(e) => setFormData({ ...formData, company: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="Şirketinizin adı"
										/>
									</div>
								</div>
							)}

							{/* Step 2: Fuar Bilgileri */}
							{step === 2 && (
								<div className="space-y-6">
									<h2 className="text-2xl font-bold mb-6">Fuar Bilgileri</h2>

									<div>
										<label className="block mb-2 text-sm font-medium">Fuar Adı *</label>
										<Input
											value={formData.fairName}
											onChange={(e) => setFormData({ ...formData, fairName: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="Katılacağınız fuarın adı"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Fuar Tarihi *</label>
										<Input
											type="date"
											value={formData.fairDate}
											onChange={(e) => setFormData({ ...formData, fairDate: e.target.value })}
											className="bg-dark border-gray-700"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Fuar Lokasyonu *</label>
										<Input
											value={formData.fairLocation}
											onChange={(e) => setFormData({ ...formData, fairLocation: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="Şehir, Ülke"
										/>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Stand Alanı (m²)</label>
										<Input
											type="number"
											value={formData.standSize}
											onChange={(e) => setFormData({ ...formData, standSize: e.target.value })}
											className="bg-dark border-gray-700"
											placeholder="örn: 36"
										/>
									</div>
								</div>
							)}

							{/* Step 3: Hizmet Seçimi */}
							{step === 3 && (
								<div className="space-y-6">
									<h2 className="text-2xl font-bold mb-6">İhtiyacınız Olan Hizmetler</h2>
									<p className="text-gray-400 text-sm mb-4">
										İhtiyacınız olan hizmetleri seçin (birden fazla seçebilirsiniz)
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{services.map((service) => (
											<button
												key={service}
												type="button"
												onClick={() => handleServiceToggle(service)}
												className={`p-4 rounded-lg border-2 text-left transition-all ${
													formData.selectedServices.includes(service)
														? "border-accent bg-accent/10"
														: "border-gray-700 hover:border-gray-600"
												}`}
											>
												<div className="flex items-center gap-3">
													<div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
														formData.selectedServices.includes(service)
															? "border-accent bg-accent"
															: "border-gray-600"
													}`}>
														{formData.selectedServices.includes(service) && (
															<CheckCircle2 size={14} className="text-white" />
														)}
													</div>
													<span className="text-sm">{service}</span>
												</div>
											</button>
										))}
									</div>
								</div>
							)}

							{/* Step 4: Ek Bilgiler */}
							{step === 4 && (
								<div className="space-y-6">
									<h2 className="text-2xl font-bold mb-6">Ek Bilgiler</h2>

									<div>
										<label className="block mb-2 text-sm font-medium">Tahmini Bütçe</label>
										<select
											value={formData.budget}
											onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
											className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										>
											<option value="">Seçiniz</option>
											<option value="0-10000">0 - 10.000 EUR</option>
											<option value="10000-25000">10.000 - 25.000 EUR</option>
											<option value="25000-50000">25.000 - 50.000 EUR</option>
											<option value="50000+">50.000+ EUR</option>
										</select>
									</div>

									<div>
										<label className="block mb-2 text-sm font-medium">Ek Notlar</label>
										<textarea
											value={formData.additionalNotes}
											onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
											rows={6}
											className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Özel talepleriniz veya eklemek istediğiniz bilgiler..."
										/>
									</div>

									{/* Özet */}
									<div className="mt-8 p-6 bg-dark rounded-lg">
										<h3 className="font-bold mb-4">Teklif Özeti</h3>
										<div className="space-y-2 text-sm text-gray-300">
											<p><strong>Şirket:</strong> {formData.company}</p>
											<p><strong>Fuar:</strong> {formData.fairName}</p>
											<p><strong>Tarih:</strong> {formData.fairDate}</p>
											<p><strong>Seçilen Hizmetler:</strong> {formData.selectedServices.length} hizmet</p>
										</div>
									</div>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
								{step > 1 ? (
									<Button
										variant="outline"
										onClick={() => setStep(step - 1)}
										className="flex items-center gap-2"
									>
										<ChevronLeft size={20} />
										Geri
									</Button>
								) : (
									<div />
								)}

								{step < 4 ? (
									<Button
										onClick={() => setStep(step + 1)}
										disabled={!canGoNext()}
										className="bg-primary hover:opacity-90 flex items-center gap-2"
									>
										İleri
										<ChevronRight size={20} />
									</Button>
								) : (
									<Button
										onClick={handleSubmit}
										disabled={isSubmitting}
										className="bg-primary hover:opacity-90"
									>
										{isSubmitting ? "Gönderiliyor..." : "Teklif Talebini Gönder"}
									</Button>
								)}
							</div>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

