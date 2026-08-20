import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Activity, Shield, Crosshair, BarChart, ArrowRight, Zap, Target, Lock } from 'lucide-react';

const locations = [
  { id: 'amazon', name: 'Amazon Rainforest', lat: -3.4, lng: -62.2, desc: 'Deforestation tracking zone' },
  { id: 'sahara', name: 'Sahara Desert', lat: 23.4, lng: 12.8, desc: 'Desertification boundary monitoring' },
  { id: 'arctic', name: 'Arctic Ice Shelf', lat: 75.2, lng: -45.0, desc: 'Ice mass depletion tracking' }
];

const timelineYears = [2022, 2023, 2024, 2025, 2026];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState(2026);
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const loc = locations.find(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (loc) {
      setSelectedLocation(loc);
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }
  };

  const yearIndex = timelineYears.indexOf(year);
  const degradationLevel = yearIndex / (timelineYears.length - 1); // 0 to 1

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-blue-900 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold tracking-wider">
            <Globe className="text-blue-500" />
            <span>ORBIT</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="#platform" className="hover:text-white transition">Platform</a>
            <a href="#solutions" className="hover:text-white transition">Solutions</a>
            <a href="#analytics" className="hover:text-white transition">Analytics</a>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition">
            Request Access
          </button>
        </div>
      </nav>

      {/* Hero Section with Interactive Earth */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Planetary Scale <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Intelligence
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-8 max-w-lg"
            >
              Monitor critical assets, track environmental changes, and analyze global patterns with high-fidelity simulated geospatial data.
            </motion.p>
            
            {/* Search Simulation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 relative max-w-md"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search location (e.g., 'Amazon Rainforest')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Interactive Earth Visualization */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* The Earth */}
            <motion.div 
              className="relative w-80 h-80 md:w-96 md:h-96 rounded-full shadow-[0_0_100px_rgba(59,130,246,0.3)] bg-gradient-to-br from-blue-900 to-black border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
              animate={selectedLocation ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Simulated continents/map patterns */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #10b981 0%, transparent 40%)',
                  filter: `hue-rotate(${degradationLevel * 60}deg) brightness(${1 - degradationLevel * 0.3})`
                }}
              />
              
              {/* Grid overlay for scientific look */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full" />

              {/* Atmosphere Glow inner */}
              <div className="absolute inset-0 rounded-full shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.8)]" />

              {/* Satellite Orbit Line */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-20%] right-[-20%] bottom-[-20%] border border-dashed border-white/20 rounded-full"
              >
                {/* Satellite */}
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]" />
              </motion.div>

              {/* Location Marker */}
              <AnimatePresence>
                {selectedLocation && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-1/3 left-1/2 w-4 h-4 -ml-2 -mt-2 z-30"
                  >
                    <div className="w-full h-full bg-red-500 rounded-full" />
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scan Animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div 
                    initial={{ top: '-10%', opacity: 1 }}
                    animate={{ top: '110%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)] z-20"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info Panel when Location Selected */}
            <AnimatePresence>
              {selectedLocation && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 20, x: 0 }}
                  className="absolute z-30 md:-right-8 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 bottom-4 md:bottom-auto md:top-1/4 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl w-[90%] md:w-72 shadow-2xl"
                >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">{selectedLocation.name}</h3>
                  <button onClick={() => setSelectedLocation(null)} className="text-gray-500 hover:text-white">&times;</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Status</div>
                    <div className="text-sm font-mono text-green-400">Monitoring Active</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Coordinates</div>
                    <div className="text-sm font-mono">{selectedLocation.lat}°, {selectedLocation.lng}°</div>
                  </div>
                  
                  {/* Timeline Interaction */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-gray-400 uppercase mb-2">Timeline Analysis</div>
                    <input 
                      type="range" 
                      min={0} 
                      max={timelineYears.length - 1} 
                      value={yearIndex}
                      onChange={(e) => setYear(timelineYears[e.target.value])}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs font-mono mt-1 text-gray-400">
                      <span>2022</span>
                      <span className="text-white font-bold">{year}</span>
                      <span>2026</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded">
                    <div className="text-xs text-gray-400">Vegetation Index ({year})</div>
                    <div className="h-2 bg-gray-800 rounded mt-1 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-red-500"
                        animate={{ width: `${100 - (degradationLevel * 60)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="solutions" className="py-24 relative z-10 bg-black/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Geospatial Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Leverage persistent global monitoring and advanced analytics to make decisions with confidence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-6 h-6 text-blue-400" />}
              title="Change Detection"
              desc="Automated algorithms highlight significant topological and infrastructural changes over time."
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-green-400" />}
              title="Environmental Intelligence"
              desc="Track deforestation, water body depletion, and urban expansion with multi-spectral analysis."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title="Location Monitoring"
              desc="Set geofences and receive immediate alerts when unexpected activity is detected."
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 bg-gradient-to-b from-black to-blue-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <BarChart className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Actionable Analytics Dashboard</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Go beyond raw pixels. Orbit processes massive volumes of satellite imagery to extract structured data, delivering insights directly to your workflows.
            </p>
            <ul className="space-y-4">
              {['Automated feature extraction', 'Historical comparative analysis', 'Predictive modeling algorithms'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_100%)]" />
              <div className="grid grid-cols-2 gap-4 p-6 w-full h-full relative z-10">
                <div className="bg-black/50 rounded-lg p-4 border border-white/5 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 uppercase">Coverage Area</span>
                  <span className="text-2xl font-mono">14.2M <span className="text-sm text-gray-500">km²</span></span>
                </div>
                <div className="bg-black/50 rounded-lg p-4 border border-white/5 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 uppercase">Anomalies Detected</span>
                  <span className="text-2xl font-mono text-red-400">842</span>
                </div>
                <div className="col-span-2 bg-black/50 rounded-lg p-4 border border-white/5">
                  <span className="text-xs text-gray-500 uppercase mb-4 block">Activity Index</span>
                  <div className="h-16 flex items-end gap-2">
                    {[40, 25, 60, 45, 80, 55, 90, 70, 65, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500/50 hover:bg-blue-400 transition-colors rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative text-center px-6">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to expand your perspective?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Join leading organizations using Orbit to monitor global assets and track changes in near real-time.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Request Enterprise Demo
          </button>
        </div>
      </section>

      <footer className="py-8 border-t border-white/10 text-center text-gray-600 text-sm">
        <p>© 2026 Orbit Geospatial Intelligence. Simulated for demonstration.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/[0.07] transition cursor-default group">
      <div className="mb-6 bg-black/50 w-12 h-12 flex items-center justify-center rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
