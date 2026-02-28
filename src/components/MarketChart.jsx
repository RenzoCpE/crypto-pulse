import { useState } from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'linear-gradient(135deg, #0a1628, #0d1f35)',
                border: '1px solid rgba(0,255,247,0.4)',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 0 20px rgba(0,255,247,0.2)',
            }}>
                <p style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.7rem',
                    color: '#00fff7',
                    letterSpacing: '2px',
                    marginBottom: '4px',
                }}>{label}</p>
                <p style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.85rem',
                    color: '#ffffff',
                    fontWeight: 700,
                }}>${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const MarketChart = () => {
    const { coins } = useCrypto();
    const [chartType, setChartType] = useState('bar');

    const chartData = coins.map(coin => ({
        name: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
    }));

    const commonProps = {
        data: chartData,
    };

    const commonAxisProps = {
        xAxis: (
            <XAxis
                dataKey="name"
                stroke="rgba(0,255,247,0.3)"
                tick={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 10,
                    fill: '#64748b',
                    letterSpacing: 1,
                }}
                axisLine={{ stroke: 'rgba(0,255,247,0.2)' }}
                tickLine={false}
            />
        ),
        yAxis: (
            <YAxis
                stroke="rgba(0,255,247,0.3)"
                tick={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: 11,
                    fill: '#64748b',
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
        ),
        tooltip: <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,255,247,0.05)' }} />,
        grid: <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,247,0.05)" vertical={false} />,
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #0d1f35 100%)',
            border: '1px solid rgba(0,255,247,0.2)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 0 30px rgba(0,255,247,0.05)',
        }}>

            {/* Chart Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '3px',
                        marginBottom: '4px',
                    }}>PRICE COMPARISON</h3>
                    <p style={{ fontSize: '0.72rem', color: '#475569', letterSpacing: '1px' }}>USD VALUE — TOP 10</p>
                </div>

                {/* Toggle Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['bar', 'line'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontSize: '0.65rem',
                                letterSpacing: '2px',
                                padding: '8px 18px',
                                borderRadius: '6px',
                                border: chartType === type
                                    ? '1px solid #00fff7'
                                    : '1px solid rgba(0,255,247,0.2)',
                                background: chartType === type
                                    ? 'rgba(0,255,247,0.15)'
                                    : 'transparent',
                                color: chartType === type ? '#00fff7' : '#475569',
                                boxShadow: chartType === type
                                    ? '0 0 15px rgba(0,255,247,0.3)'
                                    : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {type === 'bar' ? '▐ BAR' : '╱ LINE'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart {...commonProps} barCategoryGap="30%">
                            {commonAxisProps.grid}
                            {commonAxisProps.xAxis}
                            {commonAxisProps.yAxis}
                            {commonAxisProps.tooltip}
                            <Bar dataKey="price" radius={[6, 6, 0, 0]} maxBarSize={50}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.change >= 0 ? '#00fff7' : '#ff3366'}
                                        opacity={0.8 - index * 0.05}
                                        style={{
                                            filter: `drop-shadow(0 0 6px ${entry.change >= 0 ? '#00fff7' : '#ff3366'})`,
                                        }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <LineChart {...commonProps}>
                            {commonAxisProps.grid}
                            {commonAxisProps.xAxis}
                            {commonAxisProps.yAxis}
                            {commonAxisProps.tooltip}
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#00fff7"
                                strokeWidth={2}
                                dot={{ fill: '#00fff7', r: 4, strokeWidth: 0 }}
                                activeDot={{
                                    r: 6,
                                    fill: '#00fff7',
                                    boxShadow: '0 0 10px #00fff7',
                                }}
                                style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,247,0.6))' }}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex', gap: '20px', marginTop: '16px',
                borderTop: '1px solid rgba(0,255,247,0.08)',
                paddingTop: '16px',
            }}>
                {chartType === 'bar' ? (
                    <>
                        {[{ color: '#00fff7', label: 'POSITIVE 24H' }, { color: '#ff3366', label: 'NEGATIVE 24H' }].map(({ color, label }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '12px', height: '12px', borderRadius: '2px',
                                    background: color, boxShadow: `0 0 8px ${color}`,
                                }} />
                                <span style={{
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontSize: '0.6rem', color: '#475569', letterSpacing: '1px',
                                }}>{label}</span>
                            </div>
                        ))}
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '24px', height: '2px',
                            background: '#00fff7',
                            boxShadow: '0 0 8px #00fff7',
                        }} />
                        <span style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.6rem', color: '#475569', letterSpacing: '1px',
                        }}>PRICE TREND</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketChart;