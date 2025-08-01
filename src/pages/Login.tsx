import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext } from '../App';
import type { User } from '../types';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Login: React.FC = () => {
  const context = useContext(UserContext);
  const { setUser } = context as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: '1',
          username: 'user1',
          email,
          role: 'user',
          isAccepted: true,
        });
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } else {
      alert('Harap isi email dan password.');
    }
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
                <span className="text-blue-800 font-semibold text-sm">Selamat Datang</span>
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Masuk
                </span>
              </h1>
              
              <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={containerVariants}
              className="space-y-6"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleLogin();
              }}
            >
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
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                    placeholder="nama@email.com"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                    placeholder="Masukkan kata sandi"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    required
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
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Lupa kata sandi?
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk</span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">atau</span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 bg-white/60 backdrop-blur-sm"
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                <span className="text-gray-700 font-medium">Masuk dengan Google</span>
              </motion.button>
            </motion.div>

            {/* Register Link */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;