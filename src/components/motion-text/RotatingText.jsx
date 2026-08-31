import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './RotatingText.css';

export function RotatingText({
  texts = ['DISCIPLINE', 'FOCUS', 'RESPECT', 'POWER'],
  mainClassName = 'hero-rotating-word',
  staggerFrom = 'last',
  staggerDuration = 0.03,
  rotationInterval = 2200,
  className = '',
  style = {}
}) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setIsTransitioning(false);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [texts.length, rotationInterval, isReduced]);

  const currentWord = texts[index] || '';
  const letters = currentWord.split('');

  return (
    <span
      className={`rotating-text-wrapper ${className}`}
      style={style}
      aria-live="polite"
      aria-label={currentWord}
    >
      <span className={`rotating-text-inner ${mainClassName}`}>
        {letters.map((char, i) => {
          const charIndex = staggerFrom === 'last' ? letters.length - 1 - i : i;
          return (
            <span
              key={`${index}-${i}`}
              className={`rotating-char ${isTransitioning ? 'char-out' : 'char-in'}`}
              style={{
                display: 'inline-block',
                transitionDelay: isReduced ? '0s' : `${charIndex * staggerDuration}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
