import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SiteImage } from '../components/SiteImage';
import { usePageMeta } from '../hooks/usePageMeta';

export function FindYourTreatment() {
  usePageMeta(
    'Which Massage Is Right for You? | Brooklyn | The Living Axis',
    'Choose between deep tissue, sports, restorative and prenatal massage for mobile sessions across Brooklyn and greater New York City.'
  );


  const panels = [
    {
      id: 'professionals',
      title: 'Busy Professionals & High-Stress Clients',
      opening: "I carry all my stress in my neck and shoulders, and my mind won't shut off.",
      explanation:
        'Designed to address the physical compounding of long hours, prolonged sitting, and mental exhaustion. We focus on targeted nervous-system down-regulation, releasing accumulated neck and shoulder tension, easing low-back discomfort, and addressing tension-related headaches to facilitate a profound physical reset.',
      supports: 'Nervous-system regulation, postural reset, headache relief',
      link: '/services#therapeutic',
    },
    {
      id: 'athletes',
      title: 'Athletes, Gym-Goers & Active Adults',
      opening: "My recovery isn't keeping up with my training, and I have specific restrictions.",
      explanation:
        'Clinical support for those demanding more from their bodies. Treatment emphasizes muscular recovery, restoring flexibility and mobility, addressing repetitive-use tension, and providing performance support or vital maintenance between heavy workouts or competitive events.',
      supports: 'Muscular recovery, mobility restoration, athletic maintenance',
      link: '/services#sports',
    },
    {
      id: 'prenatal',
      title: 'Prenatal & Postpartum Clients',
      opening: 'My body is changing rapidly and I need safe, effective relief at home.',
      explanation:
        'Expert care adapted meticulously around your comfort and safe positioning. Treatment focuses on easing pregnancy-related muscular tension, improving circulation, facilitating deep relaxation, and providing structural support for critical postpartum physical recovery.',
      supports: 'Pregnancy comfort, circulation, postpartum structural recovery',
      link: '/services#prenatal',
    },
    {
      id: 'older-adults',
      title: 'Older Adults & Geriatric Clients',
      opening: 'I want to maintain my mobility and manage chronic stiffness comfortably.',
      explanation:
        'Patient, highly adaptable care emphasizing gentle therapeutic touch. Sessions are customized for comfort, providing mobility support, improving circulation, reducing stiffness, and prioritizing overall relaxation and quality of life in a safe environment.',
      supports: 'Joint mobility, circulation, chronic stiffness management',
      link: '/services#therapeutic',
    },
    {
      id: 'demanding-professions',
      title: 'Physically Demanding Professions',
      opening: 'My body is my livelihood, and the physical demands are breaking it down.',
      explanation:
        'Intensive therapy tailored for healthcare workers, first responders, drivers, tradespeople, hospitality professionals, and caregivers. We address profound muscular fatigue, overuse injuries, restricted movement, and the specific repetitive work demands that compromise your structural health.',
      supports: 'Fatigue management, repetitive strain relief, career longevity',
      link: '/services#therapeutic',
    },
  ];

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      {/* Intro Section */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Care shaped around real life
          </span>
          <h1 className="font-display text-[48px] md:text-[64px] leading-[1.05] text-brand-espresso mb-8">
            Start with what your body is carrying.
          </h1>
          <p className="text-xl text-brand-espresso/70 font-light leading-relaxed max-w-2xl">
            Every session is adapted to the body in front of me. Start with what sounds closest — we can adjust from
            there.
          </p>
        </motion.div>
      </section>

      {/* Panels - Asymmetric 2 + 3 Arrangement */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        {/* First Row: 2 Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-32">
          {panels.slice(0, 2).map((panel) => (
            <motion.div
              key={panel.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="group flex flex-col h-full"
            >
              <h2 className="font-display text-3xl md:text-4xl text-brand-teal mb-6 group-hover:text-brand-tealHover transition-colors">
                {panel.title}
              </h2>
              <p className="font-display italic text-xl md:text-2xl text-brand-espresso/80 mb-6">"{panel.opening}"</p>

              <div className="w-full h-px bg-brand-eucalyptus/40 mb-8 transition-colors group-hover:bg-brand-eucalyptus/80"></div>

              <p className="text-brand-espresso/70 text-lg leading-relaxed mb-8 flex-grow">{panel.explanation}</p>

              <p className="text-sm font-medium text-brand-espresso/50 uppercase tracking-wider mb-8">
                May support: <span className="text-brand-espresso/80">{panel.supports}</span>
              </p>

              <Link
                to={panel.link}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-brand-teal hover:text-brand-tealHover transition-colors mt-auto"
              >
                See Recommended Services{' '}
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Interstitial Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 md:mb-32"
        >
          <SiteImage slot="find-treatment" />
        </motion.div>

        {/* Second Row: 3 Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {panels.slice(2, 5).map((panel) => (
            <motion.div
              key={panel.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="group flex flex-col h-full"
            >
              <h2 className="font-display text-2xl md:text-3xl text-brand-teal mb-6 group-hover:text-brand-tealHover transition-colors">
                {panel.title}
              </h2>
              <p className="font-display italic text-xl text-brand-espresso/80 mb-6 min-h-[60px]">"{panel.opening}"</p>

              <div className="w-full h-px bg-brand-eucalyptus/40 mb-6 transition-colors group-hover:bg-brand-eucalyptus/80"></div>

              <p className="text-brand-espresso/70 text-base leading-relaxed mb-6 flex-grow">{panel.explanation}</p>

              <p className="text-xs font-medium text-brand-espresso/50 uppercase tracking-wider mb-8">
                May support: <br />
                <span className="text-brand-espresso/80 mt-1 block">{panel.supports}</span>
              </p>

              <Link
                to={panel.link}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-brand-teal hover:text-brand-tealHover transition-colors mt-auto"
              >
                Recommended Services{' '}
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Strip */}
      <section className="ground-dark bg-brand-teal text-brand-ivory py-24 px-6 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[36px] md:text-[48px] mb-6">Not sure where to begin?</h2>
          <p className="text-lg text-brand-ivory/80 font-light leading-relaxed mb-10">
            You don't need to have it all figured out. Contact us to describe what you are experiencing, and we will
            guide you toward the right treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/services"
              className="bg-brand-ivory text-brand-teal hover:bg-white px-8 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Explore All Services
            </Link>
            <Link
              to="/contact"
              className="border border-brand-ivory/30 hover:border-brand-ivory text-brand-ivory px-8 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Contact The Living Axis
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
