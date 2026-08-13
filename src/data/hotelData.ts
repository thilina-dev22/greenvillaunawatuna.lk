export interface Room {
  id: string;
  name: string;
  unitsCount: number;
  size: string;
  occupancy: string;
  bed: string;
  view: string;
  priceLKR: number;
  priceUSD: number;
  breakfastPriceLKR: number;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  bathroomAmenities: string[];
  roomAmenities: string[];
  images: string[];
  bookingUrl: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  flag: string;
  rating: number;
  title: string;
  text: string;
  roomType?: string;
}

export interface Attraction {
  name: string;
  distance: string;
  type: 'beach' | 'culture' | 'transport' | 'dining' | 'nature';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOTEL_INFO = {
  name: "Green Villa Unawatuna",
  tagline: "Tranquil Tropical Sanctuary Just 300m From Unawatuna Beach",
  address: "Yaddehimulla Road, Unawatuna, 80600 Unawatuna, Sri Lanka",
  phone: "0776197726",
  phoneFormatted: "+94 77 619 7726",
  whatsapp: "94776197726",
  email: "info@greenvillaunawatuna.lk",
  directBookingUrl: "https://www.hotelmate.net/hotels/green-villa-unawatuna-galle",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.866744002241!2d80.24305489678956!3d6.013028300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae172f1ef33000b%3A0x23d0468ee0ea48e3!2sGreen%20Villa!5e0!3m2!1sen!2slk!4v1786620683690!5m2!1sen!2slk",
  heroImage: "/images/common/173381778.jpg",
  
  rating: {
    overall: 9.3,
    title: "Superb",
    reviewCount: 179,
    categories: [
      { label: "Location", score: 9.7 },
      { label: "Cleanliness", score: 9.5 },
      { label: "Comfort", score: 9.4 },
      { label: "Facilities", score: 9.3 },
      { label: "Value for Money", score: 9.2 },
      { label: "Staff", score: 9.0 },
      { label: "Free WiFi", score: 6.3 }
    ]
  },
  
  checkIn: "15:00 - 20:00",
  checkOut: "08:00 - 11:00",
};

export const ROOMS: Room[] = [
  {
    id: "three-bedroom-apartment",
    name: "Three-Bedroom Apartment",
    unitsCount: 1,
    size: "120 m²",
    occupancy: "6 Adults",
    bed: "3 Large Double Beds + 1 Sofa Bed",
    view: "Garden View & Private Terrace",
    priceLKR: 36000,
    priceUSD: 120,
    breakfastPriceLKR: 2005,
    shortDescription: "Spacious 120 m² multi-bedroom residence featuring 3 private bedrooms, 3 en-suite bathrooms, full private kitchen, washing machine, and terrace.",
    fullDescription: "Boasting 3 bedrooms and 3 bathrooms, this spacious 120 m² apartment features a separate living room, fully equipped private kitchen, and private terrace overlooking tropical greenery. Perfect for families or group stays, the apartment comes with air conditioning, a washing machine, flat-screen TV, and 4 beds (3 large double beds + 1 sofa bed).",
    features: [
      "120 m² Entire Private Apartment",
      "3 Private Bedrooms & 3 En-suite Bathrooms",
      "Fully Equipped Private Kitchen",
      "Washing Machine & Laundry Amenities",
      "Private Furnished Terrace & Garden View",
      "Air Conditioning & Ceiling Fans",
      "Flat-screen TV with Satellite Channels",
      "Free High-Speed WiFi"
    ],
    bathroomAmenities: [
      "3 Private En-suite Bathrooms",
      "Hot & Cold Walk-in Showers",
      "Free Luxury Toiletries",
      "Hairdryers",
      "Fresh Towels",
      "Toilet Paper & Bidet"
    ],
    roomAmenities: [
      "Air conditioning",
      "Fully equipped kitchen",
      "Washing machine",
      "Kitchenette & cooking utensils",
      "Private terrace & outdoor seating",
      "Flat-screen TV",
      "Satellite channels",
      "Sofa bed & seating area",
      "Laptop safe & clothes rack",
      "Private entrance"
    ],
    images: [
      "/images/apartment/apt-1.jpg",
      "/images/apartment/apt-2.jpg",
      "/images/apartment/apt-3.jpg",
      "/images/apartment/apt-4.jpg",
      "/images/apartment/apt-5.jpg",
      "/images/apartment/apt-6.jpg",
      "/images/apartment/apt-7.jpg",
      "/images/apartment/apt-8.jpg",
      "/images/apartment/apt-9.jpg",
      "/images/apartment/apt-10.jpg",
      "/images/apartment/apt-11.jpg",
      "/images/apartment/apt-12.jpg",
      "/images/apartment/apt-13.jpg",
      "/images/apartment/apt-14.jpg",
      "/images/apartment/apt-15.jpg",
      "/images/apartment/apt-16.jpg",
      "/images/apartment/apt-17.jpg",
      "/images/apartment/apt-18.jpg",
      "/images/apartment/apt-19.jpg",
      "/images/apartment/apt-20.jpg"
    ],
    bookingUrl: "https://www.hotelmate.net/hotels/green-villa-unawatuna-galle"
  },
  {
    id: "penthouse-suite",
    name: "Penthouse Suite",
    unitsCount: 1,
    size: "111 m²",
    occupancy: "2 Adults",
    bed: "1 Extra-Large Double Bed",
    view: "Panoramic Jungle & Canopy View",
    priceLKR: 24000,
    priceUSD: 80,
    breakfastPriceLKR: 2005,
    shortDescription: "Exclusive top-floor luxury penthouse boasting a massive private terrace with a personal spa bath / jacuzzi and panoramic views.",
    fullDescription: "The Penthouse Suite is Green Villa's flagship residence. Spanning a generous 111 square meters, it features a grand private outdoor terrace equipped with a high-end spa bath/jacuzzi, sunbeds, and outdoor dining set under canopy roofs. Inside, enjoy a lavish living room, separate air-conditioned bedroom, multiple pristine bathrooms, minibar, and premium luxury finishes.",
    features: [
      "111 m² Luxury Living Space",
      "Private Terrace with Personal Spa Bath / Jacuzzi",
      "Separate Living Room & Bedroom",
      "Air Conditioning & Ceiling Fan",
      "Flat-screen TV with Satellite",
      "Minibar & Tea/Coffee Maker",
      "Laptop Safe & Deposit Box",
      "Free High-Speed WiFi"
    ],
    bathroomAmenities: [
      "Private Spa Bath / Jacuzzi",
      "Spacious Walk-in Shower",
      "Free Luxury Toiletries",
      "Hairdryer",
      "Fresh Premium Towels",
      "Toilet Paper & Bidet"
    ],
    roomAmenities: [
      "Air conditioning",
      "Private entrance",
      "Minibar",
      "Flat-screen TV",
      "Satellite channels",
      "Desk",
      "Seating area",
      "Laptop safe",
      "Clothes rack",
      "Safety deposit box",
      "Single-room AC"
    ],
    images: [
      "/images/penthouse/333633938.jpg",
      "/images/penthouse/333633924.jpg",
      "/images/penthouse/333633914.jpg",
      "/images/penthouse/240754851.jpg",
      "/images/penthouse/333633880.jpg",
      "/images/penthouse/333633906.jpg",
      "/images/penthouse/333633913.jpg",
      "/images/penthouse/333633921.jpg",
      "/images/penthouse/333633923.jpg"
    ],
    bookingUrl: "https://www.hotelmate.net/hotels/green-villa-unawatuna-galle"
  },
  {
    id: "deluxe-balcony",
    name: "Deluxe Double Room with Balcony",
    unitsCount: 6,
    size: "28 m²",
    occupancy: "2 Adults",
    bed: "1 Extra-Large Double Bed",
    view: "Tropical Garden View",
    priceLKR: 16200,
    priceUSD: 54,
    breakfastPriceLKR: 2005,
    shortDescription: "Air-conditioned retreat featuring a private furnished balcony overlooking the lush tropical garden.",
    fullDescription: "Offering free toiletries and elegant wooden furnishings, this 28 m² Deluxe Double Room includes a private balcony where guests can unwind surrounded by tropical greenery. Complete with an extra-large double bed, private en-suite bathroom, minibar, tea/coffee maker, and flat-screen TV with satellite channels.",
    features: [
      "28 m² Air-conditioned Room",
      "Private Furnished Balcony",
      "1 Extra-Large Double Bed",
      "Lush Tropical Garden View",
      "Flat-screen TV with Satellite",
      "Minibar & Tea/Coffee Maker",
      "Laptop Safe & Desk",
      "Free High-Speed WiFi"
    ],
    bathroomAmenities: [
      "Private En-suite Bathroom",
      "Hot & Cold Shower",
      "Free Toiletries",
      "Hairdryer",
      "Towels",
      "Toilet Paper"
    ],
    roomAmenities: [
      "Air conditioning",
      "Private balcony & outdoor seating",
      "Minibar",
      "Flat-screen TV",
      "Satellite channels",
      "Tea/Coffee maker",
      "Desk & Seating area",
      "Laptop safe",
      "Clothes rack",
      "Safety deposit box",
      "Private entrance"
    ],
    images: [
      "/images/deluxe-balcony/173384864.jpg",
      "/images/deluxe-balcony/78888503.jpg",
      "/images/deluxe-balcony/173384862.jpg",
      "/images/deluxe-balcony/173383401.jpg",
      "/images/deluxe-balcony/173384849.jpg",
      "/images/deluxe-balcony/173384870.jpg",
      "/images/deluxe-balcony/173384877.jpg",
      "/images/deluxe-balcony/173384879.jpg",
      "/images/deluxe-balcony/173384884.jpg"
    ],
    bookingUrl: "https://www.hotelmate.net/hotels/green-villa-unawatuna-galle"
  },
  {
    id: "deluxe-double",
    name: "Deluxe Double Room",
    unitsCount: 3,
    size: "28 m²",
    occupancy: "2 Adults",
    bed: "1 Extra-Large Double Bed",
    view: "Garden View",
    priceLKR: 13200,
    priceUSD: 44,
    breakfastPriceLKR: 2005,
    shortDescription: "Peaceful ground-level room with garden views, air conditioning, plush double bed, and modern amenities.",
    fullDescription: "Designed for peaceful rest and relaxation, the Deluxe Double Room provides 28 m² of tastefully decorated space on the ground floor. Enjoy direct access to tranquil garden vistas, a ultra-comfortable extra-large double bed, private bathroom, minibar, TV, and working desk.",
    features: [
      "28 m² Ground Level Room",
      "1 Extra-Large Double Bed",
      "Garden View Access",
      "Air Conditioning & Ceiling Fan",
      "Flat-screen TV with Satellite",
      "Minibar & Tea/Coffee Maker",
      "Laptop Safe & Desk",
      "Free High-Speed WiFi"
    ],
    bathroomAmenities: [
      "Private Bathroom",
      "Shower & Bath",
      "Free Toiletries",
      "Hairdryer",
      "Towels",
      "Toilet Paper"
    ],
    roomAmenities: [
      "Air conditioning",
      "Minibar",
      "Flat-screen TV",
      "Satellite channels",
      "Desk",
      "Seating area",
      "Laptop safe",
      "Clothes rack",
      "Private entrance",
      "Safety deposit box"
    ],
    images: [
      "/images/deluxe-double/173383692.jpg",
      "/images/deluxe-double/36805299.jpg",
      "/images/deluxe-double/36805362.jpg",
      "/images/deluxe-double/78889092.jpg",
      "/images/deluxe-double/173383673.jpg",
      "/images/deluxe-double/173383702.jpg",
      "/images/deluxe-double/78889081.jpg",
      "/images/deluxe-double/78889085.jpg"
    ],
    bookingUrl: "https://www.hotelmate.net/hotels/green-villa-unawatuna-galle"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Stefania",
    country: "Italy",
    flag: "🇮🇹",
    rating: 10,
    title: "Loved everything about Green Villa",
    text: "Excellent location. The rooms are very large and beautiful. The staff is friendly, kind, and helpful. We really loved it.",
    roomType: "Deluxe Double Room with Balcony"
  },
  {
    id: "rev-2",
    author: "Tilli",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 10,
    title: "Unforgettable Penthouse Experience",
    text: "We stayed in penthouse and the terrace was huge with our own personal jacuzzi! Best spot in Unawatuna.",
    roomType: "Penthouse Suite"
  },
  {
    id: "rev-3",
    author: "Ashi",
    country: "Sri Lanka",
    flag: "🇱🇰",
    rating: 10,
    title: "Perfect Peaceful Location",
    text: "The location is absolutely perfect — centrally located and just a short walk to the beach, yet tucked away enough to feel peaceful, calm, and truly tranquil. The room was spotless!",
    roomType: "Deluxe Double Room"
  },
  {
    id: "rev-4",
    author: "Gordon",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    rating: 9.6,
    title: "Great location & lovely rooms",
    text: "Great location, lovely room and facilities were great. Nice warm showers. Nice breakfast!",
    roomType: "Deluxe Double Room with Balcony"
  },
  {
    id: "rev-5",
    author: "Neil",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 9.6,
    title: "Quiet yet central sanctuary",
    text: "Quiet location even though it was not far from the main road. Very clean and tidy, with staff being very helpful and friendly.",
    roomType: "Deluxe Double Room"
  },
  {
    id: "rev-6",
    author: "Christina",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 10,
    title: "Walking distance from beach & shops",
    text: "Lovely quiet villa just off of the main unawatuna main rd walking distance from beach and all the shops. Rooms clean and bathrooms also good value for money, staff very pleasant and attentive.",
    roomType: "Deluxe Double Room with Balcony"
  },
  {
    id: "rev-7",
    author: "Martin",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 9.5,
    title: "Tastefully designed outdoor areas",
    text: "Lovely setting just off main street. Very tastefully designed outdoor areas and furnishings. Good sized room and balcony.",
    roomType: "Deluxe Double Room with Balcony"
  },
  {
    id: "rev-8",
    author: "Max",
    country: "Sweden",
    flag: "🇸🇪",
    rating: 9.2,
    title: "Jungle vibe balcony",
    text: "Nice green garden. Balcony felt like in the jungle. The rooms were big and nice.",
    roomType: "Deluxe Double Room with Balcony"
  }
];

export const ATTRACTIONS: Attraction[] = [
  { name: "Unawatuna Beach", distance: "300 m (4 min walk)", type: "beach" },
  { name: "Bonavista Beach", distance: "2.3 km", type: "beach" },
  { name: "Rumassala South Beach", distance: "2.4 km", type: "beach" },
  { name: "Dalawella Beach (Turtle Beach)", distance: "2.5 km", type: "beach" },
  { name: "Jungle Beach", distance: "2.7 km", type: "beach" },
  { name: "Unawatuna Railway Station", distance: "1.4 km", type: "transport" },
  { name: "Koggala Airport", distance: "8 km", type: "transport" },
  { name: "Galle Fort National Museum", distance: "5 km", type: "culture" },
  { name: "National Maritime Museum", distance: "6 km", type: "culture" },
  { name: "Galle Fort Clock Tower & Lighthouse", distance: "6 km", type: "culture" },
  { name: "Mati Gedara Restaurant", distance: "50 m", type: "dining" },
  { name: "Le Cafe Francais Bakery", distance: "100 m", type: "dining" },
  { name: "Society Unawatuna", distance: "100 m", type: "dining" }
];

export const FACILITIES = [
  {
    category: "Most Popular Facilities",
    icon: "Sparkles",
    items: [
      "Free High-Speed WiFi throughout property",
      "Free Private Parking on site",
      "Air Conditioning in all rooms",
      "Lush Tropical Garden & Courtyard",
      "Homemade Continental Breakfast",
      "Non-Smoking Rooms"
    ]
  },
  {
    category: "Guest Services & Hospitality",
    icon: "ConciergeBell",
    items: [
      "Tour & Excursion Desk",
      "Car & Scooter Rentals",
      "Private Check-in / Check-out",
      "Ironing & Laundry Service",
      "Safety Deposit Boxes & Laptop Safes",
      "Secure Luggage Lockers"
    ]
  },
  {
    category: "Activities & Experiences",
    icon: "Compass",
    items: [
      "Sri Lankan Cooking Classes (On-site)",
      "Guided Bike Tours & Cycling",
      "Bicycle Rental (Additional charge)",
      "Snorkelling & Scuba Diving (Off-site)",
      "Deep Sea & Coastal Fishing (Off-site)",
      "Surfing & Beach Excursions"
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What room categories are available at Green Villa Unawatuna?",
    answer: "Green Villa features 4 distinct room & residence options: 1 spacious Three-Bedroom Apartment (120 m² with private kitchen & 3 bathrooms), 1 exclusive Penthouse Suite (111 m² with private jacuzzi terrace), 6 Deluxe Double Rooms with Balcony (28 m²), and 3 Deluxe Double Rooms (28 m²)."
  },
  {
    question: "How far is Green Villa from Unawatuna Beach?",
    answer: "We are located just 300 meters from Unawatuna Beach — a quick 3 to 4-minute relaxed walk down Yaddehimulla Road."
  },
  {
    question: "How can I book directly and get the best rates?",
    answer: "You can book directly through our official Channel Manager booking engine at https://www.hotelmate.net/hotels/green-villa-unawatuna-galle or click any 'Book Now' button on this website to view live availability and instant confirmation."
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Standard check-in is between 15:00 and 20:00. Check-out is from 08:00 until 11:00. If you require special arrival times, please let us know in advance!"
  },
  {
    question: "Is breakfast available at the property?",
    answer: "Yes! Delicious homemade continental breakfast can be enjoyed daily on your balcony or in our peaceful garden courtyard."
  },
  {
    question: "Is free parking and WiFi provided?",
    answer: "Yes, we offer complimentary high-speed WiFi in all rooms and common areas, as well as free secure private parking on site."
  },
  {
    question: "Are pets allowed or smoking permitted inside rooms?",
    answer: "To maintain maximum cleanliness and comfort for all guests, pets are not allowed and all indoor areas/rooms are strictly non-smoking (smoking is allowed on outdoor balconies/terracess)."
  }
];
