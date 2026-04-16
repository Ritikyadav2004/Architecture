import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Building2, Compass, PenTool, BrainCircuit, 
  Monitor, GraduationCap, CheckCircle2, Briefcase, TrendingUp,
  MessageSquare, LayoutDashboard
} from 'lucide-react';
import ThreeScene from '../components/ThreeScene';
import { useStore, College } from '../store/useStore';
import { cn } from '../lib/utils';

const COLLEGES: College[] = [
  { id: '1', name: 'School of Planning and Architecture (SPA)', type: 'Government', fees: '₹1.5L - 2L/yr', location: 'New Delhi', ranking: 1 },
  { id: '2', name: 'IIT Roorkee', type: 'Government', fees: '₹2L - 2.5L/yr', location: 'Roorkee', ranking: 2 },
  { id: '3', name: 'Sir J.J. College of Architecture', type: 'Government', fees: '₹20K - 30K/yr', location: 'Mumbai', ranking: 3 },
  { id: '4', name: 'CEPT University', type: 'Private', fees: '₹3L - 4L/yr', location: 'Ahmedabad', ranking: 4 },
  { id: '5', name: 'NIT Tiruchirappalli', type: 'Government', fees: '₹1.5L - 2L/yr', location: 'Trichy', ranking: 5 },
];

const ROADMAP_STEPS = [
  { id: 'step-1', title: 'Choose PCM in 11th/12th', desc: 'Physics, Chemistry, and Math are mandatory.' },
  { id: 'step-2', title: 'Prepare for NATA/JEE', desc: 'Start practicing aptitude and drawing skills.' },
  { id: 'step-3', title: 'Build Drawing Skills', desc: 'Perspective drawing, 2D/3D composition.' },
  { id: 'step-4', title: 'Apply to Colleges', desc: 'Use your NATA/JEE scores for counseling.' },
  { id: 'step-5', title: 'Start B.Arch', desc: 'Begin your 5-year architecture journey.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Home() {
  const { savedColleges, saveCollege, removeCollege } = useStore();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 max-w-7xl mx-auto pb-12"
    >
      {/* HERO SECTION */}
      <motion.section variants={itemVariants} className="bg-slate-900/80 rounded-[20px] border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#030712] flex flex-col justify-center shadow-xl min-h-[calc(100vh-6rem)] mb-6">
        
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>

        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none z-0" />

        {/* Content Overlay */}
        <div className="relative z-10 p-8 lg:p-16 max-w-3xl pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 text-sm font-semibold mb-6 pointer-events-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Interactive 3D Experience
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Architect Your <br/> Future
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl max-w-xl mb-10 drop-shadow-md leading-relaxed">
            From PCM student to Licensed Architect. Complete roadmap for NATA 2024, JEE Paper 2, and Top Council of Architecture (CoA) approved colleges.
          </p>
          <div className="flex flex-wrap gap-4 pointer-events-auto">
            <Link to="/dashboard" className="bg-sky-400 text-[#030712] px-8 py-4 rounded-xl font-bold hover:bg-sky-300 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] text-lg">
              Explore Roadmap <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/ai-mentor" className="bg-slate-900/80 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 shadow-lg text-lg">
              Ask ArchiNova AI <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROADMAP */}
        <motion.section variants={itemVariants} className="lg:col-span-1 bg-slate-900/80 rounded-[20px] border border-white/10 p-6 flex flex-col gap-4 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-2">Path to B.Arch</h2>
          <div className="flex flex-col gap-4">
            {ROADMAP_STEPS.map((step, index) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={step.id} 
                className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-xl border-l-4 border-slate-400 hover:border-sky-400 hover:bg-sky-400/5 transition-colors"
              >
                <span className="text-2xl font-extrabold opacity-30 text-white shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <strong className="block text-sm text-white">{step.title}</strong>
                  <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* MINDSET TEST BANNER */}
          <motion.section variants={itemVariants} className="bg-gradient-to-r from-sky-500/20 to-[#030712] rounded-[20px] border border-sky-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(56,189,248,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
              <BrainCircuit className="w-48 h-48 text-sky-400" />
            </div>
            <div className="relative z-10 space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-sky-400" />
                Discover Your Architecture Mindset
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Not sure if Architecture is the right path for you? Take this quick, psychology-inspired 2-minute test to evaluate your natural thinking style and interests.
              </p>
            </div>
            <Link 
              to="/mindset-test" 
              className="relative z-10 shrink-0 bg-sky-400 hover:bg-sky-300 text-[#030712] font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(56,189,248,0.3)]"
            >
              Take Free Test <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.section>

          {/* EXAMS & ELIGIBILITY */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] rounded-[15px] border border-white/10 p-5 hover:border-sky-400/30 transition-colors flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1 font-bold">National Level</span>
              <h3 className="text-xl font-bold text-white mb-1">NATA</h3>
              <p className="text-xs text-slate-400 mb-4">CoA Exam | Computer-based | Focus: Aptitude, Drawing, Mathematics.</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                  <div className="text-lg font-bold text-cyan-400">200</div>
                  <div className="text-[10px] text-slate-400">Max Marks</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                  <div className="text-lg font-bold text-cyan-400">3</div>
                  <div className="text-[10px] text-slate-400">Attempts</div>
                </div>
              </div>
              <a 
                href="https://www.iarch.co.in/nata-previous-year-question-papers/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-bold py-2 px-4 rounded-lg border border-white/10 text-center transition-colors flex items-center justify-center gap-2"
              >
                Download NATA PYQs <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-white/[0.02] rounded-[15px] border border-white/10 p-5 hover:border-sky-400/30 transition-colors flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1 font-bold">IIT/NIT Route</span>
              <h3 className="text-xl font-bold text-white mb-1">JEE Paper 2</h3>
              <h4 className="text-sm text-white/80 mb-2">NTA Exam</h4>
              <p className="text-xs text-slate-400 mb-4">Focus: Drawing, Aptitude, Maths. Best for NITs and SPAs.</p>
              <a 
                href="https://collegedunia.com/articles/e-301-jee-mains-2026-april-7-shift-2-b-arch-question-paper-with-solutions-pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-bold py-2 px-4 rounded-lg border border-white/10 text-center transition-colors flex items-center justify-center gap-2"
              >
                Download JEE Paper 2 PYQs <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.section>

          {/* CAREER OVERVIEW */}
          <motion.section variants={itemVariants} className="bg-slate-900/80 rounded-[20px] border border-white/10 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">What does an Architect do?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, title: 'Planning Buildings', desc: 'Designing functional structures.' },
                { icon: Compass, title: 'Designing Spaces', desc: 'Optimizing layouts.' },
                { icon: TrendingUp, title: 'Sustainability', desc: 'Eco-friendly designs.' },
                { icon: LayoutDashboard, title: 'Urban Planning', desc: 'Shaping neighborhoods.' }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:bg-white/5 transition-colors">
                  <item.icon className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* SKILLS REQUIRED & TOP COLLEGES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SKILLS */}
        <motion.section variants={itemVariants} className="lg:col-span-1 bg-slate-900/80 rounded-[20px] border border-white/10 p-6 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">Skills You Need</h2>
          <div className="flex flex-col gap-3">
            {[
              { icon: PenTool, name: 'Drawing & Sketching' },
              { icon: BrainCircuit, name: 'Spatial Thinking' },
              { icon: Compass, name: 'Problem Solving' },
              { icon: Monitor, name: 'Software (CAD/3D)' }
            ].map((skill, i) => (
              <motion.div whileHover={{ scale: 1.02 }} key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <skill.icon className="w-5 h-5 text-sky-400" />
                <span className="text-sm font-medium text-slate-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COLLEGES */}
        <motion.section variants={itemVariants} className="lg:col-span-2 bg-slate-900/80 rounded-[20px] border border-white/10 p-6 flex flex-col shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Top Architecture Colleges</h2>
            <Link to="/dashboard" className="text-cyan-400 text-xs font-medium hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {COLLEGES.slice(0, 4).map((college) => {
              const isSaved = savedColleges.some(c => c.id === college.id);
              return (
                <div key={college.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">#{college.ranking}</span>
                    <span className="text-[9px] uppercase tracking-wider bg-cyan-400 text-black px-1.5 py-0.5 rounded font-bold">
                      {college.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{college.name}</h3>
                  <div className="text-xs text-slate-400 space-y-1 mb-3">
                    <p>{college.location}</p>
                    <p>{college.fees}</p>
                  </div>
                  <button 
                    onClick={() => isSaved ? removeCollege(college.id) : saveCollege(college)}
                    className={cn(
                      "mt-auto py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                      isSaved 
                        ? "bg-white/5 text-white border-white/10" 
                        : "bg-sky-400 text-[#030712] border-transparent hover:bg-sky-300"
                    )}
                  >
                    {isSaved ? 'Saved' : 'Save College'}
                  </button>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* CAREER SCOPE */}
      <motion.section variants={itemVariants} className="bg-slate-900/80 rounded-[20px] border border-white/10 p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4">Career Scope & Salary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
            <Briefcase className="w-5 h-5 text-sky-400 mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">Entry Level (0-2 Yrs)</h4>
            <p className="text-xs text-slate-400">₹3L - ₹5L per annum. Focus on learning software and practical execution.</p>
          </div>
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
            <GraduationCap className="w-5 h-5 text-sky-400 mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">Mid Level (3-5 Yrs)</h4>
            <p className="text-xs text-slate-400">₹6L - ₹12L per annum. Managing projects, leading design teams.</p>
          </div>
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
            <TrendingUp className="w-5 h-5 text-sky-400 mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">Future Trends</h4>
            <p className="text-xs text-slate-400">AI in Design, Sustainable Architecture, Parametric Design, VR Walkthroughs.</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
