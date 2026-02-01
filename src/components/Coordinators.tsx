import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

const coordinators = [
  {
    id: 1,
    name: 'Arjun Sharma',
    role: 'Overall Coordinator',
    event: 'KRIVVASS\'26',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    phone: '+91 98765 43210',
    email: 'arjun@krivvass.com',
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Events Head',
    event: 'Cultural Events',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    phone: '+91 98765 43211',
    email: 'priya@krivvass.com',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    role: 'Technical Head',
    event: 'Tech Events',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    phone: '+91 98765 43212',
    email: 'rahul@krivvass.com',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Hospitality Head',
    event: 'Guest Management',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    phone: '+91 98765 43213',
    email: 'sneha@krivvass.com',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Sponsorship Head',
    event: 'Partnerships',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    phone: '+91 98765 43214',
    email: 'vikram@krivvass.com',
  },
];

const Coordinators = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-radial from-secondary/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Event</span> Coordinators
          </h2>
          <p className="section-subtitle">
            Meet the incredible team behind KRIVVASS'26
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 glass-card-hover rounded-full hidden md:flex -translate-x-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 glass-card-hover rounded-full hidden md:flex translate-x-4"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {coordinators.map((coordinator, index) => (
              <motion.div
                key={coordinator.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-72 snap-center glass-card-hover p-6 group"
              >
                {/* Profile Image */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                  <img
                    src={coordinator.image}
                    alt={coordinator.name}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-glass-border"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {coordinator.name}
                  </h3>
                  <p className="text-sm text-primary mb-1">{coordinator.role}</p>
                  <p className="text-xs text-muted-foreground mb-4">{coordinator.event}</p>

                  {/* Contact Info */}
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={`tel:${coordinator.phone}`}
                      className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {coordinator.phone}
                    </a>
                    <a
                      href={`mailto:${coordinator.email}`}
                      className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      {coordinator.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coordinators;
