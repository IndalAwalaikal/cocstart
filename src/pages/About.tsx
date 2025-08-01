import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryCard from '../components/GalleryCard';
import type { GalleryItem } from '../types';
import { 
  HeartIcon, 
  RocketLaunchIcon, 
  UsersIcon, 
  AcademicCapIcon,
  SparklesIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const mockGallery: GalleryItem[] = [
  { id: '1', title: 'Peluncuran Coconut', category: 'Event', imageUrl: 'https://via.placeholder.com/400x300?text=Coconut+Launch' },
  { id: '2', title: 'Workshop Perdana', category: 'Workshop', imageUrl: 'https://via.placeholder.com/400x300?text=Workshop' },
  { id: '3', title: 'Hackathon 2024', category: 'Competition', imageUrl: 'https://via.placeholder.com/400x300?text=Hackathon' },
  { id: '4', title: 'Tech Talk Series', category: 'Seminar', imageUrl: 'https://via.placeholder.com/400x300?text=Tech+Talk' },
];

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const stats = [
    { icon: UsersIcon, value: '1000+', label: 'Anggota Aktif' },
    { icon: AcademicCapIcon, value: '50+', label: 'Workshop' },
    { icon: RocketLaunchIcon, value: '25+', label: 'Proyek Selesai' },
    { icon: SparklesIcon, value: '5+', label: 'Penghargaan' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto py-12 px-4"
      >
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <SparklesIcon className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">Tentang Kami</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-inter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Coconut
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Membangun masa depan teknologi Indonesia melalui inovasi, kolaborasi, dan pemberdayaan generasi muda
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg border border-white/50"
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission and Vision */}
        <motion.section 
          variants={itemVariants}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <RocketLaunchIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Misi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Memberdayakan generasi muda Indonesia untuk menciptakan solusi teknologi inovatif yang berdampak positif 
                  bagi masyarakat melalui pendidikan, mentoring, dan kolaborasi yang berkelanjutan.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Visi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi pusat inovasi teknologi terdepan di Indonesia yang menghasilkan talenta-talenta unggul 
                  dan berkontribusi dalam memajukan ekosistem teknologi nasional.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section 
          variants={itemVariants}
          className="mb-16"
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan para visioner yang memimpin perjalanan inovasi Coconut
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              { 
                name: 'Dr. John Doe', 
                role: 'Pendiri & CEO', 
                image: 'https://via.placeholder.com/150',
                bio: 'Visioner teknologi dengan 15+ tahun pengalaman',
                social: { linkedin: '#', twitter: '#' }
              },
              { 
                name: 'Jane Smith', 
                role: 'Ketua Program', 
                image: 'https://via.placeholder.com/150',
                bio: 'Expert dalam pengembangan kurikulum teknologi',
                social: { linkedin: '#', twitter: '#' }
              },
              { 
                name: 'Alex Tan', 
                role: 'Koordinator Acara', 
                image: 'https://via.placeholder.com/150',
                bio: 'Spesialis event management dan community building',
                social: { linkedin: '#', twitter: '#' }
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50 text-center relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="relative mx-auto mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-3 border-white flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <motion.a
                      href={member.social.linkedin}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <span className="text-xs font-bold">in</span>
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                    >
                      <span className="text-xs font-bold">𝕏</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Past Events Gallery - Horizontal Scroll */}
        <motion.section 
          variants={itemVariants}
          className="mb-16"
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Kegiatan Terdahulu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jelajahi momen-momen bersejarah dalam perjalanan Coconut
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {mockGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-80"
                  style={{ scrollSnapAlign: 'start' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {item.category}
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">
                        Event yang menginspirasi dan membawa dampak positif bagi komunitas teknologi
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {mockGallery.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                  whileHover={{ scale: 1.5 }}
                  animate={{ backgroundColor: index === 0 ? '#3B82F6' : '#D1D5DB' }}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section variants={itemVariants}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar dari Anda!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Mari Terhubung</h3>
                
                <div className="space-y-6">
                  {[
                    { icon: EnvelopeIcon, title: 'Email', content: 'hello@coconut.id', color: 'from-blue-500 to-blue-600' },
                    { icon: PhoneIcon, title: 'Telepon', content: '+62 21 1234 5678', color: 'from-green-500 to-green-600' },
                    { icon: MapPinIcon, title: 'Alamat', content: 'Jakarta, Indonesia', color: 'from-purple-500 to-purple-600' }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.title}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{contact.title}</p>
                        <p className="text-gray-600">{contact.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Masukkan nama lengkap Anda"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="nama@email.com"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pesan</label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Ceritakan bagaimana kami bisa membantu Anda..."
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>Kirim Pesan</span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;