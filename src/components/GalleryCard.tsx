import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon, 
  HeartIcon, 
  ShareIcon, 
  CalendarIcon,
  TagIcon,
  PlayIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import type { GalleryItem } from '../types';

interface GalleryCardProps {
  item: GalleryItem;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 20);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this ${item.category.toLowerCase()}: ${item.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const cardVariants = {
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
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const overlayVariants = {
    hidden: { 
      opacity: 0,
      backdrop: "blur(0px)"
    },
    visible: { 
      opacity: 1,
      backdrop: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Event': 'from-blue-500 to-blue-600',
      'Workshop': 'from-green-500 to-green-600',
      'Competition': 'from-purple-500 to-purple-600',
      'Seminar': 'from-orange-500 to-orange-600',
      'Meetup': 'from-pink-500 to-pink-600',
      'Conference': 'from-indigo-500 to-indigo-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Event': CalendarIcon,
      'Workshop': PlayIcon,
      'Competition': TagIcon,
      'Seminar': PhotoIcon,
      'Meetup': PhotoIcon,
      'Conference': PhotoIcon
    };
    const IconComponent = icons[category as keyof typeof icons] || PhotoIcon;
    return IconComponent;
  };

  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <PhotoIcon className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        )}

        {/* Main Image */}
        <motion.img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          initial={{ scale: 1.1 }}
          animate={{ scale: imageLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Category Badge */}
        <motion.div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(item.category)} shadow-lg`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex items-center space-x-1">
            <CategoryIcon className="w-3 h-3" />
            <span>{item.category}</span>
          </div>
        </motion.div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                variants={iconVariants}
                className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl"
              >
                <EyeIcon className="w-8 h-8 text-gray-800" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Count Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <EyeIcon className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 500) + 100}</span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Pengalaman luar biasa yang menginspirasi dan membawa dampak positif bagi komunitas teknologi Indonesia.
        </motion.p>

        {/* Meta Information */}
        <motion.div
          className="flex items-center justify-between text-sm text-gray-500 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {new Date().toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TagIcon className="w-4 h-4" />
            <span>Coconut Event</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isLiked 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isLiked ? (
                <HeartSolidIcon className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </motion.div>
            <span className="text-sm font-medium">{likes}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShareIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-6 right-6 w-2 h-2 bg-blue-400 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Gradient Border on Hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${getCategoryColor(item.category).split(' ')[1]}, ${getCategoryColor(item.category).split(' ')[3]})`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract'
        }}
      />
    </motion.div>
  );
};

export default GalleryCard;