import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Check, Info } from 'lucide-react';
import { services, PENDING_BUSINESS_EMAIL, PROTOTYPE_CONTACT_NOTICE } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';
import { useAnnounce } from '../components/Announcer';
import { INSTAGRAM_URL } from '../data/schema';

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** Underline-style control shared by every field on this page. */
const control =
  'w-full bg-transparent border-b py-3 transition-colors text-brand-espresso placeholder:text-brand-espresso/30';

export function Contact() {
  usePageMeta(
    'Contact a Brooklyn Mobile Massage Therapist | The Living Axis',
    'Ask about mobile massage therapy in Brooklyn, greater New York City, Long Island, and select New Jersey locations.'
  );

  const announce = useAnnounce();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const next: ContactErrors = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!values.email.trim()) next.email = 'Enter an email address so a reply can reach you.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Enter a valid email address, for example name@example.com.';
    if (!values.message.trim()) next.message = 'Add a short message so we know what you need.';

    setErrors(next);

    const count = Object.keys(next).length;
    if (count > 0) {
      announce(`${count} ${count === 1 ? 'field needs' : 'fields need'} attention. ${Object.values(next).join(' ')}`);
      return;
    }

    setIsSubmitted(true);
    announce('Thank you. Your message has been received.');
  };

  /* Errors always carry an icon and text — never a border colour alone. */
  const ErrorText = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <p id={id} className="flex items-start gap-2 text-xs font-medium text-[#8C2F1F] pt-2">
      <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );

  const borderFor = (hasError: boolean) =>
    hasError ? 'border-[#8C2F1F] focus:border-[#8C2F1F]' : 'border-brand-espresso/20 focus:border-brand-teal';

  return (
    <div className="bg-brand-ivory min-h-screen pt-32 pb-0">
      <section className="px-6 lg:px-12 max-w-[1200px] mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Narrative & contact details */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex-1 lg:max-w-[400px]">
            <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-6 block">
              Questions are always welcome
            </span>
            <h1 className="font-display text-[56px] md:text-[64px] leading-tight text-brand-espresso mb-6">
              Tell me what you need.
            </h1>
            <p className="text-lg text-brand-espresso/70 font-light leading-relaxed mb-12">
              Whether you are unsure of the right service, live outside the standard Brooklyn area, or have a question
              about an upcoming appointment, describe what you are experiencing and we will guide you from there.
            </p>

            <div className="space-y-6 pt-10 border-t border-brand-teal/20">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-1">Email</p>
                {/* No business email has been confirmed by the client. Nothing
                    is invented here, and nothing is rendered as a mailto link. */}
                <p className="text-lg font-light text-brand-espresso/60 italic">{PENDING_BUSINESS_EMAIL}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-brand-teal mb-1">Instagram</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-light text-brand-espresso hover:text-brand-teal transition-colors"
                >
                  @TheLivingAxis
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } },
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
                  noValidate
                  className="bg-white border border-brand-teal/10 p-8 md:p-12 shadow-sm rounded-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={set('name')}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`${control} ${borderFor(!!errors.name)}`}
                      />
                      {errors.name && <ErrorText id="name-error">{errors.name}</ErrorText>}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={set('email')}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`${control} ${borderFor(!!errors.email)}`}
                      />
                      {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Phone Number{' '}
                        <span className="normal-case tracking-normal font-normal opacity-60">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        className={`${control} border-brand-espresso/20 focus:border-brand-teal`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="service"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Preferred Service{' '}
                        <span className="normal-case tracking-normal font-normal opacity-60">(Optional)</span>
                      </label>
                      <select
                        id="service"
                        className={`${control} border-brand-espresso/20 focus:border-brand-teal appearance-none rounded-none cursor-pointer`}
                      >
                        <option value="">I&rsquo;m not sure yet</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                        <option value="other">Other inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="datetime"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Preferred Date/Time{' '}
                        <span className="normal-case tracking-normal font-normal opacity-60">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="datetime"
                        placeholder="e.g. Next Tuesday morning"
                        className={`${control} border-brand-espresso/20 focus:border-brand-teal`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                      >
                        Borough / Neighbourhood{' '}
                        <span className="normal-case tracking-normal font-normal opacity-60">(Optional)</span>
                      </label>
                      {/* Area only — never a street address at enquiry stage. */}
                      <input
                        type="text"
                        id="location"
                        placeholder="e.g. Park Slope, 11215"
                        className={`${control} border-brand-espresso/20 focus:border-brand-teal`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-10">
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                    >
                      Message or Questions
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={values.message}
                      onChange={set('message')}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${control} ${borderFor(!!errors.message)} resize-none`}
                    />
                    {errors.message && <ErrorText id="message-error">{errors.message}</ErrorText>}
                  </div>

                  <div className="space-y-2 mb-10">
                    <label
                      htmlFor="referral"
                      className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70"
                    >
                      How did you hear about us?{' '}
                      <span className="normal-case tracking-normal font-normal opacity-60">(Optional)</span>
                    </label>
                    <select
                      id="referral"
                      className={`${control} border-brand-espresso/20 focus:border-brand-teal appearance-none rounded-none cursor-pointer`}
                    >
                      <option value="">Select an option</option>
                      <option value="friend">Friend / referral</option>
                      <option value="instagram">Instagram</option>
                      <option value="search">Search</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* This form is not wired to any delivery service. */}
                  <div className="border border-dashed border-brand-espresso/35 bg-brand-espresso/5 px-4 py-3 rounded-sm mb-8 flex gap-3">
                    <Info size={16} className="text-brand-espresso/70 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-xs text-brand-espresso/80 leading-relaxed">{PROTOTYPE_CONTACT_NOTICE}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-teal text-white hover:bg-brand-tealHover transition-colors py-5 text-sm font-semibold tracking-widest uppercase rounded-sm"
                  >
                    Send Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-brand-teal/10 p-12 lg:p-16 shadow-sm rounded-sm text-center flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full border border-brand-teal/20 flex items-center justify-center mx-auto mb-8">
                    <Check size={32} className="text-brand-teal" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-4xl text-brand-espresso mb-4">Thank you.</h2>
                  {/* No reply window is promised — the client has not confirmed one. */}
                  <p className="text-lg text-brand-espresso/70 font-light leading-relaxed max-w-sm mx-auto mb-10">
                    Your message has been received.
                  </p>

                  <div className="border border-brand-espresso/25 bg-brand-espresso/5 px-5 py-4 rounded-sm text-left flex gap-3 max-w-sm">
                    <Info size={18} className="text-brand-espresso/70 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-brand-espresso/80 leading-relaxed">{PROTOTYPE_CONTACT_NOTICE}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-24 md:py-32 px-6 lg:px-12 text-center border-t border-brand-teal/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
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
            className="inline-block bg-brand-teal text-brand-ivory hover:bg-brand-tealHover px-10 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            Book Your Session
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
