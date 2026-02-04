import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CircularGallery from "@/components/CircularGallery";

const galleryItems = [
  {
    image: "https://picsum.photos/400/400?random=1",
    text: "Dance Extravaganza",
  },
  {
    image: "https://picsum.photos/400/400?random=2",
    text: "Musical Beats",
  },
  {
    image: "https://picsum.photos/400/400?random=3",
    text: "Drama Performance",
  },
  {
    image: "https://picsum.photos/400/400?random=4",
    text: "Crowd Energy",
  },
  {
    image: "https://picsum.photos/400/400?random=5",
    text: "Stage Presence",
  },
  {
    image: "https://picsum.photos/400/400?random=6",
    text: "Cultural Vibes",
  },
  {
    image: "https://picsum.photos/400/400?random=7",
    text: "Artistic Expression",
  },
  {
    image: "https://picsum.photos/400/400?random=8",
    text: "Memorable Moments",
  },
];

export default function Gallery() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-purple-900/20 via-background to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-600 to-purple-600 rounded-full blur-3xl opacity-20"
            animate={{
              y: [0, 30, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-gradient">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Moments from KRIVVASS — Relive the energy, creativity, and passion of our cultural extravaganza.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section - Isolated Container */}
      <section className="relative w-full bg-black py-24">
        <div
          className="mx-auto"
          style={{
            width: '1200px',
            height: '520px',
            maxWidth: '100%',
          }}
        >
          <CircularGallery
            items={galleryItems}
            bend={6}
            textColor="#ffffff"
            borderRadius={0.08}
            scrollSpeed={4}
            scrollEase={0.08}
          />
        </div>
      </section>

      {/* Description */}
      <section className="relative py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-muted-foreground text-lg">
              Scroll to explore the highlights from KRIVVASS'26. Each moment captures the spirit of creativity, collaboration, and celebration.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="relative py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-t border-primary/10 overflow-hidden">
        {/* Background Effects */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-10"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            Want to be part of these moments?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Participate in KRIVVASS'26 events and create unforgettable memories with us.
          </motion.p>
          <motion.a
            href="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-xl" />
            </div>
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Explore Events
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </div>
      </section>
    </main>
  );
}
