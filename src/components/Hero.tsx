import React, { useState, useEffect, useCallback } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Calendar as CalendarIcon, Users, Star, MapPin, CheckCircle, ShieldCheck, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

// Best photos: exterior, garden, penthouse terrace, rooms, courtyard — largest/highest quality
const HERO_SLIDES = [
  {
    src: '/images/common/173381778.jpg',
    label: 'Tropical Garden Entrance',
  },
  {
    src: '/images/common/78888822.jpg',
    label: 'Lush Green Courtyard',
  },
  {
    src: '/images/penthouse/333633938.jpg',
    label: 'Penthouse Suite Terrace',
  },
  {
    src: '/images/common/36805346.jpg',
    label: 'Villa Exterior',
  },
  {
    src: '/images/penthouse/333633914.jpg',
    label: 'Penthouse Living Area',
  },
  {
    src: '/images/common/78888832.jpg',
    label: 'Serene Garden View',
  },
  {
    src: '/images/common/173381775.jpg',
    label: 'Peaceful Outdoor Area',
  },
];

const SLIDE_INTERVAL = 5000; // ms

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('2');
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const { formatAmount } = useCurrency();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => {
      setIsAnimating(false);
    }, 900);
  }, [current, isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  const prev_slide = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [next, paused]);

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(HOTEL_INFO.directBookingUrl, '_blank');
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-slate-950 overflow-hidden">

      {/* ── Slideshow Background — pinned to viewport height ── */}
      <div
        className="sticky top-0 left-0 w-full z-0 pointer-events-none"
        style={{ height: '100svh', marginBottom: '-100svh' }}
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: '900ms' }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-cover object-top"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/55 via-slate-950/25 to-transparent z-10" />
      </div>

      {/* Wrapper that sits on top of the sticky background */}
      <div className="relative z-10 min-h-screen flex items-center">

      {/* ── Slide Nav Arrows ── */}
      <button
        onClick={() => { prev_slide(); setPaused(true); }}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm border border-white/15 text-white items-center justify-center transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => { next(); setPaused(true); }}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm border border-white/15 text-white items-center justify-center transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Slide Dots + Label ── */}
      <div className="absolute bottom-24 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        {/* Photo label */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
          {HERO_SLIDES[current].label}
        </span>
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); setPaused(true); }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-1.5 bg-amber-400'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          key={current}
          className="h-full bg-amber-400/70"
          style={{
            animation: paused ? 'none' : `heroProgress ${SLIDE_INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-16 pb-32 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* Left: Hero copy */}
          <div
            className={`lg:col-span-7 text-left space-y-7 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Rating badge */}
            <div className="inline-flex items-center gap-3 bg-slate-950/70 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="font-bold text-sm">9.3 Superb</span>
              </span>
              <span className="text-white/20">|</span>
              <span>179+ Verified Reviews</span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <MapPin className="w-3.5 h-3.5" />
                300m to Beach
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05]">
                Tranquil Tropical
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-emerald-300">
                  Villa in Unawatuna
                </span>
              </h1>
              <p className="text-slate-300/90 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                A serene hideaway nestled in lush gardens, just 2 minutes from famous
                Unawatuna Beach — featuring an exclusive 111 m² Penthouse Suite with a
                private jacuzzi.
              </p>
            </div>

            {/* Value props */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: 'Best Rate Guaranteed' },
                { label: 'Free WiFi & Parking' },
                { label: '2 Min Walk to Beach' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-200 text-sm">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-wrap gap-3 lg:hidden">
              <a
                href={HOTEL_INFO.directBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-amber-500/30 transition-all"
              >
                <CalendarIcon className="w-4 h-4" />
                Check Availability
              </a>
              <button
                onClick={scrollToAbout}
                className="flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white/8 transition-all"
              >
                Explore More
              </button>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 border border-white/20 overflow-hidden">

              {/* Widget header */}
              <div className="bg-[#0F382C] px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Check Availability</h3>
                  <p className="text-emerald-200/80 text-xs mt-0.5">Instant confirmation · Best rate direct</p>
                </div>
                <div className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Best Price
                </div>
              </div>

              {/* Widget form */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Check-In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Check-Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests (2 Rooms)</option>
                      <option value="6">6+ Guests (Multiple Rooms)</option>
                    </select>
                  </div>
                </div>

                {/* Rate callout */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wide">Starting from</p>
                    <p className="text-lg font-serif font-bold text-emerald-900">
                      {formatAmount(55)} <span className="text-sm font-normal text-emerald-600">/ night</span>
                    </p>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-200/60 text-emerald-900 px-2.5 py-1 rounded-lg">No Fees</span>
                </div>

                <form onSubmit={handleBookingSearch}>
                  <button
                    type="submit"
                    className="w-full bg-[#0F382C] hover:bg-emerald-950 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 group text-sm"
                  >
                    <span>Search Live Rates</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
                  </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                  Powered by{' '}
                  <a
                    href={HOTEL_INFO.directBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    HotelMate Channel Manager
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>{/* end inner wrapper */}

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/50 hover:text-white/80 transition-colors animate-bounce hidden lg:flex flex-col items-center gap-1"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Explore</span>
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Keyframe for progress bar */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};
