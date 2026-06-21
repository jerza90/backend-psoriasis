import { useEffect } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function PaymentFailedPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const billCode = searchParams.get('billcode');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/checkout?resume=1', { replace: true });
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Topbar />

      <section className="container-main pt-20 pb-16">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose mb-6 shadow-lg shadow-rose/20">
              <AlertTriangle size={40} className="text-white" />
            </div>

            <h1 className="clamp-heading-md mb-3">Pembayaran gagal</h1>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Kami tidak menerima pembayaran untuk transaksi ini. Anda boleh cuba semula atau pilih bank lain.
            </p>

            {billCode && (
              <div className="glass-card rounded-xl p-5 mb-8 text-left">
                <p className="text-xs uppercase tracking-widest text-muted font-bold mb-2">Rujukan</p>
                <p className="text-sm text-ink break-all">{billCode}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/checkout?resume=1" className="button-base button-primary gap-2 justify-center">
                <RefreshCcw size={18} />
                Cuba Bank Lain
              </Link>
              <Link to="/" className="button-base button-secondary gap-2 justify-center">
                <ArrowLeft size={18} />
                Kembali ke Laman Utama
              </Link>
            </div>
            <p className="text-xs text-muted/60 mt-5">
              Anda akan dibawa semula ke checkout secara automatik dalam beberapa saat.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
