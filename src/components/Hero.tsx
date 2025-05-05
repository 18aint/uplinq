import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { BoltIcon } from '@heroicons/react/24/solid';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Link } from "react-router-dom";

// Updated brand logos based on provided client logos
const brandLogos = [
  "/logos/Warx.svg", // First logo "Warx"
  "/logos/fathom.png",     // Second logo "FATHOM" (already exists)
  "/logos/logo3.svg", // Third logo "ASSECO"
  "/logos/Hausbank.png",   // Fourth logo "Hausbank" (already exists)
  "/logos/logo5.svg", // Fifth logo "RoyalCaribbean"
];

const avatars = [
  "/avatars/avatar1.avif",
  "/avatars/avatar2.avif",
  "/avatars/avatar3.avif",
];

const LogoCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];
  
  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Container with max width and center alignment */}
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Gradient Overlays for first carousel */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* First Logo Carousel - Left to Right */}
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
          className="w-full mb-6"
        >
          {duplicatedLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-16">
              <div className="h-full w-full flex items-center justify-center px-4">
                <img
                  src={logo}
                  alt={`Partner logo ${index % brandLogos.length + 1}`}
                  className="h-8 w-auto object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                  style={{ opacity: 0.85 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#f0f9ff] via-[#f9fbfd] to-white text-center py-10 px-4 overflow-hidden">
      <div className={`w-full transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Rating and Social Proof */}
        <div className="flex flex-col items-center gap-2 mb-8 sm:mt-[100px] mt-[60px]">
          <div className="flex items-center">
            <div className="flex -space-x-1.5 sm:-space-x-2 mb-3">
              {avatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt=""
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-gray-900"
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
              <span className="font-medium">4.7 /5</span>
            </div>
            <span className="text-gray-600 text-sm">200+ businesses scale</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight tracking-tight max-w-full break-words">
            Digital UX{" "}
            <span className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mx-2">
              <BoltIcon className="h-8 w-8 text-blue-500 bg-transparent" />
            </span>{" "}
            built for scale
            <br />
            elevating your reach
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-thin text-gray-600 mb-8 max-w-xl sm:max-w-2xl md:max-w-[60%] mx-auto">
            Automate workflows, streamline processes, and drive growth with intelligent solutions built for the future
          </p>
          <Link
            to="/quote"
            className="w-full sm:w-auto font-light inline-flex items-center justify-center px-4 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300 text-base sm:text-lg mb-4 sm:mb-0"
            style={{ maxWidth: '100%', minWidth: 0 }}
          >
            Get Free Quote
            <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
          </Link>
        </div>

        {/* Logo Carousel */}
        <LogoCarousel />
      </div>
    </section>
  );
};

export default Hero;
