import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from './ChatModal';

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Results", href: "/results" },
  { name: "Pricing", href: "/pricing" },
  { name: "Process", href: "/process" },
];

const serviceLinks = [
  { name: "SEO Optimization", href: "/services#seo" },
  { name: "Conversion Rate Optimization", href: "/services#cro" },
  { name: "Virtual Chat Assistant", href: "/services#chat-assistant" },
  { name: "Website Maintenance", href: "/services#maintenance" },
];

const Footer = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <footer className="w-full bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Branding Section */}
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo-uplinq.png" 
                alt="Uplinq Digital" 
                className="h-6 w-auto"
              />
              <span className="ml-2 text-xl font-medium text-gray-900">Uplinq Digital</span>
            </Link>
            <p className="text-gray-600 mb-6 mt-4">
              Digital UX built for scale. Expert web development, SEO optimization, and automation services.
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
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us - LinkedIn Only */}
          <div className="md:col-span-3">
            <h6 className="text-lg font-medium mb-4">Follow us</h6>
                  <a
              href="https://www.linkedin.com/company/uplinq-digital/"
                    target="_blank"
                    rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              LinkedIn
                  </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-900/10 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">© Uplinq Digital 2025. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Chat Modal */}
        <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
      </div>
    </footer>
  );
};

export default Footer;
