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

/* ── Inline SVG 5-pointed star path ── */
function starPath(cx: number, cy: number, outerR: number, innerR: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return `M${points.join('L')}Z`;
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const starAnimation = shouldReduceMotion
    ? {}
    : {
        scale: [0.95, 1.05],
        opacity: [0.03, 0.08],
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
      {/* ── Ambient glow effects ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-right violet glow */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#7C5CFC]/[0.07] blur-[150px]" />
        {/* Bottom-left subtle glow */}
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#7C5CFC]/[0.04] blur-[120px]" />
        {/* Center gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0F]" />
      </div>

      {/* ── Wordmark top-left ── */}
      <motion.div
        className="relative z-10 px-6 pt-8 sm:px-10 lg:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Logo className="text-xl tracking-wide text-white/90" />
      </motion.div>

      {/* ── Pulsing star backdrop ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
        initial={{ scale: 1, opacity: 0.05 }}
        animate={starAnimation}
        transition={starTransition}
      >
        <svg
          width="720"
          height="720"
          viewBox="0 0 720 720"
          fill="none"
          className="h-[min(90vh,720px)] w-[min(90vh,720px)]"
        >
          <defs>
            <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.12" />
              <stop offset="70%" stopColor="white" stopOpacity="0.04" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d={starPath(360, 360, 340, 136)}
            fill="url(#star-gradient)"
          />
        </svg>
      </motion.div>

      {/* ── Hero copy ── */}
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

      {/* ── Bottom fade to next section ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
    </section>
  );
}
