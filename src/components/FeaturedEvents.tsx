import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music, Mic2, Palette, Camera, Theater } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Battle of Bands',
    category: 'Music',
    description: 'Witness the ultimate musical showdown',
    icon: Music,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Stand-up Night',
    category: 'Comedy',
    description: 'Laugh out loud with the best comedians',
    icon: Mic2,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Art Exhibition',
    category: 'Art',
    description: 'Explore creative masterpieces',
    icon: Palette,
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    id: 4,
    title: 'Photography Contest',
    category: 'Photography',
    description: 'Capture moments that matter',
    icon: Camera,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    id: 5,
    title: 'Drama Festival',
    category: 'Theatre',
    description: 'Experience powerful performances',
    icon: Theater,
    gradient: 'from-red-500 to-rose-500',
  },
];

const FeaturedEvents = () => {
  const [centerIndex, setCenterIndex] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(events.length - 1, index));
    setCenterIndex(newIndex);
  };

  return (
    <section id="events" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Featured</span> Events
          </h2>
          <p className="section-subtitle">
            Discover the incredible lineup of events that await you at KRIVVASS'26
          </p>
        </motion.div>

        {/* Events Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollToIndex(centerIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 glass-card-hover rounded-full hidden md:flex"
            disabled={centerIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollToIndex(centerIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 glass-card-hover rounded-full hidden md:flex"
            disabled={centerIndex === events.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex items-center justify-center gap-4 md:gap-6 py-8 px-4 md:px-16"
          >
            {events.map((event, index) => {
              const isCenter = index === centerIndex;
              const offset = index - centerIndex;
              const Icon = event.icon;

              return (
                <motion.div
                  key={event.id}
                  animate={{
                    scale: isCenter ? 1.05 : 0.9,
                    opacity: Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.6,
                    x: offset * 20,
                    rotateY: offset * -5,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={() => setCenterIndex(index)}
                  className={`flex-shrink-0 w-64 md:w-72 cursor-pointer ${
                    isCenter ? 'event-card-center' : 'event-card'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  {/* Card Content */}
                  <div className="relative p-6">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Category Badge */}
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      {event.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>

                    {/* Glow effect for center card */}
                    {isCenter && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCenterIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === centerIndex
                    ? 'w-8 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mt-12"
        >
          <button className="btn-outline">View All Events</button>
          <button className="btn-primary">Register Now</button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
