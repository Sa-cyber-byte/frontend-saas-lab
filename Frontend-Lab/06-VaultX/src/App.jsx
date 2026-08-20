import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ShieldAlert, ShieldCheck, Activity, Terminal, Lock, Database, 
  Search, AlertTriangle, Eye, Server, Radio, ChevronRight, X, Scan
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Fictional Data ---
const metrics = [
  { label: 'Active Threats', value: '14', trend: '-2%', icon: AlertTriangle, color: 'text-cyber-orange' },
  { label: 'Systems Online', value: '2,481', trend: '99.9%', icon: Server, color: 'text-cyber-green' },
  { label: 'Risk Score', value: 'B+', trend: '+1', icon: Activity, color: 'text-cyber-green' },
  { label: 'Protected Assets', value: '8.4TB', trend: 'Secure', icon: Database, color: 'text-cyber-green' },
];

const mockThreats = [
  { id: 't1', type: 'Suspicious Login', severity: 'Medium', ip: '192.168.1.45', time: '14:22:11', status: 'Blocked', details: 'Multiple failed authentication attempts originating from untrusted region. Account temporarily locked.' },
  { id: 't2', type: 'Malware Signature', severity: 'High', ip: '10.0.0.2', time: '14:21:05', status: 'Quarantined', details: 'Heuristic analysis identified potential ransomware payload in email attachment. Process terminated and file quarantined.' },
  { id: 't3', type: 'DDoS Attempt', severity: 'High', ip: 'Multiple', time: '14:18:30', status: 'Mitigated', details: 'Sudden spike in UDP traffic detected. Traffic routed through scrubbing center. Mitigation successful.' },
  { id: 't4', type: 'Port Scan', severity: 'Low', ip: '172.16.0.50', time: '14:15:00', status: 'Logged', details: 'Sequential port probing detected. Source IP added to temporary watch list.' }
];

const features = [
  { title: 'Threat Monitoring', desc: 'Continuous 24/7 analysis of network traffic and user behavior to detect anomalies instantly.', icon: Eye },
  { title: 'Risk Intelligence', desc: 'Predictive modeling based on global threat data to preemptively harden your infrastructure.', icon: Activity },
  { title: 'Asset Protection', desc: 'Encrypted vaults and dynamic access controls ensuring your most critical data remains untouchable.', icon: Lock },
  { title: 'Incident Response', desc: 'Automated playbooks that execute instantly upon detection to neutralize threats before they spread.', icon: ShieldAlert },
  { title: 'Security Analytics', desc: 'Deep forensic capabilities with interactive timelines and root-cause analysis reports.', icon: Search },
];

export default function App() {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, detecting, analyzing, secured
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [detectedThreats, setDetectedThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);

  const startScan = () => {
    setScanState('scanning');
    setProgress(0);
    setLogs(['Initiating global security scan...']);
    setDetectedThreats([]);
    setSelectedThreat(null);
  };

  useEffect(() => {
    if (scanState === 'idle' || scanState === 'secured') return;

    let timer;
    if (scanState === 'scanning') {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 30) {
            setScanState('detecting');
            setLogs(l => [...l, 'Analyzing network traffic...', 'Checking signature databases...']);
            return p;
          }
          return p + 5;
        });
      }, 300);
    } else if (scanState === 'detecting') {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 60) {
            setScanState('analyzing');
            setLogs(l => [...l, 'Anomalies detected. Isolating processes...', 'Compiling threat reports...']);
            setDetectedThreats(mockThreats.slice(0, 2));
            return p;
          }
          return p + 5;
        });
      }, 300);
    } else if (scanState === 'analyzing') {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setScanState('secured');
            setLogs(l => [...l, 'Scan complete. All systems nominal.']);
            setDetectedThreats(mockThreats);
            return 100;
          }
          return p + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [scanState]);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-light font-mono selection:bg-cyber-green selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-cyber-gray bg-cyber-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyber-green font-bold text-xl tracking-wider">
            <Shield className="w-6 h-6" />
            <span>VAULT<span className="text-white">X</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#platform" className="hover:text-cyber-green transition-colors">Platform</a>
            <a href="#intelligence" className="hover:text-cyber-green transition-colors">Intelligence</a>
            <a href="#operations" className="hover:text-cyber-green transition-colors">Operations</a>
          </div>
          <button className="px-4 py-2 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all text-sm uppercase tracking-wide">
            Access Terminal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            Next-Gen Security <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-emerald-500">
              Command Center
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cyber-gray-300 max-w-2xl mx-auto mb-10 text-lg"
          >
            Military-grade threat intelligence and automated incident response. 
            Defend your digital assets with absolute precision.
          </motion.p>
          
          {/* Top Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div 
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-cyber-dark border border-cyber-gray p-4 rounded-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <m.icon className={cn("w-4 h-4", m.color)} />
                  <span className="text-xs text-gray-400 uppercase">{m.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-gray-500 mt-1">{m.trend}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Signature Interaction: Interactive Terminal/Scan */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-cyber-darker border border-cyber-gray rounded-lg overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-gray bg-[#111]">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Terminal className="w-4 h-4" />
                <span>vtx-core-process // root@vaultx</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
                <div className="w-3 h-3 rounded-full bg-cyber-orange"></div>
                <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[500px] min-h-[500px]">
              {/* Scan Status & Logs */}
              <div className="md:col-span-1 flex flex-col md:border-r border-b md:border-b-0 border-cyber-gray/30 md:pr-6 pb-6 md:pb-0 mb-6 md:mb-0">
                <div className="mb-6">
                  <h3 className="text-cyber-green text-sm uppercase mb-4 flex items-center gap-2">
                    <Radio className="w-4 h-4 animate-pulse" />
                    System Status
                  </h3>
                  
                  {scanState === 'idle' && (
                    <div className="text-center py-8">
                      <ShieldCheck className="w-16 h-16 text-cyber-green mx-auto mb-4 opacity-50" />
                      <p className="text-gray-400 text-sm mb-6">System currently monitoring passive streams. Run manual override scan for deep inspection.</p>
                      <button 
                        onClick={startScan}
                        className="w-full py-3 bg-cyber-green/10 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all flex items-center justify-center gap-2 uppercase text-sm font-bold"
                      >
                        <Scan className="w-4 h-4" />
                        Run Security Scan
                      </button>
                    </div>
                  )}

                  {scanState !== 'idle' && (
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="uppercase text-cyber-green">{scanState}...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-cyber-gray mb-6">
                        <motion.div 
                          className="h-full bg-cyber-green"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="bg-black p-3 h-48 overflow-y-auto font-mono text-xs text-gray-400">
                        {logs.map((log, i) => (
                          <div key={i} className="mb-1">
                            <span className="text-cyber-green mr-2">{'>'}</span>{log}
                          </div>
                        ))}
                      </div>

                      {scanState === 'secured' && (
                        <button 
                          onClick={startScan}
                          className="mt-4 w-full py-2 border border-cyber-gray hover:border-cyber-green text-gray-400 hover:text-cyber-green transition-all text-xs uppercase"
                        >
                          Rerun Scan
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Threat Display */}
              <div className="md:col-span-2 relative">
                <h3 className="text-white text-sm uppercase mb-4">Detected Anomalies</h3>
                
                {scanState === 'idle' ? (
                  <div className="h-full flex items-center justify-center text-gray-600 text-sm border border-dashed border-cyber-gray p-8 text-center">
                    Initiate scan to populate threat matrix.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {detectedThreats.map((threat, idx) => (
                        <motion.div
                          key={threat.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => setSelectedThreat(threat)}
                          className={cn(
                            "p-4 border cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between",
                            selectedThreat?.id === threat.id ? "border-cyber-green bg-cyber-green/5" : "border-cyber-gray bg-cyber-dark",
                            threat.severity === 'High' ? "border-l-4 border-l-cyber-red" : "border-l-4 border-l-cyber-orange"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            {threat.severity === 'High' ? (
                              <ShieldAlert className="w-5 h-5 text-cyber-red" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-cyber-orange" />
                            )}
                            <div>
                              <div className="text-white text-sm">{threat.type}</div>
                              <div className="text-xs text-gray-500">{threat.ip} • {threat.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-sm border",
                              threat.status === 'Quarantined' || threat.status === 'Blocked' 
                                ? "text-cyber-green border-cyber-green bg-cyber-green/10"
                                : "text-gray-400 border-gray-600"
                            )}>
                              {threat.status}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {detectedThreats.length === 0 && scanState !== 'idle' && scanState !== 'scanning' && (
                       <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
                         Analyzing streams...
                       </div>
                    )}
                  </div>
                )}

                {/* Threat Detail Overlay */}
                <AnimatePresence>
                  {selectedThreat && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-0 left-0 right-0 bg-cyber-dark border border-cyber-green shadow-[0_-10px_40px_rgba(0,0,0,0.8)] p-5"
                    >
                      <button 
                        onClick={() => setSelectedThreat(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 mb-4">
                        <Terminal className="w-4 h-4 text-cyber-green" />
                        <h4 className="text-cyber-green font-bold text-sm uppercase">Incident Report</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Vector</div>
                          <div className="text-white text-sm">{selectedThreat.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Source</div>
                          <div className="text-white text-sm">{selectedThreat.ip}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Analysis Log</div>
                        <p className="text-sm text-gray-300 leading-relaxed bg-black p-3 border border-cyber-gray font-mono text-xs">
                          {selectedThreat.details}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                         <button className="px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-cyber-gray hover:border-white transition-colors">Export Log</button>
                         <button className="px-3 py-1.5 text-xs text-black bg-cyber-green font-bold">Acknowledge</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-cyber-gray/30 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Tactical Capabilities</h2>
            <p className="text-gray-400 max-w-2xl">A comprehensive suite of defensive tools designed for modern cloud architectures and distributed workforces.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div key={f.title} className="p-6 border border-cyber-gray bg-cyber-black hover:border-cyber-green/50 transition-colors group">
                <f.icon className="w-8 h-8 text-cyber-gray-500 group-hover:text-cyber-green transition-colors mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-green/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-green/10 via-cyber-black to-cyber-black"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Shield className="w-16 h-16 text-cyber-green mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Secure Your Perimeter Today</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Deploy VaultX across your infrastructure in under 15 minutes. 
            Experience uncompromising security built for the modern edge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-cyber-green text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
              Deploy Now
            </button>
            <button className="px-8 py-4 border border-cyber-gray text-white font-bold uppercase tracking-wider hover:border-white transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyber-gray py-8 text-center text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-4 h-4" />
            <span>VaultX Security Systems © 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyber-light transition-colors">Terms</a>
            <a href="#" className="hover:text-cyber-light transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyber-light transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
