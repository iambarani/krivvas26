import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EventDetailsModal from "@/components/EventDetailsModal";
import { ArrowRight } from "lucide-react";
import DotGrid from "@/components/DotGrid"; // ✅ ADD ONLY THIS

const events = [
  {
    id: 1,
    title: "Artisan Heights – Tower Building",
    category: "Arts",
    image: "/events/artisan.jpg",
    description:
      "Test your engineering skills and build the tallest structure. Teams will compete to design and construct the tallest freestanding tower using provided materials.",
    type: "Team Event",
    venue: "Main Hall A",
    rules:
      "Participants can use only the provided materials. No external tools or adhesives allowed. Structure must stand independently for at least 30 seconds.",
    language: "English",
    musicProps: "Not applicable",
    timeLimit: "45 minutes",
    penalties:
      "Any structure that falls during measurement will be disqualified.",
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
    description:
      "Showcase your culinary creativity without using fire. Create delicious dishes using only cold preparation techniques and pre-cooked ingredients.",
    type: "Solo/Team",
    venue: "Kitchen Arena",
    rules:
      "No use of fire, ovens, or heating elements. All ingredients must be provided by the organizers. Time limit is strictly enforced.",
    language: "English",
    musicProps: "Background music provided",
    timeLimit: "30 minutes",
    penalties:
      "Using unauthorized heat sources will result in immediate disqualification.",
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
    description:
      "Express yourself through the art of mime and silent performance. Performers will be judged on expression, creativity, and storytelling ability.",
    type: "Solo",
    venue: "Drama Stage",
    rules:
      "No spoken words or sound effects allowed. Props must be pre-approved. Performance must be original.",
    language: "Non-verbal",
    musicProps: "Pre-recorded background music only",
    timeLimit: "5 minutes per performer",
    penalties:
      "Speaking or using unapproved sounds will result in point deduction or disqualification.",
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
    description:
      "Choreograph and perform an amazing group dance routine. Teams will be judged on choreography, synchronization, and overall presentation.",
    type: "Team Event",
    venue: "Main Stage",
    rules:
      "Minimum 6 members, maximum 15 members per team. Music must be provided in advance. Costume changes not allowed.",
    language: "N/A",
    musicProps: "Background track must be submitted 48 hours before event",
    timeLimit: "4 minutes performance + 1 minute setup",
    penalties:
      "Exceeding time limit will result in point deduction. Inappropriate content will lead to disqualification.",
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
    description:
      "Challenge your knowledge and compete in exciting quizzes. Test your GK, current affairs, and subject-specific knowledge across multiple rounds.",
    type: "Solo/Team",
    venue: "Auditorium",
    rules:
      "No electronic devices allowed. Questions will be in English. Answers must be written legibly.",
    language: "English",
    musicProps: "N/A",
    timeLimit: "Varies by round (15-30 minutes)",
    penalties:
      "Incomplete or unclear answers will not be accepted. Cheating will result in immediate disqualification.",
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
  const [selectedEvent, setSelectedEvent] =
    useState<(typeof events)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((event) => event.category === activeCategory);

  const handleCardClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* 🔹 DOT GRID BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#1a1329"
          activeColor="#6d4bff"
          proximity={120}
          shockRadius={250}
          shockStrength={4}
          resistance={800}
          returnDuration={1.5}
        />
      </div>

      {/* 🔹 CONTENT ABOVE GRID */}
      <div className="relative z-10">
        <Navbar />

        {/* ⬇️ EVERYTHING BELOW IS UNCHANGED ⬇️ */}

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
              Discover amazing events and showcase your talent. Choose an event
              and register now!
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
                  className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-primary via-accent to-secondary text-white shadow-lg shadow-primary/50"
                      : "text-muted-foreground hover:text-foreground border border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  {/* Card */}
                  <div
                    onClick={() => handleCardClick(event)}
                    className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/register");
                          }}
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-accent to-secondary py-2.5 text-sm font-semibold text-white"
                        >
                          Register Now <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <EventDetailsModal
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      </div>
    </main>
  );
}
