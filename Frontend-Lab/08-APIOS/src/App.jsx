import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Play, ChevronRight, Server, Database, 
  Globe, Shield, Code2, Zap, GitBranch, Search,
  CheckCircle2, AlertCircle, Copy, Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400 w-6 h-6" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              APIOS
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-300 hover:text-white transition-colors">Log in</button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-gray-950 px-4 py-2 rounded-md text-sm font-semibold transition-all">
              Start Building
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function APIPlayground() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/v1/users');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);

  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  
  const mockResponses = {
    'GET': {
      status: 200,
      time: '124ms',
      size: '1.2kb',
      body: {
        data: [
          { id: 'usr_1', name: 'Alice Smith', role: 'admin', status: 'active' },
          { id: 'usr_2', name: 'Bob Jones', role: 'developer', status: 'active' }
        ],
        meta: { total: 2, page: 1 }
      }
    },
    'POST': {
      status: 201,
      time: '245ms',
      size: '486b',
      body: {
        message: 'User created successfully',
        data: { id: 'usr_3', name: 'New User', role: 'developer', status: 'pending' }
      }
    },
    'PUT': {
      status: 200,
      time: '189ms',
      size: '342b',
      body: {
        message: 'User updated successfully',
        data: { id: 'usr_1', name: 'Alice Smith', role: 'superadmin', status: 'active' }
      }
    },
    'DELETE': {
      status: 204,
      time: '156ms',
      size: '0b',
      body: null
    }
  };

  const handleSend = () => {
    setIsLoading(true);
    setResponse(null);
    
    // Simulate network request
    setTimeout(() => {
      setResponse(mockResponses[method]);
      setIsLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    if (response?.body) {
      navigator.clipboard.writeText(JSON.stringify(response.body, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const methodColors = {
    GET: 'text-emerald-400',
    POST: 'text-blue-400',
    PUT: 'text-yellow-400',
    DELETE: 'text-red-400'
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-gray-800 bg-[#0d1117] overflow-hidden shadow-2xl shadow-emerald-500/10">
      {/* Window Controls */}
      <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-gray-500 font-mono">request-builder.sh</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Request Panel */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Request URL</label>
            <div className="flex rounded-md bg-gray-900 border border-gray-700 focus-within:border-emerald-500/50 transition-colors overflow-hidden">
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className={cn("bg-transparent border-r border-gray-700 px-3 py-2 text-sm font-bold focus:outline-none cursor-pointer appearance-none", methodColors[method])}
              >
                {methods.map(m => <option key={m} value={m} className="bg-gray-900 text-gray-300">{m}</option>)}
              </select>
              <input 
                type="text" 
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none"
                placeholder="/api/v1/resource"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Headers</label>
            <div className="bg-gray-900 rounded-md border border-gray-800 p-3 font-mono text-xs text-gray-300 flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="text-blue-400 w-32 shrink-0">Authorization:</span>
                <span className="text-emerald-400 truncate">Bearer api_live_xxxx...</span>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-400 w-32 shrink-0">Content-Type:</span>
                <span className="text-orange-400">application/json</span>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-400 w-32 shrink-0">Accept:</span>
                <span className="text-orange-400">application/json</span>
              </div>
            </div>
          </div>

          {['POST', 'PUT'].includes(method) && (
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Body</label>
              <textarea 
                className="w-full flex-1 bg-gray-900 rounded-md border border-gray-800 p-3 font-mono text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 resize-none"
                defaultValue={JSON.stringify({ name: "New User", role: "developer" }, null, 2)}
              />
            </div>
          )}

          <div className="mt-auto pt-4">
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-2.5 px-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Server className="w-4 h-4" />
                </motion.div>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Send Request
                </>
              )}
            </button>
          </div>
        </div>

        {/* Response Panel */}
        <div className="p-0 flex flex-col bg-[#0a0d12]">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Response</span>
            
            <AnimatePresence mode="wait">
              {response && (
                <motion.div 
                  key="response-container"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-xs font-mono"
                >
                  <span className={cn(
                    "px-2 py-0.5 rounded flex items-center gap-1",
                    response.status >= 200 && response.status < 300 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {response.status >= 200 && response.status < 300 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {response.status} {response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : response.status === 204 ? 'No Content' : 'Error'}
                  </span>
                  <span className="text-gray-500">{response.time}</span>
                  <span className="text-gray-500">{response.size}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 flex-1 relative overflow-hidden group">
            {response ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 transition-colors"
                    title="Copy JSON"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {response.body ? (
                  <pre className="font-mono text-sm text-gray-300 overflow-auto h-full p-2 custom-scrollbar">
                    {/* Simple syntax highlighting mock */}
                    <code dangerouslySetInnerHTML={{
                      __html: JSON.stringify(response.body, null, 2)
                        .replace(/"([^"]+)":/g, '<span class="text-blue-300">"$1"</span>:')
                        .replace(/: "([^"]+)"/g, ': <span class="text-emerald-300">"$1"</span>')
                        .replace(/: (\d+)/g, ': <span class="text-orange-300">$1</span>')
                    }} />
                  </pre>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 font-mono text-sm">
                    No content to display
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-600 font-mono text-sm flex-col gap-4">
                <Server className="w-12 h-12 opacity-20" />
                <p>Waiting for request...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/80 text-xs font-medium text-emerald-400 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            APIOS v2.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            The Ultimate API
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Developer Platform
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
          >
            Design, test, and document your APIs in milliseconds. Built for modern developer workflows with native CI/CD integration and real-time collaboration.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold transition-all flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-600 text-white font-medium transition-all flex items-center justify-center gap-2">
              <Code2 className="w-4 h-4" /> Read the Docs
            </button>
          </motion.div>
        </div>

        {/* Signature Interactive Element */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10"
          id="playground"
        >
          <APIPlayground />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-950 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for scale, designed for speed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to build robust APIs, from local development to production monitoring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap}
              title="Lightning Fast Execution"
              description="Our edge-optimized runtime ensures your tests run in milliseconds, no matter where your developers are located."
              delay={0.1}
            />
            <FeatureCard 
              icon={GitBranch}
              title="Version Control Native"
              description="Treat your API collections like code. Branch, merge, and PR your API changes directly within GitHub or GitLab."
              delay={0.2}
            />
            <FeatureCard 
              icon={Globe}
              title="Global Environments"
              description="Manage multiple environments seamlessly. Switch between local, staging, and production with a single click."
              delay={0.3}
            />
            <FeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption for your credentials. Automated secret scanning prevents accidental token leaks."
              delay={0.4}
            />
            <FeatureCard 
              icon={Database}
              title="Mock Servers"
              description="Unblock frontend teams instantly. Generate fully functional mock servers from your API schemas in one click."
              delay={0.5}
            />
            <FeatureCard 
              icon={Search}
              title="Advanced Documentation"
              description="Beautiful, interactive API references generated automatically from your requests and OpenAPI specs."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-[#0a0d12] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frictionless developer workflow</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Stop juggling between multiple tools. APIOS unifies your API design, testing, and documentation into one seamless experience.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Design", desc: "Write OpenAPI specs with intelligent autocomplete and real-time linting." },
                  { title: "Test", desc: "Build complex request chains and write assertions in TypeScript." },
                  { title: "Publish", desc: "Deploy documentation and SDKs automatically on every merge." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl opacity-50" />
              <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <Code2 className="text-gray-400 w-5 h-5" />
                    <span className="font-mono text-sm text-gray-300">api.test.ts</span>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Passing</span>
                </div>
                <pre className="font-mono text-sm text-gray-400 overflow-x-auto">
                  <code>
                    <span className="text-blue-400">test</span>(<span className="text-emerald-300">'Create user flow'</span>, <span className="text-blue-400">async</span> () ={'>'} {'{\n'}
                    {'  '}<span className="text-gray-500">// 1. Create the user</span>{'\n'}
                    {'  '}<span className="text-blue-400">const</span> res = <span className="text-blue-400">await</span> api.post(<span className="text-emerald-300">'/users'</span>, {'{\n'}
                    {'    '}name: <span className="text-emerald-300">'Test User'</span>,\n
                    {'    '}role: <span className="text-emerald-300">'admin'</span>\n
                    {'  '}{'});\n\n'}
                    {'  '}<span className="text-orange-300">expect</span>(res.status).toBe(<span className="text-orange-400">201</span>);\n
                    {'  '}<span className="text-orange-300">expect</span>(res.data.id).toBeDefined();\n
                    {'}'});
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full bg-emerald-500/20 blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your API workflow?</h2>
          <p className="text-xl text-emerald-100/70 mb-10">Join thousands of developers building better APIs, faster.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              Start Building for Free
            </button>
            <button className="px-8 py-4 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-600 text-white font-bold text-lg transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400 w-5 h-5" />
            <span className="text-lg font-bold text-white">APIOS</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} APIOS Platform. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
