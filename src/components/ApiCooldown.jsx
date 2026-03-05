import React from 'react';

export default function ApiCooldown({ secondsLeft }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px',
      background: 'linear-gradient(135deg, #0a1628, #0d1f35)',
      border: '1px solid rgba(255,51,102,0.12)',
      borderRadius: 12,
      color: '#ff6688'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 800, letterSpacing: '3px' }}>
          ⚠ API COOLDOWN
        </div>
        <div style={{ marginTop: 8, color: '#ff99aa' }}>
          The data provider is rate-limiting requests. Next retry in {secondsLeft} seconds.
        </div>
        <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#94a3b8' }}>
          Showing cached data if available.
        </div>
      </div>
    </div>
  );
}
