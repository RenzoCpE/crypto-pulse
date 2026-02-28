import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
    const { loading, error } = useFetchCrypto();
    const { coins } = useCrypto();
    const [search, setSearch] = useLocalStorage('cryptoSearch', '');
    const searchRef = useRef(null);

    // useRef: auto-focus the search input on page load
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    // Controlled Form: filter coins in real-time
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p className="text-white text-center mt-10">Scanning Blockchain...</p>;
    if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <input
                ref={searchRef}
                type="text"
                placeholder="Search coins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCoins.map(coin => (
                    <div key={coin.id} className="bg-gray-800 p-4 rounded-xl text-white">
                        <h3 className="font-bold text-lg">{coin.name} ({coin.symbol.toUpperCase()})</h3>
                        <p className="text-cyan-400">${coin.current_price.toLocaleString()}</p>
                        <p className={coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                    </div>
                ))}
            </div>
            <MarketChart />
        </div>
    );
};

export default Home;