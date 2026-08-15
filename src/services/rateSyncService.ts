/**
 * Rate Sync Service
 * Automated price synchronization from HotelMate IBE API for Green Villa Unawatuna (Hotel ID: 27)
 */

const HOTELMATE_PAGE_URL = 'https://www.hotelmate.net/hotels/green-villa-unawatuna-galle';
const HOTELMATE_CHUNK_URL = 'https://www.hotelmate.net/_next/static/chunks/52759868b23becfb.js';
const HOTELMATE_API_URL = 'https://liveapi365.hotelmate.app/api/hotelrateplans/hotel/27?isCmActive=false';
const FALLBACK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjkwNGE1OTAtYmRhYS00ZjY1LTlmOWYtNTI0ZWU2MzBiNzJmIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSWJlVXNlciIsImZ1bGxOYW1lIjoiVGhhbnVqYSBHYW1hZ2UiLCJlbWFpbCI6Im1nYW1hZ2V0aGFudWphMjFAZ21haWwuY29tIiwiaG90ZWxzIjoiW10iLCJuYmYiOjE3NjQ3NjkzMjMsImV4cCI6MjUzNDAyMjgxMDAwLCJpc3MiOiJIb3RlbE1hdGVJc3N1ZXIiLCJhdWQiOiJIb3RlbE1hdGVNYW5hZ2VyIn0.uUzauDPoScjhSdKZoCIW8xrODP9SJobgyi4SLnF4RGw';

export interface SyncedPriceMap {
  [roomId: string]: number; // Maps room ID to price in USD
}

const ROOM_TYPE_ID_MAPPING: Record<number, string> = {
  64: 'three-bedroom-apartment',
  67: 'penthouse-suite',
  66: 'deluxe-balcony',
  65: 'deluxe-double',
};

const ROOM_TITLE_MAPPING: Record<string, string> = {
  'apartment': 'three-bedroom-apartment',
  'penthouse': 'penthouse-suite',
  'deluxe with balcony': 'deluxe-balcony',
  'deluxe balcony': 'deluxe-balcony',
  'deluxe ground floor': 'deluxe-double',
  'deluxe double': 'deluxe-double',
  'deluxe room': 'deluxe-double'
};

let cachedPrices: SyncedPriceMap | null = null;
let lastFetchTime = 0;
// Reduced cache TTL to 60 seconds (1 minute) for near real-time updates
const CACHE_TTL_MS = 60 * 1000;

async function getActiveToken(): Promise<string> {
  // 1. Try known direct chunk
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
    // Continue to dynamic page check
  }

  // 2. Try scraping dynamically from HotelMate booking page if chunk hash changed
  try {
    const pageRes = await fetch(HOTELMATE_PAGE_URL);
    if (pageRes.ok) {
      const html = await pageRes.text();
      const scriptMatches = html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js[^"]*)"/g);
      for (const m of scriptMatches) {
        const chunkPath = m[1].split('?')[0];
        try {
          const res = await fetch(`https://www.hotelmate.net${chunkPath}`);
          if (res.ok) {
            const scriptText = await res.text();
            const match = scriptText.match(/Bearer (eyJ[a-zA-Z0-9_\-.]+)/);
            if (match && match[1]) {
              return match[1];
            }
          }
        } catch {
          // ignore individual chunk error
        }
      }
    }
  } catch {
    // Fall back to valid static token
  }

  return FALLBACK_TOKEN;
}

export function parseHotelMateRates(data: any[]): SyncedPriceMap {
  const priceMap: SyncedPriceMap = {};
  if (!Array.isArray(data)) return priceMap;

  // Rank plans: IBE Room Only > IBE > FIT Room Only > Room Only > Others
  const rankedItems: Array<{ roomId: string; defaultRate: number; score: number; id: number }> = [];

  for (const item of data) {
    const title = (item.title || '').toLowerCase();
    const defaultRate = Number(item.defaultRate);
    if (!defaultRate || defaultRate <= 0) continue;

    let roomId: string | null = null;
    if (item.roomTypeID && ROOM_TYPE_ID_MAPPING[item.roomTypeID]) {
      roomId = ROOM_TYPE_ID_MAPPING[item.roomTypeID];
    } else {
      for (const [key, id] of Object.entries(ROOM_TITLE_MAPPING)) {
        if (title.includes(key)) {
          roomId = id;
          break;
        }
      }
    }

    if (!roomId) continue;

    let score = 0;
    const isIBE = title.startsWith('ibe') || title.includes('ibe');
    const isRoomOnly = title.includes('room only');
    const isFIT = title.startsWith('fit') || title.includes('fit');

    if (isIBE && isRoomOnly) score = 100;
    else if (isIBE) score = 80;
    else if (isFIT && isRoomOnly) score = 70;
    else if (isRoomOnly) score = 60;
    else score = 10;

    rankedItems.push({ roomId, defaultRate, score, id: Number(item.hotelRatePlanID) || 0 });
  }

  // Sort descending by score. If tied, pick higher rate plan ID
  rankedItems.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.id - a.id;
  });

  for (const item of rankedItems) {
    if (!priceMap[item.roomId]) {
      priceMap[item.roomId] = item.defaultRate;
    }
  }

  return priceMap;
}

export async function fetchLiveHotelMatePrices(): Promise<SyncedPriceMap> {
  const now = Date.now();
  if (cachedPrices && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPrices;
  }

  // 1. Try internal /api/prices endpoint (Serverless proxy with caching & CORS safety)
  try {
    const apiRes = await fetch('/api/prices');
    if (apiRes.ok) {
      const result = await apiRes.json();
      if (result && result.prices && Object.keys(result.prices).length > 0) {
        const prices: SyncedPriceMap = result.prices;
        cachedPrices = prices;
        lastFetchTime = now;
        console.log('[RateSync] Successfully synced live rates via /api/prices:', prices);
        return prices;
      }
    }
  } catch {
    // Fall back to direct fetch if /api/prices is not reachable (e.g. static dev server)
  }

  // 2. Direct fetch to HotelMate IBE API
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
    const priceMap = parseHotelMateRates(data);

    if (Object.keys(priceMap).length > 0) {
      cachedPrices = priceMap;
      lastFetchTime = now;
      console.log('[RateSync] Successfully synced live rates from HotelMate IBE:', priceMap);
    }

    return priceMap;
  } catch (error) {
    console.warn('[RateSync] Could not fetch live rates from HotelMate IBE, falling back to static prices:', error);
    return cachedPrices ?? {};
  }
}

