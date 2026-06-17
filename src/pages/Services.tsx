import { motion } from "motion/react";
import { 
  Building2, Ruler, HardHat, RefreshCcw, 
  Search, ShieldCheck, Zap, ArrowRight,
  Target, Rocket, Microscope,
  Palette, Calculator, Map, CheckCircle2,
  Quote, Star, User, Building
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCustomizer } from "../context/CustomizerContext";

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

export function Services() {
  const { config } = useCustomizer();
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-stone-950 text-white overflow-hidden mb-20">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={config.photos.servicesTop} 
            alt="Construction Site Hero" 
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-125 brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div className="blueprint-bg absolute inset-0 opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-15 relative z-10 w-full space-y-6">
           <div className="pre-title text-gold-500 border-gold-500/30">Our Solutions</div>
           <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-white max-w-4xl">
             Precision <span className="text-gold-gradient italic">Engineering</span> For A Modern World.
           </h1>
           <p className="max-w-3xl text-stone-300 text-lg md:text-xl font-light leading-relaxed">
             From deep-earth foundations to the highest spires, Gracenm Consultants & Construction Company Ltd provides a full spectrum of construction and consultancy services defined by quality and technological leadership.
           </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
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
                    src={config.photos.servicesBottom} 
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

      {/* Client Voices / Testimonials (Moved from standalone page) */}
      <section className="py-32 px-6 md:px-15 border-t border-stone-100 bg-stone-50/50">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="space-y-6">
              <div className="pre-title">Client Voices</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Built On <span className="text-gold-gradient italic">Trust.</span>
              </h2>
            </div>
            <p className="text-stone-400 text-lg font-light leading-relaxed">
              Our greatest structural achievement isn't the concrete we pour, but the long-lasting relationships we build with our visionary partners in Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="friendly-card group relative overflow-hidden flex flex-col justify-between bg-white/80"
              >
                <Quote className="absolute top-10 right-10 text-stone-900/[0.03] w-24 h-24 pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex gap-1 text-gold-500">
                     {[...Array(t.stars)].map((_, i) => (
                       <Star key={i} size={14} fill="currentColor" />
                     ))}
                  </div>

                  <p className="text-stone-900 text-lg md:text-xl font-light leading-relaxed italic relative z-10">
                     "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-stone-100 relative z-10 mt-8">
                   <div className="w-12 h-12 bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
                      <User size={24} />
                   </div>
                   <div className="space-y-0.5">
                      <h4 className="text-sm font-display font-bold uppercase text-stone-900 tracking-tight">{t.name}</h4>
                      <div className="flex flex-col text-[8px] uppercase tracking-widest font-bold text-stone-400">
                         <span>{t.role}</span>
                         <span className="text-gold-500 flex items-center gap-1 mt-0.5">
                           <Building size={10} /> {t.company}
                         </span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-stone-50 border-y border-stone-100 px-6 md:px-15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="pre-title">The Advantage</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Why Clients <span className="text-gold-gradient italic">Trust Us</span>
              </h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed">
                At Gracenm Consultants & Construction Company Ltd, trust is the foundation of every project we undertake. Our clients choose us because we are committed to honesty, professionalism, and delivering results that exceed expectations.
              </p>
              
              <div className="space-y-6 pt-4">
                 {[
                   { title: "Honesty & Integrity", text: "We conduct business with transparency, fairness, and accountability, ensuring our clients are informed at every stage of the project." },
                   { title: "Punctuality & Reliability", text: "We respect our clients' time and investment by delivering projects on schedule and within agreed budgets." },
                   { title: "Effective Communication", text: "We maintain open and consistent communication, keeping clients updated and involved throughout the construction process." },
                   { title: "Quality Workmanship", text: "We take pride in delivering durable, luxurious, and high-quality structures built to the highest standards." },
                   { title: "Customer Satisfaction", text: "Our goal is to bring our clients' visions to life while providing a smooth, stress-free construction experience." }
                 ].map((point, i) => (
                    <motion.div 
                     key={point.title} 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="flex gap-4 border-b border-stone-100 pb-5"
                    >
                       <ShieldCheck size={20} className="text-gold-500 shrink-0 mt-1" />
                       <div className="space-y-2">
                          <h4 className="text-sm uppercase font-black tracking-widest text-stone-900">{point.title}</h4>
                          <p className="text-xs text-stone-400 font-light leading-relaxed">{point.text}</p>
                       </div>
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
