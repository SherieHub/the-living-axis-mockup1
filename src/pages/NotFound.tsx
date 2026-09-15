import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFound() {
  usePageMeta(
    'Page Not Found | The Living Axis',
    'This page has moved on. Book mobile massage therapy in Brooklyn and greater New York City.'
  );


  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-32 flex items-center">
      <section className="px-6 lg:px-12 max-w-[800px] mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-8 block">404</span>

          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] text-brand-espresso mb-8">
            This page has moved on.
          </h1>

          <p className="font-display italic text-2xl md:text-3xl text-brand-teal leading-relaxed mb-14">
            Your session hasn&rsquo;t — let&rsquo;s get you booked.
          </p>

          <div className="w-12 h-px bg-brand-eucalyptus mx-auto mb-14" />

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/book"
              className="bg-brand-teal text-brand-ivory hover:bg-brand-tealHover px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Book Your Session
            </Link>
            <Link
              to="/"
              className="border border-brand-teal/30 hover:border-brand-teal text-brand-teal px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
