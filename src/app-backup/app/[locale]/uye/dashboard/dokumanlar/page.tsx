import { requireCompletedProfile } from "@/lib/auth/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default async function DokumanlarPage() {
	await requireCompletedProfile();

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					<h1 className="text-4xl font-bold mb-2 text-[#004767]">
						Doküman & Dosyalarım
					</h1>
					<p className="text-[#404D60] text-lg mb-8">
						Fuar dökümanlarınızı merkezi bir yerde saklayın
					</p>

					<Card className="bg-white border-[#eaecf0] p-12 text-center">
						<FileText className="mx-auto mb-4 text-primary" size={48} />
						<h3 className="text-xl font-semibold mb-2 text-[#004767]">
							Doküman Yönetimi Yakında
						</h3>
						<p className="text-[#404D60]">
							Cloudinary entegrasyonlu dosya yönetim sistemi aktif edilecek.
						</p>
					</Card>
				</div>
			</main>
			<Footer />
		</>
	);
}
