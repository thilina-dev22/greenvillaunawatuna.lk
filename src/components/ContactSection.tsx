import { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'General Inquiry',
    dates: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const accessKey = HOTEL_INFO.web3FormsAccessKey || (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Inquiry from ${formData.name} (${formData.roomType}) - Green Villa`,
          from_name: 'Green Villa Unawatuna Website',
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          room_type: formData.roomType,
          dates: formData.dates || 'Not specified',
          message: formData.message,
          botcheck: ''
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roomType: 'General Inquiry',
          dates: '',
          message: ''
        });
      } else {
        console.warn('Web3Forms response:', json);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            Get In Touch • greenvillaunawatuna.lk
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Contact Green Villa Unawatuna
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Have questions about your stay, special requests, or group bookings? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#0F382C] text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-emerald-800/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo.png" 
                  alt="Green Villa Logo" 
                  className="h-10 w-auto object-contain drop-shadow-lg"
                />
                <div>
                  <h3 className="font-serif font-bold text-xl text-white">Direct Reservation Desk</h3>
                  <p className="text-xs text-emerald-300">greenvillaunawatuna.lk</p>
                </div>
              </div>

              <p className="text-emerald-100 text-sm leading-relaxed">
                Reach out directly to our front desk for custom stay packages, transport arrangements from Colombo / Mattala / Koggala, or direct booking assistance.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5 text-sm text-slate-200">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs text-emerald-300 block">Phone</span>
                    <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold text-white hover:text-amber-300 transition-colors">
                      {HOTEL_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-slate-200">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs text-emerald-300 block">Official Email</span>
                    <a href="mailto:info@greenvillaunawatuna.lk" className="font-bold text-white hover:text-amber-300 transition-colors">
                      info@greenvillaunawatuna.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-slate-200">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs text-emerald-300 block">Address</span>
                    <span className="text-white text-xs">{HOTEL_INFO.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Response Time Guarantee Box */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Fast Response Guarantee</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Messages sent via contact us go directly to our official inbox at <strong>info@greenvillaunawatuna.lk</strong> .
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg">
            
            <div className="mb-6">
              <h3 className="font-serif font-bold text-2xl text-slate-900">Send Us A Message</h3>
              <p className="text-xs text-slate-500 mt-1">Sent directly to info@greenvillaunawatuna.lk</p>
            </div>

            {status === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-emerald-950">Thank You! Message Received</h4>
                <p className="text-sm text-emerald-800">
                  Your inquiry has been submitted to <strong>info@greenvillaunawatuna.lk</strong>. We will review your request and get back to you shortly!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-950 transition-colors mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {status === 'error' && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs space-y-2">
                    <p className="font-semibold">Unable to submit form at this moment.</p>
                    <p>Please send your inquiry directly to our Zoho Mail inbox: <a href="mailto:info@greenvillaunawatuna.lk" className="underline font-bold">info@greenvillaunawatuna.lk</a> or contact us via WhatsApp.</p>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Email Address *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Room Category Interest
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="Three-Bedroom Apartment">Three-Bedroom Apartment (120 m² with Kitchen)</option>
                      <option value="Penthouse Suite">Penthouse Suite (111 m² with Jacuzzi)</option>
                      <option value="Deluxe Double Room with Balcony">Deluxe Double Room with Balcony</option>
                      <option value="Deluxe Double Room">Deluxe Double Room</option>
                      <option value="General Inquiry">General Inquiry / Multiple Rooms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Travel Dates (Optional)
                  </label>
                  <input 
                    type="text"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="e.g. Nov 15 - Nov 20, 2 Guests"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Special Requests *
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify any special requests, airport transfer needs, or booking questions..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#0F382C] hover:bg-emerald-950 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group text-sm disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                    <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message To Green Villa'}</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-slate-500">
                    Form submissions delivered to <strong>info@greenvillaunawatuna.lk</strong> 
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
