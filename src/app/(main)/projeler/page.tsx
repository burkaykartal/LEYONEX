import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedProjects from "@/components/sections/FeaturedProjects";

export const metadata = {
  title: "Projelerimiz - Leyonex",
  description: "Başarıyla tamamladığımız fuar projeleri ve referanslarımız.",
};

export default function ProjelerPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="text-primary font-bold">
								Projelerimiz
							</span>
						</h1>
						<p className="text-gray-400 text-lg">
							Gerçekleştirdiğimiz başarılı fuar projeleri
						</p>
					</div>
					<FeaturedProjects />
				</div>
			</main>
			<Footer />
		</>
	);
}

