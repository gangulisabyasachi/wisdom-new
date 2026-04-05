'use client';
import { useState, useEffect } from 'react';
export default function Typewriter({ text, speed = 150, delay = 1000 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (start && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, start]);

  return (
    <span className="typewriter-text" style={{ color: 'var(--accent)' }}>
      {displayedText}
    </span>
  );
}
