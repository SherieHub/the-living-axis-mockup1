import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { useState } from 'react';
import { SiteImage } from '../components/SiteImage';
import { services, confirmedFaqs, timelineSteps, BRAND_LINE } from '../data/content';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { localBusinessSchema } from '../data/schema';

/*
 * Audience cards. Two large (top row) then three small (bottom row).
 * `hook` is the two-line opener used on the large cards; `hookShort` is the
 * single-line opener used on the small ones.
 */
const audienceCards = [
  {
    audience: 'Busy Professionals & High-Stress Clients',
    hook: '“I carry all my stress in my neck and shoulders, and I don’t have time to travel across the city.”',
    hookShort: '“I carry all my stress in my neck and shoulders.”',
    need: 'Nervous-system down-regulation and deep fascial release, undoing what desk posture and mental load compound.',
    link: '/find-your-treatment',
  },
  {
    audience: 'Athletes, Gym-Goers & Active Adults',
    hook: '“My training is plateauing because my recovery isn’t keeping up, and I have tightness I can’t stretch out.”',
    hookShort: '“My recovery isn’t keeping up with my training.”',
    need: 'Mobility work, trigger point release and performance restoration, matched to your current training block.',
    link: '/services#sports',
  },
  {
    audience: 'Prenatal & Postpartum Clients',
    hook: '“My body is changing rapidly and I need safe, effective relief without leaving the house.”',
    hookShort: '“My body is changing and everything aches.”',
    need: 'Positioned structural support for pregnancy-related tension and postpartum recovery.',
    link: '/services#prenatal',
  },
  {
    audience: 'Older Adults',
    hook: '“I want to maintain my mobility and manage stiffness comfortably at home.”',
    hookShort: '“I want to keep my mobility, comfortably.”',
    need: 'Gentle, focused work on joint mobility, circulation and tissue health, at your pace.',
    link: '/find-your-treatment',
  },
  {
    audience: 'Physically Demanding Work',
    hook: '“I work with my hands and stand all day. My body is my livelihood.”',
    hookShort: '“My body is my livelihood, and it’s wearing down.”',
    need: 'Restorative therapy for repetitive strain, structural balance and career longevity.',
    link: '/find-your-treatment',
  },
];

export function Home() {
  // LocalBusiness schema is emitted once, from the homepage.
  usePageMeta(
    'Mobile Massage Therapy in Brooklyn, NY | The Living Axis',
    'Clinical touch, human understanding. Deep tissue, sports, restorative and prenatal massage brought to your own space across Brooklyn and greater New York City.',
    localBusinessSchema
  );


  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  // Four on the homepage; the View All link carries the rest.
  const homeFaqs = confirmedFaqs.slice(0, 4);

    return (
    <div className="bg-brand-ivory min-h-screen selection:bg-brand-teal/20 selection:text-brand-espresso">
      {/* 1. HERO */}
      <section className="ground-dark relative bg-brand-teal pt-32 pb-20 md:pt-48 md:pb-32 px-5 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
            {/* Left Column: Typography & CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-brand-eucalyptus uppercase tracking-[0.18em] text-[12px] md:text-[13px] font-semibold mb-6 md:mb-8 block">
                PREMIUM MOBILE MASSAGE THERAPY · BROOKLYN, NY
              </span>

              {/* The emotional line is the headline here. Mockup 1 is the warm,
                  referral-and-Instagram direction, so it leads with feeling and
                  lets the subline below carry the six-second test. The
                  positioning line lives in the meta description and on About —
                  never back in this hero. Mobile is capped at 34px. */}
              <h1 className="font-display text-[34px] sm:text-[48px] lg:text-[64px] leading-[1.05] text-brand-ivory mb-5">
                Healing that feels like coming home.
              </h1>

              {/* Sits tight under the H1 so the pair reads as one unit. */}
              {/* Held to 18px on mobile per spec. Slightly tighter tracking plus
                  the narrower mobile gutter above keeps it to three lines at
                  360px — type size was preserved by finding width, not by
                  shrinking. */}
              <p className="text-[18px] md:text-[22px] lg:text-[24px] font-light tracking-[-0.014em] md:tracking-normal text-brand-ivory/90 leading-relaxed mb-10 max-w-xl">
                personalized mobile therapeutic bodywork for recovery, mobility, muscular tension, and nervous-system care, delivered to your space across Brooklyn and greater NYC.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Link
                  to="/book"
                  className="bg-brand-ivory text-brand-teal hover:bg-white px-8 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors text-center w-full sm:w-auto"
                >
                  Book Your Session
                </Link>
                <Link
                  to="/services"
                  className="text-brand-ivory hover:text-white text-sm font-semibold tracking-wider uppercase underline decoration-brand-eucalyptus decoration-1 underline-offset-[6px] hover:decoration-brand-ivory transition-colors w-full sm:w-auto text-center sm:text-left"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Editorial Image & Emotional Line */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 lg:col-start-8 relative mt-12 lg:mt-0"
            >
              <div className="relative transform lg:translate-x-8 lg:translate-y-12">
                {/* The emotional line used to sit here as a closing note. It is
                    the H1 now, so it must not appear twice in one viewport. */}
                <SiteImage slot="home-hero" priority className="shadow-2xl shadow-black/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAND */}
      <section className="bg-brand-ivory border-b border-brand-teal/10 py-6 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <ul className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-8 text-center md:text-left text-sm uppercase tracking-widest font-semibold text-brand-espresso/80">
            <li>Mobile care delivered to you</li>
            <li className="hidden md:block text-brand-eucalyptus">•</li>
            <li>Serving Brooklyn & greater NYC</li>
            <li className="hidden md:block text-brand-eucalyptus">•</li>
            <li>Travel & professional setup included</li>
            <li className="hidden md:block text-brand-eucalyptus">•</li>
            <li>By appointment only</li>
          </ul>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-20 md:mb-28"
        >
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Who This Is For
          </span>
          <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-brand-teal max-w-3xl">Find Your Treatment.</h2>
        </motion.div>

        {/*
          Deliberate 2 + 3 rhythm on a 12-column grid, not an arbitrary
          asymmetry: two large cards on the top row (6 columns each, taller,
          larger serif title, two-line opener), then three shorter cards below
          (4 columns each, single-line opener). Both rows share the same left
          gutter, and the card titles sit on a common baseline because every
          title is a single line at its own size.

          There is deliberately NO children or adolescents card. That policy
          lives only in the FAQ and Policies sections.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16">
          {audienceCards.map((card, idx) => {
            const isLarge = idx < 2;
            return (
              <motion.div
                key={card.audience}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                className={isLarge ? 'md:col-span-6' : 'md:col-span-4'}
              >
                <Link
                  to={card.link}
                  className="group flex h-full min-h-[44px] flex-col rounded-sm py-1"
                >
                  <h3
                    className={
                      isLarge
                        ? 'font-display text-[28px] lg:text-[34px] leading-[1.12] text-brand-teal mb-4'
                        : 'font-display text-2xl lg:text-[26px] leading-[1.12] text-brand-teal mb-3'
                    }
                  >
                    {card.audience}
                  </h3>

                  {/* The lived-experience opener, in Work Sans. Two lines on the
                      large cards, one on the small ones. */}
                  <p
                    className={
                      isLarge
                        ? 'text-brand-espresso/80 text-[17px] leading-relaxed mb-5'
                        : 'text-brand-espresso/80 text-[15px] leading-relaxed mb-4'
                    }
                  >
                    {isLarge ? card.hook : card.hookShort}
                  </p>

                  <p
                    className={
                      isLarge
                        ? 'text-brand-espresso/60 text-[15px] leading-relaxed mb-6'
                        : 'text-brand-espresso/60 text-sm leading-relaxed mb-5'
                    }
                  >
                    {card.need}
                  </p>

                  {/* Single hairline eucalyptus rule. On desktop hover it
                      extends to the full card width; the arrow moves 4px.
                      Nothing else moves. */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-1">
                    <span
                      aria-hidden="true"
                      className="h-px w-12 bg-brand-eucalyptus transition-[width] duration-300 ease-out md:group-hover:w-full"
                    />
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-brand-teal transition-transform duration-300 ease-out md:group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICES & PRICING PREVIEW */}
      <section className="bg-brand-teal/5 py-20 md:py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div>
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
                Services & Pricing
              </span>
              <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-brand-teal">
                Exceptional care,
                <br />
                transparently priced.
              </h2>
            </div>
            <p className="text-brand-espresso/70 max-w-sm text-base italic">
              Travel and full setup are included in every rate within the service area.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className="bg-brand-ivory border border-brand-teal/10 p-8 lg:p-12 flex flex-col h-full hover:border-brand-teal/30 transition-colors"
              >
                <h3 className="font-display text-2xl lg:text-3xl text-brand-teal mb-4">{service.title}</h3>
                <p className="text-brand-espresso/70 mb-8 flex-grow">{service.description}</p>
                <div className="space-y-3 mb-10 border-t border-brand-teal/10 pt-8">
                  {service.durations.slice(0, 2).map((d, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <span className="nums text-sm font-semibold uppercase tracking-wider">{d.minutes} Min</span>
                      <span className="nums font-display text-xl text-brand-teal">${d.price}</span>
                    </div>
                  ))}
                  {service.durations.length > 2 && (
                    <div className="text-sm text-brand-espresso/50 italic pt-2">+ More durations available</div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    to={`/services#${service.id.split('-')[0]}`}
                    className="text-center py-3 border border-brand-teal/20 text-brand-teal hover:border-brand-teal text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/book?service=${service.id}`}
                    className="text-center py-3 bg-brand-teal text-brand-ivory hover:bg-brand-tealHover text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*
        5. WHAT TO EXPECT — the one espresso section on the page.
        A single tonal anchor mid-scroll, breaking the ivory/teal alternation
        exactly once. Ivory typography, eucalyptus numerals. Padding is tighter
        here than the hero/About/closing blocks on purpose: the premium feeling
        comes from the contrast between tight and open, not uniform openness.
      */}
      <section className="ground-dark bg-brand-espresso text-brand-ivory py-20 md:py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center mb-14 md:mb-16"
        >
          <span className="text-brand-eucalyptus uppercase tracking-widest text-xs font-semibold mb-6 block">
            What to Expect
          </span>
          <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-brand-ivory">The Flow of Your Session.</h2>
        </motion.div>

        <div className="mb-16">
          <SiteImage slot="home-setup" dark />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ delay: idx * 0.06 }}
            >
              <div className="nums font-display italic text-[56px] leading-none text-brand-eucalyptus mb-5">
                {step.step}
              </div>
              <h3 className="font-display text-2xl text-brand-ivory mb-3">{step.title}</h3>
              <p className="text-brand-ivory/75 leading-relaxed text-[15px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* 6. ABOUT THE PRACTITIONER — generous, on ivory. */}
      <section className="bg-brand-ivory py-24 md:py-40 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <SiteImage slot="home-practitioner" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <span className="text-brand-ivory/60 uppercase tracking-widest text-xs font-semibold mb-6 block">
                About
              </span>
              <h2 className="font-display text-[36px] md:text-[56px] leading-[1.1] mb-10">
                Individualized,
                <br />
                unhurried care.
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-brand-ivory/80 font-light leading-relaxed mb-12">
                <p>
                  The Living Axis was founded to bridge the gap between high-level clinical therapy and the profound
                  comfort of receiving care in your own environment.
                </p>
                <p>
                  Every body tells a story of its habits, stresses, and histories. Rather than forcing a rote routine,
                  each session is uniquely constructed around what your tissues and nervous system require today.
                </p>
              </div>

              <div className="border-l border-brand-eucalyptus/30 pl-8 mb-12">
                <p className="font-display italic text-2xl md:text-3xl text-brand-ivory leading-relaxed mb-4">
                  "True recovery begins the moment the nervous system realizes it is entirely safe and doesn't need to
                  rush."
                </p>
              </div>

              <Link
                to="/book"
                className="bg-brand-ivory text-brand-espresso hover:bg-white px-8 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors inline-block"
              >
                Book Your Session
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-brand-ivory max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            The Experience
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="p-10 md:p-16 lg:p-20 border border-brand-eucalyptus bg-brand-ivory text-center"
          >
            <span className="font-display text-7xl text-brand-teal leading-none mb-6 block" style={{ marginTop: '-2rem', marginBottom: '-1rem' }}>"</span>
            <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-brand-espresso leading-relaxed max-w-3xl mx-auto mb-10">
              Client words coming soon. In the meantime, questions are always welcome.
            </p>
            <Link
              to="/contact"
              className="inline-block text-brand-teal hover:text-brand-eucalyptus text-sm font-semibold tracking-wider uppercase underline decoration-brand-eucalyptus decoration-1 underline-offset-[6px] hover:decoration-brand-teal transition-colors"
            >
              Contact The Living Axis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 8. SERVICE AREA */}
      <section className="bg-brand-teal/5 py-20 md:py-24 px-6 lg:px-12 border-y border-brand-teal/10">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <h2 className="font-display text-[40px] md:text-[64px] leading-[1.05] text-brand-teal mb-16">
              Brooklyn first.
              <br />
              Greater NYC by arrangement.
            </h2>

            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12 mb-16 font-display text-2xl md:text-3xl text-brand-espresso">
              <li>Queens</li>
              <li className="text-brand-teal/30">•</li>
              <li>Manhattan</li>
              <li className="text-brand-teal/30">•</li>
              <li>The Bronx</li>
              <li className="text-brand-teal/30">•</li>
              <li>Staten Island</li>
              <li className="text-brand-teal/30">•</li>
              <li>Long Island</li>
              <li className="text-brand-teal/30">•</li>
              <li>Select NJ</li>
            </ul>

            <p className="text-lg text-brand-espresso/70 max-w-2xl mx-auto leading-relaxed">
              Brooklyn is the primary service area, with standard travel and setup included. Travel to other boroughs,
              Long Island, and select New Jersey locations is arranged by request and may require a custom quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ PREVIEW */}
      <section className="py-20 md:py-24 px-6 lg:px-12 max-w-[1000px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="font-display text-[36px] md:text-[48px] text-brand-teal mb-4">Common Questions</h2>
            <p className="text-brand-espresso/70">Clear boundaries for better care.</p>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-brand-teal hover:text-brand-tealHover group transition-colors"
          >
            View All FAQs & Policies{' '}
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="border-t border-brand-teal/20">
          {homeFaqs.map((faq, index) => (
            <div key={index} className="border-b border-brand-teal/20">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full py-6 md:py-8 flex justify-between items-center text-left"
              >
                <h3 className="text-xl md:text-2xl font-display text-brand-espresso pr-8">{faq.question}</h3>
                <span className="text-brand-teal flex-shrink-0 transition-transform duration-300">
                  {openFaqIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-lg text-brand-espresso/70 leading-relaxed pr-8 md:pr-12">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CLOSING BOOKING BLOCK */}
      <section className="ground-dark bg-brand-teal text-brand-ivory py-32 md:py-48 px-6 lg:px-12 text-center relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] border border-brand-ivory rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display italic text-[40px] md:text-[64px] leading-tight mb-8">
            Healing that feels like coming home.
          </h2>
          <p className="text-lg md:text-xl text-brand-ivory/80 font-light leading-relaxed mb-12 max-w-xl mx-auto">
            Reserve your session today and experience therapeutic luxury seamlessly integrated into your own space.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



