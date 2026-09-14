import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { services, specialtyServices } from '../data/content';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { usePageMeta } from '../hooks/usePageMeta';

export function Services() {
  usePageMeta(
    "Services & Pricing | The Living Axis",
    "Therapeutic care shaped around how you move, recover, and feel. Premium mobile massage services."
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      
      {/* Hero Section */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto mb-24 md:mb-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Therapeutic Care, Brought To You
          </span>
          <h1 className="font-display text-[48px] md:text-[64px] leading-[1.05] text-brand-espresso mb-8">
            Services shaped around how you move, recover, and feel.
          </h1>
          <p className="text-xl text-brand-espresso/70 font-light leading-relaxed max-w-2xl mb-8">
            Every session is adapted to the body in front of me. Start with what sounds closest — we can adjust from there.
          </p>
          <p className="text-sm font-display italic text-brand-espresso/50">
            Standard travel and professional mobile setup are included within the normal service area.
          </p>
        </motion.div>
      </section>

      {/* Core Services Section */}
      <section className="px-6 lg:px-12 max-w-[1200px] mx-auto mb-24 md:mb-32">
        <div className="flex flex-col gap-24 md:gap-32">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              id={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="scroll-mt-32"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6 md:mb-8 border-b border-brand-teal/20 pb-6">
                <div className="md:w-2/3">
                  <h2 className="font-display text-3xl md:text-5xl text-brand-teal mb-4">{service.title}</h2>
                  <p className="font-display italic text-xl md:text-2xl text-brand-espresso/80">"{service.hook}"</p>
                </div>
                <div className="mt-6 md:mt-0 text-left md:text-right flex flex-col gap-2 md:gap-3 shrink-0">
                  {service.durations.map((d, i) => (
                    <div key={i} className="flex items-center md:justify-end gap-4">
                      <span className="text-sm font-semibold uppercase tracking-wider text-brand-espresso/70">{d.minutes} Min</span>
                      <div className="hidden md:block w-8 h-px bg-brand-teal/20"></div>
                      <span className="font-display text-2xl md:text-3xl text-brand-teal">${d.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-7 lg:col-span-8">
                  <p className="text-brand-espresso/80 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="border-t border-brand-teal/10">
                    <button 
                      onClick={() => toggleDetails(service.id)}
                      className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
                    >
                      <span className="text-sm uppercase tracking-widest font-semibold text-brand-teal group-hover:text-brand-tealHover transition-colors">
                        Ideal For & Session Details
                      </span>
                      <span className="text-brand-teal group-hover:text-brand-tealHover transition-colors">
                        {expandedDetails[service.id] ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {expandedDetails[service.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 space-y-6">
                            <div>
                              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/50 mb-2">Ideal For</h4>
                              <p className="text-brand-espresso/80 leading-relaxed">{service.idealFor}</p>
                            </div>
                            <div>
                              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/50 mb-2">Session May Include</h4>
                              <p className="text-brand-espresso/80 leading-relaxed">{service.mayInclude}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="md:col-span-5 lg:col-span-4 flex items-end justify-start md:justify-end">
                  <Link 
                    to={`/book?service=${service.id}`}
                    className="w-full md:w-auto text-center py-4 px-10 bg-brand-ivory border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-ivory text-sm font-semibold uppercase tracking-widest transition-colors rounded-sm"
                  >
                    Book Session
                  </Link>
                </div>
              </div>

              {/* Interstitial Placeholders between some core services */}
              {index === 0 && (
                <div className="mt-24 w-full max-w-4xl mx-auto">
                  <ImagePlaceholder label="Neck & Shoulder Treatment Detail — 3:2 Photography Placeholder" aspectRatio="3:2" />
                </div>
              )}
              {index === 1 && (
                <div className="mt-24 w-full max-w-4xl mx-auto">
                  <ImagePlaceholder label="Prenatal Positioning — 3:2 Photography Placeholder (No Minors)" aspectRatio="3:2" />
                </div>
              )}
              {index === 2 && (
                <div className="mt-24 w-full max-w-4xl mx-auto">
                  <ImagePlaceholder label="Sports Recovery / Mobility — 3:2 Photography Placeholder" aspectRatio="3:2" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specialty Services Section */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-display text-[36px] md:text-[48px] text-brand-teal mb-4">Specialty Services & Add-Ons</h2>
            <p className="text-brand-espresso/70 text-lg max-w-2xl">
              Targeted treatments that can be booked standalone or seamlessly integrated into your core massage session.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {specialtyServices.map((specialty, i) => (
              <motion.div 
                key={specialty.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                }}
                className="bg-white/50 p-8 md:p-10 border border-brand-teal/10 flex flex-col h-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                  <h3 className="font-display text-2xl md:text-3xl text-brand-teal">{specialty.title}</h3>
                  <div className="flex flex-col gap-2 shrink-0">
                    {specialty.durations.map((d, idx) => (
                      <div key={idx} className="flex justify-between items-baseline gap-4 sm:justify-end text-sm">
                        {d.minutes > 0 && <span className="font-semibold uppercase tracking-wider text-brand-espresso/70">{d.minutes} Min</span>}
                        {d.price && <span className="font-display text-xl text-brand-teal">${d.price}</span>}
                        {d.addonPrice && (
                          <span className="font-display text-lg text-brand-teal/70 italic">
                            {d.price ? ` / +$${d.addonPrice} Add-on` : `+$${d.addonPrice} Add-on`}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-brand-espresso/80 leading-relaxed mb-10 flex-grow">
                  {specialty.description}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    to={`/book?service=${specialty.id}`}
                    className="block w-full text-center py-3 border border-brand-teal/20 text-brand-teal hover:border-brand-teal text-xs font-semibold uppercase tracking-widest transition-colors"
                  >
                    Select
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 w-full max-w-4xl mx-auto">
            <ImagePlaceholder label="Reflexology Detail — 3:2 Photography Placeholder" aspectRatio="3:2" />
          </div>
        </div>
      </section>

      {/* Important Information Before Booking */}
      <section className="py-24 px-6 lg:px-12 max-w-3xl mx-auto text-center border-t border-brand-teal/10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <h3 className="text-sm uppercase tracking-widest font-semibold text-brand-teal mb-6">Before You Book</h3>
          <div className="space-y-4 text-brand-espresso/70 leading-relaxed">
            <p>
              <strong>Travel & Setup:</strong> Standard travel and full professional setup are included for all primary Brooklyn locations. Extended travel to other boroughs, Long Island, or New Jersey may require a custom quote based on distance.
            </p>
            <p>
              <strong>Booking Deposit:</strong> A 50% deposit is required to secure your appointment time, collected safely during the checkout process.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Closing Booking Block */}
      <section className="bg-brand-teal text-brand-ivory py-24 md:py-32 px-6 lg:px-12 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[40px] md:text-[56px] leading-tight mb-10">
            Ready for your session?
          </h2>
          <Link
            to="/book"
            className="bg-brand-ivory text-brand-teal hover:bg-white px-10 py-5 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors inline-block w-full sm:w-auto"
          >
            Book Your Session
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
