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
      <Hero />
      <Countdown />
      <FeaturedEvents />
      <Gallery />
      <Coordinators />
      <Contact />
    </main>
  );
};

export default Index;
