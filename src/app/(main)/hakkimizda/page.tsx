import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award, Users, Zap } from "lucide-react";

export const metadata = {
  title: "Hakkımızda - Leyonex",
  description: "15+ yıllık deneyim, 500+ başarılı proje, 25+ ülkede fuar organizasyonu. Leyonex ile tanışın.",
};

export default function HakkimizdaPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				{/* Hero */}
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto text-center">
							<h1 className="text-4xl md:text-6xl font-bold mb-6">
								<span className="text-primary font-bold">
									Hakkımızda
								</span>
							</h1>
							<p className="text-xl text-gray-300">
								15+ yıllık deneyimimizle fuar dünyasında fark yaratıyoruz
							</p>
						</div>
					</div>
				</section>

				{/* Misyon & Vizyon */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
							<Card className="bg-dark-card border-white/10 p-8">
								<div className="flex items-center gap-3 mb-4">
									<Zap className="text-accent" size={32} />
									<h2 className="text-3xl font-bold">Misyonumuz</h2>
								</div>
								<p className="text-gray-300 text-lg leading-relaxed">
									Müşterilerimize dünya standartlarında fuar deneyimi sunmak,
									her projede mükemmeliyeti hedeflemek ve markaların uluslararası
									platformlarda en iyi şekilde temsil edilmesini sağlamak.
								</p>
							</Card>

							<Card className="bg-dark-card border-white/10 p-8">
								<div className="flex items-center gap-3 mb-4">
									<Award className="text-primary" size={32} />
									<h2 className="text-3xl font-bold">Vizyonumuz</h2>
								</div>
								<p className="text-gray-300 text-lg leading-relaxed">
									Türkiye&apos;nin önde gelen fuar organizasyon şirketi olmak ve
									global ölçekte tanınan, güvenilir bir marka haline gelmek.
									İnovasyon ve müşteri memnuniyetinde sektör lideri olmak.
								</p>
							</Card>
						</div>
					</div>
				</section>

				{/* Kim Biz */}
				<section className="py-16 bg-dark-card">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
								Leyonex Kimdir?
							</h2>
							<div className="space-y-6 text-gray-300 text-lg leading-relaxed">
								<p>
									Leyonex, 2009 yılından bu yana fuar organizasyonu alanında
									faaliyet gösteren, deneyimli ve yenilikçi bir şirkettir. Stand tasarımından
									kuruluma, organizasyondan lojistiğe kadar tüm fuar hizmetlerini tek noktadan
									yönetiyoruz.
								</p>
								<p>
									500&apos;den fazla başarılı proje deneyimimiz ve 25&apos;ten fazla ülkedeki işbirliklerimiz
									ile müşterilerimize global çapta hizmet sunuyoruz. Her biri kendi alanında uzman
									ekip üyelerimizle, markaların fuarlarda öne çıkmasını sağlıyoruz.
								</p>
								<p>
									Modüler standlardan premium tasarımlara, dijital ekranlı çözümlerden
									interaktif deneyimlere kadar geniş yelpazede hizmet portföyümüzle her
									bütçeye uygun, kaliteden ödün vermeyen çözümler üretiyoruz.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Değerlerimiz */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
							Değerlerimiz
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
							{[
								{
									title: "Kalite",
									description: "Her projede en yüksek standartları hedefliyoruz",
									icon: <Award className="text-accent" size={40} />
								},
								{
									title: "Güvenilirlik",
									description: "Sözümüzde duruyoruz, taahhütlerimizi yerine getiriyoruz",
									icon: <CheckCircle2 className="text-green-500" size={40} />
								},
								{
									title: "İnovasyon",
									description: "Sürekli gelişiyor, yeni çözümler üretiyoruz",
									icon: <Zap className="text-primary" size={40} />
								},
								{
									title: "Müşteri Odaklı",
									description: "Müşteri memnuniyeti bizim önceliğimiz",
									icon: <Users className="text-accent" size={40} />
								},
							].map((value, index) => (
								<Card key={index} className="bg-dark-card border-white/10 p-6 hover:border-accent/50 transition-colors">
									<div className="flex flex-col items-center text-center gap-4">
										<div className="p-3 bg-dark rounded-full">
											{value.icon}
										</div>
										<h3 className="text-xl font-bold">{value.title}</h3>
										<p className="text-gray-400 text-sm">{value.description}</p>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* İstatistikler */}
				<section className="py-16 bg-dark-card">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
							{[
								{ number: "15+", label: "Yıllık Deneyim" },
								{ number: "500+", label: "Başarılı Proje" },
								{ number: "25+", label: "Ülkede Hizmet" },
								{ number: "100%", label: "Müşteri Memnuniyeti" },
							].map((stat, index) => (
								<div key={index} className="text-center">
									<div className="text-4xl md:text-5xl font-bold text-primary font-bold mb-2">
										{stat.number}
									</div>
									<div className="text-gray-400 text-sm md:text-base">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Neden Biz? */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
							Neden Leyonex?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
							{[
								"15+ yıllık sektör deneyimi",
								"500+ başarılı proje referansı",
								"25+ ülkede güçlü iş ortaklıkları",
								"Tek noktadan tüm fuar hizmetleri",
								"Uzman ve deneyimli ekip",
								"Zamanlı teslimat garantisi",
								"Bütçeye uygun esnek çözümler",
								"7/24 müşteri desteği",
								"Modüler'den premium'a geniş stand çeşitleri",
								"İnovatif ve yaratıcı tasarımlar",
								"Detaylı proje yönetimi",
								"Şeffaf ve dürüst iletişim",
							].map((item, index) => (
								<div key={index} className="flex items-center gap-3">
									<CheckCircle2 className="text-accent flex-shrink-0" size={24} />
									<span className="text-gray-300">{item}</span>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

