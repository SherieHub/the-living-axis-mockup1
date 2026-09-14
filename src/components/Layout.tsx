import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileBookingBar } from '../components/MobileBookingBar';
import { AnnouncerProvider } from '../components/Announcer';
import { useRouteFocus } from '../hooks/useRouteFocus';

function LayoutInner() {
  const location = useLocation();
  const isBooking = location.pathname === '/book';

  // Moves focus to the new page's <h1> and announces its title on every route
  // change, so keyboard and screen-reader users are not left in a stale DOM.
  useRouteFocus();

  return (
    <div className="min-h-screen flex flex-col font-body">
      {/* First focusable element on every page. Visually hidden until focused. */}
      <a
        href="#main-content"
        className="skip-link bg-brand-teal text-brand-ivory px-6 py-3 text-sm font-semibold uppercase tracking-widest rounded-br-sm"
      >
        Skip to content
      </a>

      <ScrollRestoration />
      {!isBooking && <Header />}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      {!isBooking && <Footer />}
      {!isBooking && <MobileBookingBar />}
    </div>
  );
}

export function Layout() {
  return (
    <AnnouncerProvider>
      <LayoutInner />
    </AnnouncerProvider>
  );
}
