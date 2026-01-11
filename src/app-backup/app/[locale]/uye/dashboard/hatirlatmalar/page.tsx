import { requireCompletedProfile } from "@/lib/auth/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default async function HatirlatmalarPage() {
	await requireCompletedProfile();

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					<h1 className="text-4xl font-bold mb-2 text-[#004767]">
						Hatırlatmalar & Kritik Tarihler
					</h1>
					<p className="text-[#404D60] text-lg mb-8">
						Önemli tarihleri takip edin ve hatırlatmalar alın
					</p>

					<Card className="bg-white border-[#eaecf0] p-12 text-center">
						<Bell className="mx-auto mb-4 text-primary" size={48} />
						<h3 className="text-xl font-semibold mb-2 text-[#004767]">
							Hatırlatma Sistemi Yakında
						</h3>
						<p className="text-[#404D60]">
							Takvim entegrasyonlu hatırlatma sistemi aktif edilecek.
						</p>
					</Card>
				</div>
			</main>
			<Footer />
		</>
	);
}
