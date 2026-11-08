import { useEffect, useRef, useState } from 'react';
import { sound } from '../lib/sound';

/**
 * The portrait assembles itself from thousands of glowing data points.
 * Once formed, the real photo fades in underneath; the particles stay as a faint
 * digital layer that scatters away from the cursor and is swept by a scan line.
 */
type P = { sx: number; sy: number; tx: number; ty: number; r: number; g: number; b: number; s: number; delay: number; ox: number; oy: number; vx: number; vy: number };

export default function ParticlePortrait({
  src,
  srcSet,
  sizes,
  alt,
  className = '',
  imgClassName = '',
  start = true,
  playSound = true,
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  start?: boolean;
  playSound?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || !start) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = cvs.current;
    const el = img.current;
    if (reduce || !canvas || !el) {
      setFormed(true);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setFormed(true);
      return;
    }

    const W = el.clientWidth;
    const H = el.clientHeight;
    if (!W || !H) {
      setFormed(true);
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // sample the photo
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const octx = off.getContext('2d', { willReadFrequently: true })!;
    let data: Uint8ClampedArray;
    try {
      octx.drawImage(el, 0, 0, W, H);
      data = octx.getImageData(0, 0, W, H).data;
    } catch {
      setFormed(true);
      return;
    }
    const step = Math.max(3, Math.min(7, Math.round(W / 120)));
    const ps: P[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4;
        if (data[i + 3] < 150) continue;
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.max(W, H) * (0.6 + Math.random() * 0.9);
        const fromBelow = Math.random() < 0.35;
        ps.push({
          sx: fromBelow ? x + (Math.random() - 0.5) * W * 0.4 : W / 2 + Math.cos(ang) * dist,
          sy: fromBelow ? H + 40 + Math.random() * H * 0.6 : H / 2 + Math.sin(ang) * dist,
          tx: x,
          ty: y,
          r: Math.min(255, data[i] * 1.15 + 20),
          g: Math.min(255, data[i + 1] * 1.05),
          b: Math.min(255, data[i + 2] * 1.05),
          s: step * (0.55 + Math.random() * 0.35),
          delay: (1 - y / H) * 500 + Math.random() * 700,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
        });
      }
    }

    const DUR = 1700;
    const total = DUR + 1200;
    const mouse = { x: -9999, y: -9999, active: false };
    let t0 = 0, raf = 0, formedAt = 0, idle = 0, done = false;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    if (playSound) sound.scan();

    const draw = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;
      ctx.clearRect(0, 0, W, H);
      const assembling = t < total;
      if (!assembling && !formedAt) {
        formedAt = now;
        setFormed(true);
      }
      // after forming, the photo shows; particles fade to a faint digital layer
      const base = formedAt ? Math.max(0.16, 1 - (now - formedAt) / 900) : 1;
      // scan line sweeps every 7s once formed
      const scanY = formedAt ? (((now - formedAt) % 7000) / 1800) * H : -999;

      let moving = false;
      for (const p of ps) {
        let x: number, y: number, a: number;
        if (assembling) {
          const k = Math.min(1, Math.max(0, (t - p.delay) / DUR));
          const e = ease(k);
          const swirl = (1 - e) * 40;
          x = p.sx + (p.tx - p.sx) * e + Math.sin(p.ty * 0.05 + t * 0.004) * swirl;
          y = p.sy + (p.ty - p.sy) * e;
          a = 0.25 + 0.75 * e;
        } else {
          // spring back + repel from cursor
          if (mouse.active) {
            const dx = p.tx + p.ox - mouse.x;
            const dy = p.ty + p.oy - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 4900) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / 70) * 2.4;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }
          p.vx += -p.ox * 0.06;
          p.vy += -p.oy * 0.06;
          p.vx *= 0.84;
          p.vy *= 0.84;
          p.ox += p.vx;
          p.oy += p.vy;
          if (Math.abs(p.ox) > 0.3 || Math.abs(p.oy) > 0.3) moving = true;
          x = p.tx + p.ox;
          y = p.ty + p.oy;
          const disp = Math.min(1, Math.hypot(p.ox, p.oy) / 18);
          const scan = Math.max(0, 1 - Math.abs(y - scanY) / 26);
          a = Math.min(1, base + disp * 0.9 + scan * 0.6);
          if (scan > 0.6) {
            ctx.fillStyle = `rgba(255,140,160,${a})`;
            ctx.fillRect(x, y, p.s, p.s);
            continue;
          }
        }
        ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${a})`;
        ctx.fillRect(x, y, p.s, p.s);
      }

      // keep animating while assembling, scanning, or disturbed; otherwise idle gently
      if (assembling || moving || mouse.active) idle = 0;
      else idle++;
      if (!done) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const sx = W / r.width, sy = H / r.height;
      const x = (e.clientX - r.left) * sx;
      const y = (e.clientY - r.top) * sy;
      mouse.active = x > -40 && y > -40 && x < W + 40 && y < H + 40;
      mouse.x = x;
      mouse.y = y;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    void idle;
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [loaded, start, playSound]);

  return (
    <div ref={wrap} className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`}>
      <img
        ref={img}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`block h-full w-auto max-w-none transition-opacity duration-1000 ${imgClassName}`}
        style={{ opacity: formed ? 1 : 0 }}
      />
      <canvas ref={cvs} aria-hidden className="pointer-events-none absolute left-0 top-0" />
    </div>
  );
}
