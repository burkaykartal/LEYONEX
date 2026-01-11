import { redirect } from "next/navigation";
import { getCurrentUserWithCompany } from "@/lib/auth/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CompanyProfileForm from "@/components/dashboard/CompanyProfileForm";

export default async function ProfileCompletePage() {
	const user = await getCurrentUserWithCompany();

	// Redirect to login if not authenticated
	if (!user) {
		redirect("/giris");
	}

	// Redirect to dashboard if profile already completed
	if (user.hasCompletedProfile) {
		redirect("/uye/dashboard");
	}

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Warning Banner */}
					<div className="mb-8 max-w-3xl mx-auto">
						<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 mt-0.5">
									<svg
										className="h-5 w-5 text-amber-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="flex-1">
									<h3 className="text-sm font-semibold text-amber-800 mb-1">
										Profil Tamamlama Zorunludur
									</h3>
									<p className="text-sm text-amber-700">
										Dashboard özelliklerinden faydalanabilmek için lütfen
										firma profilinizi tamamlayın. Bu işlem sadece bir kez
										yapılmaktadır.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Form */}
					<CompanyProfileForm />

					{/* Info Section */}
					<div className="mt-8 max-w-3xl mx-auto">
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-[#004767] mb-3">
								Profil Tamamladıktan Sonra:
							</h3>
							<ul className="space-y-2 text-sm text-[#404D60]">
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Teklif taleplerinizi oluşturabilir ve takip edebilirsiniz
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Sektörünüze özel fuar takvimini görüntüleyebilirsiniz
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Yaklaşan ve geçmiş fuarlarınızı yönetebilirsiniz
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Fuar hazırlık sürecinizi takip edebilir ve skorunuzu
										görebilirsiniz
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Önemli tarihler için hatırlatmalar alabilirsiniz
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary mt-0.5">✓</span>
									<span>
										Dökümanlarınızı merkezi bir yerde saklayabilirsiniz
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
