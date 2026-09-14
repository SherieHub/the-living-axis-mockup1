import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Edit2, Info } from 'lucide-react';
import {
  services,
  specialtyServices,
  ADDRESS_PRIVACY_NOTICE,
  DEPOSIT_REASON,
  DEPOSIT_TERMS,
  INTAKE_NOTICE,
  PAYMENT_PENDING_NOTICE,
  PROTOTYPE_BOOKING_NOTICE,
  SAMPLE_AVAILABILITY_NOTICE,
} from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';
import { useAnnounce } from '../components/Announcer';
import { Field } from '../components/Field';

const TOTAL_STEPS = 4;

const STEP_TITLES: Record<number, string> = {
  1: 'Your Session',
  2: 'Date and Time',
  3: 'Your Details',
  4: 'Review and Confirm',
};

interface FormErrors {
  firstName?: string;
  email?: string;
  borough?: string;
  zip?: string;
}

export function Book() {
  usePageMeta(
    'Book a Mobile Massage in Brooklyn | The Living Axis',
    'Book mobile massage therapy in Brooklyn and greater New York City. Choose your service, duration, and time.'
  );

  const announce = useAnnounce();
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [step, setStep] = useState<number>(1);
  const [isConfirmed, setIsConfirmed] = useState(false);

  /* Step 1 — service */
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId || null);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState<number | null>(null);

  /* Step 2 — date and time */
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  /* Step 3 — contact, location and intake */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [borough, setBorough] = useState('');
  const [zip, setZip] = useState('');
  const [accessNote, setAccessNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  /* Step 3 — brief intake. Every field is optional by design. */
  const [intakeSupport, setIntakeSupport] = useState('');
  const [intakeFocus, setIntakeFocus] = useState('');
  const [intakePressure, setIntakePressure] = useState('');
  const [intakeNotes, setIntakeNotes] = useState('');

  /* Step 4 — add-ons and agreement */
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    if (initialServiceId) setSelectedDurationIndex(0);
  }, [initialServiceId]);

  /* Announce every step change through the app-wide live region. */
  useEffect(() => {
    if (isConfirmed) return;
    announce(`Step ${step} of ${TOTAL_STEPS}, ${STEP_TITLES[step]}`);
  }, [step, isConfirmed, announce]);

  /* Every standalone service is bookable on its own — including Scalp Therapy,
     Reflexology and Body Scrub, which also exist as add-ons. */
  const allBookableServices = useMemo(() => [...services, ...specialtyServices.filter((s) => s.standalone)], []);

  const selectedService = allBookableServices.find((s) => s.id === selectedServiceId);
  const selectedDurationObj =
    selectedService && selectedDurationIndex !== null ? selectedService.durations[selectedDurationIndex] : null;
  const basePrice = selectedDurationObj?.price || 0;

  /* Add-on offers, priced from the service data rather than hardcoded here.
     A service is never offered as an add-on to itself. */
  const addonOffers = useMemo(
    () =>
      specialtyServices
        .filter((s) => s.addonPrice !== undefined && s.id !== selectedServiceId)
        .map((s) => ({
          id: s.id,
          title: s.id === 'scalp-therapy' ? 'Scalp Therapy (20 min)' : s.title,
          price: s.addonPrice as number,
          desc: s.description,
        })),
    [selectedServiceId]
  );

  const getAddonPrice = (id: string) => addonOffers.find((a) => a.id === id)?.price ?? 0;

  const addonsTotal = selectedAddons.reduce((sum, id) => sum + getAddonPrice(id), 0);
  const orderTotal = basePrice + addonsTotal;
  const depositAmount = orderTotal / 2;
  const balanceDue = orderTotal - depositAmount;

  const handleSelectService = (id: string) => {
    if (selectedServiceId === id) return;
    setSelectedServiceId(id);
    setSelectedDurationIndex(0);
    setSelectedAddons([]);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]));
  };

  /* UI-demonstration slots only. No scheduling system is connected. */
  const availableDates = ['Today', 'Tomorrow', 'Thursday', 'Friday', 'Saturday'];
  const availableTimes = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

  const validateDetails = (): boolean => {
    const next: FormErrors = {};
    if (!firstName.trim()) next.firstName = 'Enter your first name so we know who to expect.';
    if (!email.trim()) next.email = 'Enter an email address so your appointment details can reach you.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Enter a valid email address, for example name@example.com.';
    if (!borough.trim()) next.borough = 'Enter your borough or neighbourhood.';
    if (!zip.trim()) next.zip = 'Enter your ZIP code.';
    else if (!/^\d{5}$/.test(zip.trim())) next.zip = 'Enter a 5-digit ZIP code.';

    setErrors(next);

    const count = Object.keys(next).length;
    if (count > 0) {
      announce(`${count} ${count === 1 ? 'field needs' : 'fields need'} attention. ${Object.values(next).join(' ')}`);
      return false;
    }
    return true;
  };

  const goToStep = (next: number) => setStep(next);

  /* =============================== CONFIRMATION =========================== */
  if (isConfirmed) {
    return (
      <div className="bg-brand-ivory min-h-screen flex flex-col justify-center py-20">
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
          <Link to="/" className="font-display font-semibold text-xl tracking-wide uppercase text-brand-espresso">
            The Living Axis
          </Link>
        </header>

        <div className="px-6 max-w-[600px] mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
            <div className="w-16 h-16 rounded-full border border-brand-teal/20 mx-auto flex items-center justify-center mb-8">
              <Check size={32} className="text-brand-teal" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-[44px] md:text-[56px] leading-tight text-brand-espresso mb-4">
              Your request is recorded.
            </h1>

            {/* PERMANENT prototype notice. This build schedules nothing and
                charges nothing — the screen must never suggest otherwise. */}
            <div className="border border-brand-espresso/25 bg-brand-espresso/5 px-5 py-4 rounded-sm mb-10 text-left flex gap-3">
              <Info size={18} className="text-brand-espresso/70 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-brand-espresso/80 leading-relaxed">{PROTOTYPE_BOOKING_NOTICE}</p>
            </div>

            <div className="bg-brand-teal/5 border border-brand-teal/10 p-6 text-left mb-12 rounded-sm text-sm">
              <h2 className="font-display text-xl text-brand-teal mb-1">{selectedService?.title}</h2>
              <p className="text-brand-espresso/70 uppercase tracking-widest font-semibold text-xs mb-4">
                {selectedDate} at {selectedTime}
              </p>
              <div className="h-px bg-brand-teal/10 w-full mb-4" />
              <p className="text-brand-espresso/80">
                Area: {[borough, zip].filter(Boolean).join(', ') || 'Not provided'}
              </p>
              <p className="text-brand-espresso/80">Client: {firstName || 'Client'}</p>
              <div className="mt-4 pt-4 border-t border-brand-teal/10">
                <p className="text-brand-espresso/60 italic">{ADDRESS_PRIVACY_NOTICE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <Link
                to="/contact"
                className="w-full py-4 border border-brand-teal/20 text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm"
              >
                Contact The Living Axis
              </Link>
              <Link
                to="/"
                className="w-full py-4 text-brand-espresso/50 hover:text-brand-espresso text-xs font-semibold uppercase tracking-widest transition-colors text-center mt-2"
              >
                Return Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ================================= FLOW ================================= */
  return (
    <div className="bg-brand-ivory min-h-screen pb-44">
      <header className="px-6 py-6 border-b border-brand-teal/10 flex items-center justify-between bg-brand-ivory sticky top-0 z-40">
        <button
          onClick={() => (step === 1 ? window.history.back() : goToStep(step - 1))}
          className="text-sm font-semibold uppercase tracking-widest text-brand-espresso/60 hover:text-brand-teal transition-colors flex items-center gap-2 rounded-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" /> <span className="hidden sm:inline">Back</span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="font-display font-semibold text-xl tracking-wide uppercase text-brand-espresso rounded-sm"
          >
            The Living Axis
          </Link>
        </div>
        <div className="w-20" />
      </header>

      <div className="px-6 pt-12 max-w-[600px] mx-auto">
        {/* ------------------------------- STEP 1 ------------------------- */}
        {step === 1 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-10">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                Step 1 of {TOTAL_STEPS} · {STEP_TITLES[1]}
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">
                Choose the care that fits today.
              </h1>
              <p className="text-lg text-brand-espresso/70 font-light leading-relaxed">
                Every session is adapted to the body in front of me. Start with what sounds closest — we can adjust from
                there.
              </p>
            </div>

            <fieldset className="mb-12">
              <legend className="visually-hidden">Choose a service</legend>
              <div className="flex flex-col gap-4">
                {allBookableServices.map((service, idx) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <motion.div
                      key={service.id}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { delay: idx * 0.05 } },
                      }}
                      className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? 'border-brand-teal bg-white shadow-sm'
                          : 'border-brand-teal/20 bg-white/40 hover:border-brand-teal/50'
                      }`}
                    >
                      {/* Selection is a real radio: its state is exposed to
                          assistive technology, and the filled checkmark carries
                          it visually so it never rests on border colour alone. */}
                      <label className="p-5 md:p-6 flex items-start gap-4 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          className="sr-only"
                          checked={isSelected}
                          onChange={() => handleSelectService(service.id)}
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-brand-teal bg-brand-teal text-white'
                              : 'border-brand-teal/30 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </span>
                        <span className="block">
                          <span
                            className={`block font-display text-2xl mb-1 ${
                              isSelected ? 'text-brand-teal' : 'text-brand-espresso'
                            }`}
                          >
                            {service.title}
                          </span>
                          {!isSelected && (
                            <span className="block text-brand-espresso/60 text-sm font-light mt-2">
                              {service.description}
                            </span>
                          )}
                        </span>
                      </label>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-brand-teal/10 bg-brand-teal/5"
                          >
                            <fieldset className="p-5 md:p-6 pl-14 md:pl-[4.5rem]">
                              <legend className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/50 mb-4">
                                Select duration
                              </legend>
                              <div className="flex flex-col gap-3">
                                {service.durations.map((d, dIdx) => {
                                  if (!d.price) return null;
                                  const isDurationSelected = selectedDurationIndex === dIdx;
                                  return (
                                    <button
                                      key={dIdx}
                                      type="button"
                                      aria-pressed={isDurationSelected}
                                      onClick={() => setSelectedDurationIndex(dIdx)}
                                      className={`w-full flex justify-between items-center gap-3 p-4 border rounded-sm transition-colors text-left ${
                                        isDurationSelected
                                          ? 'border-brand-teal bg-white shadow-sm'
                                          : 'border-brand-teal/20 bg-transparent hover:border-brand-teal/50'
                                      }`}
                                    >
                                      <span className="flex items-center gap-2">
                                        <span
                                          aria-hidden="true"
                                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                            isDurationSelected
                                              ? 'border-brand-teal bg-brand-teal text-white'
                                              : 'border-brand-espresso/30'
                                          }`}
                                        >
                                          {isDurationSelected && <Check size={10} strokeWidth={4} />}
                                        </span>
                                        <span
                                          className={`font-semibold uppercase tracking-wider text-sm ${
                                            isDurationSelected ? 'text-brand-teal' : 'text-brand-espresso/70'
                                          }`}
                                        >
                                          {d.minutes} Minutes
                                        </span>
                                      </span>
                                      <span
                                        className={`font-display text-xl ${
                                          isDurationSelected ? 'text-brand-teal' : 'text-brand-espresso'
                                        }`}
                                      >
                                        ${d.price}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </fieldset>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </fieldset>

            <div className="mb-12 space-y-6">
              <div className="bg-brand-teal/5 p-6 border border-brand-teal/10 text-brand-espresso/80 text-sm leading-relaxed">
                <h2 className="font-semibold uppercase tracking-widest text-xs mb-2 text-brand-teal">
                  Included in your session
                </h2>
                Standard travel and professional mobile setup are included within the normal Brooklyn service area.
              </div>
              {/* Deposit disclosure, surface 3 of 3 (Services page, FAQ, here). */}
              <div className="bg-brand-teal/5 p-6 border border-brand-teal/10 text-brand-espresso/80 text-sm leading-relaxed">
                <h2 className="font-semibold uppercase tracking-widest text-xs mb-2 text-brand-teal">
                  Securing your time
                </h2>
                <p className="italic mb-2">{DEPOSIT_REASON}</p>
                <p>{DEPOSIT_TERMS}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------- STEP 2 ------------------------- */}
        {step === 2 && selectedService && selectedDurationObj && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-8">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                Step 2 of {TOTAL_STEPS} · {STEP_TITLES[2]}
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">When works for you?</h1>
            </div>

            <div className="bg-white border border-brand-teal/20 p-5 rounded-sm mb-10 flex justify-between items-center gap-4">
              <div>
                <h2 className="font-display text-xl text-brand-teal">{selectedService.title}</h2>
                <p className="text-brand-espresso/70 text-sm font-semibold tracking-wider uppercase mt-1">
                  {selectedDurationObj.minutes} Minutes · ${selectedDurationObj.price}
                </p>
              </div>
              <button
                onClick={() => goToStep(1)}
                className="text-brand-teal/60 hover:text-brand-teal transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-semibold p-2 rounded-sm"
              >
                <Edit2 size={14} aria-hidden="true" /> Edit
              </button>
            </div>

            {/* Availability is illustrative. Nothing here queries a calendar. */}
            <div className="border border-brand-espresso/25 bg-brand-espresso/5 px-5 py-4 rounded-sm mb-8 flex gap-3">
              <Info size={18} className="text-brand-espresso/70 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-brand-espresso/80 leading-relaxed">{SAMPLE_AVAILABILITY_NOTICE}</p>
            </div>

            <fieldset className="mb-10">
              <legend className="flex items-center gap-2 mb-4 font-display text-2xl text-brand-espresso">
                <CalendarIcon size={18} className="text-brand-teal" aria-hidden="true" />
                Select a date
              </legend>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {availableDates.map((date) => {
                  const active = selectedDate === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedDate(date)}
                      className={`py-4 px-2 border rounded-sm text-sm font-semibold transition-colors flex flex-col items-center gap-1 ${
                        active
                          ? 'bg-brand-teal border-brand-teal text-white shadow-sm'
                          : 'bg-white/50 border-brand-teal/20 text-brand-espresso hover:border-brand-teal/50'
                      }`}
                    >
                      {active && <Check size={14} strokeWidth={3} aria-hidden="true" />}
                      {date}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {selectedDate && (
              <motion.fieldset initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                <legend className="flex items-center gap-2 mb-4 font-display text-2xl text-brand-espresso">
                  <Clock size={18} className="text-brand-teal" aria-hidden="true" />
                  Select a time
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimes.map((time) => {
                    const active = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 border rounded-sm text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                          active
                            ? 'bg-brand-teal border-brand-teal text-white shadow-sm'
                            : 'bg-white/50 border-brand-teal/20 text-brand-espresso hover:border-brand-teal/50'
                        }`}
                      >
                        {active && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                        {time}
                      </button>
                    );
                  })}
                </div>
              </motion.fieldset>
            )}
          </motion.div>
        )}

        {/* ------------------------------- STEP 3 ------------------------- */}
        {step === 3 && selectedService && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-8">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                Step 3 of {TOTAL_STEPS} · {STEP_TITLES[3]}
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">A little about you.</h1>
            </div>

            <div className="space-y-6 mb-12">
              <h2 className="flex items-center gap-2 font-display text-2xl text-brand-espresso">
                <MapPin size={18} className="text-brand-teal" aria-hidden="true" />
                Contact &amp; area
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field id="firstName" label="First Name" error={errors.firstName}>
                  {(p) => (
                    <input
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
                <Field id="lastName" label="Last Name" optional>
                  {(p) => (
                    <input
                      type="text"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field id="email" label="Email Address" error={errors.email}>
                  {(p) => (
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
                <Field id="phone" label="Phone Number" optional>
                  {(p) => (
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
              </div>

              {/*
                ADDRESS COLLECTION — borough/neighbourhood + ZIP only.
                No street address or apartment number is requested before the
                deposit step. This is a privacy guardrail from the client brief:
                a visitor who has not yet committed should not have to hand over
                exactly where they live.
              */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field id="borough" label="Borough / Neighbourhood" error={errors.borough}>
                  {(p) => (
                    <input
                      type="text"
                      placeholder="e.g. Park Slope, Brooklyn"
                      value={borough}
                      onChange={(e) => setBorough(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
                <Field id="zip" label="ZIP Code" error={errors.zip}>
                  {(p) => (
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="e.g. 11215"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      {...p}
                    />
                  )}
                </Field>
              </div>

              <Field id="accessNote" label="Building or access note" optional hint={ADDRESS_PRIVACY_NOTICE}>
                {(p) => (
                  <textarea
                    rows={2}
                    placeholder="e.g. walk-up, buzzer at the gate, park on the side street"
                    value={accessNote}
                    onChange={(e) => setAccessNote(e.target.value)}
                    {...p}
                    className={`${p.className} resize-none`}
                  />
                )}
              </Field>
            </div>

            {/*
              BRIEF INTAKE — sits immediately before the review/deposit step.
              Every field is optional. This is deliberately NOT a medical form:
              it collects preference and context, never a diagnosis.
            */}
            <div className="space-y-6 mb-12 border-t border-brand-teal/15 pt-10">
              <div>
                <h2 className="font-display text-2xl text-brand-espresso mb-2">A brief intake</h2>
                <p className="text-sm text-brand-espresso/70 leading-relaxed">{INTAKE_NOTICE}</p>
              </div>

              <Field id="intakeSupport" label="What would you like support with today?" optional>
                {(p) => (
                  <textarea
                    rows={2}
                    value={intakeSupport}
                    onChange={(e) => setIntakeSupport(e.target.value)}
                    {...p}
                    className={`${p.className} resize-none`}
                  />
                )}
              </Field>

              <Field id="intakeFocus" label="Areas of focus" optional>
                {(p) => (
                  <input
                    type="text"
                    placeholder="e.g. lower back, shoulders, calves"
                    value={intakeFocus}
                    onChange={(e) => setIntakeFocus(e.target.value)}
                    {...p}
                  />
                )}
              </Field>

              <Field id="intakePressure" label="Pressure preference" optional>
                {(p) => (
                  <select value={intakePressure} onChange={(e) => setIntakePressure(e.target.value)} {...p}>
                    <option value="">No preference</option>
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="firm">Firm</option>
                    <option value="deep">Deep</option>
                    <option value="discuss">I&rsquo;d rather discuss it</option>
                  </select>
                )}
              </Field>

              <Field id="intakeNotes" label="Anything I should know (sensitivities, injuries, conditions)" optional>
                {(p) => (
                  <textarea
                    rows={3}
                    value={intakeNotes}
                    onChange={(e) => setIntakeNotes(e.target.value)}
                    {...p}
                    className={`${p.className} resize-none`}
                  />
                )}
              </Field>
            </div>
          </motion.div>
        )}

        {/* ------------------------------- STEP 4 ------------------------- */}
        {step === 4 && selectedService && selectedDurationObj && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-8">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                Step 4 of {TOTAL_STEPS} · {STEP_TITLES[4]}
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">Review &amp; confirm</h1>
            </div>

            <div className="bg-white border border-brand-teal/20 p-6 md:p-8 rounded-sm mb-10">
              <div className="flex justify-between items-start gap-4 mb-6 border-b border-brand-teal/10 pb-6">
                <div>
                  <h2 className="font-display text-2xl text-brand-teal mb-1">{selectedService.title}</h2>
                  <p className="text-brand-espresso/70 text-sm font-semibold tracking-wider uppercase">
                    {selectedDurationObj.minutes} Minutes
                  </p>
                </div>
                <button
                  onClick={() => goToStep(1)}
                  className="text-brand-teal/60 hover:text-brand-teal text-xs uppercase font-semibold flex items-center gap-1 rounded-sm shrink-0"
                >
                  <Edit2 size={12} aria-hidden="true" /> Edit
                </button>
              </div>

              <div className="flex justify-between items-start gap-4 mb-6 border-b border-brand-teal/10 pb-6">
                <div className="space-y-2">
                  <p className="text-brand-espresso/80 text-sm">
                    <strong>Date:</strong> {selectedDate}
                  </p>
                  <p className="text-brand-espresso/80 text-sm">
                    <strong>Time:</strong> {selectedTime}
                  </p>
                  <p className="text-brand-espresso/80 text-sm">
                    <strong>Area:</strong> {[borough, zip].filter(Boolean).join(', ') || 'Not provided'}
                  </p>
                  <p className="text-brand-espresso/80 text-sm">
                    <strong>Client:</strong> {firstName || 'Client'} ({email || 'No email'})
                  </p>
                </div>
                <button
                  onClick={() => goToStep(3)}
                  className="text-brand-teal/60 hover:text-brand-teal text-xs uppercase font-semibold flex items-center gap-1 rounded-sm shrink-0"
                >
                  <Edit2 size={12} aria-hidden="true" /> Edit
                </button>
              </div>

              <div className="space-y-3 mb-6 border-b border-brand-teal/10 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-espresso/80">Service base</span>
                  <span className="text-brand-espresso">${basePrice}</span>
                </div>
                {selectedAddons.map((id) => {
                  const addon = addonOffers.find((a) => a.id === id);
                  return addon ? (
                    <div key={id} className="flex justify-between text-sm text-brand-espresso/70">
                      <span>{addon.title}</span>
                      <span>${addon.price}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between text-sm text-brand-espresso/70">
                  <span>Standard travel &amp; setup</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between font-semibold text-lg text-brand-espresso">
                  <span>Total</span>
                  <span>${orderTotal}</span>
                </div>
                <div className="flex justify-between font-display text-2xl text-brand-teal pt-2 border-t border-brand-teal/10">
                  <span>Deposit</span>
                  <span>${depositAmount}</span>
                </div>
                <p className="text-xs text-brand-espresso/60 text-right">Remaining ${balanceDue} due at your session</p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-sm uppercase tracking-widest font-semibold text-brand-espresso/70 mb-4">
                Optional enhancements
              </h2>
              <div className="space-y-3">
                {addonOffers.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-brand-teal bg-brand-teal/5'
                          : 'border-brand-teal/20 hover:border-brand-teal/50'
                      }`}
                    >
                      <span className="pt-1">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                        />
                        <span
                          aria-hidden="true"
                          className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                            isChecked ? 'border-brand-teal bg-brand-teal' : 'border-brand-espresso/30'
                          }`}
                        >
                          {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                        </span>
                      </span>
                      <span className="flex-grow">
                        <span className="flex justify-between gap-3">
                          <span
                            className={`font-semibold text-sm ${isChecked ? 'text-brand-teal' : 'text-brand-espresso'}`}
                          >
                            {addon.title}
                          </span>
                          <span className="text-sm font-semibold text-brand-espresso/70">+${addon.price}</span>
                        </span>
                        <span className="block text-xs text-brand-espresso/60 mt-1">{addon.desc}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Deposit disclosure, immediately before the payment area. */}
            <div className="bg-brand-teal/5 p-6 border border-brand-teal/10 text-brand-espresso/80 text-sm leading-relaxed mb-8">
              <p className="italic mb-2">{DEPOSIT_REASON}</p>
              <p>{DEPOSIT_TERMS}</p>
            </div>

            {/*
              ================= PAYMENT INTEGRATION POINT =================
              No payment provider is connected to this build.

              This area is an obviously labelled placeholder ON PURPOSE. It must
              NOT render a card form that looks live, and must NOT show a
              processing spinner that implies a charge has been attempted.

              WHEN A PROVIDER IS SELECTED (Stripe, Square, a booking platform's
              own checkout, …), replace this block with that provider's element,
              and change the primary action label below from
 "Confirm Appointment" to "Confirm Appointment & Pay Deposit".
              ==============================================================
            */}
            <div className="border border-dashed border-brand-espresso/35 bg-brand-espresso/5 p-6 rounded-sm mb-10">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/70 mb-3">
                Deposit payment
              </h2>
              <div className="flex gap-3">
                <Info size={18} className="text-brand-espresso/70 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-brand-espresso/80 leading-relaxed font-medium">{PAYMENT_PENDING_NOTICE}</p>
                  <p className="text-sm text-brand-espresso/60 leading-relaxed mt-2">
                    Once a platform is chosen, its secure checkout appears here and the ${depositAmount} deposit is
                    taken at this step.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <label className="flex items-start gap-4 cursor-pointer group">
                <span className="pt-1 shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={agreedToPolicies}
                    onChange={(e) => setAgreedToPolicies(e.target.checked)}
                  />
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                      agreedToPolicies
                        ? 'border-brand-teal bg-brand-teal'
                        : 'border-brand-espresso/30 group-hover:border-brand-teal/50'
                    }`}
                  >
                    {agreedToPolicies && <Check size={12} className="text-white" strokeWidth={3} />}
                  </span>
                </span>
                <span className="text-xs text-brand-espresso/70 leading-relaxed select-none">
                  I understand that {DEPOSIT_TERMS.charAt(0).toLowerCase() + DEPOSIT_TERMS.slice(1)} Cancellation and
                  refund terms are <span className="text-brand-teal font-semibold">pending client confirmation</span>{' '}
                  and will be shared before any appointment is held.
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </div>

      {/* --------------------------- ACTION BAR --------------------------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-ivory border-t border-brand-teal/10 p-4 md:p-6 shadow-[0_-10px_40px_rgba(246,241,231,0.9)] z-40">
        <div className="max-w-[600px] mx-auto flex items-center justify-between gap-4">
          <p className="hidden sm:block text-sm font-semibold uppercase tracking-widest text-brand-espresso/50">
            Step {step} of {TOTAL_STEPS}
          </p>

          {step === 1 && (
            <button
              disabled={!selectedServiceId || selectedDurationIndex === null}
              onClick={() => goToStep(2)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors ${
                selectedServiceId && selectedDurationIndex !== null
                  ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md'
                  : 'bg-brand-teal/10 text-brand-teal/50 cursor-not-allowed'
              }`}
            >
              Continue to date &amp; time
            </button>
          )}

          {step === 2 && (
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => goToStep(3)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors ${
                selectedDate && selectedTime
                  ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md'
                  : 'bg-brand-teal/10 text-brand-teal/50 cursor-not-allowed'
              }`}
            >
              Continue to your details
            </button>
          )}

          {step === 3 && (
            <button
              onClick={() => {
                if (validateDetails()) goToStep(4);
              }}
              className="w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors bg-brand-teal text-white hover:bg-brand-tealHover shadow-md"
            >
              Review booking
            </button>
          )}

          {step === 4 && (
            /* Label stays "Confirm Appointment" while no payment provider is
               connected. It becomes "Confirm Appointment & Pay Deposit" only
               once the integration point above is wired to a real provider. */
            <button
              disabled={!agreedToPolicies}
              onClick={() => setIsConfirmed(true)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors ${
                agreedToPolicies
                  ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md'
                  : 'bg-brand-teal/10 text-brand-teal/50 cursor-not-allowed'
              }`}
            >
              Confirm Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
