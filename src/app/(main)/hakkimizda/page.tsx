import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Shield, Users, Heart, Lightbulb, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Hakkımızda - Leyonex",
  description: "Fuar süreçlerini stratejik bir büyüme ve markalaşma yatırımı olarak ele alıyoruz. 15+ yıllık pazarlama ve marka yönetimi tecrübesiyle yanınızdayız.",
};

export default function HakkimizdaPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">
				{/* Hero */}
				<section className="py-16 bg-[#F5F7FA]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto text-center">
							<h1 className="text-4xl md:text-6xl font-bold mb-6">
								<span className="text-primary font-bold">
									Hakkımızda
								</span>
							</h1>
							<p className="text-xl text-[#404D60]">
								Fuarları stratejik bir yatırım olarak ele alıyoruz
							</p>
						</div>
					</div>
				</section>

				{/* Ana Giriş */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Leyonex, fuar süreçlerini yalnızca operasyonel bir hizmet alanı olarak değil,
									<strong className="text-[#004767]"> firmalar için stratejik bir büyüme ve markalaşma yatırımı</strong> olarak
									ele almak amacıyla kurulmuştur.
								</p>
								<p>
									<strong className="text-[#004767]">15+ yıllık pazarlama ve marka yönetimi tecrübemiz</strong>;
									%50 Avrupa ortaklı bir yapıda, beş farklı markanın yönetildiği kurumsal bir organizasyonda
									edinilmiş, sahada test edilmiş ve sonuç üretmiş bir birikime dayanmaktadır. Bunun yanında
									<strong className="text-[#004767]"> 10+ yılı aşkın süredir</strong>, yurt içi ve yurt dışı fuar
									süreçlerini A&apos;dan Z&apos;ye; planlama, kurulum, operasyon, yönetim ve analiz aşamalarıyla
									birebir deneyimleme fırsatı bulduk.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Sorun Tespiti */}
				<section className="py-16 bg-[#F5F7FA]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#004767]">
								Bu Süreçlerde Şunu Net Şekilde Gördük
							</h2>
							<div className="bg-white border-l-4 border-accent p-8 rounded-r-lg shadow-sm">
								<p className="text-[#404D60] text-lg leading-relaxed mb-4">
									Firmalar, fuar öncesi ve sırasında operasyonel yükün ağırlığı nedeniyle asıl odaklanmaları
									gereken konuya—<strong className="text-[#004767]">fuarın verimliliğine ve stratejik katkısına</strong>—yeterince
									zaman ve enerji ayıramıyor.
								</p>
								<p className="text-[#404D60] text-lg leading-relaxed">
									Daha da önemlisi, <em>&quot;Bu fuardan daha fazla nasıl kazanım elde edebiliriz?&quot;</em> sorusu
									çoğu zaman sistematik bir yaklaşımla ele alınmıyor; yalnızca mevcut tecrübelere dayalı fikirlerle ilerleniyor.
								</p>
							</div>
							<div className="mt-8 text-center">
								<p className="text-2xl font-bold text-primary">
									Leyonex tam olarak bu noktada devreye giriyor.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Stratejik Fuar Yönetimi */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<Target className="text-primary" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									Operasyondan Öte: Stratejik Fuar Yönetimi
								</h2>
							</div>
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Bizim için fuar; <strong className="text-[#004767]">yeni pazar bulma, mevcut pazarda tutunma ve
									marka algısını güçlendirme</strong> sürecinin önemli bir parçasıdır. Bu nedenle fuar sürecinin
									baştan sona stratejik olarak kurgulanması gerektiğine inanıyoruz.
								</p>
								<p>
									Doğru fuarı seçmek, doğru hedefle katılmak ve süreci doğru planlamak; hem toplam maliyeti
									düşüren hem de fuar verimliliğini ciddi şekilde artıran bir yaklaşımdır.
								</p>
								<p>
									Farklı sektörlerde ve farklı firmalarda edindiğimiz deneyimleri, çapraz bir bakış açısıyla
									müşterilerimize aktarıyor; her firmanın kendi iç dinamiklerine uygun, gerçekçi ve ölçülebilir
									fuar stratejileri oluşturuyoruz.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Optimum Denge */}
				<section className="py-16 bg-[#F5F7FA]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<TrendingUp className="text-accent" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									Karar Alma Yaklaşımımız: Optimum Denge
								</h2>
							</div>
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Mühendislik altyapısı ile pazarlama yüksek lisansının birleşimi, karar alma süreçlerimizin
									temelini oluşturur. Bizim için kritik kavram <strong className="text-primary font-bold text-2xl">&quot;optimum&quot;</strong>dur.
								</p>
								<Card className="bg-white border-accent/30 p-6">
									<p className="text-[#404D60] text-lg leading-relaxed mb-4">
										Sadece en düşük maliyet ya da sadece en iyi iş anlayışı, doğru sonucu garanti etmez.
										Önemli olan; <strong className="text-[#004767]">olabilecek en iyi işi, en doğru maliyetle
										hayata geçirebilmektir.</strong>
									</p>
									<p className="text-[#404D60] text-lg leading-relaxed">
										Mühendislik bakış açısı bu dengeyi kurmamızı sağlarken, pazarlama perspektifi ise ortaya
										çıkan işin markaya en doğru şekilde yansıtılmasını mümkün kılar.
									</p>
								</Card>
							</div>
						</div>
					</div>
				</section>

				{/* Şeffaflık ve Kontrol */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<Shield className="text-primary" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									Şeffaflık ve Kontrol
								</h2>
							</div>
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Leyonex&apos;te maliyetler kalem kalem ele alınır. Finansal riskler gizli maliyet olarak eklenmez,
									operasyonel belirsizlikler &quot;koruma payı&quot; adı altında fiyatlara yansıtılmaz.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
									{[
										"Doğru tedarikçi",
										"Gerçek piyasa fiyatı",
										"Makul ve sürdürülebilir kârlılık"
									].map((item, index) => (
										<Card key={index} className="bg-[#F5F7FA] border-accent/20 p-6 text-center">
											<CheckCircle2 className="text-accent mx-auto mb-3" size={32} />
											<p className="text-[#004767] font-semibold">{item}</p>
										</Card>
									))}
								</div>
								<div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-lg border-l-4 border-primary">
									<p className="text-[#004767] text-xl font-semibold text-center">
										&quot;Leyonex bu fiyatı verdiyse, bu işin ederi budur.&quot;
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Uzun Vadeli İş Ortaklığı */}
				<section className="py-16 bg-[#F5F7FA]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<Lightbulb className="text-accent" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									Uzun Vadeli İş Ortaklığı
								</h2>
							</div>
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Amacımız, firmaların fuar süreçlerine tek seferlik değil, <strong className="text-[#004767]">bütüncül
									ve uzun vadeli bir bakışla</strong> dahil olmaktır.
								</p>
								<p className="text-[#404D60] mb-4">
									&quot;Bu yıl hangi fuara katılalım?&quot; sorusundan başlayarak:
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{[
										"Genel fuar stratejisinin oluşturulması",
										"Marka ile uyumlu ana tasarım dilinin belirlenmesi",
										"Farklı metrekarelerde stant tasarımlarının revizyonları",
										"Erken planlama sayesinde otel ve uçuş optimizasyonları",
										"Hostes, ikram, lojistik standartlaştırılması",
										"Devlet teşviklerinin değerlendirilmesi"
									].map((item, index) => (
										<div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
											<CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
											<span className="text-[#404D60]">{item}</span>
										</div>
									))}
								</div>
								<p className="mt-6">
									Tüm süreci tek merkezden ve sürdürülebilir şekilde yönetiriz.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Kiminle Çalışıyoruz */}
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<Users className="text-primary" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									Kiminle Çalışıyoruz?
								</h2>
							</div>
							<Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 p-8">
								<p className="text-[#404D60] text-lg leading-relaxed mb-6">
									Fuarları ciddiye alan, marka algısını önemseyen, analitik düşünmeyi ve strateji üretmeyi
									değerli bulan firmalarla çalışmayı tercih ediyoruz.
								</p>
								<div className="space-y-3">
									{[
										"Fuarları ciddiye alan",
										"Marka algısını önemseyen",
										"Analitik düşünmeyi ve strateji üretmeyi değerli bulan",
										"Sadece \"ucuz\" ya da sadece \"en büyük\" olana odaklanmayan",
										"Fuarın bir maliyet değil, doğru yönetildiğinde güçlü bir yatırım olduğunu bilen"
									].map((item, index) => (
										<div key={index} className="flex items-center gap-3">
											<div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
											<span className="text-[#404D60] text-lg">{item}</span>
										</div>
									))}
								</div>
							</Card>
						</div>
					</div>
				</section>

				{/* İnsan Odaklı Yaklaşım */}
				<section className="py-16 bg-[#F5F7FA]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center gap-3 mb-6">
								<Heart className="text-accent" size={40} />
								<h2 className="text-3xl md:text-4xl font-bold text-[#004767]">
									İnsan Odaklı Yaklaşım
								</h2>
							</div>
							<div className="space-y-6 text-[#404D60] text-lg leading-relaxed">
								<p>
									Bizim için <strong className="text-[#004767]">ticaret, kişi kazanımının önüne geçmez.</strong>
								</p>
								<p>
									15 yıllık kurumsal üst düzey yöneticilik kariyerini geride bırakıp bu yapıyı kurmamızın
									temel sebebi; yaptığımız işi yalnızca ticari bir faaliyet değil, keyif aldığımız ve değer
									ürettiğimiz bir iş modeli olarak sürdürme isteğidir.
								</p>
								<Card className="bg-white border-accent/30 p-8">
									<h3 className="text-xl font-bold text-[#004767] mb-4">Amacımız</h3>
									<ul className="space-y-3">
										{[
											"Çalıştığımız firmaların üzerindeki stres ve iş yükünü azaltmak",
											"Süreci şeffaf ve kontrollü şekilde yönetmek",
											"Her yıl bir öncekinden daha iyi fuar deneyimleri üretmek"
										].map((item, index) => (
											<li key={index} className="flex items-start gap-3">
												<CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
												<span className="text-[#404D60]">{item}</span>
											</li>
										))}
									</ul>
								</Card>
							</div>
						</div>
					</div>
				</section>

				{/* Kapanış */}
				<section className="py-16 bg-gradient-to-br from-primary to-[#003152]">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto text-center">
							<p className="text-white text-xl md:text-2xl leading-relaxed font-medium">
								Leyonex ile bir kez çalıştığınızda, şimdiye kadar alışık olduğunuzdan
								<strong className="text-accent"> daha planlı, daha şeffaf ve daha tatmin edici</strong> bir
								fuar yönetimi anlayışıyla tanışacağınızdan eminiz.
							</p>
						</div>
					</div>
				</section>

			</main>
			<Footer />
		</>
	);
}
