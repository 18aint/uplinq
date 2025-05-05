import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 30% of the page height
      const scrollThreshold = document.documentElement.scrollHeight * 0.3;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3">
            <Link
              to="/pricing"
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300 text-base"
            >
              Get started
              <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA; 