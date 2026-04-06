"use client";

import { useState, useEffect, useRef } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const beaconRef = useRef(null);
  
  // High-performance scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Visibility threshold
      setIsVisible(scrollY > 400);

      // Progress Calculation
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic Interaction Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!beaconRef.current || !isVisible) return;

      const { left, top, width, height } = beaconRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      const maxDistance = 120; // Magnetic pull radius

      if (distance < maxDistance) {
        const pullStrength = 15; // Elasticity
        const x = (mouseX - centerX) / pullStrength;
        const y = (mouseY - centerY) / pullStrength;
        setTransform({ x, y });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG Progress Circle Geometry
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`scholar-beacon-wrap ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
      }}
    >
      <button
        ref={beaconRef}
        onClick={scrollToTop}
        className="scholar-beacon"
        aria-label="Scroll to top"
      >
        <svg className="beacon-progress-ring" width="60" height="60">
          <circle 
            className="ring-background" 
            cx="30" cy="30" r={radius} 
          />
          <circle 
            className="ring-progress" 
            cx="30" cy="30" r={radius} 
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: offset 
            }}
          />
        </svg>
        <div className="beacon-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </div>
      </button>
    </div>
  );
}
