import { redirect } from "next/navigation";
import { getCurrentUserWithCompany } from "@/lib/auth/utils";
import { UserRole } from "@prisma/client";

interface RoleGuardProps {
	children: React.ReactNode;
	allowedRoles: UserRole[];
	redirectTo?: string;
}

/**
 * RoleGuard component - Protects pages based on user roles
 *
 * Usage:
 * <RoleGuard allowedRoles={[UserRole.CLIENT, UserRole.ADMIN]}>
 *   <ProtectedContent />
 * </RoleGuard>
 */
export async function RoleGuard({
	children,
	allowedRoles,
	redirectTo = "/uye/dashboard",
}: RoleGuardProps) {
	const user = await getCurrentUserWithCompany();

	// Redirect to login if not authenticated
	if (!user) {
		redirect("/giris");
	}

	// Check if user has required role
	if (!allowedRoles.includes(user.role)) {
		redirect(redirectTo);
	}

	return <>{children}</>;
}

/**
 * AdminGuard - Shorthand for admin-only pages
 */
export async function AdminGuard({ children }: { children: React.ReactNode }) {
	return (
		<RoleGuard allowedRoles={[UserRole.ADMIN]}>
			{children}
		</RoleGuard>
	);
}

/**
 * ClientGuard - Shorthand for client and admin pages
 */
export async function ClientGuard({ children }: { children: React.ReactNode }) {
	return (
		<RoleGuard allowedRoles={[UserRole.CLIENT, UserRole.ADMIN]}>
			{children}
		</RoleGuard>
	);
}
