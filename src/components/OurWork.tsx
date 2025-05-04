import Lottie from 'lottie-react';
import animationData from '../assets/Web-gallery-[remix].json';
import { Link } from 'react-router-dom';

const OurWork = () => {
  return (
    <section className="w-full py-24 relative">
      {/* Section Heading */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <span className="text-sm text-gray-600">Our Work</span>
        </div>
        <h2 className="text-4xl font-light text-gray-900">
          See how we turn ideas into results
        </h2>
      </div>

      <div className="w-[60%] max-w-4xl mx-auto">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      {/* Creative CTA */}
      <div className="mt-12 flex flex-col items-center">
        <h3 className="text-2xl font-thin text-gray-900 mb-2">
          Ready to create something remarkable?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md text-center">
          Let's collaborate to turn your next big idea into a digital experience that stands out.
        </p>
        <div className="flex justify-center mt-12">
          <Link
            to="/contact?source=our-work"
            className="hidden mt-[-50px] font-light md:inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            <span className="truncate">Start Your Project</span>
            <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurWork; 