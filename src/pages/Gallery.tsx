import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const mockGallery: GalleryItem[] = [
  { id: '1', title: 'Workshop Web Development', category: 'Workshop', imageUrl: 'https://via.placeholder.com/400x300?text=Workshop+Web' },
  { id: '2', title: 'Workshop Mobile App', category: 'Workshop', imageUrl: 'https://via.placeholder.com/400x300?text=Workshop+Mobile' },
  { id: '3', title: 'Seminar Tech Trends 2025', category: 'Seminar', imageUrl: 'https://via.placeholder.com/400x300?text=Seminar+Tech' },
  { id: '4', title: 'Seminar AI & ML', category: 'Seminar', imageUrl: 'https://via.placeholder.com/400x300?text=Seminar+AI' },
  { id: '5', title: 'Hackathon Innovation', category: 'Hackathon', imageUrl: 'https://via.placeholder.com/400x300?text=Hackathon+Innovation' },
  { id: '6', title: 'Hackathon Startup', category: 'Hackathon', imageUrl: 'https://via.placeholder.com/400x300?text=Hackathon+Startup' },
  { id: '7', title: 'Webinar Future Tech', category: 'Webinar', imageUrl: 'https://via.placeholder.com/400x300?text=Webinar+Future' },
  { id: '8', title: 'Webinar Career Path', category: 'Webinar', imageUrl: 'https://via.placeholder.com/400x300?text=Webinar+Career' },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, 40]);
  const navigate = useNavigate();

  const categories = ['All', 'Workshop', 'Seminar', 'Hackathon', 'Webinar'];
  const filteredGallery = filter === 'All' ? mockGallery : mockGallery.filter(item => item.category === filter);

  const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const getCategoryStats = (category: string) => {
    return category === 'All' 
      ? mockGallery.length 
      : mockGallery.filter(item => item.category === category).length;
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <FloatingShape className="w-24 h-24 bg-blue-200 top-10 left-10" delay={0} />
        <FloatingShape className="w-20 h-20 bg-purple-200 top-32 right-20" delay={2} />
        <FloatingShape className="w-16 h-16 bg-pink-200 bottom-40 left-32" delay={4} />
        <FloatingShape className="w-22 h-22 bg-indigo-200 bottom-10 right-16" delay={6} />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/5 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-3/4 right-1/5 w-1 h-1 bg-purple-400 rounded-full opacity-40"
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 mt-8"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold mb-6 relative"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Galeri
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-3xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Jelajahi koleksi momen berharga dari berbagai kegiatan yang telah kami selenggarakan
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-white/90 backdrop-blur-sm'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  {category}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {getCategoryStats(category)}
                  </span>
                </span>
                {filter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              Menampilkan <span className="font-semibold text-blue-600">{filteredGallery.length}</span> item
              {filter !== 'All' && (
                <span> dari kategori <span className="font-semibold text-purple-600">{filter}</span></span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-200">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-gray-700">{item.category}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.category}</span>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Lihat Detail
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #db2777)',
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'subtract',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'subtract',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          {filteredGallery.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Belum Ada Konten</h3>
              <p className="text-gray-500 mb-6">Kategori {filter} belum memiliki item galeri.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('All')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Lihat Semua
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call-to-Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Ingin Bagian dari Galeri Kami?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-white/95"
          >
            Bergabunglah dengan kegiatan kami dan jadilah bagian dari momen-momen berharga berikutnya!
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
              <button
                onClick={handleRegisterClick}
                className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25"
              >
                Daftar Kegiatan
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Gallery;