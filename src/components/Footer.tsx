import { Link } from 'react-router-dom';
import { PENDING_BUSINESS_EMAIL, professionalStandards } from '../data/content';
import lightLogo from '../assets/light version.png';

export function Footer() {
  return (
    <footer className="ground-dark bg-brand-espresso text-brand-ivory pt-24 pb-12 border-t border-brand-teal/20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
          {/* Brand & Summary */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 rounded-sm mb-6" aria-label="The Living Axis">
              <img 
                src={lightLogo} 
                alt="" 
                className="h-10 w-auto object-contain" 
              />
              <span className="font-display font-medium text-[20px] tracking-wide uppercase text-brand-ivory">
                The Living Axis
              </span>
            </Link>
            <p className="text-brand-ivory/80 text-sm md:text-base max-w-sm leading-relaxed mb-6">
              Premium mobile massage therapy and wellness. Providing highly customized clinical bodywork directly to
              your home or space.
            </p>
            {/* No credential, licence number or insurance claim is stated
                anywhere until the client confirms one. These stay as visibly
                labelled pending placeholders. */}
            <div className="space-y-2 mb-6">
              <p className="text-sm text-brand-ivory/60 italic">License &amp; insurance — pending client confirmation</p>
            </div>

            {/* Footer as a trust surface — Build Note. Operating practices
                that ARE confirmed, stated plainly alongside the placeholder
                above rather than held back with it. */}
            <ul className="space-y-1.5">
              {professionalStandards.map((standard) => (
                <li key={standard} className="text-sm text-brand-ivory/70">
                  {standard}
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 text-brand-ivory/50">Service Areas</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/service-areas"
                  className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                >
                  Brooklyn (Primary)
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                >
                  Queens
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                >
                  Manhattan
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                >
                  Greater NYC & Beyond
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-4 lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 text-brand-ivory/50">Explore</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/services"
                    className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                  >
                    Services & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-your-treatment"
                    className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                  >
                    Find Your Treatment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/what-to-expect"
                    className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                  >
                    What to Expect
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors">
                    FAQ & Policies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 text-brand-ivory/50">Connect</h3>
              <ul className="space-y-4">
                {/* No business email is confirmed, so none is invented and
                    nothing is rendered as a live mailto link. */}
                <li>
                  <span className="text-sm text-brand-ivory/50 italic">{PENDING_BUSINESS_EMAIL}</span>
                </li>
                <li>
                  <a
                    href="https://instagram.com/TheLivingAxis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-ivory/90 hover:text-brand-eucalyptus transition-colors"
                  >
                    @TheLivingAxis
                  </a>
                </li>
                <li className="pt-4">
                  <Link
                    to="/book"
                    className="inline-block text-brand-teal bg-brand-ivory hover:bg-white px-6 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all"
                  >
                    Book Session
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-ivory/50">
            &copy; {new Date().getFullYear()} The Living Axis. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/faq" className="text-xs text-brand-ivory/50 hover:text-brand-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-xs text-brand-ivory/50 hover:text-brand-ivory transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
