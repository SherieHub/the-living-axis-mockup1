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
  idealFor?: string;
  mayInclude?: string;
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
      'A full-body restorative treatment using flowing therapeutic techniques to reduce muscular tension, support circulation and relaxation, and help the nervous system settle.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 },
    ],
    standalone: true,
    idealFor:
      'Stress relief, general stiffness, improving sleep quality, and complete mental and physical down-regulation.',
    mayInclude: 'Fluid Swedish strokes, gentle joint mobilization, focused breathing, and scalp massage.',
  },
  {
    id: 'prenatal',
    title: 'Prenatal / Postnatal Massage',
    hook: 'Care shaped around a body that is changing.',
    description:
      'Supportive therapeutic bodywork adapted precisely to pregnancy and postpartum needs, utilizing specialized positioning for maximum comfort and safety.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 },
    ],
    standalone: true,
    idealFor:
      'Relieving lower back and hip pain, reducing swelling, managing pregnancy-related stress, and supporting postpartum structural recovery.',
    mayInclude: 'Side-lying positioning with bolsters, targeted glute/hip work, and gentle lymphatic strokes.',
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    hook: 'Focused pressure, applied with judgment.',
    description:
      'Focused clinical work for deeper muscular tension, chronic tightness, and restriction. We use individualized, sinking pressure rather than the assumption that deeper is always better.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 },
    ],
    standalone: true,
    idealFor: 'Chronic pain patterns, postural imbalances, severe tension headaches, and focused rehabilitation.',
    mayInclude: 'Myofascial release, trigger point therapy, deep sustained pressure, and active release techniques.',
  },
  {
    id: 'sports',
    title: 'Sports Massage',
    hook: 'Recovery that keeps up with your training.',
    description:
      'A performance-focused session emphasizing recovery, mobility, stretching, and muscle-specific techniques to address muscular fatigue and provide pre/post-activity support.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 },
    ],
    standalone: true,
    idealFor:
      'Athletes in training blocks, event preparation and recovery, mobility restrictions, and repetitive strain.',
    mayInclude: 'PNF stretching, joint mobilization, friction therapy, and targeted muscle activation.',
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
    description: 'Focused pressure point therapy on the feet and hands to stimulate systemic relaxation.',
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
    description: 'Tension-relieving scalp, neck, and cranial massage. Bookable on its own, or added to any session.',
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
      'Exfoliating treatment for skin texture and circulation. Bookable on its own, or added to any session.',
    durations: [{ minutes: 30, price: 75 }],
    standalone: true,
    addonPrice: 55,
  },
  {
    id: 'cbd-relief',
    title: 'CBD Infused Relief',
    description: 'Targeted application of CBD topical to support localized comfort.',
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
export const BRAND_LINE = 'Healing that feels like coming home.';

export const PROTOTYPE_BOOKING_NOTICE =
  'Demonstration booking — no appointment has been scheduled and no payment has been taken.';
export const PROTOTYPE_CONTACT_NOTICE = 'Demonstration form — no message has been sent.';
export const PAYMENT_PENDING_NOTICE = 'Payment integration pending — booking platform not yet selected.';
export const SAMPLE_AVAILABILITY_NOTICE =
  'Sample availability — live scheduling connects once a booking platform is selected.';
export const ADDRESS_PRIVACY_NOTICE = 'Your exact address is collected once your appointment is confirmed.';
export const INTAKE_NOTICE = 'This is brief on purpose. Anything further is discussed before we begin.';

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
 * Every removed fabrication leaves a visible pending row here, so the client can
 * see exactly where her answer will land and the launch checklist keeps the
 * item. The parenthetical notes name the claim that was removed.
 */
export const pendingFaqs = [
  'How much space do you need?', // was: a fabricated 6x9-foot requirement
  'What if I live in a small apartment or a walk-up?',
  'Do I need to clean before you arrive?',
  'How long does setup take?', // was: a fabricated "arrives 15 minutes early"
  'What equipment and supplies do you bring?', // was: a fabricated heated table
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
 * Deliberately free of any setup duration, arrival window, space measurement or
 * equipment specification — none of those are confirmed by the client, and each
 * one is an operational promise the practitioner would have to keep.
 */
export const timelineSteps = [
  {
    step: '01',
    title: 'Book Your Session',
    description:
      'Choose your service, duration, and a time that works. A short optional intake comes just before you confirm.',
  },
  {
    step: '02',
    title: 'The Setup',
    description:
      'Your therapist arrives with the table, fresh linens, and everything else the session needs. You provide the space.',
  },
  {
    step: '03',
    title: 'Your Treatment',
    description:
      'A session adapted to your body on the day — pressure, pacing, and focus adjusted around your ongoing comfort.',
  },
  {
    step: '04',
    title: 'The Afterglow',
    description: 'Everything is packed away quietly, leaving you to return to your day — or straight into rest.',
  },
];
