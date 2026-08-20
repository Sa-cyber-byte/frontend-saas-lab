import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, Settings, Database, Activity, Code, Cpu, LineChart, 
  ChevronRight, Play, CheckCircle2, Circle, Clock, Zap, Target, ArrowRight, Pause, Layers
} from 'lucide-react';

const AGENTS = [
  { id: 'research', name: 'Research Agent', role: 'Information Retrieval', task: 'Web scraping & data aggregation', time: '1.2s', tokens: 1450, icon: <Database className="w-5 h-5" /> },
  { id: 'analysis', name: 'Analysis Agent', role: 'Data Processing', task: 'Pattern recognition & synthesis', time: '2.4s', tokens: 3200, icon: <Network className="w-5 h-5" /> },
  { id: 'writer', name: 'Writer Agent', role: 'Content Generation', task: 'Drafting structured response', time: '3.1s', tokens: 2800, icon: <Code className="w-5 h-5" /> },
  { id: 'reviewer', name: 'Reviewer Agent', role: 'Quality Assurance', task: 'Fact-checking & refinement', time: '1.8s', tokens: 1100, icon: <Target className="w-5 h-5" /> },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('orchestration');
  const [executionState, setExecutionState] = useState('IDLE'); // IDLE, RUNNING, COMPLETED
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);

  useEffect(() => {
    let timer;
    if (executionState === 'RUNNING') {
      if (currentStep < AGENTS.length - 1) {
        timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setSelectedAgent(AGENTS[currentStep + 1]);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setExecutionState('COMPLETED');
          setCurrentStep(AGENTS.length);
        }, 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [executionState, currentStep]);

  const handleExecute = () => {
    if (executionState === 'RUNNING') {
      setExecutionState('IDLE');
      setCurrentStep(-1);
    } else {
      setExecutionState('RUNNING');
      setCurrentStep(0);
      setSelectedAgent(AGENTS[0]);
    }
  };

  const resetExecution = () => {
    setExecutionState('IDLE');
    setCurrentStep(-1);
    setSelectedAgent(AGENTS[0]);
  };

  const getAgentStatus = (index) => {
    if (currentStep > index) return 'COMPLETED';
    if (currentStep === index) return 'RUNNING';
    return 'IDLE';
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-white font-semibold text-lg tracking-wide">AgentOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#workflows" className="hover:text-white transition-colors">Workflows</a>
            <a href="#memory" className="hover:text-white transition-colors">Memory</a>
            <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
          </div>
          <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-slate-200 transition-colors">
            Deploy Network
          </button>
        </div>
      </nav>

      {/* Hero Section with Interactive Graph */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
              <Activity className="w-3.5 h-3.5" />
              <span>v2.0 Autonomous Engine Live</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              Orchestrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Multi-Agent</span> Systems
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
              Build, deploy, and monitor complex autonomous workflows. AgentOS provides the infrastructure for specialized AI agents to collaborate and execute complex tasks seamlessly.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                Start Building
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          {/* Interactive Agent Graph */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-medium">Task Execution Network</h3>
                <p className="text-xs text-slate-500 mt-1">Status: <span className={
                  executionState === 'RUNNING' ? 'text-indigo-400' : 
                  executionState === 'COMPLETED' ? 'text-emerald-400' : 'text-slate-400'
                }>{executionState}</span></p>
              </div>
              <div className="flex items-center gap-3">
                {executionState === 'COMPLETED' && (
                  <button onClick={resetExecution} className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-white/5 rounded-md transition-colors">
                    Reset
                  </button>
                )}
                <button 
                  onClick={handleExecute}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    executionState === 'RUNNING' 
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30'
                  }`}
                >
                  {executionState === 'RUNNING' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {executionState === 'RUNNING' ? 'Halt Execution' : 'Execute Task'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Connecting Lines */}
              <div className="hidden sm:block absolute top-1/4 left-1/4 w-1/2 h-1/2 border-t-2 border-l-2 border-white/10 rounded-tl-xl -z-10" />
              <div className="hidden sm:block absolute bottom-1/4 left-1/4 w-1/2 h-1/2 border-b-2 border-r-2 border-white/10 rounded-br-xl -z-10" />

              {AGENTS.map((agent, idx) => {
                const status = getAgentStatus(idx);
                const isSelected = selectedAgent.id === agent.id;
                
                return (
                  <motion.div 
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected ? 'bg-white/10 border-white/20' : 'bg-black/50 border-white/5 hover:border-white/10'
                    }`}
                    animate={{
                      scale: status === 'RUNNING' ? [1, 1.02, 1] : 1,
                      boxShadow: status === 'RUNNING' ? '0 0 20px rgba(99, 102, 241, 0.2)' : 'none'
                    }}
                    transition={{ repeat: status === 'RUNNING' ? Infinity : 0, duration: 1.5 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                        status === 'RUNNING' ? 'bg-indigo-500/20 text-indigo-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {agent.icon}
                      </div>
                      {status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                       status === 'RUNNING' ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><Settings className="w-5 h-5 text-indigo-400" /></motion.div> :
                       <Circle className="w-5 h-5 text-slate-600" />}
                    </div>
                    <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{agent.role}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Agent Details Panel */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedAgent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 bg-slate-900/80 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    {selectedAgent.icon}
                    <h4 className="text-white font-medium">{selectedAgent.name}</h4>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getAgentStatus(AGENTS.findIndex(a => a.id === selectedAgent.id)) === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                    getAgentStatus(AGENTS.findIndex(a => a.id === selectedAgent.id)) === 'RUNNING' ? 'bg-indigo-500/20 text-indigo-400' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {getAgentStatus(AGENTS.findIndex(a => a.id === selectedAgent.id))}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Current Task</p>
                    <p className="text-sm text-slate-300">{selectedAgent.task}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Performance</p>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500"/> {selectedAgent.time}</div>
                      <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-slate-500"/> {selectedAgent.tokens} tok</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* Features/Sections */}
      <section className="py-24 bg-black/50 border-y border-white/5" id="platform">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Agent Infrastructure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to build, deploy, and scale multi-agent systems in production.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Orchestration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Define complex DAG workflows for your agents. Handle state transitions, error recovery, and conditional routing automatically.
              </p>
            </div>
            
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Long-term Memory</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vector databases and semantic search built-in. Give your agents context that persists across sessions and tasks.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Custom Tools</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Equip agents with APIs, DB access, or custom scripts. Standardized interfaces for safe and monitored tool execution.
              </p>
            </div>
            
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Execution Logs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Trace every decision, tool call, and state change. Full observability into your multi-agent network for easy debugging.
              </p>
            </div>
            
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agent Workflows</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Pre-built templates for common patterns: researcher-writer, map-reduce, hierarchical task delegation, and more.
              </p>
            </div>
            
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Analytics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Track token usage, execution latency, success rates, and cost per task across all your autonomous systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to deploy autonomous systems?</h2>
          <p className="text-xl text-slate-400 mb-10">Join forward-thinking engineering teams building the next generation of software with AgentOS.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-slate-200 transition-colors w-full sm:w-auto text-lg">
              Get API Access
            </button>
            <button className="px-8 py-4 bg-black border border-white/20 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors w-full sm:w-auto text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span className="text-white font-medium">AgentOS</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 AgentOS, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
