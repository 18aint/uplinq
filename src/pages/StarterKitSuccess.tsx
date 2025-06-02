import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  DocumentArrowDownIcon, 
  CalendarDaysIcon,
  ArrowUpCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';
import { Analytics } from '../components/Analytics';

const StarterKitSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isDelivering, setIsDelivering] = useState(true);
  const [delivered, setDelivered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');
  const email = searchParams.get('email');

  useEffect(() => {
    // Automatically deliver the starter kit
    const deliverStarterKit = async () => {
      if (!email) {
        setError('Email not found. Please contact support.');
        setIsDelivering(false);
        return;
      }

      try {
        // Call backend to deliver the starter kit
        const response = await fetch('/api/starter-kit-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            stripeSessionId: sessionId
          }),
        });

        if (response.ok) {
          setDelivered(true);
          
          // Track successful purchase
          Analytics.trackConversion('starter_kit_purchased', {
            email: email,
            session_id: sessionId,
            amount: 19,
            label: 'Starter Kit Purchase Complete'
          });
        } else {
          throw new Error('Delivery failed');
        }
      } catch (error) {
        console.error('Error delivering starter kit:', error);
        setError('There was an issue delivering your starter kit. Please contact support and we\'ll sort this out immediately.');
      } finally {
        setIsDelivering(false);
      }
    };

    // Delay to show loading state
    setTimeout(deliverStarterKit, 2000);
  }, [email, sessionId]);

  const downloads = [
    {
      title: "Speed Acceleration Engine",
      description: "AI-powered optimization templates that boost performance by 67%",
      icon: "📊",
      link: "#"
    },
    {
      title: "Conversion Amplifier Suite",
      description: "High-converting templates and psychological triggers (2.4x improvement)", 
      icon: "🎯",
      link: "#"
    },
    {
      title: "SEO Optimization Framework",
      description: "Professional audit system that drives 156% more organic traffic",
      icon: "🔍", 
      link: "#"
    },
    {
      title: "Growth Automation Playbook",
      description: "30-day systematic approach for predictable revenue growth",
      icon: "📈",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="UplinqPro Delivered! Your Professional Optimization Toolkit | Uplinq Digital"
        description="Your UplinqPro digital toolkit has been delivered. Access your professional optimization tools and book your strategy session."
        canonicalUrl="https://uplinq.digital/starter-kit-success"
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-16 px-6">
          
          {/* Loading State */}
          {isDelivering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Preparing Your Starter Kit...
              </h1>
              <p className="text-xl text-gray-600">
                We're setting up your downloads and sending you the access links.
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && !isDelivering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Delivery Issue
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {error}
              </p>
              <a
                href="mailto:wayne@uplinq.digital?subject=Starter Kit Delivery Issue"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
            </motion.div>
          )}

          {/* Success State */}
          {delivered && !isDelivering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Success Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-4xl font-light text-gray-900 mb-4">
                  Your UplinqPro Toolkit is Ready! 🚀
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  We've sent your professional optimization toolkit to <strong>{email}</strong>. 
                  Check your inbox now (and spam folder just in case).
                </p>
                
                <div className="bg-blue-50 rounded-2xl p-6 max-w-md mx-auto">
                  <EnvelopeIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600">
                    Your download links and bonus strategy call booking link have been sent to your email.
                  </p>
                </div>
              </div>

              {/* What You Get Preview */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  What's In Your UplinqPro Toolkit
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {downloads.map((download, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl">{download.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {download.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {download.description}
                        </p>
                      </div>
                      <DocumentArrowDownIcon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Your Next Steps
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Download Everything</h3>
                    <p className="text-sm text-gray-600">
                      Check your email and download all your resources
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Start with Speed</h3>
                    <p className="text-sm text-gray-600">
                      Begin with the Speed Optimization Guide for quick wins
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Book Free Call</h3>
                    <p className="text-sm text-gray-600">
                      Schedule your included 30-minute strategy session
                    </p>
                  </div>
                </div>
              </div>

              {/* Bonus Call CTA */}
              <div className="text-center">
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  🎁 Don't Forget Your Premium Bonus
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Book your complimentary 45-minute strategy session with our optimization experts
                </p>
                
                <a
                  href="https://calendly.com/wayne-uplinq"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.trackConversion('starter_kit_strategy_call_booked', {
                    email: email || 'unknown',
                    source: 'starter_kit_success',
                    label: 'Free Strategy Call Booking'
                  })}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-green-700 transition-colors"
                  >
                    <CalendarDaysIcon className="w-6 h-6 inline mr-2" />
                    Book Your Free Strategy Call
                  </motion.button>
                </a>
              </div>

              {/* Upgrade Preview */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
                <ArrowUpCircleIcon className="w-12 h-12 mx-auto mb-4 text-blue-100" />
                <h2 className="text-2xl font-light mb-4">
                  Want Advanced Automation?
                </h2>
                <p className="text-xl text-blue-100 mb-6">
                  Upgrade to <strong>UplinqPro Enterprise</strong> for monthly reports, 
                  advanced automation, and priority optimization support.
                </p>
                
                <div className="bg-white/10 rounded-xl p-6 max-w-sm mx-auto mb-6">
                  <h3 className="text-xl font-semibold mb-2">UplinqPro Enterprise</h3>
                  <p className="text-blue-100 mb-4">Monthly optimization + automation + priority support</p>
                  <span className="text-3xl font-bold">£47/month</span>
                </div>
                
                <Link
                  to="/uplinqpro-enterprise"
                  onClick={() => Analytics.trackConversion('uplinqpro_enterprise_upgrade_viewed', {
                    email: email || 'unknown',
                    source: 'uplinqpro_success',
                    label: 'Enterprise Upgrade CTA'
                  })}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Upgrade to Enterprise →
                  </motion.button>
                </Link>
              </div>

              {/* Contact */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Questions? Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  We're here to help you succeed with your website optimization
                </p>
                <a
                  href="mailto:wayne@uplinq.digital"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  wayne@uplinq.digital
                </a>
              </div>
            </motion.div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StarterKitSuccess; 