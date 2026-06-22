'use client';

import React from 'react';

const LETTERS = 'CUTSTAR';

const OFFSETS = [
  { y: -2, r: -2.5 },  // C
  { y: 1, r: 1.8 },    // U
  { y: -3, r: -1.5 },  // T
  { y: 2, r: 3 },      // S
  { y: -1, r: -2 },    // T
  { y: 3, r: 1 },      // A
  { y: -2, r: -2.8 },  // R
];

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-logo inline-flex select-none ${className}`}
      aria-label="CUTSTAR"
    >
      {LETTERS.split('').map((letter, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: `translateY(${OFFSETS[i].y}px) rotate(${OFFSETS[i].r}deg)`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
