import { motion } from "motion/react";
import { 
  ShieldCheck, Award, Lightbulb, Users, 
  Target, Eye, Heart, CheckCircle2,
  Zap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const coreValues = [
  { icon: ShieldCheck, title: "Integrity", text: "Honesty and strong moral principles in every project." },
  { icon: Award, title: "Quality", text: "Delivering excellence through superior workmanship." },
  { icon: Users, title: "Professionalism", text: "Maintaining the highest standards of conduct." },
  { icon: Lightbulb, title: "Innovation", text: "Embracing futuristic construction techniques." },
  { icon: Zap, title: "Safety", text: "Zero-compromise approach to site security and health." },
  { icon: Heart, title: "Customer Satisfaction", text: "Tailored solutions that exceed expectations." }
];

export function About() {
  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="px-6 md:px-15 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div className="space-y-8">
            <div className="pre-title">Our Story</div>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
              Building <span className="text-gold-gradient italic">Value</span> From The Ground Up.
            </h1>
          </div>
          <div className="space-y-6">
            <p className="text-stone-400 text-xl font-light leading-relaxed">
              GRACE NM Consultant & Construction Company PLC is driven by a singular purpose: to transform the landscape of East Africa through engineering precision and architectural brilliance.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 md:px-15 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="friendly-card group overflow-hidden relative">
            <Eye className="absolute -top-10 -right-10 text-gold-500/5 w-64 h-64 rotate-12" />
            <div className="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
               <Target size={24} />
            </div>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight text-stone-900 relative z-10">Our Vision</h2>
            <p className="text-stone-400 text-xl font-light leading-relaxed relative z-10">
              To become one of the leading and most trusted construction and consultancy companies in East Africa.
            </p>
          </div>
          
          <div className="friendly-card group overflow-hidden relative">
            <Target className="absolute -top-10 -right-10 text-gold-500/5 w-64 h-64 -rotate-12" />
            <div className="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
               <Eye size={24} />
            </div>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight text-stone-900 relative z-10">Our Mission</h2>
            <p className="text-stone-400 text-xl font-light leading-relaxed relative z-10">
              To deliver quality construction and consultancy services through professionalism, integrity, innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="px-6 md:px-15 py-32 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="pre-title justify-center">The Grace Pillars</div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-stone-900">Our Core <span className="text-gold-gradient">Values.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6 group"
              >
                <div className="w-16 h-16 bg-white border border-stone-100 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-sm">
                  <value.icon size={32} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-display font-bold uppercase text-stone-900 tracking-tight">{value.title}</h4>
                  <p className="text-stone-400 font-light leading-relaxed">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="px-6 md:px-15 py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="space-y-8">
              <div className="pre-title">The Minds Behind The Steel</div>
              <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-tight">
                Engineering <span className="text-gold-gradient italic">Leadership.</span>
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-xl">
                Our leadership team brings together decades of global engineering expertise and local market knowledge, steering GRACE NM towards a future of sustainable development and technical excellence.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img 
                src="/src/assets/images/engineering_team_about_1779222690871.png" 
                alt="Leadership Team" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Alvin M.", role: "Managing Director", desc: "Visionary leader with 15+ years in civil engineering and strategic management." },
              { name: "Byaruhanga J.", role: "Technical Director", desc: "Structural expert specializing in high-rise stability and futuristic architectural forms." },
              { name: "Grace K.", role: "Chief Consultant", desc: "Authority on geotechnical surveys and environmental impact assessments." }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50 p-10 space-y-6 border border-stone-100 group hover:border-gold-500/30 transition-all shadow-sm"
              >
                <div className="w-16 h-16 bg-white border border-stone-100 flex items-center justify-center text-gold-500 shadow-sm mb-4">
                  <Users size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-bold uppercase text-stone-900">{member.name}</h4>
                  <p className="text-gold-500 text-[10px] uppercase font-black tracking-[2px]">{member.role}</p>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Highlight */}
      <section className="py-40 px-6 md:px-15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="relative aspect-square overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" 
                alt="Construction Site" 
                className="w-full h-full object-cover grayscale brightness-90"
              />
              <div className="absolute top-0 right-0 p-10">
                 <div className="bg-gold-gradient p-10 aspect-square flex flex-col justify-center items-center text-white shadow-2xl">
                    <span className="text-6xl font-display font-bold">10+</span>
                    <span className="text-[10px] uppercase font-black tracking-[2px] text-center">Years of Operational Excellence</span>
                 </div>
              </div>
           </div>
           
           <div className="space-y-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Experience, <span className="text-gold-gradient italic">Innovation,</span> and Modern Standards.
              </h2>
              <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed">
                We combine experience, innovation, and modern construction standards to provide durable, efficient, and cost-effective solutions tailored to our clients' needs. Our team ensures that every project meets high standards for quality and environmental respect.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   "Experienced Professionals",
                   "High-Quality Workmanship",
                   "Timely Project Delivery",
                   "Affordable Pricing",
                   "Modern Techniques",
                   "Safety Standards"
                 ].map(point => (
                   <div key={point} className="flex items-center gap-3 text-stone-600">
                      <CheckCircle2 size={20} className="text-gold-500 shrink-0" />
                      <span className="text-[11px] uppercase tracking-wider font-bold">{point}</span>
                   </div>
                 ))}
              </div>

              <Link to="/contact" className="btn-gold !w-full sm:!w-auto inline-flex items-center justify-center gap-3">
                Work With Us <ArrowRight size={16} />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
