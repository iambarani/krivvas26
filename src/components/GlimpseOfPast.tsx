import { Link } from "react-router-dom";
import { galleryImages } from "@/data/galleryImages";

export default function GlimpseOfPast() {
  const previewImages = galleryImages.slice(0, 4);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-gradient">Glimpse</span> of Past
          </h2>
          <p className="section-subtitle">
            Relive the highlights from previous editions of KRIVVASS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/gallery"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-secondary p-px transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
          >
            <span className="relative flex items-center justify-center px-6 py-2.5 rounded-[6px] text-sm font-semibold text-white">
              View Full Gallery
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
