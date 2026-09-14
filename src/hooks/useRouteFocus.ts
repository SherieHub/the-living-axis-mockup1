import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnnounce } from '../components/Announcer';

/**
 * On every React Router navigation, move focus to the new page's <h1> and
 * announce the page title.
 *
 * Without this, a client-side route change leaves keyboard and screen-reader
 * users stranded at whatever they were focused on in the previous, now-stale
 * DOM — the visual page changed underneath them and nothing said so.
 *
 * The first render is skipped: a fresh page load already starts focus at the
 * top of the document, and stealing it there would be noise.
 */
export function useRouteFocus() {
  const location = useLocation();
  const announce = useAnnounce();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Wait a frame so the incoming route has actually rendered its <h1>.
    const id = window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      const target = heading ?? document.getElementById('main-content');

      if (target) {
        // tabindex="-1" makes a non-interactive element programmatically
        // focusable without adding it to the tab order.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }

      // document.title is set by usePageMeta during the same commit.
      announce(document.title);
    });

    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, announce]);
}
