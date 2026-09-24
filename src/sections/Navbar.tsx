import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(['home', ...NAV_ITEMS.map((item) => item.id)], 100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`w-[96%] max-w-6xl pointer-events-auto transition-all duration-300 flex items-center justify-between px-5 sm:px-7 min-h-[66px] sm:min-h-[72px] ${
          isScrolled ? 'glass-nav-scrolled' : 'glass-nav'
        }`}
      >
        {/* LEFT: Circular gradient logo containing 'BM' + Boya Mallikarjuna */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          data-cursor="link"
          className="flex items-center gap-3 group outline-none select-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#FF1768]/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#08090D] rounded-full flex items-center justify-center">
              <span className="font-display font-extrabold text-xs text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">
                BM
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-[#06D6FF] transition-colors">
              Boya Mallikarjuna
            </span>
          </div>
        </a>

        {/* CENTER: Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  data-cursor="button"
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#FF1768] to-[#06D6FF] rounded-full shadow-[0_0_8px_#FF1768]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: 'Hire Me' pill button with pink -> purple gradient */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            data-cursor="button"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF1768] via-[#7C4DFF] to-[#8B5CF6] shadow-[0_0_25px_rgba(255,23,104,0.45)] hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[82px] inset-x-4 max-w-md mx-auto pointer-events-auto rounded-3xl glass-nav-scrolled p-5 md:hidden animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl border border-white/15">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF1768]/20 to-[#8B5CF6]/20 text-white border border-[#FF1768]/40'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#06D6FF]" />}
                </button>
              );
            })}

            {/* Mobile Contact Quick Action */}
            <div className="pt-3 mt-2 border-t border-white/10 space-y-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-xs font-mono hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF1768]" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] shadow-[0_0_20px_rgba(255,23,104,0.4)]"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
