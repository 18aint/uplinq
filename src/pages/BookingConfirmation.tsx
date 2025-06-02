import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, CalendarDaysIcon, EnvelopeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';
import { Analytics } from '../components/Analytics';

// Client logos for the carousel
const brandLogos = [
  "/logos/Warx.svg",
  "/logos/fathom.png",
  "/logos/logo3.svg",
  "/logos/Hausbank.png",
  "/logos/logo5.svg",
];

const ClientCarousel = () => {
  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];
  
  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Container with max width and center alignment */}
      <div className="max-w-5xl mx-auto">
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
                  alt={`Client logo ${index % brandLogos.length + 1}`}
                  className="h-8 w-auto object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                  style={{ opacity: 0.75 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const BookingConfirmation = () => {
  // Track page view
  Analytics.trackConversion('booking_confirmation_viewed', {
    page: 'booking_confirmation',
    label: 'Calendly Booking Confirmed'
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ConfirmationPage",
    "name": "Booking Confirmation - Uplinq Digital",
    "description": "Thank you for booking with Uplinq Digital. Your appointment is confirmed.",
    "provider": {
      "@type": "WebDesignCompany",
      "name": "Uplinq Digital",
      "url": "https://uplinq.digital",
      "email": "wayne@uplinq.digital"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Booking Confirmed - Thank You | Uplinq Digital"
        description="Your appointment with Uplinq Digital is confirmed. We've sent you a confirmation email and look forward to helping elevate your digital success."
        keywords="booking confirmed, appointment scheduled, Uplinq Digital consultation, web development meeting"
        canonicalUrl="https://uplinq.digital/thank-you"
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
              <CheckCircleIcon className="w-10 h-10 text-green-500" />
            </div>

            {/* Main Headlines */}
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Thank You for Booking with Uplinq Digital!
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              We've received your booking and sent you a confirmation email. We look forward to helping elevate your digital success.
            </p>

            {/* Next Steps Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 text-left">
              <h2 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                What Happens Next?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive a confirmation email with all the meeting details and a calendar invite.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Calendar Invite
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add the meeting to your calendar. Need to reschedule? Use the link in your confirmation email.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Prepare for Success
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Think about your goals and challenges. We'll discuss how to elevate your digital presence.
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Need to reschedule or cancel?</strong> Simply use the link in your confirmation email or contact us directly at{' '}
                  <a href="mailto:wayne@uplinq.digital" className="underline">
                    wayne@uplinq.digital
                  </a>
                </p>
              </div>
            </div>

            {/* Case Studies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Want to Get Inspired?
              </h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                While you wait for our meeting, explore how we've helped other businesses transform their digital presence and achieve remarkable growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/results"
                  onClick={() => Analytics.trackConversion('case_studies_clicked', {
                    source: 'booking_confirmation',
                    label: 'Case Studies CTA'
                  })}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#2D72F9] text-white rounded-lg shadow hover:bg-blue-600 transition-colors font-medium"
                  >
                    View Case Studies
                  </motion.button>
                </Link>
                
                <Link
                  to="/services"
                  onClick={() => Analytics.trackConversion('services_clicked', {
                    source: 'booking_confirmation',
                    label: 'Services CTA'
                  })}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-[#2D72F9] border border-[#2D72F9] rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Explore Our Services
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Join 200+ businesses that have transformed their digital presence with Uplinq Digital
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-black-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-medium ml-2">4.7/5 Client Satisfaction</span>
              </div>
              
              {/* Client Carousel */}
              <ClientCarousel />
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation; 