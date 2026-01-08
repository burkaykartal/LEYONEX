import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Globe } from "lucide-react";

interface FairCardProps {
	fair: {
		name_tr: string;
		startDate: Date;
		endDate: Date;
		city: string;
		country: string;
		venue?: string | null;
		sector: string;
		status: string;
		description_tr: string;
	};
	badge?: React.ReactNode;
	footer?: React.ReactNode;
	onClick?: () => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
	UPCOMING: { label: "Yaklaşan", color: "bg-blue-100 text-blue-800" },
	ONGOING: { label: "Devam Ediyor", color: "bg-green-100 text-green-800" },
	COMPLETED: { label: "Tamamlandı", color: "bg-gray-100 text-gray-800" },
	CANCELLED: { label: "İptal", color: "bg-red-100 text-red-800" },
};

export default function FairCard({ fair, badge, footer, onClick }: FairCardProps) {
	const statusConfig = STATUS_CONFIG[fair.status] || STATUS_CONFIG.UPCOMING;

	return (
		<Card
			className={`bg-white border-[#eaecf0] p-6 hover:shadow-lg transition-shadow ${onClick ? "cursor-pointer" : ""}`}
			onClick={onClick}
		>
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold text-[#004767] flex-1">
					{fair.name_tr}
				</h3>
				{badge || (
					<Badge className={statusConfig.color}>{statusConfig.label}</Badge>
				)}
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

			{footer && <div className="mt-4 pt-4 border-t border-[#eaecf0]">{footer}</div>}
		</Card>
	);
}
