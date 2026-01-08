import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	href?: string;
	iconColor?: string;
	iconBgColor?: string;
	hoverBorderColor?: string;
	badge?: React.ReactNode;
	footer?: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export default function ModuleCard({
	title,
	description,
	icon: Icon,
	href,
	iconColor = "text-primary",
	iconBgColor = "bg-primary/10",
	hoverBorderColor = "hover:border-primary/50",
	badge,
	footer,
	onClick,
	className,
}: ModuleCardProps) {
	const cardContent = (
		<div className="flex items-start gap-4 h-full">
			<div
				className={cn(
					"p-3 rounded-lg transition-colors",
					iconBgColor,
					href && "group-hover:bg-opacity-30"
				)}
			>
				<Icon className={iconColor} size={24} />
			</div>
			<div className="flex-1 min-w-0">
				<h2
					className={cn(
						"text-xl font-semibold mb-2 flex items-center gap-2 text-[#004767]",
						href && "group-hover:text-primary transition-colors"
					)}
				>
					{title}
					{href && (
						<ArrowRight
							size={18}
							className="opacity-0 group-hover:opacity-100 transition-opacity"
						/>
					)}
				</h2>
				<p className="text-[#404D60] text-sm mb-3">{description}</p>
				{badge && <div className="mt-2">{badge}</div>}
				{footer && <div className="mt-4">{footer}</div>}
			</div>
		</div>
	);

	if (href) {
		return (
			<Link href={href} className="block h-full">
				<Card
					className={cn(
						"bg-white border-[#eaecf0] p-6 transition-all group cursor-pointer h-full shadow-sm",
						hoverBorderColor,
						className
					)}
				>
					{cardContent}
				</Card>
			</Link>
		);
	}

	if (onClick) {
		return (
			<Card
				className={cn(
					"bg-white border-[#eaecf0] p-6 transition-all group cursor-pointer h-full shadow-sm",
					hoverBorderColor,
					className
				)}
				onClick={onClick}
			>
				{cardContent}
			</Card>
		);
	}

	return (
		<Card
			className={cn(
				"bg-white border-[#eaecf0] p-6 shadow-sm h-full",
				className
			)}
		>
			{cardContent}
		</Card>
	);
}
