import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ProcessManagement from "@/components/sections/ProcessManagement";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ActiveFairs from "@/components/sections/ActiveFairs";
import ClientLogos from "@/components/sections/ClientLogos";

export default function Home() {
	return (
		<>
			<Header />
			<main className="min-h-screen">
				<HeroSection />
				<ProcessManagement />
				<ServicesGrid />
				<ActiveFairs />
				<ClientLogos />
			</main>
			<Footer />
			<WhatsAppButton />
		</>
	);
}
