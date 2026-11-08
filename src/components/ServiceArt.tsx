import { motion } from 'framer-motion';

/**
 * Illustrations for the four "Hire Me" service cards.
 * Pure SVG (no image files), drawn in each card's accent colour, with a small loop animation.
 */
type Props = { id: string; accent: string };

const loop = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: 'easeInOut' as const });

export default function ServiceArt({ id, accent }: Props) {
  const A = accent;
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`sa-panel-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <filter id={`sa-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {/* soft glow behind the art */}
      <ellipse cx="160" cy="100" rx="120" ry="60" fill={A} opacity="0.18" filter={`url(#sa-glow-${id})`} />
      {id === 'ai-tools' && <AiTools A={A} id={id} />}
      {id === 'dashboards' && <Dashboards A={A} id={id} />}
      {id === 'websites' && <Websites A={A} id={id} />}
      {id === 'training' && <Training A={A} id={id} />}
    </svg>
  );
}

const Panel = ({ x, y, w, h, id, r = 12 }: { x: number; y: number; w: number; h: number; id: string; r?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#sa-panel-${id})`} stroke="#ffffff" strokeOpacity="0.18" />
);

/* 1 — AI tools: a chat assistant answering from a document */
function AiTools({ A, id }: { A: string; id: string }) {
  return (
    <g>
      {/* document stack */}
      <g transform="translate(22 46)">
        <rect x="8" y="-6" width="74" height="96" rx="8" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.12" />
        <rect x="0" y="0" width="74" height="96" rx="8" fill="#fff" fillOpacity="0.09" stroke="#fff" strokeOpacity="0.2" />
        {[16, 28, 40, 52, 64].map((y, i) => (
          <rect key={y} x="12" y={y} width={i % 2 ? 38 : 50} height="5" rx="2.5" fill="#fff" fillOpacity="0.35" />
        ))}
        <motion.rect x="8" width="58" height="12" rx="3" fill={A} fillOpacity="0.35" animate={{ y: [12, 60, 12] }} transition={loop(3.2)} />
        <text x="12" y="88" fontSize="8" fontWeight="700" fill={A} fontFamily="Inter, sans-serif">PDF</text>
      </g>
      {/* flow line from doc to chat */}
      <motion.path d="M100 96 C 120 96, 120 70, 140 70" stroke={A} strokeWidth="2" strokeDasharray="4 5" animate={{ strokeDashoffset: [18, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
      {/* chat window */}
      <Panel x={140} y={22} w={160} h={146} id={id} />
      <circle cx="158" cy="40" r="8" fill={A} />
      <rect x="154" y="37" width="8" height="5" rx="2" fill="#0b0b10" />
      <text x="172" y="43" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">AI Assistant</text>
      <circle cx="286" cy="40" r="3" fill="#46e3a8" />
      {/* messages */}
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: [0, 1, 1, 1, 0], y: [6, 0, 0, 0, 0] }} transition={loop(6)}>
        <rect x="206" y="58" width="82" height="20" rx="10" fill="#fff" fillOpacity="0.85" />
        <rect x="216" y="66" width="56" height="4" rx="2" fill="#0b0b10" fillOpacity="0.6" />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={loop(6)}>
        <rect x="152" y="86" width="112" height="34" rx="10" fill={A} fillOpacity="0.85" />
        <rect x="162" y="95" width="88" height="4" rx="2" fill="#fff" fillOpacity="0.9" />
        <rect x="162" y="105" width="64" height="4" rx="2" fill="#fff" fillOpacity="0.7" />
      </motion.g>
      {/* typing dots */}
      <g transform="translate(160 136)">
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={i * 10} cy="0" r="3.2" fill="#fff" animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={loop(1, i * 0.15)} />
        ))}
      </g>
      <rect x="152" y="148" width="136" height="12" rx="6" fill="#fff" fillOpacity="0.08" stroke="#fff" strokeOpacity="0.15" />
    </g>
  );
}

/* 2 — Dashboards: KPI tiles, bar chart, trend line, donut */
function Dashboards({ A, id }: { A: string; id: string }) {
  const bars = [34, 52, 44, 66, 58, 80, 72];
  return (
    <g>
      <Panel x={18} y={18} w={284} h={154} id={id} r={14} />
      {/* KPI tiles */}
      {[
        { x: 32, v: '₹4.2L', l: 'Revenue' },
        { x: 112, v: '+18%', l: 'Growth' },
        { x: 192, v: '1,284', l: 'Orders' },
      ].map((k, i) => (
        <g key={k.l}>
          <rect x={k.x} y="30" width="72" height="34" rx="8" fill="#fff" fillOpacity="0.07" />
          <text x={k.x + 9} y="47" fontSize="12" fontWeight="800" fill={i === 1 ? A : '#fff'} fontFamily="Inter, sans-serif">{k.v}</text>
          <text x={k.x + 9} y="58" fontSize="7" fill="#fff" fillOpacity="0.6" fontFamily="Inter, sans-serif">{k.l}</text>
        </g>
      ))}
      {/* bars */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={34 + i * 20}
          y={158 - h}
          width="12"
          height={h}
          rx="3"
          fill={A}
          fillOpacity={0.45 + i * 0.07}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          animate={{ scaleY: [0.4, 1, 0.8, 1] }}
          transition={loop(3.6, i * 0.08)}
        />
      ))}
      <line x1="30" y1="158" x2="172" y2="158" stroke="#fff" strokeOpacity="0.2" />
      {/* trend line */}
      <motion.path
        d="M34 128 L54 116 L74 122 L94 98 L114 104 L134 82 L154 88"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: [0, 1, 1] }}
        transition={loop(3.6)}
      />
      {/* donut */}
      <g transform="translate(232 118)">
        <circle r="30" stroke="#fff" strokeOpacity="0.12" strokeWidth="10" />
        <motion.circle
          r="30"
          stroke={A}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 30}
          transform="rotate(-90)"
          animate={{ strokeDashoffset: [2 * Math.PI * 30, 2 * Math.PI * 30 * 0.32, 2 * Math.PI * 30 * 0.32] }}
          transition={loop(3.6)}
        />
        <text y="4" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">68%</text>
      </g>
    </g>
  );
}

/* 3 — Websites: desktop browser + phone + admin panel toggle */
function Websites({ A, id }: { A: string; id: string }) {
  return (
    <g>
      {/* browser */}
      <Panel x={16} y={20} w={220} h={150} id={id} r={12} />
      <path d="M16 40 h220" stroke="#fff" strokeOpacity="0.18" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={30 + i * 11} cy="30" r="3.2" fill={['#ff5f57', '#febc2e', '#28c840'][i]} />
      ))}
      <rect x="70" y="25" width="120" height="10" rx="5" fill="#fff" fillOpacity="0.1" />
      {/* hero block */}
      <rect x="30" y="52" width="192" height="58" rx="8" fill={A} fillOpacity="0.28" />
      <rect x="42" y="64" width="90" height="10" rx="3" fill="#fff" fillOpacity="0.9" />
      <rect x="42" y="80" width="62" height="5" rx="2.5" fill="#fff" fillOpacity="0.55" />
      <motion.rect x="42" y="92" width="44" height="12" rx="6" fill={A} animate={{ opacity: [0.7, 1, 0.7] }} transition={loop(1.8)} />
      {/* cards */}
      {[30, 96, 162].map((x) => (
        <g key={x}>
          <rect x={x} y="120" width="60" height="38" rx="6" fill="#fff" fillOpacity="0.08" stroke="#fff" strokeOpacity="0.12" />
          <rect x={x + 8} y="128" width="22" height="6" rx="3" fill={A} fillOpacity="0.7" />
          <rect x={x + 8} y="140" width="40" height="4" rx="2" fill="#fff" fillOpacity="0.35" />
        </g>
      ))}
      {/* cursor */}
      <g transform="translate(150 70)">
        <motion.path d="M0 0 L0 14 L4 10 L7 17 L10 15.5 L7 9 L12 9 Z" fill="#fff" stroke="#0b0b10" strokeWidth="1"
          animate={{ x: [0, -84, -84, 0], y: [0, 26, 26, 0] }} transition={loop(4)} />
      </g>
      {/* phone */}
      <rect x="246" y="46" width="62" height="122" rx="12" fill="#0b0b10" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="252" y="58" width="50" height="34" rx="5" fill={A} fillOpacity="0.4" />
      <rect x="252" y="98" width="50" height="5" rx="2.5" fill="#fff" fillOpacity="0.6" />
      <rect x="252" y="108" width="34" height="5" rx="2.5" fill="#fff" fillOpacity="0.35" />
      {/* admin toggle */}
      <rect x="252" y="128" width="50" height="30" rx="6" fill="#fff" fillOpacity="0.07" />
      <text x="257" y="140" fontSize="6.5" fontWeight="700" fill="#fff" fillOpacity="0.75" fontFamily="Inter, sans-serif">ADMIN</text>
      <rect x="257" y="145" width="22" height="9" rx="4.5" fill={A} fillOpacity="0.5" />
      <motion.circle cx={261.5} cy="149.5" r="3.5" fill="#fff" animate={{ x: [0, 13, 13, 0] }} transition={loop(3)} />
    </g>
  );
}

/* 4 — Training: presentation screen with SQL, audience and a cap */
function Training({ A, id }: { A: string; id: string }) {
  const lines = [
    [{ t: 'SELECT', c: A }, { t: ' city, AVG(sales)', c: '#fff' }],
    [{ t: 'FROM', c: A }, { t: ' orders', c: '#fff' }],
    [{ t: 'GROUP BY', c: A }, { t: ' city;', c: '#fff' }],
  ];
  return (
    <g>
      {/* screen */}
      <Panel x={46} y={14} w={228} h={104} id={id} r={10} />
      <rect x="150" y="118" width="20" height="10" fill="#fff" fillOpacity="0.2" />
      {lines.map((ln, i) => (
        <motion.text
          key={i}
          x="64"
          y={44 + i * 20}
          fontSize="12"
          fontWeight="700"
          fontFamily="ui-monospace, Menlo, monospace"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.15 + i * 0.1, 0.85, 1], repeat: Infinity }}
        >
          {ln.map((p, k) => (
            <tspan key={k} fill={p.c}>{p.t}</tspan>
          ))}
        </motion.text>
      ))}
      <motion.rect x="64" y="96" width="7" height="12" fill={A} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
      {/* graduation cap */}
      <motion.g transform="translate(248 18)" animate={{ y: [18, 12, 18], rotate: [-6, 4, -6] }} transition={loop(3)}>
        <path d="M0 10 L22 0 L44 10 L22 20 Z" fill={A} />
        <path d="M10 15 v9 c0 4 24 4 24 0 v-9" fill={A} fillOpacity="0.75" />
        <line x1="40" y1="12" x2="40" y2="26" stroke="#fff" strokeWidth="1.5" />
        <circle cx="40" cy="27" r="2.2" fill="#fff" />
      </motion.g>
      {/* audience */}
      {[56, 96, 136, 176, 216, 256].map((x, i) => (
        <motion.g key={x} animate={{ y: [0, i % 2 ? -3 : -1.5, 0] }} transition={loop(2.4, i * 0.2)}>
          <circle cx={x} cy={150} r="9" fill="#fff" fillOpacity={0.55 + (i % 3) * 0.12} />
          <path d={`M${x - 15} 182 q15 -26 30 0`} fill="#fff" fillOpacity={0.3 + (i % 3) * 0.1} />
        </motion.g>
      ))}
      {/* raised hand */}
      <motion.g animate={{ opacity: [0, 1, 1, 0] }} transition={loop(4, 1)}>
        <line x1="185" y1="160" x2="190" y2="132" stroke={A} strokeWidth="4" strokeLinecap="round" />
        <circle cx="190" cy="130" r="4" fill={A} />
      </motion.g>
    </g>
  );
}
