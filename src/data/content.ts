export interface DurationOption {
  minutes: number;
  price?: number;
  addonPrice?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  hook?: string;
  description: string;
  /** Brief section header is "Ideal For" for every service that has one. */
  idealFor?: string;
  /**
   * Brief section header varies by service: "Sessions Prioritize" for
   * Prenatal/Postnatal, "Sessions May Incorporate" for Sports. Restorative and
   * Deep Tissue carry only `idealFor`, per the brief's own structure — neither
   * service is given a parallel list in Section 04, so none is invented here.
   */
  mayInclude?: string;
  mayIncludeLabel?: string;
  durations: DurationOption[];
  /** Bookable on its own, not only as an add-on. */
  standalone?: boolean;
  /** Also offered as an add-on to a core service, at this price. */
  addonPrice?: number;
}

export const services: ServiceItem[] = [
  {
    id: 'restorative',
    title: 'Restorative / Swedish Massage',
    hook: 'For when your body needs to stop running.',
    description:
      'A full-body restorative treatment using flowing, therapeutic techniques to reduce muscular tension, support circulation, encourage relaxation, and help the nervous system settle.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 },
    ],
    standalone: true,
    idealFor:
      'General stress, relaxation, muscular tension, maintenance, nervous system down-regulation, and clients who want full-body restorative care.',
    mayInclude: undefined,
  },
  {
    id: 'prenatal',
    title: 'Prenatal / Postnatal Massage',
    hook: 'Care shaped around a body that is changing.',
    description:
      'Supportive therapeutic bodywork designed around the changing physical needs of pregnancy and postpartum recovery.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 },
    ],
    standalone: true,
    mayInclude: 'Comfort, safe positioning, muscular relief, relaxation, circulation, physical recovery, and overall well-being.',
    mayIncludeLabel: 'Sessions Prioritize',
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    hook: 'Focused pressure, applied with judgment.',
    description:
      'Focused therapeutic work designed to address deeper muscular tension, areas of restriction, chronic tightness, and discomfort. Pressure and technique are adapted to the individual rather than assuming deeper pressure is always better.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 },
    ],
    standalone: true,
    idealFor:
      'Persistent muscular tension, tight areas, restricted movement, repetitive-use tension, and clients who prefer more focused therapeutic pressure.',
  },
  {
    id: 'sports',
    title: 'Sports Massage',
    hook: 'Recovery that keeps up with your training.',
    description:
      'Performance and recovery-focused therapeutic bodywork for athletes, gym-goers, active professionals, and clients experiencing muscular fatigue or mobility restrictions.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 },
    ],
    standalone: true,
    mayInclude:
      'Focused massage techniques, recovery work, stretching, mobility-focused techniques, muscle-specific treatment, and pre- or post-activity support depending on your needs.',
    mayIncludeLabel: 'Sessions May Incorporate',
  },
];

/**
 * Specialty services.
 *
 * Reflexology, Scalp Therapy and Body Scrub are all bookable STANDALONE, not
 * only as add-ons — `standalone: true` is what puts them in the booking flow's
 * service list. Scalp Therapy and Body Scrub additionally carry an `addonPrice`
 * so they can be attached to a core service.
 */
export const specialtyServices: ServiceItem[] = [
  {
    id: 'reflexology',
    title: 'Reflexology',
    description:
      'Focused pressure-point work through the feet designed to encourage relaxation, circulation, and whole-body balance.',
    durations: [
      { minutes: 30, price: 75 },
      { minutes: 45, price: 95 },
      { minutes: 60, price: 115 },
    ],
    standalone: true,
  },
  {
    id: 'scalp-therapy',
    title: 'Scalp Therapy',
    description:
      'Focused scalp, head, and tension-relief work intended to promote relaxation and create a deeper sense of reset.',
    durations: [
      { minutes: 20, price: 30 },
      { minutes: 30, price: 45 },
    ],
    standalone: true,
    addonPrice: 30,
  },
  {
    id: 'body-scrub',
    title: 'Body Scrub',
    description:
      'An exfoliating body treatment designed to smooth, refresh, and soften the skin while enhancing the overall wellness experience.',
    durations: [{ minutes: 30, price: 75 }],
    standalone: true,
    addonPrice: 55,
  },
  {
    id: 'cbd-relief',
    title: 'CBD Infused Relief',
    description:
      'An optional enhancement that may be incorporated into the massage experience for clients seeking additional muscular and recovery support.',
    durations: [{ minutes: 0, addonPrice: 20 }],
    addonPrice: 20,
  },
];

/* ------------------------------------------------------------------------ */
/* DEPOSIT DISCLOSURE                                                        */
/*                                                                           */
/* One source of truth, surfaced in exactly three places: the Services page   */
/* near pricing, the FAQ, and the booking step before payment. The warm       */
/* justification precedes it once per surface; the terms wording never varies.*/
/* ------------------------------------------------------------------------ */
export const DEPOSIT_REASON = 'Because each appointment is reserved and travelled to personally.';
export const DEPOSIT_TERMS = 'A 50% deposit confirms your appointment. The balance is due at your session.';

/* ------------------------------------------------------------------------ */
/* TRAVEL INCLUSION — headline-level, not a footnote                        */
/*                                                                           */
/* Hidden travel fees are the category's most common complaint. This line   */
/* is surfaced prominently near pricing, at booking, and in the FAQ — never  */
/* as small italic type only.                                               */
/* ------------------------------------------------------------------------ */
export const TRAVEL_INCLUSION_HEADLINE = 'Travel and full setup are included in every rate within the service area.';
export const TRAVEL_INCLUSION_SUB = 'No surprise fees at the door.';

/* ------------------------------------------------------------------------ */
/* PROTOTYPE NOTICES                                                         */
/*                                                                           */
/* This build takes no payments and sends no messages. Every screen that      */
/* would otherwise imply a completed transaction or a delivered message       */
/* carries one of these permanently.                                         */
/* ------------------------------------------------------------------------ */
/* Approved client copy. The confirmation headline carries the emotional peak;
   the permanent prototype notice beside it carries the disclosure. Do not hedge
   both — one does each job. */
/* Contact details the client still owes. Rendered as visible, labelled
   placeholders — an absent field reads as an oversight, a labelled one reads as
   deliberate and keeps the item on the launch checklist. */
export const PENDING_BUSINESS_EMAIL = 'Business Email — to be provided';

export const CONFIRMATION_HEADLINE = 'Your session is confirmed.';

/* ------------------------------------------------------------------------ */
/* OFFICIAL BRAND LINES                                                      */
/*                                                                           */
/* Exact client wording — never reinterpreted, shortened, or blended.        */
/*   BRAND_LINE_POSITIONING — the positioning line. Header, meta            */
/*     descriptions, the About section, and anywhere the brand is being      */
/*     explained to someone new.                                             */
/*   BRAND_LINE — the emotional line. Hero, closing sections, and            */
/*     confirmation messaging — moments to feel something, not evaluate it.  */
/* ------------------------------------------------------------------------ */
export const BRAND_LINE_POSITIONING = 'Clinical Touch. Human Understanding.';
export const BRAND_LINE = 'Healing that feels like coming home.';

export const PROTOTYPE_BOOKING_NOTICE =
  'Demonstration booking — no appointment has been scheduled and no payment has been taken.';
export const PROTOTYPE_CONTACT_NOTICE = 'Demonstration form — no message has been sent.';
export const PAYMENT_PENDING_NOTICE = 'Payment integration pending — booking platform not yet selected.';
export const SAMPLE_AVAILABILITY_NOTICE =
  'Sample availability — live scheduling connects once a booking platform is selected.';
export const ADDRESS_PRIVACY_NOTICE = 'Your exact address is collected once your appointment is confirmed.';
export const INTAKE_NOTICE = 'This is brief on purpose. Anything further is discussed before we begin.';

/** Section 21 Microcopy Library — "Form submitted", exact suggested copy. */
export const FORM_SUBMITTED_LINE = 'Thank you. You will hear back shortly — usually within a few hours.';

/** Section 21 Microcopy Library — "Booking step", exact suggested copy. */
export const BOOKING_STEP_LINE =
  'Choose a time that works. You will receive confirmation and everything you need to know before the session.';

/* ------------------------------------------------------------------------ */
/* FAQ                                                                       */
/*                                                                           */
/* `confirmedFaqs` are the NINE answers the client has confirmed. These are   */
/* the only ones that may be rendered as answers, and the only ones that feed */
/* FAQPage structured data (see src/data/schema.ts).                          */
/*                                                                           */
/* `pendingFaqs` are questions the client has NOT yet answered. They render   */
/* as visibly labelled pending placeholders and are excluded from schema. No  */
/* answer may be invented for them — several would otherwise fabricate a      */
/* space requirement, a setup duration, a cancellation term or a credential.  */
/* ------------------------------------------------------------------------ */
export const confirmedFaqs = [
  {
    question: 'Do you travel to clients?',
    answer: 'Yes. The Living Axis is primarily a mobile massage service designed to bring care to your environment.',
  },
  {
    question: 'Is travel included?',
    answer:
      'Standard travel and mobile setup are included in all listed pricing for appointments within the normal service area. Extended travel outside that area may require a custom quote depending on location and distance.',
  },
  {
    question: 'Do I need to provide anything?',
    answer:
      'No. Professional massage equipment, fresh linens, and all necessary supplies are brought to the appointment. You provide the space.',
  },
  {
    question: 'Which service should I choose?',
    answer:
      'If you are unsure where to begin, describe what you are experiencing when booking or getting in touch, and we will guide you toward the service that best fits your current needs.',
  },
  {
    question: 'Do you offer prenatal and postpartum massage?',
    answer:
      'Yes. Prenatal and postpartum massage is tailored to support you comfortably and safely during these phases.',
  },
  {
    question: 'Do you work with athletes and gym-goers?',
    answer: 'Yes. Sports and recovery-oriented massage is available to support your training, mobility, and recovery.',
  },
  {
    question: 'Do you work with older adults?',
    answer:
      'Yes. Sessions for older adults are adapted based on individual comfort, mobility, pressure preference, and specific therapeutic goals.',
  },
  {
    question: 'Do you work with children or teenagers?',
    // This answer exists ONLY here and in the Policies section. It must never
    // appear on the homepage, in an audience tile, in a service card, or in any
    // image. No imagery of minors appears anywhere on the site.
    answer:
      'Age-appropriate sessions may be available in some circumstances. A parent or legal guardian must give consent and remain present for the entire session, and services are provided in accordance with applicable professional and business requirements. The practitioner may adapt or decline any session at their discretion.',
  },
  {
    question: 'What should I wear?',
    answer:
      'This varies depending on the service you select and your personal comfort level. You are professionally draped at all times during your session.',
  },
];

/*
 * A second group of answers, sourced directly from the brief's own Build Note
 * suggested copy for the "What to Expect" four-step walkthrough and the
 * "Additional Questions Worth Answering" note — not client Standard Text, but
 * explicit customer-facing wording the brief itself supplies. Kept separate
 * from `confirmedFaqs` so the provenance of each answer stays legible: the
 * nine above are the client's own words, these four are Build Note copy.
 * Both feed FAQPage structured data.
 */
export const buildNoteFaqs = [
  {
    question: 'How much space do you need?',
    answer: 'About the footprint of a sofa — enough room for the table, with space to move comfortably around it.',
  },
  {
    question: 'Do I need to clean before you arrive?',
    answer: 'No. You do not need to prepare anything or tidy up.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Setup takes roughly ten minutes, start to finish.',
  },
  {
    question: 'What equipment and supplies do you bring?',
    answer: 'A professional treatment table, fresh linens, and all necessary supplies.',
  },
];

/*
 * Every remaining fabrication risk leaves a visible pending row here, so the
 * client can see exactly where her answer will land and the launch checklist
 * keeps the item. The parenthetical notes name the claim that was removed.
 */
export const pendingFaqs = [
  'What if I live in a small apartment or a walk-up?',
  'How is travel priced outside Brooklyn?', // was: a fabricated distance-based fee
  'How far in advance should I book?', // was: a fabricated one-to-two-week lead time
  'What are your professional credentials and insurance?',
  'Can I book for someone else as a gift?',
  'Do you offer back-to-back sessions in the same home?',
  'What forms of payment do you accept?',
  'What if I need to reschedule?', // cancellation terms: see pendingPolicies
  'Is there parking or building access I should arrange?',
];

/** Label used on every pending surface. One string, so they cannot drift. */
export const PENDING_LABEL = 'Answer pending client confirmation';

/*
 * Policy blocks with no confirmed wording. Rendered in the Policies section with
 * the same pending treatment as the FAQ rows, never as a silent omission.
 */
export const pendingPolicies = [
  {
    title: 'Cancellation & Rescheduling',
    note: 'Notice period and any associated fee are not yet set.', // was: a fabricated 24-hour policy
  },
  {
    title: 'Refund Policy',
    note: 'Refund conditions and timelines are not yet set.',
  },
];

export const serviceAreas = [
  'Brooklyn Heights',
  'Park Slope',
  'Williamsburg',
  'Greenpoint',
  'Cobble Hill',
  'Carroll Gardens',
  'Fort Greene',
  'Clinton Hill',
  'DUMBO',
  'Boerum Hill',
];

/**
 * The four session stages.
 *
 * Sourced directly from the brief's own "What to Expect" Build Note suggested
 * four-step copy — including the specific setup duration and space footprint,
 * which the brief itself supplies as customer-facing wording, not an invented
 * operational promise. See src/pages/WhatToExpect.tsx for the fuller version.
 */
export const timelineSteps = [
  {
    step: '01',
    title: 'Book',
    description: 'Choose your service and a time that works.',
  },
  {
    step: '02',
    title: 'Brief Intake',
    description: 'A short form on your goals, sensitivities, and any health considerations.',
  },
  {
    step: '03',
    title: 'Arrival & Setup',
    description:
      'A professional table, fresh linens, and supplies are brought in. Setup takes roughly ten minutes and needs about the footprint of a sofa.',
  },
  {
    step: '04',
    title: 'Your Session',
    description:
      'Pressure and focus are adjusted throughout. Afterward, the space is left exactly as it was found.',
  },
];

/* ------------------------------------------------------------------------ */
/* WHAT TO EXPECT — preparation line                                        */
/*                                                                           */
/* Explicit Build Note suggested copy: "you do not need to prepare anything  */
/* or tidy up" removes real friction for the busy-professional audience.     */
/* ------------------------------------------------------------------------ */
export const NOTHING_TO_PREPARE_LINE =
  'You do not need to prepare anything or tidy up before a session.';

/* ------------------------------------------------------------------------ */
/* WHO THE LIVING AXIS SERVES — Section 03, exact client wording            */
/*                                                                           */
/* `livedExperience` is the ONE line of brand-voice framing the Build Note   */
/* asks for ahead of the client's own paragraph ("write the feeling before   */
/* the category") — second person, present tense, a concrete physical       */
/* experience, never presented as an attributed client quote. `description`  */
/* below it is the client's own Section 03 text, unedited.                   */
/*                                                                           */
/* Deliberately NO children/adolescents entry — that subject is policy, not  */
/* an audience card. See confirmedFaqs and pendingPolicies.                  */
/* ------------------------------------------------------------------------ */
export interface Audience {
  id: string;
  title: string;
  livedExperience: string;
  description: string;
  link: string;
}

export const audiences: Audience[] = [
  {
    id: 'professionals',
    title: 'Busy Professionals & High-Stress Clients',
    livedExperience: 'If your shoulders live somewhere near your ears by Thursday.',
    description:
      'For professionals, entrepreneurs, caregivers, and individuals managing demanding schedules, prolonged sitting, long hours, stress, and accumulated muscular tension. Care may focus on relaxation, nervous system support, neck and shoulder tension, low-back discomfort, headaches related to tension, and overall physical reset.',
    link: '/services#restorative',
  },
  {
    id: 'athletes',
    title: 'Athletes, Gym-Goers & Active Adults',
    livedExperience: "If your recovery has stopped keeping up with your training.",
    description:
      'For clients who train, compete, work out regularly, or maintain an active lifestyle. Sessions may support muscular recovery, mobility, flexibility, performance, repetitive-use tension, and maintaining the body between workouts or events.',
    link: '/services#sports',
  },
  {
    id: 'prenatal',
    title: 'Prenatal & Postpartum Clients',
    livedExperience: "If your body is changing week to week, and yesterday's relief doesn't hold today.",
    description:
      'Supportive massage care for the physical demands of pregnancy and postpartum recovery. Sessions are adapted for comfort, positioning, muscular tension, relaxation, circulation, and the changing needs of the body throughout motherhood.',
    link: '/services#prenatal',
  },
  {
    id: 'older-adults',
    title: 'Older Adults & Geriatric Clients',
    livedExperience: 'If you want to move through your day with less stiffness, not more caution.',
    description:
      "Thoughtful, adaptable massage for older adults who may benefit from gentle therapeutic touch, mobility support, circulation, relaxation, muscular comfort, and improved overall quality of life. Pressure, positioning, and session goals are individualized according to the client's comfort and needs.",
    link: '/services#restorative',
  },
  {
    id: 'demanding-professions',
    title: 'Physically Demanding Professions',
    livedExperience: "If your body is the tool you use for work, and it's asking for maintenance.",
    description:
      'For healthcare workers, first responders, drivers, tradespeople, hospitality professionals, caregivers, and others whose work places repetitive physical demands on the body. Treatment may focus on muscular fatigue, overuse, restricted movement, recovery, and maintaining the body for the work it has to perform.',
    link: '/services#deep-tissue',
  },
];

export const AUDIENCE_COMMON_THREAD =
  'Different lifestyles create different demands on the body. The Living Axis is designed for clients who want more than a temporary escape — they want intentional care that supports how they live, move, work, recover, and age.';

/* ------------------------------------------------------------------------ */
/* ABOUT THE LIVING AXIS — Section 05, exact client wording                 */
/* ------------------------------------------------------------------------ */
export const aboutParagraphs = [
  'The Living Axis was built on a simple belief: massage should do more than help you escape for an hour. It should help you return to your body feeling more supported, more aware, and more at ease.',
  'Every client brings something different to the table — stress, tension, limited mobility, physical demands, changing seasons of life, or simply the need to feel cared for. Because no two bodies move, recover, or respond the same way, no two sessions should feel exactly the same.',
  'My approach blends therapeutic knowledge with intentional, individualized care. I listen to what you tell me, pay attention to how your body responds, and adjust pressure, technique, pacing, and focus based on what you need that day.',
];

export const aboutGoalStatement =
  'The goal is not simply to leave you saying, "That was a good massage." The goal is for you to leave feeling more mobile, less tense, more settled, more connected to your body, and genuinely cared for.';

/**
 * The closing pull-quote block from Section 05 — combines the positioning
 * framing with the emotional brand line as its final sentence. Client's exact
 * wording; rendered as one block, never split apart.
 */
export const aboutClosingQuote =
  'The Living Axis brings together therapeutic skill, intentional care, and a deeper understanding of the body. Every session is personalized to support how you move, recover, and feel. Healing that feels like coming home.';

export const aboutGroundedIn = [
  'Therapeutic Skill',
  'Intentional Touch',
  'Mobility and Recovery Awareness',
  'Nervous System Support',
  'Thoughtful Communication',
  'Personalized Pressure and Technique',
  "Respect for the Body's Response",
];

/* ------------------------------------------------------------------------ */
/* WHAT MAKES THE LIVING AXIS DIFFERENT — Section 06, exact client wording  */
/* ------------------------------------------------------------------------ */
export const whatMakesDifferent = [
  {
    title: 'Individualized Care',
    description:
      "Every session is shaped around the client in front of me. I adjust the pressure, pacing, focus areas, and techniques based on what I'm feeling, what the client communicates, and how the body responds.",
  },
  {
    title: 'Intentional Bodywork',
    description:
      'I do not believe in simply filling an hour with techniques. Each session has a clear purpose, whether that is relieving tension, improving mobility, supporting recovery, or helping the body settle.',
  },
  {
    title: 'Thoughtful Professionalism',
    description:
      'From communication and preparation to setup and treatment, every part of the experience should feel organized, respectful, and intentional.',
  },
  {
    title: 'A More Human Approach',
    description:
      'Clients should feel comfortable speaking up, asking questions, and being part of their own care. I want people to feel listened to, not processed.',
  },
  {
    title: 'Care That Fits Real Life',
    description:
      'The Living Axis is designed around the reality that people are busy, physically taxed, and often putting themselves last. Bringing treatment directly to the client makes consistent care easier to maintain.',
  },
  {
    title: 'Quality Without the Distance',
    description:
      'The experience is elevated, but never stiff or impersonal. The standard is high, while the care remains warm, grounded, and approachable.',
  },
];

/* ------------------------------------------------------------------------ */
/* PROFESSIONAL STANDARDS — Build Note, Section 06                          */
/*                                                                           */
/* Named directly rather than implied, per the brief. Licensed/insured status */
/* is deliberately NOT asserted here — the client has not yet confirmed a     */
/* license number or insurer (see PENDING_LABEL usage on About and Footer),   */
/* and stating "licensed and insured" as fact ahead of that confirmation      */
/* would publish an unverified claim. Everything below IS safe to state:      */
/* these are operating practices, not credentials awaiting a specific number. */
/* ------------------------------------------------------------------------ */
export const professionalStandards = [
  'Fresh linens for every client',
  'Sanitized equipment between sessions',
  'Confidential intake',
  'Clearly defined professional boundaries',
];
