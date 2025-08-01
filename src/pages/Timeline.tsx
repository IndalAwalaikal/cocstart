import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  location?: string;
}

const timelineEvents: TimelineEvent[] = [
  { 
    id: '1', 
    title: 'Pendaftaran Dibuka', 
    date: '1 Agustus 2025',
    time: '00:00 WIB',
    description: 'Pendaftaran untuk semua peserta dimulai. Lengkapi formulir pendaftaran dan upload dokumen yang diperlukan.',
    status: 'completed',
    location: 'Online'
  },
  { 
    id: '2', 
    title: 'Batas Akhir Pendaftaran', 
    date: '5 Agustus 2025',
    time: '23:59 WIB',
    description: 'Pastikan semua dokumen dan persyaratan pendaftaran telah dilengkapi sebelum batas waktu.',
    status: 'current',
    location: 'Online'
  },
  { 
    id: '3', 
    title: 'Tes Seleksi Online', 
    date: '10 Agustus 2025',
    time: '09:00 - 12:00 WIB',
    description: 'Tes pilihan ganda dan esai diadakan secara online. Pastikan koneksi internet stabil dan perangkat dalam kondisi baik.',
    status: 'upcoming',
    location: 'Platform Online'
  },
  { 
    id: '4', 
    title: 'Interview & Presentasi', 
    date: '12 Agustus 2025',
    time: '13:00 - 17:00 WIB',
    description: 'Sesi wawancara dan presentasi untuk kandidat yang lolos tahap sebelumnya.',
    status: 'upcoming',
    location: 'Jakarta Convention Center'
  },
  { 
    id: '5', 
    title: 'Pengumuman Hasil Seleksi', 
    date: '15 Agustus 2025',
    time: '14:00 WIB',
    description: 'Hasil seleksi final diumumkan melalui email dan website resmi. Peserta yang lolos akan mendapatkan informasi lebih lanjut.',
    status: 'upcoming',
    location: 'Email & Website'
  },
  { 
    id: '6', 
    title: 'Orientasi & Welcome Session', 
    date: '20 Agustus 2025',
    time: '09:00 - 16:00 WIB',
    description: 'Sesi orientasi untuk peserta yang diterima, termasuk pengenalan program dan networking session.',
    status: 'upcoming',
    location: 'Universitas Indonesia'
  }
];

const Timeline: React.FC = () => {
  const getStatusConfig = (status: string) => {
    const configs = {
      completed: {
        icon: CheckCircleSolidIcon,
        bgColor: 'bg-green-500',
        borderColor: 'border-green-500',
        textColor: 'text-green-600',
        lightBg: 'bg-green-50',
        lineColor: 'bg-green-300'
      },
      current: {
        icon: PlayCircleIcon,
        bgColor: 'bg-blue-500',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-600',
        lightBg: 'bg-blue-50',
        lineColor: 'bg-blue-300'
      },
      upcoming: {
        icon: ExclamationCircleIcon,
        bgColor: 'bg-gray-400',
        borderColor: 'border-gray-400',
        textColor: 'text-gray-600',
        lightBg: 'bg-gray-50',
        lineColor: 'bg-gray-300'
      }
    };
    return configs[status as keyof typeof configs] || configs.upcoming;
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <ClockIcon className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Timeline Kegiatan
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ikuti jadwal dan milestone penting dalam program ini
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-blue-300 to-gray-300 rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const config = getStatusConfig(event.status);
                const IconComponent = config.icon;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start"
                  >
                    {/* Timeline Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                      
                      {/* Pulse Animation for Current */}
                      {event.status === 'current' && (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-blue-500"
                        />
                      )}
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className={`ml-8 flex-1 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl border-2 ${config.borderColor} transition-all duration-300 overflow-hidden group`}
                    >
                      <div className="p-6">
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.lightBg} ${config.textColor}`}>
                            {event.status === 'completed' ? 'Selesai' : 
                             event.status === 'current' ? 'Berlangsung' : 'Akan Datang'}
                          </div>
                          {event.status === 'current' && (
                            <motion.div
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
                            >
                              AKTIF
                            </motion.div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className={`text-2xl font-bold mb-3 group-hover:${config.textColor} transition-colors duration-300`}>
                          {event.title}
                        </h3>

                        {/* Date and Time */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="font-medium">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
                            <span>{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Progress Indicator */}
                        {event.status === 'current' && (
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "60%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden"
                          >
                            <motion.div
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Gradient Border Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${config.bgColor.replace('bg-', '')}, ${config.bgColor.replace('bg-', '')})`,
                          padding: '2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'subtract',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'subtract'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                label: 'Tahap Selesai', 
                count: timelineEvents.filter(e => e.status === 'completed').length,
                color: 'from-green-500 to-green-600',
                icon: CheckCircleSolidIcon
              },
              { 
                label: 'Tahap Aktif', 
                count: timelineEvents.filter(e => e.status === 'current').length,
                color: 'from-blue-500 to-blue-600',
                icon: PlayCircleIcon
              },
              { 
                label: 'Tahap Mendatang', 
                count: timelineEvents.filter(e => e.status === 'upcoming').length,
                color: 'from-gray-500 to-gray-600',
                icon: ExclamationCircleIcon
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.count}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;