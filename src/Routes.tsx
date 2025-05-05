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
import ScrollToTop from './components/ScrollToTop';

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
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </>
  );
};

export default AppRoutes; 