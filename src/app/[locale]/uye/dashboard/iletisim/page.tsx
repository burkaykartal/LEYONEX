"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageCircle, Send, Loader2 } from "lucide-react";

const CONTACT_METHODS = [
	{
		id: "phone",
		name: "Telefon",
		icon: Phone,
		color: "bg-blue-100 text-blue-700",
		hoverColor: "hover:bg-blue-200",
		description: "Telefon ile arayın",
		action: "tel:+905xxxxxxxxx", // Replace with actual number
	},
	{
		id: "whatsapp",
		name: "WhatsApp",
		icon: MessageCircle,
		color: "bg-green-100 text-green-700",
		hoverColor: "hover:bg-green-200",
		description: "WhatsApp ile mesaj gönderin",
		action: "https://wa.me/905xxxxxxxxx", // Replace with actual number
	},
	{
		id: "email",
		name: "E-posta",
		icon: Mail,
		color: "bg-purple-100 text-purple-700",
		hoverColor: "hover:bg-purple-200",
		description: "E-posta formu ile iletişime geçin",
		action: null, // Will show form
	},
];

export default function IletisimPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		subject: "",
		message: "",
	});

	const handleMethodSelect = (methodId: string) => {
		const method = CONTACT_METHODS.find((m) => m.id === methodId);
		if (!method) return;

		if (method.action) {
			// Direct action (phone or WhatsApp)
			if (methodId === "whatsapp") {
				window.open(method.action, "_blank");
			} else if (methodId === "phone") {
				window.location.href = method.action;
			}
		} else {
			// Show email form
			setSelectedMethod(methodId);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					preferredContact: selectedMethod,
				}),
			});

			if (!response.ok) {
				throw new Error("Gönderim başarısız");
			}

			toast({
				title: "Başarılı!",
				description: "Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.",
			});

			// Reset form
			setFormData({ subject: "", message: "" });
			setSelectedMethod(null);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Hata",
				description: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="mb-12 text-center">
						<h1 className="text-4xl font-bold mb-2 text-[#004767]">
							Bize Ulaşın
						</h1>
						<p className="text-[#404D60] text-lg">
							Size en uygun iletişim yöntemini seçin
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						{!selectedMethod ? (
							/* Contact Method Selection */
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{CONTACT_METHODS.map((method) => {
									const Icon = method.icon;
									return (
										<Card
											key={method.id}
											className="bg-white border-[#eaecf0] p-6 hover:shadow-lg transition-all cursor-pointer group"
											onClick={() => handleMethodSelect(method.id)}
										>
											<div className="text-center">
												<div
													className={`w-16 h-16 mx-auto mb-4 rounded-full ${method.color} ${method.hoverColor} flex items-center justify-center transition-colors`}
												>
													<Icon size={32} />
												</div>
												<h3 className="text-xl font-semibold mb-2 text-[#004767]">
													{method.name}
												</h3>
												<p className="text-sm text-[#404D60]">
													{method.description}
												</p>
											</div>
										</Card>
									);
								})}
							</div>
						) : (
							/* Email Form */
							<Card className="bg-white border-[#eaecf0] p-8">
								<div className="flex items-center gap-3 mb-6">
									<div className="p-3 bg-purple-100 rounded-lg">
										<Mail className="text-purple-700" size={24} />
									</div>
									<div>
										<h2 className="text-2xl font-bold text-[#004767]">
											E-posta ile İletişime Geçin
										</h2>
										<p className="text-[#404D60] text-sm">
											Mesajınızı gönderin, size en kısa sürede dönüş yapalım
										</p>
									</div>
								</div>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="subject" className="text-[#004767]">
											Konu <span className="text-red-500">*</span>
										</Label>
										<Input
											id="subject"
											value={formData.subject}
											onChange={(e) =>
												setFormData({ ...formData, subject: e.target.value })
											}
											className="border-[#eaecf0]"
											placeholder="Mesajınızın konusu"
											required
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="message" className="text-[#004767]">
											Mesajınız <span className="text-red-500">*</span>
										</Label>
										<textarea
											id="message"
											value={formData.message}
											onChange={(e) =>
												setFormData({ ...formData, message: e.target.value })
											}
											className="w-full px-3 py-2 border border-[#eaecf0] rounded-md text-[#004767] focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
											placeholder="Mesajınızı buraya yazın..."
											required
										/>
									</div>

									<div className="flex gap-3">
										<Button
											type="button"
											variant="outline"
											onClick={() => setSelectedMethod(null)}
											className="flex-1"
										>
											Geri
										</Button>
										<Button
											type="submit"
											disabled={isSubmitting}
											className="flex-1 bg-primary hover:opacity-90 text-white"
										>
											{isSubmitting ? (
												<>
													<Loader2 className="mr-2 h-5 w-5 animate-spin" />
													Gönderiliyor...
												</>
											) : (
												<>
													<Send className="mr-2" size={18} />
													Gönder
												</>
											)}
										</Button>
									</div>
								</form>
							</Card>
						)}

						{/* Info Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
							<Card className="bg-white border-[#eaecf0] p-6">
								<h3 className="font-semibold text-[#004767] mb-3">
									İletişim Bilgileri
								</h3>
								<div className="space-y-2 text-sm text-[#404D60]">
									<p>
										<strong className="text-[#004767]">E-posta:</strong>{" "}
										info@luna360expo.com
									</p>
									<p>
										<strong className="text-[#004767]">Telefon:</strong> +90 555
										XXX XX XX
									</p>
									<p>
										<strong className="text-[#004767]">Çalışma Saatleri:</strong>{" "}
										Pzt-Cum 09:00-18:00
									</p>
								</div>
							</Card>

							<Card className="bg-white border-[#eaecf0] p-6">
								<h3 className="font-semibold text-[#004767] mb-3">
									Hızlı Destek
								</h3>
								<p className="text-sm text-[#404D60] mb-3">
									Acil durumlar için WhatsApp hattımızdan 7/24 bize
									ulaşabilirsiniz.
								</p>
								<Button
									onClick={() => handleMethodSelect("whatsapp")}
									className="w-full bg-green-600 hover:bg-green-700 text-white"
								>
									<MessageCircle className="mr-2" size={18} />
									WhatsApp ile İletişime Geç
								</Button>
							</Card>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
