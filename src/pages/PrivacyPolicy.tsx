import { motion } from 'framer-motion';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2025";

  const privacyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Uplinq Digital",
    "description": "Privacy Policy for Uplinq Digital web development and automation services",
    "url": "https://uplinq.digital/privacy-policy",
    "publisher": {
      "@type": "Organization",
      "name": "Uplinq Digital",
      "url": "https://uplinq.digital"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Privacy Policy | Uplinq Digital"
        description="Privacy Policy for Uplinq Digital. Learn how we collect, use, and protect your personal information in compliance with UK GDPR regulations."
        keywords="privacy policy, data protection, GDPR, Uplinq Digital, personal information, cookies"
        canonicalUrl="https://uplinq.digital/privacy-policy"
        structuredData={privacyStructuredData}
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
                Privacy Policy
              </h1>
              <p className="text-gray-600 text-lg">
                How we collect, use, and protect your personal information
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
                    Uplinq Digital ("we," "our," or "us") is committed to protecting and respecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                    you visit our website <a href="https://uplinq.digital" className="text-blue-600 hover:text-blue-700">uplinq.digital</a> or 
                    use our services.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    This policy complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                  </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may collect the following personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Company name and job title</li>
                    <li>Project requirements and business information</li>
                    <li>Payment information (processed securely through Stripe)</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-900 mb-3">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                {/* How We Use Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Provide and improve our web development and automation services</li>
                    <li>Communicate with you about projects and services</li>
                    <li>Process payments and manage billing</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Analyze website usage and improve user experience</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect against fraud and security threats</li>
                  </ul>
                </div>

                {/* Legal Basis */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Basis for Processing</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Under UK GDPR, we process your personal data based on:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Contract:</strong> To provide services you've requested</li>
                    <li><strong>Legitimate interests:</strong> To improve our services and website</li>
                    <li><strong>Consent:</strong> For marketing communications</li>
                    <li><strong>Legal obligation:</strong> To comply with applicable laws</li>
                  </ul>
                </div>

                {/* Information Sharing */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Service Providers:</strong> Stripe for payment processing, Google Analytics for website analytics</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
                  </ul>
                </div>

                {/* Data Retention */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We retain your personal information only as long as necessary for the purposes outlined in this policy 
                    or as required by law. Typically, we retain client information for 7 years after the completion of services 
                    for business and legal purposes.
                  </p>
                </div>

                {/* Your Rights */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights Under UK GDPR</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Restriction:</strong> Limit how we process your data</li>
                    <li><strong>Portability:</strong> Transfer your data to another service</li>
                    <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                    <li><strong>Withdraw consent:</strong> For processing based on consent</li>
                  </ul>
                </div>

                {/* Cookies */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your browsing experience and analyze website traffic. 
                    You can control cookie settings through your browser preferences.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We use Google Analytics to understand how visitors interact with our website. This helps us improve 
                    our services and user experience.
                  </p>
                </div>

                {/* Security */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
                    is completely secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                {/* International Transfers */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Some of our service providers may be located outside the UK. We ensure appropriate safeguards are in 
                    place for any international transfers of personal data, including adequacy decisions or appropriate 
                    contractual clauses.
                  </p>
                </div>

                {/* Children's Privacy */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our services are not directed to individuals under 16 years of age. We do not knowingly collect 
                    personal information from children under 16.
                  </p>
                </div>

                {/* Changes to Policy */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                    posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-2"><strong>Uplinq Digital</strong></p>
                    <p className="text-gray-700 mb-2">Email: <a href="mailto:wayne@uplinq.digital" className="text-blue-600 hover:text-blue-700">wayne@uplinq.digital</a></p>
                    <p className="text-gray-700 mb-2">General Inquiries: <a href="mailto:wayne@uplinq.digital" className="text-blue-600 hover:text-blue-700">wayne@uplinq.digital</a></p>
                    <p className="text-gray-700">Website: <a href="https://uplinq.digital" className="text-blue-600 hover:text-blue-700">uplinq.digital</a></p>
                  </div>
                </div>

                {/* ICO Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complaints</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you believe we have processed your personal data unlawfully, you have the right to lodge a 
                    complaint with the Information Commissioner's Office (ICO):
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 mt-4">
                    <p className="text-gray-700 mb-2"><strong>Information Commissioner's Office</strong></p>
                    <p className="text-gray-700 mb-2">Website: <a href="https://ico.org.uk" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>
                    <p className="text-gray-700">Helpline: 0303 123 1113</p>
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

export default PrivacyPolicy; 