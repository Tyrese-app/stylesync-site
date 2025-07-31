'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const showcaseVideos = [
  {
    id: 1,
    title: 'Urban Dreams',
    style: 'Cinematic',
    description: 'Where neon bleeds into reality',
    poem: '"In shadows cast by digital light, the city breathes with electric might."',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
    duration: '2:34'
  },
  {
    id: 2,
    title: 'Watercolor Worlds',
    style: 'Artistic',
    description: 'Paint your memories in motion',
    poem: '"Each frame dissolves like morning mist, in hues that never did exist."',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    duration: '1:47'
  },
  {
    id: 3,
    title: 'Anime Reality',
    style: 'Anime',
    description: 'Step into your favorite story',
    poem: '"Where gravity bends to will and heart, and every ending\'s just the start."',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    duration: '3:12'
  },
  {
    id: 4,
    title: 'Surreal Spaces',
    style: 'Surreal',
    description: 'Beyond the realm of possibility',
    poem: '"In lands where logic holds no sway, imagination leads the way."',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    duration: '2:58'
  }
];

export function CreativeShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section ref={ref} className="min-h-screen py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-glow">
            Creative Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Witness the poetry of transformation. Each frame tells a story untold.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-black/40 backdrop-blur-lg border border-red-600/20 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-300"
              onMouseEnter={() => setActiveVideo(video.id)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              {/* Video thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeVideo === video.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center glow-red cursor-pointer">
                    <Play className="h-6 w-6 ml-1" />
                  </div>
                </motion.div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>

                {/* Style badge */}
                <div className="absolute top-4 left-4 bg-red-600/90 px-3 py-1 rounded-full text-sm font-semibold">
                  {video.style}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                </div>

                {/* Sync° poem */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: activeVideo === video.id ? 1 : 0.7, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-l-2 border-red-600/50 pl-4"
                >
                  <p className="text-red-300 italic text-sm leading-relaxed">
                    {video.poem}
                  </p>
                  <p className="text-red-500 text-xs mt-2">— Sync°</p>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button className="w-8 h-8 bg-red-600/20 hover:bg-red-600/40 rounded-full flex items-center justify-center transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 bg-gray-600/20 hover:bg-gray-600/40 rounded-full flex items-center justify-center transition-colors">
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <div className="flex-1 h-1 bg-gray-600/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: '0%' }}
                      animate={{ width: activeVideo === video.id ? '45%' : '0%' }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">Ready to create your own masterpiece?</p>
          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg glow-red font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Creating
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}