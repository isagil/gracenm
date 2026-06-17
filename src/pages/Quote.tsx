import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, ArrowRight, ArrowLeft, CheckCircle2, 
  MapPin, Phone, Mail, Building2, User,
  FileText, Calendar, MessageSquare, ShieldCheck, AlertCircle
} from "lucide-react";
import { getSupabase } from "../lib/supabase";

type Step = 1 | 2 | 3;

const serviceOptions = [
  "Building Construction",
  "Architectural Design",
  "Engineering Consultancy",
  "Renovation & Remodeling",
  "Project Supervision",
  "Quantity Surveying",
  "Site Planning",
  "Interior/Exterior Finishing"
];

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export function Quote() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    location: "",
    budget: "",
    timeline: "",
    details: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    setSupabaseConfigured(!!sb);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep(prev => (prev + 1) as Step);
  const prevStep = () => setStep(prev => (prev - 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const sb = getSupabase();
    if (sb) {
      try {
        const { error } = await sb
          .from("quote_requests")
          .insert([formData]);

        if (error) {
          console.error("Supabase Bid Insertion Error:", error);
          const detail = error.message?.includes("schema cache") || error.message?.includes("does not exist")
            ? " Please execute the SQL schemas defined in 'supabase_schema.sql' in your Supabase SQL editor."
            : "";
          setErrorMessage(`Database rejected request: ${error.message}.${detail}`);
        } else {
          setSubmitted(true);
        }
      } catch (err: any) {
        console.error("Transmission error:", err);
        setErrorMessage(err?.message || "A secure connection could not be established with Supabase.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Offline / Local sandbox prototype simulator mode
      console.log("No Supabase credential configurations defined. Transitioning local demo simulation:", formData);
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1200);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-screen bg-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8 bg-stone-50 p-12 md:p-20 border border-stone-100 shadow-xl"
        >
          <div className="w-24 h-24 bg-gold-500/10 flex items-center justify-center mx-auto text-gold-500 mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-display font-bold uppercase text-stone-900 tracking-tighter">Proposal <span className="text-gold-gradient italic">Logged.</span></h2>
          <p className="text-stone-400 text-lg font-light leading-relaxed">
            Thank you, {formData.name.split(' ')[0]}. Your engineering brief has been received. Our consultancy team will review your requirements and provide a detailed feasibility analysis within 48 business hours.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => window.location.href = "/"}
              className="btn-gold !w-full"
            >
              Return To Headquarters
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-15 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: context */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="pre-title">Tendering Process</div>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
              Request Your <span className="text-gold-gradient italic">Brief.</span>
            </h1>
            <p className="max-w-md text-stone-400 text-xl font-light leading-relaxed">
              Initiate your project lifecycle with a high-precision cost estimation and site evaluation.
            </p>
          </div>

          <div className="space-y-8">
             <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-stone-50 border border-stone-200 flex items-center justify-center text-gold-500 group-hover:border-gold-500 transition-colors">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-stone-900 font-bold uppercase text-[10px] tracking-widest">Free Initial Consultation</h4>
                   <p className="text-stone-400 text-xs">Evaluate project feasibility with zero upfront costs.</p>
                </div>
             </div>
             <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-stone-50 border border-stone-200 flex items-center justify-center text-gold-500 group-hover:border-gold-500 transition-colors">
                  <FileText size={24} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-stone-900 font-bold uppercase text-[10px] tracking-widest">Detailed BOQ Preparation</h4>
                   <p className="text-stone-400 text-xs">Precise bill of quantities generated by certified quantity surveyors.</p>
                </div>
             </div>
             <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-stone-50 border border-stone-200 flex items-center justify-center text-gold-500 group-hover:border-gold-500 transition-colors">
                  <ShieldCheck size={24} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-stone-900 font-bold uppercase text-[10px] tracking-widest">Risk Analysis Included</h4>
                   <p className="text-stone-400 text-xs">Structural and financial risk assessment provided with every quote.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-stone-50 border border-stone-100 p-8 md:p-12 relative overflow-hidden shadow-sm">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-stone-200 text-stone-900">
             <motion.div 
               className="h-full bg-gold-gradient" 
               initial={{ width: "33.3%" }}
               animate={{ width: `${(step / 3) * 100}%` }}
             />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-gold-500 font-mono text-xs">01 / 03</span>
                    <h3 className="text-2xl font-display font-bold uppercase text-stone-900">Contact Identity</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="text" name="name" placeholder="Full Name *" required
                        value={formData.name} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="email" name="email" placeholder="Email Address *" required
                        value={formData.email} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="tel" name="phone" placeholder="Phone Number *" required
                        value={formData.phone} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="text" name="company" placeholder="Company (Optional)"
                        value={formData.company} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="btn-gold !w-full inline-flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-gold-500 font-mono text-xs">02 / 03</span>
                    <h3 className="text-2xl font-display font-bold uppercase text-stone-900">Project Scope</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <FileText className="absolute left-4 top-5 text-stone-300" size={18} />
                      <select 
                        name="service" required
                        value={formData.service} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none appearance-none transition-colors"
                      >
                        <option value="">Select Service Specialty *</option>
                        {serviceOptions.map(opt => <option key={opt} value={opt} className="bg-white">{opt}</option>)}
                      </select>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                      <input 
                        type="text" name="location" placeholder="Site Location / Region *" required
                        value={formData.location} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                        <input 
                          type="text" name="budget" placeholder="Budget Range"
                          value={formData.budget} onChange={handleChange}
                          className="w-full bg-white border border-stone-200 px-10 py-4 text-stone-900 text-sm focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                        <input 
                          type="text" name="timeline" placeholder="Target Start"
                          value={formData.timeline} onChange={handleChange}
                          className="w-full bg-white border border-stone-200 px-10 py-4 text-stone-900 text-sm focus:border-gold-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button" onClick={prevStep}
                      className="btn-outline !w-auto flex-1 flex items-center justify-center gap-3 text-stone-900"
                    >
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button 
                      type="button" onClick={nextStep}
                      disabled={!formData.service || !formData.location}
                      className="btn-gold !w-auto flex-[2] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-gold-500 font-mono text-xs">03 / 03</span>
                    <h3 className="text-2xl font-display font-bold uppercase text-stone-900">Project Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-stone-300" size={18} />
                      <textarea 
                        name="details" placeholder="Tell us more about your vision, specific requirements, or site constraints..." 
                        rows={6} required
                        value={formData.details} onChange={handleChange}
                        className="w-full bg-white border border-stone-200 px-12 py-4 text-stone-900 focus:border-gold-500 outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 font-semibold leading-relaxed">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <button 
                        type="button" onClick={prevStep}
                        disabled={isSubmitting}
                        className="btn-outline !w-auto flex-1 flex items-center justify-center gap-3 text-stone-900 disabled:opacity-50"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-gold !w-auto flex-[2] flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : <>Submit Proposal <Send size={18} /></>}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-black text-stone-400 px-1 pt-1">
                      <span>Transmission protocol:</span>
                      {supabaseConfigured ? (
                        <span className="text-emerald-600 flex items-center gap-1 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Supabase Synced
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Sandbox Environment
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
