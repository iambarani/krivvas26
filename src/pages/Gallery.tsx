import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BounceCards from "@/components/BounceCards";
import { galleryImages } from "@/data/galleryImages";
import ImageModal from "@/components/ImageModal";

export default function Gallery() {
  const images = galleryImages.map((image) => image.src);
  const imageMeta = useMemo(
    () => galleryImages.reduce<Record<string, string>>((acc, image) => {
      acc[image.src] = image.alt;
      return acc;
    }, {}),
    []
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  // Card transforms (fan-style layout)
  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-30" />
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
            Moments from KRIVVASS — creativity, culture, and celebration.
          </motion.p>
        </div>
      </section>

      {/* Bounce Cards Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-6 py-12 sm:px-10">
              <BounceCards
                images={images}
                transformStyles={transformStyles}
                containerWidth={520}
                containerHeight={280}
                animationDelay={0.6}
                animationStagger={0.1}
                easeType="elastic.out(1, 0.6)"
                enableHover
                onImageClick={(src) => setSelectedImage(src)}
              />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            isOpen={Boolean(selectedImage)}
            src={selectedImage}
            alt={imageMeta[selectedImage] ?? "Gallery image"}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
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
    </main>
  );
}
