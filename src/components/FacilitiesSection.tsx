import { HOTEL_INFO } from '../data/hotelData';
import { Wifi, Car, Wind, Trees, Coffee, Shield, Compass, Bike, UtensilsCrossed, Anchor, Sparkles, CheckCircle2, Waves, Phone } from 'lucide-react';

const popularFacilities = [
  { icon: Wifi, label: 'Free High-Speed WiFi', sub: 'In all rooms & common areas' },
  { icon: Car, label: 'Free Private Parking', sub: 'On-site secured parking lot' },
  { icon: Wind, label: 'Air Conditioning & Fans', sub: 'Individual climate control' },
  { icon: Trees, label: 'Tropical Garden', sub: 'Lush courtyard & outdoor seating' },
  { icon: Coffee, label: 'Continental Breakfast', sub: 'Fresh daily breakfast served' },
  { icon: Shield, label: 'Non-Smoking & Safes', sub: 'Smoke-free indoors, laptop safes' },
];

const guestServices = [
  'On-site Tour & Activity Desk',
  'Car & Scooter Hire Services',
  'Laundry & Ironing Services',
  'Private Check-in / Check-out',
  'Luggage Storage & Lockers',
  'Airport Transfer (on request)',
];

const activities = [
  { icon: UtensilsCrossed, label: 'Sri Lankan Cooking Classes' },
  { icon: Bike, label: 'Bicycle Rentals & Guided Tours' },
  { icon: Anchor, label: 'Snorkeling & Scuba Diving' },
  { icon: Waves, label: 'Deep Sea & Lagoon Fishing' },
  { icon: Sparkles, label: 'Surfing & Jungle Beach Trips' },
  { icon: Compass, label: 'Galle Fort Day Excursions' },
];

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-24 bg-[#F7F7F4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Property & Activities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Facilities & Experiences
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Everything you need for a relaxing Sri Lankan beach vacation — from high-speed WiFi to curated local excursions.
          </p>
        </div>

        {/* Main 3-col grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Featured Facilities */}
          <div className="bg-[#0F382C] text-white p-8 rounded-3xl shadow-xl border border-emerald-800/30 relative overflow-hidden flex flex-col">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 left-8 w-32 h-32 bg-amber-400/8 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-amber-300 mb-1">Top Facilities</h3>
              <p className="text-emerald-200/70 text-xs mb-7">Included for all guests during stay</p>

              <div className="space-y-5">
                {popularFacilities.map((fac, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <fac.icon className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{fac.label}</p>
                      <p className="text-xs text-emerald-300/70">{fac.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Services */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Services & Support</h3>
              <p className="text-xs text-slate-500 mb-7">Dedicated hospitality & travel assistance</p>

              <div className="space-y-3.5">
                {guestServices.map((svc, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-slate-100">
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Call us for any special requests →
              </a>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Activities & Excursions</h3>
              <p className="text-xs text-slate-500 mb-7">Explore Unawatuna & the Galle Coast</p>

              <div className="space-y-3.5">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <act.icon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{act.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-slate-100">
              <a
                href={HOTEL_INFO.directBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline transition-colors"
              >
                Inquire about activities when booking →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
