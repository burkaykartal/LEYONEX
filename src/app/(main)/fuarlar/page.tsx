import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FairsTable from "@/components/sections/FairsTable";

export const metadata = {
  title: "2026 ve Sonrası Fuar Takvimi - Leyonex",
  description: "2026 ve sonrası önemli fuarlar. Ülke, şehir ve sektör filtreli fuar listesi. Leyonex ile fuar organizasyonunuzu planlayın.",
};

export default function FuarlarPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#f5f5f5]">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="text-primary font-bold">
								2026 ve Sonrası
							</span>
							<br />
							<span className="text-[#2d2d2d]">
								Bazı Önemli Fuarlar
							</span>
						</h1>
						<p className="text-[#555555] text-lg">
							Yaklaşan uluslararası fuarlar ve etkinlikler
						</p>
					</div>
					<FairsTable />
				</div>
			</main>
			<Footer />
		</>
	);
}

