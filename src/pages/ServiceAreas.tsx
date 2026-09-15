import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { Link } from 'react-router-dom';
import { SiteImage } from '../components/SiteImage';
import { usePageMeta } from '../hooks/usePageMeta';

export function ServiceAreas() {
  usePageMeta(
    'Mobile Massage Service Areas | Brooklyn & Greater NYC | The Living Axis',
    'Mobile massage across Brooklyn first, with Queens, Manhattan, the Bronx, Staten Island, Long Island and select New Jersey locations by arrangement.'
  );


  const additionalAreas = ['Queens', 'Manhattan', 'The Bronx', 'Staten Island', 'Long Island', 'Select New Jersey'];

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      {/* 1. Hero Section */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-20 md:mb-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Service Areas
          </span>
          <h1 className="font-display text-[56px] md:text-[80px] lg:text-[96px] leading-[1] text-brand-espresso mb-10">
            Brooklyn first.
            <br />
            Greater NYC by arrangement.
          </h1>
          <p className="text-xl text-brand-espresso/70 font-light leading-relaxed max-w-2xl">
            The Living Axis is primarily a mobile massage service, so clients are typically seen in their own homes,
            hotels, or other appropriate private spaces rather than at a public storefront.
          </p>
        </motion.div>
      </section>

      {/* 2. Location Typography Grid & Placeholder */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <div className="border-t border-brand-eucalyptus/30 pt-16 md:pt-24 mb-16 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-12 md:gap-24"
          >
            {/* Primary Area */}
            <div className="md:w-1/2">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-4">
                Primary Service Area
              </h2>
              <div className="font-display text-[72px] md:text-[100px] leading-none text-brand-teal mb-6">Brooklyn</div>
              <p className="text-lg text-brand-espresso/70">
                Our core service area covers Brooklyn, where standard travel and mobile setup are fully included in all
                listed pricing.
              </p>
            </div>

            {/* Additional Areas Grid */}
            <div className="md:w-1/2 md:border-l border-brand-eucalyptus/30 md:pl-16">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-8">
                Additional Locations
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                {additionalAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-eucalyptus"></span>
                    <span className="font-display text-2xl text-brand-espresso/90">{area}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm italic text-brand-espresso/60">
                Service availability in these areas is highly dependent on distance, scheduling, and precise location.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp}>
          <SiteImage slot="service-areas" />
        </motion.div>
      </section>

      {/* 3. Travel & Policies Blocks */}
      <section className="bg-brand-teal/5 py-24 px-6 lg:px-12 border-t border-brand-teal/10">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Travel & Pricing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <h3 className="font-display text-3xl text-brand-teal mb-6">Travel & Pricing</h3>
              <p className="text-brand-espresso/80 leading-relaxed mb-6">
                Standard travel time, transportation, and full mobile setup are completely included in all listed
                pricing for appointments within our normal Brooklyn service area.
              </p>
              <p className="text-brand-espresso/80 leading-relaxed">
                Appointments requiring significantly greater travel time, tolls, or distance outside our core area may
                require an extended travel fee or a custom quote.
              </p>
            </motion.div>

            {/* Optional Private Space (Secondary) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl text-brand-espresso/70 mb-6">Optional Private Space</h3>
              <p className="text-brand-espresso/60 text-sm leading-relaxed">
                If a client is unable or prefers not to receive the service in their own space, a private treatment
                space may be arranged in advance when available. Because this would involve securing an additional
                location, the total service cost would increase accordingly.
              </p>
            </motion.div>
          </div>

          {/* Flexible Inquiry */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="mt-20 pt-12 border-t border-brand-teal/20 text-center"
          >
            <p className="font-display italic text-2xl text-brand-espresso/80 mb-6">Outside the listed areas?</p>
            <Link
              to="/contact"
              className="inline-block text-sm uppercase tracking-widest font-semibold text-brand-teal hover:text-brand-tealHover transition-colors border-b border-brand-teal hover:border-brand-tealHover pb-1"
            >
              Contact The Living Axis to ask about extended travel
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. Closing Booking Block */}
      <section className="ground-dark bg-brand-teal text-brand-ivory py-24 md:py-32 px-6 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[40px] md:text-[56px] leading-tight mb-12">Ready to book your session?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="/book"
              className="bg-brand-ivory text-brand-teal hover:bg-white px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors w-full sm:w-auto"
            >
              Book Your Session
            </Link>
            <Link
              to="/contact"
              className="border border-brand-ivory/30 hover:border-brand-ivory text-brand-ivory px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors w-full sm:w-auto"
            >
              Contact The Living Axis
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
