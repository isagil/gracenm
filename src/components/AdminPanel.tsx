import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomizer, Testimonial, CustomizerConfig } from "../context/CustomizerContext";
import { 
  X, Settings, Paintbrush, FileText, Image, MessageSquare, 
  RotateCcw, Sliders, Check, Plus, Trash2, Edit3, 
  ChevronRight, Sparkles, BookOpen, Layers, Upload, Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Color presets that match beautiful, cohesive construction/engineering archetypes
const COLOR_PRESETS = [
  {
    name: "Golden Sands (Default)",
    primary: "#C5A028",
    start: "#D4AF37",
    middle: "#C5A028",
    end: "#996515"
  },
  {
    name: "Emerald Builder",
    primary: "#059669",
    start: "#34D399",
    middle: "#059669",
    end: "#064E3B"
  },
  {
    name: "Corporate Blue",
    primary: "#1D4ED8",
    start: "#60A5FA",
    middle: "#1D4ED8",
    end: "#1E3A8A"
  },
  {
    name: "Terracotta Clay",
    primary: "#B45309",
    start: "#F59E0B",
    middle: "#B45309",
    end: "#78350F"
  },
  {
    name: "Minimalist Slate",
    primary: "#374151",
    start: "#9CA3AF",
    middle: "#4B5563",
    end: "#111827"
  },
  {
    name: "Crimson Scaffold",
    primary: "#B91C1C",
    start: "#F87171",
    middle: "#B91C1C",
    end: "#7F1D1D"
  }
];

// Beautiful Unsplash photos for presets
const PHOTO_PRESETS = {
  homeHero: [
    { label: "Modern Uganda Blue", url: "/src/assets/images/modern_building_uganda_1779222673896.png" },
    { label: "Kampala Sunset Grid", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" },
    { label: "Glass High-Rise", url: "https://images.unsplash.com/photo-1554469384-e58fa16e2d09?auto=format&fit=crop&q=80&w=1200" }
  ],
  homeAbout: [
    { label: "Construction Helmet", url: "/src/assets/images/construction_site_hero_1779222656099.png" },
    { label: "Blueprint Review", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" },
    { label: "Steel Beams", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200" }
  ],
  aboutSection2: [
    { label: "Engineering Brainstorm", url: "/src/assets/images/engineering_team_about_1779222690871.png" },
    { label: "Architect drafts", url: "/src/assets/images/blueprint_draft_table_1779226245180.png" },
    { label: "Meeting Table", url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200" }
  ],
  contactSection: [
    { label: "Crane Silhouette", url: "/src/assets/images/construction_crane_skyline_1779226263430.png" },
    { label: "Reflective Glass Panel", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" }
  ]
};

export function AdminPanel() {
  const { config, updateConfig, updateSingleConfig, updatePhoto, resetToDefault, adminOpen, setAdminOpen } = useCustomizer();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState<"style" | "text" | "photos" | "testimonials" | "team">("style");
  
  // Testimonial local adding states
  const [newTCheck, setNewTCheck] = useState(false);
  const [newTName, setNewTName] = useState("");
  const [newTRole, setNewTRole] = useState("");
  const [newTText, setNewTText] = useState("");
  const [newTStars, setNewTStars] = useState(5);
  const [newTCompany, setNewTCompany] = useState("");

  const isUrlAdmin = location.pathname === "/admin";
  const isOpen = adminOpen || isUrlAdmin;

  // Fully handle close and reset routes gracefully
  const handleClose = () => {
    setAdminOpen(false);
    if (isUrlAdmin) {
      navigate("/");
    }
  };

  // Base64 file uploader reader
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    photoKey: keyof CustomizerConfig["photos"] | "logoImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Please upload an image smaller than 4MB for optimal database storage performance.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (photoKey === "logoImage") {
        updateSingleConfig("logoImage", base64String);
      } else {
        updatePhoto(photoKey, base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  // Base64 team member photo uploader reader
  const handleTeamImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Please upload an image smaller than 4MB for optimal database storage performance.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      updateConfig((prev) => {
        const newTeam = [...(prev.team || [])];
        if (newTeam[index]) {
          newTeam[index] = { ...newTeam[index], image: base64String };
        }
        return { ...prev, team: newTeam };
      });
    };
    reader.readAsDataURL(file);
  };

  // Helper component function to render beautiful photo upload boxes with inputs and presets
  const renderPhotoFielder = (
    label: string, 
    photoKey: keyof CustomizerConfig["photos"], 
    presets: Array<{ label: string, url: string }>
  ) => {
    const currentVal = config.photos[photoKey] || "";
    const isCustomBase64 = currentVal.startsWith("data:image/");

    return (
      <div className="space-y-3 pb-6 border-b border-stone-100 last:border-b-0">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-stone-600 font-bold block">{label}</span>
          {isCustomBase64 && (
            <span className="text-[8px] text-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold uppercase rounded-full">Custom Device Upload Active</span>
          )}
        </div>
        
        <div className="flex gap-4 items-start">
          {/* Preview Image */}
          <div className="w-16 h-16 min-w-[4rem] border border-stone-200 bg-stone-50 p-0.5 flex items-center justify-center overflow-hidden rounded-xs shadow-inner">
            <img src={currentVal} className="w-full h-full object-cover" alt="Preview Thumbnail" />
          </div>

          <div className="flex-grow space-y-2">
            <input 
              type="text" 
              value={currentVal}
              onChange={(e) => updatePhoto(photoKey, e.target.value)}
              className="w-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 outline-none focus:border-stone-950 font-mono rounded-xs"
              placeholder="Or paste direct image URL if desired"
            />
            
            <div className="flex flex-wrap gap-2 items-center justify-between">
              {/* Preset buttons */}
              <div className="flex gap-1">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => updatePhoto(photoKey, p.url)}
                    className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 border font-bold transition-all ${currentVal === p.url ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Upload file button node */}
              <label className="border border-stone-200 hover:border-stone-950 bg-white hover:bg-stone-50 text-stone-800 px-2 py-1 text-[9px] uppercase tracking-wider font-black cursor-pointer transition-colors flex items-center gap-1.5 rounded-none shadow-sm">
                <Upload size={10} className="text-stone-500" />
                <span>Upload image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, photoKey)} 
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If path is not /admin and adminOpen state is false, render absolutely nothing
  if (!isOpen) {
    return null;
  }

  const applyColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    updateConfig(prev => ({
      ...prev,
      themeColor: preset.primary,
      themeGradientStart: preset.start,
      themeGradientMiddle: preset.middle,
      themeGradientEnd: preset.end
    }));
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTName || !newTText) return;

    const added: Testimonial = {
      name: newTName,
      role: newTRole || "Client Partner",
      text: newTText,
      stars: newTStars,
      company: newTCompany || "Uganda Enterprise"
    };

    updateSingleConfig("testimonials", [added, ...config.testimonials]);
    
    // Reset Form
    setNewTName("");
    setNewTRole("");
    setNewTText("");
    setNewTStars(5);
    setNewTCompany("");
    setNewTCheck(false);
  };

  const handleDeleteTestimonial = (index: number) => {
    if (window.confirm("Delete this testimonial?")) {
      const updated = config.testimonials.filter((_, idx) => idx !== index);
      updateSingleConfig("testimonials", updated);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/20 backdrop-blur-xs pointer-events-auto"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="w-full max-w-lg bg-white h-screen shadow-2xl border-l border-stone-200/60 relative z-10 flex flex-col pointer-events-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 flex items-center justify-center text-white">
              <Settings className="w-5 h-5 text-gold-500 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-sm font-display font-black uppercase tracking-wider text-stone-900">Customizer Console</h3>
              <p className="text-[10px] text-stone-500 font-medium uppercase tracking-[2px]">Admin Real-Time Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={resetToDefault} 
              className="text-stone-400 hover:text-red-500 p-2 transition-colors relative group"
              title="Reset configuration to original defaults"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="absolute bottom-10 right-0 hidden group-hover:block bg-stone-900 text-white text-[9px] uppercase tracking-wider px-2 py-1 rounded shadow-md whitespace-nowrap">
                Reset Originals
              </span>
            </button>
            <button 
              onClick={handleClose}
              className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-all rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs Selection Layout */}
        <div className="flex border-b border-stone-100 bg-stone-50/50">
          <button 
            onClick={() => setActiveTab("style")}
            className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-black flex flex-col items-center gap-1.5 border-b-2 transition-all ${activeTab === 'style' ? 'border-stone-900 text-stone-900 bg-white' : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>Style & Shapes</span>
          </button>
          <button 
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-black flex flex-col items-center gap-1.5 border-b-2 transition-all ${activeTab === 'text' ? 'border-stone-900 text-stone-900 bg-white' : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          >
            <FileText className="w-4 h-4" />
            <span>Heroes & Logo</span>
          </button>
          <button 
            onClick={() => setActiveTab("photos")}
            className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-black flex flex-col items-center gap-1.5 border-b-2 transition-all ${activeTab === 'photos' ? 'border-stone-900 text-stone-900 bg-white' : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          >
            <Image className="w-4 h-4" />
            <span>Photos</span>
          </button>
          <button 
            onClick={() => setActiveTab("testimonials")}
            className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-black flex flex-col items-center gap-1.5 border-b-2 transition-all ${activeTab === 'testimonials' ? 'border-stone-900 text-stone-900 bg-white' : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials</span>
          </button>
          <button 
            onClick={() => setActiveTab("team")}
            className={`flex-1 py-4 text-[10px] uppercase tracking-widest font-black flex flex-col items-center gap-1.5 border-b-2 transition-all ${activeTab === 'team' ? 'border-stone-900 text-stone-900 bg-white' : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          >
            <Users className="w-4 h-4" />
            <span>Team Members</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar bg-white">
          
          {/* TAB 1: Style, Presets, Curves and Fonts */}
          {activeTab === "style" && (
            <div className="space-y-8">
              {/* Color Presets */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <h4 className="text-xs uppercase tracking-[2px] font-bold text-stone-900">Color Palette Presets</h4>
                </div>
                <p className="text-[11px] text-stone-400">Transform your corporate identity with curated architect palettes:</p>
                <div className="grid grid-cols-2 gap-3">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected = config.themeColor === preset.primary;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyColorPreset(preset)}
                        className={`p-3 text-left border flex flex-col gap-2 transition-all hover:border-stone-400 ${isSelected ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/5' : 'border-stone-150'}`}
                      >
                        <div className="text-[10px] tracking-wide font-bold uppercase text-stone-900">{preset.name}</div>
                        <div className="flex gap-1 h-3 rounded-xs overflow-hidden">
                          <div style={{ backgroundColor: preset.start }} className="flex-1" />
                          <div style={{ backgroundColor: preset.middle }} className="flex-1" />
                          <div style={{ backgroundColor: preset.end }} className="flex-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Color Customizers */}
              <div className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-stone-500" />
                  <h4 className="text-xs uppercase tracking-[2px] font-bold text-stone-900">Custom Colors Control</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Theme Accent (Primary)</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={config.themeColor} 
                        onChange={(e) => updateSingleConfig("themeColor", e.target.value)}
                        className="w-8 h-8 rounded border p-0 cursor-pointer overflow-hidden leading-none block"
                      />
                      <input 
                        type="text" 
                        value={config.themeColor} 
                        onChange={(e) => updateSingleConfig("themeColor", e.target.value)}
                        className="w-20 border border-stone-200 text-[10px] py-1.5 px-2 text-center uppercase tracking-widest font-mono font-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Gradient Peak Start</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={config.themeGradientStart} 
                        onChange={(e) => updateSingleConfig("themeGradientStart", e.target.value)}
                        className="w-8 h-8 rounded border p-0 cursor-pointer overflow-hidden leading-none block"
                      />
                      <input 
                        type="text" 
                        value={config.themeGradientStart} 
                        onChange={(e) => updateSingleConfig("themeGradientStart", e.target.value)}
                        className="w-20 border border-stone-200 text-[10px] py-1.5 px-2 text-center uppercase tracking-widest font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Gradient Peak End</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={config.themeGradientEnd} 
                        onChange={(e) => updateSingleConfig("themeGradientEnd", e.target.value)}
                        className="w-8 h-8 rounded border p-0 cursor-pointer overflow-hidden leading-none block"
                      />
                      <input 
                        type="text" 
                        value={config.themeGradientEnd} 
                        onChange={(e) => updateSingleConfig("themeGradientEnd", e.target.value)}
                        className="w-20 border border-stone-200 text-[10px] py-1.5 px-2 text-center uppercase tracking-widest font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Button & Element Shapes */}
              <div className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-stone-500" />
                  <h4 className="text-xs uppercase tracking-[2px] font-bold text-stone-900">Custom Button & Card Shapes</h4>
                </div>
                <p className="text-[11px] text-stone-400">Morph button curvature and border-radius profiles in real-time:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "asymmetric", label: "Asymmetric (Architect)" },
                    { value: "square", label: "Square (Brutalist)" },
                    { value: "rounded", label: "Rounded (Contemporary)" },
                    { value: "pill", label: "Pill Shape (Modern Fluid)" }
                  ].map((shape) => (
                    <button
                      key={shape.value}
                      onClick={() => updateSingleConfig("buttonShape", shape.value)}
                      className={`py-3 px-4 border text-left text-[10px] uppercase tracking-widest font-bold transition-all hover:bg-stone-50 ${config.buttonShape === shape.value ? 'border-stone-900 bg-stone-50/40 text-stone-900 font-extrabold' : 'border-stone-200 text-stone-400'}`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography / Font Pairings */}
              <div className="space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-stone-500" />
                  <h4 className="text-xs uppercase tracking-[2px] font-bold text-stone-900">Premium Font Pairings</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Display heading font</label>
                    <select
                      value={config.headingFont}
                      onChange={(e) => updateSingleConfig("headingFont", e.target.value)}
                      className="w-full border border-stone-200 text-xs py-3 px-4 uppercase tracking-widest font-bold bg-white outline-none cursor-pointer"
                    >
                      <option value="Space Grotesk">Space Grotesk (Tech Dynamic)</option>
                      <option value="Montserrat">Montserrat (Display Bold)</option>
                      <option value="Playfair Display">Playfair Display (Serif Classic)</option>
                      <option value="Cinzel">Cinzel (Stone Monumental)</option>
                      <option value="Inter">Inter (Neo-Swiss Clean)</option>
                      <option value="JetBrains Mono">JetBrains Mono (Tech Brutalist)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Body paragraph font</label>
                    <select
                      value={config.bodyFont}
                      onChange={(e) => updateSingleConfig("bodyFont", e.target.value)}
                      className="w-full border border-stone-200 text-xs py-3 px-4 uppercase tracking-widest font-bold bg-white outline-none cursor-pointer"
                    >
                      <option value="Poppins">Poppins (Soft Geometric)</option>
                      <option value="Inter">Inter (Swiss Neutral)</option>
                      <option value="Montserrat">Montserrat (Display Fine)</option>
                      <option value="Roboto">Roboto (Clean Modern)</option>
                      <option value="PT Serif">PT Serif (Editorial Text)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Hero texts, Taglines and Logos */}
          {activeTab === "text" && (
            <div className="space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Global LOGO text branding</label>
                  <input 
                    type="text" 
                    value={config.logoText}
                    onChange={(e) => updateSingleConfig("logoText", e.target.value)}
                    className="w-full border border-stone-200/80 px-4 py-3 text-xs uppercase tracking-widest font-bold text-stone-900 outline-none focus:border-stone-950"
                    placeholder="GRACENM"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Or Upload Brand LOGO from Device</label>
                  {config.logoImage ? (
                    <div className="p-3 border border-stone-200 bg-stone-50 rounded-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={config.logoImage} className="h-10 w-16 object-contain bg-white border border-stone-200 p-1" alt="Custom Logo" />
                        <div>
                          <p className="text-[10px] font-bold text-stone-700 uppercase">Device Logo Loaded</p>
                          <p className="text-[8px] text-emerald-600 uppercase font-mono font-bold">Stored in Database</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateSingleConfig("logoImage", "")}
                        className="text-[10px] text-red-500 hover:text-red-700 uppercase font-bold tracking-wider hover:underline"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-stone-200 hover:border-stone-900 bg-stone-50/50 hover:bg-stone-50 transition-all duration-300 cursor-pointer rounded-xs group">
                      <div className="flex flex-col items-center justify-center pt-4 pb-4 px-3 text-center">
                        <Upload className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors mb-1.5" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 group-hover:text-stone-900 transition-colors">Select Brand Image</span>
                        <span className="text-[8px] text-stone-400 uppercase font-light mt-0.5">PNG, JPG, or SVG (Max 4MB)</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, "logoImage")} 
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-100">
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Main Hero Title Text</label>
                <textarea 
                  rows={2}
                  value={config.heroTitle}
                  onChange={(e) => updateSingleConfig("heroTitle", e.target.value)}
                  className="w-full border border-stone-200/80 px-4 py-3 text-xs tracking-wide font-medium text-stone-900 outline-none focus:border-stone-950 block leading-relaxed"
                  placeholder="Custom Hero Main slogan"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Main Hero Description</label>
                <textarea 
                  rows={4}
                  value={config.heroSubtitle}
                  onChange={(e) => updateSingleConfig("heroSubtitle", e.target.value)}
                  className="w-full border border-stone-200/80 px-4 py-3 text-xs text-stone-600 outline-none focus:border-stone-950 block leading-relaxed font-light"
                  placeholder="Custom Hero description text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Primary CTA Button</label>
                  <input 
                    type="text" 
                    value={config.heroCtaPrimary}
                    onChange={(e) => updateSingleConfig("heroCtaPrimary", e.target.value)}
                    className="w-full border border-stone-200/80 px-4 py-3 text-xs text-stone-900 outline-none focus:border-stone-950"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Secondary Button</label>
                  <input 
                    type="text" 
                    value={config.heroCtaSecondary}
                    onChange={(e) => updateSingleConfig("heroCtaSecondary", e.target.value)}
                    className="w-full border border-stone-200/80 px-4 py-3 text-xs text-stone-900 outline-none focus:border-stone-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Direct Hotline Line</label>
                  <input 
                    type="text" 
                    value={config.heroPhone1}
                    onChange={(e) => updateSingleConfig("heroPhone1", e.target.value)}
                    className="w-full border border-stone-200/80 px-4 py-3 text-xs text-stone-900 outline-none focus:border-stone-950 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Office Inquiries Link</label>
                  <input 
                    type="text" 
                    value={config.heroPhone2}
                    onChange={(e) => updateSingleConfig("heroPhone2", e.target.value)}
                    className="w-full border border-stone-200/80 px-4 py-3 text-xs text-stone-900 outline-none focus:border-stone-950 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Hero Side Suffix / Established Banner</label>
                <input 
                  type="text" 
                  value={config.heroEstSlogan}
                  onChange={(e) => updateSingleConfig("heroEstSlogan", e.target.value)}
                  className="w-full border border-stone-200/80 px-4 py-3 text-xs tracking-wider text-stone-900 outline-none focus:border-stone-950 font-medium"
                />
              </div>

            </div>
          )}

          {/* TAB 3: Photos and images */}
          {activeTab === "photos" && (
            <div className="space-y-8">
              <div className="bg-stone-50 p-4 border border-stone-200/50 rounded-xs">
                <p className="text-[10px] uppercase font-bold text-stone-700 tracking-wide">Device Upload Board</p>
                <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                  Upload custom project photographs directly from your local system. Supported formats include JPEG, PNG, and SVG vector twins. Once loaded, the assets dynamically update across all pages and synchronize directly into the database.
                </p>
              </div>

              {renderPhotoFielder("Homepage Hero Image", "homeHero", PHOTO_PRESETS.homeHero)}
              {renderPhotoFielder("Homepage About Section Illustration", "homeAbout", PHOTO_PRESETS.homeAbout)}
              {renderPhotoFielder("About Page Top Header Backdrop", "aboutSection1", PHOTO_PRESETS.homeHero)}
              {renderPhotoFielder("About Page Engineering Team / Office Draft", "aboutSection2", PHOTO_PRESETS.aboutSection2)}
              {renderPhotoFielder("Services Page Top Header Banner", "servicesTop", PHOTO_PRESETS.homeAbout)}
              {renderPhotoFielder("Services Page Bottom Process Render", "servicesBottom", PHOTO_PRESETS.aboutSection2)}
              {renderPhotoFielder("Contact Page Skyline Crane Backdrop", "contactSection", PHOTO_PRESETS.contactSection)}
            </div>
          )}

          {/* TAB 4: Testimonials Manager */}
          {activeTab === "testimonials" && (
            <div className="space-y-8">
              
              <div className="bg-stone-50 border border-stone-100 p-4 space-y-4">
                <button 
                  onClick={() => setNewTCheck(!newTCheck)} 
                  className="w-full btn-gold !py-3 !px-4 text-[10px] uppercase font-bold flex items-center justify-center gap-2"
                >
                  {newTCheck ? (
                     <>Hide Creation Form <X size={12} /></>
                  ) : (
                     <><Plus size={12} /> Add New Client Review</>
                  )}
                </button>

                {newTCheck && (
                  <form onSubmit={handleAddTestimonial} className="space-y-3 z-20 pt-2 relative">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Client Full name</label>
                      <input 
                        type="text" 
                        required
                        value={newTName}
                        onChange={(e) => setNewTName(e.target.value)}
                        className="w-full border border-stone-200 text-xs px-3 py-2 text-stone-900"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Professional Role</label>
                        <input 
                          type="text" 
                          value={newTRole}
                          onChange={(e) => setNewTRole(e.target.value)}
                          className="w-full border border-stone-200 text-xs px-3 py-2 text-stone-900"
                          placeholder="e.g. Managing Director"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Company / Organization</label>
                        <input 
                          type="text" 
                          value={newTCompany}
                          onChange={(e) => setNewTCompany(e.target.value)}
                          className="w-full border border-stone-200 text-xs px-3 py-2 text-stone-900"
                          placeholder="e.g. Acme Uganda Ltd"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Verified Rating (Stars)</label>
                      <select 
                        value={newTStars}
                        onChange={(e) => setNewTStars(Number(e.target.value))}
                        className="w-full border border-stone-200 text-xs px-3 py-2 text-stone-900 bg-white"
                      >
                        <option value={5}>5 Stars (Excellent precision)</option>
                        <option value={4}>4 Stars (Very high standards)</option>
                        <option value={3}>3 Stars (Satisfactory)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Review Feedback</label>
                      <textarea 
                        rows={3}
                        required
                        value={newTText}
                        onChange={(e) => setNewTText(e.target.value)}
                        className="w-full border border-stone-200 text-xs px-3 py-2 text-stone-900 leading-relaxed font-light"
                        placeholder="Paste or write client review here..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full border-2 border-stone-900 bg-stone-900 text-white font-bold text-[10px] uppercase py-3 cursor-pointer hover:bg-stone-800"
                    >
                      Confirm insertion
                    </button>
                  </form>
                )}
              </div>

              {/* Array list mapping */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[2px] font-bold text-stone-900">Current Testimonials ({config.testimonials.length})</h4>
                <div className="space-y-3">
                  {config.testimonials.map((t, index) => (
                    <div key={index} className="p-4 border border-stone-150 rounded-xs flex items-start gap-4 justify-between hover:bg-stone-50/50 transition-colors">
                      <div className="space-y-1 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-display uppercase tracking-tight text-stone-900">{t.name}</span>
                          <span className="text-[9px] text-stone-400 font-mono">({t.stars} stars)</span>
                        </div>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">{t.role} — {t.company}</p>
                        <p className="text-xs text-stone-700 italic max-w-sm line-clamp-2">"{t.text}"</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteTestimonial(index)} 
                        className="text-stone-300 hover:text-red-500 p-1 bg-stone-50 hover:bg-red-50 hover:border-red-100 border border-transparent self-start transition-colors"
                        title="Delete testimony"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Team Members admin customized */}
          {activeTab === "team" && (
            <div className="space-y-8">
              <div className="bg-stone-50 p-4 border border-stone-200/50 rounded-xs">
                <p className="text-[10px] uppercase font-bold text-stone-700 tracking-wide">Executive Management Team Board</p>
                <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                  Customize executive names, corporate roles, and upload professional high-resolution leadership profiles from your local device. Updates propagate to the About Us page instantly and store securely in the database.
                </p>
              </div>

              <div className="space-y-6">
                {(config.team || []).map((member, index) => {
                  const isCustomBase64 = member.image?.startsWith("data:image/");
                  return (
                    <div key={index} className="p-5 border border-stone-200 bg-white rounded-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="text-xs uppercase font-black tracking-wider text-stone-900">
                          Partner #{index + 1}: {member.name || `Member ${index + 1}`}
                        </span>
                        {isCustomBase64 && (
                          <span className="text-[8px] text-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold uppercase rounded-full">Custom Image Active</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Full Name</label>
                          <input 
                            type="text" 
                            value={member.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((prev) => {
                                const newT = [...prev.team];
                                newT[index] = { ...newT[index], name: val };
                                return { ...prev, team: newT };
                              });
                            }}
                            className="w-full border border-stone-200 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 outline-none"
                            placeholder="Executive Name"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Corporate Role</label>
                          <input 
                            type="text" 
                            value={member.role}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateConfig((prev) => {
                                const newT = [...prev.team];
                                newT[index] = { ...newT[index], role: val };
                                return { ...prev, team: newT };
                              });
                            }}
                            className="w-full border border-stone-200 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 outline-none"
                            placeholder="e.g. Managing Director"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Professional Credentials & Bio</label>
                        <textarea 
                          rows={2}
                          value={member.desc}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((prev) => {
                              const newT = [...prev.team];
                              newT[index] = { ...newT[index], desc: val };
                              return { ...prev, team: newT };
                            });
                          }}
                          className="w-full border border-stone-200 px-3 py-2 text-xs text-stone-900 leading-relaxed font-light focus:border-stone-900 outline-none"
                          placeholder="Brief biography..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Profile Photograph</label>
                        <div className="flex gap-4 items-center">
                          {/* Thumbnail */}
                          <div className="w-16 h-20 min-w-[4rem] border border-stone-250 bg-stone-50 p-0.5 flex items-center justify-center overflow-hidden rounded-xs shadow-inner">
                            <img src={member.image} className="w-full h-full object-cover" alt="Profile Thumbnail" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex-grow space-y-1.5">
                            <input 
                              type="text" 
                              value={member.image}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((prev) => {
                                  const newT = [...prev.team];
                                  newT[index] = { ...newT[index], image: val };
                                  return { ...prev, team: newT };
                                });
                              }}
                              className="w-full border border-stone-200 px-3 py-1 text-[10px] text-stone-600 outline-none focus:border-stone-950 font-mono rounded-xs"
                              placeholder="Direct photo asset URI"
                            />
                            
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] text-stone-400 font-light">PNG, JPG, SVG or WEBP (Max 4MB)</span>
                              <label className="border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold cursor-pointer transition-all flex items-center gap-1">
                                <Upload size={10} />
                                <span>Upload Device Photo</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => handleTeamImageUpload(e, index)} 
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 text-center">
          <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">
             Live Updates Connected • LocalStorage Persistent Store
          </p>
        </div>

      </div>
    </div>
  );
}
