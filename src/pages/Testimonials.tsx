import { motion } from "motion/react";
import { Quote, Star, User, Building } from "lucide-react";

const testimonials = [
  {
    name: "John Musisi",
    role: "Property Developer",
    text: "Grace NM delivered our residential complex well ahead of schedule without compromising on the high standards we expected. Their engineering precision is unmatched.",
    stars: 5,
    company: "Musisi Estates Ltd"
  },
  {
    name: "Sarah Akello",
    role: "Business Owner",
    text: "The architectural designs provided by their team were not only creative but also highly functional for our new office space. Truly a professional partner.",
    stars: 5,
    company: "Innovate Hub Uganda"
  },
  {
    name: "Eng. Robert Katende",
    role: "Lead Consultant",
    text: "As an engineer myself, I was impressed by their structural analysis and technical consultancy. They understand modern construction standards deeply.",
    stars: 5,
    company: "Katende Associates"
  },
  {
    name: "Martha Namono",
    role: "Homeowner",
    text: "Their finishing services transformed my old house into a modern home. The tiling and interior painting were perfect. Highly recommended!",
    stars: 5,
    company: "Private Residence"
  }
];

export function Testimonials() {
  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-15 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
           <div className="space-y-8">
              <div className="pre-title">Client Voices</div>
              <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
                Built on <span className="text-gold-gradient italic">Trust.</span>
              </h1>
           </div>
           <div className="space-y-6">
              <p className="text-stone-400 text-xl font-light leading-relaxed">
                Our greatest structural achievement isn't the concrete we pour, but the long-lasting relationships we build with our visionary clients.
              </p>
           </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-6 md:px-15 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
           {testimonials.map((t, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="friendly-card group relative overflow-hidden flex flex-col justify-between"
             >
                <Quote className="absolute top-10 right-10 text-stone-900/[0.03] w-32 h-32" />
                
                <div className="space-y-8">
                  <div className="flex gap-1 text-gold-500">
                     {[...Array(t.stars)].map((_, i) => (
                       <Star key={i} size={16} fill="currentColor" />
                     ))}
                  </div>

                  <p className="text-stone-900 text-xl md:text-2xl font-light leading-relaxed relative z-10 italic">
                     "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-stone-100 relative z-10 mt-10">
                   <div className="w-16 h-16 bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-sm">
                      <User size={32} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-xl font-display font-bold uppercase text-stone-900 tracking-tight">{t.name}</h4>
                      <div className="flex flex-col text-[10px] uppercase tracking-widest font-bold text-stone-400">
                         <span>{t.role}</span>
                         <span className="text-gold-500/80 flex items-center gap-2 mt-1">
                           <Building size={12} /> {t.company}
                         </span>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Branding / Stats horizontal scroll or simple row */}
      <section className="py-24 border-y border-stone-100 bg-stone-100/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12 opacity-60">
           <span className="text-2xl md:text-4xl font-display font-black uppercase tracking-tighter text-stone-400">Trust In Quality</span>
           <div className="w-px h-12 bg-stone-200 hidden md:block" />
           <span className="text-2xl md:text-4xl font-display font-black uppercase tracking-tighter text-gold-500/80 italic">Innovation First</span>
           <div className="w-px h-12 bg-stone-200 hidden md:block" />
           <span className="text-2xl md:text-4xl font-display font-black uppercase tracking-tighter text-stone-400">Precision Built</span>
           <div className="w-px h-12 bg-stone-200 hidden md:block" />
           <span className="text-2xl md:text-4xl font-display font-black uppercase tracking-tighter text-gold-500/80 italic">Future Ready</span>
        </div>
      </section>
    </div>
  );
}
