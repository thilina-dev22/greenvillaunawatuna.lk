import { useState } from 'react';
import { FAQS } from '../data/hotelData';
import { HelpCircle, ChevronDown, Clock, CreditCard, Users, Ban } from 'lucide-react';

const POLICY_CARDS = [
  {
    icon: Clock,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    title: 'Check-In / Out',
    lines: ['Check-in: 14:00 – 20:00', 'Check-out: 08:00 – 11:00'],
  },
  {
    icon: Users,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    title: 'Children & Beds',
    lines: ['Children of any age welcome', 'Under 8 yrs: free stay', 'Cots unavailable'],
  },
  {
    icon: CreditCard,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    title: 'Payment',
    lines: ['Online via HotelMate', 'Cash on property accepted'],
  },
  {
    icon: Ban,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-700',
    title: 'Property Policies',
    lines: ['No pets allowed', 'Non-smoking indoors'],
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#F7F7F4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            House Rules & FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Everything you need to know about check-in policies, room features, and direct bookings.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {POLICY_CARDS.map((card, i) => (
            <div key={i} className={`${card.bg} p-6 rounded-2xl border border-white/50 space-y-3 shadow-sm`}>
              <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                <card.icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-sm">{card.title}</h4>
              <ul className="text-xs text-slate-600 space-y-0.5">
                {card.lines.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
                  isOpen ? 'border-emerald-200 shadow-emerald-100/50' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base transition-colors ${
                    isOpen ? 'text-emerald-800' : 'text-slate-900 group-hover:text-emerald-800'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
