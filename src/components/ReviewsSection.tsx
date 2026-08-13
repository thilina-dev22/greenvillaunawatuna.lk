import { REVIEWS, HOTEL_INFO } from '../data/hotelData';
import { Star, Quote, Award, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0F382C] text-white relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-900/80 px-4 py-1.5 rounded-full border border-amber-300/30">
            <Award className="w-3.5 h-3.5" />
            Booking.com Guest Award Winner
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Loved By Guests Worldwide
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg">
            Scored <strong>9.3 out of 10 (Superb)</strong> based on 179+ independent verified guest reviews.
          </p>
        </div>

        {/* Rating Breakdown Dashboard */}
        <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-emerald-800/60 shadow-2xl mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Big Score Badge */}
            <div className="lg:col-span-4 text-center lg:border-r border-emerald-800/60 lg:pr-8">
              <div className="inline-block relative">
                <div className="text-6xl sm:text-7xl font-serif font-bold text-amber-300">9.3</div>
                <div className="text-lg font-bold text-white mt-1">Superb Rating</div>
                <div className="flex justify-center items-center gap-1 my-2 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-emerald-200">179 Verified Booking.com Reviews</p>
              </div>
            </div>

            {/* Right Categories Bars */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {HOTEL_INFO.rating.categories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-emerald-100">{cat.label}</span>
                    <span className="text-amber-300 font-bold text-sm">{cat.score} / 10</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(cat.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Guest Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-emerald-800/40 shadow-lg flex flex-col justify-between hover:border-amber-300/50 transition-colors group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{rev.flag}</span>
                  <div className="bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{rev.rating}</span>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-emerald-500/40 group-hover:text-amber-400/60 transition-colors" />

                <h4 className="font-serif font-bold text-white text-base leading-snug">"{rev.title}"</h4>

                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{rev.author}</span>
                  <span className="text-emerald-300 text-[11px]">{rev.country}</span>
                </div>
                {rev.roomType && (
                  <span className="text-[10px] text-slate-400 max-w-[100px] text-right truncate">
                    {rev.roomType}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Trust */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-6 py-3 rounded-full border border-emerald-700/60 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Book direct on Green Villa's Channel Manager for guaranteed best rate & fast reservation.</span>
            <a href={HOTEL_INFO.directBookingUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold ml-1">
              Book Now →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
