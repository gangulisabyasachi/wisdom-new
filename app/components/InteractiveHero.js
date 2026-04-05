'use client';
import { useState, useRef, useEffect } from 'react';

export default function InteractiveHero({ children }) {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: '-100%', y: '-100%' });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: '-100%', y: '-100%' });
  };

  return (
    <section 
      ref={heroRef}
      className="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
        position: 'relative',
        background: `radial-gradient(600px circle at ${mousePos.x} ${mousePos.y}, var(--accent-light), transparent), var(--bg)`
      }}
    >
      {children}
    </section>
  );
}
