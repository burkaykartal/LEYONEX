import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Performance optimizations
	reactStrictMode: true,

	// Image optimization
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},

	// Reduce bundle size
	experimental: {
		optimizePackageImports: ['lucide-react', '@clerk/nextjs'],
	},
};

export default nextConfig;
