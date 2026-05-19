import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, HardHat, Ruler, Map, 
  ArrowUpRight, Search, X, Maximize2,
  MapPin, Calendar, LayoutGrid
} from "lucide-react";

type ProjectCategory = "All" | "Building Construction" | "Architecture" | "Engineering" | "Site Planning";

const categories: ProjectCategory[] = ["All", "Building Construction", "Architecture", "Engineering", "Site Planning"];

const projects = [
  {
    id: 1,
    title: "The Oasis Residencies",
    category: "Building Construction",
    location: "Kampala, Uganda",
    year: "2024",
    image: "/src/assets/images/modern_building_uganda_1779222673896.png",
    description: "A luxury multi-unit residential development featuring sustainable materials and smart home systems.",
    stats: { area: "8,500 sqm", units: "32", status: "Completed" }
  },
  {
    id: 2,
    title: "Apex Business Hub",
    category: "Architecture",
    location: "Entebbe, Uganda",
    year: "2023",
    image: "/src/assets/images/architectural_render_3d_1779222706847.png",
    description: "Futuristic office complex design with parametric facade and energy-efficient climate control.",
    stats: { area: "15,000 sqm", floors: "10", status: "Design Phase" }
  },
  {
    id: 3,
    title: "Victoria Industrial Site",
    category: "Engineering",
    location: "Jinja, Uganda",
    year: "2022",
    image: "/src/assets/images/construction_site_hero_1779222656099.png",
    description: "Complex structural engineering for an industrial facility with heavy-load requirements and modern site logistics.",
    stats: { capacity: "500 Tonnes", lifespan: "100+ Years", status: "Completed" }
  },
  {
    id: 4,
    title: "Hillview Master Plan",
    category: "Site Planning",
    location: "Mbarara, Uganda",
    year: "2024",
    image: "/src/assets/images/construction_crane_skyline_1779226263430.png",
    description: "Comprehensive site planning for a 50-acre mixed-use development focusing on utility optimization.",
    stats: { area: "50 Acres", zones: "12", status: "Planning" }
  },
  {
    id: 5,
    title: "Metropolitan Tower",
    category: "Building Construction",
    location: "Kampala, Uganda",
    year: "2023",
    image: "/src/assets/images/modern_corporate_interior_1779226296836.png",
    description: "State-of-the-art corporate headquarters focused on vertical efficiency and urban integration.",
    stats: { height: "120m", floors: "28", status: "Completed" }
  },
  {
    id: 6,
    title: "Urban Green Estates",
    category: "Site Planning",
    location: "Kampala, Uganda",
    year: "2022",
    image: "/src/assets/images/blueprint_draft_table_1779226245180.png",
    description: "Sustainable residential site planning with integrated water management systems.",
    stats: { area: "15 Acres", houses: "45", status: "Completed" }
  }
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-15 mb-20">
        <div className="max-w-7xl mx-auto space-y-6">
           <div className="pre-title">Our Portfolio</div>
           <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase text-stone-900">
             Engineering <span className="text-gold-gradient">Impact.</span>
           </h1>
           <p className="max-w-2xl text-stone-400 text-xl font-light leading-relaxed">
             Go beyond the blueprint. Explore our collection of high-precision projects that are redefining standard construction in Uganda and beyond.
           </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="px-6 md:px-15 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between border-b border-stone-100 pb-8">
           <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest transition-all border ${
                    activeCategory === cat 
                    ? "bg-gold-500 border-gold-500 text-white shadow-lg shadow-gold-500/20" 
                    : "border-stone-200 text-stone-400 hover:border-gold-500/50 hover:text-stone-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="relative w-full lg:w-80">
              <input 
                type="text" 
                placeholder="Search Projects..." 
                className="w-full bg-stone-50 border border-stone-200 px-12 py-3 text-stone-900 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
                >
                  <X size={16} />
                </button>
              )}
           </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
           <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white group relative aspect-[4/5] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-90"
                  />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                     <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-gold-gradient px-4 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-xl">
                          {project.category}
                        </span>
                        <div className="w-10 h-10 border border-white/40 backdrop-blur-md flex items-center justify-center text-white">
                          <Maximize2 size={20} />
                        </div>
                     </div>

                     <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="space-y-1">
                           <p className="text-gold-500 font-mono text-[10px] font-bold uppercase tracking-[3px]">{project.location}</p>
                           <h3 className="text-3xl font-display font-bold uppercase text-white leading-tight drop-shadow-lg">{project.title}</h3>
                        </div>
                        <p className="text-white/80 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-2">
                           {project.description}
                        </p>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/10 to-transparent" />
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center space-y-6">
            <div className="w-20 h-20 border border-stone-200 flex items-center justify-center mx-auto text-stone-200">
              <Search size={40} />
            </div>
            <p className="text-stone-400 font-display font-bold uppercase tracking-widest italic">No projects found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="text-gold-500 text-xs font-bold uppercase tracking-[4px] hover:text-stone-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-stone-200 p-6 md:p-12 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-12 h-12 border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors z-10 bg-white"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative aspect-square md:aspect-auto md:h-[500px] border border-stone-100 overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent flex gap-4">
                     <div className="px-4 py-2 glass border-none bg-white/20 backdrop-blur-md flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white">
                        <Calendar size={14} className="text-gold-500" /> {selectedProject.year}
                     </div>
                     <div className="px-4 py-2 glass border-none bg-white/20 backdrop-blur-md flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white">
                        <MapPin size={14} className="text-gold-500" /> {selectedProject.location}
                     </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="pre-title tracking-[4px]">{selectedProject.category}</div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-stone-900 leading-tight tracking-tighter">{selectedProject.title}</h2>
                  </div>

                  <p className="text-stone-400 text-xl font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-stone-100 border border-stone-100 shadow-sm">
                     {Object.entries(selectedProject.stats).map(([key, value]) => (
                       <div key={key} className="bg-stone-50 p-6 space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{key.replace('_', ' ')}</h4>
                          <p className="text-xl font-display font-bold uppercase text-gold-500">{value as string}</p>
                       </div>
                     ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                     <button className="btn-gold flex-1 shadow-lg shadow-gold-500/10">Download Case Study</button>
                     <button className="btn-outline flex-1">Enquire About This Service</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-32 border-y border-stone-100 py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-15 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div className="text-6xl font-display font-bold text-stone-900 tracking-tighter leading-none">500K+</div>
            <div className="text-[10px] uppercase tracking-[3px] text-gold-500 font-bold border-t border-stone-100 pt-4">M² Built Excellence</div>
          </div>
          <div className="space-y-4">
            <div className="text-6xl font-display font-bold text-stone-900 tracking-tighter leading-none">10+</div>
            <div className="text-[10px] uppercase tracking-[3px] text-gold-500 font-bold border-t border-stone-100 pt-4">Operational Years</div>
          </div>
          <div className="space-y-4">
            <div className="text-6xl font-display font-bold text-stone-900 tracking-tighter leading-none">0</div>
            <div className="text-[10px] uppercase tracking-[3px] text-gold-500 font-bold border-t border-stone-100 pt-4">Safety Incidents</div>
          </div>
        </div>
      </section>
    </div>
  );
}
