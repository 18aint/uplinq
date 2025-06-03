import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store client info in localStorage for MVP
      const clientData = {
        name: 'TechFlow Solutions', // Mock client name
        email: email,
        loginTime: new Date().toISOString(),
        projectStatus: 'In Progress',
        websiteUrl: 'https://techflow-demo.uplinq.digital'
      };
      
      localStorage.setItem('uplinq-client', JSON.stringify(clientData));
      setIsLoading(false);
      
      // Redirect to dashboard
      navigate('/client-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex">
      <SEO
        title="Client Access Portal | Uplinq Digital"
        description="Secure login portal for Uplinq Digital clients to access project dashboard and updates"
        keywords="client portal, project dashboard, Uplinq Digital client access"
        canonicalUrl="https://uplinq.digital/client-login"
      />
      
      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-8 md:px-6 sm:px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo-uplinq.png" 
                alt="Uplinq Digital" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-2xl font-medium text-gray-900">
                Uplinq Digital
              </span>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Log In
            </h1>
            <p className="text-gray-600">
              Welcome back! Please sign in to view your project.
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Log In'
                )}
              </motion.button>
            </form>

            {/* Forgot Password */}
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </a>
            </div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Access:</p>
            <p className="text-xs text-blue-700">
              Use any email and password to access the demo dashboard
            </p>
          </motion.div>

          {/* Footer Links */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              By clicking on the Log In button, you understand and agree to{' '}
              <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Use</a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Promotional Content */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-8 py-12 bg-white/50 backdrop-blur-sm">
        <div className="w-full max-w-lg space-y-6">
          
          {/* Uplinq Pro Announcement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span className="text-sm font-medium uppercase tracking-wide">New Launch</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">Uplinq Pro is now here</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Advanced enterprise solutions with AI-powered automation, 
              custom integrations, and dedicated support for scaling businesses.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Starting February 2025</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>

          {/* Webinar Announcement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Webinar Series</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced Web Performance Optimization
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tuesday, January 15, 2025<br />
                  2:00 p.m. – 3:00 p.m. GMT
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  Learn cutting-edge techniques for improving Core Web Vitals, 
                  implementing effective caching strategies, and boosting conversion rates.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Register now
                </button>
              </div>
              <div className="ml-4 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* AI Assistant Feature */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">New Feature</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Chat Assistant
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Our AI assistant integrates smart chatbots, lead qualification, 
                  and customer support automation to boost your website engagement.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Learn more
                </button>
              </div>
              <div className="ml-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientLogin; 