"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function IletisimPage() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast({
					title: "Başarılı!",
					description: "Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.",
				});
				setFormData({ name: "", email: "", phone: "", message: "" });
			} else {
				throw new Error("Gönderim başarısız");
			}
		} catch (error) {
			toast({
				title: "Hata",
				description: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				<div className="container mx-auto px-4 py-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
						İletişim
					</h1>
					<div className="max-w-2xl mx-auto">
						<Card className="bg-dark-card p-8">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
										Ad Soyad
									</label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										required
										className="bg-dark border-gray-700"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
										E-posta
									</label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										required
										className="bg-dark border-gray-700"
									/>
								</div>
								<div>
									<label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
										Telefon
									</label>
									<Input
										id="phone"
										type="tel"
										value={formData.phone}
										onChange={(e) =>
											setFormData({ ...formData, phone: e.target.value })
										}
										className="bg-dark border-gray-700"
									/>
								</div>
								<div>
									<label htmlFor="message" className="block mb-2 text-sm font-medium">
										Mesaj
									</label>
									<textarea
										id="message"
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										required
										rows={6}
										className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</div>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-primary hover:opacity-90"
								>
									{isSubmitting ? "Gönderiliyor..." : "Gönder"}
								</Button>
							</form>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

