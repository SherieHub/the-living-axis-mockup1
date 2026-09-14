import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OG_IMAGE, SITE_URL } from '../data/schema';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeTag(selector: string) {
  document.head.querySelector(selector)?.remove();
}

/**
 * Per-route <title>, meta description, canonical, Open Graph and Twitter tags,
 * plus optional JSON-LD structured data.
 *
 * Every route passes its own title and description — each one naming a service
 * and a location naturally, so no two routes compete for the same snippet.
 */
export function usePageMeta(title: string, description: string, jsonLd?: object | object[]) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', 'name', 'description', description);

    /*
     * Canonical and og:url are ABSENT, not placeholder, until VITE_SITE_URL is
     * set. Both are absolute-URL-only fields: a relative or invented value is
     * acted on by crawlers and link-preview services, which is worse than
     * emitting nothing. They are also actively removed, so a stale tag cannot
     * survive a client-side navigation after the domain is unset.
     */
    if (SITE_URL) {
      const url = `${SITE_URL}${location.pathname}`;
      upsertLink('canonical', url);
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    } else {
      removeTag('link[rel="canonical"]');
      removeTag('meta[property="og:url"]');
    }

    /* Every other Open Graph tag renders normally regardless. */
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'The Living Axis');
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', OG_IMAGE);
  }, [title, description, location.pathname]);

  useEffect(() => {
    if (!jsonLd) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.pageSchema = 'true';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
    // Serialised so a fresh object literal per render does not thrash the tag.
  }, [JSON.stringify(jsonLd ?? null)]);
}
