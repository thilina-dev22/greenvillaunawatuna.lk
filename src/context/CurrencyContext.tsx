import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLiveHotelMatePrices, type SyncedPriceMap } from '../services/rateSyncService';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
];

// Fallback rates in case network is offline or API fails
const INITIAL_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 155.0,
  LKR: 300.0,
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Record<string, number>;
  isLiveRates: boolean;
  syncedPrices: SyncedPriceMap;
  isRateSynced: boolean;
  getRoomUsdPrice: (roomId: string, defaultPriceUSD: number) => number;
  formatAmount: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]); // USD default
  const [rates, setRates] = useState<Record<string, number>>(INITIAL_RATES);
  const [isLiveRates, setIsLiveRates] = useState<boolean>(false);
  const [syncedPrices, setSyncedPrices] = useState<SyncedPriceMap>({});
  const [isRateSynced, setIsRateSynced] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch live currency exchange rates
    const fetchLiveRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Primary exchange rate API failed');
        const data = await response.json();
        
        if (data && data.rates && isMounted) {
          setRates((prev) => ({
            ...prev,
            USD: 1.0,
            EUR: data.rates.EUR || prev.EUR,
            GBP: data.rates.GBP || prev.GBP,
            JPY: data.rates.JPY || prev.JPY,
            LKR: data.rates.LKR || prev.LKR,
          }));
          setIsLiveRates(true);
        }
      } catch (err) {
        console.warn('Primary rate API error, trying fallback...', err);
        try {
          const fallbackRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          if (!fallbackRes.ok) throw new Error('Fallback API failed');
          const fallbackData = await fallbackRes.json();
          if (fallbackData && fallbackData.rates && isMounted) {
            setRates((prev) => ({
              ...prev,
              USD: 1.0,
              EUR: fallbackData.rates.EUR || prev.EUR,
              GBP: fallbackData.rates.GBP || prev.GBP,
              JPY: fallbackData.rates.JPY || prev.JPY,
              LKR: fallbackData.rates.LKR || prev.LKR,
            }));
            setIsLiveRates(true);
          }
        } catch (fallbackErr) {
          console.warn('Fallback rate API error, using built-in rates:', fallbackErr);
        }
      }
    };

    // 2. Fetch live HotelMate prices
    const fetchHotelMateRates = async () => {
      const prices = await fetchLiveHotelMatePrices();
      if (isMounted && Object.keys(prices).length > 0) {
        setSyncedPrices(prices);
        setIsRateSynced(true);
      }
    };

    fetchLiveRates();
    fetchHotelMateRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const getRoomUsdPrice = (roomId: string, defaultPriceUSD: number): number => {
    return syncedPrices[roomId] ?? defaultPriceUSD;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchLiveRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Primary exchange rate API failed');
        const data = await response.json();
        
        if (data && data.rates && isMounted) {
          setRates((prev) => ({
            ...prev,
            USD: 1.0,
            EUR: data.rates.EUR || prev.EUR,
            GBP: data.rates.GBP || prev.GBP,
            JPY: data.rates.JPY || prev.JPY,
            LKR: data.rates.LKR || prev.LKR,
          }));
          setIsLiveRates(true);
        }
      } catch (err) {
        console.warn('Primary rate API error, trying fallback...', err);
        try {
          const fallbackRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          if (!fallbackRes.ok) throw new Error('Fallback API failed');
          const fallbackData = await fallbackRes.json();
          if (fallbackData && fallbackData.rates && isMounted) {
            setRates((prev) => ({
              ...prev,
              USD: 1.0,
              EUR: fallbackData.rates.EUR || prev.EUR,
              GBP: fallbackData.rates.GBP || prev.GBP,
              JPY: fallbackData.rates.JPY || prev.JPY,
              LKR: fallbackData.rates.LKR || prev.LKR,
            }));
            setIsLiveRates(true);
          }
        } catch (fallbackErr) {
          console.warn('Fallback rate API error, using built-in rates:', fallbackErr);
        }
      }
    };

    fetchLiveRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatAmount = (usdAmount: number): string => {
    const rate = rates[currency.code] || 1.0;
    const converted = Math.round(usdAmount * rate);
    if (currency.code === 'JPY') {
      return `${currency.symbol}${converted.toLocaleString()}`;
    }
    if (currency.code === 'LKR') {
      return `LKR ${converted.toLocaleString()}`;
    }
    return `${currency.symbol}${converted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, isLiveRates, syncedPrices, isRateSynced, getRoomUsdPrice, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
