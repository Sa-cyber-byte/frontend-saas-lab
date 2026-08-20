import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, CheckCircle, ArrowRight, Zap, GitBranch, 
  Bot, Settings, Bell, Server, Database, Globe,
  Activity, Layers, Code, Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NODES = [
  { id: 'trigger', type: 'trigger', title: 'Webhook Trigger', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', desc: 'Listens for incoming payment events from Stripe.' },
  { id: 'condition', type: 'logic', title: 'High Value Check', icon: GitBranch, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', desc: 'Routes if transaction exceeds $1,000 threshold.' },
  { id: 'ai', type: 'ai', title: 'Fraud AI Agent', icon: Bot, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', desc: 'Analyzes user behavior patterns to score risk.' },
  { id: 'action', type: 'action', title: 'Flag Account', icon: Settings, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', desc: 'Temporarily suspends account operations.' },
  { id: 'notify', type: 'notification', title: 'Alert SecOps', icon: Bell, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', desc: 'Dispatches high-priority Slack alert to team.' },
];

function WorkflowCanvas() {
  const [activeNode, setActiveNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(-1);
  const [expandedNode, setExpandedNode] = useState(null);

  const runWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setExpandedNode(null);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(step);
      if (step >= NODES.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setProgress(-1);
        }, 3000);
      }
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-white">Payment Fraud Detection</h3>
          <p className="text-sm text-text-muted mt-1">Active Workflow • 5 Nodes</p>
        </div>
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
            isRunning 
              ? "bg-dark-border text-text-muted cursor-not-allowed" 
              : "bg-primary hover:bg-primary-dark text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          )}
        >
          {isRunning ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Settings className="w-5 h-5" />
            </motion.div>
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isRunning ? 'Executing Workflow...' : 'Run Workflow'}
        </button>
      </div>

      {/* Canvas */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 min-h-[300px]">
        {NODES.map((node, i) => {
          const isActive = progress === i;
          const isCompleted = progress > i;
          const isExpanded = expandedNode === node.id;
          
          return (
            <React.Fragment key={node.id}>
              {/* Node */}
              <div className="relative flex flex-col items-center">
                <motion.div
                  layout
                  onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={cn(
                    "relative w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-all border-2 backdrop-blur-sm z-20",
                    node.bg, node.border,
                    isActive ? "ring-4 ring-primary/50 scale-110" : "",
                    isCompleted ? "border-green-500/50" : "",
                    "hover:scale-105"
                  )}
                  animate={isActive ? {
                    boxShadow: ['0 0 0 0 rgba(139,92,246,0.4)', '0 0 0 20px rgba(139,92,246,0)']
                  } : {}}
                  transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                >
                  <node.icon className={cn("w-8 h-8", node.color)} />
                  
                  <AnimatePresence>
                    {isCompleted && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Label */}
                <motion.div layout className="mt-4 text-center absolute top-24 w-32">
                  <span className="text-sm font-medium text-white block">{node.title}</span>
                </motion.div>

                {/* Popover/Expanded view */}
                <AnimatePresence>
                  {(activeNode === node.id || isExpanded) && !isRunning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-24 mt-8 w-64 p-4 rounded-xl bg-[#1e293b]/95 border border-[#334155] shadow-xl z-50 backdrop-blur-md"
                    >
                      <h4 className="font-semibold text-white mb-2">{node.title}</h4>
                      <p className="text-sm text-gray-400 mb-3">{node.desc}</p>
                      {isExpanded && (
                        <div className="bg-[#0f172a] rounded-lg p-3 text-xs font-mono text-blue-300">
                          {`{\n  "status": "active",\n  "type": "${node.type}"\n}`}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Connection */}
              {i < NODES.length - 1 && (
                <div className="flex-1 w-[2px] h-12 md:h-[2px] md:w-12 bg-dark-border relative flex items-center justify-center my-8 md:my-0">
                  <ArrowRight className="w-4 h-4 text-dark-border absolute md:static rotate-90 md:rotate-0" />
                  
                  {/* Data flow animation */}
                  {isRunning && (progress === i || progress > i) && (
                    <>
                      <motion.div
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#8b5cf6]"
                        initial={{ left: "0%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 1.2, ease: "linear", repeat: progress > i ? 0 : Infinity }}
                      />
                      <motion.div
                        className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#8b5cf6]"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.2, ease: "linear", repeat: progress > i ? 0 : Infinity }}
                      />
                    </>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Execution Timeline (Visible during run) */}
      <AnimatePresence>
        {isRunning && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-20 pt-8 border-t border-dark-border"
          >
            <h4 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wider">Execution Log</h4>
            <div className="space-y-3 font-mono text-sm max-h-40 overflow-y-auto pr-4">
              {NODES.map((node, i) => (
                progress >= i && (
                  <motion.div 
                    key={node.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg",
                      progress === i ? "bg-primary/10 text-primary-light" : "text-green-400"
                    )}
                  >
                    <span className="opacity-50 text-xs">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
                    {progress === i ? (
                      <Settings className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>{progress === i ? `Executing ${node.title}...` : `Completed ${node.title} in ${Math.floor(Math.random() * 200 + 50)}ms`}</span>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ children, title, subtitle }) {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {title}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-main selection:bg-primary/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FlowMind</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#examples" className="hover:text-white transition-colors">Templates</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
          </div>
          <button className="bg-white text-dark-bg px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Start Building
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-40 pb-20 relative">
        <div className="absolute inset-0 top-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-dark-bg to-dark-bg -z-10" />
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-light border border-primary/20 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Introducing Agentic Workflows v2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Visual AI automation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                without the complexity.
              </span>
            </h1>
            <p className="text-xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
              Build, deploy, and scale intelligent workflows that connect your entire tech stack. Drag and drop AI agents to make decisions, process data, and take action autonomously.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                Start for free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-dark-card border border-dark-border hover:bg-dark-border text-white rounded-full font-semibold text-lg transition-all">
                Book Demo
              </button>
            </div>
          </motion.div>

          {/* Interactive Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <WorkflowCanvas />
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <Section title="AI-Native Architecture" subtitle="Built from the ground up to integrate large language models seamlessly into your operational flows.">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Bot, title: "Autonomous Agents", desc: "Deploy AI agents that can reason, make decisions, and execute multi-step plans based on custom instructions." },
            { icon: Code, title: "No-Code & Low-Code", desc: "Use the visual builder for speed, or drop into the built-in IDE to write custom scripts when you need full control." },
            { icon: Activity, title: "Real-time Observability", desc: "Monitor every step of your execution with deep tracing, replay capabilities, and comprehensive logs." }
          ].map((feature, i) => (
            <div key={i} className="bg-dark-card p-8 rounded-3xl border border-dark-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Integrations Grid */}
      <Section title="Connect Everything" subtitle="Native integrations with your favorite tools, databases, and APIs.">
        <div className="relative p-12 bg-dark-card rounded-3xl border border-dark-border overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 to-transparent pointer-events-none" />
           <div className="flex flex-wrap justify-center gap-6 relative z-10">
              {[Server, Database, Globe, Zap, Settings, Shield, Bell, Layers].map((Icon, i) => (
                <div key={i} className="w-20 h-20 rounded-2xl bg-[#0f172a] border border-[#334155] flex items-center justify-center shadow-lg hover:border-secondary transition-colors cursor-pointer group">
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-secondary transition-colors" />
                </div>
              ))}
           </div>
           <div className="mt-12 text-center relative z-10">
             <button className="text-secondary hover:text-white font-medium flex items-center gap-2 mx-auto transition-colors">
               View all 200+ integrations <ArrowRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -z-10" />
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to automate the impossible?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            Join thousands of forward-thinking teams building the next generation of automated workflows with FlowMind.
          </p>
          <button className="px-10 py-5 bg-white text-dark-bg hover:bg-gray-100 rounded-full font-bold text-lg transition-all shadow-xl">
            Create your first workflow
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-border bg-dark-card">
        <div className="container mx-auto px-6 text-center text-text-muted text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
             <Layers className="w-5 h-5 text-primary" />
             <span className="font-bold text-white text-lg">FlowMind</span>
          </div>
          <p>© 2026 FlowMind Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
