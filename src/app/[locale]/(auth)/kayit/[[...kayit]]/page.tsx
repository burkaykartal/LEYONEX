import { SignUp } from "@clerk/nextjs";

export default function KayitPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-dark">
			<SignUp
				appearance={{
					elements: {
						rootBox: "mx-auto",
						card: "bg-dark-card shadow-xl",
					},
				}}
			/>
		</div>
	);
}

