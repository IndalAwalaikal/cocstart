import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MegaphoneIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  isNew?: boolean;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Hasil Seleksi Tahap Pertama',
    content: 'Pengumuman hasil seleksi tahap pertama akan diumumkan pada 15 Agustus 2025. Peserta yang lolos akan mendapatkan email konfirmasi dan undangan untuk mengikuti tahap selanjutnya.',
    date: '2025-08-15',
    time: '14:00 WIB',
    type: 'success',
    isNew: true
  },
  {
    id: '2',
    title: 'Jadwal Tes Seleksi Online',
    content: 'Tes seleksi akan diadakan pada 10 Agustus 2025 secara online melalui platform resmi. Pastikan koneksi internet stabil dan perangkat dalam kondisi baik.',
    date: '2025-08-10',
    time: '09:00 WIB',
    type: 'info',
    isNew: false
  },
  {
    id: '3',
    title: 'Perpanjangan Masa Pendaftaran',
    content: 'Masa pendaftaran diperpanjang hingga 5 Agustus 2025. Jangan lewatkan kesempatan untuk bergabung dengan kami!',
    date: '2025-08-05',
    time: '23:59 WIB',
    type: 'warning',
    isNew: true
  },
  {
    id: '4',
    title: 'Maintenance Sistem',
    content: 'Sistem akan mengalami maintenance pada 3 Agustus 2025 pukul 01:00 - 06:00 WIB. Harap maklum atas ketidaknyamanan ini.',
    date: '2025-08-03',
    time: '01:00 - 06:00 WIB',
    type: 'urgent'
  }
];

const Announcements: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const getTypeConfig = (type: string) => {
    const configs = {
      info: {
        icon: InformationCircleIcon,
        bgColor: 'from-blue-500 to-blue-600',
        lightBg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600'
      },
      warning: {
        icon: ExclamationTriangleIcon,
        bgColor: 'from-orange-500 to-orange-600',
        lightBg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-600'
      },
      success: {
        icon: CheckCircleIcon,
        bgColor: 'from-green-500 to-green-600',
        lightBg: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600'
      },
      urgent: {
        icon: ExclamationTriangleIcon,
        bgColor: 'from-red-500 to-red-600',
        lightBg: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600'
      }
    };
    return configs[type as keyof typeof configs] || configs.info;
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
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-4"
            >
              <MegaphoneIcon className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pengumuman
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Informasi terbaru dan penting untuk semua peserta
          </p>
        </motion.div>

        {/* Announcements List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {announcements.map((announcement, index) => {
            const config = getTypeConfig(announcement.type);
            const IconComponent = config.icon;

            return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedAnnouncement(announcement)}
                className={`relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl border ${config.borderColor} transition-all duration-300 overflow-hidden cursor-pointer group`}
              >
                {/* New Badge */}
                {announcement.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10"
                  >
                    BARU
                  </motion.div>
                )}

                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${config.bgColor} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {announcement.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {announcement.content}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1 text-blue-500" />
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1 text-green-500" />
                          <span>{announcement.time}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${config.lightBg} ${config.textColor}`}>
                          {announcement.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Gradient Border on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${config.bgColor.split(' ')[1]}, ${config.bgColor.split(' ')[3]})`,
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'subtract',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'subtract'
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedAnnouncement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setSelectedAnnouncement(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setSelectedAnnouncement(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>

                {/* Content */}
                <div className="pr-12">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getTypeConfig(selectedAnnouncement.type).bgColor} flex items-center justify-center mr-3`}>
                      {React.createElement(getTypeConfig(selectedAnnouncement.type).icon, { 
                        className: "w-5 h-5 text-white" 
                      })}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedAnnouncement.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{formatDate(selectedAnnouncement.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>{selectedAnnouncement.time}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-base">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {announcements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Pengumuman</h3>
            <p className="text-gray-600">Pengumuman terbaru akan muncul di sini!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Announcements;