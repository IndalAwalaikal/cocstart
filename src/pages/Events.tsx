import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import type { GalleryItem } from '../types';

interface EventItem extends GalleryItem {
  date: string;
  time?: string;
  location?: string;
  participants?: number;
  description?: string;
}

const mockEvents: EventItem[] = [
  { 
    id: '1', 
    title: 'Workshop React & Next.js 2025', 
    category: 'Workshop', 
    imageUrl: 'https://via.placeholder.com/400x300?text=Workshop', 
    date: '2025-08-15',
    time: '09:00 - 17:00',
    location: 'Jakarta Convention Center',
    participants: 150,
    description: 'Pelajari pengembangan web modern dengan React dan Next.js dari para ahli.'
  },
  { 
    id: '2', 
    title: 'Seminar AI & Machine Learning', 
    category: 'Seminar', 
    imageUrl: 'https://via.placeholder.com/400x300?text=Seminar', 
    date: '2025-09-10',
    time: '13:00 - 16:00',
    location: 'Virtual Event',
    participants: 500,
    description: 'Eksplorasi tren terbaru dalam AI dan Machine Learning untuk masa depan teknologi.'
  },
  { 
    id: '3', 
    title: 'Hackathon Innovation 2025', 
    category: 'Hackathon', 
    imageUrl: 'https://via.placeholder.com/400x300?text=Hackathon', 
    date: '2025-10-05',
    time: '48 Hours',
    location: 'Universitas Indonesia',
    participants: 200,
    description: 'Kompetisi 48 jam untuk menciptakan solusi inovatif bagi masalah sosial.'
  },
  { 
    id: '4', 
    title: 'Webinar Digital Transformation', 
    category: 'Webinar', 
    imageUrl: 'https://via.placeholder.com/400x300?text=Webinar', 
    date: '2025-07-20',
    time: '14:00 - 15:30',
    location: 'Online',
    participants: 1000,
    description: 'Strategi dan implementasi transformasi digital untuk bisnis modern.'
  },
];

const Events: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Workshop', 'Seminar', 'Hackathon', 'Webinar'];
  const filteredEvents = filter === 'All' ? mockEvents : mockEvents.filter(event => event.category === filter);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Workshop': 'from-green-500 to-green-600',
      'Seminar': 'from-orange-500 to-orange-600',
      'Hackathon': 'from-purple-500 to-purple-600',
      'Webinar': 'from-blue-500 to-blue-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-8"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Daftar Acara
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan dan ikuti berbagai acara menarik yang kami selenggarakan
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setFilter(category);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-lg text-gray-700 border border-gray-200 hover:bg-white hover:border-gray-300 shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(event.category)} shadow-lg`}>
                  <div className="flex items-center space-x-1">
                    <TagIcon className="w-3 h-3" />
                    <span>{event.category}</span>
                  </div>
                </div>

                {/* Participants Badge */}
                {event.participants && (
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <UserGroupIcon className="w-3 h-3" />
                    <span>{event.participants}</span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                )}

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {/* Register Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    // Handle registration logic here
                    console.log('Register for event:', event.id);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Daftar Sekarang
                </motion.button>
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
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Acara</h3>
            <p className="text-gray-600">Acara untuk kategori ini akan segera hadir!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;