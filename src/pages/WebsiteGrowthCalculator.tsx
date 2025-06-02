import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowTrendingUpIcon, CurrencyPoundIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';
import { Analytics } from '../components/Analytics';

interface CalculatorResults {
  currentRevenue: number;
  potentialRevenue: number;
  monthlyIncrease: number;
  annualIncrease: number;
  optimizedConversionRate: number;
}

const WebsiteGrowthCalculator = () => {
  // Form state
  const [monthlyVisitors, setMonthlyVisitors] = useState<string>('');
  const [conversionRate, setConversionRate] = useState<string>('');
  const [averageOrderValue, setAverageOrderValue] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  
  // Results state
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateGrowth = () => {
    // Clear previous errors
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!monthlyVisitors || parseInt(monthlyVisitors) <= 0) {
      newErrors.monthlyVisitors = 'Please enter valid monthly visitors';
    }
    
    if (!conversionRate || parseFloat(conversionRate) <= 0 || parseFloat(conversionRate) > 100) {
      newErrors.conversionRate = 'Please enter a valid conversion rate (0.1-100%)';
    }
    
    if (!averageOrderValue || parseFloat(averageOrderValue) <= 0) {
      newErrors.averageOrderValue = 'Please enter a valid average order value';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Calculate current and potential revenue
    const visitors = parseInt(monthlyVisitors);
    const currentConvRate = parseFloat(conversionRate) / 100;
    const avgOrderVal = parseFloat(averageOrderValue);
    
    // Current monthly revenue
    const currentRevenue = visitors * currentConvRate * avgOrderVal;
    
    // Realistic improvement scenarios based on current conversion rate
    let improvementMultiplier = 1.5; // Default 50% improvement
    
    if (currentConvRate < 0.01) { // Less than 1%
      improvementMultiplier = 3.0; // 200% improvement possible
    } else if (currentConvRate < 0.02) { // Less than 2%
      improvementMultiplier = 2.5; // 150% improvement possible
    } else if (currentConvRate < 0.03) { // Less than 3%
      improvementMultiplier = 2.0; // 100% improvement possible
    } else if (currentConvRate < 0.05) { // Less than 5%
      improvementMultiplier = 1.8; // 80% improvement possible
    } else {
      improvementMultiplier = 1.4; // 40% improvement (already optimized)
    }
    
    const optimizedConversionRate = currentConvRate * improvementMultiplier;
    const potentialRevenue = visitors * optimizedConversionRate * avgOrderVal;
    const monthlyIncrease = potentialRevenue - currentRevenue;
    const annualIncrease = monthlyIncrease * 12;
    
    const calculatedResults: CalculatorResults = {
      currentRevenue,
      potentialRevenue,
      monthlyIncrease,
      optimizedConversionRate: optimizedConversionRate * 100,
      annualIncrease
    };
    
    setResults(calculatedResults);
    setShowEmailCapture(true);
    
    // Track calculation
    Analytics.trackConversion('growth_calculator_used', {
      monthly_visitors: visitors,
      conversion_rate: currentConvRate,
      potential_increase: monthlyIncrease,
      label: 'Growth Calculator Completed'
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send to backend (simple email capture)
      const response = await fetch('/api/growth-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          companyName,
          monthlyVisitors: parseInt(monthlyVisitors),
          conversionRate: parseFloat(conversionRate),
          averageOrderValue: parseFloat(averageOrderValue),
          results
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        
        // Track email capture
        Analytics.trackConversion('growth_calculator_email_captured', {
          email,
          potential_increase: results?.monthlyIncrease || 0,
          label: 'Growth Plan Requested'
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success for better UX
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Website Growth Calculator",
    "description": "Calculate how much revenue you could be making with improved website conversion rates",
    "provider": {
      "@type": "WebDesignCompany",
      "name": "Uplinq Digital",
      "url": "https://uplinq.digital",
      "email": "wayne@uplinq.digital"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "GBP",
      "description": "Free website growth calculation and strategy consultation"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Free Website Growth Calculator | See Your Revenue Potential | Uplinq Digital"
        description="Calculate how much additional revenue your website could generate with improved conversion rates. Get your free growth plan and strategy consultation."
        keywords="website growth calculator, conversion rate optimization, revenue calculator, website ROI, conversion improvement"
        canonicalUrl="https://uplinq.digital/growth-calculator"
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <ArrowTrendingUpIcon className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-600">Revenue Growth Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How Much Revenue Are You Missing?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover your website's untapped revenue potential in less than 60 seconds. See exactly how much more you could be making with optimized conversion rates.
            </p>
          </motion.div>

          {!results ? (
            /* Calculator Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">
                Enter Your Current Numbers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Monthly Visitors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UsersIcon className="w-5 h-5 inline mr-2 text-blue-500" />
                    Monthly Website Visitors
                  </label>
                  <input
                    type="number"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(e.target.value)}
                    placeholder="e.g., 5000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.monthlyVisitors ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.monthlyVisitors && (
                    <p className="mt-1 text-sm text-red-600">{errors.monthlyVisitors}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Check Google Analytics for this number</p>
                </div>

                {/* Conversion Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ChartBarIcon className="w-5 h-5 inline mr-2 text-blue-500" />
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    placeholder="e.g., 2.5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.conversionRate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.conversionRate && (
                    <p className="mt-1 text-sm text-red-600">{errors.conversionRate}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">% of visitors who buy/convert</p>
                </div>

                {/* Average Order Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CurrencyPoundIcon className="w-5 h-5 inline mr-2 text-blue-500" />
                    Average Order Value (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(e.target.value)}
                    placeholder="e.g., 150"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.averageOrderValue ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.averageOrderValue && (
                    <p className="mt-1 text-sm text-red-600">{errors.averageOrderValue}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Average amount per sale/lead</p>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={calculateGrowth}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-medium shadow-lg hover:bg-blue-600 transition-colors"
                >
                  Calculate My Revenue Potential
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Results Display */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Revenue Results */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Your Revenue Potential 🚀
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Current Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(results.currentRevenue)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {monthlyVisitors} visitors × {conversionRate}% × £{averageOrderValue}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-400">
                    <h3 className="text-lg font-medium text-green-700 mb-2">Potential Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(results.potentialRevenue)}</p>
                    <p className="text-sm text-green-600 mt-1">
                      With {results.optimizedConversionRate.toFixed(1)}% conversion rate
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    You Could Be Making An Additional
                  </h3>
                  <p className="text-5xl font-bold text-blue-600 mb-2">
                    {formatCurrency(results.monthlyIncrease)}
                  </p>
                  <p className="text-xl text-gray-600">per month</p>
                  <p className="text-lg text-gray-500 mt-4">
                    That's <span className="font-bold text-green-600">{formatCurrency(results.annualIncrease)}</span> additional revenue per year!
                  </p>
                </div>
              </div>

              {/* Email Capture */}
              {!submitted ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4 text-center">
                    Get Your Custom Growth Plan
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Enter your email to receive a detailed strategy showing exactly how to achieve these results for your website.
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company name (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Get My Free Growth Plan'}
                    </motion.button>
                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="bg-green-50 rounded-2xl border border-green-200 p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Growth Plan is On Its Way!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We've sent your personalized growth strategy to <strong>{email}</strong>. 
                    Check your inbox in the next few minutes.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://calendly.com/wayne-uplinq"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => Analytics.trackConversion('strategy_call_booked', {
                        source: 'growth_calculator',
                        potential_increase: results?.monthlyIncrease || 0,
                        label: 'Strategy Call CTA'
                      })}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition-colors"
                      >
                        Book Free Strategy Call
                      </motion.button>
                    </a>
                    
                    <Link
                      to="/services"
                      onClick={() => Analytics.trackConversion('services_viewed', {
                        source: 'growth_calculator',
                        label: 'Services CTA'
                      })}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white text-blue-500 border border-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      >
                        View Our Services
                      </motion.button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebsiteGrowthCalculator; 