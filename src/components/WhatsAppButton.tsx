import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon, whatsappLink } from './Contact';

/**
 * Floating "Chat on WhatsApp" button, bottom-right on every page.
 * Appears after the landing animation; the label slides out on hover (and once, briefly, on its own).
 */
export default function WhatsAppButton() {
  const href = whatsappLink();
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setShow(true), 3600);
    const t2 = window.setTimeout(() => setHint(true), 4400);
    const t3 = window.setTimeout(() => setHint(false), 8400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (!href) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener"
          aria-label="Chat with Akash on WhatsApp"
          data-cursor="link"
          className="group fixed bottom-5 right-5 z-[70] flex items-center gap-3 sm:bottom-7 sm:right-7"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          onPointerEnter={() => setHint(true)}
          onPointerLeave={() => setHint(false)}
        >
          <AnimatePresence>
            {hint && (
              <motion.span
                className="hidden rounded-full border border-white/10 bg-ink-2/95 px-4 py-2 text-[13px] font-semibold text-bone shadow-xl backdrop-blur sm:block"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                Chat on WhatsApp
              </motion.span>
            )}
          </AnimatePresence>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition group-hover:scale-105 group-hover:brightness-110">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.6s]" />
            <span className="relative scale-[1.35]">
              <WhatsAppIcon />
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
