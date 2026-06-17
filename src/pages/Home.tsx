import { motion } from "motion/react";
import { 
  ArrowRight, Building2, HardHat, Ruler, 
  ShieldCheck, Zap, Users, Award, 
  Play, CheckCircle2, Factory, Construction,
  Quote, Shield, Rocket, Microscope, ArrowUpRight,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { useCustomizer } from "../context/CustomizerContext";

const stats = [
  { label: "Projects Delivered", value: "100+", icon: Building2 },
  { label: "Years of Excellence", value: "10+", icon: Award },
  { label: "Satisfied Clients", value: "50+", icon: Users },
  { label: "Client Support", value: "24/7", icon: ShieldCheck },
];

export function Home() {
  const { config } = useCustomizer();
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 border-b border-stone-100">
        <div className="blueprint-bg absolute inset-0 z-0 opacity-20" />
        <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(155,135,45,0.08)_0%,transparent_70%)] z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-15 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="pre-title">Engineering Tomorrow</div>
            
            <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900 whitespace-pre-line">
               {config.heroTitle}
             </h1>

            <p className="max-w-xl text-lg md:text-xl text-stone-400 font-light leading-relaxed">
              {config.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link to="/quote" className="btn-gold group flex items-center gap-3">
                {config.heroCtaPrimary} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-outline">
                {config.heroCtaSecondary}
              </Link>
            </div>

            <div className="flex flex-wrap gap-10 pt-10 border-t border-stone-100">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-stone-400 uppercase tracking-[2px]">Reach Out</span>
                 <span className="text-[14px] text-stone-900 font-medium">{config.heroPhone1}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-stone-400 uppercase tracking-[2px]">Inquiries</span>
                 <span className="text-[14px] text-stone-900 font-medium">{config.heroPhone2}</span>
               </div>
            </div>
          </motion.div>

          <div className="relative h-full min-h-[500px] flex items-center justify-center lg:justify-end">
             <div className="absolute top-1/2 left-0 rotate-[-90deg] origin-left text-[10px] tracking-[5px] text-stone-900/5 uppercase whitespace-nowrap hidden xl:block">
              {config.heroEstSlogan}
            </div>

            {/* Architectural Hero Image Element */}
            <div className="absolute inset-0 z-0 opacity-20 lg:opacity-60 rounded-tr-[4rem] rounded-tl-none rounded-b-none overflow-hidden border border-stone-200 shadow-inner">
              <img 
                src={config.photos.homeHero} 
                alt="Grace NM Modern Corporate Construction Uganda" 
                className="w-full h-full object-cover filter contrast-110 brightness-95 saturate-75 hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-transparent" />
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="glass p-12 relative z-10 space-y-12 max-w-lg lg:ml-auto w-full group overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-md rounded-tr-3xl rounded-tl-none rounded-b-none border border-stone-100"
            >
              <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-gold-500/20 m-4 group-hover:m-2 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-gold-500/20 m-4 group-hover:m-2 transition-all duration-500" />
              
              <div className="text-[11px] uppercase tracking-[3px] text-gold-500 font-bold">Core Statistics</div>
              
              <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-item space-y-2">
                    <div className="text-5xl font-display font-bold text-stone-900 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400/60 uppercase tracking-[2px]">Exceeding industry standards</span>
                <Link to="/projects" className="text-gold-500 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-stone-900 transition-colors">
                  Portfolio <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-32 px-6 md:px-15 relative overflow-hidden bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="pre-title">Our Legacy</div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none text-stone-900">
              Dedicated to <span className="text-gold-gradient italic">High-Quality</span> Building Solutions.
            </h2>
            <div className="space-y-6 text-stone-400 text-lg md:text-xl font-light leading-relaxed">
              <p>
                Gracenm Consultants & Construction Company Ltd is a professional construction and consultancy company dedicated to delivering high-quality building solutions for residential, commercial, and industrial projects.
              </p>
              <p>
                We combine experience, innovation, and modern construction standards to provide durable, efficient, and cost-effective solutions tailored to our clients' needs.
              </p>
            </div>
            <Link to="/about" className="btn-outline inline-block">
              Read Our Full Story
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
             <div className="absolute -inset-10 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
             {[
               { icon: ShieldCheck, title: "Integrity", text: "Honesty in every brick we lay." },
               { icon: Award, title: "Quality", text: "Excellence as our base standard." },
               { icon: Lightbulb, title: "Innovation", text: "Futuristic building techniques." },
               { icon: Users, title: "Satisfaction", text: "Clients at the heart of our work." }
             ].map((value) => (
               <div key={value.title} className="friendly-card group !p-10">
                 <div className="w-12 h-12 border border-gold-500/10 flex items-center justify-center text-gold-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all">
                   <value.icon size={24} />
                 </div>
                 <div className="space-y-2">
                   <h4 className="text-xl font-display font-bold uppercase tracking-tight text-stone-900">{value.title}</h4>
                   <p className="text-stone-400 text-sm leading-relaxed">{value.text}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Project Spotlight */}
      <section className="py-24 md:py-40 px-6 md:px-15 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
             <div className="lg:w-7/12 relative group">
                <div className="relative aspect-[16/10] overflow-hidden shadow-2xl">
                   <img 
                      src={config.photos.homeAbout} 
                      alt="Featured Project" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/10 to-transparent opacity-60" />
                </div>
                
                <div className="absolute -bottom-10 -right-10 glass p-10 space-y-4 max-w-sm hidden md:block border border-stone-200 bg-white/80 backdrop-blur-xl shadow-2xl">
                   <div className="flex justify-between items-center">
                      <span className="text-gold-500 font-mono text-xs uppercase font-bold tracking-[3px]">In Progress</span>
                      <Construction className="text-gold-500" size={20} />
                   </div>
                   <h4 className="text-2xl font-display font-bold uppercase text-stone-900 leading-tight">Metropolitan Business Hub Phase II</h4>
                   <p className="text-stone-400 text-xs font-light leading-relaxed">
                      Deploying advanced structural engineering and automated site management systems in the heart of Kampala.
                   </p>
                </div>
             </div>

             <div className="lg:w-5/12 space-y-10">
                <div className="pre-title">Project Spotlight</div>
                <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                  Engineering <span className="text-gold-gradient italic">Benchmarks.</span>
                </h2>
                <p className="text-stone-400 text-xl font-light leading-relaxed">
                  Every project we undertake is a case study in precision. We don't just build structures; we establish the engineering standards of tomorrow.
                </p>
                
                <div className="space-y-6 pt-6">
                   {[
                     { label: "Site Progress", value: "85%" },
                     { label: "Safety Records", value: "100% Incident Free" },
                     { label: "Tech Integration", value: "Level 4 BIM" }
                   ].map(item => (
                     <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-black tracking-widest">
                           <span className="text-stone-400">{item.label}</span>
                           <span className="text-gold-500">{item.value}</span>
                        </div>
                        <div className="h-1 bg-stone-100 relative overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="absolute inset-0 bg-gold-gradient"
                           />
                        </div>
                     </div>
                   ))}
                </div>

                <Link to="/projects" className="btn-gold !w-full inline-flex items-center justify-center gap-3">
                  View Full Portfolio <ArrowRight size={18} />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Services Scroller Feature */}
      <section className="py-20 md:py-32 bg-white border-y border-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-15 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="pre-title">Core Services</div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none text-stone-900">
              Comprehensive <span className="text-gold-gradient italic">Expertise.</span>
            </h2>
          </div>
          <Link to="/services" className="btn-gold !px-6 !py-3">
            Explore All Services
          </Link>
        </div>

        <div className="flex gap-10 overflow-x-auto no-scrollbar pb-10 px-6 md:px-15">
          {[
            { id: "01", title: "Building Construction", img: "/src/assets/images/construction_site_hero_1779222656099.png" },
            { id: "02", title: "Architectural Design", img: "/src/assets/images/architectural_render_3d_1779222706847.png" },
            { id: "03", title: "Engineering Consultancy", img: "/src/assets/images/engineering_team_about_1779222690871.png" },
            { id: "04", title: "Quantity Surveying", img: "/src/assets/images/blueprint_draft_table_1779226245180.png" }
          ].map((s) => (
            <Link to="/services" key={s.id} className="min-w-[300px] md:min-w-[400px] group relative aspect-[16/10] overflow-hidden border border-stone-100 shadow-lg">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-stone-100 via-stone-100/10 to-transparent opacity-60" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end gap-2">
                <span className="text-gold-500 font-mono text-xs opacity-50">{s.id}</span>
                <h3 className="text-3xl font-display font-bold uppercase tracking-tight text-stone-900">{s.title}</h3>
                <ArrowUpRight className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10 right-10" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Quote / Founders Message */}
      <section className="py-24 md:py-40 px-6 md:px-15 text-center bg-charcoal">
        <div className="max-w-4xl mx-auto space-y-12">
          <Quote className="w-16 h-16 text-gold-500/10 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-display font-medium text-stone-900 leading-tight italic">
            "Our mission is to transform our clients' visions into reality by delivering high-quality, safe, innovative, and cost-effective construction solutions."
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[3px] text-stone-400 font-bold">The Gracenm Vision</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative px-6 md:px-15 border-t border-stone-100">
        <div className="max-w-7xl mx-auto bg-stone-50 border border-stone-100 p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase text-stone-900 tracking-tighter leading-none">Let's Build Your <span className="text-gold-gradient italic">Vision.</span></h2>
            <p className="max-w-xl mx-auto text-stone-400 text-lg md:text-xl font-light leading-relaxed">
              Ready to transform your architectural dreams into engineering reality? Start your premier construction journey with Gracenm Consultants & Construction Company Ltd today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/quote"
                className="btn-gold"
              >
                Request a Proposal
              </Link>
              <Link
                to="/contact"
                className="btn-outline"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
