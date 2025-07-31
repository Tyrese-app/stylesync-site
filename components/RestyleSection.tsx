'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Download, Eye, Palette, Film, Gamepad2, Sparkles, Camera, Brush } from 'lucide-react';

interface StyleCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  preview: string;
  tags: string[];
}

const styleCards: StyleCard[] = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Hollywood-quality dramatic lighting and color grading',
    icon: <Film className="w-8 h-8" />,
    gradient: 'from-amber-600 to-orange-800',
    preview: 'Transform your video with movie-like cinematography, deep shadows, and golden hour lighting.',
    tags: ['Dramatic', 'Professional', 'Film']
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Vibrant animated style with bold colors and outlines',
    icon: <Palette className="w-8 h-8" />,
    gradient: 'from-pink-500 to-purple-600',
    preview: 'Convert your footage into animated cartoon style with vibrant colors and playful aesthetics.',
    tags: ['Fun', 'Animated', 'Colorful']
  },
  {
    id: 'game',
    name: 'Game Style',
    description: 'Video game inspired visuals with enhanced effects',
    icon: <Gamepad2 className="w-8 h-8" />,
    gradient: 'from-green-500 to-blue-600',
    preview: 'Apply gaming visuals with enhanced particle effects, neon glows, and digital aesthetics.',
    tags: ['Gaming', 'Digital', 'Neon']
  },
  {
    id: 'surreal',
    name: 'Surreal',
    description: 'Dreamlike and artistic interpretation of reality',
    icon: <Sparkles className="w-8 h-8" />,
    gradient: 'from-purple-600 to-indigo-700',
    preview: 'Create otherworldly visuals with surreal colors, distorted reality, and artistic flair.',
    tags: ['Artistic', 'Dreamy', 'Abstract']
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic film look with retro color processing',
    icon: <Camera className="w-8 h-8" />,
    gradient: 'from-yellow-600 to-red-700',
    preview: 'Apply nostalgic vintage filters with film grain, sepia tones, and classic cinematography.',
    tags: ['Retro', 'Classic', 'Nostalgic']
  },
  {
    id: 'painterly',
    name: 'Painterly',
    description: 'Oil painting and artistic brush stroke effects',
    icon: <Brush className="w-8 h-8" />,
    gradient: 'from-red-500 to-pink-600',
    preview: 'Transform your video into a living painting with artistic brush strokes and texture.',
    tags: ['Artistic', 'Painting', 'Texture']
  }
];

export function RestyleSection() {
  const [selectedStyle, setSelectedStyle] = useState<StyleCard | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStyleSelect = (style: StyleCard) => {
    setSelectedStyle(style);
  };

  const handlePreviewAndExport = () => {
    if (!selectedStyle) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Processing ${selectedStyle.name} style! This would normally start the AI transformation.`);
    }, 3000);
  };

  const closeModal = () => {
    setSelectedStyle(null);
  };

  return (
    <section className="min-h-screen relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/10 to-black">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-red-600 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Choose Your Style
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select from our collection of AI-powered style transforms. Each style uses advanced neural networks 
            to completely reimagine your video while preserving its essence.
          </p>
        </motion.div>

        {/* Style Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {styleCards.map((style, index) => (
            <motion.div
              key={style.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(style.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleStyleSelect(style)}
              data-style-preset
            >
              <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${style.gradient} p-1`}>
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={hoveredCard === style.id ? {
                    x: ['-100%', '100%'],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredCard === style.id ? Infinity : 0,
                  }}
                />
                
                <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between">
                  {/* Icon and Title */}
                  <div>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white">
                        {style.icon}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{style.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{style.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {style.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Preview Button */}
                  <motion.button
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Style</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Preview & Export Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={handlePreviewAndExport}
            disabled={isProcessing}
            className={`px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-xl font-semibold rounded-xl transition-all duration-300 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-700 hover:to-red-800'
            }`}
            whileHover={!isProcessing ? { 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
            } : {}}
            whileTap={!isProcessing ? { scale: 0.95 } : {}}
          >
            <span className="flex items-center justify-center space-x-3">
              {isProcessing ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  <span>Preview & Export</span>
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Style Preview Modal */}
      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-4xl h-[600px] bg-gradient-to-br from-black/95 to-red-900/20 backdrop-blur-lg border border-red-600/30 rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-red-600/20">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedStyle.gradient} rounded-xl flex items-center justify-center`}>
                    <div className="text-white">
                      {selectedStyle.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedStyle.name} Style</h3>
                    <p className="text-red-400">{selectedStyle.description}</p>
                  </div>
                </div>
                <motion.button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
                  {/* Preview Area */}
                  <div className="bg-black/50 rounded-xl p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-24 h-24 bg-gradient-to-br ${selectedStyle.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                        <div className="text-white">
                          {selectedStyle.icon}
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-4">Style Preview</h4>
                      <p className="text-gray-300 mb-6">{selectedStyle.preview}</p>
                      <motion.button
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          closeModal();
                          handlePreviewAndExport();
                        }}
                      >
                        <span className="flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Apply This Style</span>
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Style Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Style Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedStyle.tags.map((tag) => (
                          <div
                            key={tag}
                            className="p-3 bg-white/5 border border-red-600/20 rounded-lg text-center"
                          >
                            <span className="text-white font-medium">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Processing Details</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>• Neural style transfer using advanced AI models</p>
                        <p>• Preserves original motion and structure</p>
                        <p>• 4K output resolution support</p>
                        <p>• Processing time: 2-5 minutes per minute of video</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Used For</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedStyle.preview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}