import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { Link } from 'react-router-dom';
import { SiteImage } from '../components/SiteImage';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  aboutParagraphs,
  aboutGoalStatement,
  aboutClosingQuote,
  aboutGroundedIn,
  whatMakesDifferent,
  professionalStandards,
  BRAND_LINE_POSITIONING,
} from '../data/content';

export function About() {
  usePageMeta(
    'About the Practitioner | Brooklyn Mobile Massage | The Living Axis',
    `${BRAND_LINE_POSITIONING} The approach behind therapeutic and sports massage delivered in your own space across Brooklyn and greater New York City.`
  );

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      {/* 1. Hero Section: Split Editorial */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Portrait & Trust Fields (40-45%) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full lg:w-[45%] flex flex-col gap-8 shrink-0"
          >
            <SiteImage slot="about-portrait" className="shadow-xl shadow-black/5" />

            <div className="bg-white/50 p-6 border border-brand-teal/10 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  License &amp; Insurance
                </h4>
                <p className="text-sm italic text-brand-espresso/60">Client Information Pending</p>
              </div>
              <div className="w-full h-px bg-brand-teal/10"></div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  Training &amp; Credentials
                </h4>
                <p className="text-sm italic text-brand-espresso/60">Client Information Pending</p>
              </div>
              <div className="w-full h-px bg-brand-teal/10"></div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  Years in Practice
                </h4>
                <p className="text-sm italic text-brand-espresso/60">Client Information Pending</p>
              </div>
              <div className="w-full h-px bg-brand-teal/10"></div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  Specialty Certifications
                </h4>
                <p className="text-sm italic text-brand-espresso/60">Client Information Pending</p>
              </div>
            </div>

            {/* Confirmed operating standards — Build Note, Section 06. These
                are practices, not credentials, so they are stated as fact
                alongside the pending items above rather than held back. */}
            <div className="bg-white/50 p-6 border border-brand-teal/10">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-4">
                Standards of Practice
              </h4>
              <ul className="space-y-2">
                {professionalStandards.map((standard) => (
                  <li key={standard} className="flex items-start gap-3 text-sm text-brand-espresso/80">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-brand-eucalyptus shrink-0" />
                    {standard}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full lg:w-[55%] lg:pt-12">
            <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
              {BRAND_LINE_POSITIONING}
            </span>
            <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] text-brand-espresso mb-10">
              The human behind the care.
            </h1>

            <div className="space-y-6 text-lg md:text-xl text-brand-espresso/80 font-light leading-relaxed">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. The work is grounded in */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-y border-brand-teal/10">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
          >
            <div className="lg:col-span-5">
              <h2 className="font-display text-[36px] md:text-[48px] text-brand-teal mb-8">The work is grounded in:</h2>
              <SiteImage slot="about-hands" />
            </div>

            <div className="lg:col-span-7">
              <ul className="flex flex-col gap-6 md:gap-8">
                {aboutGroundedIn.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-6 group">
                    <span className="text-brand-eucalyptus/50 font-display italic text-2xl md:text-3xl">
                      0{idx + 1}
                    </span>
                    <span className="text-xl md:text-2xl text-brand-espresso/80 font-light group-hover:text-brand-teal transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Pull Quote */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-[1000px] mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className="w-12 h-px bg-brand-teal/30 mx-auto mb-12"></div>
          <p className="font-display italic text-[32px] md:text-[48px] leading-tight text-brand-teal">
            {aboutGoalStatement}
          </p>
          <div className="w-12 h-px bg-brand-teal/30 mx-auto mt-12"></div>
        </motion.div>
      </section>

      {/* 4. What Makes The Living Axis Different */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-[40px] md:text-[56px] text-brand-teal mb-6 max-w-2xl">
            What Makes The Living Axis Different
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-24">
          {whatMakesDifferent.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="flex flex-col"
            >
              <div className="w-8 h-px bg-brand-eucalyptus mb-6"></div>
              <h3 className="font-display text-2xl text-brand-teal mb-4">{item.title}</h3>
              <p className="text-brand-espresso/70 leading-relaxed text-lg font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp}>
          <SiteImage slot="about-setup" />
        </motion.div>
      </section>

      {/* 5. Closing Booking Block */}
      <section className="ground-dark bg-brand-teal text-brand-ivory py-32 md:py-48 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] border border-brand-ivory rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section 05's closing pull-quote, client's exact wording — combines
              the positioning framing with the emotional brand line as its own
              final sentence, immediately ahead of the booking action. */}
          <p className="font-display italic text-[26px] md:text-[36px] leading-relaxed mb-12">{aboutClosingQuote}</p>
          <Link
            to="/book"
            className="bg-brand-ivory text-brand-teal hover:bg-white px-12 py-5 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors inline-block"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
}
