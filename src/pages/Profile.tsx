import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import type { User } from '../types';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const context = useContext(UserContext);
  const { user, setUser } = context as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || ''
  });
  const [settingsData, setSettingsData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  React.useEffect(() => {
    // Calculate password strength
    const password = settingsData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [settingsData.password]);

  const handleProfileUpdate = () => {
    if (!profileData.username || !profileData.email) {
      alert('Username dan email tidak boleh kosong!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      alert('Email tidak valid!');
      return;
    }
    if (user) {
      setUser({ ...user, ...profileData });
      setSettingsData({ ...settingsData, username: profileData.username, email: profileData.email });
      alert('Profil diperbarui!');
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settingsData.username || !settingsData.email) {
      alert('Username dan email tidak boleh kosong!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settingsData.email)) {
      alert('Email tidak valid!');
      return;
    }
    if (settingsData.password && settingsData.password !== settingsData.confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    if (settingsData.password && passwordStrength < 3) {
      alert('Password terlalu lemah! Gunakan kombinasi huruf besar, kecil, angka, dan simbol.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          username: settingsData.username,
          email: settingsData.email,
          ...(settingsData.password && { password: settingsData.password })
        });
        setProfileData({
          ...profileData,
          username: settingsData.username,
          email: settingsData.email
        });
      }
      setIsLoading(false);
      alert('Pengaturan diperbarui!');
      setSettingsData({
        ...settingsData,
        password: '',
        confirmPassword: ''
      });
    }, 2000);
  };

  const handleDeletePicture = () => {
    setProfileData({ ...profileData, profilePicture: '' });
    if (user) {
      setUser({ ...user, profilePicture: '' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSettingsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsData({
      ...settingsData,
      [e.target.name]: e.target.value
    });
  };

  const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
      className={`absolute rounded-full opacity-10 ${className}`}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Sangat Lemah';
    if (passwordStrength <= 2) return 'Lemah';
    if (passwordStrength <= 3) return 'Sedang';
    if (passwordStrength <= 4) return 'Kuat';
    return 'Sangat Kuat';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600"
        >
          Harap login terlebih dahulu.{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Masuk sekarang
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 relative overflow-hidden">
      {/* Floating Shapes */}
      <FloatingShape className="w-32 h-32 bg-blue-200 top-20 left-20" delay={0} />
      <FloatingShape className="w-24 h-24 bg-purple-200 top-40 right-32" delay={2} />
      <FloatingShape className="w-20 h-20 bg-pink-200 bottom-32 left-40" delay={4} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto py-12 px-4 flex justify-center items-center min-h-screen"
      >
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-md"
        >
          {/* Background Card */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50" />
          
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
          
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/60">
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <SparklesIcon className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold text-sm">Profil Pengguna</span>
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user.username || 'Pengguna'}
                </span>
              </h1>
              
              <p className="text-gray-600">Kelola informasi profil Anda</p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              variants={itemVariants}
              className="flex space-x-4 mb-6"
            >
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pengaturan
              </button>
            </motion.div>

            {/* Profile Content */}
            {activeTab === 'profile' && (
              <motion.div variants={containerVariants} className="space-y-6">
                {/* Profile Picture */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Foto Profil
                  </label>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={profileData.profilePicture || 'https://via.placeholder.com/100'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg object-cover"
                    />
                    <div className="flex flex-col space-y-2">
                      <motion.input
                        type="text"
                        name="profilePicture"
                        value={profileData.profilePicture}
                        onChange={handleProfileInputChange}
                        className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                        placeholder="Masukkan URL foto"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      {profileData.profilePicture && (
                        <motion.button
                          onClick={handleDeletePicture}
                          className="text-red-500 hover:text-red-600 font-semibold text-sm hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Hapus Foto
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Status Pendaftaran */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Status Pendaftaran
                  </label>
                  <p className={user.isAccepted ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                    {user.isAccepted ? 'Diterima' : 'Belum Diterima'}
                  </p>
                </motion.div>

                {/* Username */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Nama Pengguna
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileInputChange}
                      className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="Masukkan nama pengguna"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    {profileData.username && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {profileData.username.length >= 3 ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileInputChange}
                      className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="nama@email.com"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    {profileData.email && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email) ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Update Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={handleProfileUpdate}
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Perbarui Profil</span>
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Settings Content */}
            {activeTab === 'settings' && (
              <motion.form variants={containerVariants} className="space-y-6" onSubmit={handleSettingsUpdate}>
                {/* Username Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Nama Pengguna
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      type="text"
                      name="username"
                      value={settingsData.username}
                      onChange={handleSettingsInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="Masukkan nama pengguna"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      required
                    />
                    {settingsData.username && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {settingsData.username.length >= 3 ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      type="email"
                      name="email"
                      value={settingsData.email}
                      onChange={handleSettingsInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="nama@email.com"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      required
                    />
                    {settingsData.email && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settingsData.email) ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Kata Sandi Baru (opsional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={settingsData.password}
                      onChange={handleSettingsInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="Masukkan kata sandi baru"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {settingsData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Kekuatan Password:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength <= 2 ? 'text-red-500' : 
                          passwordStrength <= 3 ? 'text-yellow-500' : 
                          'text-green-500'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={settingsData.confirmPassword}
                      onChange={handleSettingsInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                      placeholder="Konfirmasi kata sandi baru"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {settingsData.confirmPassword && (
                    <div className="mt-1 flex items-center space-x-1">
                      {settingsData.password === settingsData.confirmPassword ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">Password cocok</span>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-red-600">Password tidak cocok</span>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Update Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Memperbarui...</span>
                        </>
                      ) : (
                        <>
                          <span>Perbarui Pengaturan</span>
                          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>

                {/* Logout Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Keluar
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;