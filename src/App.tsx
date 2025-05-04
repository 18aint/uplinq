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

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 my-8">
          <AvailabilityBar />
        </div>
        <Services />
        <ProcessTimeline />
        <WhyUs />
        <OurWork />
        <Testimonials />
        <FAQ />
        <ChatCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}

export default App;