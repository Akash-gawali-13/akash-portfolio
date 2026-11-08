import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotionPref } from './useMedia';

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollCtx = createContext<ScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);

  useEffect(() => {
    if (reduced) return;
    // anchors: links like href="#contact" scroll smoothly (with room for the fixed navbar)
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -64 } });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback<ScrollApi['scrollTo']>((target, opts = {}) => {
    const offset = opts.offset ?? -72;
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;
    if (lenisRef.current) {
      const lenis = lenisRef.current;
      lenis.scrollTo(el, {
        offset,
        immediate: opts.immediate,
        duration: 1.4,
        // sections above can change height while we travel (the pinned Work section) — land precisely
        onComplete: () => {
          if (typeof el === 'number') return;
          const miss = el.getBoundingClientRect().top + offset;
          if (Math.abs(miss) > 4) lenis.scrollTo(el, { offset, duration: 0.6 });
        },
      });
    } else {
      const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
    }
  }, []);

  const lock = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current === 0) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = '';
    }
  }, []);

  return <ScrollCtx.Provider value={{ scrollTo, lock, unlock }}>{children}</ScrollCtx.Provider>;
}

export function useSmoothScroll() {
  const ctx = useContext(ScrollCtx);
  if (!ctx) throw new Error('useSmoothScroll must be used inside SmoothScrollProvider');
  return ctx;
}

/** Locks page scroll while `active` is true (used by overlays). */
export function useScrollLock(active: boolean) {
  const { lock, unlock } = useSmoothScroll();
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active, lock, unlock]);
}
