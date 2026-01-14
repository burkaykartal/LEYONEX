import { SignIn } from '@clerk/nextjs';

export default function GirisPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <SignIn
          fallbackRedirectUrl="/uye/dashboard"
          signUpUrl="/kayit"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-none border-0",
              headerTitle: "text-slate-900",
              headerSubtitle: "text-slate-600",
              socialButtonsBlockButton: "border border-slate-300 hover:bg-slate-50",
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
              footerActionLink: "text-orange-500 hover:text-orange-600",
              identityPreviewText: "text-slate-900",
              identityPreviewEditButton: "text-orange-500",
              formFieldLabel: "text-slate-700",
              formFieldInput: "border-slate-300 focus:border-orange-500 focus:ring-orange-500",
              dividerLine: "bg-slate-300",
              dividerText: "text-slate-500",
            }
          }}
        />
      </div>
    </div>
  );
}
