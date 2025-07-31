'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, Sparkles, ArrowDown } from 'lucide-react';

export function HeroSection() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const scrollToRestyle = () => {
    const element = document.querySelector('[data-section="restyle"]');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background with cinematic particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black">
        {/* Animated light particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Spotlight effect */}
        <motion.div
          className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-gradient-radial from-red-600/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Turn Your Life
          </motion.h1>
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-600 via-red-400 to-red-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Into A Movie
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Transform your ordinary moments into cinematic masterpieces with AI-powered style transfer and live streaming capabilities.
          </motion.p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div
            className={`relative mx-auto max-w-2xl p-8 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer ${
              isDragOver
                ? 'border-red-400 bg-red-600/10 scale-105'
                : uploadedFile
                ? 'border-green-400 bg-green-600/10'
                : 'border-red-600/50 bg-red-600/5 hover:border-red-400 hover:bg-red-600/10'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
            data-upload-area
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="text-center">
              <motion.div
                className="mb-4"
                animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {uploadedFile ? (
                  <div className="flex items-center justify-center">
                    <Play className="w-16 h-16 text-green-400 mr-4" />
                    <div className="text-left">
                      <p className="text-lg text-green-400 font-semibold">Video Ready!</p>
                      <p className="text-sm text-gray-400">{uploadedFile.name}</p>
                    </div>
                  </div>
                ) : (
                  <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragOver ? 'text-red-400' : 'text-red-500'}`} />
                )}
              </motion.div>
              
              <h3 className="text-2xl font-semibold text-white mb-2">
                {uploadedFile ? 'Your Story is Ready' : 'Upload Your Story'}
              </h3>
              <p className="text-gray-400 mb-4">
                {uploadedFile 
                  ? 'Click "Restyle Now" to transform your video'
                  : 'Drag and drop your video file or click to browse'
                }
              </p>
              
              {!uploadedFile && (
                <p className="text-sm text-gray-500">
                  Supports MP4, MOV, AVI • Max 100MB
                </p>
              )}
            </div>

            {/* Upload progress animation */}
            {isDragOver && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            onClick={scrollToRestyle}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            disabled={!uploadedFile}
          >
            <span className="relative z-10 flex items-center">
              Restyle Now
              <Sparkles className="w-5 h-5 ml-2" />
            </span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border-2 border-red-600 text-red-400 text-lg font-semibold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Examples
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-red-400">
            <span className="text-sm mb-2">Explore Styles</span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-400 rounded-full opacity-20"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </section>
  );
}