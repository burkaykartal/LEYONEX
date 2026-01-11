import { redirect } from "next/navigation";
import Link from "next/link";
import { requireCompletedProfile } from "@/lib/auth/utils";
import prisma from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const STATUS_CONFIG = {
	PENDING: {
		label: "Beklemede",
		icon: Clock,
		color: "bg-amber-100 text-amber-800 border-amber-200",
	},
	REVIEWED: {
		label: "İncelendi",
		icon: AlertCircle,
		color: "bg-blue-100 text-blue-800 border-blue-200",
	},
	APPROVED: {
		label: "Onaylandı",
		icon: CheckCircle2,
		color: "bg-green-100 text-green-800 border-green-200",
	},
	REJECTED: {
		label: "Reddedildi",
		icon: XCircle,
		color: "bg-red-100 text-red-800 border-red-200",
	},
	CONVERTED: {
		label: "Anlaşma Yapıldı",
		icon: CheckCircle2,
		color: "bg-purple-100 text-purple-800 border-purple-200",
	},
};

export default async function TaleplerPage() {
	const user = await requireCompletedProfile();

	// Get user's quote requests
	const quoteRequests = await prisma.quoteRequest.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			fair: {
				select: {
					name_tr: true,
					sector: true,
					startDate: true,
				},
			},
		},
	});

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20 bg-[#F5F7FA]">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-4xl font-bold mb-2 text-[#004767]">
								Teklif Taleplerim
							</h1>
							<p className="text-[#404D60] text-lg">
								Gönderdiğiniz teklif taleplerini takip edin
							</p>
						</div>
						<Link href="/teklif-al">
							<Button className="bg-primary hover:opacity-90 text-white">
								<Plus size={20} className="mr-2" />
								Yeni Teklif Talebi
							</Button>
						</Link>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
						<Card className="bg-white border-[#eaecf0] p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-amber-100 rounded-lg">
									<Clock className="text-amber-600" size={20} />
								</div>
								<div>
									<p className="text-sm text-[#404D60]">Beklemede</p>
									<p className="text-2xl font-bold text-[#004767]">
										{quoteRequests.filter((q) => q.status === "PENDING").length}
									</p>
								</div>
							</div>
						</Card>

						<Card className="bg-white border-[#eaecf0] p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-green-100 rounded-lg">
									<CheckCircle2 className="text-green-600" size={20} />
								</div>
								<div>
									<p className="text-sm text-[#404D60]">Onaylanan</p>
									<p className="text-2xl font-bold text-[#004767]">
										{quoteRequests.filter((q) => q.status === "APPROVED").length}
									</p>
								</div>
							</div>
						</Card>

						<Card className="bg-white border-[#eaecf0] p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-purple-100 rounded-lg">
									<CheckCircle2 className="text-purple-600" size={20} />
								</div>
								<div>
									<p className="text-sm text-[#404D60]">Anlaşma</p>
									<p className="text-2xl font-bold text-[#004767]">
										{quoteRequests.filter((q) => q.status === "CONVERTED").length}
									</p>
								</div>
							</div>
						</Card>

						<Card className="bg-white border-[#eaecf0] p-4">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-blue-100 rounded-lg">
									<FileText className="text-blue-600" size={20} />
								</div>
								<div>
									<p className="text-sm text-[#404D60]">Toplam</p>
									<p className="text-2xl font-bold text-[#004767]">
										{quoteRequests.length}
									</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Quote Requests List */}
					{quoteRequests.length === 0 ? (
						<Card className="bg-white border-[#eaecf0] p-12 text-center">
							<FileText className="mx-auto mb-4 text-[#404D60]" size={48} />
							<h3 className="text-xl font-semibold mb-2 text-[#004767]">
								Henüz Teklif Talebiniz Yok
							</h3>
							<p className="text-[#404D60] mb-6">
								Fuarlarınız için özel teklif almak üzere ilk talebinizi oluşturun
							</p>
							<Link href="/teklif-al">
								<Button className="bg-primary hover:opacity-90 text-white">
									<Plus size={20} className="mr-2" />
									Teklif Talebi Oluştur
								</Button>
							</Link>
						</Card>
					) : (
						<div className="space-y-4">
							{quoteRequests.map((request) => {
								const statusConfig = STATUS_CONFIG[request.status];
								const StatusIcon = statusConfig.icon;

								return (
									<Card
										key={request.id}
										className="bg-white border-[#eaecf0] p-6 hover:shadow-md transition-shadow"
									>
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-3">
													<h3 className="text-xl font-semibold text-[#004767]">
														{request.fairName}
													</h3>
													<Badge
														className={`${statusConfig.color} border`}
													>
														<StatusIcon size={14} className="mr-1" />
														{statusConfig.label}
													</Badge>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#404D60]">
													{request.fairDate && (
														<p>
															<strong className="text-[#004767]">Tarih:</strong>{" "}
															{request.fairDate}
														</p>
													)}
													<p>
														<strong className="text-[#004767]">
															Talep Tarihi:
														</strong>{" "}
														{new Date(request.createdAt).toLocaleDateString("tr-TR")}
													</p>
												</div>

												<div className="mt-3">
													<p className="text-sm text-[#404D60] whitespace-pre-line">
														{request.requestDetails}
													</p>
												</div>

												{/* Admin Response */}
												{request.adminNotes && (
													<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
														<p className="text-sm font-semibold text-blue-900 mb-2">
															Admin Yanıtı:
														</p>
														<p className="text-sm text-blue-800">
															{request.adminNotes}
														</p>
														{request.quotedAmount && (
															<p className="text-sm font-bold text-blue-900 mt-2">
																Teklif: {request.quotedAmount}{" "}
																{request.quotedCurrency}
															</p>
														)}
													</div>
												)}
											</div>
										</div>
									</Card>
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
