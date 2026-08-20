import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Search, BrainCircuit, Network, Zap, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Data for the Knowledge Graph
const NODES = [
  { id: 'knowledge', label: 'Knowledge', x: 50, y: 50, size: 80, connections: ['research', 'documents', 'ideas'] },
  { id: 'research', label: 'Research', x: 20, y: 30, size: 60, connections: ['knowledge', 'people', 'projects'] },
  { id: 'documents', label: 'Documents', x: 80, y: 25, size: 65, connections: ['knowledge', 'insights'] },
  { id: 'people', label: 'People', x: 15, y: 70, size: 55, connections: ['research', 'ideas'] },
  { id: 'ideas', label: 'Ideas', x: 45, y: 85, size: 70, connections: ['knowledge', 'people', 'projects'] },
  { id: 'projects', label: 'Projects', x: 85, y: 75, size: 75, connections: ['research', 'ideas', 'insights'] },
  { id: 'insights', label: 'Insights', x: 90, y: 45, size: 60, connections: ['documents', 'projects'] },
];

const KnowledgeGraph = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulatingSearch, setIsSimulatingSearch] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  
  const containerRef = useRef(null);

  // Simulated search interaction
  useEffect(() => {
    if (isSimulatingSearch) {
      const text = "How are my projects connected?";
      let i = 0;
      setSearchQuery('');
      
      const interval = setInterval(() => {
        setSearchQuery((prev) => prev + text[i]);
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setHighlightedNodes(['projects', 'research', 'ideas', 'insights']);
            setTimeout(() => {
              setIsSimulatingSearch(false);
              setSearchQuery('');
              setHighlightedNodes([]);
            }, 4000);
          }, 500);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isSimulatingSearch]);

  const handleSimulateSearch = () => {
    if (!isSimulatingSearch) {
      setIsSimulatingSearch(true);
      setActiveNode(null);
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden" ref={containerRef}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Search Bar Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-cyan-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl leading-5 bg-black/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            placeholder="Ask Nexus anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            readOnly={isSimulatingSearch}
          />
          {!isSimulatingSearch && (
            <button 
              onClick={handleSimulateSearch}
              className="absolute inset-y-1 right-1 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-colors"
            >
              Simulate
            </button>
          )}
        </div>
      </div>

      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {NODES.map((node) => 
          node.connections.map(connId => {
            const targetNode = NODES.find(n => n.id === connId);
            if (!targetNode) return null;
            // To prevent double drawing, only draw if id < connId
            if (node.id > targetNode.id) return null;
            
            const isHighlighted = highlightedNodes.includes(node.id) && highlightedNodes.includes(targetNode.id);
            const isActive = activeNode === node.id || activeNode === targetNode.id;
            
            return (
              <motion.line
                key={`${node.id}-${targetNode.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke={isHighlighted ? "#00e5ff" : isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
                strokeWidth={isHighlighted ? 3 : isActive ? 2 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="transition-all duration-300"
                style={{
                  filter: isHighlighted ? 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' : 'none'
                }}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 z-10">
        {NODES.map((node) => {
          const isHighlighted = highlightedNodes.length > 0 && highlightedNodes.includes(node.id);
          const isDimmed = highlightedNodes.length > 0 && !highlightedNodes.includes(node.id);
          const isActive = activeNode === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center justify-center group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{ 
                y: [0, -10, 0], 
                x: [0, 5, 0] 
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
              onClick={() => setActiveNode(isActive ? null : node.id)}
            >
              <div 
                className={cn(
                  "relative flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
                  isHighlighted ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.4)] border-2" : 
                  isActive ? "bg-white/20 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] border-2" : 
                  isDimmed ? "bg-white/5 border-white/10 opacity-30 border" : "bg-black/60 border-white/30 hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] border"
                )}
                style={{ width: node.size, height: node.size }}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isHighlighted ? "bg-cyan-400 shadow-[0_0_10px_#00e5ff]" : isActive ? "bg-white shadow-[0_0_8px_#fff]" : "bg-white/50 group-hover:bg-white"
                )} />
              </div>
              <span className={cn(
                "mt-3 text-sm font-medium tracking-wide transition-colors duration-300",
                isHighlighted ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" : isActive ? "text-white" : isDimmed ? "text-white/30" : "text-white/70 group-hover:text-white"
              )}>
                {node.label}
              </span>

              {/* Info Panel Popup */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-6 w-48 bg-black/90 border border-white/20 rounded-xl p-4 shadow-2xl backdrop-blur-xl z-30"
                  >
                    <h4 className="text-white font-semibold mb-1">{node.label}</h4>
                    <p className="text-gray-400 text-xs mb-3">
                      {node.connections.length} connected entities. Explore semantic relationships and insights.
                    </p>
                    <button className="text-cyan-400 text-xs font-medium flex items-center hover:text-cyan-300 transition-colors">
                      Explore Node <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Network className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Platform</a>
            <a href="#solutions" className="text-sm text-gray-300 hover:text-white transition-colors">Solutions</a>
            <a href="#resources" className="text-sm text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm text-white font-medium hover:text-cyan-400 transition-colors">Sign In</a>
            <a href="#" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-cyan-50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              Book Demo
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg">
            <a href="#features" className="text-white border-b border-white/10 pb-4">Platform</a>
            <a href="#solutions" className="text-white border-b border-white/10 pb-4">Solutions</a>
            <a href="#resources" className="text-white border-b border-white/10 pb-4">Resources</a>
            <a href="#pricing" className="text-white border-b border-white/10 pb-4">Pricing</a>
            <div className="flex flex-col gap-4 mt-4">
              <a href="#" className="text-center py-3 text-white font-medium bg-white/5 rounded-xl">Sign In</a>
              <a href="#" className="text-center py-3 bg-white text-black font-semibold rounded-xl">Book Demo</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                Nexus Graph Engine v2.0
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Your knowledge, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">connected.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                Transform siloed information into a dynamic, intelligent ecosystem. Nexus uses advanced AI to visualize, connect, and synthesize your entire organization's intelligence in real-time.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#" className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  Start Building <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                  Explore Sandbox
                </a>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 lg:-mr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <KnowledgeGraph />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Nexus Connects - Features */}
      <section id="features" className="py-24 px-6 relative bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The architecture of insight</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Nexus doesn't just store files; it maps relationships, context, and meaning across your entire knowledge base.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Network className="w-6 h-6 text-cyan-400" />,
                title: "Semantic Mapping",
                desc: "Automatically maps implicit relationships between documents, conversations, and code without manual tagging."
              },
              {
                icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
                title: "Contextual AI",
                desc: "Asks questions and receives answers that cite sources directly from your interconnected graph."
              },
              {
                icon: <Search className="w-6 h-6 text-blue-400" />,
                title: "Spatial Discovery",
                desc: "Visually traverse your organization's memory to find insights that keyword searches miss."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insight Demonstration (Use Case) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent blur-3xl -z-10" />
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-gray-500 font-mono">nexus-terminal</div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs">You</span>
                  </div>
                  <div className="bg-white/5 rounded-xl rounded-tl-none p-4 text-sm text-gray-200">
                    Analyze the latest Q3 report against our Project Alpha roadmap. Are there risks?
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                    <Network className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-[#111] rounded-xl rounded-tl-none p-4 text-sm text-gray-300 border border-white/5 space-y-3">
                    <p>I found <span className="text-cyan-400 font-medium">3 intersecting nodes</span> between the Q3 Report and Project Alpha:</p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-400">
                      <li>Resource allocation in Q3 conflicts with Alpha's Phase 2 timeline.</li>
                      <li>Sarah Jenkins noted a dependency issue in a recent sync (Linked: Engineering Slack).</li>
                      <li>Budget constraints mentioned in the Q3 summary may impact the planned marketing push.</li>
                    </ul>
                    <div className="pt-2 border-t border-white/10 flex gap-2">
                      <span className="text-xs px-2 py-1 bg-white/5 rounded">View Graph</span>
                      <span className="text-xs px-2 py-1 bg-white/5 rounded">Generate Alert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Reason across your reality</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Nexus acts as a hyper-intelligent analyst that spans your tools. It doesn't just read documents; it understands the context of a Slack message relative to a GitHub commit and a Notion spec.
            </p>
            <ul className="space-y-4">
              {[
                "Connects to 50+ integrations instantly",
                "Maintains strict access controls and permissions",
                "Continuous background indexing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Zap className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to map your mind?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join the most innovative teams using Nexus to turn collective knowledge into a strategic advantage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get Started for Free <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#020202]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Network className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-bold">Nexus</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              The AI knowledge graph platform for modern teams. Stop searching, start knowing.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Graph Engine</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>© 2026 Nexus Platform Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
