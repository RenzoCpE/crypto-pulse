import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');

    const statusMessages = [
        'INITIALIZING SYSTEM...',
        'CONNECTING TO BLOCKCHAIN...',
        'FETCHING MARKET DATA...',
        'DECRYPTING NODES...',
        'SYNCING LEDGER...',
        'SYSTEM ONLINE.',
    ];

    useEffect(() => {
        let current = 0;

        const interval = setInterval(() => {
            current += 2;
            setProgress(current);

            // Change status text at certain points
            if (current === 20) setStatusText(statusMessages[1]);
            if (current === 40) setStatusText(statusMessages[2]);
            if (current === 60) setStatusText(statusMessages[3]);
            if (current === 80) setStatusText(statusMessages[4]);
            if (current === 95) setStatusText(statusMessages[5]);

            if (current >= 100) {
                clearInterval(interval);
                setTimeout(() => onComplete(), 500);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            background: '#020b18',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            gap: '32px',
        }}>

            {/* Scanline overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.015) 2px, rgba(0,255,247,0.015) 4px)',
                pointerEvents: 'none',
            }} />

            {/* Logo */}
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '3rem',
                    fontWeight: 900,
                    letterSpacing: '8px',
                    color: '#00fff7',
                    textShadow: '0 0 30px rgba(0,255,247,0.9), 0 0 60px rgba(0,255,247,0.4)',
                    marginBottom: '8px',
                }}>
                    CRYPTO
                    <span style={{ color: '#ffffff', textShadow: 'none' }}>PULSE</span>
                </div>
                <div style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '0.8rem',
                    color: '#334155',
                    letterSpacing: '6px',
                }}>
                    MARKET INTELLIGENCE SYSTEM
                </div>
            </div>

            {/* Spinning Ring */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div style={{
                    position: 'absolute',
                    width: '80px', height: '80px',
                    border: '2px solid rgba(0,255,247,0.1)',
                    borderTop: '2px solid #00fff7',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    boxShadow: '0 0 15px rgba(0,255,247,0.3)',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '10px', left: '10px',
                    width: '60px', height: '60px',
                    border: '2px solid rgba(0,255,247,0.05)',
                    borderBottom: '2px solid rgba(0,255,247,0.5)',
                    borderRadius: '50%',
                    animation: 'spin 1.5s linear infinite reverse',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.65rem',
                    color: '#00fff7',
                    fontWeight: 700,
                }}>{progress}%</div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '320px' }}>
                <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(0,255,247,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #00fff7, #0088ff)',
                        borderRadius: '4px',
                        boxShadow: '0 0 10px rgba(0,255,247,0.8)',
                        transition: 'width 0.03s linear',
                    }} />
                </div>

                {/* Status Text */}
                <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.65rem',
                    color: '#00fff7',
                    letterSpacing: '3px',
                    textAlign: 'center',
                    textShadow: '0 0 10px rgba(0,255,247,0.6)',
                }}>
                    {statusText}
                </div>
            </div>

            {/* Bottom grid lines decoration */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0,
                width: '100%', height: '150px',
                background: 'linear-gradient(0deg, rgba(0,255,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,247,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
            }} />

            {/* Spin keyframe */}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;