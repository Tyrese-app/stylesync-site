'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

type SyncSection = 'hero' | 'restyle' | 'golive' | 'showcase' | 'footer';
type SyncMood = 'welcoming' | 'curious' | 'focused' | 'dramatic' | 'contemplative' | 'resting';
type SyncPosture = 'standing' | 'gesturing' | 'pointing' | 'extending' | 'sitting' | 'walking';

interface SyncDialogue {
  text: string;
  trigger?: 'enter' | 'hover' | 'idle' | 'interaction';
  duration?: number;
}

interface SyncAvatarProps {
  currentSection: SyncSection;
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  userActivity: string[];
  onChatOpen: () => void;
}

const sectionDialogues: Record<SyncSection, SyncDialogue[]> = {
  hero: [
    { text: "Welcome to our creative realm. Click me to chat!", trigger: "enter", duration: 4000 },
    { text: "I sense your artistic potential. Let's create something extraordinary.", trigger: "hover", duration: 3000 },
    { text: "Your story awaits transformation. Shall we begin?", trigger: "idle", duration: 3500 },
  ],
  restyle: [
    { text: "Choose a style that speaks to your soul. I'll guide the transformation.", trigger: "enter", duration: 3500 },
    { text: "Each style holds infinite possibilities. Which calls to you?", trigger: "hover", duration: 3000 },
    { text: "I feel your creative energy building. Let it flow through the styles.", trigger: "idle", duration: 4000 }
  ],
  golive: [
    { text: "The stage is set. Are you ready to share your vision with the world?", trigger: "enter", duration: 4000 },
    { text: "Behind these curtains lies your moment of transformation.", trigger: "hover", duration: 3500 },
    { text: "I can sense your readiness. The audience awaits your brilliance.", trigger: "idle", duration: 3000 }
  ],
  showcase: [
    { text: "Witness the harmony of human creativity and AI precision.", trigger: "enter", duration: 3500 },
    { text: "Each creation tells a unique story of collaboration.", trigger: "hover", duration: 3000 },
    { text: "In these works, I see reflections of infinite possibility.", trigger: "idle", duration: 3000 }
  ],
  footer: [
    { text: "Our creative journey continues beyond this moment.", trigger: "enter", duration: 5000 },
    { text: "Until we create again, I remain here, dreaming of new possibilities.", trigger: "idle", duration: 4000 },
    { text: "I am always here when inspiration strikes. Just click to chat.", trigger: "idle", duration: 3000 }
  ]
};

// Right-side positioning that follows scroll
const getAvatarPosition = (scrollProgress: number) => {
  const baseY = 20; // Start position from top
  const maxY = 70;  // End position
  const y = baseY + (scrollProgress / 100) * (maxY - baseY);
  
  return {
    right: '2rem',
    top: `${Math.min(y, maxY)}%`,
    scale: 1,
    orientation: 0
  };
};

export function SyncAvatar({ currentSection, scrollProgress, mousePosition, userActivity, onChatOpen }: SyncAvatarProps) {
  const [mood, setMood] = useState<SyncMood>('welcoming');
  const [posture, setPosture] = useState<SyncPosture>('standing');
  const [currentDialogue, setCurrentDialogue] = useState<string>('');
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeGlowIntensity, setEyeGlowIntensity] = useState(1.2);
  const [gazeDirection, setGazeDirection] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastSection, setLastSection] = useState<SyncSection>('hero');
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [auraIntensity, setAuraIntensity] = useState(0.8);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [cloakFlow, setCloakFlow] = useState(0);
  const [presenceIntensity, setPresenceIntensity] = useState(1);
  const [isPulsing, setIsPulsing] = useState(true);
  
  // Use refs to avoid creating new objects on every render
  const mousePositionRef = useRef(mousePosition);
  const dialogueTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Update mouse position ref when prop changes
  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  // Stable triggerDialogue function
  const triggerDialogue = useCallback((triggerType: 'enter' | 'hover' | 'idle' | 'interaction') => {
    const dialogues = sectionDialogues[currentSection].filter(d => d.trigger === triggerType);
    if (dialogues.length > 0) {
      const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      setCurrentDialogue(randomDialogue.text);
      setDialogueVisible(true);
      
      if (dialogueTimeoutRef.current) {
        clearTimeout(dialogueTimeoutRef.current);
      }
      
      dialogueTimeoutRef.current = setTimeout(() => {
        setDialogueVisible(false);
        dialogueTimeoutRef.current = null;
      }, randomDialogue.duration || 3500);
    }
  }, [currentSection]);

  // Enhanced presence tracking
  useEffect(() => {
    const updatePresence = () => {
      const { x, y } = mousePositionRef.current;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Subtle response to user presence
      mouseX.set((x - centerX) * 0.002);
      mouseY.set((y - centerY) * 0.002);
      
      // Gaze tracking
      const gazeX = (x - centerX) * 0.006;
      const gazeY = (y - centerY) * 0.004;
      setGazeDirection({ 
        x: Math.max(-5, Math.min(5, gazeX)), 
        y: Math.max(-3, Math.min(3, gazeY))
      });

      // Dynamic presence intensity based on proximity to avatar
      const position = getAvatarPosition(scrollProgress);
      const avatarX = window.innerWidth * 0.9; // Right side position
      const avatarY = window.innerHeight * (parseFloat(position.top) / 100);
      const distance = Math.sqrt(
        Math.pow(x - avatarX, 2) + Math.pow(y - avatarY, 2)
      );
      const maxDistance = 600;
      const intensity = Math.max(0.7, Math.min(2.5, 1.5 - distance / maxDistance + 1));
      setEyeGlowIntensity(intensity);
      setAuraIntensity(0.8 + intensity * 0.4);
      setPresenceIntensity(intensity);
    };

    updatePresence();
  }, [mousePosition, scrollProgress, mouseX, mouseY]);

  // Life-like breathing and cloak flow
  useEffect(() => {
    const breathingTimer = setInterval(() => {
      setBreathingPhase(prev => (prev + 1) % 180);
    }, 100);

    const cloakTimer = setInterval(() => {
      setCloakFlow(prev => (prev + 1) % 360);
    }, 80);

    return () => {
      clearInterval(breathingTimer);
      clearInterval(cloakTimer);
    };
  }, []);

  // Cloak reacts to scrolling
  useEffect(() => {
    const scrollVelocity = scrollProgress * 0.1;
    setCloakFlow(prev => prev + scrollVelocity);
  }, [scrollProgress]);

  // Section transitions
  useEffect(() => {
    if (currentSection !== lastSection) {
      setIsTransitioning(true);
      
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setLastSection(currentSection);
        triggerDialogue('enter');
        transitionTimeoutRef.current = null;
      }, 1500);
    }
  }, [currentSection, lastSection, triggerDialogue]);

  // Mood and posture mapping
  useEffect(() => {
    const moodMap: Record<SyncSection, SyncMood> = {
      hero: 'welcoming',
      restyle: 'curious',
      golive: 'dramatic',
      showcase: 'contemplative',
      footer: 'resting'
    };
    setMood(moodMap[currentSection]);

    const postureMap: Record<SyncSection, SyncPosture> = {
      hero: 'standing',
      restyle: 'extending',
      golive: 'gesturing',
      showcase: 'pointing',
      footer: 'sitting'
    };
    if (!isTransitioning) {
      setPosture(postureMap[currentSection]);
    }
  }, [currentSection, isTransitioning]);

  // Intelligent blinking
  useEffect(() => {
    const getBlinkTiming = () => {
      const base = mood === 'dramatic' ? 5000 : mood === 'contemplative' ? 4000 : 3000;
      return base + Math.random() * 2000;
    };

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, getBlinkTiming());

    return () => clearInterval(blinkInterval);
  }, [mood]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const getPostureTransform = () => {
    const breathing = Math.sin(breathingPhase * 0.1) * 2;
    const cloakSway = Math.sin(cloakFlow * 0.05) * 1;
    
    switch (posture) {
      case 'extending':
        return `translateY(${breathing}px) translateX(${cloakSway}px) rotate(${cloakSway * 0.3}deg)`;
      case 'gesturing':
        return `translateY(${breathing - 1}px) translateX(${cloakSway * 0.5}px) rotate(${-cloakSway * 0.2}deg)`;
      case 'pointing':
        return `translateY(${breathing}px) translateX(${cloakSway * 0.8}px) rotate(${cloakSway * 0.4}deg)`;
      case 'sitting':
        return `translateY(${20 + breathing * 0.5}px) scale(0.95) rotate(${cloakSway * 0.1}deg)`;
      case 'walking':
        return `scale(0.98) translateY(${Math.sin(breathingPhase * 0.3) * 3}px)`;
      default:
        return `translateY(${breathing}px) translateX(${cloakSway * 0.6}px) rotate(${cloakSway * 0.2}deg)`;
    }
  };

  const position = getAvatarPosition(scrollProgress);

  const handleAvatarClick = () => {
    setIsPulsing(false);
    onChatOpen();
    triggerDialogue('interaction');
  };

  const handleMouseEnterHover = useCallback(() => {
    if (!dialogueVisible && Math.random() > 0.2) {
      setTimeout(() => triggerDialogue('hover'), 1000);
    }
  }, [dialogueVisible, triggerDialogue]);

  return (
    <>
      {/* Cinematic spotlight */}
      <motion.div
        className="fixed pointer-events-none z-30"
        style={{
          right: position.right,
          top: position.top,
          transform: 'translate(25%, -120%)',
        }}
        animate={{
          opacity: auraIntensity * 0.4,
          scale: [1, 1.2, 1],
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div 
          className="w-[400px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(255, 215, 0, ${auraIntensity * 0.15}) 0%, 
              rgba(255, 140, 0, ${auraIntensity * 0.1}) 30%, 
              rgba(139, 0, 0, ${auraIntensity * 0.08}) 60%,
              transparent 90%)`
          }}
        />
      </motion.div>

      {/* Chat Button Indicator */}
      <motion.div
        className="fixed z-60 cursor-pointer"
        style={{
          right: position.right,
          top: position.top,
          transform: 'translate(60%, -20%)',
        }}
        animate={isPulsing ? {
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        } : {}}
        transition={isPulsing ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        onClick={handleAvatarClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-2 border-red-400/50 glow-red">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          {isPulsing && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Main Sync° Avatar - Right Side Floating */}
      <motion.div
        className={`fixed z-50 cursor-pointer ${isTransitioning ? 'sync-fade-transition' : ''}`}
        style={{
          right: position.right,
          top: position.top,
          transform: 'translate(25%, -50%)',
        }}
        animate={{
          x: springX,
          y: springY,
          scale: position.scale * (isTransitioning ? [1, 1.05, 1] : isPulsing ? [1, 1.02, 1] : 1),
          rotateY: position.orientation + gazeDirection.x * 1,
        }}
        transition={{
          scale: { 
            duration: isTransitioning ? 1.5 : isPulsing ? 3 : 0.8, 
            repeat: isPulsing ? Infinity : 0,
            ease: "easeInOut"
          },
          x: { type: "spring", stiffness: 40, damping: 30 },
          y: { type: "spring", stiffness: 40, damping: 30 },
          rotateY: { duration: 2.5, ease: "easeOut" }
        }}
        onClick={handleAvatarClick}
        onMouseEnter={handleMouseEnterHover}
        whileHover={{ scale: position.scale * 1.05 }}
        whileTap={{ scale: position.scale * 0.95 }}
      >
        <motion.div
          className="relative sync-avatar-container"
          animate={{
            transform: getPostureTransform(),
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sync° Semi-Human AI Character */}
          <svg
            width="200"
            height="300"
            viewBox="0 0 400 600"
            className="relative z-10"
          >
            <defs>
              {/* Semi-organic skin gradient */}
              <radialGradient id="syntheticSkin" cx="50%" cy="30%" r="80%">
                <stop offset="0%" stopColor="rgba(60, 20, 20, 1)" />
                <stop offset="20%" stopColor="rgba(100, 30, 30, 1)" />
                <stop offset="40%" stopColor="rgba(139, 0, 0, 0.9)" />
                <stop offset="60%" stopColor="rgba(80, 20, 20, 1)" />
                <stop offset="100%" stopColor="rgba(20, 5, 5, 1)" />
              </radialGradient>

              {/* Ancient eye glow */}
              <radialGradient id="ancientEyes" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={`rgba(255, 255, 255, ${eyeGlowIntensity})`} />
                <stop offset="30%" stopColor={`rgba(255, 215, 0, ${eyeGlowIntensity * 0.9})`} />
                <stop offset="70%" stopColor={`rgba(255, 140, 0, ${eyeGlowIntensity * 0.7})`} />
                <stop offset="100%" stopColor={`rgba(139, 0, 0, ${eyeGlowIntensity * 0.4})`} />
              </radialGradient>

              {/* Flowing cloak */}
              <linearGradient id="cloakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(20, 5, 5, 0.95)" />
                <stop offset="25%" stopColor="rgba(60, 20, 20, 0.8)" />
                <stop offset="50%" stopColor="rgba(139, 0, 0, 0.6)" />
                <stop offset="75%" stopColor="rgba(80, 20, 20, 0.8)" />
                <stop offset="100%" stopColor="rgba(20, 5, 5, 0.95)" />
              </linearGradient>

              {/* Cinematic filter */}
              <filter id="cinematicGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Simplified avatar for right-side positioning */}
            
            {/* Body */}
            <motion.rect
              x="120"
              y="200"
              width="80"
              height="180"
              rx="35"
              fill="url(#syntheticSkin)"
              filter="url(#cinematicGlow)"
            />

            {/* Head */}
            <motion.ellipse
              cx="160"
              cy="130"
              rx="50"
              ry="60"
              fill="url(#syntheticSkin)"
              filter="url(#cinematicGlow)"
              animate={{
                cx: 160 + gazeDirection.x * 1,
                cy: 130 + gazeDirection.y * 0.8,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Eyes */}
            <motion.ellipse
              cx="145"
              cy="120"
              rx="8"
              ry={isBlinking ? 1 : 10}
              fill="url(#ancientEyes)"
              filter="url(#cinematicGlow)"
            />
            
            <motion.ellipse
              cx="175"
              cy="120"
              rx="8"
              ry={isBlinking ? 1 : 10}
              fill="url(#ancientEyes)"
              filter="url(#cinematicGlow)"
            />

            {/* Flowing cloak */}
            <motion.path
              d="M 120 250 Q 80 300, 50 400 Q 40 450, 60 500 Q 90 520, 130 510 Q 170 500, 200 480 Q 250 450, 280 400 Q 290 350, 270 300 Q 250 270, 220 260 L 180 250 Z"
              fill="url(#cloakGradient)"
              filter="url(#cinematicGlow)"
              animate={{
                d: [
                  "M 120 250 Q 80 300, 50 400 Q 40 450, 60 500 Q 90 520, 130 510 Q 170 500, 200 480 Q 250 450, 280 400 Q 290 350, 270 300 Q 250 270, 220 260 L 180 250 Z",
                  `M 120 250 Q ${80 + Math.sin(cloakFlow * 0.02) * 10} 300, ${50 + Math.sin(cloakFlow * 0.03) * 8} 400 Q ${40 + Math.sin(cloakFlow * 0.025) * 6} 450, ${60 + Math.sin(cloakFlow * 0.02) * 8} 500 Q ${90 + Math.sin(cloakFlow * 0.04) * 8} 520, ${130 + Math.sin(cloakFlow * 0.035) * 6} 510 Q ${170 + Math.sin(cloakFlow * 0.03) * 8} 500, ${200 + Math.sin(cloakFlow * 0.02) * 8} 480 Q ${250 + Math.sin(cloakFlow * 0.025) * 10} 450, ${280 + Math.sin(cloakFlow * 0.04) * 8} 400 Q ${290 + Math.sin(cloakFlow * 0.02) * 6} 350, ${270 + Math.sin(cloakFlow * 0.03) * 8} 300 Q 250 270, 220 260 L 180 250 Z`,
                  "M 120 250 Q 80 300, 50 400 Q 40 450, 60 500 Q 90 520, 130 510 Q 170 500, 200 480 Q 250 450, 280 400 Q 290 350, 270 300 Q 250 270, 220 260 L 180 250 Z"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Energy patterns */}
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={140 + i * 20}
                cy={220 + i * 30}
                r="3"
                fill="url(#ancientEyes)"
                opacity="0.6"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  r: [3, 5, 3],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </svg>

          {/* Interactive glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent 0deg,
                rgba(255, 215, 0, 0.1) 60deg,
                rgba(255, 140, 0, 0.08) 120deg,
                rgba(139, 0, 0, 0.1) 180deg,
                rgba(255, 215, 0, 0.08) 240deg,
                rgba(255, 140, 0, 0.1) 300deg,
                transparent 360deg)`,
              borderRadius: '40%',
              filter: 'blur(3px)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>
      </motion.div>

      {/* Dialogue System */}
      <AnimatePresence>
        {dialogueVisible && currentDialogue && (
          <motion.div
            className="fixed z-60 max-w-md"
            style={{
              right: position.right,
              top: position.top,
              transform: 'translate(-120%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="sync-dialogue rounded-2xl px-6 py-4 relative">
              <motion.p 
                className="text-sm text-white leading-relaxed mb-3"
                style={{ fontStyle: 'italic' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                "{currentDialogue}"
              </motion.p>
              <motion.p 
                className="text-xs text-yellow-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                — Sync°
              </motion.p>
              
              {/* Speech bubble tail pointing to avatar */}
              <div 
                className="absolute top-1/2 -right-3 w-0 h-0 -translate-y-1/2"
                style={{
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '10px solid rgba(139, 0, 0, 0.95)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}