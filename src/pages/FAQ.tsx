import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What services does GRACE NM provide?",
    answer: "We offer a full range of construction services, including building construction (residential, commercial, industrial), architectural design, engineering consultancy, quantity surveying, project supervision, renovation, and site planning."
  },
  {
    question: "Where is the company located?",
    answer: "Our main office is located in Kampala, Uganda. We serve clients across the entire Uganda region and neighboring areas."
  },
  {
    question: "How can I request a quote for a project?",
    answer: "You can request a quote by clicking the 'Request a Quote' button on our website, filling out our contact form, or calling us directly at +256 706 802 370 or +256 762 632 154."
  },
  {
    question: "Do you handle both large and small construction projects?",
    answer: "Yes, we handle everything from small-scale residential renovations to large-scale commercial and industrial developments with the same level of precision and quality."
  },
  {
    question: "Is GRACE NM a registered company?",
    answer: "Yes, we are a legally registered Public Limited Company (PLC) in Uganda, fully compliant with national engineering and construction regulations."
  },
  {
    question: "Can you help with architectural designs for my land?",
    answer: "Absolutely. Our expert architects can create modern, creative, and functional designs tailored to your land's specific requirements and your personal vision."
  },
  {
    question: "What is your project delivery timeline?",
    answer: "Timelines depend on the scope and complexity of the project. However, we are known for our 'Timely Project Delivery' and always provide a detailed project schedule during the planning phase."
  },
  {
    question: "How do you ensure the quality of construction?",
    answer: "We employ experienced professionals, use high-quality materials, and conduct rigorous project supervision and quality audits at every stage of construction."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-15 mb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
           <div className="pre-title justify-center text-stone-400">Knowledge Base</div>
           <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
             General <span className="text-gold-gradient italic">Inquiries.</span>
           </h1>
           <p className="text-stone-400 text-xl font-light leading-relaxed">
             Everything you need to know about partnering with GRACE NM for your next engineering milestone.
           </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="px-6 md:px-15 mb-40">
        <div className="max-w-4xl mx-auto space-y-4">
           {faqs.map((faq, i) => (
             <div 
              key={i} 
              className={`border transition-all duration-500 overflow-hidden ${
                openIndex === i ? "bg-stone-50 border-gold-500/30 shadow-xl shadow-gold-500/5 ring-1 ring-gold-500/10" : "bg-transparent border-stone-100/60"
              }`}
             >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-8 flex items-center justify-between text-left group"
                >
                   <span className={`text-xl md:text-2xl font-display font-bold uppercase tracking-tight transition-colors ${
                     openIndex === i ? "text-gold-500" : "text-stone-900 group-hover:text-gold-500"
                   }`}>
                     {faq.question}
                   </span>
                   <div className={`shrink-0 w-8 h-8 border flex items-center justify-center transition-all ${
                     openIndex === i ? "border-gold-500 text-gold-500 rotate-0" : "border-stone-200 text-stone-300 rotate-90"
                   }`}>
                      {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                   </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                       <div className="px-8 pb-10">
                          <div className="max-w-2xl">
                            <p className="text-stone-400 text-lg font-light leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="px-6 md:px-15">
         <div className="max-w-7xl mx-auto glass p-12 md:p-20 relative overflow-hidden border border-stone-100 bg-stone-50 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px]" />
            <MessageSquare className="absolute -bottom-10 -right-10 text-gold-500/5 w-64 h-64 -rotate-12" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-stone-900 leading-tight">Can't Find Your <span className="text-gold-gradient italic">Specific</span> Question?</h2>
                  <p className="text-stone-400 text-lg font-light max-w-md">
                    Our technical support team is available 24/7 to provide detailed engineering clarifications.
                  </p>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-6 lg:justify-end">
                  <Link to="/contact" className="btn-gold !px-10 inline-flex items-center justify-center gap-3 shadow-lg shadow-gold-500/10">
                    Contact Support <ArrowRight size={18} />
                  </Link>
                  <Link to="/quote" className="btn-outline !px-10 inline-flex items-center justify-center gap-3 text-stone-900">
                    Submit Project Brief
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
