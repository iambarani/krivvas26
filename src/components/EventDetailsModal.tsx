import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, User, Mail, Phone, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface Coordinator {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface Event {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  type?: string;
  venue?: string;
  rules?: string;
  language?: string;
  musicProps?: string;
  timeLimit?: string;
  penalties?: string;
  coordinators?: Coordinator[];
}

interface EventDetailsModalProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
}

export default function EventDetailsModal({
  isOpen,
  event,
  onClose,
}: EventDetailsModalProps) {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Container with Scrolling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] mx-4 overflow-y-auto pointer-events-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content Wrapper */}
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors duration-200 border border-slate-600/50 hover:border-slate-500"
              >
                <X size={20} className="text-white" />
              </motion.button>

              {/* Scrollable Content */}
              <div className="p-8 space-y-8">
                {/* Event Banner */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-purple-900 to-black rounded-t-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 left-4"
                  >
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-white text-sm font-semibold">
                      {event.category}
                    </span>
                  </motion.div>
                </div>

                {/* Title Section */}
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {event.title}
                  </h1>
                  {event.type && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/50 w-fit">
                      <span className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                          {event.type}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Venue */}
                  {event.venue && (
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                      <MapPin className="w-6 h-6 text-primary/80 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">
                          Venue
                        </p>
                        <p className="text-lg font-semibold text-white mt-1">
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-white">About This Event</h2>
                    <p className="text-base text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Rules & Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.rules && (
                      <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Rules
                        </p>
                        <p className="text-sm text-gray-300">{event.rules}</p>
                      </div>
                    )}

                    {event.language && (
                      <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Language
                        </p>
                        <p className="text-sm text-gray-300">{event.language}</p>
                      </div>
                    )}

                    {event.musicProps && (
                      <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Music & Props
                        </p>
                        <p className="text-sm text-gray-300">{event.musicProps}</p>
                      </div>
                    )}

                    {event.timeLimit && (
                      <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Time Limit
                        </p>
                        <p className="text-sm text-gray-300">{event.timeLimit}</p>
                      </div>
                    )}
                  </div>

                  {/* Penalties */}
                  {event.penalties && (
                    <div className="p-4 rounded-lg bg-red-900/20 border border-red-600/30">
                      <p className="text-xs font-semibold text-red-400/80 uppercase tracking-wide mb-2">
                        ⚠️ Important Notice
                      </p>
                      <p className="text-sm text-red-200/80">{event.penalties}</p>
                    </div>
                  )}

                  {/* Coordinators */}
                  {event.coordinators && event.coordinators.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-white">Event Coordinators</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.coordinators.map((coordinator, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:border-slate-500/80 transition-colors duration-300 space-y-3"
                          >
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {coordinator.role}
                              </p>
                              <p className="text-lg font-bold text-white mt-1">
                                {coordinator.name}
                              </p>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-slate-600/50">
                              <a
                                href={`mailto:${coordinator.email}`}
                                className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors duration-200 group"
                              >
                                <Mail size={16} />
                                <span className="group-hover:underline">
                                  {coordinator.email}
                                </span>
                              </a>
                              <a
                                href={`tel:${coordinator.phone}`}
                                className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors duration-200 group"
                              >
                                <Phone size={16} />
                                <span className="group-hover:underline">
                                  {coordinator.phone}
                                </span>
                              </a>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Register Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-8 relative group overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-secondary p-px transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                  >
                    <div className="relative px-6 py-3.5 bg-transparent rounded-[6px] text-base font-semibold text-white flex items-center justify-center gap-2">
                      <span>Register for Event</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </div>
                  </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
