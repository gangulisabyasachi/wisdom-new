'use client';
import { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 150, delay = 3500, deleteSpeed = 80 }) {
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  // Ensure hydration stability by only running animations on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer;

    if (!isDeleting && index < text.length) {
      // Typing Phase
      timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      // Completed Phase - Long Pause
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && index > 0) {
      // Deletion Phase
      timer = setTimeout(() => {
        setIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else if (isDeleting && index === 0) {
      // Reset Phase - Pause before typing again
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, speed * 2);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, delay, deleteSpeed, mounted]);

  // SSR-safe fallback
  if (!mounted) {
    return (
      <span className="typewriter-text" style={{ color: 'var(--accent)' }}>
        {/* Server renders nothing or a static version to prevent layout shift */}
      </span>
    );
  }

  return (
    <span className="typewriter-text" style={{ color: 'var(--accent)', position: 'relative' }}>
      {text.substring(0, index)}
      <span className="typewriter-cursor"></span>
    </span>
  );
}
