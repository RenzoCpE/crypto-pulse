import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav style={{
      background: 'linear-gradient(90deg, #020b18 0%, #0a1628 50%, #020b18 100%)',
      borderBottom: '1px solid rgba(0,255,247,0.3)',
      boxShadow: '0 0 30px rgba(0,255,247,0.1)',
      padding: '0 2rem',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px',
          border: '2px solid #00fff7',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0,255,247,0.5)',
        }}>
          <span style={{ color: '#00fff7', fontSize: '18px', fontWeight: 900 }}>₿</span>
        </div>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.3rem',
          fontWeight: 900,
          letterSpacing: '4px',
          color: '#00fff7',
          textShadow: '0 0 20px rgba(0,255,247,0.8)',
        }}>
          CRYPTO<span style={{ color: '#ffffff', textShadow: 'none' }}>PULSE</span>
        </h1>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>MARKET</Link>
        <Link to="/analysis" className={location.pathname === '/analysis' ? 'nav-link active' : 'nav-link'}>ANALYSIS</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="live-pill" style={{ marginRight: 8 }}>
          <div className="pulse" style={{
            width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88'
          }} />
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', color: '#00ff88', letterSpacing: '2px' }}>LIVE</span>
        </div>

        <button className="hamburger" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>
          {open ? <X size={20} color="#00fff7" /> : <Menu size={20} color="#00fff7" />}
        </button>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`} role="dialog" aria-hidden={!open} style={{ right: 16 }}>
        <Link to="/" className={location.pathname === '/' ? 'mobile-link active' : 'mobile-link'} onClick={() => setOpen(false)}>MARKET</Link>
        <Link to="/analysis" className={location.pathname === '/analysis' ? 'mobile-link active' : 'mobile-link'} onClick={() => setOpen(false)}>ANALYSIS</Link>
      </div>
    </nav>
  );
}
