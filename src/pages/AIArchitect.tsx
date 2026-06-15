import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Cpu, Layers, Sliders, Play, RotateCcw, 
  ArrowLeftRight, Download, Send, RefreshCw, Eye, 
  ShieldCheck, HelpCircle, HardHat, Hammer, FileCheck, 
  ChevronRight, Building2, Landmark, TreePine, Trees, FlameKindling
} from "lucide-react";

// Pre-defined architectural renders with before (schematic/blueprint) and after (photorealistic render) paths
const ARCHITECTURAL_PRESETS = [
  {
    id: "biophilic-tower",
    title: "Ugandan Eco-Brutalist Tower",
    description: "Multistory mixed-use skyrise leveraging Uganda's local clay tones with vertical forestation & passive wind currents.",
    before: "/src/assets/images/blueprint_draft_table_1779226245180.png",
    after: "/src/assets/images/construction_crane_skyline_1779226263430.png",
    stats: { concrete: "12,400 m³", steel: "3,200 Tons", carbon: "45% Reduction", cost: "$4.2M - $5.5M" },
    style: "Tropical Brutalism",
    material: "Textured Red Clay & Passive Concrete",
    environment: "Kampala Hills"
  },
  {
    id: "glass-cabin",
    title: "Lake Victoria Luxury Glass Pavilion",
    description: "A cantilevered premium residence hovering over water with glass walls, polished concrete slabs, and a natural reed roof.",
    before: "/src/assets/images/blueprint_draft_table_1779226245180.png",
    after: "/src/assets/images/architectural_render_3d_1779222706847.png",
    stats: { concrete: "850 m³", steel: "210 Tons", carbon: "68% Reduction", cost: "$850K - $1.2M" },
    style: "Minimalist Modern",
    material: "Tempered Glass & Steel",
    environment: "Lakeside Victoria"
  },
  {
    id: "modernist-villa",
    title: "Kampala Hills Modernist Villa",
    description: "An elegant 3-story residential space featuring continuous raw concrete bands, solar harvesting elements, and timber accents.",
    before: "/src/assets/images/blueprint_draft_table_1779226245180.png",
    after: "/src/assets/images/modern_building_uganda_1779222673896.png",
    stats: { concrete: "1,200 m³", steel: "450 Tons", carbon: "50% Reduction", cost: "$1.4M - $1.8M" },
    style: "Modernist",
    material: "Exposed Structural Concrete",
    environment: "Hill Crest Area"
  }
];

const PRESET_STYLES = ["Tropical Brutalism", "Minimalist Modern", "Biophilic Eco-Luxury", "Classical Estate", "Ugandan Sustainable Heritage"];
const PRESET_STRUCTURE_TYPES = ["Luxury Residential Villa", "High-Rise Commercial Hub", "Boutique Resort Pavilion", "Civic Center / Museum", "Industrial Innovation Lab"];
const PRESET_MATERIALS = ["Exposed Raw Concrete", "Tempered Glass & Structural Steel", "Ugandan Red Terracotta & Bamboo", "Polished Limestone & Timber", "Locally Sourced Basalt Stone"];
const PRESET_ENVIRONMENTS = ["Kampala Skyline", "Lakeside Victoria", "Mbarara Woodlands", "Jinja Nile Banks", "Rwenzori Alpine Slopes"];

export function AIArchitect() {
  const [selectedPreset, setSelectedPreset] = useState(ARCHITECTURAL_PRESETS[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [customStyle, setCustomStyle] = useState(ARCHITECTURAL_PRESETS[0].style);
  const [customStructure, setCustomStructure] = useState("Luxury Residential Villa");
  const [customMaterial, setCustomMaterial] = useState(ARCHITECTURAL_PRESETS[0].material);
  const [customEnv, setCustomEnv] = useState(ARCHITECTURAL_PRESETS[0].environment);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customVegetation, setCustomVegetation] = useState("High");
  const [showEstimatedReport, setShowEstimatedReport] = useState(true);
  const [simulationSent, setSimulationSent] = useState(false);

  // Split-slider container reference for hover/drag tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const generationMessages = [
    "Analyzing topography and solar angles...",
    "Generative algorithms sketching load-bearing structures...",
    "Running structural stress & seismic simulations...",
    "Applying high-definition neural architectural textures...",
    "Generating environmental carbon compliance score...",
    "Finalizing highly photorealistic 3D presentation..."
  ];

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    // We allow mouse tracking if clicking/dragging or simply moving over it for an amazing premium feel
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const startAIGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setSimulationSent(false);
  };

  useEffect(() => {
    if (!isGenerating) return;
    if (generationStep < generationMessages.length) {
      const timer = setTimeout(() => {
        setGenerationStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setIsGenerating(false);
      // Construct a new visual selection representing user's choices
      const matchedPreset = ARCHITECTURAL_PRESETS.find(p => p.style === customStyle) || {
        ...ARCHITECTURAL_PRESETS[1],
        title: `AI Render: ${customStructure}`,
        description: `Custom generated ${customStyle} blueprint located in ${customEnv} designed primarily using ${customMaterial}.`,
        style: customStyle,
        material: customMaterial,
        environment: customEnv,
      };
      setSelectedPreset({
        ...matchedPreset,
        title: `Studio Render: ${customStructure}`,
        description: customPrompt || `Custom generated design in ${customEnv} utilizing ${customStyle} with premium ${customMaterial}.`,
      });
    }
  }, [isGenerating, generationStep]);

  const handlePresetSelect = (preset: typeof ARCHITECTURAL_PRESETS[0]) => {
    setSelectedPreset(preset);
    setCustomStyle(preset.style);
    setCustomMaterial(preset.material);
    setCustomEnv(preset.environment);
  };

  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="px-6 md:px-15 mb-16 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="pre-title">Lovable Generation Lab</div>
          <h1 className="text-4xl md:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase max-w-5xl text-stone-900">
            AI Architectural <br />
            <span className="text-gold-gradient italic">Studio & Lab.</span>
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-stone-400 font-light leading-relaxed">
            Enter your site details, design parameters, or describe your vision. Simulate photorealistic renderings, estimate engineering loads, and interface seamlessly with Grace NM's physical building pipelines in minutes.
          </p>
        </div>
      </section>

      {/* Main Studio Interface */}
      <section className="px-6 md:px-15 lg:px-20 max-w-7xl mx-auto gap-8 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Control & Creation Panel */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
          <div className="bg-stone-50 border border-stone-200 p-8 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping m-6" />
            <div className="flex items-center gap-3">
              <Sparkles className="text-gold-500 w-5 h-5 animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-widest text-stone-900">Configure AI Render</h2>
            </div>
            
            {/* Quick Presets */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Library Presets</label>
              <div className="flex flex-wrap gap-2">
                {ARCHITECTURAL_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                      selectedPreset.id === preset.id 
                        ? "bg-gold-gradient text-white border-transparent shadow-sm" 
                        : "bg-white text-stone-500 border-stone-200 hover:text-stone-900 hover:border-stone-400"
                    }`}
                  >
                    {preset.id.split('-').join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Inputs form */}
            <div className="space-y-5 pt-3 border-t border-stone-200">
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400 flex justify-between">
                  <span>Design Style</span>
                  <span className="text-gold-500 font-bold">{customStyle}</span>
                </label>
                <div className="overflow-x-auto no-scrollbar flex gap-2 pb-1">
                  {PRESET_STYLES.map(style => (
                    <button
                      key={style}
                      onClick={() => setCustomStyle(style)}
                      className={`px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider shrink-0 transition-colors border ${
                        customStyle === style 
                          ? "bg-stone-950 text-white border-stone-950" 
                          : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Building Typology</label>
                <select 
                  value={customStructure} 
                  onChange={(e) => setCustomStructure(e.target.value)}
                  className="w-full bg-white border border-stone-200 text-xs font-bold tracking-widest uppercase p-4 outline-none focus:border-gold-500"
                >
                  {PRESET_STRUCTURE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Primary Material Face</label>
                <select 
                  value={customMaterial} 
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  className="w-full bg-white border border-stone-200 text-xs font-bold tracking-widest uppercase p-4 outline-none focus:border-gold-500"
                >
                  {PRESET_MATERIALS.map(mat => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400 flex justify-between">
                  <span>Target Environment</span>
                  <span className="text-stone-500">{customEnv}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_ENVIRONMENTS.slice(0, 4).map(env => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => setCustomEnv(env)}
                      className={`p-3 text-[8px] font-bold uppercase tracking-wider text-left border transition-colors ${
                        customEnv === env 
                          ? "bg-stone-200 text-stone-900 border-stone-300" 
                          : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Custom Architectural Directives</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. A three-story structure wrapping a wild fig tree with suspended wooden terraces and cascading waterfall entryways..."
                  rows={3}
                  className="w-full bg-white border border-stone-200 p-4 text-xs tracking-widest uppercase text-stone-950 placeholder:text-stone-300 outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Trees className="text-stone-400 w-4 h-4" />
                  <span className="text-[9px] uppercase tracking-widest font-black text-stone-400">Vegetation Density</span>
                </div>
                <div className="flex gap-1">
                  {["Low", "Medium", "High"].map(item => (
                    <button
                      key={item}
                      onClick={() => setCustomVegetation(item)}
                      className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${
                        customVegetation === item 
                          ? "bg-stone-900 text-white border-stone-900" 
                          : "bg-white text-stone-400 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startAIGeneration}
                disabled={isGenerating}
                className="w-full btn-gold !py-4 flex items-center justify-center gap-3 cursor-pointer group"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>RENDERING Blueprints...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    <span>VISUALIZE DREAM SPACE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Split View Lab Canvas */}
        <div className="lg:col-span-7 flex flex-col justify-start gap-8">
          
          {/* Active Generation Screen */}
          <div className="relative border border-stone-200 bg-stone-950 overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <span className="px-3 py-1.5 bg-stone-900/90 backdrop-blur-md border border-stone-800 text-[8px] font-black uppercase tracking-widest text-white/60">
                ACTIVE EXPERIMENT
              </span>
              <span className="px-3 py-1.5 bg-gold-gradient text-[8px] font-black uppercase tracking-widest text-white flex items-center gap-1">
                <ArrowLeftRight className="w-3 h-3" />
                SLIDE TO COMPARE
              </span>
            </div>

            {/* Split Comparison Canvas Container */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-video w-full select-none overflow-hidden cursor-ew-resize bg-stone-900"
            >
              {/* After Rendering (Full color photo) */}
              <img 
                src={selectedPreset.after} 
                alt="AI Finished Rendering" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Schematics (Grayscale lines blueprint) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src={selectedPreset.before} 
                  alt="Raw Blueprint Wireframe" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 brightness-[0.35]"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                />
                <div className="absolute inset-0 blueprint-bg opacity-30 mix-blend-screen" />
              </div>

              {/* Glowing Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold-500 to-transparent pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.7)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-gold-500 flex items-center justify-center shadow-2xl">
                  <ArrowLeftRight className="w-3 h-3 text-gold-500 animate-pulse" />
                </div>
              </div>

              {/* Generation Loader Overlay */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-stone-950/90 flex flex-col items-center justify-center p-8 text-center gap-6 z-30 backdrop-blur-md"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-stone-800 rounded-full flex items-center justify-center">
                        <RefreshCw className="text-gold-500 w-8 h-8 animate-spin" />
                      </div>
                      <div className="absolute inset-0 border-2 border-gold-500 animate-ping rounded-full opacity-20" />
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-gold-gradient text-[9px] tracking-[4px] uppercase font-black">AI Model: Lovable-BIM-v4</span>
                      <h3 className="text-white text-md uppercase font-display select-none tracking-wider">
                        {generationMessages[generationStep] || "Processing blueprint..."}
                      </h3>
                      
                      {/* Generation progress bar */}
                      <div className="w-64 h-[2px] bg-stone-800 mx-auto overflow-hidden relative">
                        <motion.div 
                          className="absolute h-full bg-gold-gradient" 
                          initial={{ left: "-100%" }}
                          animate={{ left: "0%" }}
                          transition={{ duration: 7, ease: "easeInOut" }}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Render Metadata Footbar */}
            <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase text-stone-400 font-bold tracking-widest">Active Spec</span>
                <h3 className="text-sm font-display font-bold text-stone-900 uppercase tracking-tight">{selectedPreset.title}</h3>
                <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest">{selectedPreset.style} in {selectedPreset.environment}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 border border-stone-200 text-stone-500 bg-white hover:text-stone-900 hover:border-stone-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Download className="w-4 h-4" />
                  <span>Blueprint PKG</span>
                </button>
              </div>
            </div>
          </div>

          {/* estimated parameters & structural reports */}
          {showEstimatedReport && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-50 border border-stone-200 p-8 space-y-6"
            >
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="text-gold-500 w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest text-stone-900">Calculated BIM Estimates</span>
                </div>
                <span className="text-[10px] bg-stone-200 text-stone-600 px-2 py-0.5 font-bold uppercase tracking-widest">Est. Accuracy: 92%</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-stone-400 block mb-1">Load Class Estimate</span>
                  <p className="font-display font-medium text-stone-950 text-xl">{selectedPreset.stats.concrete}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-stone-400 block mb-1">Steel Tonnage</span>
                  <p className="font-display font-medium text-stone-950 text-xl">{selectedPreset.stats.steel}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-stone-400 block mb-1">Carbon Reduction</span>
                  <p className="font-display font-medium text-gold-500 text-xl">{selectedPreset.stats.carbon}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-stone-400 block mb-1">Rough Cost Index</span>
                  <p className="font-display font-medium text-stone-950 text-xl">{selectedPreset.stats.cost}</p>
                </div>
              </div>

              <div className="bg-white border border-stone-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Eco-Sustainable Rating
                  </span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-relaxed">
                    Complies with regional East African building codes and green building regulations.
                  </p>
                </div>
                {simulationSent ? (
                  <span className="px-6 py-3 bg-green-500 text-white text-[10px] font-black uppercase tracking-[2px] shadow-md flex items-center gap-1">
                    ✓ Transmitted to Engineering
                  </span>
                ) : (
                  <button 
                    onClick={() => setSimulationSent(true)}
                    className="btn-outline !py-3 !px-6 !text-[9px] shrink-0 hover:!bg-stone-900 hover:!text-white hover:!border-stone-900 transition-colors"
                  >
                    Send to Grace NM Engineers <ChevronRight className="w-3 h-3 inline-block ml-1" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Detail Explanation Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-stone-200 p-6 space-y-4">
              <div className="flex gap-3 items-center">
                <HardHat className="text-gold-500 w-5 h-5" />
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">1. Architectural Blueprint</h4>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed uppercase tracking-wider">
                We synthesize initial sketches into a digital-twin container. The model dynamically balances load ratios and optimizes solar integration metrics.
              </p>
            </div>
            <div className="border border-stone-200 p-6 space-y-4">
              <div className="flex gap-3 items-center">
                <Hammer className="text-gold-500 w-5 h-5" />
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">2. Built Construction</h4>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed uppercase tracking-wider">
                Once visual simulation completes, the digital code exports directly to Grace NM quantity survey machinery, ensuring material precision.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* R&D Lab CTA */}
      <section className="py-24 px-6 md:px-15 border-t border-stone-100 mt-24">
        <div className="max-w-7xl mx-auto bg-stone-50 border border-stone-100 p-12 md:p-24 text-center space-y-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-6xl font-display font-black uppercase leading-none tracking-tighter text-stone-900">
              Transform Your Design <span className="text-gold-gradient italic">Into Reality.</span>
            </h2>
            <p className="max-w-xl mx-auto text-stone-400 text-lg font-light leading-relaxed">
              Have you customized your simulated layout and checked estimated carbon metrics? Contact our Kampala headquarter office to proceed to on-site surveying.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.location.href="/contact"} className="btn-gold !px-12">Consult Construction Team</button>
              <button onClick={() => window.location.href="/projects"} className="btn-outline">Explore Historic Portfolio</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
