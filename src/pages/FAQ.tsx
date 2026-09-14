import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export function FAQ() {
  usePageMeta(
    "FAQ & Policies | The Living Axis",
    "Clear boundaries, transparent operations, and everything you need to know before your mobile massage session."
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const confirmedFaqs = [
    {
      question: "Do you travel to clients?",
      answer: "Yes, The Living Axis is primarily a mobile massage service designed to bring care to your environment."
    },
    {
      question: "Is travel included?",
      answer: "Standard travel and mobile setup are fully included in all listed pricing for appointments within our normal service area. Extended travel outside this area may require a custom quote depending on location and distance."
    },
    {
      question: "Do I need to provide anything?",
      answer: "No, professional massage equipment, luxury linens, and all necessary supplies are brought to the appointment. You simply need to provide the space."
    },
    {
      question: "Which service should I choose?",
      answer: "If you are unsure where to begin, you can describe what you are experiencing when booking or contacting us, and we will gladly guide you toward the service that best fits your current needs."
    },
    {
      question: "Do you offer prenatal and postpartum massage?",
      answer: "Yes. We offer specialized prenatal and postpartum massage tailored to support you comfortably and safely during these phases."
    },
    {
      question: "Do you work with athletes and gym-goers?",
      answer: "Yes, focused sports and recovery-oriented massage services are available to support your training, mobility, and recovery."
    },
    {
      question: "Do you work with older adults?",
      answer: "Yes. Sessions for older adults are carefully adapted based on individual comfort, mobility, pressure preference, and specific therapeutic goals."
    },
    {
      question: "Do you work with children or teenagers?",
      answer: "Age-appropriate massage may be available when suitable. However, this is strictly provided only with the explicit consent and physical presence of a parent or legal guardian throughout the session, and in accordance with all applicable professional and business requirements."
    },
    {
      question: "What should I wear?",
      answer: "This can vary depending on the specific service you select and your personal comfort level. We ensure you are professionally draped at all times during your session."
    }
  ];

  const pendingFaqs = [
    "How much space do you exactly need?",
    "What if I live in a small apartment or a walk-up?",
    "Do I need to clean before you arrive?",
    "How long does setup take?",
    "Are you licensed and insured?",
    "Can I book for someone else as a gift?",
    "Do you offer back-to-back sessions in the same home?",
    "What forms of payment do you accept?",
    "What if I need to reschedule?",
    "Is there parking or building access I should arrange?"
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      
      {/* 1. Hero Section */}
      <section className="px-6 lg:px-12 max-w-[1000px] mx-auto mb-20 md:mb-24 text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
            Information & Clarity
          </span>
          <h1 className="font-display text-[56px] md:text-[80px] leading-[1] text-brand-espresso mb-8">
            Common Questions
          </h1>
          <p className="text-xl text-brand-espresso/70 font-light leading-relaxed max-w-2xl mx-auto">
            Clear boundaries, transparent operations, and everything you need to know before your session.
          </p>
        </motion.div>
      </section>

      {/* 2. Confirmed FAQs */}
      <section className="px-6 lg:px-12 max-w-[1000px] mx-auto mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="border-t border-brand-teal/20"
        >
          {confirmedFaqs.map((faq, index) => (
            <div key={index} className="border-b border-brand-teal/20">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 md:py-8 flex justify-between items-center text-left focus:outline-none focus:bg-brand-teal/5 transition-colors px-4 -mx-4 rounded-md group"
                aria-expanded={openFaqIndex === index}
              >
                <h3 className="text-xl md:text-2xl font-display text-brand-espresso pr-8 group-hover:text-brand-teal transition-colors">
                  {faq.question}
                </h3>
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
                    className="overflow-hidden px-4 -mx-4"
                  >
                    <p className="pb-8 text-lg text-brand-espresso/70 leading-relaxed pr-8 md:pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. Pending FAQs */}
      <section className="px-6 lg:px-12 max-w-[1000px] mx-auto mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <h2 className="text-sm uppercase tracking-widest font-semibold text-brand-teal mb-6">Additional Topics</h2>
          <div className="border-t border-brand-teal/10">
            {pendingFaqs.map((question, index) => (
              <div key={index} className="border-b border-brand-teal/10 py-6 md:py-8 flex justify-between items-start opacity-60">
                <h3 className="text-lg md:text-xl font-display text-brand-espresso pr-8">
                  {question}
                </h3>
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/40 shrink-0 mt-1 md:mt-2 text-right">
                  Answer Pending<br className="md:hidden" /> Client Confirmation
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Policies */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 border-t border-brand-teal/10">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 md:mb-20 text-center"
          >
            <h2 className="font-display text-[40px] md:text-[56px] text-brand-teal mb-6">
              Policies & Standards
            </h2>
            <div className="w-12 h-px bg-brand-eucalyptus mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl text-brand-teal mb-4">Deposit Policy</h3>
              <p className="text-brand-espresso/80 leading-relaxed">
                A 50% deposit is required to secure an appointment. Your appointment is not considered confirmed until the deposit has been received.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl text-brand-teal mb-4">Travel Policy</h3>
              <p className="text-brand-espresso/80 leading-relaxed">
                Standard travel and mobile setup are fully included in all listed rates within the normal service area. Extended travel outside the normal service area may require a custom quote.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl text-brand-teal mb-4">Cancellation & Rescheduling</h3>
              <p className="text-brand-espresso/50 italic leading-relaxed">
                [Final wording pending client approval]
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl text-brand-teal mb-4">Refund Policy</h3>
              <p className="text-brand-espresso/50 italic leading-relaxed">
                [Final wording pending client approval]
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="md:col-span-2 pt-8 mt-4 border-t border-brand-teal/10"
            >
              <h3 className="font-display text-2xl text-brand-teal mb-4">Professional Boundaries</h3>
              <p className="text-brand-espresso/80 leading-relaxed">
                The Living Axis provides professional therapeutic massage and wellness services only. All sessions are conducted in strict accordance with professional therapeutic standards and boundaries.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section className="bg-brand-teal text-brand-ivory py-24 md:py-32 px-6 lg:px-12 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[40px] md:text-[56px] leading-tight mb-8">
            Still have a question?
          </h2>
          <p className="text-lg text-brand-ivory/80 font-light leading-relaxed mb-12">
            Reach out directly, or go ahead and secure your time on the calendar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/book"
              className="bg-brand-ivory text-brand-teal hover:bg-white px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Book Your Session
            </Link>
            <Link
              to="/contact"
              className="border border-brand-ivory/30 hover:border-brand-ivory text-brand-ivory px-10 py-4 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
