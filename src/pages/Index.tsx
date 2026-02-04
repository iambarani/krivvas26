import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import FeaturedEvents from '@/components/FeaturedEvents';
import Gallery from '@/components/Gallery';
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
        <Gallery />
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
    </main>
  );
};

export default Index;
