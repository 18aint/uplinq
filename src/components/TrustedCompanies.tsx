import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

// Company logos with their names for accessibility
const brandLogos = [
  { src: "/logos/clients/linear.svg", alt: "Linear" },
  { src: "/logos/clients/superhuman.svg", alt: "Superhuman" },
  { src: "/logos/clients/candid.svg", alt: "Candid" },
  { src: "/logos/clients/hopper.svg", alt: "Hopper" },
  { src: "/logos/clients/replit.svg", alt: "Replit" },
];

const TrustedCompanies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trusted-companies');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="trusted-companies"
      className="w-full py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className={`flex items-center justify-center gap-2 mb-4 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">Trusted Companies</span>
        </div>

        {/* Heading */}
        <h2 className={`text-2xl sm:text-3xl md:text-5xl text-left md:text-center leading-tight font-light text-gray-900 mb-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Trusted By Forward-Thinking Teams
        </h2>

        {/* Optional subtitle */}
        <p className={`text-center text-gray-600 mb-16 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          We support fast-moving companies building for tomorrow.
        </p>

        {/* Desktop View: Logo Grid */}
        <div className={`hidden md:flex justify-center items-center transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {brandLogos.map((logo, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:opacity-100 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Logo Carousel */}
        <div className={`md:hidden relative w-full overflow-hidden transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={1.2}
            loop={true}
            centeredSlides={true}
            speed={2000}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            className="w-full py-4"
          >
            {brandLogos.map((logo, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies; 