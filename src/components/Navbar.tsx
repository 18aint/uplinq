import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#f9fbfd] ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <BoltIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-medium text-gray-900">Uplinq</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex font-light items-center space-x-8">
            <Link to="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/results" className="text-gray-600 hover:text-gray-900">
              Results
            </Link>
            <Link to="/process" className="text-gray-600 hover:text-gray-900">
              Process
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            to="/pricing"
            className="hidden font-light md:inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Get started
            <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/services"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            Pricing
          </Link>
          <Link
            to="/results"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            Results
          </Link>
          <Link
            to="/process"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            Process
          </Link>
          <Link
            to="/pricing"
            className="block px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Get started →
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
