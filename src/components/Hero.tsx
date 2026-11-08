import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { FIRST_INTERACTION, sound, WELCOME_LINE } from '../lib/sound';
import NeuralBackground from './NeuralBackground';
import { Magnetic } from './fx';
import './hero.css';

/**
 * Landing page. The photo fills the screen and is split into depth layers:
 * the text block sits BEHIND Akash and slides out from behind his shoulder,
 * while glowing dots and butterflies fly in from everywhere and form his name.
 */
const PHOTO_SIZES = '(max-width: 767px) 70vh, 134vh';

export default function Hero({ onPlay, withVoice = false }: { onPlay: () => void; withVoice?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const swarmRef = useRef<HTMLCanvasElement>(null);
  const { scrollTo } = useSmoothScroll();

  // scroll-out: the scene drifts, the text lifts and the screen fades to black
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  // `run` restarts the whole intro (CSS animations + swarm) — used to replay it with sound
  const [run, setRun] = useState(0);
  const [needsTap, setNeedsTap] = useState(() => sound.enabled && !sound.primed);
  useSwarm(swarmRef, nameRef, run);
  useIntroSound(run, setRun, setNeedsTap, withVoice);


  return (
    <section id="top" ref={ref} className="hx" style={{ '--focus': profile.hero.focus } as CSSProperties} aria-label={`${profile.fullName} — ${profile.role}`}>
      <motion.div className="absolute inset-0" style={{ y: sceneY }}>
        <div className="hx-scene" key={run}>
          <div className="hx-plate" style={{ backgroundImage: `url(${profile.hero.plate})` }} />
          <div className="hx-photo">
            <img className="hx-bg" src={profile.hero.bg} srcSet={profile.hero.bgSet} sizes={PHOTO_SIZES} alt="" fetchPriority="high" decoding="async" />
          </div>
          <div className="hx-grade" />
          <NeuralBackground contained className="hx-net" />

          {/* text block — z between the background and the cut-out */}
          <motion.div className="hx-copy z-[4]" style={{ y: textY, opacity: fade }}>
            <div className="hx-slot">
              <h1 ref={nameRef} className="hx-name mt-1 font-display leading-[0.84] tracking-[0.02em] text-white" style={{ fontSize: 'clamp(5.5rem, 11vw, 11.5rem)' }}>
                {profile.firstName}
              </h1>
            </div>
            {profile.seriesTag && (
              <div className="hx-slot">
                <p className="hx-d3 mt-1.5 font-sans text-sm font-bold tracking-[0.7em] text-crimson-2 sm:text-base">{profile.seriesTag}</p>
              </div>
            )}
            <div className="hx-slot">
              <p className="hx-d4 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-crimson-2 sm:text-xs sm:tracking-[0.3em]">{profile.tagline.join(' • ')}</p>
            </div>
            {/* the one line a client reads first: what I do for them */}
            <div className="hx-slot">
              <p className="hx-d5 mt-3 max-w-[34rem] text-[1.35rem] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[1.7rem]">{profile.offer}</p>
            </div>
            <div className="hx-slot">
              <p className="hx-d6 mt-3 max-w-[33rem] text-[13px] leading-relaxed text-bone/75 sm:text-[14.5px]">{profile.intro}</p>
            </div>
            <div className="hx-slot">
              <div className="hx-d7 mt-6 flex flex-wrap items-center gap-3 pb-1">
                <Magnetic>
                  <button
                    type="button"
                    data-cursor="play"
                    onClick={() => scrollTo('#contact', { offset: -64 })}
                    className="flex min-h-11 items-center gap-2.5 rounded-md bg-crimson px-6 text-[14px] font-bold text-white shadow-[0_0_40px_rgba(229,19,43,0.45)] transition hover:bg-crimson-2 sm:min-h-12"
                  >
                    Hire Me <span aria-hidden>→</span>
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollTo('#originals', { offset: -64 })}
                    className="flex min-h-11 items-center gap-2.5 rounded-md bg-bone px-6 text-[14px] font-bold text-ink transition hover:bg-white sm:min-h-12"
                  >
                    See My Work
                  </button>
                </Magnetic>
                <button
                  type="button"
                  onClick={onPlay}
                  aria-label="Play intro"
                  title="Play intro"
                  className="glass flex min-h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-bone transition hover:bg-white/15 sm:min-h-12"
                >
                  <span className="text-base">▶</span> Intro
                </button>
              </div>
            </div>
          </motion.div>

          <div className="hx-photo z-[6]">
            <img className="hx-fg" src={profile.hero.fg} srcSet={profile.hero.fgSet} sizes={PHOTO_SIZES} alt={profile.hero.alt} fetchPriority="high" decoding="async" />
          </div>
          <div className="hx-floor z-[8]" />
        </div>
      </motion.div>

      <canvas key={`swarm-${run}`} ref={swarmRef} aria-hidden className="hx-swarm z-[30] h-full w-full" />
      <div key={`ui-${run}`} className="contents">
        {/* chips + scroll hint (desktop) */}
        {profile.openToFreelance && (
          <button
            type="button"
            onClick={() => scrollTo('#services')}
            className="hx-chip hx-wide-only glass absolute bottom-[8svh] left-[3.2vw] z-[21] hidden rounded-[10px] px-3.5 py-2.5 text-left transition hover:border-white/30 md:block"
            style={{ animationDelay: '3.1s' }}
          >
            <p className="flex items-center gap-2 text-xs font-semibold text-bone">
              <span className="h-[7px] w-[7px] rounded-full bg-[#46e3a8] shadow-[0_0_0_3px_rgba(70,227,168,0.2)]" /> Open to freelance
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-mist">AI tools · dashboards · websites</p>
          </button>
        )}
        <div className="hx-late hx-wide-only absolute bottom-[5svh] left-[60.5vw] z-[21] hidden items-center gap-2.5 text-[10px] tracking-[0.3em] text-smoke md:flex">
          <span className="h-px w-8 bg-smoke" /> SCROLL · CONTINUE EXPLORING
        </div>
      </div>

      {/* browsers only allow sound after a click — invite one, then replay the intro with sound */}
      <AnimatePresence>
        {needsTap && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 3.6, duration: 0.6 } }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
            className="glass absolute bottom-[4svh] left-1/2 z-[45] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-bone md:bottom-[5svh] md:left-auto md:right-[4vw] md:translate-x-0"
            aria-label="Play the intro with sound"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-2 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-2" />
            </span>
            🔊 TAP FOR SOUND
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[40] bg-ink" style={{ opacity: blackout }} />
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Swarm: dots + butterflies fly in from all over the screen and form the name, then dissolve.     */

/* ---------------------------------------------------------------------------------------------- */
/* Sound track for the intro — every cue is timed to the CSS/swarm timeline above.                 */

const CUES: [number, () => void][] = [
  [700, () => sound.stream(1.4)],   // dots + butterflies stream in from everywhere
  [2050, () => sound.lock()],       // dots lock into AKASH
  [2350, () => sound.line(0)],      // series tag
  [2620, () => sound.line(1)],      // roles
  [2740, () => sound.line(2)],      // intro
  [2880, () => sound.line(3)],      // buttons
  [3100, () => sound.chip()],       // "open to freelance"
];

function useIntroSound(run: number, setRun: (fn: (n: number) => number) => void, setNeedsTap: (b: boolean) => void, withVoice: boolean) {
  // the entry screen's click already unlocked audio, so the first run can speak the welcome line
  const voice = useRef(withVoice);

  // play the cues for this run of the intro (only if audio is already allowed)
  useEffect(() => {
    if (!sound.enabled || !sound.primed) return;
    const timers = CUES.map(([at, fn]) => window.setTimeout(fn, at));
    if (voice.current) {
      voice.current = false;
      timers.push(window.setTimeout(() => sound.speak(WELCOME_LINE), 2150));
    }
    return () => timers.forEach(clearTimeout);
  }, [run]);

  // first click anywhere: if the visitor is still on the landing page, replay the intro with sound
  const onFirst = useCallback(
    (e: Event) => {
      setNeedsTap(false);
      const { greeted, target } = (e as CustomEvent<{ greeted: boolean; target: EventTarget | null }>).detail;
      if (!sound.enabled) return;
      const onButton = target instanceof Element && !!target.closest('a, button:not([aria-label="Play the intro with sound"])');
      if (window.scrollY > window.innerHeight * 0.4 || onButton) return; // let the default greeting play
      e.preventDefault();
      voice.current = !greeted;
      setRun((n) => n + 1);
    },
    [setRun, setNeedsTap],
  );

  useEffect(() => {
    window.addEventListener(FIRST_INTERACTION, onFirst);
    return () => window.removeEventListener(FIRST_INTERACTION, onFirst);
  }, [onFirst]);
}

function useSwarm(canvasRef: React.RefObject<HTMLCanvasElement | null>, nameRef: React.RefObject<HTMLHeadingElement | null>, run: number) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let cancelled = false;
    const t0 = performance.now();

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      const c = canvasRef.current, nameEl = nameRef.current;
      if (cancelled || !c || !nameEl) return;
      const x = c.getContext('2d');
      if (!x) return;
      const host = (c.parentElement ?? c).getBoundingClientRect();
      const W = host.width, H = host.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = `${W}px`; c.style.height = `${H}px`;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);

      // sample the name's letters exactly where they sit (relative to the hero)
      // layout position (ignores the scene's zoom-in transform, which is still running at this point)
      let ox = 0, oy = 0;
      for (let el: HTMLElement | null = nameEl; el && el !== c.parentElement; el = el.offsetParent as HTMLElement | null) {
        ox += el.offsetLeft;
        oy += el.offsetTop;
      }
      const r = { left: ox, top: oy, width: nameEl.offsetWidth, height: nameEl.offsetHeight, right: ox + nameEl.offsetWidth, bottom: oy + nameEl.offsetHeight };
      const cs = getComputedStyle(nameEl);
      const fs = parseFloat(cs.fontSize);
      const ls = parseFloat(cs.letterSpacing) || 0;
      const off = document.createElement('canvas');
      off.width = Math.ceil(W); off.height = Math.ceil(H);
      const o = off.getContext('2d', { willReadFrequently: true })!;
      o.fillStyle = '#fff';
      o.font = `${cs.fontSize} ${cs.fontFamily}`;
      const m = o.measureText('A');
      const base = r.top + (r.height + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent)) / 2;
      let cx = r.left;
      for (const ch of nameEl.textContent ?? '') { o.fillText(ch, cx, base); cx += o.measureText(ch).width + ls; }
      const tw = cx - r.left;
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(3, Math.round(fs / 34));
      const targets: [number, number][] = [];
      for (let yy = Math.max(0, Math.floor(r.top) - 10); yy < Math.min(off.height, r.bottom + 10); yy += step)
        for (let xx = Math.max(0, Math.floor(r.left) - 10); xx < Math.min(off.width, r.left + tw + 10); xx += step)
          if (data[(yy * off.width + xx) * 4 + 3] > 128) targets.push([xx, yy]);

      let seed = 42;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const pal = ['255,255,255', '255,61,90', '255,140,160', '120,210,255'];
      const dots = targets.map(([tx, ty]) => {
        const edge = rnd();
        const sx = edge < 0.25 ? -40 : edge < 0.5 ? W + 40 : rnd() * W;
        const sy = edge < 0.5 ? rnd() * H : rnd() < 0.5 ? -40 : H + 40;
        const anywhere = rnd() < 0.55;
        return {
          sx: anywhere ? rnd() * W : sx, sy: anywhere ? rnd() * H : sy, tx, ty,
          delay: rnd() * 650, dur: 1050 + rnd() * 450, curve: (rnd() - 0.5) * 260,
          col: rnd() < 0.78 ? pal[0] : pal[1 + Math.floor(rnd() * 3)], s: 1.2 + rnd() * 1.4,
        };
      });
      const flies = Array.from({ length: 14 }, (_, i) => {
        const tx = r.left + rnd() * tw, ty = r.top + rnd() * r.height;
        return {
          sx: rnd() * W, sy: rnd() < 0.5 ? H + 30 : rnd() * H, tx, ty, delay: rnd() * 500, dur: 1500 + rnd() * 400,
          ex: tx + (rnd() - 0.3) * 420, ey: ty - 120 - rnd() * 260, ph: rnd() * 6.28, size: 5 + rnd() * 4,
          col: i % 3 === 0 ? '120,210,255' : '255,61,90',
        };
      });
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const butterfly = (px: number, py: number, ang: number, flap: number, size: number, col: string, a: number) => {
        x.save(); x.translate(px, py); x.rotate(ang); x.globalAlpha = a;
        const w = Math.max(0.15, Math.abs(Math.sin(flap)));
        x.fillStyle = `rgba(${col},.9)`; x.shadowColor = `rgba(${col},.9)`; x.shadowBlur = 10;
        for (const side of [-1, 1]) {
          x.beginPath(); x.ellipse(side * size * 0.55 * w, -size * 0.25, size * 0.6 * w, size * 0.8, side * 0.5, 0, 7); x.fill();
          x.beginPath(); x.ellipse(side * size * 0.45 * w, size * 0.45, size * 0.4 * w, size * 0.5, side * -0.4, 0, 7); x.fill();
        }
        x.fillStyle = 'rgba(255,255,255,.95)'; x.beginPath(); x.ellipse(0, 0, size * 0.12, size * 0.7, 0, 0, 7); x.fill();
        x.restore();
      };

      const START = 700, FORM = START + 1450;
      const render = (t: number) => {
        x.clearRect(0, 0, W, H);
        const tt = t - START;
        if (tt < 0) return true;
        const fadeOut = Math.max(0, Math.min(1, (t - FORM - 250) / 700));
        for (const d of dots) {
          const k = Math.max(0, Math.min(1, (tt - d.delay) / d.dur)), e = io(k);
          const px = d.sx + (d.tx - d.sx) * e + Math.sin(k * Math.PI) * d.curve;
          const py = d.sy + (d.ty - d.sy) * e + Math.cos(k * Math.PI) * d.curve * 0.2 * (1 - e);
          const a = (0.25 + 0.75 * Math.min(1, k * 2)) * (1 - fadeOut);
          if (a <= 0.01) continue;
          x.fillStyle = `rgba(${d.col},${a})`;
          x.fillRect(px, py, d.s, d.s);
        }
        let alive = fadeOut < 1;
        for (const f of flies) {
          const k = (tt - f.delay) / f.dur;
          if (k < 0) continue;
          let px: number, py: number, a = 1;
          if (k <= 1) {
            const e = ease(k);
            px = f.sx + (f.tx - f.sx) * e + Math.sin(k * 9 + f.ph) * 30 * (1 - e);
            py = f.sy + (f.ty - f.sy) * e;
            alive = true;
          } else {
            const k2 = Math.min(1, ((k - 1) * f.dur) / 2600), e2 = ease(k2);
            px = f.tx + (f.ex - f.tx) * e2 + Math.sin(k2 * 10 + f.ph) * 22;
            py = f.ty + (f.ey - f.ty) * e2;
            a = 1 - k2;
            if (k2 < 1) alive = true;
          }
          butterfly(px, py, Math.sin(t * 0.004 + f.ph) * 0.35, t * 0.03 + f.ph, f.size, f.col, Math.max(0, a));
        }
        return alive;
      };
      const loop = (now: number) => {
        if (cancelled) return;
        if (render(now - t0)) raf = requestAnimationFrame(loop);
        else x.clearRect(0, 0, W, H);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, nameRef, run]);
}
