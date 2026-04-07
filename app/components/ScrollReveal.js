'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Wrapper Component
 * Triggers animations as elements enter the viewport.
 * 
 * @param {ReactNode} children - The section/element to reveal.
 * @param {string} direction - Direction: 'up', 'down', 'left', 'right' (default: 'up').
 * @param {number} delay - Animation delay in seconds (default: 0).
 * @param {number} threshold - Detection visibility threshold 0.0 to 1.0 (default: 0.1).
 * @param {boolean} once - If true, only trigger once (default: true).
 * @param {string} className - Additional CSS classes.
 */
const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  threshold = 0.1, 
  once = true, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(entry.target);
      } else if (!once) {
        setIsVisible(false);
      }
    }, {
      threshold,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element fully enters
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once]);

  const revealClass = `reveal-${direction}`;
  const activeClass = isVisible ? 'revealed' : '';

  return (
    <div 
      ref={elementRef}
      className={`scroll-reveal ${revealClass} ${activeClass} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
