import { motion } from "motion/react";
import { 
  ArrowRight, Calendar, User, 
  Search, Filter, Tag, 
  ExternalLink, MessageSquare, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Real Cost of Building in Uganda (2024)",
    excerpt: "A data-driven breakdown of standard construction costs, from materials to labor, in the current economic landscape.",
    category: "Market Insights",
    author: "Grace NM Research",
    date: "May 12, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "5 Modernist Architectural Trends Defining Kampala",
    excerpt: "Explore the shift towards biophilic design and smart glass technology in new East African developments.",
    category: "Design Trends",
    author: "Lead Architect",
    date: "April 28, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487958449913-d957d69046d3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "BIM: The Invisible Hero of Construction Savings",
    excerpt: "How Building Information Modeling is revolutionizing project timelines and reducing wastage on-site.",
    category: "Technology",
    author: "Engineering Team",
    date: "April 15, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
  }
];

export function Blog() {
  return (
    <div className="pt-32 pb-24 overflow-hidden bg-white">
      {/* Header */}
      <section className="px-6 md:px-12 mb-20 text-center space-y-6">
        <h4 className="text-gold-500 uppercase tracking-[0.4em] font-bold text-xs">Knowledge Center</h4>
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-stone-900">
          Engineering <span className="text-gold-gradient italic">Perspectives.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-stone-400 text-lg font-light leading-relaxed">
          Stay ahead of the curve with our insights on construction technology, architectural innovation, and the Ugandan real estate market.
        </p>
      </section>

      {/* Featured Search/Filter */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
           <div className="flex-grow bg-stone-50 border border-stone-200 flex items-center px-6 py-4 focus-within:border-gold-500/30 transition-all shadow-sm">
              <Search className="text-stone-300 mr-4" size={20} />
              <input type="text" placeholder="Search insights..." className="bg-transparent border-none outline-none w-full text-stone-900 placeholder:text-stone-300 uppercase tracking-widest text-xs font-bold" />
           </div>
           <div className="flex gap-4">
              <button className="px-8 py-4 bg-stone-50 border border-stone-200 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors shadow-sm">
                <Filter size={18} /> Filter
              </button>
           </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden mb-8 border border-stone-100 shadow-xl">
                 <img 
                   src={post.image} 
                   alt={post.title} 
                   className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                 />
                 <div className="absolute top-6 left-6 px-4 py-2 glass border-none bg-white text-[10px] uppercase font-black tracking-widest text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-lg">
                   {post.category}
                 </div>
              </div>
              
              <div className="space-y-4 flex-grow">
                 <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-black text-stone-300">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-gold-500" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-gold-500" /> {post.readTime}</span>
                 </div>
                 
                 <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-stone-900 hover:text-gold-500 transition-colors cursor-pointer leading-tight">
                    {post.title}
                 </h2>
                 
                 <p className="text-stone-400 leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                 </p>
              </div>

              <div className="pt-8 mt-auto flex items-center justify-between border-t border-stone-100">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold-gradient flex items-center justify-center text-white text-[10px] font-black">{post.author[0]}</div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">{post.author}</span>
                 </div>
                 <button className="text-gold-500 group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={20} />
                 </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-32 px-6">
         <div className="max-w-5xl mx-auto glass-gold border border-gold-500/10 bg-stone-50 p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
               <Tag className="w-full h-full rotate-45" />
            </div>
            
            <h2 className="text-4xl font-display font-black uppercase text-gold-gradient relative z-10">Subscribe to Engineering <span className="italic">Insight.</span></h2>
            <p className="text-stone-400 text-lg font-light max-w-xl mx-auto relative z-10">Get VIP access to our quarterly market reports and architectural lookbooks delivered direct to your inbox.</p>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="flex-grow bg-white border border-stone-200 px-6 py-4 outline-none focus:border-gold-500/50 transition-all font-mono text-xs uppercase tracking-widest text-gold-500 placeholder:text-stone-300 shadow-inner" 
               />
               <button className="px-10 py-4 bg-gold-gradient text-white font-black uppercase tracking-widest text-xs glow-gold shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0">Join Inner Circle</button>
            </div>
         </div>
      </section>
    </div>
  );
}
