import React, { createContext, useContext, useState, useEffect } from "react";
import { getSupabase } from "../lib/supabase";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  company: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  desc: string;
  display_order: number;
}

export interface CustomizerConfig {
  themeColor: string;
  themeGradientStart: string;
  themeGradientMiddle: string;
  themeGradientEnd: string;
  buttonShape: "asymmetric" | "square" | "rounded" | "pill";
  headingFont: string;
  bodyFont: string;
  logoText: string;
  logoImage?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroPhone1: string;
  heroPhone2: string;
  heroEstSlogan: string;
  photos: {
    homeHero: string;
    homeAbout: string;
    aboutSection1: string;
    aboutSection2: string;
    servicesTop: string;
    servicesBottom: string;
    contactSection: string;
  };
  testimonials: Testimonial[];
  team: TeamMember[];
}

const DEFAULT_CONFIG: CustomizerConfig = {
  themeColor: "#C5A028",
  themeGradientStart: "#D4AF37",
  themeGradientMiddle: "#C5A028",
  themeGradientEnd: "#996515",
  buttonShape: "asymmetric",
  headingFont: "Space Grotesk",
  bodyFont: "Poppins",
  logoText: "Gracenm",
  logoImage: "",
  heroTitle: "Building Excellence. Delivering Trust.",
  heroSubtitle: "Gracenm Consultants & Construction Company Ltd provides professional construction, engineering, and consultancy services with a commitment to quality, innovation, and client satisfaction.",
  heroCtaPrimary: "Get a Quote",
  heroCtaSecondary: "Contact Us",
  heroPhone1: "+256 706 802 370",
  heroPhone2: "+256 762 632 154",
  heroEstSlogan: "EST. 2014 — BUILDING THE FUTURE WITH QUALITY & TRUST",
  photos: {
    homeHero: "/src/assets/images/modern_building_uganda_1779222673896.png",
    homeAbout: "/src/assets/images/construction_site_hero_1779222656099.png",
    aboutSection1: "/src/assets/images/modern_building_uganda_1779222673896.png",
    aboutSection2: "/src/assets/images/engineering_team_about_1779222690871.png",
    servicesTop: "/src/assets/images/construction_site_hero_1779222656099.png",
    servicesBottom: "/src/assets/images/architectural_render_3d_1779222706847.png",
    contactSection: "/src/assets/images/construction_crane_skyline_1779226263430.png",
  },
  testimonials: [
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
  ],
  team: [
    { 
      name: "Miruts Tesfaye Gebrekidan", 
      role: "Managing Director", 
      image: "/src/assets/images/miruts_gebrekidan_1781614046333.jpg",
      desc: "Exemplary leader steering the firm with strong governance, strategic foresight, and over 15 years of industry excellence.",
      display_order: 1
    },
    { 
      name: "Tsega Tadesse Hagos", 
      role: "Technical Director", 
      image: "/src/assets/images/tsega_hagos_1781614065993.jpg",
      desc: "Meticulous engineering authority directing complex project designs, feasibility evaluations, and BIM twin integration.",
      display_order: 2
    },
    { 
      name: "Musika Johnson", 
      role: "Chief Operations Officer", 
      image: "/src/assets/images/musika_johnson_1781614085015.jpg",
      desc: "Operations mastermind driving strict project timelines, resource optimization, and premium workmanship qualities on site.",
      display_order: 3
    }
  ]
};

interface CustomizerContextType {
  config: CustomizerConfig;
  updateConfig: (updater: (prev: CustomizerConfig) => CustomizerConfig) => void;
  updateSingleConfig: (key: keyof CustomizerConfig, value: any) => void;
  updatePhoto: (photoKey: keyof CustomizerConfig["photos"], url: string) => void;
  resetToDefault: () => void;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export function CustomizerProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CustomizerConfig>(() => {
    const saved = localStorage.getItem("gracenm_customizer_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure subproperties are integrated if they were missing
        return { ...DEFAULT_CONFIG, ...parsed, photos: { ...DEFAULT_CONFIG.photos, ...(parsed.photos || {}) } };
      } catch (e) {
        console.error("Failed to parse customizer config, using default", e);
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [adminOpen, setAdminOpen] = useState(false);

  // 1. Load settings from Supabase if active on startup
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const fetchSupabaseSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("config")
          .eq("id", "primary_settings")
          .single();

        if (error) {
          console.warn("Supabase load fallback (Table site_settings might be pending schema_sql execute):", error.message);
          return;
        }

        if (data && data.config) {
          setConfig(prev => ({
            ...prev,
            ...data.config,
            photos: { ...prev.photos, ...(data.config.photos || {}) }
          }));
        }
      } catch (err) {
        console.error("Failed to load settings from Supabase", err);
      }
    };

    fetchSupabaseSettings();
  }, []);

  // 2. Local persistence, live visual application and Supabase DB synchronizer
  useEffect(() => {
    localStorage.setItem("gracenm_customizer_config", JSON.stringify(config));
    applyThemeStyles(config);

    const supabase = getSupabase();
    if (!supabase) return;

    const saveTimeout = setTimeout(async () => {
      try {
        await supabase
          .from("site_settings")
          .upsert({ 
            id: "primary_settings", 
            config: config, 
            updated_at: new Date().toISOString() 
          });
      } catch (err) {
        console.error("Failed to sync branding customization to Supabase database", err);
      }
    }, 1000); // 1s debounce to avoid excessive database hitting during typing slider color inputs!

    return () => clearTimeout(saveTimeout);
  }, [config]);

  const updateConfig = (updater: (prev: CustomizerConfig) => CustomizerConfig) => {
    setConfig(prev => updater(prev));
  };

  const updateSingleConfig = (key: keyof CustomizerConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePhoto = (photoKey: keyof CustomizerConfig["photos"], url: string) => {
    setConfig(prev => ({
      ...prev,
      photos: {
        ...prev.photos,
        [photoKey]: url
      }
    }));
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to revert all customization to original defaults?")) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  return (
    <CustomizerContext.Provider value={{ config, updateConfig, updateSingleConfig, updatePhoto, resetToDefault, adminOpen, setAdminOpen }}>
      {children}
    </CustomizerContext.Provider>
  );
}

export function useCustomizer() {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error("useCustomizer must be used within a CustomizerProvider");
  }
  return context;
}

// Helper to inject fonts and set CSS variables dynamically on the document root
function applyThemeStyles(config: CustomizerConfig) {
  const root = document.documentElement;

  // 1. Set Primary Color Variables
  root.style.setProperty("--theme-primary", config.themeColor);
  root.style.setProperty("--theme-gradient-start", config.themeGradientStart);
  root.style.setProperty("--theme-gradient-middle", config.themeGradientMiddle);
  root.style.setProperty("--theme-gradient-end", config.themeGradientEnd);

  // 2. Map Button Shapes to CSS Border-Radius Variables
  let bttr = "1.5rem", bttl = "0", btbry = "0", btbl = "0";
  let cardRad = "0px";
  let friendlyRad = "0px";

  if (config.buttonShape === "square") {
    bttr = "0";
    bttl = "0";
    btbry = "0";
    btbl = "0";
    cardRad = "0px";
    friendlyRad = "0px";
  } else if (config.buttonShape === "rounded") {
    bttr = "0.75rem";
    bttl = "0.75rem";
    btbry = "0.75rem";
    btbl = "0.75rem";
    cardRad = "1rem";
    friendlyRad = "1rem";
  } else if (config.buttonShape === "pill") {
    bttr = "9999px";
    bttl = "9999px";
    btbry = "9999px";
    btbl = "9999px";
    cardRad = "1.5rem";
    friendlyRad = "1.5rem";
  }

  root.style.setProperty("--btn-radius-tr", bttr);
  root.style.setProperty("--btn-radius-tl", bttl);
  root.style.setProperty("--btn-radius-br", btbry);
  root.style.setProperty("--btn-radius-bl", btbl);
  root.style.setProperty("--card-radius", cardRad);
  root.style.setProperty("--friendly-card-radius", friendlyRad);

  // 3. Inject Selected Fonts Dynamically
  ensureGoogleFontLoaded(config.headingFont);
  ensureGoogleFontLoaded(config.bodyFont);

  root.style.setProperty("--font-display", `"${config.headingFont}", "Space Grotesk", sans-serif`);
  root.style.setProperty("--font-body", `"${config.bodyFont}", "Poppins", sans-serif`);
}

function ensureGoogleFontLoaded(fontFamily: string) {
  if (!fontFamily || ["Inter", "Poppins", "Space Grotesk", "Montserrat"].includes(fontFamily)) {
    return; // Already preloaded in index.html/index.css
  }
  
  const formattedFont = fontFamily.replace(/\s+/g, "+");
  const linkId = `gfont-${formattedFont.toLowerCase()}`;
  
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800;900&display=swap`;
    document.head.appendChild(link);
  }
}
