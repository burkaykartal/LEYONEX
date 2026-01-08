import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileCompleteBanner() {
	return (
		<div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6 shadow-sm">
			<div className="flex items-start gap-4">
				<div className="flex-shrink-0">
					<div className="p-2 bg-amber-100 rounded-full">
						<AlertCircle className="text-amber-600" size={24} />
					</div>
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-bold text-amber-900 mb-2">
						Profil Tamamlama Gerekli
					</h3>
					<p className="text-amber-800 mb-4">
						Dashboard özelliklerinden tam olarak faydalanabilmek için
						lütfen firma profilinizi tamamlayın. Bu işlem sadece birkaç
						dakika sürer ve tek seferlik yapılır.
					</p>
					<div className="flex flex-col sm:flex-row gap-3">
						<Link href="/uye/profile/complete">
							<Button className="bg-amber-600 hover:bg-amber-700 text-white">
								Profili Tamamla
								<ArrowRight className="ml-2" size={18} />
							</Button>
						</Link>
						<div className="flex items-center gap-2 text-sm text-amber-700">
							<span className="font-medium">Kazanacaklarınız:</span>
							<span>
								Teklif yönetimi, fuar takvimi, doküman yönetimi ve
								daha fazlası
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
