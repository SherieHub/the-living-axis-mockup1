import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

export function WhatToExpect() {
  usePageMeta(
    "What to Expect | The Living Axis",
    "Your session, from booking to care. Professional mobile massage therapy that arrives prepared."
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const steps = [
    {
      num: "01",
      title: "Book",
      desc: "Choose your service, duration, and available appointment time online. Real-time availability is shown directly through our scheduling platform."
    },
    {
      num: "02",
      title: "Brief Intake",
      desc: "Once your session is confirmed, a concise intake form captures your specific goals, sensitivities, and any relevant health considerations to ensure safe, effective care."
    },
    {
      num: "03",
      title: "Arrival & Setup",
      desc: "Professional massage equipment, fresh luxury linens, and necessary supplies are brought to your appointment. [Exact setup-time and required-space measurements pending client confirmation]."
    },
    {
      num: "04",
      title: "Your Session",
      desc: "Pressure, pacing, technique, focus areas, and positioning are adapted around your ongoing communication, comfort, and how your body responds."
    }
  ];

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      
      {/* Hero Section */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-20 md:mb-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Your Session, From Booking to Care
          </span>
          <h1 className="font-display text-[48px] md:text-[64px] leading-[1.05] text-brand-espresso mb-8">
            Professional care that arrives prepared.
          </h1>
          <p className="text-xl text-brand-espresso/70 font-light leading-relaxed max-w-2xl">
            The Living Axis brings comprehensive, clinical-grade mobile therapeutic bodywork directly to the sanctuary of your private space.
          </p>
        </motion.div>
      </section>

      {/* 01-04 Editorial Timeline */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 relative">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 right-0 h-px bg-brand-teal/10 -z-10"></div>
          
          {/* Connecting Line for Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[2.25rem] w-px bg-brand-teal/10 -z-10"></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.15 } }
              }}
              className="flex-1 relative bg-brand-ivory"
            >
              <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
                <div className="font-display italic text-[56px] md:text-[72px] leading-none text-brand-teal shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-espresso mb-4 lg:mt-4">{step.title}</h3>
                  <p className="text-brand-espresso/70 leading-relaxed text-base md:text-lg font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Setup Image Placeholder */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <ImagePlaceholder 
            label="Mobile Setup — 16:10 Photography Placeholder" 
            aspectRatio="16:10" 
          />
        </motion.div>
      </section>

      {/* What You Need To Prepare */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h2 className="font-display text-[36px] md:text-[48px] text-brand-teal mb-8">
              What you need to prepare
            </h2>
            <div className="bg-white/60 border border-brand-teal/10 p-8 md:p-12 mb-10">
              <p className="text-lg md:text-xl text-brand-espresso/80 font-light leading-relaxed mb-6">
                You do not need to provide massage equipment, linens, oils, or any treatment supplies. Everything required for a professional clinical session is brought to you.
              </p>
              <p className="text-sm font-display italic text-brand-espresso/60">
                [Additional spatial or operational requirements pending client confirmation]
              </p>
            </div>
            
            <Link 
              to="/faq" 
              className="inline-block text-sm uppercase tracking-widest font-semibold text-brand-teal hover:text-brand-tealHover transition-colors border-b border-brand-teal hover:border-brand-tealHover pb-1"
            >
              Have a logistical question?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Closing Booking Block */}
      <section className="bg-brand-teal text-brand-ivory py-32 px-6 lg:px-12 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[36px] md:text-[56px] leading-tight mb-8">
            Simplicity, convenience,<br/>and individualized care.
          </h2>
          <p className="text-lg text-brand-ivory/80 font-light leading-relaxed mb-12">
            Experience therapeutic luxury without the friction of travel.
          </p>
          <Link
            to="/book"
            className="bg-brand-ivory text-brand-teal hover:bg-white px-12 py-5 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors inline-block w-full sm:w-auto"
          >
            Book Your Session
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
