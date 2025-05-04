import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import checkmarkAnimation from "../assets/checkmark.json"; // Use your own Lottie file
import ChatModal from "./ChatModal";
// Form steps enum
enum FormStep {
  Contact = 0,
  Project = 1,
  Complete = 2
}

const Contact = () => {
  const [source, setSource] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Form state management
  const [step, setStep] = useState<FormStep>(FormStep.Contact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  
  // Max character count for textarea
  const maxChars = 500;
  
  // References
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus on first field and handle source-based behavior
  useEffect(() => {
    if (step === FormStep.Contact && nameInputRef.current) {
      nameInputRef.current.focus();
    }

    // Get source from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sourceParam = urlParams.get('source');
    setSource(sourceParam);

    // Handle source-based behavior
    if (sourceParam) {
      switch (sourceParam) {
        case 'hero':
          setDetails("I'm interested in getting a free quote for my project.");
          break;
        case 'why-uplinq':
          setDetails("I'm interested in learning more about Uplinq's services.");
          break;
        case 'portfolio':
          setDetails("I've seen your portfolio and would like to discuss a similar project.");
          break;
        case 'footer':
          setDetails("I'm interested in starting a project with Uplinq.");
          break;
      }
    }
  }, [step]);

  // Handle file upload preview
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Cleanup function
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // AI suggestions for project details
  const generateAISuggestion = () => {
    // In a real app, this would call an API
    const suggestions = [
      "I need a responsive eCommerce website with payment integration and a custom product catalog.",
      "Looking for a mobile app with user authentication, push notifications, and offline support.",
      "We need a brand refresh including logo design, style guide, and website redesign.",
      "Our team needs a custom CRM solution to track customer interactions and automate follow-ups."
    ];
    
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setDetails(suggestion);
    
    // Auto-resize textarea
    if (detailsRef.current) {
      detailsRef.current.style.height = "auto";
      detailsRef.current.style.height = `${detailsRef.current.scrollHeight}px`;
    }
  };

  // Form validation
  const validateStep = (currentStep: FormStep): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === FormStep.Contact) {
      if (!name.trim()) newErrors.name = "Name is required";
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    
    if (currentStep === FormStep.Project) {
      if (!details.trim()) newErrors.details = "Project details are required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === FormStep.Contact) {
      if (validateStep(step)) {
        setStep(FormStep.Project);
      }
    } else if (step === FormStep.Project) {
      if (validateStep(step)) {
        console.log("Form submitted:", { name, email, details, file });
        setStep(FormStep.Complete);
      }
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    
    setFile(e.target.files[0]);
  };

  // Go back to previous step
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Restart form after completion
  const handleReset = () => {
    setName("");
    setEmail("");
    setDetails("");
    setFile(null);
    setPreview(null);
    setErrors({});
    setStep(FormStep.Contact);
    // Remove query parameters when resetting
    window.history.replaceState({}, '', '/contact');
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
    
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="bg-[#f9fbfd] flex flex-col">
      <main className="flex-1">
        <section className="w-full py-24 bg-white relative" id="contact-form">
          {/* Section Label */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Enquire Project</span>
            </div>
            <h2 className="text-[42px] leading-tight font-light text-gray-900">
              {source === 'hero' ? 'Get Your Free Quote' : 
               source === 'why-uplinq' ? 'Let\'s Start Working Together' :
               source === 'portfolio' ? 'Start Your Project' :
               source === 'footer' ? 'Get Started with Uplinq' :
               'Enquire about your project'}
            </h2>
            <p className="text-gray-600 text-base max-w-xl mt-4">
              {source === 'hero' ? 'Get a detailed quote for your project within 24 hours.' :
               source === 'why-uplinq' ? 'Join our growing list of satisfied clients.' :
               source === 'portfolio' ? 'Let\'s create something amazing together.' :
               source === 'footer' ? 'Take the first step towards your next project.' :
               'Tell us a bit about what you\'re building — we\'ll get back to you within 24 hours.'}
            </p>
          </div>

          {/* Form Wrapper */}
          <div className="max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
              {step !== FormStep.Complete ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">Step {step + 1} of 2</span>
                      <span className="text-xs font-medium text-blue-500">
                        {step === FormStep.Contact ? "Contact Details" : "Project Information"}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step === FormStep.Contact ? "50%" : "100%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Contact Information */}
                    <AnimatePresence mode="wait">
                      {step === FormStep.Contact && (
                        <motion.div
                          key="contact-info"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
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
                              Your Name
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

                          <div className="relative">
                            <input
                              ref={emailInputRef}
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
                              placeholder="Your Email"
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
                              Your Email
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
                        </motion.div>
                      )}

                      {/* Step 2: Project Details */}
                      {step === FormStep.Project && (
                        <motion.div
                          key="project-info"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="relative">
                            <textarea
                              ref={detailsRef}
                              id="details"
                              value={details}
                              onChange={handleTextareaChange}
                              onFocus={() => setFocused("details")}
                              onBlur={() => setFocused(null)}
                              rows={4}
                              maxLength={maxChars}
                              className={`peer w-full px-4 py-3 border rounded-lg bg-white text-sm transition-all duration-200 placeholder-transparent min-h-[120px] resize-y ${
                                errors.details
                                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                  : focused === "details" || details
                                  ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                  : "border-gray-200"
                              }`}
                              placeholder="Project Details"
                              aria-invalid={!!errors.details}
                              aria-describedby={errors.details ? "details-error" : "details-count"}
                            />
                            <label
                              htmlFor="details"
                              className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none ${
                                focused === "details" || details
                                  ? "top-1 text-xs text-blue-500"
                                  : "top-3 text-gray-500"
                              }`}
                            >
                              Project Details
                            </label>
                            <div
                              id="details-count"
                              className="flex justify-between text-xs text-gray-400 mt-1"
                            >
                              <span>
                                {errors.details ? (
                                  <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500"
                                  >
                                    {errors.details}
                                  </motion.span>
                                ) : (
                                  <span className="text-blue-500 cursor-pointer" onClick={generateAISuggestion}>
                                    ✨ Need inspiration? Click for AI suggestions
                                  </span>
                                )}
                              </span>
                              <span>{details.length}/{maxChars}</span>
                            </div>
                          </div>

                          {/* File Upload */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Attach Files (optional)
                            </label>
                            <div
                              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:bg-gray-100 ${
                                preview ? "border-blue-300" : "border-gray-300"
                              }`}
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                  setFile(e.dataTransfer.files[0]);
                                }
                              }}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,.pdf,.doc,.docx"
                              />

                              {preview ? (
                                <div className="space-y-2">
                                  {file?.type.startsWith("image/") ? (
                                    <div className="relative w-full h-32 overflow-hidden rounded-lg">
                                      <img
                                        src={preview}
                                        alt="File preview"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                                      <span className="text-sm text-gray-700">
                                        {file?.name}
                                      </span>
                                    </div>
                                  )}
                                  
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFile(null);
                                    }}
                                    className="text-xs text-red-500 hover:text-red-700"
                                  >
                                    Remove file
                                  </button>
                                </div>
                              ) : (
                                <div className="py-4">
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M24 8.3V30.5M12 18.5L24 8.3L36 18.5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 40.5V19L24 8.5L36 19V40.5H12Z"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mt-1 text-sm text-gray-600">
                                    Drag and drop file here, or click to select
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    PDF, Word, or image files up to 10MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form Navigation */}
                    <div className="flex justify-between mt-8">
                      {step === FormStep.Contact ? (
                        <div></div> // Empty div for spacing
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-2 rounded-lg text-gray-600 text-sm"
                        >
                          ← Back
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="group px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                      >
                        <span className="flex items-center">
                          {step === FormStep.Contact ? "Next Step" : "Send Enquiry"}
                          <svg
                            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
                    </div>
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
                    Thank you, {name}!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We've received your project enquiry and will be in touch within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                  >
                    <span>Submit Another Enquiry</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add Chat Modal */}
          <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
        </section>
      </main>
    </div>
  );
};

export default Contact;