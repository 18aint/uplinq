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
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Client Access Portal | Uplinq Digital"
        description="Secure login portal for Uplinq Digital clients to access project dashboard and updates"
        keywords="client portal, project dashboard, Uplinq Digital client access"
        canonicalUrl="https://uplinq.digital/client-login"
      />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              Client Access Portal
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

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Need help accessing your account? Contact your project manager.
              </p>
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
        </motion.div>
      </main>
    </div>
  );
};

export default ClientLogin; 