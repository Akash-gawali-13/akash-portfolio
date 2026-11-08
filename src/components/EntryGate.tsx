import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { FIRST_INTERACTION, sound } from '../lib/sound';
import NeuralBackground from './NeuralBackground';
import { EASE } from './fx';

/**
 * One-click entry screen.
 * Browsers block all audio until the visitor clicks, so this screen asks for that one click.
 * The click unlocks sound, and the landing intro then plays with its full sound track and voice.
 */
export default function EntryGate({ onEnter }: { onEnter: (withSound: boolean) => void }) {
  const { lock, unlock } = useSmoothScroll();

  // no scrolling behind the gate
  useEffect(() => {
    lock();
    return () => unlock();
  }, [lock, unlock]);

  // this screen handles the welcome itself, so the generic first-click greeting must not play
  useEffect(() => {
    const claim = (e: Event) => e.preventDefault();
    window.addEventListener(FIRST_INTERACTION, claim);
    return () => window.removeEventListener(FIRST_INTERACTION, claim);
  }, []);

  const enter = (withSound: boolean) => {
    sound.unlock();
    sound.setEnabled(withSound);
    onEnter(withSound);
  };

  // Enter key = enter with sound
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enter(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: EASE }}
      role="dialog"
      aria-label={`Enter ${profile.fullName}'s portfolio`}
    >
      {/* dimmed landing photo + AI network behind */}
      <div
        aria-hidden
        className="absolute inset-[-6%] bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${profile.hero.bg})`, filter: 'blur(6px) brightness(0.45) saturate(0.85)', backgroundPosition: '40% 40%' }}
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(229,19,43,0.18),transparent_70%),linear-gradient(to_bottom,rgba(7,7,10,0.6),rgba(7,7,10,0.85))]" />
      <NeuralBackground contained intensity={0.9} />

      <div className="relative flex flex-col items-center">
        <motion.p
          className="text-[11px] font-bold tracking-[0.4em] text-crimson-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
        >
          PORTFOLIO
        </motion.p>
        <motion.h1
          className="mt-3 font-display text-[clamp(3.6rem,10vw,8rem)] leading-[0.85] tracking-[0.03em] text-white"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 1, ease: EASE }}
        >
          {profile.fullName}
        </motion.h1>
        <motion.p
          className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-bone/80 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {profile.tagline.join(' • ')}
        </motion.p>

        {/* the one click that unlocks sound */}
        <motion.button
          type="button"
          onClick={() => enter(true)}
          data-cursor="play"
          aria-label="Enter with sound"
          className="group relative mt-12 grid h-28 w-28 place-items-center rounded-full bg-crimson text-white shadow-[0_0_80px_rgba(229,19,43,0.6)] transition hover:bg-crimson-2 sm:h-32 sm:w-32"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute inset-0 rounded-full border border-crimson-2/60"
              animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1.4 + i * 0.8, ease: 'easeOut' }}
            />
          ))}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="translate-x-[3px]">
            <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
          </svg>
        </motion.button>

        <motion.p
          className="mt-6 text-sm font-bold tracking-[0.35em] text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          ENTER
        </motion.p>
        <motion.p
          className="mt-2 text-xs text-mist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          🔊 Best experienced with sound on
        </motion.p>

        <motion.button
          type="button"
          onClick={() => enter(false)}
          className="mt-8 text-[11px] font-semibold tracking-[0.22em] text-smoke underline-offset-4 transition hover:text-bone hover:underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          ENTER WITHOUT SOUND
        </motion.button>
      </div>
    </motion.div>
  );
}
