import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import { useFetchCrypto } from './hooks/useFetchCrypto';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

// Fetch data globally so ALL pages have access
const DataLoader = () => {
  useFetchCrypto();
  return null;
};

const NavBar = () => {
  const location = useLocation();

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
      {/* Logo */}
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

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[{ to: '/', label: 'MARKET' }, { to: '/analysis', label: 'ANALYSIS' }].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            padding: '8px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
            border: location.pathname === to ? '1px solid #00fff7' : '1px solid rgba(0,255,247,0.2)',
            color: location.pathname === to ? '#00fff7' : '#94a3b8',
            background: location.pathname === to ? 'rgba(0,255,247,0.1)' : 'transparent',
            boxShadow: location.pathname === to ? '0 0 15px rgba(0,255,247,0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="pulse" style={{
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#00ff88',
          boxShadow: '0 0 10px #00ff88',
        }} />
        <span style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.65rem',
          color: '#00ff88',
          letterSpacing: '2px',
        }}>LIVE</span>
      </div>
    </nav>
  );
};

function App() {
  return (
    <CryptoProvider>
      <Router>
        {/* DataLoader fetches coins for ALL pages */}
        <DataLoader />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;