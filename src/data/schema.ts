import { confirmedFaqs } from './content';

export const SITE_URL = 'https://thelivingaxis.example';
export const INSTAGRAM_URL = 'https://instagram.com/TheLivingAxis';

/**
 * Brand-safe Open Graph image.
 *
 * Deliberately NOT a photograph of a person: no stock face may stand in for the
 * practitioner, and an OG image is the one asset that travels furthest from the
 * site. Replace with the client's own key art after the shoot.
 */
export const OG_IMAGE = `${SITE_URL}/og-default.svg`;

/**
 * LocalBusiness structured data.
 *
 * DELIBERATELY OMITTED: address, telephone, email.
 * The client has no confirmed business phone or email, and no permanent public
 * address exists for a mobile practice. Emitting empty strings or placeholder
 * values into schema would publish fabricated business data to search engines,
 * so those properties are absent entirely rather than blank.
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'The Living Axis',
  description:
    'Mobile massage therapy serving Brooklyn and greater New York City. Restorative, deep tissue, sports, and prenatal bodywork brought to your own space.',
  url: SITE_URL,
  priceRange: '$30–$250',
  areaServed: [
    'Brooklyn',
    'Queens',
    'Manhattan',
    'Bronx',
    'Staten Island',
    'Long Island',
    'Select New Jersey locations',
  ].map((name) => ({ '@type': 'Place', name })),
  sameAs: [INSTAGRAM_URL],
};

/**
 * FAQPage structured data.
 *
 * Built ONLY from the nine confirmed question/answer pairs. Questions still
 * marked "Answer pending client confirmation" have no answer to mark up and are
 * excluded — publishing them would invite search engines to surface an answer
 * the client never gave.
 */
export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: confirmedFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};
