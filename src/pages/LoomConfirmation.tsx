import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';

const LoomConfirmation = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration - using environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const notificationEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'wayne@uplinq.digital';

      // Check if EmailJS is configured, otherwise use server endpoint
      if (!serviceId || !templateId || !publicKey) {
        // Fallback to server endpoint
        const response = await fetch('https://uplinq-backend-1.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: email.split('@')[0],
            email: email,
            details: `Loom Audit Request from ${email}. User has requested their personalized website audit video from the Apollo campaign.`,
            source: 'loom_confirmation',
            requestType: 'audit_video'
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit audit video request');
        }

        console.log("Loom audit request submitted successfully via server API");
        setIsSubmitting(false);
        setIsSubmitted(true);
        return;
      }

      const templateParams = {
        to_email: notificationEmail,
        from_email: email,
        message: `Loom Audit Request from ${email}. User has requested their personalized website audit video from the Apollo campaign.`,
        subject: 'New Loom Audit Video Request',
        user_email: email,
        request_type: 'Loom Audit Video',
        source: 'loom_confirmation',
        signup_date: new Date().toLocaleString()
      };

      // Send notification email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Send confirmation email to user
      const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_confirmation';
      const confirmationParams = {
        to_name: email.split('@')[0],
        to_email: email,
        from_name: 'Uplinq Digital Team',
        reply_to: 'wayne@uplinq.digital',
        message: `Thank you for requesting your personalized website audit video! We'll analyze your website and send you a detailed video review within 24-48 hours.

What to expect:
• Comprehensive website analysis
• Personalized recommendations
• Actionable improvement suggestions
• Professional insights from our team

We'll send your audit video directly to this email address.

Best regards,
The Uplinq Digital Team`,
        subject: 'Your Website Audit Video Is Coming Soon!'
      };

      try {
        await emailjs.send(serviceId, confirmationTemplateId, confirmationParams, publicKey);
      } catch (confirmationError) {
        console.error('Confirmation email failed:', confirmationError);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting loom confirmation:', error);
      setIsSubmitting(false);
      
      let errorMessage = 'There was an error submitting your request. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('EmailJS configuration missing')) {
          errorMessage = 'Service temporarily unavailable. Please contact us directly at wayne@uplinq.digital';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect. Please check your internet connection and try again.';
        }
      }
      
      setError(errorMessage);
    }
  };

  const loomStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Request Your Uplinq Audit",
    "description": "Get your personalized website audit video from Uplinq Digital",
    "url": "https://uplinq.digital/loom-confirmation",
    "publisher": {
      "@type": "Organization",
      "name": "Uplinq Digital",
      "url": "https://uplinq.digital"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Request Your Uplinq Audit | Get Your Personalized Review"
        description="Enter your email to receive your personalized website audit video from Uplinq Digital. Get actionable insights to improve your website's performance."
        keywords="website audit, personalized review, Uplinq Digital, website analysis, performance optimization"
        canonicalUrl="https://uplinq.digital/loom-confirmation"
        structuredData={loomStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="w-full py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Label */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Website Audit</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Your audit is ready
              </h1>
              
              {/* Subheading */}
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Enter your email and we'll send over your personalised review shortly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="max-w-lg mx-auto px-6">
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                        error 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                    />
                    
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send My Video"
                    )}
                  </motion.button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    We'll analyze your website and send you a personalized video audit within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              >
                {/* Success Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Perfect! Check your inbox
                </h2>
                <p className="text-gray-600 mb-6">
                  Thanks — we'll send your video within 24 hours to <strong>{email}</strong>
                </p>

                {/* Additional CTA */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800 mb-2 font-medium">
                    Want to get started right away?
                  </p>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Book a free consultation
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Trust Point 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive review of your website's performance, SEO, and user experience
                  </p>
                </div>

                {/* Trust Point 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Receive your personalized video audit within 24 hours
                  </p>
                </div>

                {/* Trust Point 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Actionable Insights</h3>
                  <p className="text-gray-600 text-sm">
                    Clear recommendations to improve your website's performance and conversions
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoomConfirmation; 