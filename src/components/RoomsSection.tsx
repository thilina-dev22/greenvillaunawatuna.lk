import { useState } from 'react';
import type { Room } from '../data/hotelData';
import { ROOMS, HOTEL_INFO, getDirectBookingUrl } from '../data/hotelData';
import { RoomModal } from './RoomModal';
import { Maximize2, BedDouble, Users, Sparkles, ChevronRight, ChevronLeft, Calendar, Eye, Check } from 'lucide-react';

export const RoomsSection: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <section id="rooms" className="py-24 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Stay at Green Villa
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Our Rooms & Suites
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose from 10 air-conditioned units featuring handcrafted Sri Lankan teak furniture, crisp linens, modern bathrooms, and tropical garden views.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {ROOMS.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onSelectRoom={() => setSelectedRoom(room)} 
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0F382C] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/50">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-amber-300">Need Multiple Rooms or Custom Bookings?</h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Booking for group trips, family retreats, or extended stays? Check real-time availability on our direct booking engine or contact our front desk directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={HOTEL_INFO.directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Check All Room Availability</span>
            </a>
          </div>
        </div>

      </div>

      {/* Room Detail Modal */}
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </section>
  );
};

interface RoomCardProps {
  room: Room;
  onSelectRoom: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onSelectRoom }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isPenthouse = room.id === 'penthouse-suite';
  const isApartment = room.id === 'three-bedroom-apartment';

  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
      isPenthouse || isApartment ? 'border-amber-300 ring-2 ring-amber-400/25' : 'border-slate-200'
    }`}>
      
      <div>
        {/* Card Image Header Slider */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 group">
          <img 
            src={room.images[currentImgIndex]} 
            alt={`${room.name} - Green Villa Unawatuna, Sri Lanka`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Badge overlays */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isApartment && (
              <span className="bg-emerald-800 text-amber-300 text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 border border-emerald-600/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 120 m² 3-Bedroom Villa Apartment
              </span>
            )}
            {isPenthouse && (
              <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Flagship Jacuzzi Penthouse
              </span>
            )}
            <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 w-fit">
              {room.unitsCount} {room.unitsCount === 1 ? 'Unit Available' : 'Units Available'}
            </span>
          </div>

          {/* Slider Arrows */}
          {room.images.length > 1 && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex((prev) => (prev + 1) % room.images.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Image Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {room.images.slice(0, 5).map((_, i) => (
              <span 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImgIndex ? 'bg-amber-300 w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          
          {/* Title & Short Specs */}
          <div>
            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-1 hover:text-emerald-800 transition-colors">
              {room.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2">{room.shortDescription}</p>
          </div>

          {/* Specs Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2 border-y border-slate-100 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{room.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>{room.occupancy}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
              <span>{room.bed}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>{room.view}</span>
            </div>
          </div>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {room.features.slice(0, 4).map((feat, i) => (
              <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                {feat}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Card Footer Availability & Buttons */}
      <div className="p-6 pt-0 space-y-4">
        
        {/* Availability & Booking Guarantee Box */}
        <div className="flex items-center justify-between bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-900 font-bold block">Direct Booking Engine</span>
            <span className="text-xs text-emerald-700 font-medium">Instant Confirmation · Best Rate</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded block">
              Free Cancellation
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onSelectRoom}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-3 rounded-xl transition-colors text-xs flex items-center justify-center gap-1"
          >
            <span>View Photos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={getDirectBookingUrl({ room: room.id })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#0F382C] hover:bg-emerald-950 text-white font-bold py-3 px-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>Check Availability</span>
          </a>
        </div>

      </div>

    </div>
  );
};
