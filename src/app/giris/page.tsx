import { SignIn } from '@clerk/nextjs';

export default function GirisPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <SignIn
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
