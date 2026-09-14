import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileBookingBar } from '../components/MobileBookingBar';

export function Layout() {
  const location = useLocation();
  const isBooking = location.pathname === '/book';

  return (
    <div className="min-h-screen flex flex-col font-body">
      <ScrollRestoration />
      {!isBooking && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isBooking && <Footer />}
      {!isBooking && <MobileBookingBar />}
    </div>
  );
}
