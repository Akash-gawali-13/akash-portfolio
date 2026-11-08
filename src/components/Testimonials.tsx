import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

/** REVIEWS — what clients, students and colleagues say. Hidden while the list in portfolio.ts is empty. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <>
      <SectionHeading kicker="Reviews" title="What People Say" />
      <div className="gutter grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name + i}
            className="relative flex flex-col rounded-2xl border border-white/10 bg-ink-2/80 p-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <span aria-hidden className="font-serif text-6xl leading-none text-crimson-2">“</span>
            <blockquote className="mt-2 flex-1 text-[15.5px] leading-relaxed text-bone/85">{t.quote}</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="font-semibold text-bone">{t.name}</p>
              <p className="text-sm text-mist">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </>
  );
}
