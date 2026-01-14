import { SignUp } from '@clerk/nextjs';

export default function KayitPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-slate-800 shadow-xl"
          }
        }}
      />
    </div>
  );
}
