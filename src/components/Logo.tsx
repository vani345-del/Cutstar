'use client';

import React from 'react';

const LETTERS = 'CUTSTAR';

const OFFSETS = [
  { y: 3, r: -1 },   // C
  { y: -2, r: 1 },   // U
  { y: 2, r: -0.5 }, // T
  { y: -3, r: 1.5 }, // S
  { y: 1, r: -1 },   // T
  { y: -2, r: 0.5 }, // A
  { y: 3, r: -1.5 }, // R
];

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-logo inline-flex select-none items-center gap-[0.5em] ${className}`}
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
