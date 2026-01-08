import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import prisma from '@/lib/prisma';

/**
 * Get current authenticated user from Clerk
 */
export async function getCurrentClerkUser() {
  const user = await currentUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    firstName: user.firstName,
    lastName: user.lastName,
    role: (user.publicMetadata?.role as UserRole) || UserRole.GUEST,
    hasCompletedProfile: user.publicMetadata?.hasCompletedProfile === true,
  };
}

/**
 * Get current user with company data from database
 * Syncs Clerk user to database if not exists
 */
export async function getCurrentUserWithCompany() {
  const clerkUser = await getCurrentClerkUser();
  if (!clerkUser) return null;

  // Get or create user in database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: {
      company: true,
    },
  });

  // Sync user to database if doesn't exist
  if (!dbUser) {
    dbUser = await syncUserToDatabase(clerkUser.id);
  }

  return {
    ...dbUser,
    role: dbUser.role,
    hasCompletedProfile: dbUser.hasCompletedProfile,
  };
}

/**
 * Sync Clerk user to Prisma database
 */
export async function syncUserToDatabase(clerkId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser || clerkUser.id !== clerkId) {
    throw new Error('User not found');
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error('User email not found');
  }

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { clerkId },
    include: { company: true },
  });

  if (!user) {
    // Create new user
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: (clerkUser.publicMetadata?.role as UserRole) || UserRole.GUEST,
        hasCompletedProfile: clerkUser.publicMetadata?.hasCompletedProfile === true,
      },
      include: { company: true },
    });
  } else {
    // Update existing user
    user = await prisma.user.update({
      where: { clerkId },
      data: {
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: (clerkUser.publicMetadata?.role as UserRole) || user.role,
        hasCompletedProfile:
          clerkUser.publicMetadata?.hasCompletedProfile === true ||
          user.hasCompletedProfile,
      },
      include: { company: true },
    });
  }

  return user;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/giris');
  }

  const user = await getCurrentUserWithCompany();
  if (!user) {
    redirect('/giris');
  }

  return user;
}

/**
 * Require specific role(s) - redirect to dashboard if not authorized
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    redirect('/uye/dashboard');
  }

  return user;
}

/**
 * Check if user has access to a specific company
 */
export async function checkCompanyAccess(companyId: string) {
  const user = await requireAuth();

  // Admin has access to all companies
  if (user.role === UserRole.ADMIN) {
    return true;
  }

  // Check if user belongs to the company
  if (user.companyId !== companyId) {
    return false;
  }

  return true;
}

/**
 * Require company profile completion - redirect if not completed
 */
export async function requireCompletedProfile() {
  const user = await requireAuth();

  if (!user.hasCompletedProfile) {
    redirect('/uye/profile/complete');
  }

  return user;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  const user = await getCurrentUserWithCompany();
  return user?.role === UserRole.ADMIN;
}

/**
 * Check if user is client (has company profile)
 */
export async function isClient() {
  const user = await getCurrentUserWithCompany();
  return user?.role === UserRole.CLIENT;
}

/**
 * Check if user is guest (no company profile)
 */
export async function isGuest() {
  const user = await getCurrentUserWithCompany();
  return user?.role === UserRole.GUEST;
}
