import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import GalleryCard from '../components/GalleryCard';
import Testimonials from '../components/Testimonials';
import CountdownTimer from '../components/CountdownTimer';
import { UserContext } from '../App';
import type { User, GalleryItem } from '../types';

const mockGallery: GalleryItem[] = [
  { id: '1', title: 'Workshop 2025', category: 'Workshop', imageUrl: 'https://via.placeholder.com/400x300?text=Workshop' },
  { id: '2', title: 'Seminar Tech', category: 'Seminar', imageUrl: 'https://via.placeholder.com/400x300?text=Seminar' },
  { id: '3', title: 'Hackathon', category: 'Hackathon', imageUrl: 'https://via.placeholder.com/400x300?text=Hackathon' },
  { id: '4', title: 'Webinar AI', category: 'Webinar', imageUrl: 'https://via.placeholder.com/400x300?text=Webinar' },
];

const Home: React.FC = () => {
  const context = useContext(UserContext);
  const { user } = context as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  const categories = ['Workshop', 'Seminar', 'Hackathon', 'Webinar'];

  const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const stats = [
    { number: "1000+", label: "Peserta", icon: "👥" },
    { number: "50+", label: "Workshop", icon: "🛠️" },
    { number: "25+", label: "Expert", icon: "👨‍💼" },
    { number: "98%", label: "Kepuasan", icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        {/* Floating Shapes */}
        <FloatingShape className="w-32 h-32 bg-blue-200 top-20 left-20" delay={0} />
        <FloatingShape className="w-24 h-24 bg-purple-200 top-40 right-32" delay={2} />
        <FloatingShape className="w-20 h-20 bg-pink-200 bottom-32 left-40" delay={4} />
        <FloatingShape className="w-28 h-28 bg-indigo-200 bottom-20 right-20" delay={6} />

        {/* Parallax Elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40"
        />

        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="text-6xl md:text-8xl font-bold mb-4 relative">
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {user?.role === 'admin' ? 'ADMIN' : 'COCSTART'}
              </motion.span>
              
              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-3xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-4xl font-light mb-6 text-gray-700"
          >
            {user?.role === 'admin' 
              ? 'Dashboard Kontrol Penuh' 
              : 'Tempat Ide Bertemu Inovasi'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {user?.role === 'admin'
              ? 'Kelola semua aktivitas, peserta, dan konten dengan interface yang elegan dan powerful.'
              : 'Bergabunglah dengan komunitas developer, entrepreneur, dan innovator terdepan di Indonesia.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/registration"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Mulai Perjalanan</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold text-lg text-gray-700 hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 backdrop-blur-lg"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-gray-600 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Event Berikutnya
            </h2>
            <p className="text-xl text-gray-600">Jangan sampai terlewat!</p>
          </motion.div>
          <CountdownTimer targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()} />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Galeri Kegiatan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lihat momen-momen berharga dari berbagai kegiatan yang telah kami selenggarakan
            </p>
          </motion.div>

          {/* Gallery Grid - Category Cards that link to filtered gallery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {categories.map((category, index) => {
              // Find a sample item for each category to display
              const sampleItem = mockGallery.find(item => item.category === category) || mockGallery[index];
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/gallery?filter=${category}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                      
                      {/* Category Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={sampleItem?.imageUrl || `https://via.placeholder.com/400x300?text=${category}`}
                          alt={category}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                        
                        {/* Category Label */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{category}</h3>
                          <p className="text-white/80 text-sm">
                            Lihat koleksi {category.toLowerCase()} terbaik kami
                          </p>
                        </div>
                        
                        {/* Icon Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Item Count Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-semibold text-gray-700">
                            {mockGallery.filter(item => item.category === category).length} item
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/gallery"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Lihat Semua Galeri
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Apa Kata Mereka
            </h2>
            <p className="text-xl text-gray-600">Testimoni dari para peserta yang telah bergabung</p>
          </motion.div>
          <Testimonials />
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Siap Memulai?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-white/95"
          >
            Bergabunglah dengan ribuan peserta lainnya dan wujudkan potensi terbaikmu!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/registration"
                className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25"
              >
                Daftar Sekarang
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="ml-3 text-2xl"
                >
                  ⚡
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;