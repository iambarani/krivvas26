import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Artisan Heights – Tower Building",
    image: "/events/artisan.jpg",
  },
  {
    id: 2,
    title: "Flavors Unleashed – Fireless Cooking",
    image: "/events/cooking.jpg",
  },
  {
    id: 3,
    title: "Silent Spectacle – Mime",
    image: "/events/mime.jpg",
  },
  {
    id: 4,
    title: "Groovista – Group Dance",
    image: "/events/dance.jpg",
  },
  {
    id: 5,
    title: "Brain Buster",
    image: "/events/brain.jpg",
  },
];

export default function FeaturedEvents() {
  const [centerIndex, setCenterIndex] = useState(2);
  const navigate = useNavigate();

  const prev = () =>
    setCenterIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setCenterIndex((i) => Math.min(events.length - 1, i + 1));

  return (
    <section id="featured-events" className="relative py-28 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
            <span className="text-purple-400">Featured</span> Events
          </h2>
        </div>

        {/* Slider */}
        <div className="relative flex items-center justify-center h-[28rem]">
          {/* Left Arrow */}
          <button
            onClick={prev}
            disabled={centerIndex === 0}
            className="absolute left-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Cards */}
          <div className="relative flex items-center justify-center w-full h-full">
            {events.map((event, index) => {
              const offset = index - centerIndex;
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={event.id}
                  animate={{
                    scale: isCenter ? 1.15 : 0.9,
                    opacity: Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.4,
                    rotateY: offset * -12,
                    x: offset * 140,
                    zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  onClick={() => setCenterIndex(index)}
                  className="absolute cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1200px",
                  }}
                >
                  {/* Card */}
                  <div className="relative w-64 h-80 md:w-72 md:h-[22rem] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Dark overlay for side cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/60" />
                    )}

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-sm md:text-base font-semibold text-white text-center">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            disabled={centerIndex === events.length - 1}
            className="absolute right-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-20">
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            View All Events
          </button>
          <button
            className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}
