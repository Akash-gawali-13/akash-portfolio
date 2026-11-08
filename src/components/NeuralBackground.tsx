import { useEffect, useRef } from 'react';

/**
 * Site-wide AI backdrop: a slowly drifting neural network.
 * Nodes connect when close, signals pulse along the links, the cursor acts as an
 * extra "neuron", and faint ML symbols float upward. Pauses when the tab is hidden;
 * renders a single still frame for reduced-motion users.
 */
type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };
type Pulse = { a: number; b: number; t: number; speed: number };
type Glyph = { x: number; y: number; s: string; size: number; speed: number; alpha: number };

const SYMBOLS = ['Σ', 'λ', '∂', 'f(x)', 'σ', '∇', '01', '10', 'θ', 'ŷ', 'μ', '{ }', 'AI', 'ML', 'π', '→'];
const LINK = 150;

export default function NeuralBackground({ intensity = 1, contained = false, className = '' }: { intensity?: number; contained?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1, raf = 0, running = true;
    let nodes: Node[] = [];
    let glyphs: Glyph[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollY = window.scrollY;

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const box = contained && canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : null;
      W = box ? box.width : window.innerWidth;
      H = box ? box.height : window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.round((W * H) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.8,
        hue: Math.random() < 0.28 ? 1 : 0,
      }));
      glyphs = Array.from({ length: Math.round(count / 6) }, () => newGlyph(true));
    }

    function newGlyph(anywhere = false): Glyph {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 20,
        s: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        size: 10 + Math.random() * 8,
        speed: 0.12 + Math.random() * 0.25,
        alpha: 0.05 + Math.random() * 0.08,
      };
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const parallax = contained ? 0 : (scrollY * 0.06) % H;

      // floating symbols
      ctx.textAlign = 'center';
      for (const g of glyphs) {
        g.y -= g.speed;
        if (g.y < -20) Object.assign(g, newGlyph());
        ctx.font = `500 ${g.size}px ui-monospace, Menlo, monospace`;
        ctx.fillStyle = `rgba(255,120,140,${g.alpha * intensity})`;
        ctx.fillText(g.s, g.x, g.y);
      }

      // move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }
      const py = (n: Node) => ((n.y - parallax + H) % H);

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ay = py(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = ay - py(b);
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.22 * intensity;
            ctx.strokeStyle = a.hue || b.hue ? `rgba(90,200,255,${o})` : `rgba(229,19,43,${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, py(b));
            ctx.stroke();
            if (!reduce && pulses.length < 14 && Math.random() < 0.0009) pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.02 });
          }
        }
        // cursor acts as a neuron
        const mdx = a.x - mouse.x;
        const mdy = ay - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 190) {
          ctx.strokeStyle = `rgba(255,90,110,${(1 - md / 190) * 0.5 * intensity})`;
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // signals travelling along links
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed;
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b || p.t >= 1) {
          pulses.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = py(a) + (py(b) - py(a)) * p.t;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grd.addColorStop(0, `rgba(255,220,230,${0.9 * intensity})`);
        grd.addColorStop(1, 'rgba(255,61,90,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const y = py(n);
        const near = Math.hypot(n.x - mouse.x, y - mouse.y) < 190;
        ctx.fillStyle = n.hue ? `rgba(120,210,255,${(near ? 0.95 : 0.55) * intensity})` : `rgba(255,70,95,${(near ? 0.95 : 0.5) * intensity})`;
        ctx.beginPath();
        ctx.arc(n.x, y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = contained ? canvas.getBoundingClientRect() : null;
      mouse.x = e.clientX - (r ? r.left : 0);
      mouse.y = e.clientY - (r ? r.top : 0);
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        init();
        if (reduce) frame();
      }, 150);
    };
    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    init();
    frame();
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [intensity, contained]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${contained ? 'absolute' : 'fixed'} inset-0 ${contained ? '' : 'z-0'} ${className}`} />;
}
