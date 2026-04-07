'use client';

import React from 'react';

/**
 * WisdomMascot - High-fidelity Scholarly Orbital SVG Owl
 * Replaces the legacy image-based owl with a modern, data-sovereign vector icon.
 */
const WisdomMascot = ({ className }) => {
  return (
    <div className={`wisdom-mascot-wrapper ${className}`} style={{ position: 'relative' }}>
      <svg 
        viewBox="0 0 100 100" 
        className="wisdom-mascot-svg"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="owl-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00ccff" stopOpacity="0.6" />
          </linearGradient>
          <filter id="mascot-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbital Rings */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,204,255,0.1)" strokeWidth="1" strokeDasharray="5,10" className="orbital-ring-slow" />

        {/* Owl Head/Body Body (Minimalist Geometric) */}
        <path 
          d="M50 15 L75 35 L75 75 L50 90 L25 75 L25 35 Z" 
          fill="url(#owl-gradient)" 
          stroke="#ffffff" 
          strokeWidth="1.5"
          filter="url(#mascot-glow)"
          className="owl-body-path"
        />

        {/* Eyes (Glowing Digital Nodes) */}
        <circle cx="40" cy="45" r="5" fill="#0b0f19" stroke="#00ccff" strokeWidth="1" />
        <circle cx="40" cy="45" r="1.5" fill="#00ccff" className="eye-pulse" />
        
        <circle cx="60" cy="45" r="5" fill="#0b0f19" stroke="#00ccff" strokeWidth="1" />
        <circle cx="60" cy="45" r="1.5" fill="#00ccff" className="eye-pulse" />

        {/* Beak / Academic V-shape */}
        <path d="M50 50 L53 55 L50 60 L47 55 Z" fill="#ffffff" />
        
        {/* Book / Knowledge Base */}
        <path d="M30 75 L50 85 L70 75 L70 78 L50 88 L30 78 Z" fill="#ffffff" opacity="0.8" />
        
        {/* Decorative Circuit Lines (Wisdom Data) */}
        <path d="M25 55 H15" stroke="#00ccff" strokeWidth="0.5" opacity="0.4" />
        <path d="M75 55 H85" stroke="#00ccff" strokeWidth="0.5" opacity="0.4" />
      </svg>
      
      <style jsx>{`
        .wisdom-mascot-wrapper {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        .orbital-ring-slow {
          animation: rotateClockwise 20s linear infinite;
          transform-origin: center;
        }
        .eye-pulse {
          animation: eyeHeartbeat 2s ease-in-out infinite;
        }
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes eyeHeartbeat {
          0%, 100% { fill: #00ccff; filter: drop-shadow(0 0 2px #00ccff); }
          50% { fill: #ffffff; filter: drop-shadow(0 0 5px #00ccff); }
        }
      `}</style>
    </div>
  );
};

export default WisdomMascot;
