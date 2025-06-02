import { motion } from 'framer-motion';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';

const TermsOfService = () => {
  const lastUpdated = "January 15, 2025";

  const termsStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Uplinq Digital",
    "description": "Terms of Service for Uplinq Digital web development and automation services",
    "url": "https://uplinq.digital/terms-of-service",
    "publisher": {
      "@type": "Organization",
      "name": "Uplinq Digital",
      "url": "https://uplinq.digital"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Terms of Service | Uplinq Digital"
        description="Terms of Service for Uplinq Digital. Learn about our service terms, conditions, and legal agreements for web development and automation services."
        keywords="terms of service, conditions, web development terms, Uplinq Digital, service agreement"
        canonicalUrl="https://uplinq.digital/terms-of-service"
        structuredData={termsStructuredData}
        noIndex={false}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-600 text-lg">
                Legal terms and conditions for our services
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {lastUpdated}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to Uplinq Digital. These Terms of Service ("Terms") govern your use of our website 
                    <a href="https://uplinq.digital" className="text-blue-600 hover:text-blue-700"> uplinq.digital</a> and 
                    services provided by Uplinq Digital ("we," "our," or "us").
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    By accessing our website or using our services, you agree to be bound by these Terms. If you 
                    disagree with any part of these terms, you may not access our services.
                  </p>
                </div>

                {/* Acceptance of Terms */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by 
                    these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between 
                    you and Uplinq Digital.
                  </p>
                </div>

                {/* Our Services */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Services</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Uplinq Digital provides the following services:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Web development and design services</li>
                    <li>Search Engine Optimization (SEO)</li>
                    <li>Conversion Rate Optimization (CRO)</li>
                    <li>Virtual chat assistant development</li>
                    <li>Website maintenance and monitoring</li>
                    <li>Digital automation solutions</li>
                    <li>Consulting and strategy services</li>
                  </ul>
                </div>

                {/* Service Packages */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Packages</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Uplinq LaunchPad</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    One-time web development package including 5 responsive pages, contact forms, 
                    mobile optimization, and 7-day delivery with 1 month of bug fixes included.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">VitaFlow Growth Engine</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Comprehensive optimization package including CRO audit, copywriting, 
                    performance optimization, analytics setup, and consultation.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Uplinq Orbit Retainer</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Monthly retainer service including ongoing optimization, 24/7 monitoring, 
                    feature development, A/B testing, and growth reporting.
                  </p>
                </div>

                {/* Payment Terms */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>All prices are quoted in British Pounds (GBP) inclusive of applicable taxes</li>
                    <li>Payment is processed securely through Stripe</li>
                    <li>One-time services require full payment before project commencement</li>
                    <li>Retainer services are billed monthly in advance</li>
                    <li>Failed payments may result in service suspension</li>
                    <li>Refunds are subject to our refund policy outlined below</li>
                  </ul>
                </div>

                {/* Refund Policy */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Policy</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">14-Day Money-Back Guarantee</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We offer a 14-day money-back guarantee for our VitaFlow Orbit Retainer service. 
                    If you're not satisfied within the first 14 days, we'll provide a full refund.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">One-Time Services</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For one-time services (LaunchPad and Growth Engine), refunds are considered on a 
                    case-by-case basis if the service has not commenced or if we fail to deliver as promised.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Digital Products</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Digital products (such as UplinqPro toolkit) come with a 30-day refund policy 
                    from the date of purchase.
                  </p>
                </div>

                {/* Client Responsibilities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Client Responsibilities</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">As our client, you agree to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Provide accurate and complete information necessary for service delivery</li>
                    <li>Respond to requests for feedback and approvals in a timely manner</li>
                    <li>Provide necessary access to websites, hosting, and third-party services</li>
                    <li>Ensure you have the right to use any materials provided to us</li>
                    <li>Maintain current backups of your website and data</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>

                {/* Intellectual Property */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Client Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You retain all rights to content, materials, and information you provide to us. 
                    You grant us a license to use this content solely for the purpose of providing our services.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Our Work Product</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Upon full payment, you receive ownership of custom code and designs created specifically 
                    for your project. We retain rights to our proprietary methodologies, frameworks, and general knowledge.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Third-Party Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Some projects may include third-party software, plugins, or services with their own licensing terms. 
                    You are responsible for compliance with these terms.
                  </p>
                </div>

                {/* Service Limitations */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Limitations</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>We do not guarantee specific search engine rankings or traffic volumes</li>
                    <li>Website performance depends on hosting, third-party services, and other factors beyond our control</li>
                    <li>We are not responsible for data loss due to client actions or third-party service failures</li>
                    <li>Service delivery times are estimates and may vary based on project complexity</li>
                    <li>We reserve the right to refuse service for illegal or unethical businesses</li>
                  </ul>
                </div>

                {/* Liability and Warranties */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Liability and Warranties</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Service Warranty</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We warrant that our services will be performed with reasonable skill and care in accordance 
                    with industry standards. Any defects will be corrected at no additional charge.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our liability for any claim arising from our services is limited to the amount paid for 
                    the specific service that gave rise to the claim. We are not liable for indirect, 
                    consequential, or special damages.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Indemnification</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You agree to indemnify us against any claims arising from your use of our services, 
                    violation of these terms, or infringement of third-party rights.
                  </p>
                </div>

                {/* Termination */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">By Client</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You may terminate retainer services at any time with 30 days' written notice. 
                    No refund will be provided for the current billing period.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">By Uplinq Digital</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may terminate services immediately for breach of these terms, non-payment, 
                    or if we determine that continuing service would be harmful to our business or other clients.
                  </p>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Effect of Termination</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Upon termination, we will provide you with final deliverables and transfer ownership 
                    of completed work (subject to full payment). We are not obligated to continue hosting 
                    or maintaining terminated services.
                  </p>
                </div>

                {/* Confidentiality */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Confidentiality</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We agree to keep all client information confidential and will not disclose it to third parties 
                    without your consent, except as required by law or as necessary to provide our services. 
                    This obligation survives termination of our agreement.
                  </p>
                </div>

                {/* Force Majeure */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Force Majeure</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We are not liable for delays or failures in performance due to circumstances beyond our 
                    reasonable control, including natural disasters, government actions, internet outages, 
                    or third-party service failures.
                  </p>
                </div>

                {/* Governing Law */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms are governed by the laws of England and Wales. Any disputes will be subject 
                    to the exclusive jurisdiction of the English courts. We will attempt to resolve disputes 
                    through good faith negotiation before pursuing legal action.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to These Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update these Terms from time to time. We will notify existing clients of material 
                    changes via email or through our website. Continued use of our services after changes 
                    constitutes acceptance of the new terms.
                  </p>
                </div>

                {/* Severability */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If any provision of these Terms is found to be unenforceable, the remaining provisions 
                    will remain in full force and effect. We will replace any unenforceable provision with 
                    a similar enforceable provision.
                  </p>
                </div>

                {/* Entire Agreement */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Entire Agreement</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms, together with our Privacy Policy and any service-specific agreements, 
                    constitute the entire agreement between you and Uplinq Digital regarding our services.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-2"><strong>Uplinq Digital</strong></p>
                    <p className="text-gray-700 mb-2">Email: <a href="mailto:wayne@uplinq.digital" className="text-blue-600 hover:text-blue-700">wayne@uplinq.digital</a></p>
                    <p className="text-gray-700 mb-2">General Inquiries: <a href="mailto:wayne@uplinq.digital" className="text-blue-600 hover:text-blue-700">wayne@uplinq.digital</a></p>
                    <p className="text-gray-700">Website: <a href="https://uplinq.digital" className="text-blue-600 hover:text-blue-700">uplinq.digital</a></p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService; 