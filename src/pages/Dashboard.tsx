import { useStore, College } from '../store/useStore';
import { CheckCircle2, Circle, Trash2, Target, Trophy, BrainCircuit, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ROADMAP_STEPS = [
  { id: 'step-1', title: 'Choose PCM in 11th/12th', desc: 'Physics, Chemistry, and Math are mandatory.' },
  { id: 'step-2', title: 'Prepare for NATA/JEE', desc: 'Start practicing aptitude and drawing skills.' },
  { id: 'step-3', title: 'Build Drawing Skills', desc: 'Perspective drawing, 2D/3D composition.' },
  { id: 'step-4', title: 'Apply to Colleges', desc: 'Use your NATA/JEE scores for counseling.' },
  { id: 'step-5', title: 'Start B.Arch', desc: 'Begin your 5-year architecture journey.' },
];

export default function Dashboard() {
  const { completedSteps, toggleStep, savedColleges, removeCollege, mindsetScore } = useStore();

  const progressPercentage = Math.round((completedSteps.length / ROADMAP_STEPS.length) * 100);

  const getMindsetFeedback = (score: number) => {
    if (score >= 12) return { level: "Strong Mindset", color: "text-sky-400", desc: "You naturally think like an architect." };
    if (score >= 6) return { level: "Potential Builder", color: "text-yellow-400", desc: "You have potential, keep practicing spatial skills." };
    return { level: "Exploration Phase", color: "text-slate-400", desc: "Architecture might be challenging, but passion can bridge the gap." };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto flex flex-col gap-6 pb-12"
    >
      <div className="bg-slate-900/80 rounded-[20px] border border-white/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Your Dashboard</h1>
          <p className="text-sm text-slate-400">Track your preparation progress and manage your target colleges.</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold">PREP STATUS</div>
          <div className="text-xl font-bold text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">{progressPercentage}% Ready</div>
        </div>
      </div>

      {mindsetScore === null ? (
        <motion.div 
          className="bg-gradient-to-r from-cyan-400/20 to-slate-900 border border-cyan-400/30 rounded-[20px] p-6 shadow-[0_0_20px_rgba(34,211,238,0.05)] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-sky-400" /> Take the Mindset Test
            </h3>
            <p className="text-sm text-slate-300">Discover if you naturally think like an architect.</p>
          </div>
          <Link to="/mindset-test" className="shrink-0 px-6 py-2.5 bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
            Start Test <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-slate-900/80 border border-white/10 rounded-[20px] p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          {/* Faint background icon */}
          <BrainCircuit className="absolute -right-4 -top-8 w-32 h-32 text-white/[0.02] pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 ${getMindsetFeedback(mindsetScore).color}`}>
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">MINDSET PROFILE</div>
              <h3 className={`text-xl font-bold ${getMindsetFeedback(mindsetScore).color}`}>
                {getMindsetFeedback(mindsetScore).level} (Score: {mindsetScore}/18)
              </h3>
              <p className="text-sm text-slate-400 mt-1">{getMindsetFeedback(mindsetScore).desc}</p>
            </div>
          </div>
          <Link to="/mindset-test" className="relative z-10 shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all border border-white/10">
            Retake Test
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PROGRESS TRACKER */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-[20px] border border-white/10 p-6 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-400" /> Roadmap Progress
          </h2>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/[0.03] rounded-full mb-6 overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"
            />
          </div>

          {/* Steps List */}
          <div className="flex flex-col gap-3">
            {ROADMAP_STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              return (
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all",
                    isCompleted 
                      ? "bg-sky-400/5 border-sky-400/30" 
                      : "bg-white/[0.03] border-white/10 hover:bg-white/5"
                  )}
                >
                  <button className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-sky-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={cn("text-sm font-semibold", isCompleted ? "text-sky-100" : "text-white")}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                  <span className="text-xl font-extrabold opacity-20 text-white shrink-0 hidden sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SAVED COLLEGES */}
        <div className="bg-slate-900/80 rounded-[20px] border border-white/10 p-6 shadow-lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" /> Target Colleges
          </h2>

          {savedColleges.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
              <p className="text-xs text-slate-400">You haven't saved any colleges yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {savedColleges.map((college) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={college.id} 
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white text-sm pr-4">{college.name}</h3>
                    <button 
                      onClick={() => removeCollege(college.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-cyan-400 text-black rounded">
                      #{college.ranking}
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-white/10 text-slate-300 rounded">
                      {college.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
