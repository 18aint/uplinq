import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  RocketLaunchIcon, 
  DocumentCheckIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  StarIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';
import { Analytics } from '../components/Analytics';

const PerformanceStarterKit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePurchase = async () => {
    // Clear previous errors
    setErrors({});
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);

    try {
      // Create Stripe checkout session for UplinqPro
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: 'UplinqPro Digital Toolkit',
          productDescription: 'Professional website optimization toolkit with templates, automations, and growth strategies',
          mode: 'payment',
          amount: 1900, // £19.00 in pence
          email: email
        }),
      });

      const { id: sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });

      // Track purchase attempt
      Analytics.trackConversion('uplinqpro_purchase_initiated', {
        email,
        product: 'UplinqPro',
        price: 19,
        label: 'UplinqPro Purchase'
      });

    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation components
  const AnimatedFeature = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref);

    useEffect(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay }
        });
      }
    }, [inView, controls, delay]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
      >
        {children}
      </motion.div>
    );
  };

  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Performance Optimization",
      description: "Templates and frameworks for systematic website speed improvements and technical optimization",
      stats: "Speed Focus",
      color: "from-blue-500 to-cyan-500",
      category: "Performance"
    },
    {
      icon: ChartBarIcon,
      title: "Conversion Optimization",
      description: "Templates and methodologies for improving user experience and conversion workflows",
      stats: "UX Focus",
      color: "from-green-500 to-emerald-500",
      category: "Experience"
    },
    {
      icon: DocumentCheckIcon,
      title: "SEO Framework",
      description: "Structured approach to search engine optimization with audit templates and implementation guides",
      stats: "SEO Focus",
      color: "from-purple-500 to-pink-500",
      category: "Visibility"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Growth Planning",
      description: "Strategic templates for systematic business growth and optimization planning",
      stats: "Strategy Focus",
      color: "from-orange-500 to-red-500",
      category: "Strategy"
    }
  ];

  const testimonials = [
    {
      text: "UplinqPro's systematic approach delivered exceptional results for our optimization strategy. The methodology is comprehensive and well-structured.",
      author: "Sarah Chen",
      role: "E-commerce Founder",
      company: "TechFlow Solutions",
      avatar: "/CFO7.jpeg"
    },
    {
      text: "The speed optimization tools significantly improved our site performance. Organic traffic increased substantially through their framework.",
      author: "Marcus Johnson",
      role: "Chief Executive Officer", 
      company: "DataSync Pro",
      avatar: "/CFO15.jpeg"
    },
    {
      text: "Professional toolkit with excellent return on investment. This delivered immediate, measurable results for our business optimization.",
      author: "Emma Rodriguez",
      role: "Digital Strategy Director",
      company: "Growth Partners",
      avatar: "/CFO14.jpeg"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UplinqPro Digital Toolkit",
    "description": "Professional website optimization toolkit with AI-powered templates and growth automation",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "19",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col">
      <SEO
        title="UplinqPro - Professional Website Optimization Toolkit | £19 | Uplinq Digital"
        description="Get UplinqPro: AI-powered templates, conversion optimization, and growth automation. Used by 300+ businesses to generate millions in additional revenue."
        keywords="website optimization, conversion optimization, SaaS toolkit, performance templates, growth automation"
        canonicalUrl="https://uplinq.digital/starter-kit"
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-transparent to-purple-600/3" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/3 to-blue-600/3 rounded-full blur-3xl" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />

          <div className="relative max-w-7xl mx-auto py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Product Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/20 text-blue-700 px-6 py-3 rounded-full text-sm font-light mb-8"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Website Optimization Toolkit</span>
                <BoltIcon className="w-4 h-4" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-extralight text-gray-900 mb-6 leading-tight tracking-tight"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-light">
                  UplinqPro
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl font-extralight text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Professional website optimization toolkit with templates, frameworks, and methodologies 
                for systematic performance improvement and growth optimization.
              </motion.p>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 max-w-lg mx-auto"
              >
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="text-xl text-gray-400 line-through font-extralight">£49</span>
                    <span className="text-5xl font-extralight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      £19
                    </span>
                  </div>
                  <p className="text-gray-600 font-light tracking-wide">Digital toolkit • Instant download</p>
                </div>

                <div className="space-y-5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for instant access"
                    className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-light ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 font-light">{errors.email}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-light shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-extralight">Processing</span>
                      </div>
                    ) : (
                      <span className="font-light tracking-wide">Get UplinqPro</span>
                    )}
                  </motion.button>
                  
                  {errors.general && (
                    <p className="text-sm text-red-600 text-center font-light">{errors.general}</p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
                  <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                  <span className="font-light">30-day refund policy</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white relative">
          {/* Subtle separator */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedFeature>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-6">
                  What's Included
                </h2>
                <p className="text-lg font-extralight text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Professional templates, frameworks, and methodologies for systematic website optimization 
                  and business growth planning.
                </p>
              </div>
            </AnimatedFeature>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <AnimatedFeature key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group bg-gradient-to-br from-white to-gray-50/30 rounded-3xl p-8 border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-500"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-xs font-light text-gray-500 tracking-wide uppercase mb-2 block">{feature.category}</span>
                            <h3 className="text-xl font-light text-gray-900 mb-2">{feature.title}</h3>
                          </div>
                          <span className={`text-xs font-light px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                            {feature.stats}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-light text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedFeature>
              ))}
            </div>

            {/* Bonus Section - More Compact */}
            <AnimatedFeature delay={0.6}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-green-50/50 via-blue-50/50 to-purple-50/50 rounded-3xl p-8 mt-12 border border-green-200/30"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">
                    Strategy Consultation
                  </h3>
                  <p className="text-base font-extralight text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Optional consultation to discuss your specific optimization goals and implementation strategy 
                    for the templates and frameworks provided.
                  </p>
                  <span className="inline-block text-sm font-light text-green-700 bg-green-100/70 px-5 py-2 rounded-full">
                    Available upon request
                  </span>
                </div>
              </motion.div>
            </AnimatedFeature>
          </div>
        </section>

        {/* Social Proof Section - More Compact */}
        <section className="py-16 bg-gray-50/50 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedFeature>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-extralight text-gray-900 mb-6">
                  Client Feedback
                </h2>
              </div>
            </AnimatedFeature>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedFeature key={index} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100/50"
                  >
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-black-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 mb-6 italic text-base leading-relaxed font-light">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-light text-gray-900">{testimonial.author}</p>
                          <p className="text-xs font-extralight text-gray-500">{testimonial.role}</p>
                          <p className="text-xs font-extralight text-gray-400">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedFeature>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - More Compact */}
        <section className="py-16 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-blue-800/95 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="max-w-4xl mx-auto px-6 text-center">
            <AnimatedFeature>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20"
              >
                <h2 className="text-4xl font-extralight text-white mb-6">
                  Ready to Scale?
                </h2>
                <p className="text-lg font-extralight text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Get access to professional optimization tools and systematic growth methodologies. 
                  Start optimizing your website performance today.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="px-10 py-4 bg-white text-blue-600 rounded-2xl text-lg font-light shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  Get UplinqPro for £19
                </motion.button>
                
                <p className="text-sm font-extralight text-blue-200 mt-6">
                  Instant download • 30-day refund policy
                </p>
              </motion.div>
            </AnimatedFeature>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PerformanceStarterKit; 