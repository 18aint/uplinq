import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import { BoltIcon } from '@heroicons/react/24/solid';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  
  // Get the session_id from URL params
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        // In a production app, you would verify the session on your server
        // for security reasons
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await response.json();
        
        setPaymentData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Verifying your payment...</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-3xl font-light text-gray-900 mb-4">Payment Successful!</h1>
                
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Thank you for your purchase. Your payment has been processed successfully and our team will be in touch with you shortly to get started on your project.
                </p>

                <div className="border border-gray-100 rounded-xl p-6 mb-8 bg-gray-50 max-w-md mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <BoltIcon className="h-8 w-8 text-blue-500 mr-2" />
                    <span className="text-xl font-medium text-gray-900">Uplinq</span>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-700 text-left">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Order Number:</span>
                      <span className="text-gray-900">{sessionId?.substring(0, 8) || 'UPL-123456'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Date:</span>
                      <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                    {paymentData && (
                      <>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium">Plan:</span>
                          <span className="text-gray-900">{paymentData.product_name || 'Uplinq Plan'}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Amount:</span>
                          <span className="text-gray-900">{paymentData.amount_total ? `$${(paymentData.amount_total / 100).toFixed(2)}` : 'Paid in full'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors w-full md:w-auto"
                    >
                      Go to Dashboard
                    </motion.button>
                  </Link>
                  
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors w-full md:w-auto"
                    >
                      Return to Home
                    </motion.button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess; 