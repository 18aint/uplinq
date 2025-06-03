import { Routes, Route } from 'react-router-dom';
import App from './App';
import Quote from './pages/Quote';
import Contact from './components/Contact';
import StartProject from './pages/StartProject';
import Pricing from './pages/Pricing';
import Process from './pages/Process';
import Results from './pages/Results';
import ServicesPage from './pages/Services';
import PaymentSuccess from './pages/PaymentSuccess';
import WebsiteAudit from './pages/WebsiteAudit';
import BookingConfirmation from './pages/BookingConfirmation';
import ScrollToTop from './components/ScrollToTop';
import WebsiteGrowthCalculator from './pages/WebsiteGrowthCalculator';
import PerformanceStarterKit from './pages/PerformanceStarterKit';
import StarterKitSuccess from './pages/StarterKitSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LoomConfirmation from './pages/LoomConfirmation';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/results" element={<Results />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/website-audit" element={<WebsiteAudit />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/thank-you" element={<BookingConfirmation />} />
        <Route path="/growth-calculator" element={<WebsiteGrowthCalculator />} />
        <Route path="/starter-kit" element={<PerformanceStarterKit />} />
        <Route path="/starter-kit-success" element={<StarterKitSuccess />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/loom-confirmation" element={<LoomConfirmation />} />
      </Routes>
    </>
  );
};

export default AppRoutes; 