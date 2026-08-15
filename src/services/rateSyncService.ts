/**
 * Rate Sync Service
 * Direct booking redirection mode (live price display removed per client request)
 */

export interface SyncedPriceMap {
  [roomId: string]: number;
}

export async function fetchLiveHotelMatePrices(): Promise<SyncedPriceMap> {
  return {};
}

