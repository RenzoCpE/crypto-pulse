import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
    const { coins, currency, setCurrency } = useCrypto();

    // Currency symbol mapper
    const currencySymbol = {
        USD: '$',
        EUR: '€',
        PHP: '₱',
    };

    const symbol = currencySymbol[currency] || '$';

    if (!coins || coins.length === 0) return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '80vh',
            fontFamily: 'Orbitron, sans-serif',
            color: '#00fff7',
            letterSpacing: '4px',
            textShadow: '0 0 20px rgba(0,255,247,0.8)',
        }} className="pulse">
            LOADING MARKET DATA...
        </div>
    );

    return (
        <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '1.5rem', fontWeight: 900,
                        color: '#ffffff', letterSpacing: '3px', marginBottom: '6px',
                    }}>
                        MARKET <span style={{ color: '#00fff7', textShadow: '0 0 15px rgba(0,255,247,0.8)' }}>ANALYSIS</span>
                    </h2>
                    <p style={{ color: '#475569', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        DETAILED BREAKDOWN — ALL ASSETS
                    </p>
                </div>

                {/* Currency Selector */}
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                        background: 'rgba(0,255,247,0.05)',
                        border: '1px solid rgba(0,255,247,0.3)',
                        borderRadius: '8px',
                        color: '#00fff7',
                        padding: '10px 16px',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.75rem',
                        letterSpacing: '2px',
                        outline: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PHP">PHP</option>
                </select>
            </div>

            {/* Table */}
            <div style={{
                background: 'linear-gradient(135deg, #0a1628, #0d1f35)',
                border: '1px solid rgba(0,255,247,0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 0 30px rgba(0,255,247,0.05)',
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 2fr 1.5fr 1fr 1.5fr',
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(0,255,247,0.1)',
                    background: 'rgba(0,255,247,0.03)',
                }}>
                    {['#', 'ASSET', `PRICE (${currency})`, '24H', 'MARKET CAP'].map(h => (
                        <span key={h} style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.65rem', color: '#475569', letterSpacing: '2px',
                        }}>{h}</span>
                    ))}
                </div>

                {/* Table Rows */}
                {coins.map((coin, index) => {
                    const isPositive = coin.price_change_percentage_24h >= 0;
                    return (
                        <div key={coin.id} className="fade-in" style={{
                            display: 'grid',
                            gridTemplateColumns: '50px 2fr 1.5fr 1fr 1.5fr',
                            padding: '16px 24px',
                            borderBottom: '1px solid rgba(0,255,247,0.05)',
                            alignItems: 'center',
                            animationDelay: `${index * 0.05}s`,
                            opacity: 0,
                            transition: 'background 0.2s',
                            cursor: 'default',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,247,0.04)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', color: '#334155' }}>
                                {coin.market_cap_rank}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={coin.image} alt={coin.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                                <div>
                                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', color: '#e2e8f0', letterSpacing: '1px' }}>
                                        {coin.symbol.toUpperCase()}
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>{coin.name}</div>
                                </div>
                            </div>

                            {/* Price with correct symbol */}
                            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', color: '#ffffff', fontWeight: 700 }}>
                                {symbol}{coin.current_price.toLocaleString()}
                            </span>

                            <span style={{
                                fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                                color: isPositive ? '#00ff88' : '#ff3366',
                                textShadow: isPositive ? '0 0 8px #00ff88' : '0 0 8px #ff3366',
                            }}>
                                {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </span>

                            {/* Market cap with correct symbol */}
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                {symbol}{(coin.market_cap / 1e9).toFixed(2)}B
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Analysis;