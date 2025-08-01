import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const mockTests: Test[] = [
  { 
    id: '1', 
    title: 'Pemrograman Dasar', 
    type: 'mcq', 
    duration: 30, 
    questions: 20, 
    difficulty: 'easy',
    description: 'Test dasar tentang konsep pemrograman fundamental'
  },
  { 
    id: '2', 
    title: 'Algoritma dan Struktur Data', 
    type: 'mcq', 
    duration: 45, 
    questions: 25, 
    difficulty: 'medium',
    description: 'Evaluasi pemahaman algoritma dan struktur data'
  },
  { 
    id: '3', 
    title: 'Essay: Inovasi Teknologi', 
    type: 'essay', 
    duration: 60, 
    questions: 3, 
    difficulty: 'medium',
    description: 'Analisis mendalam tentang tren teknologi terkini'
  },
  { 
    id: '4', 
    title: 'Database Management', 
    type: 'mcq', 
    duration: 40, 
    questions: 30, 
    difficulty: 'hard',
    description: 'Test komprehensif tentang manajemen basis data'
  },
  { 
    id: '5', 
    title: 'Essay: Kepemimpinan Digital', 
    type: 'essay', 
    duration: 90, 
    questions: 2, 
    difficulty: 'hard',
    description: 'Refleksi mendalam tentang kepemimpinan di era digital'
  },
  { 
    id: '6', 
    title: 'Web Development', 
    type: 'mcq', 
    duration: 35, 
    questions: 25, 
    difficulty: 'medium',
    description: 'Evaluasi keterampilan pengembangan web modern'
  },
];

const Tests: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, 40]);

  const categories = ['All', 'mcq', 'essay'];
  const difficulties = ['All', 'easy', 'medium', 'hard'];
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  const filteredTests = mockTests.filter(test => {
    const typeMatch = filter === 'All' || test.type === filter;
    const difficultyMatch = difficultyFilter === 'All' || test.difficulty === difficultyFilter;
    return typeMatch && difficultyMatch;
  });

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
      default: return difficulty;
    }
  };

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    // Here you would typically navigate to the test or open a modal
    alert(`Memulai tes: ${test.title}`);
  };

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
                Tes & Evaluasi
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
              Uji kemampuan dan pengetahuan Anda dengan berbagai tes yang telah dirancang khusus
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          {/* Type Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Jenis Tes</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => setFilter(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-white/90 backdrop-blur-sm'
                  }`}
                >
                  <span className="relative z-10">
                    {category === 'All' ? 'Semua' : category === 'mcq' ? 'Pilihan Ganda' : 'Essay'}
                  </span>
                  {filter === category && (
                    <motion.div
                      layoutId="activeTypeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Difficulty Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Tingkat Kesulitan</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {difficulties.map((difficulty, index) => (
                <motion.button
                  key={difficulty}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  onClick={() => setDifficultyFilter(difficulty)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    difficultyFilter === difficulty
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-white/90 backdrop-blur-sm'
                  }`}
                >
                  <span className="relative z-10">
                    {difficulty === 'All' ? 'Semua' : getDifficultyLabel(difficulty)}
                  </span>
                  {difficultyFilter === difficulty && (
                    <motion.div
                      layoutId="activeDifficultyFilter"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600">
              Menampilkan <span className="font-semibold text-blue-600">{filteredTests.length}</span> tes tersedia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={`${filter}-${difficultyFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 h-full flex flex-col">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {test.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {test.description}
                        </p>
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
                        <div className="text-2xl font-bold text-blue-600">{test.duration}</div>
                        <div className="text-xs text-gray-500">Menit</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{test.questions}</div>
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
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-0"></div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0">
                    <motion.button
                      onClick={() => handleStartTest(test)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25"
                    >
                      <span className="flex items-center justify-center">
                        Mulai Tes
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-2"
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Tidak Ada Tes</h3>
              <p className="text-gray-500 mb-6">Tidak ada tes yang sesuai dengan filter yang dipilih.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter('All');
                  setDifficultyFilter('All');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Reset Filter
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Statistik Tes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: mockTests.length.toString(), label: 'Total Tes', color: 'blue' },
              { number: mockTests.filter(t => t.type === 'mcq').length.toString(), label: 'Pilihan Ganda', color: 'purple' },
              { number: mockTests.filter(t => t.type === 'essay').length.toString(), label: 'Essay', color: 'pink' },
              { number: Math.round(mockTests.reduce((acc, t) => acc + (t.duration || 0), 0) / mockTests.length).toString(), label: 'Rata-rata Durasi (menit)', color: 'indigo' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Siap Menguji Kemampuan Anda?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-white/95"
          >
            Mulai perjalanan pembelajaran Anda dengan tes-tes yang menantang dan bermanfaat!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const firstTest = filteredTests[0] || mockTests[0];
                if (firstTest) handleStartTest(firstTest);
              }}
              className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25"
            >
              Mulai Tes Pertama
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-3"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Tests;