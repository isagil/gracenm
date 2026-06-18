import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, Award, Lightbulb, Users, 
  Target, Eye, Heart, CheckCircle2,
  Zap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { getSupabase } from "../lib/supabase";
import { useCustomizer } from "../context/CustomizerContext";

const coreValues = [
  { icon: ShieldCheck, title: "Integrity", text: "Honesty and strong moral principles in every project." },
  { icon: Award, title: "Quality", text: "Delivering excellence through superior workmanship." },
  { icon: Users, title: "Professionalism", text: "Maintaining the highest standards of conduct." },
  { icon: Lightbulb, title: "Innovation", text: "Embracing futuristic construction techniques." },
  { icon: Zap, title: "Safety", text: "Zero-compromise approach to site security and health." },
  { icon: Heart, title: "Customer Satisfaction", text: "Tailored solutions that exceed expectations." }
];

const defaultLeadership = [
  { 
    name: "Miruts Tesfaye Gebrekidan", 
    role: "Managing Director", 
    image: "/src/assets/images/miruts_gebrekidan_1781614046333.jpg",
    desc: "Exemplary leader steering the firm with strong governance, strategic foresight, and over 15 years of industry excellence." 
  },
  { 
    name: "Tsega Tadesse Hagos", 
    role: "Technical Director", 
    image: "/src/assets/images/tsega_hagos_1781614065993.jpg",
    desc: "Meticulous engineering authority directing complex project designs, feasibility evaluations, and BIM twin integration." 
  },
  { 
    name: "Musika Johnson", 
    role: "Chief Operations Officer", 
    image: "/src/assets/images/musika_johnson_1781614085015.jpg",
    desc: "Operations mastermind driving strict project timelines, resource optimization, and premium workmanship qualities on site." 
  }
];

export function About() {
  const { config } = useCustomizer();
  const [team, setTeam] = useState(config.team);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      const sb = getSupabase();
      if (sb) {
        setSupabaseConfigured(true);
        try {
          const { data, error } = await sb
            .from("team_members")
            .select("*")
            .order("display_order", { ascending: true });

          if (error) {
            console.warn("Could not fetch team members from Supabase (using custom AdminPanel/Context fallback):", error.message);
            if (error.message?.includes("does not exist") || error.message?.includes("schema cache") || error.code === "PGRST116") {
              setTableMissing(true);
            }
            return;
          }

          if (data && data.length > 0) {
            setTeam(data.map(item => ({
              name: item.name,
              role: item.role,
              image: item.image_url || "/src/assets/images/blueprint_draft_table_1779226245180.png",
              desc: item.description,
              display_order: item.display_order || 0
            })));
          }
        } catch (e) {
          console.warn("Unexpected status reading team members (falling back to context configurations):", e);
        }
      }
    }
    fetchTeam();
  }, []);

  useEffect(() => {
    if (tableMissing || !supabaseConfigured) {
      setTeam(config.team);
    }
  }, [config.team, tableMissing, supabaseConfigured]);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-stone-950 text-white overflow-hidden mb-20">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={config.photos.aboutSection1} 
            alt="Modern Building Uganda" 
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125 brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div className="blueprint-bg absolute inset-0 opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-15 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="pre-title text-gold-500 border-gold-500/30">Our Story</div>
              <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-white">
                Building <span className="text-gold-gradient italic">Value</span> From The Ground Up.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed">
                Gracenm Consultants & Construction Company Ltd is driven by a singular purpose: to transform the landscape of East Africa through engineering precision and architectural brilliance.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* Vision & Mission */}
      <section className="px-6 md:px-15 mb-24 md:mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="friendly-card group overflow-hidden relative">
            <Eye className="absolute -top-10 -right-10 text-gold-500/5 w-64 h-64 rotate-12" />
            <div className="w-12 h-12 border border-gold-500 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
               <Target size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-stone-900 relative z-10">Our Vision</h2>
            <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed relative z-10">
              To become one of the leading and most trusted construction and consultancy companies in East Africa.
            </p>
          </div>
          
          <div className="friendly-card group overflow-hidden relative">
            <Target className="absolute -top-10 -right-10 text-gold-500/5 w-64 h-64 -rotate-12" />
            <div className="w-12 h-12 border border-gold-500 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all">
               <Eye size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-stone-900 relative z-10">Our Mission</h2>
            <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed relative z-10">
              At Gracenm Consultants & Construction Company Ltd, our mission is to transform our clients' visions into reality by delivering high-quality, safe, innovative, and cost-effective construction solutions. We are committed to excellence, integrity, and customer satisfaction in every project we undertake. Through superior craftsmanship, timely project delivery, sustainable building practices, and modern construction technologies, we create luxurious, durable, and inspiring spaces that enhance lives and strengthen communities.
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
                Our leadership team brings together decades of global engineering expertise and local market knowledge, steering Gracenm Consultants & Construction Company Ltd towards a future of sustainable development and technical excellence.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img 
                src={config.photos.aboutSection2} 
                alt="Leadership Team" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50 p-8 space-y-6 border border-stone-100 group hover:border-gold-500/30 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] bg-white border border-stone-200/60 overflow-hidden shadow-inner mb-6 relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-y-0 inset-x-0 bg-linear-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-stone-900 leading-tight">{member.name}</h4>
                    <p className="text-gold-500 text-[9px] uppercase font-black tracking-[2px]">{member.role}</p>
                  </div>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{member.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-stone-400 px-4 py-2 border border-stone-200/50 bg-stone-50/50 rounded-full">
              <span>Database Sync:</span>
              {supabaseConfigured ? (
                tableMissing ? (
                  <span className="text-amber-600 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Supabase Connected (Schema Required)
                  </span>
                ) : (
                  <span className="text-emerald-600 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Supabase Live Portfolio
                  </span>
                )
              ) : (
                <span className="text-amber-600 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Local Sandbox Profiles
                </span>
              )}
            </div>

            {supabaseConfigured && tableMissing && (
              <p className="text-xs text-stone-400 max-w-md text-center leading-relaxed">
                Notice: The <code className="text-amber-600 font-mono font-bold bg-amber-50 px-1 py-0.5 border border-amber-100 rounded">team_members</code> table was not detected. Please run the SQL schema commands inside <code className="text-stone-600 font-mono font-bold bg-stone-100 px-1 py-0.5 border border-stone-200 rounded">supabase_schema.sql</code> in your Supabase SQL Editor. Fallback local sandbox profiles are active.
              </p>
            )}
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
