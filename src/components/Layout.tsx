import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Menu, X, Phone, Mail, MapPin, 
  Linkedin, Facebook, Instagram, Twitter,
  ChevronUp, MessageCircle, ArrowRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "FAQ", href: "/faq" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center gap-8"
          >
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-4xl font-display font-black text-stone-900 tracking-[0.4em] flex items-center gap-4"
             >
                GRACE <span className="text-gold-gradient">NM</span>
             </motion.div>
             <div className="w-48 h-[1px] bg-stone-100 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gold-gradient w-1/2"
                />
             </div>
             <p className="text-[10px] text-stone-400 uppercase tracking-[4px] font-bold">Engineering Excellence</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="blueprint-bg absolute inset-0 pointer-events-none z-0" />
      <div className="grain" />
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] z-0 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] z-0 pointer-events-none" />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold-gradient z-60 origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 h-24 px-6 md:px-15 flex items-center justify-between border-b",
          isScrolled ? "bg-white/90 backdrop-blur-xl border-stone-200/50 shadow-sm h-20" : "bg-transparent border-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="text-2xl font-display font-black tracking-[6px] text-stone-900 group-hover:scale-105 transition-transform duration-500">
            GRACE <span className="text-gold-gradient">NM</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex gap-10 font-bold text-[10px] uppercase tracking-[3px]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "transition-all relative py-2 group",
                  location.pathname === item.href ? "text-gold-500" : "text-stone-400 hover:text-stone-900"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-gold-500 transition-all duration-300",
                  location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>
          <Link
            to="/quote"
            className="btn-gold !py-2.5 !px-6 !text-[9px] !tracking-[3px]"
          >
            REQUEST BRIEF
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-10 h-10 border border-stone-100 flex items-center justify-center text-stone-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { 
            clipPath: "inset(0% 0% 0% 0%)", 
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          },
          closed: { 
            clipPath: "inset(0% 0% 100% 0%)", 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        }}
        className="fixed inset-0 z-40 bg-white lg:hidden pointer-events-auto overflow-hidden h-screen"
      >
        <div className="absolute inset-0 blueprint-bg opacity-50" />
        <div className="flex flex-col items-center justify-center h-full gap-10 relative z-10 p-6">
          {navigation.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            >
              <Link
                to={item.href}
                className={cn(
                  "text-5xl font-display font-black text-stone-900 transition-all uppercase tracking-tighter italic hover:text-gold-500",
                  location.pathname === item.href && "text-gold-500"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: navigation.length * 0.05 + 0.3 }}
          >
            <Link
              to="/quote"
              className="btn-gold !text-lg !px-16 !py-6"
              onClick={() => setIsMenuOpen(false)}
            >
              GET QUOTE
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 pt-24 pb-12 px-6 md:px-15 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            <div className="space-y-8">
               <div className="text-2xl font-display font-black tracking-[4px] text-stone-900">
                  GRACE <span className="text-gold-500">NM</span>
               </div>
               <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                  A premier engineering consultancy and construction firm shaping the future of African architecture through innovation and precision.
               </p>
               <div className="flex gap-4">
                  {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:text-gold-500 hover:border-gold-500 transition-all">
                       <Icon size={18} />
                    </a>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] uppercase tracking-[4px] text-gold-500 font-bold">Solutions</h4>
               <ul className="space-y-4">
                  {["Building Construction", "Architectural Design", "Structural Engineering", "Project Management"].map(link => (
                    <li key={link}>
                       <Link to="/services" className="text-sm text-stone-400 hover:text-stone-900 transition-colors">{link}</Link>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] uppercase tracking-[4px] text-gold-500 font-bold">Company</h4>
               <ul className="space-y-4">
                  {["Our Story", "Portfolio", "Technical FAQ", "Get In Touch"].map(link => (
                    <li key={link}>
                       <Link to={link === "Our Story" ? "/about" : link === "Portfolio" ? "/projects" : link === "Technical FAQ" ? "/faq" : "/contact"} className="text-sm text-stone-400 hover:text-stone-900 transition-colors">{link}</Link>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] uppercase tracking-[4px] text-gold-500 font-bold">Newsletter</h4>
               <p className="text-sm text-stone-400">Subscribe to our monthly engineering digest.</p>
               <div className="flex">
                  <input type="email" placeholder="EMAIL" className="bg-white border border-stone-200 px-4 py-3 text-[10px] font-bold tracking-widest text-stone-900 outline-none focus:border-gold-500 flex-grow" />
                  <button className="bg-gold-500 text-white px-4 py-3 flex items-center justify-center hover:bg-stone-900 transition-colors">
                     <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                © 2024 GRACE NM Consultant & Construction Company PLC.
             </p>
             <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                <a href="#" className="hover:text-stone-900 transition-colors">Safety</a>
                <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-stone-900 transition-colors">ISO certified</a>
             </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-10 right-10 z-50 w-12 h-12 bg-white border border-stone-200 text-gold-500 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all shadow-lg"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
