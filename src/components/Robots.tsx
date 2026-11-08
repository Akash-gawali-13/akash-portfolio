import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sound } from '../lib/sound';

/**
 * Small original robot mascots that stand in the background and wave hello.
 * Hover or tap one and it waves, beeps and says something.
 */
export function Robot({
  accent = '#ff3d5a',
  eye = '#7fe3ff',
  size = 96,
  delay = 0,
  autoWave = true,
  greeting = 'Hi!',
  facing = 1,
  className = '',
}: {
  accent?: string;
  eye?: string;
  size?: number;
  delay?: number;
  autoWave?: boolean;
  greeting?: string;
  facing?: 1 | -1;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  const waving = hover;

  const wave = {
    rotate: [0, -38, 8, -38, 8, -20, 0],
    transition: { duration: 1.6, ease: 'easeInOut' as const },
  };

  return (
    <div
      className={`pointer-events-auto relative select-none ${className}`}
      style={{ width: size, height: size * 1.45 }}
      onPointerEnter={() => {
        setHover(true);
        sound.beep();
      }}
      onPointerLeave={() => setHover(false)}
      onClick={() => {
        setHover(true);
        sound.beep();
        window.setTimeout(() => setHover(false), 1800);
      }}
      aria-hidden
    >
      {/* speech bubble */}
      <AnimatePresence>
        {(hover || autoWave) && (
          <motion.span
            key={hover ? 'h' : 'a'}
            className="absolute -top-7 left-1/2 whitespace-nowrap rounded-full border border-white/15 bg-ink-2/90 px-2.5 py-1 font-sans text-[10px] font-bold tracking-wider text-bone shadow-lg backdrop-blur"
            initial={{ opacity: 0, y: 6, x: '-50%', scale: 0.8 }}
            animate={
              hover
                ? { opacity: 1, y: 0, x: '-50%', scale: 1 }
                : { opacity: [0, 1, 1, 0], y: [6, 0, 0, -4], x: '-50%', scale: [0.8, 1, 1, 0.95] }
            }
            exit={{ opacity: 0 }}
            transition={hover ? { duration: 0.2 } : { duration: 2.4, times: [0, 0.15, 0.8, 1], repeat: Infinity, repeatDelay: 5, delay: delay + 0.3 }}
          >
            {greeting}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 100 145"
        width={size}
        height={size * 1.45}
        style={{ scaleX: facing }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <defs>
          <linearGradient id={`rb-shell-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9e8ef" />
            <stop offset="1" stopColor="#9d9aab" />
          </linearGradient>
          <radialGradient id={`rb-glow-${eye}`}>
            <stop offset="0" stopColor={eye} stopOpacity="1" />
            <stop offset="1" stopColor={eye} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="50" cy="141" rx="26" ry="3.5" fill="#000" opacity="0.45" />

        {/* antenna */}
        <line x1="50" y1="8" x2="50" y2="20" stroke="#b8b6c4" strokeWidth="2.5" strokeLinecap="round" />
        <motion.circle
          cx="50"
          cy="7"
          r="4.5"
          fill={accent}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay }}
          style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
        />

        {/* head */}
        <rect x="22" y="19" width="56" height="42" rx="16" fill={`url(#rb-shell-${accent})`} />
        <rect x="16" y="33" width="7" height="14" rx="3" fill="#8c8a99" />
        <rect x="77" y="33" width="7" height="14" rx="3" fill="#8c8a99" />
        {/* visor */}
        <rect x="29" y="28" width="42" height="24" rx="11" fill="#12111a" />
        <circle cx="41" cy="40" r="9" fill={`url(#rb-glow-${eye})`} opacity="0.5" />
        <circle cx="59" cy="40" r="9" fill={`url(#rb-glow-${eye})`} opacity="0.5" />
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 4, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity, delay: delay + 1 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <rect x="37" y="36" width="8" height="8" rx="4" fill={eye} />
          <rect x="55" y="36" width="8" height="8" rx="4" fill={eye} />
        </motion.g>
        {/* smile appears while greeting */}
        <motion.path
          d="M43 47 Q50 51 57 47"
          stroke={eye}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: waving ? 1 : 0.35 }}
        />

        {/* neck + body */}
        <rect x="44" y="60" width="12" height="6" rx="2" fill="#7d7b8a" />
        <rect x="28" y="65" width="44" height="44" rx="13" fill={`url(#rb-shell-${accent})`} />
        <rect x="36" y="74" width="28" height="18" rx="6" fill="#12111a" />
        <motion.rect
          x="40"
          y="80"
          width="20"
          height="5"
          rx="2.5"
          fill={accent}
          animate={{ scaleX: [0.3, 1, 0.5, 0.9, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, delay }}
          style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
        />
        <circle cx="50" cy="100" r="3" fill={accent} opacity="0.8" />

        {/* left arm (resting) */}
        <rect x="16" y="70" width="10" height="30" rx="5" fill="#a9a7b6" />
        <circle cx="21" cy="102" r="5.5" fill="#8c8a99" />

        {/* right arm (waving) — pivots at the shoulder */}
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '79px 72px' }}
          initial={{ rotate: 0 }}
          animate={waving ? wave : autoWave ? { rotate: [0, 0, -150, -120, -150, -120, -150, 0, 0] } : { rotate: 0 }}
          transition={
            waving
              ? wave.transition
              : { duration: 3.2, times: [0, 0.08, 0.22, 0.34, 0.46, 0.58, 0.7, 0.86, 1], repeat: Infinity, repeatDelay: 2.6, delay: delay + 0.3, ease: 'easeInOut' }
          }
        >
          <rect x="74" y="70" width="10" height="30" rx="5" fill="#a9a7b6" />
          <circle cx="79" cy="102" r="5.5" fill="#8c8a99" />
        </motion.g>

        {/* legs */}
        <rect x="35" y="108" width="11" height="24" rx="5" fill="#8c8a99" />
        <rect x="54" y="108" width="11" height="24" rx="5" fill="#8c8a99" />
        <rect x="31" y="129" width="18" height="9" rx="4.5" fill="#6f6d7c" />
        <rect x="51" y="129" width="18" height="9" rx="4.5" fill="#6f6d7c" />
      </motion.svg>
    </div>
  );
}

/** A small squad of robots standing on a glowing horizon line. */
export function RobotSquad({ className = '', greetings = ['Hi!', 'Hello 👋', 'Beep boop!'] }: { className?: string; greetings?: string[] }) {
  return (
    <div className={`pointer-events-none flex items-end gap-3 sm:gap-6 ${className}`}>
      <Robot size={62} delay={0.6} greeting={greetings[1] ?? 'Hello'} accent="#4cc9ff" eye="#ff6b81" className="opacity-80" />
      <Robot size={88} delay={0} greeting={greetings[0] ?? 'Hi!'} className="opacity-95" />
      <Robot size={54} delay={1.4} greeting={greetings[2] ?? 'Beep!'} accent="#46e3a8" eye="#ffd166" facing={-1} className="opacity-70" />
    </div>
  );
}
