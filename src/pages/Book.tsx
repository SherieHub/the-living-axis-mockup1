import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Edit2 } from 'lucide-react';
import { services, specialtyServices } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

export function Book() {
  usePageMeta(
    "Book Your Session | The Living Axis",
    "Secure your mobile massage therapy session. Choose the care that fits today."
  );

  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [step, setStep] = useState<number>(1);

  // Step 1 State
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId || null);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState<number | null>(null);

  // Step 2 State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [locationStr, setLocationStr] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Step 3 State
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [agreedToPolicies, setAgreedToPolicies] = useState<boolean>(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    if (initialServiceId) {
      setSelectedDurationIndex(0);
    }
  }, [initialServiceId]);

  const handleSelectService = (id: string) => {
    if (selectedServiceId === id) return;
    setSelectedServiceId(id);
    setSelectedDurationIndex(0);
    setSelectedAddons([]); // reset add-ons when service changes
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const allBookableServices = [
    ...services,
    ...specialtyServices.filter(s => s.durations.some(d => d.price !== undefined))
  ];

  const selectedService = allBookableServices.find(s => s.id === selectedServiceId);
  const selectedDurationObj = selectedService && selectedDurationIndex !== null ? selectedService.durations[selectedDurationIndex] : null;
  const basePrice = selectedDurationObj?.price || 0;

  // Calculate Add-ons
  const scalpTherapy = specialtyServices.find(s => s.id === 'scalp-therapy');
  const bodyScrub = specialtyServices.find(s => s.id === 'body-scrub');
  const cbd = specialtyServices.find(s => s.id === 'cbd-relief');

  // Hardcode add-on prices for simplicity in step 3
  const getAddonPrice = (id: string) => {
    if (id === 'cbd-relief') return 20;
    if (id === 'body-scrub') return 55;
    if (id === 'scalp-therapy') return 30; // Assuming 20 min add-on
    return 0;
  };

  const addonsTotal = selectedAddons.reduce((sum, addonId) => sum + getAddonPrice(addonId), 0);
  const orderTotal = basePrice + addonsTotal;
  const depositAmount = orderTotal / 2;
  const balanceDue = orderTotal - depositAmount;

  // Mock Dates & Times
  const availableDates = ["Today", "Tomorrow", "Thursday", "Friday", "Saturday"];
  const availableTimes = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  // Step 4 (Success) specific styling overrides main padding
  if (step === 4) {
    return (
      <div className="bg-brand-ivory min-h-screen flex flex-col justify-center py-20">
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
          <Link to="/" className="font-display font-semibold text-xl tracking-wide uppercase text-brand-espresso">
            The Living Axis
          </Link>
        </header>

        <main className="px-6 max-w-[600px] mx-auto w-full">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full border border-brand-teal/20 mx-auto flex items-center justify-center mb-8">
              <Check size={32} className="text-brand-teal" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-[48px] md:text-[56px] leading-tight text-brand-espresso mb-4">
              Your session is confirmed.
            </h1>
            <p className="text-lg text-brand-espresso/70 font-light leading-relaxed mb-12 max-w-md mx-auto">
              We look forward to bringing therapeutic care to you. Confirmation and preparation information have been sent to {email || 'your email'}.
            </p>

            <div className="bg-brand-teal/5 border border-brand-teal/10 p-6 text-left mb-12 rounded-sm text-sm">
              <h3 className="font-display text-xl text-brand-teal mb-1">{selectedService?.title}</h3>
              <p className="text-brand-espresso/70 uppercase tracking-widest font-semibold text-xs mb-4">
                {selectedDate} at {selectedTime}
              </p>
              <div className="h-px bg-brand-teal/10 w-full mb-4"></div>
              <p className="text-brand-espresso/80">Location: {locationStr || 'Brooklyn'}</p>
              <p className="text-brand-espresso/80">Client: {firstName || 'Client'}</p>
              <div className="mt-4 pt-4 border-t border-brand-teal/10">
                <p className="text-brand-espresso/60 italic">Standard mobile setup and travel within our normal area are included. Specific operational and setup details will be confirmed via email.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <button className="w-full py-4 border border-brand-teal/20 text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm">
                View Appointment Details
              </button>
              <Link to="/contact" className="w-full py-4 border border-brand-teal/20 text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm">
                Contact The Living Axis
              </Link>
              <Link to="/" className="w-full py-4 text-brand-espresso/50 hover:text-brand-espresso text-xs font-semibold uppercase tracking-widest transition-colors text-center mt-2">
                Return Home
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen pb-40">
      
      <header className="px-6 py-6 border-b border-brand-teal/10 flex items-center justify-between bg-brand-ivory sticky top-0 z-40">
        <button 
          onClick={() => step === 1 ? window.history.back() : setStep(step - 1)}
          className="text-sm font-semibold uppercase tracking-widest text-brand-espresso/60 hover:text-brand-teal transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm"
        >
          <ArrowLeft size={16} /> <span className="hidden sm:inline">{step === 1 ? 'Back' : 'Back'}</span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="font-display font-semibold text-xl tracking-wide uppercase text-brand-espresso focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm">
            The Living Axis
          </Link>
        </div>
        <div className="w-20"></div>
      </header>

      <main className="px-6 pt-12 max-w-[600px] mx-auto">
        
        {step === 1 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-10">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                1 of 3 · Your Session
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">
                Choose the care that fits today.
              </h1>
              <p className="text-lg text-brand-espresso/70 font-light leading-relaxed">
                Every session is adapted to the body in front of me. Start with what sounds closest — we can adjust from there.
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              {allBookableServices.map((service, idx) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <motion.div 
                    key={service.id}
                    initial="hidden" animate="visible"
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.05 } } }}
                    className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                      isSelected ? 'border-brand-teal bg-white shadow-sm' : 'border-brand-teal/20 bg-white/40 hover:border-brand-teal/50 cursor-pointer'
                    }`}
                    onClick={() => handleSelectService(service.id)}
                  >
                    <div className="p-5 md:p-6 flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-brand-teal bg-brand-teal text-white' : 'border-brand-teal/30 bg-transparent'
                      }`}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <h3 className={`font-display text-2xl mb-1 ${isSelected ? 'text-brand-teal' : 'text-brand-espresso'}`}>
                          {service.title}
                        </h3>
                        <AnimatePresence initial={false}>
                          {!isSelected && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                              <p className="text-brand-espresso/60 text-sm font-light mt-2 line-clamp-2">{service.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-brand-teal/10 bg-brand-teal/5">
                          <div className="p-5 md:p-6 pl-14 md:pl-[4.5rem]">
                            <p className="text-xs uppercase tracking-widest font-semibold text-brand-espresso/50 mb-4">Select Duration</p>
                            <div className="flex flex-col gap-3">
                              {service.durations.map((d, dIdx) => {
                                if (!d.price) return null;
                                const isDurationSelected = selectedDurationIndex === dIdx;
                                return (
                                  <button
                                    key={dIdx}
                                    onClick={(e) => { e.stopPropagation(); setSelectedDurationIndex(dIdx); }}
                                    className={`w-full flex justify-between items-center p-4 border rounded-sm transition-colors text-left focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                                      isDurationSelected ? 'border-brand-teal bg-white shadow-sm' : 'border-brand-teal/20 bg-transparent hover:border-brand-teal/50'
                                    }`}
                                  >
                                    <span className={`font-semibold uppercase tracking-wider text-sm ${isDurationSelected ? 'text-brand-teal' : 'text-brand-espresso/70'}`}>{d.minutes} Minutes</span>
                                    <span className={`font-display text-xl ${isDurationSelected ? 'text-brand-teal' : 'text-brand-espresso'}`}>${d.price}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="mb-12 space-y-6">
              <div className="bg-brand-teal/5 p-6 border border-brand-teal/10 text-brand-espresso/80 text-sm leading-relaxed">
                <h4 className="font-semibold uppercase tracking-widest text-xs mb-2 text-brand-teal">Included in your session</h4>
                Standard travel time and full professional mobile setup are fully included within our normal Brooklyn service area.
              </div>
              <div className="bg-brand-teal/5 p-6 border border-brand-teal/10 text-brand-espresso/80 text-sm leading-relaxed">
                <h4 className="font-semibold uppercase tracking-widest text-xs mb-2 text-brand-teal">Securing your time</h4>
                A 50% deposit confirms your appointment. Each appointment is personally reserved and traveled to, so the deposit secures your dedicated time. The remaining balance is simply due at your session.
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedService && selectedDurationObj && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-8">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                2 of 3 · Appointment Details
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">
                When and where?
              </h1>
            </div>

            <div className="bg-white border border-brand-teal/20 p-5 rounded-sm mb-12 flex justify-between items-center">
              <div>
                <h3 className="font-display text-xl text-brand-teal">{selectedService.title}</h3>
                <p className="text-brand-espresso/70 text-sm font-semibold tracking-wider uppercase mt-1">
                  {selectedDurationObj.minutes} Minutes · ${selectedDurationObj.price}
                </p>
              </div>
              <button onClick={() => setStep(1)} className="text-brand-teal/60 hover:text-brand-teal transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-semibold p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-teal">
                <Edit2 size={14} /> Edit
              </button>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon size={18} className="text-brand-teal" />
                <h2 className="font-display text-2xl text-brand-espresso">Select a Date</h2>
              </div>
              <p className="text-xs uppercase tracking-widest text-brand-espresso/40 font-semibold mb-4">Functional Scheduler Placeholder</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`py-4 px-2 border rounded-sm text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                      selectedDate === date ? 'bg-brand-teal border-brand-teal text-white shadow-sm' : 'bg-white/50 border-brand-teal/20 text-brand-espresso hover:border-brand-teal/50'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-brand-teal" />
                    <h2 className="font-display text-2xl text-brand-espresso">Select a Time</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 border rounded-sm text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                          selectedTime === time ? 'bg-brand-teal border-brand-teal text-white shadow-sm' : 'bg-white/50 border-brand-teal/20 text-brand-espresso hover:border-brand-teal/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={18} className="text-brand-teal" />
                <h2 className="font-display text-2xl text-brand-espresso">Your Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">First Name</label>
                  <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Last Name</label>
                  <input type="text" id="lastName" className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Email Address</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Phone Number</label>
                  <input type="tel" id="phone" className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Neighborhood or ZIP Code</label>
                <input type="text" id="location" value={locationStr} onChange={e => setLocationStr(e.target.value)} placeholder="e.g. Park Slope, 11215" className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso placeholder:text-brand-espresso/30" />
                <p className="text-xs text-brand-espresso/50 font-light mt-1">Full address required at confirmed booking step.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">Any immediate notes? (Optional)</label>
                <textarea id="notes" rows={2} className="w-full bg-white border border-brand-teal/20 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-brand-espresso resize-none"></textarea>
                <p className="text-xs text-brand-espresso/50 font-light mt-1">A detailed health intake form will be sent to you securely after booking.</p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && selectedService && selectedDurationObj && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full">
            <div className="text-center mb-8">
              <span className="text-brand-teal uppercase tracking-widest text-xs font-semibold mb-4 block">
                3 of 3 · Review Your Session
              </span>
              <h1 className="font-display text-[40px] leading-tight text-brand-espresso mb-4">
                Review & Confirm
              </h1>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-brand-teal/20 p-6 md:p-8 rounded-sm mb-10">
              <div className="flex justify-between items-start mb-6 border-b border-brand-teal/10 pb-6">
                <div>
                  <h3 className="font-display text-2xl text-brand-teal mb-1">{selectedService.title}</h3>
                  <p className="text-brand-espresso/70 text-sm font-semibold tracking-wider uppercase">
                    {selectedDurationObj.minutes} Minutes
                  </p>
                </div>
                <button onClick={() => setStep(1)} className="text-brand-teal/60 hover:text-brand-teal text-xs uppercase font-semibold flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm">
                  <Edit2 size={12} /> Edit
                </button>
              </div>

              <div className="flex justify-between items-start mb-6 border-b border-brand-teal/10 pb-6">
                <div className="space-y-2">
                  <p className="text-brand-espresso/80 text-sm"><strong>Date:</strong> {selectedDate}</p>
                  <p className="text-brand-espresso/80 text-sm"><strong>Time:</strong> {selectedTime}</p>
                  <p className="text-brand-espresso/80 text-sm"><strong>Location:</strong> {locationStr || 'Not provided'}</p>
                  <p className="text-brand-espresso/80 text-sm"><strong>Client:</strong> {firstName || 'Client'} ({email || 'No email'})</p>
                </div>
                <button onClick={() => setStep(2)} className="text-brand-teal/60 hover:text-brand-teal text-xs uppercase font-semibold flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm">
                  <Edit2 size={12} /> Edit
                </button>
              </div>

              <div className="space-y-3 mb-6 border-b border-brand-teal/10 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-espresso/80">Service Base</span>
                  <span className="text-brand-espresso">${basePrice}</span>
                </div>
                {selectedAddons.map(id => {
                  const addon = [scalpTherapy, bodyScrub, cbd].find(a => a?.id === id);
                  return addon ? (
                    <div key={id} className="flex justify-between text-sm text-brand-espresso/70">
                      <span>{addon.title} (+{getAddonPrice(id)})</span>
                      <span>${getAddonPrice(id)}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between text-sm text-brand-espresso/70">
                  <span>Standard Travel & Setup</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between font-semibold text-lg text-brand-espresso">
                  <span>Total</span>
                  <span>${orderTotal}</span>
                </div>
                <div className="flex justify-between font-display text-2xl text-brand-teal pt-2 border-t border-brand-teal/10">
                  <span>Deposit Due Today</span>
                  <span>${depositAmount}</span>
                </div>
                <p className="text-xs text-brand-espresso/50 text-right mt-1">Remaining ${balanceDue} due at session</p>
              </div>
            </div>

            {/* Optional Enhancements */}
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-brand-espresso/70 mb-4">Optional Enhancements</h3>
              <div className="space-y-3">
                {[
                  { id: 'cbd-relief', title: 'CBD Infused Relief', price: 20, desc: 'Targeted application to reduce inflammation and pain.' },
                  { id: 'scalp-therapy', title: 'Scalp Therapy (20 Min)', price: 30, desc: 'Tension-relieving scalp, neck, and cranial massage.' },
                  ...(selectedServiceId === 'restorative' ? [{ id: 'body-scrub', title: 'Body Scrub', price: 55, desc: 'Exfoliating treatment for glowing skin.' }] : [])
                ].map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label key={addon.id} className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${isChecked ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-teal/20 hover:border-brand-teal/50'}`}>
                      <div className="pt-1">
                        <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${isChecked ? 'border-brand-teal bg-brand-teal' : 'border-brand-espresso/30'}`}>
                          {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                        <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => toggleAddon(addon.id)} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span className={`font-semibold text-sm ${isChecked ? 'text-brand-teal' : 'text-brand-espresso'}`}>{addon.title}</span>
                          <span className="text-sm font-semibold text-brand-espresso/70">+${addon.price}</span>
                        </div>
                        <p className="text-xs text-brand-espresso/60 mt-1">{addon.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Policy Checkbox */}
            <div className="mb-12">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="pt-1 shrink-0">
                  <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${agreedToPolicies ? 'border-brand-teal bg-brand-teal' : 'border-brand-espresso/30 group-hover:border-brand-teal/50'}`}>
                    {agreedToPolicies && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <input type="checkbox" className="sr-only" checked={agreedToPolicies} onChange={(e) => setAgreedToPolicies(e.target.checked)} />
                </div>
                <p className="text-xs text-brand-espresso/70 leading-relaxed select-none">
                  I understand that a 50% deposit confirms my appointment, with the balance due at the session. I acknowledge the standard travel inclusions and agree to the <span className="underline decoration-brand-teal/30 underline-offset-2">Cancellation & Refund terms</span> <span className="text-brand-teal font-semibold">(Policies Pending Finalization)</span>.
                </p>
              </label>
            </div>
          </motion.div>
        )}

      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-ivory border-t border-brand-teal/10 p-4 md:p-6 shadow-[0_-10px_40px_rgba(246,241,231,0.9)] z-40">
        <div className="max-w-[600px] mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            {step === 1 && selectedServiceId && selectedDurationIndex !== null && <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">Step 1 Complete</p>}
            {step === 2 && selectedDate && selectedTime && <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">Ready for Deposit</p>}
            {step === 3 && <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">Final Step</p>}
          </div>
          
          {step === 1 && (
            <button 
              disabled={!selectedServiceId || selectedDurationIndex === null} onClick={() => setStep(2)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${selectedServiceId && selectedDurationIndex !== null ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md' : 'bg-brand-teal/10 text-brand-teal/40 cursor-not-allowed'}`}
            >
              Continue to Date & Location
            </button>
          )}

          {step === 2 && (
            <button 
              disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${selectedDate && selectedTime ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md' : 'bg-brand-teal/10 text-brand-teal/40 cursor-not-allowed'}`}
            >
              Review Booking
            </button>
          )}

          {step === 3 && (
            <button 
              disabled={!agreedToPolicies} onClick={() => setStep(4)}
              className={`w-full sm:w-auto px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${agreedToPolicies ? 'bg-brand-teal text-white hover:bg-brand-tealHover shadow-md' : 'bg-brand-teal/10 text-brand-teal/40 cursor-not-allowed'}`}
            >
              Confirm & Pay ${depositAmount} Deposit
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
