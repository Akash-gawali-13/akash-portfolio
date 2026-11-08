import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../lib/sound';

/** Mute / unmute the robotic UI sounds and voice. Shows a tiny live equaliser while on. */
export default function SoundToggle() {
  const [on, setOn] = useState(sound.enabled);
  useEffect(() => {
    const off = sound.subscribe(setOn);
    return () => {
      off();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        sound.unlock();
        sound.setEnabled(!on);
        if (!on) window.setTimeout(() => sound.beep(), 30);
      }}
      aria-pressed={on}
      aria-label={on ? 'Mute sound' : 'Turn sound on'}
      title={on ? 'Mute sound' : 'Turn sound on'}
      className="flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-bone transition hover:border-crimson-2 hover:text-crimson-2"
    >
      <SpeakerIcon on={on} />
      <span className="flex h-3 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block w-[2px] rounded-full bg-current"
            animate={on ? { height: ['30%', '100%', '45%', '80%', '30%'] } : { height: '20%' }}
            transition={on ? { duration: 1 + i * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
          />
        ))}
      </span>
    </button>
  );
}

export function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      ) : (
        <path d="m16 9 5 6M21 9l-5 6" />
      )}
    </svg>
  );
}
