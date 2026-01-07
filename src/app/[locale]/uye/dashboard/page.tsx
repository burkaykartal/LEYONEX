import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	User,
	FileText,
	Calendar,
	Settings,
	Shield,
	ArrowRight,
	CheckCircle2,
	Upload
} from "lucide-react";

export default async function DashboardPage() {
	const { userId } = await auth();
	const user = await currentUser();

	if (!userId) {
		redirect("/giris");
	}

	const isSuperAdmin = user?.publicMetadata?.role === "superadmin";

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Welcome Header */}
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-2 text-[#004767]">
							Hoş Geldiniz, {user?.firstName}!
						</h1>
						<p className="text-[#404D60] text-lg">
							Üye alanınıza giriş yaptınız
						</p>
						{isSuperAdmin && (
							<Badge className="mt-3 bg-primary">
								<Shield size={14} className="mr-1" />
								Süper Admin
							</Badge>
						)}
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
						<Card className="bg-white border-[#eaecf0] p-6 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#404D60] text-sm mb-1">Aktif Talepler</p>
									<p className="text-3xl font-bold text-[#004767]">0</p>
								</div>
								<FileText className="text-primary" size={40} />
							</div>
						</Card>

						<Card className="bg-white border-[#eaecf0] p-6 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#404D60] text-sm mb-1">Yaklaşan Fuarlar</p>
									<p className="text-3xl font-bold text-[#004767]">5</p>
								</div>
								<Calendar className="text-accent" size={40} />
							</div>
						</Card>

						<Card className="bg-white border-[#eaecf0] p-6 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#404D60] text-sm mb-1">Tamamlanan</p>
									<p className="text-3xl font-bold text-[#004767]">0</p>
								</div>
								<CheckCircle2 className="text-green-500" size={40} />
							</div>
						</Card>
					</div>

					{/* Main Actions */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Profilim */}
						<Card className="bg-white border-[#eaecf0] p-6 hover:border-primary/50 transition-colors group shadow-sm">
							<div className="flex items-start gap-4">
								<div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
									<User className="text-primary" size={24} />
								</div>
								<div className="flex-1">
									<h2 className="text-xl font-semibold mb-2 text-[#004767]">Profilim</h2>
									<p className="text-[#404D60] text-sm mb-4">
										Profil bilgilerinizi görüntüleyin ve düzenleyin
									</p>
									<div className="text-sm text-[#404D60]">
										<p className="mb-1"><strong className="text-[#004767]">Ad:</strong> {user?.firstName} {user?.lastName}</p>
										<p><strong className="text-[#004767]">E-posta:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
									</div>
								</div>
							</div>
						</Card>

						{/* Taleplerim */}
						<Link href="/uye/dashboard/talepler">
							<Card className="bg-white border-[#eaecf0] p-6 hover:border-accent/50 transition-colors group cursor-pointer h-full shadow-sm">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
										<FileText className="text-accent" size={24} />
									</div>
									<div className="flex-1">
										<h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#004767]">
											Taleplerim
											<ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
										</h2>
										<p className="text-[#404D60] text-sm mb-4">
											Gönderdiğiniz teklif taleplerinizi takip edin
										</p>
										<p className="text-2xl font-bold text-accent">0 Talep</p>
									</div>
								</div>
							</Card>
						</Link>

						{/* Fuar Takvimi */}
						<Link href="/fuarlar">
							<Card className="bg-white border-[#eaecf0] p-6 hover:border-green-500/50 transition-colors group cursor-pointer h-full shadow-sm">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
										<Calendar className="text-green-500" size={24} />
									</div>
									<div className="flex-1">
										<h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-[#004767]">
											Fuar Takvimi
											<ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
										</h2>
										<p className="text-[#404D60] text-sm mb-4">
											Yaklaşan uluslararası fuarları görüntüleyin
										</p>
										<p className="text-2xl font-bold text-green-500">5 Yaklaşan</p>
									</div>
								</div>
							</Card>
						</Link>

						{/* Superadmin Tools */}
						{isSuperAdmin && (
							<Link href="/admin/fuarlar/import">
								<Card className="bg-gradient-to-br from-primary to-accent border-primary/50 p-6 hover:shadow-lg transition-all group h-full cursor-pointer">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
											<Upload className="text-white" size={24} />
										</div>
										<div className="flex-1">
											<h2 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
												Fuar Excel İmport
												<ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
											</h2>
											<p className="text-white/90 text-sm mb-3">
												Excel dosyasından toplu fuar ekleme
											</p>
											<Badge className="bg-white/30 text-white">
												<Shield size={12} className="mr-1" />
												Sadece Süper Admin
											</Badge>
										</div>
									</div>
								</Card>
							</Link>
						)}
					</div>

					{/* Quick Actions */}
					<div className="mt-12">
						<h2 className="text-2xl font-bold mb-6 text-[#004767]">Hızlı İşlemler</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Link href="/teklif-al">
								<Button
									className="w-full bg-primary hover:opacity-90 text-white h-auto py-4"
								>
									<div className="text-left">
										<p className="font-semibold">Yeni Teklif Talebi</p>
										<p className="text-sm text-white/90">Size özel fuar organizasyonu teklifi alın</p>
									</div>
								</Button>
							</Link>

							<Link href="/hizmetler">
								<Button
									variant="outline"
									className="w-full h-auto py-4 border-primary/30 text-[#004767] hover:bg-primary/5"
								>
									<div className="text-left">
										<p className="font-semibold">Hizmetlerimiz</p>
										<p className="text-sm text-[#404D60]">9 farklı hizmetimizi keşfedin</p>
									</div>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

