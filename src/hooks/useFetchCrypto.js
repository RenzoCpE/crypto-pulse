import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
    const { setCoins, currency } = useCrypto();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1`
                );
                if (!res.ok) throw new Error("The Market is closed (API Error)");
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarket();
    }, [currency, setCoins]); // 👈 Re-fetches whenever currency changes

    return { loading, error };
};