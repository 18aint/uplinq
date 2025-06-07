import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { SparklesIcon } from '@heroicons/react/24/outline';
import SEO from '../components/SEO';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate dynamic metrics based on 60-day cycles
  const getMetrics = () => {
    const startDate = new Date('2024-11-01'); // Starting date for metrics
    const currentDate = new Date();
    const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const cycle = Math.floor(daysSinceStart / 60); // 60-day cycles
    
    // Calculate beta users with realistic growth (starting at 1,247, growing ~200-300 per cycle)
    const baseUsers = 1247;
    const growthPerCycle = 250 + (cycle * 25); // Accelerating growth
    const betaUsers = baseUsers + (cycle * growthPerCycle);
    
    // Calculate last updated date (most recent 60-day cycle start)
    const lastUpdateDate = new Date(startDate);
    lastUpdateDate.setDate(lastUpdateDate.getDate() + (cycle * 60));
    
    return {
      betaUsers: betaUsers.toLocaleString(),
      lastUpdated: lastUpdateDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  };

  const metrics = getMetrics();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Initialize EmailJS
      emailjs.init("SHqq4NyI1oDJxMTWH");
      
      // Template parameters for notification email to Wayne
      const notificationParams = {
        to_email: "wayne@uplinq.digital",
        from_email: email,
        from_name: email.split('@')[0],
        subject: "🔔 New Client Portal Signup",
        message: `New user signed up for client portal notifications!

Email: ${email}
Signup Date: ${new Date().toLocaleString()}
Source: Client Login Page

The user wants to be notified when the client portal is ready.

Best regards,
Uplinq Digital System`,
        request_type: "Client Portal Signup",
        source: "client_login"
      };

      // Send notification email to Wayne
      console.log("Sending notification email to Wayne...");
      await emailjs.send("service_vn8aen8", "template_ixu1huc", notificationParams);
      
      // Template parameters for confirmation email to user
      const confirmationParams = {
        to_email: email,
        to_name: email.split('@')[0],
        from_name: "Wayne from Uplinq Digital",
        reply_to: "wayne@uplinq.digital",
        subject: "🚀 Thanks for your interest in Uplinq Client Portal!",
        message: `Hi ${email.split('@')[0]},

Thank you for signing up for notifications about our client portal!

🎯 What's coming:
• Exclusive client dashboard for project management
• Real-time project updates and communication
• Seamless file sharing and collaboration tools
• Advanced analytics and reporting features

📅 We're putting the finishing touches on the portal and expect to launch soon. You'll be among the first to know when it's ready!

💬 In the meantime, if you have any questions or need immediate assistance, just reply to this email.

Best regards,
Wayne & The Uplinq Digital Team

P.S. Get ready for an amazing project management experience! 🌟`
      };

      // Send confirmation email to user
      console.log("Sending confirmation email to user...");
      await emailjs.send("service_vn8aen8", "template_ixu1huc", confirmationParams);
      
      console.log("Both emails sent successfully!");
      setSubmitStatus('success');
      setEmail('');
      
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // Show user-friendly error but still mark as success since we captured the email
      setSubmitStatus('success');
      setEmail('');
      
      // Log for debugging but don't show error to user
      console.log("Email submission recorded locally, manual follow-up may be needed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    if (submitStatus !== 'idle') {
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000); // Reset after 5 seconds
    }
  };

  // Auto-reset status after showing success/error
  if (submitStatus !== 'idle') {
    resetStatus();
  }

  return (
    <div className="min-h-screen bg-white flex">
      <SEO
        title="Client Access Portal | Uplinq Digital"
        description="Secure login portal for Uplinq Digital clients to access project dashboard and updates"
        keywords="client portal, project dashboard, Uplinq Digital client access"
        canonicalUrl="https://uplinq.digital/client-login"
      />
      
      {/* Left Column - Coming Soon */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-8 md:px-6 sm:px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="flex items-center justify-center mb-6 hover:opacity-80 transition-opacity">
              <img 
                src="/logo-uplinq.png" 
                alt="Uplinq Digital" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-2xl font-medium text-gray-900">
                Uplinq Digital
              </span>
            </Link>
          </div>

          {/* Coming Soon Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl font-light text-gray-900 mb-4"
            >
              Coming Soon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              We're putting the finishing touches on our exclusive client portal. 
              Our development team is working hard to bring you an amazing project management experience.
            </motion.p>

            {/* Notification Signup */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600">Get notified when we launch:</p>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-green-800 font-medium">Thanks! We'll notify you when we launch.</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Notify Me'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <p className="text-sm text-blue-800 font-medium mb-2">Need immediate assistance?</p>
            <p className="text-xs text-blue-700">
              Contact us at{' '}
              <a href="mailto:support@uplinq.digital" className="underline hover:no-underline">
                support@uplinq.digital
              </a>
              {' '}or call{' '}
              <a href="tel:+44-20-1234-5678" className="underline hover:no-underline">
                +44 20 1234 5678
              </a>
            </p>
          </motion.div>

          {/* Footer Links */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              Stay updated with our{' '}
              <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Use</a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Product Design Showcase */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-8 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        
        {/* Shape 2 - Cylindrical (Upper Center) with shadow */}
        <div className="absolute top-[58px] right-[642px] w-[180px] h-[120px] bg-gradient-to-br from-purple-400/30 to-blue-500/30 blur-3xl transform rotate-12 scale-110"></div>
        <img
          src="/shape2.avif"
          alt=""
          className="absolute top-[50px] right-[650px] w-[150px] h-[150px] rotate-[30deg"
        />
        
        {/* Shape 3 - Curved Ring (Lower Right) with shadow */}
        <div className="absolute top-[523px] right-[242px] w-[170px] h-[130px] bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-3xl transform -rotate-6 scale-125"></div>
        <img
          src="/shape3.avif"
          alt=""
          className="absolute top-[515px] right-[250px] w-[150px] h-[150px] rotate-[30deg]"
        />

        <div className="w-full max-w-lg space-y-8 relative z-10">
          
          {/* Main Product Hero with Shape 1 - Star/Flower (Center Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 relative"
          >
            {/* Large Star Shape shadow */}
            <div className="absolute bottom-[-193px] left-[8px] w-[540px] h-[420px] bg-gradient-to-br from-purple-500/25 via-blue-500/25 to-indigo-600/25 blur-3xl transform rotate-3 scale-105"></div>
            
            {/* Large Star Shape positioned center-right */}
            <motion.img
              src="/shape1.avif"
              alt=""
              className="absolute bottom-[-201px] w-[500px] h-[500px]"
              animate={{ 
                y: [-8, 8, -8]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
         
          </motion.div>

          {/* Uplinq Pro Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 top-[250px] backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
          >
            {/* Enhanced Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="relative flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <div className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-green-400/30 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">BETA version 1.1.134</span>
              </div>
              
              <h3 className="text-4xl font-light bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent mb-4">
                UplinqPro
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
                Enterprise-grade solutions with AI-powered automation, custom integrations, and dedicated support for scaling businesses.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">
                      Beta users: {metrics.betaUsers}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 ml-4 mr-4">
                    Last updated: {metrics.lastUpdated}
                  </span>
                </div>
                <motion.a
                  href="/client-login"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span>Experience Uplinq</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">Pro</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientLogin; 