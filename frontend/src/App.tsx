import { useEffect } from 'react';
import i18n from './i18n/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import AishaPage from './pages/AishaPage';
import ChecklistPage from './pages/ChecklistPage';
import TipsPage from './pages/TipsPage';
import EbookGalleryPage from './pages/EbookGalleryPage';
import FaqPage from './pages/FaqPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ThankYouPage from './pages/ThankYouPage';
import PaymentFailedPage from './pages/PaymentFailedPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminTestimonialsPage from './pages/AdminTestimonialsPage';
import AffiliateDashboardPage from './pages/AffiliateDashboardPage';
import AffiliatePublicPage from './pages/AffiliatePublicPage';

export default function App() {
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    const handle = (lng: string) => { document.documentElement.lang = lng; };
    i18n.on('languageChanged', handle);
    return () => { i18n.off('languageChanged', handle); };
  }, []);

  return (
    <AuthProvider>
      <div className="ocean-waves" aria-hidden />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/story/aisha" element={<AishaPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/tips" element={<TipsPage />} />
          <Route path="/tips/ebook" element={<EbookGalleryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
          <Route path="/affiliate/dashboard" element={<AffiliateDashboardPage />} />
          <Route path="/affiliate/:referralCode" element={<AffiliatePublicPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
