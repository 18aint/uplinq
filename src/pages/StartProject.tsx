import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useLocation } from "react-router-dom";
import checkmarkAnimation from "../assets/checkmark.json";
import Navbar from "../components/NavbarContact";
import Footer from "../components/FooterContact";
import FloatingChatButton from "../components/FloatingChatButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// Shared brand logos - same as in Hero component
const brandLogos = [
  "/logos/Warx.svg", // First logo 
  "/logos/fathom.png", // Second logo
  "/logos/logo3.svg", // Third logo
  "/logos/Hausbank.png", // Fourth logo
  "/logos/logo5.svg", // Fifth logo
];

// Logo Carousel Component
const LogoCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Container with max width and center alignment */}
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Logo Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={80}
          slidesPerView={5}
          loop={true}
          speed={12000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            reverseDirection: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 80
            },
          }}
          className="w-full"
        >
          {duplicatedLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-16">
              <div className="h-full w-full flex items-center justify-center px-4">
                <img
                  src={logo}
                  alt={`Partner logo ${index % brandLogos.length + 1}`}
                  className="h-8 w-auto object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                  style={{ opacity: 0.7 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// Form validation type
type FormErrors = {
  fullName?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

// Form step type
enum FormStep {
  Details = 0,
  Payment = 1,
  Complete = 2
}

// Project form data type
type ProjectFormData = {
  fullName: string;
  companyName: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  plan: string;
  price: string;
};

const StartProject = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.Details);
  
  // Form state
  const [formData, setFormData] = useState<ProjectFormData>({
    fullName: "",
    companyName: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    plan: "",
    price: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  
  // Text area character limit
  const maxChars = 500;
  
  // Refs
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  
  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const price = params.get('price');
    
    if (plan) {
      setFormData(prev => ({
        ...prev,
        plan,
        price: price || ""
      }));
      
      // Pre-select project type based on plan
      if (plan.includes('launchpad')) {
        setFormData(prev => ({ ...prev, projectType: 'Website Design' }));
      } else if (plan.includes('growth')) {
        setFormData(prev => ({ ...prev, projectType: 'Web App' }));
      } else if (plan.includes('orbit')) {
        setFormData(prev => ({ ...prev, projectType: 'Maintenance / Retainer' }));
      }
      
      // Pre-select budget based on price
      if (price) {
        let budgetRange = "";
        if (price.includes('950')) {
          budgetRange = "<$5k";
        } else if (price.includes('2,200')) {
          budgetRange = "$5k–$10k";
        } else if (price.includes('749')) {
          budgetRange = "$5k–$10k";
        } else if (price.includes('7,490')) {
          budgetRange = "$10k–$25k";
        }
        
        if (budgetRange) {
          setFormData(prev => ({ ...prev, budget: budgetRange }));
        }
      }
    }
  }, [location]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Auto-resize textarea
    if (name === "description" && descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || '';
      
      setFormData({
        ...formData,
        cardNumber: formatted
      });
    }
    
    // Format expiry date
    if (name === "expiry") {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setFormData({
        ...formData,
        expiry: formatted
      });
    }
  };
  
  // Form validation
  const validateForm = (step: FormStep): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === FormStep.Details) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      
      if (!formData.projectType) {
        newErrors.projectType = "Project type is required";
      }
      
      if (!formData.budget) {
        newErrors.budget = "Budget is required";
      }
      
      if (!formData.timeline) {
        newErrors.timeline = "Timeline is required";
      }
      
      if (!formData.description.trim()) {
        newErrors.description = "Project description is required";
      }
    } else if (step === FormStep.Payment) {
      if (!formData.cardName.trim()) {
        newErrors.cardName = "Name on card is required";
      }
      
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      
      if (!formData.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Use format MM/YY";
      }
      
      if (!formData.cvc.trim()) {
        newErrors.cvc = "CVC is required";
      } else if (!/^\d{3,4}$/.test(formData.cvc)) {
        newErrors.cvc = "CVC must be 3 or 4 digits";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === FormStep.Details) {
      if (validateForm(FormStep.Details)) {
        setCurrentStep(FormStep.Payment);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === FormStep.Payment) {
      if (validateForm(FormStep.Payment)) {
        // Simulate payment processing
        setIsPaymentProcessing(true);
        
        setTimeout(() => {
          setIsPaymentProcessing(false);
          setCurrentStep(FormStep.Complete);
          console.log("Form & payment submitted:", formData);
        }, 1500);
      }
    }
  };
  
  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      plan: "",
      price: ""
    });
    setErrors({});
    setCurrentStep(FormStep.Details);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 relative overflow-hidden" id="start-project-hero">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-70"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Start a Project</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[42px] leading-tight font-light text-gray-900 mb-4">
                {formData.plan ? `Start your ${formData.plan} project` : "Start a project with Uplinq"}
              </h1>
              <p className="text-gray-600 text-base max-w-xl">
                {currentStep === FormStep.Details ? 
                  "Tell us about your goals — we'll follow up within 24 hours." :
                  currentStep === FormStep.Payment ?
                  "Complete your payment to start the project." :
                  "Thank you for choosing Uplinq!"}
              </p>
            </div>
            
            {/* Form Progress */}
              <div className="max-w-md mx-auto mt-[-10px] mb-[-100px]">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500">Step {currentStep + 1} of {Object.keys(FormStep).length / 2}</span>
                <span className="text-xs font-medium text-blue-500">
                  {currentStep === FormStep.Details ? "Project Details" : 
                   currentStep === FormStep.Payment ? "Payment Information" : 
                   "Complete"}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: currentStep === FormStep.Details ? "33%" : 
                           currentStep === FormStep.Payment ? "66%" : 
                           "100%" 
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Form Section */}
        <section className="w-full py-12 bg-[#f9fbfd]">
          <div className="max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
              {currentStep === FormStep.Details && (
                <motion.div
                  key="details-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  {formData.plan && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h3 className="text-sm font-medium text-blue-800">Selected Plan: <span className="font-light">{formData.plan}</span></h3>
                      {formData.price && (
                        <p className="text-sm text-blue-600">Price: {formData.price}</p>
                      )}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form elements with staggered animation */}
                    {[
                      // Full Name
                      <div key="fullName" className="relative">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("fullName")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                            errors.fullName
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : focused === "fullName" || formData.fullName
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="Full Name"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        />
                        <label
                          htmlFor="fullName"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "fullName" || formData.fullName
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Full Name
                        </label>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            id="fullName-error"
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.fullName}
                          </motion.p>
                        )}
                      </div>,
                      
                      // Company Name
                      <div key="companyName" className="relative">
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("companyName")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                            focused === "companyName" || formData.companyName
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="Company Name (Optional)"
                        />
                        <label
                          htmlFor="companyName"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "companyName" || formData.companyName
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Company Name (Optional)
                        </label>
                      </div>,
                      
                      // Email
                      <div key="email" className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                            errors.email
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : focused === "email" || formData.email
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="Work Email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        <label
                          htmlFor="email"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "email" || formData.email
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Work Email
                        </label>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            id="email-error"
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>,
                      
                      // Project Type
                      <div key="projectType" className="relative">
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("projectType")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                            errors.projectType
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-gray-500"
                              : focused === "projectType" || formData.projectType
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200 text-gray-500"
                          }`}
                          aria-invalid={!!errors.projectType}
                          aria-describedby={errors.projectType ? "projectType-error" : undefined}
                        >
                          <option value="" disabled>
                            Select Project Type
                          </option>
                          <option value="Website Design">Website Design</option>
                          <option value="Web App">Web App</option>
                          <option value="eCommerce">eCommerce</option>
                          <option value="Branding">Branding</option>
                          <option value="Maintenance / Retainer">Maintenance / Retainer</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                        <label
                          htmlFor="projectType"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "projectType" || formData.projectType
                              ? "top-1 text-xs mt-[-20px] text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Project Type
                        </label>
                        
                        {/* Dropdown Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        
                        {errors.projectType && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            id="projectType-error"
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.projectType}
                          </motion.p>
                        )}
                      </div>,
                      
                      // Budget
                      <div key="budget" className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("budget")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                            errors.budget
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-gray-500"
                              : focused === "budget" || formData.budget
                              ? "border-blue-300 mt-[20px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200 text-gray-500"
                          }`}
                          aria-invalid={!!errors.budget}
                          aria-describedby={errors.budget ? "budget-error" : undefined}
                        >
                          <option value="" disabled>
                            Select Budget Range
                          </option>
                          <option value="<$5k">&lt;$5k</option>
                          <option value="$5k–$10k">$5k–$10k</option>
                          <option value="$10k–$25k">$10k–$25k</option>
                          <option value="$25k+">$25k+</option>
                        </select>
                        <label
                          htmlFor="budget"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "budget" || formData.budget
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Budget
                        </label>
                        
                        {/* Dropdown Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        
                        {errors.budget && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            id="budget-error"
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.budget}
                          </motion.p>
                        )}
                      </div>,
                      
                      // Timeline
                      <div key="timeline" className="relative">
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("timeline")}
                          onBlur={() => setFocused(null)}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                            errors.timeline
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-gray-500"
                              : focused === "timeline" || formData.timeline
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200 text-gray-500"
                          }`}
                          aria-invalid={!!errors.timeline}
                          aria-describedby={errors.timeline ? "timeline-error" : undefined}
                        >
                          <option value="" disabled>
                            Select Timeline
                          </option>
                          <option value="ASAP">ASAP</option>
                          <option value="2–4 weeks">2–4 weeks</option>
                          <option value="1–2 months">1–2 months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                        <label
                          htmlFor="timeline"
                          className={`absolute left-4 text-sm ${
                            focused === "timeline" || formData.timeline
                              ? "top-1 text-xs mt-[-20px] text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          
                          
                        </label>
                        
                        {/* Dropdown Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        
                        {errors.timeline && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            id="timeline-error"
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.timeline}
                          </motion.p>
                        )}
                      </div>,
                      
                      // Description
                      <div key="description" className="relative">
                        <textarea
                          ref={descriptionRef}
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("description")}
                          onBlur={() => setFocused(null)}
                          rows={4}
                          maxLength={maxChars}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent min-h-[120px] resize-y ${
                            errors.description
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : focused === "description" || formData.description
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="Project Goals / Description"
                          aria-invalid={!!errors.description}
                          aria-describedby={errors.description ? "description-error" : "description-count"}
                        />
                        <label
                          htmlFor="description"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "description" || formData.description
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Project Goals / Description
                        </label>
                        <div
                          id="description-count"
                          className="flex justify-between text-xs text-gray-400 mt-1"
                        >
                          {errors.description ? (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500"
                            >
                              {errors.description}
                            </motion.span>
                          ) : (
                            <span></span>
                          )}
                          <span>{formData.description.length}/{maxChars}</span>
                        </div>
                      </div>,
                      
                      // Submit Button
                      <motion.button
                        key="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mt-8"
                      >
                        Submit Project Brief
                      </motion.button>
                    ].map((element, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.3
                        }}
                      >
                        {element}
                      </motion.div>
                    ))}
                  </form>
                </motion.div>
              )}
              
              {currentStep === FormStep.Payment && (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-light text-gray-900 mb-1">Payment Information</h2>
                    <p className="text-sm text-gray-500">
                      Please enter your payment details to complete your project booking.
                    </p>
                  </div>
                  
                  {formData.plan && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">Plan: <span className="font-light">{formData.plan}</span></h3>
                          <p className="text-xs text-gray-500 mt-1">Your selected service package</p>
                        </div>
                        <div className="text-lg font-light text-gray-900">{formData.price}</div>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Credit Card Details */}
                    <div className="relative">
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("cardName")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          errors.cardName
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "cardName" || formData.cardName
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Name on Card"
                        aria-invalid={!!errors.cardName}
                      />
                      <label
                        htmlFor="cardName"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "cardName" || formData.cardName
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Name on Card
                      </label>
                      {errors.cardName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.cardName}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("cardNumber")}
                        onBlur={() => setFocused(null)}
                        maxLength={19} // 16 digits + 3 spaces
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          errors.cardNumber
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "cardNumber" || formData.cardNumber
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Card Number"
                        aria-invalid={!!errors.cardNumber}
                      />
                      <label
                        htmlFor="cardNumber"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "cardNumber" || formData.cardNumber
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Card Number
                      </label>
                      {errors.cardNumber && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.cardNumber}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("expiry")}
                          onBlur={() => setFocused(null)}
                          maxLength={5} // MM/YY
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                            errors.expiry
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : focused === "expiry" || formData.expiry
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="MM/YY"
                          aria-invalid={!!errors.expiry}
                        />
                        <label
                          htmlFor="expiry"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "expiry" || formData.expiry
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          Expiry (MM/YY)
                        </label>
                        {errors.expiry && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.expiry}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("cvc")}
                          onBlur={() => setFocused(null)}
                          maxLength={4}
                          className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                            errors.cvc
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : focused === "cvc" || formData.cvc
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-gray-200"
                          }`}
                          placeholder="CVC"
                          aria-invalid={!!errors.cvc}
                        />
                        <label
                          htmlFor="cvc"
                          className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                            focused === "cvc" || formData.cvc
                              ? "top-1 text-xs text-blue-500"
                              : "top-3 text-gray-500"
                          }`}
                        >
                          CVC
                        </label>
                        {errors.cvc && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-xs text-red-500"
                          >
                            {errors.cvc}
                          </motion.p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      <p>Your payment information is secure. We use end-to-end encryption to protect your data.</p>
                    </div>
                    
                    {/* Form Navigation */}
                    <div className="flex justify-between mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-2 rounded-lg text-gray-600 text-sm"
                      >
                        ← Back
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isPaymentProcessing}
                        className="flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isPaymentProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>Complete Payment</>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {currentStep === FormStep.Complete && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6">
                    <Lottie
                      animationData={checkmarkAnimation}
                      loop={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Thank you, {formData.fullName}!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your payment has been processed successfully.
                  </p>
                  <p className="text-gray-600 mb-8">
                    We've received your project brief and will be in touch within 24 hours to get started.
                  </p>
                  <div className="p-4 mb-8 bg-gray-50 rounded-lg border border-gray-100 text-left">
                    <p className="text-sm text-gray-500 mb-2">Transaction Reference:</p>
                    <p className="text-sm text-gray-900 font-mono">UPL-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                  >
                    <span>Submit Another Project</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Trusted by innovative companies</h3>
            </div>
            
            {/* Animated Logo Carousel */}
            <div className="mb-12">
              <LogoCarousel />
            </div>
            
            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <img 
                    src="/avatars/avatar2.avif" 
                    alt="Sarah Johnson" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4 italic text-center md:text-left">
                    "Working with Uplinq was a game-changer for our business. They delivered a stunning website that's helped us increase conversions by 45%. Their process was smooth and they were responsive throughout."
                  </p>
                  <div className="text-center md:text-left">
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">CMO, TechStart Inc.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default StartProject; 