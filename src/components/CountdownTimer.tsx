import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { days: number; hours: number; minutes: number; seconds: number } = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md text-center"
    >
      <h3 className="text-xl font-semibold font-inter text-primary-blue mb-4">Waktu Tersisa Pendaftaran</h3>
      <div className="grid grid-cols-4 gap-4">
        {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
          <motion.div
            key={unit}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl font-bold font-inter text-primary-blue">{timeLeft[unit as keyof typeof timeLeft]}</span>
            <span className="text-sm font-inter text-secondary-gray capitalize">{unit}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;