'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { ChatModal } from './components/ChatModal';
import { SyncAvatar } from './components/SyncAvatar';
import { HeroSection } from './components/HeroSection';
import { RestyleSection } from './components/RestyleSection';
import { GoLiveSection } from './components/GoLiveSection';
import { CreativeShowcase } from './components/CreativeShowcase';
import { FooterSection } from './components/FooterSection';

type SyncSection = 'hero' | 'restyle' | 'golive' | 'showcase' | 'footer';

// Smooth easing configurations
const SMOOTH_CONFIG = {
  spring: { stiffness: 100, damping: 30, mass: 0.8 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  smooth: { type: "spring" as const, stiffness: 50, damping: 20 },
  ethereal: { duration: 1.2, ease: [0.165, 0.84, 0.44, 1] },
};

export default function App() {
  const [currentSection, setCurrentSection] = useState<SyncSection>('hero');
  const [userActivity, setUserActivity] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  
  // Refs for performance optimization
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  // Motion values for smooth interpolation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);
  
  // Smooth spring animations
  const smoothMouseX = useSpring(mouseX, SMOOTH_CONFIG.spring);
  const smoothMouseY = useSpring(mouseY, SMOOTH_CONFIG.spring);
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 25 });
  
  // Scroll-based transforms
  const { scrollYProgress } = useScroll({ container: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const parallaxMedium = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  
  // Derived motion values
  const cursorGlow = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) => `radial-gradient(circle 100px at ${x}px ${y}px, rgba(139, 0, 0, 0.1) 0%, transparent 70%)`
  );

  // Page load effect with smooth transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Optimized mouse tracking with RAF
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        
        mouseX.set(x);
        mouseY.set(y);
        setCursorPosition({ x, y });
        
        setIsMouseMoving(true);
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }
        mouseTimeoutRef.current = setTimeout(() => {
          setIsMouseMoving(false);
        }, 100);
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [mouseX, mouseY]);

  // Optimized scroll handling with intersection observer
  const updateScrollProgress = useCallback(() => {
    const currentScrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((currentScrollY / maxScroll) * 100, 100);
    
    scrollY.set(currentScrollY);
    lastScrollY.current = currentScrollY;
    
    // Smooth section detection
    const sections = ['hero', 'restyle', 'golive', 'showcase', 'footer'] as const;
    const sectionElements = sections.map(id => document.querySelector(`[data-section="${id}"]`));
    
    let newSection: SyncSection = 'hero';
    const viewportCenter = window.innerHeight / 2;
    
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const element = sectionElements[i];
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        if (elementCenter <= viewportCenter) {
          newSection = sections[i];
          break;
        }
      }
    }

    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      trackActivity(`smoothly entered ${newSection} section`);
    }
  }, [currentSection, scrollY]);

  // Smooth scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        updateScrollProgress();
        rafRef.current = null;
      });
    }
  }, [updateScrollProgress]);

  // Enhanced activity tracking
  const trackActivity = useCallback((activity: string) => {
    setUserActivity(prev => {
      const timestamp = new Date().toISOString();
      const newActivity = [...prev, `${timestamp}: ${activity}`].slice(-20);
      return newActivity;
    });
  }, []);

  // Memoized handlers for performance
  const handleNavigate = useCallback((section: string) => {
    trackActivity(`navigated to ${section} with smooth scroll`);
  }, [trackActivity]);

  const handleChatOpen = useCallback(() => {
    setIsChatOpen(true);
    trackActivity('opened chat with Sync° (smooth transition)');
  }, [trackActivity]);

  const handleChatClose = useCallback(() => {
    setIsChatOpen(false);
    trackActivity('closed chat with Sync° (smooth transition)');
  }, [trackActivity]);

  // Enhanced click tracking with smooth feedback
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const ripple = document.createElement('div');
    
    // Create smooth ripple effect
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 600ms ease-out;
        z-index: 1000;
      `;
      
      target.style.position = 'relative';
      target.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    }
    
    if (target.tagName === 'BUTTON') {
      const buttonText = target.textContent || target.getAttribute('aria-label') || 'unknown';
      trackActivity(`clicked button: ${buttonText} with smooth feedback`);
    } else if (target.closest('[data-upload-area]')) {
      trackActivity('interacted with upload area (smooth)');
    } else if (target.closest('[data-style-preset]')) {
      trackActivity('clicked style preset (smooth transition)');
    }
  }, [trackActivity]);

  // Keyboard interactions with smooth handling
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isChatOpen) {
      handleChatClose();
    } else if (e.key === 'Tab') {
      trackActivity('keyboard navigation (smooth focus)');
    }
  }, [isChatOpen, handleChatClose, trackActivity]);

  // Setup optimized event listeners
  useEffect(() => {
    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackActivity('returned to page (smooth re-engagement)');
      }
    };

    // Optimized event listeners with passive options
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial calls
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      document.head.removeChild(style);
    };
  }, [handleScroll, updateMousePosition, handleClick, handleKeyDown, trackActivity]);

  // Memoized mouse position for child components
  const memoizedMousePosition = useMemo(() => cursorPosition, [cursorPosition]);
  
  // Smooth section indicator data
  const sectionData = useMemo(() => [
    { id: 'hero' as const, label: 'Home', color: 'from-red-500 to-red-600' },
    { id: 'restyle' as const, label: 'Restyle', color: 'from-red-600 to-red-700' },
    { id: 'golive' as const, label: 'Go Live', color: 'from-red-700 to-red-800' },
    { id: 'showcase' as const, label: 'Gallery', color: 'from-red-600 to-red-700' },
    { id: 'footer' as const, label: 'Connect', color: 'from-red-500 to-red-600' },
  ], []);

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-black text-white relative smooth-scroll-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={SMOOTH_CONFIG.ethereal}
    >
      {/* Smooth cursor glow effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: cursorGlow,
          transition: 'background 0.1s ease-out',
        }}
      />
      
      {/* Enhanced parallax background layers */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-red-900/5 via-transparent to-transparent" />
        
        {/* Smooth floating particles with different parallax speeds */}
        <motion.div style={{ y: parallaxSlow }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-red-400 rounded-full opacity-20 smooth-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            />
          ))}
        </motion.div>
        
        <motion.div style={{ y: parallaxMedium }}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full opacity-15 smooth-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 8 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Sticky Navigation with smooth backdrop */}
      <Navigation 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
      />
      
      {/* Enhanced Sync° Avatar with smooth interactions */}
      <SyncAvatar 
        currentSection={currentSection}
        scrollProgress={smoothScrollY.get()}
        mousePosition={memoizedMousePosition}
        userActivity={userActivity}
        onChatOpen={handleChatOpen}
      />
      
      {/* Smooth Chat Modal */}
      <ChatModal 
        isOpen={isChatOpen}
        onClose={handleChatClose}
      />
      
      {/* Main content sections with smooth scroll snap */}
      <main className="relative z-10">
        <motion.div 
          data-section="hero" 
          className="smooth-scroll-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SMOOTH_CONFIG.transition, delay: 0.2 }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div 
          data-section="restyle" 
          className="smooth-scroll-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={SMOOTH_CONFIG.ethereal}
        >
          <RestyleSection />
        </motion.div>
        
        <motion.div 
          data-section="golive" 
          className="smooth-scroll-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={SMOOTH_CONFIG.ethereal}
        >
          <GoLiveSection />
        </motion.div>
        
        <motion.div 
          data-section="showcase" 
          className="smooth-scroll-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={SMOOTH_CONFIG.ethereal}
        >
          <CreativeShowcase />
        </motion.div>
        
        <motion.div 
          data-section="footer" 
          className="smooth-scroll-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={SMOOTH_CONFIG.ethereal}
        >
          <FooterSection />
        </motion.div>
      </main>
      
      {/* Enhanced smooth scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-40">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-600 to-red-400 relative smooth-element"
          style={{ 
            scaleX: scrollYProgress,
            transformOrigin: "0% 50%"
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full glow-red transform translate-x-1/2"
            animate={{
              scale: isMouseMoving ? [1, 1.2, 1] : 1,
              boxShadow: isMouseMoving 
                ? ["0 0 10px rgba(139, 0, 0, 0.5)", "0 0 20px rgba(139, 0, 0, 0.8)", "0 0 10px rgba(139, 0, 0, 0.5)"]
                : "0 0 10px rgba(139, 0, 0, 0.5)"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Smooth section indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3">
          {sectionData.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => {
                const element = document.querySelector(`[data-section="${section.id}"]`);
                element?.scrollIntoView({ behavior: 'smooth' });
                handleNavigate(section.id);
              }}
              className={`relative w-3 h-8 rounded-full transition-all duration-500 scroll-indicator ${
                currentSection === section.id 
                  ? `bg-gradient-to-b ${section.color} glow-red-intense scale-110` 
                  : 'bg-gray-600 hover:bg-gray-500 hover:scale-105'
              }`}
              title={section.label}
              whileHover={{ 
                scale: currentSection === section.id ? 1.15 : 1.1,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                ...SMOOTH_CONFIG.transition, 
                delay: index * 0.1 + 0.5 
              }}
            >
              {/* Smooth glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-400/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={currentSection === section.id ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                } : {
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 2,
                  repeat: currentSection === section.id ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced current section info with smooth animations */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SMOOTH_CONFIG.transition, delay: 1 }}
      >
        <motion.div 
          className="glass-smooth rounded-xl px-6 py-4 backdrop-blur-lg"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={SMOOTH_CONFIG.smooth}
        >
          <motion.p 
            className="text-lg text-red-400 capitalize font-medium"
            key={currentSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection === 'golive' ? 'Go Live' : currentSection}
          </motion.p>
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-400 mt-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${
                currentSection === 'footer' ? 'bg-gray-500' : 'bg-red-500'
              }`}
              animate={currentSection !== 'footer' ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Sync° is {currentSection === 'footer' ? 'resting' : 'active'}</span>
            <span>•</span>
            <span>{userActivity.length} interactions</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Smooth loading overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={SMOOTH_CONFIG.ethereal}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-red-400 text-xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Awakening Sync°...
          </motion.p>
          <motion.div 
            className="mt-4 h-1 w-32 bg-gray-800 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Smooth mouse trail effect */}
      {isMouseMoving && (
        <motion.div
          className="fixed pointer-events-none z-30"
          style={{
            left: smoothMouseX,
            top: smoothMouseY,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-6 h-6 border border-red-400/50 rounded-full -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-red-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}