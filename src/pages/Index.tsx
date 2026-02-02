import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import FeaturedEvents from '@/components/FeaturedEvents';
import Gallery from '@/components/Gallery';
import Coordinators from '@/components/Coordinators';
import Contact from '@/components/Contact';

const Index = () => {
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
    </main>
  );
};

export default Index;
