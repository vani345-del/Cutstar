'use client';

import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: '01',
    title: 'Upload',
    description:
      'Drop in your songs and any footage you want included.',
  },
  {
    number: '02',
    title: 'We handle the rest',
    description:
      'Our engine syncs every cut to the beat, pulls in outside clips where needed, and builds out a full batch across multiple styles.',
  },
  {
    number: '03',
    title: 'Post',
    description:
      'Receive ready-to-post content and start flooding the For You Page.',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Play‑button overlay                                                */
/* ------------------------------------------------------------------ */

function PlayOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110">
        <svg
          width="20"
          height="24"
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="ml-1"
        >
          <path
            d="M21 11.268a2 2 0 0 1 0 3.464L3 24.124A2 2 0 0 1 0 22.392V3.608A2 2 0 0 1 3 1.876L21 11.268Z"
            fill="rgba(255,255,255,0.9)"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step card with text                                                */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  className,
  cardClassName,
}: {
  step: (typeof steps)[number];
  className?: string;
  cardClassName?: string;
}) {
  return (
    <motion.div className={className} variants={cardVariants}>
      {/* Video placeholder */}
      <div
        className={`group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1A1A24] shadow-2xl shadow-black/40 ${cardClassName ?? ''}`}
      >
        {/* Gradient shimmer layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFC]/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }} />
        
        <PlayOverlay />
        
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
          style={{ boxShadow: 'inset 0 0 60px rgba(124,92,252,0.06)' }} 
        />
      </div>

      {/* Step text */}
      <div className="mt-6">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-[#7C5CFC]/20 select-none">
            {step.number}
          </span>
          <h3 className="text-xl font-semibold text-white">
            {step.title}
          </h3>
        </div>
        <p className="mt-2 max-w-md text-base leading-relaxed text-[#8A8A99]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden px-6 py-36 sm:px-10 lg:px-20"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-[#7C5CFC]/[0.03] blur-[120px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7C5CFC] mb-4">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Three steps to<br />
          <span className="text-[#8A8A99]">unlimited content.</span>
        </h2>
      </motion.div>

      {/* ---------------------------------------------------------- */}
      {/*  Asymmetric card grid                                       */}
      {/* ---------------------------------------------------------- */}
      <motion.div
        className="relative mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ---------- Card 1 — large, left‑aligned ---------- */}
        <StepCard
          step={steps[0]}
          className="relative w-full sm:w-[65%]"
        />

        {/* ---------- Card 2 — medium, pushed right ---------- */}
        <StepCard
          step={steps[1]}
          className="relative mt-16 ml-auto w-full sm:mt-20 sm:w-[55%]"
        />

        {/* ---------- Card 3 — offset left ---------- */}
        <StepCard
          step={steps[2]}
          className="relative mt-16 w-full sm:mt-20 sm:ml-[10%] sm:w-[50%]"
        />

        {/* Decorative connection line */}
        <div className="pointer-events-none absolute left-[31%] top-0 hidden h-full w-px sm:block">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[#7C5CFC]/10 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
