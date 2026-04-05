'use client';
import { useState, useRef, useEffect } from 'react';

export default function TiltImage({ src, alt }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Multiplier controls the intensity of the tilt
        const intensity = 15; 
        
        const rotateY = ((x - centerX) / centerX) * intensity;
        const rotateX = ((centerY - y) / centerY) * intensity;
        
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={containerRef}
            className="tilt-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
                display: 'inline-block',
                width: '100%',
                height: 'auto',
                cursor: 'pointer'
            }}
        >
            <div
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
                    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    transformStyle: 'preserve-3d',
                }}
            >
                <img 
                    src={src} 
                    alt={alt} 
                    className="tilt-image"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '15px',
                        boxShadow: isHovering 
                            ? '0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(236, 114, 125, 0.2)' 
                            : '0 15px 35px rgba(0,0,0,0.3)',
                        display: 'block',
                        backfaceVisibility: 'hidden',
                    }}
                />
                
                {/* Subtle sheen highlight effect */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '15px',
                        background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255,255,255,0.1), transparent 60%)`,
                        pointerEvents: 'none',
                        opacity: isHovering ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    }}
                />
            </div>
        </div>
    );
}
