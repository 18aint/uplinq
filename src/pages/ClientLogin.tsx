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
        
        {/* Shape 2 - Cylindrical (Upper Left) */}
        <motion.img
          src="/shape2.avif"
          alt=""
          className="absolute top-16 left-12 w-20 h-20 opacity-70"
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [-8, 8, -8],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Shape 3 - Curved Ring (Lower Right) */}
        <motion.img
          src="/shape3.avif"
          alt=""
          className="absolute bottom-20 right-16 w-24 h-24 opacity-60"
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="w-full max-w-lg space-y-8 relative z-10">
          
          {/* Main Product Hero with Shape 1 - Star/Flower (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="relative">
              <motion.img
                src="/shape1.avif"
                alt=""
                className="w-48 h-48 mx-auto mb-6 opacity-80"
                initial={{ scale: 0.9, rotate: 0 }}
                animate={{ 
                  scale: [0.9, 1.1, 0.9],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Pathway to productivity
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Accelerate your web presence with our advanced development tools and intelligent automation solutions
            </p>
          </motion.div>

          {/* Uplinq Pro Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">New Launch</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Uplinq Pro</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Enterprise-grade solutions with AI-powered automation, custom integrations, and dedicated support for scaling businesses.
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Starting February 2025</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientLogin; 