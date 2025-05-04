import { BoltIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ChatModal from './ChatModal';

const quickLinks = [
  { name: "About us", href: "/#about-us" },
  { name: "Services", href: "/#services" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Testimonial", href: "/#testimonial" },
];

const serviceLinks = [
  { name: "Content Creation", href: "/#content" },
  { name: "Development", href: "/#development" },
  { name: "Automation", href: "/#workflow" },
  { name: "LLM Development", href: "/#development" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Twitter", href: "https://x.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
];

const Footer = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <footer className="w-full bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Branding Section */}
          <div className="md:col-span-3">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8">
              <BoltIcon className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-2xl font-medium tracking-tight">Uplinq</span>
            </a>
            <p className="text-gray-600 mb-6">
              AI powered solutions for automation and growth
            </p>
            <button
              onClick={() => setShowChat(true)}
            className="hidden font-light md:inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Ask AI
            <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h6 className="text-lg font-medium mb-4">Quick links</h6>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h6 className="text-lg font-medium mb-4">Services</h6>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <h6 className="text-lg font-medium mb-4">Follow us</h6>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-900/10 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">@Uplinq 2025</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
          </div>
        </div>

        {/* Chat Modal */}
        <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
      </div>
    </footer>
  );
};

export default Footer;
