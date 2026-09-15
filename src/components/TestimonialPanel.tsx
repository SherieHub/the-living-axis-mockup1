import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '../lib/motion';

/**
 * The testimonials moment.
 *
 * There are no client testimonials yet, and none may be invented — no names, no
 * star ratings, no review counts, no placeholder quotes that could be mistaken
 * for real ones. Three empty quote cards read as three absences; one wide, quiet
 * panel reads as a single honest statement.
 *
 * Shaped to expand later without touching the surrounding sections: pass real
 * quotes and the panel lays them out in two or three columns instead.
 */

export interface Testimonial {
  /** The client's own words. Never write these. */
  quote: string;
  /** Optional attribution, only ever what the client supplies. */
  attribution?: string;
}

interface TestimonialPanelProps {
  quotes?: Testimonial[];
}

const PENDING_LINE = 'Client words coming soon. In the meantime, questions are always welcome.';

export function TestimonialPanel({ quotes = [] }: TestimonialPanelProps) {
  const hasQuotes = quotes.length > 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className="border border-brand-eucalyptus/60 bg-brand-ivory px-8 py-14 md:px-16 md:py-20"
    >
      {/* Oversized serif opening mark, purely typographic. */}
      <span
        aria-hidden="true"
        className="block font-display text-[88px] md:text-[120px] leading-[0.6] text-brand-eucalyptus/70 select-none"
      >
        &ldquo;
      </span>

      {hasQuotes ? (
        <div
          className={
            quotes.length >= 3
              ? 'mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12'
              : 'mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12'
          }
        >
          {quotes.map((q) => (
            <figure key={q.quote}>
              <blockquote className="font-display text-2xl leading-relaxed text-brand-espresso/85">{q.quote}</blockquote>
              {q.attribution && (
                <figcaption className="mt-4 text-xs uppercase tracking-widest text-brand-espresso/55">
                  {q.attribution}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <p className="mt-4 max-w-3xl font-display text-[26px] leading-[1.35] text-brand-espresso/75 md:text-[34px]">
          {PENDING_LINE}
        </p>
      )}

      <div className="mt-10 flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-12 bg-brand-eucalyptus" />
        <Link
          to="/contact"
          className="text-sm font-medium tracking-wide text-brand-teal underline decoration-brand-eucalyptus decoration-1 underline-offset-[6px] transition-colors duration-250 hover:decoration-brand-teal"
        >
          Contact The Living Axis
        </Link>
      </div>
    </motion.div>
  );
}
