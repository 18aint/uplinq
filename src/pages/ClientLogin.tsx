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

      {/* Right Column - Product Design Showcase */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-8 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        
        {/* Shape 2 - Cylindrical (Upper Center) */}
        <img
          src="/shape2.avif"
          alt=""
          className="absolute top-[50px] right-[650px] w-[150px] h-[150px] rotate-[30deg"
        />
        
        {/* Shape 3 - Curved Ring (Lower Right) */}
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
            {/* Large Star Shape positioned center-right */}
            <img
              src="/shape1.avif"
              alt=""
              className="absolute bottom-[-201px] w-[500px] h-[500px]"
            />
            
        
          </motion.div>

          {/* Uplinq Pro Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/20 top-[250px] backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden"
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="relative flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <div className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-green-400/30 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">BETA version 1.1.134</span>
              </div>
              
              <h3 className="text-3xl font-light text-gray-900 mb-4">Uplinq Pro</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
                Enterprise-grade solutions with AI-powered automation, custom integrations, and dedicated support for scaling businesses.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">Starting February 2025</span>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Experience Uplinq</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">Pro</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientLogin; 