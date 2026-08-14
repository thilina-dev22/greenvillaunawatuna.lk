/**
 * Rate Sync Service
 * Automated price synchronization from HotelMate IBE API for Green Villa Unawatuna (Hotel ID: 27)
 */

const HOTELMATE_CHUNK_URL = 'https://www.hotelmate.net/_next/static/chunks/52759868b23becfb.js';
const HOTELMATE_API_URL = 'https://liveapi365.hotelmate.app/api/hotelrateplans/hotel/27?isCmActive=true';
const FALLBACK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjkwNGE1OTAtYmRhYS00ZjY1LTlmOWYtNTI0ZWU2MzBiNzJmIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA6L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSWJlVXNlciIsImZ1bGxOYW1lIjoiVGhhbnVqYSBHYW1hZ2UiLCJlbWFpbCI6Im1nYW1hZ2V0aGFudWphMjFAZ21haWwuY29tIiwiaG90ZWxzIjoiW10iLCJuYmYiOjE3NjQ3NjkzMjMsImV4cCI6MjUzNDAyMjgxMDAwLCJpc3OiOiJIb3RlbE1hdGVJc3N1ZXIiLCJhdWQiOiJIb3RlbE1hdGVNYW5hZ2VyIn0.uUzauDPoScjhSdKZoCIW8xrODP9SJobgyi4SLnF4RGw';

export interface SyncedPriceMap {
  [roomId: string]: number; // Maps room ID to price in USD
}

const ROOM_TITLE_MAPPING: Record<string, string> = {
  'apartment': 'three-bedroom-apartment',
  'penthouse': 'penthouse-suite',
  'deluxe with balcony': 'deluxe-double-balcony',
  'deluxe ground floor': 'deluxe-double-room',
  'deluxe room': 'deluxe-double-room'
};

let cachedPrices: SyncedPriceMap | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

async function getActiveToken(): Promise<string> {
  try {
    const chunkRes = await fetch(HOTELMATE_CHUNK_URL);
    if (chunkRes.ok) {
      const text = await chunkRes.text();
      const match = text.match(/Bearer (eyJ[a-zA-Z0-9_\-.]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch {
    // Fall back to stored token
  }
  return FALLBACK_TOKEN;
}

export async function fetchLiveHotelMatePrices(): Promise<SyncedPriceMap> {
  const now = Date.now();
  if (cachedPrices && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPrices;
  }

  try {
    const token = await getActiveToken();
    const response = await fetch(HOTELMATE_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const priceMap: SyncedPriceMap = {};

    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        const title = (item.title || '').toLowerCase();
        if (title.includes('ibe') || title.includes('room only')) {
          const defaultRate = Number(item.defaultRate);
          if (defaultRate > 0) {
            for (const [key, roomId] of Object.entries(ROOM_TITLE_MAPPING)) {
              if (title.includes(key) && !priceMap[roomId]) {
                priceMap[roomId] = defaultRate;
              }
            }
          }
        }
      });
    }

    if (Object.keys(priceMap).length > 0) {
      cachedPrices = priceMap;
      lastFetchTime = now;
      console.log('[RateSync] Successfully synced live rates from HotelMate IBE:', priceMap);
    }

    return priceMap;
  } catch (error) {
    console.warn('[RateSync] Could not fetch live rates from HotelMate IBE, falling back to static prices:', error);
    return {};
  }
}
