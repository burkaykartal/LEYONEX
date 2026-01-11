import { requireCompletedProfile } from "@/lib/auth/utils";
import prisma from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

interface SearchParams {
	sector?: string;
	country?: string;
	city?: string;
	status?: string;
}

export default async function FuarlarPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	await requireCompletedProfile();

	const params = await searchParams;
	const { sector, country, city, status } = params;

	// Build where clause
	const where: any = {};
	if (sector) where.sector = sector;
	if (country) where.country = country;
	if (city) where.city = city;
	if (status) where.status = status;

	// Get fairs with filters
	const fairs = await prisma.fair.findMany({
		where,
		orderBy: {
			startDate: "asc",
		},
		take: 50, // Limit to 50 results
	});

	// Get unique values for filters
	const [sectors, countries, cities] = await Promise.all([
		prisma.fair.findMany({
			select: { sector: true },
			distinct: ["sector"],
			orderBy: { sector: "asc" },
		}),
		prisma.fair.findMany({
			select: { country: true },
			distinct: ["country"],
			orderBy: { country: "asc" },
		}),
		prisma.fair.findMany({
			select: { city: true },
			distinct: ["city"],
			orderBy: { city: "asc" },
		}),
	]);

	const statusConfig = {
		UPCOMING: { label: "Yaklaşan", color: "bg-blue-100 text-blue-800" },
		ONGOING: { label: "Devam Ediyor", color: "bg-green-100 text-green-800" },
		COMPLETED: { label: "Tamamlandı", color: "bg-gray-100 text-gray-800" },
		CANCELLED: { label: "İptal", color: "bg-red-100 text-red-800" },
	};

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-4xl font-bold mb-2 text-[#004767]">
							Sektör Fuarları
						</h1>
						<p className="text-[#404D60] text-lg">
							Uluslararası fuar takvimini inceleyin
						</p>
					</div>

					{/* Filters */}
					<Card className="bg-white border-[#eaecf0] p-6 mb-8">
						<h3 className="font-semibold text-[#004767] mb-4">Filtrele</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							{/* Sector Filter */}
							<div>
								<label className="block text-sm font-medium text-[#404D60] mb-2">
									Sektör
								</label>
								<select
									className="w-full px-3 py-2 border border-[#eaecf0] rounded-md text-[#004767] focus:outline-none focus:ring-2 focus:ring-primary"
									value={sector || ""}
									onChange={(e) => {
										const url = new URL(window.location.href);
										if (e.target.value) {
											url.searchParams.set("sector", e.target.value);
										} else {
											url.searchParams.delete("sector");
										}
										window.location.href = url.toString();
									}}
								>
									<option value="">Tümü</option>
									{sectors.map((s) => (
										<option key={s.sector} value={s.sector}>
											{s.sector}
										</option>
									))}
								</select>
							</div>

							{/* Country Filter */}
							<div>
								<label className="block text-sm font-medium text-[#404D60] mb-2">
									Ülke
								</label>
								<select
									className="w-full px-3 py-2 border border-[#eaecf0] rounded-md text-[#004767] focus:outline-none focus:ring-2 focus:ring-primary"
									value={country || ""}
									onChange={(e) => {
										const url = new URL(window.location.href);
										if (e.target.value) {
											url.searchParams.set("country", e.target.value);
										} else {
											url.searchParams.delete("country");
										}
										window.location.href = url.toString();
									}}
								>
									<option value="">Tümü</option>
									{countries.map((c) => (
										<option key={c.country} value={c.country}>
											{c.country}
										</option>
									))}
								</select>
							</div>

							{/* City Filter */}
							<div>
								<label className="block text-sm font-medium text-[#404D60] mb-2">
									Şehir
								</label>
								<select
									className="w-full px-3 py-2 border border-[#eaecf0] rounded-md text-[#004767] focus:outline-none focus:ring-2 focus:ring-primary"
									value={city || ""}
									onChange={(e) => {
										const url = new URL(window.location.href);
										if (e.target.value) {
											url.searchParams.set("city", e.target.value);
										} else {
											url.searchParams.delete("city");
										}
										window.location.href = url.toString();
									}}
								>
									<option value="">Tümü</option>
									{cities.map((c) => (
										<option key={c.city} value={c.city}>
											{c.city}
										</option>
									))}
								</select>
							</div>

							{/* Status Filter */}
							<div>
								<label className="block text-sm font-medium text-[#404D60] mb-2">
									Durum
								</label>
								<select
									className="w-full px-3 py-2 border border-[#eaecf0] rounded-md text-[#004767] focus:outline-none focus:ring-2 focus:ring-primary"
									value={status || ""}
									onChange={(e) => {
										const url = new URL(window.location.href);
										if (e.target.value) {
											url.searchParams.set("status", e.target.value);
										} else {
											url.searchParams.delete("status");
										}
										window.location.href = url.toString();
									}}
								>
									<option value="">Tümü</option>
									<option value="UPCOMING">Yaklaşan</option>
									<option value="ONGOING">Devam Ediyor</option>
									<option value="COMPLETED">Tamamlandı</option>
								</select>
							</div>
						</div>
					</Card>

					{/* Results */}
					<div className="mb-4">
						<p className="text-[#404D60]">
							<strong className="text-[#004767]">{fairs.length}</strong> fuar
							bulundu
						</p>
					</div>

					{/* Fairs Grid */}
					{fairs.length === 0 ? (
						<Card className="bg-white border-[#eaecf0] p-12 text-center">
							<Building2 className="mx-auto mb-4 text-[#404D60]" size={48} />
							<h3 className="text-xl font-semibold mb-2 text-[#004767]">
								Fuar Bulunamadı
							</h3>
							<p className="text-[#404D60]">
								Seçtiğiniz filtrelere uygun fuar bulunmuyor.
							</p>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{fairs.map((fair) => (
								<Card
									key={fair.id}
									className="bg-white border-[#eaecf0] p-6 hover:shadow-lg transition-shadow"
								>
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-lg font-semibold text-[#004767] flex-1">
											{fair.name_tr}
										</h3>
										<Badge className={statusConfig[fair.status].color}>
											{statusConfig[fair.status].label}
										</Badge>
									</div>

									<div className="space-y-2 text-sm text-[#404D60] mb-4">
										<div className="flex items-center gap-2">
											<Calendar size={16} className="text-primary" />
											<span>
												{new Date(fair.startDate).toLocaleDateString("tr-TR")} -{" "}
												{new Date(fair.endDate).toLocaleDateString("tr-TR")}
											</span>
										</div>

										<div className="flex items-center gap-2">
											<MapPin size={16} className="text-primary" />
											<span>
												{fair.city}, {fair.country}
											</span>
										</div>

										{fair.venue && (
											<div className="flex items-center gap-2">
												<Building2 size={16} className="text-primary" />
												<span>{fair.venue}</span>
											</div>
										)}

										<div className="flex items-center gap-2">
											<Globe size={16} className="text-primary" />
											<span>{fair.sector}</span>
										</div>
									</div>

									<p className="text-sm text-[#404D60] mb-4 line-clamp-2">
										{fair.description_tr}
									</p>

									{fair.websiteUrl && (
										<a
											href={fair.websiteUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-primary hover:underline flex items-center gap-1"
										>
											Web Sitesi
											<ExternalLink size={14} />
										</a>
									)}
								</Card>
							))}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
