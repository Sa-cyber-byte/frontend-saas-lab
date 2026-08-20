import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BrainCircuit, Share2, Users, FileText, ArrowRight, Zap, CheckCircle2, ChevronRight, MessageSquare, Plus, Search, Sparkles } from 'lucide-react';

const sources = [
  { id: 1, title: 'Attention Is All You Need', type: 'Academic Paper', relevance: 'High', insight: 'Introduced the Transformer architecture, foundational for modern LLMs.', x: 10, y: 10 },
  { id: 2, title: 'GPT-4 Technical Report', type: 'Industry Report', relevance: 'Very High', insight: 'Details large-scale multimodal models and alignment methodologies.', x: 60, y: 15 },
  { id: 3, title: 'Scaling Laws for Neural Models', type: 'Research Article', relevance: 'Medium', insight: 'Demonstrates predictable improvement as model size and compute increase.', x: 20, y: 60 },
  { id: 4, title: 'Constitutional AI', type: 'Preprint', relevance: 'High', insight: 'Proposes methods for training AI systems to be helpful and harmless.', x: 70, y: 65 },
];

const App = () => {
  const [activeSource, setActiveSource] = useState(null);
  const [analysisState, setAnalysisState] = useState('idle'); // idle, collecting, connecting, patterns, insight
  
  const handleAnalyze = () => {
    if (analysisState !== 'idle') return;
    setAnalysisState('collecting');
    setTimeout(() => setAnalysisState('connecting'), 1500);
    setTimeout(() => setAnalysisState('patterns'), 3000);
    setTimeout(() => setAnalysisState('insight'), 4500);
    setTimeout(() => setAnalysisState('done'), 6000);
  };

  const getAnalysisMessage = () => {
    switch(analysisState) {
      case 'collecting': return 'Collecting sources...';
      case 'connecting': return 'Connecting evidence...';
      case 'patterns': return 'Finding patterns...';
      case 'insight': return 'Generating insight...';
      case 'done': return 'Analysis Complete';
      default: return 'Analyze Research';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e0e0e0] font-sans selection:bg-[#3b82f6] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-500" />
            <span className="font-semibold text-lg tracking-tight">Synapse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#80808a]">
            <a href="#canvas" className="hover:text-[#e0e0e0] transition-colors">Workspace</a>
            <a href="#features" className="hover:text-[#e0e0e0] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#e0e0e0] transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-white transition-colors">Log in</button>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="canvas" className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Introducing the Interactive Research Canvas</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            Synthesize knowledge <br className="hidden md:block"/> at the speed of thought.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#80808a] leading-relaxed"
          >
            Connect evidence, discover patterns, and generate profound insights with the AI-native workspace for researchers and thinkers.
          </motion.p>
        </div>

        {/* Interactive Canvas */}
        <div className="flex-grow bg-[#131316] rounded-2xl border border-[#232328] overflow-hidden relative shadow-2xl shadow-blue-900/10">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjV2MWg0MHYtMXptMzkuNS0zOS41aDF2NDBoLTF6IiBmaWxsPSIjMjMyMzI4Ii8+PC9zdmc+')] opacity-50"></div>
          
          <div className="absolute top-6 left-6 z-20">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Search className="w-5 h-5 text-[#80808a]" />
              Research Query: "Evolution of Large Language Models"
            </h3>
          </div>

          <div className="absolute top-6 right-6 z-20">
            <button 
              onClick={handleAnalyze}
              disabled={analysisState !== 'idle' && analysisState !== 'done'}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 disabled:opacity-75 disabled:cursor-wait"
            >
              {analysisState === 'idle' || analysisState === 'done' ? <Zap className="w-4 h-4" /> : <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><BrainCircuit className="w-4 h-4" /></motion.div>}
              {getAnalysisMessage()}
            </button>
          </div>

          {/* Connection Lines (Simulated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <AnimatePresence>
              {analysisState !== 'idle' && (
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: analysisState === 'done' ? 1 : 0.8, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  d="M 150 150 Q 300 200 450 150 T 750 250"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-50"
                />
              )}
            </AnimatePresence>
          </svg>

          {/* Source Cards */}
          <div className="absolute inset-0 p-12">
            {sources.map((source) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: activeSource?.id === source.id ? 1.05 : 1,
                  boxShadow: activeSource?.id === source.id ? '0 0 0 2px #3b82f6' : '0 1px 3px rgba(0,0,0,0.5)',
                  y: analysisState === 'collecting' ? -5 : 0,
                }}
                className="absolute bg-[#1a1a1f] border border-[#232328] p-4 rounded-xl cursor-pointer hover:border-[#3b82f6] transition-colors w-64 z-10"
                style={{ left: `${source.x}%`, top: `${source.y}%` }}
                onClick={() => setActiveSource(activeSource?.id === source.id ? null : source)}
              >
                <div className="flex items-center gap-2 text-xs text-[#80808a] mb-2 uppercase tracking-wider font-semibold">
                  <FileText className="w-3 h-3" /> {source.type}
                </div>
                <h4 className="font-medium text-sm mb-1 leading-snug">{source.title}</h4>
                <AnimatePresence>
                  {activeSource?.id === source.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-[#232328] text-xs overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#80808a]">Relevance:</span>
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{source.relevance}</span>
                      </div>
                      <p className="text-[#e0e0e0] leading-relaxed">
                        {source.insight}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Central Insight Modal */}
          <AnimatePresence>
            {analysisState === 'done' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1f] border-2 border-blue-500/30 p-6 rounded-2xl w-[90%] max-w-lg shadow-2xl z-30 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 text-blue-400 mb-4 font-medium">
                  <Sparkles className="w-5 h-5" />
                  Generated Insight
                </div>
                <h3 className="text-xl font-semibold mb-3">The Scaling Hypothesis Validated</h3>
                <p className="text-[#a0a0ab] text-sm leading-relaxed mb-4">
                  Synthesis of foundational papers and empirical reports indicates that predictable scaling laws govern model capability. Aligning these models via Constitutional AI approaches scales similarly, providing a pathway to advanced, controllable systems.
                </p>
                <button 
                  onClick={() => setAnalysisState('idle')}
                  className="w-full bg-[#232328] hover:bg-[#2d2d34] text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Save to Knowledge Base
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#131316] border-t border-[#232328]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">A complete workflow for deep work.</h2>
            <p className="text-[#80808a] max-w-2xl text-lg">Synapse integrates analysis, connection, and citation into a single frictionless environment.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-[#232328]">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Synthesis</h3>
              <p className="text-[#80808a] leading-relaxed">
                Automatically extract key claims, methodologies, and findings from your library of PDFs and articles.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-[#232328]">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Knowledge Graph</h3>
              <p className="text-[#80808a] leading-relaxed">
                Visualize connections between disparate pieces of research. Uncover implicit relationships hidden in your data.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-[#232328]">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Citations</h3>
              <p className="text-[#80808a] leading-relaxed">
                Seamlessly generate citations and bibliographies. Synapse formats and verifies your references instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-24 px-6 border-t border-[#232328]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 leading-tight">Collaborate with brilliance.</h2>
            <p className="text-[#80808a] text-lg mb-8 leading-relaxed">
              Research is rarely a solo endeavor. Share your canvases, debate findings with inline comments, and build a collective intelligence engine with your team.
            </p>
            <ul className="space-y-4">
              {['Real-time multiplayer editing', 'Granular permission controls', 'Version history & snapshots'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#e0e0e0]">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-[#131316] p-8 rounded-2xl border border-[#232328]">
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-[#1a1a1f] border border-[#232328]">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shrink-0">DR</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">Dr. Roberts</span>
                    <span className="text-xs text-[#80808a]">2 mins ago</span>
                  </div>
                  <p className="text-sm text-[#a0a0ab]">I think we should cross-reference this with the latest alignment benchmarks.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-[#1a1a1f] border border-[#232328] ml-8">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white shrink-0">AS</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">Alex S.</span>
                    <span className="text-xs text-[#80808a]">Just now</span>
                  </div>
                  <p className="text-sm text-[#a0a0ab]">Good call. I've added the new dataset to the canvas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#131316] to-[#0a0a0c] border-t border-[#232328]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to elevate your research?</h2>
          <p className="text-xl text-[#80808a] mb-10 max-w-2xl mx-auto">
            Join thousands of academics, analysts, and researchers building the future of knowledge work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto bg-[#1a1a1f] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#232328] border border-[#232328] transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#232328] text-center text-sm text-[#80808a]">
        <p>&copy; 2026 Synapse Technologies, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
