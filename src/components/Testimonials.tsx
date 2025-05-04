import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  handle: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Neurova transformed our workflow with AI automation, saving us countless hours! The platform's intuitive interface and powerful features have revolutionized how we handle our daily tasks. Our team productivity has increased significantly since implementation.",
    author: "Ryan Carter",
    handle: "@ryanc_ai",
    image: "/avatars/avatar1.avif"
  },
  {
    id: 2,
    text: "From automating tasks to optimizing workflows, Neurova made our business more efficient than ever by eliminating manual work and reducing errors significantly. The AI-powered automation has streamlined our processes and improved accuracy across all departments.",
    author: "Ethan James",
    handle: "@ethanj",
    image: "/avatars/avatar2.avif"
  },
  {
    id: 3,
    text: "Neurova is our daily tool to bypass averages and reveal true insights, for the whole team! The detailed analytics and AI-driven recommendations have transformed our decision-making process. We're now able to spot trends and opportunities we previously missed.",
    author: "Jake Mitchell",
    handle: "@jakem",
    image: "/avatars/avatar3.avif"
  },
  {
    id: 4,
    text: "Smart, fast, and intuitive—Neurova simplifies AI automation like no other platform, enhancing scalability, reducing costs, and optimizing everyday operations with ease. The customizable workflows and integration capabilities have made it an essential part of our tech stack.",
    author: "Daniel Brooks",
    handle: "@dbrooks",
    image: "/avatars/avatar4.jpg"
  },
  {
    id: 5,
    text: "The AI chatbot integration is a game-changer—it feels like having a 24/7 assistant! It handles customer inquiries instantly and learns from each interaction, continuously improving its responses. Our customer satisfaction scores have never been higher.",
    author: "Liam Foster",
    handle: "@liamf",
    image: "/avatars/avatar5.jpg"
  },
  {
    id: 6,
    text: "Neurova transformed our workflow with AI automation, saving us countless hours every week and improving overall team efficiency effortlessly. The platform's machine learning capabilities adapt to our specific needs, making it an invaluable asset to our operations.",
    author: "Sophia Reed",
    handle: "@sophiareed",
    image: "/avatars/avatar6.jpg"
  }
];

// Duplicate testimonials for seamless looping
const extendedTestimonialsRow1 = [...testimonials, ...testimonials, ...testimonials];
const extendedTestimonialsRow2 = [...testimonials.reverse(), ...testimonials, ...testimonials.reverse()];

const Testimonials = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const animationRef1 = useRef<number | null>(null);
  const animationRef2 = useRef<number | null>(null);
  const lastTimestamp1 = useRef<number>(0);
  const lastTimestamp2 = useRef<number>(0);

  useEffect(() => {
    const animateRow1 = (timestamp: number) => {
      // Throttle to optimize performance (run every ~16ms for 60fps)
      if (timestamp - lastTimestamp1.current < 16) {
        animationRef1.current = requestAnimationFrame(animateRow1);
        return;
      }
      
      lastTimestamp1.current = timestamp;
      
      if (row1Ref.current) {
        if (row1Ref.current.scrollLeft >= row1Ref.current.scrollWidth / 3) {
          row1Ref.current.scrollLeft = 0;
        } else {
          row1Ref.current.scrollLeft += 1.0; // Increase scroll speed for first row
        }
      }
      
      animationRef1.current = requestAnimationFrame(animateRow1);
    };

    const animateRow2 = (timestamp: number) => {
      // Throttle to optimize performance
      if (timestamp - lastTimestamp2.current < 16) {
        animationRef2.current = requestAnimationFrame(animateRow2);
        return;
      }
      
      lastTimestamp2.current = timestamp;
      
      if (row2Ref.current) {
        if (row2Ref.current.scrollLeft <= 0) {
          row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 3;
        } else {
          row2Ref.current.scrollLeft -= 0.5;
        }
      }
      
      animationRef2.current = requestAnimationFrame(animateRow2);
    };

    // Set initial scroll positions
    if (row1Ref.current) {
      row1Ref.current.scrollLeft = 0;
    }
    if (row2Ref.current) {
      row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 3;
    }

    // Start animations
    animationRef1.current = requestAnimationFrame(animateRow1);
    animationRef2.current = requestAnimationFrame(animateRow2);

    return () => {
      if (animationRef1.current) {
        cancelAnimationFrame(animationRef1.current);
      }
      if (animationRef2.current) {
        cancelAnimationFrame(animationRef2.current);
      }
    };
  }, []);

  const StarRating = () => (
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-4 h-4 text-black"
        >
          <path 
            fillRule="evenodd" 
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
            clipRule="evenodd" 
          />
        </svg>
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <motion.div 
      className="w-full max-w-[360px] bg-white p-6 rounded-xl shadow-sm flex flex-col"
      whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.2 }}
    >
      <StarRating />
      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow break-words" style={{
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minHeight: '5rem'
      }}>{testimonial.text}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
          {testimonial.image ? (
            <img src={testimonial.image} alt={testimonial.author} className="w-full h-full rounded-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-base truncate">{testimonial.author}</span>
          <span className="text-xs text-gray-500 truncate">{testimonial.handle}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl leading-tight font-light mb-4 text-center">
            What our happy clients say about our services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Hear from our happy clients about their experience working with us and the quality of our services.
          </p>
        </div>

        {/* Desktop view - Scrolling rows */}
        <div className="hidden lg:block">
        {/* First row - scrolls left to right */}
        <div className="mb-12 overflow-hidden">
          <div 
            ref={row1Ref}
              className="flex gap-6 overflow-x-auto scrollbar-hide will-change-scroll"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                willChange: 'scroll position',
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
          >
            {extendedTestimonialsRow1.map((testimonial, index) => (
                <div key={`row1-${testimonial.id}-${index}`} className="flex-shrink-0 will-change-transform">
                  <TestimonialCard testimonial={testimonial} />
                </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolls right to left */}
        <div className="overflow-hidden">
          <div 
            ref={row2Ref}
              className="flex gap-6 overflow-x-auto scrollbar-hide will-change-scroll"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                willChange: 'scroll position',
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
          >
            {extendedTestimonialsRow2.map((testimonial, index) => (
                <div key={`row2-${testimonial.id}-${index}`} className="flex-shrink-0 will-change-transform">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet view - Grid layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
