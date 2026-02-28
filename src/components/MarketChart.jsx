import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
    const { coins } = useCrypto();

    const chartData = coins.map(coin => ({
        name: coin.symbol.toUpperCase(),
        price: coin.current_price
    }));

    return (
        <div className="h-80 w-full p-4 bg-gray-800 rounded-xl mt-6">
            <h2 className="text-white mb-4">Price Trend (USD)</h2>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        dot={{ fill: '#22d3ee' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MarketChart;