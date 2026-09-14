import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SiteImage } from '../components/SiteImage';
import { usePageMeta } from '../hooks/usePageMeta';

export function About() {
  usePageMeta(
    'About the Practitioner | Brooklyn Mobile Massage | The Living Axis',
    'The approach behind therapeutic and sports massage delivered in your own space across Brooklyn and greater New York City.'
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const groundedIn = [
    'Therapeutic Skill',
    'Intentional Touch',
    'Mobility & Recovery Awareness',
    'Nervous-System Support',
    'Thoughtful Communication',
    'Personalized Pressure & Technique',
    "Respect for the Body's Response",
  ];

  const differentList = [
    {
      title: 'Individualized Care',
      desc: 'Every session is uniquely constructed around what your tissues and nervous system require today, rather than a rote routine.',
    },
    {
      title: 'Intentional Bodywork',
      desc: 'Working with a clear purpose to achieve your therapeutic goals, whether that means deep structural change or profound relaxation.',
    },
    {
      title: 'Thoughtful Professionalism',
      desc: 'Discreet, respectful, and fully equipped mobile service that honors the sanctity of your personal space.',
    },
    {
      title: 'A More Human Approach',
      desc: 'Care that recognizes the complex connection between physical tension, mental stress, and overall well-being.',
    },
    {
      title: 'Care That Fits Real Life',
      desc: 'Removing the friction of travel and transit so that your recovery begins the moment our session ends.',
    },
    {
      title: 'Quality Without the Distance',
      desc: 'Clinical-grade therapeutic treatment delivered directly to your home without compromising on the standard of care.',
    },
  ];

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
                  Professional Standing &amp; Insurance
                </h4>
                <p className="text-sm font-display italic text-brand-espresso/60">Client Information Pending</p>
              </div>
              <div className="w-full h-px bg-brand-teal/10"></div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  Training & Credentials
                </h4>
                <p className="text-sm font-display italic text-brand-espresso/60">Client Information Pending</p>
              </div>
              <div className="w-full h-px bg-brand-teal/10"></div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
                  Specialty Certifications
                </h4>
                <p className="text-sm font-display italic text-brand-espresso/60">Client Information Pending</p>
              </div>
            </div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full lg:w-[55%] lg:pt-12">
            <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
              The Human Behind the Care
            </span>
            <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] text-brand-espresso mb-10">
              Therapeutic skill. Intentional care. A more human approach.
            </h1>

            <div className="space-y-6 text-lg md:text-xl text-brand-espresso/80 font-light leading-relaxed">
              <p>
                Massage should do more than help you escape for an hour. True therapeutic bodywork is about helping you
                return to your body feeling more supported, deeply aware, and fundamentally at ease.
              </p>
              <p>
                Every body moves, recovers, and responds differently based on its history, habits, and daily stressors.
                Because of this, no two sessions should ever be identical. The care provided by The Living Axis is
                entirely adaptable.
              </p>
              <p>
                Pressure, pacing, technique, and focus are constantly adjusted based on open communication and exactly
                how your tissues and nervous system respond in the moment. It is a dialogue between practitioner and
                client, designed to foster genuine, lasting recovery.
              </p>
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
                {groundedIn.map((item, idx) => (
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
            "My goal is simple: I want you to leave our session more mobile, less tense, more settled, more connected to
            your body, and genuinely cared for."
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
          {differentList.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } },
              }}
              className="flex flex-col"
            >
              <div className="w-8 h-px bg-brand-eucalyptus mb-6"></div>
              <h3 className="font-display text-2xl text-brand-teal mb-4">{item.title}</h3>
              <p className="text-brand-espresso/70 leading-relaxed text-lg font-light">{item.desc}</p>
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
          <h2 className="font-display italic text-[40px] md:text-[64px] leading-tight mb-12">
            Healing that feels like coming home.
          </h2>
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
