import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES, type Currency } from '../context/CurrencyContext';
import { ChevronDown } from 'lucide-react';

interface CurrencySelectorProps {
  variant?: 'glass' | 'light';
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ variant = 'glass' }) => {
  const { currency, setCurrency, isLiveRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (c: Currency) => {
    setCurrency(c);
    setIsOpen(false);
  };

  const buttonStyle = variant === 'glass'
    ? 'bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs transition-all backdrop-blur-md shadow-sm cursor-pointer'
    : 'bg-white text-slate-900 font-semibold px-3 py-1.5 rounded-full border border-slate-900/80 hover:bg-slate-50 transition-all text-xs sm:text-sm shadow-sm cursor-pointer';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Pill button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 sm:gap-1.5 ${buttonStyle}`}
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span className="font-bold opacity-90">{currency.symbol}</span>
        <span className="font-semibold">{currency.code}</span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
            <span>Select Currency</span>
            {isLiveRates && (
              <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Rates
              </span>
            )}
          </div>
          {CURRENCIES.map((c) => {
            const isSelected = c.code === currency.code;
            return (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors text-left ${
                  isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 text-center font-bold ${isSelected ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {c.symbol}
                  </span>
                  <span className="font-semibold">{c.code}</span>
                </div>
                <span className="text-slate-400 text-[11px]">{c.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
