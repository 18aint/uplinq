import { useState } from 'react';
import Services from '../components/Service';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import FloatingChatButton from '../components/FloatingChatButton';
import AvailabilityBar from '../components/AvailabilityBar';

const servicesDetails = [
  {
    id: 1,
    title: "SEO Optimization",
    subheading: "Climb the search rankings and drive organic traffic",
    description: "Our SEO services combine technical expertise with content strategy to improve your search visibility and drive targeted traffic to your website.",
    benefits: [
      "Comprehensive website audit and keyword research",
      "On-page optimization and technical SEO improvements",
      "Content strategy and creation for search visibility",
      "Local SEO for businesses serving specific geographic areas",
      "Regular performance reporting and strategy adjustments"
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Conversion Rate Optimization",
    subheading: "Turn more visitors into customers",
    description: "We analyze user behavior and optimize your website to increase conversions, whether that's purchases, sign-ups, or any other key actions.",
    benefits: [
      "Data-driven analysis of user behavior and conversion funnels",
      "A/B testing to identify the most effective designs and content",
      "User experience improvements and friction point elimination",
      "Form optimization to increase completion rates",
      "Landing page optimization for higher conversion rates"
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Virtual Chat Assistant",
    subheading: "24/7 intelligent customer service",
    description: "Our AI-powered chat solutions provide instant responses to customer inquiries, capture leads, and enhance user engagement around the clock.",
    benefits: [
      "Custom-trained AI that reflects your brand voice and knowledge",
      "Seamless integration with your existing website and tools",
      "Lead capture and qualification automation",
      "Instant responses to FAQs, reducing support burden",
      "Analytics dashboard to track performance and conversations"
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Website Maintenance & Monitoring",
    subheading: "Keep your site secure, fast, and always online",
    description: "Our comprehensive maintenance services ensure your website remains secure, performs optimally, and stays up-to-date with the latest technologies.",
    benefits: [
      "24/7 uptime monitoring and instant alerts",
      "Regular security updates and vulnerability patching",
      "Performance optimization for fast loading speeds",
      "Regular backups and disaster recovery planning",
      "Content updates and technical support as needed"
    ],
    icon: (
      <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <main className="bg-[#F9FBFD] pt-16">
      <Navbar />
      {/* Services Component Integration */}
      <div className="mt-[200px]">
      <Services />
      </div>
      
      {/* Availability Bar - Floating Variant */}
      <div className="hidden md:block">
        <AvailabilityBar variant="floating" />
      </div>

      {/* Detailed Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 uppercase tracking-wide mb-2">Our expertise</p>
            <h2 className="text-4xl font-light text-gray-900 mb-4">Detailed Services Breakdown</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a deeper understanding of what each service includes and how it can benefit your business.
            </p>
          </div>

          <div className="space-y-8">
            {servicesDetails.map((service) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="rounded-full bg-blue-50 p-3">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.subheading}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transform transition-transform ${
                        expandedService === service.id ? 'rotate-180' : ''
                      }`}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {expandedService === service.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t pt-6">
                      <p className="text-gray-600 mb-4 max-w-3xl">{service.description}</p>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-4">Ready to elevate your digital presence?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business goals and drive meaningful results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </Link>
            <Link
              to="/start-project"
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium border border-blue-400 hover:bg-blue-600 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingChatButton />
    </main>
  );
} 