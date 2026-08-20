import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Battery, Factory, Wind, Zap, Activity, Leaf, Shield, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const EcoGridLogo = ({ className }) => (
  <div className={cn("flex items-center gap-2 font-bold text-xl tracking-tight", className)}>
    <Zap className="text-green-500" size={24} />
    <span>EcoGrid</span>
  </div>
);

const colorMap = {
  yellow: {
    active: "border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] text-yellow-500",
    ring: "border-yellow-500/50"
  },
  blue: {
    active: "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] text-blue-500",
    ring: "border-blue-500/50"
  },
  green: {
    active: "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] text-green-500",
    ring: "border-green-500/50"
  }
};

const Node = ({ type, position, isActive, color, icon: Icon, delay }) => {
  return (
    <motion.div
      className={cn(
        "absolute flex items-center justify-center rounded-full border-2 bg-background p-2 z-10 transition-colors duration-500",
        isActive ? colorMap[color].active : "border-slate-500/30 text-slate-500"
      )}
      style={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring" }}
    >
      <Icon size={24} />
      {isActive && (
        <motion.div
          className={cn("absolute -inset-1 rounded-full border", colorMap[color].ring)}
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

const Connection = ({ start, end, isActive, color }) => {
  // Simple straight line for demo
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={isActive ? `var(--color-${color}-500)` : "currentColor"}
        strokeWidth="2"
        strokeOpacity={isActive ? 0.6 : 0.1}
        className="transition-colors duration-500"
      />
      {isActive && (
        <motion.circle
          r="4"
          fill={`var(--color-${color}-400)`}
          animate={{
            cx: [start.x, end.x],
            cy: [start.y, end.y],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </svg>
  );
};


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [efficiency, setEfficiency] = useState(62);
  
  // Simulated stats based on efficiency
  const energySaved = Math.floor((efficiency / 100) * 1250); // MWh
  const carbonReduced = Math.floor((efficiency / 100) * 850); // Tons
  const costReduced = Math.floor((efficiency / 100) * 120); // $k

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-500 overflow-x-hidden",
      isDarkMode ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
    )}>
      {/* Background pattern */}
      <div className={cn(
        "fixed inset-0 z-0",
        isDarkMode ? "bg-grid-white/[0.02]" : "bg-grid-black/[0.02]"
      )} />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-border/50 backdrop-blur-sm">
        <EcoGridLogo />
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#platform" className="hover:text-green-500 transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-green-500 transition-colors">Solutions</a>
          <a href="#analytics" className="hover:text-green-500 transition-colors">Analytics</a>
          <a href="#resources" className="hover:text-green-500 transition-colors">Resources</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="px-4 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
            Request Demo
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Grid Intelligence v2.0 Live
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Powering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">clean energy</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
              Optimize grid performance, integrate renewables flawlessly, and track carbon metrics in real-time with our AI-driven climate intelligence platform.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-8 py-4 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                Start Optimizing
              </button>
              <button className={cn(
                "px-8 py-4 rounded-full font-semibold border-2 transition-colors",
                isDarkMode ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              )}>
                Explore Documentation
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-sm text-slate-500 mb-1">Trusted by</p>
                <p className="text-2xl font-bold">500+</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Energy Managed</p>
                <p className="text-2xl font-bold">45 GW</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Uptime</p>
                <p className="text-2xl font-bold">99.99%</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Signature Graphic */}
          <div className="relative h-[600px] w-full max-w-[600px] mx-auto perspective-1000">
            <div className={cn(
              "absolute inset-0 rounded-3xl border flex flex-col p-8 transition-colors duration-500",
              isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white/50 border-slate-200",
              "backdrop-blur-xl"
            )}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Activity size={20} className="text-green-500" />
                  Live Grid Simulation
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-500">{efficiency}%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Efficiency</div>
                </div>
              </div>

              {/* Visualization Area */}
              <div className="relative flex-grow my-4 bg-slate-950/20 rounded-2xl overflow-hidden border border-slate-200/10 dark:border-slate-700/30">
                {/* Simulated Grid Nodes & Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <Connection start={{x:'20%', y:'30%'}} end={{x:'50%', y:'50%'}} isActive={efficiency > 20} color="yellow" />
                  <Connection start={{x:'80%', y:'20%'}} end={{x:'50%', y:'50%'}} isActive={efficiency > 40} color="blue" />
                  <Connection start={{x:'20%', y:'80%'}} end={{x:'50%', y:'50%'}} isActive={efficiency > 60} color="green" />
                  <Connection start={{x:'50%', y:'50%'}} end={{x:'80%', y:'70%'}} isActive={efficiency > 80} color="green" />
                </svg>
                
                <Node type="solar" position={{ top: '30%', left: '20%', transform: 'translate(-50%, -50%)' }} isActive={efficiency > 20} color="yellow" icon={Sun} delay={0.1} />
                <Node type="wind" position={{ top: '20%', left: '80%', transform: 'translate(-50%, -50%)' }} isActive={efficiency > 40} color="blue" icon={Wind} delay={0.2} />
                <Node type="battery" position={{ top: '80%', left: '20%', transform: 'translate(-50%, -50%)' }} isActive={efficiency > 60} color="green" icon={Battery} delay={0.3} />
                <Node type="building" position={{ top: '70%', left: '80%', transform: 'translate(-50%, -50%)' }} isActive={efficiency > 80} color="green" icon={Factory} delay={0.4} />
                
                {/* Central Hub */}
                <Node type="hub" position={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} isActive={true} color="green" icon={Zap} delay={0.5} />
              </div>

              {/* Controls & Metrics */}
              <div className="mt-auto">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">System Optimization</span>
                    <span className="font-medium">{efficiency}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="99" 
                    value={efficiency} 
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Baseline</span>
                    <span>Max Performance</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className={cn("p-3 rounded-xl border text-center transition-colors", isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200")}>
                    <div className="text-xs text-slate-500 mb-1">Energy Saved</div>
                    <div className="font-bold text-green-500">{energySaved} <span className="text-[10px] font-normal">MWh</span></div>
                  </div>
                  <div className={cn("p-3 rounded-xl border text-center transition-colors", isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200")}>
                    <div className="text-xs text-slate-500 mb-1">CO₂ Reduced</div>
                    <div className="font-bold text-blue-500">{carbonReduced} <span className="text-[10px] font-normal">T</span></div>
                  </div>
                  <div className={cn("p-3 rounded-xl border text-center transition-colors", isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200")}>
                    <div className="text-xs text-slate-500 mb-1">Cost Saved</div>
                    <div className="font-bold text-yellow-500">${costReduced} <span className="text-[10px] font-normal">k</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Energy Intelligence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to manage modern energy infrastructure, from smart buildings to macro-grid scale deployments.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Sustainability Analytics', desc: 'Track scope 1, 2, and 3 emissions in real-time with automated reporting.' },
              { icon: Shield, title: 'Smart Buildings', desc: 'IoT integration for automated HVAC and lighting optimization based on occupancy.' },
              { icon: CheckCircle, title: 'Carbon Tracking', desc: 'Verifiable carbon offset matching and renewable energy certificate (REC) management.' }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-8 rounded-2xl border transition-colors",
                  isDarkMode ? "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60" : "bg-white border-slate-200 hover:bg-slate-50"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                  <feat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
