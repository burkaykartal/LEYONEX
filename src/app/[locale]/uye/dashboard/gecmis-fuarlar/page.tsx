import { requireCompletedProfile } from "@/lib/auth/utils";
import prisma from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FairCard from "@/components/dashboard/FairCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Image as ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

export default async function GecmisFuarlarPage() {
	const user = await requireCompletedProfile();

	// Get user's past fairs
	const userFairs = await prisma.userFair.findMany({
		where: {
			userId: user.id,
			contractStatus: "COMPLETED",
		},
		include: {
			fair: true,
			evaluation: true,
			documents: {
				where: {
					category: {
						in: ["PHOTO", "VIDEO"],
					},
				},
				take: 5,
			},
		},
		orderBy: {
			fair: {
				endDate: "desc",
			},
		},
	});

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-4xl font-bold mb-2 text-[#004767]">
							Geçmiş Fuarlar
						</h1>
						<p className="text-[#404D60] text-lg">
							Tamamlanan fuarlarınızı ve değerlendirmelerinizi görüntüleyin
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
						<Card className="bg-white border-[#eaecf0] p-4">
							<p className="text-sm text-[#404D60] mb-1">Toplam Fuar</p>
							<p className="text-3xl font-bold text-[#004767]">
								{userFairs.length}
							</p>
						</Card>
						<Card className="bg-white border-[#eaecf0] p-4">
							<p className="text-sm text-[#404D60] mb-1">Değerlendirilen</p>
							<p className="text-3xl font-bold text-[#004767]">
								{userFairs.filter((f) => f.evaluation).length}
							</p>
						</Card>
						<Card className="bg-white border-[#eaecf0] p-4">
							<p className="text-sm text-[#404D60] mb-1">Ortalama Puan</p>
							<p className="text-3xl font-bold text-[#004767]">
								{userFairs.filter((f) => f.evaluation?.overallRating).length > 0
									? (
											userFairs.reduce(
												(sum, f) => sum + (f.evaluation?.overallRating || 0),
												0
											) /
											userFairs.filter((f) => f.evaluation?.overallRating)
												.length
									  ).toFixed(1)
									: "-"}
							</p>
						</Card>
					</div>

					{/* Empty State */}
					{userFairs.length === 0 ? (
						<Card className="bg-white border-[#eaecf0] p-12 text-center">
							<Calendar className="mx-auto mb-4 text-[#404D60]" size={48} />
							<h3 className="text-xl font-semibold mb-2 text-[#004767]">
								Henüz Tamamlanmış Fuarınız Yok
							</h3>
							<p className="text-[#404D60]">
								Yaklaşan fuarlarınız tamamlandıkça burada görünecektir.
							</p>
						</Card>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{userFairs.map((userFair) => (
								<FairCard
									key={userFair.id}
									fair={userFair.fair}
									badge={
										<Badge className="bg-gray-100 text-gray-800">
											Tamamlandı
										</Badge>
									}
									footer={
										<div className="space-y-3">
											{/* Evaluation Score */}
											{userFair.evaluation ? (
												<div className="p-3 bg-green-50 rounded-lg">
													<div className="flex items-center justify-between mb-2">
														<span className="text-sm font-medium text-green-900">
															Genel Değerlendirme
														</span>
														<div className="flex items-center gap-1">
															<Star
																className="text-yellow-500 fill-yellow-500"
																size={16}
															/>
															<span className="text-sm font-bold text-green-900">
																{userFair.evaluation.overallRating || "-"}/10
															</span>
														</div>
													</div>
													{userFair.evaluation.leadCount !== null && (
														<p className="text-xs text-green-800">
															{userFair.evaluation.leadCount} müşteri,{" "}
															{userFair.evaluation.contractCount} anlaşma
														</p>
													)}
												</div>
											) : (
												<div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
													<p className="text-sm text-amber-800">
														Henüz değerlendirme yapılmadı
													</p>
												</div>
											)}

											{/* Media */}
											{userFair.documents.length > 0 && (
												<div className="flex items-center gap-2 text-xs text-[#404D60]">
													<ImageIcon size={14} className="text-primary" />
													<span>
														{userFair.documents.length} fotoğraf/video
													</span>
												</div>
											)}

											{/* Actions */}
											<div className="flex gap-2">
												{!userFair.evaluation && (
													<Link
														href={`/uye/dashboard/degerlendirme/${userFair.id}`}
														className="flex-1"
													>
														<Button
															className="w-full text-sm bg-primary hover:opacity-90 text-white"
															size="sm"
														>
															<Star size={14} className="mr-1" />
															Değerlendir
														</Button>
													</Link>
												)}
												<Link
													href={`/uye/dashboard/dokumanlar?fairId=${userFair.id}`}
													className="flex-1"
												>
													<Button
														variant="outline"
														className="w-full text-sm"
														size="sm"
													>
														<FileText size={14} className="mr-1" />
														Dökümanlar
													</Button>
												</Link>
											</div>
										</div>
									}
								/>
							))}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
