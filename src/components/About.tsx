import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

export default function About() {
  return (
    <>
      <SectionHeading kicker="The Pilot" title="About Me" />
      <div className="gutter grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* photo — stays beside the text while you scroll (desktop) */}
        <motion.div
          className="mx-auto w-full max-w-md lg:sticky lg:top-24 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Tilt max={5} className="rounded-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#5a0b1b,#14060a_60%,#07070a)]" />
              <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]" />
              <img
                src="./assets/portrait-720.webp"
                srcSet={profile.portrait.srcSet}
                sizes="(max-width: 1024px) 90vw, 40vw"
                alt={profile.portrait.alt}
                loading="lazy"
                className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-crimson-2">STARRING</p>
                  <p className="font-display text-3xl leading-none text-bone">{profile.displayName}</p>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* text beside the photo */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="text-[11px] font-bold tracking-[0.3em] text-crimson-2">HI, I&apos;M</p>
            <h3 className="mt-2 font-display text-5xl leading-none tracking-wide text-bone sm:text-6xl">{profile.fullName}</h3>
            <p className="mt-5 border-l-2 border-crimson-2 pl-4 font-serif text-xl italic leading-snug text-bone/90 sm:text-2xl">
              “{profile.about.quote}”
            </p>
          </motion.div>

          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-bone/75 sm:text-base">
            {profile.about.paragraphs.map((p, i) => (
              <motion.p
                key={p.slice(0, 24)}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <p className="mt-6 text-sm text-mist">— {profile.fullName}</p>
        </div>
      </div>
    </>
  );
}