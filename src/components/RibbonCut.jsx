import React, { useState, useRef, useEffect } from 'react';
import { Scissors, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RibbonCut({ onCut }) {
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cut, setCut] = useState(false);
  const containerRef = useRef(null);

  const handlePointerDown = (e) => {
    if (cut) return;
    setIsDragging(true);
    // document.body.style.userSelect = 'none';
  };

  const handlePointerMove = (e) => {
    if (!isDragging || cut) return;
    updateProgress(e);
  };

  const handlePointerUp = () => {
    if (cut) return;
    setIsDragging(false);
    // document.body.style.userSelect = 'auto';
    if (dragProgress >= 85) {
      completeCut();
    } else {
      setDragProgress(0); // Snap back if not enough
    }
  };

  const updateProgress = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Support both mouse and touch events
    let clientX = e.clientX;
    if (e.type.includes('touch') && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }
    
    if (clientX === undefined) return;
    
    let progress = ((clientX - rect.left) / rect.width) * 100;
    progress = Math.max(0, Math.min(100, progress));
    setDragProgress(progress);
    
    if (progress >= 85) {
      completeCut();
    }
  };

  const completeCut = () => {
    setDragProgress(100);
    setCut(true);
    setIsDragging(false);
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ffb6c1', '#ff69b4', '#ffe4e1', '#ffffff']
    });

    setTimeout(() => {
      onCut();
    }, 1500); // Wait for animation before proceeding
  };

  // Global mouse up to catch drops outside
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDragging) {
        handlePointerUp();
      }
    };
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging, dragProgress]);

  return (
    <div className={`ribbon-container ${cut ? 'fade-out' : ''}`}>
      <h1 className="ribbon-title">A Special Surprise Awaits...</h1>
      
      <div 
        className="ribbon-track" 
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        {/* The Ribbon Line */}
        <div className={`ribbon-line ${cut ? 'ribbon-cut-left' : ''}`} style={{ width: cut ? '50%' : '100%', left: 0 }} />
        <div className={`ribbon-line ${cut ? 'ribbon-cut-right' : ''}`} style={{ width: cut ? '50%' : '100%', right: 0 }} />

        {/* Drag Instruction */}
        {!isDragging && dragProgress === 0 && !cut && (
          <div className="drag-instruction">
            <span>Slide to cut ribbon</span>
            <ArrowRight size={20} className="pulse-arrow" />
          </div>
        )}

        {/* The Scissor Thumb */}
        <div 
          className="scissor-thumb"
          style={{ 
            left: `${dragProgress}%`,
            transform: `translateX(-50%) scale(${isDragging ? 1.1 : 1})`,
            transition: isDragging ? 'none' : 'all 0.3s ease'
          }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          <div className={`scissor-icon ${isDragging ? 'scissor-cutting' : ''} ${cut ? 'scissor-hide' : ''}`}>
            <Scissors size={40} color="#ff69b4" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
