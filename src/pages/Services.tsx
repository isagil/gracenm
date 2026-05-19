import { motion } from "motion/react";
import { 
  Building2, Ruler, HardHat, RefreshCcw, 
  Search, ShieldCheck, Zap, ArrowRight,
  Target, Rocket, Microscope, ArrowUpRight,
  Palette, Calculator, Map, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const mainServices = [
  {
    id: "01",
    title: "Building Construction",
    description: "We handle residential, commercial, and industrial construction projects from foundation to completion with unmatched precision.",
    icon: Building2,
    features: ["Residential Estates", "Commercial Hubs", "Industrial Facilities", "Foundation Excellence"]
  },
  {
    id: "02",
    title: "Architectural Design",
    description: "Modern and creative architectural planning designed to meet client expectations and project standards.",
    icon: Ruler,
    features: ["Creative Planning", "3D Visualization", "Blueprint Drafting", "Structural Integration"]
  },
  {
    id: "03",
    title: "Engineering Consultancy",
    description: "Professional engineering advice and project management solutions for all construction phases.",
    icon: HardHat,
    features: ["Structural Analysis", "Geotechnical Surveys", "Feasibility Studies", "Project Risk Audit"]
  },
  {
    id: "04",
    title: "Renovation & Remodeling",
    icon: RefreshCcw,
    description: "Upgrading and transforming buildings with modern designs and improved functionality.",
    features: ["Interior Transformation", "Structural Reinforcement", "Facade Modernization", "Space Optimization"]
  },
  {
    id: "05",
    title: "Project Supervision",
    icon: Search,
    description: "Ensuring projects are completed on time, within budget, and according to quality standards.",
    features: ["Live Site Monitoring", "Budget Compliance", "Quality Audits", "Timeline Management"]
  },
  {
    id: "06",
    title: "Interior & Exterior Finishing",
    icon: Palette,
    description: "Professional finishing services including painting, tiling, ceiling works, and décor enhancements.",
    features: ["Precision Tiling", "Custom Ceiling Works", "Premium Painting", "Landscape Integration"]
  },
  {
    id: "07",
    title: "Quantity Surveying",
    icon: Calculator,
    description: "Cost estimation, budgeting, and financial planning for construction projects.",
    features: ["Bill of Quantities (BOQ)", "Cost Estimation", "Budget Optimization", "Financial Auditing"]
  },
  {
    id: "08",
    title: "Site Planning & Land Development",
    icon: Map,
    description: "Efficient land utilization and development planning services.",
    features: ["Land Surveys", "Utility Planning", "Zoning Compliance", "Master Planning"]
  }
];

export function Services() {
  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white">
      {/* Hero */}
      <section className="px-6 md:px-15 mb-16 md:mb-32 relative">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
           <div className="pre-title">Our Solutions</div>
          <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase max-w-4xl text-stone-900">
            Precision <span className="text-gold-gradient italic">Engineering</span> For A Modern World.
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-stone-400 font-light leading-relaxed">
            From deep-earth foundations to the highest spires, GRACE NM provides a full spectrum of construction and consultancy services defined by quality and technological leadership.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-15 mb-24 md:mb-40 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
           {mainServices.map((service, i) => (
             <motion.div
               key={service.title}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="friendly-card flex flex-col justify-between group"
             >
               <span className="absolute top-10 right-10 text-5xl md:text-6xl font-display font-bold text-stone-900/[0.03] group-hover:text-gold-500/10 transition-colors uppercase">
                 {service.id}
               </span>

               <div className="w-16 h-16 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all relative z-10 font-bold mb-10">
                 <service.icon size={32} />
               </div>
               
               <div className="space-y-6 relative z-10">
                 <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight leading-none text-stone-900">{service.title}</h2>
                 <p className="text-stone-400 text-lg font-light leading-relaxed">
                   {service.description}
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4 pt-10 border-t border-stone-100">
                    {service.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors">
                        <CheckCircle2 size={14} className="text-gold-500" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{f}</span>
                      </div>
                    ))}
                 </div>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-40 px-6 md:px-15 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-12">
              <div className="pre-title">The Engineering Lifecycle</div>
              <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Our Proven <span className="text-gold-gradient italic">Methodology.</span>
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed">
                We follow a systematic 4-phase delivery model that ensures every project meets structural integrity standards while strictly adhering to timelines and financial projections.
              </p>
              
              <div className="space-y-10">
                {[
                  { title: "Discovery & Analysis", text: "Feasibility studies, site assessments, and requirement gathering.", icon: Microscope },
                  { title: "Precision Design", text: "Architectural blueprints and 3D digital-twin simulation.", icon: Palette },
                  { title: "Controlled Execution", text: "On-site construction with real-time BIM monitoring.", icon: Rocket },
                  { title: "Deployment & Audit", text: "Facility handover followed by rigorous structural audits.", icon: Target }
                ].map((step, i) => (
                  <div key={step.title} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                       <div className="w-12 h-12 bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
                          <step.icon size={20} />
                       </div>
                       {i !== 3 && <div className="w-px h-full bg-stone-100 my-4" />}
                    </div>
                    <div className="space-y-2 pb-8">
                       <h4 className="text-xl font-display font-bold uppercase text-stone-900">{step.title}</h4>
                       <p className="text-stone-400 text-sm font-light">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="relative aspect-square md:aspect-auto md:h-[800px] overflow-hidden shadow-2xl">
                  <img 
                    src="/src/assets/images/architectural_render_3d_1779222706847.png" 
                    alt="Process Render" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 via-stone-900/10 to-transparent" />
               </div>
               
               <div className="absolute -bottom-10 -left-10 bg-gold-gradient p-12 text-white shadow-2xl space-y-4 max-w-xs hidden md:block">
                  <h5 className="text-2xl font-display font-bold uppercase">ISO 9001:2015</h5>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-80 leading-relaxed">Certified Engineering standards maintained across all project phases.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-stone-50 border-y border-stone-100 px-6 md:px-15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="pre-title">The Advantage</div>
              <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Why Clients <span className="text-gold-gradient italic">Trust</span> GRACE NM.
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed">
                Our reputation is built on a decade of unwavering commitment to excellence and a customer-focused approach that puts your vision first.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                 {[
                   "Experienced Professionals",
                   "High-Quality Workmanship",
                   "Timely Project Delivery",
                   "Transparent Pricing",
                   "Customer-Focused",
                   "Modern Techniques"
                 ].map((point, i) => (
                   <motion.div 
                    key={point} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 border-b border-stone-100 pb-4"
                   >
                      <ShieldCheck size={20} className="text-gold-500" />
                      <span className="text-[12px] uppercase tracking-widest font-bold text-stone-600">{point}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="friendly-card !p-12 relative overflow-hidden group border border-stone-200 bg-white/40 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[80px]" />
              <Zap className="absolute -bottom-10 -left-10 text-gold-500/5 w-64 h-64" />
              
              <div className="relative z-10 space-y-10 text-center">
                <h3 className="text-3xl font-display font-bold uppercase text-stone-900 tracking-tight">Need a Customized Engineering Assessment?</h3>
                <p className="text-stone-400 text-lg font-light leading-relaxed"> Our consultants are ready to evaluate your site and provide a high-precision project roadmap tailored to your budget.</p>
                <div className="pt-6">
                  <Link to="/quote" className="btn-gold !px-10 !py-5 flex items-center justify-center gap-3">
                    Start Your Discovery Phase <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
