import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Set event date - adjust as needed
const EVENT_DATE = new Date('2026-03-15T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = EVENT_DATE.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownCard = ({ value, label, index }: { value: number; label: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="countdown-card flex-1 min-w-[120px] max-w-[160px]"
    >
      <div className="relative">
        <motion.span
          key={value}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="countdown-number block"
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </div>
      <p className="countdown-label">{label}</p>
    </motion.div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            The Countdown Begins
          </h2>
        </motion.div>

        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
          {timeUnits.map((unit, index) => (
            <CountdownCard
              key={unit.label}
              value={unit.value}
              label={unit.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
