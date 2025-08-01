import React, { useContext, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountdownTimer from '../components/CountdownTimer';
import { UserContext } from '../App';
import type { User } from '../types';

const Registration: React.FC = () => {
  const context = useContext(UserContext);
  const { user } = context as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, 40]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    activity: '',
    phone: '',
    university: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Pendaftaran berhasil! Silakan tunggu konfirmasi.');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      activity: '',
      phone: '',
      university: '',
      motivation: ''
    });
  };

  const activities = [
    { value: 'workshop-2025', label: 'Workshop 2025' },
    { value: 'seminar-tech', label: 'Seminar Tech' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'webinar-ai', label: 'Webinar AI' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        {/* Floating Shapes */}
        <FloatingShape className="w-24 h-24 bg-blue-200 top-10 left-10" delay={0} />
        <FloatingShape className="w-20 h-20 bg-purple-200 top-32 right-20" delay={2} />
        <FloatingShape className="w-16 h-16 bg-pink-200 bottom-40 left-32" delay={4} />
        <FloatingShape className="w-22 h-22 bg-indigo-200 bottom-10 right-16" delay={6} />

        {/* Parallax Elements */}
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
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold mb-6 relative"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Pendaftaran
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
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Bergabunglah dengan kegiatan yang akan mengubah masa depan Anda
            </motion.p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Formulir Pendaftaran
                  </h2>
                  <p className="text-gray-600">Isi data dengan lengkap dan benar</p>
                </motion.div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="email@example.com"
                      />
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="08xxxxxxxxxx"
                      />
                    </motion.div>

                    {/* University */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Universitas/Institusi
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="Nama universitas atau institusi"
                      />
                    </motion.div>
                  </div>

                  {/* Activity Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Pilih Kegiatan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={activity.value}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          className={`relative cursor-pointer ${
                            formData.activity === activity.value 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                              : 'bg-white/70 hover:bg-white/90 text-gray-700'
                          } backdrop-blur-sm border-2 ${
                            formData.activity === activity.value 
                              ? 'border-transparent' 
                              : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl p-4 transition-all duration-300`}
                          onClick={() => setFormData(prev => ({ ...prev, activity: activity.value }))}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="activity"
                              value={activity.value}
                              checked={formData.activity === activity.value}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span className="font-semibold">{activity.label}</span>
                          </div>
                          {formData.activity === activity.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 text-white"
                            >
                              ✓
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Motivation */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Motivasi Mengikuti Kegiatan
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                      placeholder="Ceritakan motivasi Anda mengikuti kegiatan ini..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="text-center pt-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleRegister}
                      disabled={isSubmitting || !formData.fullName || !formData.email || !formData.activity || !formData.phone}
                      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative px-12 py-4 ${
                        isSubmitting || !formData.fullName || !formData.email || !formData.activity || !formData.phone
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      } rounded-full font-semibold text-lg text-white transition-all duration-300 shadow-lg hover:shadow-2xl disabled:hover:scale-100`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Memproses...
                          </>
                        ) : (
                          <>
                            Daftar Sekarang
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="ml-2"
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-full" />
                      )}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Status Message */}
                {user && user.isAccepted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl text-center"
                  >
                    <div className="text-lg font-semibold text-green-800 mb-1">
                      Status: Diterima
                    </div>
                    <div className="text-green-600">
                      Selamat! Pendaftaran Anda telah diterima.
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="py-20 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Batas Waktu Pendaftaran
            </h2>
            <p className="text-xl text-gray-600">Jangan sampai terlewat!</p>
          </motion.div>
          <CountdownTimer targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mengapa Bergabung dengan Kami?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Skill Development', desc: 'Tingkatkan kemampuan teknis dan soft skill' },
              { title: 'Networking', desc: 'Bertemu dengan profesional dan rekan sejawat' },
              { title: 'Sertifikat', desc: 'Dapatkan sertifikat yang diakui industri' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;