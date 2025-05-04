import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import FloatingChatButton from '../components/FloatingChatButton';
import ChatModal from '../components/ChatModal';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
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
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

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

const ProcessStep = ({ 
  step, 
  title, 
  description, 
  icon 
}: { 
  step: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Connecting Line */}
      <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-blue-100" />
      
      <div className="flex gap-8 relative z-10">
        {/* Step Number & Icon */}
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-2">
              {icon}
            </div>
            <span className="text-xs font-medium text-blue-500">{step}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-4">
          <h3 className="text-xl font-light text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-12">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const [showChat, setShowChat] = useState(false);
  
  // Process steps data
  const processSteps = [
    {
      step: "Step 01",
      title: "Discovery & Strategy",
      description: "Understand goals, competitors, and user needs. We'll work together to define key outcomes and create a roadmap for success.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      step: "Step 02",
      title: "Design & Wireframes",
      description: "Figma-based UX/UI tailored for performance and brand alignment. We create beautiful, intuitive interfaces that users love.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    {
      step: "Step 03",
      title: "Development & Integration",
      description: "Build using scalable tech stack (Next.js, Tailwind, Framer Motion). Our expert development team brings the designs to life.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      step: "Step 04",
      title: "QA & Launch",
      description: "Bug testing, speed optimization, mobile and SEO checks. We ensure your site is fast, responsive, and ready for the world.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      step: "Step 05",
      title: "Optimize & Maintain",
      description: "Ongoing support, CRO enhancements, and analytics reporting. We help your site grow and evolve with your business.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="w-full py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Our Process</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                How We Bring Ideas to Life
              </h1>
              
              <p className="text-gray-600 text-lg max-w-2xl mb-8">
                Our proven system helps turn your vision into a seamless digital product — fast.
              </p>
              
              <Link
                to="/start-project"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Start Your Project
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
              </Link>
            </div>
          </div>
        </section>
        
        {/* Process Timeline */}
        <section className="w-full py-20 bg-[#f9fbfd]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Trusted By Section */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-gray-900">Trusted by innovative companies</h3>
            </div>
            
            {/* Animated Logo Carousel */}
            <div className="mb-16">
              <LogoCarousel />
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center"
            >
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                See what this process looks like on your project
              </h2>
              
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Let's discuss how our proven process can help bring your digital vision to life. Our team is ready to understand your goals and create a tailored solution.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChat(true)}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Book a Free Consultation
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <FloatingChatButton />
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default Process; 