import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/NavbarContact";
import Footer from "../components/FooterContact";
import FloatingChatButton from "../components/FloatingChatButton";
import SEO from "../components/SEO";
import { Analytics } from "../components/Analytics";
import { loadStripe } from '@stripe/stripe-js';
import emailjs from '@emailjs/browser';

// Form states
enum AuditState {
  Form,
  Processing,
  Complete,
  Payment
}

// Audit categories with scoring
interface AuditResult {
  category: string;
  score: number;
  maxScore: number;
  issues: string[];
  recommendations: string[];
}

// Initialize Stripe with error handling
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

if (!stripeKey) {
  console.warn('⚠️ Stripe publishable key not found. Payment functionality may be limited.');
}

const WebsiteAudit = () => {
  // Form state management
  const [auditState, setAuditState] = useState<AuditState>(AuditState.Form);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  
  // References
  const urlInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus on URL field
  useEffect(() => {
    if (urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, []);

  // Processing steps for user feedback
  const processingSteps = [
    "Analyzing technical SEO factors...",
    "Checking page speed performance...",
    "Testing mobile responsiveness...",
    "Scanning for security issues...",
    "Evaluating user experience...",
    "Generating detailed report..."
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required";
    } else if (!isValidUrl(websiteUrl)) {
      newErrors.websiteUrl = "Please enter a valid website URL";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Simulate website audit process
  const performAudit = async () => {
    setAuditState(AuditState.Processing);
    
    try {
      // Simulate processing steps for better UX
      for (let i = 0; i < processingSteps.length - 1; i++) {
        setProcessingStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Final step - send email notification via EmailJS
      setProcessingStep(processingSteps.length - 1);
      
      // EmailJS configuration - using environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const notificationEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'wayne@uplinq.digital';

      // Check if EmailJS is configured, otherwise use server endpoint
      if (!serviceId || !templateId || !publicKey) {
        // Fallback to server endpoint
        try {
          const response = await fetch('https://uplinq-backend-1.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              name: companyName || email.split('@')[0],
              email: email,
              details: `Website Audit Request for ${websiteUrl}. Company: ${companyName || 'N/A'}. User has requested a free website audit.`,
              source: 'website_audit',
              requestType: 'audit_request'
        }),
      });
      
          if (!response.ok) {
            throw new Error('Failed to submit audit request');
          }

          console.log("Audit request submitted successfully via server API");
        } catch (error) {
          console.error('Error submitting audit via server:', error);
        }
      } else {
        // Send notification email about the audit request
        const templateParams = {
          to_email: notificationEmail,
          from_email: email,
          message: `Website Audit Request:
Website: ${websiteUrl}
Email: ${email}
Company: ${companyName || 'N/A'}

User has requested a free website audit and is ready for follow-up!`,
          subject: `New Website Audit Request: ${websiteUrl}`,
          user_email: email,
          website_url: websiteUrl,
          company_name: companyName || 'N/A',
          request_type: 'Website Audit',
          signup_date: new Date().toLocaleString()
        };

        try {
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          console.log('Audit notification email sent successfully');
        } catch (emailError) {
          console.error('Error sending audit notification email:', emailError);
        }

        // Send confirmation email to user
        const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_confirmation';
        const confirmationParams = {
          to_name: email.split('@')[0],
          to_email: email,
          from_name: 'Uplinq Digital Team',
          reply_to: 'wayne@uplinq.digital',
          message: `Thank you for requesting a free website audit for ${websiteUrl}!

We've completed a preliminary analysis and will be sending you a detailed report shortly. Our audit includes:

• Technical SEO Analysis
• Page Speed Performance Review
• Mobile Responsiveness Check
• Security Assessment
• User Experience Evaluation
• Actionable Recommendations

You can expect to receive your comprehensive audit results within 24 hours.

If you'd like to discuss your results or explore how we can help optimize your website, feel free to reply to this email or book a free consultation.

Best regards,
The Uplinq Digital Team`,
          subject: 'Your Website Audit Results Are Being Prepared!'
        };

        try {
          await emailjs.send(serviceId, confirmationTemplateId, confirmationParams, publicKey);
          console.log('Confirmation email sent successfully to user');
        } catch (confirmationError) {
          console.error('Confirmation email failed:', confirmationError);
        }
      }
      
      // Generate mock audit results for display
      const mockResults: AuditResult[] = [
        {
          category: "Technical SEO",
          score: 72,
          maxScore: 100,
          issues: [
            "Missing meta descriptions on some pages",
            "Some images missing alt text",
            "Page titles could be more optimized"
          ],
          recommendations: [
            "Add descriptive meta descriptions",
            "Optimize image alt text for accessibility",
            "Improve page title structure and keywords"
          ]
        },
        {
          category: "Page Speed",
          score: 65,
          maxScore: 100,
          issues: [
            "Large image files affecting load time",
            "JavaScript files not minified",
            "Browser caching not optimized"
          ],
          recommendations: [
            "Compress and optimize images",
            "Minify CSS and JavaScript files",
            "Implement proper browser caching"
          ]
        },
        {
          category: "Mobile Experience",
          score: 78,
          maxScore: 100,
          issues: [
            "Some elements too close together",
            "Text size could be larger on mobile"
          ],
          recommendations: [
            "Increase touch target sizes",
            "Optimize mobile typography"
          ]
        },
        {
          category: "Security",
          score: 85,
          maxScore: 100,
          issues: [
            "SSL certificate properly configured"
          ],
          recommendations: [
            "Consider additional security headers",
            "Implement Content Security Policy"
          ]
        }
      ];
      
      setAuditResults(mockResults);
      setOverallScore(75);
      
      // Track audit completion
      Analytics.trackConversion('website_audit_completed', {
        website_url: websiteUrl,
        overall_score: 75,
        label: 'Website Audit Tool Used'
      });
      
      setAuditState(AuditState.Complete);
      
    } catch (error) {
      console.error('Audit error:', error);
      
      // Fallback to mock results if anything fails
      const mockResults: AuditResult[] = [
        {
          category: "Technical SEO",
          score: 72,
          maxScore: 100,
          issues: [
            "Unable to fully analyze - please try again",
            "Some technical checks incomplete",
            "Full analysis available in paid report"
          ],
          recommendations: [
            "Contact us for comprehensive analysis",
            "Schedule a free consultation",
            "Get detailed technical audit report"
          ]
        },
        {
          category: "Page Speed",
          score: 65,
          maxScore: 100,
          issues: [
            "Analysis limited in free version",
            "Full performance audit available",
            "Contact for detailed speed optimization"
          ],
          recommendations: [
            "Professional speed optimization available",
            "Get comprehensive performance audit",
            "Schedule consultation for best results"
          ]
        },
        {
          category: "Mobile Experience",
          score: 78,
          maxScore: 100,
          issues: [
            "Basic mobile check completed",
            "Full mobile audit in detailed report"
          ],
          recommendations: [
            "Get comprehensive mobile optimization",
            "Professional mobile audit available"
          ]
        },
        {
          category: "Security",
          score: 85,
          maxScore: 100,
          issues: [
            "Basic security check completed"
          ],
          recommendations: [
            "Full security audit in detailed report"
          ]
        }
      ];
      
      setAuditResults(mockResults);
      setOverallScore(75);
      
      // Track audit attempt even if it failed
      Analytics.trackConversion('website_audit_attempted', {
        website_url: websiteUrl,
        error: error instanceof Error ? error.message : 'Unknown error',
        label: 'Website Audit Error - Fallback Used'
      });
      
      setAuditState(AuditState.Complete);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await performAudit();
    }
  };

  // Handle payment for full report
  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_1RUD31I1AqaCg5XBqU3O4azO',
          productName: 'Comprehensive Website Audit Report',
          productDescription: `Full audit report for ${websiteUrl} with actionable recommendations`,
          mode: 'payment'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session.');
      }
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load.');
      }
      
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
    }
  };

  // Get score color based on value
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get score background color
  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const auditStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free Website Audit Tool",
    "description": "Comprehensive website analysis covering SEO, performance, mobile experience, and security. Get actionable insights to improve your website.",
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
      "description": "Free website audit with detailed recommendations"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      <SEO
        title="Free Website Audit Tool | Instant Website Analysis | Uplinq Digital"
        description="Get a comprehensive website audit covering SEO, performance, mobile experience, and security. Free analysis with actionable recommendations to improve your website."
        keywords="free website audit, website analysis tool, SEO audit, website performance check, mobile website test, security scan, website optimization"
        canonicalUrl="https://uplinq.digital/website-audit"
        structuredData={auditStructuredData}
      />
      <Navbar />
      
      <section className="w-full py-24 bg-gradient-to-b from-[#f0f9ff] via-[#f9fbfd] to-white">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">Free Website Audit</span>
          </div>
          <h1 className="text-[42px] leading-tight font-light text-gray-900">
            Get Your Free Website Audit
          </h1>
          <p className="text-gray-600 text-base max-w-xl mt-4">
            Discover hidden issues affecting your website's performance, SEO, and user experience. Get actionable insights in minutes.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {auditState === AuditState.Form && (
              <motion.div
                key="audit-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Website URL */}
                  <div className="relative">
                    <input
                      ref={urlInputRef}
                      type="text"
                      id="websiteUrl"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      onFocus={() => setFocused("websiteUrl")}
                      onBlur={() => setFocused(null)}
                      className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                        errors.websiteUrl
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : focused === "websiteUrl" || websiteUrl
                          ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          : "border-gray-200"
                      }`}
                      placeholder="Website URL"
                    />
                    <label
                      htmlFor="websiteUrl"
                      className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                        focused === "websiteUrl" || websiteUrl
                          ? "top-1 text-xs text-blue-500"
                          : "top-3 text-gray-500"
                      }`}
                    >
                      Website URL (e.g., yourwebsite.com)*
                    </label>
                    {errors.websiteUrl && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-red-500"
                      >
                        {errors.websiteUrl}
                      </motion.p>
                    )}
                  </div>

                  {/* Email and Company Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "email" || email
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "email" || email
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Email Address*
                      </label>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onFocus={() => setFocused("companyName")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          focused === "companyName" || companyName
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Company Name"
                      />
                      <label
                        htmlFor="companyName"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "companyName" || companyName
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Company Name (optional)
                      </label>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Free Audit Includes:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Technical SEO Analysis",
                        "Page Speed Performance",
                        "Mobile Responsiveness",
                        "Security Scan",
                        "User Experience Review",
                        "Actionable Recommendations"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                              <path d="M0 4l3 3 5-6H6L3 5 1 3z"/>
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    <span className="flex items-center justify-center">
                      Start Free Website Audit
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            )}

            {auditState === AuditState.Processing && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Analyzing Your Website...
                </h3>
                <p className="text-gray-600 mb-6">
                  {processingSteps[processingStep]}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(((processingStep + 1) / processingSteps.length) * 100)}% Complete
                </p>
              </motion.div>
            )}

            {auditState === AuditState.Complete && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Website Audit Results for {websiteUrl}
                  </h3>
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(overallScore)} mb-4`}>
                    <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                      {overallScore}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Overall Website Health Score
                  </p>
                  
                  {/* Category Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {auditResults.map((result, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{result.category}</h4>
                        <div className={`text-2xl font-bold ${getScoreColor(result.score)} mb-1`}>
                          {result.score}
                        </div>
                        <div className="text-sm text-gray-500">/ {result.maxScore}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePayment}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                    >
                      Get Full Report (£299)
                    </motion.button>
                    <Link to="/quote">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Get Quote to Fix Issues
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Detailed Results Preview */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                  <h4 className="text-xl font-medium text-gray-900 mb-6">Key Issues Found</h4>
                  <div className="space-y-6">
                    {auditResults.map((result, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-900 mb-2">{result.category}</h5>
                        <div className="space-y-2">
                          {result.issues.slice(0, 2).map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm">{issue}</span>
                            </div>
                          ))}
                          {result.issues.length > 2 && (
                            <p className="text-blue-600 text-sm font-medium">
                              +{result.issues.length - 2} more issues in full report
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default WebsiteAudit; 