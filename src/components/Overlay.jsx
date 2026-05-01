import React, { useEffect, useRef } from 'react';
import { Scroll } from '@react-three/drei';
import confetti from 'canvas-confetti';

export default function Overlay({ candleBlown, setCandleBlown }) {
  const handleBlowCandle = () => {
    setCandleBlown(true);
    // Trigger confetti
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#d896ff', '#ffd700', '#ffffff']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#d896ff', '#ffd700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <Scroll html className="html-story-container">
      {/* Page 1 */}
      <div className="story-section">
        <div className="glass-panel" style={{ opacity: 0, animation: 'fadeIn 3s ease forwards 1s' }}>
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>1st May 2009</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            ...a wonderful person <br/>came into this world 🎈
          </p>
        </div>
      </div>

      {/* Page 2 */}
      <div className="story-section">
        <div className="glass-panel">
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>2012</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            A kid with the <br/>brightest smile ✨
          </p>
        </div>
      </div>

      {/* Page 3 */}
      <div className="story-section">
        <div className="glass-panel">
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>2016</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            Growing up, learning, <br/>and becoming stronger 🦋
          </p>
        </div>
      </div>

      {/* Page 4 */}
      <div className="story-section">
        <div className="glass-panel">
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>2020</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            Navigating life and <br/>shining in your own way 🌟
          </p>
        </div>
      </div>

      {/* Page 5 */}
      <div className="story-section">
        <div className="glass-panel">
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>2023</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            Always spreading kindness <br/>wherever you go 💫
          </p>
        </div>
      </div>

      {/* Page 6 */}
      <div className="story-section">
        <div className="glass-panel">
          <h2 className="glow-text gradient-text" style={{ fontSize: '2.5rem' }}>2026</h2>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem', fontWeight: 300, lineHeight: '1.6' }}>
            The year our paths crossed <br/>and we became great friends 🎉
          </p>
        </div>
      </div>

      {/* Page 7: Climax */}
      <div className="story-section" style={{ pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', pointerEvents: 'auto', marginTop: '15vh' }}>
          <h1 className="glow-text gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif" }}>
            Happy Birthday Rimi 🎂
          </h1>
          <p style={{ fontSize: '1.4rem', fontWeight: 500, color: '#5d3a5a', marginBottom: '2rem', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>
            You bring so much joy and<br/>positivity to everyone around you.
          </p>
          
          <div style={{ height: '80px' }}>
            {!candleBlown ? (
              <button className="blow-button" onClick={handleBlowCandle}>
                Tap to blow the candle
              </button>
            ) : (
              <div style={{ animation: 'fadeIn 2s ease forwards' }}>
                <p style={{ fontSize: '1.3rem', color: '#ff69b4', fontStyle: 'italic', textShadow: '0 0 10px rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  May all your wishes come true... ✨
                </p>
                <p style={{ fontSize: '1.1rem', color: '#d896ff', marginTop: '1rem', fontStyle: 'italic', fontWeight: 500 }}>
                  ... from Mr. stranger.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
      `}} />
    </Scroll>
  );
}
