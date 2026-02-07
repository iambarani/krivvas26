import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import EventDetailsModal from "@/components/EventDetailsModal";
import { ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Artisan Heights – Tower Building",
    category: "Arts",
    image: "/events/artisan.jpg",
    description: "Test your engineering skills and build the tallest structure. Teams will compete to design and construct the tallest freestanding tower using provided materials.",
    type: "Team Event",
    venue: "Main Hall A",
    rules: "Participants can use only the provided materials. No external tools or adhesives allowed. Structure must stand independently for at least 30 seconds.",
    language: "English",
    musicProps: "Not applicable",
    timeLimit: "45 minutes",
    penalties: "Any structure that falls during measurement will be disqualified.",
    coordinators: [
      {
        name: "Rajesh Kumar",
        role: "Event Coordinator",
        email: "rajesh@krivvass.com",
        phone: "+91 98765 43210",
      },
      {
        name: "Priya Sharma",
        role: "Co-Coordinator",
        email: "priya@krivvass.com",
        phone: "+91 98765 43211",
      },
    ],
  },
  {
    id: 2,
    title: "Flavors Unleashed – Fireless Cooking",
    category: "Culinary",
    image: "/events/cooking.jpg",
    description: "Showcase your culinary creativity without using fire. Create delicious dishes using only cold preparation techniques and pre-cooked ingredients.",
    type: "Solo/Team",
    venue: "Kitchen Arena",
    rules: "No use of fire, ovens, or heating elements. All ingredients must be provided by the organizers. Time limit is strictly enforced.",
    language: "English",
    musicProps: "Background music provided",
    timeLimit: "30 minutes",
    penalties: "Using unauthorized heat sources will result in immediate disqualification.",
    coordinators: [
      {
        name: "Chef Amit Patel",
        role: "Head Coordinator",
        email: "amit@krivvass.com",
        phone: "+91 98765 43212",
      },
    ],
  },
  {
    id: 3,
    title: "Silent Spectacle – Mime",
    category: "Drama",
    image: "/events/mime.jpg",
    description: "Express yourself through the art of mime and silent performance. Performers will be judged on expression, creativity, and storytelling ability.",
    type: "Solo",
    venue: "Drama Stage",
    rules: "No spoken words or sound effects allowed. Props must be pre-approved. Performance must be original.",
    language: "Non-verbal",
    musicProps: "Pre-recorded background music only",
    timeLimit: "5 minutes per performer",
    penalties: "Speaking or using unapproved sounds will result in point deduction or disqualification.",
    coordinators: [
      {
        name: "Dr. Ananya Singh",
        role: "Drama Coordinator",
        email: "ananya@krivvass.com",
        phone: "+91 98765 43213",
      },
    ],
  },
  {
    id: 4,
    title: "Groovista – Group Dance",
    category: "Dance",
    image: "/events/dance.jpg",
    description: "Choreograph and perform an amazing group dance routine. Teams will be judged on choreography, synchronization, and overall presentation.",
    type: "Team Event",
    venue: "Main Stage",
    rules: "Minimum 6 members, maximum 15 members per team. Music must be provided in advance. Costume changes not allowed.",
    language: "N/A",
    musicProps: "Background track must be submitted 48 hours before event",
    timeLimit: "4 minutes performance + 1 minute setup",
    penalties: "Exceeding time limit will result in point deduction. Inappropriate content will lead to disqualification.",
    coordinators: [
      {
        name: "Vikram Desai",
        role: "Dance Coordinator",
        email: "vikram@krivvass.com",
        phone: "+91 98765 43214",
      },
      {
        name: "Sneha Gupta",
        role: "Assistant Coordinator",
        email: "sneha@krivvass.com",
        phone: "+91 98765 43215",
      },
    ],
  },
  {
    id: 5,
    title: "Brain Buster",
    category: "Quiz",
    image: "/events/brain.jpg",
    description: "Challenge your knowledge and compete in exciting quizzes. Test your GK, current affairs, and subject-specific knowledge across multiple rounds.",
    type: "Solo/Team",
    venue: "Auditorium",
    rules: "No electronic devices allowed. Questions will be in English. Answers must be written legibly.",
    language: "English",
    musicProps: "N/A",
    timeLimit: "Varies by round (15-30 minutes)",
    penalties: "Incomplete or unclear answers will not be accepted. Cheating will result in immediate disqualification.",
    coordinators: [
      {
        name: "Prof. Neha Verma",
        role: "Quiz Master",
        email: "neha@krivvass.com",
        phone: "+91 98765 43216",
      },
    ],
  },
];

const categories = ["All", "Arts", "Culinary", "Drama", "Dance", "Quiz"];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const handleCardClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-gradient">All Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Discover amazing events and showcase your talent. Choose an event and register now!
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative py-6 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary via-accent to-secondary text-white shadow-lg shadow-primary/50'
                    : 'text-muted-foreground hover:text-foreground border border-primary/20 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="categoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                {/* Card Container */}
                <div
                  onClick={() => handleCardClick(event)}
                  className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-900 to-black">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute top-4 right-4"
                    >
                      <span className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-white text-xs font-semibold">
                        {event.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex-1" />

                    {/* Register Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="relative w-full group/btn overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-secondary p-px transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    >
                      <div className="relative px-4 py-2.5 bg-transparent rounded-[6px] text-sm font-semibold text-white flex items-center justify-center gap-2">
                        <span>Register Now</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/0 to-secondary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    animate={{
                      boxShadow: [
                        'inset 0 0 20px rgba(0,0,0,0)',
                        'inset 0 0 20px rgba(139, 92, 246, 0.3)',
                        'inset 0 0 20px rgba(0,0,0,0)',
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No events found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 border-t border-primary/10 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            Ready to showcase your talent?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Pick an event that excites you and register now. Don't miss the opportunity to compete and win amazing prizes!
          </motion.p>
        </div>
      </section>

      {/* Event Details Modal */}
      <EventDetailsModal 
        isOpen={isModalOpen} 
        event={selectedEvent} 
        onClose={handleCloseModal} 
      />
    </main>
  );
}
