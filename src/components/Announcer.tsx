import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/**
 * A single application-wide aria-live="polite" region.
 *
 * Everything that changes without a page reload — form validation errors,
 * booking step changes, route changes — is announced through here, so keyboard
 * and screen-reader users are told what happened instead of having to hunt for
 * it.
 */

type AnnounceFn = (message: string) => void;

const AnnouncerContext = createContext<AnnounceFn>(() => {});

export function useAnnounce(): AnnounceFn {
  return useContext(AnnouncerContext);
}

export function AnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | undefined>(undefined);

  const announce = useCallback<AnnounceFn>((next) => {
    window.clearTimeout(timeoutRef.current);
    // Clear first so repeating the same string is still re-announced.
    setMessage('');
    timeoutRef.current = window.setTimeout(() => setMessage(next), 60);
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return (
    <AnnouncerContext.Provider value={announce}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="true" className="visually-hidden">
        {message}
      </div>
    </AnnouncerContext.Provider>
  );
}
