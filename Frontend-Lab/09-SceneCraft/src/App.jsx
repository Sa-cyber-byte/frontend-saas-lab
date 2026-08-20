import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Film, 
  Users, 
  Clapperboard, 
  LayoutTemplate, 
  Clock, 
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Camera,
  Layers,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = ['Features', 'Timeline', 'Pricing', 'Login'];

const STAGES = [
  { id: 'idea', label: 'IDEA' },
  { id: 'characters', label: 'CHARACTERS' },
  { id: 'scenes', label: 'SCENES' },
  { id: 'storyboard', label: 'STORYBOARD' },
  { id: 'final', label: 'FINAL STORY' },
];

const SCENES = [
  {
    id: 'scene-01',
    title: 'Scene 01: The Awakening',
    location: 'Cyberpunk Alley',
    characters: ['Kael', 'Nova'],
    mood: 'Tense',
    duration: '02:45',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80',
    description: 'Neon lights flicker as Kael awakens in the damp alleyway, his memory erased.'
  },
  {
    id: 'scene-02',
    title: 'Scene 02: Neon Pursuit',
    location: 'Upper City Bridges',
    characters: ['Kael', 'Enforcers'],
    mood: 'Action',
    duration: '04:12',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80',
    description: 'A high-speed chase across the suspension bridges of the upper city.'
  },
  {
    id: 'scene-03',
    title: 'Scene 03: The Oracle',
    location: 'Underground Server Farm',
    characters: ['Nova', 'The Oracle'],
    mood: 'Mysterious',
    duration: '03:30',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
    description: 'Nova consults the ancient server intelligence to decode the artifact.'
  },
  {
    id: 'scene-04',
    title: 'Scene 04: Betrayal',
    location: 'Corporate HQ',
    characters: ['Kael', 'CEO Vance'],
    mood: 'Dramatic',
    duration: '05:05',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    description: 'The shocking revelation of Vance’s true intentions inside the penthouse.'
  },
  {
    id: 'scene-05',
    title: 'Scene 05: Final Stand',
    location: 'The Nexus Core',
    characters: ['Kael', 'Nova', 'Vance'],
    mood: 'Epic',
    duration: '06:20',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    description: 'The climactic battle to prevent the system override.'
  }
];

const FEATURES = [
  {
    title: 'Story Builder',
    description: 'Craft your narrative arc with intuitive outlining tools designed for screenwriters.',
    icon: Sparkles
  },
  {
    title: 'Character Development',
    description: 'Build deep character profiles, track relationships, and manage character arcs.',
    icon: Users
  },
  {
    title: 'Scene Planning',
    description: 'Map out locations, lighting, and blocking before you even step on set.',
    icon: Clapperboard
  },
  {
    title: 'Smart Storyboarding',
    description: 'Generate or upload storyboards that sync perfectly with your script.',
    icon: LayoutTemplate
  }
];

function InteractiveTimeline() {
  const [activeScene, setActiveScene] = useState(SCENES[0].id);
  const [hoveredScene, setHoveredScene] = useState(null);
  
  const currentScene = SCENES.find(s => s.id === activeScene);
  
  return (
    <div className="w-full max-w-7xl mx-auto rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px]">
      {/* Left side: Timeline list */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col h-full bg-neutral-950">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-200">Timeline</h3>
          </div>
          <span className="text-xs font-mono text-neutral-500">22:00 TOTAL</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {SCENES.map((scene, index) => {
            const isActive = activeScene === scene.id;
            const isHovered = hoveredScene === scene.id;
            
            return (
              <motion.button
                layout
                key={scene.id}
                onClick={() => setActiveScene(scene.id)}
                onMouseEnter={() => setHoveredScene(scene.id)}
                onMouseLeave={() => setHoveredScene(null)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all relative overflow-hidden group",
                  isActive ? "bg-neutral-800" : "hover:bg-neutral-800/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-scene-bg"
                    className="absolute inset-0 border border-indigo-500/30 rounded-xl"
                  />
                )}
                <div className="relative z-10 flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-indigo-400">SC {String(index + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {scene.duration}
                  </span>
                </div>
                <h4 className={cn("font-medium relative z-10", isActive ? "text-white" : "text-neutral-300")}>
                  {scene.title.split(': ')[1]}
                </h4>
                
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative z-10 mt-3 text-xs text-neutral-400 flex flex-wrap gap-2"
                    >
                      <span className="bg-neutral-900 px-2 py-1 rounded border border-neutral-700">{scene.location}</span>
                      <span className="bg-neutral-900 px-2 py-1 rounded border border-neutral-700">{scene.mood}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Right side: Visual Composition */}
      <div className="w-full md:w-2/3 relative bg-black flex flex-col h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src={currentScene.image} 
              alt={currentScene.title}
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-20 flex-1 flex flex-col justify-end p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentScene.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs mb-4">
                <Camera className="w-3 h-3" />
                <span>Camera A - 35mm</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {currentScene.title.split(': ')[1]}
              </h2>
              <p className="text-lg text-neutral-300 max-w-xl mb-8">
                {currentScene.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{currentScene.characters.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <PlayCircle className="w-4 h-4 text-indigo-400" />
                  <span>Action ready</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">SceneCraft</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-neutral-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
            <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
              Start Creating
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8 font-medium">
              <Sparkles className="w-4 h-4" />
              Introducing SceneCraft 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              Direct your vision.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Frame by frame.
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              The ultimate collaborative platform for filmmakers and storytellers. 
              Plan, storyboard, and visualize your cinematic masterpiece before rolling the camera.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </button>
              <button className="px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-semibold transition-all">
                Try for free
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 flex-wrap">
              {STAGES.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs md:text-sm font-mono text-neutral-400">
                    {stage.label}
                  </div>
                  {i < STAGES.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-neutral-600 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <InteractiveTimeline />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">From script to screen.</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Everything you need to plan your production, unified in one cinematic workspace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="p-6 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-24 px-6 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl absolute -z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80" alt="Set" className="rounded-2xl object-cover h-64 w-full" />
                <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">AD</div>
                    <div className="text-sm">
                      <p className="text-white font-medium">Alex Director</p>
                      <p className="text-neutral-500">Left a comment</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-300">"Let's push the lighting here. Needs more contrast."</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-900/30 border border-indigo-500/30 p-6 rounded-2xl flex flex-col items-center justify-center h-40">
                  <Layers className="w-8 h-8 text-indigo-400 mb-2" />
                  <span className="text-indigo-200 font-medium">Real-time sync</span>
                </div>
                <img src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?auto=format&fit=crop&q=80" alt="Camera" className="rounded-2xl object-cover h-80 w-full" />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Crew sync,<br />perfected.
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Keep your entire crew on the same page. DOPs, Art Directors, and Producers can collaborate on timelines, leave frame-accurate notes, and update shot lists in real-time.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['Frame-accurate comments', 'Role-based access control', 'Export to industry standard formats'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <button className="flex items-center gap-2 text-white font-semibold hover:text-indigo-400 transition-colors group">
              Explore collaboration
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
            Ready to call action?
          </h2>
          <p className="text-xl text-neutral-400 mb-10">
            Join thousands of visionary creators building the future of cinema.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors text-lg">
            Start your project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-neutral-400" />
            <span className="font-semibold text-neutral-400">SceneCraft</span>
          </div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
