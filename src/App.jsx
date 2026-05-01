import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Preload } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import RibbonCut from './components/RibbonCut';
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
        <RibbonCut onCut={startExperience} />
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
        dpr={[1, 1]} 
        camera={{ position: [0, 0, 0.5], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: false }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#fff0f5']} />
        <fog attach="fog" args={['#fff0f5', 10, 30]} />
        
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
