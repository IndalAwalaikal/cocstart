import React from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  CameraIcon, 
  HeartIcon,
  SparklesIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      icon: XMarkIcon, 
      href: 'https://x.com', 
      label: 'Twitter',
      color: 'hover:text-gray-800',
      bgColor: 'hover:bg-gray-100'
    },
    { 
      icon: CameraIcon, 
      href: 'https://instagram.com', 
      label: 'Instagram',
      color: 'hover:text-pink-600',
      bgColor: 'hover:bg-pink-50'
    },
    { 
      icon: EnvelopeIcon, 
      href: 'mailto:hello@coconut.id', 
      label: 'Email',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    { 
      icon: GlobeAltIcon, 
      href: '#', 
      label: 'Website',
      color: 'hover:text-green-600',
      bgColor: 'hover:bg-green-50'
    }
  ];

  const quickLinks = [
    { label: 'Beranda', href: '/home' },
    { label: 'Tentang', href: '/about' },
    { label: 'Acara', href: '/events' },
    { label: 'Timeline', href: '/timeline' },
  ];

  const programLinks = [
    { label: 'Workshop', href: '/events' },
    { label: 'Bootcamp', href: '/events' },
    { label: 'Mentoring', href: '/events' },
    { label: 'Kompetisi', href: '/events' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <SparklesIcon className="w-10 h-10 text-blue-400" />
                  <motion.div
                    className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                  Cocstart
                </h3>
              </motion.div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Membangun masa depan teknologi Indonesia melalui inovasi, kolaborasi, dan pemberdayaan generasi muda.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  { icon: EnvelopeIcon, text: 'hello@coconut.id' },
                  { icon: PhoneIcon, text: '+62 21 1234 5678' },
                  { icon: MapPinIcon, text: 'Jakarta, Indonesia' }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    className="flex items-center space-x-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <contact.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">{contact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 text-white">Menu Cepat</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm relative group"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link.label}</span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Program Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 text-white">Program</h4>
              <ul className="space-y-3">
                {programLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm relative group"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link.label}</span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
          >
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h4 className="text-2xl font-bold mb-2 text-white">Stay Updated</h4>
                <p className="text-gray-300">Dapatkan update terbaru tentang program dan acara kami</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md md:max-w-sm">
                <motion.input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Subscribe</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Copyright */}
              <motion.div 
                className="flex items-center space-x-2 text-gray-400"
                variants={itemVariants}
              >
                <span className="text-sm">© 2025 Coconut. Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <HeartIcon className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span className="text-sm">in Indonesia</span>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all duration-300 ${social.color} ${social.bgColor} bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 group`}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1 h-1 bg-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.footer>
  );
};

export default Footer;