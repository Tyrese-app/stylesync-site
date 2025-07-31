'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Radio, Users, Eye, Settings, Sparkles, ArrowRight } from 'lucide-react';

export function GoLiveSection() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Simulate viewer count when live
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const handleGoLive = () => {
    if (!curtainsOpen) {
      setCurtainsOpen(true);
      setTimeout(() => {
        setIsLive(true);
        setViewerCount(Math.floor(Math.random() * 50) + 10);
      }, 2000);
    } else {
      setIsLive(!isLive);
      if (!isLive) {
        setViewerCount(Math.floor(Math.random() * 50) + 10);
      } else {
        setViewerCount(0);
      }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black">
        {/* Stage lighting effects */}
        <motion.div
          className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-gradient-radial from-red-600/30 via-transparent to-transparent"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Spotlight beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-2 h-full bg-gradient-to-b from-red-400/20 to-transparent"
            style={{ left: `${30 + i * 20}%` }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Theater Curtains */}
      <div className="absolute inset-0 z-10">
        {/* Left Curtain */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full curtain-left"
          animate={{
            x: curtainsOpen ? '-100%' : '0%',
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {/* Curtain texture */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-8 border-b border-red-800/20"
                style={{ top: `${i * 5}%` }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          
          {/* Curtain edge highlight */}
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-red-400/30" />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full curtain-right"
          animate={{
            x: curtainsOpen ? '100%' : '0%',
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {/* Curtain texture */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-8 border-b border-red-800/20"
                style={{ top: `${i * 5}%` }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          
          {/* Curtain edge highlight */}
          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-l from-transparent to-red-400/30" />
        </motion.div>

        {/* Curtain ropes/tassels */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-lg"
          animate={curtainsOpen ? {
            y: [0, -10, 0],
          } : {}}
          transition={{
            duration: 1,
            repeat: curtainsOpen ? Infinity : 0,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            {curtainsOpen ? (isLive ? 'You\'re Live!' : 'Welcome to the Stage') : 'Ready for Your Debut?'}
          </h2>
          
          {!curtainsOpen ? (
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Step into the spotlight and share your transformed creation with the world. 
              Sync° will be your co-host in this immersive live experience.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-12"
            >
              {/* Live Portal/Stage */}
              <div className="relative mx-auto w-full max-w-4xl h-80 bg-gradient-to-br from-red-900/30 to-purple-900/30 backdrop-blur-lg border-2 border-red-600/50 rounded-3xl overflow-hidden">
                {/* Portal effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-red-400/20 via-transparent to-transparent"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Live preview area */}
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    {isLive ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        {/* Live indicator */}
                        <div className="flex items-center justify-center space-x-3 mb-6">
                          <motion.div
                            className="w-4 h-4 bg-red-500 rounded-full"
                            animate={{
                              opacity: [1, 0.3, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                            }}
                          />
                          <span className="text-red-400 font-semibold text-lg">LIVE</span>
                        </div>
                        
                        {/* Viewer count */}
                        <div className="flex items-center justify-center space-x-6 text-white">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-5 h-5 text-red-400" />
                            <span className="font-semibold">{viewerCount.toLocaleString()}</span>
                            <span className="text-gray-300">viewers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-red-400" />
                            <span className="font-semibold">{Math.floor(viewerCount * 0.3)}</span>
                            <span className="text-gray-300">engaged</span>
                          </div>
                        </div>
                        
                        {/* Live content area */}
                        <div className="w-full h-32 bg-black/30 rounded-xl flex items-center justify-center border border-red-600/20">
                          <div className="text-center">
                            <Radio className="w-12 h-12 text-red-400 mx-auto mb-2" />
                            <p className="text-white">Your styled content is streaming live</p>
                            <p className="text-gray-400 text-sm">Sync° is co-hosting with you</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        <Sparkles className="w-16 h-16 text-red-400 mx-auto" />
                        <h3 className="text-2xl font-semibold text-white">Your Stage Awaits</h3>
                        <p className="text-gray-300">Click "Go Live" to start your immersive broadcasting experience</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Portal energy rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-red-400/20 rounded-3xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Go Live Button */}
          <motion.button
            onClick={handleGoLive}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative px-12 py-6 text-xl font-bold rounded-2xl overflow-hidden transition-all duration-500 ${
              isLive 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(239, 68, 68, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={isHovered && !curtainsOpen ? {
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.8)",
                "0 0 20px rgba(239, 68, 68, 0.5)",
              ],
            } : {}}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <span className="relative z-10 flex items-center justify-center space-x-3">
              {!curtainsOpen ? (
                <>
                  <Play className="w-8 h-8" />
                  <span>Go Live with Sync°</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              ) : isLive ? (
                <>
                  <div className="w-6 h-6 bg-white rounded-sm" />
                  <span>Stop Live Stream</span>
                </>
              ) : (
                <>
                  <Radio className="w-6 h-6" />
                  <span>Start Broadcasting</span>
                </>
              )}
            </span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-30"
              animate={isHovered ? {
                x: ['-100%', '100%'],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
              }}
            />
            
            {/* Curtain pull effect indicator */}
            {!curtainsOpen && isHovered && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-300 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Sync° will pull the curtains
              </motion.div>
            )}
          </motion.button>

          {/* Live Controls */}
          <AnimatePresence>
            {curtainsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <motion.button
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Stream Settings</span>
                </motion.button>
                
                <motion.button
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-4 h-4" />
                  <span>Audience</span>
                </motion.button>
                
                <motion.button
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Effects</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Stage floor reflection */}
      {curtainsOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 via-red-900/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
      )}
    </section>
  );
}