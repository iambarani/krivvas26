import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import FeaturedEvents from '@/components/FeaturedEvents';
import GlimpseOfPast from '@/components/GlimpseOfPast';
import Coordinators from '@/components/Coordinators';
import Contact from '@/components/Contact';
import DeveloperTeam from '@/components/DeveloperTeam';

const Index = () => {
  const location = useLocation();

  // Handle hash-based navigation and scrolling
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove # from hash
    if (hash) {
      // Wait for DOM to be ready, then scroll
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // If no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <Countdown />
      <section id="events">
        <FeaturedEvents />
      </section>
      <section id="gallery">
        <GlimpseOfPast />
      </section>
      <section id="coordinators">
        <Coordinators />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="developer-team">
        <DeveloperTeam />
      </section>
      <section className="relative">
        <div className="line-glow mt-20 mb-8 max-w-2xl mx-auto" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm">
            © 2026 KRIVVASS. Krishna University. All rights reserved.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Index;
