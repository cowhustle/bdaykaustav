import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Preload } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import './index.css';

function App() {
  const [candleBlown, setCandleBlown] = useState(false);
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <>
      {!hasStarted && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', 
          alignItems: 'center', backgroundColor: '#0b0710', color: 'white'
        }}>
          <h1 className="serif glow-text" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', padding: '0 1rem' }}>
            A journey through time...
          </h1>
          <button 
            onClick={startExperience}
            className="blow-button"
          >
            Begin
          </button>
        </div>
      )}

      {/* Audio element for background music. 
          Using a calm, romantic royalty-free piano track placeholder. 
          User can replace the src with their preferred audio. */}
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/05/16/audio_9bc5c30b2c.mp3?filename=emotional-piano-110034.mp3" 
        loop 
      />

      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <color attach="background" args={['#0b0710']} />
        <fog attach="fog" args={['#0b0710', 5, 15]} />
        
        <Suspense fallback={null}>
          {hasStarted && (
            <ScrollControls pages={7} damping={0.15} distance={1.5}>
              <Experience candleBlown={candleBlown} />
              <Overlay candleBlown={candleBlown} setCandleBlown={setCandleBlown} />
            </ScrollControls>
          )}
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
