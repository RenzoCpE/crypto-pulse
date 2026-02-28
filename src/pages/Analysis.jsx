import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
    const { coins, currency, setCurrency } = useCrypto();

    return (
        <div className="bg-gray-900 min-h-screen p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Market Analysis</h2>
            <div className="mb-4">
                <label className="mr-2">Currency:</label>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PHP">PHP</option>
                </select>
            </div>
            <ul>
                {coins.map(coin => (
                    <li key={coin.id} className="p-3 bg-gray-800 rounded-lg mb-2">
                        {coin.name}: ${coin.current_price.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Analysis;