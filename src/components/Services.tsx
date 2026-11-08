import { motion } from 'framer-motion';
import { process, profile, services } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, SectionHeading, Tilt } from './fx';
import { PosterBackdrop } from './Poster';
import ServiceArt from './ServiceArt';

/** NOW BOOKING — freelance services, presented as upcoming productions. */
export default function Services() {
  const { scrollTo } = useSmoothScroll();
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent('Freelance project enquiry')}`;

  return (
    <>
      <SectionHeading
        kicker="Now booking · Freelance"
        title="Hire Me"
        aside={
          <p className="max-w-xs text-sm text-mist">
            Alongside my role at Globe Creater, I take a small number of independent projects — scheduled outside work hours, with a written scope and weekly updates.
          </p>
        }
      />

      <div className="gutter grid gap-4 sm:grid-cols-2 xl:grid-cols-4 [perspective:1400px]">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 50, rotateX: 16 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
          >
            <Tilt max={7} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:ring-white/30">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-110">
                  <PosterBackdrop palette={s.palette} />
                </div>
                <div className="relative flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.34em] text-bone/80">COMING TO YOUR BUSINESS</span>
                    <span className="rounded border border-white/30 px-1.5 py-px text-[10px] font-bold text-bone">0{i + 1}</span>
                  </div>
                  {/* illustration fills the space between the label and the title */}
                  <div className="my-4 flex flex-1 items-center justify-center transition-transform duration-700 ease-[var(--ease-cine)] group-hover:-translate-y-1 group-hover:scale-[1.04]">
                    <div className="aspect-[320/190] w-full max-w-[320px]">
                      <ServiceArt id={s.id} accent={s.palette.accent} />
                    </div>
                  </div>
                  <h3 className="font-display text-[2.6rem] leading-[0.9] tracking-wide text-bone">{s.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-bone/80">{s.text}</p>
                  <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-relaxed text-mist">
                    <span className="font-bold uppercase tracking-[0.2em]" style={{ color: s.palette.accent }}>
                      You get{' '}
                    </span>
                    {s.deliver}
                  </p>
                </div>
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* how a project runs */}
      <div className="gutter mt-16">
        <h3 className="mb-8 font-sans text-lg font-semibold text-bone sm:text-2xl">
          How a project runs <span className="text-mist">· 4 simple steps</span>
        </h3>
        <ol className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <motion.li
              key={p.title}
              className="relative bg-ink-2 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <p className="text-[10px] font-bold tracking-[0.3em] text-crimson-2">STEP {i + 1}</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-wide text-bone">{p.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-mist">{p.text}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact', { offset: -64 });
              }}
              data-cursor="play"
              className="flex min-h-12 items-center gap-2 rounded-full bg-crimson px-7 text-sm font-bold tracking-[0.12em] text-white shadow-[0_0_50px_rgba(229,19,43,0.45)] transition hover:bg-crimson-2"
            >
              ▶ START A PROJECT
            </a>
          </Magnetic>
          <p className="text-sm text-mist">
            Or email <a href={mail} className="font-semibold text-bone underline decoration-crimson-2/60 underline-offset-4 hover:decoration-crimson-2">{profile.email}</a> — I reply within 24 hours.
          </p>
        </div>
      </div>
    </>
  );
}
