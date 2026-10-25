import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from '../components/SocialIcons';
import profileImg from '../assets/profile.jpg';

export const Hero: React.FC = () => {
  const roles = [
    'AI & ML Engineer',
    'Machine Learning Developer',
    'Full Stack Developer',
    'AI Solutions Developer',
    'Software Engineer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Parallax offsets
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Disabled on touch/mobile
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const currentWord = roles[currentRoleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const scrollTo = (id: string) => {
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
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[95vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      {/* Pink/purple glow behind the center-left hero text */}
      <div
        className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FF1768]/15 via-[#8B5CF6]/15 to-transparent blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      {/* Blue/cyan glow behind the profile image */}
      <div
        className="absolute top-1/3 right-0 sm:right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#06D6FF]/18 via-[#3B82F6]/15 to-transparent blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 max-w-[750px] w-full">
          {/* Status Badge: Available for opportunities */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06D6FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06D6FF] shadow-[0_0_8px_#06D6FF]" />
            </span>
            <span className="text-xs sm:text-sm font-mono text-slate-300 tracking-wide">
              {PERSONAL_INFO.status}
            </span>
          </div>

          {/* ================= EXACT 3-LINE HERO HEADING STRUCTURE ================= */}
          <div className="hero-content w-full">
            {/* LINE 1: Greeting */}
            <div className="hero-greeting font-sans font-bold text-[#F8FAFC] tracking-[-0.02em] leading-[1.05] text-3xl sm:text-5xl lg:text-[54px] xl:text-[68px] mb-2 sm:mb-3">
              Hello, I'm
            </div>

            {/* LINES 2 & 3: Main Heading */}
            <h1 className="flex flex-col gap-2 sm:gap-3">
              {/* LINE 2: Boya Mallikarjuna */}
              <span
                className="block font-sans font-extrabold tracking-[-0.02em] leading-[1.05] text-4xl sm:text-6xl lg:text-[60px] xl:text-[72px] lg:whitespace-nowrap bg-clip-text text-transparent filter drop-shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FF1768 0%, #8B5CF6 35%, #3B82F6 70%, #06D6FF 100%)',
                }}
              >
                Boya Mallikarjuna
              </span>

              {/* LINE 3: — AI & ML Engineer */}
              <span className="block font-sans font-extrabold tracking-[-0.02em] leading-[1.05] text-3xl sm:text-5xl lg:text-[54px] xl:text-[66px] text-[#F8FAFC] lg:whitespace-nowrap filter drop-shadow-[0_0_18px_rgba(6,214,255,0.22)]">
                — AI &amp; ML Engineer
              </span>
            </h1>
          </div>

          {/* Animated Role Line (Below — AI & ML Engineer, Above description) */}
          <div className="h-7 sm:h-8 flex items-center font-mono text-base sm:text-lg lg:text-xl font-semibold mt-6 mb-4 whitespace-nowrap">
            <span className="text-transparent bg-gradient-to-r from-[#06D6FF] via-[#3B82F6] to-[#8B5CF6] bg-clip-text font-bold">
              {displayText}
            </span>
            <span className="inline-block w-2 h-5 bg-[#06D6FF] ml-1.5 animate-pulse shadow-[0_0_8px_#06D6FF]" />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-[19px] text-slate-300 max-w-[600px] leading-[1.6] mb-8 font-normal">
            {PERSONAL_INFO.tagline}
          </p>

          {/* CTA Buttons: [View My Work] [Download Resume] [GitHub] [Let's Connect] */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('projects')}
              data-cursor="button"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#FF1768] via-[#7C4DFF] to-[#8B5CF6] shadow-[0_0_30px_rgba(255,23,104,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="./resume/Boya_Mallikarjuna_Resume.pdf"
              download="Boya_Mallikarjuna_Resume.pdf"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#06D6FF] shadow-[0_0_25px_rgba(6,214,255,0.35)] hover:shadow-[0_0_35px_rgba(6,214,255,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Resume</span>
            </a>

            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.10] border border-white/15 hover:border-white/30 backdrop-blur-md shadow-glass-nav transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              data-cursor="button"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.10] border border-white/15 hover:border-white/30 backdrop-blur-md shadow-glass-nav transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-[#FF1768]" />
              <span>Let's Connect</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Circular Profile Image + Floating HUD Badges ================= */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
          {/* Circular Frame Wrapper with Parallax */}
          <div
            className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] xl:w-[460px] xl:h-[460px] flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0)`,
            }}
          >
            {/* Ambient Conic Glowing Aura */}
            <div
              className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#FF1768,#8B5CF6,#06D6FF,#3B82F6,#FF1768)] opacity-70 blur-2xl animate-spin-slow pointer-events-none"
              aria-hidden="true"
            />

            {/* Inner background shield */}
            <div className="absolute inset-1 rounded-full bg-[#050609]" />

            {/* The Actual Real User Profile Photo */}
            <div className="absolute inset-3 rounded-full overflow-hidden border border-white/20 shadow-2xl z-10 group">
              <img
                src={profileImg}
                alt="Boya Mallikarjuna"
                className="w-full h-full object-cover object-[50%_18%] filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              {/* Subtle futuristic HUD overlay ring on hover */}
              <div className="absolute inset-0 rounded-full border-2 border-[#06D6FF]/20 pointer-events-none" />
            </div>

            {/* ================= FLOATING PROFILE BADGES WITH PARALLAX ================= */}
            {/* Top Badge: CGPA 9.30 / 10 in cyan monospace */}
            <div
              className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full bg-[#08090D]/90 border border-[#06D6FF]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(6,214,255,0.35)] flex items-center gap-2 animate-float-slow transition-transform duration-300 ease-out"
              style={{
                transform: `translate(calc(-50% + ${mouseOffset.x * -14}px), ${mouseOffset.y * -14}px)`,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#06D6FF] shadow-[0_0_6px_#06D6FF]" />
              <span className="font-mono text-xs sm:text-sm font-bold text-[#06D6FF] tracking-wider uppercase">
                CGPA 9.30 / 10
              </span>
            </div>

            {/* HUD Badge: ML (Electric Pink) */}
            <div
              className="absolute top-12 -left-4 sm:-left-8 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B0C10]/85 border border-[#FF1768]/40 backdrop-blur-xl shadow-[0_0_25px_rgba(255,23,104,0.35)] flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-[#FF1768] animate-float-reverse transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -18}px, 0)`,
              }}
            >
              ML
            </div>

            {/* HUD Badge: PY (Blue / Cyan) */}
            <div
              className="absolute bottom-16 -left-2 sm:-left-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B0C10]/85 border border-[#3B82F6]/40 backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.35)] flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-[#3B82F6] animate-float-slow transition-transform duration-300 ease-out"
              style={{
                animationDelay: '1.2s',
                transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 0)`,
              }}
            >
              PY
            </div>

            {/* HUD Badge: AI (Cyan Glow) */}
            <div
              className="absolute -right-3 sm:-right-6 top-16 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B0C10]/85 border border-[#06D6FF]/40 backdrop-blur-xl shadow-[0_0_25px_rgba(6,214,255,0.35)] flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-[#06D6FF] animate-float-reverse transition-transform duration-300 ease-out"
              style={{
                animationDelay: '2.4s',
                transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * -14}px, 0)`,
              }}
            >
              AI
            </div>

            {/* HUD Badge: {} (Pink / Purple) */}
            <div
              className="absolute -right-2 sm:-right-5 bottom-12 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B0C10]/85 border border-[#8B5CF6]/40 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.35)] flex items-center justify-center font-mono text-sm sm:text-base font-bold text-[#FF1768] animate-float-slow transition-transform duration-300 ease-out"
              style={{
                animationDelay: '1.8s',
                transform: `translate3d(${mouseOffset.x * -15}px, ${mouseOffset.y * 15}px, 0)`,
              }}
            >
              &#123;&#125;
            </div>

            {/* Bottom mini status node: Code */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#0B0C10]/90 border border-white/15 backdrop-blur-xl shadow-glass flex items-center gap-2 animate-float-reverse transition-transform duration-300 ease-out"
              style={{
                transform: `translate(calc(-50% + ${mouseOffset.x * 10}px), ${mouseOffset.y * 10}px)`,
              }}
            >
              <span className="font-mono text-[11px] font-semibold text-slate-300 tracking-wider">
                &lt;Code /&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
