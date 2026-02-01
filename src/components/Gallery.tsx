import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
    title: 'Opening Ceremony',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    title: 'Concert Night',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop',
    title: 'Battle of Bands',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    title: 'Dance Competition',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
    title: 'DJ Night',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
    title: 'Closing Ceremony',
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Glimpse</span> of Past
          </h2>
          <p className="section-subtitle">
            Relive the incredible moments from KRIVVASS'25
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-card aspect-[3/2]"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  KRIVVASS'25
                </p>
              </div>

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border border-primary/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <button className="btn-outline">View Full Gallery</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
