import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Mail, MapPin, 
  MessageSquare, Globe, Clock,
  ArrowRight, Send, CheckCircle2,
  Instagram, Twitter, Facebook, Linkedin
} from "lucide-react";

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-15 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
           <div className="space-y-8">
              <div className="pre-title">Get In Touch</div>
              <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
                Contact <span className="text-gold-gradient italic">Center.</span>
              </h1>
           </div>
           <div className="space-y-6">
              <p className="text-stone-400 text-xl font-light leading-relaxed">
                Connect with our engineering command center in Kampala. Whether it's a new development or a technical inquiry, we're ready to deploy.
              </p>
           </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 md:px-15 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
           {/* Details */}
           <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {[
                   { icon: Phone, title: "Voice Channels", values: ["+256 706 802 370", "+256 762 632 154"], href: "tel:" },
                   { icon: Mail, title: "Electronic Mail", values: ["gracenmcounsultantconstruction@gmail.com"], href: "mailto:" },
                   { icon: MapPin, title: "Regional HQ", values: ["Kampala, Uganda", "East Africa Operations Hub"] },
                   { icon: Clock, title: "Operational Hours", values: ["Monday – Saturday", "08:00 AM – 06:00 PM"] }
                 ].map((item) => (
                   <div key={item.title} className="space-y-6 group">
                     <div className="w-14 h-14 bg-stone-50 border border-stone-200 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-sm">
                        <item.icon size={24} />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-stone-400 font-bold uppercase text-[9px] tracking-widest italic">{item.title}</h4>
                        <div className="flex flex-col text-lg text-stone-900 font-display font-bold">
                           {item.values.map(v => item.href ? (
                             <a key={v} href={`${item.href}${v.replace(/\s+/g, '')}`} className="hover:text-gold-500 transition-colors">{v}</a>
                           ) : (
                             <span key={v}>{v}</span>
                           ))}
                        </div>
                     </div>
                   </div>
                 ))}
              </div>

              <div className="space-y-6">
                 <h4 className="text-stone-400 font-bold uppercase text-[10px] tracking-[4px]">Follow Our Progress</h4>
                 <div className="flex gap-4">
                    {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                      <a 
                        key={i} 
                        href="#" 
                        className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 hover:text-gold-500 hover:border-gold-500 transition-all shadow-sm"
                      >
                         <Icon size={20} />
                      </a>
                    ))}
                 </div>
              </div>

              <div className="relative aspect-video w-full rounded-[2.5rem] border border-stone-100 overflow-hidden group shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1541976590917-0d92f44601df?auto=format&fit=crop&q=80&w=1200" 
                    alt="Map Placeholder" 
                    className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-8 py-4 bg-white/80 backdrop-blur-md rounded-full border border-stone-200 text-gold-500 text-[10px] font-black uppercase tracking-widest shadow-xl">
                       View Interactive Engineering Terrain
                    </div>
                 </div>
              </div>
           </div>

           {/* Form */}
           <div className="friendly-card overflow-hidden h-fit">
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                  >
                    <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-display font-bold uppercase text-stone-900">Message Synced.</h3>
                       <p className="text-stone-400 max-w-xs mx-auto">Our engineering team has received your inquiry and will respond within 24 standard business hours.</p>
                    </div>
                    <button 
                      onClick={() => setIsSent(false)}
                      className="text-gold-500 font-bold uppercase text-[10px] tracking-widest hover:text-stone-900 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-2">
                       <h3 className="text-3xl font-display font-bold uppercase text-stone-900 tracking-tighter">Direct Transmission</h3>
                       <p className="text-stone-400 text-sm">Fill out the brief below for high-priority routing.</p>
                    </div>

                    <div className="space-y-4">
                       <input 
                         required
                         type="text" name="name" placeholder="YOUR FULL NAME"
                         value={formData.name} onChange={handleChange}
                         className="w-full bg-white border border-stone-100 rounded-2xl px-8 py-5 text-stone-900 placeholder:text-stone-300 focus:border-gold-500 outline-none transition-colors text-xs font-bold tracking-widest"
                       />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            required
                            type="email" name="email" placeholder="EMAIL ADDRESS"
                            value={formData.email} onChange={handleChange}
                            className="w-full bg-white border border-stone-100 rounded-2xl px-8 py-5 text-stone-900 placeholder:text-stone-300 focus:border-gold-500 outline-none transition-colors text-xs font-bold tracking-widest"
                          />
                          <input 
                            required
                            type="tel" name="phone" placeholder="PHONE NUMBER"
                            value={formData.phone} onChange={handleChange}
                            className="w-full bg-white border border-stone-100 rounded-2xl px-8 py-5 text-stone-900 placeholder:text-stone-300 focus:border-gold-500 outline-none transition-colors text-xs font-bold tracking-widest"
                          />
                       </div>
                       <input 
                         required
                         type="text" name="subject" placeholder="SUBJECT OF INQUIRY"
                         value={formData.subject} onChange={handleChange}
                         className="w-full bg-white border border-stone-100 rounded-2xl px-8 py-5 text-stone-900 placeholder:text-stone-300 focus:border-gold-500 outline-none transition-colors text-xs font-bold tracking-widest"
                       />
                       <textarea 
                         required
                         name="message" placeholder="YOUR PROJECT BRIEF OR MESSAGE..."
                         rows={5}
                         value={formData.message} onChange={handleChange}
                         className="w-full bg-white border border-stone-100 rounded-2xl px-8 py-5 text-stone-900 placeholder:text-stone-300 focus:border-gold-500 outline-none transition-colors text-xs font-bold tracking-widest resize-none"
                       />
                    </div>
                    
                    <button type="submit" className="btn-gold !w-full flex items-center justify-center gap-3">
                       Send Message <Send size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
           </div>
        </div>
      </section>

      {/* Floating WhatsApp Action */}
      <div className="fixed bottom-10 right-10 z-50">
         <a 
           href="https://wa.me/256706802370" 
           target="_blank" 
           rel="noreferrer"
           className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group"
         >
            <MessageSquare size={32} />
            <div className="absolute right-full mr-4 px-4 py-2 bg-white text-space-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
               Chat with Engineering
            </div>
         </a>
      </div>
    </div>
  );
}
