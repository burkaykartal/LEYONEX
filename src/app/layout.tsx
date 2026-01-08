// Root layout - minimal wrapper for locale routing
// HTML/body tags are in [locale]/layout.tsx
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Just pass through children - locale layout handles HTML structure
	return children;
}
