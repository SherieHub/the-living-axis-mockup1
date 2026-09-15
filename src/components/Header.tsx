import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_LINE_POSITIONING } from '../data/content';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // If on home page and not scrolled, use transparent/light header. Otherwise use solid/dark header.
  const useTransparentHeader = isHomePage && !isScrolled && !mobileMenuOpen;

  /*
   * Build Note — navigation recommendation: top nav capped at five items so
   * nothing competes with the booking button. "Find Your Treatment" stays
   * reachable from the homepage self-selection cards and the footer, and
   * Contact lives in the footer rather than here, per the same note.
   */
  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'What to Expect', path: '/what-to-expect' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        useTransparentHeader ? 'bg-transparent text-brand-ivory' : 'bg-brand-ivory text-brand-espresso shadow-sm'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="z-50 relative rounded-sm">
          <span className="font-display font-medium text-2xl tracking-wide uppercase block">The Living Axis</span>
          {/* Positioning line — Build Note: belongs in the header, meta
              description, and About, wherever the brand is explained to
              someone new. Desktop only; the mobile header stays uncluttered. */}
          <span
            className={cn(
              'hidden md:block text-[11px] tracking-[0.08em] font-light mt-0.5',
              useTransparentHeader ? 'text-brand-ivory/70' : 'text-brand-espresso/55'
            )}
          >
            {BRAND_LINE_POSITIONING}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium tracking-wide hover:text-brand-tealHover transition-colors rounded-sm px-1',
                useTransparentHeader ? 'text-brand-ivory' : 'text-brand-espresso'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/book"
            className={cn(
              'px-6 py-3 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors',
              useTransparentHeader
                ? 'bg-brand-ivory text-brand-teal hover:bg-white'
                : 'bg-brand-teal text-brand-ivory hover:bg-brand-tealHover'
            )}
          >
            Book Your Session
          </Link>
        </nav>

        {/* Mobile: persistent Book action + menu toggle, both in the collapsed
            header. Build Note: the booking button should remain visible in
            the collapsed header rather than hiding inside the menu — it
            should never require scrolling or opening the menu to find. */}
        <div className="md:hidden flex items-center gap-2 z-50">
          {!mobileMenuOpen && (
            <Link
              to="/book"
              className={cn(
                'min-h-[44px] px-4 flex items-center justify-center rounded-md text-xs font-semibold tracking-wider uppercase transition-colors',
                useTransparentHeader
                  ? 'bg-brand-ivory text-brand-teal hover:bg-white'
                  : 'bg-brand-teal text-brand-ivory hover:bg-brand-tealHover'
              )}
            >
              Book
            </Link>
          )}
          <button
            className="p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-screen bg-brand-ivory text-brand-espresso pt-24 px-6 flex flex-col md:hidden z-40"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-display font-medium text-brand-teal hover:text-brand-tealHover"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <Link
                  to="/book"
                  className="block w-full text-center bg-brand-teal text-brand-ivory px-6 py-4 rounded-md text-lg font-semibold tracking-wider uppercase"
                >
                  Book Your Session
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
