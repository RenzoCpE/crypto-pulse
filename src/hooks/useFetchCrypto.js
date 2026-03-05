import { useState, useEffect, useRef } from 'react';
import { useCrypto } from '../context/CryptoContext';
import axiosClient from '../api/axiosClient';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [isCooldown, setIsCooldown] = useState(false);

  const timerRef = useRef(null);
  const isMountedRef = useRef(true);
  const backoffRef = useRef(0); // exponential backoff exponent

  const BASE_INTERVAL = 60_000; // 60s
  const MAX_BACKOFF_EXP = 5; // max 2^5 * BASE_INTERVAL
  const CACHE_KEY = 'cryptoPulse.coins';

  useEffect(() => {
    isMountedRef.current = true;

    // Try to show cached data immediately (stale-while-revalidate)
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.data) {
          setCoins(parsed.data);
          if (parsed.ts) setLastUpdated(new Date(parsed.ts));
          setLoading(false);
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    const scheduleFetch = (delay = BASE_INTERVAL) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => runFetch(), delay);
    };

    const runFetch = async () => {
      if (!isMountedRef.current) return;
      try {
        setLoading(true);
        const res = await axiosClient.get('/v3/coins/markets', {
          params: {
            vs_currency: currency.toLowerCase(),
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
          },
        });

        const data = res.data;

        backoffRef.current = 0; // reset backoff on success
        setIsCooldown(false);
        if (isMountedRef.current) {
          setCoins(data);
          setLastUpdated(new Date());
          setCountdown(60);
          setError(null);
          setLoading(false);
          // cache response (stale-while-revalidate)
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
          } catch (e) { /* ignore */ }
        }

        // schedule next regular fetch
        scheduleFetch(BASE_INTERVAL);
      } catch (err) {
        if (!isMountedRef.current) return;
        // inspect axios error
        const status = err?.response?.status;
        if (status === 429) {
          // axiosClient already performs retries, but if we still get 429, backoff
          backoffRef.current = Math.min(backoffRef.current + 1, MAX_BACKOFF_EXP);
          const nextDelay = Math.pow(2, backoffRef.current) * BASE_INTERVAL;
          setError(`API Error: 429 Too Many Requests — backing off ${Math.round(nextDelay / 1000)}s`);
          setIsCooldown(true);
          scheduleFetch(nextDelay);
        } else if (err?.message && (err.message.includes('timeout') || err.message.includes('Network Error') || err.message.includes('Failed to fetch'))) {
          setError('Network error or timeout. Showing cached data if available.');
          backoffRef.current = Math.min(backoffRef.current + 1, MAX_BACKOFF_EXP);
          const nextDelay = Math.pow(2, backoffRef.current) * BASE_INTERVAL;
          setIsCooldown(true);
          scheduleFetch(nextDelay);
        } else {
          const msg = err?.message || String(err);
          setError(msg);
          setLoading(false);
          // schedule a retry later
          backoffRef.current = Math.min(backoffRef.current + 1, MAX_BACKOFF_EXP);
          const nextDelay = Math.pow(2, backoffRef.current) * BASE_INTERVAL;
          setIsCooldown(true);
          scheduleFetch(nextDelay);
        }
      }
    };

    // start initial fetch immediately
    runFetch();

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currency]);

  // Countdown timer (updates every second based on lastUpdated)
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [lastUpdated]);

  return { loading, error, lastUpdated, countdown, isCooldown };
};