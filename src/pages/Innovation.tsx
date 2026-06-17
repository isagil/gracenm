import { motion } from "motion/react";
import { 
  Cpu, Zap, Globe, Layers, 
  Dna, Database, Microscope, Rocket,
  CheckCircle2, Compass, Wind, Sun
} from "lucide-react";

const techStack = [
  {
    title: "BIM Integration",
    description: "Building Information Modeling (BIM) allows us to create digital twins of our projects, predicting structural behavior and clashes before a single brick is laid.",
    icon: Layers,
    color: "gold"
  },
  {
    title: "AI Structural Audits",
    description: "We use generative algorithms to optimize material usage and structural distribution, ensuring maximum safety with minimum environmental waste.",
    icon: Cpu,
    color: "gold"
  },
  {
    title: "Smart Monitoring",
    description: "IoT sensors on-site provide real-time updates on concrete curing, moisture levels, and structural stress during the construction phase.",
    icon: Database,
    color: "gold"
  },
  {
    title: "Drone Site Intelligence",
    description: "High-resolution LiDAR drones map terrain and track progress with millimetric precision, providing clients with ultra-accurate spatial reports.",
    icon: Compass,
    color: "gold"
  }
];

const sustainability = [
  { title: "Net Zero Ready", text: "Designing buildings that generate as much energy as they consume.", icon: Zap },
  { title: "Circular Materials", text: "Prioritizing recyclable and low-carbon-footprint building blocks.", icon: Globe },
  { title: "Biophilic Spaces", text: "Integrating natural ecosystems into urban architecture to improve well-being.", icon: Wind },
  { title: "Solar Harvesting", text: "Advanced multi-surface solar integration for maximum efficiency.", icon: Sun }
];

export function Innovation() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-stone-950 text-white overflow-hidden mb-20">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/architectural_render_3d_1779222706847.png" 
            alt="Architectural Render 3D" 
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-125 brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div className="blueprint-bg absolute inset-0 opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-15 relative z-10 w-full space-y-6">
           <div className="pre-title text-gold-500 border-gold-500/30">Digital Construction Frontier</div>
           <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-white max-w-4xl">
             Architecting <span className="text-gold-gradient italic">The Digital Twin.</span>
           </h1>
           <p className="max-w-3xl text-stone-300 text-lg md:text-xl font-light leading-relaxed">
             At Grace NM, we don't just build—we simulate. We utilize the world's most advanced engineering technologies to ensure your project is efficient, sustainable, and ready for future generations.
           </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* Tech Grid */}
      <section className="px-6 md:px-15 mb-40 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="friendly-card group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 text-stone-900/[0.03] font-display font-black text-6xl group-hover:text-gold-500/10 transition-colors uppercase">
                {tech.title.split(' ')[0]}
              </div>
              
              <div className="w-16 h-16 border border-stone-200 flex items-center justify-center relative z-10 group-hover:bg-gold-500 group-hover:text-white transition-all">
                <tech.icon size={32} className="text-gold-500 group-hover:text-white" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase leading-none tracking-tight text-stone-900">{tech.title}</h2>
                <p className="text-stone-400 text-lg font-light leading-relaxed font-light">
                  {tech.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 relative z-10">
                <div className="px-4 py-1 border border-stone-100 text-[9px] font-black uppercase tracking-widest text-gold-500 bg-stone-50">Live Simulation Ready</div>
                <div className="px-4 py-1 border border-stone-100 text-[9px] font-black uppercase tracking-widest text-stone-300 group-hover:text-stone-600 transition-colors">Advanced R&D</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Infrastructure Section */}
      <section className="py-20 px-6 md:px-15 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2 relative">
            <div className="aspect-square overflow-hidden shadow-2xl relative group">
              <img 
                src="/src/assets/images/construction_crane_skyline_1779226263430.png" 
                alt="Future Building" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gold-gradient opacity-10 mix-blend-overlay" />
            </div>
          </div>
          <div className="md:w-1/2 space-y-10">
            <div className="pre-title">Next-Gen Urbanism</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-stone-900 leading-none">
              Reshaping <span className="text-gold-gradient italic">Skyline Dynamics.</span>
            </h2>
            <p className="text-stone-400 text-xl font-light leading-relaxed">
              We leverage adaptive architecture and smart structural foundations to create buildings that don't just stand—they interact. By combining regional aesthetic heritage with futuristic material science, GRACE NM is defining the 21st-century architectural identity of East Africa.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <span className="text-3xl font-display font-medium text-stone-900">40%</span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Faster Project Execution</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-display font-medium text-stone-900">Zero</span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Structural Failure Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-32 border-y border-stone-100 relative overflow-hidden px-6 md:px-15 bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="pre-title">Sustainability First</div>
              <h2 className="text-4xl md:text-7xl font-display font-bold uppercase leading-[1.05] tracking-tighter text-stone-900">Building for the <span className="text-gold-gradient italic">Unborn Generations.</span></h2>
              <p className="text-stone-400 leading-relaxed text-xl font-light">
                We are committed to the United Nations Sustainable Development Goals. Our "Green Grace" initiative ensures that every project we undertake meets high standards for energy efficiency and environmental respect.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {sustainability.map((item, i) => (
                   <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-8 border border-stone-200 bg-white hover:border-gold-500/20 transition-all shadow-sm"
                   >
                     <div className="w-12 h-12 border border-gold-500/10 flex items-center justify-center shrink-0">
                        <item.icon size={20} className="text-gold-500" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="font-display font-bold uppercase text-xs tracking-wider text-stone-900">{item.title}</h4>
                        <p className="text-stone-400 text-[10px] leading-relaxed uppercase tracking-widest">{item.text}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           <div className="relative aspect-square overflow-hidden shadow-2xl">
              <div className="relative h-full w-full bg-charcoal overflow-hidden group">
                 <img 
                   src="/src/assets/images/safety_equipment_site_1779226278945.png" 
                   alt="R&D Lab" 
                   className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" 
                 />
                 <div className="absolute inset-0 p-12 md:p-20 overflow-hidden flex flex-col justify-center gap-12">
                   <Microscope size={120} className="text-gold-500 opacity-5 absolute -top-10 -right-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                   <div className="space-y-6 relative z-10">
                      <div className="w-16 h-16 border border-gold-500 flex items-center justify-center bg-white/10 backdrop-blur-md">
                         <Rocket size={32} className="text-gold-500" />
                      </div>
                      <h3 className="text-4xl font-display font-bold uppercase tracking-tight text-white">Projected <span className="text-gold-gradient">Impact</span></h3>
                      <div className="space-y-4">
                         {[
                           { label: "Carbon Savings", value: "30,000 Tons" },
                           { label: "Energy Efficiency", value: "45% Increase" },
                           { label: "Water Reclamation", value: "12M Liters/Year" }
                         ].map(stat => (
                           <div key={stat.label} className="p-5 border border-white/10 bg-white/5 backdrop-blur-md flex justify-between items-center transition-all hover:bg-white/10">
                              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{stat.label}</span>
                              <span className="font-display font-bold text-gold-500 tracking-wider">{stat.value}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <button className="btn-outline !w-full !border-white/20 !text-white !bg-transparent hover:!bg-white/10 relative z-10">Sustainability Paper</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* R&D Lab CTA */}
      <section className="py-32 px-6 md:px-15">
        <div className="max-w-7xl mx-auto bg-stone-50 border border-stone-100 p-12 md:p-24 text-center space-y-12 relative overflow-hidden group shadow-2xl">
           <div className="space-y-4 flex flex-col items-center">
             <div className="pre-title">GRACE LABS</div>
             <h2 className="text-4xl md:text-7xl font-display font-bold uppercase max-w-4xl leading-none tracking-tighter text-stone-900">Collaborate with our <span className="text-gold-gradient italic">R&D Team.</span></h2>
           </div>
           <p className="max-w-xl mx-auto text-stone-400 text-xl font-light leading-relaxed">Are you an investor or architect looking for specialized engineering research? Join us in the Grace Labs ecosystem.</p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
             <button className="btn-gold">Partnership Request</button>
             <button className="btn-outline text-stone-900">Digital Twin Hub</button>
           </div>
        </div>
      </section>
    </div>
  );
}
