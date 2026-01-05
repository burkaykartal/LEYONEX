import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/sections/ServicesGrid";

export const metadata = {
  title: "Hizmetlerimiz - Leyonex",
  description: "Fuar organizasyonu için tüm hizmetlerimizi keşfedin. Stand tasarımından danışmanlığa kadar.",
};

export default function HizmetlerPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-primary bg-clip-text text-transparent">
								Hizmetlerimiz
							</span>
						</h1>
						<p className="text-gray-400 text-lg">
							İhtiyacınıza özel, paket değil seçilebilir hizmetler
						</p>
					</div>
					<ServicesGrid />
				</div>
			</main>
			<Footer />
		</>
	);
}

