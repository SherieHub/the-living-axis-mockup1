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
}

export const services: ServiceItem[] = [
  {
    id: 'restorative',
    title: 'Restorative / Swedish Massage',
    hook: 'For when your body needs to stop running.',
    description: 'A full-body restorative treatment using flowing therapeutic techniques to reduce muscular tension, support circulation and relaxation, and help the nervous system settle.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 }
    ],
    idealFor: 'Stress relief, general stiffness, improving sleep quality, and complete mental and physical down-regulation.',
    mayInclude: 'Fluid Swedish strokes, gentle joint mobilization, focused breathing, and scalp massage.'
  },
  {
    id: 'prenatal',
    title: 'Prenatal / Postnatal Massage',
    hook: 'Care shaped around a body that is changing.',
    description: 'Supportive therapeutic bodywork adapted precisely to pregnancy and postpartum needs, utilizing specialized positioning for maximum comfort and safety.',
    durations: [
      { minutes: 60, price: 175 },
      { minutes: 90, price: 240 }
    ],
    idealFor: 'Relieving lower back and hip pain, reducing swelling, managing pregnancy-related stress, and supporting postpartum structural recovery.',
    mayInclude: 'Side-lying positioning with bolsters, targeted glute/hip work, and gentle lymphatic strokes.'
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    hook: 'Focused pressure, applied with judgment.',
    description: 'Focused clinical work for deeper muscular tension, chronic tightness, and restriction. We use individualized, sinking pressure rather than the assumption that deeper is always better.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 }
    ],
    idealFor: 'Chronic pain patterns, postural imbalances, severe tension headaches, and focused rehabilitation.',
    mayInclude: 'Myofascial release, trigger point therapy, deep sustained pressure, and active release techniques.'
  },
  {
    id: 'sports',
    title: 'Sports Massage',
    hook: 'Recovery that keeps up with your training.',
    description: 'A performance-focused session emphasizing recovery, mobility, stretching, and muscle-specific techniques to address muscular fatigue and provide pre/post-activity support.',
    durations: [
      { minutes: 60, price: 185 },
      { minutes: 90, price: 250 }
    ],
    idealFor: 'Athletes in training blocks, event preparation and recovery, mobility restrictions, and repetitive strain.',
    mayInclude: 'PNF stretching, joint mobilization, friction therapy, and targeted muscle activation.'
  }
];

export const specialtyServices: ServiceItem[] = [
  {
    id: 'reflexology',
    title: 'Reflexology',
    description: 'Focused pressure point therapy on the feet and hands to stimulate systemic relaxation.',
    durations: [
      { minutes: 30, price: 75 },
      { minutes: 45, price: 95 },
      { minutes: 60, price: 115 }
    ]
  },
  {
    id: 'scalp-therapy',
    title: 'Scalp Therapy',
    description: 'Tension-relieving scalp, neck, and cranial massage. Available standalone or as an add-on.',
    durations: [
      { minutes: 20, price: 30 },
      { minutes: 30, price: 45 }
    ]
  },
  {
    id: 'body-scrub',
    title: 'Body Scrub',
    description: 'Exfoliating treatment for glowing skin.',
    durations: [
      { minutes: 30, price: 75, addonPrice: 55 }
    ]
  },
  {
    id: 'cbd-relief',
    title: 'CBD Infused Relief',
    description: 'Targeted application of premium CBD topical to reduce inflammation and pain.',
    durations: [
      { minutes: 0, addonPrice: 20 }
    ]
  }
];

export const faqs = [
  {
    question: 'How do I prepare my space for an in-home massage?',
    answer: 'We require a cleared space of approximately 6x9 feet to set up our professional massage table and allow the therapist to move freely. A quiet, warmly lit room with comfortable ambient temperature is ideal. We bring the table, fresh luxury linens, organic oils, and a speaker for restorative music—you just need to provide the space and relax.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 24 hours notice to cancel or reschedule an appointment. Cancellations made within 24 hours of the appointment time are subject to a fee equal to 50% of the service cost. No-shows will be charged the full service amount.'
  },
  {
    question: 'Do you offer couples massages?',
    answer: 'Yes, we can accommodate back-to-back sessions with one therapist or simultaneous sessions with two therapists, depending on availability. Please contact us directly to coordinate a couples session.'
  },
  {
    question: 'Are gratuities included?',
    answer: 'Gratuities are entirely at your discretion. While deeply appreciated, our focus is providing exceptional care regardless of tip. Should you choose to leave a gratuity, it goes entirely to your therapist.'
  },
  {
    question: 'Do you treat prenatal clients?',
    answer: 'Absolutely. We offer specialized prenatal massage tailored to safely support you during all stages of pregnancy, utilizing supportive cushioning and side-lying techniques.'
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least one to two weeks in advance, especially for evening or weekend appointments. However, we occasionally have same-day or next-day availability.'
  }
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
  'Boerum Hill'
];

export const timelineSteps = [
  {
    step: '01',
    title: 'Book Your Session',
    description: 'Select your preferred service, duration, and time online. We\'ll confirm your appointment and send a brief intake form.'
  },
  {
    step: '02',
    title: 'The Setup',
    description: 'Your therapist arrives 15 minutes early to transform your space with our heated table, premium linens, and therapeutic oils.'
  },
  {
    step: '03',
    title: 'Your Treatment',
    description: 'Experience a fully customized, clinical yet restorative massage designed precisely for your body\'s needs today.'
  },
  {
    step: '04',
    title: 'The Afterglow',
    description: 'We quietly pack up and leave you to seamlessly transition back into your day—or straight into a peaceful rest.'
  }
];
