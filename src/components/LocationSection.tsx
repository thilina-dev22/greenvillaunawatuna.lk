import { HOTEL_INFO, ATTRACTIONS } from '../data/hotelData';
import { MapPin, Navigation, Compass, Utensils, Sun } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Prime Location • 9.7/10 Score
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Centrally Located In Unawatuna
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Enjoy the best of both worlds: tucked away on Yaddehimulla Road for serene quiet, yet just 300 meters from Unawatuna Beach and top restaurants.
          </p>
        </div>

        {/* Map & Distance Cards Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Map Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative h-[450px]">
              <iframe 
                src={HOTEL_INFO.googleMapsEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Green Villa Unawatuna Google Map Location"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Address bar card */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{HOTEL_INFO.address}</h4>
                  <p className="text-xs text-emerald-300">500m from Unawatuna Town Center • 300m from Beach</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Green+Villa+Unawatuna"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Open Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Attractions Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Beaches */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                Nearby Beaches
              </h3>
              <div className="space-y-2.5">
                {ATTRACTIONS.filter(a => a.type === 'beach').map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Restaurants & Cafes (Steps Away)
              </h3>
              <div className="space-y-2.5">
                {ATTRACTIONS.filter(a => a.type === 'dining').map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culture & Transit */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                Culture & Transport
              </h3>
              <div className="space-y-2.5">
                {ATTRACTIONS.filter(a => a.type === 'culture' || a.type === 'transport').map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
