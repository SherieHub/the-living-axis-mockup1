import { confirmedFaqs } from './content';

/**
 * The live domain, supplied at build time via VITE_SITE_URL.
 *
 * It is NULL until the client picks a domain, and that is deliberate: a
 * canonical tag or an og:url pointing at a domain that does not exist is worse
 * than having neither, because crawlers and link-preview services act on it.
 * While this is null, usePageMeta omits <link rel="canonical"> and og:url
 * entirely, and LocalBusiness omits `url`. Everything self-heals the moment a
 * real domain is set — no code change needed.
 *
 * Outstanding client input: domain name + hosting decision. See README.md.
 */
const rawSiteUrl = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');
export const SITE_URL: string | null = rawSiteUrl.length > 0 ? rawSiteUrl : null;

export const INSTAGRAM_URL = 'https://instagram.com/TheLivingAxis';

/**
 * Brand-safe Open Graph image.
 *
 * Deliberately NOT a photograph of a person: no stock face may stand in for the
 * practitioner, and an OG image is the one asset that travels furthest from the
 * site. Replace with the client's own key art after the shoot.
 */
/* Absolute once a domain exists; root-relative until then, which scrapers
   resolve against the page they fetched. Never a fabricated absolute URL. */
export const OG_IMAGE = SITE_URL ? `${SITE_URL}/og-default.svg` : '/og-default.svg';

/**
 * LocalBusiness structured data.
 *
 * DELIBERATELY OMITTED: address, telephone, email — and `url` until a domain
 * is confirmed.
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
  // Spread so the key is absent, not null, when there is no domain yet.
  ...(SITE_URL ? { url: SITE_URL } : {}),
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
