import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { UserButton } from '@clerk/nextjs';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/giris');
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">
                Hoş Geldiniz! 👋
              </h1>
              <UserButton afterSignOutUrl="/" />
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                <strong>İsim:</strong> {user?.firstName} {user?.lastName}
              </p>
              <p>
                <strong>E-posta:</strong> {user?.emailAddresses[0]?.emailAddress}
              </p>

              <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-orange-300">
                  🚧 Dashboard henüz geliştirme aşamasında. Yakında fuar taleplerinizi,
                  rezervasyonlarınızı ve daha fazlasını buradan yönetebileceksiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
