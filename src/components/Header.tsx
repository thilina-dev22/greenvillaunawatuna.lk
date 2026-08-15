import { useState, useEffect } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Calendar, Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'Overview' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A2B1E]/98 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5'
          : 'bg-[#0F382C]'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0" aria-label="Green Villa Unawatuna">
            <img
              src="/images/logo.png"
              alt="Green Villa Unawatuna Official Logo"
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-lg transition-all duration-300 group-hover:brightness-110"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-white leading-tight group-hover:text-emerald-200 transition-colors">
                GREEN VILLA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-amber-300/90 font-semibold leading-tight">
                Unawatuna · Sri Lanka
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeSection === link.href.slice(1)
                        ? 'text-amber-300'
                        : 'text-emerald-100/90 hover:text-white hover:bg-white/8'
                    }`}
                    onClick={() => setActiveSection(link.href.slice(1))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center gap-1.5 text-xs text-emerald-200/80 hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{HOTEL_INFO.phoneFormatted}</span>
            </a>

            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Direct</span>
            </a>
          </div>

          {/* Mobile Actions: Book button + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md transition-colors shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Direct</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors outline-none shrink-0"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#091F15] border-t border-white/10 px-5 pt-4 pb-6 space-y-1">

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-4 text-emerald-100 hover:text-white hover:bg-white/8 rounded-xl font-medium text-sm transition-colors"
            >
              <span>{link.label}</span>
            </a>
          ))}

          <div className="pt-4 border-t border-white/10 space-y-2.5 mt-2">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-700/60 text-emerald-200 text-sm font-medium hover:bg-white/8 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{HOTEL_INFO.phoneFormatted}</span>
            </a>
            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Direct — Best Rate Guaranteed</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
