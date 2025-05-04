import { useEffect, useRef, useState } from 'react';

const About = () => {
  const carouselImages = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8501f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  ];

  // Carousel functionality
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const containerWidth = carousel.offsetWidth;
    const maxScroll = scrollWidth - containerWidth;

    const animateScroll = () => {
      // Create a slow, continuous scroll
      setScrollPosition((prevPos) => {
        const newPos = prevPos + 0.5;
        return newPos > maxScroll ? 0 : newPos;
      });
    };

    const animationId = setInterval(animateScroll, 50);

    return () => clearInterval(animationId);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-24 mt-10">
        {/* Top section - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-4">
          {/* Left column - Heading */}
          <div>
            <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-light mb-6">
              About us
            </div>
            <h2 className="text-9xl md:text-5xl font-light leading-tight">
              home<br />
              improvement<br />
              specialists
            </h2>
          </div>
          
          {/* Right column - Description */}
          <div>
            <p className="text-gray-600 leading-relaxed max-w-xl font-light">
              Welcome to Refit, your trusted home improvement experts, dedicated to 
              transforming homes with precision and care. With years of experience in 
              building kitchens, bathrooms, garages, and more, we take pride in delivering 
              top-quality craftsmanship and a seamless customer experience. Our mission 
              is to bring your vision to life while ensuring clear communication and expert 
              guidance at every step. Let's create a home you'll love!
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Carousel - Outside of container for true full width */}
      <div className="w-full overflow-hidden mb-24">
        <div 
          ref={carouselRef}
          className="flex whitespace-nowrap overflow-x-hidden" 
          style={{ scrollBehavior: 'smooth' }}
        >
          {carouselImages.map((img, index) => (
            <div 
              key={`carousel-${index}`} 
              className="inline-block min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[33.333%] h-[500px] px-3"
            >
              <div className="rounded-lg overflow-hidden h-full">
                <img 
                  src={img} 
                  alt={`Interior design showcase ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
          {/* Repeat the images to create a seamless loop */}
          {carouselImages.map((img, index) => (
            <div 
              key={`carousel-repeat-${index}`} 
              className="inline-block min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[33.333%] h-[500px] px-3"
            >
              <div className="rounded-lg overflow-hidden h-full">
                <img 
                  src={img} 
                  alt={`Interior design showcase ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          <div>
            <div className="text-6xl font-light mb-2">8</div>
            <div className="text-sm font-medium mb-1">Years experience</div>
            <div className="text-xs text-gray-500 font-light">Improving homes with expert craftsmanship</div>
          </div>
          
          <div>
            <div className="text-6xl font-light mb-2">26</div>
            <div className="text-sm font-medium mb-1">Projects completed</div>
            <div className="text-xs text-gray-500 font-light">Over 25 successful projects</div>
          </div>
          
          <div>
            <div className="text-6xl font-light mb-2">30</div>
            <div className="text-sm font-medium mb-1">Skilled Tradespeople</div>
            <div className="text-xs text-gray-500 font-light">A team of 30 experts with unique skills</div>
          </div>
          
          <div>
            <div className="text-6xl font-light mb-2">100%</div>
            <div className="text-sm font-medium mb-1">Client satisfaction</div>
            <div className="text-xs text-gray-500 font-light">All of our clients are satisfied</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
