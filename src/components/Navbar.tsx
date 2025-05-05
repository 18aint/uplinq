import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/results', label: 'Results' },
  { to: '/process', label: 'Process' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const focusableEls = menuRef.current?.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!focusableEls) return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleTab);
    firstEl?.focus();
    return () => document.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  // Close on route change or escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#f9fbfd] ${isScrolled ? 'shadow-md' : ''}`} role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2" tabIndex={0}>
            <BoltIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-medium text-gray-900">Uplinq</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex font-light items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-gray-600 hover:text-gray-900 transition-colors" tabIndex={0}>
                {link.label}
              </Link>
            ))}
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
          <button
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden backdrop-blur-sm bg-black/30"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              ref={menuRef}
              className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-xl flex flex-col py-8 px-6 focus:outline-none"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end mb-6">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-4 mt-2" aria-label="Mobile Navigation">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    tabIndex={0}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/pricing"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors font-thin text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Get started
                  <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
                </Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
