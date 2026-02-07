import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 500,
  containerHeight = 250,
  animationDelay = 1,
  animationStagger = 0.1,
  easeType = 'elastic.out(1, 0.5)',
  transformStyles = [],
  enableHover = true,
  onImageClick
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_: any, i: number) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: baseTransform.replace(/rotate\([^)]+\)/, 'rotate(0deg)'),
          duration: 0.4,
          ease: 'back.out(1.4)'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        gsap.to(target, {
          transform: `${baseTransform} translate(${offsetX}px)`,
          duration: 0.4,
          ease: 'back.out(1.4)'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);
    images.forEach((_: any, i: number) => {
      gsap.to(q(`.card-${i}`), {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)'
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src: string, idx: number) => (
        <div
          key={idx}
          className={`card card-${idx}`}
          style={{ transform: transformStyles[idx] ?? 'none' }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => onImageClick?.(src, idx)}
        >
          <img src={src} alt={`gallery-${idx}`} />
        </div>
      ))}
    </div>
  );
}
