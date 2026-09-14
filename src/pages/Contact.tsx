import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { services } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

export function Contact() {
  usePageMeta(
    "Contact | The Living Axis",
    "Questions are always welcome. Tell me what you need."
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      
      {/* 1. Split Editorial Hero & Form */}
      <section className="px-6 lg:px-12 max-w-[1200px] mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Narrative & Info */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex-1 lg:max-w-[400px]"
          >
            <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
              QUESTIONS ARE ALWAYS WELCOME
            </span>
            <h1 className="font-display text-[56px] md:text-[64px] leading-tight text-brand-espresso mb-6">
              Tell me what you need.
            </h1>
            <p className="text-lg text-brand-espresso/70 font-light leading-relaxed mb-12">
              Whether you are unsure of the right service, live outside our standard Brooklyn area, or have a specific question about an upcoming appointment, thoughtful communication is always welcome. Describe what you are experiencing, and we will guide you from there.
            </p>
            
            <div className="space-y-6 pt-10 border-t border-brand-teal/20">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-1">Email</p>
                <a href="mailto:hello@thelivingaxis.com" className="text-lg font-light text-brand-espresso hover:text-brand-teal transition-colors">
                  [Business Email Pending]
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-1">Instagram</p>
                <a href="https://instagram.com/TheLivingAxis" target="_blank" rel="noreferrer" className="text-lg font-light text-brand-espresso hover:text-brand-teal transition-colors">
                  @TheLivingAxis
                </a>
              </div>
              {/* Optional Phone Placeholder for future use */}
              {/* <div className="opacity-0 hidden pointer-events-none">
                <p className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-1">Phone</p>
                <p className="text-lg font-light text-brand-espresso">[Business Phone Pending]</p>
              </div> */}
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } }
            }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="bg-white border border-brand-teal/10 p-8 md:p-12 shadow-sm rounded-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Name</label>
                      <input required type="text" id="name" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Email Address</label>
                      <input required type="email" id="email" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Phone Number</label>
                      <input type="tel" id="phone" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Preferred Service</label>
                      <select id="service" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso appearance-none rounded-none cursor-pointer">
                        <option value="">I'm not sure yet</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label htmlFor="datetime" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Preferred Date/Time</label>
                      <input type="text" id="datetime" placeholder="e.g. Next Tuesday morning" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso placeholder:text-brand-espresso/30" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">General Location</label>
                      <input type="text" id="location" placeholder="e.g. Park Slope, 11215" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso placeholder:text-brand-espresso/30" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-10">
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Message or Questions</label>
                    <textarea required id="message" rows={4} className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso resize-none"></textarea>
                  </div>

                  <div className="space-y-2 mb-12">
                    <label htmlFor="referral" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">How did you hear about us? (Optional)</label>
                    <select id="referral" className="w-full bg-transparent border-b border-brand-espresso/20 py-3 focus:outline-none focus:border-brand-teal transition-colors text-brand-espresso appearance-none rounded-none cursor-pointer">
                      <option value="">Select an option</option>
                      <option value="friend">Friend / Referral</option>
                      <option value="instagram">Instagram</option>
                      <option value="search">Google Search</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-teal text-white hover:bg-brand-tealHover transition-colors py-5 text-sm font-semibold tracking-widest uppercase rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
                  >
                    Send Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-brand-teal/10 p-12 lg:p-20 shadow-sm rounded-sm text-center flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full border border-brand-teal/20 flex items-center justify-center mx-auto mb-8">
                    <Check size={32} className="text-brand-teal" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-4xl text-brand-espresso mb-4">
                    Thank you.
                  </h2>
                  <p className="text-lg text-brand-espresso/70 font-light leading-relaxed max-w-sm mx-auto">
                    Your message has been safely received. We will review your details and be in touch soon to assist you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 2. Ready to Book CTA */}
      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 text-center border-t border-brand-teal/10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-[40px] md:text-[56px] leading-tight text-brand-espresso mb-8">
            Ready to secure your time?
          </h2>
          <p className="text-lg text-brand-espresso/70 font-light leading-relaxed mb-12">
            If you already know the care you need, you can browse available times and secure your session directly.
          </p>
          <Link
            to="/book"
            className="inline-block bg-brand-teal text-brand-ivory hover:bg-brand-tealHover px-10 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-ivory"
          >
            Book Your Session
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
