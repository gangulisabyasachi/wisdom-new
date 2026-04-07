'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ParallaxElement
 * Moves an element at a different speed than the scroll.
 * 
 * @param {ReactNode} children - The element to animate.
 * @param {number} speed - The speed factor (default: 0.1). Positive for faster, negative for slower/reverse.
 * @param {string} className - Additional CSS classes.
 */
const ParallaxElement = ({ children, speed = 0.1, className = '' }) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      const relativeScroll = (scrolled + viewportHeight / 2) - (elementTop + rect.height / 2);
      
      setOffset(relativeScroll * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={elementRef}
      className={`parallax-wrap ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
