import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ProcessManagement from "@/components/sections/ProcessManagement";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ActiveFairs from "@/components/sections/ActiveFairs";
import ClientLogos from "@/components/sections/ClientLogos";
export const metadata = {
  title: 'LEYONEX | 360 Derece Fuar Organizasyon & Strateji Partneri',
  description: 'Fuar süreçlerinizde operasyonel yükünüzü alıyoruz. Doğru plan ve düşük efor prensibiyle, stand tasarımından lojistiğe kadar uçtan uca fuar yönetimi.',
  keywords: 'fuar organizasyon firması, fuar stand tasarımı, fuar stratejisi, fuar lojistiği',
  openGraph: {
    title: 'LEYONEX | 360 Derece Fuar Organizasyon & Strateji Partneri',
    description: 'Fuar süreçlerinizde operasyonel yükünüzü alıyoruz. Doğru plan ve düşük efor prensibiyle, stand tasarımından lojistiğe kadar uçtan uca fuar yönetimi.',
    url: 'https://www.leyonex.com',
    siteName: 'LEYONEX',
    locale: 'tr_TR',
    type: 'website',
  },
};
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
