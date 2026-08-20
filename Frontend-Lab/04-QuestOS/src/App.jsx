import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Swords, 
  Brain, 
  Dumbbell, 
  Code, 
  Target, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Flame,
  Activity,
  Award
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SKILL_DATA = {
  id: 'core',
  name: 'Core Attributes',
  icon: Zap,
  xp: 1500,
  children: [
    {
      id: 'focus',
      name: 'Focus',
      icon: Target,
      level: 12,
      xp: 450,
      description: 'Increases deep work capacity.',
      achievements: ['Monk Mode', 'Laser Sight'],
      children: [
        { id: 'deep_work', name: 'Deep Work', icon: Brain, level: 5, xp: 200, achievements: ['Time Bender'] }
      ]
    },
    {
      id: 'coding',
      name: 'Coding',
      icon: Code,
      level: 18,
      xp: 800,
      description: 'Syntax mastery and logic optimization.',
      achievements: ['Bug Hunter', '10x Developer'],
      children: [
        { id: 'frontend', name: 'Frontend', icon: Zap, level: 8, xp: 300, achievements: ['Pixel Perfect'] },
        { id: 'backend', name: 'Backend', icon: Zap, level: 7, xp: 250, achievements: ['Database God'] }
      ]
    },
    {
      id: 'fitness',
      name: 'Fitness',
      icon: Dumbbell,
      level: 9,
      xp: 320,
      description: 'Physical endurance and strength.',
      achievements: ['Iron Pumper', 'Marathoner'],
      children: []
    }
  ]
};

const QUESTS = [
  { id: 1, title: 'Build a React Project', xp: 500, type: 'coding', difficulty: 'Hard' },
  { id: 2, title: '1 Hour Deep Work', xp: 150, type: 'focus', difficulty: 'Medium' },
  { id: 3, title: 'Morning Workout', xp: 200, type: 'fitness', difficulty: 'Medium' },
];

function SkillNode({ node, activeNode, setActiveNode }) {
  const isActive = activeNode === node.id;
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveNode(isActive ? null : node.id)}
        className={cn(
          "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors",
          isActive 
            ? "border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
        )}
      >
        <node.icon className={cn("w-8 h-8 mb-2", isActive ? "text-cyan-400" : "text-zinc-400")} />
        <span className="text-sm font-bold">{node.name}</span>
        {node.level && (
          <span className="text-xs text-zinc-500 mt-1">Lvl {node.level}</span>
        )}
      </motion.button>
      
      <AnimatePresence>
        {isActive && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center mt-4 overflow-hidden"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-zinc-800" />
            <div className="flex gap-8 pt-4 pb-4 px-4">
              {node.children.map(child => (
                <SkillNode key={child.id} node={child} activeNode={activeNode} setActiveNode={setActiveNode} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [level, setLevel] = useState(27);
  const [xp, setXp] = useState(7420);
  const maxXp = 9000;
  const [activeNode, setActiveNode] = useState('core');
  const [quests, setQuests] = useState(QUESTS);
  const [levelUpTrigger, setLevelUpTrigger] = useState(false);

  const completeQuest = (id, rewardXp) => {
    setQuests(quests.filter(q => q.id !== id));
    
    let newXp = xp + rewardXp;
    if (newXp >= maxXp) {
      setLevel(l => l + 1);
      setXp(newXp - maxXp);
      setLevelUpTrigger(true);
      setTimeout(() => setLevelUpTrigger(false), 3000);
    } else {
      setXp(newXp);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/10 via-zinc-950 to-purple-900/10 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
            <Swords className="text-cyan-400" />
            <span>QUEST<span className="text-cyan-400">OS</span></span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">Character</a>
            <a href="#skills" className="hover:text-white transition-colors">Skill Tree</a>
            <a href="#quests" className="hover:text-white transition-colors">Quests</a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32">
        {/* HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold">
              <Flame className="w-4 h-4" /> V1.0 is Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              Level up your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Productivity
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              QuestOS transforms your daily tasks into an epic adventure. Gain XP, unlock skills, and achieve your goals with the ultimate gamified operating system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                Start Playing
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10">
                View Trailer
              </button>
            </div>
          </div>

          {/* Character Card Widget */}
          <div className="relative z-10">
            <AnimatePresence>
              {levelUpTrigger && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                  <div className="text-5xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">
                    LEVEL UP!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {/* Level Up Flash */}
              <AnimatePresence>
                {levelUpTrigger && (
                  <motion.div 
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-yellow-400/20 z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 p-1 shadow-lg">
                  <div className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden relative">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Quest" alt="Avatar" className="w-20 h-20" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black">Alex Mercer</h3>
                  <p className="text-cyan-400 font-medium">Technomancer Class</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl font-black tracking-tighter">LVL {level}</span>
                  </div>
                </div>
              </div>

              {/* XP Bar */}
              <div className="space-y-2 mb-8 relative z-10">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-400">Experience</span>
                  <span className="text-cyan-400">{xp} / {maxXp} XP</span>
                </div>
                <div className="h-4 bg-black rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp / maxXp) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
              </div>

              {/* Quick Quests */}
              <div className="space-y-3 relative z-10">
                <h4 className="font-bold text-sm text-zinc-400 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" /> ACTIVE QUESTS
                </h4>
                <AnimatePresence>
                  {quests.map(quest => (
                    <motion.div
                      key={quest.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
                      onClick={() => completeQuest(quest.id, quest.xp)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{quest.title}</p>
                          <p className="text-xs text-zinc-500">+{quest.xp} XP • {quest.difficulty}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </motion.div>
                  ))}
                  {quests.length === 0 && (
                    <div className="p-4 text-center text-zinc-500 bg-white/5 rounded-xl border border-white/5">
                      All quests completed! Awaiting new daily reset.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILL TREE SECTION */}
        <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Master Your <span className="text-cyan-400">Skill Tree</span></h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Allocate skill points earned from leveling up to unlock powerful real-life habits and abilities.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Interactive Tree */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-12 overflow-hidden relative min-h-[500px] flex items-center justify-center">
              <SkillNode node={SKILL_DATA} activeNode={activeNode} setActiveNode={setActiveNode} />
            </div>

            {/* Skill Details Panel */}
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" /> Skill Details
              </h3>
              
              {activeNode ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Find active node logic inline for simplicity, usually you'd traverse the tree */}
                    {(() => {
                      let found = null;
                      const findNode = (node) => {
                        if (node.id === activeNode) found = node;
                        if (node.children) node.children.forEach(findNode);
                      };
                      findNode(SKILL_DATA);
                      
                      if (!found) return null;

                      return (
                        <>
                          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                              <found.icon className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{found.name}</h4>
                              <p className="text-sm text-zinc-400">Level {found.level || 1}</p>
                            </div>
                          </div>
                          
                          {found.description && (
                            <p className="text-sm text-zinc-300 leading-relaxed">
                              {found.description}
                            </p>
                          )}

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-zinc-400">
                              <span>Progress to Next Lvl</span>
                              <span>{found.xp} / {(found.level || 1) * 100}</span>
                            </div>
                            <div className="h-2 bg-black rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-500" style={{ width: `${(found.xp / ((found.level || 1) * 100)) * 100}%` }} />
                            </div>
                          </div>

                          {found.achievements && found.achievements.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-white/10">
                              <h5 className="text-xs font-bold text-zinc-500">ACHIEVEMENTS UNLOCKED</h5>
                              <div className="flex flex-wrap gap-2">
                                {found.achievements.map((ach, i) => (
                                  <span key={i} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold flex items-center gap-1">
                                    <Trophy className="w-3 h-3" /> {ach}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="text-center text-zinc-500 py-12">
                  Select a node to view details
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
           <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-colors">
                <Activity className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Productivity Analytics</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Visualize your daily output with beautiful, gaming-inspired charts. Track your DPS (Daily Productivity Score).</p>
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition-colors">
                <Award className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Global Leaderboards</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Compete with friends or the community. Rank up from Bronze to Radiant by completing tasks consistently.</p>
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 hover:border-pink-500/30 transition-colors">
                <Swords className="w-10 h-10 text-pink-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Boss Fights</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Turn major life projects into epic boss battles. Break them down into phases and defeat them for massive loot.</p>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Join the Beta?</h2>
              <p className="text-lg text-zinc-300 mb-10 max-w-xl mx-auto">
                Secure your spot in the early access program. Start leveling up your real life today.
              </p>
              <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder:text-zinc-500"
                />
                <button type="button" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
