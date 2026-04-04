"use client";

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0, make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            background: '#930a17',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: 1000,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
