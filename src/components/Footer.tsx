import { HOTEL_INFO } from '../data/hotelData';
import { Phone, MapPin, ExternalLink, Calendar, Star, MessageCircle, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060F0A] text-white">

      {/* Pre-footer CTA */}
      <div className="bg-[#0F382C] border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to Experience Green Villa?
            </h3>
            <p className="text-emerald-200/80 text-sm">
              Book directly for guaranteed best rates and instant confirmation via our HotelMate Channel Manager.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Green Villa Unawatuna Official Logo"
                className="h-12 w-auto object-contain drop-shadow brightness-110"
              />
              <div>
                <span className="block font-serif text-xl font-bold tracking-tight text-white">
                  GREEN VILLA
                </span>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-emerald-400 font-semibold">
                  greenvillaunawatuna.lk
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A serene 9.3-rated guest house featuring 10 air-conditioned rooms and an exclusive 111 m² Penthouse Suite with a private jacuzzi. Located just 300m from Unawatuna Beach, Sri Lanka.
            </p>

            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-xs">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">9.3 Superb</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">179+ Booking.com Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '#about', label: 'About & Overview' },
                { href: '#rooms', label: 'Rooms & Penthouse Suite' },
                { href: '#facilities', label: 'Facilities & Experiences' },
                { href: '#reviews', label: 'Guest Reviews (9.3/10)' },
                { href: '#location', label: 'Location & Map' },
                { href: '#faq', label: 'House Rules & FAQ' },
                { href: '#contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="text-slate-400 hover:text-amber-300 transition-colors font-medium"
                >
                  {HOTEL_INFO.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="mailto:info@greenvillaunawatuna.lk"
                  className="text-slate-400 hover:text-amber-300 transition-colors font-medium"
                >
                  info@greenvillaunawatuna.lk
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={HOTEL_INFO.directBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 transition-colors font-medium underline"
                >
                  HotelMate Booking Engine
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Green Villa Unawatuna. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with love by</span>
            <a
              href="https://www.paradisecrew.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
            >
              Paradise Crew - Tech and Hospitality
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
};
