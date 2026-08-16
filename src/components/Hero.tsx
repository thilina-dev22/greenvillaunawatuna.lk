import React, { useState, useEffect, useCallback } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Calendar as CalendarIcon, Star, MapPin, CheckCircle, ShieldCheck, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Zap, Lock, Award } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);

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
  }, [isAnimating]);

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
                A serene hideaway nestled in lush gardens, just 3 minutes from famous
                Unawatuna Beach — featuring an exclusive 111 m² Penthouse Suite with a
                private jacuzzi.
              </p>
            </div>

            {/* Value props */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: 'Best Rate Guaranteed' },
                { label: 'Free WiFi & Parking' },
                { label: '3 Min Walk to Beach' },
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

          {/* Right: Direct Booking & Benefits Card */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 border border-white/20 overflow-hidden">

              {/* Widget header */}
              <div className="bg-[#0F382C] px-6 py-5 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Official Direct Booking
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white">Book Direct & Save</h3>
                </div>
                <div className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  Best Rate
                </div>
              </div>

              {/* Widget content */}
              <div className="p-6 sm:p-7 space-y-4">
                
                {/* Benefits List */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Guaranteed Lowest Rates</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        Get exclusive direct rates with no third-party booking commissions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-800/10 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Real-Time Room Availability</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        Live calendar for all 10 boutique units & luxury Penthouse Suite.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-800/10 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Instant Confirmation & 0% Fees</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        Direct booking engine voucher with instant reservation confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <a
                  href={HOTEL_INFO.directBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0F382C] hover:bg-emerald-950 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2.5 group text-sm sm:text-base mt-2"
                >
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                  <span>Check Live Rates & Availability</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300 ml-0.5" />
                </a>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 pt-1">
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
