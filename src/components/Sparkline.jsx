import React from 'react';
import { useCrypto } from '../context/CryptoContext';

// Minimal sparkline placeholder that avoids extra network calls.
export default function Sparkline({ coinId }) {
  const { coins } = useCrypto();
  const coin = coins.find(c => c.id === coinId);
  if (!coin) return null;
  const change = coin.price_change_percentage_24h;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: 12, color: change >= 0 ? '#00ff88' : '#ff3366' }}>
        {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
      </div>
    </div>
  );
}