'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

/* ── Framer Motion variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ── 4-pointed geometric star path (sharp sparkle glyph) ── */
function fourPointStarPath(cx: number, cy: number, outer: number, inner: number) {
  // Creates a sharp, geometric 4-pointed star / sparkle shape
  const pts = [
    `${cx},${cy - outer}`,          // top
    `${cx + inner},${cy - inner}`,  // top-right inner
    `${cx + outer},${cy}`,          // right
    `${cx + inner},${cy + inner}`,  // bottom-right inner
    `${cx},${cy + outer}`,          // bottom
    `${cx - inner},${cy + inner}`,  // bottom-left inner
    `${cx - outer},${cy}`,          // left
    `${cx - inner},${cy - inner}`,  // top-left inner
  ];
  return `M${pts.join('L')}Z`;
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const starAnimation = shouldReduceMotion
    ? { scale: 1, opacity: 0.18 }
    : {
        scale: [1, 1.06],
        opacity: [0.18, 0.26],
      };

  const starTransition = shouldReduceMotion
    ? {}
    : {
        duration: 5,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0F] text-white">

      {/* ─── Layer 1: Noise / grain texture ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* ─── Layer 2: Radial gradient glow behind star ─── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        {/* Main accent glow — biased right to fill dead space */}
        <div
          className="absolute h-[900px] w-[900px] rounded-full"
          style={{
            top: '10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(124,92,252,0.10) 0%, rgba(124,92,252,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Secondary warm glow bottom-left for depth */}
        <div
          className="absolute h-[500px] w-[500px] rounded-full"
          style={{
            bottom: '-5%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(124,92,252,0.05) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ─── Layer 3: Pulsing 4-pointed star — biased right ─── */}
      <motion.div
        className="pointer-events-none absolute z-[3]"
        style={{
          top: '50%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 100px rgba(124,92,252,0.15))',
        }}
        aria-hidden="true"
        initial={{ scale: 1, opacity: 0.18 }}
        animate={starAnimation}
        transition={starTransition}
      >
        <svg
          width="900"
          height="900"
          viewBox="0 0 900 900"
          fill="none"
          className="h-[min(100vh,900px)] w-[min(100vh,900px)] max-w-none"
        >
          {/* Primary 4-pointed star */}
          <path
            d={fourPointStarPath(450, 450, 420, 85)}
            fill="#7C5CFC"
            stroke="#9A82FD"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>
      </motion.div>

      {/* ─── Layer 4 (z-10): Content ─── */}

      {/* Wordmark top-left */}
      <motion.div
        className="relative z-10 px-6 pt-8 sm:px-10 lg:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Logo className="text-xl tracking-wide text-white/90" />
      </motion.div>

      {/* Hero copy */}
      <motion.div
        className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-6 pb-24 sm:px-10 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <motion.h1
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 6vw + 1rem, 6rem)',
              lineHeight: 1.05,
            }}
            variants={fadeUpVariants}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Months of content.
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#c4b5fd] to-[#7C5CFC] bg-clip-text text-transparent">
              Delivered within a day.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 max-w-2xl font-medium text-white/80"
            style={{
              fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)',
              lineHeight: 1.4,
            }}
            variants={fadeUpVariants}
          >
            The internet never stops. Neither should your content.
          </motion.p>

          {/* Body */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#8A8A99]"
            variants={fadeUpVariants}
          >
            Send us your songs and footage. Our AI delivers a full batch of
            beat-synced, viral-optimized edits across multiple styles, ready to
            post. No briefs. No back and forth. No waiting on editors.
          </motion.p>

          {/* Credibility line */}
          <motion.p
            className="mt-8 max-w-xl text-sm leading-relaxed text-[#8A8A99]/60"
            variants={fadeUpVariants}
          >
            The first AI music edit engine trained on the editing patterns behind
            thousands of viral TikToks. It does more than sync to the beat. It
            knows when to cut, zoom, hold a shot, switch angles, and create the
            moments that keep people watching.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            variants={fadeUpVariants}
          >
            <div className="flex items-center gap-3 text-[#8A8A99]/40">
              <div className="h-8 w-px bg-gradient-to-b from-[#7C5CFC]/40 to-transparent" />
              <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />
    </section>
  );
}
