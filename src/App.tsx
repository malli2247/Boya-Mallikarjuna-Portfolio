import React, { useState } from 'react';
import { ToastProvider } from './components/Toast';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';
import { MouseSpotlight } from './components/MouseSpotlight';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  const [initialLoaded, setInitialLoaded] = useState(() => {
    try {
      return Boolean(sessionStorage.getItem('bm_initial_loaded'));
    } catch {
      return false;
    }
  });

  const handleInitialLoadComplete = () => {
    setInitialLoaded(true);
    try {
      sessionStorage.setItem('bm_initial_loaded', 'true');
    } catch {
      // ignore storage errors
    }
  };

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-[#000000] text-slate-100 overflow-x-hidden selection:bg-[#FF1768]/30 selection:text-[#06D6FF]">
        {/* Full-Screen Premium Minimalist Loading Screen (Initial Load Only) */}
        {!initialLoaded && (
          <LoadingScreen onComplete={handleInitialLoadComplete} duration={2000} />
        )}

        {/* Top 2.5px Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Dual-Layer Custom Interactive Cursor (Desktop Only) */}
        <CustomCursor />

        {/* Background Neural Grid and Ambient Canvas */}
        <ParticleBackground />
        <MouseSpotlight />

        {/* Static Subtle Grid Layer */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-30" 
          aria-hidden="true" 
        />

        {/* Global Ambient Glow Nodes */}
        <div 
          className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FF1768]/10 via-[#8B5CF6]/10 to-transparent blur-[140px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        <div 
          className="fixed bottom-[10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#06D6FF]/10 via-[#3B82F6]/10 to-transparent blur-[140px] pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Floating Glass Navigation */}
        <Navbar />

        {/* Main Content Sections with smooth entrance once initialized */}
        <main
          className={`relative z-10 space-y-6 sm:space-y-12 transition-all duration-1000 ease-out ${
            initialLoaded ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
          }`}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default App;
