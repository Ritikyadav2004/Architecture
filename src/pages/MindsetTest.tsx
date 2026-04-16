import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, CheckCircle, RotateCcw, Lightbulb, Compass, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const QUESTIONS = [
  {
    id: 1,
    text: "When you see a building, what attracts you most?",
    options: [
      { text: "Its design and shape", score: 3 },
      { text: "How space is used inside", score: 2 },
      { text: "Materials and construction", score: 1 },
      { text: "I don't notice much", score: 0 }
    ]
  },
  {
    id: 2,
    text: "What do you enjoy more?",
    options: [
      { text: "Sketching or doodling ideas", score: 3 },
      { text: "Solving logical/maths problems", score: 2 },
      { text: "Watching how things are built", score: 1 },
      { text: "None of these", score: 0 }
    ]
  },
  {
    id: 3,
    text: "Imagine you have a small room. What would you do?",
    options: [
      { text: "Decorate it creatively", score: 3 },
      { text: "Arrange things efficiently", score: 2 },
      { text: "Think about structure and safety", score: 1 },
      { text: "Leave it as it is", score: 0 }
    ]
  },
  {
    id: 4,
    text: "How do you usually think?",
    options: [
      { text: "Visually (images/designs)", score: 3 },
      { text: "Logically (steps/numbers)", score: 2 },
      { text: "Practically (real-world use)", score: 1 },
      { text: "Randomly", score: 0 }
    ]
  },
  {
    id: 5,
    text: "When visiting a new place, you:",
    options: [
      { text: "Notice design and aesthetics", score: 3 },
      { text: "Observe layout and planning", score: 2 },
      { text: "Think how it was built", score: 1 },
      { text: "Just enjoy without noticing", score: 0 }
    ]
  },
  {
    id: 6,
    text: "Which activity sounds most interesting?",
    options: [
      { text: "Designing a house", score: 3 },
      { text: "Solving puzzles", score: 2 },
      { text: "Building models", score: 1 },
      { text: "Watching videos", score: 0 }
    ]
  }
];

export default function MindsetTest() {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 = intro
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const setMindsetScore = useStore(state => state.setMindsetScore);

  const handleOptionSelect = (score: number) => {
    const newScore = totalScore + score;
    setTotalScore(newScore);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setMindsetScore(newScore);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(-1);
    setTotalScore(0);
    setShowResult(false);
  };

  const getResultFeedback = (score: number) => {
    if (score >= 12) {
      return {
        level: "Strong Architecture Mindset",
        icon: <Target className="w-12 h-12 text-sky-400" />,
        description: "You naturally think like an architect! You possess strong creative and spatial abilities.",
        tips: [
          "Start preparing for NATA immediately.",
          "Build a design portfolio with your sketches.",
          "Familiarize yourself with architectural software basics."
        ],
        gradient: "from-blue-500/20 to-sky-400/20",
        ring: "ring-sky-400"
      };
    } else if (score >= 6) {
      return {
        level: "Potential with Improvement",
        icon: <Compass className="w-12 h-12 text-yellow-400" />,
        description: "You have several important traits. With targeted practice, you can definitely grow into architecture.",
        tips: [
          "Practice sketching and doodling daily.",
          "Work on improving your spatial thinking through puzzles.",
          "Read about famous architects and their designs."
        ],
        gradient: "from-yellow-400/20 to-orange-500/20",
        ring: "ring-yellow-400"
      };
    } else {
      return {
        level: "Explore More",
        icon: <Lightbulb className="w-12 h-12 text-slate-400" />,
        description: "Architecture may not be your absolute most natural fit yet, but skills can always be developed if you are passionate.",
        tips: [
          "Explore other creative fields alongside architecture.",
          "Try out beginner design exercises to test your interest.",
          "Focus on developing observation skills."
        ],
        gradient: "from-slate-500/20 to-slate-700/20",
        ring: "ring-slate-400"
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <AnimatePresence mode="wait">
        
        {/* Intro Screen */}
        {currentQuestion === -1 && !showResult && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center text-center space-y-8 py-12"
          >
            <div className="w-24 h-24 bg-cyan-400/10 rounded-full flex items-center justify-center border border-cyan-400/20">
              <Brain className="w-12 h-12 text-sky-400" />
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">Architecture Mindset</span>
              </h1>
              <p className="text-lg text-slate-300">
                Not sure if Architecture is the right path for you? Take this quick, psychology-inspired 2-minute test to evaluate your natural thinking style.
              </p>
            </div>

            <div className="bg-card w-full max-w-md rounded-2xl border border-white/10 p-6 text-left space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" /> Test Design Principles
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> No right or wrong answers</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Based on behavior, thinking, and preference</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Fast, engaging, and beginner-friendly</li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentQuestion(0)}
              className="px-8 py-4 bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-sky-400/20 transition-all active:scale-95 flex items-center gap-3 text-lg"
            >
              Start the Test <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Questions Screen */}
        {currentQuestion >= 0 && !showResult && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto w-full"
          >
            {/* Progress Bar */}
            <div className="mb-8 space-y-2">
              <div className="flex justify-between text-sm text-slate-400 font-medium">
                <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full"
                />
              </div>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-snug">
                {QUESTIONS[currentQuestion].text}
              </h2>

              <div className="space-y-4">
                {QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.score)}
                    className="w-full text-left p-4 sm:p-6 rounded-xl border border-white/10 bg-slate-800/50 hover:bg-slate-700/50 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-200 text-slate-200 font-medium sm:text-lg group flex items-center justify-between"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-400" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Result Screen */}
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto w-full text-center space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Your Architecture Mindset Profile</h2>
              <p className="text-slate-400">Based on your responses, here is your evaluation.</p>
            </div>

            {(() => {
              const feedback = getResultFeedback(totalScore);
              return (
                <div className="bg-card border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden relative shadow-2xl">
                  {/* Decorative faint background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feedback.gradient} opacity-20 pointer-events-none`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-slate-900 border ring-4 ring-offset-4 ring-offset-slate-900 ${feedback.ring}`}>
                      {feedback.icon}
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-semibold tracking-widest text-slate-400 uppercase">Your Result</div>
                      <h3 className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feedback.gradient.replace('/20', '')}`}>
                        {feedback.level}
                      </h3>
                      <p className="text-lg text-slate-300 max-w-md mx-auto pt-4 leading-relaxed">
                        {feedback.description}
                      </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-4"></div>

                    <div className="w-full text-left space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" /> Recommended Next Steps
                      </h4>
                      <ul className="space-y-3">
                        {feedback.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 bg-slate-800/40 p-4 rounded-xl border border-white/5">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">{i + 1}</span>
                            <span className="text-slate-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => navigate('/chatbot')}
                className="w-full sm:w-auto px-8 py-4 bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-sky-400/20 transition-all"
              >
                Chat with AI Mentor
              </button>
              <button
                onClick={resetTest}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
