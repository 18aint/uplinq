import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import checkmarkAnimation from "../assets/checkmark.json";
import { Link } from "react-router-dom";
import Navbar from "../components/NavbarContact";
import Footer from "../components/FooterContact";
import FloatingChatButton from "../components/FloatingChatButton";

// Form states
enum FormState {
  Form,
  Complete
}

// Project types
const projectTypes = [
  "Website",
  "CRO (Conversion Rate Optimization)",
  "AI Tooling",
  "Maintenance"
];

// Budget ranges
const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+"
];

// Timeline options
const timelineOptions = [
  "ASAP",
  "1-2 weeks",
  "1 month",
  "2-3 months",
  "Flexible"
];

const Quote = () => {
  // Form state management
  const [formState, setFormState] = useState<FormState>(FormState.Form);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [goals, setGoals] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Max character count for textarea
  const maxChars = 500;
  
  // References
  const nameInputRef = useRef<HTMLInputElement>(null);
  const goalsRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus on first field
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoals(e.target.value);
    
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!projectType) newErrors.projectType = "Please select a project type";
    if (!budget) newErrors.budget = "Please select a budget range";
    if (!timeline) newErrors.timeline = "Please select a timeline";
    if (!goals.trim()) newErrors.goals = "Project goals are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Quote form submitted:", { 
        name, 
        company, 
        email, 
        website, 
        projectType, 
        budget, 
        timeline, 
        goals 
      });
      setFormState(FormState.Complete);
    }
  };

  // Reset form
  const handleReset = () => {
    setName("");
    setCompany("");
    setEmail("");
    setWebsite("");
    setProjectType("");
    setBudget("");
    setTimeline("");
    setGoals("");
    setErrors({});
    setFormState(FormState.Form);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      <Navbar />
      <section className="w-full py-24 bg-gradient-to-b from-[#f0f9ff] via-[#f9fbfd] to-white">
        {/* Section Label */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">Free Quote</span>
          </div>
          <h2 className="text-[42px] leading-tight font-light text-gray-900">
            Get Your Free Project Quote
          </h2>
          <p className="text-gray-600 text-base max-w-xl mt-4">
            Tell us about your project needs and goals. We'll send you a tailored proposal within 24 hours.
          </p>
        </div>

        {/* Form Wrapper */}
        <div className="max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {formState === FormState.Form ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "name" || name
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Your Name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "name" || name
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Your Name*
                      </label>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="name-error"
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Company */}
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onFocus={() => setFocused("company")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          focused === "company" || company
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Company Name"
                      />
                      <label
                        htmlFor="company"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "company" || company
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Company Name (optional)
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "email" || email
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Email Address"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "email" || email
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Email Address*
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
                    </div>

                    {/* Website */}
                    <div className="relative">
                      <input
                        type="text"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        onFocus={() => setFocused("website")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent ${
                          focused === "website" || website
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        placeholder="Website URL"
                      />
                      <label
                        htmlFor="website"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "website" || website
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Website URL (optional)
                      </label>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Project Type */}
                    <div className="relative">
                      <select
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        onFocus={() => setFocused("projectType")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                          errors.projectType
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "projectType" || projectType
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        aria-invalid={!!errors.projectType}
                      >
                        <option value="" disabled hidden></option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <label
                        htmlFor="projectType"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "projectType" || projectType
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Project Type*
                      </label>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.projectType && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.projectType}
                        </motion.p>
                      )}
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        onFocus={() => setFocused("budget")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                          errors.budget
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "budget" || budget
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        aria-invalid={!!errors.budget}
                      >
                        <option value="" disabled hidden></option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <label
                        htmlFor="budget"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "budget" || budget
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Budget Range*
                      </label>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.budget && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.budget}
                        </motion.p>
                      )}
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                      <select
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        onFocus={() => setFocused("timeline")}
                        onBlur={() => setFocused(null)}
                        className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 appearance-none ${
                          errors.timeline
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : focused === "timeline" || timeline
                            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            : "border-gray-200"
                        }`}
                        aria-invalid={!!errors.timeline}
                      >
                        <option value="" disabled hidden></option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <label
                        htmlFor="timeline"
                        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                          focused === "timeline" || timeline
                            ? "top-1 text-xs text-blue-500"
                            : "top-3 text-gray-500"
                        }`}
                      >
                        Timeline*
                      </label>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.timeline && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.timeline}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Project Goals */}
                  <div className="relative">
                    <textarea
                      ref={goalsRef}
                      id="goals"
                      value={goals}
                      onChange={handleTextareaChange}
                      onFocus={() => setFocused("goals")}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      maxLength={maxChars}
                      className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent min-h-[120px] resize-y ${
                        errors.goals
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : focused === "goals" || goals
                          ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          : "border-gray-200"
                      }`}
                      placeholder="Project Goals"
                      aria-invalid={!!errors.goals}
                      aria-describedby={errors.goals ? "goals-error" : "goals-count"}
                    />
                    <label
                      htmlFor="goals"
                      className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                        focused === "goals" || goals
                          ? "top-1 text-xs text-blue-500"
                          : "top-3 text-gray-500"
                      }`}
                    >
                      Project Goals and Requirements*
                    </label>
                    <div
                      id="goals-count"
                      className="flex justify-between text-xs text-gray-400 mt-1"
                    >
                      <span>
                        {errors.goals ? (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500"
                          >
                            {errors.goals}
                          </motion.span>
                        ) : (
                          <span>
                            Tell us what you're looking to achieve with this project
                          </span>
                        )}
                      </span>
                      <span>{goals.length}/{maxChars}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mt-4"
                  >
                    <span className="flex items-center justify-center">
                      Get Your Free Quote
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            ) : (
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
                  Quote Request Received!
                </h3>
                <p className="text-gray-600 mb-8">
                  Thanks, {name}! We'll review your project details and send you a personalized quote within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <span>Submit Another Request</span>
                  </motion.button>
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                    >
                      <span>Return to Homepage</span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accent Decoration */}
        <div className="absolute right-0 top-1/3 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-40 -z-10"></div>
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Quote; 