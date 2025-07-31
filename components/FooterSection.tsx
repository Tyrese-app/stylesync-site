'use client';

import { motion } from 'framer-motion';
import { Heart, Twitter, Instagram, Youtube, Github, Mail, Sparkles, ExternalLink } from 'lucide-react';

export function FooterSection() {
  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', href: '#', color: 'hover:text-red-400' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#', color: 'hover:text-gray-400' },
    { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#', color: 'hover:text-green-400' },
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Style Transfer', href: '#' },
        { label: 'Live Streaming', href: '#' },
        { label: 'AI Companion', href: '#' },
        { label: 'API Access', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Blog', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Contact', href: '#' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Use', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'DMCA', href: '#' },
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-black via-red-900/10 to-black border-t border-red-600/20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Subtle glow gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-600/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Style°Sync
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Transform your creative vision with AI-powered style transfer and live streaming. 
                Experience the future of content creation with Sync°, your intelligent companion.
              </p>
              
              {/* Powered by Sync° Badge */}
              <motion.div
                className="inline-flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-600/30 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Powered by Sync°</p>
                  <p className="text-red-400 text-xs">AI Creative Companion</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm flex items-center group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="border-t border-red-600/20 pt-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-3 bg-white/5 hover:bg-white/10 text-gray-400 ${social.color} rounded-xl transition-all duration-300 group`}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="text-center md:text-right">
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/5 border border-red-600/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600/40 transition-colors"
                />
                <motion.button
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-red-600/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Style°Sync AI. All rights reserved.
            </p>
            
            <motion.div
              className="flex items-center space-x-2 text-gray-400 text-sm"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span>by the Sync° team</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sync° watermark */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center space-x-1"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-3 h-3" />
        <span>Sync° is always watching</span>
      </motion.div>
    </footer>
  );
}