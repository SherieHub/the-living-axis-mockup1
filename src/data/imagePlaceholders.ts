/**
 * SINGLE SOURCE OF TRUTH FOR EVERY IMAGE SLOT IN THE MOCKUP.
 *
 * When the client's photography shoot lands, this is the ONLY file that needs
 * editing. Components never hardcode a src, alt, ratio or label — they render
 * <SiteImage slot="..." /> and read everything from here.
 *
 * Every slot declares a fixed aspectRatio, so swapping the photography causes
 * ZERO layout shift.
 *
 * PHOTOGRAPHY RULES ENFORCED HERE (from the client brief):
 *   - Free-licence photography only (Unsplash). NO AI-generated imagery.
 *     Source URL + licence for every image is recorded in /credits.md.
 *   - NEVER a stock person's face standing in for the practitioner. Practitioner
 *     slots carry `practitionerSlot: true` and render as an empty labelled frame
 *     with the shot brief in BOTH photo modes.
 *   - No minors. No candles, orchids, flower arrangements, folded-towel stacks
 *     or stacked stones.
 *   - At least one image of a male client mid-session — see `services-sports`
 *     (the priority slot), plus `home-hero` and `find-treatment`.
 */

export type AspectRatio = '4:5' | '3:2' | '16:9' | '1:1';

export interface ImageSlot {
  /** Unsplash (or future client) image URL. Omitted for practitioner slots. */
  src?: string;
  /** Meaningful alt text. Required whenever `src` is set. */
  alt: string;
  /** Fixed ratio — reserves the box so replacing the photo shifts nothing. */
  aspectRatio: AspectRatio;
  /** Human label for the permanent placeholder chip, e.g. "Mobile Setup". */
  label: string;
  /** Direction for the client's photographer. Shown inside empty frames. */
  shotBrief: string;
  /** True = practitioner identity slot. Never filled with a stock person. */
  practitionerSlot?: boolean;
  /** Attribution, mirrored in /credits.md. */
  credit?: { photographer: string; source: string };
}

const U = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const PRACTITIONER_BRIEF =
  'Practitioner portrait, warm, direct to camera, natural interior light · 4:5 · the trust anchor for the whole site. Deliberately left empty — a stock face here would stand in for a specific real person.';

export const imageSlots = {
  /* ---------------------------------------------------------------- HOME */
  'home-hero': {
    src: U('1650044252595-cacd425982ff'),
    alt: 'A man receiving focused back work from a therapist during a session.',
    aspectRatio: '4:5',
    label: 'Treatment · Hero',
    shotBrief:
      'Male client mid-session, therapist hands in frame, face turned away or cropped. Warm natural interior light · 4:5 · leads the homepage and signals the practice is for every body.',
    credit: {
      photographer: 'yury kirillov',
      source: 'https://unsplash.com/photos/a-man-getting-a-back-massage-from-a-woman-UNRW1dD2xjI',
    },
  },
  'home-setup': {
    src: U('1700142360825-d21edc53c8db'),
    alt: 'A calm, uncluttered room prepared for a session.',
    aspectRatio: '16:9',
    label: 'Mobile Setup',
    shotBrief:
      'The table set up inside a real client home — linens squared, room otherwise ordinary. No candles, no stones, no flowers · 16:9 · proves the service arrives prepared.',
    credit: {
      photographer: 'Kimiya Sabbaghan',
      source: 'https://unsplash.com/photos/a-white-room-with-a-bed-and-a-desk-o4OJfrmMC0o',
    },
  },
  'home-practitioner': {
    alt: 'Practitioner portrait — awaiting client photography.',
    aspectRatio: '4:5',
    label: 'Practitioner Portrait',
    shotBrief: PRACTITIONER_BRIEF,
    practitionerSlot: true,
  },

  /* --------------------------------------------------------------- ABOUT */
  'about-portrait': {
    alt: 'Practitioner portrait — awaiting client photography.',
    aspectRatio: '4:5',
    label: 'Practitioner Portrait',
    shotBrief: PRACTITIONER_BRIEF,
    practitionerSlot: true,
  },
  'about-hands': {
    src: U('1699523229208-be1e1dd9252d', 1200),
    alt: 'Practitioner hands applying steady pressure along a client’s back.',
    aspectRatio: '1:1',
    label: 'Hands-On Detail',
    shotBrief:
      'Close crop on the practitioner’s hands mid-stroke. Skin, pressure, contact — no faces · 1:1 · carries craft without claiming an identity.',
    credit: {
      photographer: 'Edward Muntinga',
      source: 'https://unsplash.com/photos/hands-pressing-back-in-massage-8qwYA4INVCk',
    },
  },
  'about-setup': {
    src: U('1553267570-73887f15b17a'),
    alt: 'A professional treatment table set up and ready for a session.',
    aspectRatio: '16:9',
    label: 'Mobile Setup',
    shotBrief:
      'Wide view of the full professional setup as a client would first see it walking into the room · 16:9 · shows what "mobile" actually means here.',
    credit: {
      photographer: 'Stuart Poulton',
      source: 'https://unsplash.com/photos/red-leather-padded-massage-bed-inside-building-Cyw1t03KMGk',
    },
  },

  /* ------------------------------------------------------------ SERVICES */
  'services-neck-shoulder': {
    src: U('1519824145371-296894a0daa9'),
    alt: 'A therapist working through a client’s neck and shoulder line.',
    aspectRatio: '3:2',
    label: 'Neck & Shoulder Detail',
    shotBrief:
      'Neck and upper-trapezius work, hands clearly doing something specific. Client draped · 3:2 · reads clinical, not spa.',
    credit: {
      photographer: 'Toa Heftiba',
      source: 'https://unsplash.com/photos/person-massaging-the-back-of-a-woman-hBLf2nvp-Yc',
    },
  },
  'services-prenatal': {
    src: U('1541956799312-3f9df99e0006'),
    alt: 'A pregnant client resting with hands settled on her midriff.',
    aspectRatio: '3:2',
    label: 'Prenatal Support',
    shotBrief:
      'Side-lying prenatal positioning with bolsters in frame. Adult client only, respectfully cropped · 3:2 · shows adapted positioning, not a pregnancy stock cliché.',
    credit: {
      photographer: 'Alicia Petresc',
      source: 'https://unsplash.com/photos/person-touching-stomach-c3KZP4azG6g',
    },
  },
  'services-sports': {
    src: U('1761284758997-1074f2a33114'),
    alt: 'A male client receiving sports and recovery work on a treatment table.',
    aspectRatio: '3:2',
    label: 'Sports & Recovery',
    shotBrief:
      'Male client mid-session on the table, recovery-focused, working posture from the practitioner · 3:2 · THE priority image for gender inclusivity — lead with it.',
    credit: {
      photographer: 'Performance Medicine',
      source: 'https://unsplash.com/photos/woman-giving-a-man-a-massage-on-a-table-OgzbUs-IntQ',
    },
  },
  'services-reflexology': {
    src: U('1675159364615-38e1f6b62282'),
    alt: 'Hands working pressure points across the sole of a client’s foot.',
    aspectRatio: '3:2',
    label: 'Reflexology Detail',
    shotBrief:
      'Thumb pressure into the arch of the foot, towel beneath, warm light · 3:2 · a specific technique, not a pedicure.',
    credit: {
      photographer: 'Oswald Elsaboath',
      source: 'https://unsplash.com/photos/foot-massage-with-oil-nhEIkQVj0iI',
    },
  },

  /* ----------------------------------------------- FIND YOUR TREATMENT */
  'find-treatment': {
    src: U('1562771379-eafdca7a02f8'),
    alt: 'A man working through a mobility and stretching routine.',
    aspectRatio: '3:2',
    label: 'Mobility & Recovery',
    shotBrief:
      'Male client working on mobility — mid-stretch, gym or home floor, unposed · 3:2 · connects the practice to training and recovery, not only to rest.',
    credit: {
      photographer: 'Alora Griffiths',
      source: 'https://unsplash.com/photos/man-in-white-sleeveless-top-WX7FSaiYxK8',
    },
  },

  /* -------------------------------------------------- SERVICE AREAS */
  'service-areas': {
    src: U('1749292177172-66edfd44e7cc'),
    alt: 'A row of Brooklyn townhouses along a residential street.',
    aspectRatio: '16:9',
    label: 'Brooklyn Streetscape',
    shotBrief:
      'A real Brooklyn residential block — stoops, row houses, everyday street · 16:9 · grounds the service in the borough it actually serves.',
    credit: {
      photographer: 'Zoshua Colah',
      source: 'https://unsplash.com/photos/colorful-townhouses-line-a-street-with-parked-cars-kMrhCnrbIFQ',
    },
  },

  /* ------------------------------------------------- WHAT TO EXPECT */
  'what-to-expect-setup': {
    src: U('1591343395082-e120087004b4'),
    alt: 'A session underway in a quiet, softly lit room.',
    aspectRatio: '16:9',
    label: 'Mobile Setup',
    shotBrief:
      'A session in progress in a client’s own room — the table, the light, the ordinary apartment around it · 16:9 · answers "what will this look like in my home?".',
    credit: {
      photographer: 'Ale Romo',
      source: 'https://unsplash.com/photos/person-receiving-back-massage-therapy-CLiwQXx7kT8',
    },
  },
} satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof imageSlots;

/**
 * VITE_PHOTO_MODE=placeholder -> every slot is a labelled empty frame carrying
 *                                the shot brief (the honest version).
 * VITE_PHOTO_MODE=preview     -> treated stand-in photography (the dressed
 *                                version, for presenting to the client).
 * Practitioner slots ignore this and stay empty in both modes.
 */
export type PhotoMode = 'placeholder' | 'preview';

export const PHOTO_MODE: PhotoMode =
  (import.meta.env.VITE_PHOTO_MODE as PhotoMode) === 'preview' ? 'preview' : 'placeholder';

/** Permanent chip copy — never removed while this build is a mockup. */
export const PLACEHOLDER_CHIP = 'Placeholder · client photography pending';
