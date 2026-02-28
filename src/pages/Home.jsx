import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const CoinCard = ({ coin, index }) => {
    const isPositive = coin.price_change_percentage_24h >= 0;

    return (
        <div className="card-glow fade-in" style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #0d1f35 100%)',
            borderRadius: '12px',
            padding: '20px',
            animationDelay: `${index * 0.05}s`,
            opacity: 0,
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={coin.image} alt={coin.name} style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(0,255,247,0.3)',
                    }} />
                    <div>
                        <div style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#00fff7',
                            letterSpacing: '1px',
                        }}>{coin.symbol.toUpperCase()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{coin.name}</div>
                    </div>
                </div>
                <div style={{
                    background: isPositive ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)',
                    border: `1px solid ${isPositive ? 'rgba(0,255,136,0.4)' : 'rgba(255,51,102,0.4)'}`,
                    borderRadius: '20px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: isPositive ? '#00ff88' : '#ff3366',
                    textShadow: isPositive ? '0 0 8px #00ff88' : '0 0 8px #ff3366',
                }}>
                    {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
            </div>

            {/* Price */}
            <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
            }}>
                ${coin.current_price.toLocaleString()}
            </div>

            {/* Market Cap */}
            <div style={{
                fontSize: '0.72rem',
                color: '#475569',
                borderTop: '1px solid rgba(0,255,247,0.08)',
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <span>MKT CAP</span>
                <span style={{ color: '#94a3b8' }}>
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                </span>
            </div>

            {/* Rank badge */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.6rem',
                color: 'rgba(0,255,247,0.3)',
            }}>#{coin.market_cap_rank}</div>
        </div>
    );
};

const Home = () => {
    const { loading, error } = useFetchCrypto();
    const { coins } = useCrypto();
    const [search, setSearch] = useState('');
    const searchRef = useRef(null);

    useEffect(() => {
        if (searchRef.current) searchRef.current.focus();
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '80vh', gap: '20px',
        }}>
            <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1rem',
                color: '#00fff7',
                letterSpacing: '4px',
                textShadow: '0 0 20px rgba(0,255,247,0.8)',
            }} className="pulse">
                SCANNING BLOCKCHAIN...
            </div>
            <div style={{
                width: '200px', height: '2px',
                background: 'linear-gradient(90deg, transparent, #00fff7, transparent)',
                animation: 'pulse-neon 1.5s infinite',
            }} />
        </div>
    );

    if (error) return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '80vh',
            fontFamily: 'Orbitron, sans-serif',
            color: '#ff3366',
            textShadow: '0 0 20px #ff3366',
            letterSpacing: '3px',
        }}>
            ⚠ MARKET OFFLINE: {error}
        </div>
    );

    return (
        <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '3px',
                    marginBottom: '6px',
                }}>
                    MARKET <span style={{ color: '#00fff7', textShadow: '0 0 15px rgba(0,255,247,0.8)' }}>OVERVIEW</span>
                </h2>
                <p style={{ color: '#475569', fontSize: '0.85rem', letterSpacing: '1px' }}>
                    TOP 10 CRYPTOCURRENCIES BY MARKET CAP
                </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '30px', maxWidth: '400px' }}>
                <span style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#00fff7', fontSize: '14px',
                }}>⌕</span>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="SEARCH COINS..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px 12px 40px',
                        background: 'rgba(0,255,247,0.05)',
                        border: '1px solid rgba(0,255,247,0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.75rem',
                        letterSpacing: '2px',
                        outline: 'none',
                        boxShadow: '0 0 15px rgba(0,255,247,0.1)',
                    }}
                />
            </div>

            {/* Coin Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '40px',
            }}>
                {filteredCoins.map((coin, index) => (
                    <div key={coin.id} style={{ position: 'relative' }}>
                        <CoinCard coin={coin} index={index} />
                    </div>
                ))}
            </div>

            {/* Chart */}
            <MarketChart />
        </div>
    );
};

export default Home;