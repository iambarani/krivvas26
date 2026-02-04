import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const developers = [
  {
    id: 1,
    name: 'Jeevakumaran',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Kishoresharma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Karthiknavneeth',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
];

const DeveloperTeam = () => {
  return (
    <section id="developer-team" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Developer</span> Team
          </h2>
          <p className="section-subtitle">
            Meet the people behind the KRIVVASS'26 website
          </p>
        </motion.div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card-hover p-8 flex flex-col items-center text-center group"
            >
              {/* Circular Profile Image */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-glass-border group-hover:border-primary/50 transition-all duration-300"
                />
              </div>

              {/* Developer Name */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                {developer.name}
              </h3>

              {/* View Profile Button */}
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group/btn">
                <span className="font-medium">View Profile</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperTeam;
