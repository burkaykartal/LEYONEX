import { SignIn } from "@clerk/nextjs";

export default function GirisPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-dark">
			<SignIn
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

