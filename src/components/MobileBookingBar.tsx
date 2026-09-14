import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export function MobileBookingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Hide the booking bar on the book page itself
    if (location.pathname === '/book') {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show when scrolled down a bit to not conflict with header,
      // or always show on mobile if preferred. Let's show after 200px.
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-brand-ivory border-t border-brand-teal/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40"
        >
          <Link
            to="/book"
            className="block w-full bg-brand-teal text-brand-ivory text-center py-4 rounded-md font-semibold tracking-wider uppercase text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal focus:ring-offset-brand-ivory"
          >
            Book Your Session
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
