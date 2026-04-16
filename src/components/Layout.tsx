import { Link, Outlet, useLocation } from 'react-router-dom';
import { Compass, LayoutDashboard, MessageSquare, BrainCircuit, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass, letter: 'H' },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, letter: 'D' },
    { name: 'AI Mentor', path: '/ai-mentor', icon: MessageSquare, letter: 'M' },
    { name: 'Mindset Test', path: '/mindset-test', icon: BrainCircuit, letter: 'T' },
  ];

  return (
    <div className="flex h-screen bg-[#030712] text-slate-50 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-20 bg-slate-900/80 border-r border-white/10 flex-col items-center py-6 gap-8 shrink-0">
        <Link 
          to="/"
          title="ArchiNova Home"
          className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/50 flex items-center justify-center font-extrabold text-xl text-sky-400 hover:bg-sky-500/30 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        >
          A
        </Link>
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                title={link.name}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all",
                  isActive 
                    ? "bg-sky-400 text-[#030712] shadow-[0_0_15px_#38bdf8]" 
                    : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 h-16">
        <Link 
          to="/"
          className="w-8 h-8 rounded bg-sky-500/20 border border-sky-500/50 flex items-center justify-center font-bold text-sky-400"
        >
          A
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#030712] p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium",
                    isActive 
                      ? "bg-sky-400/10 text-sky-400 border border-sky-400/20" 
                      : "bg-white/[0.03] border border-white/10 text-slate-400"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
}
