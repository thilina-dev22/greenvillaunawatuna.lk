import { HOTEL_INFO } from '../data/hotelData';
import { Trees, Heart, Wifi, Coffee, Award, CheckCircle2, Star, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img
                    src="/images/common/173381775.jpg"
                    alt="Green Villa outdoor courtyard"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Score tile */}
                <div className="rounded-2xl bg-[#0F382C] p-6 text-center">
                  <div className="text-5xl font-serif font-bold text-amber-300 leading-none">9.3</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-emerald-300 mt-2">Superb Score</div>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-1.5">179+ Booking.com Reviews</div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                  <img
                    src="/images/common/78888822.jpg"
                    alt="Green Villa tropical garden"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-emerald-700" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Beach Distance</p>
                <p className="font-bold text-slate-900 text-sm">300m to Unawatuna Beach</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-7 lg:pl-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 mb-5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Welcome to Green Villa
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-snug">
                A Peaceful Oasis Hidden in Tropical Unawatuna
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Standing just 2 minutes from the scenic Unawatuna Beach,{' '}
                <strong className="text-slate-800">Green Villa Unawatuna</strong> offers clean, comfortable, and tastefully appointed accommodation surrounded by a serene tropical garden.
              </p>
              <p>
                Whether you're relaxing on your private balcony, enjoying our spacious 120 m² Three-Bedroom Apartment with a private kitchen, unwinding in our luxury 111 m² Penthouse Suite with a private terrace jacuzzi, or strolling to nearby beachside cafés — Green Villa blends central convenience with quiet tranquility.
              </p>
            </div>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  icon: <Trees className="w-5 h-5 text-emerald-700" />,
                  title: 'Lush Tropical Garden',
                  desc: 'Quiet outdoor seating in exotic greenery',
                  bg: 'bg-emerald-50',
                },
                {
                  icon: <Heart className="w-5 h-5 text-rose-600" />,
                  title: 'Attentive Hospitality',
                  desc: 'Friendly staff dedicated to your comfort',
                  bg: 'bg-rose-50',
                },
                {
                  icon: <Wifi className="w-5 h-5 text-blue-600" />,
                  title: 'Free WiFi & Parking',
                  desc: 'High-speed internet & private parking',
                  bg: 'bg-blue-50',
                },
                {
                  icon: <Coffee className="w-5 h-5 text-amber-700" />,
                  title: 'Fresh Breakfast Daily',
                  desc: 'Morning coffee & continental breakfast',
                  bg: 'bg-amber-50',
                },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${item.bg} border border-white`}>
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0F382C] hover:bg-emerald-950 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-950/20 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <span>Reserve Your Stay Directly</span>
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
