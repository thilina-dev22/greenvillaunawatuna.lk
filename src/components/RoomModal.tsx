import { useState } from 'react';
import type { Room } from '../data/hotelData';
import { HOTEL_INFO } from '../data/hotelData';
import { X, Check, Calendar, ChevronLeft, ChevronRight, Maximize2, Sparkles, BedDouble, Users, Eye } from 'lucide-react';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">{room.name}</h3>
              <span className="bg-emerald-800/80 text-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {room.unitsCount} {room.unitsCount === 1 ? 'Unit Only' : 'Units'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Green Villa Unawatuna • Official Booking Details</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 md:h-[450px] bg-slate-900 rounded-2xl overflow-hidden group">
              <img
                src={room.images[activeImageIndex]}
                alt={`${room.name} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Slider Navigation Arrows */}
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Photo Counter Pill */}
              <div className="absolute bottom-3 right-3 bg-slate-950/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                Photo {activeImageIndex + 1} of {room.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-emerald-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Room Size</p>
                <p className="text-sm font-bold text-slate-900">{room.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Occupancy</p>
                <p className="text-sm font-bold text-slate-900">{room.occupancy}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <BedDouble className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Bed Type</p>
                <p className="text-sm font-bold text-slate-900">{room.bed}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-semibold">View</p>
                <p className="text-sm font-bold text-slate-900">{room.view}</p>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-serif font-bold text-lg text-slate-900 mb-2">Room Overview</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{room.fullDescription}</p>
          </div>

          {/* Highlights & Features */}
          <div>
            <h4 className="font-serif font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Key Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bathroom Amenities */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="font-serif font-bold text-base text-slate-900 mb-3">In Your Private Bathroom</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {room.bathroomAmenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Starting price from</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-slate-900">
                LKR {room.priceLKR.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 font-medium">
                (~${room.priceUSD} USD) / night
              </span>
            </div>
          </div>

          <a
            href={HOTEL_INFO.directBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Book {room.name} Now</span>
          </a>
        </div>

      </div>
    </div>
  );
};
