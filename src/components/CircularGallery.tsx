import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './CircularGallery.css';

interface GalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.06,
  scrollSpeed = 2,
  scrollEase = 0.05,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const targetScroll = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [selectedImage, setSelectedImage] = useState<{ image: string; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Duplicate items for seamless infinite loop
  const loopedItems = [...items, ...items, ...items];

  // Handle image click
  const handleImageClick = (item: GalleryItem, e: React.MouseEvent) => {
    if (!isDragging.current) {
      e.stopPropagation();
      setSelectedImage(item);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const cardWidth = 300;
    const gap = 24; // Reduced from 40 (padding 1.2)
    const totalWidth = loopedItems.length * (cardWidth + gap);

    // Force resize after mount (CRITICAL for OGL)
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Mouse wheel handler with enhanced sensitivity
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Increased multiplier to 1.1 for better responsiveness
      const delta = e.deltaY;
      targetScroll.current += (delta > 0 ? scrollSpeed : -scrollSpeed) * 1.1;
    };

    // Mouse drag handlers with enhanced sensitivity
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      gallery.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      // Increased multiplier to 0.12 for better drag sensitivity
      const distance = (startX.current - e.clientX) * (scrollSpeed * 0.12);
      targetScroll.current = scrollPosition.current + distance;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      gallery.style.cursor = 'grab';
    };

    // Animation loop with enhanced curvature
    const animate = () => {
      // Continuous auto-scroll (pauses during modal or drag)
      if (!isDragging.current && !isModalOpen) {
        targetScroll.current += 0.02;
      }

      scrollPosition.current += (targetScroll.current - scrollPosition.current) * scrollEase;

      // Infinite loop wrapping
      const singleSetWidth = items.length * (cardWidth + gap);
      if (scrollPosition.current > singleSetWidth * 2) {
        scrollPosition.current -= singleSetWidth;
        targetScroll.current -= singleSetWidth;
      } else if (scrollPosition.current < singleSetWidth) {
        scrollPosition.current += singleSetWidth;
        targetScroll.current += singleSetWidth;
      }

      if (galleryRef.current) {
        const cards = galleryRef.current.querySelectorAll<HTMLElement>('.gallery-card');
        const centerX = galleryRef.current.clientWidth / 2;

        cards.forEach((card, index) => {
          const x = index * (cardWidth + gap) - scrollPosition.current;
          const distanceFromCenter = x + cardWidth / 2 - centerX;
          const normalizedDistance = distanceFromCenter / centerX;
          
          // Enhanced bend effect with 1.8x multiplier for visibility
          const bendMultiplier = Math.abs(bend) * 1.8;
          const bendAmount = Math.sin(normalizedDistance * Math.PI * 0.5) * bendMultiplier * 20;
          const scale = 1 - Math.abs(normalizedDistance) * 0.3;
          const opacity = 1 - Math.abs(normalizedDistance) * 0.5;

          // Add rotation for more pronounced 3D effect
          const rotateY = normalizedDistance * 25;

          card.style.transform = `translateX(${x}px) translateY(${bendAmount}px) scale(${Math.max(scale, 0.7)}) rotateY(${rotateY}deg)`;
          card.style.opacity = `${Math.max(opacity, 0.3)}`;
          card.style.zIndex = `${Math.floor((1 - Math.abs(normalizedDistance)) * 100)}`;
        });
      }

      requestAnimationFrame(animate);
    };

    gallery.addEventListener('wheel', handleWheel, { passive: false });
    gallery.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    animate();

    return () => {
      gallery.removeEventListener('wheel', handleWheel);
      gallery.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [loopedItems, bend, scrollSpeed, scrollEase, isModalOpen]);

  return (
    <>
      <div ref={containerRef} className="circular-gallery">
        <div ref={galleryRef} className="gallery-track">
          {loopedItems.map((item, index) => (
            <div 
              key={`${index}-${item.text}`} 
              className="gallery-card"
              onClick={(e) => handleImageClick(item, e)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.image}
                alt={item.text}
                style={{
                  borderRadius: `${borderRadius * 100}%`,
                }}
              />
              <p style={{ color: textColor }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Expansion Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-[90vw] max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 z-20"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.image}
                alt={selectedImage.text}
                className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
              />

              {/* Title */}
              <p className="mt-4 text-center text-white text-xl font-semibold">
                {selectedImage.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CircularGallery;
