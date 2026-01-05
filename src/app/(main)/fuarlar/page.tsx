import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FairsList from "@/components/sections/FairsList";

export const metadata = {
  title: "Fuar Takvimi - Luna 360 Expo",
  description: "Yaklaşan uluslararası fuarlar ve etkinlikler. Luna 360 Expo ile fuar organizasyonunuzu planlayın.",
};

export default function FuarlarPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-primary bg-clip-text text-transparent">
								Fuar Takvimi
							</span>
						</h1>
						<p className="text-gray-400 text-lg">
							Yaklaşan uluslararası fuarlar ve etkinlikler
						</p>
					</div>
					<FairsList />
				</div>
			</main>
			<Footer />
		</>
	);
}

