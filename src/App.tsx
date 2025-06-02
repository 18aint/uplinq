import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Service";
import Footer from "./components/Footer"; 
import ProcessTimeline from "./components/ProcessTimeline";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import OurWork from "./components/OurWork";
import FAQ from "./components/FAQ";
import ChatCTA from "./components/ChatCTA";
import FloatingChatButton from "./components/FloatingChatButton";
import Contact from "./components/Contact";
import AvailabilityBar from "./components/AvailabilityBar";
import StickyCTA from "./components/StickyCTA";
import SEO from "./components/SEO";

function App() {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    // Add a slight delay to ensure scroll happens after render
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebDesignCompany",
    "name": "Uplinq Digital",
    "url": "https://uplinq.digital",
    "logo": "https://uplinq.digital/brand-logo.png",
    "description": "Digital UX built for scale. Expert web development, SEO optimization, conversion rate optimization, and automation services.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "wayne@uplinq.digital",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://linkedin.com/company/uplinq-digital",
      "https://twitter.com/uplinqdigital"
    ],
    "offers": [
      {
        "@type": "Service",
        "name": "SEO Optimization",
        "description": "Data-driven, search-optimized content strategies tailored to rank your brand higher across every industry."
      },
      {
        "@type": "Service", 
        "name": "Conversion Rate Optimization",
        "description": "Transform your app ideas into interactive prototypes with smooth animations and intuitive user flows."
      },
      {
        "@type": "Service",
        "name": "Virtual Chat Assistant", 
        "description": "Smart, always-on virtual assistant that responds in real-time, collects leads, and automates FAQs."
      },
      {
        "@type": "Service",
        "name": "Website Maintenance & Monitoring",
        "description": "Keep your site secure, lightning-fast, and always online with real-time performance tracking."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "ratingCount": "200"
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <SEO
        title="Uplinq — Digital UX Built for Scale | Web Development & Automation"
        description="Transform your business with our expert web development, SEO optimization, conversion rate optimization, and automation services. 200+ businesses scaled with 4.7/5 rating. Get your free quote today."
        keywords="web development UK, SEO optimization, conversion rate optimization, website maintenance, chat assistant, digital marketing automation, custom websites, responsive design, UK web agency, business growth"
        canonicalUrl="https://uplinq.digital"
        structuredData={homepageStructuredData}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 my-8">
          <AvailabilityBar contactId="contact-section" />
        </div>
        <Services />
        <ProcessTimeline />
        <WhyUs />
        <OurWork />
        <Testimonials />
        <FAQ />
        <ChatCTA />
        <div id="contact-section">
          <Contact />
        </div>
      </main>
      <Footer />
      <FloatingChatButton />
      <StickyCTA />
    </div>
  );
}

export default App;