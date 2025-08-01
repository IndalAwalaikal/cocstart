import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: '1',
    name: 'Andi Pratama',
    quote: 'Cocstart membantu saya mengembangkan keterampilan teknologi melalui workshop yang luar biasa!',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: '2',
    name: 'Siti Rahmah',
    quote: 'Hackathon di Cocstart adalah pengalaman terbaik, penuh inovasi dan kolaborasi!',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: '3',
    name: 'Budi Santoso',
    quote: 'Komunitas yang ramah dan acara yang sangat terorganisir. Sangat merekomendasikan!',
    image: 'https://via.placeholder.com/80',
  },
];

const Testimonials: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md text-center"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <p className="text-secondary-gray font-inter text-sm mb-4">{testimonial.quote}</p>
          <p className="text-primary-blue font-semibold font-inter">{testimonial.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Testimonials;