'use client';
import { useState, useRef, useEffect } from 'react';

export default function TiltImage({ src, alt }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [jitter, setJitter] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHit, setIsHit] = useState(false);
    const containerRef = useRef(null);

    // Continuous floating and random jitters
    useEffect(() => {
        let timer;
        const triggerJitter = () => {
            if (!isHovering && !isHit) {
                // Random drift/jitter
                setJitter({
                    x: (Math.random() - 0.5) * 15,
                    y: (Math.random() - 0.5) * 15,
                    rotate: (Math.random() - 0.5) * 4
                });
                
                // Return to center after a short burst
                setTimeout(() => {
                    setJitter({ x: 0, y: 0, rotate: 0 });
                }, 400 + Math.random() * 600);
            }
            
            // Schedule next random movement
            timer = setTimeout(triggerJitter, 2000 + Math.random() * 4000);
        };

        timer = setTimeout(triggerJitter, 1000);
        return () => clearTimeout(timer);
    }, [isHovering, isHit]);

    const handleMouseMove = (e) => {
        if (!containerRef.current || isHit) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Multiplier controls the intensity of the tilt
        const intensity = 10; 
        
        const rotateY = ((x - centerX) / centerX) * intensity;
        const rotateX = ((centerY - y) / centerY) * intensity;
        
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
        setJitter({ x: 0, y: 0, rotate: 0 });
    };

    const handleClick = () => {
        setIsHit(true);
        // Reset hit state after animation finished
        setTimeout(() => setIsHit(false), 600);
    };

    return (
        <div 
            ref={containerRef}
            className={`tilt-container ${isHit ? 'hit-shake' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                perspective: isHovering ? '1000px' : 'none',
                display: 'inline-block',
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
                transform: `translate(${jitter.x}px, ${jitter.y}px) rotate(${jitter.rotate}deg)`,
                transition: isHovering || isHit ? 'none' : 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
        >
            <div
                style={{
                    transform: isHovering 
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
                        : 'rotateX(0deg) rotateY(0deg)',
                    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
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
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: isHovering 
                            ? '0 30px 60px rgba(0,0,0,0.4)' 
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
                        borderRadius: 'var(--radius-lg)',
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
