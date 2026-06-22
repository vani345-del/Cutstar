'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-logo inline-flex select-none items-center tracking-[0.6em] ${className}`}
      aria-label="CUTSTAR"
    >
      CUTSTAR
    </span>
  );
}
