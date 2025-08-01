import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../App';
import type { User } from '../types';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const context = useContext(UserContext);
  const { user, setUser } = context as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isKegiatanOpen, setIsKegiatanOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { to: '/home', label: 'Beranda' },
    { to: '/about', label: 'Tentang' },
    { to: '/events', label: 'Acara' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/announcements', label: 'Pengumuman' },
    { to: '/faq', label: 'FAQ' },
  ];

  const kegiatanItems = [
    { to: '/gallery', label: 'Galeri' },
    { to: '/registration', label: 'Pendaftaran' },
    { to: '/tests', label: 'Tes' },
  ];

  const isKegiatanActive = kegiatanItems.some(item => location.pathname === item.to);
  const isActiveMenu = (path: string) => location.pathname === path;

  const navbarVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.15)',
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  };

  const menuItemVariants = {
    initial: { y: 0 },
    hover: { y: -2, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        ...navbarVariants[scrolled ? 'scrolled' : 'top'],
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <motion.div
                variants={logoVariants}
                initial="initial"
                whileHover="hover"
                className="flex items-center space-x-2"
              >
                <SparklesIcon className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold font-inter bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Cocstart
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                variants={menuItemVariants}
                initial="initial"
                whileHover="hover"
                custom={index}
              >
                <Link
                  to={item.to}
                  className={`text-sm font-semibold transition-all duration-300 relative group ${
                    isActiveMenu(item.to)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActiveMenu(item.to) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Kegiatan Dropdown */}
            <div className="relative">
              <motion.button
                variants={menuItemVariants}
                initial="initial"
                whileHover="hover"
                onClick={() => setIsKegiatanOpen(!isKegiatanOpen)}
                className={`flex items-center space-x-1 text-sm font-semibold transition-all duration-300 relative group ${
                  isKegiatanActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span>Kegiatan</span>
                <motion.div
                  animate={{ rotate: isKegiatanOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
                {isKegiatanActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
              <AnimatePresence>
                {isKegiatanOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-2 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl py-2 w-48 border border-gray-200/50"
                  >
                    {kegiatanItems.map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.to}
                          className={`block px-4 py-3 text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                            isActiveMenu(item.to)
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-r-2 border-blue-600'
                              : 'text-gray-700 hover:text-blue-600'
                          }`}
                          onClick={() => setIsKegiatanOpen(false)}
                        >
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Button */}
            {user ? (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Link to="/profile">
                  <img
                    src={user.profilePicture || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Login</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Bars3Icon className="w-6 h-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-4 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      className={`block py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
                        isActiveMenu(item.to)
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <button
                    onClick={() => setIsKegiatanOpen(!isKegiatanOpen)}
                    className={`flex items-center justify-between w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      isKegiatanActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span>Kegiatan</span>
                    <motion.div
                      animate={{ rotate: isKegiatanOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isKegiatanOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-8 mt-2 space-y-1 overflow-hidden"
                      >
                        {kegiatanItems.map((item, index) => (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={item.to}
                              className={`block py-2 px-3 text-sm rounded-lg transition-all duration-300 ${
                                isActiveMenu(item.to)
                                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                              onClick={() => {
                                setIsOpen(false);
                                setIsKegiatanOpen(false);
                              }}
                            >
                              <span>{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  className="pt-2 border-t border-gray-200/50"
                >
                  {user ? (
                    <Link
                      to="/profile"
                      className="block w-full py-3 px-4 text-sm font-semibold text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={user.profilePicture || 'https://via.placeholder.com/40'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                          />
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full py-3 px-4 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Login</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;