import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'shield' && (
          <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="30" x2={i % 2 ? 72 : 86} y1={56 + i * 14} y2={56 + i * 14} strokeWidth="3" strokeLinecap="round" strokeOpacity={0.35 + i * 0.1} />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={a} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" />
              <path d="M34 16 h46" stroke={a} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}
        {project.motif === 'tenants' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={196 + c * 44}
                  y={50 + r * 44}
                  width="34"
                  height="34"
                  rx="7"
                  strokeWidth="1.6"
                  strokeOpacity={0.25 + ((r + c) % 3) * 0.25}
                  fill={(r + c) % 4 === 0 ? a : 'none'}
                  fillOpacity="0.25"
                />
              )),
            )}
            <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M188 214 h190" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M188 228 h190" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}
        {project.motif === 'bars' && (
          <g>
            {[38, 52, 45, 63, 58, 74, 68, 86, 80, 96].map((h, i) => (
              <rect
                key={i}
                x={196 + i * 18}
                y={210 - h * 1.5}
                width="12"
                height={h * 1.5}
                rx="3"
                fill={a}
                fillOpacity={i === 9 ? 0.95 : 0.25 + i * 0.05}
              />
            ))}
            <path d="M196 150 C240 140 262 110 300 104 S350 70 384 56" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="384" cy="56" r="6" fill={a} />
            <path d="M190 214 h200" stroke={a} strokeOpacity="0.5" strokeWidth="1.5" />
          </g>
        )}
        {project.motif === 'iris' && (
          <g transform="translate(290 128)" fill="none" stroke={a}>
            <path d="M-110 0 C-60 -62 60 -62 110 0 C60 62 -60 62 -110 0 Z" strokeWidth="2" strokeOpacity="0.85" />
            <circle r="44" strokeWidth="2" strokeOpacity="0.8" />
            <circle r="30" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="4 5" />
            <circle r="16" fill={a} fillOpacity="0.75" stroke="none" />
            {Array.from({ length: 16 }).map((_, i) => {
              const t = (i / 16) * Math.PI * 2;
              return <line key={i} x1={Math.cos(t) * 20} y1={Math.sin(t) * 20} x2={Math.cos(t) * 42} y2={Math.sin(t) * 42} strokeOpacity="0.35" />;
            })}
          </g>
        )}
        {project.motif === 'hand' && (
          <g transform="translate(240 40)" fill="none" stroke={a} strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M40 170 C18 150 10 120 14 96 L22 70 C25 60 38 62 37 73 L34 98 M37 73 L40 22 C41 10 56 10 56 22 L56 92 M56 22 L58 12 C60 0 76 0 75 12 L74 92 M75 18 C77 6 93 6 92 18 L90 96 M92 30 C94 20 108 22 107 32 L102 112 C100 146 84 168 60 172"
              strokeWidth="2.4"
              strokeOpacity="0.85"
            />
            {[[56, 22], [75, 12], [92, 18], [107, 32], [37, 73]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill={a} stroke="none" />
            ))}
            <rect x="-14" y="-10" width="150" height="196" rx="10" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="8 6" />
          </g>
        )}
        {project.motif === 'browser' && (
          <g fill="none" stroke={a}>
            <rect x="196" y="46" width="180" height="130" rx="10" strokeWidth="2" strokeOpacity="0.85" />
            <path d="M196 68 h180" strokeWidth="1.5" strokeOpacity="0.6" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={210 + i * 11} cy="57" r="3" fill={a} fillOpacity={0.9 - i * 0.25} stroke="none" />
            ))}
            <rect x="210" y="82" width="90" height="12" rx="3" fill={a} fillOpacity="0.55" stroke="none" />
            <rect x="210" y="102" width="130" height="6" rx="3" fill={a} fillOpacity="0.25" stroke="none" />
            <rect x="210" y="114" width="110" height="6" rx="3" fill={a} fillOpacity="0.25" stroke="none" />
            <rect x="210" y="134" width="46" height="28" rx="5" strokeOpacity="0.6" />
            <rect x="264" y="134" width="46" height="28" rx="5" strokeOpacity="0.6" />
            <rect x="318" y="134" width="46" height="28" rx="5" strokeOpacity="0.6" />
            <rect x="330" y="96" width="62" height="96" rx="9" strokeWidth="2" fill="#07070a" fillOpacity="0.6" />
            <rect x="338" y="110" width="46" height="8" rx="2" fill={a} fillOpacity="0.5" stroke="none" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M18 6c-1.8-1.8-4-2.6-6.5-2.6C7.6 3.4 5 5.6 5 9c0 7.6 14 4.6 14 11.6 0 3-2.8 5-6.4 5-3 0-5.4-1.2-7.2-3" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}
