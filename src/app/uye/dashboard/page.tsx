import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Hoş Geldiniz, {user?.firstName || 'Kullanıcı'}! 👋
            </h1>
            <p className="text-slate-400">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>

          {/* Dashboard Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Teklif Al */}
            <Link
              href="/teklif-al"
              className="bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-white mb-2">Teklif Al</h3>
              <p className="text-slate-400 mb-4">
                Yeni fuar katılımı için teklif oluşturun
              </p>
              <span className="text-orange-500 font-semibold">
                Teklif Oluştur →
              </span>
            </Link>

            {/* Bize Ulaşın */}
            <Link
              href="/iletisim"
              className="bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">Bize Ulaşın</h3>
              <p className="text-slate-400 mb-4">
                Sorularınız için iletişime geçin
              </p>
              <span className="text-orange-500 font-semibold">
                İletişim →
              </span>
            </Link>

            {/* Firma Bilgileri */}
            <Link
              href="/uye/firma-tanimla"
              className="bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-white mb-2">Firma Bilgileri</h3>
              <p className="text-slate-400 mb-4">
                Firma profilinizi tanımlayın
              </p>
              <span className="text-orange-500 font-semibold">
                Tanımla →
              </span>
            </Link>

            {/* Yakında */}
            <div className="bg-slate-800/50 rounded-lg p-6 border-2 border-dashed border-slate-700">
              <div className="text-4xl mb-4 opacity-50">🎪</div>
              <h3 className="text-xl font-bold text-slate-500 mb-2">Yaklaşan Fuarlarım</h3>
              <p className="text-slate-600 text-sm">Yakında aktif olacak</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border-2 border-dashed border-slate-700">
              <div className="text-4xl mb-4 opacity-50">📊</div>
              <h3 className="text-xl font-bold text-slate-500 mb-2">Fuar Hazırlık Skoru</h3>
              <p className="text-slate-600 text-sm">Yakında aktif olacak</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border-2 border-dashed border-slate-700">
              <div className="text-4xl mb-4 opacity-50">📁</div>
              <h3 className="text-xl font-bold text-slate-500 mb-2">Dokümanlarım</h3>
              <p className="text-slate-600 text-sm">Yakında aktif olacak</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
