import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Calendar, Phone } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091F15]/97 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 text-white">
      <div>
        <span className="text-[10px] text-emerald-300/80 uppercase font-semibold tracking-wide block">Starting from</span>
        <span className="text-sm font-bold text-white">$55<span className="text-xs font-normal text-slate-400">/night</span></span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${HOTEL_INFO.phone}`}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 shrink-0 hover:bg-white/15 transition-colors"
          aria-label="Call Hotel"
        >
          <Phone className="w-4 h-4" />
        </a>

        <a
          href={HOTEL_INFO.directBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg text-xs flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Direct</span>
        </a>
      </div>
    </div>
  );
};
