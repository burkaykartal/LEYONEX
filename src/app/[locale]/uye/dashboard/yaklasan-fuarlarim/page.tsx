import { requireCompletedProfile } from "@/lib/auth/utils";
import prisma from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FairCard from "@/components/dashboard/FairCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

const CONTRACT_STATUS_CONFIG = {
	PENDING: { label: "Beklemede", color: "bg-amber-100 text-amber-800" },
	CONFIRMED: { label: "Onaylandı", color: "bg-green-100 text-green-800" },
	IN_PROGRESS: { label: "Devam Ediyor", color: "bg-blue-100 text-blue-800" },
	COMPLETED: { label: "Tamamlandı", color: "bg-gray-100 text-gray-800" },
	CANCELLED: { label: "İptal Edildi", color: "bg-red-100 text-red-800" },
};

export default async function YaklasanFuarlarimPage() {
	const user = await requireCompletedProfile();

	// Get user's upcoming fairs
	const userFairs = await prisma.userFair.findMany({
		where: {
			userId: user.id,
			contractStatus: {
				in: ["CONFIRMED", "IN_PROGRESS"],
			},
			fair: {
				endDate: {
					gte: new Date(), // Only upcoming/ongoing
				},
			},
		},
		include: {
			fair: true,
			reminders: {
				where: {
					isCompleted: false,
				},
				orderBy: {
					dueDate: "asc",
				},
				take: 3,
			},
			preparations: true,
		},
		orderBy: {
			fair: {
				startDate: "asc",
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
							Yaklaşan Fuarlarım
						</h1>
						<p className="text-[#404D60] text-lg">
							Anlaşmalı fuarlarınızı takip edin
						</p>
					</div>

					{/* Empty State */}
					{userFairs.length === 0 ? (
						<Card className="bg-white border-[#eaecf0] p-12 text-center">
							<Calendar className="mx-auto mb-4 text-[#404D60]" size={48} />
							<h3 className="text-xl font-semibold mb-2 text-[#004767]">
								Yaklaşan Fuarınız Yok
							</h3>
							<p className="text-[#404D60] mb-6">
								Henüz anlaşmalı bir fuarınız bulunmuyor. Fuar takvimini
								inceleyerek yeni fuarlara katılabilirsiniz.
							</p>
							<Link href="/uye/dashboard/fuarlar">
								<Button className="bg-primary hover:opacity-90 text-white">
									Fuar Takvimini İncele
								</Button>
							</Link>
						</Card>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{userFairs.map((userFair) => {
								const preparation = userFair.preparations[0];
								const contractConfig =
									CONTRACT_STATUS_CONFIG[userFair.contractStatus];

								return (
									<FairCard
										key={userFair.id}
										fair={userFair.fair}
										badge={
											<Badge className={contractConfig.color}>
												{contractConfig.label}
											</Badge>
										}
										footer={
											<div className="space-y-3">
												{/* Contract Info */}
												<div className="text-sm">
													<p className="text-[#404D60]">
														<strong className="text-[#004767]">
															Anlaşma Tarihi:
														</strong>{" "}
														{userFair.contractDate
															? new Date(
																	userFair.contractDate
															  ).toLocaleDateString("tr-TR")
															: "Belirtilmedi"}
													</p>
													{userFair.agreedServices.length > 0 && (
														<p className="text-[#404D60] mt-1">
															<strong className="text-[#004767]">
																Hizmetler:
															</strong>{" "}
															{userFair.agreedServices.join(", ")}
														</p>
													)}
												</div>

												{/* Preparation Score */}
												{preparation && (
													<div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
														<span className="text-sm font-medium text-blue-900">
															Hazırlık Skoru
														</span>
														<div className="flex items-center gap-2">
															<div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
																<div
																	className="h-full bg-blue-600"
																	style={{
																		width: `${preparation.score}%`,
																	}}
																/>
															</div>
															<span className="text-sm font-bold text-blue-900">
																{preparation.score}%
															</span>
														</div>
													</div>
												)}

												{/* Quick Reminders */}
												{userFair.reminders.length > 0 && (
													<div className="text-xs text-[#404D60]">
														<strong className="text-[#004767]">
															Yaklaşan Hatırlatmalar:
														</strong>{" "}
														{userFair.reminders.length} adet
													</div>
												)}

												{/* Actions */}
												<div className="flex gap-2">
													<Link
														href={`/uye/dashboard/hazirlik/${userFair.id}`}
														className="flex-1"
													>
														<Button
															variant="outline"
															className="w-full text-sm"
															size="sm"
														>
															<CheckCircle2 size={14} className="mr-1" />
															Hazırlık
														</Button>
													</Link>
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
								);
							})}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
