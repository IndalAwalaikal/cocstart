import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'Apa itu Cocstart?',
    answer: 'Cocstart adalah platform untuk mendaftar dan mengikuti kegiatan teknologi seperti workshop, seminar, dan hackathon yang diselenggarakan oleh Coconut.',
  },
  {
    question: 'Bagaimana cara mendaftar kegiatan?',
    answer: 'Kunjungi halaman Pendaftaran, isi formulir, dan tunggu konfirmasi dari tim kami.',
  },
  {
    question: 'Apakah ada biaya untuk bergabung?',
    answer: 'Sebagian besar kegiatan gratis, tetapi beberapa acara khusus mungkin memerlukan biaya. Cek detail di halaman Acara.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto py-12 px-4"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pertanyaan Umum
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            Jawaban atas pertanyaan yang sering diajukan
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl border border-blue-200 transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setOpenIndex(openIndex === index ? null : index);
                }}
                className="flex justify-between items-center w-full text-left p-6"
              >
                <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </motion.div>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 text-gray-600 text-base leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
              {/* Gradient Border on Hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #db2777)',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'subtract',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'subtract',
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;