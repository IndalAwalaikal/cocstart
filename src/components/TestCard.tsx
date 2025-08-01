import React from 'react';
import { motion } from 'framer-motion';

// Mock types for demonstration
interface Test {
  id: string;
  title: string;
  type: 'mcq' | 'essay';
  duration?: number;
  questions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  description?: string;
}

interface TestCardProps {
  test: Test;
  index?: number;
}

const TestCard: React.FC<TestCardProps> = ({ test, index = 0 }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Mudah';
      case 'medium': return 'Sedang';
      case 'hard': return 'Sulit';
      default: return 'Sedang';
    }
  };

  const handleStartTest = () => {
    alert(`Memulai tes: ${test.title}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      className="group h-full"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {test.title}
              </h3>
              {test.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {test.description}
                </p>
              )}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(test.difficulty || 'medium')}`}>
              {getDifficultyLabel(test.difficulty || 'medium')}
            </div>
          </div>
          
          {/* Type Badge */}
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              test.type === 'mcq' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {test.type === 'mcq' ? 'Pilihan Ganda' : 'Essay'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test.duration || 30}</div>
              <div className="text-xs text-gray-500">Menit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{test.questions || 20}</div>
              <div className="text-xs text-gray-500">
                {test.type === 'mcq' ? 'Soal' : 'Pertanyaan'}
              </div>
            </div>
          </div>

          {/* Progress Bar (Mock) */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Tingkat Penyelesaian</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-0"
                whileHover={{ width: "10%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Penilaian otomatis
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Hasil instant
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Analisis performa
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <motion.button
            onClick={handleStartTest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              Mulai Tes
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </motion.button>

          {/* Secondary Actions */}
          <div className="flex justify-between mt-3 text-xs">
            <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Lihat Detail
            </button>
            <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
              Riwayat Tes
            </button>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default TestCard;