import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ClientLogos from "@/components/sections/ClientLogos";

export default function Home() {
	return (
		<>
			<Header />
			<main className="min-h-screen">
				<HeroSection />
				<ServicesGrid />
				<FeaturedProjects />
				<ClientLogos />
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	);
}
