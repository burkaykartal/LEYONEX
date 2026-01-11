import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ActiveFairs from "@/components/sections/ActiveFairs";

export const metadata = {
  title: "Güncel Çalışmalar - Leyonex",
  description: "Aktif olarak stand kurulumu ve organizasyon hizmeti verdiğimiz fuarlar.",
};

export default function ProjelerPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="text-primary font-bold">
								Güncel Çalışmalar
							</span>
						</h1>
						<p className="text-[#404D60] text-lg">
							Şuanda aktif olarak çalıştığımız fuar organizasyonları
						</p>
					</div>
					<ActiveFairs />
				</div>
			</main>
			<Footer />
		</>
	);
}

