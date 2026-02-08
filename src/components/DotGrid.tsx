'use client';

import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './DotGrid.css';

gsap.registerPlugin(InertiaPlugin);

/* ---------------- Types ---------------- */

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;        // ✅ FIX
  style?: React.CSSProperties;
}

/* ---------------- Utils ---------------- */

const throttle = (fn: Function, limit: number) => {
  let last = 0;
  return (...args: any[]) => {
    const now = performance.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
};

const hexToRgb = (hex: string) => {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[0], 16),
    g: parseInt(m[1], 16),
    b: parseInt(m[2], 16),
  };
};

/* ---------------- Component ---------------- */

const DotGrid = ({
  dotSize = 4,
  gap = 18,
  baseColor = '#1a1329',
  activeColor = '#6d4bff',
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 4,
  maxSpeed = 5000,
  resistance = 800,
  returnDuration = 1.5,
  className = '',
  style,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<any[]>([]);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0, speed: 0 });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cols = Math.floor(width / (dotSize + gap));
    const rows = Math.floor(height / (dotSize + gap));
    const dots = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: x * (dotSize + gap) + dotSize,
          cy: y * (dotSize + gap) + dotSize,
          xOffset: 0,
          yOffset: 0,
          active: false,
        });
      }
    }

    dotsRef.current = dots;
  }, [dotSize, gap]);

  /* ---------------- Render Loop ---------------- */

  useEffect(() => {
    let raf: number;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas || !circlePath) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach(dot => {
        const dx = dot.cx - pointer.current.x;
        const dy = dot.cy - pointer.current.y;
        const dist = Math.hypot(dx, dy);

        let color = baseColor;
        if (dist < proximity) {
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          color = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(dot.cx + dot.xOffset, dot.cy + dot.yOffset);
        ctx.fillStyle = color;
        ctx.fill(circlePath);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [circlePath, proximity, baseRgb, activeRgb, baseColor]);

  /* ---------------- Events ---------------- */

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);

    const onMove = throttle((e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
    }, 40);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('mousemove', onMove);
    };
  }, [buildGrid]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
