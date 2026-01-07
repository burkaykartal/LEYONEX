import { SignIn } from "@clerk/nextjs";

export default function GirisPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
			<SignIn
				appearance={{
					elements: {
						rootBox: "mx-auto",
						card: "bg-[#1a1a2e] shadow-2xl border border-gray-700",
						headerTitle: "text-white font-bold",
						headerSubtitle: "text-gray-300",
						socialButtonsBlockButton: "bg-[#004767] hover:bg-[#003152] text-white border-[#004767]",
						formButtonPrimary: "bg-primary hover:opacity-90 text-white",
						formFieldLabel: "text-white",
						formFieldInput: "bg-[#2a2a3e] border-gray-600 text-white placeholder:text-gray-400",
						footerActionLink: "text-primary hover:text-accent",
						identityPreviewText: "text-white",
						formFieldInputShowPasswordButton: "text-gray-300 hover:text-white",
						otpCodeFieldInput: "bg-[#2a2a3e] border-gray-600 text-white",
						formResendCodeLink: "text-primary hover:text-accent",
						footerActionText: "text-gray-300",
					},
				}}
			/>
		</div>
	);
}

