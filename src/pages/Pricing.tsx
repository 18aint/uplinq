import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import PricingCard from '../components/PricingCard';
import ChatModal from '../components/ChatModal';
import FloatingChatButton from '../components/FloatingChatButton';
import PricingCalculator from '../components/PricingCalculator';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// Shared brand logos - same as in Hero component
const brandLogos = [
  "/logos/Warx.svg", // First logo 
  "/logos/fathom.png", // Second logo
  "/logos/logo3.svg", // Third logo
  "/logos/Hausbank.png", // Fourth logo
  "/logos/logo5.svg", // Fifth logo
];
// Logo Carousel Component
const LogoCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Container with max width and center alignment */}
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#f9fbfd] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#f9fbfd] to-transparent z-10"></div>

        {/* Logo Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={80}
          slidesPerView={5}
          loop={true}
          speed={12000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            reverseDirection: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 80
            },
          }}
          className="w-full"
        >
          {duplicatedLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-16">
              <div className="h-full w-full flex items-center justify-center px-4">
                <img
                  src={logo}
                  alt={`Partner logo ${index % brandLogos.length + 1}`}
                  className="h-8 w-auto object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                  style={{ opacity: 0.7 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log('Stripe key:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const handleCheckout = async (
  priceId: string,
  title: string,
  description: string
) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId,
      productName: title,
      productDescription: description,
    }),
  });
  const data = await response.json();
  const stripe = await stripePromise;
  if (!stripe) {
    alert('Stripe failed to load. Please try again later.');
    return;
  }
  await stripe.redirectToCheckout({ sessionId: data.id });
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showChat, setShowChat] = useState(false);

  // FAQ items
  const faqItems = [
    {
      question: 'Are there any hidden fees?',
      answer: 'No, our pricing is completely transparent. The price you see is the price you pay, with no hidden costs or surprise fees.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade or change your plan at any time. We\'ll help you transition smoothly to ensure continuity of service.'
    },
    {
      question: 'Do you offer custom pricing for larger projects?',
      answer: 'Absolutely! For enterprise clients or projects with specific requirements, we provide custom quotes tailored to your needs. Contact us to discuss your project.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. For VitaFlow retainers, we offer convenient monthly billing.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'We\'re confident in our services, but if you\'re not satisfied, we offer a 14-day money-back guarantee for our VitaFlow retainer plan.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-24 px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a plan that matches your digital needs—from ongoing optimization to hands-on site maintenance.
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center bg-gray-100 p-1 rounded-full">
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  billingPeriod === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  billingPeriod === 'annual' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual <span className="text-xs text-green-500 font-medium">Save 15%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LaunchPad Plan */}
            <PricingCard
              title="Uplinq LaunchPad"
              price="£950"
              description="Built for startups and solopreneurs."
              features={[
                "5 responsive pages",
                "Contact form + map",
                "Mobile-ready",
                "Delivered in 7 days",
                "Includes 1 month of bug fixes"
              ]}
              cta="Get Started"
              plan="launchpad"
              priceId="price_1RLMBFI1AqaCg5XBk1mzngNC"
              onCheckout={handleCheckout}
            />

            {/* Growth Engine Plan */}
            <PricingCard
              title="VitaFlow Growth Engine"
              price="£2,200"
              description="Your website's full-stack upgrade."
              features={[
                "CRO audit & redesign",
                "LLM-powered landing page copy",
                "High-performance speed pass",
                "Analytics & conversion setup",
                "Free onboarding consultation"
              ]}
              highlight
              cta="Start My Project"
              plan="growth"
              priceId="price_1RLMBuI1AqaCg5XBjnBmy44P"
              onCheckout={handleCheckout}
            />

            {/* Orbit Retainer Plan */}
            <PricingCard
              title="Uplinq Orbit Retainer"
              price={billingPeriod === 'monthly' ? "£749/mo" : "£7,490/yr"}
              description="Set it and scale it package."
              features={[
                "Monthly site speed optimization",
                "24/7 error alerts & instant patches",
                "1 new feature or section monthly",
                "A/B testing + growth report",
                "Cancel anytime. 1-week sprint start."
              ]}
              cta="Book Retainer"
              plan={`orbit-${billingPeriod}`}
              priceId={billingPeriod === 'monthly'
                ? "price_1RLMFeI1AqaCg5XBQNH6WmDE"
                : "price_1RLMFeI1AqaCg5XBKvhLte18"}
              onCheckout={handleCheckout}
            />
          </div>
        </section>

        {/* Interactive Pricing Calculator Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Custom Quote</span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Build Your Custom Project
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Need something more tailored? Use our interactive calculator to build a custom solution and get an instant estimate.
              </p>
            </div>
          </div>
          <PricingCalculator />
        </section>

        {/* Section divider */}
        <div className="relative h-8 bg-white">
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gray-50"></div>
        </div>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">FAQ</span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Everything you need to know about our pricing and plans.
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section with Logo Carousel */}
        <section className="py-16 bg-[#f9fbfd]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-light text-center text-gray-900 mb-8">
              Trusted by innovative companies
            </h2>
            
            {/* Animated Logo Carousel */}
            <div className="mb-16">
              <LogoCarousel />
            </div>
            
            {/* Testimonial Card with Real Avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <img 
                    src="/avatars/avatar1.avif" 
                    alt="Sarah Johnson" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4 italic text-center md:text-left">
                    "Working with Uplinq was a game-changer for our business. They delivered a stunning website that's helped us increase conversions by 45%. Their process was smooth and they were responsive throughout."
                  </p>
                  <div className="text-center md:text-left">
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">CMO, TechStart Inc.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-[24px] bg-gradient-to-r from-[#5F9CFF] to-[#2D72F9] px-6 py-16 flex flex-col items-center text-center"
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Not sure which plan is right for you?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl">
                Let Uplinq AI analyze your needs and recommend the perfect plan for your business goals.
              </p>
              <motion.button
                onClick={() => setShowChat(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-3 rounded-full bg-white text-blue-600 font-medium transition-colors hover:bg-white/95"
              >
                Ask Uplinq AI
                <svg 
                  className="ml-2" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                >
                  <path 
                    d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
          
        </section>
      </main>
      <FloatingChatButton />
      <Footer />
      
      {/* Chat Modal */}
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default Pricing; 